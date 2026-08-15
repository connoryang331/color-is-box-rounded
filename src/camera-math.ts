import type { Vec2, Vec3, ColorMode } from './types';
import { rgbToValues, valuesToRgb } from './color-math';

/** 3x3 rotation matrix (row-major: m[row*3 + col]) */
export type Mat3 = number[];

export interface CameraConfig {
  /** Current box orientation as a 3x3 rotation matrix (row-major) */
  mat: Mat3;
  zoom: number; // Camera Zoom multiplier
}

export interface BoxConfig {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  radius: number; // Bevel corner radius of the 8 vertices and 12 edges (0.0 ~ 0.25)
}

const DEG = Math.PI / 180;

export function mat3Identity(): Mat3 {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1];
}

/** Rotation around X axis (row-major, y' = y·c − z·s, z' = y·s + z·c) */
export function mat3RotX(rad: number): Mat3 {
  const c = Math.cos(rad), s = Math.sin(rad);
  return [1, 0, 0, 0, c, -s, 0, s, c];
}

/** Rotation around Y axis (row-major, x' = x·c + z·s, z' = −x·s + z·c) */
export function mat3RotY(rad: number): Mat3 {
  const c = Math.cos(rad), s = Math.sin(rad);
  return [c, 0, s, 0, 1, 0, -s, 0, c];
}

/** Rotation around Z axis (row-major, x' = x·c + y·s, y' = −x·s + y·c) */
export function mat3RotZ(rad: number): Mat3 {
  const c = Math.cos(rad), s = Math.sin(rad);
  return [c, s, 0, -s, c, 0, 0, 0, 1];
}

/** Matrix multiply A·B (row-major) */
export function mat3Mul(a: Mat3, b: Mat3): Mat3 {
  const out = new Array<number>(9);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
    }
  }
  return out;
}

/** Transpose (inverse of a rotation matrix) */
export function mat3Transpose(m: Mat3): Mat3 {
  return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
}

/** v' = M·v */
export function mat3Apply(m: Mat3, v: Vec3): Vec3 {
  return {
    x: m[0] * v.x + m[1] * v.y + m[2] * v.z,
    y: m[3] * v.x + m[4] * v.y + m[5] * v.z,
    z: m[6] * v.x + m[7] * v.y + m[8] * v.z,
  };
}

/**
 * Build an orientation matrix from Euler angles (order X -> Z -> Y, matches the default view)
 * mat = Ry(y) · Rz(z) · Rx(x)
 */
export function mat3FromEuler(xRad: number, yRad: number, zRad: number): Mat3 {
  return mat3Mul(mat3RotY(yRad), mat3Mul(mat3RotZ(zRad), mat3RotX(xRad)));
}

export const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  mat: mat3FromEuler(8 * DEG, -20 * DEG, -55 * DEG),
  zoom: 1.0,
};

export const DEFAULT_BOX_CONFIG: BoxConfig = {
  sizeX: 1.0,
  sizeY: 1.0,
  sizeZ: 1.0,
  radius: 0.0,
};

/**
 * Transform a 3D point by the orientation matrix into camera space (X: right, Y: up, Z: depth)
 * Standard RGB color space coordinates are [0.0, 1.0] with the geometric center at (0.5, 0.5, 0.5)
 * Rotation and scaling strictly pivot around this center point (in-place spin / uniform scaling)
 */
export function transform3D(p: Vec3, cam: CameraConfig, box: BoxConfig): Vec3 {
  // Strictly translate the center (0.5, 0.5, 0.5) to the rotation origin (0,0,0) and apply local dimensions
  const x = (p.x - 0.5) * box.sizeX;
  const y = (p.y - 0.5) * box.sizeY;
  const z = (p.z - 0.5) * box.sizeZ;

  return mat3Apply(cam.mat, { x, y, z });
}

/**
 * Orthographically project a 3D point onto the 2D screen canvas
 */
export function project3D(p: Vec3, scale: number, center: Vec2, cam: CameraConfig, box: BoxConfig): Vec2 {
  const c = transform3D(p, cam, box);
  return {
    x: center.x + c.x * scale * 1.6 * cam.zoom,
    y: center.y - c.y * scale * 1.6 * cam.zoom,
  };
}

/**
 * The saturation triangle: vertices are the current color C, white W (1,1,1) and black K (0,0,0).
 * Any interior point is a mix α·C + β·W + γ·K — the same hue, with saturation & brightness
 * reduced toward the gray axis (W–K). Projected positions are returned for both drawing and
 * hit-testing; orthographic projection preserves barycentric coordinates, so the screen-space
 * mix equals the true 3D mix.
 *
 * `dotValues` is the marker position in the CURRENT mode space; the triangle's top vertex C
 * sits at the marker's cube position, while the W/K vertices are the mode-space positions of
 * the pure white / black cube corners.
 */
export interface SaturationTriangle {
  c: Vec2; // screen position of the current color (top vertex)
  w: Vec2; // screen position of white
  k: Vec2; // screen position of black
  cRGB: Vec3; // current color as normalized RGB [0,1] (used for mixing)
}

export function projectSaturationTriangle(
  dotValues: Vec3,
  mode: ColorMode,
  scale: number,
  center: Vec2,
  cam: CameraConfig,
  box: BoxConfig,
): SaturationTriangle {
  const rgb = valuesToRgb(dotValues, mode);
  const cRGB: Vec3 = { x: rgb.r / 255, y: rgb.g / 255, z: rgb.b / 255 };
  const wValues = rgbToValues({ r: 255, g: 255, b: 255 }, mode);
  const kValues = rgbToValues({ r: 0, g: 0, b: 0 }, mode);
  return {
    c: project3D(dotValues, scale, center, cam, box),
    w: project3D(wValues, scale, center, cam, box),
    k: project3D(kValues, scale, center, cam, box),
    cRGB,
  };
}
