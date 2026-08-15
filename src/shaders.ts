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

// Matrix rotation
mat3 getRotMatrix(vec3 r) {
  float cx = cos(r.x), sx = sin(r.x);
  float cy = cos(r.y), sy = sin(r.y);
  float cz = cos(r.z), sz = sin(r.z);

  mat3 rz = mat3(
    cz, -sz, 0.0,
    sz,  cz, 0.0,
    0.0, 0.0, 1.0
  );
  mat3 ry = mat3(
    cy, 0.0, sy,
    0.0, 1.0, 0.0,
   -sy, 0.0, cy
  );
  mat3 rx = mat3(
    1.0, 0.0, 0.0,
    0.0, cx, -sx,
    0.0, sx,  cx
  );
  return rx * ry * rz;
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
vec3 sampleBoxColor(vec3 localPos, vec3 b, float r) {
  // Map [-b, +b] back to [0.0, 1.0] normalized RGB space
  vec3 norm = (localPos / (b * 2.0)) + 0.5;
  norm = clamp(norm, 0.0, 1.0);
  if (u_invert) {
    norm = 1.0 - norm;
  }
  return norm;
}

void main() {
  vec2 st = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
  st.y = -st.y; // Match screen space Y

  vec3 halfSize = u_box_size * 0.5;
  float rad = clamp(u_radius, 0.001, min(min(halfSize.x, halfSize.y), halfSize.z) * 0.95);

  mat3 rot = getRotMatrix(u_rot);
  mat3 invRot = mat3(
    rot[0][0], rot[1][0], rot[2][0],
    rot[0][1], rot[1][1], rot[2][1],
    rot[0][2], rot[1][2], rot[2][2]
  );

  // Orthographic ray
  float viewScale = 0.28 * u_zoom;
  vec3 rayOrigin = vec3(st / viewScale, -4.0);
  vec3 rayDir = vec3(0.0, 0.0, 1.0);

  // Raymarching
  float t = 0.0;
  float hit = -1.0;
  vec3 pLocal = vec3(0.0);

  for (int i = 0; i < 96; i++) {
    vec3 pCam = rayOrigin + rayDir * t;
    pLocal = invRot * pCam;
    float d = sdRoundBox(pLocal, halfSize, rad);
    if (d < 0.001) {
      hit = t;
      break;
    }
    t += d;
    if (t > 8.0) break;
  }

  if (hit > 0.0) {
    vec3 nLocal = calcNormal(pLocal, halfSize, rad);
    vec3 col = sampleBoxColor(pLocal, halfSize, rad);

    // Subtle ambient lighting & curvature shading for hyper-realistic 3D look
    vec3 nCam = rot * nLocal;
    vec3 lightDir = normalize(vec3(0.3, 0.6, -1.0));
    float diff = max(dot(nCam, -lightDir), 0.0) * 0.12;
    float rim = pow(1.0 - max(dot(nCam, vec3(0.0, 0.0, -1.0)), 0.0), 2.5) * 0.15;

    vec3 finalCol = col * (0.92 + diff) + vec3(rim);
    gl_FragColor = vec4(clamp(finalCol, 0.0, 1.0), 1.0);
  } else {
    discard; // Transparent background
  }
}
`;
