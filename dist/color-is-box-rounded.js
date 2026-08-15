var Re={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},Le={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Q(e){let o=e.r/255,a=e.g/255,i=e.b/255,l=Math.max(o,a,i),s=Math.min(o,a,i),n=l-s,m=0;n!==0&&(l===o?m=((a-i)/n+6)%6:l===a?m=(i-o)/n+2:m=(o-a)/n+4,m*=60);let f=l===0?0:n/l*100,b=l*100;return{h:m,s:f,b}}function Ie(e){let o=e.h,a=e.s/100,i=e.b/100,l=i*a,s=l*(1-Math.abs(o/60%2-1)),n=i-l,m,f,b;return o<60?(m=l,f=s,b=0):o<120?(m=s,f=l,b=0):o<180?(m=0,f=l,b=s):o<240?(m=0,f=s,b=l):o<300?(m=s,f=0,b=l):(m=l,f=0,b=s),{r:Math.round((m+n)*255),g:Math.round((f+n)*255),b:Math.round((b+n)*255)}}function te(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ne(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Ye(e){let o=te(e.r/255),a=te(e.g/255),i=te(e.b/255),l=.4122214708*o+.5363325363*a+.0514459929*i,s=.2119034982*o+.6806995451*a+.1073969566*i,n=.0883024619*o+.2817188376*a+.6299787005*i,m=Math.cbrt(l),f=Math.cbrt(s),b=Math.cbrt(n);return{L:.2104542553*m+.793617785*f-.0040720468*b,a:1.9779984951*m-2.428592205*f+.4505937099*b,b:.0259040371*m+.7827717662*f-.808675766*b}}function Ue(e,o,a){let i=e+.3963377774*o+.2158037573*a,l=e-.1055613458*o-.0638541728*a,s=e-.0894841775*o-1.291485548*a,n=i*i*i,m=l*l*l,f=s*s*s,b=4.0767416621*n-3.3077115913*m+.2309699292*f,u=-1.2684380046*n+2.6097574011*m-.3413193965*f,r=-.0041960863*n-.7034186147*m+1.707614701*f;return{r:Math.round(Math.max(0,Math.min(1,ne(b)))*255),g:Math.round(Math.max(0,Math.min(1,ne(u)))*255),b:Math.round(Math.max(0,Math.min(1,ne(r)))*255)}}function J(e){let o=Ye(e),a=Math.sqrt(o.a*o.a+o.b*o.b),i=Math.atan2(o.b,o.a)*(180/Math.PI);return i<0&&(i+=360),{l:o.L,c:a,h:a<1e-4?0:i}}function re(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),i=e.c*Math.sin(o);return Ue(e.l,a,i)}function He(e,o,a){let i=re({l:e,c:o,h:a});if(Be(i))return{l:e,c:o,h:a};let l=0,s=o;for(let n=0;n<20;n++){let m=(l+s)/2;i=re({l:e,c:m,h:a}),Be(i)?l=m:s=m}return{l:e,c:l,h:a}}function Be(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function ae(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var we=.4;function S(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return Ie({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,i=e.y*we,l=e.z*359,s=He(a,i,l);return re(s)}}function V(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=Q(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=J(e);return{x:a.l,y:Math.min(a.c/we,1),z:a.h/359}}}var ie=Math.PI/180;function O(){return[1,0,0,0,1,0,0,0,1]}function U(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function H(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function se(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function w(e,o){let a=new Array(9);for(let i=0;i<3;i++)for(let l=0;l<3;l++)a[i*3+l]=e[i*3]*o[l]+e[i*3+1]*o[3+l]+e[i*3+2]*o[6+l];return a}function ce(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function le(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function X(e,o,a){return w(H(o),w(se(a),U(e)))}var Ge={mat:X(8*ie,-20*ie,-55*ie),zoom:1},Ae={sizeX:1,sizeY:1,sizeZ:1,radius:0};function ee(e,o,a){let i=(e.x-.5)*a.sizeX,l=(e.y-.5)*a.sizeY,s=(e.z-.5)*a.sizeZ;return le(o.mat,{x:i,y:l,z:s})}function E(e,o,a,i,l){let s=ee(e,i,l);return{x:a.x+s.x*o*1.6*i.zoom,y:a.y-s.y*o*1.6*i.zoom}}function W(e,o,a,i,l,s){let n=S(e,o),m={x:n.r/255,y:n.g/255,z:n.b/255},f=V({r:255,g:255,b:255},o),b=V({r:0,g:0,b:0},o);return{c:E(e,a,i,l,s),w:E(f,a,i,l,s),k:E(b,a,i,l,s),cRGB:m}}var ue=["#ef4444","#22c55e","#3b82f6"];function De(e,o,a,i,l,s){let n=r=>E(r,o,a,i,l);e.save();let m=n({x:.5,y:.5,z:.5}),f=.35,b=[{from:{x:-f,y:.5,z:.5},to:{x:1+f,y:.5,z:.5},color:ue[0],name:"Cx",visible:s.centerX},{from:{x:.5,y:-f,z:.5},to:{x:.5,y:1+f,z:.5},color:ue[1],name:"Cy",visible:s.centerY},{from:{x:.5,y:.5,z:-f},to:{x:.5,y:.5,z:1+f},color:ue[2],name:"Cz",visible:s.centerZ}],u=!1;for(let r=0;r<b.length;r++){if(!b[r].visible)continue;u=!0;let d=n(b[r].from),v=n(b[r].to);e.beginPath(),e.moveTo(d.x,d.y),e.lineTo(v.x,v.y),e.strokeStyle=b[r].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(d.x,d.y,3,0,Math.PI*2),e.arc(v.x,v.y,3,0,Math.PI*2),e.fillStyle=b[r].color,e.fill()}u&&(e.beginPath(),e.arc(m.x,m.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var Te=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Ee=`
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
`;function Ve(e,o){let a=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${o}px`,i.style.height=`${o}px`,i.style.userSelect="none";let l=document.createElement("canvas");l.width=o*a,l.height=o*a,l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let s=document.createElement("canvas");s.width=o*a,s.height=o*a,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.pointerEvents="none",i.appendChild(l),i.appendChild(s),e.appendChild(i);let n=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=s.getContext("2d");m.scale(a,a);let f=(p,L)=>{let x=n.createShader(p);return n.shaderSource(x,L),n.compileShader(x),n.getShaderParameter(x,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(x)),x},b=f(n.VERTEX_SHADER,Te),u=f(n.FRAGMENT_SHADER,Ee),r=n.createProgram();n.attachShader(r,b),n.attachShader(r,u),n.linkProgram(r);let d=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,d),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let v=n.getAttribLocation(r,"position");n.enableVertexAttribArray(v),n.vertexAttribPointer(v,2,n.FLOAT,!1,0,0);let F={u_resolution:n.getUniformLocation(r,"u_resolution"),u_box_size:n.getUniformLocation(r,"u_box_size"),u_radius:n.getUniformLocation(r,"u_radius"),u_mat:n.getUniformLocation(r,"u_mat"),u_mat_inv:n.getUniformLocation(r,"u_mat_inv"),u_zoom:n.getUniformLocation(r,"u_zoom"),u_mode:n.getUniformLocation(r,"u_mode"),u_invert:n.getUniformLocation(r,"u_invert"),u_show_front:n.getUniformLocation(r,"u_show_front"),u_show_back:n.getUniformLocation(r,"u_show_back"),u_front_width:n.getUniformLocation(r,"u_front_width"),u_back_width:n.getUniformLocation(r,"u_back_width"),u_front_dashed:n.getUniformLocation(r,"u_front_dashed"),u_back_dashed:n.getUniformLocation(r,"u_back_dashed"),u_front_color:n.getUniformLocation(r,"u_front_color"),u_back_color:n.getUniformLocation(r,"u_back_color")};return{gl:n,overlayCtx:m,canvasGL:l,canvasOverlay:s,width:o,height:o,program:r,uniforms:F}}var Se=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function We(e,o,a,i,l,s){if(!s.showFront&&!s.showBack)return;let n=u=>E(u,o,a,i,l),f=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(n),b=u=>{let r=ee({x:.5,y:.5,z:.5},i,l);return ee({x:.5+u.x*.1,y:.5+u.y*.1,z:.5+u.z*.1},i,l).z-r.z>0};if(e.save(),s.showBack){e.lineWidth=s.backWidth,s.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.backColor,e.globalAlpha=s.backOpacity;for(let u of Se)if(!(b(u.normalA)||b(u.normalB))){let[d,v]=u.edge;e.beginPath(),e.moveTo(f[d].x,f[d].y),e.lineTo(f[v].x,f[v].y),e.stroke()}}if(s.showFront){e.lineWidth=s.frontWidth,s.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.frontColor,e.globalAlpha=s.frontOpacity;for(let u of Se)if(b(u.normalA)||b(u.normalB)){let[d,v]=u.edge;e.beginPath(),e.moveTo(f[d].x,f[d].y),e.lineTo(f[v].x,f[v].y),e.stroke()}}e.restore()}function Fe(e,o,a,i,l,s,n,m,f,b){let{gl:u,overlayCtx:r,width:d,height:v,program:F,uniforms:p}=e,L=window.devicePixelRatio||1;u.viewport(0,0,d*L,v*L),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(F),u.uniform2f(p.u_resolution,d*L,v*L),u.uniform3f(p.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(p.u_radius,a.radius!==void 0?a.radius:.001);let x=o.mat;u.uniformMatrix3fv(p.u_mat,!1,new Float32Array([x[0],x[3],x[6],x[1],x[4],x[7],x[2],x[5],x[8]])),u.uniformMatrix3fv(p.u_mat_inv,!1,new Float32Array([x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8]])),u.uniform1f(p.u_zoom,o.zoom||1),u.uniform1i(p.u_mode,i==="rgb"?0:i==="hsb"?1:2),u.uniform1i(p.u_invert,l?1:0),u.uniform1i(p.u_show_front,n.showFront?1:0),u.uniform1i(p.u_show_back,n.showBack?1:0),u.uniform1f(p.u_front_width,n.frontWidth||1.5),u.uniform1f(p.u_back_width,n.backWidth||1),u.uniform1i(p.u_front_dashed,n.frontDashed?1:0),u.uniform1i(p.u_back_dashed,n.backDashed?1:0),u.uniform4f(p.u_front_color,1,1,1,n.frontOpacity||.65),u.uniform4f(p.u_back_color,1,1,1,n.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6),r.save(),r.clearRect(0,0,d,v);let A=d*.36,C={x:d*.5,y:v*.5};if(We(r,A,C,o,a,n),De(r,A,C,o,a,s),s.svTriangle){let y=W(b||m,i,A,C,o,a);if(Math.abs((y.w.x-y.c.x)*(y.k.y-y.c.y)-(y.w.y-y.c.y)*(y.k.x-y.c.x))>4){let z=Math.round(y.cRGB.x*255),B=Math.round(y.cRGB.y*255),Z=Math.round(y.cRGB.z*255);r.save(),r.beginPath(),r.moveTo(y.c.x,y.c.y),r.lineTo(y.w.x,y.w.y),r.lineTo(y.k.x,y.k.y),r.closePath(),r.fillStyle=`rgba(${z}, ${B}, ${Z}, 0.12)`,r.fill(),r.strokeStyle=`rgba(${z}, ${B}, ${Z}, 0.7)`,r.lineWidth=1.2,r.setLineDash([]),r.stroke(),r.beginPath(),r.arc(y.w.x,y.w.y,3.5,0,Math.PI*2),r.fillStyle="#ffffff",r.fill(),r.strokeStyle="rgba(17, 24, 39, 0.6)",r.lineWidth=1.2,r.stroke(),r.beginPath(),r.arc(y.k.x,y.k.y,3.5,0,Math.PI*2),r.fillStyle="#111827",r.fill(),r.strokeStyle="rgba(255, 255, 255, 0.7)",r.lineWidth=1.2,r.stroke(),r.restore()}}if(f){let y=E(m,A,C,o,a),_=S(m,i),z=l?{r:255-_.r,g:255-_.g,b:255-_.b}:_;r.beginPath(),r.arc(y.x,y.y,6,0,Math.PI*2),r.fillStyle=`rgb(${z.r}, ${z.g}, ${z.b})`,r.fill(),r.strokeStyle="#ffffff",r.lineWidth=2,r.stroke()}r.restore()}var M=Math.PI/180,me=2*Math.PI,fe=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},be=e=>{let o=e%me;return o>Math.PI?o-=me:o<-Math.PI&&(o+=me),o};function vo(e,o={}){let a=o.size||460,i=o.mode||"rgb",l=!1,s={...Ge},n={...Ae,radius:.08},m={...Le},f={...Re},b={x:8*M,y:-20*M,z:-55*M},u=X(b.x,b.y,b.z),r=O(),d={...b},v=()=>{s.mat=w(r,u)},F=o.initialColor||{r:255,g:255,b:255},p=V(F,i),L=!1,x=null,A=new Set,C=Ve(e,a),y=null,_=()=>{y===null&&(y=requestAnimationFrame(()=>{y=null,Fe(C,s,n,i,l,m,f,p,!0,x)}))},z=()=>{let t=S(p,i),c=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t,h=Q(c),k=J(c),R=ae(c),g={rgb:c,hsb:h,oklch:k,hex:R,alpha:1};A.forEach(G=>G(g))},B=(t,c)=>{c!==0&&(t==="x"?(u=w(u,U(c)),d.x+=c):t==="y"?(u=w(u,H(c)),d.y+=c):(u=w(u,se(c)),d.z+=c),v(),_())},Z=(t,c)=>{r=w(H(t*.01),r),r=w(U(-c*.01),r),v(),_()},oe=t=>{r=w(t,ce(u)),v(),_()},de=()=>{u=X(b.x,b.y,b.z),r=O(),d={...b},s.zoom=1,v(),_()},I=!1,$=!1,N=0,j=0,he=()=>({x:n.sizeX*.5,y:n.sizeY*.5,z:n.sizeZ*.5}),Pe=()=>{let t=he();return Math.min(n.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Oe=t=>{let c=he(),h=Pe(),k=Math.abs(t.x)-(c.x-h),R=Math.abs(t.y)-(c.y-h),g=Math.abs(t.z)-(c.z-h),G=Math.max(k,0),D=Math.max(R,0),T=Math.max(g,0),P=Math.hypot(G,D,T),Y=Math.min(Math.max(k,Math.max(R,g)),0);return P+Y-h},K=(t,c)=>{let h=C.canvasGL.getBoundingClientRect(),k=(t-h.left)*(C.width/h.width),R=(c-h.top)*(C.height/h.height),g=k-C.width*.5,G=C.height*.5-R,D=C.width*.36*1.6*(s.zoom||1),T={x:g/D,y:G/D},P=q=>le(ce(s.mat),q),Y=0,Me=null;for(let q=0;q<96;q++){let Xe={x:T.x,y:T.y,z:-5+Y},ze=P(Xe),ke=Oe(ze);if(ke<.001){Me=ze;break}if(Y+=ke,Y>10)break}return Me},ge=(t,c)=>{let h=K(t,c);if(!h)return;let k=Math.max(0,Math.min(1,h.x/n.sizeX+.5)),R=Math.max(0,Math.min(1,h.y/n.sizeY+.5)),g=Math.max(0,Math.min(1,h.z/n.sizeZ+.5));p={x:k,y:R,z:g},z(),_()},xe=(t,c)=>{if(!m.svTriangle)return null;let h=C.canvasGL.getBoundingClientRect(),k=(t-h.left)*(C.width/h.width),R=(c-h.top)*(C.height/h.height),g=W(x||p,i,C.width*.36,{x:C.width*.5,y:C.height*.5},s,n),G=(g.w.y-g.k.y)*(g.c.x-g.k.x)+(g.k.x-g.w.x)*(g.c.y-g.k.y);if(Math.abs(G)<1e-6)return null;let D=((g.w.y-g.k.y)*(k-g.k.x)+(g.k.x-g.w.x)*(R-g.k.y))/G,T=((g.k.y-g.c.y)*(k-g.k.x)+(g.c.x-g.k.x)*(R-g.k.y))/G,P=1-D-T;return D<-.02||T<-.02||P<-.02?null:{a:D,b:T,g:P}},ye=t=>{let h=W(x||p,i,C.width*.36,{x:C.width*.5,y:C.height*.5},s,n),k=Math.max(0,Math.min(1,t.a*h.cRGB.x+t.b)),R=Math.max(0,Math.min(1,t.a*h.cRGB.y+t.b)),g=Math.max(0,Math.min(1,t.a*h.cRGB.z+t.b));p=V({r:k*255,g:R*255,b:g*255},i),z(),_()},pe=0,Ce=0,ve=(t,c)=>{pe=t,Ce=c,C.canvasGL.style.cursor=K(t,c)?"default":"grab"};C.canvasGL.addEventListener("mousemove",t=>{ve(t.clientX,t.clientY)}),C.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)I=!0,N=t.clientX,j=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let c=xe(t.clientX,t.clientY);c?(L=!0,x={...p},ye(c)):K(t.clientX,t.clientY)?($=!0,ge(t.clientX,t.clientY)):(I=!0,N=t.clientX,j=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),C.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(L){let c=xe(t.clientX,t.clientY);c&&ye(c)}else if(I){let c=t.clientX-N,h=t.clientY-j;N=t.clientX,j=t.clientY,Z(c,h)}else $&&ge(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{L&&(L=!1,x=null),I&&(I=!1,document.body.style.cursor="default"),$&&($=!1),ve(pe,Ce)}),C.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let c=t.deltaY<0?.08:-.08;s.zoom=Math.max(.2,Math.min(2.5,(s.zoom||1)+c)),_()},{passive:!1}),C.canvasGL.addEventListener("dblclick",t=>{K(t.clientX,t.clientY)?(l=!l,z()):de(),_()});let _e=t=>{let c=t.target?.tagName;if(!(c==="INPUT"||c==="TEXTAREA"))switch(t.key){case"r":case"R":de();break;case"f":case"F":oe(O());break;case"b":case"B":oe(H(Math.PI));break;case"t":case"T":oe(U(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),B("y",-5*M);break;case"ArrowRight":t.preventDefault(),B("y",5*M);break;case"ArrowUp":t.preventDefault(),B("x",5*M);break;case"ArrowDown":t.preventDefault(),B("x",-5*M);break}};return window.addEventListener("keydown",_e),_(),z(),{getColor:()=>{let t=S(p,i),c=l?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:c,hsb:Q(c),oklch:J(c),hex:ae(c),alpha:1}},setColor:t=>{F=t,p=V(t,i),z(),_()},setMode:t=>{i=t,z(),_()},getMode:()=>i,setRotation:(t,c)=>{u=X(c*M,0,t*M),r=O(),d.x=c*M,d.y=0,d.z=t*M,v(),_()},getAxisRotation:()=>({rotXDeg:Math.round(fe(d.x*180/Math.PI)*10)/10,rotYDeg:Math.round(fe(d.y*180/Math.PI)*10)/10,rotZDeg:Math.round(fe(d.z*180/Math.PI)*10)/10}),setAxisRotation:(t,c,h)=>{B("x",be(t*M-d.x)),B("y",be(c*M-d.y)),B("z",be(h*M-d.z))},rotateLocal:(t,c)=>{B(t,c*M)},resetRotation:(t,c,h)=>{u=X(t*M,c*M,h*M),r=O(),d.x=t*M,d.y=c*M,d.z=h*M,v(),_()},setZoom:t=>{s.zoom=Math.max(.1,Math.min(3,t)),_()},getZoom:()=>s.zoom||1,setDimensions:(t,c,h)=>{n.sizeX=Math.max(.2,Math.min(2.5,t)),n.sizeY=Math.max(.2,Math.min(2.5,c)),n.sizeZ=Math.max(.2,Math.min(2.5,h)),_()},getDimensions:()=>({sizeX:n.sizeX,sizeY:n.sizeY,sizeZ:n.sizeZ}),setRadius:t=>{n.radius=Math.max(0,Math.min(.5,t)),_()},getRadius:()=>n.radius,getEdgeStyle:()=>({...f}),setEdgeStyle:t=>{f={...f,...t},_()},getGuides:()=>({...m}),setGuides:t=>{m={...m,...t},_()},toggleAllGuides:t=>{let c=t!==void 0?t:!m.vertexX;m={vertexX:c,vertexY:c,vertexZ:c,centerX:c,centerY:c,centerZ:c,angleGuides:c},_()},on:(t,c)=>{A.add(c)},off:(t,c)=>{A.delete(c)},destroy:()=>{y!==null&&cancelAnimationFrame(y),window.removeEventListener("keydown",_e),e.innerHTML=""}}}export{vo as createRoundedBoxPicker};
