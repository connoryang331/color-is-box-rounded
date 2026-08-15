var De={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Se={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ie(e){let t=e.r/255,n=e.g/255,i=e.b/255,l=Math.max(t,n,i),c=Math.min(t,n,i),r=l-c,d=0;r!==0&&(l===t?d=((n-i)/r+6)%6:l===n?d=(i-t)/r+2:d=(t-n)/r+4,d*=60);let b=l===0?0:r/l*100,h=l*100;return{h:d,s:b,b:h}}function qe(e){let t=e.h,n=e.s/100,i=e.b/100,l=i*n,c=l*(1-Math.abs(t/60%2-1)),r=i-l,d,b,h;return t<60?(d=l,b=c,h=0):t<120?(d=c,b=l,h=0):t<180?(d=0,b=l,h=c):t<240?(d=0,b=c,h=l):t<300?(d=c,b=0,h=l):(d=l,b=0,h=c),{r:Math.round((d+r)*255),g:Math.round((b+r)*255),b:Math.round((h+r)*255)}}function le(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ue(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Qe(e){let t=le(e.r/255),n=le(e.g/255),i=le(e.b/255),l=.4122214708*t+.5363325363*n+.0514459929*i,c=.2119034982*t+.6806995451*n+.1073969566*i,r=.0883024619*t+.2817188376*n+.6299787005*i,d=Math.cbrt(l),b=Math.cbrt(c),h=Math.cbrt(r);return{L:.2104542553*d+.793617785*b-.0040720468*h,a:1.9779984951*d-2.428592205*b+.4505937099*h,b:.0259040371*d+.7827717662*b-.808675766*h}}function Je(e,t,n){let i=e+.3963377774*t+.2158037573*n,l=e-.1055613458*t-.0638541728*n,c=e-.0894841775*t-1.291485548*n,r=i*i*i,d=l*l*l,b=c*c*c,h=4.0767416621*r-3.3077115913*d+.2309699292*b,g=-1.2684380046*r+2.6097574011*d-.3413193965*b,f=-.0041960863*r-.7034186147*d+1.707614701*b;return{r:Math.round(Math.max(0,Math.min(1,ue(h)))*255),g:Math.round(Math.max(0,Math.min(1,ue(g)))*255),b:Math.round(Math.max(0,Math.min(1,ue(f)))*255)}}function se(e){let t=Qe(e),n=Math.sqrt(t.a*t.a+t.b*t.b),i=Math.atan2(t.b,t.a)*(180/Math.PI);return i<0&&(i+=360),{l:t.L,c:n,h:n<1e-4?0:i}}function me(e){let t=e.h*(Math.PI/180),n=e.c*Math.cos(t),i=e.c*Math.sin(t);return Je(e.l,n,i)}function eo(e,t,n){let i=me({l:e,c:t,h:n});if(Fe(i))return{l:e,c:t,h:n};let l=0,c=t;for(let r=0;r<20;r++){let d=(l+c)/2;i=me({l:e,c:d,h:n}),Fe(i)?l=d:c=d}return{l:e,c:l,h:n}}function Fe(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function fe(e){let t=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${t(e.r)}${t(e.g)}${t(e.b)}`}var Ve=.4;function N(e,t){if(t==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(t==="hsb")return qe({h:e.x*359,s:e.y*100,b:e.z*100});{let n=e.x,i=e.y*Ve,l=e.z*359,c=eo(n,i,l);return me(c)}}function $(e,t){if(t==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(t==="hsb"){let n=ie(e);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=se(e);return{x:n.l,y:Math.min(n.c/Ve,1),z:n.h/359}}}var be=Math.PI/180;function q(){return[1,0,0,0,1,0,0,0,1]}function ee(e){let t=Math.cos(e),n=Math.sin(e);return[1,0,0,0,t,-n,0,n,t]}function oe(e){let t=Math.cos(e),n=Math.sin(e);return[t,0,n,0,1,0,-n,0,t]}function de(e){let t=Math.cos(e),n=Math.sin(e);return[t,n,0,-n,t,0,0,0,1]}function O(e,t){let n=new Array(9);for(let i=0;i<3;i++)for(let l=0;l<3;l++)n[i*3+l]=e[i*3]*t[l]+e[i*3+1]*t[3+l]+e[i*3+2]*t[6+l];return n}function he(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function ge(e,t){return{x:e[0]*t.x+e[1]*t.y+e[2]*t.z,y:e[3]*t.x+e[4]*t.y+e[5]*t.z,z:e[6]*t.x+e[7]*t.y+e[8]*t.z}}function Q(e,t,n){return O(oe(t),O(de(n),ee(e)))}var Pe={mat:Q(8*be,-20*be,-55*be),zoom:1},Oe={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ce(e,t,n){let i=(e.x-.5)*n.sizeX,l=(e.y-.5)*n.sizeY,c=(e.z-.5)*n.sizeZ;return ge(t.mat,{x:i,y:l,z:c})}function W(e,t,n,i,l){let c=ce(e,i,l);return{x:n.x+c.x*t*1.6*i.zoom,y:n.y-c.y*t*1.6*i.zoom}}function te(e,t,n,i,l,c){let r=N(e,t),d={x:r.r/255,y:r.g/255,z:r.b/255},b=$({r:255,g:255,b:255},t),h=$({r:0,g:0,b:0},t);return{c:W(e,n,i,l,c),w:W(b,n,i,l,c),k:W(h,n,i,l,c),cRGB:d}}var xe=["#ef4444","#22c55e","#3b82f6"];function Ie(e,t,n,i,l,c){let r=f=>W(f,t,n,i,l);e.save();let d=r({x:.5,y:.5,z:.5}),b=.35,h=[{from:{x:-b,y:.5,z:.5},to:{x:1+b,y:.5,z:.5},color:xe[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-b,z:.5},to:{x:.5,y:1+b,z:.5},color:xe[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-b},to:{x:.5,y:.5,z:1+b},color:xe[2],name:"Cz",visible:c.centerZ}],g=!1;for(let f=0;f<h.length;f++){if(!h[f].visible)continue;g=!0;let x=r(h[f].from),s=r(h[f].to);e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(s.x,s.y),e.strokeStyle=h[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(x.x,x.y,3,0,Math.PI*2),e.arc(s.x,s.y,3,0,Math.PI*2),e.fillStyle=h[f].color,e.fill()}g&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Xe=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Ue=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,Ye=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,He=`
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
`;function Ze(e,t){let n=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${t}px`,i.style.height=`${t}px`,i.style.userSelect="none";let l=document.createElement("canvas");l.width=t*n,l.height=t*n,l.style.width=`${t}px`,l.style.height=`${t}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let c=document.createElement("canvas");c.width=t*n,c.height=t*n,c.style.width=`${t}px`,c.style.height=`${t}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",i.appendChild(l),i.appendChild(c),e.appendChild(i);let r=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),d=c.getContext("2d");d.scale(n,n);let b=(G,D)=>{let S=r.createShader(G);return r.shaderSource(S,D),r.compileShader(S),r.getShaderParameter(S,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(S)),S},h=b(r.VERTEX_SHADER,Xe),g=b(r.FRAGMENT_SHADER,He),f=r.createProgram();r.attachShader(f,h),r.attachShader(f,g),r.linkProgram(f);let x=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,x),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let s=r.getAttribLocation(f,"position");r.enableVertexAttribArray(s),r.vertexAttribPointer(s,2,r.FLOAT,!1,0,0);let u=b(r.VERTEX_SHADER,Ue),R=b(r.FRAGMENT_SHADER,Ye),k=r.createProgram();r.attachShader(k,u),r.attachShader(k,R),r.linkProgram(k);let w=r.getAttribLocation(k,"a_pos"),_=r.getAttribLocation(k,"a_color"),T=r.getUniformLocation(k,"u_alpha"),C=r.createBuffer(),E={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_mat:r.getUniformLocation(f,"u_mat"),u_mat_inv:r.getUniformLocation(f,"u_mat_inv"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert"),u_show_front:r.getUniformLocation(f,"u_show_front"),u_show_back:r.getUniformLocation(f,"u_show_back"),u_front_width:r.getUniformLocation(f,"u_front_width"),u_back_width:r.getUniformLocation(f,"u_back_width"),u_front_dashed:r.getUniformLocation(f,"u_front_dashed"),u_back_dashed:r.getUniformLocation(f,"u_back_dashed"),u_front_color:r.getUniformLocation(f,"u_front_color"),u_back_color:r.getUniformLocation(f,"u_back_color")};return{gl:r,overlayCtx:d,canvasGL:l,canvasOverlay:c,width:t,height:t,program:f,uniforms:E,posBuffer:x,posAttr:s,triProgram:k,triPosAttr:w,triColorAttr:_,triAlphaLoc:T,triBuffer:C}}var We=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function oo(e,t,n,i,l,c){if(!c.showFront&&!c.showBack)return;let r=g=>W(g,t,n,i,l),b=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),h=g=>{let f=ce({x:.5,y:.5,z:.5},i,l);return ce({x:.5+g.x*.1,y:.5+g.y*.1,z:.5+g.z*.1},i,l).z-f.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let g of We)if(!(h(g.normalA)||h(g.normalB))){let[x,s]=g.edge;e.beginPath(),e.moveTo(b[x].x,b[x].y),e.lineTo(b[s].x,b[s].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let g of We)if(h(g.normalA)||h(g.normalB)){let[x,s]=g.edge;e.beginPath(),e.moveTo(b[x].x,b[x].y),e.lineTo(b[s].x,b[s].y),e.stroke()}}e.restore()}function Ne(e,t,n,i,l,c,r,d,b,h,g,f,x){let{gl:s,overlayCtx:u,width:R,height:k,program:w,uniforms:_}=e,T=window.devicePixelRatio||1;s.viewport(0,0,R*T,k*T),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.useProgram(w),s.uniform2f(_.u_resolution,R*T,k*T),s.uniform3f(_.u_box_size,n.sizeX,n.sizeY,n.sizeZ),s.uniform1f(_.u_radius,n.radius!==void 0?n.radius:.001);let C=t.mat;s.uniformMatrix3fv(_.u_mat,!1,new Float32Array([C[0],C[3],C[6],C[1],C[4],C[7],C[2],C[5],C[8]])),s.uniformMatrix3fv(_.u_mat_inv,!1,new Float32Array([C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]])),s.uniform1f(_.u_zoom,t.zoom||1),s.uniform1i(_.u_mode,i==="rgb"?0:i==="hsb"?1:2),s.uniform1i(_.u_invert,l?1:0),s.uniform1i(_.u_show_front,r.showFront?1:0),s.uniform1i(_.u_show_back,r.showBack?1:0),s.uniform1f(_.u_front_width,r.frontWidth||1.5),s.uniform1f(_.u_back_width,r.backWidth||1),s.uniform1i(_.u_front_dashed,r.frontDashed?1:0),s.uniform1i(_.u_back_dashed,r.backDashed?1:0),s.uniform4f(_.u_front_color,1,1,1,r.frontOpacity||.65),s.uniform4f(_.u_back_color,1,1,1,r.backOpacity||.25),s.drawArrays(s.TRIANGLES,0,6);let E=R*.36,G={x:R*.5,y:k*.5},D=null,S=null,M=f||x>.001;if(c.svTriangle&&M){let m=te(h||d,i,E,G,t,n);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?D=m:S=m}let V=x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;if(D&&V<.01&&(D=null),D){let m=F=>[F.x/R*2-1,1-F.y/k*2],v=D,A=F=>({x:v.c.x+(F.x-v.c.x)*V,y:v.c.y+(F.y-v.c.y)*V}),P=m(v.c),U=m(A(v.w)),Z=m(A(v.k));s.useProgram(e.triProgram),s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),s.bindBuffer(s.ARRAY_BUFFER,e.triBuffer),s.bufferData(s.ARRAY_BUFFER,new Float32Array([P[0],P[1],v.cRGB.x,v.cRGB.y,v.cRGB.z,U[0],U[1],1,1,1,Z[0],Z[1],0,0,0]),s.STATIC_DRAW),s.enableVertexAttribArray(e.triPosAttr),s.vertexAttribPointer(e.triPosAttr,2,s.FLOAT,!1,20,0),s.enableVertexAttribArray(e.triColorAttr),s.vertexAttribPointer(e.triColorAttr,3,s.FLOAT,!1,20,8),s.uniform1f(e.triAlphaLoc,1),s.drawArrays(s.TRIANGLES,0,3),s.disable(s.BLEND),s.useProgram(w),s.enableVertexAttribArray(e.posAttr),s.bindBuffer(s.ARRAY_BUFFER,e.posBuffer),s.vertexAttribPointer(e.posAttr,2,s.FLOAT,!1,0,0)}if(u.save(),u.clearRect(0,0,R,k),oo(u,E,G,t,n,r),Ie(u,E,G,t,n,c),S){let m=S;u.save(),u.globalAlpha=x,u.beginPath(),u.moveTo(m.k.x,m.k.y),u.lineTo(m.w.x,m.w.y),u.strokeStyle="rgba(107, 114, 128, 0.7)",u.lineWidth=1.2,u.setLineDash([5,4]),u.stroke(),u.setLineDash([]),u.restore()}if(D){let m=D,v=I=>({x:m.c.x+(I.x-m.c.x)*V,y:m.c.y+(I.y-m.c.y)*V}),A=v(m.w),P=v(m.k),U=Math.round(m.cRGB.x*255),Z=Math.round(m.cRGB.y*255),F=Math.round(m.cRGB.z*255);if(u.save(),u.globalAlpha=x,u.beginPath(),u.moveTo(m.c.x,m.c.y),u.lineTo(A.x,A.y),u.lineTo(P.x,P.y),u.closePath(),u.strokeStyle=`rgba(${U}, ${Z}, ${F}, 0.7)`,u.lineWidth=1.2,u.setLineDash([]),u.stroke(),u.beginPath(),u.arc(A.x,A.y,3.5,0,Math.PI*2),u.fillStyle="#ffffff",u.fill(),u.strokeStyle="rgba(17, 24, 39, 0.6)",u.lineWidth=1.2,u.stroke(),u.beginPath(),u.arc(P.x,P.y,3.5,0,Math.PI*2),u.fillStyle="#111827",u.fill(),u.strokeStyle="rgba(255, 255, 255, 0.7)",u.lineWidth=1.2,u.stroke(),g){let I=g.a*m.c.x+g.b*A.x+g.g*P.x,K=g.a*m.c.y+g.b*A.y+g.g*P.y;u.beginPath(),u.arc(I,K,4,0,Math.PI*2),u.fillStyle="#ffffff",u.fill(),u.strokeStyle="rgba(17, 24, 39, 0.75)",u.lineWidth=1.4,u.stroke()}u.restore()}if(b&&!g){let m=W(d,E,G,t,n),v=N(d,i),A=l?{r:255-v.r,g:255-v.g,b:255-v.b}:v;u.beginPath(),u.arc(m.x,m.y,6,0,Math.PI*2),u.fillStyle=`rgb(${A.r}, ${A.g}, ${A.b})`,u.fill(),u.strokeStyle="#ffffff",u.lineWidth=2,u.stroke()}u.restore()}var z=Math.PI/180,ye=2*Math.PI,pe=e=>{let t=e%360;return t>180?t-=360:t<-180&&(t+=360),t},Ce=e=>{let t=e%ye;return t>Math.PI?t-=ye:t<-Math.PI&&(t+=ye),t};function Eo(e,t={}){let n=t.size||460,i=t.mode||"rgb",l=!1,c={...Pe},r={...Oe,radius:.08},d={...Se},b={...De},h={x:8*z,y:-20*z,z:-55*z},g=Q(h.x,h.y,h.z),f=q(),x={...h},s=()=>{c.mat=O(f,g)},u=t.initialColor||{r:255,g:255,b:255},R=$(u,i),k=!1,w=null,_=null,T=!1,C=0,E=0,G=null,D=o=>{if(E=o,G!==null)return;let a=performance.now(),y=6,L=B=>{let p=Math.min(.05,(B-a)/1e3);a=B,E>C?C=Math.min(E,C+p*y):C=Math.max(E,C-p*y),m(),Math.abs(C-E)<.001?(C=E,G=null):G=requestAnimationFrame(L)};G=requestAnimationFrame(L)},S=new Set,M=Ze(e,n),V=null,m=()=>{V===null&&(V=requestAnimationFrame(()=>{V=null,Ne(M,c,r,i,l,d,b,R,!0,w,_,T,C)}))},v=()=>{let o=N(R,i),a=l?{r:255-o.r,g:255-o.g,b:255-o.b}:o,y=ie(a),L=se(a),B=fe(a),p={rgb:a,hsb:y,oklch:L,hex:B,alpha:1};S.forEach(X=>X(p))},A=(o,a)=>{a!==0&&(o==="x"?(g=O(g,ee(a)),x.x+=a):o==="y"?(g=O(g,oe(a)),x.y+=a):(g=O(g,de(a)),x.z+=a),s(),m())},P=(o,a)=>{f=O(oe(o*.01),f),f=O(ee(-a*.01),f),s(),m()},U=o=>{f=O(o,he(g)),s(),m()},Z=()=>{g=Q(h.x,h.y,h.z),f=q(),x={...h},c.zoom=1,s(),m()},F=!1,I=!1,K=0,re=0,_e=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),$e=()=>{let o=_e();return Math.min(r.radius||.001,Math.min(o.x,o.y,o.z)*.49)},Ke=o=>{let a=_e(),y=$e(),L=Math.abs(o.x)-(a.x-y),B=Math.abs(o.y)-(a.y-y),p=Math.abs(o.z)-(a.z-y),X=Math.max(L,0),Y=Math.max(B,0),H=Math.max(p,0),j=Math.hypot(X,Y,H),J=Math.min(Math.max(L,Math.max(B,p)),0);return j+J-y},ne=(o,a)=>{let y=M.canvasGL.getBoundingClientRect(),L=(o-y.left)*(M.width/y.width),B=(a-y.top)*(M.height/y.height),p=L-M.width*.5,X=M.height*.5-B,Y=M.width*.36*1.6*(c.zoom||1),H={x:p/Y,y:X/Y},j=ae=>ge(he(c.mat),ae),J=0,we=null;for(let ae=0;ae<96;ae++){let je={x:H.x,y:H.y,z:-5+J},Ee=j(je),Ge=Ke(Ee);if(Ge<.001){we=Ee;break}if(J+=Ge,J>10)break}return we},ve=(o,a)=>{let y=ne(o,a);if(!y)return;let L=Math.max(0,Math.min(1,y.x/r.sizeX+.5)),B=Math.max(0,Math.min(1,y.y/r.sizeY+.5)),p=Math.max(0,Math.min(1,y.z/r.sizeZ+.5));R={x:L,y:B,z:p},v(),m()},Me=(o,a)=>{if(!d.svTriangle)return null;let y=M.canvasGL.getBoundingClientRect(),L=(o-y.left)*(M.width/y.width),B=(a-y.top)*(M.height/y.height),p=te(w||R,i,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),X=(p.w.y-p.k.y)*(p.c.x-p.k.x)+(p.k.x-p.w.x)*(p.c.y-p.k.y);if(Math.abs(X)<1e-6)return null;let Y=((p.w.y-p.k.y)*(L-p.k.x)+(p.k.x-p.w.x)*(B-p.k.y))/X,H=((p.k.y-p.c.y)*(L-p.k.x)+(p.c.x-p.k.x)*(B-p.k.y))/X,j=1-Y-H;return Y<-.02||H<-.02||j<-.02?null:{a:Y,b:H,g:j}},Ae=o=>{let y=te(w||R,i,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),L=Math.max(0,Math.min(1,o.a*y.cRGB.x+o.b)),B=Math.max(0,Math.min(1,o.a*y.cRGB.y+o.b)),p=Math.max(0,Math.min(1,o.a*y.cRGB.z+o.b));R=$({r:L*255,g:B*255,b:p*255},i),v(),m()},ze=0,Re=0,ke=(o,a)=>{ze=o,Re=a,M.canvasGL.style.cursor=ne(o,a)?"default":"grab"};M.canvasGL.addEventListener("mousemove",o=>{ke(o.clientX,o.clientY)}),M.canvasGL.addEventListener("mousedown",o=>{if(o.button===1||o.button===0&&o.altKey)F=!0,K=o.clientX,re=o.clientY,document.body.style.cursor="grabbing",o.preventDefault();else if(o.button===0){let a=T?Me(o.clientX,o.clientY):null;a?(k=!0,w={...R},_=a,Ae(a)):ne(o.clientX,o.clientY)?(I=!0,w=null,_=null,ve(o.clientX,o.clientY)):(F=!0,K=o.clientX,re=o.clientY,document.body.style.cursor="grabbing",o.preventDefault())}}),M.canvasGL.addEventListener("auxclick",o=>{o.button===1&&o.preventDefault()}),window.addEventListener("mousemove",o=>{if(k){let a=Me(o.clientX,o.clientY);a&&(_=a,Ae(a))}else if(F){let a=o.clientX-K,y=o.clientY-re;K=o.clientX,re=o.clientY,P(a,y)}else I&&ve(o.clientX,o.clientY)}),window.addEventListener("mouseup",()=>{k&&(k=!1),F&&(F=!1,document.body.style.cursor="default"),I&&(I=!1),ke(ze,Re)}),M.canvasGL.addEventListener("wheel",o=>{o.preventDefault();let a=o.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+a)),m()},{passive:!1}),M.canvasGL.addEventListener("dblclick",o=>{ne(o.clientX,o.clientY)?(l=!l,v()):Z(),m()});let Le=o=>{if(o.key==="Control"||o.key==="Meta"){T||(T=!0,w=null,_=null,D(1));return}let a=o.target?.tagName;if(!(a==="INPUT"||a==="TEXTAREA"))switch(o.key){case"r":case"R":Z();break;case"f":case"F":U(q());break;case"b":case"B":U(oe(Math.PI));break;case"t":case"T":U(ee(Math.PI/2));break;case"ArrowLeft":o.preventDefault(),A("y",-5*z);break;case"ArrowRight":o.preventDefault(),A("y",5*z);break;case"ArrowUp":o.preventDefault(),A("x",5*z);break;case"ArrowDown":o.preventDefault(),A("x",-5*z);break}};window.addEventListener("keydown",Le);let Be=o=>{(o.key==="Control"||o.key==="Meta")&&T&&(T=!1,D(0))};window.addEventListener("keyup",Be);let Te=()=>{T&&(T=!1,D(0))};return window.addEventListener("blur",Te),m(),v(),{getColor:()=>{let o=N(R,i),a=l?{r:255-o.r,g:255-o.g,b:255-o.b}:o;return{rgb:a,hsb:ie(a),oklch:se(a),hex:fe(a),alpha:1}},setColor:o=>{u=o,R=$(o,i),w=null,_=null,v(),m()},setMode:o=>{i=o,w=null,_=null,v(),m()},getMode:()=>i,setRotation:(o,a)=>{g=Q(a*z,0,o*z),f=q(),x.x=a*z,x.y=0,x.z=o*z,s(),m()},getAxisRotation:()=>({rotXDeg:Math.round(pe(x.x*180/Math.PI)*10)/10,rotYDeg:Math.round(pe(x.y*180/Math.PI)*10)/10,rotZDeg:Math.round(pe(x.z*180/Math.PI)*10)/10}),setAxisRotation:(o,a,y)=>{A("x",Ce(o*z-x.x)),A("y",Ce(a*z-x.y)),A("z",Ce(y*z-x.z))},rotateLocal:(o,a)=>{A(o,a*z)},resetRotation:(o,a,y)=>{g=Q(o*z,a*z,y*z),f=q(),x.x=o*z,x.y=a*z,x.z=y*z,s(),m()},setZoom:o=>{c.zoom=Math.max(.1,Math.min(3,o)),m()},getZoom:()=>c.zoom||1,setDimensions:(o,a,y)=>{r.sizeX=Math.max(.2,Math.min(2.5,o)),r.sizeY=Math.max(.2,Math.min(2.5,a)),r.sizeZ=Math.max(.2,Math.min(2.5,y)),m()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:o=>{r.radius=Math.max(0,Math.min(.5,o)),m()},getRadius:()=>r.radius,getEdgeStyle:()=>({...b}),setEdgeStyle:o=>{b={...b,...o},m()},getGuides:()=>({...d}),setGuides:o=>{d={...d,...o},m()},toggleAllGuides:o=>{let a=o!==void 0?o:!d.vertexX;d={vertexX:a,vertexY:a,vertexZ:a,centerX:a,centerY:a,centerZ:a,angleGuides:a},m()},on:(o,a)=>{S.add(a)},off:(o,a)=>{S.delete(a)},destroy:()=>{V!==null&&cancelAnimationFrame(V),G!==null&&cancelAnimationFrame(G),window.removeEventListener("keydown",Le),window.removeEventListener("keyup",Be),window.removeEventListener("blur",Te),e.innerHTML=""}}}export{Eo as createRoundedBoxPicker};
