import type { Vec2, Vec3, ColorMode, RGBColor, GuideVisibility, EdgeStyleConfig } from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, project3D, transform3D, projectSaturationTriangle, SaturationTriangle, easeInOutQuad } from './camera-math';
import { drawGuides } from './guide-renderer';
import { VERT_SHADER, FRAG_SHADER, TRI_VERT_SHADER, TRI_FRAG_SHADER } from './shaders';
import { rgbToHex, rgbToHsb, rgbToOklch, valuesToRgb, ringColorAt, hsbToRgb } from './color-math';

/** Radius of the center color plate, in canvas px. */
export const RING_CENTER_R = 20;
/** Gap between the center plate and the inner (saturation) ring, in canvas px. */
export const RING_INNER_GAP = 4;
/** Gap between the inner (saturation) ring and the outer (alpha) ring, in canvas px. */
export const RING_MID_GAP = 8;
/** Band width of BOTH rings, in canvas px. */
export const RING_W = 16;

/** Visible state of the 3D Cube SAT popup (passed to the renderer each frame). */
export interface CubeSatState {
  anchor: Vec2;           // Screen center of the popup
  reveal: number;           // 0..1 animation progress
  size: number;             // Width / height in px (e.g. 150)
  colorAnchor: Vec3;        // The base color captured on press
  currentCoord: Vec3;       // Current internal coord (u, v, w) in [0, 1]
  mapping: 'temp_sat_bri' | 'hsv' | 'oklch';
  pointerPos?: Vec2 | null; // Direct pointer canvas coordinates
  currentColor?: RGBColor | null; // Live adjusted color from the Cube SAT
  alphaRingRadius?: number; // Multiplier relative to s (default 0.92)
  alphaRingWidth?: number;  // Stroke thickness in px (default 16)
  shape?: 'cube' | 'cuboid' | 'pyramid' | 'pyramid_inverted' | 'cylinder'; // 3D geometry shape (default 'cube')
  pitchDeg?: number;        // Isometric Pitch in deg (default 19)
  yawDeg?: number;          // Isometric Yaw in deg (default -33)
  temperatureRange?: number;// Top face temp shift range (default 35)
  indicatorKnobRadius?: number; // Knob and dot radius in px (default 9)
  checkerSize?: number;     // Checkerboard square size in px (default 4)
}

/** Visible state of the pressed pick-dot rings (passed to the renderer each frame). */
export interface RingState {
  /** Screen-space ring center (the dot position at press). */
  anchor: Vec2;
  /** 0..1 unfold / fold animation. */
  reveal: number;
  /** Which ring the pointer currently sits in (highlighted). */
  band: 'sat' | 'alpha' | null;
  /** Color captured at press — the gradient's C vertex (top of the saturation ring). */
  colorAnchor: Vec3 | null;
  /** Current marker angle in radians, clockwise from 12 o'clock. */
  angle: number;
}

export interface WebGLRenderContext {
  gl: WebGLRenderingContext;
  overlayCtx: CanvasRenderingContext2D;
  canvasGL: HTMLCanvasElement;
  canvasOverlay: HTMLCanvasElement;
  width: number;
  height: number;
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  // Gouraud triangle program (saturation picker gradient) + its geometry
  posBuffer: WebGLBuffer;
  posAttr: number;
  triProgram: WebGLProgram;
  triPosAttr: number;
  triColorAttr: number;
  triAlphaLoc: WebGLUniformLocation;
  triBuffer: WebGLBuffer;
}

export function initWebGL(container: HTMLElement, size: number): WebGLRenderContext {
  const dpr = window.devicePixelRatio || 1;
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.style.width = `${size}px`;
  wrap.style.height = `${size}px`;
  wrap.style.userSelect = 'none';

  // 1. WebGL 3D Raymarching Canvas
  const canvasGL = document.createElement('canvas');
  canvasGL.width = size * dpr;
  canvasGL.height = size * dpr;
  canvasGL.style.width = `${size}px`;
  canvasGL.style.height = `${size}px`;
  canvasGL.style.position = 'absolute';
  canvasGL.style.left = '0';
  canvasGL.style.top = '0';

  // 2. 2D Overlay Canvas (for Guides, 12 Edges, Axes & Pick Dot)
  const canvasOverlay = document.createElement('canvas');
  canvasOverlay.width = size * dpr;
  canvasOverlay.height = size * dpr;
  canvasOverlay.style.width = `${size}px`;
  canvasOverlay.style.height = `${size}px`;
  canvasOverlay.style.position = 'absolute';
  canvasOverlay.style.left = '0';
  canvasOverlay.style.top = '0';
  canvasOverlay.style.pointerEvents = 'none';

  wrap.appendChild(canvasGL);
  wrap.appendChild(canvasOverlay);
  container.appendChild(wrap);

  const gl = canvasGL.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false })!;
  const overlayCtx = canvasOverlay.getContext('2d')!;
  overlayCtx.scale(dpr, dpr);

  // Compile shaders
  const createShader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
    }
    return s;
  };

  const vert = createShader(gl.VERTEX_SHADER, VERT_SHADER);
  const frag = createShader(gl.FRAGMENT_SHADER, FRAG_SHADER);
  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  // Quad geometry
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]), gl.STATIC_DRAW);

  const posAttr = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  // Triangle program: position + per-vertex color (Gouraud) for the saturation picker gradient
  const triVert = createShader(gl.VERTEX_SHADER, TRI_VERT_SHADER);
  const triFrag = createShader(gl.FRAGMENT_SHADER, TRI_FRAG_SHADER);
  const triProgram = gl.createProgram()!;
  gl.attachShader(triProgram, triVert);
  gl.attachShader(triProgram, triFrag);
  gl.linkProgram(triProgram);
  const triPosAttr = gl.getAttribLocation(triProgram, 'a_pos');
  const triColorAttr = gl.getAttribLocation(triProgram, 'a_color');
  const triAlphaLoc = gl.getUniformLocation(triProgram, 'u_alpha')!;
  const triBuffer = gl.createBuffer();

  // Uniform locations
  const uniforms: Record<string, WebGLUniformLocation> = {
    u_resolution: gl.getUniformLocation(program, 'u_resolution')!,
    u_box_size: gl.getUniformLocation(program, 'u_box_size')!,
    u_radius: gl.getUniformLocation(program, 'u_radius')!,
    u_mat: gl.getUniformLocation(program, 'u_mat')!,
    u_mat_inv: gl.getUniformLocation(program, 'u_mat_inv')!,
    u_zoom: gl.getUniformLocation(program, 'u_zoom')!,
    u_mode: gl.getUniformLocation(program, 'u_mode')!,
    u_invert: gl.getUniformLocation(program, 'u_invert')!,
    u_show_front: gl.getUniformLocation(program, 'u_show_front')!,
    u_show_back: gl.getUniformLocation(program, 'u_show_back')!,
    u_front_width: gl.getUniformLocation(program, 'u_front_width')!,
    u_back_width: gl.getUniformLocation(program, 'u_back_width')!,
    u_front_dashed: gl.getUniformLocation(program, 'u_front_dashed')!,
    u_back_dashed: gl.getUniformLocation(program, 'u_back_dashed')!,
    u_front_color: gl.getUniformLocation(program, 'u_front_color')!,
    u_back_color: gl.getUniformLocation(program, 'u_back_color')!,
  };

  return {
    gl,
    overlayCtx,
    canvasGL,
    canvasOverlay,
    width: size,
    height: size,
    program,
    uniforms,
    posBuffer,
    posAttr,
    triProgram,
    triPosAttr,
    triColorAttr,
    triAlphaLoc,
    triBuffer,
  };
}

const EDGE_TOPOLOGY: { edge: [number, number]; normalA: Vec3; normalB: Vec3 }[] = [
  // Bottom face 4 edges (z=0)
  { edge: [0, 1], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 0, y: -1, z: 0 } },
  { edge: [1, 4], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 1, y: 0, z: 0 } },
  { edge: [4, 2], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 0, y: 1, z: 0 } },
  { edge: [2, 0], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: -1, y: 0, z: 0 } },

  // Top face 4 edges (z=1)
  { edge: [3, 5], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 0, y: -1, z: 0 } },
  { edge: [5, 7], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 1, y: 0, z: 0 } },
  { edge: [7, 6], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 0, y: 1, z: 0 } },
  { edge: [6, 3], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: -1, y: 0, z: 0 } },

  // 4 vertical pillar edges
  { edge: [0, 3], normalA: { x: -1, y: 0, z: 0 }, normalB: { x: 0, y: -1, z: 0 } },
  { edge: [1, 5], normalA: { x: 1, y: 0, z: 0 }, normalB: { x: 0, y: -1, z: 0 } },
  { edge: [4, 7], normalA: { x: 1, y: 0, z: 0 }, normalB: { x: 0, y: 1, z: 0 } },
  { edge: [2, 6], normalA: { x: -1, y: 0, z: 0 }, normalB: { x: 0, y: 1, z: 0 } },
];

function draw12Edges(
  ctx: CanvasRenderingContext2D,
  scale: number,
  center: Vec2,
  cam: CameraConfig,
  box: BoxConfig,
  style: EdgeStyleConfig,
): void {
  if (!style.showFront && !style.showBack) return;

  const project = (p: Vec3) => project3D(p, scale, center, cam, box);

  const verts3: Vec3[] = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 0, z: 1 },
    { x: 0, y: 1, z: 1 },
    { x: 1, y: 1, z: 1 },
  ];

  const verts2d = verts3.map(project);

  const isNormFront = (n: Vec3) => {
    const c0 = transform3D({ x: 0.5, y: 0.5, z: 0.5 }, cam, box);
    const c1 = transform3D({ x: 0.5 + n.x * 0.1, y: 0.5 + n.y * 0.1, z: 0.5 + n.z * 0.1 }, cam, box);
    return (c1.z - c0.z) > 0;
  };

  ctx.save();

  // 1. Back Edges (Straight 12 Wireframe)
  if (style.showBack) {
    ctx.lineWidth = style.backWidth;
    if (style.backDashed) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);
    ctx.strokeStyle = style.backColor;
    ctx.globalAlpha = style.backOpacity;

    for (const item of EDGE_TOPOLOGY) {
      const isFront = isNormFront(item.normalA) || isNormFront(item.normalB);
      if (!isFront) {
        const [a, b] = item.edge;
        ctx.beginPath();
        ctx.moveTo(verts2d[a].x, verts2d[a].y);
        ctx.lineTo(verts2d[b].x, verts2d[b].y);
        ctx.stroke();
      }
    }
  }

  // 2. Front Edges (Straight 12 Wireframe)
  if (style.showFront) {
    ctx.lineWidth = style.frontWidth;
    if (style.frontDashed) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);
    ctx.strokeStyle = style.frontColor;
    ctx.globalAlpha = style.frontOpacity;

    for (const item of EDGE_TOPOLOGY) {
      const isFront = isNormFront(item.normalA) || isNormFront(item.normalB);
      if (isFront) {
        const [a, b] = item.edge;
        ctx.beginPath();
        ctx.moveTo(verts2d[a].x, verts2d[a].y);
        ctx.lineTo(verts2d[b].x, verts2d[b].y);
        ctx.stroke();
      }
    }
  }

  ctx.restore();
}

export function renderRoundedBox(
  rc: WebGLRenderContext,
  cam: CameraConfig,
  box: BoxConfig,
  mode: ColorMode,
  invert: boolean,
  guides: GuideVisibility,
  edgeStyle: EdgeStyleConfig,
  dotValues: Vec3,
  dotVisible: boolean,
  svAnchor: Vec3 | null,
  svMix: { a: number; b: number; g: number } | null,
  svShow: boolean,
  svReveal: number,
  ring: RingState | null,
  cubeSat: CubeSatState | null,
  alpha: number,
): void {
  const { gl, overlayCtx, width, height, program, uniforms } = rc;
  const dpr = window.devicePixelRatio || 1;

  // 1. Render 3D Rounded Bevel Box via GPU Raymarching
  gl.viewport(0, 0, width * dpr, height * dpr);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
  gl.uniform2f(uniforms.u_resolution, width * dpr, height * dpr);
  gl.uniform3f(uniforms.u_box_size, box.sizeX, box.sizeY, box.sizeZ);
  gl.uniform1f(uniforms.u_radius, box.radius !== undefined ? box.radius : 0.001);
  // WebGL1 requires transpose=false, so pass matrices as column-major data
  // (GLSL mat3(m0..m8) fills columns from the array in order).
  // For a rotation matrix, inverse = transpose:
  //   u_mat     (local -> cam) = column-major of row-major cam.mat  -> [m0,m3,m6, m1,m4,m7, m2,m5,m8]
  //   u_mat_inv (cam -> local) = column-major of cam.matᵀ           -> [m0,m1,m2, m3,m4,m5, m6,m7,m8]
  const m = cam.mat;
  gl.uniformMatrix3fv(uniforms.u_mat, false, new Float32Array([
    m[0], m[3], m[6],
    m[1], m[4], m[7],
    m[2], m[5], m[8],
  ]));
  gl.uniformMatrix3fv(uniforms.u_mat_inv, false, new Float32Array([
    m[0], m[1], m[2],
    m[3], m[4], m[5],
    m[6], m[7], m[8],
  ]));
  gl.uniform1f(uniforms.u_zoom, cam.zoom || 1.0);
  gl.uniform1i(uniforms.u_mode, mode === 'rgb' ? 0 : mode === 'hsb' ? 1 : 2);
  gl.uniform1i(uniforms.u_invert, invert ? 1 : 0);

  // 12 Edges GPU parameters
  gl.uniform1i(uniforms.u_show_front, edgeStyle.showFront ? 1 : 0);
  gl.uniform1i(uniforms.u_show_back, edgeStyle.showBack ? 1 : 0);
  gl.uniform1f(uniforms.u_front_width, edgeStyle.frontWidth || 1.5);
  gl.uniform1f(uniforms.u_back_width, edgeStyle.backWidth || 1.0);
  gl.uniform1i(uniforms.u_front_dashed, edgeStyle.frontDashed ? 1 : 0);
  gl.uniform1i(uniforms.u_back_dashed, edgeStyle.backDashed ? 1 : 0);
  gl.uniform4f(uniforms.u_front_color, 1.0, 1.0, 1.0, edgeStyle.frontOpacity || 0.65);
  gl.uniform4f(uniforms.u_back_color, 1.0, 1.0, 1.0, edgeStyle.backOpacity || 0.25);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // Projected saturation triangle (shared by the GL gradient fill and the 2D overlay).
  // Revealed on demand: guides.svTriangle is the feature switch, svShow is the Ctrl / Cmd modifier.
  const scale = width * 0.36;
  const center: Vec2 = { x: width * 0.5, y: height * 0.5 };
  let svTri: SaturationTriangle | null = null;
  let svAxis: SaturationTriangle | null = null; // degenerate (gray/white/black): just the W–K gray axis
  // Compute while shown (Ctrl held) or while the fold animation is still playing back.
  const svVisible = svShow || svReveal > 0.001;
  if (guides.svTriangle && svVisible) {
    const tri = projectSaturationTriangle(svAnchor || dotValues, mode, scale, center, cam, box);
    // Degenerate triangles (gray / white / black current color → C lies on the W–K edge) collapse
    // to the W–K gray axis, which we still draw so the axis stays discoverable.
    const area = Math.abs((tri.w.x - tri.c.x) * (tri.k.y - tri.c.y) - (tri.w.y - tri.c.y) * (tri.k.x - tri.c.x));
    if (area > 4) svTri = tri;
    else svAxis = tri;
  }
  // Reveal animation: unfold the triangle from its C vertex (the current color point) on show,
  // fold back on hide. Opaque scaling (no blending), so it stays crisp over the box.
  const svScale = svReveal < 0.5 ? 2 * svReveal * svReveal : 1 - Math.pow(-2 * svReveal + 2, 2) / 2; // easeInOutQuad
  if (svTri && svScale < 0.01) svTri = null; // fully collapsed: skip the GL fill

  // 1.5 Saturation Triangle Gradient Fill (exact Gouraud shading on the GPU):
  // vertex colors C / white / black, so each pixel shows the true mix a·C + b·white + g·black —
  // the PS-style gradient from the current color toward white and toward black.
  if (svTri) {
    const toClip = (p: Vec2): [number, number] => [
      (p.x / width) * 2 - 1,
      1 - (p.y / height) * 2,
    ];
    // Scale W / K toward the fixed C vertex by the reveal progress (C stays at the current color)
    const tri = svTri;
    const lerpTo = (p: Vec2): Vec2 => ({
      x: tri.c.x + (p.x - tri.c.x) * svScale,
      y: tri.c.y + (p.y - tri.c.y) * svScale,
    });
    const c = toClip(tri.c);
    const w = toClip(lerpTo(tri.w));
    const k = toClip(lerpTo(tri.k));
    gl.useProgram(rc.triProgram);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, rc.triBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      c[0], c[1], tri.cRGB.x, tri.cRGB.y, tri.cRGB.z,
      w[0], w[1], 1, 1, 1,
      k[0], k[1], 0, 0, 0,
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(rc.triPosAttr);
    gl.vertexAttribPointer(rc.triPosAttr, 2, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(rc.triColorAttr);
    gl.vertexAttribPointer(rc.triColorAttr, 3, gl.FLOAT, false, 20, 8);
    gl.uniform1f(rc.triAlphaLoc, 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.disable(gl.BLEND);
    // Restore the main raymarching program + its quad attribute state for the next frame.
    // a_pos and position often share attribute location 0, so re-enable + re-point it explicitly
    // (otherwise the box quad loses its position data and stops rendering from the next frame on).
    gl.useProgram(program);
    gl.enableVertexAttribArray(rc.posAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, rc.posBuffer);
    gl.vertexAttribPointer(rc.posAttr, 2, gl.FLOAT, false, 0, 0);
  }

  // 2. Render 2D Overlay (12 Edges, Spatial Guides & Pick Dot)
  overlayCtx.save();
  overlayCtx.clearRect(0, 0, width, height);

  // 2.1 Draw 12 Cube Edges & Corner Arcs (Crisp 2D Vector)
  draw12Edges(overlayCtx, scale, center, cam, box, edgeStyle);

  // 2.2 Draw Spatial Guides
  drawGuides(overlayCtx, scale, center, cam, box, guides);

  // 2.2b Saturation Triangle overlay — edges, vertex markers & position marker on top of the
  // GL gradient fill. The fill itself is GPU Gouraud-shaded (see 1.5); here we only outline the
  // triangle and mark its vertices so it reads as an interactive picker surface.
  // Degenerate colors (gray / white / black) fall back to the W–K gray axis line.
  if (svAxis) {
    const tri = svAxis;
    overlayCtx.save();
    overlayCtx.globalAlpha = svReveal;
    overlayCtx.beginPath();
    overlayCtx.moveTo(tri.k.x, tri.k.y);
    overlayCtx.lineTo(tri.w.x, tri.w.y);
    overlayCtx.strokeStyle = 'rgba(107, 114, 128, 0.7)';
    overlayCtx.lineWidth = 1.2;
    overlayCtx.setLineDash([5, 4]);
    overlayCtx.stroke();
    overlayCtx.setLineDash([]);
    overlayCtx.restore();
  }
  if (svTri) {
    // Same unfold scaling as the GL fill, so edges / dots / marker stay glued to the gradient
    const tri = svTri;
    const lerpTo = (p: Vec2): Vec2 => ({
      x: tri.c.x + (p.x - tri.c.x) * svScale,
      y: tri.c.y + (p.y - tri.c.y) * svScale,
    });
    const w = lerpTo(tri.w);
    const k = lerpTo(tri.k);
    const cr = Math.round(tri.cRGB.x * 255);
    const cg = Math.round(tri.cRGB.y * 255);
    const cb = Math.round(tri.cRGB.z * 255);

    overlayCtx.save();
    overlayCtx.globalAlpha = svReveal;
    overlayCtx.beginPath();
    overlayCtx.moveTo(tri.c.x, tri.c.y);
    overlayCtx.lineTo(w.x, w.y);
    overlayCtx.lineTo(k.x, k.y);
    overlayCtx.closePath();
    overlayCtx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.7)`;
    overlayCtx.lineWidth = 1.2;
    overlayCtx.setLineDash([]);
    overlayCtx.stroke();

      // Vertex markers: white corner (white fill + dark ring), black corner (dark fill + light ring)
      overlayCtx.beginPath();
      overlayCtx.arc(w.x, w.y, 3.5, 0, Math.PI * 2);
      overlayCtx.fillStyle = '#ffffff';
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(17, 24, 39, 0.6)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();

      overlayCtx.beginPath();
      overlayCtx.arc(k.x, k.y, 3.5, 0, Math.PI * 2);
      overlayCtx.fillStyle = '#111827';
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();

      // Position marker: the current color's mix (a·C + b·W + g·K) inside the anchored triangle.
      // It follows the pointer while dragging and rests at the final position after release.
      if (svMix) {
        const mx = svMix.a * tri.c.x + svMix.b * w.x + svMix.g * k.x;
        const my = svMix.a * tri.c.y + svMix.b * w.y + svMix.g * k.y;
        overlayCtx.beginPath();
        overlayCtx.arc(mx, my, 4, 0, Math.PI * 2);
        overlayCtx.fillStyle = '#ffffff';
        overlayCtx.fill();
        overlayCtx.strokeStyle = 'rgba(17, 24, 39, 0.75)';
        overlayCtx.lineWidth = 1.4;
        overlayCtx.stroke();
      }

      overlayCtx.restore();
  }

  // Contrast-aware outline for the pick dot / center plate: a dark ring on light colors and a
  // light ring on dark colors, so the indicator stays visible at ANY color — including the
  // default white (a white dot with a white ring would vanish into the white corner).
  const outlineFor = (r: number, g: number, b: number): string => {
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 140 ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.95)';
  };

  // 2.2 Draw Pick Dot
  // Skipped while the triangle marker, rings, or 3D Cube SAT is active
  if (dotVisible && !svMix && !ring && (!cubeSat || cubeSat.reveal <= 0.01)) {
    const dotPos = project3D(dotValues, scale, center, cam, box);
    const rgb = valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } : rgb;

    // The dot always shows the current color itself with a crisp white ring and outline
    overlayCtx.beginPath();
    overlayCtx.arc(dotPos.x, dotPos.y, 9, 0, Math.PI * 2);
    overlayCtx.fillStyle = alpha < 1
      ? `rgba(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b}, ${alpha})`
      : `rgb(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b})`;
    overlayCtx.fill();
    overlayCtx.lineWidth = 2.5;
    overlayCtx.strokeStyle = '#ffffff';
    overlayCtx.stroke();
    overlayCtx.lineWidth = 1;
    overlayCtx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
    overlayCtx.stroke();
  }

  // 2.3 Alpha / Saturation rings (pressed pick dot): inner = saturation (HSV S), outer = alpha.
  // Rotation around the anchor sets the value (0 at 12 o'clock, clockwise); the pointer's
  // radial band picks the active ring (highlighted). Rings scale in with the reveal animation.
  if (ring && ring.reveal > 0.01) {
    const anchorPt = ring.anchor;
    const ease = ring.reveal < 0.5 ? 2 * ring.reveal * ring.reveal : 1 - Math.pow(-2 * ring.reveal + 2, 2) / 2;
    const cR = RING_CENTER_R * ease;                                     // center color-plate radius
    const rSat = (RING_CENTER_R + RING_INNER_GAP + RING_W / 2) * ease;   // INNER ring = saturation band center
    const rAlp = (RING_CENTER_R + RING_INNER_GAP + RING_W + RING_MID_GAP + RING_W / 2) * ease; // OUTER ring = alpha band center
    const wRing = RING_W * ease;                                         // both bands share the same width
    const rgb = valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } : rgb;
    const start = -Math.PI / 2; // 12 o'clock = 0%

    overlayCtx.save();
    // Fade in / out with the reveal: the whole widget (rings, knob, labels, band edges)
    // fades from 0 to 1 opacity as it unfolds, and back to 0 as it folds.
    overlayCtx.globalAlpha = ease;

    // Fine dot-grid texture across the band — the "transparent" indicator, matching the
    // reference slider look (dotted track with the solid fill up to the current value).
    const dotBand = (r: number, w: number) => {
      overlayCtx.save();
      overlayCtx.beginPath();
      overlayCtx.arc(anchorPt.x, anchorPt.y, r + w / 2, 0, Math.PI * 2);
      overlayCtx.arc(anchorPt.x, anchorPt.y, Math.max(0.5, r - w / 2), 0, Math.PI * 2, true);
      overlayCtx.closePath();
      overlayCtx.clip();
      const step = 7;
      const rr = r + w / 2;
      overlayCtx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      for (let gy = -rr; gy < rr; gy += step) {
        for (let gx = -rr; gx < rr; gx += step) {
          overlayCtx.beginPath();
          overlayCtx.arc(anchorPt.x + gx, anchorPt.y + gy, 1.8, 0, Math.PI * 2);
          overlayCtx.fill();
        }
      }
      overlayCtx.restore();
    };

    // Band edges (inner + outer circle outlines) — the active ring gets a bright outline
    const bandEdges = (r: number, w: number, active: boolean) => {
      overlayCtx.lineWidth = active ? 1.8 : 1;
      overlayCtx.strokeStyle = active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.4)';
      for (const rr of [r - w / 2, r + w / 2]) {
        if (rr <= 0) continue;
        overlayCtx.beginPath();
        overlayCtx.arc(anchorPt.x, anchorPt.y, rr, 0, Math.PI * 2);
        overlayCtx.stroke();
      }
    };

    // Thumb knob (shared by both rings) — matches the reference handles: a white outer ring
    // with a solid white center dot, plus a thin dark outline so it reads on any background.
    const thumbKnob = (x: number, y: number) => {
      overlayCtx.beginPath();
      overlayCtx.arc(x, y, 8.5, 0, Math.PI * 2);
      overlayCtx.fillStyle = '#ffffff';
      overlayCtx.fill();
      overlayCtx.lineWidth = 2;
      overlayCtx.strokeStyle = '#ffffff';
      overlayCtx.stroke();
      overlayCtx.lineWidth = 1;
      overlayCtx.strokeStyle = 'rgba(15, 23, 42, 0.55)';
      overlayCtx.stroke();
      overlayCtx.beginPath();
      overlayCtx.arc(x, y, 3, 0, Math.PI * 2);
      overlayCtx.fillStyle = '#ffffff';
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
      overlayCtx.lineWidth = 0.8;
      overlayCtx.stroke();
    };

    // INNER ring — SATURATION: a linear ramp like the classic saturation slider — white at
    // 12 o'clock, the anchor color at 6 o'clock, black at 3 o'clock (hue preserved), hugging
    // the center color. Dragging around it sets the color to the ring color at the pointer
    // angle; a marker dot shows the current position on the ring.
    const anchorValues = ring.colorAnchor || dotValues;
    const anchorRgb = valuesToRgb(anchorValues, mode);
    const nSeg = 72;
    const segStep = (Math.PI * 2) / nSeg;
    for (let i = 0; i < nSeg; i++) {
      const a0 = start + i * segStep;
      const col = ringColorAt(anchorRgb, i * segStep);
      overlayCtx.beginPath();
      overlayCtx.arc(anchorPt.x, anchorPt.y, rSat, a0, a0 + segStep + 0.012); // tiny overlap hides seam gaps
      overlayCtx.lineWidth = wRing;
      overlayCtx.lineCap = 'butt';
      overlayCtx.strokeStyle = `rgb(${col.r}, ${col.g}, ${col.b})`;
      overlayCtx.stroke();
    }
    // Thumb knob at the current saturation position (same style as the alpha ring's knob).
    const mkx = anchorPt.x + rSat * Math.sin(ring.angle);
    const mky = anchorPt.y - rSat * Math.cos(ring.angle);
    thumbKnob(mkx, mky);
    bandEdges(rSat, wRing, ring.band === 'sat');

    // OUTER ring — ALPHA: dotted track (the transparent indicator) with the value arc drawn
    // as the SOLID color up to the current alpha — exactly the reference slider look. The
    // center plate shows the actual translucency; a thumb knob marks the current value.
    dotBand(rAlp, wRing);
    const alphaEnd = start + alpha * Math.PI * 2;
    if (alpha > 0.001) {
      overlayCtx.beginPath();
      overlayCtx.arc(anchorPt.x, anchorPt.y, rAlp, start, alphaEnd);
      overlayCtx.lineWidth = wRing;
      overlayCtx.strokeStyle = `rgb(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b})`;
      overlayCtx.stroke();
      // Thumb knob at the arc end (like the reference slider): a color ring with a white core
      // and a small color dot, outlined for contrast — marks the current alpha position.
      // alphaEnd is a canvas angle (0 = 3 o'clock, y down), so x uses cos and y uses +sin.
      const kx = anchorPt.x + rAlp * Math.cos(alphaEnd);
      const ky = anchorPt.y + rAlp * Math.sin(alphaEnd);
      thumbKnob(kx, ky);
    }
    bandEdges(rAlp, wRing, ring.band === 'alpha');

    // Center circle — the current color at its alpha over the box (the enlarged pick
    // indicator): it updates live as the rings change, and shows translucency by letting the
    // box show through — no checkerboard pattern in the middle.
    overlayCtx.beginPath();
    overlayCtx.arc(anchorPt.x, anchorPt.y, cR, 0, Math.PI * 2);
    overlayCtx.fillStyle = alpha < 1
      ? `rgba(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b}, ${alpha})`
      : `rgb(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b})`;
    overlayCtx.fill();
    overlayCtx.strokeStyle = outlineFor(finalRgb.r, finalRgb.g, finalRgb.b);
    overlayCtx.lineWidth = 2;
    overlayCtx.stroke();

    overlayCtx.restore();
  }

  // 2.4 3D Cube SAT Popup Rendering (Matches reference: 3D cube with isometric faces, icons & arrows)
  if (cubeSat && cubeSat.reveal > 0.001) {
    overlayCtx.save();
    const progress = easeInOutQuad(cubeSat.reveal);
    overlayCtx.globalAlpha = progress;

    const baseSize = cubeSat.size || 140;
    const s = baseSize * (0.65 + 0.35 * progress);
    // Configurable compact Alpha Orbital Ring radius and thickness:
    const rAlpha = s * (cubeSat.alphaRingRadius || 0.92);
    const wAlpha = cubeSat.alphaRingWidth || 16;

    let ax = cubeSat.anchor.x;
    let ay = cubeSat.anchor.y;
    const safeMargin = rAlpha + wAlpha / 2 + 10;
    ax = Math.max(safeMargin, Math.min(width - safeMargin, ax));
    ay = Math.max(safeMargin, Math.min(height - safeMargin, ay));

    // 3D Rotated Perspective for the Cube SAT matching 3d cube sat.png:
    // Configurable pitch and yaw (default Yaw = -33°, Pitch = 19°)
    const pitchVal = cubeSat.pitchDeg !== undefined ? cubeSat.pitchDeg : 19;
    const yawVal = cubeSat.yawDeg !== undefined ? cubeSat.yawDeg : -33;
    const radYaw = yawVal * Math.PI / 180;
    const radPitch = pitchVal * Math.PI / 180;
    const cy = Math.cos(radYaw), sy = Math.sin(radYaw);
    const cp = Math.cos(radPitch), sp = Math.sin(radPitch);
    const shape = cubeSat.shape || 'cube';
    const isPyramid = shape === 'pyramid';
    const isPyramidInv = shape === 'pyramid_inverted';
    const isCylinder = shape === 'cylinder';
    const isCuboid = shape === 'cuboid';

    const scaleX = isCuboid ? 1.35 : 1.0;
    const scaleY = isCuboid ? 0.72 : 1.0;
    const scaleZ = isCuboid ? 1.0 : 1.0;

    // 3D projection function from unit bounding box to screen (ax, ay)
    const proj3D = (px: number, py: number, pz: number): Vec2 => {
      const x0 = px * scaleX, y0 = py * scaleY, z0 = pz * scaleZ;
      const x1 = x0 * cy + z0 * sy;
      const y1 = y0;
      const z1 = -x0 * sy + z0 * cy;
      const x2 = x1;
      const y2 = y1 * cp - z1 * sp;
      return {
        x: ax + x2 * s * 0.44,
        y: ay - y2 * s * 0.44, // Invert Y for canvas
      };
    };

    // 8 True 3D Vertices for a Regular Cube (X in [-1, 1], Y in [-1, 1], Z in [-1, 1]):
    const ApexTop    = proj3D( 0,  1.35,  0); // Pyramid Top Apex
    const ApexBottom = proj3D( 0, -1.35,  0); // Inverted Pyramid Bottom Apex
    const T_back  = proj3D(-1,  1, -1);
    const T_left  = proj3D(-1,  1,  1);
    const T_right = proj3D( 1,  1, -1);
    const T_front = proj3D( 1,  1,  1);

    const B_back  = proj3D(-1, -1, -1);
    const B_left  = proj3D(-1, -1,  1);
    const B_right = proj3D( 1, -1, -1);
    const B_front = proj3D( 1, -1,  1);

    const tempRange = cubeSat.temperatureRange !== undefined ? cubeSat.temperatureRange : 35;
    const baseCol = valuesToRgb(cubeSat.colorAnchor, mode);
    const baseHsb = rgbToHsb(baseCol);
    const warmCol = hsbToRgb({ h: (baseHsb.h + tempRange) % 360, s: baseHsb.s, b: baseHsb.b });

    if (isPyramid) {
      // ── 1. PYRAMID (正金字塔四棱锥: 顶部 Apex + 底部三面展开) ──
      const gradPyrL = overlayCtx.createLinearGradient(B_left.x, B_left.y, B_front.x, B_front.y);
      gradPyrL.addColorStop(0, '#000000');
      gradPyrL.addColorStop(1, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);

      overlayCtx.beginPath();
      overlayCtx.moveTo(ApexTop.x, ApexTop.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.lineTo(B_left.x, B_left.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradPyrL;
      overlayCtx.fill();

      const gradPyrR = overlayCtx.createLinearGradient(B_front.x, B_front.y, B_right.x, B_right.y);
      gradPyrR.addColorStop(0, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
      gradPyrR.addColorStop(1, '#ffffff');

      overlayCtx.beginPath();
      overlayCtx.moveTo(ApexTop.x, ApexTop.y);
      overlayCtx.lineTo(B_right.x, B_right.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradPyrR;
      overlayCtx.fill();

      const gradPyrDepth = overlayCtx.createLinearGradient(ApexTop.x, ApexTop.y, B_front.x, B_front.y);
      gradPyrDepth.addColorStop(0, `rgba(${warmCol.r}, ${warmCol.g}, ${warmCol.b}, 0.6)`);
      gradPyrDepth.addColorStop(0.3, 'rgba(0, 0, 0, 0)');
      gradPyrDepth.addColorStop(1, 'rgba(20, 20, 20, 0.6)');

      overlayCtx.beginPath();
      overlayCtx.moveTo(ApexTop.x, ApexTop.y);
      overlayCtx.lineTo(B_right.x, B_right.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.lineTo(B_left.x, B_left.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradPyrDepth;
      overlayCtx.fill();

      overlayCtx.beginPath();
      overlayCtx.moveTo(ApexTop.x, ApexTop.y);
      overlayCtx.lineTo(B_left.x, B_left.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.lineTo(B_right.x, B_right.y);
      overlayCtx.lineTo(ApexTop.x, ApexTop.y);
      overlayCtx.moveTo(ApexTop.x, ApexTop.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();
    } else if (isPyramidInv) {
      // ── 2. INVERTED PYRAMID (倒金字塔四棱锥: 顶部平顶基座 + 底部尖顶 Apex) ──
      // Top Quad Base (Temperature Face): T_back -> T_right -> T_front -> T_left
      const gradTop = overlayCtx.createLinearGradient(T_front.x, T_front.y, T_back.x, T_back.y);
      gradTop.addColorStop(0, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
      gradTop.addColorStop(1, `rgb(${warmCol.r}, ${warmCol.g}, ${warmCol.b})`);

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_back.x, T_back.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_left.x, T_left.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradTop;
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      overlayCtx.lineWidth = 1;
      overlayCtx.stroke();

      // Left Inverted Face: (T_left -> T_front -> ApexBottom)
      const gradInvL = overlayCtx.createLinearGradient(T_left.x, T_left.y, T_front.x, T_front.y);
      gradInvL.addColorStop(0, '#000000');
      gradInvL.addColorStop(1, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_left.x, T_left.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(ApexBottom.x, ApexBottom.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradInvL;
      overlayCtx.fill();

      // Right Inverted Face: (T_front -> T_right -> ApexBottom)
      const gradInvR = overlayCtx.createLinearGradient(T_front.x, T_front.y, T_right.x, T_right.y);
      gradInvR.addColorStop(0, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
      gradInvR.addColorStop(1, '#ffffff');

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(ApexBottom.x, ApexBottom.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradInvR;
      overlayCtx.fill();

      // Vertical Shading down to bottom apex
      const gradInvDepth = overlayCtx.createLinearGradient(T_front.x, T_front.y, ApexBottom.x, ApexBottom.y);
      gradInvDepth.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradInvDepth.addColorStop(1, 'rgba(20, 20, 20, 0.7)');

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_left.x, T_left.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(ApexBottom.x, ApexBottom.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradInvDepth;
      overlayCtx.fill();

      // Outlines
      overlayCtx.beginPath();
      overlayCtx.moveTo(T_left.x, T_left.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(ApexBottom.x, ApexBottom.y);
      overlayCtx.lineTo(T_left.x, T_left.y);
      overlayCtx.moveTo(T_front.x, T_front.y);
      overlayCtx.lineTo(ApexBottom.x, ApexBottom.y);
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();
    } else if (isCylinder) {
      // ── 3. CYLINDER (3D 圆柱体: 顶部圆盘色温 + 弧形圆柱侧壁渐变) ──
      const nSteps = 32;
      const topPts: Vec2[] = [];
      const botPts: Vec2[] = [];
      for (let i = 0; i < nSteps; i++) {
        const theta = (i / nSteps) * Math.PI * 2;
        topPts.push(proj3D(Math.cos(theta),  1, Math.sin(theta)));
        botPts.push(proj3D(Math.cos(theta), -1, Math.sin(theta)));
      }

      // Cylinder Side Body
      // Leftmost and rightmost visual edge points:
      const pLeftT = proj3D(-1,  1, 0), pLeftB = proj3D(-1, -1, 0);
      const pRightT = proj3D( 1,  1, 0), pRightB = proj3D( 1, -1, 0);
      const pFrontT = proj3D( 0,  1, 1), pFrontB = proj3D( 0, -1, 1);

      const gradCyl = overlayCtx.createLinearGradient(pLeftT.x, pLeftT.y, pRightT.x, pRightT.y);
      gradCyl.addColorStop(0, '#000000');
      gradCyl.addColorStop(0.5, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
      gradCyl.addColorStop(1, '#ffffff');

      overlayCtx.beginPath();
      overlayCtx.moveTo(topPts[0].x, topPts[0].y);
      for (let i = 1; i < nSteps; i++) overlayCtx.lineTo(topPts[i].x, topPts[i].y);
      overlayCtx.lineTo(botPts[0].x, botPts[0].y);
      for (let i = nSteps - 1; i >= 0; i--) overlayCtx.lineTo(botPts[i].x, botPts[i].y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradCyl;
      overlayCtx.fill();

      // Cylinder Side Shading (downwards)
      const gradCylDepth = overlayCtx.createLinearGradient(pFrontT.x, pFrontT.y, pFrontB.x, pFrontB.y);
      gradCylDepth.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradCylDepth.addColorStop(0.5, 'rgba(128, 128, 128, 0.15)');
      gradCylDepth.addColorStop(1, 'rgba(20, 20, 20, 0.6)');

      overlayCtx.beginPath();
      overlayCtx.moveTo(topPts[0].x, topPts[0].y);
      for (let i = 1; i < nSteps; i++) overlayCtx.lineTo(topPts[i].x, topPts[i].y);
      overlayCtx.lineTo(botPts[0].x, botPts[0].y);
      for (let i = nSteps - 1; i >= 0; i--) overlayCtx.lineTo(botPts[i].x, botPts[i].y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradCylDepth;
      overlayCtx.fill();

      // Cylinder Top Disc (Temperature Gradient)
      const pBackT = proj3D(0, 1, -1);
      const gradTopDisc = overlayCtx.createLinearGradient(pFrontT.x, pFrontT.y, pBackT.x, pBackT.y);
      gradTopDisc.addColorStop(0, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
      gradTopDisc.addColorStop(1, `rgb(${warmCol.r}, ${warmCol.g}, ${warmCol.b})`);

      overlayCtx.beginPath();
      overlayCtx.moveTo(topPts[0].x, topPts[0].y);
      for (let i = 1; i < nSteps; i++) overlayCtx.lineTo(topPts[i].x, topPts[i].y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradTopDisc;
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();

      // Cylinder Outer Silhouettes
      overlayCtx.beginPath();
      overlayCtx.moveTo(pLeftT.x, pLeftT.y);
      overlayCtx.lineTo(pLeftB.x, pLeftB.y);
      overlayCtx.moveTo(pRightT.x, pRightT.y);
      overlayCtx.lineTo(pRightB.x, pRightB.y);
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();
    } else {
      // ── 4. CUBE & CUBOID (正方体 / 长方体) ──
      // 1. Top Face: Temperature Gradient
      const gradTop = overlayCtx.createLinearGradient(T_front.x, T_front.y, T_back.x, T_back.y);
      gradTop.addColorStop(0, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
      gradTop.addColorStop(1, `rgb(${warmCol.r}, ${warmCol.g}, ${warmCol.b})`);

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_back.x, T_back.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_left.x, T_left.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradTop;
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      overlayCtx.lineWidth = 1;
      overlayCtx.stroke();

      // 2 & 3. Unified Seamless SAT Faces
      const gradSat = overlayCtx.createLinearGradient(T_left.x, T_left.y, T_right.x, T_right.y);
      gradSat.addColorStop(0, '#000000');                                         // Leftmost: Pure Black
      gradSat.addColorStop(0.5, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`); // Center: Pure Vibrant Base Color
      gradSat.addColorStop(1, '#ffffff');                                         // Rightmost: Pure White

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_left.x, T_left.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(B_right.x, B_right.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.lineTo(B_left.x, B_left.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradSat;
      overlayCtx.fill();

      // Vertical shading gradient from top to bottom
      const gradDepth = overlayCtx.createLinearGradient(T_front.x, T_front.y, B_front.x, B_front.y);
      gradDepth.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradDepth.addColorStop(0.5, 'rgba(128, 128, 128, 0.18)');
      gradDepth.addColorStop(1, 'rgba(30, 30, 30, 0.55)');

      overlayCtx.beginPath();
      overlayCtx.moveTo(T_left.x, T_left.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(B_right.x, B_right.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.lineTo(B_left.x, B_left.y);
      overlayCtx.closePath();
      overlayCtx.fillStyle = gradDepth;
      overlayCtx.fill();

      // Outline for seamless faces
      overlayCtx.beginPath();
      overlayCtx.moveTo(T_left.x, T_left.y);
      overlayCtx.lineTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.lineTo(B_right.x, B_right.y);
      overlayCtx.lineTo(B_front.x, B_front.y);
      overlayCtx.lineTo(B_left.x, B_left.y);
      overlayCtx.lineTo(T_left.x, T_left.y);
      overlayCtx.closePath();
      overlayCtx.moveTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_left.x, T_left.y);
      overlayCtx.moveTo(T_front.x, T_front.y);
      overlayCtx.lineTo(T_right.x, T_right.y);
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();
    }

    // ── 4. Complete 360° Alpha Ring (Full Circle with Integrated Checkerboard Texture) ──
    const start = -Math.PI / 2; // 12 o'clock
    const activeRgb = cubeSat.currentColor || valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - activeRgb.r, g: 255 - activeRgb.g, b: 255 - activeRgb.b } : activeRgb;

    overlayCtx.save();

    // 1. Checkerboard Background texture precisely clipped inside the full ring band
    overlayCtx.save();
    overlayCtx.beginPath();
    overlayCtx.arc(ax, ay, rAlpha + wAlpha / 2, 0, Math.PI * 2);
    overlayCtx.arc(ax, ay, Math.max(0.5, rAlpha - wAlpha / 2), 0, Math.PI * 2, true);
    overlayCtx.closePath();
    overlayCtx.clip();

    // Fill ring background white
    overlayCtx.fillStyle = '#ffffff';
    overlayCtx.fill();

    // Draw checkerboard tiles inside the clipped ring
    const checkStep = cubeSat.checkerSize || 4;
    const rr = rAlpha + wAlpha / 2;
    overlayCtx.fillStyle = '#cbd5e1';
    for (let gy = ay - rr; gy < ay + rr; gy += checkStep * 2) {
      for (let gx = ax - rr; gx < ax + rr; gx += checkStep * 2) {
        overlayCtx.fillRect(gx, gy, checkStep, checkStep);
        overlayCtx.fillRect(gx + checkStep, gy + checkStep, checkStep, checkStep);
      }
    }
    overlayCtx.restore();

    // 2. Smooth Transparency Ramp: 0% at 12 o'clock -> 100% clockwise around the full circle
    const nSegs = 72;
    const segStep = (Math.PI * 2) / nSegs;
    for (let i = 0; i < nSegs; i++) {
      const a0 = start + i * segStep;
      const frac = (i + 0.5) / nSegs;
      overlayCtx.beginPath();
      overlayCtx.arc(ax, ay, rAlpha, a0, a0 + segStep + 0.015);
      overlayCtx.lineWidth = wAlpha;
      overlayCtx.strokeStyle = `rgba(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b}, ${frac})`;
      overlayCtx.stroke();
    }

    // 3. Inner & Outer Track Border Lines
    overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    overlayCtx.lineWidth = 1;
    overlayCtx.beginPath();
    overlayCtx.arc(ax, ay, rAlpha - wAlpha / 2, 0, Math.PI * 2);
    overlayCtx.stroke();
    overlayCtx.beginPath();
    overlayCtx.arc(ax, ay, rAlpha + wAlpha / 2, 0, Math.PI * 2);
    overlayCtx.stroke();

    // Helper: Shared Unified Indicator Knob with white ring and contrast outline
    const knobRadius = cubeSat.indicatorKnobRadius || 9;
    const drawIndicatorKnob = (x: number, y: number, rgb: RGBColor) => {
      overlayCtx.beginPath();
      overlayCtx.arc(x, y, knobRadius, 0, Math.PI * 2);
      overlayCtx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      overlayCtx.fill();
      overlayCtx.lineWidth = 2.5;
      overlayCtx.strokeStyle = '#ffffff';
      overlayCtx.stroke();
      overlayCtx.lineWidth = 1;
      overlayCtx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
      overlayCtx.stroke();
    };

    // 4. Thumb Knob at current alpha position (Unified Style)
    const currentAngle = start + alpha * Math.PI * 2;
    const kx = ax + rAlpha * Math.cos(currentAngle);
    const ky = ay + rAlpha * Math.sin(currentAngle);
    drawIndicatorKnob(kx, ky, finalRgb);

    overlayCtx.restore();

    // ── Current 3D Coordinate Pick Circle Dot ──
    // 2D Outer Hull of the visible Shape on screen:
    let hull: Vec2[];
    if (isPyramid) {
      hull = [ApexTop, B_right, B_front, B_left];
    } else if (isPyramidInv) {
      hull = [T_back, T_right, ApexBottom, T_left];
    } else if (isCylinder) {
      const pLeftT = proj3D(-1, 1, 0), pRightT = proj3D(1, 1, 0);
      const pRightB = proj3D(1, -1, 0), pLeftB = proj3D(-1, -1, 0);
      const pBackT = proj3D(0, 1, -1), pFrontB = proj3D(0, -1, 1);
      hull = [pBackT, pRightT, pRightB, pFrontB, pLeftB, pLeftT];
    } else {
      hull = [T_back, T_right, B_right, B_front, B_left, T_left];
    }

    // Helper: Closest point on line segment [p1, p2] to point p
    const closestOnSeg = (p: Vec2, p1: Vec2, p2: Vec2): Vec2 => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const lenSq = dx * dx + dy * dy;
      if (lenSq < 1e-6) return p1;
      const t = Math.max(0, Math.min(1, ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / lenSq));
      return { x: p1.x + t * dx, y: p1.y + t * dy };
    };

    // Helper: Point in convex polygon test
    const pointInPoly = (p: Vec2, poly: Vec2[]): boolean => {
      let inside = true;
      for (let i = 0; i < poly.length; i++) {
        const p1 = poly[i];
        const p2 = poly[(i + 1) % poly.length];
        const cross = (p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x);
        if (cross < 0) {
          inside = false;
          break;
        }
      }
      return inside;
    };

    // Persistent indicator dot clamped strictly inside or on the 3D cube boundary:
    let dotX = T_front.x;
    let dotY = T_front.y;

    if (cubeSat.pointerPos) {
      const mouse = cubeSat.pointerPos;
      if (pointInPoly(mouse, hull)) {
        // Pointer is inside the 3D cube: dot follows mouse directly
        dotX = mouse.x;
        dotY = mouse.y;
      } else {
        // Pointer is outside the 3D cube: clamp dot strictly to the nearest point on the cube perimeter
        let minD = Infinity;
        let bestPt: Vec2 = { x: T_front.x, y: T_front.y };
        for (let i = 0; i < hull.length; i++) {
          const pt = closestOnSeg(mouse, hull[i], hull[(i + 1) % hull.length]);
          const d = (pt.x - mouse.x) ** 2 + (pt.y - mouse.y) ** 2;
          if (d < minD) {
            minD = d;
            bestPt = pt;
          }
        }
        dotX = bestPt.x;
        dotY = bestPt.y;
      }
    }

    // Draw Cube SAT Pick Indicator Dot (Identical Unified Style)
    drawIndicatorKnob(dotX, dotY, finalRgb);

    overlayCtx.restore();
  }

  overlayCtx.restore();
}
