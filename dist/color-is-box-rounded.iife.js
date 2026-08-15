var ColorIsBoxRounded=(()=>{var ye=Object.defineProperty;var gt=Object.getOwnPropertyDescriptor;var xt=Object.getOwnPropertyNames;var yt=Object.prototype.hasOwnProperty;var pt=(e,o)=>{for(var a in o)ye(e,a,{get:o[a],enumerable:!0})},Ct=(e,o,a,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let l of xt(o))!yt.call(e,l)&&l!==a&&ye(e,l,{get:()=>o[l],enumerable:!(s=gt(o,l))||s.enumerable});return e};var _t=e=>Ct(ye({},"__esModule",{value:!0}),e);var Lt={};pt(Lt,{createRoundedBoxPicker:()=>kt});var Ze={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},qe={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function re(e){let o=e.r/255,a=e.g/255,s=e.b/255,l=Math.max(o,a,s),c=Math.min(o,a,s),n=l-c,b=0;n!==0&&(l===o?b=((a-s)/n+6)%6:l===a?b=(s-o)/n+2:b=(o-a)/n+4,b*=60);let h=l===0?0:n/l*100,y=l*100;return{h:b,s:h,b:y}}function ve(e){let o=e.h,a=e.s/100,s=e.b/100,l=s*a,c=l*(1-Math.abs(o/60%2-1)),n=s-l,b,h,y;return o<60?(b=l,h=c,y=0):o<120?(b=c,h=l,y=0):o<180?(b=0,h=l,y=c):o<240?(b=0,h=c,y=l):o<300?(b=c,h=0,y=l):(b=l,h=0,y=c),{r:Math.round((b+n)*255),g:Math.round((h+n)*255),b:Math.round((y+n)*255)}}function pe(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ce(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function vt(e){let o=pe(e.r/255),a=pe(e.g/255),s=pe(e.b/255),l=.4122214708*o+.5363325363*a+.0514459929*s,c=.2119034982*o+.6806995451*a+.1073969566*s,n=.0883024619*o+.2817188376*a+.6299787005*s,b=Math.cbrt(l),h=Math.cbrt(c),y=Math.cbrt(n);return{L:.2104542553*b+.793617785*h-.0040720468*y,a:1.9779984951*b-2.428592205*h+.4505937099*y,b:.0259040371*b+.7827717662*h-.808675766*y}}function Mt(e,o,a){let s=e+.3963377774*o+.2158037573*a,l=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,n=s*s*s,b=l*l*l,h=c*c*c,y=4.0767416621*n-3.3077115913*b+.2309699292*h,p=-1.2684380046*n+2.6097574011*b-.3413193965*h,f=-.0041960863*n-.7034186147*b+1.707614701*h;return{r:Math.round(Math.max(0,Math.min(1,Ce(y)))*255),g:Math.round(Math.max(0,Math.min(1,Ce(p)))*255),b:Math.round(Math.max(0,Math.min(1,Ce(f)))*255)}}function ge(e){let o=vt(e),a=Math.sqrt(o.a*o.a+o.b*o.b),s=Math.atan2(o.b,o.a)*(180/Math.PI);return s<0&&(s+=360),{l:o.L,c:a,h:a<1e-4?0:s}}function _e(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),s=e.c*Math.sin(o);return Mt(e.l,a,s)}function Rt(e,o,a){let s=_e({l:e,c:o,h:a});if(je(s))return{l:e,c:o,h:a};let l=0,c=o;for(let n=0;n<20;n++){let b=(l+c)/2;s=_e({l:e,c:b,h:a}),je(s)?l=b:c=b}return{l:e,c:l,h:a}}function je(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Me(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Ke=.4;function Q(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return ve({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,s=e.y*Ke,l=e.z*359,c=Rt(a,s,l);return _e(c)}}function ee(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=re(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ge(e);return{x:a.l,y:Math.min(a.c/Ke,1),z:a.h/359}}}var Re=Math.PI/180;function ie(){return[1,0,0,0,1,0,0,0,1]}function ue(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function me(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function Ae(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function Z(e,o){let a=new Array(9);for(let s=0;s<3;s++)for(let l=0;l<3;l++)a[s*3+l]=e[s*3]*o[l]+e[s*3+1]*o[3+l]+e[s*3+2]*o[6+l];return a}function ze(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function ke(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function se(e,o,a){return Z(me(o),Z(Ae(a),ue(e)))}var Qe={mat:se(8*Re,-20*Re,-55*Re),zoom:1},Je={sizeX:1,sizeY:1,sizeZ:1,radius:0};function xe(e,o,a){let s=(e.x-.5)*a.sizeX,l=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return ke(o.mat,{x:s,y:l,z:c})}function $(e,o,a,s,l){let c=xe(e,s,l);return{x:a.x+c.x*o*1.6*s.zoom,y:a.y-c.y*o*1.6*s.zoom}}function fe(e,o,a,s,l,c){let n=Q(e,o),b={x:n.r/255,y:n.g/255,z:n.b/255},h=ee({r:255,g:255,b:255},o),y=ee({r:0,g:0,b:0},o);return{c:$(e,a,s,l,c),w:$(h,a,s,l,c),k:$(y,a,s,l,c),cRGB:b}}var Le=["#ef4444","#22c55e","#3b82f6"];function et(e,o,a,s,l,c){let n=f=>$(f,o,a,s,l);e.save();let b=n({x:.5,y:.5,z:.5}),h=.35,y=[{from:{x:-h,y:.5,z:.5},to:{x:1+h,y:.5,z:.5},color:Le[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-h,z:.5},to:{x:.5,y:1+h,z:.5},color:Le[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-h},to:{x:.5,y:.5,z:1+h},color:Le[2],name:"Cz",visible:c.centerZ}],p=!1;for(let f=0;f<y.length;f++){if(!y[f].visible)continue;p=!0;let C=n(y[f].from),v=n(y[f].to);e.beginPath(),e.moveTo(C.x,C.y),e.lineTo(v.x,v.y),e.strokeStyle=y[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(C.x,C.y,3,0,Math.PI*2),e.arc(v.x,v.y,3,0,Math.PI*2),e.fillStyle=y[f].color,e.fill()}p&&(e.beginPath(),e.arc(b.x,b.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var tt=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ot=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,nt=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,rt=`
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
`;var Be=26,Te=44;function it(e,o){let a=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.userSelect="none";let l=document.createElement("canvas");l.width=o*a,l.height=o*a,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",s.appendChild(l),s.appendChild(c),e.appendChild(s);let n=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),b=c.getContext("2d");b.scale(a,a);let h=(k,F)=>{let R=n.createShader(k);return n.shaderSource(R,F),n.compileShader(R),n.getShaderParameter(R,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(R)),R},y=h(n.VERTEX_SHADER,tt),p=h(n.FRAGMENT_SHADER,rt),f=n.createProgram();n.attachShader(f,y),n.attachShader(f,p),n.linkProgram(f);let C=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,C),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let v=n.getAttribLocation(f,"position");n.enableVertexAttribArray(v),n.vertexAttribPointer(v,2,n.FLOAT,!1,0,0);let H=h(n.VERTEX_SHADER,ot),E=h(n.FRAGMENT_SHADER,nt),z=n.createProgram();n.attachShader(z,H),n.attachShader(z,E),n.linkProgram(z);let u=n.getAttribLocation(z,"a_pos"),r=n.getAttribLocation(z,"a_color"),S=n.getUniformLocation(z,"u_alpha"),D=n.createBuffer(),P={u_resolution:n.getUniformLocation(f,"u_resolution"),u_box_size:n.getUniformLocation(f,"u_box_size"),u_radius:n.getUniformLocation(f,"u_radius"),u_mat:n.getUniformLocation(f,"u_mat"),u_mat_inv:n.getUniformLocation(f,"u_mat_inv"),u_zoom:n.getUniformLocation(f,"u_zoom"),u_mode:n.getUniformLocation(f,"u_mode"),u_invert:n.getUniformLocation(f,"u_invert"),u_show_front:n.getUniformLocation(f,"u_show_front"),u_show_back:n.getUniformLocation(f,"u_show_back"),u_front_width:n.getUniformLocation(f,"u_front_width"),u_back_width:n.getUniformLocation(f,"u_back_width"),u_front_dashed:n.getUniformLocation(f,"u_front_dashed"),u_back_dashed:n.getUniformLocation(f,"u_back_dashed"),u_front_color:n.getUniformLocation(f,"u_front_color"),u_back_color:n.getUniformLocation(f,"u_back_color")};return{gl:n,overlayCtx:b,canvasGL:l,canvasOverlay:c,width:o,height:o,program:f,uniforms:P,posBuffer:C,posAttr:v,triProgram:z,triPosAttr:u,triColorAttr:r,triAlphaLoc:S,triBuffer:D}}var at=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function At(e,o,a,s,l,c){if(!c.showFront&&!c.showBack)return;let n=p=>$(p,o,a,s,l),h=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),y=p=>{let f=xe({x:.5,y:.5,z:.5},s,l);return xe({x:.5+p.x*.1,y:.5+p.y*.1,z:.5+p.z*.1},s,l).z-f.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let p of at)if(!(y(p.normalA)||y(p.normalB))){let[C,v]=p.edge;e.beginPath(),e.moveTo(h[C].x,h[C].y),e.lineTo(h[v].x,h[v].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let p of at)if(y(p.normalA)||y(p.normalB)){let[C,v]=p.edge;e.beginPath(),e.moveTo(h[C].x,h[C].y),e.lineTo(h[v].x,h[v].y),e.stroke()}}e.restore()}function st(e,o,a,s,l,c,n,b,h,y,p,f,C,v,H,E,z){let{gl:u,overlayCtx:r,width:S,height:D,program:P,uniforms:k}=e,F=window.devicePixelRatio||1;u.viewport(0,0,S*F,D*F),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(P),u.uniform2f(k.u_resolution,S*F,D*F),u.uniform3f(k.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(k.u_radius,a.radius!==void 0?a.radius:.001);let R=o.mat;u.uniformMatrix3fv(k.u_mat,!1,new Float32Array([R[0],R[3],R[6],R[1],R[4],R[7],R[2],R[5],R[8]])),u.uniformMatrix3fv(k.u_mat_inv,!1,new Float32Array([R[0],R[1],R[2],R[3],R[4],R[5],R[6],R[7],R[8]])),u.uniform1f(k.u_zoom,o.zoom||1),u.uniform1i(k.u_mode,s==="rgb"?0:s==="hsb"?1:2),u.uniform1i(k.u_invert,l?1:0),u.uniform1i(k.u_show_front,n.showFront?1:0),u.uniform1i(k.u_show_back,n.showBack?1:0),u.uniform1f(k.u_front_width,n.frontWidth||1.5),u.uniform1f(k.u_back_width,n.backWidth||1),u.uniform1i(k.u_front_dashed,n.frontDashed?1:0),u.uniform1i(k.u_back_dashed,n.backDashed?1:0),u.uniform4f(k.u_front_color,1,1,1,n.frontOpacity||.65),u.uniform4f(k.u_back_color,1,1,1,n.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let q=S*.36,I={x:S*.5,y:D*.5},O=null,V=null,J=f||C>.001;if(c.svTriangle&&J){let d=fe(y||b,s,q,I,o,a);Math.abs((d.w.x-d.c.x)*(d.k.y-d.c.y)-(d.w.y-d.c.y)*(d.k.x-d.c.x))>4?O=d:V=d}let X=C<.5?2*C*C:1-Math.pow(-2*C+2,2)/2;if(O&&X<.01&&(O=null),O){let d=G=>[G.x/S*2-1,1-G.y/D*2],L=O,g=G=>({x:L.c.x+(G.x-L.c.x)*X,y:L.c.y+(G.y-L.c.y)*X}),A=d(L.c),x=d(g(L.w)),B=d(g(L.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([A[0],A[1],L.cRGB.x,L.cRGB.y,L.cRGB.z,x[0],x[1],1,1,1,B[0],B[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(P),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(r.save(),r.clearRect(0,0,S,D),At(r,q,I,o,a,n),et(r,q,I,o,a,c),V){let d=V;r.save(),r.globalAlpha=C,r.beginPath(),r.moveTo(d.k.x,d.k.y),r.lineTo(d.w.x,d.w.y),r.strokeStyle="rgba(107, 114, 128, 0.7)",r.lineWidth=1.2,r.setLineDash([5,4]),r.stroke(),r.setLineDash([]),r.restore()}if(O){let d=O,L=j=>({x:d.c.x+(j.x-d.c.x)*X,y:d.c.y+(j.y-d.c.y)*X}),g=L(d.w),A=L(d.k),x=Math.round(d.cRGB.x*255),B=Math.round(d.cRGB.y*255),G=Math.round(d.cRGB.z*255);if(r.save(),r.globalAlpha=C,r.beginPath(),r.moveTo(d.c.x,d.c.y),r.lineTo(g.x,g.y),r.lineTo(A.x,A.y),r.closePath(),r.strokeStyle=`rgba(${x}, ${B}, ${G}, 0.7)`,r.lineWidth=1.2,r.setLineDash([]),r.stroke(),r.beginPath(),r.arc(g.x,g.y,3.5,0,Math.PI*2),r.fillStyle="#ffffff",r.fill(),r.strokeStyle="rgba(17, 24, 39, 0.6)",r.lineWidth=1.2,r.stroke(),r.beginPath(),r.arc(A.x,A.y,3.5,0,Math.PI*2),r.fillStyle="#111827",r.fill(),r.strokeStyle="rgba(255, 255, 255, 0.7)",r.lineWidth=1.2,r.stroke(),p){let j=p.a*d.c.x+p.b*g.x+p.g*A.x,W=p.a*d.c.y+p.b*g.y+p.g*A.y;r.beginPath(),r.arc(j,W,4,0,Math.PI*2),r.fillStyle="#ffffff",r.fill(),r.strokeStyle="rgba(17, 24, 39, 0.75)",r.lineWidth=1.4,r.stroke()}r.restore()}if(h&&!p){let d=$(b,q,I,o,a),L=Q(b,s),g=l?{r:255-L.r,g:255-L.g,b:255-L.b}:L;if(z<1){r.save(),r.beginPath(),r.arc(d.x,d.y,6,0,Math.PI*2),r.clip();let A=4;for(let x=-8;x<8;x+=A)for(let B=-8;B<8;B+=A)r.fillStyle=(B+x)/A%2===0?"#cbd5e1":"#f1f5f9",r.fillRect(d.x+B,d.y+x,A,A);r.restore()}r.beginPath(),r.arc(d.x,d.y,6,0,Math.PI*2),r.fillStyle=z<1?`rgba(${g.r}, ${g.g}, ${g.b}, ${z})`:`rgb(${g.r}, ${g.g}, ${g.b})`,r.fill(),r.strokeStyle="#ffffff",r.lineWidth=2,r.stroke()}if(v&&H>.01){let d=H<.5?2*H*H:1-Math.pow(-2*H+2,2)/2,L=Be*d,g=Te*d,A=Q(b,s),x=l?{r:255-A.r,g:255-A.g,b:255-A.b}:A,B=re(x),G=-Math.PI/2;r.save(),r.globalAlpha=Math.min(1,d+.15);let j=(W,le,te,oe,ae)=>{r.lineWidth=oe?5:3.5,r.beginPath(),r.arc(v.x,v.y,W,0,Math.PI*2),r.strokeStyle="rgba(148, 163, 184, 0.4)",r.stroke();let ne=G+le*Math.PI*2;le>.001&&(r.beginPath(),r.arc(v.x,v.y,W,G,ne),ae?(r.strokeStyle="rgba(255, 255, 255, 0.95)",r.stroke(),r.beginPath(),r.arc(v.x,v.y,W,G,ne),r.strokeStyle=`rgba(${x.r}, ${x.g}, ${x.b}, ${z})`,r.stroke()):(r.strokeStyle=`rgb(${x.r}, ${x.g}, ${x.b})`,r.stroke())),r.fillStyle=oe?"#f8fafc":"rgba(203, 213, 225, 0.85)",r.font="9px ui-monospace, SF Mono, monospace",r.textAlign="center",r.textBaseline="alphabetic",r.fillText(te,v.x,v.y-W+1)};j(g,B.s/100,"SAT",E==="sat",!1),j(L,z,"A",E==="alpha",!0),r.restore()}r.restore()}var w=Math.PI/180,be=2*Math.PI,we=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},Ge=e=>{let o=e%be;return o>Math.PI?o-=be:o<-Math.PI&&(o+=be),o},zt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,lt=(e,o)=>{let a=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function kt(e,o={}){let a=o.size||460,s=o.mode||"rgb",l=!1,c={...Qe},n={...Je,radius:.08},b={...qe},h={...Ze},y={x:8*w,y:-20*w,z:-55*w},p=se(y.x,y.y,y.z),f=ie(),C={...y},v=()=>{c.mat=Z(f,p)},H=o.initialColor||{r:255,g:255,b:255},E=ee(H,s),z=1,u=!1,r=null,S=null,D=!1,P=0,k=0,F=null,R=t=>{if(k=t,F!==null)return;let i=performance.now(),m=6,M=T=>{let _=Math.min(.05,(T-i)/1e3);i=T,k>P?P=Math.min(k,P+_*m):P=Math.max(k,P-_*m),x(),Math.abs(P-k)<.001?(P=k,F=null):F=requestAnimationFrame(M)};F=requestAnimationFrame(M)},q=!1,I=null,O=null,V=0,J=0,X=null,d=t=>{if(J=t,X!==null)return;let i=performance.now(),m=6,M=T=>{let _=Math.min(.05,(T-i)/1e3);i=T,J>V?V=Math.min(J,V+_*m):V=Math.max(J,V-_*m),x(),Math.abs(V-J)<.001?(V=J,X=null):X=requestAnimationFrame(M)};X=requestAnimationFrame(M)},L=new Set,g=it(e,a),A=null,x=()=>{A===null&&(A=requestAnimationFrame(()=>{A=null,st(g,c,n,s,l,b,h,E,!0,r,S,D,P,I,V,O,z)}))},B=()=>{let t=Q(E,s),i=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t,m=re(i),M=ge(i),T=z<1?lt(i,z):Me(i),_={rgb:i,hsb:m,oklch:M,hex:T,alpha:z};L.forEach(Y=>Y(_))},G=(t,i)=>{i!==0&&(t==="x"?(p=Z(p,ue(i)),C.x+=i):t==="y"?(p=Z(p,me(i)),C.y+=i):(p=Z(p,Ae(i)),C.z+=i),v(),x())},j=(t,i)=>{f=Z(me(t*.01),f),f=Z(ue(-i*.01),f),v(),x()},W=t=>{f=Z(t,ze(p)),v(),x()},le=()=>{p=se(y.x,y.y,y.z),f=ie(),C={...y},c.zoom=1,v(),x()},te=!1,oe=!1,ae=0,ne=0,Ee=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),ct=()=>{let t=Ee();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},ut=t=>{let i=Ee(),m=ct(),M=Math.abs(t.x)-(i.x-m),T=Math.abs(t.y)-(i.y-m),_=Math.abs(t.z)-(i.z-m),Y=Math.max(M,0),N=Math.max(T,0),U=Math.max(_,0),K=Math.hypot(Y,N,U),ce=Math.min(Math.max(M,Math.max(T,_)),0);return K+ce-m},he=(t,i)=>{let m=g.canvasGL.getBoundingClientRect(),M=(t-m.left)*(g.width/m.width),T=(i-m.top)*(g.height/m.height),_=M-g.width*.5,Y=g.height*.5-T,N=g.width*.36*1.6*(c.zoom||1),U={x:_/N,y:Y/N},K=de=>ke(ze(c.mat),de),ce=0,We=null;for(let de=0;de<96;de++){let dt={x:U.x,y:U.y,z:-5+ce},Ne=K(dt),$e=ut(Ne);if($e<.001){We=Ne;break}if(ce+=$e,ce>10)break}return We},Se=(t,i)=>{let m=he(t,i);if(!m)return;let M=Math.max(0,Math.min(1,m.x/n.sizeX+.5)),T=Math.max(0,Math.min(1,m.y/n.sizeY+.5)),_=Math.max(0,Math.min(1,m.z/n.sizeZ+.5));E={x:M,y:T,z:_},B(),x()},De=(t,i)=>{let m=g.canvasGL.getBoundingClientRect();return{x:(t-m.left)*(g.width/m.width),y:(i-m.top)*(g.height/m.height)}},Pe=()=>$(E,g.width*.36,{x:g.width*.5,y:g.height*.5},c,n),mt=(t,i)=>{let m=De(t,i),M=Pe();return Math.hypot(m.x-M.x,m.y-M.y)<=14},ft=t=>{z=Math.max(0,Math.min(1,t)),B(),x()},bt=t=>{let i=Q(E,s),m=re(i);m.s=Math.max(0,Math.min(100,t*100)),E=ee(ve(m),s),B(),x()},ht=t=>{let i=t.x-I.x,m=t.y-I.y,M=Math.atan2(i,-m);return M<0&&(M+=be),M/be},Fe=(t,i)=>{if(!b.svTriangle)return null;let m=g.canvasGL.getBoundingClientRect(),M=(t-m.left)*(g.width/m.width),T=(i-m.top)*(g.height/m.height),_=fe(r||E,s,g.width*.36,{x:g.width*.5,y:g.height*.5},c,n),Y=(_.w.y-_.k.y)*(_.c.x-_.k.x)+(_.k.x-_.w.x)*(_.c.y-_.k.y);if(Math.abs(Y)<1e-6)return null;let N=((_.w.y-_.k.y)*(M-_.k.x)+(_.k.x-_.w.x)*(T-_.k.y))/Y,U=((_.k.y-_.c.y)*(M-_.k.x)+(_.c.x-_.k.x)*(T-_.k.y))/Y,K=1-N-U;return N<-.02||U<-.02||K<-.02?null:{a:N,b:U,g:K}},Ve=t=>{let m=fe(r||E,s,g.width*.36,{x:g.width*.5,y:g.height*.5},c,n),M=Math.max(0,Math.min(1,t.a*m.cRGB.x+t.b)),T=Math.max(0,Math.min(1,t.a*m.cRGB.y+t.b)),_=Math.max(0,Math.min(1,t.a*m.cRGB.z+t.b));E=ee({r:M*255,g:T*255,b:_*255},s),B(),x()},Ie=0,Oe=0,Xe=(t,i)=>{Ie=t,Oe=i,g.canvasGL.style.cursor=he(t,i)?"default":"grab"};g.canvasGL.addEventListener("mousemove",t=>{Xe(t.clientX,t.clientY)}),g.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)te=!0,ae=t.clientX,ne=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=D?Fe(t.clientX,t.clientY):null;i?(u=!0,r={...E},S=i,Ve(i)):!D&&mt(t.clientX,t.clientY)?(q=!0,I=Pe(),O=null,r=null,S=null,t.preventDefault(),d(1)):he(t.clientX,t.clientY)?(oe=!0,r=null,S=null,Se(t.clientX,t.clientY)):(te=!0,ae=t.clientX,ne=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),g.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(q&&I){let i=De(t.clientX,t.clientY),m=Math.hypot(i.x-I.x,i.y-I.y),M=zt(V),T=Be*M,_=Te*M,Y=Math.abs(m-_)<=7,N=Math.abs(m-T)<=7,U=Y?"sat":N?"alpha":null;if(O=U,U){let K=ht(i);U==="alpha"?ft(K):bt(K)}else x()}else if(u){let i=Fe(t.clientX,t.clientY);i&&(S=i,Ve(i))}else if(te){let i=t.clientX-ae,m=t.clientY-ne;ae=t.clientX,ne=t.clientY,j(i,m)}else oe&&Se(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{q&&(q=!1,O=null,d(0)),u&&(u=!1),te&&(te=!1,document.body.style.cursor="default"),oe&&(oe=!1),Xe(Ie,Oe)}),g.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),x()},{passive:!1}),g.canvasGL.addEventListener("dblclick",t=>{he(t.clientX,t.clientY)?(l=!l,B()):le(),x()});let Ue=t=>{if(t.key==="Shift"){D||(D=!0,r=null,S=null,R(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":le();break;case"f":case"F":W(ie());break;case"b":case"B":W(me(Math.PI));break;case"t":case"T":W(ue(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),G("y",-5*w);break;case"ArrowRight":t.preventDefault(),G("y",5*w);break;case"ArrowUp":t.preventDefault(),G("x",5*w);break;case"ArrowDown":t.preventDefault(),G("x",-5*w);break}};window.addEventListener("keydown",Ue);let Ye=t=>{t.key==="Shift"&&D&&(D=!1,R(0))};window.addEventListener("keyup",Ye);let He=()=>{D&&(D=!1,R(0))};return window.addEventListener("blur",He),x(),B(),{getColor:()=>{let t=Q(E,s),i=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:re(i),oklch:ge(i),hex:z<1?lt(i,z):Me(i),alpha:z}},setColor:t=>{H=t,E=ee(t,s),t.a!==void 0&&(z=Math.max(0,Math.min(1,t.a))),r=null,S=null,B(),x()},setMode:t=>{s=t,r=null,S=null,B(),x()},getMode:()=>s,setRotation:(t,i)=>{p=se(i*w,0,t*w),f=ie(),C.x=i*w,C.y=0,C.z=t*w,v(),x()},getAxisRotation:()=>({rotXDeg:Math.round(we(C.x*180/Math.PI)*10)/10,rotYDeg:Math.round(we(C.y*180/Math.PI)*10)/10,rotZDeg:Math.round(we(C.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,m)=>{G("x",Ge(t*w-C.x)),G("y",Ge(i*w-C.y)),G("z",Ge(m*w-C.z))},rotateLocal:(t,i)=>{G(t,i*w)},resetRotation:(t,i,m)=>{p=se(t*w,i*w,m*w),f=ie(),C.x=t*w,C.y=i*w,C.z=m*w,v(),x()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),x()},getZoom:()=>c.zoom||1,setDimensions:(t,i,m)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,i)),n.sizeZ=Math.max(.2,Math.min(2.5,m)),x()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),x()},getRadius:()=>n.radius,setAlpha:t=>{z=Math.max(0,Math.min(1,t)),B(),x()},getAlpha:()=>z,getEdgeStyle:()=>({...h}),setEdgeStyle:t=>{h={...h,...t},x()},getGuides:()=>({...b}),setGuides:t=>{b={...b,...t},x()},toggleAllGuides:t=>{let i=t!==void 0?t:!b.vertexX;b={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:b.svTriangle},x()},on:(t,i)=>{L.add(i)},off:(t,i)=>{L.delete(i)},destroy:()=>{A!==null&&cancelAnimationFrame(A),F!==null&&cancelAnimationFrame(F),X!==null&&cancelAnimationFrame(X),window.removeEventListener("keydown",Ue),window.removeEventListener("keyup",Ye),window.removeEventListener("blur",He),e.innerHTML=""}}}return _t(Lt);})();
