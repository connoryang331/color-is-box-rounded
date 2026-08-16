export type ColorMode = 'rgb' | 'hsb' | 'oklch';

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSBColor {
  h: number;
  s: number;
  b: number;
  a?: number;
}

export interface OKLCHColor {
  l: number;
  c: number;
  h: number;
  a?: number;
}

export interface ColorOutput {
  rgb: RGBColor;
  hsb: HSBColor;
  oklch: OKLCHColor;
  hex: string;
  alpha: number;
}

export interface AxisLock {
  x: boolean;
  y: boolean;
  z: boolean;
}

export interface EdgeStyleConfig {
  showFront: boolean;      // Show visible front edges
  showBack: boolean;       // Show hidden back edges (wireframe)
  frontWidth: number;      // Front edge line width (px)
  backWidth: number;       // Back edge line width (px)
  frontDashed: boolean;    // Whether front edges are dashed
  backDashed: boolean;     // Whether back edges are dashed
  frontColor: string;      // Front edge color
  backColor: string;       // Back edge color
  frontOpacity: number;    // Front edge opacity 0..1
  backOpacity: number;     // Back edge opacity 0..1
}

export const DEFAULT_EDGE_CONFIG: EdgeStyleConfig = {
  showFront: true,
  showBack: true,
  frontWidth: 1.5,
  backWidth: 1.0,
  frontDashed: false,
  backDashed: true,
  frontColor: '#ffffff',
  backColor: '#ffffff',
  frontOpacity: 0.65,
  backOpacity: 0.25,
};

export type SatMode = 'rings' | 'triangle' | 'cube_sat';
export type CubeSatMapping = 'temp_sat_bri' | 'hsv' | 'oklch';

export interface GuideVisibility {
  vertexX: boolean;
  vertexY: boolean;
  vertexZ: boolean;
  centerX: boolean;
  centerY: boolean;
  centerZ: boolean;
  angleGuides: boolean;
  /** Saturation triangle overlay (current color / white / black), draggable to adjust saturation & brightness */
  svTriangle: boolean;
  /** Tuning mode when pressing the pick indicator: 'rings' | 'triangle' | 'cube_sat' */
  satMode: SatMode;
  /** Coordinate mapping rule for 3D Cube SAT */
  cubeSatMapping: CubeSatMapping;
  /** Size in pixels for 3D Cube SAT popup (default 165, adjustable via wheel scroll or API) */
  cubeSatSize: number;
  /** Press hit sensitivity radius for the indicator pick dot in pixels (default 36px, range 12px ~ 80px) */
  dotSensitivity: number;
  /** Hold duration threshold in milliseconds before triggering 3D Cube SAT on surface press (default 300ms, range 0ms ~ 800ms) */
  holdDelayMs: number;
  /** Radius multiplier for the Alpha Orbital Ring around Cube SAT relative to size (default 0.92, range 0.75 ~ 1.30) */
  alphaRingRadius: number;
  /** Stroke thickness of the Alpha Orbital Ring in pixels (default 16px, range 8px ~ 32px) */
  alphaRingWidth: number;
}

export const DEFAULT_GUIDES: GuideVisibility = {
  vertexX: true,
  vertexY: true,
  vertexZ: true,
  centerX: true,
  centerY: true,
  centerZ: true,
  angleGuides: true,
  svTriangle: true,
  satMode: 'cube_sat',
  cubeSatMapping: 'temp_sat_bri',
  cubeSatSize: 165,
  dotSensitivity: 36,
  holdDelayMs: 300,
  alphaRingRadius: 0.92,
  alphaRingWidth: 16,
};

export const AXIS_LABELS: Record<ColorMode, [string, string, string]> = {
  rgb: ['R', 'G', 'B'],
  hsb: ['H', 'S', 'V'],
  oklch: ['L', 'C', 'H'],
};

export const AXIS_MAX: Record<ColorMode, [number, number, number]> = {
  rgb: [255, 255, 255],
  hsb: [359, 100, 100],
  oklch: [100, 40, 359],
};

export type ColorChangeCallback = (color: ColorOutput) => void;

export interface RoundedBoxColorPicker {
  getColor(): ColorOutput;
  setColor(color: RGBColor): void;
  setMode(mode: ColorMode): void;
  getMode(): ColorMode;
  setSatMode(satMode: SatMode): void;
  getSatMode(): SatMode;
  setCubeSatMapping(mapping: CubeSatMapping): void;
  getCubeSatMapping(): CubeSatMapping;
  setCubeSatSize(size: number): void;
  getCubeSatSize(): number;
  setAlphaRingRadius(multiplier: number): void;
  getAlphaRingRadius(): number;
  setAlphaRingWidth(widthPx: number): void;
  getAlphaRingWidth(): number;
  setDotSensitivity(radiusPx: number): void;
  getDotSensitivity(): number;
  setHoldDelay(delayMs: number): void;
  getHoldDelay(): number;
  setRotation(yawDeg: number, pitchDeg: number): void;
  getAxisRotation(): { rotXDeg: number; rotYDeg: number; rotZDeg: number };
  /**
   * Set the accumulated rotation angle per axis (Blender sidebar semantics): rotate around each local axis by a delta.
   * When changing a single axis, that axis guide line stays fixed.
   */
  setAxisRotation(xDeg: number, yDeg: number, zDeg: number): void;
  /** Rotate around the box's current local axis by a delta (axis guide stays fixed, box rotates around it) */
  rotateLocal(axis: 'x' | 'y' | 'z', deltaDeg: number): void;
  /** Absolute orientation reset (rebuild matrix via Euler order X -> Z -> Y), used by presets to restore the default view */
  resetRotation(xDeg: number, yDeg: number, zDeg: number): void;
  setZoom(z: number): void;
  getZoom(): number;
  setDimensions(x: number, y: number, z: number): void;
  getDimensions(): { sizeX: number; sizeY: number; sizeZ: number };
  setRadius(r: number): void;
  getRadius(): number;
  setAlpha(a: number): void;
  getAlpha(): number;
  getEdgeStyle(): EdgeStyleConfig;
  setEdgeStyle(style: Partial<EdgeStyleConfig>): void;
  getGuides(): GuideVisibility;
  setGuides(g: Partial<GuideVisibility>): void;
  toggleAllGuides(visible?: boolean): void;
  on(event: 'change', callback: ColorChangeCallback): void;
  off(event: 'change', callback: ColorChangeCallback): void;
  destroy(): void;
}
