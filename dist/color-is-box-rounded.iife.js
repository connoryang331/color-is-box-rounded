var ColorIsBoxRounded=(()=>{var te=Object.defineProperty;var Ye=Object.getOwnPropertyDescriptor;var Ue=Object.getOwnPropertyNames;var He=Object.prototype.hasOwnProperty;var We=(e,o)=>{for(var r in o)te(e,r,{get:o[r],enumerable:!0})},Ze=(e,o,r,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of Ue(o))!He.call(e,s)&&s!==r&&te(e,s,{get:()=>o[s],enumerable:!(i=Ye(o,s))||i.enumerable});return e};var $e=e=>Ze(te({},"__esModule",{value:!0}),e);var eo={};We(eo,{createRoundedBoxPicker:()=>Je});var Le={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Be={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Q(e){let o=e.r/255,r=e.g/255,i=e.b/255,s=Math.max(o,r,i),c=Math.min(o,r,i),n=s-c,m=0;n!==0&&(s===o?m=((r-i)/n+6)%6:s===r?m=(i-o)/n+2:m=(o-r)/n+4,m*=60);let f=s===0?0:n/s*100,b=s*100;return{h:m,s:f,b}}function Ne(e){let o=e.h,r=e.s/100,i=e.b/100,s=i*r,c=s*(1-Math.abs(o/60%2-1)),n=i-s,m,f,b;return o<60?(m=s,f=c,b=0):o<120?(m=c,f=s,b=0):o<180?(m=0,f=s,b=c):o<240?(m=0,f=c,b=s):o<300?(m=c,f=0,b=s):(m=s,f=0,b=c),{r:Math.round((m+n)*255),g:Math.round((f+n)*255),b:Math.round((b+n)*255)}}function ne(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function re(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function je(e){let o=ne(e.r/255),r=ne(e.g/255),i=ne(e.b/255),s=.4122214708*o+.5363325363*r+.0514459929*i,c=.2119034982*o+.6806995451*r+.1073969566*i,n=.0883024619*o+.2817188376*r+.6299787005*i,m=Math.cbrt(s),f=Math.cbrt(c),b=Math.cbrt(n);return{L:.2104542553*m+.793617785*f-.0040720468*b,a:1.9779984951*m-2.428592205*f+.4505937099*b,b:.0259040371*m+.7827717662*f-.808675766*b}}function Ke(e,o,r){let i=e+.3963377774*o+.2158037573*r,s=e-.1055613458*o-.0638541728*r,c=e-.0894841775*o-1.291485548*r,n=i*i*i,m=s*s*s,f=c*c*c,b=4.0767416621*n-3.3077115913*m+.2309699292*f,u=-1.2684380046*n+2.6097574011*m-.3413193965*f,a=-.0041960863*n-.7034186147*m+1.707614701*f;return{r:Math.round(Math.max(0,Math.min(1,re(b)))*255),g:Math.round(Math.max(0,Math.min(1,re(u)))*255),b:Math.round(Math.max(0,Math.min(1,re(a)))*255)}}function J(e){let o=je(e),r=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:r,h:r<1e-4?0:i}}function ae(e){let o=e.h*(Math.PI/180),r=e.c*Math.cos(o),i=e.c*Math.sin(o);return Ke(e.l,r,i)}function qe(e,o,r){let i=ae({l:e,c:o,h:r});if(we(i))return{l:e,c:o,h:r};let s=0,c=o;for(let n=0;n<20;n++){let m=(s+c)/2;i=ae({l:e,c:m,h:r}),we(i)?s=m:c=m}return{l:e,c:s,h:r}}function we(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function ie(e){let o=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Ge=.4;function S(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return Ne({h:e.x*359,s:e.y*100,b:e.z*100});{let r=e.x,i=e.y*Ge,s=e.z*359,c=qe(r,i,s);return ae(c)}}function V(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let r=Q(e);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=J(e);return{x:r.l,y:Math.min(r.c/Ge,1),z:r.h/359}}}var se=Math.PI/180;function O(){return[1,0,0,0,1,0,0,0,1]}function U(e){let o=Math.cos(e),r=Math.sin(e);return[1,0,0,0,o,-r,0,r,o]}function H(e){let o=Math.cos(e),r=Math.sin(e);return[o,0,r,0,1,0,-r,0,o]}function ce(e){let o=Math.cos(e),r=Math.sin(e);return[o,r,0,-r,o,0,0,0,1]}function w(e,o){let r=new Array(9);for(let i=0;i<3;i++)for(let s=0;s<3;s++)r[i*3+s]=e[i*3]*o[s]+e[i*3+1]*o[3+s]+e[i*3+2]*o[6+s];return r}function le(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function ue(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function X(e,o,r){return w(H(o),w(ce(r),U(e)))}var Ae={mat:X(8*se,-20*se,-55*se),zoom:1},De={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ee(e,o,r){let i=(e.x-.5)*r.sizeX,s=(e.y-.5)*r.sizeY,c=(e.z-.5)*r.sizeZ;return ue(o.mat,{x:i,y:s,z:c})}function E(e,o,r,i,s){let c=ee(e,i,s);return{x:r.x+c.x*o*1.6*i.zoom,y:r.y-c.y*o*1.6*i.zoom}}function W(e,o,r,i,s,c){let n=S(e,o),m={x:n.r/255,y:n.g/255,z:n.b/255},f=V({r:255,g:255,b:255},o),b=V({r:0,g:0,b:0},o);return{c:E(e,r,i,s,c),w:E(f,r,i,s,c),k:E(b,r,i,s,c),cRGB:m}}var me=["#ef4444","#22c55e","#3b82f6"];function Te(e,o,r,i,s,c){let n=a=>E(a,o,r,i,s);e.save();let m=n({x:.5,y:.5,z:.5}),f=.35,b=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:me[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:me[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:me[2],name:"Cz",visible:c.centerZ}],u=!1;for(let a=0;a<b.length;a++){if(!b[a].visible)continue;u=!0;let d=n(b[a].from),v=n(b[a].to);e.beginPath(),e.moveTo(d.x,d.y),e.lineTo(v.x,v.y),e.strokeStyle=b[a].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(d.x,d.y,3,0,Math.PI*2),e.arc(v.x,v.y,3,0,Math.PI*2),e.fillStyle=b[a].color,e.fill()}u&&(e.beginPath(),e.arc(m.x,m.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Ee=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Se=`
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
`;function Fe(e,o){let r=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let s=document.createElement("canvas");s.width=o*r,s.height=o*r,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*r,c.height=o*r,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",i.appendChild(s),i.appendChild(c),e.appendChild(i);let n=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=c.getContext("2d");m.scale(r,r);let f=(p,L)=>{let x=n.createShader(p);return n.shaderSource(x,L),n.compileShader(x),n.getShaderParameter(x,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(x)),x},b=f(n.VERTEX_SHADER,Ee),u=f(n.FRAGMENT_SHADER,Se),a=n.createProgram();n.attachShader(a,b),n.attachShader(a,u),n.linkProgram(a);let d=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,d),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let v=n.getAttribLocation(a,"position");n.enableVertexAttribArray(v),n.vertexAttribPointer(v,2,n.FLOAT,!1,0,0);let F={u_resolution:n.getUniformLocation(a,"u_resolution"),u_box_size:n.getUniformLocation(a,"u_box_size"),u_radius:n.getUniformLocation(a,"u_radius"),u_mat:n.getUniformLocation(a,"u_mat"),u_mat_inv:n.getUniformLocation(a,"u_mat_inv"),u_zoom:n.getUniformLocation(a,"u_zoom"),u_mode:n.getUniformLocation(a,"u_mode"),u_invert:n.getUniformLocation(a,"u_invert"),u_show_front:n.getUniformLocation(a,"u_show_front"),u_show_back:n.getUniformLocation(a,"u_show_back"),u_front_width:n.getUniformLocation(a,"u_front_width"),u_back_width:n.getUniformLocation(a,"u_back_width"),u_front_dashed:n.getUniformLocation(a,"u_front_dashed"),u_back_dashed:n.getUniformLocation(a,"u_back_dashed"),u_front_color:n.getUniformLocation(a,"u_front_color"),u_back_color:n.getUniformLocation(a,"u_back_color")};return{gl:n,overlayCtx:m,canvasGL:s,canvasOverlay:c,width:o,height:o,program:a,uniforms:F}}var Ve=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Qe(e,o,r,i,s,c){if(!c.showFront&&!c.showBack)return;let n=u=>E(u,o,r,i,s),f=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),b=u=>{let a=ee({x:.5,y:.5,z:.5},i,s);return ee({x:.5+u.x*.1,y:.5+u.y*.1,z:.5+u.z*.1},i,s).z-a.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let u of Ve)if(!(b(u.normalA)||b(u.normalB))){let[d,v]=u.edge;e.beginPath(),e.moveTo(f[d].x,f[d].y),e.lineTo(f[v].x,f[v].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let u of Ve)if(b(u.normalA)||b(u.normalB)){let[d,v]=u.edge;e.beginPath(),e.moveTo(f[d].x,f[d].y),e.lineTo(f[v].x,f[v].y),e.stroke()}}e.restore()}function Pe(e,o,r,i,s,c,n,m,f,b){let{gl:u,overlayCtx:a,width:d,height:v,program:F,uniforms:p}=e,L=window.devicePixelRatio||1;u.viewport(0,0,d*L,v*L),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(F),u.uniform2f(p.u_resolution,d*L,v*L),u.uniform3f(p.u_box_size,r.sizeX,r.sizeY,r.sizeZ),u.uniform1f(p.u_radius,r.radius!==void 0?r.radius:.001);let x=o.mat;u.uniformMatrix3fv(p.u_mat,!1,new Float32Array([x[0],x[3],x[6],x[1],x[4],x[7],x[2],x[5],x[8]])),u.uniformMatrix3fv(p.u_mat_inv,!1,new Float32Array([x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8]])),u.uniform1f(p.u_zoom,o.zoom||1),u.uniform1i(p.u_mode,i==="rgb"?0:i==="hsb"?1:2),u.uniform1i(p.u_invert,s?1:0),u.uniform1i(p.u_show_front,n.showFront?1:0),u.uniform1i(p.u_show_back,n.showBack?1:0),u.uniform1f(p.u_front_width,n.frontWidth||1.5),u.uniform1f(p.u_back_width,n.backWidth||1),u.uniform1i(p.u_front_dashed,n.frontDashed?1:0),u.uniform1i(p.u_back_dashed,n.backDashed?1:0),u.uniform4f(p.u_front_color,1,1,1,n.frontOpacity||.65),u.uniform4f(p.u_back_color,1,1,1,n.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6),a.save(),a.clearRect(0,0,d,v);let A=d*.36,C={x:d*.5,y:v*.5};if(Qe(a,A,C,o,r,n),Te(a,A,C,o,r,c),c.svTriangle){let y=W(b||m,i,A,C,o,r);if(Math.abs((y.w.x-y.c.x)*(y.k.y-y.c.y)-(y.w.y-y.c.y)*(y.k.x-y.c.x))>4){let z=Math.round(y.cRGB.x*255),B=Math.round(y.cRGB.y*255),Z=Math.round(y.cRGB.z*255);a.save(),a.beginPath(),a.moveTo(y.c.x,y.c.y),a.lineTo(y.w.x,y.w.y),a.lineTo(y.k.x,y.k.y),a.closePath(),a.fillStyle=`rgba(${z}, ${B}, ${Z}, 0.12)`,a.fill(),a.strokeStyle=`rgba(${z}, ${B}, ${Z}, 0.7)`,a.lineWidth=1.2,a.setLineDash([]),a.stroke(),a.beginPath(),a.arc(y.w.x,y.w.y,3.5,0,Math.PI*2),a.fillStyle="#ffffff",a.fill(),a.strokeStyle="rgba(17, 24, 39, 0.6)",a.lineWidth=1.2,a.stroke(),a.beginPath(),a.arc(y.k.x,y.k.y,3.5,0,Math.PI*2),a.fillStyle="#111827",a.fill(),a.strokeStyle="rgba(255, 255, 255, 0.7)",a.lineWidth=1.2,a.stroke(),a.restore()}}if(f){let y=E(m,A,C,o,r),_=S(m,i),z=s?{r:255-_.r,g:255-_.g,b:255-_.b}:_;a.beginPath(),a.arc(y.x,y.y,6,0,Math.PI*2),a.fillStyle=`rgb(${z.r}, ${z.g}, ${z.b})`,a.fill(),a.strokeStyle="#ffffff",a.lineWidth=2,a.stroke()}a.restore()}var M=Math.PI/180,fe=2*Math.PI,be=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},de=e=>{let o=e%fe;return o>Math.PI?o-=fe:o<-Math.PI&&(o+=fe),o};function Je(e,o={}){let r=o.size||460,i=o.mode||"rgb",s=!1,c={...Ae},n={...De,radius:.08},m={...Be},f={...Le},b={x:8*M,y:-20*M,z:-55*M},u=X(b.x,b.y,b.z),a=O(),d={...b},v=()=>{c.mat=w(a,u)},F=o.initialColor||{r:255,g:255,b:255},p=V(F,i),L=!1,x=null,A=new Set,C=Fe(e,r),y=null,_=()=>{y===null&&(y=requestAnimationFrame(()=>{y=null,Pe(C,c,n,i,s,m,f,p,!0,x)}))},z=()=>{let t=S(p,i),l=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,h=Q(l),k=J(l),R=ie(l),g={rgb:l,hsb:h,oklch:k,hex:R,alpha:1};A.forEach(G=>G(g))},B=(t,l)=>{l!==0&&(t==="x"?(u=w(u,U(l)),d.x+=l):t==="y"?(u=w(u,H(l)),d.y+=l):(u=w(u,ce(l)),d.z+=l),v(),_())},Z=(t,l)=>{a=w(H(t*.01),a),a=w(U(-l*.01),a),v(),_()},oe=t=>{a=w(t,le(u)),v(),_()},he=()=>{u=X(b.x,b.y,b.z),a=O(),d={...b},c.zoom=1,v(),_()},I=!1,$=!1,N=0,j=0,ge=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),Oe=()=>{let t=ge();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Xe=t=>{let l=ge(),h=Oe(),k=Math.abs(t.x)-(l.x-h),R=Math.abs(t.y)-(l.y-h),g=Math.abs(t.z)-(l.z-h),G=Math.max(k,0),D=Math.max(R,0),T=Math.max(g,0),P=Math.hypot(G,D,T),Y=Math.min(Math.max(k,Math.max(R,g)),0);return P+Y-h},K=(t,l)=>{let h=C.canvasGL.getBoundingClientRect(),k=(t-h.left)*(C.width/h.width),R=(l-h.top)*(C.height/h.height),g=k-C.width*.5,G=C.height*.5-R,D=C.width*.36*1.6*(c.zoom||1),T={x:g/D,y:G/D},P=q=>ue(le(c.mat),q),Y=0,ze=null;for(let q=0;q<96;q++){let Ie={x:T.x,y:T.y,z:-5+Y},ke=P(Ie),Re=Xe(ke);if(Re<.001){ze=ke;break}if(Y+=Re,Y>10)break}return ze},xe=(t,l)=>{let h=K(t,l);if(!h)return;let k=Math.max(0,Math.min(1,h.x/n.sizeX+.5)),R=Math.max(0,Math.min(1,h.y/n.sizeY+.5)),g=Math.max(0,Math.min(1,h.z/n.sizeZ+.5));p={x:k,y:R,z:g},z(),_()},ye=(t,l)=>{if(!m.svTriangle)return null;let h=C.canvasGL.getBoundingClientRect(),k=(t-h.left)*(C.width/h.width),R=(l-h.top)*(C.height/h.height),g=W(x||p,i,C.width*.36,{x:C.width*.5,y:C.height*.5},c,n),G=(g.w.y-g.k.y)*(g.c.x-g.k.x)+(g.k.x-g.w.x)*(g.c.y-g.k.y);if(Math.abs(G)<1e-6)return null;let D=((g.w.y-g.k.y)*(k-g.k.x)+(g.k.x-g.w.x)*(R-g.k.y))/G,T=((g.k.y-g.c.y)*(k-g.k.x)+(g.c.x-g.k.x)*(R-g.k.y))/G,P=1-D-T;return D<-.02||T<-.02||P<-.02?null:{a:D,b:T,g:P}},pe=t=>{let h=W(x||p,i,C.width*.36,{x:C.width*.5,y:C.height*.5},c,n),k=Math.max(0,Math.min(1,t.a*h.cRGB.x+t.b)),R=Math.max(0,Math.min(1,t.a*h.cRGB.y+t.b)),g=Math.max(0,Math.min(1,t.a*h.cRGB.z+t.b));p=V({r:k*255,g:R*255,b:g*255},i),z(),_()},Ce=0,ve=0,_e=(t,l)=>{Ce=t,ve=l,C.canvasGL.style.cursor=K(t,l)?"default":"grab"};C.canvasGL.addEventListener("mousemove",t=>{_e(t.clientX,t.clientY)}),C.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)I=!0,N=t.clientX,j=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let l=ye(t.clientX,t.clientY);l?(L=!0,x={...p},pe(l)):K(t.clientX,t.clientY)?($=!0,xe(t.clientX,t.clientY)):(I=!0,N=t.clientX,j=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),C.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(L){let l=ye(t.clientX,t.clientY);l&&pe(l)}else if(I){let l=t.clientX-N,h=t.clientY-j;N=t.clientX,j=t.clientY,Z(l,h)}else $&&xe(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{L&&(L=!1,x=null),I&&(I=!1,document.body.style.cursor="default"),$&&($=!1),_e(Ce,ve)}),C.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let l=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+l)),_()},{passive:!1}),C.canvasGL.addEventListener("dblclick",t=>{K(t.clientX,t.clientY)?(s=!s,z()):he(),_()});let Me=t=>{let l=t.target?.tagName;if(!(l==="INPUT"||l==="TEXTAREA"))switch(t.key){case"r":case"R":he();break;case"f":case"F":oe(O());break;case"b":case"B":oe(H(Math.PI));break;case"t":case"T":oe(U(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),B("y",-5*M);break;case"ArrowRight":t.preventDefault(),B("y",5*M);break;case"ArrowUp":t.preventDefault(),B("x",5*M);break;case"ArrowDown":t.preventDefault(),B("x",-5*M);break}};return window.addEventListener("keydown",Me),_(),z(),{getColor:()=>{let t=S(p,i),l=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:l,hsb:Q(l),oklch:J(l),hex:ie(l),alpha:1}},setColor:t=>{F=t,p=V(t,i),z(),_()},setMode:t=>{i=t,z(),_()},getMode:()=>i,setRotation:(t,l)=>{u=X(l*M,0,t*M),a=O(),d.x=l*M,d.y=0,d.z=t*M,v(),_()},getAxisRotation:()=>({rotXDeg:Math.round(be(d.x*180/Math.PI)*10)/10,rotYDeg:Math.round(be(d.y*180/Math.PI)*10)/10,rotZDeg:Math.round(be(d.z*180/Math.PI)*10)/10}),setAxisRotation:(t,l,h)=>{B("x",de(t*M-d.x)),B("y",de(l*M-d.y)),B("z",de(h*M-d.z))},rotateLocal:(t,l)=>{B(t,l*M)},resetRotation:(t,l,h)=>{u=X(t*M,l*M,h*M),a=O(),d.x=t*M,d.y=l*M,d.z=h*M,v(),_()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),_()},getZoom:()=>c.zoom||1,setDimensions:(t,l,h)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,l)),n.sizeZ=Math.max(.2,Math.min(2.5,h)),_()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),_()},getRadius:()=>n.radius,getEdgeStyle:()=>({...f}),setEdgeStyle:t=>{f={...f,...t},_()},getGuides:()=>({...m}),setGuides:t=>{m={...m,...t},_()},toggleAllGuides:t=>{let l=t!==void 0?t:!m.vertexX;m={vertexX:l,vertexY:l,vertexZ:l,centerX:l,centerY:l,centerZ:l,angleGuides:l},_()},on:(t,l)=>{A.add(l)},off:(t,l)=>{A.delete(l)},destroy:()=>{y!==null&&cancelAnimationFrame(y),window.removeEventListener("keydown",Me),e.innerHTML=""}}}return $e(eo);})();
