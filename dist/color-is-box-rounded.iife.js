var ColorIsBoxRounded=(()=>{var ae=Object.defineProperty;var $e=Object.getOwnPropertyDescriptor;var Ke=Object.getOwnPropertyNames;var je=Object.prototype.hasOwnProperty;var qe=(e,o)=>{for(var n in o)ae(e,n,{get:o[n],enumerable:!0})},Qe=(e,o,n,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let l of Ke(o))!je.call(e,l)&&l!==n&&ae(e,l,{get:()=>o[l],enumerable:!(i=$e(o,l))||i.enumerable});return e};var Je=e=>Qe(ae({},"__esModule",{value:!0}),e);var io={};qe(io,{createRoundedBoxPicker:()=>ao});var Ee={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Te={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function te(e){let o=e.r/255,n=e.g/255,i=e.b/255,l=Math.max(o,n,i),c=Math.min(o,n,i),r=l-c,d=0;r!==0&&(l===o?d=((n-i)/r+6)%6:l===n?d=(i-o)/r+2:d=(o-n)/r+4,d*=60);let b=l===0?0:r/l*100,h=l*100;return{h:d,s:b,b:h}}function eo(e){let o=e.h,n=e.s/100,i=e.b/100,l=i*n,c=l*(1-Math.abs(o/60%2-1)),r=i-l,d,b,h;return o<60?(d=l,b=c,h=0):o<120?(d=c,b=l,h=0):o<180?(d=0,b=l,h=c):o<240?(d=0,b=c,h=l):o<300?(d=c,b=0,h=l):(d=l,b=0,h=c),{r:Math.round((d+r)*255),g:Math.round((b+r)*255),b:Math.round((h+r)*255)}}function ie(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function se(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function oo(e){let o=ie(e.r/255),n=ie(e.g/255),i=ie(e.b/255),l=.4122214708*o+.5363325363*n+.0514459929*i,c=.2119034982*o+.6806995451*n+.1073969566*i,r=.0883024619*o+.2817188376*n+.6299787005*i,d=Math.cbrt(l),b=Math.cbrt(c),h=Math.cbrt(r);return{L:.2104542553*d+.793617785*b-.0040720468*h,a:1.9779984951*d-2.428592205*b+.4505937099*h,b:.0259040371*d+.7827717662*b-.808675766*h}}function to(e,o,n){let i=e+.3963377774*o+.2158037573*n,l=e-.1055613458*o-.0638541728*n,c=e-.0894841775*o-1.291485548*n,r=i*i*i,d=l*l*l,b=c*c*c,h=4.0767416621*r-3.3077115913*d+.2309699292*b,g=-1.2684380046*r+2.6097574011*d-.3413193965*b,f=-.0041960863*r-.7034186147*d+1.707614701*b;return{r:Math.round(Math.max(0,Math.min(1,se(h)))*255),g:Math.round(Math.max(0,Math.min(1,se(g)))*255),b:Math.round(Math.max(0,Math.min(1,se(f)))*255)}}function re(e){let o=oo(e),n=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:n,h:n<1e-4?0:i}}function le(e){let o=e.h*(Math.PI/180),n=e.c*Math.cos(o),i=e.c*Math.sin(o);return to(e.l,n,i)}function ro(e,o,n){let i=le({l:e,c:o,h:n});if(Ge(i))return{l:e,c:o,h:n};let l=0,c=o;for(let r=0;r<20;r++){let d=(l+c)/2;i=le({l:e,c:d,h:n}),Ge(i)?l=d:c=d}return{l:e,c:l,h:n}}function Ge(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function ce(e){let o=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var De=.4;function U(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return eo({h:e.x*359,s:e.y*100,b:e.z*100});{let n=e.x,i=e.y*De,l=e.z*359,c=ro(n,i,l);return le(c)}}function Y(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let n=te(e);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=re(e);return{x:n.l,y:Math.min(n.c/De,1),z:n.h/359}}}var ue=Math.PI/180;function W(){return[1,0,0,0,1,0,0,0,1]}function $(e){let o=Math.cos(e),n=Math.sin(e);return[1,0,0,0,o,-n,0,n,o]}function K(e){let o=Math.cos(e),n=Math.sin(e);return[o,0,n,0,1,0,-n,0,o]}function me(e){let o=Math.cos(e),n=Math.sin(e);return[o,n,0,-n,o,0,0,0,1]}function D(e,o){let n=new Array(9);for(let i=0;i<3;i++)for(let l=0;l<3;l++)n[i*3+l]=e[i*3]*o[l]+e[i*3+1]*o[3+l]+e[i*3+2]*o[6+l];return n}function fe(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function be(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function Z(e,o,n){return D(K(o),D(me(n),$(e)))}var Se={mat:Z(8*ue,-20*ue,-55*ue),zoom:1},Pe={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ne(e,o,n){let i=(e.x-.5)*n.sizeX,l=(e.y-.5)*n.sizeY,c=(e.z-.5)*n.sizeZ;return be(o.mat,{x:i,y:l,z:c})}function O(e,o,n,i,l){let c=ne(e,i,l);return{x:n.x+c.x*o*1.6*i.zoom,y:n.y-c.y*o*1.6*i.zoom}}function j(e,o,n,i,l,c){let r=U(e,o),d={x:r.r/255,y:r.g/255,z:r.b/255},b=Y({r:255,g:255,b:255},o),h=Y({r:0,g:0,b:0},o);return{c:O(e,n,i,l,c),w:O(b,n,i,l,c),k:O(h,n,i,l,c),cRGB:d}}var de=["#ef4444","#22c55e","#3b82f6"];function Fe(e,o,n,i,l,c){let r=f=>O(f,o,n,i,l);e.save();let d=r({x:.5,y:.5,z:.5}),b=.35,h=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:de[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:de[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:de[2],name:"Cz",visible:c.centerZ}],g=!1;for(let f=0;f<h.length;f++){if(!h[f].visible)continue;g=!0;let a=r(h[f].from),s=r(h[f].to);e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(s.x,s.y),e.strokeStyle=h[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(a.x,a.y,3,0,Math.PI*2),e.arc(s.x,s.y,3,0,Math.PI*2),e.fillStyle=h[f].color,e.fill()}g&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Ve=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Oe=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,Ie=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,Xe=`
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
`;function Ye(e,o){let n=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let l=document.createElement("canvas");l.width=o*n,l.height=o*n,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let c=document.createElement("canvas");c.width=o*n,c.height=o*n,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",i.appendChild(l),i.appendChild(c),e.appendChild(i);let r=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),d=c.getContext("2d");d.scale(n,n);let b=(z,v)=>{let m=r.createShader(z);return r.shaderSource(m,v),r.compileShader(m),r.getShaderParameter(m,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(m)),m},h=b(r.VERTEX_SHADER,Ve),g=b(r.FRAGMENT_SHADER,Xe),f=r.createProgram();r.attachShader(f,h),r.attachShader(f,g),r.linkProgram(f);let a=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let s=r.getAttribLocation(f,"position");r.enableVertexAttribArray(s),r.vertexAttribPointer(s,2,r.FLOAT,!1,0,0);let E=b(r.VERTEX_SHADER,Oe),A=b(r.FRAGMENT_SHADER,Ie),L=r.createProgram();r.attachShader(L,E),r.attachShader(L,A),r.linkProgram(L);let p=r.getAttribLocation(L,"a_pos"),k=r.getAttribLocation(L,"a_color"),C=r.getUniformLocation(L,"u_alpha"),T=r.createBuffer(),_={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_mat:r.getUniformLocation(f,"u_mat"),u_mat_inv:r.getUniformLocation(f,"u_mat_inv"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert"),u_show_front:r.getUniformLocation(f,"u_show_front"),u_show_back:r.getUniformLocation(f,"u_show_back"),u_front_width:r.getUniformLocation(f,"u_front_width"),u_back_width:r.getUniformLocation(f,"u_back_width"),u_front_dashed:r.getUniformLocation(f,"u_front_dashed"),u_back_dashed:r.getUniformLocation(f,"u_back_dashed"),u_front_color:r.getUniformLocation(f,"u_front_color"),u_back_color:r.getUniformLocation(f,"u_back_color")};return{gl:r,overlayCtx:d,canvasGL:l,canvasOverlay:c,width:o,height:o,program:f,uniforms:_,posBuffer:a,posAttr:s,triProgram:L,triPosAttr:p,triColorAttr:k,triAlphaLoc:C,triBuffer:T}}var Ue=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function no(e,o,n,i,l,c){if(!c.showFront&&!c.showBack)return;let r=g=>O(g,o,n,i,l),b=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),h=g=>{let f=ne({x:.5,y:.5,z:.5},i,l);return ne({x:.5+g.x*.1,y:.5+g.y*.1,z:.5+g.z*.1},i,l).z-f.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let g of Ue)if(!(h(g.normalA)||h(g.normalB))){let[a,s]=g.edge;e.beginPath(),e.moveTo(b[a].x,b[a].y),e.lineTo(b[s].x,b[s].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let g of Ue)if(h(g.normalA)||h(g.normalB)){let[a,s]=g.edge;e.beginPath(),e.moveTo(b[a].x,b[a].y),e.lineTo(b[s].x,b[s].y),e.stroke()}}e.restore()}function He(e,o,n,i,l,c,r,d,b,h,g,f){let{gl:a,overlayCtx:s,width:E,height:A,program:L,uniforms:p}=e,k=window.devicePixelRatio||1;a.viewport(0,0,E*k,A*k),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(L),a.uniform2f(p.u_resolution,E*k,A*k),a.uniform3f(p.u_box_size,n.sizeX,n.sizeY,n.sizeZ),a.uniform1f(p.u_radius,n.radius!==void 0?n.radius:.001);let C=o.mat;a.uniformMatrix3fv(p.u_mat,!1,new Float32Array([C[0],C[3],C[6],C[1],C[4],C[7],C[2],C[5],C[8]])),a.uniformMatrix3fv(p.u_mat_inv,!1,new Float32Array([C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]])),a.uniform1f(p.u_zoom,o.zoom||1),a.uniform1i(p.u_mode,i==="rgb"?0:i==="hsb"?1:2),a.uniform1i(p.u_invert,l?1:0),a.uniform1i(p.u_show_front,r.showFront?1:0),a.uniform1i(p.u_show_back,r.showBack?1:0),a.uniform1f(p.u_front_width,r.frontWidth||1.5),a.uniform1f(p.u_back_width,r.backWidth||1),a.uniform1i(p.u_front_dashed,r.frontDashed?1:0),a.uniform1i(p.u_back_dashed,r.backDashed?1:0),a.uniform4f(p.u_front_color,1,1,1,r.frontOpacity||.65),a.uniform4f(p.u_back_color,1,1,1,r.backOpacity||.25),a.drawArrays(a.TRIANGLES,0,6);let T=E*.36,_={x:E*.5,y:A*.5},z=null,v=null;if(c.svTriangle&&f){let m=j(h||d,i,T,_,o,n);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?z=m:v=m}if(z){let m=I=>[I.x/E*2-1,1-I.y/A*2],R=m(z.c),G=m(z.w),P=m(z.k);a.useProgram(e.triProgram),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA),a.bindBuffer(a.ARRAY_BUFFER,e.triBuffer),a.bufferData(a.ARRAY_BUFFER,new Float32Array([R[0],R[1],z.cRGB.x,z.cRGB.y,z.cRGB.z,G[0],G[1],1,1,1,P[0],P[1],0,0,0]),a.STATIC_DRAW),a.enableVertexAttribArray(e.triPosAttr),a.vertexAttribPointer(e.triPosAttr,2,a.FLOAT,!1,20,0),a.enableVertexAttribArray(e.triColorAttr),a.vertexAttribPointer(e.triColorAttr,3,a.FLOAT,!1,20,8),a.uniform1f(e.triAlphaLoc,1),a.drawArrays(a.TRIANGLES,0,3),a.disable(a.BLEND),a.useProgram(L),a.enableVertexAttribArray(e.posAttr),a.bindBuffer(a.ARRAY_BUFFER,e.posBuffer),a.vertexAttribPointer(e.posAttr,2,a.FLOAT,!1,0,0)}if(s.save(),s.clearRect(0,0,E,A),no(s,T,_,o,n,r),Fe(s,T,_,o,n,c),v){let m=v;s.save(),s.beginPath(),s.moveTo(m.k.x,m.k.y),s.lineTo(m.w.x,m.w.y),s.strokeStyle="rgba(107, 114, 128, 0.7)",s.lineWidth=1.2,s.setLineDash([5,4]),s.stroke(),s.setLineDash([]),s.restore()}if(z){let m=z,R=Math.round(m.cRGB.x*255),G=Math.round(m.cRGB.y*255),P=Math.round(m.cRGB.z*255);if(s.save(),s.beginPath(),s.moveTo(m.c.x,m.c.y),s.lineTo(m.w.x,m.w.y),s.lineTo(m.k.x,m.k.y),s.closePath(),s.strokeStyle=`rgba(${R}, ${G}, ${P}, 0.7)`,s.lineWidth=1.2,s.setLineDash([]),s.stroke(),s.beginPath(),s.arc(m.w.x,m.w.y,3.5,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.strokeStyle="rgba(17, 24, 39, 0.6)",s.lineWidth=1.2,s.stroke(),s.beginPath(),s.arc(m.k.x,m.k.y,3.5,0,Math.PI*2),s.fillStyle="#111827",s.fill(),s.strokeStyle="rgba(255, 255, 255, 0.7)",s.lineWidth=1.2,s.stroke(),g){let I=g.a*m.c.x+g.b*m.w.x+g.g*m.k.x,X=g.a*m.c.y+g.b*m.w.y+g.g*m.k.y;s.beginPath(),s.arc(I,X,4,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.strokeStyle="rgba(17, 24, 39, 0.75)",s.lineWidth=1.4,s.stroke()}s.restore()}if(b&&!g){let m=O(d,T,_,o,n),R=U(d,i),G=l?{r:255-R.r,g:255-R.g,b:255-R.b}:R;s.beginPath(),s.arc(m.x,m.y,6,0,Math.PI*2),s.fillStyle=`rgb(${G.r}, ${G.g}, ${G.b})`,s.fill(),s.strokeStyle="#ffffff",s.lineWidth=2,s.stroke()}s.restore()}var M=Math.PI/180,he=2*Math.PI,ge=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},xe=e=>{let o=e%he;return o>Math.PI?o-=he:o<-Math.PI&&(o+=he),o};function ao(e,o={}){let n=o.size||460,i=o.mode||"rgb",l=!1,c={...Se},r={...Pe,radius:.08},d={...Te},b={...Ee},h={x:8*M,y:-20*M,z:-55*M},g=Z(h.x,h.y,h.z),f=W(),a={...h},s=()=>{c.mat=D(f,g)},E=o.initialColor||{r:255,g:255,b:255},A=Y(E,i),L=!1,p=null,k=null,C=!1,T=new Set,_=Ye(e,n),z=null,v=()=>{z===null&&(z=requestAnimationFrame(()=>{z=null,He(_,c,r,i,l,d,b,A,!0,p,k,C)}))},m=()=>{let t=U(A,i),u=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t,x=te(u),B=re(u),w=ce(u),y={rgb:u,hsb:x,oklch:B,hex:w,alpha:1};T.forEach(S=>S(y))},R=(t,u)=>{u!==0&&(t==="x"?(g=D(g,$(u)),a.x+=u):t==="y"?(g=D(g,K(u)),a.y+=u):(g=D(g,me(u)),a.z+=u),s(),v())},G=(t,u)=>{f=D(K(t*.01),f),f=D($(-u*.01),f),s(),v()},P=t=>{f=D(t,fe(g)),s(),v()},I=()=>{g=Z(h.x,h.y,h.z),f=W(),a={...h},c.zoom=1,s(),v()},X=!1,q=!1,Q=0,J=0,ye=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),We=()=>{let t=ye();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Ze=t=>{let u=ye(),x=We(),B=Math.abs(t.x)-(u.x-x),w=Math.abs(t.y)-(u.y-x),y=Math.abs(t.z)-(u.z-x),S=Math.max(B,0),F=Math.max(w,0),V=Math.max(y,0),H=Math.hypot(S,F,V),N=Math.min(Math.max(B,Math.max(w,y)),0);return H+N-x},ee=(t,u)=>{let x=_.canvasGL.getBoundingClientRect(),B=(t-x.left)*(_.width/x.width),w=(u-x.top)*(_.height/x.height),y=B-_.width*.5,S=_.height*.5-w,F=_.width*.36*1.6*(c.zoom||1),V={x:y/F,y:S/F},H=oe=>be(fe(c.mat),oe),N=0,Le=null;for(let oe=0;oe<96;oe++){let Ne={x:V.x,y:V.y,z:-5+N},Be=H(Ne),we=Ze(Be);if(we<.001){Le=Be;break}if(N+=we,N>10)break}return Le},pe=(t,u)=>{let x=ee(t,u);if(!x)return;let B=Math.max(0,Math.min(1,x.x/r.sizeX+.5)),w=Math.max(0,Math.min(1,x.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,x.z/r.sizeZ+.5));A={x:B,y:w,z:y},m(),v()},Ce=(t,u)=>{if(!d.svTriangle)return null;let x=_.canvasGL.getBoundingClientRect(),B=(t-x.left)*(_.width/x.width),w=(u-x.top)*(_.height/x.height),y=j(p||A,i,_.width*.36,{x:_.width*.5,y:_.height*.5},c,r),S=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(S)<1e-6)return null;let F=((y.w.y-y.k.y)*(B-y.k.x)+(y.k.x-y.w.x)*(w-y.k.y))/S,V=((y.k.y-y.c.y)*(B-y.k.x)+(y.c.x-y.k.x)*(w-y.k.y))/S,H=1-F-V;return F<-.02||V<-.02||H<-.02?null:{a:F,b:V,g:H}},_e=t=>{let x=j(p||A,i,_.width*.36,{x:_.width*.5,y:_.height*.5},c,r),B=Math.max(0,Math.min(1,t.a*x.cRGB.x+t.b)),w=Math.max(0,Math.min(1,t.a*x.cRGB.y+t.b)),y=Math.max(0,Math.min(1,t.a*x.cRGB.z+t.b));A=Y({r:B*255,g:w*255,b:y*255},i),m(),v()},ve=0,Me=0,Re=(t,u)=>{ve=t,Me=u,_.canvasGL.style.cursor=ee(t,u)?"default":"grab"};_.canvasGL.addEventListener("mousemove",t=>{Re(t.clientX,t.clientY)}),_.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)X=!0,Q=t.clientX,J=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let u=C?Ce(t.clientX,t.clientY):null;u?(L=!0,p={...A},k=u,_e(u)):ee(t.clientX,t.clientY)?(q=!0,p=null,k=null,pe(t.clientX,t.clientY)):(X=!0,Q=t.clientX,J=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),_.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(L){let u=Ce(t.clientX,t.clientY);u&&(k=u,_e(u))}else if(X){let u=t.clientX-Q,x=t.clientY-J;Q=t.clientX,J=t.clientY,G(u,x)}else q&&pe(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{L&&(L=!1),X&&(X=!1,document.body.style.cursor="default"),q&&(q=!1),Re(ve,Me)}),_.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let u=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+u)),v()},{passive:!1}),_.canvasGL.addEventListener("dblclick",t=>{ee(t.clientX,t.clientY)?(l=!l,m()):I(),v()});let ze=t=>{if(t.key==="Control"||t.key==="Meta"){C||(C=!0,p=null,k=null,v());return}let u=t.target?.tagName;if(!(u==="INPUT"||u==="TEXTAREA"))switch(t.key){case"r":case"R":I();break;case"f":case"F":P(W());break;case"b":case"B":P(K(Math.PI));break;case"t":case"T":P($(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),R("y",-5*M);break;case"ArrowRight":t.preventDefault(),R("y",5*M);break;case"ArrowUp":t.preventDefault(),R("x",5*M);break;case"ArrowDown":t.preventDefault(),R("x",-5*M);break}};window.addEventListener("keydown",ze);let Ae=t=>{(t.key==="Control"||t.key==="Meta")&&C&&(C=!1,p=null,k=null,v())};window.addEventListener("keyup",Ae);let ke=()=>{C&&(C=!1,p=null,k=null,v())};return window.addEventListener("blur",ke),v(),m(),{getColor:()=>{let t=U(A,i),u=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:u,hsb:te(u),oklch:re(u),hex:ce(u),alpha:1}},setColor:t=>{E=t,A=Y(t,i),p=null,k=null,m(),v()},setMode:t=>{i=t,p=null,k=null,m(),v()},getMode:()=>i,setRotation:(t,u)=>{g=Z(u*M,0,t*M),f=W(),a.x=u*M,a.y=0,a.z=t*M,s(),v()},getAxisRotation:()=>({rotXDeg:Math.round(ge(a.x*180/Math.PI)*10)/10,rotYDeg:Math.round(ge(a.y*180/Math.PI)*10)/10,rotZDeg:Math.round(ge(a.z*180/Math.PI)*10)/10}),setAxisRotation:(t,u,x)=>{R("x",xe(t*M-a.x)),R("y",xe(u*M-a.y)),R("z",xe(x*M-a.z))},rotateLocal:(t,u)=>{R(t,u*M)},resetRotation:(t,u,x)=>{g=Z(t*M,u*M,x*M),f=W(),a.x=t*M,a.y=u*M,a.z=x*M,s(),v()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),v()},getZoom:()=>c.zoom||1,setDimensions:(t,u,x)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,u)),r.sizeZ=Math.max(.2,Math.min(2.5,x)),v()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),v()},getRadius:()=>r.radius,getEdgeStyle:()=>({...b}),setEdgeStyle:t=>{b={...b,...t},v()},getGuides:()=>({...d}),setGuides:t=>{d={...d,...t},v()},toggleAllGuides:t=>{let u=t!==void 0?t:!d.vertexX;d={vertexX:u,vertexY:u,vertexZ:u,centerX:u,centerY:u,centerZ:u,angleGuides:u},v()},on:(t,u)=>{T.add(u)},off:(t,u)=>{T.delete(u)},destroy:()=>{z!==null&&cancelAnimationFrame(z),window.removeEventListener("keydown",ze),window.removeEventListener("keyup",Ae),window.removeEventListener("blur",ke),e.innerHTML=""}}}return Je(io);})();
