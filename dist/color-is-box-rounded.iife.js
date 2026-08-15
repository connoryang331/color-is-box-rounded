var ColorIsBoxRounded=(()=>{var k=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var ee=Object.prototype.hasOwnProperty;var oe=(e,o)=>{for(var n in o)k(e,n,{get:o[n],enumerable:!0})},te=(e,o,n,a)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of J(o))!ee.call(e,i)&&i!==n&&k(e,i,{get:()=>o[i],enumerable:!(a=Q(o,i))||a.enumerable});return e};var re=e=>te(k({},"__esModule",{value:!0}),e);var me={};oe(me,{createRoundedBoxPicker:()=>ce});var O={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},F={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var V={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},w={sizeX:1,sizeY:1,sizeZ:1,radius:0};function S(e,o,n){let a=(e.x-.5)*n.sizeX,i=(e.y-.5)*n.sizeY,t=(e.z-.5)*n.sizeZ,r=Math.cos(o.rotZRad),s=Math.sin(o.rotZRad),m=a*r-i*s,l=a*s+i*r,d=t,f=Math.cos(o.rotYRad),y=Math.sin(o.rotYRad),p=m*f+d*y,h=l,v=-m*y+d*f,R=Math.cos(o.rotXRad),b=Math.sin(o.rotXRad),C=p,g=v*R-h*b,x=v*b+h*R;return{x:C,y:g,z:x}}function _(e,o,n,a,i){let t=S(e,a,i);return{x:n.x+t.x*o*1.6*a.zoom,y:n.y-t.y*o*1.6*a.zoom}}function A(e){let o=e.r/255,n=e.g/255,a=e.b/255,i=Math.max(o,n,a),t=Math.min(o,n,a),r=i-t,s=0;r!==0&&(i===o?s=((n-a)/r+6)%6:i===n?s=(a-o)/r+2:s=(o-n)/r+4,s*=60);let m=i===0?0:r/i*100,l=i*100;return{h:s,s:m,b:l}}function ne(e){let o=e.h,n=e.s/100,a=e.b/100,i=a*n,t=i*(1-Math.abs(o/60%2-1)),r=a-i,s,m,l;return o<60?(s=i,m=t,l=0):o<120?(s=t,m=i,l=0):o<180?(s=0,m=i,l=t):o<240?(s=0,m=t,l=i):o<300?(s=t,m=0,l=i):(s=i,m=0,l=t),{r:Math.round((s+r)*255),g:Math.round((m+r)*255),b:Math.round((l+r)*255)}}function E(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function T(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function ae(e){let o=E(e.r/255),n=E(e.g/255),a=E(e.b/255),i=.4122214708*o+.5363325363*n+.0514459929*a,t=.2119034982*o+.6806995451*n+.1073969566*a,r=.0883024619*o+.2817188376*n+.6299787005*a,s=Math.cbrt(i),m=Math.cbrt(t),l=Math.cbrt(r);return{L:.2104542553*s+.793617785*m-.0040720468*l,a:1.9779984951*s-2.428592205*m+.4505937099*l,b:.0259040371*s+.7827717662*m-.808675766*l}}function ie(e,o,n){let a=e+.3963377774*o+.2158037573*n,i=e-.1055613458*o-.0638541728*n,t=e-.0894841775*o-1.291485548*n,r=a*a*a,s=i*i*i,m=t*t*t,l=4.0767416621*r-3.3077115913*s+.2309699292*m,d=-1.2684380046*r+2.6097574011*s-.3413193965*m,f=-.0041960863*r-.7034186147*s+1.707614701*m;return{r:Math.round(Math.max(0,Math.min(1,T(l)))*255),g:Math.round(Math.max(0,Math.min(1,T(d)))*255),b:Math.round(Math.max(0,Math.min(1,T(f)))*255)}}function D(e){let o=ae(e),n=Math.sqrt(o.a*o.a+o.b*o.b),a=Math.atan2(o.b,o.a)*(180/Math.PI);return a<0&&(a+=360),{l:o.L,c:n,h:n<1e-4?0:a}}function P(e){let o=e.h*(Math.PI/180),n=e.c*Math.cos(o),a=e.c*Math.sin(o);return ie(e.l,n,a)}function se(e,o,n){let a=P({l:e,c:o,h:n});if(Y(a))return{l:e,c:o,h:n};let i=0,t=o;for(let r=0;r<20;r++){let s=(i+t)/2;a=P({l:e,c:s,h:n}),Y(a)?i=s:t=s}return{l:e,c:i,h:n}}function Y(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function I(e){let o=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Z=.4;function B(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return ne({h:e.x*359,s:e.y*100,b:e.z*100});{let n=e.x,a=e.y*Z,i=e.z*359,t=se(n,a,i);return P(t)}}function X(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let n=A(e);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=D(e);return{x:n.l,y:Math.min(n.c/Z,1),z:n.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function H(e,o,n,a,i,t){let r=b=>_(b,o,n,a,i),s=r({x:0,y:0,z:0});e.save();let m=1.28,l=[{p:{x:m,y:0,z:0},name:"X",color:M[0],visible:t.vertexX},{p:{x:0,y:m,z:0},name:"Y",color:M[1],visible:t.vertexY},{p:{x:0,y:0,z:m},name:"Z",color:M[2],visible:t.vertexZ}];for(let b=0;b<l.length;b++){if(!l[b].visible)continue;let C=r(l[b].p),g=l[b].color;e.beginPath(),e.moveTo(s.x,s.y),e.lineTo(C.x,C.y),e.strokeStyle=g,e.lineWidth=2,e.setLineDash([4,2]),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(C.x,C.y,3.5,0,Math.PI*2),e.fillStyle=g,e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1,e.stroke();let x=C.x-s.x,c=C.y-s.y,u=Math.hypot(x,c)||1,z=12,L=C.x+x/u*z,G=C.y+c/u*z;e.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillStyle=g,e.fillText(l[b].name,L,G)}(t.vertexX||t.vertexY||t.vertexZ)&&(e.beginPath(),e.arc(s.x,s.y,4,0,Math.PI*2),e.fillStyle="#000000",e.fill(),e.strokeStyle="rgba(255,255,255,0.85)",e.lineWidth=1.2,e.stroke());let d=r({x:.5,y:.5,z:.5}),f=.35,y=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:M[0],name:"Cx",visible:t.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:M[1],name:"Cy",visible:t.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:M[2],name:"Cz",visible:t.centerZ}],p=!1;for(let b=0;b<y.length;b++){if(!y[b].visible)continue;p=!0;let C=r(y[b].from),g=r(y[b].to);e.beginPath(),e.moveTo(C.x,C.y),e.lineTo(g.x,g.y),e.strokeStyle=y[b].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(C.x,C.y,3,0,Math.PI*2),e.arc(g.x,g.y,3,0,Math.PI*2),e.fillStyle=y[b].color,e.fill()}p&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke());let h=t.angleGuides!==void 0?t.angleGuides:t.yawArc||t.pitchArc||!1,v=Math.round(a.rotZRad*180/Math.PI*10)/10,R=Math.round(a.rotXRad*180/Math.PI*10)/10;if(h){e.beginPath();let b=36;for(let g=0;g<=b;g++){let x=g/b*Math.PI*2,c={x:.5+Math.cos(x)*.75,y:.5+Math.sin(x)*.75,z:0},u=r(c);g===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}e.strokeStyle="rgba(59, 130, 246, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.beginPath();let C=20;for(let g=0;g<=C;g++){let x=-Math.PI/2+g/C*Math.PI,c={x:.5+Math.cos(x)*.75,y:.5,z:.5+Math.sin(x)*.75},u=r(c);g===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}e.strokeStyle="rgba(239, 68, 68, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.font='500 11px ui-monospace, "SF Mono", monospace',e.textAlign="left",e.textBaseline="bottom",e.fillStyle="rgba(59, 130, 246, 0.9)",e.fillText(`Yaw: ${v.toFixed(1)}\xB0`,12,n.y*2-24),e.fillStyle="rgba(239, 68, 68, 0.9)",e.fillText(`Pitch: ${R.toFixed(1)}\xB0`,12,n.y*2-10)}e.restore()}var U=`
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
mat3 getRotMatrix(vec3 r) {
  float cz = cos(r.z), sz = sin(r.z);
  mat3 rz = mat3(
     cz, -sz, 0.0,
     sz,  cz, 0.0,
    0.0, 0.0, 1.0
  );

  float cy = cos(r.y), sy = sin(r.y);
  mat3 ry = mat3(
     cy, 0.0,  sy,
    0.0, 1.0, 0.0,
    -sy, 0.0,  cy
  );

  float cx = cos(r.x), sx = sin(r.x);
  mat3 rx = mat3(
    1.0, 0.0, 0.0,
    0.0,  cx, -sx,
    0.0,  sx,  cx
  );

  // transform3D: p_cam = rx * ry * rz * p_local
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
  // Normalized device coordinates centered at (0, 0)
  vec2 screenPos = gl_FragCoord.xy - u_resolution * 0.5;
  
  // Exact scale factor matching project3D:
  // 2D_offset = local_cam_offset * (width * 0.26 * 1.6 * zoom)
  float scaleFactor = u_resolution.x * 0.26 * 1.6 * u_zoom;
  
  // Invert screen Y so Y+ is Up (matching 2D canvas Y-down inversion in project3D)
  vec2 camXY = vec2(screenPos.x, screenPos.y) / scaleFactor;

  vec3 halfSize = u_box_size * 0.5;
  float maxR = min(min(halfSize.x, halfSize.y), halfSize.z) * 0.45;
  float rad = clamp(u_radius, 0.001, maxR);

  mat3 rot = getRotMatrix(u_rot);
  // invRot = transpose of rot
  mat3 invRot = mat3(
    rot[0][0], rot[1][0], rot[2][0],
    rot[0][1], rot[1][1], rot[2][1],
    rot[0][2], rot[1][2], rot[2][2]
  );

  // Orthographic ray from near plane to far plane in camera space
  vec3 rayOrigin = vec3(camXY, -5.0);
  vec3 rayDir = vec3(0.0, 0.0, 1.0);

  // Raymarching
  float t = 0.0;
  float hit = -1.0;
  vec3 pLocal = vec3(0.0);

  for (int i = 0; i < 128; i++) {
    vec3 pCam = rayOrigin + rayDir * t;
    pLocal = invRot * pCam;
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

    // Subtle edge specular rim to enhance rounded edges curvature
    vec3 nCam = rot * nLocal;
    float rim = pow(1.0 - max(dot(nCam, vec3(0.0, 0.0, -1.0)), 0.0), 3.0) * 0.08;

    vec3 finalCol = col + vec3(rim);
    gl_FragColor = vec4(clamp(finalCol, 0.0, 1.0), 1.0);
  } else {
    discard; // Transparent background
  }
}
`;function $(e,o){let n=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.userSelect="none";let i=document.createElement("canvas");i.width=o*n,i.height=o*n,i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.position="absolute",i.style.left="0",i.style.top="0";let t=document.createElement("canvas");t.width=o*n,t.height=o*n,t.style.width=`${o}px`,t.style.height=`${o}px`,t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",a.appendChild(i),a.appendChild(t),e.appendChild(a);let r=i.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),s=t.getContext("2d");s.scale(n,n);let m=(v,R)=>{let b=r.createShader(v);return r.shaderSource(b,R),r.compileShader(b),r.getShaderParameter(b,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(b)),b},l=m(r.VERTEX_SHADER,U),d=m(r.FRAGMENT_SHADER,W),f=r.createProgram();r.attachShader(f,l),r.attachShader(f,d),r.linkProgram(f);let y=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let p=r.getAttribLocation(f,"position");r.enableVertexAttribArray(p),r.vertexAttribPointer(p,2,r.FLOAT,!1,0,0);let h={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_rot:r.getUniformLocation(f,"u_rot"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert")};return{gl:r,overlayCtx:s,canvasGL:i,canvasOverlay:t,width:o,height:o,program:f,uniforms:h}}var N=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function le(e,o,n,a,i,t){if(!t.showFront&&!t.showBack)return;let r=d=>_(d,o,n,a,i),m=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),l=d=>{let f=S({x:.5,y:.5,z:.5},a,i);return S({x:.5+d.x*.1,y:.5+d.y*.1,z:.5+d.z*.1},a,i).z-f.z>0};if(e.save(),t.showBack){e.lineWidth=t.backWidth,t.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=t.backColor,e.globalAlpha=t.backOpacity;for(let d of N)if(!(l(d.normalA)||l(d.normalB))){let[y,p]=d.edge;e.beginPath(),e.moveTo(m[y].x,m[y].y),e.lineTo(m[p].x,m[p].y),e.stroke()}}if(t.showFront){e.lineWidth=t.frontWidth,t.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=t.frontColor,e.globalAlpha=t.frontOpacity;for(let d of N)if(l(d.normalA)||l(d.normalB)){let[y,p]=d.edge;e.beginPath(),e.moveTo(m[y].x,m[y].y),e.lineTo(m[p].x,m[p].y),e.stroke()}}e.restore()}function j(e,o,n,a,i,t,r,s,m){let{gl:l,overlayCtx:d,width:f,height:y,program:p,uniforms:h}=e,v=window.devicePixelRatio||1;l.viewport(0,0,f*v,y*v),l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),l.useProgram(p),l.uniform2f(h.u_resolution,f*v,y*v),l.uniform3f(h.u_box_size,n.sizeX,n.sizeY,n.sizeZ),l.uniform1f(h.u_radius,n.radius||.001),l.uniform3f(h.u_rot,o.rotXRad,o.rotYRad,o.rotZRad),l.uniform1f(h.u_zoom,o.zoom||1),l.uniform1i(h.u_mode,a==="rgb"?0:a==="hsb"?1:2),l.uniform1i(h.u_invert,i?1:0),l.drawArrays(l.TRIANGLES,0,6),d.save(),d.clearRect(0,0,f,y);let R=f*.26*(o.zoom||1),b={x:f*.5,y:y*.5};if(le(d,R,b,o,n,r),H(d,R,b,o,n,t),m){let C=_(s,R,b,o,n),g=B(s,a),x=i?{r:255-g.r,g:255-g.g,b:255-g.b}:g;d.beginPath(),d.arc(C.x,C.y,6,0,Math.PI*2),d.fillStyle=`rgb(${x.r}, ${x.g}, ${x.b})`,d.fill(),d.strokeStyle="#ffffff",d.lineWidth=2,d.stroke()}d.restore()}function ce(e,o={}){let n=o.size||460,a=o.mode||"rgb",i=!1,t={...V},r={...w,radius:.08},s={...F},m={...O},l=o.initialColor||{r:255,g:255,b:255},d=X(l,a),f=new Set,y=$(e,n),p=null,h=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,j(y,t,r,a,i,s,m,d,!0)}))},v=()=>{let c=B(d,a),u=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c,z=A(u),L=D(u),G=I(u),K={rgb:u,hsb:z,oklch:L,hex:G,alpha:1};f.forEach(q=>q(K))},R=!1,b=0,C=0,g=t.rotZRad,x=t.rotXRad;return y.canvasGL.addEventListener("mousedown",c=>{R=!0,b=c.clientX,C=c.clientY,g=t.rotZRad,x=t.rotXRad}),window.addEventListener("mousemove",c=>{if(!R)return;let u=c.clientX-b,z=c.clientY-C;t.rotZRad=g+u*.01,t.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,x-z*.01)),h()}),window.addEventListener("mouseup",()=>{R=!1}),y.canvasGL.addEventListener("dblclick",()=>{i=!i,v(),h()}),h(),v(),{getColor:()=>{let c=B(d,a),u=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c;return{rgb:u,hsb:A(u),oklch:D(u),hex:I(u),alpha:1}},setColor:c=>{l=c,d=X(c,a),v(),h()},setMode:c=>{a=c,v(),h()},getMode:()=>a,setRotation:(c,u)=>{t.rotZRad=c*Math.PI/180,t.rotXRad=u*Math.PI/180,h()},getAxisRotation:()=>({rotXDeg:Math.round(t.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(t.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(t.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(c,u,z)=>{t.rotXRad=c*Math.PI/180,t.rotYRad=u*Math.PI/180,t.rotZRad=z*Math.PI/180,h()},setZoom:c=>{t.zoom=Math.max(.1,Math.min(3,c)),h()},getZoom:()=>t.zoom||1,setDimensions:(c,u,z)=>{r.sizeX=Math.max(.2,Math.min(2.5,c)),r.sizeY=Math.max(.2,Math.min(2.5,u)),r.sizeZ=Math.max(.2,Math.min(2.5,z)),h()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:c=>{r.radius=Math.max(.001,Math.min(.25,c)),h()},getRadius:()=>r.radius,getEdgeStyle:()=>({...m}),setEdgeStyle:c=>{m={...m,...c},h()},getGuides:()=>({...s}),setGuides:c=>{s={...s,...c},h()},toggleAllGuides:c=>{let u=c!==void 0?c:!s.vertexX;s={vertexX:u,vertexY:u,vertexZ:u,centerX:u,centerY:u,centerZ:u,angleGuides:u},h()},on:(c,u)=>{f.add(u)},off:(c,u)=>{f.delete(u)},destroy:()=>{p!==null&&cancelAnimationFrame(p),e.innerHTML=""}}}return re(me);})();
