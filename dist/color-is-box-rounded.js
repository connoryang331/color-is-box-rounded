var we={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Ee={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function te(e){let t=e.r/255,n=e.g/255,s=e.b/255,u=Math.max(t,n,s),l=Math.min(t,n,s),r=u-l,d=0;r!==0&&(u===t?d=((n-s)/r+6)%6:u===n?d=(s-t)/r+2:d=(t-n)/r+4,d*=60);let b=u===0?0:r/u*100,h=u*100;return{h:d,s:b,b:h}}function Ne(e){let t=e.h,n=e.s/100,s=e.b/100,u=s*n,l=u*(1-Math.abs(t/60%2-1)),r=s-u,d,b,h;return t<60?(d=u,b=l,h=0):t<120?(d=l,b=u,h=0):t<180?(d=0,b=u,h=l):t<240?(d=0,b=l,h=u):t<300?(d=l,b=0,h=u):(d=u,b=0,h=l),{r:Math.round((d+r)*255),g:Math.round((b+r)*255),b:Math.round((h+r)*255)}}function ae(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ie(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function $e(e){let t=ae(e.r/255),n=ae(e.g/255),s=ae(e.b/255),u=.4122214708*t+.5363325363*n+.0514459929*s,l=.2119034982*t+.6806995451*n+.1073969566*s,r=.0883024619*t+.2817188376*n+.6299787005*s,d=Math.cbrt(u),b=Math.cbrt(l),h=Math.cbrt(r);return{L:.2104542553*d+.793617785*b-.0040720468*h,a:1.9779984951*d-2.428592205*b+.4505937099*h,b:.0259040371*d+.7827717662*b-.808675766*h}}function Ke(e,t,n){let s=e+.3963377774*t+.2158037573*n,u=e-.1055613458*t-.0638541728*n,l=e-.0894841775*t-1.291485548*n,r=s*s*s,d=u*u*u,b=l*l*l,h=4.0767416621*r-3.3077115913*d+.2309699292*b,g=-1.2684380046*r+2.6097574011*d-.3413193965*b,f=-.0041960863*r-.7034186147*d+1.707614701*b;return{r:Math.round(Math.max(0,Math.min(1,ie(h)))*255),g:Math.round(Math.max(0,Math.min(1,ie(g)))*255),b:Math.round(Math.max(0,Math.min(1,ie(f)))*255)}}function re(e){let t=$e(e),n=Math.sqrt(t.a*t.a+t.b*t.b),s=Math.atan2(t.b,t.a)*(180/Math.PI);return s<0&&(s+=360),{l:t.L,c:n,h:n<1e-4?0:s}}function se(e){let t=e.h*(Math.PI/180),n=e.c*Math.cos(t),s=e.c*Math.sin(t);return Ke(e.l,n,s)}function je(e,t,n){let s=se({l:e,c:t,h:n});if(Te(s))return{l:e,c:t,h:n};let u=0,l=t;for(let r=0;r<20;r++){let d=(u+l)/2;s=se({l:e,c:d,h:n}),Te(s)?u=d:l=d}return{l:e,c:u,h:n}}function Te(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function le(e){let t=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${t(e.r)}${t(e.g)}${t(e.b)}`}var Ge=.4;function U(e,t){if(t==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(t==="hsb")return Ne({h:e.x*359,s:e.y*100,b:e.z*100});{let n=e.x,s=e.y*Ge,u=e.z*359,l=je(n,s,u);return se(l)}}function Y(e,t){if(t==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(t==="hsb"){let n=te(e);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=re(e);return{x:n.l,y:Math.min(n.c/Ge,1),z:n.h/359}}}var ce=Math.PI/180;function W(){return[1,0,0,0,1,0,0,0,1]}function $(e){let t=Math.cos(e),n=Math.sin(e);return[1,0,0,0,t,-n,0,n,t]}function K(e){let t=Math.cos(e),n=Math.sin(e);return[t,0,n,0,1,0,-n,0,t]}function ue(e){let t=Math.cos(e),n=Math.sin(e);return[t,n,0,-n,t,0,0,0,1]}function D(e,t){let n=new Array(9);for(let s=0;s<3;s++)for(let u=0;u<3;u++)n[s*3+u]=e[s*3]*t[u]+e[s*3+1]*t[3+u]+e[s*3+2]*t[6+u];return n}function me(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function fe(e,t){return{x:e[0]*t.x+e[1]*t.y+e[2]*t.z,y:e[3]*t.x+e[4]*t.y+e[5]*t.z,z:e[6]*t.x+e[7]*t.y+e[8]*t.z}}function Z(e,t,n){return D(K(t),D(ue(n),$(e)))}var De={mat:Z(8*ce,-20*ce,-55*ce),zoom:1},Se={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ne(e,t,n){let s=(e.x-.5)*n.sizeX,u=(e.y-.5)*n.sizeY,l=(e.z-.5)*n.sizeZ;return fe(t.mat,{x:s,y:u,z:l})}function O(e,t,n,s,u){let l=ne(e,s,u);return{x:n.x+l.x*t*1.6*s.zoom,y:n.y-l.y*t*1.6*s.zoom}}function j(e,t,n,s,u,l){let r=U(e,t),d={x:r.r/255,y:r.g/255,z:r.b/255},b=Y({r:255,g:255,b:255},t),h=Y({r:0,g:0,b:0},t);return{c:O(e,n,s,u,l),w:O(b,n,s,u,l),k:O(h,n,s,u,l),cRGB:d}}var be=["#ef4444","#22c55e","#3b82f6"];function Pe(e,t,n,s,u,l){let r=f=>O(f,t,n,s,u);e.save();let d=r({x:.5,y:.5,z:.5}),b=.35,h=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:be[0],name:"Cx",visible:l.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:be[1],name:"Cy",visible:l.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:be[2],name:"Cz",visible:l.centerZ}],g=!1;for(let f=0;f<h.length;f++){if(!h[f].visible)continue;g=!0;let a=r(h[f].from),i=r(h[f].to);e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(i.x,i.y),e.strokeStyle=h[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(a.x,a.y,3,0,Math.PI*2),e.arc(i.x,i.y,3,0,Math.PI*2),e.fillStyle=h[f].color,e.fill()}g&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Fe=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Ve=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,Oe=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,Ie=`
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform vec3 u_box_size;    // sizeX, sizeY, sizeZ
uniform float u_radius;     // bevel radius (0.001 ~ 0.25)
uniform mat3 u_mat;         // box orientation matrix (local -> cam)
uniform mat3 u_mat_inv;     // inverse (cam -> local), = transpose for rotation matrices
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

// Box orientation matrix (matches camera-math.ts).
// Forward: local -> cam, inverse: cam -> local (rotation matrix, so inverse = transpose).
vec3 rotateToCam(vec3 p) {
  return u_mat * p;
}

vec3 rotateToLocal(vec3 p) {
  return u_mat_inv * p;
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
  float scaleFactor = u_resolution.x * 0.36 * 1.6 * u_zoom;
  
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
    pLocal = rotateToLocal(pCam);
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
    vec3 nCam = rotateToCam(nLocal);
    float rim = pow(1.0 - max(dot(nCam, vec3(0.0, 0.0, -1.0)), 0.0), 3.0) * 0.08;
    vec3 finalCol = col + vec3(rim);

    gl_FragColor = vec4(clamp(finalCol, 0.0, 1.0), 1.0);
  } else {
    discard; // Transparent background
  }
}
`;function Ue(e,t){let n=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${t}px`,s.style.height=`${t}px`,s.style.userSelect="none";let u=document.createElement("canvas");u.width=t*n,u.height=t*n,u.style.width=`${t}px`,u.style.height=`${t}px`,u.style.position="absolute",u.style.left="0",u.style.top="0";let l=document.createElement("canvas");l.width=t*n,l.height=t*n,l.style.width=`${t}px`,l.style.height=`${t}px`,l.style.position="absolute",l.style.left="0",l.style.top="0",l.style.pointerEvents="none",s.appendChild(u),s.appendChild(l),e.appendChild(s);let r=u.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),d=l.getContext("2d");d.scale(n,n);let b=(z,v)=>{let m=r.createShader(z);return r.shaderSource(m,v),r.compileShader(m),r.getShaderParameter(m,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(m)),m},h=b(r.VERTEX_SHADER,Fe),g=b(r.FRAGMENT_SHADER,Ie),f=r.createProgram();r.attachShader(f,h),r.attachShader(f,g),r.linkProgram(f);let a=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let i=r.getAttribLocation(f,"position");r.enableVertexAttribArray(i),r.vertexAttribPointer(i,2,r.FLOAT,!1,0,0);let E=b(r.VERTEX_SHADER,Ve),A=b(r.FRAGMENT_SHADER,Oe),L=r.createProgram();r.attachShader(L,E),r.attachShader(L,A),r.linkProgram(L);let p=r.getAttribLocation(L,"a_pos"),k=r.getAttribLocation(L,"a_color"),C=r.getUniformLocation(L,"u_alpha"),T=r.createBuffer(),_={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_mat:r.getUniformLocation(f,"u_mat"),u_mat_inv:r.getUniformLocation(f,"u_mat_inv"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert"),u_show_front:r.getUniformLocation(f,"u_show_front"),u_show_back:r.getUniformLocation(f,"u_show_back"),u_front_width:r.getUniformLocation(f,"u_front_width"),u_back_width:r.getUniformLocation(f,"u_back_width"),u_front_dashed:r.getUniformLocation(f,"u_front_dashed"),u_back_dashed:r.getUniformLocation(f,"u_back_dashed"),u_front_color:r.getUniformLocation(f,"u_front_color"),u_back_color:r.getUniformLocation(f,"u_back_color")};return{gl:r,overlayCtx:d,canvasGL:u,canvasOverlay:l,width:t,height:t,program:f,uniforms:_,posBuffer:a,posAttr:i,triProgram:L,triPosAttr:p,triColorAttr:k,triAlphaLoc:C,triBuffer:T}}var Xe=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function qe(e,t,n,s,u,l){if(!l.showFront&&!l.showBack)return;let r=g=>O(g,t,n,s,u),b=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),h=g=>{let f=ne({x:.5,y:.5,z:.5},s,u);return ne({x:.5+g.x*.1,y:.5+g.y*.1,z:.5+g.z*.1},s,u).z-f.z>0};if(e.save(),l.showBack){e.lineWidth=l.backWidth,l.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.backColor,e.globalAlpha=l.backOpacity;for(let g of Xe)if(!(h(g.normalA)||h(g.normalB))){let[a,i]=g.edge;e.beginPath(),e.moveTo(b[a].x,b[a].y),e.lineTo(b[i].x,b[i].y),e.stroke()}}if(l.showFront){e.lineWidth=l.frontWidth,l.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.frontColor,e.globalAlpha=l.frontOpacity;for(let g of Xe)if(h(g.normalA)||h(g.normalB)){let[a,i]=g.edge;e.beginPath(),e.moveTo(b[a].x,b[a].y),e.lineTo(b[i].x,b[i].y),e.stroke()}}e.restore()}function Ye(e,t,n,s,u,l,r,d,b,h,g,f){let{gl:a,overlayCtx:i,width:E,height:A,program:L,uniforms:p}=e,k=window.devicePixelRatio||1;a.viewport(0,0,E*k,A*k),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(L),a.uniform2f(p.u_resolution,E*k,A*k),a.uniform3f(p.u_box_size,n.sizeX,n.sizeY,n.sizeZ),a.uniform1f(p.u_radius,n.radius!==void 0?n.radius:.001);let C=t.mat;a.uniformMatrix3fv(p.u_mat,!1,new Float32Array([C[0],C[3],C[6],C[1],C[4],C[7],C[2],C[5],C[8]])),a.uniformMatrix3fv(p.u_mat_inv,!1,new Float32Array([C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]])),a.uniform1f(p.u_zoom,t.zoom||1),a.uniform1i(p.u_mode,s==="rgb"?0:s==="hsb"?1:2),a.uniform1i(p.u_invert,u?1:0),a.uniform1i(p.u_show_front,r.showFront?1:0),a.uniform1i(p.u_show_back,r.showBack?1:0),a.uniform1f(p.u_front_width,r.frontWidth||1.5),a.uniform1f(p.u_back_width,r.backWidth||1),a.uniform1i(p.u_front_dashed,r.frontDashed?1:0),a.uniform1i(p.u_back_dashed,r.backDashed?1:0),a.uniform4f(p.u_front_color,1,1,1,r.frontOpacity||.65),a.uniform4f(p.u_back_color,1,1,1,r.backOpacity||.25),a.drawArrays(a.TRIANGLES,0,6);let T=E*.36,_={x:E*.5,y:A*.5},z=null,v=null;if(l.svTriangle&&f){let m=j(h||d,s,T,_,t,n);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?z=m:v=m}if(z){let m=I=>[I.x/E*2-1,1-I.y/A*2],R=m(z.c),G=m(z.w),P=m(z.k);a.useProgram(e.triProgram),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA),a.bindBuffer(a.ARRAY_BUFFER,e.triBuffer),a.bufferData(a.ARRAY_BUFFER,new Float32Array([R[0],R[1],z.cRGB.x,z.cRGB.y,z.cRGB.z,G[0],G[1],1,1,1,P[0],P[1],0,0,0]),a.STATIC_DRAW),a.enableVertexAttribArray(e.triPosAttr),a.vertexAttribPointer(e.triPosAttr,2,a.FLOAT,!1,20,0),a.enableVertexAttribArray(e.triColorAttr),a.vertexAttribPointer(e.triColorAttr,3,a.FLOAT,!1,20,8),a.uniform1f(e.triAlphaLoc,1),a.drawArrays(a.TRIANGLES,0,3),a.disable(a.BLEND),a.useProgram(L),a.enableVertexAttribArray(e.posAttr),a.bindBuffer(a.ARRAY_BUFFER,e.posBuffer),a.vertexAttribPointer(e.posAttr,2,a.FLOAT,!1,0,0)}if(i.save(),i.clearRect(0,0,E,A),qe(i,T,_,t,n,r),Pe(i,T,_,t,n,l),v){let m=v;i.save(),i.beginPath(),i.moveTo(m.k.x,m.k.y),i.lineTo(m.w.x,m.w.y),i.strokeStyle="rgba(107, 114, 128, 0.7)",i.lineWidth=1.2,i.setLineDash([5,4]),i.stroke(),i.setLineDash([]),i.restore()}if(z){let m=z,R=Math.round(m.cRGB.x*255),G=Math.round(m.cRGB.y*255),P=Math.round(m.cRGB.z*255);if(i.save(),i.beginPath(),i.moveTo(m.c.x,m.c.y),i.lineTo(m.w.x,m.w.y),i.lineTo(m.k.x,m.k.y),i.closePath(),i.strokeStyle=`rgba(${R}, ${G}, ${P}, 0.7)`,i.lineWidth=1.2,i.setLineDash([]),i.stroke(),i.beginPath(),i.arc(m.w.x,m.w.y,3.5,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="rgba(17, 24, 39, 0.6)",i.lineWidth=1.2,i.stroke(),i.beginPath(),i.arc(m.k.x,m.k.y,3.5,0,Math.PI*2),i.fillStyle="#111827",i.fill(),i.strokeStyle="rgba(255, 255, 255, 0.7)",i.lineWidth=1.2,i.stroke(),g){let I=g.a*m.c.x+g.b*m.w.x+g.g*m.k.x,X=g.a*m.c.y+g.b*m.w.y+g.g*m.k.y;i.beginPath(),i.arc(I,X,4,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="rgba(17, 24, 39, 0.75)",i.lineWidth=1.4,i.stroke()}i.restore()}if(b&&!g){let m=O(d,T,_,t,n),R=U(d,s),G=u?{r:255-R.r,g:255-R.g,b:255-R.b}:R;i.beginPath(),i.arc(m.x,m.y,6,0,Math.PI*2),i.fillStyle=`rgb(${G.r}, ${G.g}, ${G.b})`,i.fill(),i.strokeStyle="#ffffff",i.lineWidth=2,i.stroke()}i.restore()}var M=Math.PI/180,de=2*Math.PI,he=e=>{let t=e%360;return t>180?t-=360:t<-180&&(t+=360),t},ge=e=>{let t=e%de;return t>Math.PI?t-=de:t<-Math.PI&&(t+=de),t};function Lo(e,t={}){let n=t.size||460,s=t.mode||"rgb",u=!1,l={...De},r={...Se,radius:.08},d={...Ee},b={...we},h={x:8*M,y:-20*M,z:-55*M},g=Z(h.x,h.y,h.z),f=W(),a={...h},i=()=>{l.mat=D(f,g)},E=t.initialColor||{r:255,g:255,b:255},A=Y(E,s),L=!1,p=null,k=null,C=!1,T=new Set,_=Ue(e,n),z=null,v=()=>{z===null&&(z=requestAnimationFrame(()=>{z=null,Ye(_,l,r,s,u,d,b,A,!0,p,k,C)}))},m=()=>{let o=U(A,s),c=u?{r:255-o.r,g:255-o.g,b:255-o.b}:o,x=te(c),B=re(c),w=le(c),y={rgb:c,hsb:x,oklch:B,hex:w,alpha:1};T.forEach(S=>S(y))},R=(o,c)=>{c!==0&&(o==="x"?(g=D(g,$(c)),a.x+=c):o==="y"?(g=D(g,K(c)),a.y+=c):(g=D(g,ue(c)),a.z+=c),i(),v())},G=(o,c)=>{f=D(K(o*.01),f),f=D($(-c*.01),f),i(),v()},P=o=>{f=D(o,me(g)),i(),v()},I=()=>{g=Z(h.x,h.y,h.z),f=W(),a={...h},l.zoom=1,i(),v()},X=!1,q=!1,Q=0,J=0,xe=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),He=()=>{let o=xe();return Math.min(r.radius||.001,Math.min(o.x,o.y,o.z)*.49)},We=o=>{let c=xe(),x=He(),B=Math.abs(o.x)-(c.x-x),w=Math.abs(o.y)-(c.y-x),y=Math.abs(o.z)-(c.z-x),S=Math.max(B,0),F=Math.max(w,0),V=Math.max(y,0),H=Math.hypot(S,F,V),N=Math.min(Math.max(B,Math.max(w,y)),0);return H+N-x},ee=(o,c)=>{let x=_.canvasGL.getBoundingClientRect(),B=(o-x.left)*(_.width/x.width),w=(c-x.top)*(_.height/x.height),y=B-_.width*.5,S=_.height*.5-w,F=_.width*.36*1.6*(l.zoom||1),V={x:y/F,y:S/F},H=oe=>fe(me(l.mat),oe),N=0,ke=null;for(let oe=0;oe<96;oe++){let Ze={x:V.x,y:V.y,z:-5+N},Le=H(Ze),Be=We(Le);if(Be<.001){ke=Le;break}if(N+=Be,N>10)break}return ke},ye=(o,c)=>{let x=ee(o,c);if(!x)return;let B=Math.max(0,Math.min(1,x.x/r.sizeX+.5)),w=Math.max(0,Math.min(1,x.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,x.z/r.sizeZ+.5));A={x:B,y:w,z:y},m(),v()},pe=(o,c)=>{if(!d.svTriangle)return null;let x=_.canvasGL.getBoundingClientRect(),B=(o-x.left)*(_.width/x.width),w=(c-x.top)*(_.height/x.height),y=j(p||A,s,_.width*.36,{x:_.width*.5,y:_.height*.5},l,r),S=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(S)<1e-6)return null;let F=((y.w.y-y.k.y)*(B-y.k.x)+(y.k.x-y.w.x)*(w-y.k.y))/S,V=((y.k.y-y.c.y)*(B-y.k.x)+(y.c.x-y.k.x)*(w-y.k.y))/S,H=1-F-V;return F<-.02||V<-.02||H<-.02?null:{a:F,b:V,g:H}},Ce=o=>{let x=j(p||A,s,_.width*.36,{x:_.width*.5,y:_.height*.5},l,r),B=Math.max(0,Math.min(1,o.a*x.cRGB.x+o.b)),w=Math.max(0,Math.min(1,o.a*x.cRGB.y+o.b)),y=Math.max(0,Math.min(1,o.a*x.cRGB.z+o.b));A=Y({r:B*255,g:w*255,b:y*255},s),m(),v()},_e=0,ve=0,Me=(o,c)=>{_e=o,ve=c,_.canvasGL.style.cursor=ee(o,c)?"default":"grab"};_.canvasGL.addEventListener("mousemove",o=>{Me(o.clientX,o.clientY)}),_.canvasGL.addEventListener("mousedown",o=>{if(o.button===1||o.button===0&&o.altKey)X=!0,Q=o.clientX,J=o.clientY,document.body.style.cursor="grabbing",o.preventDefault();else if(o.button===0){let c=C?pe(o.clientX,o.clientY):null;c?(L=!0,p={...A},k=c,Ce(c)):ee(o.clientX,o.clientY)?(q=!0,p=null,k=null,ye(o.clientX,o.clientY)):(X=!0,Q=o.clientX,J=o.clientY,document.body.style.cursor="grabbing",o.preventDefault())}}),_.canvasGL.addEventListener("auxclick",o=>{o.button===1&&o.preventDefault()}),window.addEventListener("mousemove",o=>{if(L){let c=pe(o.clientX,o.clientY);c&&(k=c,Ce(c))}else if(X){let c=o.clientX-Q,x=o.clientY-J;Q=o.clientX,J=o.clientY,G(c,x)}else q&&ye(o.clientX,o.clientY)}),window.addEventListener("mouseup",()=>{L&&(L=!1),X&&(X=!1,document.body.style.cursor="default"),q&&(q=!1),Me(_e,ve)}),_.canvasGL.addEventListener("wheel",o=>{o.preventDefault();let c=o.deltaY<0?.08:-.08;l.zoom=Math.max(.2,Math.min(2.5,(l.zoom||1)+c)),v()},{passive:!1}),_.canvasGL.addEventListener("dblclick",o=>{ee(o.clientX,o.clientY)?(u=!u,m()):I(),v()});let Re=o=>{if(o.key==="Control"||o.key==="Meta"){C||(C=!0,p=null,k=null,v());return}let c=o.target?.tagName;if(!(c==="INPUT"||c==="TEXTAREA"))switch(o.key){case"r":case"R":I();break;case"f":case"F":P(W());break;case"b":case"B":P(K(Math.PI));break;case"t":case"T":P($(Math.PI/2));break;case"ArrowLeft":o.preventDefault(),R("y",-5*M);break;case"ArrowRight":o.preventDefault(),R("y",5*M);break;case"ArrowUp":o.preventDefault(),R("x",5*M);break;case"ArrowDown":o.preventDefault(),R("x",-5*M);break}};window.addEventListener("keydown",Re);let ze=o=>{(o.key==="Control"||o.key==="Meta")&&C&&(C=!1,p=null,k=null,v())};window.addEventListener("keyup",ze);let Ae=()=>{C&&(C=!1,p=null,k=null,v())};return window.addEventListener("blur",Ae),v(),m(),{getColor:()=>{let o=U(A,s),c=u?{r:255-o.r,g:255-o.g,b:255-o.b}:o;return{rgb:c,hsb:te(c),oklch:re(c),hex:le(c),alpha:1}},setColor:o=>{E=o,A=Y(o,s),p=null,k=null,m(),v()},setMode:o=>{s=o,p=null,k=null,m(),v()},getMode:()=>s,setRotation:(o,c)=>{g=Z(c*M,0,o*M),f=W(),a.x=c*M,a.y=0,a.z=o*M,i(),v()},getAxisRotation:()=>({rotXDeg:Math.round(he(a.x*180/Math.PI)*10)/10,rotYDeg:Math.round(he(a.y*180/Math.PI)*10)/10,rotZDeg:Math.round(he(a.z*180/Math.PI)*10)/10}),setAxisRotation:(o,c,x)=>{R("x",ge(o*M-a.x)),R("y",ge(c*M-a.y)),R("z",ge(x*M-a.z))},rotateLocal:(o,c)=>{R(o,c*M)},resetRotation:(o,c,x)=>{g=Z(o*M,c*M,x*M),f=W(),a.x=o*M,a.y=c*M,a.z=x*M,i(),v()},setZoom:o=>{l.zoom=Math.max(.1,Math.min(3,o)),v()},getZoom:()=>l.zoom||1,setDimensions:(o,c,x)=>{r.sizeX=Math.max(.2,Math.min(2.5,o)),r.sizeY=Math.max(.2,Math.min(2.5,c)),r.sizeZ=Math.max(.2,Math.min(2.5,x)),v()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:o=>{r.radius=Math.max(0,Math.min(.5,o)),v()},getRadius:()=>r.radius,getEdgeStyle:()=>({...b}),setEdgeStyle:o=>{b={...b,...o},v()},getGuides:()=>({...d}),setGuides:o=>{d={...d,...o},v()},toggleAllGuides:o=>{let c=o!==void 0?o:!d.vertexX;d={vertexX:c,vertexY:c,vertexZ:c,centerX:c,centerY:c,centerZ:c,angleGuides:c},v()},on:(o,c)=>{T.add(c)},off:(o,c)=>{T.delete(c)},destroy:()=>{z!==null&&cancelAnimationFrame(z),window.removeEventListener("keydown",Re),window.removeEventListener("keyup",ze),window.removeEventListener("blur",Ae),e.innerHTML=""}}}export{Lo as createRoundedBoxPicker};
