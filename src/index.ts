import type {
  RGBColor, ColorMode, Vec3,
  ColorOutput, ColorChangeCallback, GuideVisibility, EdgeStyleConfig, RoundedBoxColorPicker,
} from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, project3D } from './camera-math';
import { rgbToHex, rgbToHsb, rgbToOklch, rgbToValues, valuesToRgb } from './color-math';
import { initWebGL, renderRoundedBox } from './rounded-renderer';

export interface RoundedBoxOptions {
  initialColor?: RGBColor;
  size?: number;
  mode?: ColorMode;
}

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

  let color: RGBColor = options.initialColor || { r: 255, g: 255, b: 255 };
  let dotValues: Vec3 = rgbToValues(color, mode);

  const listeners = new Set<ColorChangeCallback>();
  const rc = initWebGL(container, size);

  let animId: number | null = null;
  const scheduleRender = () => {
    if (animId !== null) return;
    animId = requestAnimationFrame(() => {
      animId = null;
      renderRoundedBox(rc, cam, box, mode, invert, guides, edgeStyle, dotValues, true);
    });
  };

  const notify = () => {
    const rgb = valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } : rgb;
    const hsb = rgbToHsb(finalRgb);
    const oklch = rgbToOklch(finalRgb);
    const hex = rgbToHex(finalRgb);
    const out: ColorOutput = {
      rgb: finalRgb,
      hsb,
      oklch,
      hex,
      alpha: 1.0,
    };
    listeners.forEach(cb => cb(out));
  };

  // ── Blender 3D Interaction Standard ──
  // 1. Middle Mouse Button (button === 1) or Alt + Left Click: 3D Viewport Tumble
  // 2. Left Mouse Button (button === 0): Pick color on 3D rounded box surface
  // 3. Mouse Wheel: 3D Zoom (0.2x ~ 2.5x)
  let isTumbling = false;
  let isPicking = false;
  let startX = 0;
  let startY = 0;
  let startYaw = cam.rotZRad;
  let startPitch = cam.rotXRad;

  // Exact 3D raycast to sample color at cursor
  const pickColorAtScreen = (clientX: number, clientY: number) => {
    const rect = rc.canvasGL.getBoundingClientRect();
    const px = (clientX - rect.left) * (rc.width / rect.width);
    const py = (clientY - rect.top) * (rc.height / rect.height);
    
    const screenX = px - rc.width * 0.5;
    const screenY = rc.height * 0.5 - py; // Flip Y for WebGL matching
    
    const scaleFactor = rc.width * 0.26 * 1.6 * (cam.zoom || 1.0);
    const camXY = { x: screenX / scaleFactor, y: screenY / scaleFactor };
    
    // Raymarching in local coordinate space
    const halfSize = { x: box.sizeX * 0.5, y: box.sizeY * 0.5, z: box.sizeZ * 0.5 };
    const minDim = Math.min(Math.min(halfSize.x, halfSize.y), halfSize.z);
    const rad = Math.min(box.radius || 0.001, minDim * 0.49);

    // Inverse rotation
    const cx = Math.cos(cam.rotXRad), sx = Math.sin(cam.rotXRad);
    const cy = Math.cos(cam.rotYRad), sy = Math.sin(cam.rotYRad);
    const cz = Math.cos(cam.rotZRad), sz = Math.sin(cam.rotZRad);

    const rotToLocal = (p: Vec3): Vec3 => {
      const x2 =  p.x * cz + p.y * sz;
      const y2 = -p.x * sz + p.y * cz;
      const z2 =  p.z;

      const x1 = x2 * cy - z2 * sy;
      const y1 = y2;
      const z1 = x2 * sy + z2 * cy;

      const x = x1;
      const y =  y1 * cx + z1 * sx;
      const z = -y1 * sx + z1 * cx;
      return { x, y, z };
    };

    const sdBox = (p: Vec3): number => {
      const qx = Math.abs(p.x) - (halfSize.x - rad);
      const qy = Math.abs(p.y) - (halfSize.y - rad);
      const qz = Math.abs(p.z) - (halfSize.z - rad);
      const maxQx = Math.max(qx, 0.0);
      const maxQy = Math.max(qy, 0.0);
      const maxQz = Math.max(qz, 0.0);
      const len = Math.hypot(maxQx, maxQy, maxQz);
      const m = Math.min(Math.max(qx, Math.max(qy, qz)), 0.0);
      return len + m - rad;
    };

    let t = 0.0;
    let hit = false;
    let hitLocal: Vec3 = { x: 0, y: 0, z: 0 };

    for (let i = 0; i < 96; i++) {
      const pCam: Vec3 = { x: camXY.x, y: camXY.y, z: -5.0 + t };
      const pLoc = rotToLocal(pCam);
      const d = sdBox(pLoc);
      if (d < 0.001) {
        hit = true;
        hitLocal = pLoc;
        break;
      }
      t += d;
      if (t > 10.0) break;
    }

    if (hit) {
      // Map local coordinates [-halfSize, +halfSize] to normalized [0, 1]
      const nx = Math.max(0, Math.min(1, hitLocal.x / box.sizeX + 0.5));
      const ny = Math.max(0, Math.min(1, hitLocal.y / box.sizeY + 0.5));
      const nz = Math.max(0, Math.min(1, hitLocal.z / box.sizeZ + 0.5));
      dotValues = { x: nx, y: ny, z: nz };
      notify();
      scheduleRender();
    }
  };

  rc.canvasGL.addEventListener('mousedown', (e) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      // Middle Click (or Alt+Left Click) = Blender Viewport 3D Tumble
      isTumbling = true;
      startX = e.clientX;
      startY = e.clientY;
      startYaw = cam.rotZRad;
      startPitch = cam.rotXRad;
      document.body.style.cursor = 'grabbing';
      e.preventDefault();
    } else if (e.button === 0) {
      // Left Click = Color Pick
      isPicking = true;
      pickColorAtScreen(e.clientX, e.clientY);
    }
  });

  // Prevent default middle click autoscroll in browser
  rc.canvasGL.addEventListener('auxclick', (e) => {
    if (e.button === 1) e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (isTumbling) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      cam.rotZRad = startYaw + dx * 0.01;
      cam.rotXRad = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, startPitch - dy * 0.01));
      scheduleRender();
    } else if (isPicking) {
      pickColorAtScreen(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mouseup', (e) => {
    if (isTumbling) {
      isTumbling = false;
      document.body.style.cursor = 'default';
    }
    if (isPicking) {
      isPicking = false;
    }
  });

  // Mouse Wheel to Zoom (like Blender 3D)
  rc.canvasGL.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    cam.zoom = Math.max(0.2, Math.min(2.5, (cam.zoom || 1.0) + delta));
    scheduleRender();
  }, { passive: false });

  rc.canvasGL.addEventListener('dblclick', () => {
    invert = !invert;
    notify();
    scheduleRender();
  });

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
        hex: rgbToHex(finalRgb),
        alpha: 1.0,
      };
    },
    setColor: (c: RGBColor) => {
      color = c;
      dotValues = rgbToValues(c, mode);
      notify();
      scheduleRender();
    },
    setMode: (m: ColorMode) => {
      mode = m;
      notify();
      scheduleRender();
    },
    getMode: () => mode,
    setRotation: (yawDeg: number, pitchDeg: number) => {
      cam.rotZRad = (yawDeg * Math.PI) / 180;
      cam.rotXRad = (pitchDeg * Math.PI) / 180;
      scheduleRender();
    },
    getAxisRotation: () => ({
      rotXDeg: Math.round((cam.rotXRad * 180 / Math.PI) * 10) / 10,
      rotYDeg: Math.round((cam.rotYRad * 180 / Math.PI) * 10) / 10,
      rotZDeg: Math.round((cam.rotZRad * 180 / Math.PI) * 10) / 10,
    }),
    setAxisRotation: (xDeg: number, yDeg: number, zDeg: number) => {
      cam.rotXRad = (xDeg * Math.PI) / 180;
      cam.rotYRad = (yDeg * Math.PI) / 180;
      cam.rotZRad = (zDeg * Math.PI) / 180;
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
      container.innerHTML = '';
    },
  };
}
