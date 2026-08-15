var ColorIsBoxRounded=(()=>{var ne=Object.defineProperty;var We=Object.getOwnPropertyDescriptor;var Ze=Object.getOwnPropertyNames;var Ne=Object.prototype.hasOwnProperty;var $e=(e,o)=>{for(var a in o)ne(e,a,{get:o[a],enumerable:!0})},je=(e,o,a,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let c of Ze(o))!Ne.call(e,c)&&c!==a&&ne(e,c,{get:()=>o[c],enumerable:!(i=We(o,c))||i.enumerable});return e};var Ke=e=>je(ne({},"__esModule",{value:!0}),e);var ro={};$e(ro,{createRoundedBoxPicker:()=>to});var Le={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Be={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function oe(e){let o=e.r/255,a=e.g/255,i=e.b/255,c=Math.max(o,a,i),l=Math.min(o,a,i),r=c-l,b=0;r!==0&&(c===o?b=((a-i)/r+6)%6:c===a?b=(i-o)/r+2:b=(o-a)/r+4,b*=60);let f=c===0?0:r/c*100,d=c*100;return{h:b,s:f,b:d}}function qe(e){let o=e.h,a=e.s/100,i=e.b/100,c=i*a,l=c*(1-Math.abs(o/60%2-1)),r=i-c,b,f,d;return o<60?(b=c,f=l,d=0):o<120?(b=l,f=c,d=0):o<180?(b=0,f=c,d=l):o<240?(b=0,f=l,d=c):o<300?(b=l,f=0,d=c):(b=c,f=0,d=l),{r:Math.round((b+r)*255),g:Math.round((f+r)*255),b:Math.round((d+r)*255)}}function ae(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ie(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Qe(e){let o=ae(e.r/255),a=ae(e.g/255),i=ae(e.b/255),c=.4122214708*o+.5363325363*a+.0514459929*i,l=.2119034982*o+.6806995451*a+.1073969566*i,r=.0883024619*o+.2817188376*a+.6299787005*i,b=Math.cbrt(c),f=Math.cbrt(l),d=Math.cbrt(r);return{L:.2104542553*b+.793617785*f-.0040720468*d,a:1.9779984951*b-2.428592205*f+.4505937099*d,b:.0259040371*b+.7827717662*f-.808675766*d}}function Je(e,o,a){let i=e+.3963377774*o+.2158037573*a,c=e-.1055613458*o-.0638541728*a,l=e-.0894841775*o-1.291485548*a,r=i*i*i,b=c*c*c,f=l*l*l,d=4.0767416621*r-3.3077115913*b+.2309699292*f,h=-1.2684380046*r+2.6097574011*b-.3413193965*f,n=-.0041960863*r-.7034186147*b+1.707614701*f;return{r:Math.round(Math.max(0,Math.min(1,ie(d)))*255),g:Math.round(Math.max(0,Math.min(1,ie(h)))*255),b:Math.round(Math.max(0,Math.min(1,ie(n)))*255)}}function te(e){let o=Qe(e),a=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:a,h:a<1e-4?0:i}}function se(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),i=e.c*Math.sin(o);return Je(e.l,a,i)}function eo(e,o,a){let i=se({l:e,c:o,h:a});if(Ge(i))return{l:e,c:o,h:a};let c=0,l=o;for(let r=0;r<20;r++){let b=(c+l)/2;i=se({l:e,c:b,h:a}),Ge(i)?c=b:l=b}return{l:e,c,h:a}}function Ge(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function ce(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Te=.4;function V(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return qe({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,i=e.y*Te,c=e.z*359,l=eo(a,i,c);return se(l)}}function O(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=oe(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=te(e);return{x:a.l,y:Math.min(a.c/Te,1),z:a.h/359}}}var le=Math.PI/180;function U(){return[1,0,0,0,1,0,0,0,1]}function Z(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function N(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function ue(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function E(e,o){let a=new Array(9);for(let i=0;i<3;i++)for(let c=0;c<3;c++)a[i*3+c]=e[i*3]*o[c]+e[i*3+1]*o[3+c]+e[i*3+2]*o[6+c];return a}function me(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function fe(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function Y(e,o,a){return E(N(o),E(ue(a),Z(e)))}var Ee={mat:Y(8*le,-20*le,-55*le),zoom:1},we={sizeX:1,sizeY:1,sizeZ:1,radius:0};function re(e,o,a){let i=(e.x-.5)*a.sizeX,c=(e.y-.5)*a.sizeY,l=(e.z-.5)*a.sizeZ;return fe(o.mat,{x:i,y:c,z:l})}function P(e,o,a,i,c){let l=re(e,i,c);return{x:a.x+l.x*o*1.6*i.zoom,y:a.y-l.y*o*1.6*i.zoom}}function $(e,o,a,i,c,l){let r=V(e,o),b={x:r.r/255,y:r.g/255,z:r.b/255},f=O({r:255,g:255,b:255},o),d=O({r:0,g:0,b:0},o);return{c:P(e,a,i,c,l),w:P(f,a,i,c,l),k:P(d,a,i,c,l),cRGB:b}}var be=["#ef4444","#22c55e","#3b82f6"];function De(e,o,a,i,c,l){let r=n=>P(n,o,a,i,c);e.save();let b=r({x:.5,y:.5,z:.5}),f=.35,d=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:be[0],name:"Cx",visible:l.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:be[1],name:"Cy",visible:l.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:be[2],name:"Cz",visible:l.centerZ}],h=!1;for(let n=0;n<d.length;n++){if(!d[n].visible)continue;h=!0;let s=r(d[n].from),C=r(d[n].to);e.beginPath(),e.moveTo(s.x,s.y),e.lineTo(C.x,C.y),e.strokeStyle=d[n].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(s.x,s.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=d[n].color,e.fill()}h&&(e.beginPath(),e.arc(b.x,b.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Se=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Fe=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,Pe=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,Ve=`
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
`;function Ie(e,o){let a=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let l=document.createElement("canvas");l.width=o*a,l.height=o*a,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0",l.style.pointerEvents="none",i.appendChild(c),i.appendChild(l),e.appendChild(i);let r=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),b=l.getContext("2d");b.scale(a,a);let f=(m,R)=>{let v=r.createShader(m);return r.shaderSource(v,R),r.compileShader(v),r.getShaderParameter(v,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(v)),v},d=f(r.VERTEX_SHADER,Se),h=f(r.FRAGMENT_SHADER,Ve),n=r.createProgram();r.attachShader(n,d),r.attachShader(n,h),r.linkProgram(n);let s=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,s),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(n,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let G=f(r.VERTEX_SHADER,Fe),A=f(r.FRAGMENT_SHADER,Pe),y=r.createProgram();r.attachShader(y,G),r.attachShader(y,A),r.linkProgram(y);let k=r.getAttribLocation(y,"a_pos"),_=r.getAttribLocation(y,"a_color"),T=r.getUniformLocation(y,"u_alpha"),p=r.createBuffer(),z={u_resolution:r.getUniformLocation(n,"u_resolution"),u_box_size:r.getUniformLocation(n,"u_box_size"),u_radius:r.getUniformLocation(n,"u_radius"),u_mat:r.getUniformLocation(n,"u_mat"),u_mat_inv:r.getUniformLocation(n,"u_mat_inv"),u_zoom:r.getUniformLocation(n,"u_zoom"),u_mode:r.getUniformLocation(n,"u_mode"),u_invert:r.getUniformLocation(n,"u_invert"),u_show_front:r.getUniformLocation(n,"u_show_front"),u_show_back:r.getUniformLocation(n,"u_show_back"),u_front_width:r.getUniformLocation(n,"u_front_width"),u_back_width:r.getUniformLocation(n,"u_back_width"),u_front_dashed:r.getUniformLocation(n,"u_front_dashed"),u_back_dashed:r.getUniformLocation(n,"u_back_dashed"),u_front_color:r.getUniformLocation(n,"u_front_color"),u_back_color:r.getUniformLocation(n,"u_back_color")};return{gl:r,overlayCtx:b,canvasGL:c,canvasOverlay:l,width:o,height:o,program:n,uniforms:z,posBuffer:s,posAttr:C,triProgram:y,triPosAttr:k,triColorAttr:_,triAlphaLoc:T,triBuffer:p}}var Oe=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function oo(e,o,a,i,c,l){if(!l.showFront&&!l.showBack)return;let r=h=>P(h,o,a,i,c),f=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),d=h=>{let n=re({x:.5,y:.5,z:.5},i,c);return re({x:.5+h.x*.1,y:.5+h.y*.1,z:.5+h.z*.1},i,c).z-n.z>0};if(e.save(),l.showBack){e.lineWidth=l.backWidth,l.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.backColor,e.globalAlpha=l.backOpacity;for(let h of Oe)if(!(d(h.normalA)||d(h.normalB))){let[s,C]=h.edge;e.beginPath(),e.moveTo(f[s].x,f[s].y),e.lineTo(f[C].x,f[C].y),e.stroke()}}if(l.showFront){e.lineWidth=l.frontWidth,l.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.frontColor,e.globalAlpha=l.frontOpacity;for(let h of Oe)if(d(h.normalA)||d(h.normalB)){let[s,C]=h.edge;e.beginPath(),e.moveTo(f[s].x,f[s].y),e.lineTo(f[C].x,f[C].y),e.stroke()}}e.restore()}function Xe(e,o,a,i,c,l,r,b,f,d,h){let{gl:n,overlayCtx:s,width:C,height:G,program:A,uniforms:y}=e,k=window.devicePixelRatio||1;n.viewport(0,0,C*k,G*k),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(A),n.uniform2f(y.u_resolution,C*k,G*k),n.uniform3f(y.u_box_size,a.sizeX,a.sizeY,a.sizeZ),n.uniform1f(y.u_radius,a.radius!==void 0?a.radius:.001);let _=o.mat;n.uniformMatrix3fv(y.u_mat,!1,new Float32Array([_[0],_[3],_[6],_[1],_[4],_[7],_[2],_[5],_[8]])),n.uniformMatrix3fv(y.u_mat_inv,!1,new Float32Array([_[0],_[1],_[2],_[3],_[4],_[5],_[6],_[7],_[8]])),n.uniform1f(y.u_zoom,o.zoom||1),n.uniform1i(y.u_mode,i==="rgb"?0:i==="hsb"?1:2),n.uniform1i(y.u_invert,c?1:0),n.uniform1i(y.u_show_front,r.showFront?1:0),n.uniform1i(y.u_show_back,r.showBack?1:0),n.uniform1f(y.u_front_width,r.frontWidth||1.5),n.uniform1f(y.u_back_width,r.backWidth||1),n.uniform1i(y.u_front_dashed,r.frontDashed?1:0),n.uniform1i(y.u_back_dashed,r.backDashed?1:0),n.uniform4f(y.u_front_color,1,1,1,r.frontOpacity||.65),n.uniform4f(y.u_back_color,1,1,1,r.backOpacity||.25),n.drawArrays(n.TRIANGLES,0,6);let T=C*.36,p={x:C*.5,y:G*.5},z=null;if(l.svTriangle){let m=$(d||b,i,T,p,o,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4&&(z=m)}if(z){let m=D=>[D.x/C*2-1,1-D.y/G*2],R=m(z.c),v=m(z.w),I=m(z.k);n.useProgram(e.triProgram),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.bindBuffer(n.ARRAY_BUFFER,e.triBuffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array([R[0],R[1],z.cRGB.x,z.cRGB.y,z.cRGB.z,v[0],v[1],1,1,1,I[0],I[1],0,0,0]),n.STATIC_DRAW),n.enableVertexAttribArray(e.triPosAttr),n.vertexAttribPointer(e.triPosAttr,2,n.FLOAT,!1,20,0),n.enableVertexAttribArray(e.triColorAttr),n.vertexAttribPointer(e.triColorAttr,3,n.FLOAT,!1,20,8),n.uniform1f(e.triAlphaLoc,1),n.drawArrays(n.TRIANGLES,0,3),n.disable(n.BLEND),n.useProgram(A),n.enableVertexAttribArray(e.posAttr),n.bindBuffer(n.ARRAY_BUFFER,e.posBuffer),n.vertexAttribPointer(e.posAttr,2,n.FLOAT,!1,0,0)}if(s.save(),s.clearRect(0,0,C,G),oo(s,T,p,o,a,r),De(s,T,p,o,a,l),z){let m=z,R=Math.round(m.cRGB.x*255),v=Math.round(m.cRGB.y*255),I=Math.round(m.cRGB.z*255);if(s.save(),s.beginPath(),s.moveTo(m.c.x,m.c.y),s.lineTo(m.w.x,m.w.y),s.lineTo(m.k.x,m.k.y),s.closePath(),s.strokeStyle=`rgba(${R}, ${v}, ${I}, 0.7)`,s.lineWidth=1.2,s.setLineDash([]),s.stroke(),s.beginPath(),s.arc(m.w.x,m.w.y,3.5,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.strokeStyle="rgba(17, 24, 39, 0.6)",s.lineWidth=1.2,s.stroke(),s.beginPath(),s.arc(m.k.x,m.k.y,3.5,0,Math.PI*2),s.fillStyle="#111827",s.fill(),s.strokeStyle="rgba(255, 255, 255, 0.7)",s.lineWidth=1.2,s.stroke(),h){let D=h.a*m.c.x+h.b*m.w.x+h.g*m.k.x,j=h.a*m.c.y+h.b*m.w.y+h.g*m.k.y;s.beginPath(),s.arc(D,j,4,0,Math.PI*2),s.fillStyle="#ffffff",s.fill(),s.strokeStyle="rgba(17, 24, 39, 0.75)",s.lineWidth=1.4,s.stroke()}s.restore()}if(f&&!h){let m=P(b,T,p,o,a),R=V(b,i),v=c?{r:255-R.r,g:255-R.g,b:255-R.b}:R;s.beginPath(),s.arc(m.x,m.y,6,0,Math.PI*2),s.fillStyle=`rgb(${v.r}, ${v.g}, ${v.b})`,s.fill(),s.strokeStyle="#ffffff",s.lineWidth=2,s.stroke()}s.restore()}var M=Math.PI/180,de=2*Math.PI,he=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},ge=e=>{let o=e%de;return o>Math.PI?o-=de:o<-Math.PI&&(o+=de),o};function to(e,o={}){let a=o.size||460,i=o.mode||"rgb",c=!1,l={...Ee},r={...we,radius:.08},b={...Be},f={...Le},d={x:8*M,y:-20*M,z:-55*M},h=Y(d.x,d.y,d.z),n=U(),s={...d},C=()=>{l.mat=E(n,h)},G=o.initialColor||{r:255,g:255,b:255},A=O(G,i),y=!1,k=null,_=null,T=new Set,p=Ie(e,a),z=null,m=()=>{z===null&&(z=requestAnimationFrame(()=>{z=null,Xe(p,l,r,i,c,b,f,A,!0,k,_)}))},R=()=>{let t=V(A,i),u=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t,g=oe(u),L=te(u),B=ce(u),x={rgb:u,hsb:g,oklch:L,hex:B,alpha:1};T.forEach(w=>w(x))},v=(t,u)=>{u!==0&&(t==="x"?(h=E(h,Z(u)),s.x+=u):t==="y"?(h=E(h,N(u)),s.y+=u):(h=E(h,ue(u)),s.z+=u),C(),m())},I=(t,u)=>{n=E(N(t*.01),n),n=E(Z(-u*.01),n),C(),m()},D=t=>{n=E(t,me(h)),C(),m()},j=()=>{h=Y(d.x,d.y,d.z),n=U(),s={...d},l.zoom=1,C(),m()},H=!1,K=!1,q=0,Q=0,xe=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),Ue=()=>{let t=xe();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Ye=t=>{let u=xe(),g=Ue(),L=Math.abs(t.x)-(u.x-g),B=Math.abs(t.y)-(u.y-g),x=Math.abs(t.z)-(u.z-g),w=Math.max(L,0),S=Math.max(B,0),F=Math.max(x,0),X=Math.hypot(w,S,F),W=Math.min(Math.max(L,Math.max(B,x)),0);return X+W-g},J=(t,u)=>{let g=p.canvasGL.getBoundingClientRect(),L=(t-g.left)*(p.width/g.width),B=(u-g.top)*(p.height/g.height),x=L-p.width*.5,w=p.height*.5-B,S=p.width*.36*1.6*(l.zoom||1),F={x:x/S,y:w/S},X=ee=>fe(me(l.mat),ee),W=0,ze=null;for(let ee=0;ee<96;ee++){let He={x:F.x,y:F.y,z:-5+W},Ae=X(He),ke=Ye(Ae);if(ke<.001){ze=Ae;break}if(W+=ke,W>10)break}return ze},ye=(t,u)=>{let g=J(t,u);if(!g)return;let L=Math.max(0,Math.min(1,g.x/r.sizeX+.5)),B=Math.max(0,Math.min(1,g.y/r.sizeY+.5)),x=Math.max(0,Math.min(1,g.z/r.sizeZ+.5));A={x:L,y:B,z:x},R(),m()},pe=(t,u)=>{if(!b.svTriangle)return null;let g=p.canvasGL.getBoundingClientRect(),L=(t-g.left)*(p.width/g.width),B=(u-g.top)*(p.height/g.height),x=$(k||A,i,p.width*.36,{x:p.width*.5,y:p.height*.5},l,r),w=(x.w.y-x.k.y)*(x.c.x-x.k.x)+(x.k.x-x.w.x)*(x.c.y-x.k.y);if(Math.abs(w)<1e-6)return null;let S=((x.w.y-x.k.y)*(L-x.k.x)+(x.k.x-x.w.x)*(B-x.k.y))/w,F=((x.k.y-x.c.y)*(L-x.k.x)+(x.c.x-x.k.x)*(B-x.k.y))/w,X=1-S-F;return S<-.02||F<-.02||X<-.02?null:{a:S,b:F,g:X}},Ce=t=>{let g=$(k||A,i,p.width*.36,{x:p.width*.5,y:p.height*.5},l,r),L=Math.max(0,Math.min(1,t.a*g.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*g.cRGB.y+t.b)),x=Math.max(0,Math.min(1,t.a*g.cRGB.z+t.b));A=O({r:L*255,g:B*255,b:x*255},i),R(),m()},_e=0,ve=0,Me=(t,u)=>{_e=t,ve=u,p.canvasGL.style.cursor=J(t,u)?"default":"grab"};p.canvasGL.addEventListener("mousemove",t=>{Me(t.clientX,t.clientY)}),p.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)H=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let u=pe(t.clientX,t.clientY);u?(y=!0,k={...A},_=u,Ce(u)):J(t.clientX,t.clientY)?(K=!0,k=null,_=null,ye(t.clientX,t.clientY)):(H=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),p.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(y){let u=pe(t.clientX,t.clientY);u&&(_=u,Ce(u))}else if(H){let u=t.clientX-q,g=t.clientY-Q;q=t.clientX,Q=t.clientY,I(u,g)}else K&&ye(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{y&&(y=!1),H&&(H=!1,document.body.style.cursor="default"),K&&(K=!1),Me(_e,ve)}),p.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let u=t.deltaY<0?.08:-.08;l.zoom=Math.max(.2,Math.min(2.5,(l.zoom||1)+u)),m()},{passive:!1}),p.canvasGL.addEventListener("dblclick",t=>{J(t.clientX,t.clientY)?(c=!c,R()):j(),m()});let Re=t=>{let u=t.target?.tagName;if(!(u==="INPUT"||u==="TEXTAREA"))switch(t.key){case"r":case"R":j();break;case"f":case"F":D(U());break;case"b":case"B":D(N(Math.PI));break;case"t":case"T":D(Z(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),v("y",-5*M);break;case"ArrowRight":t.preventDefault(),v("y",5*M);break;case"ArrowUp":t.preventDefault(),v("x",5*M);break;case"ArrowDown":t.preventDefault(),v("x",-5*M);break}};return window.addEventListener("keydown",Re),m(),R(),{getColor:()=>{let t=V(A,i),u=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:u,hsb:oe(u),oklch:te(u),hex:ce(u),alpha:1}},setColor:t=>{G=t,A=O(t,i),k=null,_=null,R(),m()},setMode:t=>{i=t,k=null,_=null,R(),m()},getMode:()=>i,setRotation:(t,u)=>{h=Y(u*M,0,t*M),n=U(),s.x=u*M,s.y=0,s.z=t*M,C(),m()},getAxisRotation:()=>({rotXDeg:Math.round(he(s.x*180/Math.PI)*10)/10,rotYDeg:Math.round(he(s.y*180/Math.PI)*10)/10,rotZDeg:Math.round(he(s.z*180/Math.PI)*10)/10}),setAxisRotation:(t,u,g)=>{v("x",ge(t*M-s.x)),v("y",ge(u*M-s.y)),v("z",ge(g*M-s.z))},rotateLocal:(t,u)=>{v(t,u*M)},resetRotation:(t,u,g)=>{h=Y(t*M,u*M,g*M),n=U(),s.x=t*M,s.y=u*M,s.z=g*M,C(),m()},setZoom:t=>{l.zoom=Math.max(.1,Math.min(3,t)),m()},getZoom:()=>l.zoom||1,setDimensions:(t,u,g)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,u)),r.sizeZ=Math.max(.2,Math.min(2.5,g)),m()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),m()},getRadius:()=>r.radius,getEdgeStyle:()=>({...f}),setEdgeStyle:t=>{f={...f,...t},m()},getGuides:()=>({...b}),setGuides:t=>{b={...b,...t},m()},toggleAllGuides:t=>{let u=t!==void 0?t:!b.vertexX;b={vertexX:u,vertexY:u,vertexZ:u,centerX:u,centerY:u,centerZ:u,angleGuides:u},m()},on:(t,u)=>{T.add(u)},off:(t,u)=>{T.delete(u)},destroy:()=>{z!==null&&cancelAnimationFrame(z),window.removeEventListener("keydown",Re),e.innerHTML=""}}}return Ke(ro);})();
