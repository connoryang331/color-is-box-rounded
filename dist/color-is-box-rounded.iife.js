var ColorIsBoxRounded=(()=>{var k=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var ee=Object.prototype.hasOwnProperty;var oe=(e,o)=>{for(var n in o)k(e,n,{get:o[n],enumerable:!0})},te=(e,o,n,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of J(o))!ee.call(e,a)&&a!==n&&k(e,a,{get:()=>o[a],enumerable:!(i=Q(o,a))||i.enumerable});return e};var re=e=>te(k({},"__esModule",{value:!0}),e);var me={};oe(me,{createRoundedBoxPicker:()=>ce});var X={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},F={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var V={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},w={sizeX:1,sizeY:1,sizeZ:1,radius:0};function S(e,o,n){let i=(e.x-.5)*n.sizeX,a=(e.y-.5)*n.sizeY,t=(e.z-.5)*n.sizeZ,r=Math.cos(o.rotZRad),s=Math.sin(o.rotZRad),m=i*r-a*s,l=i*s+a*r,d=t,f=Math.cos(o.rotYRad),y=Math.sin(o.rotYRad),p=m*f+d*y,h=l,v=-m*y+d*f,R=Math.cos(o.rotXRad),b=Math.sin(o.rotXRad),C=p,g=v*R-h*b,x=v*b+h*R;return{x:C,y:g,z:x}}function B(e,o,n,i,a){let t=S(e,i,a);return{x:n.x+t.x*o*1.6*i.zoom,y:n.y-t.y*o*1.6*i.zoom}}function A(e){let o=e.r/255,n=e.g/255,i=e.b/255,a=Math.max(o,n,i),t=Math.min(o,n,i),r=a-t,s=0;r!==0&&(a===o?s=((n-i)/r+6)%6:a===n?s=(i-o)/r+2:s=(o-n)/r+4,s*=60);let m=a===0?0:r/a*100,l=a*100;return{h:s,s:m,b:l}}function ne(e){let o=e.h,n=e.s/100,i=e.b/100,a=i*n,t=a*(1-Math.abs(o/60%2-1)),r=i-a,s,m,l;return o<60?(s=a,m=t,l=0):o<120?(s=t,m=a,l=0):o<180?(s=0,m=a,l=t):o<240?(s=0,m=t,l=a):o<300?(s=t,m=0,l=a):(s=a,m=0,l=t),{r:Math.round((s+r)*255),g:Math.round((m+r)*255),b:Math.round((l+r)*255)}}function E(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function T(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function ie(e){let o=E(e.r/255),n=E(e.g/255),i=E(e.b/255),a=.4122214708*o+.5363325363*n+.0514459929*i,t=.2119034982*o+.6806995451*n+.1073969566*i,r=.0883024619*o+.2817188376*n+.6299787005*i,s=Math.cbrt(a),m=Math.cbrt(t),l=Math.cbrt(r);return{L:.2104542553*s+.793617785*m-.0040720468*l,a:1.9779984951*s-2.428592205*m+.4505937099*l,b:.0259040371*s+.7827717662*m-.808675766*l}}function ae(e,o,n){let i=e+.3963377774*o+.2158037573*n,a=e-.1055613458*o-.0638541728*n,t=e-.0894841775*o-1.291485548*n,r=i*i*i,s=a*a*a,m=t*t*t,l=4.0767416621*r-3.3077115913*s+.2309699292*m,d=-1.2684380046*r+2.6097574011*s-.3413193965*m,f=-.0041960863*r-.7034186147*s+1.707614701*m;return{r:Math.round(Math.max(0,Math.min(1,T(l)))*255),g:Math.round(Math.max(0,Math.min(1,T(d)))*255),b:Math.round(Math.max(0,Math.min(1,T(f)))*255)}}function G(e){let o=ie(e),n=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:n,h:n<1e-4?0:i}}function P(e){let o=e.h*(Math.PI/180),n=e.c*Math.cos(o),i=e.c*Math.sin(o);return ae(e.l,n,i)}function se(e,o,n){let i=P({l:e,c:o,h:n});if(Y(i))return{l:e,c:o,h:n};let a=0,t=o;for(let r=0;r<20;r++){let s=(a+t)/2;i=P({l:e,c:s,h:n}),Y(i)?a=s:t=s}return{l:e,c:a,h:n}}function Y(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function I(e){let o=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Z=.4;function _(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return ne({h:e.x*359,s:e.y*100,b:e.z*100});{let n=e.x,i=e.y*Z,a=e.z*359,t=se(n,i,a);return P(t)}}function O(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let n=A(e);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=G(e);return{x:n.l,y:Math.min(n.c/Z,1),z:n.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function H(e,o,n,i,a,t){let r=b=>B(b,o,n,i,a),s=r({x:0,y:0,z:0});e.save();let m=1.28,l=[{p:{x:m,y:0,z:0},name:"X",color:M[0],visible:t.vertexX},{p:{x:0,y:m,z:0},name:"Y",color:M[1],visible:t.vertexY},{p:{x:0,y:0,z:m},name:"Z",color:M[2],visible:t.vertexZ}];for(let b=0;b<l.length;b++){if(!l[b].visible)continue;let C=r(l[b].p),g=l[b].color;e.beginPath(),e.moveTo(s.x,s.y),e.lineTo(C.x,C.y),e.strokeStyle=g,e.lineWidth=2,e.setLineDash([4,2]),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(C.x,C.y,3.5,0,Math.PI*2),e.fillStyle=g,e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1,e.stroke();let x=C.x-s.x,c=C.y-s.y,u=Math.hypot(x,c)||1,z=12,L=C.x+x/u*z,D=C.y+c/u*z;e.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillStyle=g,e.fillText(l[b].name,L,D)}(t.vertexX||t.vertexY||t.vertexZ)&&(e.beginPath(),e.arc(s.x,s.y,4,0,Math.PI*2),e.fillStyle="#000000",e.fill(),e.strokeStyle="rgba(255,255,255,0.85)",e.lineWidth=1.2,e.stroke());let d=r({x:.5,y:.5,z:.5}),f=.35,y=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:M[0],name:"Cx",visible:t.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:M[1],name:"Cy",visible:t.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:M[2],name:"Cz",visible:t.centerZ}],p=!1;for(let b=0;b<y.length;b++){if(!y[b].visible)continue;p=!0;let C=r(y[b].from),g=r(y[b].to);e.beginPath(),e.moveTo(C.x,C.y),e.lineTo(g.x,g.y),e.strokeStyle=y[b].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(C.x,C.y,3,0,Math.PI*2),e.arc(g.x,g.y,3,0,Math.PI*2),e.fillStyle=y[b].color,e.fill()}p&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke());let h=t.angleGuides!==void 0?t.angleGuides:t.yawArc||t.pitchArc||!1,v=Math.round(i.rotZRad*180/Math.PI*10)/10,R=Math.round(i.rotXRad*180/Math.PI*10)/10;if(h){e.beginPath();let b=36;for(let g=0;g<=b;g++){let x=g/b*Math.PI*2,c={x:.5+Math.cos(x)*.75,y:.5+Math.sin(x)*.75,z:0},u=r(c);g===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}e.strokeStyle="rgba(59, 130, 246, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.beginPath();let C=20;for(let g=0;g<=C;g++){let x=-Math.PI/2+g/C*Math.PI,c={x:.5+Math.cos(x)*.75,y:.5,z:.5+Math.sin(x)*.75},u=r(c);g===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}e.strokeStyle="rgba(239, 68, 68, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.font='500 11px ui-monospace, "SF Mono", monospace',e.textAlign="left",e.textBaseline="bottom",e.fillStyle="rgba(59, 130, 246, 0.9)",e.fillText(`Yaw: ${v.toFixed(1)}\xB0`,12,n.y*2-24),e.fillStyle="rgba(239, 68, 68, 0.9)",e.fillText(`Pitch: ${R.toFixed(1)}\xB0`,12,n.y*2-10)}e.restore()}var U=`
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
`;function $(e,o){let n=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let a=document.createElement("canvas");a.width=o*n,a.height=o*n,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.position="absolute",a.style.left="0",a.style.top="0";let t=document.createElement("canvas");t.width=o*n,t.height=o*n,t.style.width=`${o}px`,t.style.height=`${o}px`,t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",i.appendChild(a),i.appendChild(t),e.appendChild(i);let r=a.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),s=t.getContext("2d");s.scale(n,n);let m=(v,R)=>{let b=r.createShader(v);return r.shaderSource(b,R),r.compileShader(b),r.getShaderParameter(b,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(b)),b},l=m(r.VERTEX_SHADER,U),d=m(r.FRAGMENT_SHADER,W),f=r.createProgram();r.attachShader(f,l),r.attachShader(f,d),r.linkProgram(f);let y=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let p=r.getAttribLocation(f,"position");r.enableVertexAttribArray(p),r.vertexAttribPointer(p,2,r.FLOAT,!1,0,0);let h={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_rot:r.getUniformLocation(f,"u_rot"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert")};return{gl:r,overlayCtx:s,canvasGL:a,canvasOverlay:t,width:o,height:o,program:f,uniforms:h}}var N=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function le(e,o,n,i,a,t){if(!t.showFront&&!t.showBack)return;let r=d=>B(d,o,n,i,a),m=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),l=d=>{let f=S({x:.5,y:.5,z:.5},i,a);return S({x:.5+d.x*.1,y:.5+d.y*.1,z:.5+d.z*.1},i,a).z-f.z>0};if(e.save(),t.showBack){e.lineWidth=t.backWidth,t.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=t.backColor,e.globalAlpha=t.backOpacity;for(let d of N)if(!(l(d.normalA)||l(d.normalB))){let[y,p]=d.edge;e.beginPath(),e.moveTo(m[y].x,m[y].y),e.lineTo(m[p].x,m[p].y),e.stroke()}}if(t.showFront){e.lineWidth=t.frontWidth,t.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=t.frontColor,e.globalAlpha=t.frontOpacity;for(let d of N)if(l(d.normalA)||l(d.normalB)){let[y,p]=d.edge;e.beginPath(),e.moveTo(m[y].x,m[y].y),e.lineTo(m[p].x,m[p].y),e.stroke()}}e.restore()}function K(e,o,n,i,a,t,r,s,m){let{gl:l,overlayCtx:d,width:f,height:y,program:p,uniforms:h}=e,v=window.devicePixelRatio||1;l.viewport(0,0,f*v,y*v),l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),l.useProgram(p),l.uniform2f(h.u_resolution,f*v,y*v),l.uniform3f(h.u_box_size,n.sizeX,n.sizeY,n.sizeZ),l.uniform1f(h.u_radius,n.radius||.001),l.uniform3f(h.u_rot,o.rotXRad,o.rotYRad,o.rotZRad),l.uniform1f(h.u_zoom,o.zoom||1),l.uniform1i(h.u_mode,i==="rgb"?0:i==="hsb"?1:2),l.uniform1i(h.u_invert,a?1:0),l.drawArrays(l.TRIANGLES,0,6),d.save(),d.clearRect(0,0,f,y);let R=f*.28*(o.zoom||1),b={x:f*.5,y:y*.5};if(le(d,R,b,o,n,r),H(d,R,b,o,n,t),m){let C=B(s,R,b,o,n),g=_(s,i),x=a?{r:255-g.r,g:255-g.g,b:255-g.b}:g;d.beginPath(),d.arc(C.x,C.y,6,0,Math.PI*2),d.fillStyle=`rgb(${x.r}, ${x.g}, ${x.b})`,d.fill(),d.strokeStyle="#ffffff",d.lineWidth=2,d.stroke()}d.restore()}function ce(e,o={}){let n=o.size||460,i=o.mode||"rgb",a=!1,t={...V},r={...w,radius:.08},s={...F},m={...X},l=o.initialColor||{r:255,g:255,b:255},d=O(l,i),f=new Set,y=$(e,n),p=null,h=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,K(y,t,r,i,a,s,m,d,!0)}))},v=()=>{let c=_(d,i),u=a?{r:255-c.r,g:255-c.g,b:255-c.b}:c,z=A(u),L=G(u),D=I(u),q={rgb:u,hsb:z,oklch:L,hex:D,alpha:1};f.forEach(j=>j(q))},R=!1,b=0,C=0,g=t.rotZRad,x=t.rotXRad;return y.canvasGL.addEventListener("mousedown",c=>{R=!0,b=c.clientX,C=c.clientY,g=t.rotZRad,x=t.rotXRad}),window.addEventListener("mousemove",c=>{if(!R)return;let u=c.clientX-b,z=c.clientY-C;t.rotZRad=g+u*.01,t.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,x-z*.01)),h()}),window.addEventListener("mouseup",()=>{R=!1}),y.canvasGL.addEventListener("dblclick",()=>{a=!a,v(),h()}),h(),v(),{getColor:()=>{let c=_(d,i),u=a?{r:255-c.r,g:255-c.g,b:255-c.b}:c;return{rgb:u,hsb:A(u),oklch:G(u),hex:I(u),alpha:1}},setColor:c=>{l=c,d=O(c,i),v(),h()},setMode:c=>{i=c,v(),h()},getMode:()=>i,setRotation:(c,u)=>{t.rotZRad=c*Math.PI/180,t.rotXRad=u*Math.PI/180,h()},getAxisRotation:()=>({rotXDeg:Math.round(t.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(t.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(t.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(c,u,z)=>{t.rotXRad=c*Math.PI/180,t.rotYRad=u*Math.PI/180,t.rotZRad=z*Math.PI/180,h()},setZoom:c=>{t.zoom=Math.max(.1,Math.min(3,c)),h()},getZoom:()=>t.zoom||1,setDimensions:(c,u,z)=>{r.sizeX=Math.max(.2,Math.min(2.5,c)),r.sizeY=Math.max(.2,Math.min(2.5,u)),r.sizeZ=Math.max(.2,Math.min(2.5,z)),h()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:c=>{r.radius=Math.max(.001,Math.min(.25,c)),h()},getRadius:()=>r.radius,getEdgeStyle:()=>({...m}),setEdgeStyle:c=>{m={...m,...c},h()},getGuides:()=>({...s}),setGuides:c=>{s={...s,...c},h()},toggleAllGuides:c=>{let u=c!==void 0?c:!s.vertexX;s={vertexX:u,vertexY:u,vertexZ:u,centerX:u,centerY:u,centerZ:u,angleGuides:u},h()},on:(c,u)=>{f.add(u)},off:(c,u)=>{f.delete(u)},destroy:()=>{p!==null&&cancelAnimationFrame(p),e.innerHTML=""}}}return re(me);})();
