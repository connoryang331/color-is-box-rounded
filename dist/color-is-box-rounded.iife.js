var ColorIsBoxRounded=(()=>{var k=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var J=Object.prototype.hasOwnProperty;var oo=(o,e)=>{for(var n in e)k(o,n,{get:e[n],enumerable:!0})},eo=(o,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Q(e))!J.call(o,s)&&s!==n&&k(o,s,{get:()=>e[s],enumerable:!(i=q(e,s))||i.enumerable});return o};var to=o=>eo(k({},"__esModule",{value:!0}),o);var co={};oo(co,{createRoundedBoxPicker:()=>lo});var X={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},V={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var Y={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},O={sizeX:1,sizeY:1,sizeZ:1,radius:0};function _(o,e,n){let i=(o.x-.5)*n.sizeX,s=(o.y-.5)*n.sizeY,t=(o.z-.5)*n.sizeZ,r=Math.cos(e.rotZRad),c=Math.sin(e.rotZRad),m=i*r-s*c,l=i*c+s*r,y=t,b=Math.cos(e.rotYRad),C=Math.sin(e.rotYRad),v=m*b+y*C,a=l,d=-m*C+y*b,z=Math.cos(e.rotXRad),u=Math.sin(e.rotXRad),h=v,g=d*z-a*u,p=d*u+a*z;return{x:h,y:g,z:p}}function B(o,e,n,i,s){let t=_(o,i,s);return{x:n.x+t.x*e*1.6*i.zoom,y:n.y-t.y*e*1.6*i.zoom}}function S(o){let e=o.r/255,n=o.g/255,i=o.b/255,s=Math.max(e,n,i),t=Math.min(e,n,i),r=s-t,c=0;r!==0&&(s===e?c=((n-i)/r+6)%6:s===n?c=(i-e)/r+2:c=(e-n)/r+4,c*=60);let m=s===0?0:r/s*100,l=s*100;return{h:c,s:m,b:l}}function ro(o){let e=o.h,n=o.s/100,i=o.b/100,s=i*n,t=s*(1-Math.abs(e/60%2-1)),r=i-s,c,m,l;return e<60?(c=s,m=t,l=0):e<120?(c=t,m=s,l=0):e<180?(c=0,m=s,l=t):e<240?(c=0,m=t,l=s):e<300?(c=t,m=0,l=s):(c=s,m=0,l=t),{r:Math.round((c+r)*255),g:Math.round((m+r)*255),b:Math.round((l+r)*255)}}function T(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function E(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function no(o){let e=T(o.r/255),n=T(o.g/255),i=T(o.b/255),s=.4122214708*e+.5363325363*n+.0514459929*i,t=.2119034982*e+.6806995451*n+.1073969566*i,r=.0883024619*e+.2817188376*n+.6299787005*i,c=Math.cbrt(s),m=Math.cbrt(t),l=Math.cbrt(r);return{L:.2104542553*c+.793617785*m-.0040720468*l,a:1.9779984951*c-2.428592205*m+.4505937099*l,b:.0259040371*c+.7827717662*m-.808675766*l}}function ao(o,e,n){let i=o+.3963377774*e+.2158037573*n,s=o-.1055613458*e-.0638541728*n,t=o-.0894841775*e-1.291485548*n,r=i*i*i,c=s*s*s,m=t*t*t,l=4.0767416621*r-3.3077115913*c+.2309699292*m,y=-1.2684380046*r+2.6097574011*c-.3413193965*m,b=-.0041960863*r-.7034186147*c+1.707614701*m;return{r:Math.round(Math.max(0,Math.min(1,E(l)))*255),g:Math.round(Math.max(0,Math.min(1,E(y)))*255),b:Math.round(Math.max(0,Math.min(1,E(b)))*255)}}function L(o){let e=no(o),n=Math.sqrt(e.a*e.a+e.b*e.b),i=Math.atan2(e.b,e.a)*(180/Math.PI);return i<0&&(i+=360),{l:e.L,c:n,h:n<1e-4?0:i}}function P(o){let e=o.h*(Math.PI/180),n=o.c*Math.cos(e),i=o.c*Math.sin(e);return ao(o.l,n,i)}function io(o,e,n){let i=P({l:o,c:e,h:n});if(w(i))return{l:o,c:e,h:n};let s=0,t=e;for(let r=0;r<20;r++){let c=(s+t)/2;i=P({l:o,c,h:n}),w(i)?s=c:t=c}return{l:o,c:s,h:n}}function w(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function F(o){let e=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${e(o.r)}${e(o.g)}${e(o.b)}`}var Z=.4;function A(o,e){if(e==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(e==="hsb")return ro({h:o.x*359,s:o.y*100,b:o.z*100});{let n=o.x,i=o.y*Z,s=o.z*359,t=io(n,i,s);return P(t)}}function I(o,e){if(e==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(e==="hsb"){let n=S(o);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=L(o);return{x:n.l,y:Math.min(n.c/Z,1),z:n.h/359}}}var R=["#ef4444","#22c55e","#3b82f6"];function H(o,e,n,i,s,t){let r=u=>B(u,e,n,i,s),c=r({x:0,y:0,z:0});o.save();let m=1.28,l=[{p:{x:m,y:0,z:0},name:"X",color:R[0],visible:t.vertexX},{p:{x:0,y:m,z:0},name:"Y",color:R[1],visible:t.vertexY},{p:{x:0,y:0,z:m},name:"Z",color:R[2],visible:t.vertexZ}];for(let u=0;u<l.length;u++){if(!l[u].visible)continue;let h=r(l[u].p),g=l[u].color;o.beginPath(),o.moveTo(c.x,c.y),o.lineTo(h.x,h.y),o.strokeStyle=g,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(h.x,h.y,3.5,0,Math.PI*2),o.fillStyle=g,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let p=h.x-c.x,f=h.y-c.y,x=Math.hypot(p,f)||1,M=12,D=h.x+p/x*M,G=h.y+f/x*M;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=g,o.fillText(l[u].name,D,G)}(t.vertexX||t.vertexY||t.vertexZ)&&(o.beginPath(),o.arc(c.x,c.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let y=r({x:.5,y:.5,z:.5}),b=.35,C=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:R[0],name:"Cx",visible:t.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:R[1],name:"Cy",visible:t.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:R[2],name:"Cz",visible:t.centerZ}],v=!1;for(let u=0;u<C.length;u++){if(!C[u].visible)continue;v=!0;let h=r(C[u].from),g=r(C[u].to);o.beginPath(),o.moveTo(h.x,h.y),o.lineTo(g.x,g.y),o.strokeStyle=C[u].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(h.x,h.y,3,0,Math.PI*2),o.arc(g.x,g.y,3,0,Math.PI*2),o.fillStyle=C[u].color,o.fill()}v&&(o.beginPath(),o.arc(y.x,y.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let a=t.angleGuides!==void 0?t.angleGuides:t.yawArc||t.pitchArc||!1,d=Math.round(i.rotZRad*180/Math.PI*10)/10,z=Math.round(i.rotXRad*180/Math.PI*10)/10;if(a){o.beginPath();let u=36;for(let g=0;g<=u;g++){let p=g/u*Math.PI*2,f={x:.5+Math.cos(p)*.75,y:.5+Math.sin(p)*.75,z:0},x=r(f);g===0?o.moveTo(x.x,x.y):o.lineTo(x.x,x.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let h=20;for(let g=0;g<=h;g++){let p=-Math.PI/2+g/h*Math.PI,f={x:.5+Math.cos(p)*.75,y:.5,z:.5+Math.sin(p)*.75},x=r(f);g===0?o.moveTo(x.x,x.y):o.lineTo(x.x,x.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${d.toFixed(1)}\xB0`,12,n.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${z.toFixed(1)}\xB0`,12,n.y*2-10)}o.restore()}var U=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,W=`
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform vec3 u_box_size;    // sizeX, sizeY, sizeZ
uniform float u_radius;     // bevel radius (0.001 ~ 0.25)
uniform vec3 u_rot;         // rotX, rotY, rotZ in radians
uniform float u_zoom;
uniform int u_mode;         // 0: RGB, 1: HSB, 2: OKLCH
uniform bool u_invert;

// Matrix rotation matching camera-math.ts:
// 1. Z-axis (Yaw) -> 2. Y-axis (Roll) -> 3. X-axis (Pitch)
vec3 rotateToCam(vec3 p, vec3 r) {
  // 1. Z-axis (Yaw)
  float cz = cos(r.z), sz = sin(r.z);
  float x1 = p.x * cz - p.y * sz;
  float y1 = p.x * sz + p.y * cz;
  float z1 = p.z;

  // 2. Y-axis (Roll)
  float cy = cos(r.y), sy = sin(r.y);
  float x2 = x1 * cy + z1 * sy;
  float y2 = y1;
  float z2 = -x1 * sy + z1 * cy;

  // 3. X-axis (Pitch)
  float cx = cos(r.x), sx = sin(r.x);
  float camX = x2;
  float camY = z2 * cx - y2 * sx;
  float camZ = z2 * sx + y2 * cx;

  return vec3(camX, camY, camZ);
}

// Inverse rotation from Cam space back to Local box space
// Mathematically exact inverse of transform3D:
// p_cam = Rx * [ Ry * (Rz * p_local) ]
// 1. Inv X-axis:
//   camY = z2 * cx - y2 * sx
//   camZ = z2 * sx + y2 * cx
//   => y2 = -camY * sx + camZ * cx
//   => z2 =  camY * cx + camZ * sx
//   x2 = camX
// 2. Inv Y-axis:
//   x2 = x1 * cy + z1 * sy
//   z2 = -x1 * sy + z1 * cy
//   => x1 = x2 * cy - z2 * sy
//   => z1 = x2 * sy + z2 * cy
//   y1 = y2
// 3. Inv Z-axis:
//   x1 = x * cz - y * sz
//   y1 = x * sz + y * cz
//   => x = x1 * cz + y1 * sz
//   => y = -x1 * sz + y1 * cz
//   z = z1
vec3 rotateToLocal(vec3 p, vec3 r) {
  float cx = cos(r.x), sx = sin(r.x);
  float x2 = p.x;
  float y2 = -p.y * sx + p.z * cx;
  float z2 =  p.y * cx + p.z * sx;

  float cy = cos(r.y), sy = sin(r.y);
  float x1 = x2 * cy - z2 * sy;
  float y1 = y2;
  float z1 = x2 * sy + z2 * cy;

  float cz = cos(r.z), sz = sin(r.z);
  float x =  x1 * cz + y1 * sz;
  float y = -x1 * sz + y1 * cz;
  float z = z1;

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
`;function N(o,e){let n=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${e}px`,i.style.height=`${e}px`,i.style.userSelect="none";let s=document.createElement("canvas");s.width=e*n,s.height=e*n,s.style.width=`${e}px`,s.style.height=`${e}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let t=document.createElement("canvas");t.width=e*n,t.height=e*n,t.style.width=`${e}px`,t.style.height=`${e}px`,t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",i.appendChild(s),i.appendChild(t),o.appendChild(i);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),c=t.getContext("2d");c.scale(n,n);let m=(d,z)=>{let u=r.createShader(d);return r.shaderSource(u,z),r.compileShader(u),r.getShaderParameter(u,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(u)),u},l=m(r.VERTEX_SHADER,U),y=m(r.FRAGMENT_SHADER,W),b=r.createProgram();r.attachShader(b,l),r.attachShader(b,y),r.linkProgram(b);let C=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,C),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let v=r.getAttribLocation(b,"position");r.enableVertexAttribArray(v),r.vertexAttribPointer(v,2,r.FLOAT,!1,0,0);let a={u_resolution:r.getUniformLocation(b,"u_resolution"),u_box_size:r.getUniformLocation(b,"u_box_size"),u_radius:r.getUniformLocation(b,"u_radius"),u_rot:r.getUniformLocation(b,"u_rot"),u_zoom:r.getUniformLocation(b,"u_zoom"),u_mode:r.getUniformLocation(b,"u_mode"),u_invert:r.getUniformLocation(b,"u_invert")};return{gl:r,overlayCtx:c,canvasGL:s,canvasOverlay:t,width:e,height:e,program:b,uniforms:a}}function so(o,e,n,i,s,t){if(!t.showFront&&!t.showBack)return;let r=a=>B(a,e,n,i,s),c=Math.min(s.radius||0,.49),m=c,l=c,y=c,b=[{from:{x:m,y:0,z:0},to:{x:1-m,y:0,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:l,z:0},to:{x:1,y:1-l,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{from:{x:1-m,y:1,z:0},to:{x:m,y:1,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-l,z:0},to:{x:0,y:l,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{from:{x:m,y:0,z:1},to:{x:1-m,y:0,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:l,z:1},to:{x:1,y:1-l,z:1},normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{from:{x:1-m,y:1,z:1},to:{x:m,y:1,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-l,z:1},to:{x:0,y:l,z:1},normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{from:{x:0,y:0,z:y},to:{x:0,y:0,z:1-y},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:0,z:y},to:{x:1,y:0,z:1-y},normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:1,z:y},to:{x:1,y:1,z:1-y},normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1,z:y},to:{x:0,y:1,z:1-y},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}],C=[];if(c>.005){let a=[{c:{x:m,y:l,z:y},sign:{x:-1,y:-1,z:-1}},{c:{x:1-m,y:l,z:y},sign:{x:1,y:-1,z:-1}},{c:{x:m,y:1-l,z:y},sign:{x:-1,y:1,z:-1}},{c:{x:1-m,y:1-l,z:y},sign:{x:1,y:1,z:-1}},{c:{x:m,y:l,z:1-y},sign:{x:-1,y:-1,z:1}},{c:{x:1-m,y:l,z:1-y},sign:{x:1,y:-1,z:1}},{c:{x:m,y:1-l,z:1-y},sign:{x:-1,y:1,z:1}},{c:{x:1-m,y:1-l,z:1-y},sign:{x:1,y:1,z:1}}];for(let d of a)C.push({center:d.c,axisA:{x:d.sign.x*m,y:0,z:0},axisB:{x:0,y:d.sign.y*l,z:0},normalA:{x:d.sign.x,y:0,z:0},normalB:{x:0,y:d.sign.y,z:0}}),C.push({center:d.c,axisA:{x:d.sign.x*m,y:0,z:0},axisB:{x:0,y:0,z:d.sign.z*y},normalA:{x:d.sign.x,y:0,z:0},normalB:{x:0,y:0,z:d.sign.z}}),C.push({center:d.c,axisA:{x:0,y:d.sign.y*l,z:0},axisB:{x:0,y:0,z:d.sign.z*y},normalA:{x:0,y:d.sign.y,z:0},normalB:{x:0,y:0,z:d.sign.z}})}let v=a=>{let d=_({x:.5,y:.5,z:.5},i,s);return _({x:.5+a.x*.1,y:.5+a.y*.1,z:.5+a.z*.1},i,s).z-d.z>0};if(o.save(),t.showBack){o.lineWidth=t.backWidth,t.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=t.backColor,o.globalAlpha=t.backOpacity;for(let a of b)if(!(v(a.normalA)||v(a.normalB))){let z=r(a.from),u=r(a.to);o.beginPath(),o.moveTo(z.x,z.y),o.lineTo(u.x,u.y),o.stroke()}for(let a of C)if(!(v(a.normalA)||v(a.normalB))){o.beginPath();let z=8;for(let u=0;u<=z;u++){let h=u/z*(Math.PI*.5),g={x:a.center.x+a.axisA.x*Math.cos(h)+a.axisB.x*Math.sin(h),y:a.center.y+a.axisA.y*Math.cos(h)+a.axisB.y*Math.sin(h),z:a.center.z+a.axisA.z*Math.cos(h)+a.axisB.z*Math.sin(h)},p=r(g);u===0?o.moveTo(p.x,p.y):o.lineTo(p.x,p.y)}o.stroke()}}if(t.showFront){o.lineWidth=t.frontWidth,t.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=t.frontColor,o.globalAlpha=t.frontOpacity;for(let a of b)if(v(a.normalA)||v(a.normalB)){let z=r(a.from),u=r(a.to);o.beginPath(),o.moveTo(z.x,z.y),o.lineTo(u.x,u.y),o.stroke()}for(let a of C)if(v(a.normalA)||v(a.normalB)){o.beginPath();let z=8;for(let u=0;u<=z;u++){let h=u/z*(Math.PI*.5),g={x:a.center.x+a.axisA.x*Math.cos(h)+a.axisB.x*Math.sin(h),y:a.center.y+a.axisA.y*Math.cos(h)+a.axisB.y*Math.sin(h),z:a.center.z+a.axisA.z*Math.cos(h)+a.axisB.z*Math.sin(h)},p=r(g);u===0?o.moveTo(p.x,p.y):o.lineTo(p.x,p.y)}o.stroke()}}o.restore()}function $(o,e,n,i,s,t,r,c,m){let{gl:l,overlayCtx:y,width:b,height:C,program:v,uniforms:a}=o,d=window.devicePixelRatio||1;l.viewport(0,0,b*d,C*d),l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),l.useProgram(v),l.uniform2f(a.u_resolution,b*d,C*d),l.uniform3f(a.u_box_size,n.sizeX,n.sizeY,n.sizeZ),l.uniform1f(a.u_radius,n.radius||.001),l.uniform3f(a.u_rot,e.rotXRad,e.rotYRad,e.rotZRad),l.uniform1f(a.u_zoom,e.zoom||1),l.uniform1i(a.u_mode,i==="rgb"?0:i==="hsb"?1:2),l.uniform1i(a.u_invert,s?1:0),l.drawArrays(l.TRIANGLES,0,6),y.save(),y.clearRect(0,0,b,C);let z=b*.26,u={x:b*.5,y:C*.5};if(so(y,z,u,e,n,r),H(y,z,u,e,n,t),m){let h=B(c,z,u,e,n),g=A(c,i),p=s?{r:255-g.r,g:255-g.g,b:255-g.b}:g;y.beginPath(),y.arc(h.x,h.y,6,0,Math.PI*2),y.fillStyle=`rgb(${p.r}, ${p.g}, ${p.b})`,y.fill(),y.strokeStyle="#ffffff",y.lineWidth=2,y.stroke()}y.restore()}function lo(o,e={}){let n=e.size||460,i=e.mode||"rgb",s=!1,t={...Y},r={...O,radius:.08},c={...V},m={...X},l=e.initialColor||{r:255,g:255,b:255},y=I(l,i),b=new Set,C=N(o,n),v=null,a=()=>{v===null&&(v=requestAnimationFrame(()=>{v=null,$(C,t,r,i,s,c,m,y,!0)}))},d=()=>{let f=A(y,i),x=s?{r:255-f.r,g:255-f.g,b:255-f.b}:f,M=S(x),D=L(x),G=F(x),j={rgb:x,hsb:M,oklch:D,hex:G,alpha:1};b.forEach(K=>K(j))},z=!1,u=0,h=0,g=t.rotZRad,p=t.rotXRad;return C.canvasGL.addEventListener("mousedown",f=>{z=!0,u=f.clientX,h=f.clientY,g=t.rotZRad,p=t.rotXRad}),window.addEventListener("mousemove",f=>{if(!z)return;let x=f.clientX-u,M=f.clientY-h;t.rotZRad=g+x*.01,t.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,p-M*.01)),a()}),window.addEventListener("mouseup",()=>{z=!1}),C.canvasGL.addEventListener("dblclick",()=>{s=!s,d(),a()}),a(),d(),{getColor:()=>{let f=A(y,i),x=s?{r:255-f.r,g:255-f.g,b:255-f.b}:f;return{rgb:x,hsb:S(x),oklch:L(x),hex:F(x),alpha:1}},setColor:f=>{l=f,y=I(f,i),d(),a()},setMode:f=>{i=f,d(),a()},getMode:()=>i,setRotation:(f,x)=>{t.rotZRad=f*Math.PI/180,t.rotXRad=x*Math.PI/180,a()},getAxisRotation:()=>({rotXDeg:Math.round(t.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(t.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(t.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(f,x,M)=>{t.rotXRad=f*Math.PI/180,t.rotYRad=x*Math.PI/180,t.rotZRad=M*Math.PI/180,a()},setZoom:f=>{t.zoom=Math.max(.1,Math.min(3,f)),a()},getZoom:()=>t.zoom||1,setDimensions:(f,x,M)=>{r.sizeX=Math.max(.2,Math.min(2.5,f)),r.sizeY=Math.max(.2,Math.min(2.5,x)),r.sizeZ=Math.max(.2,Math.min(2.5,M)),a()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:f=>{r.radius=Math.max(0,Math.min(.5,f)),a()},getRadius:()=>r.radius,getEdgeStyle:()=>({...m}),setEdgeStyle:f=>{m={...m,...f},a()},getGuides:()=>({...c}),setGuides:f=>{c={...c,...f},a()},toggleAllGuides:f=>{let x=f!==void 0?f:!c.vertexX;c={vertexX:x,vertexY:x,vertexZ:x,centerX:x,centerY:x,centerZ:x,angleGuides:x},a()},on:(f,x)=>{b.add(x)},off:(f,x)=>{b.delete(x)},destroy:()=>{v!==null&&cancelAnimationFrame(v),o.innerHTML=""}}}return to(co);})();
