var ColorIsBoxRounded=(()=>{var Pe=Object.defineProperty;var zt=Object.getOwnPropertyDescriptor;var Lt=Object.getOwnPropertyNames;var Bt=Object.prototype.hasOwnProperty;var Gt=(e,n)=>{for(var a in n)Pe(e,a,{get:n[a],enumerable:!0})},wt=(e,n,a,l)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of Lt(n))!Bt.call(e,s)&&s!==a&&Pe(e,s,{get:()=>n[s],enumerable:!(l=zt(n,s))||l.enumerable});return e};var Tt=e=>wt(Pe({},"__esModule",{value:!0}),e);var Ot={};Gt(Ot,{createRoundedBoxPicker:()=>Ft});var it={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},lt={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Le(e){let n=e.r/255,a=e.g/255,l=e.b/255,s=Math.max(n,a,l),c=Math.min(n,a,l),r=s-c,h=0;r!==0&&(s===n?h=((a-l)/r+6)%6:s===a?h=(l-n)/r+2:h=(n-a)/r+4,h*=60);let g=s===0?0:r/s*100,d=s*100;return{h,s:g,b:d}}function St(e){let n=e.h,a=e.s/100,l=e.b/100,s=l*a,c=s*(1-Math.abs(n/60%2-1)),r=l-s,h,g,d;return n<60?(h=s,g=c,d=0):n<120?(h=c,g=s,d=0):n<180?(h=0,g=s,d=c):n<240?(h=0,g=c,d=s):n<300?(h=c,g=0,d=s):(h=s,g=0,d=c),{r:Math.round((h+r)*255),g:Math.round((g+r)*255),b:Math.round((d+r)*255)}}function De(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ie(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Et(e){let n=De(e.r/255),a=De(e.g/255),l=De(e.b/255),s=.4122214708*n+.5363325363*a+.0514459929*l,c=.2119034982*n+.6806995451*a+.1073969566*l,r=.0883024619*n+.2817188376*a+.6299787005*l,h=Math.cbrt(s),g=Math.cbrt(c),d=Math.cbrt(r);return{L:.2104542553*h+.793617785*g-.0040720468*d,a:1.9779984951*h-2.428592205*g+.4505937099*d,b:.0259040371*h+.7827717662*g-.808675766*d}}function Pt(e,n,a){let l=e+.3963377774*n+.2158037573*a,s=e-.1055613458*n-.0638541728*a,c=e-.0894841775*n-1.291485548*a,r=l*l*l,h=s*s*s,g=c*c*c,d=4.0767416621*r-3.3077115913*h+.2309699292*g,x=-1.2684380046*r+2.6097574011*h-.3413193965*g,f=-.0041960863*r-.7034186147*h+1.707614701*g;return{r:Math.round(Math.max(0,Math.min(1,Ie(d)))*255),g:Math.round(Math.max(0,Math.min(1,Ie(x)))*255),b:Math.round(Math.max(0,Math.min(1,Ie(f)))*255)}}function Be(e){let n=Et(e),a=Math.sqrt(n.a*n.a+n.b*n.b),l=Math.atan2(n.b,n.a)*(180/Math.PI);return l<0&&(l+=360),{l:n.L,c:a,h:a<1e-4?0:l}}function Ve(e){let n=e.h*(Math.PI/180),a=e.c*Math.cos(n),l=e.c*Math.sin(n);return Pt(e.l,a,l)}function Dt(e,n,a){let l=Ve({l:e,c:n,h:a});if(st(l))return{l:e,c:n,h:a};let s=0,c=n;for(let r=0;r<20;r++){let h=(s+c)/2;l=Ve({l:e,c:h,h:a}),st(l)?s=h:c=h}return{l:e,c:s,h:a}}function st(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Fe(e){let n=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${n(e.r)}${n(e.g)}${n(e.b)}`}var ct=.4;function te(e,n){if(n==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(n==="hsb")return St({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*ct,s=e.z*359,c=Dt(a,l,s);return Ve(c)}}function ce(e,n){if(n==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(n==="hsb"){let a=Le(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=Be(e);return{x:a.l,y:Math.min(a.c/ct,1),z:a.h/359}}}function Ge(e,n){let a=n*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,s=e.g/255,c=e.b/255,r=(f,y,C)=>f+(y-f)*C,h,g,d;if(a<=90){let f=a/90;h=1-f,g=1-f,d=1-f}else if(a<=180){let f=(a-90)/90;h=l*f,g=s*f,d=c*f}else{let f=(a-180)/180;h=r(l,1,f),g=r(s,1,f),d=r(c,1,f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(h),g:x(g),b:x(d)}}var Oe=Math.PI/180;function Ce(){return[1,0,0,0,1,0,0,0,1]}function ve(e){let n=Math.cos(e),a=Math.sin(e);return[1,0,0,0,n,-a,0,a,n]}function Re(e){let n=Math.cos(e),a=Math.sin(e);return[n,0,a,0,1,0,-a,0,n]}function Xe(e){let n=Math.cos(e),a=Math.sin(e);return[n,a,0,-a,n,0,0,0,1]}function ne(e,n){let a=new Array(9);for(let l=0;l<3;l++)for(let s=0;s<3;s++)a[l*3+s]=e[l*3]*n[s]+e[l*3+1]*n[3+s]+e[l*3+2]*n[6+s];return a}function Ye(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Ue(e,n){return{x:e[0]*n.x+e[1]*n.y+e[2]*n.z,y:e[3]*n.x+e[4]*n.y+e[5]*n.z,z:e[6]*n.x+e[7]*n.y+e[8]*n.z}}function _e(e,n,a){return ne(Re(n),ne(Xe(a),ve(e)))}var ut={mat:_e(8*Oe,-20*Oe,-55*Oe),zoom:1},mt={sizeX:1,sizeY:1,sizeZ:1,radius:0};function we(e,n,a){let l=(e.x-.5)*a.sizeX,s=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return Ue(n.mat,{x:l,y:s,z:c})}function oe(e,n,a,l,s){let c=we(e,l,s);return{x:a.x+c.x*n*1.6*l.zoom,y:a.y-c.y*n*1.6*l.zoom}}function Ae(e,n,a,l,s,c){let r=te(e,n),h={x:r.r/255,y:r.g/255,z:r.b/255},g=ce({r:255,g:255,b:255},n),d=ce({r:0,g:0,b:0},n);return{c:oe(e,a,l,s,c),w:oe(g,a,l,s,c),k:oe(d,a,l,s,c),cRGB:h}}var He=["#ef4444","#22c55e","#3b82f6"];function ft(e,n,a,l,s,c){let r=f=>oe(f,n,a,l,s);e.save();let h=r({x:.5,y:.5,z:.5}),g=.35,d=[{from:{x:-g,y:.5,z:.5},to:{x:1+g,y:.5,z:.5},color:He[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-g,z:.5},to:{x:.5,y:1+g,z:.5},color:He[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-g},to:{x:.5,y:.5,z:1+g},color:He[2],name:"Cz",visible:c.centerZ}],x=!1;for(let f=0;f<d.length;f++){if(!d[f].visible)continue;x=!0;let y=r(d[f].from),C=r(d[f].to);e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(C.x,C.y),e.strokeStyle=d[f].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(y.x,y.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=d[f].color,e.fill()}x&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var bt=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ht=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,gt=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,dt=`
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
`;var he=20,ke=4,We=8,be=16;function yt(e,n){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${n}px`,l.style.height=`${n}px`,l.style.userSelect="none";let s=document.createElement("canvas");s.width=n*a,s.height=n*a,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=n*a,c.height=n*a,c.style.width=`${n}px`,c.style.height=`${n}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",l.appendChild(s),l.appendChild(c),e.appendChild(l);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=c.getContext("2d");h.scale(a,a);let g=(z,U)=>{let F=r.createShader(z);return r.shaderSource(F,U),r.compileShader(F),r.getShaderParameter(F,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(F)),F},d=g(r.VERTEX_SHADER,bt),x=g(r.FRAGMENT_SHADER,dt),f=r.createProgram();r.attachShader(f,d),r.attachShader(f,x),r.linkProgram(f);let y=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(f,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let $=g(r.VERTEX_SHADER,ht),u=g(r.FRAGMENT_SHADER,gt),o=r.createProgram();r.attachShader(o,$),r.attachShader(o,u),r.linkProgram(o);let X=r.getAttribLocation(o,"a_pos"),D=r.getAttribLocation(o,"a_color"),Y=r.getUniformLocation(o,"u_alpha"),k=r.createBuffer(),V={u_resolution:r.getUniformLocation(f,"u_resolution"),u_box_size:r.getUniformLocation(f,"u_box_size"),u_radius:r.getUniformLocation(f,"u_radius"),u_mat:r.getUniformLocation(f,"u_mat"),u_mat_inv:r.getUniformLocation(f,"u_mat_inv"),u_zoom:r.getUniformLocation(f,"u_zoom"),u_mode:r.getUniformLocation(f,"u_mode"),u_invert:r.getUniformLocation(f,"u_invert"),u_show_front:r.getUniformLocation(f,"u_show_front"),u_show_back:r.getUniformLocation(f,"u_show_back"),u_front_width:r.getUniformLocation(f,"u_front_width"),u_back_width:r.getUniformLocation(f,"u_back_width"),u_front_dashed:r.getUniformLocation(f,"u_front_dashed"),u_back_dashed:r.getUniformLocation(f,"u_back_dashed"),u_front_color:r.getUniformLocation(f,"u_front_color"),u_back_color:r.getUniformLocation(f,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:s,canvasOverlay:c,width:n,height:n,program:f,uniforms:V,posBuffer:y,posAttr:C,triProgram:o,triPosAttr:X,triColorAttr:D,triAlphaLoc:Y,triBuffer:k}}var xt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function It(e,n,a,l,s,c){if(!c.showFront&&!c.showBack)return;let r=x=>oe(x,n,a,l,s),g=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),d=x=>{let f=we({x:.5,y:.5,z:.5},l,s);return we({x:.5+x.x*.1,y:.5+x.y*.1,z:.5+x.z*.1},l,s).z-f.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let x of xt)if(!(d(x.normalA)||d(x.normalB))){let[y,C]=x.edge;e.beginPath(),e.moveTo(g[y].x,g[y].y),e.lineTo(g[C].x,g[C].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let x of xt)if(d(x.normalA)||d(x.normalB)){let[y,C]=x.edge;e.beginPath(),e.moveTo(g[y].x,g[y].y),e.lineTo(g[C].x,g[C].y),e.stroke()}}e.restore()}function pt(e,n,a,l,s,c,r,h,g,d,x,f,y,C,$){let{gl:u,overlayCtx:o,width:X,height:D,program:Y,uniforms:k}=e,V=window.devicePixelRatio||1;u.viewport(0,0,X*V,D*V),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(Y),u.uniform2f(k.u_resolution,X*V,D*V),u.uniform3f(k.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(k.u_radius,a.radius!==void 0?a.radius:.001);let z=n.mat;u.uniformMatrix3fv(k.u_mat,!1,new Float32Array([z[0],z[3],z[6],z[1],z[4],z[7],z[2],z[5],z[8]])),u.uniformMatrix3fv(k.u_mat_inv,!1,new Float32Array([z[0],z[1],z[2],z[3],z[4],z[5],z[6],z[7],z[8]])),u.uniform1f(k.u_zoom,n.zoom||1),u.uniform1i(k.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(k.u_invert,s?1:0),u.uniform1i(k.u_show_front,r.showFront?1:0),u.uniform1i(k.u_show_back,r.showBack?1:0),u.uniform1f(k.u_front_width,r.frontWidth||1.5),u.uniform1f(k.u_back_width,r.backWidth||1),u.uniform1i(k.u_front_dashed,r.frontDashed?1:0),u.uniform1i(k.u_back_dashed,r.backDashed?1:0),u.uniform4f(k.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(k.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let U=X*.36,F={x:X*.5,y:D*.5},re=null,Me=null,ue=f||y>.001;if(c.svTriangle&&ue){let m=Ae(d||h,l,U,F,n,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?re=m:Me=m}let Z=y<.5?2*y*y:1-Math.pow(-2*y+2,2)/2;if(re&&Z<.01&&(re=null),re){let m=I=>[I.x/X*2-1,1-I.y/D*2],_=re,R=I=>({x:_.c.x+(I.x-_.c.x)*Z,y:_.c.y+(I.y-_.c.y)*Z}),B=m(_.c),w=m(R(_.w)),S=m(R(_.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([B[0],B[1],_.cRGB.x,_.cRGB.y,_.cRGB.z,w[0],w[1],1,1,1,S[0],S[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(Y),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(o.save(),o.clearRect(0,0,X,D),It(o,U,F,n,a,r),ft(o,U,F,n,a,c),Me){let m=Me;o.save(),o.globalAlpha=y,o.beginPath(),o.moveTo(m.k.x,m.k.y),o.lineTo(m.w.x,m.w.y),o.strokeStyle="rgba(107, 114, 128, 0.7)",o.lineWidth=1.2,o.setLineDash([5,4]),o.stroke(),o.setLineDash([]),o.restore()}if(re){let m=re,_=L=>({x:m.c.x+(L.x-m.c.x)*Z,y:m.c.y+(L.y-m.c.y)*Z}),R=_(m.w),B=_(m.k),w=Math.round(m.cRGB.x*255),S=Math.round(m.cRGB.y*255),I=Math.round(m.cRGB.z*255);if(o.save(),o.globalAlpha=y,o.beginPath(),o.moveTo(m.c.x,m.c.y),o.lineTo(R.x,R.y),o.lineTo(B.x,B.y),o.closePath(),o.strokeStyle=`rgba(${w}, ${S}, ${I}, 0.7)`,o.lineWidth=1.2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(R.x,R.y,3.5,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.6)",o.lineWidth=1.2,o.stroke(),o.beginPath(),o.arc(B.x,B.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="rgba(255, 255, 255, 0.7)",o.lineWidth=1.2,o.stroke(),x){let L=x.a*m.c.x+x.b*R.x+x.g*B.x,W=x.a*m.c.y+x.b*R.y+x.g*B.y;o.beginPath(),o.arc(L,W,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.75)",o.lineWidth=1.4,o.stroke()}o.restore()}let H=(m,_,R)=>.299*m+.587*_+.114*R>140?"rgba(17, 24, 39, 0.85)":"rgba(255, 255, 255, 0.95)";if(g&&!x&&!C){let m=oe(h,U,F,n,a),_=te(h,l),R=s?{r:255-_.r,g:255-_.g,b:255-_.b}:_;if($<1){o.save(),o.beginPath(),o.arc(m.x,m.y,6,0,Math.PI*2),o.clip();let B=4;for(let w=-12;w<12;w+=B)for(let S=-12;S<12;S+=B)o.fillStyle=(S+w)/B%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(m.x+S,m.y+w,B,B);o.restore()}o.beginPath(),o.arc(m.x,m.y,8,0,Math.PI*2),o.fillStyle=$<1?`rgba(${R.r}, ${R.g}, ${R.b}, ${$})`:`rgb(${R.r}, ${R.g}, ${R.b})`,o.fill(),o.strokeStyle=H(R.r,R.g,R.b),o.lineWidth=2.5,o.stroke()}if(C&&C.reveal>.01){let m=C.anchor,_=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,R=he*_,B=(he+ke+be/2)*_,w=(he+ke+be+We+be/2)*_,S=be*_,I=te(h,l),L=s?{r:255-I.r,g:255-I.g,b:255-I.b}:I,W=-Math.PI/2;o.save(),o.globalAlpha=_;let ie=(P,E)=>{o.save(),o.beginPath(),o.arc(m.x,m.y,P+E/2,0,Math.PI*2),o.arc(m.x,m.y,Math.max(.5,P-E/2),0,Math.PI*2,!0),o.closePath(),o.clip();let O=7,q=P+E/2;o.fillStyle="rgba(148, 163, 184, 0.8)";for(let le=-q;le<q;le+=O)for(let ye=-q;ye<q;ye+=O)o.beginPath(),o.arc(m.x+ye,m.y+le,1.8,0,Math.PI*2),o.fill();o.restore()},de=(P,E,O)=>{o.lineWidth=O?1.8:1,o.strokeStyle=O?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let q of[P-E/2,P+E/2])q<=0||(o.beginPath(),o.arc(m.x,m.y,q,0,Math.PI*2),o.stroke())},xe=(P,E)=>{o.beginPath(),o.arc(P,E,8.5,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.lineWidth=2,o.strokeStyle="#ffffff",o.stroke(),o.lineWidth=1,o.strokeStyle="rgba(15, 23, 42, 0.55)",o.stroke(),o.beginPath(),o.arc(P,E,3,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(15, 23, 42, 0.45)",o.lineWidth=.8,o.stroke()},v=C.colorAnchor||h,me=te(v,l),A=72,N=Math.PI*2/A;for(let P=0;P<A;P++){let E=W+P*N,O=Ge(me,P*N);o.beginPath(),o.arc(m.x,m.y,B,E,E+N+.012),o.lineWidth=S,o.lineCap="butt",o.strokeStyle=`rgb(${O.r}, ${O.g}, ${O.b})`,o.stroke()}let J=m.x+B*Math.sin(C.angle),Te=m.y-B*Math.cos(C.angle);xe(J,Te),de(B,S,C.band==="sat"),ie(w,S);let fe=W+$*Math.PI*2;if($>.001){o.beginPath(),o.arc(m.x,m.y,w,W,fe),o.lineWidth=S,o.strokeStyle=`rgb(${L.r}, ${L.g}, ${L.b})`,o.stroke();let P=m.x+w*Math.cos(fe),E=m.y+w*Math.sin(fe);xe(P,E)}de(w,S,C.band==="alpha"),o.beginPath(),o.arc(m.x,m.y,R,0,Math.PI*2),o.fillStyle=$<1?`rgba(${L.r}, ${L.g}, ${L.b}, ${$})`:`rgb(${L.r}, ${L.g}, ${L.b})`,o.fill(),o.strokeStyle=H(L.r,L.g,L.b),o.lineWidth=2,o.stroke(),o.restore()}o.restore()}var G=Math.PI/180,ge=2*Math.PI,Ne=e=>{let n=e%360;return n>180?n-=360:n<-180&&(n+=360),n},$e=e=>{let n=e%ge;return n>Math.PI?n-=ge:n<-Math.PI&&(n+=ge),n},Vt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,Ct=(e,n)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(n*255)}`};function Ft(e,n={}){let a=n.size||460,l=n.mode||"rgb",s=!1,c={...ut},r={...mt,radius:.08},h={...lt},g={...it},d={x:8*G,y:-20*G,z:-55*G},x=_e(d.x,d.y,d.z),f=Ce(),y={...d},C=()=>{c.mat=ne(f,x)},$=n.initialColor||{r:255,g:255,b:255},u=ce($,l),o=1,X=!1,D=null,Y=null,k=!1,V=0,z=0,U=null,F=t=>{if(z=t,U!==null)return;let i=performance.now(),b=6,M=T=>{let p=Math.min(.05,(T-i)/1e3);i=T,z>V?V=Math.min(z,V+p*b):V=Math.max(z,V-p*b),A(),Math.abs(V-z)<.001?(V=z,U=null):U=requestAnimationFrame(M)};U=requestAnimationFrame(M)},re=250,Me=10,ue=!1,Z=!1,H=null,m=null,_=null,R=null,B=0,w=!1,S=null,I=Math.PI,L=0,W=0,ie=null,de=t=>{if(W=t,ie!==null)return;let i=performance.now(),b=6,M=T=>{let p=Math.min(.05,(T-i)/1e3);i=T,W>L?L=Math.min(W,L+p*b):L=Math.max(W,L-p*b),A(),Math.abs(L-W)<.001?(L=W,ie=null,W===0&&(_=null)):ie=requestAnimationFrame(M)};ie=requestAnimationFrame(M)},xe=new Set,v=yt(e,a),me=null,A=()=>{me===null&&(me=requestAnimationFrame(()=>{me=null,pt(v,c,r,l,s,h,g,u,!0,D,Y,k,V,_?{anchor:_,reveal:L,band:R,colorAnchor:S,angle:I}:null,o)}))},N=()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,b=Le(i),M=Be(i),T=o<1?Ct(i,o):Fe(i),p={rgb:i,hsb:b,oklch:M,hex:T,alpha:o};xe.forEach(K=>K(p))},J=(t,i)=>{i!==0&&(t==="x"?(x=ne(x,ve(i)),y.x+=i):t==="y"?(x=ne(x,Re(i)),y.y+=i):(x=ne(x,Xe(i)),y.z+=i),C(),A())},Te=(t,i)=>{f=ne(Re(t*.01),f),f=ne(ve(-i*.01),f),C(),A()},fe=t=>{f=ne(t,Ye(x)),C(),A()},P=()=>{x=_e(d.x,d.y,d.z),f=Ce(),y={...d},c.zoom=1,C(),A()},E=!1,O=!1,q=0,le=0,ye=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),_t=()=>{let t=ye();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Mt=t=>{let i=ye(),b=_t(),M=Math.abs(t.x)-(i.x-b),T=Math.abs(t.y)-(i.y-b),p=Math.abs(t.z)-(i.z-b),K=Math.max(M,0),ee=Math.max(T,0),j=Math.max(p,0),se=Math.hypot(K,ee,j),Q=Math.min(Math.max(M,Math.max(T,p)),0);return se+Q-b},ze=(t,i)=>{let b=v.canvasGL.getBoundingClientRect(),M=(t-b.left)*(v.width/b.width),T=(i-b.top)*(v.height/b.height),p=M-v.width*.5,K=v.height*.5-T,ee=v.width*.36*1.6*(c.zoom||1),j={x:p/ee,y:K/ee},se=ae=>Ue(Ye(c.mat),ae),Q=0,pe=null;for(let ae=0;ae<96;ae++){let kt={x:j.x,y:j.y,z:-5+Q},rt=se(kt),at=Mt(rt);if(at<.001){pe=rt;break}if(Q+=at,Q>10)break}return pe},Ze=(t,i)=>{let b=ze(t,i);if(!b)return;let M=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),T=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),p=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));u={x:M,y:T,z:p},N(),A()},Se=(t,i)=>{let b=v.canvasGL.getBoundingClientRect();return{x:(t-b.left)*(v.width/b.width),y:(i-b.top)*(v.height/b.height)}},qe=()=>oe(u,v.width*.36,{x:v.width*.5,y:v.height*.5},c,r),vt=(t,i)=>{let b=Se(t,i),M=qe();return Math.hypot(b.x-M.x,b.y-M.y)<=17},Rt=t=>{o=Math.max(0,Math.min(1,t)),N(),A()},Ee=t=>{let i=t.x-_.x,b=t.y-_.y,M=Math.atan2(i,-b);return M<0?M+ge:M},Xt=t=>Ee(t)/ge,At=t=>{I=t;let i=te(S||u,l);u=ce(Ge(i,t),l),N(),A()},Ke=(t,i)=>{if(!h.svTriangle)return null;let b=v.canvasGL.getBoundingClientRect(),M=(t-b.left)*(v.width/b.width),T=(i-b.top)*(v.height/b.height),p=Ae(D||u,l,v.width*.36,{x:v.width*.5,y:v.height*.5},c,r),K=(p.w.y-p.k.y)*(p.c.x-p.k.x)+(p.k.x-p.w.x)*(p.c.y-p.k.y);if(Math.abs(K)<1e-6)return null;let ee=((p.w.y-p.k.y)*(M-p.k.x)+(p.k.x-p.w.x)*(T-p.k.y))/K,j=((p.k.y-p.c.y)*(M-p.k.x)+(p.c.x-p.k.x)*(T-p.k.y))/K,se=1-ee-j;return ee<-.02||j<-.02||se<-.02?null:{a:ee,b:j,g:se}},je=t=>{let b=Ae(D||u,l,v.width*.36,{x:v.width*.5,y:v.height*.5},c,r),M=Math.max(0,Math.min(1,t.a*b.cRGB.x+t.b)),T=Math.max(0,Math.min(1,t.a*b.cRGB.y+t.b)),p=Math.max(0,Math.min(1,t.a*b.cRGB.z+t.b));u=ce({r:M*255,g:T*255,b:p*255},l),N(),A()},Qe=0,Je=0,et=(t,i)=>{Qe=t,Je=i,v.canvasGL.style.cursor=ze(t,i)?"default":"grab"};v.canvasGL.addEventListener("mousemove",t=>{et(t.clientX,t.clientY)}),v.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)E=!0,q=t.clientX,le=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=k?Ke(t.clientX,t.clientY):null;i?(X=!0,D={...u},Y=i,je(i)):!k&&vt(t.clientX,t.clientY)?(ue=!0,Z=!1,m=Se(t.clientX,t.clientY),_=qe(),R=null,S={...u},I=Math.PI,D=null,Y=null,t.preventDefault(),H=window.setTimeout(()=>{H=null,ue&&!Z&&(Z=!0,de(1))},re)):ze(t.clientX,t.clientY)?(O=!0,D=null,Y=null,Ze(t.clientX,t.clientY)):(E=!0,q=t.clientX,le=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),v.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(ue&&_){let i=Se(t.clientX,t.clientY);if(!Z){m&&Math.hypot(i.x-m.x,i.y-m.y)>Me&&(H!==null&&(window.clearTimeout(H),H=null),Z=!0,de(1));return}let b=Math.hypot(i.x-_.x,i.y-_.y),M=Vt(L),T=he*M,p=be*M,K=(he+ke)*M,ee=K+p,j=(he+ke+be+We)*M,se=j+p,Q=b<T-3?null:b>=K-2&&b<=ee+2?"sat":b>=j-2&&b<=se+2?"alpha":null;if(Q!==R&&(R=Q,B=Q?Ee(i):0,w=!1),Q){let pe=Ee(i);if(!w){let ae=Math.abs(pe-B);ae>Math.PI&&(ae=ge-ae),ae>10*G&&(w=!0)}w?Q==="alpha"?Rt(pe/ge):At(pe):A()}else A()}else if(X){let i=Ke(t.clientX,t.clientY);i&&(Y=i,je(i))}else if(E){let i=t.clientX-q,b=t.clientY-le;q=t.clientX,le=t.clientY,Te(i,b)}else O&&Ze(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{ue&&(H!==null&&(window.clearTimeout(H),H=null),ue=!1,Z=!1,m=null,R=null,B=0,w=!1,S=null,I=0,de(0)),X&&(X=!1),E&&(E=!1,document.body.style.cursor="default"),O&&(O=!1),et(Qe,Je)}),v.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),A()},{passive:!1}),v.canvasGL.addEventListener("dblclick",t=>{ze(t.clientX,t.clientY)?(s=!s,N()):P(),A()});let tt=t=>{if(t.key==="Shift"){k||(k=!0,D=null,Y=null,F(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":P();break;case"f":case"F":fe(Ce());break;case"b":case"B":fe(Re(Math.PI));break;case"t":case"T":fe(ve(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),J("y",-5*G);break;case"ArrowRight":t.preventDefault(),J("y",5*G);break;case"ArrowUp":t.preventDefault(),J("x",5*G);break;case"ArrowDown":t.preventDefault(),J("x",-5*G);break}};window.addEventListener("keydown",tt);let ot=t=>{t.key==="Shift"&&k&&(k=!1,F(0))};window.addEventListener("keyup",ot);let nt=()=>{k&&(k=!1,F(0))};return window.addEventListener("blur",nt),A(),N(),{getColor:()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:Le(i),oklch:Be(i),hex:o<1?Ct(i,o):Fe(i),alpha:o}},setColor:t=>{$=t,u=ce(t,l),t.a!==void 0&&(o=Math.max(0,Math.min(1,t.a))),D=null,Y=null,N(),A()},setMode:t=>{l=t,D=null,Y=null,N(),A()},getMode:()=>l,setRotation:(t,i)=>{x=_e(i*G,0,t*G),f=Ce(),y.x=i*G,y.y=0,y.z=t*G,C(),A()},getAxisRotation:()=>({rotXDeg:Math.round(Ne(y.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ne(y.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ne(y.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,b)=>{J("x",$e(t*G-y.x)),J("y",$e(i*G-y.y)),J("z",$e(b*G-y.z))},rotateLocal:(t,i)=>{J(t,i*G)},resetRotation:(t,i,b)=>{x=_e(t*G,i*G,b*G),f=Ce(),y.x=t*G,y.y=i*G,y.z=b*G,C(),A()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),A()},getZoom:()=>c.zoom||1,setDimensions:(t,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),A()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),A()},getRadius:()=>r.radius,setAlpha:t=>{o=Math.max(0,Math.min(1,t)),N(),A()},getAlpha:()=>o,getEdgeStyle:()=>({...g}),setEdgeStyle:t=>{g={...g,...t},A()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},A()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},A()},on:(t,i)=>{xe.add(i)},off:(t,i)=>{xe.delete(i)},destroy:()=>{me!==null&&cancelAnimationFrame(me),U!==null&&cancelAnimationFrame(U),ie!==null&&cancelAnimationFrame(ie),H!==null&&window.clearTimeout(H),window.removeEventListener("keydown",tt),window.removeEventListener("keyup",ot),window.removeEventListener("blur",nt),e.innerHTML=""}}}return Tt(Ot);})();
