var $e={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Ze={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function re(e){let o=e.r/255,i=e.g/255,s=e.b/255,c=Math.max(o,i,s),l=Math.min(o,i,s),n=c-l,b=0;n!==0&&(c===o?b=((i-s)/n+6)%6:c===i?b=(s-o)/n+2:b=(o-i)/n+4,b*=60);let h=c===0?0:n/c*100,y=c*100;return{h:b,s:h,b:y}}function _e(e){let o=e.h,i=e.s/100,s=e.b/100,c=s*i,l=c*(1-Math.abs(o/60%2-1)),n=s-c,b,h,y;return o<60?(b=c,h=l,y=0):o<120?(b=l,h=c,y=0):o<180?(b=0,h=c,y=l):o<240?(b=0,h=l,y=c):o<300?(b=l,h=0,y=c):(b=c,h=0,y=l),{r:Math.round((b+n)*255),g:Math.round((h+n)*255),b:Math.round((y+n)*255)}}function ye(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function pe(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function dt(e){let o=ye(e.r/255),i=ye(e.g/255),s=ye(e.b/255),c=.4122214708*o+.5363325363*i+.0514459929*s,l=.2119034982*o+.6806995451*i+.1073969566*s,n=.0883024619*o+.2817188376*i+.6299787005*s,b=Math.cbrt(c),h=Math.cbrt(l),y=Math.cbrt(n);return{L:.2104542553*b+.793617785*h-.0040720468*y,a:1.9779984951*b-2.428592205*h+.4505937099*y,b:.0259040371*b+.7827717662*h-.808675766*y}}function gt(e,o,i){let s=e+.3963377774*o+.2158037573*i,c=e-.1055613458*o-.0638541728*i,l=e-.0894841775*o-1.291485548*i,n=s*s*s,b=c*c*c,h=l*l*l,y=4.0767416621*n-3.3077115913*b+.2309699292*h,p=-1.2684380046*n+2.6097574011*b-.3413193965*h,f=-.0041960863*n-.7034186147*b+1.707614701*h;return{r:Math.round(Math.max(0,Math.min(1,pe(y)))*255),g:Math.round(Math.max(0,Math.min(1,pe(p)))*255),b:Math.round(Math.max(0,Math.min(1,pe(f)))*255)}}function ge(e){let o=dt(e),i=Math.sqrt(o.a*o.a+o.b*o.b),s=Math.atan2(o.b,o.a)*(180/Math.PI);return s<0&&(s+=360),{l:o.L,c:i,h:i<1e-4?0:s}}function Ce(e){let o=e.h*(Math.PI/180),i=e.c*Math.cos(o),s=e.c*Math.sin(o);return gt(e.l,i,s)}function xt(e,o,i){let s=Ce({l:e,c:o,h:i});if(qe(s))return{l:e,c:o,h:i};let c=0,l=o;for(let n=0;n<20;n++){let b=(c+l)/2;s=Ce({l:e,c:b,h:i}),qe(s)?c=b:l=b}return{l:e,c,h:i}}function qe(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function ve(e){let o=i=>Math.max(0,Math.min(255,Math.round(i))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var je=.4;function Q(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return _e({h:e.x*359,s:e.y*100,b:e.z*100});{let i=e.x,s=e.y*je,c=e.z*359,l=xt(i,s,c);return Ce(l)}}function ee(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let i=re(e);return{x:i.h/359,y:i.s/100,z:i.b/100}}else{let i=ge(e);return{x:i.l,y:Math.min(i.c/je,1),z:i.h/359}}}var Me=Math.PI/180;function ie(){return[1,0,0,0,1,0,0,0,1]}function ue(e){let o=Math.cos(e),i=Math.sin(e);return[1,0,0,0,o,-i,0,i,o]}function me(e){let o=Math.cos(e),i=Math.sin(e);return[o,0,i,0,1,0,-i,0,o]}function Re(e){let o=Math.cos(e),i=Math.sin(e);return[o,i,0,-i,o,0,0,0,1]}function Z(e,o){let i=new Array(9);for(let s=0;s<3;s++)for(let c=0;c<3;c++)i[s*3+c]=e[s*3]*o[c]+e[s*3+1]*o[3+c]+e[s*3+2]*o[6+c];return i}function Ae(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function ze(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function se(e,o,i){return Z(me(o),Z(Re(i),ue(e)))}var Ke={mat:se(8*Me,-20*Me,-55*Me),zoom:1},Qe={sizeX:1,sizeY:1,sizeZ:1,radius:0};function xe(e,o,i){let s=(e.x-.5)*i.sizeX,c=(e.y-.5)*i.sizeY,l=(e.z-.5)*i.sizeZ;return ze(o.mat,{x:s,y:c,z:l})}function $(e,o,i,s,c){let l=xe(e,s,c);return{x:i.x+l.x*o*1.6*s.zoom,y:i.y-l.y*o*1.6*s.zoom}}function fe(e,o,i,s,c,l){let n=Q(e,o),b={x:n.r/255,y:n.g/255,z:n.b/255},h=ee({r:255,g:255,b:255},o),y=ee({r:0,g:0,b:0},o);return{c:$(e,i,s,c,l),w:$(h,i,s,c,l),k:$(y,i,s,c,l),cRGB:b}}var ke=["#ef4444","#22c55e","#3b82f6"];function Je(e,o,i,s,c,l){let n=f=>$(f,o,i,s,c);e.save();let b=n({x:.5,y:.5,z:.5}),h=.35,y=[{from:{x:-h,y:.5,z:.5},to:{x:1+h,y:.5,z:.5},color:ke[0],name:"Cx",visible:l.centerX},{from:{x:.5,y:-h,z:.5},to:{x:.5,y:1+h,z:.5},color:ke[1],name:"Cy",visible:l.centerY},{from:{x:.5,y:.5,z:-h},to:{x:.5,y:.5,z:1+h},color:ke[2],name:"Cz",visible:l.centerZ}],p=!1;for(let f=0;f<y.length;f++){if(!y[f].visible)continue;p=!0;let C=n(y[f].from),v=n(y[f].to);e.beginPath(),e.moveTo(C.x,C.y),e.lineTo(v.x,v.y),e.strokeStyle=y[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(C.x,C.y,3,0,Math.PI*2),e.arc(v.x,v.y,3,0,Math.PI*2),e.fillStyle=y[f].color,e.fill()}p&&(e.beginPath(),e.arc(b.x,b.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var et=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,tt=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,ot=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,nt=`
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
`;var Le=26,Be=44;function at(e,o){let i=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.userSelect="none";let c=document.createElement("canvas");c.width=o*i,c.height=o*i,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let l=document.createElement("canvas");l.width=o*i,l.height=o*i,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0",l.style.pointerEvents="none",s.appendChild(c),s.appendChild(l),e.appendChild(s);let n=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),b=l.getContext("2d");b.scale(i,i);let h=(k,F)=>{let R=n.createShader(k);return n.shaderSource(R,F),n.compileShader(R),n.getShaderParameter(R,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(R)),R},y=h(n.VERTEX_SHADER,et),p=h(n.FRAGMENT_SHADER,nt),f=n.createProgram();n.attachShader(f,y),n.attachShader(f,p),n.linkProgram(f);let C=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,C),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let v=n.getAttribLocation(f,"position");n.enableVertexAttribArray(v),n.vertexAttribPointer(v,2,n.FLOAT,!1,0,0);let H=h(n.VERTEX_SHADER,tt),E=h(n.FRAGMENT_SHADER,ot),z=n.createProgram();n.attachShader(z,H),n.attachShader(z,E),n.linkProgram(z);let u=n.getAttribLocation(z,"a_pos"),r=n.getAttribLocation(z,"a_color"),S=n.getUniformLocation(z,"u_alpha"),D=n.createBuffer(),P={u_resolution:n.getUniformLocation(f,"u_resolution"),u_box_size:n.getUniformLocation(f,"u_box_size"),u_radius:n.getUniformLocation(f,"u_radius"),u_mat:n.getUniformLocation(f,"u_mat"),u_mat_inv:n.getUniformLocation(f,"u_mat_inv"),u_zoom:n.getUniformLocation(f,"u_zoom"),u_mode:n.getUniformLocation(f,"u_mode"),u_invert:n.getUniformLocation(f,"u_invert"),u_show_front:n.getUniformLocation(f,"u_show_front"),u_show_back:n.getUniformLocation(f,"u_show_back"),u_front_width:n.getUniformLocation(f,"u_front_width"),u_back_width:n.getUniformLocation(f,"u_back_width"),u_front_dashed:n.getUniformLocation(f,"u_front_dashed"),u_back_dashed:n.getUniformLocation(f,"u_back_dashed"),u_front_color:n.getUniformLocation(f,"u_front_color"),u_back_color:n.getUniformLocation(f,"u_back_color")};return{gl:n,overlayCtx:b,canvasGL:c,canvasOverlay:l,width:o,height:o,program:f,uniforms:P,posBuffer:C,posAttr:v,triProgram:z,triPosAttr:u,triColorAttr:r,triAlphaLoc:S,triBuffer:D}}var rt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function yt(e,o,i,s,c,l){if(!l.showFront&&!l.showBack)return;let n=p=>$(p,o,i,s,c),h=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),y=p=>{let f=xe({x:.5,y:.5,z:.5},s,c);return xe({x:.5+p.x*.1,y:.5+p.y*.1,z:.5+p.z*.1},s,c).z-f.z>0};if(e.save(),l.showBack){e.lineWidth=l.backWidth,l.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.backColor,e.globalAlpha=l.backOpacity;for(let p of rt)if(!(y(p.normalA)||y(p.normalB))){let[C,v]=p.edge;e.beginPath(),e.moveTo(h[C].x,h[C].y),e.lineTo(h[v].x,h[v].y),e.stroke()}}if(l.showFront){e.lineWidth=l.frontWidth,l.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=l.frontColor,e.globalAlpha=l.frontOpacity;for(let p of rt)if(y(p.normalA)||y(p.normalB)){let[C,v]=p.edge;e.beginPath(),e.moveTo(h[C].x,h[C].y),e.lineTo(h[v].x,h[v].y),e.stroke()}}e.restore()}function it(e,o,i,s,c,l,n,b,h,y,p,f,C,v,H,E,z){let{gl:u,overlayCtx:r,width:S,height:D,program:P,uniforms:k}=e,F=window.devicePixelRatio||1;u.viewport(0,0,S*F,D*F),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(P),u.uniform2f(k.u_resolution,S*F,D*F),u.uniform3f(k.u_box_size,i.sizeX,i.sizeY,i.sizeZ),u.uniform1f(k.u_radius,i.radius!==void 0?i.radius:.001);let R=o.mat;u.uniformMatrix3fv(k.u_mat,!1,new Float32Array([R[0],R[3],R[6],R[1],R[4],R[7],R[2],R[5],R[8]])),u.uniformMatrix3fv(k.u_mat_inv,!1,new Float32Array([R[0],R[1],R[2],R[3],R[4],R[5],R[6],R[7],R[8]])),u.uniform1f(k.u_zoom,o.zoom||1),u.uniform1i(k.u_mode,s==="rgb"?0:s==="hsb"?1:2),u.uniform1i(k.u_invert,c?1:0),u.uniform1i(k.u_show_front,n.showFront?1:0),u.uniform1i(k.u_show_back,n.showBack?1:0),u.uniform1f(k.u_front_width,n.frontWidth||1.5),u.uniform1f(k.u_back_width,n.backWidth||1),u.uniform1i(k.u_front_dashed,n.frontDashed?1:0),u.uniform1i(k.u_back_dashed,n.backDashed?1:0),u.uniform4f(k.u_front_color,1,1,1,n.frontOpacity||.65),u.uniform4f(k.u_back_color,1,1,1,n.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let q=S*.36,I={x:S*.5,y:D*.5},O=null,V=null,J=f||C>.001;if(l.svTriangle&&J){let d=fe(y||b,s,q,I,o,i);Math.abs((d.w.x-d.c.x)*(d.k.y-d.c.y)-(d.w.y-d.c.y)*(d.k.x-d.c.x))>4?O=d:V=d}let X=C<.5?2*C*C:1-Math.pow(-2*C+2,2)/2;if(O&&X<.01&&(O=null),O){let d=G=>[G.x/S*2-1,1-G.y/D*2],L=O,g=G=>({x:L.c.x+(G.x-L.c.x)*X,y:L.c.y+(G.y-L.c.y)*X}),A=d(L.c),x=d(g(L.w)),B=d(g(L.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([A[0],A[1],L.cRGB.x,L.cRGB.y,L.cRGB.z,x[0],x[1],1,1,1,B[0],B[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(P),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(r.save(),r.clearRect(0,0,S,D),yt(r,q,I,o,i,n),Je(r,q,I,o,i,l),V){let d=V;r.save(),r.globalAlpha=C,r.beginPath(),r.moveTo(d.k.x,d.k.y),r.lineTo(d.w.x,d.w.y),r.strokeStyle="rgba(107, 114, 128, 0.7)",r.lineWidth=1.2,r.setLineDash([5,4]),r.stroke(),r.setLineDash([]),r.restore()}if(O){let d=O,L=j=>({x:d.c.x+(j.x-d.c.x)*X,y:d.c.y+(j.y-d.c.y)*X}),g=L(d.w),A=L(d.k),x=Math.round(d.cRGB.x*255),B=Math.round(d.cRGB.y*255),G=Math.round(d.cRGB.z*255);if(r.save(),r.globalAlpha=C,r.beginPath(),r.moveTo(d.c.x,d.c.y),r.lineTo(g.x,g.y),r.lineTo(A.x,A.y),r.closePath(),r.strokeStyle=`rgba(${x}, ${B}, ${G}, 0.7)`,r.lineWidth=1.2,r.setLineDash([]),r.stroke(),r.beginPath(),r.arc(g.x,g.y,3.5,0,Math.PI*2),r.fillStyle="#ffffff",r.fill(),r.strokeStyle="rgba(17, 24, 39, 0.6)",r.lineWidth=1.2,r.stroke(),r.beginPath(),r.arc(A.x,A.y,3.5,0,Math.PI*2),r.fillStyle="#111827",r.fill(),r.strokeStyle="rgba(255, 255, 255, 0.7)",r.lineWidth=1.2,r.stroke(),p){let j=p.a*d.c.x+p.b*g.x+p.g*A.x,W=p.a*d.c.y+p.b*g.y+p.g*A.y;r.beginPath(),r.arc(j,W,4,0,Math.PI*2),r.fillStyle="#ffffff",r.fill(),r.strokeStyle="rgba(17, 24, 39, 0.75)",r.lineWidth=1.4,r.stroke()}r.restore()}if(h&&!p){let d=$(b,q,I,o,i),L=Q(b,s),g=c?{r:255-L.r,g:255-L.g,b:255-L.b}:L;if(z<1){r.save(),r.beginPath(),r.arc(d.x,d.y,6,0,Math.PI*2),r.clip();let A=4;for(let x=-8;x<8;x+=A)for(let B=-8;B<8;B+=A)r.fillStyle=(B+x)/A%2===0?"#cbd5e1":"#f1f5f9",r.fillRect(d.x+B,d.y+x,A,A);r.restore()}r.beginPath(),r.arc(d.x,d.y,6,0,Math.PI*2),r.fillStyle=z<1?`rgba(${g.r}, ${g.g}, ${g.b}, ${z})`:`rgb(${g.r}, ${g.g}, ${g.b})`,r.fill(),r.strokeStyle="#ffffff",r.lineWidth=2,r.stroke()}if(v&&H>.01){let d=H<.5?2*H*H:1-Math.pow(-2*H+2,2)/2,L=Le*d,g=Be*d,A=Q(b,s),x=c?{r:255-A.r,g:255-A.g,b:255-A.b}:A,B=re(x),G=-Math.PI/2;r.save(),r.globalAlpha=Math.min(1,d+.15);let j=(W,le,te,oe,ae)=>{r.lineWidth=oe?5:3.5,r.beginPath(),r.arc(v.x,v.y,W,0,Math.PI*2),r.strokeStyle="rgba(148, 163, 184, 0.4)",r.stroke();let ne=G+le*Math.PI*2;le>.001&&(r.beginPath(),r.arc(v.x,v.y,W,G,ne),ae?(r.strokeStyle="rgba(255, 255, 255, 0.95)",r.stroke(),r.beginPath(),r.arc(v.x,v.y,W,G,ne),r.strokeStyle=`rgba(${x.r}, ${x.g}, ${x.b}, ${z})`,r.stroke()):(r.strokeStyle=`rgb(${x.r}, ${x.g}, ${x.b})`,r.stroke())),r.fillStyle=oe?"#f8fafc":"rgba(203, 213, 225, 0.85)",r.font="9px ui-monospace, SF Mono, monospace",r.textAlign="center",r.textBaseline="alphabetic",r.fillText(te,v.x,v.y-W+1)};j(g,B.s/100,"SAT",E==="sat",!1),j(L,z,"A",E==="alpha",!0),r.restore()}r.restore()}var w=Math.PI/180,be=2*Math.PI,Te=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},we=e=>{let o=e%be;return o>Math.PI?o-=be:o<-Math.PI&&(o+=be),o},pt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,st=(e,o)=>{let i=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${i(e.r)}${i(e.g)}${i(e.b)}${i(o*255)}`};function Zt(e,o={}){let i=o.size||460,s=o.mode||"rgb",c=!1,l={...Ke},n={...Qe,radius:.08},b={...Ze},h={...$e},y={x:8*w,y:-20*w,z:-55*w},p=se(y.x,y.y,y.z),f=ie(),C={...y},v=()=>{l.mat=Z(f,p)},H=o.initialColor||{r:255,g:255,b:255},E=ee(H,s),z=1,u=!1,r=null,S=null,D=!1,P=0,k=0,F=null,R=t=>{if(k=t,F!==null)return;let a=performance.now(),m=6,M=T=>{let _=Math.min(.05,(T-a)/1e3);a=T,k>P?P=Math.min(k,P+_*m):P=Math.max(k,P-_*m),x(),Math.abs(P-k)<.001?(P=k,F=null):F=requestAnimationFrame(M)};F=requestAnimationFrame(M)},q=!1,I=null,O=null,V=0,J=0,X=null,d=t=>{if(J=t,X!==null)return;let a=performance.now(),m=6,M=T=>{let _=Math.min(.05,(T-a)/1e3);a=T,J>V?V=Math.min(J,V+_*m):V=Math.max(J,V-_*m),x(),Math.abs(V-J)<.001?(V=J,X=null):X=requestAnimationFrame(M)};X=requestAnimationFrame(M)},L=new Set,g=at(e,i),A=null,x=()=>{A===null&&(A=requestAnimationFrame(()=>{A=null,it(g,l,n,s,c,b,h,E,!0,r,S,D,P,I,V,O,z)}))},B=()=>{let t=Q(E,s),a=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t,m=re(a),M=ge(a),T=z<1?st(a,z):ve(a),_={rgb:a,hsb:m,oklch:M,hex:T,alpha:z};L.forEach(Y=>Y(_))},G=(t,a)=>{a!==0&&(t==="x"?(p=Z(p,ue(a)),C.x+=a):t==="y"?(p=Z(p,me(a)),C.y+=a):(p=Z(p,Re(a)),C.z+=a),v(),x())},j=(t,a)=>{f=Z(me(t*.01),f),f=Z(ue(-a*.01),f),v(),x()},W=t=>{f=Z(t,Ae(p)),v(),x()},le=()=>{p=se(y.x,y.y,y.z),f=ie(),C={...y},l.zoom=1,v(),x()},te=!1,oe=!1,ae=0,ne=0,Ge=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),lt=()=>{let t=Ge();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},ct=t=>{let a=Ge(),m=lt(),M=Math.abs(t.x)-(a.x-m),T=Math.abs(t.y)-(a.y-m),_=Math.abs(t.z)-(a.z-m),Y=Math.max(M,0),N=Math.max(T,0),U=Math.max(_,0),K=Math.hypot(Y,N,U),ce=Math.min(Math.max(M,Math.max(T,_)),0);return K+ce-m},he=(t,a)=>{let m=g.canvasGL.getBoundingClientRect(),M=(t-m.left)*(g.width/m.width),T=(a-m.top)*(g.height/m.height),_=M-g.width*.5,Y=g.height*.5-T,N=g.width*.36*1.6*(l.zoom||1),U={x:_/N,y:Y/N},K=de=>ze(Ae(l.mat),de),ce=0,He=null;for(let de=0;de<96;de++){let ht={x:U.x,y:U.y,z:-5+ce},We=K(ht),Ne=ct(We);if(Ne<.001){He=We;break}if(ce+=Ne,ce>10)break}return He},Ee=(t,a)=>{let m=he(t,a);if(!m)return;let M=Math.max(0,Math.min(1,m.x/n.sizeX+.5)),T=Math.max(0,Math.min(1,m.y/n.sizeY+.5)),_=Math.max(0,Math.min(1,m.z/n.sizeZ+.5));E={x:M,y:T,z:_},B(),x()},Se=(t,a)=>{let m=g.canvasGL.getBoundingClientRect();return{x:(t-m.left)*(g.width/m.width),y:(a-m.top)*(g.height/m.height)}},De=()=>$(E,g.width*.36,{x:g.width*.5,y:g.height*.5},l,n),ut=(t,a)=>{let m=Se(t,a),M=De();return Math.hypot(m.x-M.x,m.y-M.y)<=14},mt=t=>{z=Math.max(0,Math.min(1,t)),B(),x()},ft=t=>{let a=Q(E,s),m=re(a);m.s=Math.max(0,Math.min(100,t*100)),E=ee(_e(m),s),B(),x()},bt=t=>{let a=t.x-I.x,m=t.y-I.y,M=Math.atan2(a,-m);return M<0&&(M+=be),M/be},Pe=(t,a)=>{if(!b.svTriangle)return null;let m=g.canvasGL.getBoundingClientRect(),M=(t-m.left)*(g.width/m.width),T=(a-m.top)*(g.height/m.height),_=fe(r||E,s,g.width*.36,{x:g.width*.5,y:g.height*.5},l,n),Y=(_.w.y-_.k.y)*(_.c.x-_.k.x)+(_.k.x-_.w.x)*(_.c.y-_.k.y);if(Math.abs(Y)<1e-6)return null;let N=((_.w.y-_.k.y)*(M-_.k.x)+(_.k.x-_.w.x)*(T-_.k.y))/Y,U=((_.k.y-_.c.y)*(M-_.k.x)+(_.c.x-_.k.x)*(T-_.k.y))/Y,K=1-N-U;return N<-.02||U<-.02||K<-.02?null:{a:N,b:U,g:K}},Fe=t=>{let m=fe(r||E,s,g.width*.36,{x:g.width*.5,y:g.height*.5},l,n),M=Math.max(0,Math.min(1,t.a*m.cRGB.x+t.b)),T=Math.max(0,Math.min(1,t.a*m.cRGB.y+t.b)),_=Math.max(0,Math.min(1,t.a*m.cRGB.z+t.b));E=ee({r:M*255,g:T*255,b:_*255},s),B(),x()},Ve=0,Ie=0,Oe=(t,a)=>{Ve=t,Ie=a,g.canvasGL.style.cursor=he(t,a)?"default":"grab"};g.canvasGL.addEventListener("mousemove",t=>{Oe(t.clientX,t.clientY)}),g.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)te=!0,ae=t.clientX,ne=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let a=D?Pe(t.clientX,t.clientY):null;a?(u=!0,r={...E},S=a,Fe(a)):!D&&ut(t.clientX,t.clientY)?(q=!0,I=De(),O=null,r=null,S=null,t.preventDefault(),d(1)):he(t.clientX,t.clientY)?(oe=!0,r=null,S=null,Ee(t.clientX,t.clientY)):(te=!0,ae=t.clientX,ne=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),g.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(q&&I){let a=Se(t.clientX,t.clientY),m=Math.hypot(a.x-I.x,a.y-I.y),M=pt(V),T=Le*M,_=Be*M,Y=Math.abs(m-_)<=7,N=Math.abs(m-T)<=7,U=Y?"sat":N?"alpha":null;if(O=U,U){let K=bt(a);U==="alpha"?mt(K):ft(K)}else x()}else if(u){let a=Pe(t.clientX,t.clientY);a&&(S=a,Fe(a))}else if(te){let a=t.clientX-ae,m=t.clientY-ne;ae=t.clientX,ne=t.clientY,j(a,m)}else oe&&Ee(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{q&&(q=!1,O=null,d(0)),u&&(u=!1),te&&(te=!1,document.body.style.cursor="default"),oe&&(oe=!1),Oe(Ve,Ie)}),g.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let a=t.deltaY<0?.08:-.08;l.zoom=Math.max(.2,Math.min(2.5,(l.zoom||1)+a)),x()},{passive:!1}),g.canvasGL.addEventListener("dblclick",t=>{he(t.clientX,t.clientY)?(c=!c,B()):le(),x()});let Xe=t=>{if(t.key==="Shift"){D||(D=!0,r=null,S=null,R(1));return}let a=t.target?.tagName;if(!(a==="INPUT"||a==="TEXTAREA"))switch(t.key){case"r":case"R":le();break;case"f":case"F":W(ie());break;case"b":case"B":W(me(Math.PI));break;case"t":case"T":W(ue(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),G("y",-5*w);break;case"ArrowRight":t.preventDefault(),G("y",5*w);break;case"ArrowUp":t.preventDefault(),G("x",5*w);break;case"ArrowDown":t.preventDefault(),G("x",-5*w);break}};window.addEventListener("keydown",Xe);let Ue=t=>{t.key==="Shift"&&D&&(D=!1,R(0))};window.addEventListener("keyup",Ue);let Ye=()=>{D&&(D=!1,R(0))};return window.addEventListener("blur",Ye),x(),B(),{getColor:()=>{let t=Q(E,s),a=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:a,hsb:re(a),oklch:ge(a),hex:z<1?st(a,z):ve(a),alpha:z}},setColor:t=>{H=t,E=ee(t,s),t.a!==void 0&&(z=Math.max(0,Math.min(1,t.a))),r=null,S=null,B(),x()},setMode:t=>{s=t,r=null,S=null,B(),x()},getMode:()=>s,setRotation:(t,a)=>{p=se(a*w,0,t*w),f=ie(),C.x=a*w,C.y=0,C.z=t*w,v(),x()},getAxisRotation:()=>({rotXDeg:Math.round(Te(C.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Te(C.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Te(C.z*180/Math.PI)*10)/10}),setAxisRotation:(t,a,m)=>{G("x",we(t*w-C.x)),G("y",we(a*w-C.y)),G("z",we(m*w-C.z))},rotateLocal:(t,a)=>{G(t,a*w)},resetRotation:(t,a,m)=>{p=se(t*w,a*w,m*w),f=ie(),C.x=t*w,C.y=a*w,C.z=m*w,v(),x()},setZoom:t=>{l.zoom=Math.max(.1,Math.min(3,t)),x()},getZoom:()=>l.zoom||1,setDimensions:(t,a,m)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,a)),n.sizeZ=Math.max(.2,Math.min(2.5,m)),x()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),x()},getRadius:()=>n.radius,setAlpha:t=>{z=Math.max(0,Math.min(1,t)),B(),x()},getAlpha:()=>z,getEdgeStyle:()=>({...h}),setEdgeStyle:t=>{h={...h,...t},x()},getGuides:()=>({...b}),setGuides:t=>{b={...b,...t},x()},toggleAllGuides:t=>{let a=t!==void 0?t:!b.vertexX;b={vertexX:a,vertexY:a,vertexZ:a,centerX:a,centerY:a,centerZ:a,angleGuides:a,svTriangle:b.svTriangle},x()},on:(t,a)=>{L.add(a)},off:(t,a)=>{L.delete(a)},destroy:()=>{A!==null&&cancelAnimationFrame(A),F!==null&&cancelAnimationFrame(F),X!==null&&cancelAnimationFrame(X),window.removeEventListener("keydown",Xe),window.removeEventListener("keyup",Ue),window.removeEventListener("blur",Ye),e.innerHTML=""}}}export{Zt as createRoundedBoxPicker};
