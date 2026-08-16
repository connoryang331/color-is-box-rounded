import type {
  RGBColor, ColorMode, Vec2, Vec3,
  ColorOutput, ColorChangeCallback, GuideVisibility, EdgeStyleConfig, RoundedBoxColorPicker,
  SatMode, CubeSatMapping,
} from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, mat3Mul, mat3RotX, mat3RotY, mat3RotZ, mat3Apply, mat3FromEuler, mat3Identity, mat3Transpose, Mat3, project3D, projectSaturationTriangle, easeInOutQuad } from './camera-math';
import { rgbToHex, rgbToHsb, rgbToOklch, rgbToValues, valuesToRgb, ringColorAt, hsbToRgb, oklchToRgb } from './color-math';
import { initWebGL, renderRoundedBox, RING_CENTER_R, RING_INNER_GAP, RING_MID_GAP, RING_W } from './rounded-renderer';

export interface RoundedBoxOptions {
  initialColor?: RGBColor;
  size?: number;
  mode?: ColorMode;
}

const DEG = Math.PI / 180;
const TWO_PI = 2 * Math.PI;

/** Wrap an angle to [-180, 180) (degrees) */
const wrapDeg = (d: number): number => {
  let m = d % 360;
  if (m > 180) m -= 360;
  else if (m < -180) m += 360;
  return m;
};

/** Wrap radians to [-π, π) */
const wrapRad = (r: number): number => {
  let m = r % TWO_PI;
  if (m > Math.PI) m -= TWO_PI;
  else if (m < -Math.PI) m += TWO_PI;
  return m;
};

/** 8-digit #RRGGBBAA hex for a color with transparency. */
const alphaHex = (rgb: RGBColor, a: number): string => {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}${toHex(a * 255)}`;
};

export function createRoundedBoxPicker(
  container: HTMLElement,
  options: RoundedBoxOptions = {},
): RoundedBoxColorPicker {
  const size = options.size || 460;
  let mode: ColorMode = options.mode || 'rgb';
  let invert = false;

  let cam: CameraConfig = { ...DEFAULT_CAMERA_CONFIG };
  let box: BoxConfig = { ...DEFAULT_BOX_CONFIG, radius: 0.08 };
  let guides: GuideVisibility = { ...DEFAULT_GUIDES };
  let edgeStyle: EdgeStyleConfig = { ...DEFAULT_EDGE_CONFIG };

  // Dual-matrix model (Blender viewport semantics):
  // - objMat  the object's own orientation (driven by ROT sliders / setAxisRotation / presets); acc tracks only this
  // - viewMat camera/viewport orientation (only middle-drag / empty-drag orbit changes it); slider values unaffected
  // - cam.mat = viewMat · objMat (rendering / picking / guides all use the combined matrix)
  const DEFAULT_ROT = { x: 8 * DEG, y: -20 * DEG, z: -55 * DEG };
  let objMat: Mat3 = mat3FromEuler(DEFAULT_ROT.x, DEFAULT_ROT.y, DEFAULT_ROT.z);
  let viewMat: Mat3 = mat3Identity();
  let acc = { ...DEFAULT_ROT };

  const syncCam = () => {
    cam.mat = mat3Mul(viewMat, objMat);
  };

  let color: RGBColor = options.initialColor || { r: 255, g: 255, b: 255 };
  let dotValues: Vec3 = rgbToValues(color, mode);
  // Alpha (0..1) of the picked color — driven by the inner ring (or the setAlpha API).
  let alpha = 1.0;
  // Saturation triangle drag state: svAnchor is the color captured at drag start so the
  // triangle geometry stays fixed while dragging (the mix is computed against it).
  let isSVDrag = false;
  let svAnchor: Vec3 | null = null;
  // svMix holds the current color's barycentric weights (a·C + b·white + g·black) relative to the
  // anchored triangle, so the position marker inside the triangle follows the pointer while
  // dragging and rests at the final mix position after release.
  let svMix: { a: number; b: number; g: number } | null = null;
  // The saturation triangle is revealed on demand: hold Shift to show and use it.
  // Without the modifier, left-click always picks from the cube surface (no accidental tuning).
  // Ctrl / Cmd stays free for future multi-select (e.g. building a gradient), and Alt is already
  // the viewport-orbit modifier — Shift is the free, conflict-free choice.
  let isShiftHeld = false;
  // Reveal animation: svReveal goes 0 -> 1 while Shift is held (triangle unfolds from the current
  // color point) and 1 -> 0 on release (folds back). Driven by a self-scheduling rAF loop.
  let svReveal = 0;
  let svRevealTarget = 0;
  let svAnimFrame: number | null = null;
  const animateReveal = (target: number) => {
    svRevealTarget = target;
    if (svAnimFrame !== null) return; // already animating toward the latest target
    let last = performance.now();
    const speed = 6.0; // full transition in ~165 ms
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (svRevealTarget > svReveal) svReveal = Math.min(svRevealTarget, svReveal + dt * speed);
      else svReveal = Math.max(svRevealTarget, svReveal - dt * speed);
      scheduleRender();
      if (Math.abs(svReveal - svRevealTarget) < 0.001) {
        svReveal = svRevealTarget;
        svAnimFrame = null;
      } else {
        svAnimFrame = requestAnimationFrame(step);
      }
    };
    svAnimFrame = requestAnimationFrame(step);
  };

  // ── Alpha / Saturation rings (press & hold the pick dot) ──
  // Pressing the pick dot reveals two concentric rings around it:
  //   inner ring = saturation (HSV S, hue + lightness kept)
  //   outer ring = alpha
  // The pointer's radial band selects the active ring (switchable mid-drag); rotating
  // around the anchor sets the value 0–100%. Release folds the rings back.
  // Rings open only after holding the dot for RING_HOLD_MS or dragging > RING_ARM_MOVE px,
  // so a quick single click (even exactly on the dot) stays a plain click and never pops them.
  const RING_HOLD_MS = 250;
  const RING_ARM_MOVE = 10;
  let isRingDrag = false;
  let ringOpened = false;                  // rings currently unfolded during this drag
  let ringArmTimer: number | null = null;  // hold-to-open timer id
  let ringPressPt: Vec2 | null = null;     // pointer position at press (drag-escape check)
  let ringAnchor: Vec2 | null = null;      // screen-space ring center (dot position at press)
  let ringBand: 'sat' | 'alpha' | null = null;
  // Angular hysteresis: the pointer must rotate ~10° inside a band before that ring engages.
  // The band follows the pointer distance (sat inner, alpha outer), so each ring is adjusted
  // only while the pointer actually sits on it — moving to the alpha ring never touches the
  // sat ring. (A radial crossing of the inner band doesn't rotate the pointer, so it can't
  // engage the sat ring on the way out; the center plate is a dead zone.)
  let ringBandStartAngle = 0;
  let ringEngaged = false;
  // The saturation ring is a linear ramp like the classic saturation slider:
  // white at 12 o'clock → the anchor color at 6 o'clock → black at 3 o'clock (hue preserved).
  let ringColorAnchor: Vec3 | null = null; // color captured at press (the ring's C vertex)
  let ringAngle = Math.PI;                 // current marker angle (starts at the anchor color, 6 o'clock)
  let ringReveal = 0;
  let ringRevealTarget = 0;
  let ringAnimFrame: number | null = null;
  const animateRing = (target: number) => {
    ringRevealTarget = target;
    if (ringAnimFrame !== null) return; // already animating toward the latest target
    let last = performance.now();
    const speed = 6.0; // full transition in ~165 ms
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (ringRevealTarget > ringReveal) ringReveal = Math.min(ringRevealTarget, ringReveal + dt * speed);
      else ringReveal = Math.max(ringRevealTarget, ringReveal - dt * speed);
      scheduleRender();
      if (Math.abs(ringReveal - ringRevealTarget) < 0.001) {
        ringReveal = ringRevealTarget;
        ringAnimFrame = null;
        // Fold finished: release the ring anchor so the regular pick dot renders again.
        if (ringRevealTarget === 0) ringAnchor = null;
      } else {
        ringAnimFrame = requestAnimationFrame(step);
      }
    };
    ringAnimFrame = requestAnimationFrame(step);
  };

  // ── 3D Cube SAT Popup (press & hold pick dot when satMode === 'cube_sat') ──
  let isCubeSatDrag = false;
  let cubeSatOpened = false;
  let cubeSatArmTimer: number | null = null;
  let cubeSatPressPt: Vec2 | null = null;
  let cubeSatAnchor: Vec2 | null = null;
  let cubeSatColorAnchor: Vec3 | null = null;
  let cubeSatCoord: Vec3 = { x: 0.5, y: 0.5, z: 0.5 };
  let cubeSatReveal = 0;
  let cubeSatRevealTarget = 0;
  let cubeSatAnimFrame: number | null = null;

  const animateCubeSat = (target: number) => {
    cubeSatRevealTarget = target;
    // If dismissing (target === 0), close immediately with crisp instant exit to eliminate trailing shadows
    if (target === 0) {
      if (cubeSatAnimFrame !== null) {
        cancelAnimationFrame(cubeSatAnimFrame);
        cubeSatAnimFrame = null;
      }
      cubeSatReveal = 0;
      cubeSatAnchor = null;
      scheduleRender();
      return;
    }
    if (cubeSatAnimFrame !== null) return;
    let last = performance.now();
    const speed = openSpeed || 10.0;
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (cubeSatRevealTarget > cubeSatReveal) cubeSatReveal = Math.min(cubeSatRevealTarget, cubeSatReveal + dt * speed);
      else cubeSatReveal = Math.max(cubeSatRevealTarget, cubeSatReveal - dt * speed);
      scheduleRender();
      if (Math.abs(cubeSatReveal - cubeSatRevealTarget) < 0.001) {
        cubeSatReveal = cubeSatRevealTarget;
        cubeSatAnimFrame = null;
        if (cubeSatRevealTarget === 0) cubeSatAnchor = null;
      } else {
        cubeSatAnimFrame = requestAnimationFrame(step);
      }
    };
    cubeSatAnimFrame = requestAnimationFrame(step);
  };

  const listeners = new Set<ColorChangeCallback>();
  const rc = initWebGL(container, size);

  let cubeSatPointerPos: Vec2 | null = null;
  let cubeSatSize = guides.cubeSatSize || 165;
  let satShape: SatShape = guides.satShape || 'cube';
  let alphaRingRadius = guides.alphaRingRadius !== undefined ? guides.alphaRingRadius : 0.92;
  let alphaRingWidth = guides.alphaRingWidth !== undefined ? guides.alphaRingWidth : 16;
  let cubeSatPitch = guides.cubeSatPitch !== undefined ? guides.cubeSatPitch : 19;
  let cubeSatYaw = guides.cubeSatYaw !== undefined ? guides.cubeSatYaw : -33;
  let temperatureRange = guides.temperatureRange !== undefined ? guides.temperatureRange : 35;
  let indicatorKnobRadius = guides.indicatorKnobRadius !== undefined ? guides.indicatorKnobRadius : 9;
  let checkerSize = guides.checkerSize !== undefined ? guides.checkerSize : 4;
  let openSpeed = guides.openSpeed !== undefined ? guides.openSpeed : 10.0;

  let animId: number | null = null;
  const scheduleRender = () => {
    if (animId !== null) return;
    animId = requestAnimationFrame(() => {
      animId = null;
      renderRoundedBox(
        rc, cam, box, mode, invert, guides, edgeStyle, dotValues, true, svAnchor, svMix, isShiftHeld, svReveal,
        ringAnchor ? { anchor: ringAnchor, reveal: ringReveal, band: ringBand, colorAnchor: ringColorAnchor, angle: ringAngle } : null,
        cubeSatAnchor ? {
          anchor: cubeSatAnchor,
          reveal: cubeSatReveal,
          size: cubeSatSize,
          shape: satShape,
          colorAnchor: cubeSatColorAnchor || dotValues,
          currentCoord: cubeSatCoord,
          mapping: guides.cubeSatMapping,
          pointerPos: cubeSatPointerPos,
          currentColor: cubeSatCurrentColor,
          alphaRingRadius,
          alphaRingWidth,
          pitchDeg: cubeSatPitch,
          yawDeg: cubeSatYaw,
          temperatureRange,
          indicatorKnobRadius,
          checkerSize,
        } : null,
        alpha
      );
    });
  };

  const notify = () => {
    const rgb = valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } : rgb;
    const hsb = rgbToHsb(finalRgb);
    const oklch = rgbToOklch(finalRgb);
    const hex = alpha < 1 ? alphaHex(finalRgb, alpha) : rgbToHex(finalRgb);
    const out: ColorOutput = {
      rgb: finalRgb,
      hsb,
      oklch,
      hex,
      alpha,
    };
    listeners.forEach(cb => cb(out));
  };

  // ── Blender 3D Interaction ──
  // 1. Middle Mouse Drag (or Alt+Left Drag, or Left Drag on EMPTY area) -> Free 3D Viewport Tumble
  // 2. Left Mouse Click / Drag on Box surface -> Pick color
  // 3. Mouse Wheel -> Zoom (0.2x ~ 2.5x)
  // 4. Keyboard: R reset · F/B/T front/back/top view · Arrow keys nudge rotation
  // 5. Double Click: on box = invert color · on empty = reset view
  //
  // All rotations pivot around the box's own local axes (post-multiply objMat):
  // - Horizontal drag / ROT Z  -> around local Z (blue line stays)
  // - Vertical drag / ROT X    -> around local X (red line stays)
  // - ROT Y                    -> around local Y (green line stays)
  // So each axis guide line stays fixed while rotating around its own axis.
  const rotateLocal = (axis: 'x' | 'y' | 'z', deltaRad: number) => {
    if (deltaRad === 0) return;
    if (axis === 'x') {
      objMat = mat3Mul(objMat, mat3RotX(deltaRad));
      acc.x += deltaRad;
    } else if (axis === 'y') {
      objMat = mat3Mul(objMat, mat3RotY(deltaRad));
      acc.y += deltaRad;
    } else {
      objMat = mat3Mul(objMat, mat3RotZ(deltaRad));
      acc.z += deltaRad;
    }
    syncCam();
    scheduleRender();
  };

  // Camera orbit (Blender middle-drag / empty-area left-drag): only viewMat changes, object values stay.
  // Horizontal = around the screen-vertical axis (world Y), vertical = around the screen-horizontal axis (world X).
  const orbitView = (dx: number, dy: number) => {
    viewMat = mat3Mul(mat3RotY(dx * 0.01), viewMat);
    viewMat = mat3Mul(mat3RotX(-dy * 0.01), viewMat);
    syncCam();
    scheduleRender();
  };

  // Point the viewport at a desired combined orientation (object values unchanged): viewMat = desired · objMat⁻¹
  const viewFrom = (combined: Mat3) => {
    viewMat = mat3Mul(combined, mat3Transpose(objMat));
    syncCam();
    scheduleRender();
  };

  // Reset object orientation + viewport + zoom
  const resetView = () => {
    objMat = mat3FromEuler(DEFAULT_ROT.x, DEFAULT_ROT.y, DEFAULT_ROT.z);
    viewMat = mat3Identity();
    acc = { ...DEFAULT_ROT };
    cam.zoom = 1.0;
    syncCam();
    scheduleRender();
  };

  let isTumbling = false;
  let isPicking = false;
  let lastX = 0;
  let lastY = 0;

  // ── SDF helpers (shared by the raycast and the surface normal) ──
  const boxHalf = (): Vec3 => ({ x: box.sizeX * 0.5, y: box.sizeY * 0.5, z: box.sizeZ * 0.5 });
  const boxRad = (): number => {
    const h = boxHalf();
    return Math.min(box.radius || 0.001, Math.min(h.x, h.y, h.z) * 0.49);
  };
  const sdBox = (p: Vec3): number => {
    const half = boxHalf();
    const rad = boxRad();
    const qx = Math.abs(p.x) - (half.x - rad);
    const qy = Math.abs(p.y) - (half.y - rad);
    const qz = Math.abs(p.z) - (half.z - rad);
    const maxQx = Math.max(qx, 0.0);
    const maxQy = Math.max(qy, 0.0);
    const maxQz = Math.max(qz, 0.0);
    const len = Math.hypot(maxQx, maxQy, maxQz);
    const m = Math.min(Math.max(qx, Math.max(qy, qz)), 0.0);
    return len + m - rad;
  };
  // Exact 3D raycast: returns the hit point in local box coords, or null (miss)
  const raycastAt = (clientX: number, clientY: number): Vec3 | null => {
    const rect = rc.canvasGL.getBoundingClientRect();
    const px = (clientX - rect.left) * (rc.width / rect.width);
    const py = (clientY - rect.top) * (rc.height / rect.height);

    const screenX = px - rc.width * 0.5;
    const screenY = rc.height * 0.5 - py; // Flip Y for WebGL matching

    const scaleFactor = rc.width * 0.36 * 1.6 * (cam.zoom || 1.0);
    const camXY = { x: screenX / scaleFactor, y: screenY / scaleFactor };

    // Inverse transform: Cam space -> local space (inverse of a rotation matrix = transpose)
    const rotToLocal = (p: Vec3): Vec3 => mat3Apply(mat3Transpose(cam.mat), p);

    let t = 0.0;
    let hitLocal: Vec3 | null = null;

    for (let i = 0; i < 96; i++) {
      const pCam: Vec3 = { x: camXY.x, y: camXY.y, z: -5.0 + t };
      const pLoc = rotToLocal(pCam);
      const d = sdBox(pLoc);
      if (d < 0.001) {
        hitLocal = pLoc;
        break;
      }
      t += d;
      if (t > 10.0) break;
    }

    return hitLocal;
  };

  const pickColorAtScreen = (clientX: number, clientY: number) => {
    const hit = raycastAt(clientX, clientY);
    if (!hit) return;
    // Map local coordinates [-halfSize, +halfSize] to normalized [0, 1]
    const nx = Math.max(0, Math.min(1, hit.x / box.sizeX + 0.5));
    const ny = Math.max(0, Math.min(1, hit.y / box.sizeY + 0.5));
    const nz = Math.max(0, Math.min(1, hit.z / box.sizeZ + 0.5));
    dotValues = { x: nx, y: ny, z: nz };
    notify();
    scheduleRender();
  };

  // Canvas CSS coordinates from client coordinates (mirrors the raycast conversion).
  const toCanvas = (clientX: number, clientY: number): Vec2 => {
    const rect = rc.canvasGL.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (rc.width / rect.width),
      y: (clientY - rect.top) * (rc.height / rect.height),
    };
  };
  // Screen position of the pick dot (the current color's projection on the box).
  const dotScreenPos = (): Vec2 =>
    project3D(dotValues, rc.width * 0.36, { x: rc.width * 0.5, y: rc.height * 0.5 }, cam, box);
  const hitDot = (clientX: number, clientY: number): boolean => {
    const p = toCanvas(clientX, clientY);
    const d = dotScreenPos();
    const hitRadius = guides.dotSensitivity || 36; // configurable generous hit zone for indicator dot (default 36px)
    return Math.hypot(p.x - d.x, p.y - d.y) <= hitRadius;
  };

  const setAlphaInternal = (v: number) => {
    alpha = Math.max(0, Math.min(1, v));
    notify();
    scheduleRender();
  };
  // Pointer angle around the ring anchor, radians clockwise from 12 o'clock [0, 2π).
  const ringAngleAt = (p: Vec2): number => {
    const dx = p.x - ringAnchor!.x;
    const dy = p.y - ringAnchor!.y;
    let ang = Math.atan2(dx, -dy);
    return ang < 0 ? ang + TWO_PI : ang;
  };
  // Alpha fraction (0..1) from the pointer angle.
  const ringValueAt = (p: Vec2): number => ringAngleAt(p) / TWO_PI;
  // Outer ring: set the color to the saturation-ring color at the pointer angle
  // (anchor color → black → white → anchor, hue preserved).
  const applyRingAngle = (ang: number) => {
    ringAngle = ang;
    const anchorRgb = valuesToRgb(ringColorAnchor || dotValues, mode);
    dotValues = rgbToValues(ringColorAt(anchorRgb, ang), mode);
    notify();
    scheduleRender();
  };

  // Saturation triangle: barycentric weights (a,b,g) of the pointer inside the projected
  // triangle (current color C / white W / black K), or null when outside / disabled.
  // Orthographic projection preserves barycentric coordinates, so the screen mix equals the 3D mix.
  const triangleBarycentric = (clientX: number, clientY: number): { a: number; b: number; g: number } | null => {
    if (!guides.svTriangle) return null;
    const rect = rc.canvasGL.getBoundingClientRect();
    const px = (clientX - rect.left) * (rc.width / rect.width);
    const py = (clientY - rect.top) * (rc.height / rect.height);
    const tri = projectSaturationTriangle(svAnchor || dotValues, mode, rc.width * 0.36, { x: rc.width * 0.5, y: rc.height * 0.5 }, cam, box);
    const denom = (tri.w.y - tri.k.y) * (tri.c.x - tri.k.x) + (tri.k.x - tri.w.x) * (tri.c.y - tri.k.y);
    if (Math.abs(denom) < 1e-6) return null;
    const a = ((tri.w.y - tri.k.y) * (px - tri.k.x) + (tri.k.x - tri.w.x) * (py - tri.k.y)) / denom;
    const b = ((tri.k.y - tri.c.y) * (px - tri.k.x) + (tri.c.x - tri.k.x) * (py - tri.k.y)) / denom;
    const g = 1 - a - b;
    if (a < -0.02 || b < -0.02 || g < -0.02) return null;
    return { a, b, g };
  };

  // Apply a triangle mix: new color = a·C + b·white + g·black (normalized RGB), same hue.
  const applyTriangleMix = (w: { a: number; b: number; g: number }) => {
    const anchor = svAnchor || dotValues;
    const tri = projectSaturationTriangle(anchor, mode, rc.width * 0.36, { x: rc.width * 0.5, y: rc.height * 0.5 }, cam, box);
    const nr = Math.max(0, Math.min(1, w.a * tri.cRGB.x + w.b));
    const ng = Math.max(0, Math.min(1, w.a * tri.cRGB.y + w.b));
    const nb = Math.max(0, Math.min(1, w.a * tri.cRGB.z + w.b));
    dotValues = rgbToValues({ r: nr * 255, g: ng * 255, b: nb * 255 }, mode);
    notify();
    scheduleRender();
  };

  // Cursor feedback: default on the box (left-drag picks color), grab on empty area (left-drag orbits)
  let lastMouseX = 0;
  let lastMouseY = 0;
  const updateCursor = (clientX: number, clientY: number) => {
    lastMouseX = clientX;
    lastMouseY = clientY;
    if (isCubeSatDrag || (cubeSatAnchor && cubeSatReveal > 0.01)) {
      rc.canvasGL.style.cursor = 'default';
      return;
    }
    rc.canvasGL.style.cursor = hitDot(clientX, clientY) ? 'pointer' : (raycastAt(clientX, clientY) ? 'default' : 'grab');
  };

  rc.canvasGL.addEventListener('mousemove', (e) => {
    updateCursor(e.clientX, e.clientY);
  });

  rc.canvasGL.addEventListener('mousedown', (e) => {
    // If 3D Cube SAT is currently open and visible:
    if (cubeSatAnchor && cubeSatReveal > 0.05) {
      const p = toCanvas(e.clientX, e.clientY);
      const s = cubeSatSize;
      const rAlpha = s * alphaRingRadius;
      const wAlpha = alphaRingWidth;
      const safeMargin = rAlpha + wAlpha / 2 + 10;
      const ax = Math.max(safeMargin, Math.min(rc.width - safeMargin, cubeSatAnchor.x));
      const ay = Math.max(safeMargin, Math.min(rc.height - safeMargin, cubeSatAnchor.y));
      const distFromCenter = Math.hypot(p.x - ax, p.y - ay);

      if (distFromCenter <= rAlpha + wAlpha / 2 + 10) {
        // Clicked INSIDE the Cube SAT or its Alpha Ring: resume dragging / adjusting
        isCubeSatDrag = true;
        cubeSatOpened = true;
        cubeSatPressPt = p;
        e.preventDefault();
        return;
      } else {
        // Clicked OUTSIDE: close the 3D Cube SAT popup
        cubeSatOpened = false;
        if (cubeSatCurrentColor) {
          dotValues = rgbToValues(cubeSatCurrentColor, mode);
          cubeSatCurrentColor = null;
          notify();
        }
        cubeSatPointerPos = null;
        cubeSatColorAnchor = null;
        animateCubeSat(0);
        // Continue to normal pick or tumble below:
      }
    }

    if (isCubeSatDrag) return;
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      // Middle Click (or Alt+Left Click) = Blender Viewport 3D Tumble
      isTumbling = true;
      lastX = e.clientX;
      lastY = e.clientY;
      document.body.style.cursor = 'grabbing';
      e.preventDefault();
    } else if (e.button === 0) {
      // Triangle interactions only while Shift is held (it is the reveal modifier)
      const sv = isShiftHeld ? triangleBarycentric(e.clientX, e.clientY) : null;
      if (sv) {
        // Left Click / Drag INSIDE the saturation triangle = adjust saturation & brightness
        isSVDrag = true;
        svAnchor = { ...dotValues };
        svMix = sv;
        applyTriangleMix(sv);
      } else if (!isShiftHeld && hitDot(e.clientX, e.clientY)) {
        // Press & hold the pick dot = reveal the tuning mode chosen by guides.satMode ('cube_sat' | 'rings' | 'triangle')
        const chosenMode = guides.satMode || 'cube_sat';
        if (chosenMode === 'cube_sat') {
          isCubeSatDrag = true;
          cubeSatOpened = true;
          cubeSatPressPt = toCanvas(e.clientX, e.clientY);
          cubeSatAnchor = dotScreenPos();
          cubeSatColorAnchor = { ...dotValues };
          cubeSatCoord = { x: 0.5, y: 0.5, z: 0.5 };
          cubeSatPointerPos = cubeSatAnchor;
          animateCubeSat(1);
          e.preventDefault();
        } else if (chosenMode === 'triangle') {
          isSVDrag = true;
          svAnchor = { ...dotValues };
          animateReveal(1);
          e.preventDefault();
        } else {
          isRingDrag = true;
          ringOpened = true;
          ringPressPt = toCanvas(e.clientX, e.clientY);
          ringAnchor = dotScreenPos();
          ringBand = null;
          ringColorAnchor = { ...dotValues };
          ringAngle = Math.PI; // the anchor color sits at 6 o'clock
          svAnchor = null;
          svMix = null;
          animateRing(1);
          e.preventDefault();
        }
      } else if (raycastAt(e.clientX, e.clientY)) {
        // Left Click on Box surface: Pick color immediately
        pickColorAtScreen(e.clientX, e.clientY);
        const chosenMode = guides.satMode || 'cube_sat';
        const delay = guides.holdDelayMs !== undefined ? guides.holdDelayMs : 300;

        if (chosenMode === 'cube_sat') {
          // Arm 3D Cube SAT on surface press: opens immediately if delay <= 0, or after holdDelayMs / drag
          isCubeSatDrag = true;
          cubeSatPressPt = toCanvas(e.clientX, e.clientY);
          cubeSatAnchor = dotScreenPos();
          cubeSatColorAnchor = { ...dotValues };
          cubeSatCoord = { x: 0.5, y: 0.5, z: 0.5 };
          cubeSatPointerPos = cubeSatAnchor;

          if (delay <= 0) {
            cubeSatOpened = true;
            animateCubeSat(1);
          } else {
            cubeSatOpened = false;
            cubeSatArmTimer = window.setTimeout(() => {
              cubeSatOpened = true;
              animateCubeSat(1);
            }, delay);
          }
          isPicking = true;
          e.preventDefault();
        } else {
          isPicking = true;
          svAnchor = null;
          svMix = null;
        }
      } else {
        // Left Click / Drag on EMPTY area = Tumble (view orbit)
        isTumbling = true;
        lastX = e.clientX;
        lastY = e.clientY;
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
      }
    }
  });

  // Prevent default middle click autoscroll in browser
  rc.canvasGL.addEventListener('auxclick', (e) => {
    if (e.button === 1) e.preventDefault();
  });

  // Current adjusted color while tuning in 3D Cube SAT
  let cubeSatCurrentColor: RGBColor | null = null;

  // Helper to apply 3D Cube SAT coordinate (u, v, w) to color
  const applyCubeSatCoord = (u: number, v: number, w: number) => {
    if (!cubeSatColorAnchor) return;
    const baseRgb = valuesToRgb(cubeSatColorAnchor, mode);
    const rule = guides.cubeSatMapping || 'temp_sat_bri';

    let newRgb: RGBColor;
    if (rule === 'temp_sat_bri') {
      // u in [0, 1]: Temperature (cold <-> warm: blue <-> red shift)
      // v in [0, 1]: Saturation (up = vibrant color, down = desaturated/dark)
      // w in [0, 1]: Brightness (0 = pure black shadow, 1 = maximum brightness / white)
      const hsb = rgbToHsb(baseRgb);
      const span = (temperatureRange !== undefined ? temperatureRange : 35) * 2;
      const hueShift = (u - 0.5) * span;
      const targetH = (hsb.h + hueShift + 360) % 360;
      const targetS = Math.max(0, Math.min(100, v * 100));
      // Brightness directly scales with w * (0.3 + 0.7 * v) so w -> 0 reaches pure black 0
      const targetB = Math.max(0, Math.min(100, w * 100));
      newRgb = hsbToRgb({ h: targetH, s: targetS, b: targetB });
    } else if (rule === 'hsv') {
      // Direct 3D HSV space: u=H [0..359], v=S [0..100], w=V [0..100]
      newRgb = hsbToRgb({ h: u * 359, s: v * 100, b: w * 100 });
    } else {
      // Direct 3D OKLCH space: u=C [0..0.4], v=L [0..1], w=H [0..359]
      newRgb = oklchToRgb({ l: w, c: u * 0.35, h: v * 359 });
    }

    cubeSatCurrentColor = newRgb;
    const finalRgb = invert ? { r: 255 - newRgb.r, g: 255 - newRgb.g, b: 255 - newRgb.b } : newRgb;
    const hsb = rgbToHsb(finalRgb);
    const oklch = rgbToOklch(finalRgb);
    const hex = alpha < 1 ? alphaHex(finalRgb, alpha) : rgbToHex(finalRgb);
    const out: ColorOutput = {
      rgb: finalRgb,
      hsb,
      oklch,
      hex,
      alpha,
    };
    listeners.forEach(cb => cb(out));
    scheduleRender();
  };

  window.addEventListener('mousemove', (e) => {
    if (isCubeSatDrag && cubeSatAnchor) {
      document.body.style.cursor = 'default';
      const p = toCanvas(e.clientX, e.clientY);
      if (!cubeSatOpened) {
        if (cubeSatPressPt && Math.hypot(p.x - cubeSatPressPt.x, p.y - cubeSatPressPt.y) > RING_ARM_MOVE) {
          if (cubeSatArmTimer !== null) {
            window.clearTimeout(cubeSatArmTimer);
            cubeSatArmTimer = null;
          }
          cubeSatOpened = true;
          animateCubeSat(1);
        }
        return;
      }
      // 3D Perspective Projection for SAT Shape:
      const s = cubeSatSize;
      const radYaw = (cubeSatYaw !== undefined ? cubeSatYaw : -33) * Math.PI / 180;
      const radPitch = (cubeSatPitch !== undefined ? cubeSatPitch : 19) * Math.PI / 180;
      const cy = Math.cos(radYaw), sy = Math.sin(radYaw);
      const cp = Math.cos(radPitch), sp = Math.sin(radPitch);
      const rAlpha = s * alphaRingRadius;
      const wAlpha = alphaRingWidth;
      const safeMargin = rAlpha + wAlpha / 2 + 10;
      const ax = Math.max(safeMargin, Math.min(rc.width - safeMargin, cubeSatAnchor.x));
      const ay = Math.max(safeMargin, Math.min(rc.height - safeMargin, cubeSatAnchor.y));

      const isPyramid = satShape === 'pyramid';
      const isPyramidInv = satShape === 'pyramid_inverted';
      const isCylinder = satShape === 'cylinder';
      const isCuboid = satShape === 'cuboid';
      const scaleX = isCuboid ? 1.35 : 1.0;
      const scaleY = isCuboid ? 0.72 : 1.0;
      const scaleZ = isCuboid ? 1.0 : 1.0;

      const proj = (px: number, py: number, pz: number): Vec2 => {
        const x0 = px * scaleX, y0 = py * scaleY, z0 = pz * scaleZ;
        const x1 = x0 * cy + z0 * sy;
        const y1 = y0;
        const z1 = -x0 * sy + z0 * cy;
        const x2 = x1;
        const y2 = y1 * cp - z1 * sp;
        return {
          x: ax + x2 * s * 0.44,
          y: ay - y2 * s * 0.44,
        };
      };

      const ApexTop    = proj( 0,  1.35,  0);
      const ApexBottom = proj( 0, -1.35,  0);
      const T_back  = proj(-1,  1, -1);
      const T_left  = proj(-1,  1,  1);
      const T_right = proj( 1,  1, -1);
      const T_front = proj( 1,  1,  1);
      const B_left  = proj(-1, -1,  1);
      const B_right = proj( 1, -1, -1);
      const B_front = proj( 1, -1,  1);

      // Triangle test & barycentric helper:
      const bary = (pt: Vec2, a: Vec2, b: Vec2, c: Vec2) => {
        const denom = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
        if (Math.abs(denom) < 1e-5) return { u: -1, v: -1, w: -1, inside: false };
        const u = ((b.y - c.y) * (pt.x - c.x) + (c.x - b.x) * (pt.y - c.y)) / denom;
        const v = ((c.y - a.y) * (pt.x - c.x) + (a.x - c.x) * (pt.y - c.y)) / denom;
        const w = 1 - u - v;
        const inside = u >= -0.05 && v >= -0.05 && w >= -0.05;
        return { u, v, w, inside };
      };

      // Check whether pointer is dragging the 360° Alpha Orbital Ring
      const distFromCenter = Math.hypot(p.x - ax, p.y - ay);
      const isOnAlphaRing = Math.abs(distFromCenter - rAlpha) <= (wAlpha / 2 + 6);

      if (isOnAlphaRing) {
        // Pointer is on the 360° Alpha ring: calculate angle clockwise from 12 o'clock (-PI/2)
        let ang = Math.atan2(p.y - ay, p.x - ax) + Math.PI / 2;
        if (ang < 0) ang += Math.PI * 2;
        const newAlpha = Math.max(0, Math.min(1, ang / (Math.PI * 2)));
        setAlphaInternal(newAlpha);
        notify();
        return;
      }

      // Check whether pointer is strictly inside the 3D geometry hull
      let hull: Vec2[];
      if (isPyramid) {
        hull = [ApexTop, B_right, B_front, B_left];
      } else if (isPyramidInv) {
        hull = [T_back, T_right, ApexBottom, T_left];
      } else if (isCylinder) {
        const pLeftT = proj(-1, 1, 0), pRightT = proj(1, 1, 0);
        const pRightB = proj(1, -1, 0), pLeftB = proj(-1, -1, 0);
        const pBackT = proj(0, 1, -1), pFrontB = proj(0, -1, 1);
        hull = [pBackT, pRightT, pRightB, pFrontB, pLeftB, pLeftT];
      } else {
        hull = [T_back, T_right, B_right, B_front, B_left, T_left];
      }
      
      const pointInPoly = (pt: Vec2, poly: Vec2[]): boolean => {
        let inside = true;
        for (let i = 0; i < poly.length; i++) {
          const p1 = poly[i];
          const p2 = poly[(i + 1) % poly.length];
          const cross = (p2.x - p1.x) * (pt.y - p1.y) - (p2.y - p1.y) * (pt.x - p1.x);
          if (cross < 0) {
            inside = false;
            break;
          }
        }
        return inside;
      };

      if (!pointInPoly(p, hull)) {
        return;
      }

      let u = 0.5, v = 0.5, w = 0.5;

      if (isPyramid) {
        // Pyramid Left Face: Apex -> B_left -> B_front
        const pyrLeft = bary(p, ApexTop, B_front, B_left);
        // Pyramid Right Face: Apex -> B_front -> B_right
        const pyrRight = bary(p, ApexTop, B_right, B_front);

        const vertDown = Math.max(0, Math.min(1, (p.y - ApexTop.y) / (B_front.y - ApexTop.y || 1)));

        if (pyrRight.inside) {
          const whiteness = Math.max(0, Math.min(1, (p.x - B_front.x) / (B_right.x - B_front.x || 1)));
          u = 0.5;
          v = Math.max(0, Math.min(1, 1 - whiteness * 0.85));
          w = Math.max(0.1, Math.min(1, (1 - vertDown * 0.55) * (0.6 + 0.4 * whiteness)));
        } else {
          const blackness = Math.max(0, Math.min(1, (B_front.x - p.x) / (B_front.x - B_left.x || 1)));
          u = 0.5;
          v = Math.max(0, Math.min(1, 1 - blackness * 0.85));
          w = Math.max(0, Math.min(1, (1 - blackness) * (1 - vertDown * 0.55)));
        }
      } else if (isPyramidInv) {
        const topT1 = bary(p, T_back, T_right, T_front);
        const topT2 = bary(p, T_back, T_front, T_left);
        if (topT1.inside || topT2.inside) {
          const gx = T_back.x - T_front.x, gy = T_back.y - T_front.y;
          const gLen2 = gx * gx + gy * gy || 1;
          const t = Math.max(0, Math.min(1, ((p.x - T_front.x) * gx + (p.y - T_front.y) * gy) / gLen2));
          u = 0.5 + t * 0.5;
          v = 1.0;
          w = 1.0;
        } else {
          const pyrInvLeft = bary(p, T_left, T_front, ApexBottom);
          const vertDown = Math.max(0, Math.min(1, (p.y - T_front.y) / (ApexBottom.y - T_front.y || 1)));
          if (pyrInvLeft.inside) {
            const blackness = Math.max(0, Math.min(1, (T_front.x - p.x) / (T_front.x - T_left.x || 1)));
            u = 0.5;
            v = Math.max(0, Math.min(1, 1 - blackness * 0.85));
            w = Math.max(0, Math.min(1, (1 - blackness) * (1 - vertDown * 0.55)));
          } else {
            const whiteness = Math.max(0, Math.min(1, (p.x - T_front.x) / (T_right.x - T_front.x || 1)));
            u = 0.5;
            v = Math.max(0, Math.min(1, 1 - whiteness * 0.85));
            w = Math.max(0.1, Math.min(1, (1 - vertDown * 0.55) * (0.6 + 0.4 * whiteness)));
          }
        }
      } else if (isCylinder) {
        const pFrontT = proj(0, 1, 1), pBackT = proj(0, 1, -1);
        const pLeftT = proj(-1, 1, 0), pRightT = proj(1, 1, 0);
        const pFrontB = proj(0, -1, 1);

        if (p.y < pFrontT.y) {
          const gx = pBackT.x - pFrontT.x, gy = pBackT.y - pFrontT.y;
          const gLen2 = gx * gx + gy * gy || 1;
          const t = Math.max(0, Math.min(1, ((p.x - pFrontT.x) * gx + (p.y - pFrontT.y) * gy) / gLen2));
          u = 0.5 + t * 0.5;
          v = 1.0;
          w = 1.0;
        } else {
          const vertDown = Math.max(0, Math.min(1, (p.y - pFrontT.y) / (pFrontB.y - pFrontT.y || 1)));
          if (p.x < pFrontT.x) {
            const blackness = Math.max(0, Math.min(1, (pFrontT.x - p.x) / (pFrontT.x - pLeftT.x || 1)));
            u = 0.5;
            v = Math.max(0, Math.min(1, 1 - blackness * 0.85));
            w = Math.max(0, Math.min(1, (1 - blackness) * (1 - vertDown * 0.55)));
          } else {
            const whiteness = Math.max(0, Math.min(1, (p.x - pFrontT.x) / (pRightT.x - pFrontT.x || 1)));
            u = 0.5;
            v = Math.max(0, Math.min(1, 1 - whiteness * 0.85));
            w = Math.max(0.1, Math.min(1, (1 - vertDown * 0.55) * (0.6 + 0.4 * whiteness)));
          }
        }
      } else {
        // 1. Check Top Face Quad: Tri1(T_back, T_right, T_front) + Tri2(T_back, T_front, T_left)
        const topT1 = bary(p, T_back, T_right, T_front);
        const topT2 = bary(p, T_back, T_front, T_left);

        // 2. Check Left Face Quad: Tri1(T_left, T_front, B_front) + Tri2(T_left, B_front, B_left)
        const leftT1 = bary(p, T_left, T_front, B_front);
        const leftT2 = bary(p, T_left, B_front, B_left);

        // 3. Check Right Face Quad: Tri1(T_front, T_right, B_right) + Tri2(T_front, B_right, B_front)
        const rightT1 = bary(p, T_front, T_right, B_right);
        const rightT2 = bary(p, T_front, B_right, B_front);

        const isRight = rightT1.inside || rightT2.inside;
        const isLeft  = leftT1.inside  || leftT2.inside;
        const isTop   = topT1.inside   || topT2.inside;

        if (isRight) {
          const gx = T_right.x - T_front.x, gy = T_right.y - T_front.y;
          const gLen2 = gx * gx + gy * gy || 1;
          const whiteness = Math.max(0, Math.min(1,
            ((p.x - T_front.x) * gx + (p.y - T_front.y) * gy) / gLen2));

          const vertDown = Math.max(0, Math.min(1, (p.y - T_front.y) / (B_front.y - T_front.y || 1)));

          u = 0.5;
          v = Math.max(0, Math.min(1, 1 - whiteness * 0.85));
          w = Math.max(0.1, Math.min(1, (1 - vertDown * 0.55) * (0.6 + 0.4 * whiteness)));
        } else if (isLeft) {
          const gx = T_left.x - T_front.x, gy = T_left.y - T_front.y;
          const gLen2 = gx * gx + gy * gy || 1;
          const blackness = Math.max(0, Math.min(1,
            ((p.x - T_front.x) * gx + (p.y - T_front.y) * gy) / gLen2));

          const vertDown = Math.max(0, Math.min(1, (p.y - T_front.y) / (B_front.y - T_front.y || 1)));

          u = 0.5;
          v = Math.max(0, Math.min(1, 1 - blackness * 0.85));
          w = Math.max(0, Math.min(1, (1 - blackness) * (1 - vertDown * 0.55)));
        } else if (isTop) {
          const gx = T_back.x - T_front.x, gy = T_back.y - T_front.y;
          const gLen2 = gx * gx + gy * gy || 1;
          const projDist = ((p.x - T_front.x) * gx + (p.y - T_front.y) * gy) / gLen2;
          const t = Math.max(0, Math.min(1, projDist));

          u = 0.5 + t * 0.5;
          v = 1.0;
          w = 1.0;
        } else {
          return;
        }
      }

      cubeSatPointerPos = p;
      cubeSatCoord = { x: u, y: v, z: w };
      applyCubeSatCoord(u, v, w);
    } else if (isRingDrag && ringAnchor) {
      const p = toCanvas(e.clientX, e.clientY);
      // Rings not open yet: dragging past RING_ARM_MOVE px opens them immediately;
      // otherwise the hold timer decides. Nothing is adjusted before the rings are open.
      if (!ringOpened) {
        if (ringPressPt && Math.hypot(p.x - ringPressPt.x, p.y - ringPressPt.y) > RING_ARM_MOVE) {
          if (ringArmTimer !== null) {
            window.clearTimeout(ringArmTimer);
            ringArmTimer = null;
          }
          ringOpened = true;
          animateRing(1);
        }
        return;
      }
      const dist = Math.hypot(p.x - ringAnchor.x, p.y - ringAnchor.y);
      // Bands scale with the reveal animation; pointer distance picks the active ring
      // (inner = saturation, outer = alpha), switchable mid-drag.
      const eReveal = easeInOutQuad(ringReveal);
      // Gapped bands: center plate [0, rC], gap, sat [satIn, satOut], gap, alpha [alpIn, alpOut]
      const rC = RING_CENTER_R * eReveal;
      const rW = RING_W * eReveal;
      const satIn = (RING_CENTER_R + RING_INNER_GAP) * eReveal;
      const satOut = satIn + rW;
      const alpIn = (RING_CENTER_R + RING_INNER_GAP + RING_W + RING_MID_GAP) * eReveal;
      const alpOut = alpIn + rW;
      // sat ring is INNER, alpha ring is OUTER; the gaps and center plate are dead zones
      const band: 'alpha' | 'sat' | null = dist < rC - 3 ? null
        : (dist >= satIn - 2 && dist <= satOut + 2 ? 'sat'
          : dist >= alpIn - 2 && dist <= alpOut + 2 ? 'alpha' : null);
      if (band !== ringBand) {
        ringBand = band;
        ringBandStartAngle = band ? ringAngleAt(p) : 0;
        ringEngaged = false;
      }
      if (band) {
        const ang = ringAngleAt(p);
        if (!ringEngaged) {
          let delta = Math.abs(ang - ringBandStartAngle);
          if (delta > Math.PI) delta = TWO_PI - delta; // wrap-around
          if (delta > 10 * DEG) ringEngaged = true;
        }
        if (ringEngaged) {
          if (band === 'alpha') setAlphaInternal(ang / TWO_PI);
          else applyRingAngle(ang);
        } else {
          scheduleRender();
        }
      } else {
        scheduleRender();
      }
    } else if (isSVDrag) {
      const sv = triangleBarycentric(e.clientX, e.clientY);
      if (sv) {
        svMix = sv;
        applyTriangleMix(sv);
      }
    } else if (isTumbling) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      // Camera orbit: only the viewport turns, object rotation values stay (Blender semantics)
      orbitView(dx, dy);
    } else if (isPicking) {
      pickColorAtScreen(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isCubeSatDrag) {
      if (cubeSatArmTimer !== null) {
        window.clearTimeout(cubeSatArmTimer);
        cubeSatArmTimer = null;
      }
      isCubeSatDrag = false;
      // Do NOT close Cube SAT on mouseup; keep it open on screen until clicked outside
      if (cubeSatCurrentColor) {
        dotValues = rgbToValues(cubeSatCurrentColor, mode);
        notify();
      }
    }
    if (isRingDrag) {
      if (ringArmTimer !== null) {
        window.clearTimeout(ringArmTimer);
        ringArmTimer = null;
      }
      isRingDrag = false;
      ringOpened = false;
      ringPressPt = null;
      ringBand = null;
      ringBandStartAngle = 0;
      ringEngaged = false;
      ringColorAnchor = null;
      ringAngle = 0;
      animateRing(0);
    }
    if (isSVDrag) {
      isSVDrag = false;
      // Keep svAnchor + svMix: the triangle stays anchored to the drag-start color and the marker
      // rests at the final mix position until the next surface pick re-anchors it.
    }
    if (isTumbling) {
      isTumbling = false;
      document.body.style.cursor = 'default';
    }
    if (isPicking) {
      isPicking = false;
    }
    updateCursor(lastMouseX, lastMouseY);
  });

  // Mouse Wheel: adjusts 3D Cube SAT size while active; otherwise zooms camera viewport (Blender style)
  rc.canvasGL.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isCubeSatDrag || (cubeSatAnchor && cubeSatReveal > 0.01)) {
      // Scroll wheel to adjust 3D Cube SAT popup scale (80px to 260px)
      const deltaSize = e.deltaY < 0 ? 12 : -12;
      cubeSatSize = Math.max(80, Math.min(260, cubeSatSize + deltaSize));
      scheduleRender();
      return;
    }
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    cam.zoom = Math.max(0.2, Math.min(2.5, (cam.zoom || 1.0) + delta));
    scheduleRender();
  }, { passive: false });

  // Double Click: on box = invert color (white <-> black); on empty = reset view
  rc.canvasGL.addEventListener('dblclick', (e) => {
    if (raycastAt(e.clientX, e.clientY)) {
      invert = !invert;
      notify();
    } else {
      resetView();
    }
    scheduleRender();
  });

  // Keyboard shortcuts: R reset · F front · B back · T top · Arrow keys nudge rotation
  const onKeyDown = (e: KeyboardEvent) => {
    // Shift reveals the saturation triangle (works even while typing values)
    if (e.key === 'Shift') {
      if (!isShiftHeld) {
        isShiftHeld = true;
        svAnchor = null;
        svMix = null;
        animateReveal(1);
      }
      return;
    }
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return; // do not intercept while typing values
    switch (e.key) {
      case 'r':
      case 'R':
        resetView();
        break;
      case 'f':
      case 'F':
        viewFrom(mat3Identity());
        break;
      case 'b':
      case 'B':
        viewFrom(mat3RotY(Math.PI));
        break;
      case 't':
      case 'T':
        viewFrom(mat3RotX(Math.PI / 2));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        rotateLocal('y', -5 * DEG);
        break;
      case 'ArrowRight':
        e.preventDefault();
        rotateLocal('y', 5 * DEG);
        break;
      case 'ArrowUp':
        e.preventDefault();
        rotateLocal('x', 5 * DEG);
        break;
      case 'ArrowDown':
        e.preventDefault();
        rotateLocal('x', -5 * DEG);
        break;
    }
  };
  window.addEventListener('keydown', onKeyDown);
  // Releasing Shift hides the triangle again (fresh anchor on next reveal)
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift' && isShiftHeld) {
      isShiftHeld = false;
      // Keep svAnchor/svMix: the triangle folds back together with its marker (renderer keeps
      // drawing while svReveal > 0). The next reveal resets the anchor to the current color.
      animateReveal(0);
    }
  };
  window.addEventListener('keyup', onKeyUp);
  // Safety: if the window loses focus while Ctrl is held, drop the reveal state
  const onWindowBlur = () => {
    if (isShiftHeld) {
      isShiftHeld = false;
      animateReveal(0);
    }
  };
  window.addEventListener('blur', onWindowBlur);

  scheduleRender();
  notify();

  return {
    getColor: () => {
      const rgb = valuesToRgb(dotValues, mode);
      const finalRgb = invert ? { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } : rgb;
      return {
        rgb: finalRgb,
        hsb: rgbToHsb(finalRgb),
        oklch: rgbToOklch(finalRgb),
        hex: alpha < 1 ? alphaHex(finalRgb, alpha) : rgbToHex(finalRgb),
        alpha,
      };
    },
    setColor: (c: RGBColor) => {
      color = c;
      dotValues = rgbToValues(c, mode);
      if (c.a !== undefined) alpha = Math.max(0, Math.min(1, c.a));
      svAnchor = null;
      svMix = null;
      notify();
      scheduleRender();
    },
    setMode: (m: ColorMode) => {
      mode = m;
      notify();
      scheduleRender();
    },
    getMode: () => mode,
    setSatMode: (sm: SatMode) => {
      guides.satMode = sm;
      scheduleRender();
    },
    getSatMode: () => guides.satMode || 'cube_sat',
    setSatShape: (shape: SatShape) => {
      satShape = shape;
      guides.satShape = shape;
      scheduleRender();
    },
    getSatShape: () => satShape || 'cube',
    setCubeSatMapping: (csm: CubeSatMapping) => {
      guides.cubeSatMapping = csm;
      scheduleRender();
    },
    getCubeSatMapping: () => guides.cubeSatMapping || 'temp_sat_bri',
    setCubeSatSize: (sz: number) => {
      cubeSatSize = Math.max(60, Math.min(320, sz));
      guides.cubeSatSize = cubeSatSize;
      scheduleRender();
    },
    getCubeSatSize: () => cubeSatSize,
    setDotSensitivity: (radiusPx: number) => {
      guides.dotSensitivity = Math.max(10, Math.min(100, radiusPx));
      scheduleRender();
    },
    getDotSensitivity: () => guides.dotSensitivity || 36,
    setAlphaRingRadius: (multiplier: number) => {
      alphaRingRadius = Math.max(0.70, Math.min(1.40, multiplier));
      guides.alphaRingRadius = alphaRingRadius;
      scheduleRender();
    },
    getAlphaRingRadius: () => alphaRingRadius,
    setAlphaRingWidth: (widthPx: number) => {
      alphaRingWidth = Math.max(6, Math.min(36, widthPx));
      guides.alphaRingWidth = alphaRingWidth;
      scheduleRender();
    },
    getAlphaRingWidth: () => alphaRingWidth,
    setCubeSatOrientation: (pitchDeg: number, yawDeg: number) => {
      cubeSatPitch = Math.max(-45, Math.min(45, pitchDeg));
      cubeSatYaw = Math.max(-90, Math.min(90, yawDeg));
      guides.cubeSatPitch = cubeSatPitch;
      guides.cubeSatYaw = cubeSatYaw;
      scheduleRender();
    },
    getCubeSatOrientation: () => ({
      pitchDeg: cubeSatPitch !== undefined ? cubeSatPitch : 19,
      yawDeg: cubeSatYaw !== undefined ? cubeSatYaw : -33,
    }),
    setTemperatureRange: (degrees: number) => {
      temperatureRange = Math.max(10, Math.min(90, degrees));
      guides.temperatureRange = temperatureRange;
      scheduleRender();
    },
    getTemperatureRange: () => temperatureRange !== undefined ? temperatureRange : 35,
    setIndicatorKnobRadius: (radiusPx: number) => {
      indicatorKnobRadius = Math.max(5, Math.min(16, radiusPx));
      guides.indicatorKnobRadius = indicatorKnobRadius;
      scheduleRender();
    },
    getIndicatorKnobRadius: () => indicatorKnobRadius !== undefined ? indicatorKnobRadius : 9,
    setCheckerSize: (sizePx: number) => {
      checkerSize = Math.max(2, Math.min(12, sizePx));
      guides.checkerSize = checkerSize;
      scheduleRender();
    },
    getCheckerSize: () => checkerSize !== undefined ? checkerSize : 4,
    setOpenSpeed: (speed: number) => {
      openSpeed = Math.max(4.0, Math.min(24.0, speed));
      guides.openSpeed = openSpeed;
    },
    getOpenSpeed: () => openSpeed !== undefined ? openSpeed : 10.0,
    setHoldDelay: (delayMs: number) => {
      guides.holdDelayMs = Math.max(0, Math.min(800, delayMs));
      scheduleRender();
    },
    getHoldDelay: () => guides.holdDelayMs !== undefined ? guides.holdDelayMs : 300,
    setRotation: (yawDeg: number, pitchDeg: number) => {
      // Legacy API compatibility: reset object orientation and viewport (Y axis 0 deg)
      objMat = mat3FromEuler(pitchDeg * DEG, 0, yawDeg * DEG);
      viewMat = mat3Identity();
      acc.x = pitchDeg * DEG;
      acc.y = 0;
      acc.z = yawDeg * DEG;
      syncCam();
      scheduleRender();
    },
    getAxisRotation: () => ({
      rotXDeg: Math.round(wrapDeg(acc.x * 180 / Math.PI) * 10) / 10,
      rotYDeg: Math.round(wrapDeg(acc.y * 180 / Math.PI) * 10) / 10,
      rotZDeg: Math.round(wrapDeg(acc.z * 180 / Math.PI) * 10) / 10,
    }),
    setAxisRotation: (xDeg: number, yDeg: number, zDeg: number) => {
      // Blender sidebar semantics: set the accumulated angle to the target; delta takes the shortest path (no long way around ±180)
      rotateLocal('x', wrapRad(xDeg * DEG - acc.x));
      rotateLocal('y', wrapRad(yDeg * DEG - acc.y));
      rotateLocal('z', wrapRad(zDeg * DEG - acc.z));
    },
    rotateLocal: (axis: 'x' | 'y' | 'z', deltaDeg: number) => {
      rotateLocal(axis, deltaDeg * DEG);
    },
    resetRotation: (xDeg: number, yDeg: number, zDeg: number) => {
      // Absolute reset: object orientation + viewport together (matches default view)
      objMat = mat3FromEuler(xDeg * DEG, yDeg * DEG, zDeg * DEG);
      viewMat = mat3Identity();
      acc.x = xDeg * DEG;
      acc.y = yDeg * DEG;
      acc.z = zDeg * DEG;
      syncCam();
      scheduleRender();
    },
    setZoom: (z: number) => {
      cam.zoom = Math.max(0.1, Math.min(3.0, z));
      scheduleRender();
    },
    getZoom: () => cam.zoom || 1.0,
    setDimensions: (x: number, y: number, z: number) => {
      box.sizeX = Math.max(0.2, Math.min(2.5, x));
      box.sizeY = Math.max(0.2, Math.min(2.5, y));
      box.sizeZ = Math.max(0.2, Math.min(2.5, z));
      scheduleRender();
    },
    getDimensions: () => ({ sizeX: box.sizeX, sizeY: box.sizeY, sizeZ: box.sizeZ }),
    setRadius: (r: number) => {
      box.radius = Math.max(0.0, Math.min(0.50, r));
      scheduleRender();
    },
    getRadius: () => box.radius,
    setAlpha: (a: number) => {
      alpha = Math.max(0, Math.min(1, a));
      notify();
      scheduleRender();
    },
    getAlpha: () => alpha,
    getEdgeStyle: () => ({ ...edgeStyle }),
    setEdgeStyle: (style: Partial<EdgeStyleConfig>) => {
      edgeStyle = { ...edgeStyle, ...style };
      scheduleRender();
    },
    getGuides: () => ({ ...guides }),
    setGuides: (g: Partial<GuideVisibility>) => {
      guides = { ...guides, ...g };
      scheduleRender();
    },
    toggleAllGuides: (visible?: boolean) => {
      const v = visible !== undefined ? visible : !guides.vertexX;
      guides = {
        vertexX: v,
        vertexY: v,
        vertexZ: v,
        centerX: v,
        centerY: v,
        centerZ: v,
        angleGuides: v,
        svTriangle: guides.svTriangle, // feature switch, not a guide line — keep as-is
      };
      scheduleRender();
    },
    on: (event: 'change', callback: ColorChangeCallback) => {
      listeners.add(callback);
    },
    off: (event: 'change', callback: ColorChangeCallback) => {
      listeners.delete(callback);
    },
    destroy: () => {
      if (animId !== null) cancelAnimationFrame(animId);
      if (svAnimFrame !== null) cancelAnimationFrame(svAnimFrame);
      if (ringAnimFrame !== null) cancelAnimationFrame(ringAnimFrame);
      if (ringArmTimer !== null) window.clearTimeout(ringArmTimer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onWindowBlur);
      container.innerHTML = '';
    },
  };
}
