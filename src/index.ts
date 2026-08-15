import type {
  RGBColor, ColorMode, Vec2, Vec3,
  ColorOutput, ColorChangeCallback, GuideVisibility, EdgeStyleConfig, RoundedBoxColorPicker,
} from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, mat3Mul, mat3RotX, mat3RotY, mat3RotZ, mat3Apply, mat3FromEuler, mat3Identity, mat3Transpose, Mat3, project3D, projectSaturationTriangle } from './camera-math';
import { rgbToHex, rgbToHsb, rgbToOklch, rgbToValues, valuesToRgb, hsbToRgb } from './color-math';
import { initWebGL, renderRoundedBox, RING_INNER_R, RING_INNER_W, RING_OUTER_R, RING_OUTER_W } from './rounded-renderer';

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

/** Ease-in-out quadratic (used by the reveal animations). */
const easeInOutQuad = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

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
  //   outer ring = saturation (HSV S, hue + lightness kept)
  //   inner ring = alpha
  // The pointer's radial band selects the active ring (switchable mid-drag); rotating
  // around the anchor sets the value 0–100%. Release folds the rings back.
  let isRingDrag = false;
  let ringAnchor: Vec2 | null = null;      // screen-space ring center (dot position at press)
  let ringBand: 'sat' | 'alpha' | null = null;
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
      } else {
        ringAnimFrame = requestAnimationFrame(step);
      }
    };
    ringAnimFrame = requestAnimationFrame(step);
  };

  const listeners = new Set<ColorChangeCallback>();
  const rc = initWebGL(container, size);

  let animId: number | null = null;
  const scheduleRender = () => {
    if (animId !== null) return;      animId = requestAnimationFrame(() => {
      animId = null;
      renderRoundedBox(rc, cam, box, mode, invert, guides, edgeStyle, dotValues, true, svAnchor, svMix, isShiftHeld, svReveal, ringAnchor, ringReveal, ringBand, alpha);
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
    return Math.hypot(p.x - d.x, p.y - d.y) <= 14;
  };

  // Inner ring: alpha (0..1). Outer ring: saturation via HSV S (hue + lightness kept).
  const setAlphaInternal = (v: number) => {
    alpha = Math.max(0, Math.min(1, v));
    notify();
    scheduleRender();
  };
  const setSaturationInternal = (v: number) => {
    const rgb = valuesToRgb(dotValues, mode);
    const hsb = rgbToHsb(rgb);
    hsb.s = Math.max(0, Math.min(100, v * 100));
    dotValues = rgbToValues(hsbToRgb(hsb), mode);
    notify();
    scheduleRender();
  };
  // Angle (0..1, 0 at 12 o'clock, clockwise) of the pointer around the ring anchor.
  const ringValueAt = (p: Vec2): number => {
    const dx = p.x - ringAnchor!.x;
    const dy = p.y - ringAnchor!.y;
    let ang = Math.atan2(dx, -dy);
    if (ang < 0) ang += TWO_PI;
    return ang / TWO_PI;
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
    rc.canvasGL.style.cursor = raycastAt(clientX, clientY) ? 'default' : 'grab';
  };

  rc.canvasGL.addEventListener('mousemove', (e) => {
    updateCursor(e.clientX, e.clientY);
  });

  rc.canvasGL.addEventListener('mousedown', (e) => {
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
        // (priority over surface picking since the triangle overlays the cube)
        isSVDrag = true;
        svAnchor = { ...dotValues };
        svMix = sv;
        applyTriangleMix(sv);
      } else if (!isShiftHeld && hitDot(e.clientX, e.clientY)) {
        // Press & hold the pick dot = reveal the alpha / saturation rings (no modifier).
        // The dot is the current color's handle, so pressing it means "tune this color".
        isRingDrag = true;
        ringAnchor = dotScreenPos();
        ringBand = null;
        svAnchor = null;
        svMix = null;
        e.preventDefault();
        animateRing(1);
      } else if (raycastAt(e.clientX, e.clientY)) {
        // Left Click / Drag on Box surface = Color Pick (re-anchors the triangle to the new color)
        isPicking = true;
        svAnchor = null;
        svMix = null;
        pickColorAtScreen(e.clientX, e.clientY);
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

  window.addEventListener('mousemove', (e) => {
    if (isRingDrag && ringAnchor) {
      const p = toCanvas(e.clientX, e.clientY);
      const dist = Math.hypot(p.x - ringAnchor.x, p.y - ringAnchor.y);
      // Bands scale with the reveal animation; pointer distance picks the active ring
      // (inner = alpha, outer = saturation), switchable mid-drag.
      const eReveal = easeInOutQuad(ringReveal);
      const rIn = RING_INNER_R * eReveal;
      const rOut = RING_OUTER_R * eReveal;
      const outBand = Math.abs(dist - rOut) <= (RING_OUTER_W * eReveal) / 2 + 2;
      const inBand = Math.abs(dist - rIn) <= (RING_INNER_W * eReveal) / 2 + 2;
      const band: 'alpha' | 'sat' | null = outBand ? 'sat' : inBand ? 'alpha' : null;
      ringBand = band;
      if (band) {
        const v = ringValueAt(p);
        if (band === 'alpha') setAlphaInternal(v);
        else setSaturationInternal(v);
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
    if (isRingDrag) {
      isRingDrag = false;
      ringBand = null;
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

  // Mouse Wheel to Zoom (like Blender 3D)
  rc.canvasGL.addEventListener('wheel', (e) => {
    e.preventDefault();
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
      svAnchor = null;
      svMix = null;
      notify();
      scheduleRender();
    },
    getMode: () => mode,
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
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onWindowBlur);
      container.innerHTML = '';
    },
  };
}
