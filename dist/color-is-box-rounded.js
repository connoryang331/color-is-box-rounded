var tt={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},ot={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ve(e){let n=e.r/255,a=e.g/255,l=e.b/255,c=Math.max(n,a,l),s=Math.min(n,a,l),r=c-s,b=0;r!==0&&(c===n?b=((a-l)/r+6)%6:c===a?b=(l-n)/r+2:b=(n-a)/r+4,b*=60);let d=c===0?0:r/c*100,x=c*100;return{h:b,s:d,b:x}}function _t(e){let n=e.h,a=e.s/100,l=e.b/100,c=l*a,s=c*(1-Math.abs(n/60%2-1)),r=l-c,b,d,x;return n<60?(b=c,d=s,x=0):n<120?(b=s,d=c,x=0):n<180?(b=0,d=c,x=s):n<240?(b=0,d=s,x=c):n<300?(b=s,d=0,x=c):(b=c,d=0,x=s),{r:Math.round((b+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function ze(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Le(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function vt(e){let n=ze(e.r/255),a=ze(e.g/255),l=ze(e.b/255),c=.4122214708*n+.5363325363*a+.0514459929*l,s=.2119034982*n+.6806995451*a+.1073969566*l,r=.0883024619*n+.2817188376*a+.6299787005*l,b=Math.cbrt(c),d=Math.cbrt(s),x=Math.cbrt(r);return{L:.2104542553*b+.793617785*d-.0040720468*x,a:1.9779984951*b-2.428592205*d+.4505937099*x,b:.0259040371*b+.7827717662*d-.808675766*x}}function Mt(e,n,a){let l=e+.3963377774*n+.2158037573*a,c=e-.1055613458*n-.0638541728*a,s=e-.0894841775*n-1.291485548*a,r=l*l*l,b=c*c*c,d=s*s*s,x=4.0767416621*r-3.3077115913*b+.2309699292*d,f=-1.2684380046*r+2.6097574011*b-.3413193965*d,g=-.0041960863*r-.7034186147*b+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Le(x)))*255),g:Math.round(Math.max(0,Math.min(1,Le(f)))*255),b:Math.round(Math.max(0,Math.min(1,Le(g)))*255)}}function Me(e){let n=vt(e),a=Math.sqrt(n.a*n.a+n.b*n.b),l=Math.atan2(n.b,n.a)*(180/Math.PI);return l<0&&(l+=360),{l:n.L,c:a,h:a<1e-4?0:l}}function Be(e){let n=e.h*(Math.PI/180),a=e.c*Math.cos(n),l=e.c*Math.sin(n);return Mt(e.l,a,l)}function Rt(e,n,a){let l=Be({l:e,c:n,h:a});if(nt(l))return{l:e,c:n,h:a};let c=0,s=n;for(let r=0;r<20;r++){let b=(c+s)/2;l=Be({l:e,c:b,h:a}),nt(l)?c=b:s=b}return{l:e,c,h:a}}function nt(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Te(e){let n=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${n(e.r)}${n(e.g)}${n(e.b)}`}var rt=.4;function te(e,n){if(n==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(n==="hsb")return _t({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*rt,c=e.z*359,s=Rt(a,l,c);return Be(s)}}function le(e,n){if(n==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(n==="hsb"){let a=ve(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=Me(e);return{x:a.l,y:Math.min(a.c/rt,1),z:a.h/359}}}function Re(e,n){let a=n*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,c=e.g/255,s=e.b/255,r,b,d;if(a<=90){let f=a/90;r=l*(1-f),b=c*(1-f),d=s*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,b=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),b=f*c+(1-f),d=f*s+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(b),b:x(d)}}var Ge=Math.PI/180;function fe(){return[1,0,0,0,1,0,0,0,1]}function xe(e){let n=Math.cos(e),a=Math.sin(e);return[1,0,0,0,n,-a,0,a,n]}function ye(e){let n=Math.cos(e),a=Math.sin(e);return[n,0,a,0,1,0,-a,0,n]}function Ee(e){let n=Math.cos(e),a=Math.sin(e);return[n,a,0,-a,n,0,0,0,1]}function ne(e,n){let a=new Array(9);for(let l=0;l<3;l++)for(let c=0;c<3;c++)a[l*3+c]=e[l*3]*n[c]+e[l*3+1]*n[3+c]+e[l*3+2]*n[6+c];return a}function we(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Se(e,n){return{x:e[0]*n.x+e[1]*n.y+e[2]*n.z,y:e[3]*n.x+e[4]*n.y+e[5]*n.z,z:e[6]*n.x+e[7]*n.y+e[8]*n.z}}function be(e,n,a){return ne(ye(n),ne(Ee(a),xe(e)))}var at={mat:be(8*Ge,-20*Ge,-55*Ge),zoom:1},it={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Ae(e,n,a){let l=(e.x-.5)*a.sizeX,c=(e.y-.5)*a.sizeY,s=(e.z-.5)*a.sizeZ;return Se(n.mat,{x:l,y:c,z:s})}function oe(e,n,a,l,c){let s=Ae(e,l,c);return{x:a.x+s.x*n*1.6*l.zoom,y:a.y-s.y*n*1.6*l.zoom}}function pe(e,n,a,l,c,s){let r=te(e,n),b={x:r.r/255,y:r.g/255,z:r.b/255},d=le({r:255,g:255,b:255},n),x=le({r:0,g:0,b:0},n);return{c:oe(e,a,l,c,s),w:oe(d,a,l,c,s),k:oe(x,a,l,c,s),cRGB:b}}var De=["#ef4444","#22c55e","#3b82f6"];function lt(e,n,a,l,c,s){let r=g=>oe(g,n,a,l,c);e.save();let b=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:De[0],name:"Cx",visible:s.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:De[1],name:"Cy",visible:s.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:De[2],name:"Cz",visible:s.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let y=r(x[g].from),_=r(x[g].to);e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(_.x,_.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(y.x,y.y,3,0,Math.PI*2),e.arc(_.x,_.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(b.x,b.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var st=`
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
`;var Pe=30,Ve=12,Fe=56,Ie=16;function bt(e,n){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${n}px`,l.style.height=`${n}px`,l.style.userSelect="none";let c=document.createElement("canvas");c.width=n*a,c.height=n*a,c.style.width=`${n}px`,c.style.height=`${n}px`,c.style.position="absolute",c.style.left="0",c.style.top="0";let s=document.createElement("canvas");s.width=n*a,s.height=n*a,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.pointerEvents="none",l.appendChild(c),l.appendChild(s),e.appendChild(l);let r=c.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),b=s.getContext("2d");b.scale(a,a);let d=(z,U)=>{let F=r.createShader(z);return r.shaderSource(F,U),r.compileShader(F),r.getShaderParameter(F,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(F)),F},x=d(r.VERTEX_SHADER,st),f=d(r.FRAGMENT_SHADER,mt),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let y=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let _=r.getAttribLocation(g,"position");r.enableVertexAttribArray(_),r.vertexAttribPointer(_,2,r.FLOAT,!1,0,0);let Z=d(r.VERTEX_SHADER,ct),u=d(r.FRAGMENT_SHADER,ut),o=r.createProgram();r.attachShader(o,Z),r.attachShader(o,u),r.linkProgram(o);let O=r.getAttribLocation(o,"a_pos"),E=r.getAttribLocation(o,"a_color"),X=r.getUniformLocation(o,"u_alpha"),A=r.createBuffer(),V={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:b,canvasGL:c,canvasOverlay:s,width:n,height:n,program:g,uniforms:V,posBuffer:y,posAttr:_,triProgram:o,triPosAttr:O,triColorAttr:E,triAlphaLoc:X,triBuffer:A}}var ft=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function At(e,n,a,l,c,s){if(!s.showFront&&!s.showBack)return;let r=f=>oe(f,n,a,l,c),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Ae({x:.5,y:.5,z:.5},l,c);return Ae({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,c).z-g.z>0};if(e.save(),s.showBack){e.lineWidth=s.backWidth,s.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.backColor,e.globalAlpha=s.backOpacity;for(let f of ft)if(!(x(f.normalA)||x(f.normalB))){let[y,_]=f.edge;e.beginPath(),e.moveTo(d[y].x,d[y].y),e.lineTo(d[_].x,d[_].y),e.stroke()}}if(s.showFront){e.lineWidth=s.frontWidth,s.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=s.frontColor,e.globalAlpha=s.frontOpacity;for(let f of ft)if(x(f.normalA)||x(f.normalB)){let[y,_]=f.edge;e.beginPath(),e.moveTo(d[y].x,d[y].y),e.lineTo(d[_].x,d[_].y),e.stroke()}}e.restore()}function ht(e,n,a,l,c,s,r,b,d,x,f,g,y,_,Z){let{gl:u,overlayCtx:o,width:O,height:E,program:X,uniforms:A}=e,V=window.devicePixelRatio||1;u.viewport(0,0,O*V,E*V),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(X),u.uniform2f(A.u_resolution,O*V,E*V),u.uniform3f(A.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(A.u_radius,a.radius!==void 0?a.radius:.001);let z=n.mat;u.uniformMatrix3fv(A.u_mat,!1,new Float32Array([z[0],z[3],z[6],z[1],z[4],z[7],z[2],z[5],z[8]])),u.uniformMatrix3fv(A.u_mat_inv,!1,new Float32Array([z[0],z[1],z[2],z[3],z[4],z[5],z[6],z[7],z[8]])),u.uniform1f(A.u_zoom,n.zoom||1),u.uniform1i(A.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(A.u_invert,c?1:0),u.uniform1i(A.u_show_front,r.showFront?1:0),u.uniform1i(A.u_show_back,r.showBack?1:0),u.uniform1f(A.u_front_width,r.frontWidth||1.5),u.uniform1f(A.u_back_width,r.backWidth||1),u.uniform1i(A.u_front_dashed,r.frontDashed?1:0),u.uniform1i(A.u_back_dashed,r.backDashed?1:0),u.uniform4f(A.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(A.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let U=O*.36,F={x:O*.5,y:E*.5},W=null,N=null,se=g||y>.001;if(s.svTriangle&&se){let m=pe(x||b,l,U,F,n,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?W=m:N=m}let re=y<.5?2*y*y:1-Math.pow(-2*y+2,2)/2;if(W&&re<.01&&(W=null),W){let m=D=>[D.x/O*2-1,1-D.y/E*2],R=W,v=D=>({x:R.c.x+(D.x-R.c.x)*re,y:R.c.y+(D.y-R.c.y)*re}),k=m(R.c),B=m(v(R.w)),S=m(v(R.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([k[0],k[1],R.cRGB.x,R.cRGB.y,R.cRGB.z,B[0],B[1],1,1,1,S[0],S[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(X),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(o.save(),o.clearRect(0,0,O,E),At(o,U,F,n,a,r),lt(o,U,F,n,a,s),N){let m=N;o.save(),o.globalAlpha=y,o.beginPath(),o.moveTo(m.k.x,m.k.y),o.lineTo(m.w.x,m.w.y),o.strokeStyle="rgba(107, 114, 128, 0.7)",o.lineWidth=1.2,o.setLineDash([5,4]),o.stroke(),o.setLineDash([]),o.restore()}if(W){let m=W,R=C=>({x:m.c.x+(C.x-m.c.x)*re,y:m.c.y+(C.y-m.c.y)*re}),v=R(m.w),k=R(m.k),B=Math.round(m.cRGB.x*255),S=Math.round(m.cRGB.y*255),D=Math.round(m.cRGB.z*255);if(o.save(),o.globalAlpha=y,o.beginPath(),o.moveTo(m.c.x,m.c.y),o.lineTo(v.x,v.y),o.lineTo(k.x,k.y),o.closePath(),o.strokeStyle=`rgba(${B}, ${S}, ${D}, 0.7)`,o.lineWidth=1.2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(v.x,v.y,3.5,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.6)",o.lineWidth=1.2,o.stroke(),o.beginPath(),o.arc(k.x,k.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="rgba(255, 255, 255, 0.7)",o.lineWidth=1.2,o.stroke(),f){let C=f.a*m.c.x+f.b*v.x+f.g*k.x,q=f.a*m.c.y+f.b*v.y+f.g*k.y;o.beginPath(),o.arc(C,q,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(17, 24, 39, 0.75)",o.lineWidth=1.4,o.stroke()}o.restore()}if(d&&!f){let m=oe(b,U,F,n,a),R=te(b,l),v=c?{r:255-R.r,g:255-R.g,b:255-R.b}:R;if(Z<1){o.save(),o.beginPath(),o.arc(m.x,m.y,6,0,Math.PI*2),o.clip();let k=4;for(let B=-8;B<8;B+=k)for(let S=-8;S<8;S+=k)o.fillStyle=(S+B)/k%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(m.x+S,m.y+B,k,k);o.restore()}o.beginPath(),o.arc(m.x,m.y,6,0,Math.PI*2),o.fillStyle=Z<1?`rgba(${v.r}, ${v.g}, ${v.b}, ${Z})`:`rgb(${v.r}, ${v.g}, ${v.b})`,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=2,o.stroke()}if(_&&_.reveal>.01){let m=_.anchor,R=_.reveal<.5?2*_.reveal*_.reveal:1-Math.pow(-2*_.reveal+2,2)/2,v=Pe*R,k=Fe*R,B=Ve*R,S=Ie*R,D=te(b,l),C=c?{r:255-D.r,g:255-D.g,b:255-D.b}:D,q=-Math.PI/2;o.save(),o.globalAlpha=Math.min(1,R+.15);let L=(w,Y)=>{o.save(),o.beginPath(),o.arc(m.x,m.y,w+Y/2,0,Math.PI*2),o.arc(m.x,m.y,Math.max(.5,w-Y/2),0,Math.PI*2,!0),o.closePath(),o.clip();let P=6,I=w+Y/2;for(let Q=-I;Q<I;Q+=P)for(let J=-I;J<I;J+=P)o.fillStyle=(J+Q)/P%2===0?"#cbd5e1":"#f1f5f9",o.fillRect(m.x+J,m.y+Q,P,P);o.restore()},$=(w,Y,P)=>{o.lineWidth=P?1.8:1,o.strokeStyle=P?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let I of[w-Y/2,w+Y/2])I<=0||(o.beginPath(),o.arc(m.x,m.y,I,0,Math.PI*2),o.stroke())},j=(w,Y,P,I)=>{let Q=m.x,J=m.y-(Y+P/2)-2;o.font="700 12px ui-monospace, SF Mono, monospace",o.textAlign="center",o.textBaseline="alphabetic",o.lineWidth=3,o.strokeStyle="rgba(15, 23, 42, 0.55)",o.strokeText(w,Q,J),o.fillStyle=I?"#ffffff":"rgba(248, 250, 252, 0.95)",o.fillText(w,Q,J)},ke=_.colorAnchor||b,he=te(ke,l),de=72,ae=Math.PI*2/de;for(let w=0;w<de;w++){let Y=q+w*ae,P=Re(he,w*ae);o.beginPath(),o.arc(m.x,m.y,k,Y,Y+ae+.012),o.lineWidth=S,o.lineCap="butt",o.strokeStyle=`rgb(${P.r}, ${P.g}, ${P.b})`,o.stroke()}let ce=m.x+k*Math.sin(_.angle),ue=m.y-k*Math.cos(_.angle);o.beginPath(),o.arc(ce,ue,4,0,Math.PI*2),o.fillStyle="#ffffff",o.fill(),o.strokeStyle="rgba(15, 23, 42, 0.75)",o.lineWidth=1.4,o.stroke(),$(k,S,_.band==="sat"),j("SAT",k,S,_.band==="sat"),L(v,B);let me=q+Z*Math.PI*2;Z>.001&&(o.beginPath(),o.arc(m.x,m.y,v,q,me),o.lineWidth=B,o.strokeStyle=`rgba(${C.r}, ${C.g}, ${C.b}, ${Z})`,o.stroke()),$(v,B,_.band==="alpha"),j("A",v,B,_.band==="alpha"),o.restore()}o.restore()}var G=Math.PI/180,Ce=2*Math.PI,Oe=e=>{let n=e%360;return n>180?n-=360:n<-180&&(n+=360),n},Xe=e=>{let n=e%Ce;return n>Math.PI?n-=Ce:n<-Math.PI&&(n+=Ce),n},kt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,dt=(e,n)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(n*255)}`};function oo(e,n={}){let a=n.size||460,l=n.mode||"rgb",c=!1,s={...at},r={...it,radius:.08},b={...ot},d={...tt},x={x:8*G,y:-20*G,z:-55*G},f=be(x.x,x.y,x.z),g=fe(),y={...x},_=()=>{s.mat=ne(g,f)},Z=n.initialColor||{r:255,g:255,b:255},u=le(Z,l),o=1,O=!1,E=null,X=null,A=!1,V=0,z=0,U=null,F=t=>{if(z=t,U!==null)return;let i=performance.now(),h=6,M=T=>{let p=Math.min(.05,(T-i)/1e3);i=T,z>V?V=Math.min(z,V+p*h):V=Math.max(z,V-p*h),L(),Math.abs(V-z)<.001?(V=z,U=null):U=requestAnimationFrame(M)};U=requestAnimationFrame(M)},W=!1,N=null,se=null,re=0,m=null,R=0,v=0,k=0,B=null,S=t=>{if(k=t,B!==null)return;let i=performance.now(),h=6,M=T=>{let p=Math.min(.05,(T-i)/1e3);i=T,k>v?v=Math.min(k,v+p*h):v=Math.max(k,v-p*h),L(),Math.abs(v-k)<.001?(v=k,B=null):B=requestAnimationFrame(M)};B=requestAnimationFrame(M)},D=new Set,C=bt(e,a),q=null,L=()=>{q===null&&(q=requestAnimationFrame(()=>{q=null,ht(C,s,r,l,c,b,d,u,!0,E,X,A,V,N?{anchor:N,reveal:v,band:se,colorAnchor:m,angle:R}:null,o)}))},$=()=>{let t=te(u,l),i=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t,h=ve(i),M=Me(i),T=o<1?dt(i,o):Te(i),p={rgb:i,hsb:h,oklch:M,hex:T,alpha:o};D.forEach(K=>K(p))},j=(t,i)=>{i!==0&&(t==="x"?(f=ne(f,xe(i)),y.x+=i):t==="y"?(f=ne(f,ye(i)),y.y+=i):(f=ne(f,Ee(i)),y.z+=i),_(),L())},ke=(t,i)=>{g=ne(ye(t*.01),g),g=ne(xe(-i*.01),g),_(),L()},he=t=>{g=ne(t,we(f)),_(),L()},de=()=>{f=be(x.x,x.y,x.z),g=fe(),y={...x},s.zoom=1,_(),L()},ae=!1,ce=!1,ue=0,me=0,w=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),Y=()=>{let t=w();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},P=t=>{let i=w(),h=Y(),M=Math.abs(t.x)-(i.x-h),T=Math.abs(t.y)-(i.y-h),p=Math.abs(t.z)-(i.z-h),K=Math.max(M,0),ee=Math.max(T,0),H=Math.max(p,0),ie=Math.hypot(K,ee,H),ge=Math.min(Math.max(M,Math.max(T,p)),0);return ie+ge-h},I=(t,i)=>{let h=C.canvasGL.getBoundingClientRect(),M=(t-h.left)*(C.width/h.width),T=(i-h.top)*(C.height/h.height),p=M-C.width*.5,K=C.height*.5-T,ee=C.width*.36*1.6*(s.zoom||1),H={x:p/ee,y:K/ee},ie=_e=>Se(we(s.mat),_e),ge=0,Qe=null;for(let _e=0;_e<96;_e++){let Ct={x:H.x,y:H.y,z:-5+ge},Je=ie(Ct),et=P(Je);if(et<.001){Qe=Je;break}if(ge+=et,ge>10)break}return Qe},Q=(t,i)=>{let h=I(t,i);if(!h)return;let M=Math.max(0,Math.min(1,h.x/r.sizeX+.5)),T=Math.max(0,Math.min(1,h.y/r.sizeY+.5)),p=Math.max(0,Math.min(1,h.z/r.sizeZ+.5));u={x:M,y:T,z:p},$(),L()},J=(t,i)=>{let h=C.canvasGL.getBoundingClientRect();return{x:(t-h.left)*(C.width/h.width),y:(i-h.top)*(C.height/h.height)}},Ue=()=>oe(u,C.width*.36,{x:C.width*.5,y:C.height*.5},s,r),gt=(t,i)=>{let h=J(t,i),M=Ue();return Math.hypot(h.x-M.x,h.y-M.y)<=14},xt=t=>{o=Math.max(0,Math.min(1,t)),$(),L()},Ye=t=>{let i=t.x-N.x,h=t.y-N.y,M=Math.atan2(i,-h);return M<0?M+Ce:M},yt=t=>Ye(t)/Ce,pt=t=>{R=t;let i=te(m||u,l);u=le(Re(i,t),l),$(),L()},He=(t,i)=>{if(!b.svTriangle)return null;let h=C.canvasGL.getBoundingClientRect(),M=(t-h.left)*(C.width/h.width),T=(i-h.top)*(C.height/h.height),p=pe(E||u,l,C.width*.36,{x:C.width*.5,y:C.height*.5},s,r),K=(p.w.y-p.k.y)*(p.c.x-p.k.x)+(p.k.x-p.w.x)*(p.c.y-p.k.y);if(Math.abs(K)<1e-6)return null;let ee=((p.w.y-p.k.y)*(M-p.k.x)+(p.k.x-p.w.x)*(T-p.k.y))/K,H=((p.k.y-p.c.y)*(M-p.k.x)+(p.c.x-p.k.x)*(T-p.k.y))/K,ie=1-ee-H;return ee<-.02||H<-.02||ie<-.02?null:{a:ee,b:H,g:ie}},We=t=>{let h=pe(E||u,l,C.width*.36,{x:C.width*.5,y:C.height*.5},s,r),M=Math.max(0,Math.min(1,t.a*h.cRGB.x+t.b)),T=Math.max(0,Math.min(1,t.a*h.cRGB.y+t.b)),p=Math.max(0,Math.min(1,t.a*h.cRGB.z+t.b));u=le({r:M*255,g:T*255,b:p*255},l),$(),L()},Ne=0,$e=0,Ze=(t,i)=>{Ne=t,$e=i,C.canvasGL.style.cursor=I(t,i)?"default":"grab"};C.canvasGL.addEventListener("mousemove",t=>{Ze(t.clientX,t.clientY)}),C.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)ae=!0,ue=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=A?He(t.clientX,t.clientY):null;i?(O=!0,E={...u},X=i,We(i)):!A&&gt(t.clientX,t.clientY)?(W=!0,N=Ue(),se=null,m={...u},R=0,E=null,X=null,t.preventDefault(),S(1)):I(t.clientX,t.clientY)?(ce=!0,E=null,X=null,Q(t.clientX,t.clientY)):(ae=!0,ue=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),C.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(W&&N){let i=J(t.clientX,t.clientY),h=Math.hypot(i.x-N.x,i.y-N.y),M=kt(v),T=Pe*M,p=Fe*M,K=Math.abs(h-p)<=Ie*M/2+2,ee=Math.abs(h-T)<=Ve*M/2+2,H=K?"sat":ee?"alpha":null,ie=performance.now();H!==se&&(se=H,re=ie),H&&ie-re>100?H==="alpha"?xt(yt(i)):pt(Ye(i)):L()}else if(O){let i=He(t.clientX,t.clientY);i&&(X=i,We(i))}else if(ae){let i=t.clientX-ue,h=t.clientY-me;ue=t.clientX,me=t.clientY,ke(i,h)}else ce&&Q(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{W&&(W=!1,se=null,re=0,m=null,R=0,S(0)),O&&(O=!1),ae&&(ae=!1,document.body.style.cursor="default"),ce&&(ce=!1),Ze(Ne,$e)}),C.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;s.zoom=Math.max(.2,Math.min(2.5,(s.zoom||1)+i)),L()},{passive:!1}),C.canvasGL.addEventListener("dblclick",t=>{I(t.clientX,t.clientY)?(c=!c,$()):de(),L()});let qe=t=>{if(t.key==="Shift"){A||(A=!0,E=null,X=null,F(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":de();break;case"f":case"F":he(fe());break;case"b":case"B":he(ye(Math.PI));break;case"t":case"T":he(xe(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),j("y",-5*G);break;case"ArrowRight":t.preventDefault(),j("y",5*G);break;case"ArrowUp":t.preventDefault(),j("x",5*G);break;case"ArrowDown":t.preventDefault(),j("x",-5*G);break}};window.addEventListener("keydown",qe);let je=t=>{t.key==="Shift"&&A&&(A=!1,F(0))};window.addEventListener("keyup",je);let Ke=()=>{A&&(A=!1,F(0))};return window.addEventListener("blur",Ke),L(),$(),{getColor:()=>{let t=te(u,l),i=c?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:ve(i),oklch:Me(i),hex:o<1?dt(i,o):Te(i),alpha:o}},setColor:t=>{Z=t,u=le(t,l),t.a!==void 0&&(o=Math.max(0,Math.min(1,t.a))),E=null,X=null,$(),L()},setMode:t=>{l=t,E=null,X=null,$(),L()},getMode:()=>l,setRotation:(t,i)=>{f=be(i*G,0,t*G),g=fe(),y.x=i*G,y.y=0,y.z=t*G,_(),L()},getAxisRotation:()=>({rotXDeg:Math.round(Oe(y.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Oe(y.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Oe(y.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,h)=>{j("x",Xe(t*G-y.x)),j("y",Xe(i*G-y.y)),j("z",Xe(h*G-y.z))},rotateLocal:(t,i)=>{j(t,i*G)},resetRotation:(t,i,h)=>{f=be(t*G,i*G,h*G),g=fe(),y.x=t*G,y.y=i*G,y.z=h*G,_(),L()},setZoom:t=>{s.zoom=Math.max(.1,Math.min(3,t)),L()},getZoom:()=>s.zoom||1,setDimensions:(t,i,h)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,h)),L()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),L()},getRadius:()=>r.radius,setAlpha:t=>{o=Math.max(0,Math.min(1,t)),$(),L()},getAlpha:()=>o,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},L()},getGuides:()=>({...b}),setGuides:t=>{b={...b,...t},L()},toggleAllGuides:t=>{let i=t!==void 0?t:!b.vertexX;b={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:b.svTriangle},L()},on:(t,i)=>{D.add(i)},off:(t,i)=>{D.delete(i)},destroy:()=>{q!==null&&cancelAnimationFrame(q),U!==null&&cancelAnimationFrame(U),B!==null&&cancelAnimationFrame(B),window.removeEventListener("keydown",qe),window.removeEventListener("keyup",je),window.removeEventListener("blur",Ke),e.innerHTML=""}}}export{oo as createRoundedBoxPicker};
