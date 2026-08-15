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

  // 3D Viewport Drag Tumbling
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startYaw = cam.rotZRad;
  let startPitch = cam.rotXRad;

  rc.canvasGL.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startYaw = cam.rotZRad;
    startPitch = cam.rotXRad;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    cam.rotZRad = startYaw + dx * 0.01;
    cam.rotXRad = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, startPitch - dy * 0.01));
    scheduleRender();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

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
      box.radius = Math.max(0.001, Math.min(0.25, r));
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
