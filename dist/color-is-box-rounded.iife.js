var ColorIsBoxRounded=(()=>{var Re=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var pt=Object.getOwnPropertyNames;var Ct=Object.prototype.hasOwnProperty;var _t=(e,o)=>{for(var a in o)Re(e,a,{get:o[a],enumerable:!0})},Mt=(e,o,a,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let l of pt(o))!Ct.call(e,l)&&l!==a&&Re(e,l,{get:()=>o[l],enumerable:!(s=yt(o,l))||s.enumerable});return e};var vt=e=>Mt(Re({},"__esModule",{value:!0}),e);var Tt={};_t(Tt,{createRoundedBoxPicker:()=>Bt});var Qe={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Je={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ue(e){let o=e.r/255,a=e.g/255,s=e.b/255,l=Math.max(o,a,s),c=Math.min(o,a,s),r=l-c,d=0;r!==0&&(l===o?d=((a-s)/r+6)%6:l===a?d=(s-o)/r+2:d=(o-a)/r+4,d*=60);let g=l===0?0:r/l*100,x=l*100;return{h:d,s:g,b:x}}function Le(e){let o=e.h,a=e.s/100,s=e.b/100,l=s*a,c=l*(1-Math.abs(o/60%2-1)),r=s-l,d,g,x;return o<60?(d=l,g=c,x=0):o<120?(d=c,g=l,x=0):o<180?(d=0,g=l,x=c):o<240?(d=0,g=c,x=l):o<300?(d=c,g=0,x=l):(d=l,g=0,x=c),{r:Math.round((d+r)*255),g:Math.round((g+r)*255),b:Math.round((x+r)*255)}}function ze(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ae(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Rt(e){let o=ze(e.r/255),a=ze(e.g/255),s=ze(e.b/255),l=.4122214708*o+.5363325363*a+.0514459929*s,c=.2119034982*o+.6806995451*a+.1073969566*s,r=.0883024619*o+.2817188376*a+.6299787005*s,d=Math.cbrt(l),g=Math.cbrt(c),x=Math.cbrt(r);return{L:.2104542553*d+.793617785*g-.0040720468*x,a:1.9779984951*d-2.428592205*g+.4505937099*x,b:.0259040371*d+.7827717662*g-.808675766*x}}function zt(e,o,a){let s=e+.3963377774*o+.2158037573*a,l=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=s*s*s,d=l*l*l,g=c*c*c,x=4.0767416621*r-3.3077115913*d+.2309699292*g,y=-1.2684380046*r+2.6097574011*d-.3413193965*g,b=-.0041960863*r-.7034186147*d+1.707614701*g;return{r:Math.round(Math.max(0,Math.min(1,Ae(x)))*255),g:Math.round(Math.max(0,Math.min(1,Ae(y)))*255),b:Math.round(Math.max(0,Math.min(1,Ae(b)))*255)}}function Me(e){let o=Rt(e),a=Math.sqrt(o.a*o.a+o.b*o.b),s=Math.atan2(o.b,o.a)*(180/Math.PI);return s<0&&(s+=360),{l:o.L,c:a,h:a<1e-4?0:s}}function ke(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),s=e.c*Math.sin(o);return zt(e.l,a,s)}function At(e,o,a){let s=ke({l:e,c:o,h:a});if(et(s))return{l:e,c:o,h:a};let l=0,c=o;for(let r=0;r<20;r++){let d=(l+c)/2;s=ke({l:e,c:d,h:a}),et(s)?l=d:c=d}return{l:e,c:l,h:a}}function et(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Be(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var tt=.4;function ne(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return Le({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,s=e.y*tt,l=e.z*359,c=At(a,s,l);return ke(c)}}function se(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=ue(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=Me(e);return{x:a.l,y:Math.min(a.c/tt,1),z:a.h/359}}}var Te=Math.PI/180;function fe(){return[1,0,0,0,1,0,0,0,1]}function de(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function ge(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function Ee(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function ee(e,o){let a=new Array(9);for(let s=0;s<3;s++)for(let l=0;l<3;l++)a[s*3+l]=e[s*3]*o[l]+e[s*3+1]*o[3+l]+e[s*3+2]*o[6+l];return a}function Ge(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function we(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function be(e,o,a){return ee(ge(o),ee(Ee(a),de(e)))}var ot={mat:be(8*Te,-20*Te,-55*Te),zoom:1},nt={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ve(e,o,a){let s=(e.x-.5)*a.sizeX,l=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return we(o.mat,{x:s,y:l,z:c})}function J(e,o,a,s,l){let c=ve(e,s,l);return{x:a.x+c.x*o*1.6*s.zoom,y:a.y-c.y*o*1.6*s.zoom}}function xe(e,o,a,s,l,c){let r=ne(e,o),d={x:r.r/255,y:r.g/255,z:r.b/255},g=se({r:255,g:255,b:255},o),x=se({r:0,g:0,b:0},o);return{c:J(e,a,s,l,c),w:J(g,a,s,l,c),k:J(x,a,s,l,c),cRGB:d}}var Se=["#ef4444","#22c55e","#3b82f6"];function rt(e,o,a,s,l,c){let r=b=>J(b,o,a,s,l);e.save();let d=r({x:.5,y:.5,z:.5}),g=.35,x=[{from:{x:-g,y:.5,z:.5},to:{x:1+g,y:.5,z:.5},color:Se[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-g,z:.5},to:{x:.5,y:1+g,z:.5},color:Se[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-g},to:{x:.5,y:.5,z:1+g},color:Se[2],name:"Cz",visible:c.centerZ}],y=!1;for(let b=0;b<x.length;b++){if(!x[b].visible)continue;y=!0;let C=r(x[b].from),_=r(x[b].to);e.beginPath(),e.moveTo(C.x,C.y),e.lineTo(_.x,_.y),e.strokeStyle=x[b].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(C.x,C.y,3,0,Math.PI*2),e.arc(_.x,_.y,3,0,Math.PI*2),e.fillStyle=x[b].color,e.fill()}y&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var at=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,it=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,st=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,lt=`
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
`;var De=30,Pe=12,Fe=56,Ve=16;function ut(e,o){let a=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.userSelect="none";let l=document.createElement("canvas");l.width=o*a,l.height=o*a,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",s.appendChild(l),s.appendChild(c),e.appendChild(s);let r=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),d=c.getContext("2d");d.scale(a,a);let g=(L,V)=>{let R=r.createShader(L);return r.shaderSource(R,V),r.compileShader(R),r.getShaderParameter(R,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(R)),R},x=g(r.VERTEX_SHADER,at),y=g(r.FRAGMENT_SHADER,lt),b=r.createProgram();r.attachShader(b,x),r.attachShader(b,y),r.linkProgram(b);let C=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,C),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let _=r.getAttribLocation(b,"position");r.enableVertexAttribArray(_),r.vertexAttribPointer(_,2,r.FLOAT,!1,0,0);let $=g(r.VERTEX_SHADER,it),w=g(r.FRAGMENT_SHADER,st),A=r.createProgram();r.attachShader(A,$),r.attachShader(A,w),r.linkProgram(A);let u=r.getAttribLocation(A,"a_pos"),n=r.getAttribLocation(A,"a_color"),S=r.getUniformLocation(A,"u_alpha"),D=r.createBuffer(),F={u_resolution:r.getUniformLocation(b,"u_resolution"),u_box_size:r.getUniformLocation(b,"u_box_size"),u_radius:r.getUniformLocation(b,"u_radius"),u_mat:r.getUniformLocation(b,"u_mat"),u_mat_inv:r.getUniformLocation(b,"u_mat_inv"),u_zoom:r.getUniformLocation(b,"u_zoom"),u_mode:r.getUniformLocation(b,"u_mode"),u_invert:r.getUniformLocation(b,"u_invert"),u_show_front:r.getUniformLocation(b,"u_show_front"),u_show_back:r.getUniformLocation(b,"u_show_back"),u_front_width:r.getUniformLocation(b,"u_front_width"),u_back_width:r.getUniformLocation(b,"u_back_width"),u_front_dashed:r.getUniformLocation(b,"u_front_dashed"),u_back_dashed:r.getUniformLocation(b,"u_back_dashed"),u_front_color:r.getUniformLocation(b,"u_front_color"),u_back_color:r.getUniformLocation(b,"u_back_color")};return{gl:r,overlayCtx:d,canvasGL:l,canvasOverlay:c,width:o,height:o,program:b,uniforms:F,posBuffer:C,posAttr:_,triProgram:A,triPosAttr:u,triColorAttr:n,triAlphaLoc:S,triBuffer:D}}var ct=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function kt(e,o,a,s,l,c){if(!c.showFront&&!c.showBack)return;let r=y=>J(y,o,a,s,l),g=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=y=>{let b=ve({x:.5,y:.5,z:.5},s,l);return ve({x:.5+y.x*.1,y:.5+y.y*.1,z:.5+y.z*.1},s,l).z-b.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let y of ct)if(!(x(y.normalA)||x(y.normalB))){let[C,_]=y.edge;e.beginPath(),e.moveTo(g[C].x,g[C].y),e.lineTo(g[_].x,g[_].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let y of ct)if(x(y.normalA)||x(y.normalB)){let[C,_]=y.edge;e.beginPath(),e.moveTo(g[C].x,g[C].y),e.lineTo(g[_].x,g[_].y),e.stroke()}}e.restore()}function mt(e,o,a,s,l,c,r,d,g,x,y,b,C,_,$,w,A){let{gl:u,overlayCtx:n,width:S,height:D,program:F,uniforms:L}=e,V=window.devicePixelRatio||1;u.viewport(0,0,S*V,D*V),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(F),u.uniform2f(L.u_resolution,S*V,D*V),u.uniform3f(L.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(L.u_radius,a.radius!==void 0?a.radius:.001);let R=o.mat;u.uniformMatrix3fv(L.u_mat,!1,new Float32Array([R[0],R[3],R[6],R[1],R[4],R[7],R[2],R[5],R[8]])),u.uniformMatrix3fv(L.u_mat_inv,!1,new Float32Array([R[0],R[1],R[2],R[3],R[4],R[5],R[6],R[7],R[8]])),u.uniform1f(L.u_zoom,o.zoom||1),u.uniform1i(L.u_mode,s==="rgb"?0:s==="hsb"?1:2),u.uniform1i(L.u_invert,l?1:0),u.uniform1i(L.u_show_front,r.showFront?1:0),u.uniform1i(L.u_show_back,r.showBack?1:0),u.uniform1f(L.u_front_width,r.frontWidth||1.5),u.uniform1f(L.u_back_width,r.backWidth||1),u.uniform1i(L.u_front_dashed,r.frontDashed?1:0),u.uniform1i(L.u_back_dashed,r.backDashed?1:0),u.uniform4f(L.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(L.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let te=S*.36,O={x:S*.5,y:D*.5},X=null,I=null,re=b||C>.001;if(c.svTriangle&&re){let h=xe(x||d,s,te,O,o,a);Math.abs((h.w.x-h.c.x)*(h.k.y-h.c.y)-(h.w.y-h.c.y)*(h.k.x-h.c.x))>4?X=h:I=h}let U=C<.5?2*C*C:1-Math.pow(-2*C+2,2)/2;if(X&&U<.01&&(X=null),X){let h=T=>[T.x/S*2-1,1-T.y/D*2],z=X,f=T=>({x:z.c.x+(T.x-z.c.x)*U,y:z.c.y+(T.y-z.c.y)*U}),k=h(z.c),p=h(f(z.w)),B=h(f(z.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([k[0],k[1],z.cRGB.x,z.cRGB.y,z.cRGB.z,p[0],p[1],1,1,1,B[0],B[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(F),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,S,D),kt(n,te,O,o,a,r),rt(n,te,O,o,a,c),I){let h=I;n.save(),n.globalAlpha=C,n.beginPath(),n.moveTo(h.k.x,h.k.y),n.lineTo(h.w.x,h.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if(X){let h=X,z=ae=>({x:h.c.x+(ae.x-h.c.x)*U,y:h.c.y+(ae.y-h.c.y)*U}),f=z(h.w),k=z(h.k),p=Math.round(h.cRGB.x*255),B=Math.round(h.cRGB.y*255),T=Math.round(h.cRGB.z*255);if(n.save(),n.globalAlpha=C,n.beginPath(),n.moveTo(h.c.x,h.c.y),n.lineTo(f.x,f.y),n.lineTo(k.x,k.y),n.closePath(),n.strokeStyle=`rgba(${p}, ${B}, ${T}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(f.x,f.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(k.x,k.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),y){let ae=y.a*h.c.x+y.b*f.x+y.g*k.x,Z=y.a*h.c.y+y.b*f.y+y.g*k.y;n.beginPath(),n.arc(ae,Z,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}if(g&&!y){let h=J(d,te,O,o,a),z=ne(d,s),f=l?{r:255-z.r,g:255-z.g,b:255-z.b}:z;if(A<1){n.save(),n.beginPath(),n.arc(h.x,h.y,6,0,Math.PI*2),n.clip();let k=4;for(let p=-8;p<8;p+=k)for(let B=-8;B<8;B+=k)n.fillStyle=(B+p)/k%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(h.x+B,h.y+p,k,k);n.restore()}n.beginPath(),n.arc(h.x,h.y,6,0,Math.PI*2),n.fillStyle=A<1?`rgba(${f.r}, ${f.g}, ${f.b}, ${A})`:`rgb(${f.r}, ${f.g}, ${f.b})`,n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke()}if(_&&$>.01){let h=$<.5?2*$*$:1-Math.pow(-2*$+2,2)/2,z=De*h,f=Fe*h,k=Pe*h,p=Ve*h,B=ne(d,s),T=l?{r:255-B.r,g:255-B.g,b:255-B.b}:B,ae=ue(T),Z=-Math.PI/2;n.save(),n.globalAlpha=Math.min(1,h+.15);let pe=(W,q)=>{n.save(),n.beginPath(),n.arc(_.x,_.y,W+q/2,0,Math.PI*2),n.arc(_.x,_.y,Math.max(.5,W-q/2),0,Math.PI*2,!0),n.closePath(),n.clip();let P=6,Y=W+q/2;for(let j=-Y;j<Y;j+=P)for(let K=-Y;K<Y;K+=P)n.fillStyle=(K+j)/P%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(_.x+K,_.y+j,P,P);n.restore()},ie=(W,q,P)=>{n.lineWidth=P?1.8:1,n.strokeStyle=P?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let Y of[W-q/2,W+q/2])Y<=0||(n.beginPath(),n.arc(_.x,_.y,Y,0,Math.PI*2),n.stroke())},le=(W,q,P,Y)=>{let j=_.x,K=_.y-(q+P/2)-2;n.font="700 12px ui-monospace, SF Mono, monospace",n.textAlign="center",n.textBaseline="alphabetic",n.lineWidth=3,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.strokeText(W,j,K),n.fillStyle=Y?"#ffffff":"rgba(248, 250, 252, 0.95)",n.fillText(W,j,K)},ce=ae.s/100;n.beginPath(),n.arc(_.x,_.y,f,0,Math.PI*2),n.lineWidth=p,n.strokeStyle="rgba(100, 116, 139, 0.5)",n.stroke();let me=Z+ce*Math.PI*2;ce>.001&&(n.beginPath(),n.arc(_.x,_.y,f,Z,me),n.lineWidth=p,n.strokeStyle=`rgb(${T.r}, ${T.g}, ${T.b})`,n.stroke()),ie(f,p,w==="sat"),le("SAT",f,p,w==="sat"),pe(z,k);let Ce=Z+A*Math.PI*2;A>.001&&(n.beginPath(),n.arc(_.x,_.y,z,Z,Ce),n.lineWidth=k,n.strokeStyle=`rgba(${T.r}, ${T.g}, ${T.b}, ${A})`,n.stroke()),ie(z,k,w==="alpha"),le("A",z,k,w==="alpha"),n.restore()}n.restore()}var G=Math.PI/180,ye=2*Math.PI,Ie=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},Oe=e=>{let o=e%ye;return o>Math.PI?o-=ye:o<-Math.PI&&(o+=ye),o},Lt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,ft=(e,o)=>{let a=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function Bt(e,o={}){let a=o.size||460,s=o.mode||"rgb",l=!1,c={...ot},r={...nt,radius:.08},d={...Je},g={...Qe},x={x:8*G,y:-20*G,z:-55*G},y=be(x.x,x.y,x.z),b=fe(),C={...x},_=()=>{c.mat=ee(b,y)},$=o.initialColor||{r:255,g:255,b:255},w=se($,s),A=1,u=!1,n=null,S=null,D=!1,F=0,L=0,V=null,R=t=>{if(L=t,V!==null)return;let i=performance.now(),m=6,v=E=>{let M=Math.min(.05,(E-i)/1e3);i=E,L>F?F=Math.min(L,F+M*m):F=Math.max(L,F-M*m),p(),Math.abs(F-L)<.001?(F=L,V=null):V=requestAnimationFrame(v)};V=requestAnimationFrame(v)},te=!1,O=null,X=null,I=0,re=0,U=null,h=t=>{if(re=t,U!==null)return;let i=performance.now(),m=6,v=E=>{let M=Math.min(.05,(E-i)/1e3);i=E,re>I?I=Math.min(re,I+M*m):I=Math.max(re,I-M*m),p(),Math.abs(I-re)<.001?(I=re,U=null):U=requestAnimationFrame(v)};U=requestAnimationFrame(v)},z=new Set,f=ut(e,a),k=null,p=()=>{k===null&&(k=requestAnimationFrame(()=>{k=null,mt(f,c,r,s,l,d,g,w,!0,n,S,D,F,O,I,X,A)}))},B=()=>{let t=ne(w,s),i=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t,m=ue(i),v=Me(i),E=A<1?ft(i,A):Be(i),M={rgb:i,hsb:m,oklch:v,hex:E,alpha:A};z.forEach(N=>N(M))},T=(t,i)=>{i!==0&&(t==="x"?(y=ee(y,de(i)),C.x+=i):t==="y"?(y=ee(y,ge(i)),C.y+=i):(y=ee(y,Ee(i)),C.z+=i),_(),p())},ae=(t,i)=>{b=ee(ge(t*.01),b),b=ee(de(-i*.01),b),_(),p()},Z=t=>{b=ee(t,Ge(y)),_(),p()},pe=()=>{y=be(x.x,x.y,x.z),b=fe(),C={...x},c.zoom=1,_(),p()},ie=!1,le=!1,ce=0,me=0,Ce=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),W=()=>{let t=Ce();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},q=t=>{let i=Ce(),m=W(),v=Math.abs(t.x)-(i.x-m),E=Math.abs(t.y)-(i.y-m),M=Math.abs(t.z)-(i.z-m),N=Math.max(v,0),Q=Math.max(E,0),H=Math.max(M,0),oe=Math.hypot(N,Q,H),he=Math.min(Math.max(v,Math.max(E,M)),0);return oe+he-m},P=(t,i)=>{let m=f.canvasGL.getBoundingClientRect(),v=(t-m.left)*(f.width/m.width),E=(i-m.top)*(f.height/m.height),M=v-f.width*.5,N=f.height*.5-E,Q=f.width*.36*1.6*(c.zoom||1),H={x:M/Q,y:N/Q},oe=_e=>we(Ge(c.mat),_e),he=0,qe=null;for(let _e=0;_e<96;_e++){let xt={x:H.x,y:H.y,z:-5+he},je=oe(xt),Ke=q(je);if(Ke<.001){qe=je;break}if(he+=Ke,he>10)break}return qe},Y=(t,i)=>{let m=P(t,i);if(!m)return;let v=Math.max(0,Math.min(1,m.x/r.sizeX+.5)),E=Math.max(0,Math.min(1,m.y/r.sizeY+.5)),M=Math.max(0,Math.min(1,m.z/r.sizeZ+.5));w={x:v,y:E,z:M},B(),p()},j=(t,i)=>{let m=f.canvasGL.getBoundingClientRect();return{x:(t-m.left)*(f.width/m.width),y:(i-m.top)*(f.height/m.height)}},K=()=>J(w,f.width*.36,{x:f.width*.5,y:f.height*.5},c,r),bt=(t,i)=>{let m=j(t,i),v=K();return Math.hypot(m.x-v.x,m.y-v.y)<=14},ht=t=>{A=Math.max(0,Math.min(1,t)),B(),p()},dt=t=>{let i=ne(w,s),m=ue(i);m.s=Math.max(0,Math.min(100,t*100)),w=se(Le(m),s),B(),p()},gt=t=>{let i=t.x-O.x,m=t.y-O.y,v=Math.atan2(i,-m);return v<0&&(v+=ye),v/ye},Xe=(t,i)=>{if(!d.svTriangle)return null;let m=f.canvasGL.getBoundingClientRect(),v=(t-m.left)*(f.width/m.width),E=(i-m.top)*(f.height/m.height),M=xe(n||w,s,f.width*.36,{x:f.width*.5,y:f.height*.5},c,r),N=(M.w.y-M.k.y)*(M.c.x-M.k.x)+(M.k.x-M.w.x)*(M.c.y-M.k.y);if(Math.abs(N)<1e-6)return null;let Q=((M.w.y-M.k.y)*(v-M.k.x)+(M.k.x-M.w.x)*(E-M.k.y))/N,H=((M.k.y-M.c.y)*(v-M.k.x)+(M.c.x-M.k.x)*(E-M.k.y))/N,oe=1-Q-H;return Q<-.02||H<-.02||oe<-.02?null:{a:Q,b:H,g:oe}},Ue=t=>{let m=xe(n||w,s,f.width*.36,{x:f.width*.5,y:f.height*.5},c,r),v=Math.max(0,Math.min(1,t.a*m.cRGB.x+t.b)),E=Math.max(0,Math.min(1,t.a*m.cRGB.y+t.b)),M=Math.max(0,Math.min(1,t.a*m.cRGB.z+t.b));w=se({r:v*255,g:E*255,b:M*255},s),B(),p()},Ye=0,He=0,We=(t,i)=>{Ye=t,He=i,f.canvasGL.style.cursor=P(t,i)?"default":"grab"};f.canvasGL.addEventListener("mousemove",t=>{We(t.clientX,t.clientY)}),f.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)ie=!0,ce=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=D?Xe(t.clientX,t.clientY):null;i?(u=!0,n={...w},S=i,Ue(i)):!D&&bt(t.clientX,t.clientY)?(te=!0,O=K(),X=null,n=null,S=null,t.preventDefault(),h(1)):P(t.clientX,t.clientY)?(le=!0,n=null,S=null,Y(t.clientX,t.clientY)):(ie=!0,ce=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),f.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(te&&O){let i=j(t.clientX,t.clientY),m=Math.hypot(i.x-O.x,i.y-O.y),v=Lt(I),E=De*v,M=Fe*v,N=Math.abs(m-M)<=Ve*v/2+2,Q=Math.abs(m-E)<=Pe*v/2+2,H=N?"sat":Q?"alpha":null;if(X=H,H){let oe=gt(i);H==="alpha"?ht(oe):dt(oe)}else p()}else if(u){let i=Xe(t.clientX,t.clientY);i&&(S=i,Ue(i))}else if(ie){let i=t.clientX-ce,m=t.clientY-me;ce=t.clientX,me=t.clientY,ae(i,m)}else le&&Y(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{te&&(te=!1,X=null,h(0)),u&&(u=!1),ie&&(ie=!1,document.body.style.cursor="default"),le&&(le=!1),We(Ye,He)}),f.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),p()},{passive:!1}),f.canvasGL.addEventListener("dblclick",t=>{P(t.clientX,t.clientY)?(l=!l,B()):pe(),p()});let Ne=t=>{if(t.key==="Shift"){D||(D=!0,n=null,S=null,R(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":pe();break;case"f":case"F":Z(fe());break;case"b":case"B":Z(ge(Math.PI));break;case"t":case"T":Z(de(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),T("y",-5*G);break;case"ArrowRight":t.preventDefault(),T("y",5*G);break;case"ArrowUp":t.preventDefault(),T("x",5*G);break;case"ArrowDown":t.preventDefault(),T("x",-5*G);break}};window.addEventListener("keydown",Ne);let $e=t=>{t.key==="Shift"&&D&&(D=!1,R(0))};window.addEventListener("keyup",$e);let Ze=()=>{D&&(D=!1,R(0))};return window.addEventListener("blur",Ze),p(),B(),{getColor:()=>{let t=ne(w,s),i=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:ue(i),oklch:Me(i),hex:A<1?ft(i,A):Be(i),alpha:A}},setColor:t=>{$=t,w=se(t,s),t.a!==void 0&&(A=Math.max(0,Math.min(1,t.a))),n=null,S=null,B(),p()},setMode:t=>{s=t,n=null,S=null,B(),p()},getMode:()=>s,setRotation:(t,i)=>{y=be(i*G,0,t*G),b=fe(),C.x=i*G,C.y=0,C.z=t*G,_(),p()},getAxisRotation:()=>({rotXDeg:Math.round(Ie(C.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ie(C.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ie(C.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,m)=>{T("x",Oe(t*G-C.x)),T("y",Oe(i*G-C.y)),T("z",Oe(m*G-C.z))},rotateLocal:(t,i)=>{T(t,i*G)},resetRotation:(t,i,m)=>{y=be(t*G,i*G,m*G),b=fe(),C.x=t*G,C.y=i*G,C.z=m*G,_(),p()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),p()},getZoom:()=>c.zoom||1,setDimensions:(t,i,m)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,m)),p()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),p()},getRadius:()=>r.radius,setAlpha:t=>{A=Math.max(0,Math.min(1,t)),B(),p()},getAlpha:()=>A,getEdgeStyle:()=>({...g}),setEdgeStyle:t=>{g={...g,...t},p()},getGuides:()=>({...d}),setGuides:t=>{d={...d,...t},p()},toggleAllGuides:t=>{let i=t!==void 0?t:!d.vertexX;d={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:d.svTriangle},p()},on:(t,i)=>{z.add(i)},off:(t,i)=>{z.delete(i)},destroy:()=>{k!==null&&cancelAnimationFrame(k),V!==null&&cancelAnimationFrame(V),U!==null&&cancelAnimationFrame(U),window.removeEventListener("keydown",Ne),window.removeEventListener("keyup",$e),window.removeEventListener("blur",Ze),e.innerHTML=""}}}return vt(Tt);})();
