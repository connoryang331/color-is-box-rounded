import type { Vec2, Vec3, ColorMode, RGBColor, GuideVisibility, EdgeStyleConfig } from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, project3D, transform3D, projectSaturationTriangle, SaturationTriangle, easeInOutQuad } from './camera-math';
import { drawGuides } from './guide-renderer';
import { VERT_SHADER, FRAG_SHADER, TRI_VERT_SHADER, TRI_FRAG_SHADER } from './shaders';
import { rgbToHex, rgbToHsb, rgbToOklch, valuesToRgb, ringColorAt } from './color-math';

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

    // The dot always shows the current color itself: opaque when alpha = 100%, translucent
    // (box showing through) when semi-transparent — no checkerboard pattern inside.
    overlayCtx.beginPath();
    overlayCtx.arc(dotPos.x, dotPos.y, 8, 0, Math.PI * 2);
    overlayCtx.fillStyle = alpha < 1
      ? `rgba(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b}, ${alpha})`
      : `rgb(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b})`;
    overlayCtx.fill();
    overlayCtx.strokeStyle = outlineFor(finalRgb.r, finalRgb.g, finalRgb.b);
    overlayCtx.lineWidth = 2.5;
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
    const ax = cubeSat.anchor.x;
    const ay = cubeSat.anchor.y;

    // 3D Rotated Perspective for the Cube SAT matching 3d cube sat.png:
    // Perfect regular cube [-1, 1]^3 rotated slightly to the left (Yaw = -33°, Pitch = 19°)
    const radYaw = -33 * Math.PI / 180;
    const radPitch = 19 * Math.PI / 180;
    const cy = Math.cos(radYaw), sy = Math.sin(radYaw);
    const cp = Math.cos(radPitch), sp = Math.sin(radPitch);

    // 3D projection function from unit cube [-1, 1]^3 to screen (ax, ay)
    const proj3D = (px: number, py: number, pz: number): Vec2 => {
      const x1 = px * cy + pz * sy;
      const y1 = py;
      const z1 = -px * sy + pz * cy;
      const x2 = x1;
      const y2 = y1 * cp - z1 * sp;
      return {
        x: ax + x2 * s * 0.44,
        y: ay - y2 * s * 0.44, // Invert Y for canvas
      };
    };

    // 8 True 3D Vertices for a Regular Cube (X in [-1, 1], Y in [-1, 1], Z in [-1, 1]):
    const T_back  = proj3D(-1,  1, -1);
    const T_left  = proj3D(-1,  1,  1);
    const T_right = proj3D( 1,  1, -1);
    const T_front = proj3D( 1,  1,  1);

    const B_back  = proj3D(-1, -1, -1);
    const B_left  = proj3D(-1, -1,  1);
    const B_right = proj3D( 1, -1, -1);
    const B_front = proj3D( 1, -1,  1);

    // Draw backdrop card (subtle dark glassmorphism card for contrast)
    overlayCtx.save();
    overlayCtx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    overlayCtx.shadowBlur = 24;
    overlayCtx.shadowOffsetY = 8;
    overlayCtx.fillStyle = 'rgba(28, 28, 28, 0.88)';
    overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    overlayCtx.lineWidth = 1;
    const cardW = s * 1.6;
    const cardH = s * 1.75;
    const cardX = ax - cardW * 0.5;
    const cardY = ay - cardH * 0.5;
    overlayCtx.beginPath();
    overlayCtx.roundRect ? overlayCtx.roundRect(cardX, cardY, cardW, cardH, 16) : overlayCtx.rect(cardX, cardY, cardW, cardH);
    overlayCtx.fill();
    overlayCtx.stroke();
    overlayCtx.restore();

    // ── 1. Top Face (Hue / Temperature / Saturation blend) ──
    const gradTop = overlayCtx.createLinearGradient(T_left.x, T_left.y, T_right.x, T_right.y);
    const baseCol = valuesToRgb(cubeSat.colorAnchor, mode);
    gradTop.addColorStop(0, '#00a8ff');
    gradTop.addColorStop(0.5, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
    gradTop.addColorStop(1, '#ff6b6b');

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

    // ── 2. Left Face (Saturation -> Dark/Black Shading) ──
    const gradLeft = overlayCtx.createLinearGradient(T_left.x, T_left.y, B_left.x, B_left.y);
    gradLeft.addColorStop(0, `rgb(${baseCol.r}, ${baseCol.g}, ${baseCol.b})`);
    gradLeft.addColorStop(1, '#050505');

    overlayCtx.beginPath();
    overlayCtx.moveTo(T_left.x, T_left.y);
    overlayCtx.lineTo(T_front.x, T_front.y);
    overlayCtx.lineTo(B_front.x, B_front.y);
    overlayCtx.lineTo(B_left.x, B_left.y);
    overlayCtx.closePath();
    overlayCtx.fillStyle = gradLeft;
    overlayCtx.fill();
    overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    overlayCtx.lineWidth = 1;
    overlayCtx.stroke();

    // ── 3. Right Face (Saturation -> Bright/Light/White Shading) ──
    const gradRight = overlayCtx.createLinearGradient(T_front.x, T_front.y, T_right.x, T_right.y);
    gradRight.addColorStop(0, `rgb(${Math.min(255, baseCol.r + 20)}, ${Math.min(255, baseCol.g + 20)}, ${Math.min(255, baseCol.b + 20)})`);
    gradRight.addColorStop(1, '#ffffff');

    overlayCtx.beginPath();
    overlayCtx.moveTo(T_front.x, T_front.y);
    overlayCtx.lineTo(T_right.x, T_right.y);
    overlayCtx.lineTo(B_right.x, B_right.y);
    overlayCtx.lineTo(B_front.x, B_front.y);
    overlayCtx.closePath();
    overlayCtx.fillStyle = gradRight;
    overlayCtx.fill();
    overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    overlayCtx.lineWidth = 1;
    overlayCtx.stroke();

    // ── Cube Wireframe Accents ──
    overlayCtx.beginPath();
    overlayCtx.moveTo(T_back.x, T_back.y);
    overlayCtx.lineTo(T_right.x, T_right.y);
    overlayCtx.lineTo(B_right.x, B_right.y);
    overlayCtx.lineTo(B_front.x, B_front.y);
    overlayCtx.lineTo(B_left.x, B_left.y);
    overlayCtx.lineTo(T_left.x, T_left.y);
    overlayCtx.closePath();
    overlayCtx.moveTo(T_front.x, T_front.y);
    overlayCtx.lineTo(B_front.x, B_front.y);
    overlayCtx.moveTo(T_front.x, T_front.y);
    overlayCtx.lineTo(T_left.x, T_left.y);
    overlayCtx.moveTo(T_front.x, T_front.y);
    overlayCtx.lineTo(T_right.x, T_right.y);
    overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    overlayCtx.lineWidth = 1.2;
    overlayCtx.stroke();

    // ── 4. Icons and Dual-ended Arrows (Reference: 🌡️ 🌈 🔆) ──
    overlayCtx.save();
    overlayCtx.strokeStyle = '#ffffff';
    overlayCtx.fillStyle = '#ffffff';
    overlayCtx.lineWidth = 1.4;

    const drawDoubleArrow = (x1: number, y1: number, x2: number, y2: number) => {
      overlayCtx.beginPath();
      overlayCtx.moveTo(x1, y1);
      overlayCtx.lineTo(x2, y2);
      overlayCtx.stroke();

      const ang = Math.atan2(y2 - y1, x2 - x1);
      const head = 4.5;
      // Arrowhead 1
      overlayCtx.beginPath();
      overlayCtx.moveTo(x1, y1);
      overlayCtx.lineTo(x1 + head * Math.cos(ang + 0.5), y1 + head * Math.sin(ang + 0.5));
      overlayCtx.moveTo(x1, y1);
      overlayCtx.lineTo(x1 + head * Math.cos(ang - 0.5), y1 + head * Math.sin(ang - 0.5));
      overlayCtx.stroke();
      // Arrowhead 2
      overlayCtx.beginPath();
      overlayCtx.moveTo(x2, y2);
      overlayCtx.lineTo(x2 - head * Math.cos(ang + 0.5), y2 - head * Math.sin(ang + 0.5));
      overlayCtx.moveTo(x2, y2);
      overlayCtx.lineTo(x2 - head * Math.cos(ang - 0.5), y2 - head * Math.sin(ang - 0.5));
      overlayCtx.stroke();
    };

    // (A) Top-Left: Thermometer / Temperature (🌡️ + diagonal arrows)
    const iconTempX = ax - s * 0.44;
    const iconTempY = ay - s * 0.64;
    // Draw thermometer icon
    overlayCtx.save();
    overlayCtx.translate(iconTempX, iconTempY);
    overlayCtx.beginPath();
    overlayCtx.roundRect ? overlayCtx.roundRect(-2.5, -9, 5, 12, 2.5) : overlayCtx.rect(-2.5, -9, 5, 12);
    overlayCtx.stroke();
    overlayCtx.beginPath();
    overlayCtx.arc(0, 5, 4.5, 0, Math.PI * 2);
    overlayCtx.stroke();
    overlayCtx.beginPath();
    overlayCtx.arc(0, 5, 2.5, 0, Math.PI * 2);
    overlayCtx.fill();
    overlayCtx.restore();
    // Diagonal double arrow along top-left edge
    drawDoubleArrow(iconTempX + 10, iconTempY - 8, iconTempX + 26, iconTempY + 8);

    // (B) Top-Right: Rainbow / Saturation (🌈 + vertical arrows)
    const iconSatX = ax + s * 0.44;
    const iconSatY = ay - s * 0.64;
    // Draw rainbow arcs
    overlayCtx.save();
    overlayCtx.translate(iconSatX - 10, iconSatY);
    overlayCtx.lineWidth = 1.4;
    for (let r = 5; r <= 9; r += 2) {
      overlayCtx.beginPath();
      overlayCtx.arc(0, 2, r, Math.PI, 0);
      overlayCtx.stroke();
    }
    overlayCtx.restore();
    // Vertical arrow next to rainbow
    drawDoubleArrow(iconSatX + 14, iconSatY - 14, iconSatX + 14, iconSatY + 14);

    // (C) Bottom: Sun / Brightness (🔆 + dual arrows)
    const iconSunX = ax;
    const iconSunY = ay + s * 0.58;
    // Draw sun icon
    overlayCtx.save();
    overlayCtx.translate(iconSunX, iconSunY);
    overlayCtx.beginPath();
    overlayCtx.arc(0, 0, 3.5, 0, Math.PI * 2);
    overlayCtx.stroke();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      overlayCtx.beginPath();
      overlayCtx.moveTo(Math.cos(a) * 5.5, Math.sin(a) * 5.5);
      overlayCtx.lineTo(Math.cos(a) * 8.5, Math.sin(a) * 8.5);
      overlayCtx.stroke();
    }
    overlayCtx.restore();
    // Double arrows on both sides of sun
    drawDoubleArrow(iconSunX - s * 0.56, iconSunY, iconSunX - 16, iconSunY);
    drawDoubleArrow(iconSunX + 16, iconSunY, iconSunX + s * 0.56, iconSunY);
    overlayCtx.restore();

    // ── 5. Current 3D Coordinate Pick Circle Dot ──
    const u = cubeSat.currentCoord.x; // [0, 1]
    const v = cubeSat.currentCoord.y; // [0, 1]
    const w = cubeSat.currentCoord.z; // [0, 1]

    const curRgb = valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - curRgb.r, g: 255 - curRgb.g, b: 255 - curRgb.b } : curRgb;

    // Pick dot position follows pointer directly or falls back to 3D projection
    let pickX = ax;
    let pickY = ay;
    if (cubeSat.pointerPos) {
      pickX = cubeSat.pointerPos.x;
      pickY = cubeSat.pointerPos.y;
    } else {
      const pos3D = proj3D((u - 0.5) * 2.0, (v - 0.5) * 2.0, (w - 0.5) * 2.0);
      pickX = pos3D.x;
      pickY = pos3D.y;
    }

    overlayCtx.beginPath();
    overlayCtx.arc(pickX, pickY, 5.5, 0, Math.PI * 2);
    overlayCtx.fillStyle = `rgb(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b})`;
    overlayCtx.fill();
    overlayCtx.strokeStyle = '#ffffff';
    overlayCtx.lineWidth = 2;
    overlayCtx.stroke();
    overlayCtx.beginPath();
    overlayCtx.arc(pickX, pickY, 6.5, 0, Math.PI * 2);
    overlayCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    overlayCtx.lineWidth = 1;
    overlayCtx.stroke();

    overlayCtx.restore();
  }

  overlayCtx.restore();
}
