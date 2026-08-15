var ColorIsBoxRounded=(()=>{var Se=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var zt=Object.prototype.hasOwnProperty;var Lt=(e,o)=>{for(var a in o)Se(e,a,{get:o[a],enumerable:!0})},Bt=(e,o,a,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of kt(o))!zt.call(e,s)&&s!==a&&Se(e,s,{get:()=>o[s],enumerable:!(l=Rt(o,s))||l.enumerable});return e};var Tt=e=>Bt(Se({},"__esModule",{value:!0}),e);var Ft={};Lt(Ft,{createRoundedBoxPicker:()=>Vt});var rt={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},at={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Re(e){let o=e.r/255,a=e.g/255,l=e.b/255,s=Math.max(o,a,l),c=Math.min(o,a,l),r=s-c,h=0;r!==0&&(s===o?h=((a-l)/r+6)%6:s===a?h=(l-o)/r+2:h=(o-a)/r+4,h*=60);let d=s===0?0:r/s*100,x=s*100;return{h,s:d,b:x}}function wt(e){let o=e.h,a=e.s/100,l=e.b/100,s=l*a,c=s*(1-Math.abs(o/60%2-1)),r=l-s,h,d,x;return o<60?(h=s,d=c,x=0):o<120?(h=c,d=s,x=0):o<180?(h=0,d=s,x=c):o<240?(h=0,d=c,x=s):o<300?(h=c,d=0,x=s):(h=s,d=0,x=c),{r:Math.round((h+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function Ge(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ee(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function St(e){let o=Ge(e.r/255),a=Ge(e.g/255),l=Ge(e.b/255),s=.4122214708*o+.5363325363*a+.0514459929*l,c=.2119034982*o+.6806995451*a+.1073969566*l,r=.0883024619*o+.2817188376*a+.6299787005*l,h=Math.cbrt(s),d=Math.cbrt(c),x=Math.cbrt(r);return{L:.2104542553*h+.793617785*d-.0040720468*x,a:1.9779984951*h-2.428592205*d+.4505937099*x,b:.0259040371*h+.7827717662*d-.808675766*x}}function Gt(e,o,a){let l=e+.3963377774*o+.2158037573*a,s=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=l*l*l,h=s*s*s,d=c*c*c,x=4.0767416621*r-3.3077115913*h+.2309699292*d,f=-1.2684380046*r+2.6097574011*h-.3413193965*d,g=-.0041960863*r-.7034186147*h+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Ee(x)))*255),g:Math.round(Math.max(0,Math.min(1,Ee(f)))*255),b:Math.round(Math.max(0,Math.min(1,Ee(g)))*255)}}function ke(e){let o=St(e),a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.atan2(o.b,o.a)*(180/Math.PI);return l<0&&(l+=360),{l:o.L,c:a,h:a<1e-4?0:l}}function De(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),l=e.c*Math.sin(o);return Gt(e.l,a,l)}function Et(e,o,a){let l=De({l:e,c:o,h:a});if(it(l))return{l:e,c:o,h:a};let s=0,c=o;for(let r=0;r<20;r++){let h=(s+c)/2;l=De({l:e,c:h,h:a}),it(l)?s=h:c=h}return{l:e,c:s,h:a}}function it(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Pe(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var lt=.4;function oe(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return wt({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*lt,s=e.z*359,c=Et(a,l,s);return De(c)}}function ue(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=Re(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ke(e);return{x:a.l,y:Math.min(a.c/lt,1),z:a.h/359}}}function ze(e,o){let a=o*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,s=e.g/255,c=e.b/255,r,h,d;if(a<=90){let f=a/90;r=l*(1-f),h=s*(1-f),d=c*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,h=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),h=f*s+(1-f),d=f*c+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(h),b:x(d)}}var Ve=Math.PI/180;function be(){return[1,0,0,0,1,0,0,0,1]}function ye(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function pe(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function Fe(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function re(e,o){let a=new Array(9);for(let l=0;l<3;l++)for(let s=0;s<3;s++)a[l*3+s]=e[l*3]*o[s]+e[l*3+1]*o[3+s]+e[l*3+2]*o[6+s];return a}function Ie(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Oe(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function he(e,o,a){return re(pe(o),re(Fe(a),ye(e)))}var st={mat:he(8*Ve,-20*Ve,-55*Ve),zoom:1},ct={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Le(e,o,a){let l=(e.x-.5)*a.sizeX,s=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return Oe(o.mat,{x:l,y:s,z:c})}function ne(e,o,a,l,s){let c=Le(e,l,s);return{x:a.x+c.x*o*1.6*l.zoom,y:a.y-c.y*o*1.6*l.zoom}}function Ce(e,o,a,l,s,c){let r=oe(e,o),h={x:r.r/255,y:r.g/255,z:r.b/255},d=ue({r:255,g:255,b:255},o),x=ue({r:0,g:0,b:0},o);return{c:ne(e,a,l,s,c),w:ne(d,a,l,s,c),k:ne(x,a,l,s,c),cRGB:h}}var Xe=["#ef4444","#22c55e","#3b82f6"];function ut(e,o,a,l,s,c){let r=g=>ne(g,o,a,l,s);e.save();let h=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:Xe[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:Xe[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:Xe[2],name:"Cz",visible:c.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let p=r(x[g].from),C=r(x[g].to);e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(C.x,C.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(p.x,p.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var mt=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ft=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,bt=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,ht=`
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
`;var _e=20,Me=18;function gt(e,o){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.userSelect="none";let s=document.createElement("canvas");s.width=o*a,s.height=o*a,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",l.appendChild(s),l.appendChild(c),e.appendChild(l);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=c.getContext("2d");h.scale(a,a);let d=(k,N)=>{let X=r.createShader(k);return r.shaderSource(X,N),r.compileShader(X),r.getShaderParameter(X,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(X)),X},x=d(r.VERTEX_SHADER,mt),f=d(r.FRAGMENT_SHADER,ht),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(g,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let H=d(r.VERTEX_SHADER,ft),m=d(r.FRAGMENT_SHADER,bt),n=r.createProgram();r.attachShader(n,H),r.attachShader(n,m),r.linkProgram(n);let W=r.getAttribLocation(n,"a_pos"),P=r.getAttribLocation(n,"a_color"),$=r.getUniformLocation(n,"u_alpha"),R=r.createBuffer(),F={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:s,canvasOverlay:c,width:o,height:o,program:g,uniforms:F,posBuffer:p,posAttr:C,triProgram:n,triPosAttr:W,triColorAttr:P,triAlphaLoc:$,triBuffer:R}}var dt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Dt(e,o,a,l,s,c){if(!c.showFront&&!c.showBack)return;let r=f=>ne(f,o,a,l,s),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Le({x:.5,y:.5,z:.5},l,s);return Le({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,s).z-g.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let f of dt)if(!(x(f.normalA)||x(f.normalB))){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let f of dt)if(x(f.normalA)||x(f.normalB)){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}e.restore()}function xt(e,o,a,l,s,c,r,h,d,x,f,g,p,C,H){let{gl:m,overlayCtx:n,width:W,height:P,program:$,uniforms:R}=e,F=window.devicePixelRatio||1;m.viewport(0,0,W*F,P*F),m.clearColor(0,0,0,0),m.clear(m.COLOR_BUFFER_BIT),m.useProgram($),m.uniform2f(R.u_resolution,W*F,P*F),m.uniform3f(R.u_box_size,a.sizeX,a.sizeY,a.sizeZ),m.uniform1f(R.u_radius,a.radius!==void 0?a.radius:.001);let k=o.mat;m.uniformMatrix3fv(R.u_mat,!1,new Float32Array([k[0],k[3],k[6],k[1],k[4],k[7],k[2],k[5],k[8]])),m.uniformMatrix3fv(R.u_mat_inv,!1,new Float32Array([k[0],k[1],k[2],k[3],k[4],k[5],k[6],k[7],k[8]])),m.uniform1f(R.u_zoom,o.zoom||1),m.uniform1i(R.u_mode,l==="rgb"?0:l==="hsb"?1:2),m.uniform1i(R.u_invert,s?1:0),m.uniform1i(R.u_show_front,r.showFront?1:0),m.uniform1i(R.u_show_back,r.showBack?1:0),m.uniform1f(R.u_front_width,r.frontWidth||1.5),m.uniform1f(R.u_back_width,r.backWidth||1),m.uniform1i(R.u_front_dashed,r.frontDashed?1:0),m.uniform1i(R.u_back_dashed,r.backDashed?1:0),m.uniform4f(R.u_front_color,1,1,1,r.frontOpacity||.65),m.uniform4f(R.u_back_color,1,1,1,r.backOpacity||.25),m.drawArrays(m.TRIANGLES,0,6);let N=W*.36,X={x:W*.5,y:P*.5},ae=null,de=null,me=g||p>.001;if(c.svTriangle&&me){let u=Ce(x||h,l,N,X,o,a);Math.abs((u.w.x-u.c.x)*(u.k.y-u.c.y)-(u.w.y-u.c.y)*(u.k.x-u.c.x))>4?ae=u:de=u}let Z=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if(ae&&Z<.01&&(ae=null),ae){let u=V=>[V.x/W*2-1,1-V.y/P*2],_=ae,z=V=>({x:_.c.x+(V.x-_.c.x)*Z,y:_.c.y+(V.y-_.c.y)*Z}),L=u(_.c),E=u(z(_.w)),T=u(z(_.k));m.useProgram(e.triProgram),m.enable(m.BLEND),m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA),m.bindBuffer(m.ARRAY_BUFFER,e.triBuffer),m.bufferData(m.ARRAY_BUFFER,new Float32Array([L[0],L[1],_.cRGB.x,_.cRGB.y,_.cRGB.z,E[0],E[1],1,1,1,T[0],T[1],0,0,0]),m.STATIC_DRAW),m.enableVertexAttribArray(e.triPosAttr),m.vertexAttribPointer(e.triPosAttr,2,m.FLOAT,!1,20,0),m.enableVertexAttribArray(e.triColorAttr),m.vertexAttribPointer(e.triColorAttr,3,m.FLOAT,!1,20,8),m.uniform1f(e.triAlphaLoc,1),m.drawArrays(m.TRIANGLES,0,3),m.disable(m.BLEND),m.useProgram($),m.enableVertexAttribArray(e.posAttr),m.bindBuffer(m.ARRAY_BUFFER,e.posBuffer),m.vertexAttribPointer(e.posAttr,2,m.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,W,P),Dt(n,N,X,o,a,r),ut(n,N,X,o,a,c),de){let u=de;n.save(),n.globalAlpha=p,n.beginPath(),n.moveTo(u.k.x,u.k.y),n.lineTo(u.w.x,u.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if(ae){let u=ae,_=G=>({x:u.c.x+(G.x-u.c.x)*Z,y:u.c.y+(G.y-u.c.y)*Z}),z=_(u.w),L=_(u.k),E=Math.round(u.cRGB.x*255),T=Math.round(u.cRGB.y*255),V=Math.round(u.cRGB.z*255);if(n.save(),n.globalAlpha=p,n.beginPath(),n.moveTo(u.c.x,u.c.y),n.lineTo(z.x,z.y),n.lineTo(L.x,L.y),n.closePath(),n.strokeStyle=`rgba(${E}, ${T}, ${V}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(z.x,z.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(L.x,L.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),f){let G=f.a*u.c.x+f.b*z.x+f.g*L.x,I=f.a*u.c.y+f.b*z.y+f.g*L.y;n.beginPath(),n.arc(G,I,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}if(d&&!f&&!C){let u=ne(h,N,X,o,a),_=oe(h,l),z=s?{r:255-_.r,g:255-_.g,b:255-_.b}:_;if(H<1){n.save(),n.beginPath(),n.arc(u.x,u.y,6,0,Math.PI*2),n.clip();let L=4;for(let E=-8;E<8;E+=L)for(let T=-8;T<8;T+=L)n.fillStyle=(T+E)/L%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(u.x+T,u.y+E,L,L);n.restore()}n.beginPath(),n.arc(u.x,u.y,6,0,Math.PI*2),n.fillStyle=H<1?`rgba(${z.r}, ${z.g}, ${z.b}, ${H})`:`rgb(${z.r}, ${z.g}, ${z.b})`,n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke()}if(C&&C.reveal>.01){let u=C.anchor,_=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,z=_e*_,L=(_e+Me/2)*_,E=(_e+Me*1.5)*_,T=Me*_,V=oe(h,l),G=s?{r:255-V.r,g:255-V.g,b:255-V.b}:V,I=-Math.PI/2;n.save(),n.globalAlpha=Math.min(1,_+.15);let se=(D,Y)=>{n.save(),n.beginPath(),n.arc(u.x,u.y,D+Y/2,0,Math.PI*2),n.arc(u.x,u.y,Math.max(.5,D-Y/2),0,Math.PI*2,!0),n.closePath(),n.clip();let S=6,O=D+Y/2;for(let q=-O;q<O;q+=S)for(let le=-O;le<O;le+=S)n.fillStyle=(le+q)/S%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(u.x+le,u.y+q,S,S);n.restore()},ie=(D,Y,S)=>{n.lineWidth=S?1.8:1,n.strokeStyle=S?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let O of[D-Y/2,D+Y/2])O<=0||(n.beginPath(),n.arc(u.x,u.y,O,0,Math.PI*2),n.stroke())},ge=(D,Y,S)=>{let O=u.x,q=u.y-(Y+T/2)-2;n.font="700 12px ui-monospace, SF Mono, monospace",n.textAlign="center",n.textBaseline="alphabetic",n.lineWidth=3,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.strokeText(D,O,q),n.fillStyle=S?"#ffffff":"rgba(248, 250, 252, 0.95)",n.fillText(D,O,q)},xe=C.colorAnchor||h,M=oe(xe,l),ce=72,v=Math.PI*2/ce;for(let D=0;D<ce;D++){let Y=I+D*v,S=ze(M,D*v);n.beginPath(),n.arc(u.x,u.y,L,Y,Y+v+.012),n.lineWidth=T,n.lineCap="butt",n.strokeStyle=`rgb(${S.r}, ${S.g}, ${S.b})`,n.stroke()}let j=u.x+L*Math.sin(C.angle),Q=u.y-L*Math.cos(C.angle);n.beginPath(),n.arc(j,Q,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(15, 23, 42, 0.75)",n.lineWidth=1.4,n.stroke(),ie(L,T,C.band==="sat"),se(E,T);let Be=I+H*Math.PI*2;H>.001&&(n.beginPath(),n.arc(u.x,u.y,E,I,Be),n.lineWidth=T,n.strokeStyle=`rgba(${G.r}, ${G.g}, ${G.b}, ${H})`,n.stroke()),ie(E,T,C.band==="alpha"),ge("SAT",E,C.band==="sat"),n.beginPath(),n.arc(u.x,u.y,z,0,Math.PI*2),n.fillStyle=H<1?`rgba(${G.r}, ${G.g}, ${G.b}, ${H})`:`rgb(${G.r}, ${G.g}, ${G.b})`,n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.95)",n.lineWidth=2,n.stroke(),n.restore()}n.restore()}var w=Math.PI/180,fe=2*Math.PI,Ye=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},Ue=e=>{let o=e%fe;return o>Math.PI?o-=fe:o<-Math.PI&&(o+=fe),o},Pt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,yt=(e,o)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function Vt(e,o={}){let a=o.size||460,l=o.mode||"rgb",s=!1,c={...st},r={...ct,radius:.08},h={...at},d={...rt},x={x:8*w,y:-20*w,z:-55*w},f=he(x.x,x.y,x.z),g=be(),p={...x},C=()=>{c.mat=re(g,f)},H=o.initialColor||{r:255,g:255,b:255},m=ue(H,l),n=1,W=!1,P=null,$=null,R=!1,F=0,k=0,N=null,X=t=>{if(k=t,N!==null)return;let i=performance.now(),b=6,A=B=>{let y=Math.min(.05,(B-i)/1e3);i=B,k>F?F=Math.min(k,F+y*b):F=Math.max(k,F-y*b),v(),Math.abs(F-k)<.001?(F=k,N=null):N=requestAnimationFrame(A)};N=requestAnimationFrame(A)},ae=250,de=10,me=!1,Z=!1,u=null,_=null,z=null,L=null,E=0,T=!1,V=null,G=0,I=0,se=0,ie=null,ge=t=>{if(se=t,ie!==null)return;let i=performance.now(),b=6,A=B=>{let y=Math.min(.05,(B-i)/1e3);i=B,se>I?I=Math.min(se,I+y*b):I=Math.max(se,I-y*b),v(),Math.abs(I-se)<.001?(I=se,ie=null):ie=requestAnimationFrame(A)};ie=requestAnimationFrame(A)},xe=new Set,M=gt(e,a),ce=null,v=()=>{ce===null&&(ce=requestAnimationFrame(()=>{ce=null,xt(M,c,r,l,s,h,d,m,!0,P,$,R,F,z?{anchor:z,reveal:I,band:L,colorAnchor:V,angle:G}:null,n)}))},j=()=>{let t=oe(m,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,b=Re(i),A=ke(i),B=n<1?yt(i,n):Pe(i),y={rgb:i,hsb:b,oklch:A,hex:B,alpha:n};xe.forEach(K=>K(y))},Q=(t,i)=>{i!==0&&(t==="x"?(f=re(f,ye(i)),p.x+=i):t==="y"?(f=re(f,pe(i)),p.y+=i):(f=re(f,Fe(i)),p.z+=i),C(),v())},Be=(t,i)=>{g=re(pe(t*.01),g),g=re(ye(-i*.01),g),C(),v()},D=t=>{g=re(t,Ie(f)),C(),v()},Y=()=>{f=he(x.x,x.y,x.z),g=be(),p={...x},c.zoom=1,C(),v()},S=!1,O=!1,q=0,le=0,He=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),pt=()=>{let t=He();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Ct=t=>{let i=He(),b=pt(),A=Math.abs(t.x)-(i.x-b),B=Math.abs(t.y)-(i.y-b),y=Math.abs(t.z)-(i.z-b),K=Math.max(A,0),J=Math.max(B,0),U=Math.max(y,0),ee=Math.hypot(K,J,U),te=Math.min(Math.max(A,Math.max(B,y)),0);return ee+te-b},ve=(t,i)=>{let b=M.canvasGL.getBoundingClientRect(),A=(t-b.left)*(M.width/b.width),B=(i-b.top)*(M.height/b.height),y=A-M.width*.5,K=M.height*.5-B,J=M.width*.36*1.6*(c.zoom||1),U={x:y/J,y:K/J},ee=Ae=>Oe(Ie(c.mat),Ae),te=0,tt=null;for(let Ae=0;Ae<96;Ae++){let At={x:U.x,y:U.y,z:-5+te},ot=ee(At),nt=Ct(ot);if(nt<.001){tt=ot;break}if(te+=nt,te>10)break}return tt},We=(t,i)=>{let b=ve(t,i);if(!b)return;let A=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),B=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));m={x:A,y:B,z:y},j(),v()},Te=(t,i)=>{let b=M.canvasGL.getBoundingClientRect();return{x:(t-b.left)*(M.width/b.width),y:(i-b.top)*(M.height/b.height)}},$e=()=>ne(m,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),_t=(t,i)=>{let b=Te(t,i),A=$e();return Math.hypot(b.x-A.x,b.y-A.y)<=14},Mt=t=>{n=Math.max(0,Math.min(1,t)),j(),v()},we=t=>{let i=t.x-z.x,b=t.y-z.y,A=Math.atan2(i,-b);return A<0?A+fe:A},It=t=>we(t)/fe,vt=t=>{G=t;let i=oe(V||m,l);m=ue(ze(i,t),l),j(),v()},Ne=(t,i)=>{if(!h.svTriangle)return null;let b=M.canvasGL.getBoundingClientRect(),A=(t-b.left)*(M.width/b.width),B=(i-b.top)*(M.height/b.height),y=Ce(P||m,l,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),K=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(K)<1e-6)return null;let J=((y.w.y-y.k.y)*(A-y.k.x)+(y.k.x-y.w.x)*(B-y.k.y))/K,U=((y.k.y-y.c.y)*(A-y.k.x)+(y.c.x-y.k.x)*(B-y.k.y))/K,ee=1-J-U;return J<-.02||U<-.02||ee<-.02?null:{a:J,b:U,g:ee}},Ze=t=>{let b=Ce(P||m,l,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),A=Math.max(0,Math.min(1,t.a*b.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*b.cRGB.y+t.b)),y=Math.max(0,Math.min(1,t.a*b.cRGB.z+t.b));m=ue({r:A*255,g:B*255,b:y*255},l),j(),v()},qe=0,je=0,Ke=(t,i)=>{qe=t,je=i,M.canvasGL.style.cursor=ve(t,i)?"default":"grab"};M.canvasGL.addEventListener("mousemove",t=>{Ke(t.clientX,t.clientY)}),M.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)S=!0,q=t.clientX,le=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=R?Ne(t.clientX,t.clientY):null;i?(W=!0,P={...m},$=i,Ze(i)):!R&&_t(t.clientX,t.clientY)?(me=!0,Z=!1,_=Te(t.clientX,t.clientY),z=$e(),L=null,V={...m},G=0,P=null,$=null,t.preventDefault(),u=window.setTimeout(()=>{u=null,me&&!Z&&(Z=!0,ge(1))},ae)):ve(t.clientX,t.clientY)?(O=!0,P=null,$=null,We(t.clientX,t.clientY)):(S=!0,q=t.clientX,le=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),M.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(me&&z){let i=Te(t.clientX,t.clientY);if(!Z){_&&Math.hypot(i.x-_.x,i.y-_.y)>de&&(u!==null&&(window.clearTimeout(u),u=null),Z=!0,ge(1));return}let b=Math.hypot(i.x-z.x,i.y-z.y),A=Pt(I),B=_e*A,y=Me*A,K=b>=B+y-2&&b<=B+2*y+2,J=b>=B-2&&b<=B+y+2,U=b<B-3?null:J?"sat":K?"alpha":null;if(U!==L&&(L=U,E=U?we(i):0,T=!1),U){let ee=we(i);if(!T){let te=Math.abs(ee-E);te>Math.PI&&(te=fe-te),te>10*w&&(T=!0)}T?U==="alpha"?Mt(ee/fe):vt(ee):v()}else v()}else if(W){let i=Ne(t.clientX,t.clientY);i&&($=i,Ze(i))}else if(S){let i=t.clientX-q,b=t.clientY-le;q=t.clientX,le=t.clientY,Be(i,b)}else O&&We(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{me&&(u!==null&&(window.clearTimeout(u),u=null),me=!1,Z=!1,_=null,L=null,E=0,T=!1,V=null,G=0,ge(0)),W&&(W=!1),S&&(S=!1,document.body.style.cursor="default"),O&&(O=!1),Ke(qe,je)}),M.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),v()},{passive:!1}),M.canvasGL.addEventListener("dblclick",t=>{ve(t.clientX,t.clientY)?(s=!s,j()):Y(),v()});let Qe=t=>{if(t.key==="Shift"){R||(R=!0,P=null,$=null,X(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":Y();break;case"f":case"F":D(be());break;case"b":case"B":D(pe(Math.PI));break;case"t":case"T":D(ye(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),Q("y",-5*w);break;case"ArrowRight":t.preventDefault(),Q("y",5*w);break;case"ArrowUp":t.preventDefault(),Q("x",5*w);break;case"ArrowDown":t.preventDefault(),Q("x",-5*w);break}};window.addEventListener("keydown",Qe);let Je=t=>{t.key==="Shift"&&R&&(R=!1,X(0))};window.addEventListener("keyup",Je);let et=()=>{R&&(R=!1,X(0))};return window.addEventListener("blur",et),v(),j(),{getColor:()=>{let t=oe(m,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:Re(i),oklch:ke(i),hex:n<1?yt(i,n):Pe(i),alpha:n}},setColor:t=>{H=t,m=ue(t,l),t.a!==void 0&&(n=Math.max(0,Math.min(1,t.a))),P=null,$=null,j(),v()},setMode:t=>{l=t,P=null,$=null,j(),v()},getMode:()=>l,setRotation:(t,i)=>{f=he(i*w,0,t*w),g=be(),p.x=i*w,p.y=0,p.z=t*w,C(),v()},getAxisRotation:()=>({rotXDeg:Math.round(Ye(p.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ye(p.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ye(p.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,b)=>{Q("x",Ue(t*w-p.x)),Q("y",Ue(i*w-p.y)),Q("z",Ue(b*w-p.z))},rotateLocal:(t,i)=>{Q(t,i*w)},resetRotation:(t,i,b)=>{f=he(t*w,i*w,b*w),g=be(),p.x=t*w,p.y=i*w,p.z=b*w,C(),v()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),v()},getZoom:()=>c.zoom||1,setDimensions:(t,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),v()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),v()},getRadius:()=>r.radius,setAlpha:t=>{n=Math.max(0,Math.min(1,t)),j(),v()},getAlpha:()=>n,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},v()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},v()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},v()},on:(t,i)=>{xe.add(i)},off:(t,i)=>{xe.delete(i)},destroy:()=>{ce!==null&&cancelAnimationFrame(ce),N!==null&&cancelAnimationFrame(N),ie!==null&&cancelAnimationFrame(ie),u!==null&&window.clearTimeout(u),window.removeEventListener("keydown",Qe),window.removeEventListener("keyup",Je),window.removeEventListener("blur",et),e.innerHTML=""}}}return Tt(Ft);})();
