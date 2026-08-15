import type { Vec2, Vec3, ColorMode, RGBColor, GuideVisibility, EdgeStyleConfig } from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, project3D, transform3D, projectSaturationTriangle, SaturationTriangle } from './camera-math';
import { drawGuides } from './guide-renderer';
import { VERT_SHADER, FRAG_SHADER, TRI_VERT_SHADER, TRI_FRAG_SHADER } from './shaders';
import { rgbToHex, rgbToHsb, rgbToOklch, valuesToRgb } from './color-math';

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
  if (guides.svTriangle && svShow) {
    const tri = projectSaturationTriangle(svAnchor || dotValues, mode, scale, center, cam, box);
    // Degenerate triangles (gray / white / black current color → C lies on the W–K edge) collapse
    // to the W–K gray axis, which we still draw so the axis stays discoverable.
    const area = Math.abs((tri.w.x - tri.c.x) * (tri.k.y - tri.c.y) - (tri.w.y - tri.c.y) * (tri.k.x - tri.c.x));
    if (area > 4) svTri = tri;
    else svAxis = tri;
  }

  // 1.5 Saturation Triangle Gradient Fill (exact Gouraud shading on the GPU):
  // vertex colors C / white / black, so each pixel shows the true mix a·C + b·white + g·black —
  // the PS-style gradient from the current color toward white and toward black.
  if (svTri) {
    const toClip = (p: Vec2): [number, number] => [
      (p.x / width) * 2 - 1,
      1 - (p.y / height) * 2,
    ];
    const c = toClip(svTri.c);
    const w = toClip(svTri.w);
    const k = toClip(svTri.k);
    gl.useProgram(rc.triProgram);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, rc.triBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      c[0], c[1], svTri.cRGB.x, svTri.cRGB.y, svTri.cRGB.z,
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
    const tri = svTri;
    const cr = Math.round(tri.cRGB.x * 255);
    const cg = Math.round(tri.cRGB.y * 255);
    const cb = Math.round(tri.cRGB.z * 255);

    overlayCtx.save();
    overlayCtx.beginPath();
    overlayCtx.moveTo(tri.c.x, tri.c.y);
    overlayCtx.lineTo(tri.w.x, tri.w.y);
    overlayCtx.lineTo(tri.k.x, tri.k.y);
    overlayCtx.closePath();
    overlayCtx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.7)`;
    overlayCtx.lineWidth = 1.2;
    overlayCtx.setLineDash([]);
    overlayCtx.stroke();

      // Vertex markers: white corner (white fill + dark ring), black corner (dark fill + light ring)
      overlayCtx.beginPath();
      overlayCtx.arc(tri.w.x, tri.w.y, 3.5, 0, Math.PI * 2);
      overlayCtx.fillStyle = '#ffffff';
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(17, 24, 39, 0.6)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();

      overlayCtx.beginPath();
      overlayCtx.arc(tri.k.x, tri.k.y, 3.5, 0, Math.PI * 2);
      overlayCtx.fillStyle = '#111827';
      overlayCtx.fill();
      overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      overlayCtx.lineWidth = 1.2;
      overlayCtx.stroke();

      // Position marker: the current color's mix (a·C + b·W + g·K) inside the anchored triangle.
      // It follows the pointer while dragging and rests at the final position after release.
      if (svMix) {
        const mx = svMix.a * tri.c.x + svMix.b * tri.w.x + svMix.g * tri.k.x;
        const my = svMix.a * tri.c.y + svMix.b * tri.w.y + svMix.g * tri.k.y;
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

  // 2.2 Draw Pick Dot
  // Skipped while the triangle marker is active: the marker (a·C + b·W + g·K projection) lands
  // exactly on the pick dot (barycentric coords are preserved by the orthographic projection),
  // so the marker doubles as the position indicator for the current color.
  if (dotVisible && !svMix) {
    const dotPos = project3D(dotValues, scale, center, cam, box);
    const rgb = valuesToRgb(dotValues, mode);
    const finalRgb = invert ? { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } : rgb;

    overlayCtx.beginPath();
    overlayCtx.arc(dotPos.x, dotPos.y, 6, 0, Math.PI * 2);
    overlayCtx.fillStyle = `rgb(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b})`;
    overlayCtx.fill();
    overlayCtx.strokeStyle = '#ffffff';
    overlayCtx.lineWidth = 2;
    overlayCtx.stroke();
  }

  overlayCtx.restore();
}
