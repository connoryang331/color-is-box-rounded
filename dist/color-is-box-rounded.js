var tt={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},ot={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Re(e){let n=e.r/255,a=e.g/255,l=e.b/255,c=Math.max(n,a,l),s=Math.min(n,a,l),r=c-s,h=0;r!==0&&(c===n?h=((a-l)/r+6)%6:c===a?h=(l-n)/r+2:h=(n-a)/r+4,h*=60);let d=c===0?0:r/c*100,x=c*100;return{h,s:d,b:x}}function Ct(e){let n=e.h,a=e.s/100,l=e.b/100,c=l*a,s=c*(1-Math.abs(n/60%2-1)),r=l-c,h,d,x;return n<60?(h=c,d=s,x=0):n<120?(h=s,d=c,x=0):n<180?(h=0,d=c,x=s):n<240?(h=0,d=s,x=c):n<300?(h=s,d=0,x=c):(h=c,d=0,x=s),{r:Math.round((h+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function Se(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Te(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function vt(e){let n=Se(e.r/255),a=Se(e.g/255),l=Se(e.b/255),c=.4122214708*n+.5363325363*a+.0514459929*l,s=.2119034982*n+.6806995451*a+.1073969566*l,r=.0883024619*n+.2817188376*a+.6299787005*l,h=Math.cbrt(c),d=Math.cbrt(s),x=Math.cbrt(r);return{L:.2104542553*h+.793617785*d-.0040720468*x,a:1.9779984951*h-2.428592205*d+.4505937099*x,b:.0259040371*h+.7827717662*d-.808675766*x}}function _t(e,n,a){let l=e+.3963377774*n+.2158037573*a,c=e-.1055613458*n-.0638541728*a,s=e-.0894841775*n-1.291485548*a,r=l*l*l,h=c*c*c,d=s*s*s,x=4.0767416621*r-3.3077115913*h+.2309699292*d,f=-1.2684380046*r+2.6097574011*h-.3413193965*d,g=-.0041960863*r-.7034186147*h+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Te(x)))*255),g:Math.round(Math.max(0,Math.min(1,Te(f)))*255),b:Math.round(Math.max(0,Math.min(1,Te(g)))*255)}}function ke(e){let n=vt(e),a=Math.sqrt(n.a*n.a+n.b*n.b),l=Math.atan2(n.b,n.a)*(180/Math.PI);return l<0&&(l+=360),{l:n.L,c:a,h:a<1e-4?0:l}}function Ee(e){let n=e.h*(Math.PI/180),a=e.c*Math.cos(n),l=e.c*Math.sin(n);return _t(e.l,a,l)}function Mt(e,n,a){let l=Ee({l:e,c:n,h:a});if(nt(l))return{l:e,c:n,h:a};let c=0,s=n;for(let r=0;r<20;r++){let h=(c+s)/2;l=Ee({l:e,c:h,h:a}),nt(l)?c=h:s=h}return{l:e,c,h:a}}function nt(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Ge(e){let n=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${n(e.r)}${n(e.g)}${n(e.b)}`}var rt=.4;function te(e,n){if(n==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(n==="hsb")return Ct({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*rt,c=e.z*359,s=Mt(a,l,c);return Ee(s)}}function ce(e,n){if(n==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(n==="hsb"){let a=Re(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ke(e);return{x:a.l,y:Math.min(a.c/rt,1),z:a.h/359}}}function ze(e,n){let a=n*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,c=e.g/255,s=e.b/255,r,h,d;if(a<=90){let f=a/90;r=l*(1-f),h=c*(1-f),d=s*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,h=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),h=f*c+(1-f),d=f*s+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(h),b:x(d)}}var we=Math.PI/180;function de(){return[1,0,0,0,1,0,0,0,1]}function xe(e){let n=Math.cos(e),a=Math.sin(e);return[1,0,0,0,n,-a,0,a,n]}function ye(e){let n=Math.cos(e),a=Math.sin(e);return[n,0,a,0,1,0,-a,0,n]}function De(e){let n=Math.cos(e),a=Math.sin(e);return[n,a,0,-a,n,0,0,0,1]}function ne(e,n){let a=new Array(9);for(let l=0;l<3;l++)for(let c=0;c<3;c++)a[l*3+c]=e[l*3]*n[c]+e[l*3+1]*n[3+c]+e[l*3+2]*n[6+c];return a}function Pe(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Ve(e,n){return{x:e[0]*n.x+e[1]*n.y+e[2]*n.z,y:e[3]*n.x+e[4]*n.y+e[5]*n.z,z:e[6]*n.x+e[7]*n.y+e[8]*n.z}}function ge(e,n,a){return ne(ye(n),ne(De(a),xe(e)))}var at={mat:ge(8*we,-20*we,-55*we),zoom:1},it={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Le(e,n,a){let l=(e.x-.5)*a.sizeX,c=(e.y-.5)*a.sizeY,s=(e.z-.5)*a.sizeZ;return Ve(n.mat,{x:l,y:c,z:s})}function oe(e,n,a,l,c){let s=Le(e,l,c);return{x:a.x+s.x*n*1.6*l.zoom,y:a.y-s.y*n*1.6*l.zoom}}function pe(e,n,a,l,c,s){let r=te(e,n),h={x:r.r/255,y:r.g/255,z:r.b/255},d=ce({r:255,g:255,b:255},n),x=ce({r:0,g:0,b:0},n);return{c:oe(e,a,l,c,s),w:oe(d,a,l,c,s),k:oe(x,a,l,c,s),cRGB:h}}var Fe=["#ef4444","#22c55e","#3b82f6"];function lt(e,n,a,l,c,s){let r=g=>oe(g,n,a,l,c);e.save();let h=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:Fe[0],name:"Cx",visible:s.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:Fe[1],name:"Cy",visible:s.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:Fe[2],name:"Cz",visible:s.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let p=r(x[g].from),C=r(x[g].to);e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(C.x,C.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(p.x,p.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var st=`
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
`;var Ce=20,ve=18;function bt(e,n){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${n}px`,l.style.height=`${n}px`,l.style.userSelect="none";let c=document.createElement("canvas");c.width=n*a,c.height=n*a,c.style.width=`${n}px`,c.style.height=`${n}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let s=document.createElement("canvas");s.width=n*a,s.height=n*a,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.pointerEvents="none",l.appendChild(c),l.appendChild(s),e.appendChild(l);let r=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=s.getContext("2d");h.scale(a,a);let d=(k,W)=>{let X=r.createShader(k);return r.shaderSource(X,W),r.compileShader(X),r.getShaderParameter(X,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(X)),X},x=d(r.VERTEX_SHADER,st),f=d(r.FRAGMENT_SHADER,mt),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(g,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let Y=d(r.VERTEX_SHADER,ct),u=d(r.FRAGMENT_SHADER,ut),o=r.createProgram();r.attachShader(o,Y),r.attachShader(o,u),r.linkProgram(o);let U=r.getAttribLocation(o,"a_pos"),P=r.getAttribLocation(o,"a_color"),H=r.getUniformLocation(o,"u_alpha"),A=r.createBuffer(),O={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:c,canvasOverlay:s,width:n,height:n,program:g,uniforms:O,posBuffer:p,posAttr:C,triProgram:o,triPosAttr:U,triColorAttr:P,triAlphaLoc:H,triBuffer:A}}var ft=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function At(e,n,a,l,c,s){if(!s.showFront&&!s.showBack)return;let r=f=>oe(f,n,a,l,c),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Le({x:.5,y:.5,z:.5},l,c);return Le({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,c).z-g.z>0};if(e.save(),s.showBack){e.lineWidth=s.backWidth,s.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.backColor,e.globalAlpha=s.backOpacity;for(let f of ft)if(!(x(f.normalA)||x(f.normalB))){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}if(s.showFront){e.lineWidth=s.frontWidth,s.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.frontColor,e.globalAlpha=s.frontOpacity;for(let f of ft)if(x(f.normalA)||x(f.normalB)){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}e.restore()}function ht(e,n,a,l,c,s,r,h,d,x,f,g,p,C,Y){let{gl:u,overlayCtx:o,width:U,height:P,program:H,uniforms:A}=e,O=window.devicePixelRatio||1;u.viewport(0,0,U*O,P*O),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(H),u.uniform2f(A.u_resolution,U*O,P*O),u.uniform3f(A.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(A.u_radius,a.radius!==void 0?a.radius:.001);let k=n.mat;u.uniformMatrix3fv(A.u_mat,!1,new Float32Array([k[0],k[3],k[6],k[1],k[4],k[7],k[2],k[5],k[8]])),u.uniformMatrix3fv(A.u_mat_inv,!1,new Float32Array([k[0],k[1],k[2],k[3],k[4],k[5],k[6],k[7],k[8]])),u.uniform1f(A.u_zoom,n.zoom||1),u.uniform1i(A.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(A.u_invert,c?1:0),u.uniform1i(A.u_show_front,r.showFront?1:0),u.uniform1i(A.u_show_back,r.showBack?1:0),u.uniform1f(A.u_front_width,r.frontWidth||1.5),u.uniform1f(A.u_back_width,r.backWidth||1),u.uniform1i(A.u_front_dashed,r.frontDashed?1:0),u.uniform1i(A.u_back_dashed,r.backDashed?1:0),u.uniform4f(A.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(A.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let W=U*.36,X={x:U*.5,y:P*.5},$=null,N=null,ue=g||p>.001;if(s.svTriangle&&ue){let m=pe(x||h,l,W,X,n,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?$=m:N=m}let re=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if($&&re<.01&&($=null),$){let m=G=>[G.x/U*2-1,1-G.y/P*2],v=$,S=G=>({x:v.c.x+(G.x-v.c.x)*re,y:v.c.y+(G.y-v.c.y)*re}),z=m(v.c),B=m(S(v.w)),T=m(S(v.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([z[0],z[1],v.cRGB.x,v.cRGB.y,v.cRGB.z,B[0],B[1],1,1,1,T[0],T[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(H),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(o.save(),o.clearRect(0,0,U,P),At(o,W,X,n,a,r),lt(o,W,X,n,a,s),N){let m=N;o.save(),o.globalAlpha=p,o.beginPath(),o.moveTo(m.k.x,m.k.y),o.lineTo(m.w.x,m.w.y),o.strokeStyle="rgba(107, 114, 128, 0.7)",o.lineWidth=1.2,o.setLineDash([5,4]),o.stroke(),o.setLineDash([]),o.restore()}if($){let m=$,v=V=>({x:m.c.x+(V.x-m.c.x)*re,y:m.c.y+(V.y-m.c.y)*re}),S=v(m.w),z=v(m.k),B=Math.round(m.cRGB.x*255),T=Math.round(m.cRGB.y*255),G=Math.round(m.cRGB.z*255);if(o.save(),o.globalAlpha=p,o.beginPath(),o.moveTo(m.c.x,m.c.y),o.lineTo(S.x,S.y),o.lineTo(z.x,z.y),o.closePath(),o.strokeStyle=`rgba(${B}, ${T}, ${G}, 0.7)`,o.lineWidth=1.2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(S.x,S.y,3.5,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.6)",o.lineWidth=1.2,o.stroke(),o.beginPath(),o.arc(z.x,z.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="rgba(255, 255, 255, 0.7)",o.lineWidth=1.2,o.stroke(),f){let V=f.a*m.c.x+f.b*S.x+f.g*z.x,ae=f.a*m.c.y+f.b*S.y+f.g*z.y;o.beginPath(),o.arc(V,ae,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.75)",o.lineWidth=1.4,o.stroke()}o.restore()}if(d&&!f&&!C){let m=oe(h,W,X,n,a),v=te(h,l),S=c?{r:255-v.r,g:255-v.g,b:255-v.b}:v;if(Y<1){o.save(),o.beginPath(),o.arc(m.x,m.y,6,0,Math.PI*2),o.clip();let z=4;for(let B=-8;B<8;B+=z)for(let T=-8;T<8;T+=z)o.fillStyle=(T+B)/z%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(m.x+T,m.y+B,z,z);o.restore()}o.beginPath(),o.arc(m.x,m.y,6,0,Math.PI*2),o.fillStyle=Y<1?`rgba(${S.r}, ${S.g}, ${S.b}, ${Y})`:`rgb(${S.r}, ${S.g}, ${S.b})`,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=2,o.stroke()}if(C&&C.reveal>.01){let m=C.anchor,v=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,S=Ce*v,z=(Ce+ve/2)*v,B=(Ce+ve*1.5)*v,T=ve*v,G=te(h,l),V=c?{r:255-G.r,g:255-G.g,b:255-G.b}:G,ae=-Math.PI/2;o.save(),o.globalAlpha=Math.min(1,v+.15);let _=(w,I)=>{o.save(),o.beginPath(),o.arc(m.x,m.y,w+I/2,0,Math.PI*2),o.arc(m.x,m.y,Math.max(.5,w-I/2),0,Math.PI*2,!0),o.closePath(),o.clip();let F=6,Z=w+I/2;for(let ie=-Z;ie<Z;ie+=F)for(let le=-Z;le<Z;le+=F)o.fillStyle=(le+ie)/F%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(m.x+le,m.y+ie,F,F);o.restore()},se=(w,I,F)=>{o.lineWidth=F?1.8:1,o.strokeStyle=F?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let Z of[w-I/2,w+I/2])Z<=0||(o.beginPath(),o.arc(m.x,m.y,Z,0,Math.PI*2),o.stroke())},R=(w,I,F)=>{let Z=m.x,ie=m.y-(I+T/2)-2;o.font="700 12px ui-monospace, SF Mono, monospace",o.textAlign="center",o.textBaseline="alphabetic",o.lineWidth=3,o.strokeStyle="rgba(15, 23, 42, 0.55)",o.strokeText(w,Z,ie),o.fillStyle=F?"#ffffff":"rgba(248, 250, 252, 0.95)",o.fillText(w,Z,ie)},q=C.colorAnchor||h,K=te(q,l),_e=72,me=Math.PI*2/_e;for(let w=0;w<_e;w++){let I=ae+w*me,F=ze(K,w*me);o.beginPath(),o.arc(m.x,m.y,z,I,I+me+.012),o.lineWidth=T,o.lineCap="butt",o.strokeStyle=`rgb(${F.r}, ${F.g}, ${F.b})`,o.stroke()}let Me=m.x+z*Math.sin(C.angle),fe=m.y-z*Math.cos(C.angle);o.beginPath(),o.arc(Me,fe,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(15, 23, 42, 0.75)",o.lineWidth=1.4,o.stroke(),se(z,T,C.band==="sat"),_(B,T);let he=ae+Y*Math.PI*2;Y>.001&&(o.beginPath(),o.arc(m.x,m.y,B,ae,he),o.lineWidth=T,o.strokeStyle=`rgba(${V.r}, ${V.g}, ${V.b}, ${Y})`,o.stroke()),se(B,T,C.band==="alpha"),R("SAT",B,C.band==="sat"),o.beginPath(),o.arc(m.x,m.y,S,0,Math.PI*2),o.fillStyle=Y<1?`rgba(${V.r}, ${V.g}, ${V.b}, ${Y})`:`rgb(${V.r}, ${V.g}, ${V.b})`,o.fill(),o.strokeStyle="rgba(255, 255, 255, 0.95)",o.lineWidth=2,o.stroke(),o.restore()}o.restore()}var E=Math.PI/180,be=2*Math.PI,Ie=e=>{let n=e%360;return n>180?n-=360:n<-180&&(n+=360),n},Oe=e=>{let n=e%be;return n>Math.PI?n-=be:n<-Math.PI&&(n+=be),n},Rt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,dt=(e,n)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(n*255)}`};function oo(e,n={}){let a=n.size||460,l=n.mode||"rgb",c=!1,s={...at},r={...it,radius:.08},h={...ot},d={...tt},x={x:8*E,y:-20*E,z:-55*E},f=ge(x.x,x.y,x.z),g=de(),p={...x},C=()=>{s.mat=ne(g,f)},Y=n.initialColor||{r:255,g:255,b:255},u=ce(Y,l),o=1,U=!1,P=null,H=null,A=!1,O=0,k=0,W=null,X=t=>{if(k=t,W!==null)return;let i=performance.now(),b=6,M=L=>{let y=Math.min(.05,(L-i)/1e3);i=L,k>O?O=Math.min(k,O+y*b):O=Math.max(k,O-y*b),R(),Math.abs(O-k)<.001?(O=k,W=null):W=requestAnimationFrame(M)};W=requestAnimationFrame(M)},$=!1,N=null,ue=null,re=0,m=!1,v=null,S=null,z=0,B=0,T=0,G=null,V=t=>{if(T=t,G!==null)return;let i=performance.now(),b=6,M=L=>{let y=Math.min(.05,(L-i)/1e3);i=L,T>B?B=Math.min(T,B+y*b):B=Math.max(T,B-y*b),R(),Math.abs(B-T)<.001?(B=T,G=null):G=requestAnimationFrame(M)};G=requestAnimationFrame(M)},ae=new Set,_=bt(e,a),se=null,R=()=>{se===null&&(se=requestAnimationFrame(()=>{se=null,ht(_,s,r,l,c,h,d,u,!0,P,H,A,O,N?{anchor:N,reveal:B,band:ue,colorAnchor:S,angle:z}:null,o)}))},q=()=>{let t=te(u,l),i=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t,b=Re(i),M=ke(i),L=o<1?dt(i,o):Ge(i),y={rgb:i,hsb:b,oklch:M,hex:L,alpha:o};ae.forEach(j=>j(y))},K=(t,i)=>{i!==0&&(t==="x"?(f=ne(f,xe(i)),p.x+=i):t==="y"?(f=ne(f,ye(i)),p.y+=i):(f=ne(f,De(i)),p.z+=i),C(),R())},_e=(t,i)=>{g=ne(ye(t*.01),g),g=ne(xe(-i*.01),g),C(),R()},me=t=>{g=ne(t,Pe(f)),C(),R()},Me=()=>{f=ge(x.x,x.y,x.z),g=de(),p={...x},s.zoom=1,C(),R()},fe=!1,he=!1,w=0,I=0,F=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),Z=()=>{let t=F();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},ie=t=>{let i=F(),b=Z(),M=Math.abs(t.x)-(i.x-b),L=Math.abs(t.y)-(i.y-b),y=Math.abs(t.z)-(i.z-b),j=Math.max(M,0),Q=Math.max(L,0),D=Math.max(y,0),J=Math.hypot(j,Q,D),ee=Math.min(Math.max(M,Math.max(L,y)),0);return J+ee-b},le=(t,i)=>{let b=_.canvasGL.getBoundingClientRect(),M=(t-b.left)*(_.width/b.width),L=(i-b.top)*(_.height/b.height),y=M-_.width*.5,j=_.height*.5-L,Q=_.width*.36*1.6*(s.zoom||1),D={x:y/Q,y:j/Q},J=Ae=>Ve(Pe(s.mat),Ae),ee=0,Qe=null;for(let Ae=0;Ae<96;Ae++){let pt={x:D.x,y:D.y,z:-5+ee},Je=J(pt),et=ie(Je);if(et<.001){Qe=Je;break}if(ee+=et,ee>10)break}return Qe},Xe=(t,i)=>{let b=le(t,i);if(!b)return;let M=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),L=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));u={x:M,y:L,z:y},q(),R()},Ye=(t,i)=>{let b=_.canvasGL.getBoundingClientRect();return{x:(t-b.left)*(_.width/b.width),y:(i-b.top)*(_.height/b.height)}},Ue=()=>oe(u,_.width*.36,{x:_.width*.5,y:_.height*.5},s,r),gt=(t,i)=>{let b=Ye(t,i),M=Ue();return Math.hypot(b.x-M.x,b.y-M.y)<=14},xt=t=>{o=Math.max(0,Math.min(1,t)),q(),R()},Be=t=>{let i=t.x-N.x,b=t.y-N.y,M=Math.atan2(i,-b);return M<0?M+be:M},kt=t=>Be(t)/be,yt=t=>{z=t;let i=te(S||u,l);u=ce(ze(i,t),l),q(),R()},He=(t,i)=>{if(!h.svTriangle)return null;let b=_.canvasGL.getBoundingClientRect(),M=(t-b.left)*(_.width/b.width),L=(i-b.top)*(_.height/b.height),y=pe(P||u,l,_.width*.36,{x:_.width*.5,y:_.height*.5},s,r),j=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(j)<1e-6)return null;let Q=((y.w.y-y.k.y)*(M-y.k.x)+(y.k.x-y.w.x)*(L-y.k.y))/j,D=((y.k.y-y.c.y)*(M-y.k.x)+(y.c.x-y.k.x)*(L-y.k.y))/j,J=1-Q-D;return Q<-.02||D<-.02||J<-.02?null:{a:Q,b:D,g:J}},We=t=>{let b=pe(P||u,l,_.width*.36,{x:_.width*.5,y:_.height*.5},s,r),M=Math.max(0,Math.min(1,t.a*b.cRGB.x+t.b)),L=Math.max(0,Math.min(1,t.a*b.cRGB.y+t.b)),y=Math.max(0,Math.min(1,t.a*b.cRGB.z+t.b));u=ce({r:M*255,g:L*255,b:y*255},l),q(),R()},$e=0,Ne=0,Ze=(t,i)=>{$e=t,Ne=i,_.canvasGL.style.cursor=le(t,i)?"default":"grab"};_.canvasGL.addEventListener("mousemove",t=>{Ze(t.clientX,t.clientY)}),_.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)fe=!0,w=t.clientX,I=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=A?He(t.clientX,t.clientY):null;i?(U=!0,P={...u},H=i,We(i)):!A&&gt(t.clientX,t.clientY)?($=!0,N=Ue(),ue=null,S={...u},z=0,P=null,H=null,t.preventDefault(),V(1)):le(t.clientX,t.clientY)?(he=!0,P=null,H=null,Xe(t.clientX,t.clientY)):(fe=!0,w=t.clientX,I=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),_.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if($&&N){let i=Ye(t.clientX,t.clientY),b=Math.hypot(i.x-N.x,i.y-N.y),M=Rt(B),L=Ce*M,y=ve*M,j=b>=L+y-2&&b<=L+2*y+2,Q=b>=L-2&&b<=L+y+2,D;if(b<L-3?D=null:v?D=v:D=Q?"sat":j?"alpha":null,D!==ue&&(ue=D,D===null&&(v=null),re=D?Be(i):0,m=!1),D){let J=Be(i);if(!m){let ee=Math.abs(J-re);ee>Math.PI&&(ee=be-ee),ee>10*E&&(m=!0,v=D)}m?D==="alpha"?xt(J/be):yt(J):R()}else R()}else if(U){let i=He(t.clientX,t.clientY);i&&(H=i,We(i))}else if(fe){let i=t.clientX-w,b=t.clientY-I;w=t.clientX,I=t.clientY,_e(i,b)}else he&&Xe(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{$&&($=!1,ue=null,re=0,m=!1,v=null,S=null,z=0,V(0)),U&&(U=!1),fe&&(fe=!1,document.body.style.cursor="default"),he&&(he=!1),Ze($e,Ne)}),_.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;s.zoom=Math.max(.2,Math.min(2.5,(s.zoom||1)+i)),R()},{passive:!1}),_.canvasGL.addEventListener("dblclick",t=>{le(t.clientX,t.clientY)?(c=!c,q()):Me(),R()});let qe=t=>{if(t.key==="Shift"){A||(A=!0,P=null,H=null,X(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":Me();break;case"f":case"F":me(de());break;case"b":case"B":me(ye(Math.PI));break;case"t":case"T":me(xe(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),K("y",-5*E);break;case"ArrowRight":t.preventDefault(),K("y",5*E);break;case"ArrowUp":t.preventDefault(),K("x",5*E);break;case"ArrowDown":t.preventDefault(),K("x",-5*E);break}};window.addEventListener("keydown",qe);let je=t=>{t.key==="Shift"&&A&&(A=!1,X(0))};window.addEventListener("keyup",je);let Ke=()=>{A&&(A=!1,X(0))};return window.addEventListener("blur",Ke),R(),q(),{getColor:()=>{let t=te(u,l),i=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:Re(i),oklch:ke(i),hex:o<1?dt(i,o):Ge(i),alpha:o}},setColor:t=>{Y=t,u=ce(t,l),t.a!==void 0&&(o=Math.max(0,Math.min(1,t.a))),P=null,H=null,q(),R()},setMode:t=>{l=t,P=null,H=null,q(),R()},getMode:()=>l,setRotation:(t,i)=>{f=ge(i*E,0,t*E),g=de(),p.x=i*E,p.y=0,p.z=t*E,C(),R()},getAxisRotation:()=>({rotXDeg:Math.round(Ie(p.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ie(p.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ie(p.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,b)=>{K("x",Oe(t*E-p.x)),K("y",Oe(i*E-p.y)),K("z",Oe(b*E-p.z))},rotateLocal:(t,i)=>{K(t,i*E)},resetRotation:(t,i,b)=>{f=ge(t*E,i*E,b*E),g=de(),p.x=t*E,p.y=i*E,p.z=b*E,C(),R()},setZoom:t=>{s.zoom=Math.max(.1,Math.min(3,t)),R()},getZoom:()=>s.zoom||1,setDimensions:(t,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),R()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),R()},getRadius:()=>r.radius,setAlpha:t=>{o=Math.max(0,Math.min(1,t)),q(),R()},getAlpha:()=>o,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},R()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},R()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},R()},on:(t,i)=>{ae.add(i)},off:(t,i)=>{ae.delete(i)},destroy:()=>{se!==null&&cancelAnimationFrame(se),W!==null&&cancelAnimationFrame(W),G!==null&&cancelAnimationFrame(G),window.removeEventListener("keydown",qe),window.removeEventListener("keyup",je),window.removeEventListener("blur",Ke),e.innerHTML=""}}}export{oo as createRoundedBoxPicker};
