import type { Vec2, Vec3, GuideVisibility } from './types';
import type { CameraConfig, BoxConfig } from './camera-math';
import { project3D } from './camera-math';

const AXIS_SOLID_COLORS = [
  '#ef4444', // X - Red
  '#22c55e', // Y - Green
  '#3b82f6', // Z - Blue
];

/**
 * Draw spatial XYZ axis guides through the box center (0.5, 0.5, 0.5)
 * (rotation center is the box center; black-vertex axes and Yaw/Pitch rings removed)
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

  ctx.save();

  // Spatial center point (0.5, 0.5, 0.5) with three solid colored center axes
  const centerPoint = project({ x: 0.5, y: 0.5, z: 0.5 });
  const EXT = 0.35; // extend 0.35 beyond each end
  const centerAxes = [
    { from: { x: -EXT, y: 0.5, z: 0.5 }, to: { x: 1 + EXT, y: 0.5, z: 0.5 }, color: AXIS_SOLID_COLORS[0], name: 'Cx', visible: g.centerX }, // X-axis red solid
    { from: { x: 0.5, y: -EXT, z: 0.5 }, to: { x: 0.5, y: 1 + EXT, z: 0.5 }, color: AXIS_SOLID_COLORS[1], name: 'Cy', visible: g.centerY }, // Y-axis green solid
    { from: { x: 0.5, y: 0.5, z: -EXT }, to: { x: 0.5, y: 0.5, z: 1 + EXT }, color: AXIS_SOLID_COLORS[2], name: 'Cz', visible: g.centerZ }, // Z-axis blue solid
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

  ctx.restore();
}
