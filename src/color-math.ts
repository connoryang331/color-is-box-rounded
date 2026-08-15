import type { RGBColor, HSBColor, OKLCHColor, Vec3, ColorMode } from './types';
import { AXIS_MAX } from './types';

// ── RGB ↔ HSB ─────────────────────────────────────────────────────────────

export function rgbToHsb(rgb: RGBColor): HSBColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }

  const s = max === 0 ? 0 : (d / max) * 100;
  const brightness = max * 100;

  return { h, s, b: brightness };
}

export function hsbToRgb(hsb: HSBColor): RGBColor {
  const h = hsb.h;
  const s = hsb.s / 100;
  const v = hsb.b / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r1: number, g1: number, b1: number;
  if (h < 60) { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
  else { r1 = c; g1 = 0; b1 = x; }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

// ── RGB ↔ OKLCH ───────────────────────────────────────────────────────────

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function rgbToOklab(rgb: RGBColor): { L: number; a: number; b: number } {
  const r = srgbToLinear(rgb.r / 255);
  const g = srgbToLinear(rgb.g / 255);
  const b = srgbToLinear(rgb.b / 255);

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}

function oklabToRgb(L: number, a: number, b: number): RGBColor {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return {
    r: Math.round(Math.max(0, Math.min(1, linearToSrgb(r))) * 255),
    g: Math.round(Math.max(0, Math.min(1, linearToSrgb(g))) * 255),
    b: Math.round(Math.max(0, Math.min(1, linearToSrgb(bl))) * 255),
  };
}

export function rgbToOklch(rgb: RGBColor): OKLCHColor {
  const lab = rgbToOklab(rgb);
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let h = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
  if (h < 0) h += 360;
  return { l: lab.L, c, h: c < 0.0001 ? 0 : h };
}

export function oklchToRgb(oklch: OKLCHColor): RGBColor {
  const hRad = oklch.h * (Math.PI / 180);
  const a = oklch.c * Math.cos(hRad);
  const b = oklch.c * Math.sin(hRad);
  return oklabToRgb(oklch.l, a, b);
}

/**
 * Clamp an OKLCH color into sRGB gamut by reducing chroma,
 * preserving lightness and hue.
 */
function gamutClampOklch(l: number, c: number, h: number): OKLCHColor {
  // Quick check: if already in gamut, return as-is
  let rgb = oklchToRgb({ l, c, h });
  if (isInGamut(rgb)) return { l, c, h };

  // Binary search: reduce chroma until in gamut
  let lo = 0;
  let hi = c;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    rgb = oklchToRgb({ l, c: mid, h });
    if (isInGamut(rgb)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return { l, c: lo, h };
}

function isInGamut(rgb: RGBColor): boolean {
  return rgb.r >= 0 && rgb.r <= 255 &&
         rgb.g >= 0 && rgb.g <= 255 &&
         rgb.b >= 0 && rgb.b <= 255;
}

// ── Hex ───────────────────────────────────────────────────────────────────

export function rgbToHex(rgb: RGBColor): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
    .toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function hexToRgb(hex: string): RGBColor | null {
  const match = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!match) return null;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

// ── Normalized values ↔ RGB (the bridge used by the renderer) ─────────────

/** OKLCH max chroma for normalized axis mapping (covers sRGB gamut). */
const OKLCH_C_MAX = 0.4;

/** Convert normalized 0–1 axis values to an RGB color based on current mode. */
export function valuesToRgb(values: Vec3, mode: ColorMode): RGBColor {
  if (mode === 'rgb') {
    return {
      r: Math.round(values.x * 255),
      g: Math.round(values.y * 255),
      b: Math.round(values.z * 255),
    };
  } else if (mode === 'hsb') {
    return hsbToRgb({
      h: values.x * 359,
      s: values.y * 100,
      b: values.z * 100,
    });
  } else {
    // oklch: x=L (0–1), y=C (0–OKLCH_C_MAX), z=H (0–359)
    const l = values.x;
    const c = values.y * OKLCH_C_MAX;
    const h = values.z * 359;
    const clamped = gamutClampOklch(l, c, h);
    return oklchToRgb(clamped);
  }
}

/** Convert an RGB color to normalized 0–1 axis values for the given mode. */
export function rgbToValues(rgb: RGBColor, mode: ColorMode): Vec3 {
  if (mode === 'rgb') {
    return { x: rgb.r / 255, y: rgb.g / 255, z: rgb.b / 255 };
  } else if (mode === 'hsb') {
    const hsb = rgbToHsb(rgb);
    return { x: hsb.h / 359, y: hsb.s / 100, z: hsb.b / 100 };
  } else {
    const oklch = rgbToOklch(rgb);
    return {
      x: oklch.l,
      y: Math.min(oklch.c / OKLCH_C_MAX, 1),
      z: oklch.h / 359,
    };
  }
}

/** Get raw channel values from normalized values. */
export function valuesToChannels(values: Vec3, mode: ColorMode): [number, number, number] {
  const max = AXIS_MAX[mode];
  return [
    Math.round(values.x * max[0]),
    Math.round(values.y * max[1]),
    Math.round(values.z * max[2]),
  ];
}

/**
 * Compute the RGB color for a point on a box face.
 */
export function faceColor(
  faceAxis: number,
  u: number,
  v: number,
  fixedValue: number,
  mode: ColorMode,
  invert = false,
): RGBColor {
  let values: Vec3;
  if (faceAxis === 0) {
    values = { x: fixedValue, y: u, z: v };
  } else if (faceAxis === 1) {
    values = { x: u, y: fixedValue, z: v };
  } else {
    values = { x: u, y: v, z: fixedValue };
  }
  const c = valuesToRgb(values, mode);
  if (invert) return { r: 255 - c.r, g: 255 - c.g, b: 255 - c.b };
  return c;
}
