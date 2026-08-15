import type { Vec2, Vec3, ColorMode, GuideVisibility } from './types';
import type { CameraConfig, BoxConfig } from './camera-math';
import { project3D, transform3D } from './camera-math';

const AXIS_SOLID_COLORS = [
  '#ef4444', // X - Red
  '#22c55e', // Y - Green
  '#3b82f6', // Z - Blue
];

/**
 * 绘制空间 XYZ 轴、中心轴与角度辅助线（完全独立于色彩立方体绘制）
 */
export function drawGuides(
  ctx: CanvasRenderingContext2D,
  scale: number,
  center: Vec2,
  cam: CameraConfig,
  box: BoxConfig,
  g: GuideVisibility,
): void {
  const project = (p: Vec3) => project3D(p, scale, center, cam, box);
  const origin = project({ x: 0, y: 0, z: 0 });

  ctx.save();

  // 1. 顶点 XYZ 轴指示线（从 0,0,0 黑色顶点向外延伸）
  const EXTEND = 1.28;
  const vertexAxes = [
    { p: { x: EXTEND, y: 0, z: 0 }, name: 'X', color: AXIS_SOLID_COLORS[0], visible: g.vertexX },
    { p: { x: 0, y: EXTEND, z: 0 }, name: 'Y', color: AXIS_SOLID_COLORS[1], visible: g.vertexY },
    { p: { x: 0, y: 0, z: EXTEND }, name: 'Z', color: AXIS_SOLID_COLORS[2], visible: g.vertexZ },
  ];

  for (let i = 0; i < vertexAxes.length; i++) {
    if (!vertexAxes[i].visible) continue;
    const tip = project(vertexAxes[i].p);
    const col = vertexAxes[i].color;

    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(tip.x, tip.y);
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();

    const dx = tip.x - origin.x;
    const dy = tip.y - origin.y;
    const len = Math.hypot(dx, dy) || 1;
    const offset = 12;
    const lx = tip.x + (dx / len) * offset;
    const ly = tip.y + (dy / len) * offset;

    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = col;
    ctx.fillText(vertexAxes[i].name, lx, ly);
  }

  // 原点 (0,0,0) 黑色标记点
  if (g.vertexX || g.vertexY || g.vertexZ) {
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // 2. 空间几何中心点 (0.5, 0.5, 0.5) 与中心三向纯色实线
  const centerPoint = project({ x: 0.5, y: 0.5, z: 0.5 });
  const EXT = 0.35; // 向两端各延伸超出 0.35
  const centerAxes = [
    { from: { x: -EXT, y: 0.5, z: 0.5 }, to: { x: 1 + EXT, y: 0.5, z: 0.5 }, color: AXIS_SOLID_COLORS[0], name: 'Cx', visible: g.centerX }, // X-axis 红实线
    { from: { x: 0.5, y: -EXT, z: 0.5 }, to: { x: 0.5, y: 1 + EXT, z: 0.5 }, color: AXIS_SOLID_COLORS[1], name: 'Cy', visible: g.centerY }, // Y-axis 绿实线
    { from: { x: 0.5, y: 0.5, z: -EXT }, to: { x: 0.5, y: 0.5, z: 1 + EXT }, color: AXIS_SOLID_COLORS[2], name: 'Cz', visible: g.centerZ }, // Z-axis 蓝实线
  ];

  let hasCenterVisible = false;
  for (let i = 0; i < centerAxes.length; i++) {
    if (!centerAxes[i].visible) continue;
    hasCenterVisible = true;
    const pA = project(centerAxes[i].from);
    const pB = project(centerAxes[i].to);
    
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.strokeStyle = centerAxes[i].color;
    ctx.lineWidth = 2.0;
    ctx.setLineDash([]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pA.x, pA.y, 3, 0, Math.PI * 2);
    ctx.arc(pB.x, pB.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = centerAxes[i].color;
    ctx.fill();
  }

  if (hasCenterVisible) {
    ctx.beginPath();
    ctx.arc(centerPoint.x, centerPoint.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#111827';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 3. 角度指示弧线与度数角标 (Yaw / Pitch - 统一由 angleGuides 控制)
  const showAngles = g.angleGuides !== undefined ? g.angleGuides : (g.yawArc || g.pitchArc || false);
  const yawDeg = Math.round((cam.rotZRad * 180 / Math.PI) * 10) / 10;
  const pitchDeg = Math.round((cam.rotXRad * 180 / Math.PI) * 10) / 10;

  if (showAngles) {
    // 3.1 水平旋转弧线 (Yaw Arc)
    ctx.beginPath();
    const yawSegments = 36;
    for (let i = 0; i <= yawSegments; i++) {
      const angle = (i / yawSegments) * Math.PI * 2;
      const pt3: Vec3 = {
        x: 0.5 + Math.cos(angle) * 0.75,
        y: 0.5 + Math.sin(angle) * 0.75,
        z: 0,
      };
      const p2d = project(pt3);
      if (i === 0) ctx.moveTo(p2d.x, p2d.y);
      else ctx.lineTo(p2d.x, p2d.y);
    }
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3.2 垂直俯仰弧线 (Pitch Arc)
    ctx.beginPath();
    const pitchSegments = 20;
    for (let i = 0; i <= pitchSegments; i++) {
      const angle = -Math.PI / 2 + (i / pitchSegments) * Math.PI;
      const pt3: Vec3 = {
        x: 0.5 + Math.cos(angle) * 0.75,
        y: 0.5,
        z: 0.5 + Math.sin(angle) * 0.75,
      };
      const p2d = project(pt3);
      if (i === 0) ctx.moveTo(p2d.x, p2d.y);
      else ctx.lineTo(p2d.x, p2d.y);
    }
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3.3 左下角常驻角度读数
    ctx.font = '500 11px ui-monospace, "SF Mono", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
    ctx.fillText(`Yaw: ${yawDeg.toFixed(1)}°`, 12, center.y * 2 - 24);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
    ctx.fillText(`Pitch: ${pitchDeg.toFixed(1)}°`, 12, center.y * 2 - 10);
  }

  ctx.restore();
}
