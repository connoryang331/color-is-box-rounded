import type { Vec2, Vec3 } from './types';

export interface CameraConfig {
  rotXRad: number; // Pitch
  rotYRad: number; // Roll
  rotZRad: number; // Yaw
  zoom: number;    // Camera Zoom multiplier
}

export interface BoxConfig {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  radius: number; // 8 个顶点和 12 条棱边的倒角圆角半径 (0.0 ~ 0.25)
}

export const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  rotXRad: 20 * (Math.PI / 180),
  rotYRad: 0,
  rotZRad: -30 * (Math.PI / 180),
  zoom: 1.0,
};

export const DEFAULT_BOX_CONFIG: BoxConfig = {
  sizeX: 1.0,
  sizeY: 1.0,
  sizeZ: 1.0,
  radius: 0.0,
};

/**
 * 3D 坐标经相机参数变换到相机空间 (X: 右, Y: 上, Z: 深度)
 * 标准 RGB 色彩空间坐标为 [0.0, 1.0]，几何中心点为 (0.5, 0.5, 0.5)
 * 旋转与缩放严格围绕该中心点进行原地自转与中心扩散
 */
export function transform3D(p: Vec3, cam: CameraConfig, box: BoxConfig): Vec3 {
  // 严格将中心点 (0.5, 0.5, 0.5) 平移至旋转原点 (0,0,0) 并施加局部尺寸
  const x = (p.x - 0.5) * box.sizeX;
  const y = (p.y - 0.5) * box.sizeY;
  const z = (p.z - 0.5) * box.sizeZ;

  // 1. Z-axis Rotation (Yaw)
  const cz = Math.cos(cam.rotZRad), sz = Math.sin(cam.rotZRad);
  const x1 = x * cz - y * sz;
  const y1 = x * sz + y * cz;
  const z1 = z;

  // 2. Y-axis Rotation (Roll)
  const cy = Math.cos(cam.rotYRad), sy = Math.sin(cam.rotYRad);
  const x2 = x1 * cy + z1 * sy;
  const y2 = y1;
  const z2 = -x1 * sy + z1 * cy;

  // 3. X-axis Rotation (Pitch)
  const cx = Math.cos(cam.rotXRad), sx = Math.sin(cam.rotXRad);
  const camX = x2;
  const camY = z2 * cx - y2 * sx;
  const camZ = z2 * sx + y2 * cx;

  return { x: camX, y: camY, z: camZ };
}

/**
 * 3D 点正交投影到 2D 屏幕画布
 */
export function project3D(p: Vec3, scale: number, center: Vec2, cam: CameraConfig, box: BoxConfig): Vec2 {
  const c = transform3D(p, cam, box);
  return {
    x: center.x + c.x * scale * 1.6 * cam.zoom,
    y: center.y - c.y * scale * 1.6 * cam.zoom,
  };
}
