var ColorIsBoxRounded=(()=>{var le=Object.defineProperty;var Qe=Object.getOwnPropertyDescriptor;var Je=Object.getOwnPropertyNames;var eo=Object.prototype.hasOwnProperty;var oo=(e,o)=>{for(var r in o)le(e,r,{get:o[r],enumerable:!0})},to=(e,o,r,a)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of Je(o))!eo.call(e,s)&&s!==r&&le(e,s,{get:()=>o[s],enumerable:!(a=Qe(o,s))||a.enumerable});return e};var no=e=>to(le({},"__esModule",{value:!0}),e);var uo={};oo(uo,{createRoundedBoxPicker:()=>lo});var Se={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Fe={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ie(e){let o=e.r/255,r=e.g/255,a=e.b/255,s=Math.max(o,r,a),l=Math.min(o,r,a),n=s-l,d=0;n!==0&&(s===o?d=((r-a)/n+6)%6:s===r?d=(a-o)/n+2:d=(o-r)/n+4,d*=60);let b=s===0?0:n/s*100,h=s*100;return{h:d,s:b,b:h}}function ro(e){let o=e.h,r=e.s/100,a=e.b/100,s=a*r,l=s*(1-Math.abs(o/60%2-1)),n=a-s,d,b,h;return o<60?(d=s,b=l,h=0):o<120?(d=l,b=s,h=0):o<180?(d=0,b=s,h=l):o<240?(d=0,b=l,h=s):o<300?(d=l,b=0,h=s):(d=s,b=0,h=l),{r:Math.round((d+n)*255),g:Math.round((b+n)*255),b:Math.round((h+n)*255)}}function ue(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function me(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function ao(e){let o=ue(e.r/255),r=ue(e.g/255),a=ue(e.b/255),s=.4122214708*o+.5363325363*r+.0514459929*a,l=.2119034982*o+.6806995451*r+.1073969566*a,n=.0883024619*o+.2817188376*r+.6299787005*a,d=Math.cbrt(s),b=Math.cbrt(l),h=Math.cbrt(n);return{L:.2104542553*d+.793617785*b-.0040720468*h,a:1.9779984951*d-2.428592205*b+.4505937099*h,b:.0259040371*d+.7827717662*b-.808675766*h}}function io(e,o,r){let a=e+.3963377774*o+.2158037573*r,s=e-.1055613458*o-.0638541728*r,l=e-.0894841775*o-1.291485548*r,n=a*a*a,d=s*s*s,b=l*l*l,h=4.0767416621*n-3.3077115913*d+.2309699292*b,g=-1.2684380046*n+2.6097574011*d-.3413193965*b,f=-.0041960863*n-.7034186147*d+1.707614701*b;return{r:Math.round(Math.max(0,Math.min(1,me(h)))*255),g:Math.round(Math.max(0,Math.min(1,me(g)))*255),b:Math.round(Math.max(0,Math.min(1,me(f)))*255)}}function se(e){let o=ao(e),r=Math.sqrt(o.a*o.a+o.b*o.b),a=Math.atan2(o.b,o.a)*(180/Math.PI);return a<0&&(a+=360),{l:o.L,c:r,h:r<1e-4?0:a}}function fe(e){let o=e.h*(Math.PI/180),r=e.c*Math.cos(o),a=e.c*Math.sin(o);return io(e.l,r,a)}function so(e,o,r){let a=fe({l:e,c:o,h:r});if(Ve(a))return{l:e,c:o,h:r};let s=0,l=o;for(let n=0;n<20;n++){let d=(s+l)/2;a=fe({l:e,c:d,h:r}),Ve(a)?s=d:l=d}return{l:e,c:s,h:r}}function Ve(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function be(e){let o=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Pe=.4;function N(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return ro({h:e.x*359,s:e.y*100,b:e.z*100});{let r=e.x,a=e.y*Pe,s=e.z*359,l=so(r,a,s);return fe(l)}}function $(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let r=ie(e);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=se(e);return{x:r.l,y:Math.min(r.c/Pe,1),z:r.h/359}}}var de=Math.PI/180;function q(){return[1,0,0,0,1,0,0,0,1]}function ee(e){let o=Math.cos(e),r=Math.sin(e);return[1,0,0,0,o,-r,0,r,o]}function oe(e){let o=Math.cos(e),r=Math.sin(e);return[o,0,r,0,1,0,-r,0,o]}function he(e){let o=Math.cos(e),r=Math.sin(e);return[o,r,0,-r,o,0,0,0,1]}function O(e,o){let r=new Array(9);for(let a=0;a<3;a++)for(let s=0;s<3;s++)r[a*3+s]=e[a*3]*o[s]+e[a*3+1]*o[3+s]+e[a*3+2]*o[6+s];return r}function ge(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function xe(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function Q(e,o,r){return O(oe(o),O(he(r),ee(e)))}var Oe={mat:Q(8*de,-20*de,-55*de),zoom:1},Ie={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ce(e,o,r){let a=(e.x-.5)*r.sizeX,s=(e.y-.5)*r.sizeY,l=(e.z-.5)*r.sizeZ;return xe(o.mat,{x:a,y:s,z:l})}function W(e,o,r,a,s){let l=ce(e,a,s);return{x:r.x+l.x*o*1.6*a.zoom,y:r.y-l.y*o*1.6*a.zoom}}function te(e,o,r,a,s,l){let n=N(e,o),d={x:n.r/255,y:n.g/255,z:n.b/255},b=$({r:255,g:255,b:255},o),h=$({r:0,g:0,b:0},o);return{c:W(e,r,a,s,l),w:W(b,r,a,s,l),k:W(h,r,a,s,l),cRGB:d}}var ye=["#ef4444","#22c55e","#3b82f6"];function Xe(e,o,r,a,s,l){let n=f=>W(f,o,r,a,s);e.save();let d=n({x:.5,y:.5,z:.5}),b=.35,h=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:ye[0],name:"Cx",visible:l.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:ye[1],name:"Cy",visible:l.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:ye[2],name:"Cz",visible:l.centerZ}],g=!1;for(let f=0;f<h.length;f++){if(!h[f].visible)continue;g=!0;let x=n(h[f].from),c=n(h[f].to);e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(c.x,c.y),e.strokeStyle=h[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(x.x,x.y,3,0,Math.PI*2),e.arc(c.x,c.y,3,0,Math.PI*2),e.fillStyle=h[f].color,e.fill()}g&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Ue=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Ye=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,He=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,We=`
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
`;function Ne(e,o){let r=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.userSelect="none";let s=document.createElement("canvas");s.width=o*r,s.height=o*r,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let l=document.createElement("canvas");l.width=o*r,l.height=o*r,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0",l.style.pointerEvents="none",a.appendChild(s),a.appendChild(l),e.appendChild(a);let n=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),d=l.getContext("2d");d.scale(r,r);let b=(G,D)=>{let S=n.createShader(G);return n.shaderSource(S,D),n.compileShader(S),n.getShaderParameter(S,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(S)),S},h=b(n.VERTEX_SHADER,Ue),g=b(n.FRAGMENT_SHADER,We),f=n.createProgram();n.attachShader(f,h),n.attachShader(f,g),n.linkProgram(f);let x=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,x),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let c=n.getAttribLocation(f,"position");n.enableVertexAttribArray(c),n.vertexAttribPointer(c,2,n.FLOAT,!1,0,0);let u=b(n.VERTEX_SHADER,Ye),R=b(n.FRAGMENT_SHADER,He),k=n.createProgram();n.attachShader(k,u),n.attachShader(k,R),n.linkProgram(k);let w=n.getAttribLocation(k,"a_pos"),_=n.getAttribLocation(k,"a_color"),T=n.getUniformLocation(k,"u_alpha"),C=n.createBuffer(),E={u_resolution:n.getUniformLocation(f,"u_resolution"),u_box_size:n.getUniformLocation(f,"u_box_size"),u_radius:n.getUniformLocation(f,"u_radius"),u_mat:n.getUniformLocation(f,"u_mat"),u_mat_inv:n.getUniformLocation(f,"u_mat_inv"),u_zoom:n.getUniformLocation(f,"u_zoom"),u_mode:n.getUniformLocation(f,"u_mode"),u_invert:n.getUniformLocation(f,"u_invert"),u_show_front:n.getUniformLocation(f,"u_show_front"),u_show_back:n.getUniformLocation(f,"u_show_back"),u_front_width:n.getUniformLocation(f,"u_front_width"),u_back_width:n.getUniformLocation(f,"u_back_width"),u_front_dashed:n.getUniformLocation(f,"u_front_dashed"),u_back_dashed:n.getUniformLocation(f,"u_back_dashed"),u_front_color:n.getUniformLocation(f,"u_front_color"),u_back_color:n.getUniformLocation(f,"u_back_color")};return{gl:n,overlayCtx:d,canvasGL:s,canvasOverlay:l,width:o,height:o,program:f,uniforms:E,posBuffer:x,posAttr:c,triProgram:k,triPosAttr:w,triColorAttr:_,triAlphaLoc:T,triBuffer:C}}var Ze=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function co(e,o,r,a,s,l){if(!l.showFront&&!l.showBack)return;let n=g=>W(g,o,r,a,s),b=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),h=g=>{let f=ce({x:.5,y:.5,z:.5},a,s);return ce({x:.5+g.x*.1,y:.5+g.y*.1,z:.5+g.z*.1},a,s).z-f.z>0};if(e.save(),l.showBack){e.lineWidth=l.backWidth,l.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.backColor,e.globalAlpha=l.backOpacity;for(let g of Ze)if(!(h(g.normalA)||h(g.normalB))){let[x,c]=g.edge;e.beginPath(),e.moveTo(b[x].x,b[x].y),e.lineTo(b[c].x,b[c].y),e.stroke()}}if(l.showFront){e.lineWidth=l.frontWidth,l.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.frontColor,e.globalAlpha=l.frontOpacity;for(let g of Ze)if(h(g.normalA)||h(g.normalB)){let[x,c]=g.edge;e.beginPath(),e.moveTo(b[x].x,b[x].y),e.lineTo(b[c].x,b[c].y),e.stroke()}}e.restore()}function $e(e,o,r,a,s,l,n,d,b,h,g,f,x){let{gl:c,overlayCtx:u,width:R,height:k,program:w,uniforms:_}=e,T=window.devicePixelRatio||1;c.viewport(0,0,R*T,k*T),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.useProgram(w),c.uniform2f(_.u_resolution,R*T,k*T),c.uniform3f(_.u_box_size,r.sizeX,r.sizeY,r.sizeZ),c.uniform1f(_.u_radius,r.radius!==void 0?r.radius:.001);let C=o.mat;c.uniformMatrix3fv(_.u_mat,!1,new Float32Array([C[0],C[3],C[6],C[1],C[4],C[7],C[2],C[5],C[8]])),c.uniformMatrix3fv(_.u_mat_inv,!1,new Float32Array([C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]])),c.uniform1f(_.u_zoom,o.zoom||1),c.uniform1i(_.u_mode,a==="rgb"?0:a==="hsb"?1:2),c.uniform1i(_.u_invert,s?1:0),c.uniform1i(_.u_show_front,n.showFront?1:0),c.uniform1i(_.u_show_back,n.showBack?1:0),c.uniform1f(_.u_front_width,n.frontWidth||1.5),c.uniform1f(_.u_back_width,n.backWidth||1),c.uniform1i(_.u_front_dashed,n.frontDashed?1:0),c.uniform1i(_.u_back_dashed,n.backDashed?1:0),c.uniform4f(_.u_front_color,1,1,1,n.frontOpacity||.65),c.uniform4f(_.u_back_color,1,1,1,n.backOpacity||.25),c.drawArrays(c.TRIANGLES,0,6);let E=R*.36,G={x:R*.5,y:k*.5},D=null,S=null,M=f||x>.001;if(l.svTriangle&&M){let m=te(h||d,a,E,G,o,r);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?D=m:S=m}let V=x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;if(D&&V<.01&&(D=null),D){let m=F=>[F.x/R*2-1,1-F.y/k*2],v=D,A=F=>({x:v.c.x+(F.x-v.c.x)*V,y:v.c.y+(F.y-v.c.y)*V}),P=m(v.c),U=m(A(v.w)),Z=m(A(v.k));c.useProgram(e.triProgram),c.enable(c.BLEND),c.blendFunc(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA),c.bindBuffer(c.ARRAY_BUFFER,e.triBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array([P[0],P[1],v.cRGB.x,v.cRGB.y,v.cRGB.z,U[0],U[1],1,1,1,Z[0],Z[1],0,0,0]),c.STATIC_DRAW),c.enableVertexAttribArray(e.triPosAttr),c.vertexAttribPointer(e.triPosAttr,2,c.FLOAT,!1,20,0),c.enableVertexAttribArray(e.triColorAttr),c.vertexAttribPointer(e.triColorAttr,3,c.FLOAT,!1,20,8),c.uniform1f(e.triAlphaLoc,1),c.drawArrays(c.TRIANGLES,0,3),c.disable(c.BLEND),c.useProgram(w),c.enableVertexAttribArray(e.posAttr),c.bindBuffer(c.ARRAY_BUFFER,e.posBuffer),c.vertexAttribPointer(e.posAttr,2,c.FLOAT,!1,0,0)}if(u.save(),u.clearRect(0,0,R,k),co(u,E,G,o,r,n),Xe(u,E,G,o,r,l),S){let m=S;u.save(),u.globalAlpha=x,u.beginPath(),u.moveTo(m.k.x,m.k.y),u.lineTo(m.w.x,m.w.y),u.strokeStyle="rgba(107, 114, 128, 0.7)",u.lineWidth=1.2,u.setLineDash([5,4]),u.stroke(),u.setLineDash([]),u.restore()}if(D){let m=D,v=I=>({x:m.c.x+(I.x-m.c.x)*V,y:m.c.y+(I.y-m.c.y)*V}),A=v(m.w),P=v(m.k),U=Math.round(m.cRGB.x*255),Z=Math.round(m.cRGB.y*255),F=Math.round(m.cRGB.z*255);if(u.save(),u.globalAlpha=x,u.beginPath(),u.moveTo(m.c.x,m.c.y),u.lineTo(A.x,A.y),u.lineTo(P.x,P.y),u.closePath(),u.strokeStyle=`rgba(${U}, ${Z}, ${F}, 0.7)`,u.lineWidth=1.2,u.setLineDash([]),u.stroke(),u.beginPath(),u.arc(A.x,A.y,3.5,0,Math.PI*2),u.fillStyle="#ffffff",u.fill(),u.strokeStyle="rgba(17, 24, 39, 0.6)",u.lineWidth=1.2,u.stroke(),u.beginPath(),u.arc(P.x,P.y,3.5,0,Math.PI*2),u.fillStyle="#111827",u.fill(),u.strokeStyle="rgba(255, 255, 255, 0.7)",u.lineWidth=1.2,u.stroke(),g){let I=g.a*m.c.x+g.b*A.x+g.g*P.x,K=g.a*m.c.y+g.b*A.y+g.g*P.y;u.beginPath(),u.arc(I,K,4,0,Math.PI*2),u.fillStyle="#ffffff",u.fill(),u.strokeStyle="rgba(17, 24, 39, 0.75)",u.lineWidth=1.4,u.stroke()}u.restore()}if(b&&!g){let m=W(d,E,G,o,r),v=N(d,a),A=s?{r:255-v.r,g:255-v.g,b:255-v.b}:v;u.beginPath(),u.arc(m.x,m.y,6,0,Math.PI*2),u.fillStyle=`rgb(${A.r}, ${A.g}, ${A.b})`,u.fill(),u.strokeStyle="#ffffff",u.lineWidth=2,u.stroke()}u.restore()}var z=Math.PI/180,pe=2*Math.PI,Ce=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},_e=e=>{let o=e%pe;return o>Math.PI?o-=pe:o<-Math.PI&&(o+=pe),o};function lo(e,o={}){let r=o.size||460,a=o.mode||"rgb",s=!1,l={...Oe},n={...Ie,radius:.08},d={...Fe},b={...Se},h={x:8*z,y:-20*z,z:-55*z},g=Q(h.x,h.y,h.z),f=q(),x={...h},c=()=>{l.mat=O(f,g)},u=o.initialColor||{r:255,g:255,b:255},R=$(u,a),k=!1,w=null,_=null,T=!1,C=0,E=0,G=null,D=t=>{if(E=t,G!==null)return;let i=performance.now(),y=6,L=B=>{let p=Math.min(.05,(B-i)/1e3);i=B,E>C?C=Math.min(E,C+p*y):C=Math.max(E,C-p*y),m(),Math.abs(C-E)<.001?(C=E,G=null):G=requestAnimationFrame(L)};G=requestAnimationFrame(L)},S=new Set,M=Ne(e,r),V=null,m=()=>{V===null&&(V=requestAnimationFrame(()=>{V=null,$e(M,l,n,a,s,d,b,R,!0,w,_,T,C)}))},v=()=>{let t=N(R,a),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,y=ie(i),L=se(i),B=be(i),p={rgb:i,hsb:y,oklch:L,hex:B,alpha:1};S.forEach(X=>X(p))},A=(t,i)=>{i!==0&&(t==="x"?(g=O(g,ee(i)),x.x+=i):t==="y"?(g=O(g,oe(i)),x.y+=i):(g=O(g,he(i)),x.z+=i),c(),m())},P=(t,i)=>{f=O(oe(t*.01),f),f=O(ee(-i*.01),f),c(),m()},U=t=>{f=O(t,ge(g)),c(),m()},Z=()=>{g=Q(h.x,h.y,h.z),f=q(),x={...h},l.zoom=1,c(),m()},F=!1,I=!1,K=0,ne=0,ve=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),Ke=()=>{let t=ve();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},je=t=>{let i=ve(),y=Ke(),L=Math.abs(t.x)-(i.x-y),B=Math.abs(t.y)-(i.y-y),p=Math.abs(t.z)-(i.z-y),X=Math.max(L,0),Y=Math.max(B,0),H=Math.max(p,0),j=Math.hypot(X,Y,H),J=Math.min(Math.max(L,Math.max(B,p)),0);return j+J-y},re=(t,i)=>{let y=M.canvasGL.getBoundingClientRect(),L=(t-y.left)*(M.width/y.width),B=(i-y.top)*(M.height/y.height),p=L-M.width*.5,X=M.height*.5-B,Y=M.width*.36*1.6*(l.zoom||1),H={x:p/Y,y:X/Y},j=ae=>xe(ge(l.mat),ae),J=0,Ee=null;for(let ae=0;ae<96;ae++){let qe={x:H.x,y:H.y,z:-5+J},Ge=j(qe),De=je(Ge);if(De<.001){Ee=Ge;break}if(J+=De,J>10)break}return Ee},Me=(t,i)=>{let y=re(t,i);if(!y)return;let L=Math.max(0,Math.min(1,y.x/n.sizeX+.5)),B=Math.max(0,Math.min(1,y.y/n.sizeY+.5)),p=Math.max(0,Math.min(1,y.z/n.sizeZ+.5));R={x:L,y:B,z:p},v(),m()},Ae=(t,i)=>{if(!d.svTriangle)return null;let y=M.canvasGL.getBoundingClientRect(),L=(t-y.left)*(M.width/y.width),B=(i-y.top)*(M.height/y.height),p=te(w||R,a,M.width*.36,{x:M.width*.5,y:M.height*.5},l,n),X=(p.w.y-p.k.y)*(p.c.x-p.k.x)+(p.k.x-p.w.x)*(p.c.y-p.k.y);if(Math.abs(X)<1e-6)return null;let Y=((p.w.y-p.k.y)*(L-p.k.x)+(p.k.x-p.w.x)*(B-p.k.y))/X,H=((p.k.y-p.c.y)*(L-p.k.x)+(p.c.x-p.k.x)*(B-p.k.y))/X,j=1-Y-H;return Y<-.02||H<-.02||j<-.02?null:{a:Y,b:H,g:j}},ze=t=>{let y=te(w||R,a,M.width*.36,{x:M.width*.5,y:M.height*.5},l,n),L=Math.max(0,Math.min(1,t.a*y.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*y.cRGB.y+t.b)),p=Math.max(0,Math.min(1,t.a*y.cRGB.z+t.b));R=$({r:L*255,g:B*255,b:p*255},a),v(),m()},Re=0,ke=0,Le=(t,i)=>{Re=t,ke=i,M.canvasGL.style.cursor=re(t,i)?"default":"grab"};M.canvasGL.addEventListener("mousemove",t=>{Le(t.clientX,t.clientY)}),M.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)F=!0,K=t.clientX,ne=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=T?Ae(t.clientX,t.clientY):null;i?(k=!0,w={...R},_=i,ze(i)):re(t.clientX,t.clientY)?(I=!0,w=null,_=null,Me(t.clientX,t.clientY)):(F=!0,K=t.clientX,ne=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),M.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(k){let i=Ae(t.clientX,t.clientY);i&&(_=i,ze(i))}else if(F){let i=t.clientX-K,y=t.clientY-ne;K=t.clientX,ne=t.clientY,P(i,y)}else I&&Me(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{k&&(k=!1),F&&(F=!1,document.body.style.cursor="default"),I&&(I=!1),Le(Re,ke)}),M.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;l.zoom=Math.max(.2,Math.min(2.5,(l.zoom||1)+i)),m()},{passive:!1}),M.canvasGL.addEventListener("dblclick",t=>{re(t.clientX,t.clientY)?(s=!s,v()):Z(),m()});let Be=t=>{if(t.key==="Shift"){T||(T=!0,w=null,_=null,D(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":Z();break;case"f":case"F":U(q());break;case"b":case"B":U(oe(Math.PI));break;case"t":case"T":U(ee(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),A("y",-5*z);break;case"ArrowRight":t.preventDefault(),A("y",5*z);break;case"ArrowUp":t.preventDefault(),A("x",5*z);break;case"ArrowDown":t.preventDefault(),A("x",-5*z);break}};window.addEventListener("keydown",Be);let Te=t=>{t.key==="Shift"&&T&&(T=!1,D(0))};window.addEventListener("keyup",Te);let we=()=>{T&&(T=!1,D(0))};return window.addEventListener("blur",we),m(),v(),{getColor:()=>{let t=N(R,a),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:ie(i),oklch:se(i),hex:be(i),alpha:1}},setColor:t=>{u=t,R=$(t,a),w=null,_=null,v(),m()},setMode:t=>{a=t,w=null,_=null,v(),m()},getMode:()=>a,setRotation:(t,i)=>{g=Q(i*z,0,t*z),f=q(),x.x=i*z,x.y=0,x.z=t*z,c(),m()},getAxisRotation:()=>({rotXDeg:Math.round(Ce(x.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ce(x.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ce(x.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,y)=>{A("x",_e(t*z-x.x)),A("y",_e(i*z-x.y)),A("z",_e(y*z-x.z))},rotateLocal:(t,i)=>{A(t,i*z)},resetRotation:(t,i,y)=>{g=Q(t*z,i*z,y*z),f=q(),x.x=t*z,x.y=i*z,x.z=y*z,c(),m()},setZoom:t=>{l.zoom=Math.max(.1,Math.min(3,t)),m()},getZoom:()=>l.zoom||1,setDimensions:(t,i,y)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,i)),n.sizeZ=Math.max(.2,Math.min(2.5,y)),m()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),m()},getRadius:()=>n.radius,getEdgeStyle:()=>({...b}),setEdgeStyle:t=>{b={...b,...t},m()},getGuides:()=>({...d}),setGuides:t=>{d={...d,...t},m()},toggleAllGuides:t=>{let i=t!==void 0?t:!d.vertexX;d={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i},m()},on:(t,i)=>{S.add(i)},off:(t,i)=>{S.delete(i)},destroy:()=>{V!==null&&cancelAnimationFrame(V),G!==null&&cancelAnimationFrame(G),window.removeEventListener("keydown",Be),window.removeEventListener("keyup",Te),window.removeEventListener("blur",we),e.innerHTML=""}}}return no(uo);})();
