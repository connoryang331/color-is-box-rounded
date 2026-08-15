var ColorIsBoxRounded=(()=>{var re=Object.defineProperty;var Ue=Object.getOwnPropertyDescriptor;var He=Object.getOwnPropertyNames;var We=Object.prototype.hasOwnProperty;var Ze=(e,o)=>{for(var r in o)re(e,r,{get:o[r],enumerable:!0})},$e=(e,o,r,a)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of He(o))!We.call(e,s)&&s!==r&&re(e,s,{get:()=>o[s],enumerable:!(a=Ue(o,s))||a.enumerable});return e};var Ne=e=>$e(re({},"__esModule",{value:!0}),e);var oo={};Ze(oo,{createRoundedBoxPicker:()=>eo});var Be={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},we={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function oe(e){let o=e.r/255,r=e.g/255,a=e.b/255,s=Math.max(o,r,a),c=Math.min(o,r,a),n=s-c,m=0;n!==0&&(s===o?m=((r-a)/n+6)%6:s===r?m=(a-o)/n+2:m=(o-r)/n+4,m*=60);let f=s===0?0:n/s*100,b=s*100;return{h:m,s:f,b}}function je(e){let o=e.h,r=e.s/100,a=e.b/100,s=a*r,c=s*(1-Math.abs(o/60%2-1)),n=a-s,m,f,b;return o<60?(m=s,f=c,b=0):o<120?(m=c,f=s,b=0):o<180?(m=0,f=s,b=c):o<240?(m=0,f=c,b=s):o<300?(m=c,f=0,b=s):(m=s,f=0,b=c),{r:Math.round((m+n)*255),g:Math.round((f+n)*255),b:Math.round((b+n)*255)}}function ae(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ie(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Ke(e){let o=ae(e.r/255),r=ae(e.g/255),a=ae(e.b/255),s=.4122214708*o+.5363325363*r+.0514459929*a,c=.2119034982*o+.6806995451*r+.1073969566*a,n=.0883024619*o+.2817188376*r+.6299787005*a,m=Math.cbrt(s),f=Math.cbrt(c),b=Math.cbrt(n);return{L:.2104542553*m+.793617785*f-.0040720468*b,a:1.9779984951*m-2.428592205*f+.4505937099*b,b:.0259040371*m+.7827717662*f-.808675766*b}}function qe(e,o,r){let a=e+.3963377774*o+.2158037573*r,s=e-.1055613458*o-.0638541728*r,c=e-.0894841775*o-1.291485548*r,n=a*a*a,m=s*s*s,f=c*c*c,b=4.0767416621*n-3.3077115913*m+.2309699292*f,d=-1.2684380046*n+2.6097574011*m-.3413193965*f,u=-.0041960863*n-.7034186147*m+1.707614701*f;return{r:Math.round(Math.max(0,Math.min(1,ie(b)))*255),g:Math.round(Math.max(0,Math.min(1,ie(d)))*255),b:Math.round(Math.max(0,Math.min(1,ie(u)))*255)}}function te(e){let o=Ke(e),r=Math.sqrt(o.a*o.a+o.b*o.b),a=Math.atan2(o.b,o.a)*(180/Math.PI);return a<0&&(a+=360),{l:o.L,c:r,h:r<1e-4?0:a}}function se(e){let o=e.h*(Math.PI/180),r=e.c*Math.cos(o),a=e.c*Math.sin(o);return qe(e.l,r,a)}function Qe(e,o,r){let a=se({l:e,c:o,h:r});if(Ge(a))return{l:e,c:o,h:r};let s=0,c=o;for(let n=0;n<20;n++){let m=(s+c)/2;a=se({l:e,c:m,h:r}),Ge(a)?s=m:c=m}return{l:e,c:s,h:r}}function Ge(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function ce(e){let o=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Ae=.4;function F(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return je({h:e.x*359,s:e.y*100,b:e.z*100});{let r=e.x,a=e.y*Ae,s=e.z*359,c=Qe(r,a,s);return se(c)}}function P(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let r=oe(e);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=te(e);return{x:r.l,y:Math.min(r.c/Ae,1),z:r.h/359}}}var le=Math.PI/180;function X(){return[1,0,0,0,1,0,0,0,1]}function W(e){let o=Math.cos(e),r=Math.sin(e);return[1,0,0,0,o,-r,0,r,o]}function Z(e){let o=Math.cos(e),r=Math.sin(e);return[o,0,r,0,1,0,-r,0,o]}function ue(e){let o=Math.cos(e),r=Math.sin(e);return[o,r,0,-r,o,0,0,0,1]}function G(e,o){let r=new Array(9);for(let a=0;a<3;a++)for(let s=0;s<3;s++)r[a*3+s]=e[a*3]*o[s]+e[a*3+1]*o[3+s]+e[a*3+2]*o[6+s];return r}function me(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function fe(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function I(e,o,r){return G(Z(o),G(ue(r),W(e)))}var De={mat:I(8*le,-20*le,-55*le),zoom:1},Te={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ne(e,o,r){let a=(e.x-.5)*r.sizeX,s=(e.y-.5)*r.sizeY,c=(e.z-.5)*r.sizeZ;return fe(o.mat,{x:a,y:s,z:c})}function V(e,o,r,a,s){let c=ne(e,a,s);return{x:r.x+c.x*o*1.6*a.zoom,y:r.y-c.y*o*1.6*a.zoom}}function $(e,o,r,a,s,c){let n=F(e,o),m={x:n.r/255,y:n.g/255,z:n.b/255},f=P({r:255,g:255,b:255},o),b=P({r:0,g:0,b:0},o);return{c:V(e,r,a,s,c),w:V(f,r,a,s,c),k:V(b,r,a,s,c),cRGB:m}}var be=["#ef4444","#22c55e","#3b82f6"];function Ee(e,o,r,a,s,c){let n=u=>V(u,o,r,a,s);e.save();let m=n({x:.5,y:.5,z:.5}),f=.35,b=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:be[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:be[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:be[2],name:"Cz",visible:c.centerZ}],d=!1;for(let u=0;u<b.length;u++){if(!b[u].visible)continue;d=!0;let i=n(b[u].from),p=n(b[u].to);e.beginPath(),e.moveTo(i.x,i.y),e.lineTo(p.x,p.y),e.strokeStyle=b[u].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(i.x,i.y,3,0,Math.PI*2),e.arc(p.x,p.y,3,0,Math.PI*2),e.fillStyle=b[u].color,e.fill()}d&&(e.beginPath(),e.arc(m.x,m.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Se=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Ve=`
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
`;function Pe(e,o){let r=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.userSelect="none";let s=document.createElement("canvas");s.width=o*r,s.height=o*r,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*r,c.height=o*r,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",a.appendChild(s),a.appendChild(c),e.appendChild(a);let n=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=c.getContext("2d");m.scale(r,r);let f=(k,v)=>{let z=n.createShader(k);return n.shaderSource(z,v),n.compileShader(z),n.getShaderParameter(z,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(z)),z},b=f(n.VERTEX_SHADER,Se),d=f(n.FRAGMENT_SHADER,Ve),u=n.createProgram();n.attachShader(u,b),n.attachShader(u,d),n.linkProgram(u);let i=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,i),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let p=n.getAttribLocation(u,"position");n.enableVertexAttribArray(p),n.vertexAttribPointer(p,2,n.FLOAT,!1,0,0);let A={u_resolution:n.getUniformLocation(u,"u_resolution"),u_box_size:n.getUniformLocation(u,"u_box_size"),u_radius:n.getUniformLocation(u,"u_radius"),u_mat:n.getUniformLocation(u,"u_mat"),u_mat_inv:n.getUniformLocation(u,"u_mat_inv"),u_zoom:n.getUniformLocation(u,"u_zoom"),u_mode:n.getUniformLocation(u,"u_mode"),u_invert:n.getUniformLocation(u,"u_invert"),u_show_front:n.getUniformLocation(u,"u_show_front"),u_show_back:n.getUniformLocation(u,"u_show_back"),u_front_width:n.getUniformLocation(u,"u_front_width"),u_back_width:n.getUniformLocation(u,"u_back_width"),u_front_dashed:n.getUniformLocation(u,"u_front_dashed"),u_back_dashed:n.getUniformLocation(u,"u_back_dashed"),u_front_color:n.getUniformLocation(u,"u_front_color"),u_back_color:n.getUniformLocation(u,"u_back_color")};return{gl:n,overlayCtx:m,canvasGL:s,canvasOverlay:c,width:o,height:o,program:u,uniforms:A}}var Fe=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Je(e,o,r,a,s,c){if(!c.showFront&&!c.showBack)return;let n=d=>V(d,o,r,a,s),f=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),b=d=>{let u=ne({x:.5,y:.5,z:.5},a,s);return ne({x:.5+d.x*.1,y:.5+d.y*.1,z:.5+d.z*.1},a,s).z-u.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let d of Fe)if(!(b(d.normalA)||b(d.normalB))){let[i,p]=d.edge;e.beginPath(),e.moveTo(f[i].x,f[i].y),e.lineTo(f[p].x,f[p].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let d of Fe)if(b(d.normalA)||b(d.normalB)){let[i,p]=d.edge;e.beginPath(),e.moveTo(f[i].x,f[i].y),e.lineTo(f[p].x,f[p].y),e.stroke()}}e.restore()}function Oe(e,o,r,a,s,c,n,m,f,b,d){let{gl:u,overlayCtx:i,width:p,height:A,program:k,uniforms:v}=e,z=window.devicePixelRatio||1;u.viewport(0,0,p*z,A*z),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(k),u.uniform2f(v.u_resolution,p*z,A*z),u.uniform3f(v.u_box_size,r.sizeX,r.sizeY,r.sizeZ),u.uniform1f(v.u_radius,r.radius!==void 0?r.radius:.001);let C=o.mat;u.uniformMatrix3fv(v.u_mat,!1,new Float32Array([C[0],C[3],C[6],C[1],C[4],C[7],C[2],C[5],C[8]])),u.uniformMatrix3fv(v.u_mat_inv,!1,new Float32Array([C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]])),u.uniform1f(v.u_zoom,o.zoom||1),u.uniform1i(v.u_mode,a==="rgb"?0:a==="hsb"?1:2),u.uniform1i(v.u_invert,s?1:0),u.uniform1i(v.u_show_front,n.showFront?1:0),u.uniform1i(v.u_show_back,n.showBack?1:0),u.uniform1f(v.u_front_width,n.frontWidth||1.5),u.uniform1f(v.u_back_width,n.backWidth||1),u.uniform1i(v.u_front_dashed,n.frontDashed?1:0),u.uniform1i(v.u_back_dashed,n.backDashed?1:0),u.uniform4f(v.u_front_color,1,1,1,n.frontOpacity||.65),u.uniform4f(v.u_back_color,1,1,1,n.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6),i.save(),i.clearRect(0,0,p,A);let T=p*.36,y={x:p*.5,y:A*.5};if(Je(i,T,y,o,r,n),Ee(i,T,y,o,r,c),c.svTriangle){let h=$(b||m,a,T,y,o,r);if(Math.abs((h.w.x-h.c.x)*(h.k.y-h.c.y)-(h.w.y-h.c.y)*(h.k.x-h.c.x))>4){let R=Math.round(h.cRGB.x*255),w=Math.round(h.cRGB.y*255),N=Math.round(h.cRGB.z*255);if(i.save(),i.beginPath(),i.moveTo(h.c.x,h.c.y),i.lineTo(h.w.x,h.w.y),i.lineTo(h.k.x,h.k.y),i.closePath(),i.fillStyle=`rgba(${R}, ${w}, ${N}, 0.12)`,i.fill(),i.strokeStyle=`rgba(${R}, ${w}, ${N}, 0.7)`,i.lineWidth=1.2,i.setLineDash([]),i.stroke(),i.beginPath(),i.arc(h.w.x,h.w.y,3.5,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="rgba(17, 24, 39, 0.6)",i.lineWidth=1.2,i.stroke(),i.beginPath(),i.arc(h.k.x,h.k.y,3.5,0,Math.PI*2),i.fillStyle="#111827",i.fill(),i.strokeStyle="rgba(255, 255, 255, 0.7)",i.lineWidth=1.2,i.stroke(),d){let Y=d.a*h.c.x+d.b*h.w.x+d.g*h.k.x,j=d.a*h.c.y+d.b*h.w.y+d.g*h.k.y;i.beginPath(),i.arc(Y,j,4,0,Math.PI*2),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="rgba(17, 24, 39, 0.75)",i.lineWidth=1.4,i.stroke()}i.restore()}}if(f&&!d){let h=V(m,T,y,o,r),_=F(m,a),R=s?{r:255-_.r,g:255-_.g,b:255-_.b}:_;i.beginPath(),i.arc(h.x,h.y,6,0,Math.PI*2),i.fillStyle=`rgb(${R.r}, ${R.g}, ${R.b})`,i.fill(),i.strokeStyle="#ffffff",i.lineWidth=2,i.stroke()}i.restore()}var M=Math.PI/180,de=2*Math.PI,he=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},ge=e=>{let o=e%de;return o>Math.PI?o-=de:o<-Math.PI&&(o+=de),o};function eo(e,o={}){let r=o.size||460,a=o.mode||"rgb",s=!1,c={...De},n={...Te,radius:.08},m={...we},f={...Be},b={x:8*M,y:-20*M,z:-55*M},d=I(b.x,b.y,b.z),u=X(),i={...b},p=()=>{c.mat=G(u,d)},A=o.initialColor||{r:255,g:255,b:255},k=P(A,a),v=!1,z=null,C=null,T=new Set,y=Pe(e,r),h=null,_=()=>{h===null&&(h=requestAnimationFrame(()=>{h=null,Oe(y,c,n,a,s,m,f,k,!0,z,C)}))},R=()=>{let t=F(k,a),l=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,g=oe(l),L=te(l),B=ce(l),x={rgb:l,hsb:g,oklch:L,hex:B,alpha:1};T.forEach(D=>D(x))},w=(t,l)=>{l!==0&&(t==="x"?(d=G(d,W(l)),i.x+=l):t==="y"?(d=G(d,Z(l)),i.y+=l):(d=G(d,ue(l)),i.z+=l),p(),_())},N=(t,l)=>{u=G(Z(t*.01),u),u=G(W(-l*.01),u),p(),_()},Y=t=>{u=G(t,me(d)),p(),_()},j=()=>{d=I(b.x,b.y,b.z),u=X(),i={...b},c.zoom=1,p(),_()},U=!1,K=!1,q=0,Q=0,xe=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),Xe=()=>{let t=xe();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Ie=t=>{let l=xe(),g=Xe(),L=Math.abs(t.x)-(l.x-g),B=Math.abs(t.y)-(l.y-g),x=Math.abs(t.z)-(l.z-g),D=Math.max(L,0),E=Math.max(B,0),S=Math.max(x,0),O=Math.hypot(D,E,S),H=Math.min(Math.max(L,Math.max(B,x)),0);return O+H-g},J=(t,l)=>{let g=y.canvasGL.getBoundingClientRect(),L=(t-g.left)*(y.width/g.width),B=(l-g.top)*(y.height/g.height),x=L-y.width*.5,D=y.height*.5-B,E=y.width*.36*1.6*(c.zoom||1),S={x:x/E,y:D/E},O=ee=>fe(me(c.mat),ee),H=0,ke=null;for(let ee=0;ee<96;ee++){let Ye={x:S.x,y:S.y,z:-5+H},Re=O(Ye),Le=Ie(Re);if(Le<.001){ke=Re;break}if(H+=Le,H>10)break}return ke},ye=(t,l)=>{let g=J(t,l);if(!g)return;let L=Math.max(0,Math.min(1,g.x/n.sizeX+.5)),B=Math.max(0,Math.min(1,g.y/n.sizeY+.5)),x=Math.max(0,Math.min(1,g.z/n.sizeZ+.5));k={x:L,y:B,z:x},R(),_()},pe=(t,l)=>{if(!m.svTriangle)return null;let g=y.canvasGL.getBoundingClientRect(),L=(t-g.left)*(y.width/g.width),B=(l-g.top)*(y.height/g.height),x=$(z||k,a,y.width*.36,{x:y.width*.5,y:y.height*.5},c,n),D=(x.w.y-x.k.y)*(x.c.x-x.k.x)+(x.k.x-x.w.x)*(x.c.y-x.k.y);if(Math.abs(D)<1e-6)return null;let E=((x.w.y-x.k.y)*(L-x.k.x)+(x.k.x-x.w.x)*(B-x.k.y))/D,S=((x.k.y-x.c.y)*(L-x.k.x)+(x.c.x-x.k.x)*(B-x.k.y))/D,O=1-E-S;return E<-.02||S<-.02||O<-.02?null:{a:E,b:S,g:O}},Ce=t=>{let g=$(z||k,a,y.width*.36,{x:y.width*.5,y:y.height*.5},c,n),L=Math.max(0,Math.min(1,t.a*g.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*g.cRGB.y+t.b)),x=Math.max(0,Math.min(1,t.a*g.cRGB.z+t.b));k=P({r:L*255,g:B*255,b:x*255},a),R(),_()},_e=0,ve=0,Me=(t,l)=>{_e=t,ve=l,y.canvasGL.style.cursor=J(t,l)?"default":"grab"};y.canvasGL.addEventListener("mousemove",t=>{Me(t.clientX,t.clientY)}),y.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)U=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let l=pe(t.clientX,t.clientY);l?(v=!0,z={...k},C=l,Ce(l)):J(t.clientX,t.clientY)?(K=!0,z=null,C=null,ye(t.clientX,t.clientY)):(U=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),y.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(v){let l=pe(t.clientX,t.clientY);l&&(C=l,Ce(l))}else if(U){let l=t.clientX-q,g=t.clientY-Q;q=t.clientX,Q=t.clientY,N(l,g)}else K&&ye(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{v&&(v=!1),U&&(U=!1,document.body.style.cursor="default"),K&&(K=!1),Me(_e,ve)}),y.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let l=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+l)),_()},{passive:!1}),y.canvasGL.addEventListener("dblclick",t=>{J(t.clientX,t.clientY)?(s=!s,R()):j(),_()});let ze=t=>{let l=t.target?.tagName;if(!(l==="INPUT"||l==="TEXTAREA"))switch(t.key){case"r":case"R":j();break;case"f":case"F":Y(X());break;case"b":case"B":Y(Z(Math.PI));break;case"t":case"T":Y(W(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),w("y",-5*M);break;case"ArrowRight":t.preventDefault(),w("y",5*M);break;case"ArrowUp":t.preventDefault(),w("x",5*M);break;case"ArrowDown":t.preventDefault(),w("x",-5*M);break}};return window.addEventListener("keydown",ze),_(),R(),{getColor:()=>{let t=F(k,a),l=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:l,hsb:oe(l),oklch:te(l),hex:ce(l),alpha:1}},setColor:t=>{A=t,k=P(t,a),z=null,C=null,R(),_()},setMode:t=>{a=t,z=null,C=null,R(),_()},getMode:()=>a,setRotation:(t,l)=>{d=I(l*M,0,t*M),u=X(),i.x=l*M,i.y=0,i.z=t*M,p(),_()},getAxisRotation:()=>({rotXDeg:Math.round(he(i.x*180/Math.PI)*10)/10,rotYDeg:Math.round(he(i.y*180/Math.PI)*10)/10,rotZDeg:Math.round(he(i.z*180/Math.PI)*10)/10}),setAxisRotation:(t,l,g)=>{w("x",ge(t*M-i.x)),w("y",ge(l*M-i.y)),w("z",ge(g*M-i.z))},rotateLocal:(t,l)=>{w(t,l*M)},resetRotation:(t,l,g)=>{d=I(t*M,l*M,g*M),u=X(),i.x=t*M,i.y=l*M,i.z=g*M,p(),_()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),_()},getZoom:()=>c.zoom||1,setDimensions:(t,l,g)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,l)),n.sizeZ=Math.max(.2,Math.min(2.5,g)),_()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),_()},getRadius:()=>n.radius,getEdgeStyle:()=>({...f}),setEdgeStyle:t=>{f={...f,...t},_()},getGuides:()=>({...m}),setGuides:t=>{m={...m,...t},_()},toggleAllGuides:t=>{let l=t!==void 0?t:!m.vertexX;m={vertexX:l,vertexY:l,vertexZ:l,centerX:l,centerY:l,centerZ:l,angleGuides:l},_()},on:(t,l)=>{T.add(l)},off:(t,l)=>{T.delete(l)},destroy:()=>{h!==null&&cancelAnimationFrame(h),window.removeEventListener("keydown",ze),e.innerHTML=""}}}return Ne(oo);})();
