var nt={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},rt={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ke(e){let n=e.r/255,a=e.g/255,l=e.b/255,c=Math.max(n,a,l),s=Math.min(n,a,l),r=c-s,h=0;r!==0&&(c===n?h=((a-l)/r+6)%6:c===a?h=(l-n)/r+2:h=(n-a)/r+4,h*=60);let g=c===0?0:r/c*100,x=c*100;return{h,s:g,b:x}}function At(e){let n=e.h,a=e.s/100,l=e.b/100,c=l*a,s=c*(1-Math.abs(n/60%2-1)),r=l-c,h,g,x;return n<60?(h=c,g=s,x=0):n<120?(h=s,g=c,x=0):n<180?(h=0,g=c,x=s):n<240?(h=0,g=s,x=c):n<300?(h=s,g=0,x=c):(h=c,g=0,x=s),{r:Math.round((h+r)*255),g:Math.round((g+r)*255),b:Math.round((x+r)*255)}}function Ge(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ee(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Rt(e){let n=Ge(e.r/255),a=Ge(e.g/255),l=Ge(e.b/255),c=.4122214708*n+.5363325363*a+.0514459929*l,s=.2119034982*n+.6806995451*a+.1073969566*l,r=.0883024619*n+.2817188376*a+.6299787005*l,h=Math.cbrt(c),g=Math.cbrt(s),x=Math.cbrt(r);return{L:.2104542553*h+.793617785*g-.0040720468*x,a:1.9779984951*h-2.428592205*g+.4505937099*x,b:.0259040371*h+.7827717662*g-.808675766*x}}function kt(e,n,a){let l=e+.3963377774*n+.2158037573*a,c=e-.1055613458*n-.0638541728*a,s=e-.0894841775*n-1.291485548*a,r=l*l*l,h=c*c*c,g=s*s*s,x=4.0767416621*r-3.3077115913*h+.2309699292*g,f=-1.2684380046*r+2.6097574011*h-.3413193965*g,d=-.0041960863*r-.7034186147*h+1.707614701*g;return{r:Math.round(Math.max(0,Math.min(1,Ee(x)))*255),g:Math.round(Math.max(0,Math.min(1,Ee(f)))*255),b:Math.round(Math.max(0,Math.min(1,Ee(d)))*255)}}function ze(e){let n=Rt(e),a=Math.sqrt(n.a*n.a+n.b*n.b),l=Math.atan2(n.b,n.a)*(180/Math.PI);return l<0&&(l+=360),{l:n.L,c:a,h:a<1e-4?0:l}}function Pe(e){let n=e.h*(Math.PI/180),a=e.c*Math.cos(n),l=e.c*Math.sin(n);return kt(e.l,a,l)}function zt(e,n,a){let l=Pe({l:e,c:n,h:a});if(at(l))return{l:e,c:n,h:a};let c=0,s=n;for(let r=0;r<20;r++){let h=(c+s)/2;l=Pe({l:e,c:h,h:a}),at(l)?c=h:s=h}return{l:e,c,h:a}}function at(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function De(e){let n=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${n(e.r)}${n(e.g)}${n(e.b)}`}var it=.4;function ne(e,n){if(n==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(n==="hsb")return At({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*it,c=e.z*359,s=zt(a,l,c);return Pe(s)}}function se(e,n){if(n==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(n==="hsb"){let a=ke(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ze(e);return{x:a.l,y:Math.min(a.c/it,1),z:a.h/359}}}function Le(e,n){let a=n*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,c=e.g/255,s=e.b/255,r,h,g;if(a<=90){let f=a/90;r=l*(1-f),h=c*(1-f),g=s*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,h=f,g=f}else{let f=(a-270)/90;r=f*l+(1-f),h=f*c+(1-f),g=f*s+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(h),b:x(g)}}var Ve=Math.PI/180;function ge(){return[1,0,0,0,1,0,0,0,1]}function pe(e){let n=Math.cos(e),a=Math.sin(e);return[1,0,0,0,n,-a,0,a,n]}function Ce(e){let n=Math.cos(e),a=Math.sin(e);return[n,0,a,0,1,0,-a,0,n]}function Fe(e){let n=Math.cos(e),a=Math.sin(e);return[n,a,0,-a,n,0,0,0,1]}function ae(e,n){let a=new Array(9);for(let l=0;l<3;l++)for(let c=0;c<3;c++)a[l*3+c]=e[l*3]*n[c]+e[l*3+1]*n[3+c]+e[l*3+2]*n[6+c];return a}function Ie(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Oe(e,n){return{x:e[0]*n.x+e[1]*n.y+e[2]*n.z,y:e[3]*n.x+e[4]*n.y+e[5]*n.z,z:e[6]*n.x+e[7]*n.y+e[8]*n.z}}function de(e,n,a){return ae(Ce(n),ae(Fe(a),pe(e)))}var lt={mat:de(8*Ve,-20*Ve,-55*Ve),zoom:1},st={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Be(e,n,a){let l=(e.x-.5)*a.sizeX,c=(e.y-.5)*a.sizeY,s=(e.z-.5)*a.sizeZ;return Oe(n.mat,{x:l,y:c,z:s})}function re(e,n,a,l,c){let s=Be(e,l,c);return{x:a.x+s.x*n*1.6*l.zoom,y:a.y-s.y*n*1.6*l.zoom}}function Me(e,n,a,l,c,s){let r=ne(e,n),h={x:r.r/255,y:r.g/255,z:r.b/255},g=se({r:255,g:255,b:255},n),x=se({r:0,g:0,b:0},n);return{c:re(e,a,l,c,s),w:re(g,a,l,c,s),k:re(x,a,l,c,s),cRGB:h}}var Xe=["#ef4444","#22c55e","#3b82f6"];function ct(e,n,a,l,c,s){let r=d=>re(d,n,a,l,c);e.save();let h=r({x:.5,y:.5,z:.5}),g=.35,x=[{from:{x:-g,y:.5,z:.5},to:{x:1+g,y:.5,z:.5},color:Xe[0],name:"Cx",visible:s.centerX},{from:{x:.5,y:-g,z:.5},to:{x:.5,y:1+g,z:.5},color:Xe[1],name:"Cy",visible:s.centerY},{from:{x:.5,y:.5,z:-g},to:{x:.5,y:.5,z:1+g},color:Xe[2],name:"Cz",visible:s.centerZ}],f=!1;for(let d=0;d<x.length;d++){if(!x[d].visible)continue;f=!0;let p=r(x[d].from),C=r(x[d].to);e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(C.x,C.y),e.strokeStyle=x[d].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(p.x,p.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=x[d].color,e.fill()}f&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var ut=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,mt=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,ft=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,bt=`
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
`;var _e=20,ve=18;function gt(e,n){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${n}px`,l.style.height=`${n}px`,l.style.userSelect="none";let c=document.createElement("canvas");c.width=n*a,c.height=n*a,c.style.width=`${n}px`,c.style.height=`${n}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let s=document.createElement("canvas");s.width=n*a,s.height=n*a,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.pointerEvents="none",l.appendChild(c),l.appendChild(s),e.appendChild(l);let r=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=s.getContext("2d");h.scale(a,a);let g=(L,W)=>{let X=r.createShader(L);return r.shaderSource(X,W),r.compileShader(X),r.getShaderParameter(X,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(X)),X},x=g(r.VERTEX_SHADER,ut),f=g(r.FRAGMENT_SHADER,bt),d=r.createProgram();r.attachShader(d,x),r.attachShader(d,f),r.linkProgram(d);let p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(d,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let Z=g(r.VERTEX_SHADER,mt),m=g(r.FRAGMENT_SHADER,ft),t=r.createProgram();r.attachShader(t,Z),r.attachShader(t,m),r.linkProgram(t);let U=r.getAttribLocation(t,"a_pos"),D=r.getAttribLocation(t,"a_color"),H=r.getUniformLocation(t,"u_alpha"),z=r.createBuffer(),I={u_resolution:r.getUniformLocation(d,"u_resolution"),u_box_size:r.getUniformLocation(d,"u_box_size"),u_radius:r.getUniformLocation(d,"u_radius"),u_mat:r.getUniformLocation(d,"u_mat"),u_mat_inv:r.getUniformLocation(d,"u_mat_inv"),u_zoom:r.getUniformLocation(d,"u_zoom"),u_mode:r.getUniformLocation(d,"u_mode"),u_invert:r.getUniformLocation(d,"u_invert"),u_show_front:r.getUniformLocation(d,"u_show_front"),u_show_back:r.getUniformLocation(d,"u_show_back"),u_front_width:r.getUniformLocation(d,"u_front_width"),u_back_width:r.getUniformLocation(d,"u_back_width"),u_front_dashed:r.getUniformLocation(d,"u_front_dashed"),u_back_dashed:r.getUniformLocation(d,"u_back_dashed"),u_front_color:r.getUniformLocation(d,"u_front_color"),u_back_color:r.getUniformLocation(d,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:c,canvasOverlay:s,width:n,height:n,program:d,uniforms:I,posBuffer:p,posAttr:C,triProgram:t,triPosAttr:U,triColorAttr:D,triAlphaLoc:H,triBuffer:z}}var ht=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Lt(e,n,a,l,c,s){if(!s.showFront&&!s.showBack)return;let r=f=>re(f,n,a,l,c),g=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let d=Be({x:.5,y:.5,z:.5},l,c);return Be({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,c).z-d.z>0};if(e.save(),s.showBack){e.lineWidth=s.backWidth,s.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.backColor,e.globalAlpha=s.backOpacity;for(let f of ht)if(!(x(f.normalA)||x(f.normalB))){let[p,C]=f.edge;e.beginPath(),e.moveTo(g[p].x,g[p].y),e.lineTo(g[C].x,g[C].y),e.stroke()}}if(s.showFront){e.lineWidth=s.frontWidth,s.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.frontColor,e.globalAlpha=s.frontOpacity;for(let f of ht)if(x(f.normalA)||x(f.normalB)){let[p,C]=f.edge;e.beginPath(),e.moveTo(g[p].x,g[p].y),e.lineTo(g[C].x,g[C].y),e.stroke()}}e.restore()}function dt(e,n,a,l,c,s,r,h,g,x,f,d,p,C,Z){let{gl:m,overlayCtx:t,width:U,height:D,program:H,uniforms:z}=e,I=window.devicePixelRatio||1;m.viewport(0,0,U*I,D*I),m.clearColor(0,0,0,0),m.clear(m.COLOR_BUFFER_BIT),m.useProgram(H),m.uniform2f(z.u_resolution,U*I,D*I),m.uniform3f(z.u_box_size,a.sizeX,a.sizeY,a.sizeZ),m.uniform1f(z.u_radius,a.radius!==void 0?a.radius:.001);let L=n.mat;m.uniformMatrix3fv(z.u_mat,!1,new Float32Array([L[0],L[3],L[6],L[1],L[4],L[7],L[2],L[5],L[8]])),m.uniformMatrix3fv(z.u_mat_inv,!1,new Float32Array([L[0],L[1],L[2],L[3],L[4],L[5],L[6],L[7],L[8]])),m.uniform1f(z.u_zoom,n.zoom||1),m.uniform1i(z.u_mode,l==="rgb"?0:l==="hsb"?1:2),m.uniform1i(z.u_invert,c?1:0),m.uniform1i(z.u_show_front,r.showFront?1:0),m.uniform1i(z.u_show_back,r.showBack?1:0),m.uniform1f(z.u_front_width,r.frontWidth||1.5),m.uniform1f(z.u_back_width,r.backWidth||1),m.uniform1i(z.u_front_dashed,r.frontDashed?1:0),m.uniform1i(z.u_back_dashed,r.backDashed?1:0),m.uniform4f(z.u_front_color,1,1,1,r.frontOpacity||.65),m.uniform4f(z.u_back_color,1,1,1,r.backOpacity||.25),m.drawArrays(m.TRIANGLES,0,6);let W=U*.36,X={x:U*.5,y:D*.5},ie=null,xe=null,ce=d||p>.001;if(s.svTriangle&&ce){let u=Me(x||h,l,W,X,n,a);Math.abs((u.w.x-u.c.x)*(u.k.y-u.c.y)-(u.w.y-u.c.y)*(u.k.x-u.c.x))>4?ie=u:xe=u}let q=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if(ie&&q<.01&&(ie=null),ie){let u=V=>[V.x/U*2-1,1-V.y/D*2],M=ie,A=V=>({x:M.c.x+(V.x-M.c.x)*q,y:M.c.y+(V.y-M.c.y)*q}),B=u(M.c),T=u(A(M.w)),G=u(A(M.k));m.useProgram(e.triProgram),m.enable(m.BLEND),m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA),m.bindBuffer(m.ARRAY_BUFFER,e.triBuffer),m.bufferData(m.ARRAY_BUFFER,new Float32Array([B[0],B[1],M.cRGB.x,M.cRGB.y,M.cRGB.z,T[0],T[1],1,1,1,G[0],G[1],0,0,0]),m.STATIC_DRAW),m.enableVertexAttribArray(e.triPosAttr),m.vertexAttribPointer(e.triPosAttr,2,m.FLOAT,!1,20,0),m.enableVertexAttribArray(e.triColorAttr),m.vertexAttribPointer(e.triColorAttr,3,m.FLOAT,!1,20,8),m.uniform1f(e.triAlphaLoc,1),m.drawArrays(m.TRIANGLES,0,3),m.disable(m.BLEND),m.useProgram(H),m.enableVertexAttribArray(e.posAttr),m.bindBuffer(m.ARRAY_BUFFER,e.posBuffer),m.vertexAttribPointer(e.posAttr,2,m.FLOAT,!1,0,0)}if(t.save(),t.clearRect(0,0,U,D),Lt(t,W,X,n,a,r),ct(t,W,X,n,a,s),xe){let u=xe;t.save(),t.globalAlpha=p,t.beginPath(),t.moveTo(u.k.x,u.k.y),t.lineTo(u.w.x,u.w.y),t.strokeStyle="rgba(107, 114, 128, 0.7)",t.lineWidth=1.2,t.setLineDash([5,4]),t.stroke(),t.setLineDash([]),t.restore()}if(ie){let u=ie,M=_=>({x:u.c.x+(_.x-u.c.x)*q,y:u.c.y+(_.y-u.c.y)*q}),A=M(u.w),B=M(u.k),T=Math.round(u.cRGB.x*255),G=Math.round(u.cRGB.y*255),V=Math.round(u.cRGB.z*255);if(t.save(),t.globalAlpha=p,t.beginPath(),t.moveTo(u.c.x,u.c.y),t.lineTo(A.x,A.y),t.lineTo(B.x,B.y),t.closePath(),t.strokeStyle=`rgba(${T}, ${G}, ${V}, 0.7)`,t.lineWidth=1.2,t.setLineDash([]),t.stroke(),t.beginPath(),t.arc(A.x,A.y,3.5,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.strokeStyle="rgba(17, 24, 39, 0.6)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.arc(B.x,B.y,3.5,0,Math.PI*2),t.fillStyle="#111827",t.fill(),t.strokeStyle="rgba(255, 255, 255, 0.7)",t.lineWidth=1.2,t.stroke(),f){let _=f.a*u.c.x+f.b*A.x+f.g*B.x,j=f.a*u.c.y+f.b*A.y+f.g*B.y;t.beginPath(),t.arc(_,j,4,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.strokeStyle="rgba(17, 24, 39, 0.75)",t.lineWidth=1.4,t.stroke()}t.restore()}let $=(u,M,A)=>.299*u+.587*M+.114*A>140?"rgba(17, 24, 39, 0.85)":"rgba(255, 255, 255, 0.95)";if(g&&!f&&!C){let u=re(h,W,X,n,a),M=ne(h,l),A=c?{r:255-M.r,g:255-M.g,b:255-M.b}:M;if(Z<1){t.save(),t.beginPath(),t.arc(u.x,u.y,6,0,Math.PI*2),t.clip();let B=4;for(let T=-12;T<12;T+=B)for(let G=-12;G<12;G+=B)t.fillStyle=(G+T)/B%2===0?"#cbd5e1":"#f1f5f9",t.fillRect(u.x+G,u.y+T,B,B);t.restore()}t.beginPath(),t.arc(u.x,u.y,8,0,Math.PI*2),t.fillStyle=Z<1?`rgba(${A.r}, ${A.g}, ${A.b}, ${Z})`:`rgb(${A.r}, ${A.g}, ${A.b})`,t.fill(),t.strokeStyle=$(A.r,A.g,A.b),t.lineWidth=2.5,t.stroke()}if(C&&C.reveal>.01){let u=C.anchor,M=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,A=_e*M,B=(_e+ve/2)*M,T=(_e+ve*1.5)*M,G=ve*M,V=ne(h,l),_=c?{r:255-V.r,g:255-V.g,b:255-V.b}:V,j=-Math.PI/2;t.save(),t.globalAlpha=Math.min(1,M+.15);let le=(E,P)=>{t.save(),t.beginPath(),t.arc(u.x,u.y,E+P/2,0,Math.PI*2),t.arc(u.x,u.y,Math.max(.5,E-P/2),0,Math.PI*2,!0),t.closePath(),t.clip();let F=7,O=E+P/2;t.fillStyle="rgba(148, 163, 184, 0.8)";for(let K=-O;K<O;K+=F)for(let he=-O;he<O;he+=F)t.beginPath(),t.arc(u.x+he,u.y+K,1.8,0,Math.PI*2),t.fill();t.restore()},be=(E,P,F)=>{t.lineWidth=F?1.8:1,t.strokeStyle=F?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let O of[E-P/2,E+P/2])O<=0||(t.beginPath(),t.arc(u.x,u.y,O,0,Math.PI*2),t.stroke())},ye=(E,P,F)=>{let O=u.x,K=u.y-(P+G/2)-2;t.font="700 12px ui-monospace, SF Mono, monospace",t.textAlign="center",t.textBaseline="alphabetic",t.lineWidth=3,t.strokeStyle="rgba(15, 23, 42, 0.55)",t.strokeText(E,O,K),t.fillStyle=F?"#ffffff":"rgba(248, 250, 252, 0.95)",t.fillText(E,O,K)},v=C.colorAnchor||h,ue=ne(v,l),R=72,N=Math.PI*2/R;for(let E=0;E<R;E++){let P=j+E*N,F=Le(ue,E*N);t.beginPath(),t.arc(u.x,u.y,B,P,P+N+.012),t.lineWidth=G,t.lineCap="butt",t.strokeStyle=`rgb(${F.r}, ${F.g}, ${F.b})`,t.stroke()}let J=u.x+B*Math.sin(C.angle),Se=u.y-B*Math.cos(C.angle);t.beginPath(),t.arc(J,Se,4,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.strokeStyle="rgba(15, 23, 42, 0.75)",t.lineWidth=1.4,t.stroke(),be(B,G,C.band==="sat"),le(T,G);let me=j+Z*Math.PI*2;if(Z>.001){t.beginPath(),t.arc(u.x,u.y,T,j,me),t.lineWidth=G,t.strokeStyle=`rgb(${_.r}, ${_.g}, ${_.b})`,t.stroke();let E=u.x+T*Math.cos(me),P=u.y+T*Math.sin(me);t.beginPath(),t.arc(E,P,9,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.lineWidth=4.5,t.strokeStyle=`rgb(${_.r}, ${_.g}, ${_.b})`,t.stroke(),t.lineWidth=1,t.strokeStyle="rgba(15, 23, 42, 0.35)",t.stroke(),t.beginPath(),t.arc(E,P,3,0,Math.PI*2),t.fillStyle=`rgb(${_.r}, ${_.g}, ${_.b})`,t.fill()}be(T,G,C.band==="alpha"),ye("SAT",T,C.band==="sat"),t.beginPath(),t.arc(u.x,u.y,A,0,Math.PI*2),t.fillStyle=Z<1?`rgba(${_.r}, ${_.g}, ${_.b}, ${Z})`:`rgb(${_.r}, ${_.g}, ${_.b})`,t.fill(),t.strokeStyle=$(_.r,_.g,_.b),t.lineWidth=2,t.stroke(),t.restore()}t.restore()}var w=Math.PI/180,fe=2*Math.PI,Ye=e=>{let n=e%360;return n>180?n-=360:n<-180&&(n+=360),n},Ue=e=>{let n=e%fe;return n>Math.PI?n-=fe:n<-Math.PI&&(n+=fe),n},Bt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,xt=(e,n)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(n*255)}`};function io(e,n={}){let a=n.size||460,l=n.mode||"rgb",c=!1,s={...lt},r={...st,radius:.08},h={...rt},g={...nt},x={x:8*w,y:-20*w,z:-55*w},f=de(x.x,x.y,x.z),d=ge(),p={...x},C=()=>{s.mat=ae(d,f)},Z=n.initialColor||{r:255,g:255,b:255},m=se(Z,l),t=1,U=!1,D=null,H=null,z=!1,I=0,L=0,W=null,X=o=>{if(L=o,W!==null)return;let i=performance.now(),b=6,k=S=>{let y=Math.min(.05,(S-i)/1e3);i=S,L>I?I=Math.min(L,I+y*b):I=Math.max(L,I-y*b),R(),Math.abs(I-L)<.001?(I=L,W=null):W=requestAnimationFrame(k)};W=requestAnimationFrame(k)},ie=250,xe=10,ce=!1,q=!1,$=null,u=null,M=null,A=null,B=0,T=!1,G=null,V=0,_=0,j=0,le=null,be=o=>{if(j=o,le!==null)return;let i=performance.now(),b=6,k=S=>{let y=Math.min(.05,(S-i)/1e3);i=S,j>_?_=Math.min(j,_+y*b):_=Math.max(j,_-y*b),R(),Math.abs(_-j)<.001?(_=j,le=null):le=requestAnimationFrame(k)};le=requestAnimationFrame(k)},ye=new Set,v=gt(e,a),ue=null,R=()=>{ue===null&&(ue=requestAnimationFrame(()=>{ue=null,dt(v,s,r,l,c,h,g,m,!0,D,H,z,I,M?{anchor:M,reveal:_,band:A,colorAnchor:G,angle:V}:null,t)}))},N=()=>{let o=ne(m,l),i=c?{r:255-o.r,g:255-o.g,b:255-o.b}:o,b=ke(i),k=ze(i),S=t<1?xt(i,t):De(i),y={rgb:i,hsb:b,oklch:k,hex:S,alpha:t};ye.forEach(Q=>Q(y))},J=(o,i)=>{i!==0&&(o==="x"?(f=ae(f,pe(i)),p.x+=i):o==="y"?(f=ae(f,Ce(i)),p.y+=i):(f=ae(f,Fe(i)),p.z+=i),C(),R())},Se=(o,i)=>{d=ae(Ce(o*.01),d),d=ae(pe(-i*.01),d),C(),R()},me=o=>{d=ae(o,Ie(f)),C(),R()},E=()=>{f=de(x.x,x.y,x.z),d=ge(),p={...x},s.zoom=1,C(),R()},P=!1,F=!1,O=0,K=0,he=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),yt=()=>{let o=he();return Math.min(r.radius||.001,Math.min(o.x,o.y,o.z)*.49)},pt=o=>{let i=he(),b=yt(),k=Math.abs(o.x)-(i.x-b),S=Math.abs(o.y)-(i.y-b),y=Math.abs(o.z)-(i.z-b),Q=Math.max(k,0),ee=Math.max(S,0),Y=Math.max(y,0),te=Math.hypot(Q,ee,Y),oe=Math.min(Math.max(k,Math.max(S,y)),0);return te+oe-b},Ae=(o,i)=>{let b=v.canvasGL.getBoundingClientRect(),k=(o-b.left)*(v.width/b.width),S=(i-b.top)*(v.height/b.height),y=k-v.width*.5,Q=v.height*.5-S,ee=v.width*.36*1.6*(s.zoom||1),Y={x:y/ee,y:Q/ee},te=Re=>Oe(Ie(s.mat),Re),oe=0,et=null;for(let Re=0;Re<96;Re++){let vt={x:Y.x,y:Y.y,z:-5+oe},tt=te(vt),ot=pt(tt);if(ot<.001){et=tt;break}if(oe+=ot,oe>10)break}return et},He=(o,i)=>{let b=Ae(o,i);if(!b)return;let k=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),S=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));m={x:k,y:S,z:y},N(),R()},Te=(o,i)=>{let b=v.canvasGL.getBoundingClientRect();return{x:(o-b.left)*(v.width/b.width),y:(i-b.top)*(v.height/b.height)}},We=()=>re(m,v.width*.36,{x:v.width*.5,y:v.height*.5},s,r),Ct=(o,i)=>{let b=Te(o,i),k=We();return Math.hypot(b.x-k.x,b.y-k.y)<=17},Mt=o=>{t=Math.max(0,Math.min(1,o)),N(),R()},we=o=>{let i=o.x-M.x,b=o.y-M.y,k=Math.atan2(i,-b);return k<0?k+fe:k},St=o=>we(o)/fe,_t=o=>{V=o;let i=ne(G||m,l);m=se(Le(i,o),l),N(),R()},$e=(o,i)=>{if(!h.svTriangle)return null;let b=v.canvasGL.getBoundingClientRect(),k=(o-b.left)*(v.width/b.width),S=(i-b.top)*(v.height/b.height),y=Me(D||m,l,v.width*.36,{x:v.width*.5,y:v.height*.5},s,r),Q=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(Q)<1e-6)return null;let ee=((y.w.y-y.k.y)*(k-y.k.x)+(y.k.x-y.w.x)*(S-y.k.y))/Q,Y=((y.k.y-y.c.y)*(k-y.k.x)+(y.c.x-y.k.x)*(S-y.k.y))/Q,te=1-ee-Y;return ee<-.02||Y<-.02||te<-.02?null:{a:ee,b:Y,g:te}},Ne=o=>{let b=Me(D||m,l,v.width*.36,{x:v.width*.5,y:v.height*.5},s,r),k=Math.max(0,Math.min(1,o.a*b.cRGB.x+o.b)),S=Math.max(0,Math.min(1,o.a*b.cRGB.y+o.b)),y=Math.max(0,Math.min(1,o.a*b.cRGB.z+o.b));m=se({r:k*255,g:S*255,b:y*255},l),N(),R()},Ze=0,qe=0,je=(o,i)=>{Ze=o,qe=i,v.canvasGL.style.cursor=Ae(o,i)?"default":"grab"};v.canvasGL.addEventListener("mousemove",o=>{je(o.clientX,o.clientY)}),v.canvasGL.addEventListener("mousedown",o=>{if(o.button===1||o.button===0&&o.altKey)P=!0,O=o.clientX,K=o.clientY,document.body.style.cursor="grabbing",o.preventDefault();else if(o.button===0){let i=z?$e(o.clientX,o.clientY):null;i?(U=!0,D={...m},H=i,Ne(i)):!z&&Ct(o.clientX,o.clientY)?(ce=!0,q=!1,u=Te(o.clientX,o.clientY),M=We(),A=null,G={...m},V=0,D=null,H=null,o.preventDefault(),$=window.setTimeout(()=>{$=null,ce&&!q&&(q=!0,be(1))},ie)):Ae(o.clientX,o.clientY)?(F=!0,D=null,H=null,He(o.clientX,o.clientY)):(P=!0,O=o.clientX,K=o.clientY,document.body.style.cursor="grabbing",o.preventDefault())}}),v.canvasGL.addEventListener("auxclick",o=>{o.button===1&&o.preventDefault()}),window.addEventListener("mousemove",o=>{if(ce&&M){let i=Te(o.clientX,o.clientY);if(!q){u&&Math.hypot(i.x-u.x,i.y-u.y)>xe&&($!==null&&(window.clearTimeout($),$=null),q=!0,be(1));return}let b=Math.hypot(i.x-M.x,i.y-M.y),k=Bt(_),S=_e*k,y=ve*k,Q=b>=S+y-2&&b<=S+2*y+2,ee=b>=S-2&&b<=S+y+2,Y=b<S-3?null:ee?"sat":Q?"alpha":null;if(Y!==A&&(A=Y,B=Y?we(i):0,T=!1),Y){let te=we(i);if(!T){let oe=Math.abs(te-B);oe>Math.PI&&(oe=fe-oe),oe>10*w&&(T=!0)}T?Y==="alpha"?Mt(te/fe):_t(te):R()}else R()}else if(U){let i=$e(o.clientX,o.clientY);i&&(H=i,Ne(i))}else if(P){let i=o.clientX-O,b=o.clientY-K;O=o.clientX,K=o.clientY,Se(i,b)}else F&&He(o.clientX,o.clientY)}),window.addEventListener("mouseup",()=>{ce&&($!==null&&(window.clearTimeout($),$=null),ce=!1,q=!1,u=null,A=null,B=0,T=!1,G=null,V=0,be(0)),U&&(U=!1),P&&(P=!1,document.body.style.cursor="default"),F&&(F=!1),je(Ze,qe)}),v.canvasGL.addEventListener("wheel",o=>{o.preventDefault();let i=o.deltaY<0?.08:-.08;s.zoom=Math.max(.2,Math.min(2.5,(s.zoom||1)+i)),R()},{passive:!1}),v.canvasGL.addEventListener("dblclick",o=>{Ae(o.clientX,o.clientY)?(c=!c,N()):E(),R()});let Ke=o=>{if(o.key==="Shift"){z||(z=!0,D=null,H=null,X(1));return}let i=o.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(o.key){case"r":case"R":E();break;case"f":case"F":me(ge());break;case"b":case"B":me(Ce(Math.PI));break;case"t":case"T":me(pe(Math.PI/2));break;case"ArrowLeft":o.preventDefault(),J("y",-5*w);break;case"ArrowRight":o.preventDefault(),J("y",5*w);break;case"ArrowUp":o.preventDefault(),J("x",5*w);break;case"ArrowDown":o.preventDefault(),J("x",-5*w);break}};window.addEventListener("keydown",Ke);let Qe=o=>{o.key==="Shift"&&z&&(z=!1,X(0))};window.addEventListener("keyup",Qe);let Je=()=>{z&&(z=!1,X(0))};return window.addEventListener("blur",Je),R(),N(),{getColor:()=>{let o=ne(m,l),i=c?{r:255-o.r,g:255-o.g,b:255-o.b}:o;return{rgb:i,hsb:ke(i),oklch:ze(i),hex:t<1?xt(i,t):De(i),alpha:t}},setColor:o=>{Z=o,m=se(o,l),o.a!==void 0&&(t=Math.max(0,Math.min(1,o.a))),D=null,H=null,N(),R()},setMode:o=>{l=o,D=null,H=null,N(),R()},getMode:()=>l,setRotation:(o,i)=>{f=de(i*w,0,o*w),d=ge(),p.x=i*w,p.y=0,p.z=o*w,C(),R()},getAxisRotation:()=>({rotXDeg:Math.round(Ye(p.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ye(p.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ye(p.z*180/Math.PI)*10)/10}),setAxisRotation:(o,i,b)=>{J("x",Ue(o*w-p.x)),J("y",Ue(i*w-p.y)),J("z",Ue(b*w-p.z))},rotateLocal:(o,i)=>{J(o,i*w)},resetRotation:(o,i,b)=>{f=de(o*w,i*w,b*w),d=ge(),p.x=o*w,p.y=i*w,p.z=b*w,C(),R()},setZoom:o=>{s.zoom=Math.max(.1,Math.min(3,o)),R()},getZoom:()=>s.zoom||1,setDimensions:(o,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,o)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),R()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:o=>{r.radius=Math.max(0,Math.min(.5,o)),R()},getRadius:()=>r.radius,setAlpha:o=>{t=Math.max(0,Math.min(1,o)),N(),R()},getAlpha:()=>t,getEdgeStyle:()=>({...g}),setEdgeStyle:o=>{g={...g,...o},R()},getGuides:()=>({...h}),setGuides:o=>{h={...h,...o},R()},toggleAllGuides:o=>{let i=o!==void 0?o:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},R()},on:(o,i)=>{ye.add(i)},off:(o,i)=>{ye.delete(i)},destroy:()=>{ue!==null&&cancelAnimationFrame(ue),W!==null&&cancelAnimationFrame(W),le!==null&&cancelAnimationFrame(le),$!==null&&window.clearTimeout($),window.removeEventListener("keydown",Ke),window.removeEventListener("keyup",Qe),window.removeEventListener("blur",Je),e.innerHTML=""}}}export{io as createRoundedBoxPicker};
