var ColorIsBoxRounded=(()=>{var ze=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var Mt=Object.getOwnPropertyNames;var Rt=Object.prototype.hasOwnProperty;var At=(e,o)=>{for(var a in o)ze(e,a,{get:o[a],enumerable:!0})},kt=(e,o,a,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of Mt(o))!Rt.call(e,s)&&s!==a&&ze(e,s,{get:()=>o[s],enumerable:!(l=vt(o,s))||l.enumerable});return e};var zt=e=>kt(ze({},"__esModule",{value:!0}),e);var Dt={};At(Dt,{createRoundedBoxPicker:()=>St});var ot={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},nt={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ve(e){let o=e.r/255,a=e.g/255,l=e.b/255,s=Math.max(o,a,l),c=Math.min(o,a,l),r=s-c,b=0;r!==0&&(s===o?b=((a-l)/r+6)%6:s===a?b=(l-o)/r+2:b=(o-a)/r+4,b*=60);let d=s===0?0:r/s*100,x=s*100;return{h:b,s:d,b:x}}function Lt(e){let o=e.h,a=e.s/100,l=e.b/100,s=l*a,c=s*(1-Math.abs(o/60%2-1)),r=l-s,b,d,x;return o<60?(b=s,d=c,x=0):o<120?(b=c,d=s,x=0):o<180?(b=0,d=s,x=c):o<240?(b=0,d=c,x=s):o<300?(b=c,d=0,x=s):(b=s,d=0,x=c),{r:Math.round((b+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function Le(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Be(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Bt(e){let o=Le(e.r/255),a=Le(e.g/255),l=Le(e.b/255),s=.4122214708*o+.5363325363*a+.0514459929*l,c=.2119034982*o+.6806995451*a+.1073969566*l,r=.0883024619*o+.2817188376*a+.6299787005*l,b=Math.cbrt(s),d=Math.cbrt(c),x=Math.cbrt(r);return{L:.2104542553*b+.793617785*d-.0040720468*x,a:1.9779984951*b-2.428592205*d+.4505937099*x,b:.0259040371*b+.7827717662*d-.808675766*x}}function Tt(e,o,a){let l=e+.3963377774*o+.2158037573*a,s=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=l*l*l,b=s*s*s,d=c*c*c,x=4.0767416621*r-3.3077115913*b+.2309699292*d,f=-1.2684380046*r+2.6097574011*b-.3413193965*d,g=-.0041960863*r-.7034186147*b+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Be(x)))*255),g:Math.round(Math.max(0,Math.min(1,Be(f)))*255),b:Math.round(Math.max(0,Math.min(1,Be(g)))*255)}}function Me(e){let o=Bt(e),a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.atan2(o.b,o.a)*(180/Math.PI);return l<0&&(l+=360),{l:o.L,c:a,h:a<1e-4?0:l}}function Te(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),l=e.c*Math.sin(o);return Tt(e.l,a,l)}function Gt(e,o,a){let l=Te({l:e,c:o,h:a});if(rt(l))return{l:e,c:o,h:a};let s=0,c=o;for(let r=0;r<20;r++){let b=(s+c)/2;l=Te({l:e,c:b,h:a}),rt(l)?s=b:c=b}return{l:e,c:s,h:a}}function rt(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Ge(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var at=.4;function te(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return Lt({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*at,s=e.z*359,c=Gt(a,l,s);return Te(c)}}function le(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=ve(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=Me(e);return{x:a.l,y:Math.min(a.c/at,1),z:a.h/359}}}function Re(e,o){let a=o*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,s=e.g/255,c=e.b/255,r,b,d;if(a<=90){let f=a/90;r=l*(1-f),b=s*(1-f),d=c*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,b=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),b=f*s+(1-f),d=f*c+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(b),b:x(d)}}var Ee=Math.PI/180;function fe(){return[1,0,0,0,1,0,0,0,1]}function xe(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function ye(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function we(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function ne(e,o){let a=new Array(9);for(let l=0;l<3;l++)for(let s=0;s<3;s++)a[l*3+s]=e[l*3]*o[s]+e[l*3+1]*o[3+s]+e[l*3+2]*o[6+s];return a}function Se(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function De(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function be(e,o,a){return ne(ye(o),ne(we(a),xe(e)))}var it={mat:be(8*Ee,-20*Ee,-55*Ee),zoom:1},lt={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Ae(e,o,a){let l=(e.x-.5)*a.sizeX,s=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return De(o.mat,{x:l,y:s,z:c})}function oe(e,o,a,l,s){let c=Ae(e,l,s);return{x:a.x+c.x*o*1.6*l.zoom,y:a.y-c.y*o*1.6*l.zoom}}function pe(e,o,a,l,s,c){let r=te(e,o),b={x:r.r/255,y:r.g/255,z:r.b/255},d=le({r:255,g:255,b:255},o),x=le({r:0,g:0,b:0},o);return{c:oe(e,a,l,s,c),w:oe(d,a,l,s,c),k:oe(x,a,l,s,c),cRGB:b}}var Pe=["#ef4444","#22c55e","#3b82f6"];function st(e,o,a,l,s,c){let r=g=>oe(g,o,a,l,s);e.save();let b=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:Pe[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:Pe[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:Pe[2],name:"Cz",visible:c.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let y=r(x[g].from),_=r(x[g].to);e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(_.x,_.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(y.x,y.y,3,0,Math.PI*2),e.arc(_.x,_.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(b.x,b.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var ct=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ut=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,mt=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,ft=`
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
`;var Ve=30,Fe=12,Ie=56,Oe=16;function ht(e,o){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.userSelect="none";let s=document.createElement("canvas");s.width=o*a,s.height=o*a,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",l.appendChild(s),l.appendChild(c),e.appendChild(l);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),b=c.getContext("2d");b.scale(a,a);let d=(z,U)=>{let F=r.createShader(z);return r.shaderSource(F,U),r.compileShader(F),r.getShaderParameter(F,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(F)),F},x=d(r.VERTEX_SHADER,ct),f=d(r.FRAGMENT_SHADER,ft),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let y=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let _=r.getAttribLocation(g,"position");r.enableVertexAttribArray(_),r.vertexAttribPointer(_,2,r.FLOAT,!1,0,0);let Z=d(r.VERTEX_SHADER,ut),u=d(r.FRAGMENT_SHADER,mt),n=r.createProgram();r.attachShader(n,Z),r.attachShader(n,u),r.linkProgram(n);let O=r.getAttribLocation(n,"a_pos"),E=r.getAttribLocation(n,"a_color"),X=r.getUniformLocation(n,"u_alpha"),A=r.createBuffer(),V={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:b,canvasGL:s,canvasOverlay:c,width:o,height:o,program:g,uniforms:V,posBuffer:y,posAttr:_,triProgram:n,triPosAttr:O,triColorAttr:E,triAlphaLoc:X,triBuffer:A}}var bt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Et(e,o,a,l,s,c){if(!c.showFront&&!c.showBack)return;let r=f=>oe(f,o,a,l,s),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Ae({x:.5,y:.5,z:.5},l,s);return Ae({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,s).z-g.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let f of bt)if(!(x(f.normalA)||x(f.normalB))){let[y,_]=f.edge;e.beginPath(),e.moveTo(d[y].x,d[y].y),e.lineTo(d[_].x,d[_].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let f of bt)if(x(f.normalA)||x(f.normalB)){let[y,_]=f.edge;e.beginPath(),e.moveTo(d[y].x,d[y].y),e.lineTo(d[_].x,d[_].y),e.stroke()}}e.restore()}function dt(e,o,a,l,s,c,r,b,d,x,f,g,y,_,Z){let{gl:u,overlayCtx:n,width:O,height:E,program:X,uniforms:A}=e,V=window.devicePixelRatio||1;u.viewport(0,0,O*V,E*V),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(X),u.uniform2f(A.u_resolution,O*V,E*V),u.uniform3f(A.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(A.u_radius,a.radius!==void 0?a.radius:.001);let z=o.mat;u.uniformMatrix3fv(A.u_mat,!1,new Float32Array([z[0],z[3],z[6],z[1],z[4],z[7],z[2],z[5],z[8]])),u.uniformMatrix3fv(A.u_mat_inv,!1,new Float32Array([z[0],z[1],z[2],z[3],z[4],z[5],z[6],z[7],z[8]])),u.uniform1f(A.u_zoom,o.zoom||1),u.uniform1i(A.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(A.u_invert,s?1:0),u.uniform1i(A.u_show_front,r.showFront?1:0),u.uniform1i(A.u_show_back,r.showBack?1:0),u.uniform1f(A.u_front_width,r.frontWidth||1.5),u.uniform1f(A.u_back_width,r.backWidth||1),u.uniform1i(A.u_front_dashed,r.frontDashed?1:0),u.uniform1i(A.u_back_dashed,r.backDashed?1:0),u.uniform4f(A.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(A.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let U=O*.36,F={x:O*.5,y:E*.5},W=null,N=null,se=g||y>.001;if(c.svTriangle&&se){let m=pe(x||b,l,U,F,o,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?W=m:N=m}let re=y<.5?2*y*y:1-Math.pow(-2*y+2,2)/2;if(W&&re<.01&&(W=null),W){let m=D=>[D.x/O*2-1,1-D.y/E*2],R=W,v=D=>({x:R.c.x+(D.x-R.c.x)*re,y:R.c.y+(D.y-R.c.y)*re}),k=m(R.c),B=m(v(R.w)),S=m(v(R.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([k[0],k[1],R.cRGB.x,R.cRGB.y,R.cRGB.z,B[0],B[1],1,1,1,S[0],S[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(X),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,O,E),Et(n,U,F,o,a,r),st(n,U,F,o,a,c),N){let m=N;n.save(),n.globalAlpha=y,n.beginPath(),n.moveTo(m.k.x,m.k.y),n.lineTo(m.w.x,m.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if(W){let m=W,R=C=>({x:m.c.x+(C.x-m.c.x)*re,y:m.c.y+(C.y-m.c.y)*re}),v=R(m.w),k=R(m.k),B=Math.round(m.cRGB.x*255),S=Math.round(m.cRGB.y*255),D=Math.round(m.cRGB.z*255);if(n.save(),n.globalAlpha=y,n.beginPath(),n.moveTo(m.c.x,m.c.y),n.lineTo(v.x,v.y),n.lineTo(k.x,k.y),n.closePath(),n.strokeStyle=`rgba(${B}, ${S}, ${D}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(v.x,v.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(k.x,k.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),f){let C=f.a*m.c.x+f.b*v.x+f.g*k.x,q=f.a*m.c.y+f.b*v.y+f.g*k.y;n.beginPath(),n.arc(C,q,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}if(d&&!f){let m=oe(b,U,F,o,a),R=te(b,l),v=s?{r:255-R.r,g:255-R.g,b:255-R.b}:R;if(Z<1){n.save(),n.beginPath(),n.arc(m.x,m.y,6,0,Math.PI*2),n.clip();let k=4;for(let B=-8;B<8;B+=k)for(let S=-8;S<8;S+=k)n.fillStyle=(S+B)/k%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(m.x+S,m.y+B,k,k);n.restore()}n.beginPath(),n.arc(m.x,m.y,6,0,Math.PI*2),n.fillStyle=Z<1?`rgba(${v.r}, ${v.g}, ${v.b}, ${Z})`:`rgb(${v.r}, ${v.g}, ${v.b})`,n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke()}if(_&&_.reveal>.01){let m=_.anchor,R=_.reveal<.5?2*_.reveal*_.reveal:1-Math.pow(-2*_.reveal+2,2)/2,v=Ve*R,k=Ie*R,B=Fe*R,S=Oe*R,D=te(b,l),C=s?{r:255-D.r,g:255-D.g,b:255-D.b}:D,q=-Math.PI/2;n.save(),n.globalAlpha=Math.min(1,R+.15);let L=(w,Y)=>{n.save(),n.beginPath(),n.arc(m.x,m.y,w+Y/2,0,Math.PI*2),n.arc(m.x,m.y,Math.max(.5,w-Y/2),0,Math.PI*2,!0),n.closePath(),n.clip();let P=6,I=w+Y/2;for(let Q=-I;Q<I;Q+=P)for(let J=-I;J<I;J+=P)n.fillStyle=(J+Q)/P%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(m.x+J,m.y+Q,P,P);n.restore()},$=(w,Y,P)=>{n.lineWidth=P?1.8:1,n.strokeStyle=P?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let I of[w-Y/2,w+Y/2])I<=0||(n.beginPath(),n.arc(m.x,m.y,I,0,Math.PI*2),n.stroke())},j=(w,Y,P,I)=>{let Q=m.x,J=m.y-(Y+P/2)-2;n.font="700 12px ui-monospace, SF Mono, monospace",n.textAlign="center",n.textBaseline="alphabetic",n.lineWidth=3,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.strokeText(w,Q,J),n.fillStyle=I?"#ffffff":"rgba(248, 250, 252, 0.95)",n.fillText(w,Q,J)},ke=_.colorAnchor||b,he=te(ke,l),de=72,ae=Math.PI*2/de;for(let w=0;w<de;w++){let Y=q+w*ae,P=Re(he,w*ae);n.beginPath(),n.arc(m.x,m.y,k,Y,Y+ae+.012),n.lineWidth=S,n.lineCap="butt",n.strokeStyle=`rgb(${P.r}, ${P.g}, ${P.b})`,n.stroke()}let ce=m.x+k*Math.sin(_.angle),ue=m.y-k*Math.cos(_.angle);n.beginPath(),n.arc(ce,ue,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(15, 23, 42, 0.75)",n.lineWidth=1.4,n.stroke(),$(k,S,_.band==="sat"),j("SAT",k,S,_.band==="sat"),L(v,B);let me=q+Z*Math.PI*2;Z>.001&&(n.beginPath(),n.arc(m.x,m.y,v,q,me),n.lineWidth=B,n.strokeStyle=`rgba(${C.r}, ${C.g}, ${C.b}, ${Z})`,n.stroke()),$(v,B,_.band==="alpha"),j("A",v,B,_.band==="alpha"),n.restore()}n.restore()}var G=Math.PI/180,Ce=2*Math.PI,Xe=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},Ue=e=>{let o=e%Ce;return o>Math.PI?o-=Ce:o<-Math.PI&&(o+=Ce),o},wt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,gt=(e,o)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function St(e,o={}){let a=o.size||460,l=o.mode||"rgb",s=!1,c={...it},r={...lt,radius:.08},b={...nt},d={...ot},x={x:8*G,y:-20*G,z:-55*G},f=be(x.x,x.y,x.z),g=fe(),y={...x},_=()=>{c.mat=ne(g,f)},Z=o.initialColor||{r:255,g:255,b:255},u=le(Z,l),n=1,O=!1,E=null,X=null,A=!1,V=0,z=0,U=null,F=t=>{if(z=t,U!==null)return;let i=performance.now(),h=6,M=T=>{let p=Math.min(.05,(T-i)/1e3);i=T,z>V?V=Math.min(z,V+p*h):V=Math.max(z,V-p*h),L(),Math.abs(V-z)<.001?(V=z,U=null):U=requestAnimationFrame(M)};U=requestAnimationFrame(M)},W=!1,N=null,se=null,re=0,m=null,R=0,v=0,k=0,B=null,S=t=>{if(k=t,B!==null)return;let i=performance.now(),h=6,M=T=>{let p=Math.min(.05,(T-i)/1e3);i=T,k>v?v=Math.min(k,v+p*h):v=Math.max(k,v-p*h),L(),Math.abs(v-k)<.001?(v=k,B=null):B=requestAnimationFrame(M)};B=requestAnimationFrame(M)},D=new Set,C=ht(e,a),q=null,L=()=>{q===null&&(q=requestAnimationFrame(()=>{q=null,dt(C,c,r,l,s,b,d,u,!0,E,X,A,V,N?{anchor:N,reveal:v,band:se,colorAnchor:m,angle:R}:null,n)}))},$=()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,h=ve(i),M=Me(i),T=n<1?gt(i,n):Ge(i),p={rgb:i,hsb:h,oklch:M,hex:T,alpha:n};D.forEach(K=>K(p))},j=(t,i)=>{i!==0&&(t==="x"?(f=ne(f,xe(i)),y.x+=i):t==="y"?(f=ne(f,ye(i)),y.y+=i):(f=ne(f,we(i)),y.z+=i),_(),L())},ke=(t,i)=>{g=ne(ye(t*.01),g),g=ne(xe(-i*.01),g),_(),L()},he=t=>{g=ne(t,Se(f)),_(),L()},de=()=>{f=be(x.x,x.y,x.z),g=fe(),y={...x},c.zoom=1,_(),L()},ae=!1,ce=!1,ue=0,me=0,w=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),Y=()=>{let t=w();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},P=t=>{let i=w(),h=Y(),M=Math.abs(t.x)-(i.x-h),T=Math.abs(t.y)-(i.y-h),p=Math.abs(t.z)-(i.z-h),K=Math.max(M,0),ee=Math.max(T,0),H=Math.max(p,0),ie=Math.hypot(K,ee,H),ge=Math.min(Math.max(M,Math.max(T,p)),0);return ie+ge-h},I=(t,i)=>{let h=C.canvasGL.getBoundingClientRect(),M=(t-h.left)*(C.width/h.width),T=(i-h.top)*(C.height/h.height),p=M-C.width*.5,K=C.height*.5-T,ee=C.width*.36*1.6*(c.zoom||1),H={x:p/ee,y:K/ee},ie=_e=>De(Se(c.mat),_e),ge=0,Je=null;for(let _e=0;_e<96;_e++){let _t={x:H.x,y:H.y,z:-5+ge},et=ie(_t),tt=P(et);if(tt<.001){Je=et;break}if(ge+=tt,ge>10)break}return Je},Q=(t,i)=>{let h=I(t,i);if(!h)return;let M=Math.max(0,Math.min(1,h.x/r.sizeX+.5)),T=Math.max(0,Math.min(1,h.y/r.sizeY+.5)),p=Math.max(0,Math.min(1,h.z/r.sizeZ+.5));u={x:M,y:T,z:p},$(),L()},J=(t,i)=>{let h=C.canvasGL.getBoundingClientRect();return{x:(t-h.left)*(C.width/h.width),y:(i-h.top)*(C.height/h.height)}},Ye=()=>oe(u,C.width*.36,{x:C.width*.5,y:C.height*.5},c,r),xt=(t,i)=>{let h=J(t,i),M=Ye();return Math.hypot(h.x-M.x,h.y-M.y)<=14},yt=t=>{n=Math.max(0,Math.min(1,t)),$(),L()},He=t=>{let i=t.x-N.x,h=t.y-N.y,M=Math.atan2(i,-h);return M<0?M+Ce:M},pt=t=>He(t)/Ce,Ct=t=>{R=t;let i=te(m||u,l);u=le(Re(i,t),l),$(),L()},We=(t,i)=>{if(!b.svTriangle)return null;let h=C.canvasGL.getBoundingClientRect(),M=(t-h.left)*(C.width/h.width),T=(i-h.top)*(C.height/h.height),p=pe(E||u,l,C.width*.36,{x:C.width*.5,y:C.height*.5},c,r),K=(p.w.y-p.k.y)*(p.c.x-p.k.x)+(p.k.x-p.w.x)*(p.c.y-p.k.y);if(Math.abs(K)<1e-6)return null;let ee=((p.w.y-p.k.y)*(M-p.k.x)+(p.k.x-p.w.x)*(T-p.k.y))/K,H=((p.k.y-p.c.y)*(M-p.k.x)+(p.c.x-p.k.x)*(T-p.k.y))/K,ie=1-ee-H;return ee<-.02||H<-.02||ie<-.02?null:{a:ee,b:H,g:ie}},Ne=t=>{let h=pe(E||u,l,C.width*.36,{x:C.width*.5,y:C.height*.5},c,r),M=Math.max(0,Math.min(1,t.a*h.cRGB.x+t.b)),T=Math.max(0,Math.min(1,t.a*h.cRGB.y+t.b)),p=Math.max(0,Math.min(1,t.a*h.cRGB.z+t.b));u=le({r:M*255,g:T*255,b:p*255},l),$(),L()},$e=0,Ze=0,qe=(t,i)=>{$e=t,Ze=i,C.canvasGL.style.cursor=I(t,i)?"default":"grab"};C.canvasGL.addEventListener("mousemove",t=>{qe(t.clientX,t.clientY)}),C.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)ae=!0,ue=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=A?We(t.clientX,t.clientY):null;i?(O=!0,E={...u},X=i,Ne(i)):!A&&xt(t.clientX,t.clientY)?(W=!0,N=Ye(),se=null,m={...u},R=0,E=null,X=null,t.preventDefault(),S(1)):I(t.clientX,t.clientY)?(ce=!0,E=null,X=null,Q(t.clientX,t.clientY)):(ae=!0,ue=t.clientX,me=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),C.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(W&&N){let i=J(t.clientX,t.clientY),h=Math.hypot(i.x-N.x,i.y-N.y),M=wt(v),T=Ve*M,p=Ie*M,K=Math.abs(h-p)<=Oe*M/2+2,ee=Math.abs(h-T)<=Fe*M/2+2,H=K?"sat":ee?"alpha":null,ie=performance.now();H!==se&&(se=H,re=ie),H&&ie-re>100?H==="alpha"?yt(pt(i)):Ct(He(i)):L()}else if(O){let i=We(t.clientX,t.clientY);i&&(X=i,Ne(i))}else if(ae){let i=t.clientX-ue,h=t.clientY-me;ue=t.clientX,me=t.clientY,ke(i,h)}else ce&&Q(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{W&&(W=!1,se=null,re=0,m=null,R=0,S(0)),O&&(O=!1),ae&&(ae=!1,document.body.style.cursor="default"),ce&&(ce=!1),qe($e,Ze)}),C.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),L()},{passive:!1}),C.canvasGL.addEventListener("dblclick",t=>{I(t.clientX,t.clientY)?(s=!s,$()):de(),L()});let je=t=>{if(t.key==="Shift"){A||(A=!0,E=null,X=null,F(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":de();break;case"f":case"F":he(fe());break;case"b":case"B":he(ye(Math.PI));break;case"t":case"T":he(xe(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),j("y",-5*G);break;case"ArrowRight":t.preventDefault(),j("y",5*G);break;case"ArrowUp":t.preventDefault(),j("x",5*G);break;case"ArrowDown":t.preventDefault(),j("x",-5*G);break}};window.addEventListener("keydown",je);let Ke=t=>{t.key==="Shift"&&A&&(A=!1,F(0))};window.addEventListener("keyup",Ke);let Qe=()=>{A&&(A=!1,F(0))};return window.addEventListener("blur",Qe),L(),$(),{getColor:()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:ve(i),oklch:Me(i),hex:n<1?gt(i,n):Ge(i),alpha:n}},setColor:t=>{Z=t,u=le(t,l),t.a!==void 0&&(n=Math.max(0,Math.min(1,t.a))),E=null,X=null,$(),L()},setMode:t=>{l=t,E=null,X=null,$(),L()},getMode:()=>l,setRotation:(t,i)=>{f=be(i*G,0,t*G),g=fe(),y.x=i*G,y.y=0,y.z=t*G,_(),L()},getAxisRotation:()=>({rotXDeg:Math.round(Xe(y.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Xe(y.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Xe(y.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,h)=>{j("x",Ue(t*G-y.x)),j("y",Ue(i*G-y.y)),j("z",Ue(h*G-y.z))},rotateLocal:(t,i)=>{j(t,i*G)},resetRotation:(t,i,h)=>{f=be(t*G,i*G,h*G),g=fe(),y.x=t*G,y.y=i*G,y.z=h*G,_(),L()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),L()},getZoom:()=>c.zoom||1,setDimensions:(t,i,h)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,h)),L()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),L()},getRadius:()=>r.radius,setAlpha:t=>{n=Math.max(0,Math.min(1,t)),$(),L()},getAlpha:()=>n,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},L()},getGuides:()=>({...b}),setGuides:t=>{b={...b,...t},L()},toggleAllGuides:t=>{let i=t!==void 0?t:!b.vertexX;b={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:b.svTriangle},L()},on:(t,i)=>{D.add(i)},off:(t,i)=>{D.delete(i)},destroy:()=>{q!==null&&cancelAnimationFrame(q),U!==null&&cancelAnimationFrame(U),B!==null&&cancelAnimationFrame(B),window.removeEventListener("keydown",je),window.removeEventListener("keyup",Ke),window.removeEventListener("blur",Qe),e.innerHTML=""}}}return zt(Dt);})();
