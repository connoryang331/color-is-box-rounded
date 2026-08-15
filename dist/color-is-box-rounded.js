var tt={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},ot={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Re(e){let n=e.r/255,a=e.g/255,l=e.b/255,c=Math.max(n,a,l),s=Math.min(n,a,l),r=c-s,h=0;r!==0&&(c===n?h=((a-l)/r+6)%6:c===a?h=(l-n)/r+2:h=(n-a)/r+4,h*=60);let d=c===0?0:r/c*100,x=c*100;return{h,s:d,b:x}}function Ct(e){let n=e.h,a=e.s/100,l=e.b/100,c=l*a,s=c*(1-Math.abs(n/60%2-1)),r=l-c,h,d,x;return n<60?(h=c,d=s,x=0):n<120?(h=s,d=c,x=0):n<180?(h=0,d=c,x=s):n<240?(h=0,d=s,x=c):n<300?(h=s,d=0,x=c):(h=c,d=0,x=s),{r:Math.round((h+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function Se(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Te(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function vt(e){let n=Se(e.r/255),a=Se(e.g/255),l=Se(e.b/255),c=.4122214708*n+.5363325363*a+.0514459929*l,s=.2119034982*n+.6806995451*a+.1073969566*l,r=.0883024619*n+.2817188376*a+.6299787005*l,h=Math.cbrt(c),d=Math.cbrt(s),x=Math.cbrt(r);return{L:.2104542553*h+.793617785*d-.0040720468*x,a:1.9779984951*h-2.428592205*d+.4505937099*x,b:.0259040371*h+.7827717662*d-.808675766*x}}function _t(e,n,a){let l=e+.3963377774*n+.2158037573*a,c=e-.1055613458*n-.0638541728*a,s=e-.0894841775*n-1.291485548*a,r=l*l*l,h=c*c*c,d=s*s*s,x=4.0767416621*r-3.3077115913*h+.2309699292*d,f=-1.2684380046*r+2.6097574011*h-.3413193965*d,g=-.0041960863*r-.7034186147*h+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Te(x)))*255),g:Math.round(Math.max(0,Math.min(1,Te(f)))*255),b:Math.round(Math.max(0,Math.min(1,Te(g)))*255)}}function ke(e){let n=vt(e),a=Math.sqrt(n.a*n.a+n.b*n.b),l=Math.atan2(n.b,n.a)*(180/Math.PI);return l<0&&(l+=360),{l:n.L,c:a,h:a<1e-4?0:l}}function Ee(e){let n=e.h*(Math.PI/180),a=e.c*Math.cos(n),l=e.c*Math.sin(n);return _t(e.l,a,l)}function Mt(e,n,a){let l=Ee({l:e,c:n,h:a});if(nt(l))return{l:e,c:n,h:a};let c=0,s=n;for(let r=0;r<20;r++){let h=(c+s)/2;l=Ee({l:e,c:h,h:a}),nt(l)?c=h:s=h}return{l:e,c,h:a}}function nt(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Ge(e){let n=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${n(e.r)}${n(e.g)}${n(e.b)}`}var rt=.4;function oe(e,n){if(n==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(n==="hsb")return Ct({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*rt,c=e.z*359,s=Mt(a,l,c);return Ee(s)}}function ce(e,n){if(n==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(n==="hsb"){let a=Re(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ke(e);return{x:a.l,y:Math.min(a.c/rt,1),z:a.h/359}}}function ze(e,n){let a=n*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,c=e.g/255,s=e.b/255,r,h,d;if(a<=90){let f=a/90;r=l*(1-f),h=c*(1-f),d=s*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,h=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),h=f*c+(1-f),d=f*s+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(h),b:x(d)}}var we=Math.PI/180;function de(){return[1,0,0,0,1,0,0,0,1]}function xe(e){let n=Math.cos(e),a=Math.sin(e);return[1,0,0,0,n,-a,0,a,n]}function ye(e){let n=Math.cos(e),a=Math.sin(e);return[n,0,a,0,1,0,-a,0,n]}function De(e){let n=Math.cos(e),a=Math.sin(e);return[n,a,0,-a,n,0,0,0,1]}function re(e,n){let a=new Array(9);for(let l=0;l<3;l++)for(let c=0;c<3;c++)a[l*3+c]=e[l*3]*n[c]+e[l*3+1]*n[3+c]+e[l*3+2]*n[6+c];return a}function Pe(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Ve(e,n){return{x:e[0]*n.x+e[1]*n.y+e[2]*n.z,y:e[3]*n.x+e[4]*n.y+e[5]*n.z,z:e[6]*n.x+e[7]*n.y+e[8]*n.z}}function ge(e,n,a){return re(ye(n),re(De(a),xe(e)))}var at={mat:ge(8*we,-20*we,-55*we),zoom:1},it={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Le(e,n,a){let l=(e.x-.5)*a.sizeX,c=(e.y-.5)*a.sizeY,s=(e.z-.5)*a.sizeZ;return Ve(n.mat,{x:l,y:c,z:s})}function ne(e,n,a,l,c){let s=Le(e,l,c);return{x:a.x+s.x*n*1.6*l.zoom,y:a.y-s.y*n*1.6*l.zoom}}function pe(e,n,a,l,c,s){let r=oe(e,n),h={x:r.r/255,y:r.g/255,z:r.b/255},d=ce({r:255,g:255,b:255},n),x=ce({r:0,g:0,b:0},n);return{c:ne(e,a,l,c,s),w:ne(d,a,l,c,s),k:ne(x,a,l,c,s),cRGB:h}}var Fe=["#ef4444","#22c55e","#3b82f6"];function lt(e,n,a,l,c,s){let r=g=>ne(g,n,a,l,c);e.save();let h=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:Fe[0],name:"Cx",visible:s.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:Fe[1],name:"Cy",visible:s.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:Fe[2],name:"Cz",visible:s.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let p=r(x[g].from),C=r(x[g].to);e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(C.x,C.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(p.x,p.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var st=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ct=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,ut=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,mt=`
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
`;var Ce=20,ve=18;function bt(e,n){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${n}px`,l.style.height=`${n}px`,l.style.userSelect="none";let c=document.createElement("canvas");c.width=n*a,c.height=n*a,c.style.width=`${n}px`,c.style.height=`${n}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let s=document.createElement("canvas");s.width=n*a,s.height=n*a,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.pointerEvents="none",l.appendChild(c),l.appendChild(s),e.appendChild(l);let r=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=s.getContext("2d");h.scale(a,a);let d=(z,W)=>{let Y=r.createShader(z);return r.shaderSource(Y,W),r.compileShader(Y),r.getShaderParameter(Y,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(Y)),Y},x=d(r.VERTEX_SHADER,st),f=d(r.FRAGMENT_SHADER,mt),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(g,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let X=d(r.VERTEX_SHADER,ct),m=d(r.FRAGMENT_SHADER,ut),o=r.createProgram();r.attachShader(o,X),r.attachShader(o,m),r.linkProgram(o);let U=r.getAttribLocation(o,"a_pos"),F=r.getAttribLocation(o,"a_color"),H=r.getUniformLocation(o,"u_alpha"),R=r.createBuffer(),O={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:c,canvasOverlay:s,width:n,height:n,program:g,uniforms:O,posBuffer:p,posAttr:C,triProgram:o,triPosAttr:U,triColorAttr:F,triAlphaLoc:H,triBuffer:R}}var ft=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function At(e,n,a,l,c,s){if(!s.showFront&&!s.showBack)return;let r=f=>ne(f,n,a,l,c),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Le({x:.5,y:.5,z:.5},l,c);return Le({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,c).z-g.z>0};if(e.save(),s.showBack){e.lineWidth=s.backWidth,s.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.backColor,e.globalAlpha=s.backOpacity;for(let f of ft)if(!(x(f.normalA)||x(f.normalB))){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}if(s.showFront){e.lineWidth=s.frontWidth,s.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.frontColor,e.globalAlpha=s.frontOpacity;for(let f of ft)if(x(f.normalA)||x(f.normalB)){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}e.restore()}function ht(e,n,a,l,c,s,r,h,d,x,f,g,p,C,X){let{gl:m,overlayCtx:o,width:U,height:F,program:H,uniforms:R}=e,O=window.devicePixelRatio||1;m.viewport(0,0,U*O,F*O),m.clearColor(0,0,0,0),m.clear(m.COLOR_BUFFER_BIT),m.useProgram(H),m.uniform2f(R.u_resolution,U*O,F*O),m.uniform3f(R.u_box_size,a.sizeX,a.sizeY,a.sizeZ),m.uniform1f(R.u_radius,a.radius!==void 0?a.radius:.001);let z=n.mat;m.uniformMatrix3fv(R.u_mat,!1,new Float32Array([z[0],z[3],z[6],z[1],z[4],z[7],z[2],z[5],z[8]])),m.uniformMatrix3fv(R.u_mat_inv,!1,new Float32Array([z[0],z[1],z[2],z[3],z[4],z[5],z[6],z[7],z[8]])),m.uniform1f(R.u_zoom,n.zoom||1),m.uniform1i(R.u_mode,l==="rgb"?0:l==="hsb"?1:2),m.uniform1i(R.u_invert,c?1:0),m.uniform1i(R.u_show_front,r.showFront?1:0),m.uniform1i(R.u_show_back,r.showBack?1:0),m.uniform1f(R.u_front_width,r.frontWidth||1.5),m.uniform1f(R.u_back_width,r.backWidth||1),m.uniform1i(R.u_front_dashed,r.frontDashed?1:0),m.uniform1i(R.u_back_dashed,r.backDashed?1:0),m.uniform4f(R.u_front_color,1,1,1,r.frontOpacity||.65),m.uniform4f(R.u_back_color,1,1,1,r.backOpacity||.25),m.drawArrays(m.TRIANGLES,0,6);let W=U*.36,Y={x:U*.5,y:F*.5},$=null,N=null,ue=g||p>.001;if(s.svTriangle&&ue){let u=pe(x||h,l,W,Y,n,a);Math.abs((u.w.x-u.c.x)*(u.k.y-u.c.y)-(u.w.y-u.c.y)*(u.k.x-u.c.x))>4?$=u:N=u}let ae=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if($&&ae<.01&&($=null),$){let u=P=>[P.x/U*2-1,1-P.y/F*2],_=$,v=P=>({x:_.c.x+(P.x-_.c.x)*ae,y:_.c.y+(P.y-_.c.y)*ae}),S=u(_.c),L=u(v(_.w)),T=u(v(_.k));m.useProgram(e.triProgram),m.enable(m.BLEND),m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA),m.bindBuffer(m.ARRAY_BUFFER,e.triBuffer),m.bufferData(m.ARRAY_BUFFER,new Float32Array([S[0],S[1],_.cRGB.x,_.cRGB.y,_.cRGB.z,L[0],L[1],1,1,1,T[0],T[1],0,0,0]),m.STATIC_DRAW),m.enableVertexAttribArray(e.triPosAttr),m.vertexAttribPointer(e.triPosAttr,2,m.FLOAT,!1,20,0),m.enableVertexAttribArray(e.triColorAttr),m.vertexAttribPointer(e.triColorAttr,3,m.FLOAT,!1,20,8),m.uniform1f(e.triAlphaLoc,1),m.drawArrays(m.TRIANGLES,0,3),m.disable(m.BLEND),m.useProgram(H),m.enableVertexAttribArray(e.posAttr),m.bindBuffer(m.ARRAY_BUFFER,e.posBuffer),m.vertexAttribPointer(e.posAttr,2,m.FLOAT,!1,0,0)}if(o.save(),o.clearRect(0,0,U,F),At(o,W,Y,n,a,r),lt(o,W,Y,n,a,s),N){let u=N;o.save(),o.globalAlpha=p,o.beginPath(),o.moveTo(u.k.x,u.k.y),o.lineTo(u.w.x,u.w.y),o.strokeStyle="rgba(107, 114, 128, 0.7)",o.lineWidth=1.2,o.setLineDash([5,4]),o.stroke(),o.setLineDash([]),o.restore()}if($){let u=$,_=I=>({x:u.c.x+(I.x-u.c.x)*ae,y:u.c.y+(I.y-u.c.y)*ae}),v=_(u.w),S=_(u.k),L=Math.round(u.cRGB.x*255),T=Math.round(u.cRGB.y*255),P=Math.round(u.cRGB.z*255);if(o.save(),o.globalAlpha=p,o.beginPath(),o.moveTo(u.c.x,u.c.y),o.lineTo(v.x,v.y),o.lineTo(S.x,S.y),o.closePath(),o.strokeStyle=`rgba(${L}, ${T}, ${P}, 0.7)`,o.lineWidth=1.2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(v.x,v.y,3.5,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.6)",o.lineWidth=1.2,o.stroke(),o.beginPath(),o.arc(S.x,S.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="rgba(255, 255, 255, 0.7)",o.lineWidth=1.2,o.stroke(),f){let I=f.a*u.c.x+f.b*v.x+f.g*S.x,ie=f.a*u.c.y+f.b*v.y+f.g*S.y;o.beginPath(),o.arc(I,ie,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.75)",o.lineWidth=1.4,o.stroke()}o.restore()}if(d&&!f&&!C){let u=ne(h,W,Y,n,a),_=oe(h,l),v=c?{r:255-_.r,g:255-_.g,b:255-_.b}:_;if(X<1){o.save(),o.beginPath(),o.arc(u.x,u.y,6,0,Math.PI*2),o.clip();let S=4;for(let L=-8;L<8;L+=S)for(let T=-8;T<8;T+=S)o.fillStyle=(T+L)/S%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(u.x+T,u.y+L,S,S);o.restore()}o.beginPath(),o.arc(u.x,u.y,6,0,Math.PI*2),o.fillStyle=X<1?`rgba(${v.r}, ${v.g}, ${v.b}, ${X})`:`rgb(${v.r}, ${v.g}, ${v.b})`,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=2,o.stroke()}if(C&&C.reveal>.01){let u=C.anchor,_=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,v=Ce*_,S=(Ce+ve/2)*_,L=(Ce+ve*1.5)*_,T=ve*_,P=oe(h,l),I=c?{r:255-P.r,g:255-P.g,b:255-P.b}:P,ie=-Math.PI/2;o.save(),o.globalAlpha=Math.min(1,_+.15);let M=(D,w)=>{o.save(),o.beginPath(),o.arc(u.x,u.y,D+w/2,0,Math.PI*2),o.arc(u.x,u.y,Math.max(.5,D-w/2),0,Math.PI*2,!0),o.closePath(),o.clip();let E=6,j=D+w/2;for(let le=-j;le<j;le+=E)for(let Z=-j;Z<j;Z+=E)o.fillStyle=(Z+le)/E%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(u.x+Z,u.y+le,E,E);o.restore()},se=(D,w,E)=>{o.lineWidth=E?1.8:1,o.strokeStyle=E?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let j of[D-w/2,D+w/2])j<=0||(o.beginPath(),o.arc(u.x,u.y,j,0,Math.PI*2),o.stroke())},k=(D,w,E,j)=>{let le=u.x,Z=u.y-(w+E/2)-2;o.font="700 12px ui-monospace, SF Mono, monospace",o.textAlign="center",o.textBaseline="alphabetic",o.lineWidth=3,o.strokeStyle="rgba(15, 23, 42, 0.55)",o.strokeText(D,le,Z),o.fillStyle=j?"#ffffff":"rgba(248, 250, 252, 0.95)",o.fillText(D,le,Z)},q=C.colorAnchor||h,Q=oe(q,l),_e=72,me=Math.PI*2/_e;for(let D=0;D<_e;D++){let w=ie+D*me,E=ze(Q,D*me);o.beginPath(),o.arc(u.x,u.y,L,w,w+me+.012),o.lineWidth=T,o.lineCap="butt",o.strokeStyle=`rgb(${E.r}, ${E.g}, ${E.b})`,o.stroke()}let Me=u.x+L*Math.sin(C.angle),fe=u.y-L*Math.cos(C.angle);o.beginPath(),o.arc(Me,fe,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(15, 23, 42, 0.75)",o.lineWidth=1.4,o.stroke(),se(L,T,C.band==="sat"),k("SAT",L,T,C.band==="sat"),M(S,T);let he=ie+X*Math.PI*2;if(X>.001&&(o.beginPath(),o.arc(u.x,u.y,S,ie,he),o.lineWidth=T,o.strokeStyle=`rgba(${I.r}, ${I.g}, ${I.b}, ${X})`,o.stroke()),se(S,T,C.band==="alpha"),o.save(),o.beginPath(),o.arc(u.x,u.y,v,0,Math.PI*2),o.clip(),X<1)for(let w=-v;w<v;w+=6)for(let E=-v;E<v;E+=6)o.fillStyle=(E+w)/6%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(u.x+E,u.y+w,6,6);o.fillStyle=X<1?`rgba(${I.r}, ${I.g}, ${I.b}, ${X})`:`rgb(${I.r}, ${I.g}, ${I.b})`,o.fillRect(u.x-v,u.y-v,v*2,v*2),o.restore(),o.beginPath(),o.arc(u.x,u.y,v,0,Math.PI*2),o.strokeStyle="rgba(255, 255, 255, 0.95)",o.lineWidth=2,o.stroke(),o.restore()}o.restore()}var G=Math.PI/180,be=2*Math.PI,Ie=e=>{let n=e%360;return n>180?n-=360:n<-180&&(n+=360),n},Oe=e=>{let n=e%be;return n>Math.PI?n-=be:n<-Math.PI&&(n+=be),n},Rt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,dt=(e,n)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(n*255)}`};function oo(e,n={}){let a=n.size||460,l=n.mode||"rgb",c=!1,s={...at},r={...it,radius:.08},h={...ot},d={...tt},x={x:8*G,y:-20*G,z:-55*G},f=ge(x.x,x.y,x.z),g=de(),p={...x},C=()=>{s.mat=re(g,f)},X=n.initialColor||{r:255,g:255,b:255},m=ce(X,l),o=1,U=!1,F=null,H=null,R=!1,O=0,z=0,W=null,Y=t=>{if(z=t,W!==null)return;let i=performance.now(),b=6,A=B=>{let y=Math.min(.05,(B-i)/1e3);i=B,z>O?O=Math.min(z,O+y*b):O=Math.max(z,O-y*b),k(),Math.abs(O-z)<.001?(O=z,W=null):W=requestAnimationFrame(A)};W=requestAnimationFrame(A)},$=!1,N=null,ue=null,ae=0,u=!1,_=null,v=null,S=0,L=0,T=0,P=null,I=t=>{if(T=t,P!==null)return;let i=performance.now(),b=6,A=B=>{let y=Math.min(.05,(B-i)/1e3);i=B,T>L?L=Math.min(T,L+y*b):L=Math.max(T,L-y*b),k(),Math.abs(L-T)<.001?(L=T,P=null):P=requestAnimationFrame(A)};P=requestAnimationFrame(A)},ie=new Set,M=bt(e,a),se=null,k=()=>{se===null&&(se=requestAnimationFrame(()=>{se=null,ht(M,s,r,l,c,h,d,m,!0,F,H,R,O,N?{anchor:N,reveal:L,band:ue,colorAnchor:v,angle:S}:null,o)}))},q=()=>{let t=oe(m,l),i=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t,b=Re(i),A=ke(i),B=o<1?dt(i,o):Ge(i),y={rgb:i,hsb:b,oklch:A,hex:B,alpha:o};ie.forEach(K=>K(y))},Q=(t,i)=>{i!==0&&(t==="x"?(f=re(f,xe(i)),p.x+=i):t==="y"?(f=re(f,ye(i)),p.y+=i):(f=re(f,De(i)),p.z+=i),C(),k())},_e=(t,i)=>{g=re(ye(t*.01),g),g=re(xe(-i*.01),g),C(),k()},me=t=>{g=re(t,Pe(f)),C(),k()},Me=()=>{f=ge(x.x,x.y,x.z),g=de(),p={...x},s.zoom=1,C(),k()},fe=!1,he=!1,D=0,w=0,E=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),j=()=>{let t=E();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},le=t=>{let i=E(),b=j(),A=Math.abs(t.x)-(i.x-b),B=Math.abs(t.y)-(i.y-b),y=Math.abs(t.z)-(i.z-b),K=Math.max(A,0),J=Math.max(B,0),V=Math.max(y,0),ee=Math.hypot(K,J,V),te=Math.min(Math.max(A,Math.max(B,y)),0);return ee+te-b},Z=(t,i)=>{let b=M.canvasGL.getBoundingClientRect(),A=(t-b.left)*(M.width/b.width),B=(i-b.top)*(M.height/b.height),y=A-M.width*.5,K=M.height*.5-B,J=M.width*.36*1.6*(s.zoom||1),V={x:y/J,y:K/J},ee=Ae=>Ve(Pe(s.mat),Ae),te=0,Qe=null;for(let Ae=0;Ae<96;Ae++){let pt={x:V.x,y:V.y,z:-5+te},Je=ee(pt),et=le(Je);if(et<.001){Qe=Je;break}if(te+=et,te>10)break}return Qe},Xe=(t,i)=>{let b=Z(t,i);if(!b)return;let A=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),B=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));m={x:A,y:B,z:y},q(),k()},Ye=(t,i)=>{let b=M.canvasGL.getBoundingClientRect();return{x:(t-b.left)*(M.width/b.width),y:(i-b.top)*(M.height/b.height)}},Ue=()=>ne(m,M.width*.36,{x:M.width*.5,y:M.height*.5},s,r),gt=(t,i)=>{let b=Ye(t,i),A=Ue();return Math.hypot(b.x-A.x,b.y-A.y)<=14},xt=t=>{o=Math.max(0,Math.min(1,t)),q(),k()},Be=t=>{let i=t.x-N.x,b=t.y-N.y,A=Math.atan2(i,-b);return A<0?A+be:A},kt=t=>Be(t)/be,yt=t=>{S=t;let i=oe(v||m,l);m=ce(ze(i,t),l),q(),k()},He=(t,i)=>{if(!h.svTriangle)return null;let b=M.canvasGL.getBoundingClientRect(),A=(t-b.left)*(M.width/b.width),B=(i-b.top)*(M.height/b.height),y=pe(F||m,l,M.width*.36,{x:M.width*.5,y:M.height*.5},s,r),K=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(K)<1e-6)return null;let J=((y.w.y-y.k.y)*(A-y.k.x)+(y.k.x-y.w.x)*(B-y.k.y))/K,V=((y.k.y-y.c.y)*(A-y.k.x)+(y.c.x-y.k.x)*(B-y.k.y))/K,ee=1-J-V;return J<-.02||V<-.02||ee<-.02?null:{a:J,b:V,g:ee}},We=t=>{let b=pe(F||m,l,M.width*.36,{x:M.width*.5,y:M.height*.5},s,r),A=Math.max(0,Math.min(1,t.a*b.cRGB.x+t.b)),B=Math.max(0,Math.min(1,t.a*b.cRGB.y+t.b)),y=Math.max(0,Math.min(1,t.a*b.cRGB.z+t.b));m=ce({r:A*255,g:B*255,b:y*255},l),q(),k()},$e=0,Ne=0,Ze=(t,i)=>{$e=t,Ne=i,M.canvasGL.style.cursor=Z(t,i)?"default":"grab"};M.canvasGL.addEventListener("mousemove",t=>{Ze(t.clientX,t.clientY)}),M.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)fe=!0,D=t.clientX,w=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=R?He(t.clientX,t.clientY):null;i?(U=!0,F={...m},H=i,We(i)):!R&&gt(t.clientX,t.clientY)?($=!0,N=Ue(),ue=null,v={...m},S=0,F=null,H=null,t.preventDefault(),I(1)):Z(t.clientX,t.clientY)?(he=!0,F=null,H=null,Xe(t.clientX,t.clientY)):(fe=!0,D=t.clientX,w=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),M.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if($&&N){let i=Ye(t.clientX,t.clientY),b=Math.hypot(i.x-N.x,i.y-N.y),A=Rt(L),B=Ce*A,y=ve*A,K=b>=B+y-2&&b<=B+2*y+2,J=b>=B-2&&b<=B+y+2,V;if(b<B-3?V=null:_?V=_:V=K?"sat":J?"alpha":null,V!==ue&&(ue=V,V===null&&(_=null),ae=V?Be(i):0,u=!1),V){let ee=Be(i);if(!u){let te=Math.abs(ee-ae);te>Math.PI&&(te=be-te),te>10*G&&(u=!0,_=V)}u?V==="alpha"?xt(ee/be):yt(ee):k()}else k()}else if(U){let i=He(t.clientX,t.clientY);i&&(H=i,We(i))}else if(fe){let i=t.clientX-D,b=t.clientY-w;D=t.clientX,w=t.clientY,_e(i,b)}else he&&Xe(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{$&&($=!1,ue=null,ae=0,u=!1,_=null,v=null,S=0,I(0)),U&&(U=!1),fe&&(fe=!1,document.body.style.cursor="default"),he&&(he=!1),Ze($e,Ne)}),M.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;s.zoom=Math.max(.2,Math.min(2.5,(s.zoom||1)+i)),k()},{passive:!1}),M.canvasGL.addEventListener("dblclick",t=>{Z(t.clientX,t.clientY)?(c=!c,q()):Me(),k()});let qe=t=>{if(t.key==="Shift"){R||(R=!0,F=null,H=null,Y(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":Me();break;case"f":case"F":me(de());break;case"b":case"B":me(ye(Math.PI));break;case"t":case"T":me(xe(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),Q("y",-5*G);break;case"ArrowRight":t.preventDefault(),Q("y",5*G);break;case"ArrowUp":t.preventDefault(),Q("x",5*G);break;case"ArrowDown":t.preventDefault(),Q("x",-5*G);break}};window.addEventListener("keydown",qe);let je=t=>{t.key==="Shift"&&R&&(R=!1,Y(0))};window.addEventListener("keyup",je);let Ke=()=>{R&&(R=!1,Y(0))};return window.addEventListener("blur",Ke),k(),q(),{getColor:()=>{let t=oe(m,l),i=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:Re(i),oklch:ke(i),hex:o<1?dt(i,o):Ge(i),alpha:o}},setColor:t=>{X=t,m=ce(t,l),t.a!==void 0&&(o=Math.max(0,Math.min(1,t.a))),F=null,H=null,q(),k()},setMode:t=>{l=t,F=null,H=null,q(),k()},getMode:()=>l,setRotation:(t,i)=>{f=ge(i*G,0,t*G),g=de(),p.x=i*G,p.y=0,p.z=t*G,C(),k()},getAxisRotation:()=>({rotXDeg:Math.round(Ie(p.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ie(p.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ie(p.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,b)=>{Q("x",Oe(t*G-p.x)),Q("y",Oe(i*G-p.y)),Q("z",Oe(b*G-p.z))},rotateLocal:(t,i)=>{Q(t,i*G)},resetRotation:(t,i,b)=>{f=ge(t*G,i*G,b*G),g=de(),p.x=t*G,p.y=i*G,p.z=b*G,C(),k()},setZoom:t=>{s.zoom=Math.max(.1,Math.min(3,t)),k()},getZoom:()=>s.zoom||1,setDimensions:(t,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),k()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),k()},getRadius:()=>r.radius,setAlpha:t=>{o=Math.max(0,Math.min(1,t)),q(),k()},getAlpha:()=>o,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},k()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},k()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},k()},on:(t,i)=>{ie.add(i)},off:(t,i)=>{ie.delete(i)},destroy:()=>{se!==null&&cancelAnimationFrame(se),W!==null&&cancelAnimationFrame(W),P!==null&&cancelAnimationFrame(P),window.removeEventListener("keydown",qe),window.removeEventListener("keyup",je),window.removeEventListener("blur",Ke),e.innerHTML=""}}}export{oo as createRoundedBoxPicker};
