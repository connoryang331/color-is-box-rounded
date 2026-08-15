var Ke={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Qe={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ue(e){let o=e.r/255,i=e.g/255,s=e.b/255,c=Math.max(o,i,s),l=Math.min(o,i,s),r=c-l,d=0;r!==0&&(c===o?d=((i-s)/r+6)%6:c===i?d=(s-o)/r+2:d=(o-i)/r+4,d*=60);let g=c===0?0:r/c*100,x=c*100;return{h:d,s:g,b:x}}function ke(e){let o=e.h,i=e.s/100,s=e.b/100,c=s*i,l=c*(1-Math.abs(o/60%2-1)),r=s-c,d,g,x;return o<60?(d=c,g=l,x=0):o<120?(d=l,g=c,x=0):o<180?(d=0,g=c,x=l):o<240?(d=0,g=l,x=c):o<300?(d=l,g=0,x=c):(d=c,g=0,x=l),{r:Math.round((d+r)*255),g:Math.round((g+r)*255),b:Math.round((x+r)*255)}}function Re(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ze(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function xt(e){let o=Re(e.r/255),i=Re(e.g/255),s=Re(e.b/255),c=.4122214708*o+.5363325363*i+.0514459929*s,l=.2119034982*o+.6806995451*i+.1073969566*s,r=.0883024619*o+.2817188376*i+.6299787005*s,d=Math.cbrt(c),g=Math.cbrt(l),x=Math.cbrt(r);return{L:.2104542553*d+.793617785*g-.0040720468*x,a:1.9779984951*d-2.428592205*g+.4505937099*x,b:.0259040371*d+.7827717662*g-.808675766*x}}function yt(e,o,i){let s=e+.3963377774*o+.2158037573*i,c=e-.1055613458*o-.0638541728*i,l=e-.0894841775*o-1.291485548*i,r=s*s*s,d=c*c*c,g=l*l*l,x=4.0767416621*r-3.3077115913*d+.2309699292*g,y=-1.2684380046*r+2.6097574011*d-.3413193965*g,b=-.0041960863*r-.7034186147*d+1.707614701*g;return{r:Math.round(Math.max(0,Math.min(1,ze(x)))*255),g:Math.round(Math.max(0,Math.min(1,ze(y)))*255),b:Math.round(Math.max(0,Math.min(1,ze(b)))*255)}}function Me(e){let o=xt(e),i=Math.sqrt(o.a*o.a+o.b*o.b),s=Math.atan2(o.b,o.a)*(180/Math.PI);return s<0&&(s+=360),{l:o.L,c:i,h:i<1e-4?0:s}}function Ae(e){let o=e.h*(Math.PI/180),i=e.c*Math.cos(o),s=e.c*Math.sin(o);return yt(e.l,i,s)}function pt(e,o,i){let s=Ae({l:e,c:o,h:i});if(Je(s))return{l:e,c:o,h:i};let c=0,l=o;for(let r=0;r<20;r++){let d=(c+l)/2;s=Ae({l:e,c:d,h:i}),Je(s)?c=d:l=d}return{l:e,c,h:i}}function Je(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Le(e){let o=i=>Math.max(0,Math.min(255,Math.round(i))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var et=.4;function ne(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return ke({h:e.x*359,s:e.y*100,b:e.z*100});{let i=e.x,s=e.y*et,c=e.z*359,l=pt(i,s,c);return Ae(l)}}function se(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let i=ue(e);return{x:i.h/359,y:i.s/100,z:i.b/100}}else{let i=Me(e);return{x:i.l,y:Math.min(i.c/et,1),z:i.h/359}}}var Be=Math.PI/180;function fe(){return[1,0,0,0,1,0,0,0,1]}function de(e){let o=Math.cos(e),i=Math.sin(e);return[1,0,0,0,o,-i,0,i,o]}function ge(e){let o=Math.cos(e),i=Math.sin(e);return[o,0,i,0,1,0,-i,0,o]}function Te(e){let o=Math.cos(e),i=Math.sin(e);return[o,i,0,-i,o,0,0,0,1]}function ee(e,o){let i=new Array(9);for(let s=0;s<3;s++)for(let c=0;c<3;c++)i[s*3+c]=e[s*3]*o[c]+e[s*3+1]*o[3+c]+e[s*3+2]*o[6+c];return i}function Ee(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Ge(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function be(e,o,i){return ee(ge(o),ee(Te(i),de(e)))}var tt={mat:be(8*Be,-20*Be,-55*Be),zoom:1},ot={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ve(e,o,i){let s=(e.x-.5)*i.sizeX,c=(e.y-.5)*i.sizeY,l=(e.z-.5)*i.sizeZ;return Ge(o.mat,{x:s,y:c,z:l})}function J(e,o,i,s,c){let l=ve(e,s,c);return{x:i.x+l.x*o*1.6*s.zoom,y:i.y-l.y*o*1.6*s.zoom}}function xe(e,o,i,s,c,l){let r=ne(e,o),d={x:r.r/255,y:r.g/255,z:r.b/255},g=se({r:255,g:255,b:255},o),x=se({r:0,g:0,b:0},o);return{c:J(e,i,s,c,l),w:J(g,i,s,c,l),k:J(x,i,s,c,l),cRGB:d}}var we=["#ef4444","#22c55e","#3b82f6"];function nt(e,o,i,s,c,l){let r=b=>J(b,o,i,s,c);e.save();let d=r({x:.5,y:.5,z:.5}),g=.35,x=[{from:{x:-g,y:.5,z:.5},to:{x:1+g,y:.5,z:.5},color:we[0],name:"Cx",visible:l.centerX},{from:{x:.5,y:-g,z:.5},to:{x:.5,y:1+g,z:.5},color:we[1],name:"Cy",visible:l.centerY},{from:{x:.5,y:.5,z:-g},to:{x:.5,y:.5,z:1+g},color:we[2],name:"Cz",visible:l.centerZ}],y=!1;for(let b=0;b<x.length;b++){if(!x[b].visible)continue;y=!0;let C=r(x[b].from),_=r(x[b].to);e.beginPath(),e.moveTo(C.x,C.y),e.lineTo(_.x,_.y),e.strokeStyle=x[b].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(C.x,C.y,3,0,Math.PI*2),e.arc(_.x,_.y,3,0,Math.PI*2),e.fillStyle=x[b].color,e.fill()}y&&(e.beginPath(),e.arc(d.x,d.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var rt=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,at=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,it=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,st=`
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
`;var Se=30,De=12,Pe=56,Fe=16;function ct(e,o){let i=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.userSelect="none";let c=document.createElement("canvas");c.width=o*i,c.height=o*i,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let l=document.createElement("canvas");l.width=o*i,l.height=o*i,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0",l.style.pointerEvents="none",s.appendChild(c),s.appendChild(l),e.appendChild(s);let r=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),d=l.getContext("2d");d.scale(i,i);let g=(L,V)=>{let R=r.createShader(L);return r.shaderSource(R,V),r.compileShader(R),r.getShaderParameter(R,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(R)),R},x=g(r.VERTEX_SHADER,rt),y=g(r.FRAGMENT_SHADER,st),b=r.createProgram();r.attachShader(b,x),r.attachShader(b,y),r.linkProgram(b);let C=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,C),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let _=r.getAttribLocation(b,"position");r.enableVertexAttribArray(_),r.vertexAttribPointer(_,2,r.FLOAT,!1,0,0);let $=g(r.VERTEX_SHADER,at),w=g(r.FRAGMENT_SHADER,it),A=r.createProgram();r.attachShader(A,$),r.attachShader(A,w),r.linkProgram(A);let u=r.getAttribLocation(A,"a_pos"),n=r.getAttribLocation(A,"a_color"),S=r.getUniformLocation(A,"u_alpha"),D=r.createBuffer(),F={u_resolution:r.getUniformLocation(b,"u_resolution"),u_box_size:r.getUniformLocation(b,"u_box_size"),u_radius:r.getUniformLocation(b,"u_radius"),u_mat:r.getUniformLocation(b,"u_mat"),u_mat_inv:r.getUniformLocation(b,"u_mat_inv"),u_zoom:r.getUniformLocation(b,"u_zoom"),u_mode:r.getUniformLocation(b,"u_mode"),u_invert:r.getUniformLocation(b,"u_invert"),u_show_front:r.getUniformLocation(b,"u_show_front"),u_show_back:r.getUniformLocation(b,"u_show_back"),u_front_width:r.getUniformLocation(b,"u_front_width"),u_back_width:r.getUniformLocation(b,"u_back_width"),u_front_dashed:r.getUniformLocation(b,"u_front_dashed"),u_back_dashed:r.getUniformLocation(b,"u_back_dashed"),u_front_color:r.getUniformLocation(b,"u_front_color"),u_back_color:r.getUniformLocation(b,"u_back_color")};return{gl:r,overlayCtx:d,canvasGL:c,canvasOverlay:l,width:o,height:o,program:b,uniforms:F,posBuffer:C,posAttr:_,triProgram:A,triPosAttr:u,triColorAttr:n,triAlphaLoc:S,triBuffer:D}}var lt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Ct(e,o,i,s,c,l){if(!l.showFront&&!l.showBack)return;let r=y=>J(y,o,i,s,c),g=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=y=>{let b=ve({x:.5,y:.5,z:.5},s,c);return ve({x:.5+y.x*.1,y:.5+y.y*.1,z:.5+y.z*.1},s,c).z-b.z>0};if(e.save(),l.showBack){e.lineWidth=l.backWidth,l.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.backColor,e.globalAlpha=l.backOpacity;for(let y of lt)if(!(x(y.normalA)||x(y.normalB))){let[C,_]=y.edge;e.beginPath(),e.moveTo(g[C].x,g[C].y),e.lineTo(g[_].x,g[_].y),e.stroke()}}if(l.showFront){e.lineWidth=l.frontWidth,l.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.frontColor,e.globalAlpha=l.frontOpacity;for(let y of lt)if(x(y.normalA)||x(y.normalB)){let[C,_]=y.edge;e.beginPath(),e.moveTo(g[C].x,g[C].y),e.lineTo(g[_].x,g[_].y),e.stroke()}}e.restore()}function ut(e,o,i,s,c,l,r,d,g,x,y,b,C,_,$,w,A){let{gl:u,overlayCtx:n,width:S,height:D,program:F,uniforms:L}=e,V=window.devicePixelRatio||1;u.viewport(0,0,S*V,D*V),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(F),u.uniform2f(L.u_resolution,S*V,D*V),u.uniform3f(L.u_box_size,i.sizeX,i.sizeY,i.sizeZ),u.uniform1f(L.u_radius,i.radius!==void 0?i.radius:.001);let R=o.mat;u.uniformMatrix3fv(L.u_mat,!1,new Float32Array([R[0],R[3],R[6],R[1],R[4],R[7],R[2],R[5],R[8]])),u.uniformMatrix3fv(L.u_mat_inv,!1,new Float32Array([R[0],R[1],R[2],R[3],R[4],R[5],R[6],R[7],R[8]])),u.uniform1f(L.u_zoom,o.zoom||1),u.uniform1i(L.u_mode,s==="rgb"?0:s==="hsb"?1:2),u.uniform1i(L.u_invert,c?1:0),u.uniform1i(L.u_show_front,r.showFront?1:0),u.uniform1i(L.u_show_back,r.showBack?1:0),u.uniform1f(L.u_front_width,r.frontWidth||1.5),u.uniform1f(L.u_back_width,r.backWidth||1),u.uniform1i(L.u_front_dashed,r.frontDashed?1:0),u.uniform1i(L.u_back_dashed,r.backDashed?1:0),u.uniform4f(L.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(L.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let te=S*.36,O={x:S*.5,y:D*.5},X=null,I=null,re=b||C>.001;if(l.svTriangle&&re){let h=xe(x||d,s,te,O,o,i);Math.abs((h.w.x-h.c.x)*(h.k.y-h.c.y)-(h.w.y-h.c.y)*(h.k.x-h.c.x))>4?X=h:I=h}let U=C<.5?2*C*C:1-Math.pow(-2*C+2,2)/2;if(X&&U<.01&&(X=null),X){let h=T=>[T.x/S*2-1,1-T.y/D*2],z=X,f=T=>({x:z.c.x+(T.x-z.c.x)*U,y:z.c.y+(T.y-z.c.y)*U}),k=h(z.c),p=h(f(z.w)),B=h(f(z.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([k[0],k[1],z.cRGB.x,z.cRGB.y,z.cRGB.z,p[0],p[1],1,1,1,B[0],B[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(F),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,S,D),Ct(n,te,O,o,i,r),nt(n,te,O,o,i,l),I){let h=I;n.save(),n.globalAlpha=C,n.beginPath(),n.moveTo(h.k.x,h.k.y),n.lineTo(h.w.x,h.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if(X){let h=X,z=ae=>({x:h.c.x+(ae.x-h.c.x)*U,y:h.c.y+(ae.y-h.c.y)*U}),f=z(h.w),k=z(h.k),p=Math.round(h.cRGB.x*255),B=Math.round(h.cRGB.y*255),T=Math.round(h.cRGB.z*255);if(n.save(),n.globalAlpha=C,n.beginPath(),n.moveTo(h.c.x,h.c.y),n.lineTo(f.x,f.y),n.lineTo(k.x,k.y),n.closePath(),n.strokeStyle=`rgba(${p}, ${B}, ${T}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(f.x,f.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(k.x,k.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),y){let ae=y.a*h.c.x+y.b*f.x+y.g*k.x,Z=y.a*h.c.y+y.b*f.y+y.g*k.y;n.beginPath(),n.arc(ae,Z,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}if(g&&!y){let h=J(d,te,O,o,i),z=ne(d,s),f=c?{r:255-z.r,g:255-z.g,b:255-z.b}:z;if(A<1){n.save(),n.beginPath(),n.arc(h.x,h.y,6,0,Math.PI*2),n.clip();let k=4;for(let p=-8;p<8;p+=k)for(let B=-8;B<8;B+=k)n.fillStyle=(B+p)/k%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(h.x+B,h.y+p,k,k);n.restore()}n.beginPath(),n.arc(h.x,h.y,6,0,Math.PI*2),n.fillStyle=A<1?`rgba(${f.r}, ${f.g}, ${f.b}, ${A})`:`rgb(${f.r}, ${f.g}, ${f.b})`,n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke()}if(_&&$>.01){let h=$<.5?2*$*$:1-Math.pow(-2*$+2,2)/2,z=Se*h,f=Pe*h,k=De*h,p=Fe*h,B=ne(d,s),T=c?{r:255-B.r,g:255-B.g,b:255-B.b}:B,ae=ue(T),Z=-Math.PI/2;n.save(),n.globalAlpha=Math.min(1,h+.15);let pe=(W,q)=>{n.save(),n.beginPath(),n.arc(_.x,_.y,W+q/2,0,Math.PI*2),n.arc(_.x,_.y,Math.max(.5,W-q/2),0,Math.PI*2,!0),n.closePath(),n.clip();let P=6,Y=W+q/2;for(let j=-Y;j<Y;j+=P)for(let K=-Y;K<Y;K+=P)n.fillStyle=(K+j)/P%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(_.x+K,_.y+j,P,P);n.restore()},ie=(W,q,P)=>{n.lineWidth=P?1.8:1,n.strokeStyle=P?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let Y of[W-q/2,W+q/2])Y<=0||(n.beginPath(),n.arc(_.x,_.y,Y,0,Math.PI*2),n.stroke())},le=(W,q,P,Y)=>{let j=_.x,K=_.y-(q+P/2)-2;n.font="700 12px ui-monospace, SF Mono, monospace",n.textAlign="center",n.textBaseline="alphabetic",n.lineWidth=3,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.strokeText(W,j,K),n.fillStyle=Y?"#ffffff":"rgba(248, 250, 252, 0.95)",n.fillText(W,j,K)},ce=ae.s/100;n.beginPath(),n.arc(_.x,_.y,f,0,Math.PI*2),n.lineWidth=p,n.strokeStyle="rgba(100, 116, 139, 0.5)",n.stroke();let me=Z+ce*Math.PI*2;ce>.001&&(n.beginPath(),n.arc(_.x,_.y,f,Z,me),n.lineWidth=p,n.strokeStyle=`rgb(${T.r}, ${T.g}, ${T.b})`,n.stroke()),ie(f,p,w==="sat"),le("SAT",f,p,w==="sat"),pe(z,k);let Ce=Z+A*Math.PI*2;A>.001&&(n.beginPath(),n.arc(_.x,_.y,z,Z,Ce),n.lineWidth=k,n.strokeStyle=`rgba(${T.r}, ${T.g}, ${T.b}, ${A})`,n.stroke()),ie(z,k,w==="alpha"),le("A",z,k,w==="alpha"),n.restore()}n.restore()}var G=Math.PI/180,ye=2*Math.PI,Ve=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},Ie=e=>{let o=e%ye;return o>Math.PI?o-=ye:o<-Math.PI&&(o+=ye),o},_t=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,mt=(e,o)=>{let i=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${i(e.r)}${i(e.g)}${i(e.b)}${i(o*255)}`};function jt(e,o={}){let i=o.size||460,s=o.mode||"rgb",c=!1,l={...tt},r={...ot,radius:.08},d={...Qe},g={...Ke},x={x:8*G,y:-20*G,z:-55*G},y=be(x.x,x.y,x.z),b=fe(),C={...x},_=()=>{l.mat=ee(b,y)},$=o.initialColor||{r:255,g:255,b:255},w=se($,s),A=1,u=!1,n=null,S=null,D=!1,F=0,L=0,V=null,R=t=>{if(L=t,V!==null)return;let a=performance.now(),m=6,v=E=>{let M=Math.min(.05,(E-a)/1e3);a=E,L>F?F=Math.min(L,F+M*m):F=Math.max(L,F-M*m),p(),Math.abs(F-L)<.001?(F=L,V=null):V=requestAnimationFrame(v)};V=requestAnimationFrame(v)},te=!1,O=null,X=null,I=0,re=0,U=null,h=t=>{if(re=t,U!==null)return;let a=performance.now(),m=6,v=E=>{let M=Math.min(.05,(E-a)/1e3);a=E,re>I?I=Math.min(re,I+M*m):I=Math.max(re,I-M*m),p(),Math.abs(I-re)<.001?(I=re,U=null):U=requestAnimationFrame(v)};U=requestAnimationFrame(v)},z=new Set,f=ct(e,i),k=null,p=()=>{k===null&&(k=requestAnimationFrame(()=>{k=null,ut(f,l,r,s,c,d,g,w,!0,n,S,D,F,O,I,X,A)}))},B=()=>{let t=ne(w,s),a=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t,m=ue(a),v=Me(a),E=A<1?mt(a,A):Le(a),M={rgb:a,hsb:m,oklch:v,hex:E,alpha:A};z.forEach(N=>N(M))},T=(t,a)=>{a!==0&&(t==="x"?(y=ee(y,de(a)),C.x+=a):t==="y"?(y=ee(y,ge(a)),C.y+=a):(y=ee(y,Te(a)),C.z+=a),_(),p())},ae=(t,a)=>{b=ee(ge(t*.01),b),b=ee(de(-a*.01),b),_(),p()},Z=t=>{b=ee(t,Ee(y)),_(),p()},pe=()=>{y=be(x.x,x.y,x.z),b=fe(),C={...x},l.zoom=1,_(),p()},ie=!1,le=!1,ce=0,me=0,Ce=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),W=()=>{let t=Ce();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},q=t=>{let a=Ce(),m=W(),v=Math.abs(t.x)-(a.x-m),E=Math.abs(t.y)-(a.y-m),M=Math.abs(t.z)-(a.z-m),N=Math.max(v,0),Q=Math.max(E,0),H=Math.max(M,0),oe=Math.hypot(N,Q,H),he=Math.min(Math.max(v,Math.max(E,M)),0);return oe+he-m},P=(t,a)=>{let m=f.canvasGL.getBoundingClientRect(),v=(t-m.left)*(f.width/m.width),E=(a-m.top)*(f.height/m.height),M=v-f.width*.5,N=f.height*.5-E,Q=f.width*.36*1.6*(l.zoom||1),H={x:M/Q,y:N/Q},oe=_e=>Ge(Ee(l.mat),_e),he=0,Ze=null;for(let _e=0;_e<96;_e++){let gt={x:H.x,y:H.y,z:-5+he},qe=oe(gt),je=q(qe);if(je<.001){Ze=qe;break}if(he+=je,he>10)break}return Ze},Y=(t,a)=>{let m=P(t,a);if(!m)return;let v=Math.max(0,Math.min(1,m.x/r.sizeX+.5)),E=Math.max(0,Math.min(1,m.y/r.sizeY+.5)),M=Math.max(0,Math.min(1,m.z/r.sizeZ+.5));w={x:v,y:E,z:M},B(),p()},j=(t,a)=>{let m=f.canvasGL.getBoundingClientRect();return{x:(t-m.left)*(f.width/m.width),y:(a-m.top)*(f.height/m.height)}},K=()=>J(w,f.width*.36,{x:f.width*.5,y:f.height*.5},l,r),ft=(t,a)=>{let m=j(t,a),v=K();return Math.hypot(m.x-v.x,m.y-v.y)<=14},bt=t=>{A=Math.max(0,Math.min(1,t)),B(),p()},ht=t=>{let a=ne(w,s),m=ue(a);m.s=Math.max(0,Math.min(100,t*100)),w=se(ke(m),s),B(),p()},dt=t=>{let a=t.x-O.x,m=t.y-O.y,v=Math.atan2(a,-m);return v<0&&(v+=ye),v/ye},Oe=(t,a)=>{if(!d.svTriangle)return null;let m=f.canvasGL.getBoundingClientRect(),v=(t-m.left)*(f.width/m.width),E=(a-m.top)*(f.height/m.height),M=xe(n||w,s,f.width*.36,{x:f.width*.5,y:f.height*.5},l,r),N=(M.w.y-M.k.y)*(M.c.x-M.k.x)+(M.k.x-M.w.x)*(M.c.y-M.k.y);if(Math.abs(N)<1e-6)return null;let Q=((M.w.y-M.k.y)*(v-M.k.x)+(M.k.x-M.w.x)*(E-M.k.y))/N,H=((M.k.y-M.c.y)*(v-M.k.x)+(M.c.x-M.k.x)*(E-M.k.y))/N,oe=1-Q-H;return Q<-.02||H<-.02||oe<-.02?null:{a:Q,b:H,g:oe}},Xe=t=>{let m=xe(n||w,s,f.width*.36,{x:f.width*.5,y:f.height*.5},l,r),v=Math.max(0,Math.min(1,t.a*m.cRGB.x+t.b)),E=Math.max(0,Math.min(1,t.a*m.cRGB.y+t.b)),M=Math.max(0,Math.min(1,t.a*m.cRGB.z+t.b));w=se({r:v*255,g:E*255,b:M*255},s),B(),p()},Ue=0,Ye=0,He=(t,a)=>{Ue=t,Ye=a,f.canvasGL.style.cursor=P(t,a)?"default":"grab"};f.canvasGL.addEventListener("mousemove",t=>{He(t.clientX,t.clientY)}),f.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)ie=!0,ce=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let a=D?Oe(t.clientX,t.clientY):null;a?(u=!0,n={...w},S=a,Xe(a)):!D&&ft(t.clientX,t.clientY)?(te=!0,O=K(),X=null,n=null,S=null,t.preventDefault(),h(1)):P(t.clientX,t.clientY)?(le=!0,n=null,S=null,Y(t.clientX,t.clientY)):(ie=!0,ce=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),f.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(te&&O){let a=j(t.clientX,t.clientY),m=Math.hypot(a.x-O.x,a.y-O.y),v=_t(I),E=Se*v,M=Pe*v,N=Math.abs(m-M)<=Fe*v/2+2,Q=Math.abs(m-E)<=De*v/2+2,H=N?"sat":Q?"alpha":null;if(X=H,H){let oe=dt(a);H==="alpha"?bt(oe):ht(oe)}else p()}else if(u){let a=Oe(t.clientX,t.clientY);a&&(S=a,Xe(a))}else if(ie){let a=t.clientX-ce,m=t.clientY-me;ce=t.clientX,me=t.clientY,ae(a,m)}else le&&Y(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{te&&(te=!1,X=null,h(0)),u&&(u=!1),ie&&(ie=!1,document.body.style.cursor="default"),le&&(le=!1),He(Ue,Ye)}),f.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let a=t.deltaY<0?.08:-.08;l.zoom=Math.max(.2,Math.min(2.5,(l.zoom||1)+a)),p()},{passive:!1}),f.canvasGL.addEventListener("dblclick",t=>{P(t.clientX,t.clientY)?(c=!c,B()):pe(),p()});let We=t=>{if(t.key==="Shift"){D||(D=!0,n=null,S=null,R(1));return}let a=t.target?.tagName;if(!(a==="INPUT"||a==="TEXTAREA"))switch(t.key){case"r":case"R":pe();break;case"f":case"F":Z(fe());break;case"b":case"B":Z(ge(Math.PI));break;case"t":case"T":Z(de(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),T("y",-5*G);break;case"ArrowRight":t.preventDefault(),T("y",5*G);break;case"ArrowUp":t.preventDefault(),T("x",5*G);break;case"ArrowDown":t.preventDefault(),T("x",-5*G);break}};window.addEventListener("keydown",We);let Ne=t=>{t.key==="Shift"&&D&&(D=!1,R(0))};window.addEventListener("keyup",Ne);let $e=()=>{D&&(D=!1,R(0))};return window.addEventListener("blur",$e),p(),B(),{getColor:()=>{let t=ne(w,s),a=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:a,hsb:ue(a),oklch:Me(a),hex:A<1?mt(a,A):Le(a),alpha:A}},setColor:t=>{$=t,w=se(t,s),t.a!==void 0&&(A=Math.max(0,Math.min(1,t.a))),n=null,S=null,B(),p()},setMode:t=>{s=t,n=null,S=null,B(),p()},getMode:()=>s,setRotation:(t,a)=>{y=be(a*G,0,t*G),b=fe(),C.x=a*G,C.y=0,C.z=t*G,_(),p()},getAxisRotation:()=>({rotXDeg:Math.round(Ve(C.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ve(C.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ve(C.z*180/Math.PI)*10)/10}),setAxisRotation:(t,a,m)=>{T("x",Ie(t*G-C.x)),T("y",Ie(a*G-C.y)),T("z",Ie(m*G-C.z))},rotateLocal:(t,a)=>{T(t,a*G)},resetRotation:(t,a,m)=>{y=be(t*G,a*G,m*G),b=fe(),C.x=t*G,C.y=a*G,C.z=m*G,_(),p()},setZoom:t=>{l.zoom=Math.max(.1,Math.min(3,t)),p()},getZoom:()=>l.zoom||1,setDimensions:(t,a,m)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,a)),r.sizeZ=Math.max(.2,Math.min(2.5,m)),p()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),p()},getRadius:()=>r.radius,setAlpha:t=>{A=Math.max(0,Math.min(1,t)),B(),p()},getAlpha:()=>A,getEdgeStyle:()=>({...g}),setEdgeStyle:t=>{g={...g,...t},p()},getGuides:()=>({...d}),setGuides:t=>{d={...d,...t},p()},toggleAllGuides:t=>{let a=t!==void 0?t:!d.vertexX;d={vertexX:a,vertexY:a,vertexZ:a,centerX:a,centerY:a,centerZ:a,angleGuides:a,svTriangle:d.svTriangle},p()},on:(t,a)=>{z.add(a)},off:(t,a)=>{z.delete(a)},destroy:()=>{k!==null&&cancelAnimationFrame(k),V!==null&&cancelAnimationFrame(V),U!==null&&cancelAnimationFrame(U),window.removeEventListener("keydown",We),window.removeEventListener("keyup",Ne),window.removeEventListener("blur",$e),e.innerHTML=""}}}export{jt as createRoundedBoxPicker};
