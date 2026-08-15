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
  showFront: boolean;      // 显示前侧可见边（Front Edges）
  showBack: boolean;       // 显示后侧被遮挡暗边（Back / Hidden Edges 透视线）
  frontWidth: number;      // 前侧边线粗细 (px)
  backWidth: number;       // 后侧边线粗细 (px)
  frontDashed: boolean;    // 前侧边线是否虚线
  backDashed: boolean;     // 后侧边线是否虚线
  frontColor: string;      // 前侧边线颜色
  backColor: string;       // 后侧边线颜色
  frontOpacity: number;    // 前侧边透明度 0..1
  backOpacity: number;     // 后侧边透明度 0..1
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

export interface GuideVisibility {
  vertexX: boolean;
  vertexY: boolean;
  vertexZ: boolean;
  centerX: boolean;
  centerY: boolean;
  centerZ: boolean;
  angleGuides: boolean;
}

export const DEFAULT_GUIDES: GuideVisibility = {
  vertexX: true,
  vertexY: true,
  vertexZ: true,
  centerX: true,
  centerY: true,
  centerZ: true,
  angleGuides: true,
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
  setRotation(yawDeg: number, pitchDeg: number): void;
  getAxisRotation(): { rotXDeg: number; rotYDeg: number; rotZDeg: number };
  setAxisRotation(xDeg: number, yDeg: number, zDeg: number): void;
  setZoom(z: number): void;
  getZoom(): number;
  setDimensions(x: number, y: number, z: number): void;
  getDimensions(): { sizeX: number; sizeY: number; sizeZ: number };
  setRadius(r: number): void;
  getRadius(): number;
  getEdgeStyle(): EdgeStyleConfig;
  setEdgeStyle(style: Partial<EdgeStyleConfig>): void;
  getGuides(): GuideVisibility;
  setGuides(g: Partial<GuideVisibility>): void;
  toggleAllGuides(visible?: boolean): void;
  on(event: 'change', callback: ColorChangeCallback): void;
  off(event: 'change', callback: ColorChangeCallback): void;
  destroy(): void;
}
