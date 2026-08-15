var I={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},X={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var V={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},Y={sizeX:1,sizeY:1,sizeZ:1,radius:0};function _(o,e,a){let i=(o.x-.5)*a.sizeX,l=(o.y-.5)*a.sizeY,t=(o.z-.5)*a.sizeZ,r=Math.cos(e.rotZRad),c=Math.sin(e.rotZRad),m=i*r-l*c,s=i*c+l*r,y=t,b=Math.cos(e.rotYRad),C=Math.sin(e.rotYRad),v=m*b+y*C,n=s,d=-m*C+y*b,z=Math.cos(e.rotXRad),u=Math.sin(e.rotXRad),h=v,g=d*z-n*u,p=d*u+n*z;return{x:h,y:g,z:p}}function B(o,e,a,i,l){let t=_(o,i,l);return{x:a.x+t.x*e*1.6*i.zoom,y:a.y-t.y*e*1.6*i.zoom}}function S(o){let e=o.r/255,a=o.g/255,i=o.b/255,l=Math.max(e,a,i),t=Math.min(e,a,i),r=l-t,c=0;r!==0&&(l===e?c=((a-i)/r+6)%6:l===a?c=(i-e)/r+2:c=(e-a)/r+4,c*=60);let m=l===0?0:r/l*100,s=l*100;return{h:c,s:m,b:s}}function K(o){let e=o.h,a=o.s/100,i=o.b/100,l=i*a,t=l*(1-Math.abs(e/60%2-1)),r=i-l,c,m,s;return e<60?(c=l,m=t,s=0):e<120?(c=t,m=l,s=0):e<180?(c=0,m=l,s=t):e<240?(c=0,m=t,s=l):e<300?(c=t,m=0,s=l):(c=l,m=0,s=t),{r:Math.round((c+r)*255),g:Math.round((m+r)*255),b:Math.round((s+r)*255)}}function k(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function T(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function q(o){let e=k(o.r/255),a=k(o.g/255),i=k(o.b/255),l=.4122214708*e+.5363325363*a+.0514459929*i,t=.2119034982*e+.6806995451*a+.1073969566*i,r=.0883024619*e+.2817188376*a+.6299787005*i,c=Math.cbrt(l),m=Math.cbrt(t),s=Math.cbrt(r);return{L:.2104542553*c+.793617785*m-.0040720468*s,a:1.9779984951*c-2.428592205*m+.4505937099*s,b:.0259040371*c+.7827717662*m-.808675766*s}}function Q(o,e,a){let i=o+.3963377774*e+.2158037573*a,l=o-.1055613458*e-.0638541728*a,t=o-.0894841775*e-1.291485548*a,r=i*i*i,c=l*l*l,m=t*t*t,s=4.0767416621*r-3.3077115913*c+.2309699292*m,y=-1.2684380046*r+2.6097574011*c-.3413193965*m,b=-.0041960863*r-.7034186147*c+1.707614701*m;return{r:Math.round(Math.max(0,Math.min(1,T(s)))*255),g:Math.round(Math.max(0,Math.min(1,T(y)))*255),b:Math.round(Math.max(0,Math.min(1,T(b)))*255)}}function L(o){let e=q(o),a=Math.sqrt(e.a*e.a+e.b*e.b),i=Math.atan2(e.b,e.a)*(180/Math.PI);return i<0&&(i+=360),{l:e.L,c:a,h:a<1e-4?0:i}}function E(o){let e=o.h*(Math.PI/180),a=o.c*Math.cos(e),i=o.c*Math.sin(e);return Q(o.l,a,i)}function J(o,e,a){let i=E({l:o,c:e,h:a});if(O(i))return{l:o,c:e,h:a};let l=0,t=e;for(let r=0;r<20;r++){let c=(l+t)/2;i=E({l:o,c,h:a}),O(i)?l=c:t=c}return{l:o,c:l,h:a}}function O(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function P(o){let e=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${e(o.r)}${e(o.g)}${e(o.b)}`}var w=.4;function A(o,e){if(e==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(e==="hsb")return K({h:o.x*359,s:o.y*100,b:o.z*100});{let a=o.x,i=o.y*w,l=o.z*359,t=J(a,i,l);return E(t)}}function F(o,e){if(e==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(e==="hsb"){let a=S(o);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=L(o);return{x:a.l,y:Math.min(a.c/w,1),z:a.h/359}}}var R=["#ef4444","#22c55e","#3b82f6"];function Z(o,e,a,i,l,t){let r=u=>B(u,e,a,i,l),c=r({x:0,y:0,z:0});o.save();let m=1.28,s=[{p:{x:m,y:0,z:0},name:"X",color:R[0],visible:t.vertexX},{p:{x:0,y:m,z:0},name:"Y",color:R[1],visible:t.vertexY},{p:{x:0,y:0,z:m},name:"Z",color:R[2],visible:t.vertexZ}];for(let u=0;u<s.length;u++){if(!s[u].visible)continue;let h=r(s[u].p),g=s[u].color;o.beginPath(),o.moveTo(c.x,c.y),o.lineTo(h.x,h.y),o.strokeStyle=g,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(h.x,h.y,3.5,0,Math.PI*2),o.fillStyle=g,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let p=h.x-c.x,f=h.y-c.y,x=Math.hypot(p,f)||1,M=12,D=h.x+p/x*M,G=h.y+f/x*M;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=g,o.fillText(s[u].name,D,G)}(t.vertexX||t.vertexY||t.vertexZ)&&(o.beginPath(),o.arc(c.x,c.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let y=r({x:.5,y:.5,z:.5}),b=.35,C=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:R[0],name:"Cx",visible:t.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:R[1],name:"Cy",visible:t.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:R[2],name:"Cz",visible:t.centerZ}],v=!1;for(let u=0;u<C.length;u++){if(!C[u].visible)continue;v=!0;let h=r(C[u].from),g=r(C[u].to);o.beginPath(),o.moveTo(h.x,h.y),o.lineTo(g.x,g.y),o.strokeStyle=C[u].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(h.x,h.y,3,0,Math.PI*2),o.arc(g.x,g.y,3,0,Math.PI*2),o.fillStyle=C[u].color,o.fill()}v&&(o.beginPath(),o.arc(y.x,y.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let n=t.angleGuides!==void 0?t.angleGuides:t.yawArc||t.pitchArc||!1,d=Math.round(i.rotZRad*180/Math.PI*10)/10,z=Math.round(i.rotXRad*180/Math.PI*10)/10;if(n){o.beginPath();let u=36;for(let g=0;g<=u;g++){let p=g/u*Math.PI*2,f={x:.5+Math.cos(p)*.75,y:.5+Math.sin(p)*.75,z:0},x=r(f);g===0?o.moveTo(x.x,x.y):o.lineTo(x.x,x.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let h=20;for(let g=0;g<=h;g++){let p=-Math.PI/2+g/h*Math.PI,f={x:.5+Math.cos(p)*.75,y:.5,z:.5+Math.sin(p)*.75},x=r(f);g===0?o.moveTo(x.x,x.y):o.lineTo(x.x,x.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${d.toFixed(1)}\xB0`,12,a.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${z.toFixed(1)}\xB0`,12,a.y*2-10)}o.restore()}var H=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,U=`
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
`;function W(o,e){let a=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${e}px`,i.style.height=`${e}px`,i.style.userSelect="none";let l=document.createElement("canvas");l.width=e*a,l.height=e*a,l.style.width=`${e}px`,l.style.height=`${e}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let t=document.createElement("canvas");t.width=e*a,t.height=e*a,t.style.width=`${e}px`,t.style.height=`${e}px`,t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",i.appendChild(l),i.appendChild(t),o.appendChild(i);let r=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),c=t.getContext("2d");c.scale(a,a);let m=(d,z)=>{let u=r.createShader(d);return r.shaderSource(u,z),r.compileShader(u),r.getShaderParameter(u,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(u)),u},s=m(r.VERTEX_SHADER,H),y=m(r.FRAGMENT_SHADER,U),b=r.createProgram();r.attachShader(b,s),r.attachShader(b,y),r.linkProgram(b);let C=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,C),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let v=r.getAttribLocation(b,"position");r.enableVertexAttribArray(v),r.vertexAttribPointer(v,2,r.FLOAT,!1,0,0);let n={u_resolution:r.getUniformLocation(b,"u_resolution"),u_box_size:r.getUniformLocation(b,"u_box_size"),u_radius:r.getUniformLocation(b,"u_radius"),u_rot:r.getUniformLocation(b,"u_rot"),u_zoom:r.getUniformLocation(b,"u_zoom"),u_mode:r.getUniformLocation(b,"u_mode"),u_invert:r.getUniformLocation(b,"u_invert")};return{gl:r,overlayCtx:c,canvasGL:l,canvasOverlay:t,width:e,height:e,program:b,uniforms:n}}function oo(o,e,a,i,l,t){if(!t.showFront&&!t.showBack)return;let r=n=>B(n,e,a,i,l),c=Math.min(l.radius||0,.49),m=c,s=c,y=c,b=[{from:{x:m,y:0,z:0},to:{x:1-m,y:0,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:s,z:0},to:{x:1,y:1-s,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{from:{x:1-m,y:1,z:0},to:{x:m,y:1,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-s,z:0},to:{x:0,y:s,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{from:{x:m,y:0,z:1},to:{x:1-m,y:0,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:s,z:1},to:{x:1,y:1-s,z:1},normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{from:{x:1-m,y:1,z:1},to:{x:m,y:1,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-s,z:1},to:{x:0,y:s,z:1},normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{from:{x:0,y:0,z:y},to:{x:0,y:0,z:1-y},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:0,z:y},to:{x:1,y:0,z:1-y},normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:1,z:y},to:{x:1,y:1,z:1-y},normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1,z:y},to:{x:0,y:1,z:1-y},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}],C=[];if(c>.005){let n=[{c:{x:m,y:s,z:y},sign:{x:-1,y:-1,z:-1}},{c:{x:1-m,y:s,z:y},sign:{x:1,y:-1,z:-1}},{c:{x:m,y:1-s,z:y},sign:{x:-1,y:1,z:-1}},{c:{x:1-m,y:1-s,z:y},sign:{x:1,y:1,z:-1}},{c:{x:m,y:s,z:1-y},sign:{x:-1,y:-1,z:1}},{c:{x:1-m,y:s,z:1-y},sign:{x:1,y:-1,z:1}},{c:{x:m,y:1-s,z:1-y},sign:{x:-1,y:1,z:1}},{c:{x:1-m,y:1-s,z:1-y},sign:{x:1,y:1,z:1}}];for(let d of n)C.push({center:d.c,axisA:{x:d.sign.x*m,y:0,z:0},axisB:{x:0,y:d.sign.y*s,z:0},normalA:{x:d.sign.x,y:0,z:0},normalB:{x:0,y:d.sign.y,z:0}}),C.push({center:d.c,axisA:{x:d.sign.x*m,y:0,z:0},axisB:{x:0,y:0,z:d.sign.z*y},normalA:{x:d.sign.x,y:0,z:0},normalB:{x:0,y:0,z:d.sign.z}}),C.push({center:d.c,axisA:{x:0,y:d.sign.y*s,z:0},axisB:{x:0,y:0,z:d.sign.z*y},normalA:{x:0,y:d.sign.y,z:0},normalB:{x:0,y:0,z:d.sign.z}})}let v=n=>{let d=_({x:.5,y:.5,z:.5},i,l);return _({x:.5+n.x*.1,y:.5+n.y*.1,z:.5+n.z*.1},i,l).z-d.z>0};if(o.save(),t.showBack){o.lineWidth=t.backWidth,t.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=t.backColor,o.globalAlpha=t.backOpacity;for(let n of b)if(!(v(n.normalA)||v(n.normalB))){let z=r(n.from),u=r(n.to);o.beginPath(),o.moveTo(z.x,z.y),o.lineTo(u.x,u.y),o.stroke()}for(let n of C)if(!(v(n.normalA)||v(n.normalB))){o.beginPath();let z=8;for(let u=0;u<=z;u++){let h=u/z*(Math.PI*.5),g={x:n.center.x+n.axisA.x*Math.cos(h)+n.axisB.x*Math.sin(h),y:n.center.y+n.axisA.y*Math.cos(h)+n.axisB.y*Math.sin(h),z:n.center.z+n.axisA.z*Math.cos(h)+n.axisB.z*Math.sin(h)},p=r(g);u===0?o.moveTo(p.x,p.y):o.lineTo(p.x,p.y)}o.stroke()}}if(t.showFront){o.lineWidth=t.frontWidth,t.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=t.frontColor,o.globalAlpha=t.frontOpacity;for(let n of b)if(v(n.normalA)||v(n.normalB)){let z=r(n.from),u=r(n.to);o.beginPath(),o.moveTo(z.x,z.y),o.lineTo(u.x,u.y),o.stroke()}for(let n of C)if(v(n.normalA)||v(n.normalB)){o.beginPath();let z=8;for(let u=0;u<=z;u++){let h=u/z*(Math.PI*.5),g={x:n.center.x+n.axisA.x*Math.cos(h)+n.axisB.x*Math.sin(h),y:n.center.y+n.axisA.y*Math.cos(h)+n.axisB.y*Math.sin(h),z:n.center.z+n.axisA.z*Math.cos(h)+n.axisB.z*Math.sin(h)},p=r(g);u===0?o.moveTo(p.x,p.y):o.lineTo(p.x,p.y)}o.stroke()}}o.restore()}function N(o,e,a,i,l,t,r,c,m){let{gl:s,overlayCtx:y,width:b,height:C,program:v,uniforms:n}=o,d=window.devicePixelRatio||1;s.viewport(0,0,b*d,C*d),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.useProgram(v),s.uniform2f(n.u_resolution,b*d,C*d),s.uniform3f(n.u_box_size,a.sizeX,a.sizeY,a.sizeZ),s.uniform1f(n.u_radius,a.radius||.001),s.uniform3f(n.u_rot,e.rotXRad,e.rotYRad,e.rotZRad),s.uniform1f(n.u_zoom,e.zoom||1),s.uniform1i(n.u_mode,i==="rgb"?0:i==="hsb"?1:2),s.uniform1i(n.u_invert,l?1:0),s.drawArrays(s.TRIANGLES,0,6),y.save(),y.clearRect(0,0,b,C);let z=b*.26,u={x:b*.5,y:C*.5};if(oo(y,z,u,e,a,r),Z(y,z,u,e,a,t),m){let h=B(c,z,u,e,a),g=A(c,i),p=l?{r:255-g.r,g:255-g.g,b:255-g.b}:g;y.beginPath(),y.arc(h.x,h.y,6,0,Math.PI*2),y.fillStyle=`rgb(${p.r}, ${p.g}, ${p.b})`,y.fill(),y.strokeStyle="#ffffff",y.lineWidth=2,y.stroke()}y.restore()}function Do(o,e={}){let a=e.size||460,i=e.mode||"rgb",l=!1,t={...V},r={...Y,radius:.08},c={...X},m={...I},s=e.initialColor||{r:255,g:255,b:255},y=F(s,i),b=new Set,C=W(o,a),v=null,n=()=>{v===null&&(v=requestAnimationFrame(()=>{v=null,N(C,t,r,i,l,c,m,y,!0)}))},d=()=>{let f=A(y,i),x=l?{r:255-f.r,g:255-f.g,b:255-f.b}:f,M=S(x),D=L(x),G=P(x),$={rgb:x,hsb:M,oklch:D,hex:G,alpha:1};b.forEach(j=>j($))},z=!1,u=0,h=0,g=t.rotZRad,p=t.rotXRad;return C.canvasGL.addEventListener("mousedown",f=>{z=!0,u=f.clientX,h=f.clientY,g=t.rotZRad,p=t.rotXRad}),window.addEventListener("mousemove",f=>{if(!z)return;let x=f.clientX-u,M=f.clientY-h;t.rotZRad=g+x*.01,t.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,p-M*.01)),n()}),window.addEventListener("mouseup",()=>{z=!1}),C.canvasGL.addEventListener("dblclick",()=>{l=!l,d(),n()}),n(),d(),{getColor:()=>{let f=A(y,i),x=l?{r:255-f.r,g:255-f.g,b:255-f.b}:f;return{rgb:x,hsb:S(x),oklch:L(x),hex:P(x),alpha:1}},setColor:f=>{s=f,y=F(f,i),d(),n()},setMode:f=>{i=f,d(),n()},getMode:()=>i,setRotation:(f,x)=>{t.rotZRad=f*Math.PI/180,t.rotXRad=x*Math.PI/180,n()},getAxisRotation:()=>({rotXDeg:Math.round(t.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(t.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(t.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(f,x,M)=>{t.rotXRad=f*Math.PI/180,t.rotYRad=x*Math.PI/180,t.rotZRad=M*Math.PI/180,n()},setZoom:f=>{t.zoom=Math.max(.1,Math.min(3,f)),n()},getZoom:()=>t.zoom||1,setDimensions:(f,x,M)=>{r.sizeX=Math.max(.2,Math.min(2.5,f)),r.sizeY=Math.max(.2,Math.min(2.5,x)),r.sizeZ=Math.max(.2,Math.min(2.5,M)),n()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:f=>{r.radius=Math.max(0,Math.min(.5,f)),n()},getRadius:()=>r.radius,getEdgeStyle:()=>({...m}),setEdgeStyle:f=>{m={...m,...f},n()},getGuides:()=>({...c}),setGuides:f=>{c={...c,...f},n()},toggleAllGuides:f=>{let x=f!==void 0?f:!c.vertexX;c={vertexX:x,vertexY:x,vertexZ:x,centerX:x,centerY:x,centerZ:x,angleGuides:x},n()},on:(f,x)=>{b.add(x)},off:(f,x)=>{b.delete(x)},destroy:()=>{v!==null&&cancelAnimationFrame(v),o.innerHTML=""}}}export{Do as createRoundedBoxPicker};
