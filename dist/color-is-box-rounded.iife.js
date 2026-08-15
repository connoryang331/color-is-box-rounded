var ColorIsBoxRounded=(()=>{var D=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var K=Object.getOwnPropertyNames;var q=Object.prototype.hasOwnProperty;var j=(e,o)=>{for(var r in o)D(e,r,{get:o[r],enumerable:!0})},Q=(e,o,r,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of K(o))!q.call(e,a)&&a!==r&&D(e,a,{get:()=>o[a],enumerable:!(i=N(o,a))||i.enumerable});return e};var J=e=>Q(D({},"__esModule",{value:!0}),e);var ae={};j(ae,{createRoundedBoxPicker:()=>ie});var E={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var V={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},O={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ee(e,o,r){let i=(e.x-.5)*r.sizeX,a=(e.y-.5)*r.sizeY,n=(e.z-.5)*r.sizeZ,t=Math.cos(o.rotZRad),s=Math.sin(o.rotZRad),c=i*t-a*s,u=i*s+a*t,p=n,b=Math.cos(o.rotYRad),y=Math.sin(o.rotYRad),f=c*b+p*y,x=u,R=-c*y+p*b,v=Math.cos(o.rotXRad),d=Math.sin(o.rotXRad),g=f,h=R*v-x*d,l=R*d+x*v;return{x:g,y:h,z:l}}function G(e,o,r,i,a){let n=ee(e,i,a);return{x:r.x+n.x*o*1.6*i.zoom,y:r.y-n.y*o*1.6*i.zoom}}function L(e){let o=e.r/255,r=e.g/255,i=e.b/255,a=Math.max(o,r,i),n=Math.min(o,r,i),t=a-n,s=0;t!==0&&(a===o?s=((r-i)/t+6)%6:a===r?s=(i-o)/t+2:s=(o-r)/t+4,s*=60);let c=a===0?0:t/a*100,u=a*100;return{h:s,s:c,b:u}}function oe(e){let o=e.h,r=e.s/100,i=e.b/100,a=i*r,n=a*(1-Math.abs(o/60%2-1)),t=i-a,s,c,u;return o<60?(s=a,c=n,u=0):o<120?(s=n,c=a,u=0):o<180?(s=0,c=a,u=n):o<240?(s=0,c=n,u=a):o<300?(s=n,c=0,u=a):(s=a,c=0,u=n),{r:Math.round((s+t)*255),g:Math.round((c+t)*255),b:Math.round((u+t)*255)}}function T(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function k(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function te(e){let o=T(e.r/255),r=T(e.g/255),i=T(e.b/255),a=.4122214708*o+.5363325363*r+.0514459929*i,n=.2119034982*o+.6806995451*r+.1073969566*i,t=.0883024619*o+.2817188376*r+.6299787005*i,s=Math.cbrt(a),c=Math.cbrt(n),u=Math.cbrt(t);return{L:.2104542553*s+.793617785*c-.0040720468*u,a:1.9779984951*s-2.428592205*c+.4505937099*u,b:.0259040371*s+.7827717662*c-.808675766*u}}function re(e,o,r){let i=e+.3963377774*o+.2158037573*r,a=e-.1055613458*o-.0638541728*r,n=e-.0894841775*o-1.291485548*r,t=i*i*i,s=a*a*a,c=n*n*n,u=4.0767416621*t-3.3077115913*s+.2309699292*c,p=-1.2684380046*t+2.6097574011*s-.3413193965*c,b=-.0041960863*t-.7034186147*s+1.707614701*c;return{r:Math.round(Math.max(0,Math.min(1,k(u)))*255),g:Math.round(Math.max(0,Math.min(1,k(p)))*255),b:Math.round(Math.max(0,Math.min(1,k(b)))*255)}}function B(e){let o=te(e),r=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:r,h:r<1e-4?0:i}}function P(e){let o=e.h*(Math.PI/180),r=e.c*Math.cos(o),i=e.c*Math.sin(o);return re(e.l,r,i)}function ne(e,o,r){let i=P({l:e,c:o,h:r});if(Y(i))return{l:e,c:o,h:r};let a=0,n=o;for(let t=0;t<20;t++){let s=(a+n)/2;i=P({l:e,c:s,h:r}),Y(i)?a=s:n=s}return{l:e,c:a,h:r}}function Y(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function X(e){let o=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var w=.4;function z(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return oe({h:e.x*359,s:e.y*100,b:e.z*100});{let r=e.x,i=e.y*w,a=e.z*359,n=ne(r,i,a);return P(n)}}function I(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let r=L(e);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=B(e);return{x:r.l,y:Math.min(r.c/w,1),z:r.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function F(e,o,r,i,a,n){let t=d=>G(d,o,r,i,a),s=t({x:0,y:0,z:0});e.save();let c=1.28,u=[{p:{x:c,y:0,z:0},name:"X",color:M[0],visible:n.vertexX},{p:{x:0,y:c,z:0},name:"Y",color:M[1],visible:n.vertexY},{p:{x:0,y:0,z:c},name:"Z",color:M[2],visible:n.vertexZ}];for(let d=0;d<u.length;d++){if(!u[d].visible)continue;let g=t(u[d].p),h=u[d].color;e.beginPath(),e.moveTo(s.x,s.y),e.lineTo(g.x,g.y),e.strokeStyle=h,e.lineWidth=2,e.setLineDash([4,2]),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(g.x,g.y,3.5,0,Math.PI*2),e.fillStyle=h,e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1,e.stroke();let l=g.x-s.x,m=g.y-s.y,C=Math.hypot(l,m)||1,_=12,S=g.x+l/C*_,A=g.y+m/C*_;e.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillStyle=h,e.fillText(u[d].name,S,A)}(n.vertexX||n.vertexY||n.vertexZ)&&(e.beginPath(),e.arc(s.x,s.y,4,0,Math.PI*2),e.fillStyle="#000000",e.fill(),e.strokeStyle="rgba(255,255,255,0.85)",e.lineWidth=1.2,e.stroke());let p=t({x:.5,y:.5,z:.5}),b=.35,y=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:M[0],name:"Cx",visible:n.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:M[1],name:"Cy",visible:n.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:M[2],name:"Cz",visible:n.centerZ}],f=!1;for(let d=0;d<y.length;d++){if(!y[d].visible)continue;f=!0;let g=t(y[d].from),h=t(y[d].to);e.beginPath(),e.moveTo(g.x,g.y),e.lineTo(h.x,h.y),e.strokeStyle=y[d].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(g.x,g.y,3,0,Math.PI*2),e.arc(h.x,h.y,3,0,Math.PI*2),e.fillStyle=y[d].color,e.fill()}f&&(e.beginPath(),e.arc(p.x,p.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke());let x=n.angleGuides!==void 0?n.angleGuides:n.yawArc||n.pitchArc||!1,R=Math.round(i.rotZRad*180/Math.PI*10)/10,v=Math.round(i.rotXRad*180/Math.PI*10)/10;if(x){e.beginPath();let d=36;for(let h=0;h<=d;h++){let l=h/d*Math.PI*2,m={x:.5+Math.cos(l)*.75,y:.5+Math.sin(l)*.75,z:0},C=t(m);h===0?e.moveTo(C.x,C.y):e.lineTo(C.x,C.y)}e.strokeStyle="rgba(59, 130, 246, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.beginPath();let g=20;for(let h=0;h<=g;h++){let l=-Math.PI/2+h/g*Math.PI,m={x:.5+Math.cos(l)*.75,y:.5,z:.5+Math.sin(l)*.75},C=t(m);h===0?e.moveTo(C.x,C.y):e.lineTo(C.x,C.y)}e.strokeStyle="rgba(239, 68, 68, 0.35)",e.lineWidth=1.5,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),e.font='500 11px ui-monospace, "SF Mono", monospace',e.textAlign="left",e.textBaseline="bottom",e.fillStyle="rgba(59, 130, 246, 0.9)",e.fillText(`Yaw: ${R.toFixed(1)}\xB0`,12,r.y*2-24),e.fillStyle="rgba(239, 68, 68, 0.9)",e.fillText(`Pitch: ${v.toFixed(1)}\xB0`,12,r.y*2-10)}e.restore()}var Z=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,H=`
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
`;function U(e,o){let r=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let a=document.createElement("canvas");a.width=o*r,a.height=o*r,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.position="absolute",a.style.left="0",a.style.top="0";let n=document.createElement("canvas");n.width=o*r,n.height=o*r,n.style.width=`${o}px`,n.style.height=`${o}px`,n.style.position="absolute",n.style.left="0",n.style.top="0",n.style.pointerEvents="none",i.appendChild(a),i.appendChild(n),e.appendChild(i);let t=a.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),s=n.getContext("2d");s.scale(r,r);let c=(R,v)=>{let d=t.createShader(R);return t.shaderSource(d,v),t.compileShader(d),t.getShaderParameter(d,t.COMPILE_STATUS)||console.error(t.getShaderInfoLog(d)),d},u=c(t.VERTEX_SHADER,Z),p=c(t.FRAGMENT_SHADER,H),b=t.createProgram();t.attachShader(b,u),t.attachShader(b,p),t.linkProgram(b);let y=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,y),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);let f=t.getAttribLocation(b,"position");t.enableVertexAttribArray(f),t.vertexAttribPointer(f,2,t.FLOAT,!1,0,0);let x={u_resolution:t.getUniformLocation(b,"u_resolution"),u_box_size:t.getUniformLocation(b,"u_box_size"),u_radius:t.getUniformLocation(b,"u_radius"),u_rot:t.getUniformLocation(b,"u_rot"),u_zoom:t.getUniformLocation(b,"u_zoom"),u_mode:t.getUniformLocation(b,"u_mode"),u_invert:t.getUniformLocation(b,"u_invert")};return{gl:t,overlayCtx:s,canvasGL:a,canvasOverlay:n,width:o,height:o,program:b,uniforms:x}}function W(e,o,r,i,a,n,t,s){let{gl:c,overlayCtx:u,width:p,height:b,program:y,uniforms:f}=e,x=window.devicePixelRatio||1;c.viewport(0,0,p*x,b*x),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.useProgram(y),c.uniform2f(f.u_resolution,p*x,b*x),c.uniform3f(f.u_box_size,r.sizeX,r.sizeY,r.sizeZ),c.uniform1f(f.u_radius,r.radius||.001),c.uniform3f(f.u_rot,o.rotXRad,o.rotYRad,o.rotZRad),c.uniform1f(f.u_zoom,o.zoom||1),c.uniform1i(f.u_mode,i==="rgb"?0:i==="hsb"?1:2),c.uniform1i(f.u_invert,a?1:0),c.drawArrays(c.TRIANGLES,0,6),u.save(),u.clearRect(0,0,p,b);let R=p*.28*(o.zoom||1),v={x:p*.5,y:b*.5};if(F(u,R,v,o,r,n),s){let d=G(t,R,v,o,r),g=z(t,i),h=a?{r:255-g.r,g:255-g.g,b:255-g.b}:g;u.beginPath(),u.arc(d.x,d.y,6,0,Math.PI*2),u.fillStyle=`rgb(${h.r}, ${h.g}, ${h.b})`,u.fill(),u.strokeStyle="#ffffff",u.lineWidth=2,u.stroke()}u.restore()}function ie(e,o={}){let r=o.size||460,i=o.mode||"rgb",a=!1,n={...V},t={...O,radius:.08},s={...E},c=o.initialColor||{r:255,g:255,b:255},u=I(c,i),p=new Set,b=U(e,r),y=null,f=()=>{y===null&&(y=requestAnimationFrame(()=>{y=null,W(b,n,t,i,a,s,u,!0)}))},x=()=>{let l=z(u,i),m=a?{r:255-l.r,g:255-l.g,b:255-l.b}:l,C=L(m),_=B(m),S=X(m),A={rgb:m,hsb:C,oklch:_,hex:S,alpha:1};p.forEach($=>$(A))},R=!1,v=0,d=0,g=n.rotZRad,h=n.rotXRad;return b.canvasGL.addEventListener("mousedown",l=>{R=!0,v=l.clientX,d=l.clientY,g=n.rotZRad,h=n.rotXRad}),window.addEventListener("mousemove",l=>{if(!R)return;let m=l.clientX-v,C=l.clientY-d;n.rotZRad=g+m*.01,n.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,h-C*.01)),f()}),window.addEventListener("mouseup",()=>{R=!1}),b.canvasGL.addEventListener("dblclick",()=>{a=!a,x(),f()}),f(),x(),{getColor:()=>{let l=z(u,i),m=a?{r:255-l.r,g:255-l.g,b:255-l.b}:l;return{rgb:m,hsb:L(m),oklch:B(m),hex:X(m),alpha:1}},setColor:l=>{c=l,u=I(l,i),x(),f()},setMode:l=>{i=l,x(),f()},getMode:()=>i,setRotation:(l,m)=>{n.rotZRad=l*Math.PI/180,n.rotXRad=m*Math.PI/180,f()},getAxisRotation:()=>({rotXDeg:Math.round(n.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(n.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(n.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(l,m,C)=>{n.rotXRad=l*Math.PI/180,n.rotYRad=m*Math.PI/180,n.rotZRad=C*Math.PI/180,f()},setDimensions:(l,m,C)=>{t.sizeX=Math.max(.2,Math.min(2.5,l)),t.sizeY=Math.max(.2,Math.min(2.5,m)),t.sizeZ=Math.max(.2,Math.min(2.5,C)),f()},getDimensions:()=>({sizeX:t.sizeX,sizeY:t.sizeY,sizeZ:t.sizeZ}),setRadius:l=>{t.radius=Math.max(.001,Math.min(.25,l)),f()},getRadius:()=>t.radius,getGuides:()=>({...s}),setGuides:l=>{s={...s,...l},f()},toggleAllGuides:l=>{let m=l!==void 0?l:!s.vertexX;s={vertexX:m,vertexY:m,vertexZ:m,centerX:m,centerY:m,centerZ:m,angleGuides:m},f()},on:(l,m)=>{p.add(m)},off:(l,m)=>{p.delete(m)},destroy:()=>{y!==null&&cancelAnimationFrame(y),e.innerHTML=""}}}return J(ae);})();
