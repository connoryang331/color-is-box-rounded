var Le={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Be={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function oe(e){let o=e.r/255,r=e.g/255,i=e.b/255,u=Math.max(o,r,i),s=Math.min(o,r,i),n=u-s,m=0;n!==0&&(u===o?m=((r-i)/n+6)%6:u===r?m=(i-o)/n+2:m=(o-r)/n+4,m*=60);let f=u===0?0:n/u*100,b=u*100;return{h:m,s:f,b}}function Ye(e){let o=e.h,r=e.s/100,i=e.b/100,u=i*r,s=u*(1-Math.abs(o/60%2-1)),n=i-u,m,f,b;return o<60?(m=u,f=s,b=0):o<120?(m=s,f=u,b=0):o<180?(m=0,f=u,b=s):o<240?(m=0,f=s,b=u):o<300?(m=s,f=0,b=u):(m=u,f=0,b=s),{r:Math.round((m+n)*255),g:Math.round((f+n)*255),b:Math.round((b+n)*255)}}function re(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ae(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Ue(e){let o=re(e.r/255),r=re(e.g/255),i=re(e.b/255),u=.4122214708*o+.5363325363*r+.0514459929*i,s=.2119034982*o+.6806995451*r+.1073969566*i,n=.0883024619*o+.2817188376*r+.6299787005*i,m=Math.cbrt(u),f=Math.cbrt(s),b=Math.cbrt(n);return{L:.2104542553*m+.793617785*f-.0040720468*b,a:1.9779984951*m-2.428592205*f+.4505937099*b,b:.0259040371*m+.7827717662*f-.808675766*b}}function He(e,o,r){let i=e+.3963377774*o+.2158037573*r,u=e-.1055613458*o-.0638541728*r,s=e-.0894841775*o-1.291485548*r,n=i*i*i,m=u*u*u,f=s*s*s,b=4.0767416621*n-3.3077115913*m+.2309699292*f,d=-1.2684380046*n+2.6097574011*m-.3413193965*f,l=-.0041960863*n-.7034186147*m+1.707614701*f;return{r:Math.round(Math.max(0,Math.min(1,ae(b)))*255),g:Math.round(Math.max(0,Math.min(1,ae(d)))*255),b:Math.round(Math.max(0,Math.min(1,ae(l)))*255)}}function te(e){let o=Ue(e),r=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:r,h:r<1e-4?0:i}}function ie(e){let o=e.h*(Math.PI/180),r=e.c*Math.cos(o),i=e.c*Math.sin(o);return He(e.l,r,i)}function We(e,o,r){let i=ie({l:e,c:o,h:r});if(we(i))return{l:e,c:o,h:r};let u=0,s=o;for(let n=0;n<20;n++){let m=(u+s)/2;i=ie({l:e,c:m,h:r}),we(i)?u=m:s=m}return{l:e,c:u,h:r}}function we(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function se(e){let o=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var Ge=.4;function F(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return Ye({h:e.x*359,s:e.y*100,b:e.z*100});{let r=e.x,i=e.y*Ge,u=e.z*359,s=We(r,i,u);return ie(s)}}function P(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let r=oe(e);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=te(e);return{x:r.l,y:Math.min(r.c/Ge,1),z:r.h/359}}}var ce=Math.PI/180;function X(){return[1,0,0,0,1,0,0,0,1]}function W(e){let o=Math.cos(e),r=Math.sin(e);return[1,0,0,0,o,-r,0,r,o]}function Z(e){let o=Math.cos(e),r=Math.sin(e);return[o,0,r,0,1,0,-r,0,o]}function le(e){let o=Math.cos(e),r=Math.sin(e);return[o,r,0,-r,o,0,0,0,1]}function G(e,o){let r=new Array(9);for(let i=0;i<3;i++)for(let u=0;u<3;u++)r[i*3+u]=e[i*3]*o[u]+e[i*3+1]*o[3+u]+e[i*3+2]*o[6+u];return r}function ue(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function me(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function I(e,o,r){return G(Z(o),G(le(r),W(e)))}var Ae={mat:I(8*ce,-20*ce,-55*ce),zoom:1},De={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ne(e,o,r){let i=(e.x-.5)*r.sizeX,u=(e.y-.5)*r.sizeY,s=(e.z-.5)*r.sizeZ;return me(o.mat,{x:i,y:u,z:s})}function V(e,o,r,i,u){let s=ne(e,i,u);return{x:r.x+s.x*o*1.6*i.zoom,y:r.y-s.y*o*1.6*i.zoom}}function $(e,o,r,i,u,s){let n=F(e,o),m={x:n.r/255,y:n.g/255,z:n.b/255},f=P({r:255,g:255,b:255},o),b=P({r:0,g:0,b:0},o);return{c:V(e,r,i,u,s),w:V(f,r,i,u,s),k:V(b,r,i,u,s),cRGB:m}}var fe=["#ef4444","#22c55e","#3b82f6"];function Te(e,o,r,i,u,s){let n=l=>V(l,o,r,i,u);e.save();let m=n({x:.5,y:.5,z:.5}),f=.35,b=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:fe[0],name:"Cx",visible:s.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:fe[1],name:"Cy",visible:s.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:fe[2],name:"Cz",visible:s.centerZ}],d=!1;for(let l=0;l<b.length;l++){if(!b[l].visible)continue;d=!0;let a=n(b[l].from),p=n(b[l].to);e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(p.x,p.y),e.strokeStyle=b[l].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(a.x,a.y,3,0,Math.PI*2),e.arc(p.x,p.y,3,0,Math.PI*2),e.fillStyle=b[l].color,e.fill()}d&&(e.beginPath(),e.arc(m.x,m.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Ee=`
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
`;function Fe(e,o){let r=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let u=document.createElement("canvas");u.width=o*r,u.height=o*r,u.style.width=`${o}px`,u.style.height=`${o}px`,u.style.position="absolute",u.style.left="0",u.style.top="0";let s=document.createElement("canvas");s.width=o*r,s.height=o*r,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.pointerEvents="none",i.appendChild(u),i.appendChild(s),e.appendChild(i);let n=u.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=s.getContext("2d");m.scale(r,r);let f=(k,v)=>{let z=n.createShader(k);return n.shaderSource(z,v),n.compileShader(z),n.getShaderParameter(z,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(z)),z},b=f(n.VERTEX_SHADER,Ee),d=f(n.FRAGMENT_SHADER,Se),l=n.createProgram();n.attachShader(l,b),n.attachShader(l,d),n.linkProgram(l);let a=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let p=n.getAttribLocation(l,"position");n.enableVertexAttribArray(p),n.vertexAttribPointer(p,2,n.FLOAT,!1,0,0);let A={u_resolution:n.getUniformLocation(l,"u_resolution"),u_box_size:n.getUniformLocation(l,"u_box_size"),u_radius:n.getUniformLocation(l,"u_radius"),u_mat:n.getUniformLocation(l,"u_mat"),u_mat_inv:n.getUniformLocation(l,"u_mat_inv"),u_zoom:n.getUniformLocation(l,"u_zoom"),u_mode:n.getUniformLocation(l,"u_mode"),u_invert:n.getUniformLocation(l,"u_invert"),u_show_front:n.getUniformLocation(l,"u_show_front"),u_show_back:n.getUniformLocation(l,"u_show_back"),u_front_width:n.getUniformLocation(l,"u_front_width"),u_back_width:n.getUniformLocation(l,"u_back_width"),u_front_dashed:n.getUniformLocation(l,"u_front_dashed"),u_back_dashed:n.getUniformLocation(l,"u_back_dashed"),u_front_color:n.getUniformLocation(l,"u_front_color"),u_back_color:n.getUniformLocation(l,"u_back_color")};return{gl:n,overlayCtx:m,canvasGL:u,canvasOverlay:s,width:o,height:o,program:l,uniforms:A}}var Ve=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Ze(e,o,r,i,u,s){if(!s.showFront&&!s.showBack)return;let n=d=>V(d,o,r,i,u),f=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),b=d=>{let l=ne({x:.5,y:.5,z:.5},i,u);return ne({x:.5+d.x*.1,y:.5+d.y*.1,z:.5+d.z*.1},i,u).z-l.z>0};if(e.save(),s.showBack){e.lineWidth=s.backWidth,s.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.backColor,e.globalAlpha=s.backOpacity;for(let d of Ve)if(!(b(d.normalA)||b(d.normalB))){let[a,p]=d.edge;e.beginPath(),e.moveTo(f[a].x,f[a].y),e.lineTo(f[p].x,f[p].y),e.stroke()}}if(s.showFront){e.lineWidth=s.frontWidth,s.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.frontColor,e.globalAlpha=s.frontOpacity;for(let d of Ve)if(b(d.normalA)||b(d.normalB)){let[a,p]=d.edge;e.beginPath(),e.moveTo(f[a].x,f[a].y),e.lineTo(f[p].x,f[p].y),e.stroke()}}e.restore()}function Pe(e,o,r,i,u,s,n,m,f,b,d){let{gl:l,overlayCtx:a,width:p,height:A,program:k,uniforms:v}=e,z=window.devicePixelRatio||1;l.viewport(0,0,p*z,A*z),l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),l.useProgram(k),l.uniform2f(v.u_resolution,p*z,A*z),l.uniform3f(v.u_box_size,r.sizeX,r.sizeY,r.sizeZ),l.uniform1f(v.u_radius,r.radius!==void 0?r.radius:.001);let C=o.mat;l.uniformMatrix3fv(v.u_mat,!1,new Float32Array([C[0],C[3],C[6],C[1],C[4],C[7],C[2],C[5],C[8]])),l.uniformMatrix3fv(v.u_mat_inv,!1,new Float32Array([C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8]])),l.uniform1f(v.u_zoom,o.zoom||1),l.uniform1i(v.u_mode,i==="rgb"?0:i==="hsb"?1:2),l.uniform1i(v.u_invert,u?1:0),l.uniform1i(v.u_show_front,n.showFront?1:0),l.uniform1i(v.u_show_back,n.showBack?1:0),l.uniform1f(v.u_front_width,n.frontWidth||1.5),l.uniform1f(v.u_back_width,n.backWidth||1),l.uniform1i(v.u_front_dashed,n.frontDashed?1:0),l.uniform1i(v.u_back_dashed,n.backDashed?1:0),l.uniform4f(v.u_front_color,1,1,1,n.frontOpacity||.65),l.uniform4f(v.u_back_color,1,1,1,n.backOpacity||.25),l.drawArrays(l.TRIANGLES,0,6),a.save(),a.clearRect(0,0,p,A);let T=p*.36,y={x:p*.5,y:A*.5};if(Ze(a,T,y,o,r,n),Te(a,T,y,o,r,s),s.svTriangle){let h=$(b||m,i,T,y,o,r);if(Math.abs((h.w.x-h.c.x)*(h.k.y-h.c.y)-(h.w.y-h.c.y)*(h.k.x-h.c.x))>4){let R=Math.round(h.cRGB.x*255),w=Math.round(h.cRGB.y*255),N=Math.round(h.cRGB.z*255);if(a.save(),a.beginPath(),a.moveTo(h.c.x,h.c.y),a.lineTo(h.w.x,h.w.y),a.lineTo(h.k.x,h.k.y),a.closePath(),a.fillStyle=`rgba(${R}, ${w}, ${N}, 0.12)`,a.fill(),a.strokeStyle=`rgba(${R}, ${w}, ${N}, 0.7)`,a.lineWidth=1.2,a.setLineDash([]),a.stroke(),a.beginPath(),a.arc(h.w.x,h.w.y,3.5,0,Math.PI*2),a.fillStyle="#ffffff",a.fill(),a.strokeStyle="rgba(17, 24, 39, 0.6)",a.lineWidth=1.2,a.stroke(),a.beginPath(),a.arc(h.k.x,h.k.y,3.5,0,Math.PI*2),a.fillStyle="#111827",a.fill(),a.strokeStyle="rgba(255, 255, 255, 0.7)",a.lineWidth=1.2,a.stroke(),d){let Y=d.a*h.c.x+d.b*h.w.x+d.g*h.k.x,j=d.a*h.c.y+d.b*h.w.y+d.g*h.k.y;a.beginPath(),a.arc(Y,j,4,0,Math.PI*2),a.fillStyle="#ffffff",a.fill(),a.strokeStyle="rgba(17, 24, 39, 0.75)",a.lineWidth=1.4,a.stroke()}a.restore()}}if(f&&!d){let h=V(m,T,y,o,r),_=F(m,i),R=u?{r:255-_.r,g:255-_.g,b:255-_.b}:_;a.beginPath(),a.arc(h.x,h.y,6,0,Math.PI*2),a.fillStyle=`rgb(${R.r}, ${R.g}, ${R.b})`,a.fill(),a.strokeStyle="#ffffff",a.lineWidth=2,a.stroke()}a.restore()}var M=Math.PI/180,be=2*Math.PI,de=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},he=e=>{let o=e%be;return o>Math.PI?o-=be:o<-Math.PI&&(o+=be),o};function vo(e,o={}){let r=o.size||460,i=o.mode||"rgb",u=!1,s={...Ae},n={...De,radius:.08},m={...Be},f={...Le},b={x:8*M,y:-20*M,z:-55*M},d=I(b.x,b.y,b.z),l=X(),a={...b},p=()=>{s.mat=G(l,d)},A=o.initialColor||{r:255,g:255,b:255},k=P(A,i),v=!1,z=null,C=null,T=new Set,y=Fe(e,r),h=null,_=()=>{h===null&&(h=requestAnimationFrame(()=>{h=null,Pe(y,s,n,i,u,m,f,k,!0,z,C)}))},R=()=>{let t=F(k,i),c=u?{r:255-t.r,g:255-t.g,b:255-t.b}:t,g=oe(c),L=te(c),B=se(c),x={rgb:c,hsb:g,oklch:L,hex:B,alpha:1};T.forEach(D=>D(x))},w=(t,c)=>{c!==0&&(t==="x"?(d=G(d,W(c)),a.x+=c):t==="y"?(d=G(d,Z(c)),a.y+=c):(d=G(d,le(c)),a.z+=c),p(),_())},N=(t,c)=>{l=G(Z(t*.01),l),l=G(W(-c*.01),l),p(),_()},Y=t=>{l=G(t,ue(d)),p(),_()},j=()=>{d=I(b.x,b.y,b.z),l=X(),a={...b},s.zoom=1,p(),_()},U=!1,K=!1,q=0,Q=0,ge=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),Oe=()=>{let t=ge();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Xe=t=>{let c=ge(),g=Oe(),L=Math.abs(t.x)-(c.x-g),B=Math.abs(t.y)-(c.y-g),x=Math.abs(t.z)-(c.z-g),D=Math.max(L,0),E=Math.max(B,0),S=Math.max(x,0),O=Math.hypot(D,E,S),H=Math.min(Math.max(L,Math.max(B,x)),0);return O+H-g},J=(t,c)=>{let g=y.canvasGL.getBoundingClientRect(),L=(t-g.left)*(y.width/g.width),B=(c-g.top)*(y.height/g.height),x=L-y.width*.5,D=y.height*.5-B,E=y.width*.36*1.6*(s.zoom||1),S={x:x/E,y:D/E},O=ee=>me(ue(s.mat),ee),H=0,ze=null;for(let ee=0;ee<96;ee++){let Ie={x:S.x,y:S.y,z:-5+H},ke=O(Ie),Re=Xe(ke);if(Re<.001){ze=ke;break}if(H+=Re,H>10)break}return ze},xe=(t,c)=>{let g=J(t,c);if(!g)return;let L=Math.max(0,Math.min(1,g.x/n.sizeX+.5)),B=Math.max(0,Math.min(1,g.y/n.sizeY+.5)),x=Math.max(0,Math.min(1,g.z/n.sizeZ+.5));k={x:L,y:B,z:x},R(),_()},ye=(t,c)=>{if(!m.svTriangle)return null;let g=y.canvasGL.getBoundingClientRect(),L=(t-g.left)*(y.width/g.width),B=(c-g.top)*(y.height/g.height),x=$(z||k,i,y.width*.36,{x:y.width*.5,y:y.height*.5},s,n),D=(x.w.y-x.k.y)*(x.c.x-x.k.x)+(x.k.x-x.w.x)*(x.c.y-x.k.y);if(Math.abs(D)<1e-6)return null;let E=((x.w.y-x.k.y)*(L-x.k.x)+(x.k.x-x.w.x)*(B-x.k.y))/D,S=((x.k.y-x.c.y)*(L-x.k.x)+(x.c.x-x.k.x)*(B-x.k.y))/D,O=1-E-S;return E<-.02||S<-.02||O<-.02?null:{a:E,b:S,g:O}},pe=t=>{let g=$(z||k,i,y.width*.36,{x:y.width*.5,y:y.height*.5},s,n),L=Math.max(0,Math.min(1,t.a*g.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*g.cRGB.y+t.b)),x=Math.max(0,Math.min(1,t.a*g.cRGB.z+t.b));k=P({r:L*255,g:B*255,b:x*255},i),R(),_()},Ce=0,_e=0,ve=(t,c)=>{Ce=t,_e=c,y.canvasGL.style.cursor=J(t,c)?"default":"grab"};y.canvasGL.addEventListener("mousemove",t=>{ve(t.clientX,t.clientY)}),y.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)U=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let c=ye(t.clientX,t.clientY);c?(v=!0,z={...k},C=c,pe(c)):J(t.clientX,t.clientY)?(K=!0,z=null,C=null,xe(t.clientX,t.clientY)):(U=!0,q=t.clientX,Q=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),y.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(v){let c=ye(t.clientX,t.clientY);c&&(C=c,pe(c))}else if(U){let c=t.clientX-q,g=t.clientY-Q;q=t.clientX,Q=t.clientY,N(c,g)}else K&&xe(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{v&&(v=!1),U&&(U=!1,document.body.style.cursor="default"),K&&(K=!1),ve(Ce,_e)}),y.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let c=t.deltaY<0?.08:-.08;s.zoom=Math.max(.2,Math.min(2.5,(s.zoom||1)+c)),_()},{passive:!1}),y.canvasGL.addEventListener("dblclick",t=>{J(t.clientX,t.clientY)?(u=!u,R()):j(),_()});let Me=t=>{let c=t.target?.tagName;if(!(c==="INPUT"||c==="TEXTAREA"))switch(t.key){case"r":case"R":j();break;case"f":case"F":Y(X());break;case"b":case"B":Y(Z(Math.PI));break;case"t":case"T":Y(W(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),w("y",-5*M);break;case"ArrowRight":t.preventDefault(),w("y",5*M);break;case"ArrowUp":t.preventDefault(),w("x",5*M);break;case"ArrowDown":t.preventDefault(),w("x",-5*M);break}};return window.addEventListener("keydown",Me),_(),R(),{getColor:()=>{let t=F(k,i),c=u?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:c,hsb:oe(c),oklch:te(c),hex:se(c),alpha:1}},setColor:t=>{A=t,k=P(t,i),z=null,C=null,R(),_()},setMode:t=>{i=t,z=null,C=null,R(),_()},getMode:()=>i,setRotation:(t,c)=>{d=I(c*M,0,t*M),l=X(),a.x=c*M,a.y=0,a.z=t*M,p(),_()},getAxisRotation:()=>({rotXDeg:Math.round(de(a.x*180/Math.PI)*10)/10,rotYDeg:Math.round(de(a.y*180/Math.PI)*10)/10,rotZDeg:Math.round(de(a.z*180/Math.PI)*10)/10}),setAxisRotation:(t,c,g)=>{w("x",he(t*M-a.x)),w("y",he(c*M-a.y)),w("z",he(g*M-a.z))},rotateLocal:(t,c)=>{w(t,c*M)},resetRotation:(t,c,g)=>{d=I(t*M,c*M,g*M),l=X(),a.x=t*M,a.y=c*M,a.z=g*M,p(),_()},setZoom:t=>{s.zoom=Math.max(.1,Math.min(3,t)),_()},getZoom:()=>s.zoom||1,setDimensions:(t,c,g)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,c)),n.sizeZ=Math.max(.2,Math.min(2.5,g)),_()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),_()},getRadius:()=>n.radius,getEdgeStyle:()=>({...f}),setEdgeStyle:t=>{f={...f,...t},_()},getGuides:()=>({...m}),setGuides:t=>{m={...m,...t},_()},toggleAllGuides:t=>{let c=t!==void 0?t:!m.vertexX;m={vertexX:c,vertexY:c,vertexZ:c,centerX:c,centerY:c,centerZ:c,angleGuides:c},_()},on:(t,c)=>{T.add(c)},off:(t,c)=>{T.delete(c)},destroy:()=>{h!==null&&cancelAnimationFrame(h),window.removeEventListener("keydown",Me),e.innerHTML=""}}}export{vo as createRoundedBoxPicker};
