// High-performance WebGL Raymarching Shader for True 3D Rounded Bevel Box
export const VERT_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const FRAG_SHADER = `
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform vec3 u_box_size;    // sizeX, sizeY, sizeZ
uniform float u_radius;     // bevel radius (0.001 ~ 0.25)
uniform vec3 u_rot;         // rotX, rotY, rotZ in radians
uniform float u_zoom;
uniform int u_mode;         // 0: RGB, 1: HSB, 2: OKLCH
uniform bool u_invert;

// 12 Edges rendering uniforms
uniform bool u_show_front;
uniform bool u_show_back;
uniform float u_front_width;
uniform float u_back_width;
uniform bool u_front_dashed;
uniform bool u_back_dashed;
uniform vec4 u_front_color;
uniform vec4 u_back_color;

// Matrix rotation matching camera-math.ts:
// 1. X-axis (Pitch) -> 2. Y-axis (Roll) -> 3. Z-axis (Yaw)
vec3 rotateToCam(vec3 p, vec3 r) {
  // 1. X-axis (Pitch)
  float cx = cos(r.x), sx = sin(r.x);
  float x1 = p.x;
  float y1 = p.y * cx - p.z * sx;
  float z1 = p.y * sx + p.z * cx;

  // 2. Y-axis (Roll)
  float cy = cos(r.y), sy = sin(r.y);
  float x2 = x1 * cy + z1 * sy;
  float y2 = y1;
  float z2 = -x1 * sy + z1 * cy;

  // 3. Z-axis (Yaw)
  float cz = cos(r.z), sz = sin(r.z);
  float camX = x2 * cz - y2 * sz;
  float camY = x2 * sz + y2 * cz;
  float camZ = z2;

  return vec3(camX, camY, camZ);
}

// Inverse rotation from Cam space back to Local box space
// Mathematically exact inverse of transform3D:
// p_cam = Rz * [ Ry * (Rx * p_local) ]
// 1. Inv Z-axis:
//   camX = x2 * cz - y2 * sz
//   camY = x2 * sz + y2 * cz
//   => x2 =  camX * cz + camY * sz
//   => y2 = -camX * sz + camY * cz
//   z2 = camZ
// 2. Inv Y-axis:
//   x2 = x1 * cy + z1 * sy
//   z2 = -x1 * sy + z1 * cy
//   => x1 = x2 * cy - z2 * sy
//   => z1 = x2 * sy + z2 * cy
//   y1 = y2
// 3. Inv X-axis:
//   x = x1
//   y1 = y * cx - z * sx
//   z1 = y * sx + z * cx
//   => y = y1 * cx + z1 * sx
//   => z = -y1 * sx + z1 * cx
vec3 rotateToLocal(vec3 p, vec3 r) {
  float cz = cos(r.z), sz = sin(r.z);
  float x2 =  p.x * cz + p.y * sz;
  float y2 = -p.x * sz + p.y * cz;
  float z2 =  p.z;

  float cy = cos(r.y), sy = sin(r.y);
  float x1 = x2 * cy - z2 * sy;
  float y1 = y2;
  float z1 = x2 * sy + z2 * cy;

  float cx = cos(r.x), sx = sin(r.x);
  float x = x1;
  float y =  y1 * cx + z1 * sx;
  float z = -y1 * sx + z1 * cx;

  return vec3(x, y, z);
}

// Inigo Quilez exact Signed Distance Function for 3D Rounded Box
float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

// Calculate surface normal
vec3 calcNormal(vec3 p, vec3 b, float r) {
  const float h = 0.0005;
  const vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * sdRoundBox(p + k.xyy * h, b, r) +
    k.yyx * sdRoundBox(p + k.yyx * h, b, r) +
    k.yxy * sdRoundBox(p + k.yxy * h, b, r) +
    k.xxx * sdRoundBox(p + k.xxx * h, b, r)
  );
}

// Convert 3D local position to RGB Color
vec3 sampleBoxColor(vec3 localPos, vec3 b) {
  // Map [-b, +b] back to [0.0, 1.0] normalized space
  vec3 norm = (localPos / (b * 2.0)) + 0.5;
  norm = clamp(norm, 0.0, 1.0);
  if (u_invert) {
    norm = 1.0 - norm;
  }
  return norm;
}

void main() {
  // Screen coordinate centered at (0, 0)
  vec2 screenPos = gl_FragCoord.xy - u_resolution * 0.5;
  
  // Exact scale factor matching project3D in camera-math.ts:
  // screen.x = center.x + camX * scale * 1.6 * zoom
  // screen.y = center.y - camY * scale * 1.6 * zoom
  float scaleFactor = u_resolution.x * 0.26 * 1.6 * u_zoom;
  
  // Note: WebGL gl_FragCoord.y is 0 at bottom, while 2D canvas is 0 at top.
  // In project3D, 2D canvas y = center.y - camY * scaleFactor.
  // In WebGL, screenPos.y = gl_FragCoord.y - center.y = +camY * scaleFactor.
  // Thus camX = screenPos.x / scaleFactor, camY = screenPos.y / scaleFactor!
  vec2 camXY = vec2(screenPos.x, screenPos.y) / scaleFactor;

  vec3 halfSize = u_box_size * 0.5;
  float minDimension = min(min(halfSize.x, halfSize.y), halfSize.z);
  float rad = clamp(u_radius, 0.0, minDimension * 0.999);

  // Orthographic ray pointing down positive Z (into screen / depth)
  vec3 rayOrigin = vec3(camXY, -5.0);
  vec3 rayDir = vec3(0.0, 0.0, 1.0);

  // Raymarching
  float t = 0.0;
  float hit = -1.0;
  vec3 pLocal = vec3(0.0);

  for (int i = 0; i < 128; i++) {
    vec3 pCam = rayOrigin + rayDir * t;
    pLocal = rotateToLocal(pCam, u_rot);
    float d = sdRoundBox(pLocal, halfSize, rad);
    if (d < 0.0005) {
      hit = t;
      break;
    }
    t += d;
    if (t > 10.0) break;
  }

  if (hit > 0.0) {
    vec3 nLocal = calcNormal(pLocal, halfSize, rad);
    vec3 col = sampleBoxColor(pLocal, halfSize);

    // Subtle edge specular rim to enhance rounded edges curvature in 3D
    vec3 nCam = rotateToCam(nLocal, u_rot);
    float rim = pow(1.0 - max(dot(nCam, vec3(0.0, 0.0, -1.0)), 0.0), 3.0) * 0.08;
    vec3 finalCol = col + vec3(rim);

    gl_FragColor = vec4(clamp(finalCol, 0.0, 1.0), 1.0);
  } else {
    discard; // Transparent background
  }
}
`;
