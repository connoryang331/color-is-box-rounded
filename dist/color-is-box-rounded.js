var ke={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Le={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function oe(e){let o=e.r/255,a=e.g/255,s=e.b/255,u=Math.max(o,a,s),c=Math.min(o,a,s),r=u-c,b=0;r!==0&&(u===o?b=((a-s)/r+6)%6:u===a?b=(s-o)/r+2:b=(o-a)/r+4,b*=60);let f=u===0?0:r/u*100,d=u*100;return{h:b,s:f,b:d}}function He(e){let o=e.h,a=e.s/100,s=e.b/100,u=s*a,c=u*(1-Math.abs(o/60%2-1)),r=s-u,b,f,d;return o<60?(b=u,f=c,d=0):o<120?(b=c,f=u,d=0):o<180?(b=0,f=u,d=c):o<240?(b=0,f=c,d=u):o<300?(b=c,f=0,d=u):(b=u,f=0,d=c),{r:Math.round((b+r)*255),g:Math.round((f+r)*255),b:Math.round((d+r)*255)}}function ne(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ae(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function We(e){let o=ne(e.r/255),a=ne(e.g/255),s=ne(e.b/255),u=.4122214708*o+.5363325363*a+.0514459929*s,c=.2119034982*o+.6806995451*a+.1073969566*s,r=.0883024619*o+.2817188376*a+.6299787005*s,b=Math.cbrt(u),f=Math.cbrt(c),d=Math.cbrt(r);return{L:.2104542553*b+.793617785*f-.0040720468*d,a:1.9779984951*b-2.428592205*f+.4505937099*d,b:.0259040371*b+.7827717662*f-.808675766*d}}function Ze(e,o,a){let s=e+.3963377774*o+.2158037573*a,u=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=s*s*s,b=u*u*u,f=c*c*c,d=4.0767416621*r-3.3077115913*b+.2309699292*f,h=-1.2684380046*r+2.6097574011*b-.3413193965*f,n=-.0041960863*r-.7034186147*b+1.707614701*f;return{r:Math.round(Math.max(0,Math.min(1,ae(d)))*255),g:Math.round(Math.max(0,Math.min(1,ae(h)))*255),b:Math.round(Math.max(0,Math.min(1,ae(n)))*255)}}function te(e){let o=We(e),a=Math.sqrt(o.a*o.a+o.b*o.b),s=Math.atan2(o.b,o.a)*(180/Math.PI);return s<0&&(s+=360),{l:o.L,c:a,h:a<1e-4?0:s}}function ie(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),s=e.c*Math.sin(o);return Ze(e.l,a,s)}function Ne(e,o,a){let s=ie({l:e,c:o,h:a});if(Be(s))return{l:e,c:o,h:a};let u=0,c=o;for(let r=0;r<20;r++){let b=(u+c)/2;s=ie({l:e,c:b,h:a}),Be(s)?u=b:c=b}return{l:e,c:u,h:a}}function Be(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function se(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Ge=.4;function V(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return He({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,s=e.y*Ge,u=e.z*359,c=Ne(a,s,u);return ie(c)}}function O(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=oe(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=te(e);return{x:a.l,y:Math.min(a.c/Ge,1),z:a.h/359}}}var ce=Math.PI/180;function U(){return[1,0,0,0,1,0,0,0,1]}function Z(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function N(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function le(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function E(e,o){let a=new Array(9);for(let s=0;s<3;s++)for(let u=0;u<3;u++)a[s*3+u]=e[s*3]*o[u]+e[s*3+1]*o[3+u]+e[s*3+2]*o[6+u];return a}function ue(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function me(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function Y(e,o,a){return E(N(o),E(le(a),Z(e)))}var Te={mat:Y(8*ce,-20*ce,-55*ce),zoom:1},Ee={sizeX:1,sizeY:1,sizeZ:1,radius:0};function re(e,o,a){let s=(e.x-.5)*a.sizeX,u=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return me(o.mat,{x:s,y:u,z:c})}function P(e,o,a,s,u){let c=re(e,s,u);return{x:a.x+c.x*o*1.6*s.zoom,y:a.y-c.y*o*1.6*s.zoom}}function $(e,o,a,s,u,c){let r=V(e,o),b={x:r.r/255,y:r.g/255,z:r.b/255},f=O({r:255,g:255,b:255},o),d=O({r:0,g:0,b:0},o);return{c:P(e,a,s,u,c),w:P(f,a,s,u,c),k:P(d,a,s,u,c),cRGB:b}}var fe=["#ef4444","#22c55e","#3b82f6"];function we(e,o,a,s,u,c){let r=n=>P(n,o,a,s,u);e.save();let b=r({x:.5,y:.5,z:.5}),f=.35,d=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:fe[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:fe[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:fe[2],name:"Cz",visible:c.centerZ}],h=!1;for(let n=0;n<d.length;n++){if(!d[n].visible)continue;h=!0;let i=r(d[n].from),C=r(d[n].to);e.beginPath(),e.moveTo(i.x,i.y),e.lineTo(C.x,C.y),e.strokeStyle=d[n].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(i.x,i.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=d[n].color,e.fill()}h&&(e.beginPath(),e.arc(b.x,b.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var De=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Se=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,Fe=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,Pe=`
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
`;function Oe(e,o){let a=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.userSelect="none";let u=document.createElement("canvas");u.width=o*a,u.height=o*a,u.style.width=`${o}px`,u.style.height=`${o}px`,u.style.position="absolute",u.style.left="0",u.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",s.appendChild(u),s.appendChild(c),e.appendChild(s);let r=u.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),b=c.getContext("2d");b.scale(a,a);let f=(m,R)=>{let v=r.createShader(m);return r.shaderSource(v,R),r.compileShader(v),r.getShaderParameter(v,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(v)),v},d=f(r.VERTEX_SHADER,De),h=f(r.FRAGMENT_SHADER,Pe),n=r.createProgram();r.attachShader(n,d),r.attachShader(n,h),r.linkProgram(n);let i=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(n,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let G=f(r.VERTEX_SHADER,Se),A=f(r.FRAGMENT_SHADER,Fe),y=r.createProgram();r.attachShader(y,G),r.attachShader(y,A),r.linkProgram(y);let k=r.getAttribLocation(y,"a_pos"),_=r.getAttribLocation(y,"a_color"),T=r.getUniformLocation(y,"u_alpha"),p=r.createBuffer(),z={u_resolution:r.getUniformLocation(n,"u_resolution"),u_box_size:r.getUniformLocation(n,"u_box_size"),u_radius:r.getUniformLocation(n,"u_radius"),u_mat:r.getUniformLocation(n,"u_mat"),u_mat_inv:r.getUniformLocation(n,"u_mat_inv"),u_zoom:r.getUniformLocation(n,"u_zoom"),u_mode:r.getUniformLocation(n,"u_mode"),u_invert:r.getUniformLocation(n,"u_invert"),u_show_front:r.getUniformLocation(n,"u_show_front"),u_show_back:r.getUniformLocation(n,"u_show_back"),u_front_width:r.getUniformLocation(n,"u_front_width"),u_back_width:r.getUniformLocation(n,"u_back_width"),u_front_dashed:r.getUniformLocation(n,"u_front_dashed"),u_back_dashed:r.getUniformLocation(n,"u_back_dashed"),u_front_color:r.getUniformLocation(n,"u_front_color"),u_back_color:r.getUniformLocation(n,"u_back_color")};return{gl:r,overlayCtx:b,canvasGL:u,canvasOverlay:c,width:o,height:o,program:n,uniforms:z,posBuffer:i,posAttr:C,triProgram:y,triPosAttr:k,triColorAttr:_,triAlphaLoc:T,triBuffer:p}}var Ve=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function $e(e,o,a,s,u,c){if(!c.showFront&&!c.showBack)return;let r=h=>P(h,o,a,s,u),f=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),d=h=>{let n=re({x:.5,y:.5,z:.5},s,u);return re({x:.5+h.x*.1,y:.5+h.y*.1,z:.5+h.z*.1},s,u).z-n.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let h of Ve)if(!(d(h.normalA)||d(h.normalB))){let[i,C]=h.edge;e.beginPath(),e.moveTo(f[i].x,f[i].y),e.lineTo(f[C].x,f[C].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let h of Ve)if(d(h.normalA)||d(h.normalB)){let[i,C]=h.edge;e.beginPath(),e.moveTo(f[i].x,f[i].y),e.lineTo(f[C].x,f[C].y),e.stroke()}}e.restore()}function Ie(e,o,a,s,u,c,r,b,f,d,h){let{gl:n,overlayCtx:i,width:C,height:G,program:A,uniforms:y}=e,k=window.devicePixelRatio||1;n.viewport(0,0,C*k,G*k),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(A),n.uniform2f(y.u_resolution,C*k,G*k),n.uniform3f(y.u_box_size,a.sizeX,a.sizeY,a.sizeZ),n.uniform1f(y.u_radius,a.radius!==void 0?a.radius:.001);let _=o.mat;n.uniformMatrix3fv(y.u_mat,!1,new Float32Array([_[0],_[3],_[6],_[1],_[4],_[7],_[2],_[5],_[8]])),n.uniformMatrix3fv(y.u_mat_inv,!1,new Float32Array([_[0],_[1],_[2],_[3],_[4],_[5],_[6],_[7],_[8]])),n.uniform1f(y.u_zoom,o.zoom||1),n.uniform1i(y.u_mode,s==="rgb"?0:s==="hsb"?1:2),n.uniform1i(y.u_invert,u?1:0),n.uniform1i(y.u_show_front,r.showFront?1:0),n.uniform1i(y.u_show_back,r.showBack?1:0),n.uniform1f(y.u_front_width,r.frontWidth||1.5),n.uniform1f(y.u_back_width,r.backWidth||1),n.uniform1i(y.u_front_dashed,r.frontDashed?1:0),n.uniform1i(y.u_back_dashed,r.backDashed?1:0),n.uniform4f(y.u_front_color,1,1,1,r.frontOpacity||.65),n.uniform4f(y.u_back_color,1,1,1,r.backOpacity||.25),n.drawArrays(n.TRIANGLES,0,6);let T=C*.36,p={x:C*.5,y:G*.5},z=null;if(c.svTriangle){let m=$(d||b,s,T,p,o,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4&&(z=m)}if(z){let m=D=>[D.x/C*2-1,1-D.y/G*2],R=m(z.c),v=m(z.w),I=m(z.k);n.useProgram(e.triProgram),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.bindBuffer(n.ARRAY_BUFFER,e.triBuffer),n.bufferData(n.ARRAY_BUFFER,new Float32Array([R[0],R[1],z.cRGB.x,z.cRGB.y,z.cRGB.z,v[0],v[1],1,1,1,I[0],I[1],0,0,0]),n.STATIC_DRAW),n.enableVertexAttribArray(e.triPosAttr),n.vertexAttribPointer(e.triPosAttr,2,n.FLOAT,!1,20,0),n.enableVertexAttribArray(e.triColorAttr),n.vertexAttribPointer(e.triColorAttr,3,n.FLOAT,!1,20,8),n.uniform1f(e.triAlphaLoc,1),n.drawArrays(n.TRIANGLES,0,3),n.disable(n.BLEND),n.useProgram(A),n.enableVertexAttribArray(e.posAttr),n.bindBuffer(n.ARRAY_BUFFER,e.posBuffer),n.vertexAttribPointer(e.posAttr,2,n.FLOAT,!1,0,0)}if(i.save(),i.clearRect(0,0,C,G),$e(i,T,p,o,a,r),we(i,T,p,o,a,c),z){let m=z,R=Math.round(m.cRGB.x*255),v=Math.round(m.cRGB.y*255),I=Math.round(m.cRGB.z*255);if(i.save(),i.beginPath(),i.moveTo(m.c.x,m.c.y),i.lineTo(m.w.x,m.w.y),i.lineTo(m.k.x,m.k.y),i.closePath(),i.strokeStyle=`rgba(${R}, ${v}, ${I}, 0.7)`,i.lineWidth=1.2,i.setLineDash([]),i.stroke(),i.beginPath(),i.arc(m.w.x,m.w.y,3.5,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="rgba(17, 24, 39, 0.6)",i.lineWidth=1.2,i.stroke(),i.beginPath(),i.arc(m.k.x,m.k.y,3.5,0,Math.PI*2),i.fillStyle="#111827",i.fill(),i.strokeStyle="rgba(255, 255, 255, 0.7)",i.lineWidth=1.2,i.stroke(),h){let D=h.a*m.c.x+h.b*m.w.x+h.g*m.k.x,j=h.a*m.c.y+h.b*m.w.y+h.g*m.k.y;i.beginPath(),i.arc(D,j,4,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="rgba(17, 24, 39, 0.75)",i.lineWidth=1.4,i.stroke()}i.restore()}if(f&&!h){let m=P(b,T,p,o,a),R=V(b,s),v=u?{r:255-R.r,g:255-R.g,b:255-R.b}:R;i.beginPath(),i.arc(m.x,m.y,6,0,Math.PI*2),i.fillStyle=`rgb(${v.r}, ${v.g}, ${v.b})`,i.fill(),i.strokeStyle="#ffffff",i.lineWidth=2,i.stroke()}i.restore()}var M=Math.PI/180,be=2*Math.PI,de=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},he=e=>{let o=e%be;return o>Math.PI?o-=be:o<-Math.PI&&(o+=be),o};function zo(e,o={}){let a=o.size||460,s=o.mode||"rgb",u=!1,c={...Te},r={...Ee,radius:.08},b={...Le},f={...ke},d={x:8*M,y:-20*M,z:-55*M},h=Y(d.x,d.y,d.z),n=U(),i={...d},C=()=>{c.mat=E(n,h)},G=o.initialColor||{r:255,g:255,b:255},A=O(G,s),y=!1,k=null,_=null,T=new Set,p=Oe(e,a),z=null,m=()=>{z===null&&(z=requestAnimationFrame(()=>{z=null,Ie(p,c,r,s,u,b,f,A,!0,k,_)}))},R=()=>{let t=V(A,s),l=u?{r:255-t.r,g:255-t.g,b:255-t.b}:t,g=oe(l),L=te(l),B=se(l),x={rgb:l,hsb:g,oklch:L,hex:B,alpha:1};T.forEach(w=>w(x))},v=(t,l)=>{l!==0&&(t==="x"?(h=E(h,Z(l)),i.x+=l):t==="y"?(h=E(h,N(l)),i.y+=l):(h=E(h,le(l)),i.z+=l),C(),m())},I=(t,l)=>{n=E(N(t*.01),n),n=E(Z(-l*.01),n),C(),m()},D=t=>{n=E(t,ue(h)),C(),m()},j=()=>{h=Y(d.x,d.y,d.z),n=U(),i={...d},c.zoom=1,C(),m()},H=!1,K=!1,q=0,Q=0,ge=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),Xe=()=>{let t=ge();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Ue=t=>{let l=ge(),g=Xe(),L=Math.abs(t.x)-(l.x-g),B=Math.abs(t.y)-(l.y-g),x=Math.abs(t.z)-(l.z-g),w=Math.max(L,0),S=Math.max(B,0),F=Math.max(x,0),X=Math.hypot(w,S,F),W=Math.min(Math.max(L,Math.max(B,x)),0);return X+W-g},J=(t,l)=>{let g=p.canvasGL.getBoundingClientRect(),L=(t-g.left)*(p.width/g.width),B=(l-g.top)*(p.height/g.height),x=L-p.width*.5,w=p.height*.5-B,S=p.width*.36*1.6*(c.zoom||1),F={x:x/S,y:w/S},X=ee=>me(ue(c.mat),ee),W=0,Re=null;for(let ee=0;ee<96;ee++){let Ye={x:F.x,y:F.y,z:-5+W},ze=X(Ye),Ae=Ue(ze);if(Ae<.001){Re=ze;break}if(W+=Ae,W>10)break}return Re},xe=(t,l)=>{let g=J(t,l);if(!g)return;let L=Math.max(0,Math.min(1,g.x/r.sizeX+.5)),B=Math.max(0,Math.min(1,g.y/r.sizeY+.5)),x=Math.max(0,Math.min(1,g.z/r.sizeZ+.5));A={x:L,y:B,z:x},R(),m()},ye=(t,l)=>{if(!b.svTriangle)return null;let g=p.canvasGL.getBoundingClientRect(),L=(t-g.left)*(p.width/g.width),B=(l-g.top)*(p.height/g.height),x=$(k||A,s,p.width*.36,{x:p.width*.5,y:p.height*.5},c,r),w=(x.w.y-x.k.y)*(x.c.x-x.k.x)+(x.k.x-x.w.x)*(x.c.y-x.k.y);if(Math.abs(w)<1e-6)return null;let S=((x.w.y-x.k.y)*(L-x.k.x)+(x.k.x-x.w.x)*(B-x.k.y))/w,F=((x.k.y-x.c.y)*(L-x.k.x)+(x.c.x-x.k.x)*(B-x.k.y))/w,X=1-S-F;return S<-.02||F<-.02||X<-.02?null:{a:S,b:F,g:X}},pe=t=>{let g=$(k||A,s,p.width*.36,{x:p.width*.5,y:p.height*.5},c,r),L=Math.max(0,Math.min(1,t.a*g.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*g.cRGB.y+t.b)),x=Math.max(0,Math.min(1,t.a*g.cRGB.z+t.b));A=O({r:L*255,g:B*255,b:x*255},s),R(),m()},Ce=0,_e=0,ve=(t,l)=>{Ce=t,_e=l,p.canvasGL.style.cursor=J(t,l)?"default":"grab"};p.canvasGL.addEventListener("mousemove",t=>{ve(t.clientX,t.clientY)}),p.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)H=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let l=ye(t.clientX,t.clientY);l?(y=!0,k={...A},_=l,pe(l)):J(t.clientX,t.clientY)?(K=!0,k=null,_=null,xe(t.clientX,t.clientY)):(H=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),p.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(y){let l=ye(t.clientX,t.clientY);l&&(_=l,pe(l))}else if(H){let l=t.clientX-q,g=t.clientY-Q;q=t.clientX,Q=t.clientY,I(l,g)}else K&&xe(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{y&&(y=!1),H&&(H=!1,document.body.style.cursor="default"),K&&(K=!1),ve(Ce,_e)}),p.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let l=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+l)),m()},{passive:!1}),p.canvasGL.addEventListener("dblclick",t=>{J(t.clientX,t.clientY)?(u=!u,R()):j(),m()});let Me=t=>{let l=t.target?.tagName;if(!(l==="INPUT"||l==="TEXTAREA"))switch(t.key){case"r":case"R":j();break;case"f":case"F":D(U());break;case"b":case"B":D(N(Math.PI));break;case"t":case"T":D(Z(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),v("y",-5*M);break;case"ArrowRight":t.preventDefault(),v("y",5*M);break;case"ArrowUp":t.preventDefault(),v("x",5*M);break;case"ArrowDown":t.preventDefault(),v("x",-5*M);break}};return window.addEventListener("keydown",Me),m(),R(),{getColor:()=>{let t=V(A,s),l=u?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:l,hsb:oe(l),oklch:te(l),hex:se(l),alpha:1}},setColor:t=>{G=t,A=O(t,s),k=null,_=null,R(),m()},setMode:t=>{s=t,k=null,_=null,R(),m()},getMode:()=>s,setRotation:(t,l)=>{h=Y(l*M,0,t*M),n=U(),i.x=l*M,i.y=0,i.z=t*M,C(),m()},getAxisRotation:()=>({rotXDeg:Math.round(de(i.x*180/Math.PI)*10)/10,rotYDeg:Math.round(de(i.y*180/Math.PI)*10)/10,rotZDeg:Math.round(de(i.z*180/Math.PI)*10)/10}),setAxisRotation:(t,l,g)=>{v("x",he(t*M-i.x)),v("y",he(l*M-i.y)),v("z",he(g*M-i.z))},rotateLocal:(t,l)=>{v(t,l*M)},resetRotation:(t,l,g)=>{h=Y(t*M,l*M,g*M),n=U(),i.x=t*M,i.y=l*M,i.z=g*M,C(),m()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),m()},getZoom:()=>c.zoom||1,setDimensions:(t,l,g)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,l)),r.sizeZ=Math.max(.2,Math.min(2.5,g)),m()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),m()},getRadius:()=>r.radius,getEdgeStyle:()=>({...f}),setEdgeStyle:t=>{f={...f,...t},m()},getGuides:()=>({...b}),setGuides:t=>{b={...b,...t},m()},toggleAllGuides:t=>{let l=t!==void 0?t:!b.vertexX;b={vertexX:l,vertexY:l,vertexZ:l,centerX:l,centerY:l,centerZ:l,angleGuides:l},m()},on:(t,l)=>{T.add(l)},off:(t,l)=>{T.delete(l)},destroy:()=>{z!==null&&cancelAnimationFrame(z),window.removeEventListener("keydown",Me),e.innerHTML=""}}}export{zo as createRoundedBoxPicker};
