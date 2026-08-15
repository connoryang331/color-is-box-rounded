import type { Vec2, Vec3, ColorMode, RGBColor, GuideVisibility, EdgeStyleConfig } from './types';
import { DEFAULT_GUIDES, DEFAULT_EDGE_CONFIG } from './types';
import { CameraConfig, BoxConfig, DEFAULT_CAMERA_CONFIG, DEFAULT_BOX_CONFIG, project3D, transform3D } from './camera-math';
import { drawGuides } from './guide-renderer';
import { VERT_SHADER, FRAG_SHADER } from './shaders';
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

  // Uniform locations
  const uniforms: Record<string, WebGLUniformLocation> = {
    u_resolution: gl.getUniformLocation(program, 'u_resolution')!,
    u_box_size: gl.getUniformLocation(program, 'u_box_size')!,
    u_radius: gl.getUniformLocation(program, 'u_radius')!,
    u_rot: gl.getUniformLocation(program, 'u_rot')!,
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
  };
}

const EDGE_TOPOLOGY: { edge: [number, number]; normalA: Vec3; normalB: Vec3 }[] = [
  // 底面 4 条边 (z=0)
  { edge: [0, 1], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 0, y: -1, z: 0 } },
  { edge: [1, 4], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 1, y: 0, z: 0 } },
  { edge: [4, 2], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 0, y: 1, z: 0 } },
  { edge: [2, 0], normalA: { x: 0, y: 0, z: -1 }, normalB: { x: -1, y: 0, z: 0 } },

  // 顶面 4 条边 (z=1)
  { edge: [3, 5], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 0, y: -1, z: 0 } },
  { edge: [5, 7], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 1, y: 0, z: 0 } },
  { edge: [7, 6], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 0, y: 1, z: 0 } },
  { edge: [6, 3], normalA: { x: 0, y: 0, z: 1 }, normalB: { x: -1, y: 0, z: 0 } },

  // 4 条纵向立柱边
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

  const rad = Math.min(box.radius || 0.0, 0.49);
  const rx = rad;
  const ry = rad;
  const rz = rad;

  // 12 条经过 3D 倒角收缩的直线边 (两端各内缩 radius)
  const edgeSegments: { from: Vec3; to: Vec3; normalA: Vec3; normalB: Vec3 }[] = [
    // 底面 4 条边 (z=0)
    { from: { x: rx, y: 0, z: 0 }, to: { x: 1 - rx, y: 0, z: 0 }, normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 0, y: -1, z: 0 } },
    { from: { x: 1, y: ry, z: 0 }, to: { x: 1, y: 1 - ry, z: 0 }, normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 1, y: 0, z: 0 } },
    { from: { x: 1 - rx, y: 1, z: 0 }, to: { x: rx, y: 1, z: 0 }, normalA: { x: 0, y: 0, z: -1 }, normalB: { x: 0, y: 1, z: 0 } },
    { from: { x: 0, y: 1 - ry, z: 0 }, to: { x: 0, y: ry, z: 0 }, normalA: { x: 0, y: 0, z: -1 }, normalB: { x: -1, y: 0, z: 0 } },

    // 顶面 4 条边 (z=1)
    { from: { x: rx, y: 0, z: 1 }, to: { x: 1 - rx, y: 0, z: 1 }, normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 0, y: -1, z: 0 } },
    { from: { x: 1, y: ry, z: 1 }, to: { x: 1, y: 1 - ry, z: 1 }, normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 1, y: 0, z: 0 } },
    { from: { x: 1 - rx, y: 1, z: 1 }, to: { x: rx, y: 1, z: 1 }, normalA: { x: 0, y: 0, z: 1 }, normalB: { x: 0, y: 1, z: 0 } },
    { from: { x: 0, y: 1 - ry, z: 1 }, to: { x: 0, y: ry, z: 1 }, normalA: { x: 0, y: 0, z: 1 }, normalB: { x: -1, y: 0, z: 0 } },

    // 4 条纵向立柱边 (沿 Z 轴)
    { from: { x: 0, y: 0, z: rz }, to: { x: 0, y: 0, z: 1 - rz }, normalA: { x: -1, y: 0, z: 0 }, normalB: { x: 0, y: -1, z: 0 } },
    { from: { x: 1, y: 0, z: rz }, to: { x: 1, y: 0, z: 1 - rz }, normalA: { x: 1, y: 0, z: 0 }, normalB: { x: 0, y: -1, z: 0 } },
    { from: { x: 1, y: 1, z: rz }, to: { x: 1, y: 1, z: 1 - rz }, normalA: { x: 1, y: 0, z: 0 }, normalB: { x: 0, y: 1, z: 0 } },
    { from: { x: 0, y: 1, z: rz }, to: { x: 0, y: 1, z: 1 - rz }, normalA: { x: -1, y: 0, z: 0 }, normalB: { x: 0, y: 1, z: 0 } },
  ];

  // 24 条三维倒角圆弧过渡曲线 (每个角点 3 条 1/4 圆弧)
  const arcCorners: { center: Vec3; axisA: Vec3; axisB: Vec3; normalA: Vec3; normalB: Vec3 }[] = [];
  if (rad > 0.005) {
    const corners = [
      { c: { x: rx, y: ry, z: rz }, sign: { x: -1, y: -1, z: -1 } },
      { c: { x: 1 - rx, y: ry, z: rz }, sign: { x: 1, y: -1, z: -1 } },
      { c: { x: rx, y: 1 - ry, z: rz }, sign: { x: -1, y: 1, z: -1 } },
      { c: { x: 1 - rx, y: 1 - ry, z: rz }, sign: { x: 1, y: 1, z: -1 } },
      { c: { x: rx, y: ry, z: 1 - rz }, sign: { x: -1, y: -1, z: 1 } },
      { c: { x: 1 - rx, y: ry, z: 1 - rz }, sign: { x: 1, y: -1, z: 1 } },
      { c: { x: rx, y: 1 - ry, z: 1 - rz }, sign: { x: -1, y: 1, z: 1 } },
      { c: { x: 1 - rx, y: 1 - ry, z: 1 - rz }, sign: { x: 1, y: 1, z: 1 } },
    ];

    for (const cn of corners) {
      // XY 平面圆弧 (z 顶/底面转角)
      arcCorners.push({
        center: cn.c,
        axisA: { x: cn.sign.x * rx, y: 0, z: 0 },
        axisB: { x: 0, y: cn.sign.y * ry, z: 0 },
        normalA: { x: cn.sign.x, y: 0, z: 0 },
        normalB: { x: 0, y: cn.sign.y, z: 0 },
      });
      // XZ 平面圆弧 (y 侧面转角)
      arcCorners.push({
        center: cn.c,
        axisA: { x: cn.sign.x * rx, y: 0, z: 0 },
        axisB: { x: 0, y: 0, z: cn.sign.z * rz },
        normalA: { x: cn.sign.x, y: 0, z: 0 },
        normalB: { x: 0, y: 0, z: cn.sign.z },
      });
      // YZ 平面圆弧 (x 侧面转角)
      arcCorners.push({
        center: cn.c,
        axisA: { x: 0, y: cn.sign.y * ry, z: 0 },
        axisB: { x: 0, y: 0, z: cn.sign.z * rz },
        normalA: { x: 0, y: cn.sign.y, z: 0 },
        normalB: { x: 0, y: 0, z: cn.sign.z },
      });
    }
  }

  const isNormFront = (n: Vec3) => {
    const c0 = transform3D({ x: 0.5, y: 0.5, z: 0.5 }, cam, box);
    const c1 = transform3D({ x: 0.5 + n.x * 0.1, y: 0.5 + n.y * 0.1, z: 0.5 + n.z * 0.1 }, cam, box);
    return (c1.z - c0.z) > 0;
  };

  ctx.save();

  // 1. Back Edges & Back Arcs
  if (style.showBack) {
    ctx.lineWidth = style.backWidth;
    if (style.backDashed) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);
    ctx.strokeStyle = style.backColor;
    ctx.globalAlpha = style.backOpacity;

    for (const seg of edgeSegments) {
      const isFront = isNormFront(seg.normalA) || isNormFront(seg.normalB);
      if (!isFront) {
        const p1 = project(seg.from);
        const p2 = project(seg.to);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // 绘制后侧倒角弧线
    for (const arc of arcCorners) {
      const isFront = isNormFront(arc.normalA) || isNormFront(arc.normalB);
      if (!isFront) {
        ctx.beginPath();
        const SEGS = 8;
        for (let s = 0; s <= SEGS; s++) {
          const th = (s / SEGS) * (Math.PI * 0.5);
          const pt: Vec3 = {
            x: arc.center.x + arc.axisA.x * Math.cos(th) + arc.axisB.x * Math.sin(th),
            y: arc.center.y + arc.axisA.y * Math.cos(th) + arc.axisB.y * Math.sin(th),
            z: arc.center.z + arc.axisA.z * Math.cos(th) + arc.axisB.z * Math.sin(th),
          };
          const p2d = project(pt);
          if (s === 0) ctx.moveTo(p2d.x, p2d.y);
          else ctx.lineTo(p2d.x, p2d.y);
        }
        ctx.stroke();
      }
    }
  }

  // 2. Front Edges & Front Arcs
  if (style.showFront) {
    ctx.lineWidth = style.frontWidth;
    if (style.frontDashed) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);
    ctx.strokeStyle = style.frontColor;
    ctx.globalAlpha = style.frontOpacity;

    for (const seg of edgeSegments) {
      const isFront = isNormFront(seg.normalA) || isNormFront(seg.normalB);
      if (isFront) {
        const p1 = project(seg.from);
        const p2 = project(seg.to);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // 绘制前侧可见倒角弧线
    for (const arc of arcCorners) {
      const isFront = isNormFront(arc.normalA) || isNormFront(arc.normalB);
      if (isFront) {
        ctx.beginPath();
        const SEGS = 8;
        for (let s = 0; s <= SEGS; s++) {
          const th = (s / SEGS) * (Math.PI * 0.5);
          const pt: Vec3 = {
            x: arc.center.x + arc.axisA.x * Math.cos(th) + arc.axisB.x * Math.sin(th),
            y: arc.center.y + arc.axisA.y * Math.cos(th) + arc.axisB.y * Math.sin(th),
            z: arc.center.z + arc.axisA.z * Math.cos(th) + arc.axisB.z * Math.sin(th),
          };
          const p2d = project(pt);
          if (s === 0) ctx.moveTo(p2d.x, p2d.y);
          else ctx.lineTo(p2d.x, p2d.y);
        }
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
  gl.uniform3f(uniforms.u_rot, cam.rotXRad, cam.rotYRad, cam.rotZRad);
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

  // 2. Render 2D Overlay (Spatial Guides & Pick Dot)
  overlayCtx.save();
  overlayCtx.clearRect(0, 0, width, height);

  const scale = width * 0.26;
  const center: Vec2 = { x: width * 0.5, y: height * 0.5 };

  // 2.1 Draw Spatial Guides
  drawGuides(overlayCtx, scale, center, cam, box, guides);

  // 2.2 Draw Pick Dot
  if (dotVisible) {
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
