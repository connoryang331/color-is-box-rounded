var I={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},F={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var Y={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},O={sizeX:1,sizeY:1,sizeZ:1,radius:0};function L(e,o,n){let a=(e.x-.5)*n.sizeX,i=(e.y-.5)*n.sizeY,t=(e.z-.5)*n.sizeZ,r=Math.cos(o.rotZRad),s=Math.sin(o.rotZRad),m=a*r-i*s,l=a*s+i*r,d=t,f=Math.cos(o.rotYRad),g=Math.sin(o.rotYRad),p=m*f+d*g,h=l,z=-m*g+d*f,v=Math.cos(o.rotXRad),b=Math.sin(o.rotXRad),x=p,y=z*v-h*b,C=z*b+h*v;return{x,y,z:C}}function _(e,o,n,a,i){let t=L(e,a,i);return{x:n.x+t.x*o*1.6*a.zoom,y:n.y-t.y*o*1.6*a.zoom}}function S(e){let o=e.r/255,n=e.g/255,a=e.b/255,i=Math.max(o,n,a),t=Math.min(o,n,a),r=i-t,s=0;r!==0&&(i===o?s=((n-a)/r+6)%6:i===n?s=(a-o)/r+2:s=(o-n)/r+4,s*=60);let m=i===0?0:r/i*100,l=i*100;return{h:s,s:m,b:l}}function q(e){let o=e.h,n=e.s/100,a=e.b/100,i=a*n,t=i*(1-Math.abs(o/60%2-1)),r=a-i,s,m,l;return o<60?(s=i,m=t,l=0):o<120?(s=t,m=i,l=0):o<180?(s=0,m=i,l=t):o<240?(s=0,m=t,l=i):o<300?(s=t,m=0,l=i):(s=i,m=0,l=t),{r:Math.round((s+r)*255),g:Math.round((m+r)*255),b:Math.round((l+r)*255)}}function k(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function E(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Q(e){let o=k(e.r/255),n=k(e.g/255),a=k(e.b/255),i=.4122214708*o+.5363325363*n+.0514459929*a,t=.2119034982*o+.6806995451*n+.1073969566*a,r=.0883024619*o+.2817188376*n+.6299787005*a,s=Math.cbrt(i),m=Math.cbrt(t),l=Math.cbrt(r);return{L:.2104542553*s+.793617785*m-.0040720468*l,a:1.9779984951*s-2.428592205*m+.4505937099*l,b:.0259040371*s+.7827717662*m-.808675766*l}}function J(e,o,n){let a=e+.3963377774*o+.2158037573*n,i=e-.1055613458*o-.0638541728*n,t=e-.0894841775*o-1.291485548*n,r=a*a*a,s=i*i*i,m=t*t*t,l=4.0767416621*r-3.3077115913*s+.2309699292*m,d=-1.2684380046*r+2.6097574011*s-.3413193965*m,f=-.0041960863*r-.7034186147*s+1.707614701*m;return{r:Math.round(Math.max(0,Math.min(1,E(l)))*255),g:Math.round(Math.max(0,Math.min(1,E(d)))*255),b:Math.round(Math.max(0,Math.min(1,E(f)))*255)}}function D(e){let o=Q(e),n=Math.sqrt(o.a*o.a+o.b*o.b),a=Math.atan2(o.b,o.a)*(180/Math.PI);return a<0&&(a+=360),{l:o.L,c:n,h:n<1e-4?0:a}}function T(e){let o=e.h*(Math.PI/180),n=e.c*Math.cos(o),a=e.c*Math.sin(o);return J(e.l,n,a)}function ee(e,o,n){let a=T({l:e,c:o,h:n});if(V(a))return{l:e,c:o,h:n};let i=0,t=o;for(let r=0;r<20;r++){let s=(i+t)/2;a=T({l:e,c:s,h:n}),V(a)?i=s:t=s}return{l:e,c:i,h:n}}function V(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function P(e){let o=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var w=.4;function B(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return q({h:e.x*359,s:e.y*100,b:e.z*100});{let n=e.x,a=e.y*w,i=e.z*359,t=ee(n,a,i);return T(t)}}function X(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let n=S(e);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=D(e);return{x:n.l,y:Math.min(n.c/w,1),z:n.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function Z(e,o,n,a,i,t){let r=b=>_(b,o,n,a,i),s=r({x:0,y:0,z:0});e.save();let m=1.28,l=[{p:{x:m,y:0,z:0},name:"X",color:M[0],visible:t.vertexX},{p:{x:0,y:m,z:0},name:"Y",color:M[1],visible:t.vertexY},{p:{x:0,y:0,z:m},name:"Z",color:M[2],visible:t.vertexZ}];for(let b=0;b<l.length;b++){if(!l[b].visible)continue;let x=r(l[b].p),y=l[b].color;e.beginPath(),e.moveTo(s.x,s.y),e.lineTo(x.x,x.y),e.strokeStyle=y,e.lineWidth=2,e.setLineDash([4,2]),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(x.x,x.y,3.5,0,Math.PI*2),e.fillStyle=y,e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1,e.stroke();let C=x.x-s.x,c=x.y-s.y,u=Math.hypot(C,c)||1,R=12,A=x.x+C/u*R,G=x.y+c/u*R;e.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillStyle=y,e.fillText(l[b].name,A,G)}(t.vertexX||t.vertexY||t.vertexZ)&&(e.beginPath(),e.arc(s.x,s.y,4,0,Math.PI*2),e.fillStyle="#000000",e.fill(),e.strokeStyle="rgba(255,255,255,0.85)",e.lineWidth=1.2,e.stroke());let d=r({x:.5,y:.5,z:.5}),f=.35,g=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:M[0],name:"Cx",visible:t.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:M[1],name:"Cy",visible:t.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:M[2],name:"Cz",visible:t.centerZ}],p=!1;for(let b=0;b<g.length;b++){if(!g[b].visible)continue;p=!0;let x=r(g[b].from),y=r(g[b].to);e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(y.x,y.y),e.strokeStyle=g[b].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(x.x,x.y,3,0,Math.PI*2),e.arc(y.x,y.y,3,0,Math.PI*2),e.fillStyle=g[b].color,e.fill()}p&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke());let h=t.angleGuides!==void 0?t.angleGuides:t.yawArc||t.pitchArc||!1,z=Math.round(a.rotZRad*180/Math.PI*10)/10,v=Math.round(a.rotXRad*180/Math.PI*10)/10;if(h){e.beginPath();let b=36;for(let y=0;y<=b;y++){let C=y/b*Math.PI*2,c={x:.5+Math.cos(C)*.75,y:.5+Math.sin(C)*.75,z:0},u=r(c);y===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}e.strokeStyle="rgba(59, 130, 246, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.beginPath();let x=20;for(let y=0;y<=x;y++){let C=-Math.PI/2+y/x*Math.PI,c={x:.5+Math.cos(C)*.75,y:.5,z:.5+Math.sin(C)*.75},u=r(c);y===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}e.strokeStyle="rgba(239, 68, 68, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.font='500 11px ui-monospace, "SF Mono", monospace',e.textAlign="left",e.textBaseline="bottom",e.fillStyle="rgba(59, 130, 246, 0.9)",e.fillText(`Yaw: ${z.toFixed(1)}\xB0`,12,n.y*2-24),e.fillStyle="rgba(239, 68, 68, 0.9)",e.fillText(`Pitch: ${v.toFixed(1)}\xB0`,12,n.y*2-10)}e.restore()}var H=`
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
`;function N(e,o){let n=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.userSelect="none";let i=document.createElement("canvas");i.width=o*n,i.height=o*n,i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.position="absolute",i.style.left="0",i.style.top="0";let t=document.createElement("canvas");t.width=o*n,t.height=o*n,t.style.width=`${o}px`,t.style.height=`${o}px`,t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",a.appendChild(i),a.appendChild(t),e.appendChild(a);let r=i.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),s=t.getContext("2d");s.scale(n,n);let m=(z,v)=>{let b=r.createShader(z);return r.shaderSource(b,v),r.compileShader(b),r.getShaderParameter(b,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(b)),b},l=m(r.VERTEX_SHADER,H),d=m(r.FRAGMENT_SHADER,U),f=r.createProgram();r.attachShader(f,l),r.attachShader(f,d),r.linkProgram(f);let g=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,g),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let p=r.getAttribLocation(f,"position");r.enableVertexAttribArray(p),r.vertexAttribPointer(p,2,r.FLOAT,!1,0,0);let h={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_rot:r.getUniformLocation(f,"u_rot"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert")};return{gl:r,overlayCtx:s,canvasGL:i,canvasOverlay:t,width:o,height:o,program:f,uniforms:h}}var W=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function oe(e,o,n,a,i,t){if(!t.showFront&&!t.showBack)return;let r=d=>_(d,o,n,a,i),m=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),l=d=>{let f=L({x:.5,y:.5,z:.5},a,i);return L({x:.5+d.x*.1,y:.5+d.y*.1,z:.5+d.z*.1},a,i).z-f.z>0};if(e.save(),t.showBack){e.lineWidth=t.backWidth,t.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=t.backColor,e.globalAlpha=t.backOpacity;for(let d of W)if(!(l(d.normalA)||l(d.normalB))){let[g,p]=d.edge;e.beginPath(),e.moveTo(m[g].x,m[g].y),e.lineTo(m[p].x,m[p].y),e.stroke()}}if(t.showFront){e.lineWidth=t.frontWidth,t.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=t.frontColor,e.globalAlpha=t.frontOpacity;for(let d of W)if(l(d.normalA)||l(d.normalB)){let[g,p]=d.edge;e.beginPath(),e.moveTo(m[g].x,m[g].y),e.lineTo(m[p].x,m[p].y),e.stroke()}}e.restore()}function $(e,o,n,a,i,t,r,s,m){let{gl:l,overlayCtx:d,width:f,height:g,program:p,uniforms:h}=e,z=window.devicePixelRatio||1;l.viewport(0,0,f*z,g*z),l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),l.useProgram(p),l.uniform2f(h.u_resolution,f*z,g*z),l.uniform3f(h.u_box_size,n.sizeX,n.sizeY,n.sizeZ),l.uniform1f(h.u_radius,n.radius||.001),l.uniform3f(h.u_rot,o.rotXRad,o.rotYRad,o.rotZRad),l.uniform1f(h.u_zoom,o.zoom||1),l.uniform1i(h.u_mode,a==="rgb"?0:a==="hsb"?1:2),l.uniform1i(h.u_invert,i?1:0),l.drawArrays(l.TRIANGLES,0,6),d.save(),d.clearRect(0,0,f,g);let v=f*.26,b={x:f*.5,y:g*.5};if(oe(d,v,b,o,n,r),Z(d,v,b,o,n,t),m){let x=_(s,v,b,o,n),y=B(s,a),C=i?{r:255-y.r,g:255-y.g,b:255-y.b}:y;d.beginPath(),d.arc(x.x,x.y,6,0,Math.PI*2),d.fillStyle=`rgb(${C.r}, ${C.g}, ${C.b})`,d.fill(),d.strokeStyle="#ffffff",d.lineWidth=2,d.stroke()}d.restore()}function Ae(e,o={}){let n=o.size||460,a=o.mode||"rgb",i=!1,t={...Y},r={...O,radius:.08},s={...F},m={...I},l=o.initialColor||{r:255,g:255,b:255},d=X(l,a),f=new Set,g=N(e,n),p=null,h=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,$(g,t,r,a,i,s,m,d,!0)}))},z=()=>{let c=B(d,a),u=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c,R=S(u),A=D(u),G=P(u),j={rgb:u,hsb:R,oklch:A,hex:G,alpha:1};f.forEach(K=>K(j))},v=!1,b=0,x=0,y=t.rotZRad,C=t.rotXRad;return g.canvasGL.addEventListener("mousedown",c=>{v=!0,b=c.clientX,x=c.clientY,y=t.rotZRad,C=t.rotXRad}),window.addEventListener("mousemove",c=>{if(!v)return;let u=c.clientX-b,R=c.clientY-x;t.rotZRad=y+u*.01,t.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,C-R*.01)),h()}),window.addEventListener("mouseup",()=>{v=!1}),g.canvasGL.addEventListener("dblclick",()=>{i=!i,z(),h()}),h(),z(),{getColor:()=>{let c=B(d,a),u=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c;return{rgb:u,hsb:S(u),oklch:D(u),hex:P(u),alpha:1}},setColor:c=>{l=c,d=X(c,a),z(),h()},setMode:c=>{a=c,z(),h()},getMode:()=>a,setRotation:(c,u)=>{t.rotZRad=c*Math.PI/180,t.rotXRad=u*Math.PI/180,h()},getAxisRotation:()=>({rotXDeg:Math.round(t.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(t.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(t.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(c,u,R)=>{t.rotXRad=c*Math.PI/180,t.rotYRad=u*Math.PI/180,t.rotZRad=R*Math.PI/180,h()},setZoom:c=>{t.zoom=Math.max(.1,Math.min(3,c)),h()},getZoom:()=>t.zoom||1,setDimensions:(c,u,R)=>{r.sizeX=Math.max(.2,Math.min(2.5,c)),r.sizeY=Math.max(.2,Math.min(2.5,u)),r.sizeZ=Math.max(.2,Math.min(2.5,R)),h()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:c=>{r.radius=Math.max(0,Math.min(.5,c)),h()},getRadius:()=>r.radius,getEdgeStyle:()=>({...m}),setEdgeStyle:c=>{m={...m,...c},h()},getGuides:()=>({...s}),setGuides:c=>{s={...s,...c},h()},toggleAllGuides:c=>{let u=c!==void 0?c:!s.vertexX;s={vertexX:u,vertexY:u,vertexZ:u,centerX:u,centerY:u,centerZ:u,angleGuides:u},h()},on:(c,u)=>{f.add(u)},off:(c,u)=>{f.delete(u)},destroy:()=>{p!==null&&cancelAnimationFrame(p),e.innerHTML=""}}}export{Ae as createRoundedBoxPicker};
