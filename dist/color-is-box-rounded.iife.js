var ColorIsBoxRounded=(()=>{var Se=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var _t=Object.getOwnPropertyNames;var Mt=Object.prototype.hasOwnProperty;var At=(e,o)=>{for(var a in o)Se(e,a,{get:o[a],enumerable:!0})},Rt=(e,o,a,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of _t(o))!Mt.call(e,s)&&s!==a&&Se(e,s,{get:()=>o[s],enumerable:!(l=vt(o,s))||l.enumerable});return e};var kt=e=>Rt(Se({},"__esModule",{value:!0}),e);var wt={};At(wt,{createRoundedBoxPicker:()=>Gt});var ot={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},nt={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Re(e){let o=e.r/255,a=e.g/255,l=e.b/255,s=Math.max(o,a,l),c=Math.min(o,a,l),r=s-c,h=0;r!==0&&(s===o?h=((a-l)/r+6)%6:s===a?h=(l-o)/r+2:h=(o-a)/r+4,h*=60);let d=s===0?0:r/s*100,x=s*100;return{h,s:d,b:x}}function zt(e){let o=e.h,a=e.s/100,l=e.b/100,s=l*a,c=s*(1-Math.abs(o/60%2-1)),r=l-s,h,d,x;return o<60?(h=s,d=c,x=0):o<120?(h=c,d=s,x=0):o<180?(h=0,d=s,x=c):o<240?(h=0,d=c,x=s):o<300?(h=c,d=0,x=s):(h=s,d=0,x=c),{r:Math.round((h+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function Te(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ee(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function Lt(e){let o=Te(e.r/255),a=Te(e.g/255),l=Te(e.b/255),s=.4122214708*o+.5363325363*a+.0514459929*l,c=.2119034982*o+.6806995451*a+.1073969566*l,r=.0883024619*o+.2817188376*a+.6299787005*l,h=Math.cbrt(s),d=Math.cbrt(c),x=Math.cbrt(r);return{L:.2104542553*h+.793617785*d-.0040720468*x,a:1.9779984951*h-2.428592205*d+.4505937099*x,b:.0259040371*h+.7827717662*d-.808675766*x}}function Bt(e,o,a){let l=e+.3963377774*o+.2158037573*a,s=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=l*l*l,h=s*s*s,d=c*c*c,x=4.0767416621*r-3.3077115913*h+.2309699292*d,f=-1.2684380046*r+2.6097574011*h-.3413193965*d,g=-.0041960863*r-.7034186147*h+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Ee(x)))*255),g:Math.round(Math.max(0,Math.min(1,Ee(f)))*255),b:Math.round(Math.max(0,Math.min(1,Ee(g)))*255)}}function ke(e){let o=Lt(e),a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.atan2(o.b,o.a)*(180/Math.PI);return l<0&&(l+=360),{l:o.L,c:a,h:a<1e-4?0:l}}function Ge(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),l=e.c*Math.sin(o);return Bt(e.l,a,l)}function St(e,o,a){let l=Ge({l:e,c:o,h:a});if(rt(l))return{l:e,c:o,h:a};let s=0,c=o;for(let r=0;r<20;r++){let h=(s+c)/2;l=Ge({l:e,c:h,h:a}),rt(l)?s=h:c=h}return{l:e,c:s,h:a}}function rt(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function we(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var at=.4;function te(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return zt({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*at,s=e.z*359,c=St(a,l,s);return Ge(c)}}function ce(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=Re(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ke(e);return{x:a.l,y:Math.min(a.c/at,1),z:a.h/359}}}function ze(e,o){let a=o*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,s=e.g/255,c=e.b/255,r,h,d;if(a<=90){let f=a/90;r=l*(1-f),h=s*(1-f),d=c*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,h=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),h=f*s+(1-f),d=f*c+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(h),b:x(d)}}var De=Math.PI/180;function de(){return[1,0,0,0,1,0,0,0,1]}function xe(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function ye(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function Pe(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function ne(e,o){let a=new Array(9);for(let l=0;l<3;l++)for(let s=0;s<3;s++)a[l*3+s]=e[l*3]*o[s]+e[l*3+1]*o[3+s]+e[l*3+2]*o[6+s];return a}function Ve(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Fe(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function ge(e,o,a){return ne(ye(o),ne(Pe(a),xe(e)))}var it={mat:ge(8*De,-20*De,-55*De),zoom:1},lt={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Le(e,o,a){let l=(e.x-.5)*a.sizeX,s=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return Fe(o.mat,{x:l,y:s,z:c})}function oe(e,o,a,l,s){let c=Le(e,l,s);return{x:a.x+c.x*o*1.6*l.zoom,y:a.y-c.y*o*1.6*l.zoom}}function pe(e,o,a,l,s,c){let r=te(e,o),h={x:r.r/255,y:r.g/255,z:r.b/255},d=ce({r:255,g:255,b:255},o),x=ce({r:0,g:0,b:0},o);return{c:oe(e,a,l,s,c),w:oe(d,a,l,s,c),k:oe(x,a,l,s,c),cRGB:h}}var Ie=["#ef4444","#22c55e","#3b82f6"];function st(e,o,a,l,s,c){let r=g=>oe(g,o,a,l,s);e.save();let h=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:Ie[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:Ie[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:Ie[2],name:"Cz",visible:c.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let p=r(x[g].from),C=r(x[g].to);e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(C.x,C.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(p.x,p.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var ct=`
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
`;var Ce=20,ve=18;function ht(e,o){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.userSelect="none";let s=document.createElement("canvas");s.width=o*a,s.height=o*a,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",l.appendChild(s),l.appendChild(c),e.appendChild(l);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=c.getContext("2d");h.scale(a,a);let d=(k,W)=>{let X=r.createShader(k);return r.shaderSource(X,W),r.compileShader(X),r.getShaderParameter(X,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(X)),X},x=d(r.VERTEX_SHADER,ct),f=d(r.FRAGMENT_SHADER,ft),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(g,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let Y=d(r.VERTEX_SHADER,ut),u=d(r.FRAGMENT_SHADER,mt),n=r.createProgram();r.attachShader(n,Y),r.attachShader(n,u),r.linkProgram(n);let U=r.getAttribLocation(n,"a_pos"),P=r.getAttribLocation(n,"a_color"),H=r.getUniformLocation(n,"u_alpha"),A=r.createBuffer(),O={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:s,canvasOverlay:c,width:o,height:o,program:g,uniforms:O,posBuffer:p,posAttr:C,triProgram:n,triPosAttr:U,triColorAttr:P,triAlphaLoc:H,triBuffer:A}}var bt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Tt(e,o,a,l,s,c){if(!c.showFront&&!c.showBack)return;let r=f=>oe(f,o,a,l,s),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Le({x:.5,y:.5,z:.5},l,s);return Le({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,s).z-g.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let f of bt)if(!(x(f.normalA)||x(f.normalB))){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let f of bt)if(x(f.normalA)||x(f.normalB)){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}e.restore()}function dt(e,o,a,l,s,c,r,h,d,x,f,g,p,C,Y){let{gl:u,overlayCtx:n,width:U,height:P,program:H,uniforms:A}=e,O=window.devicePixelRatio||1;u.viewport(0,0,U*O,P*O),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(H),u.uniform2f(A.u_resolution,U*O,P*O),u.uniform3f(A.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(A.u_radius,a.radius!==void 0?a.radius:.001);let k=o.mat;u.uniformMatrix3fv(A.u_mat,!1,new Float32Array([k[0],k[3],k[6],k[1],k[4],k[7],k[2],k[5],k[8]])),u.uniformMatrix3fv(A.u_mat_inv,!1,new Float32Array([k[0],k[1],k[2],k[3],k[4],k[5],k[6],k[7],k[8]])),u.uniform1f(A.u_zoom,o.zoom||1),u.uniform1i(A.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(A.u_invert,s?1:0),u.uniform1i(A.u_show_front,r.showFront?1:0),u.uniform1i(A.u_show_back,r.showBack?1:0),u.uniform1f(A.u_front_width,r.frontWidth||1.5),u.uniform1f(A.u_back_width,r.backWidth||1),u.uniform1i(A.u_front_dashed,r.frontDashed?1:0),u.uniform1i(A.u_back_dashed,r.backDashed?1:0),u.uniform4f(A.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(A.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let W=U*.36,X={x:U*.5,y:P*.5},$=null,N=null,ue=g||p>.001;if(c.svTriangle&&ue){let m=pe(x||h,l,W,X,o,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?$=m:N=m}let re=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if($&&re<.01&&($=null),$){let m=G=>[G.x/U*2-1,1-G.y/P*2],v=$,S=G=>({x:v.c.x+(G.x-v.c.x)*re,y:v.c.y+(G.y-v.c.y)*re}),z=m(v.c),B=m(S(v.w)),T=m(S(v.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([z[0],z[1],v.cRGB.x,v.cRGB.y,v.cRGB.z,B[0],B[1],1,1,1,T[0],T[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(H),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,U,P),Tt(n,W,X,o,a,r),st(n,W,X,o,a,c),N){let m=N;n.save(),n.globalAlpha=p,n.beginPath(),n.moveTo(m.k.x,m.k.y),n.lineTo(m.w.x,m.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if($){let m=$,v=V=>({x:m.c.x+(V.x-m.c.x)*re,y:m.c.y+(V.y-m.c.y)*re}),S=v(m.w),z=v(m.k),B=Math.round(m.cRGB.x*255),T=Math.round(m.cRGB.y*255),G=Math.round(m.cRGB.z*255);if(n.save(),n.globalAlpha=p,n.beginPath(),n.moveTo(m.c.x,m.c.y),n.lineTo(S.x,S.y),n.lineTo(z.x,z.y),n.closePath(),n.strokeStyle=`rgba(${B}, ${T}, ${G}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(S.x,S.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(z.x,z.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),f){let V=f.a*m.c.x+f.b*S.x+f.g*z.x,ae=f.a*m.c.y+f.b*S.y+f.g*z.y;n.beginPath(),n.arc(V,ae,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}if(d&&!f&&!C){let m=oe(h,W,X,o,a),v=te(h,l),S=s?{r:255-v.r,g:255-v.g,b:255-v.b}:v;if(Y<1){n.save(),n.beginPath(),n.arc(m.x,m.y,6,0,Math.PI*2),n.clip();let z=4;for(let B=-8;B<8;B+=z)for(let T=-8;T<8;T+=z)n.fillStyle=(T+B)/z%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(m.x+T,m.y+B,z,z);n.restore()}n.beginPath(),n.arc(m.x,m.y,6,0,Math.PI*2),n.fillStyle=Y<1?`rgba(${S.r}, ${S.g}, ${S.b}, ${Y})`:`rgb(${S.r}, ${S.g}, ${S.b})`,n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke()}if(C&&C.reveal>.01){let m=C.anchor,v=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,S=Ce*v,z=(Ce+ve/2)*v,B=(Ce+ve*1.5)*v,T=ve*v,G=te(h,l),V=s?{r:255-G.r,g:255-G.g,b:255-G.b}:G,ae=-Math.PI/2;n.save(),n.globalAlpha=Math.min(1,v+.15);let _=(w,I)=>{n.save(),n.beginPath(),n.arc(m.x,m.y,w+I/2,0,Math.PI*2),n.arc(m.x,m.y,Math.max(.5,w-I/2),0,Math.PI*2,!0),n.closePath(),n.clip();let F=6,Z=w+I/2;for(let ie=-Z;ie<Z;ie+=F)for(let le=-Z;le<Z;le+=F)n.fillStyle=(le+ie)/F%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(m.x+le,m.y+ie,F,F);n.restore()},se=(w,I,F)=>{n.lineWidth=F?1.8:1,n.strokeStyle=F?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let Z of[w-I/2,w+I/2])Z<=0||(n.beginPath(),n.arc(m.x,m.y,Z,0,Math.PI*2),n.stroke())},R=(w,I,F)=>{let Z=m.x,ie=m.y-(I+T/2)-2;n.font="700 12px ui-monospace, SF Mono, monospace",n.textAlign="center",n.textBaseline="alphabetic",n.lineWidth=3,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.strokeText(w,Z,ie),n.fillStyle=F?"#ffffff":"rgba(248, 250, 252, 0.95)",n.fillText(w,Z,ie)},q=C.colorAnchor||h,K=te(q,l),_e=72,me=Math.PI*2/_e;for(let w=0;w<_e;w++){let I=ae+w*me,F=ze(K,w*me);n.beginPath(),n.arc(m.x,m.y,z,I,I+me+.012),n.lineWidth=T,n.lineCap="butt",n.strokeStyle=`rgb(${F.r}, ${F.g}, ${F.b})`,n.stroke()}let Me=m.x+z*Math.sin(C.angle),fe=m.y-z*Math.cos(C.angle);n.beginPath(),n.arc(Me,fe,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(15, 23, 42, 0.75)",n.lineWidth=1.4,n.stroke(),se(z,T,C.band==="sat"),_(B,T);let he=ae+Y*Math.PI*2;Y>.001&&(n.beginPath(),n.arc(m.x,m.y,B,ae,he),n.lineWidth=T,n.strokeStyle=`rgba(${V.r}, ${V.g}, ${V.b}, ${Y})`,n.stroke()),se(B,T,C.band==="alpha"),R("SAT",B,C.band==="sat"),n.beginPath(),n.arc(m.x,m.y,S,0,Math.PI*2),n.fillStyle=Y<1?`rgba(${V.r}, ${V.g}, ${V.b}, ${Y})`:`rgb(${V.r}, ${V.g}, ${V.b})`,n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.95)",n.lineWidth=2,n.stroke(),n.restore()}n.restore()}var E=Math.PI/180,be=2*Math.PI,Oe=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},Xe=e=>{let o=e%be;return o>Math.PI?o-=be:o<-Math.PI&&(o+=be),o},Et=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,gt=(e,o)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function Gt(e,o={}){let a=o.size||460,l=o.mode||"rgb",s=!1,c={...it},r={...lt,radius:.08},h={...nt},d={...ot},x={x:8*E,y:-20*E,z:-55*E},f=ge(x.x,x.y,x.z),g=de(),p={...x},C=()=>{c.mat=ne(g,f)},Y=o.initialColor||{r:255,g:255,b:255},u=ce(Y,l),n=1,U=!1,P=null,H=null,A=!1,O=0,k=0,W=null,X=t=>{if(k=t,W!==null)return;let i=performance.now(),b=6,M=L=>{let y=Math.min(.05,(L-i)/1e3);i=L,k>O?O=Math.min(k,O+y*b):O=Math.max(k,O-y*b),R(),Math.abs(O-k)<.001?(O=k,W=null):W=requestAnimationFrame(M)};W=requestAnimationFrame(M)},$=!1,N=null,ue=null,re=0,m=!1,v=null,S=null,z=0,B=0,T=0,G=null,V=t=>{if(T=t,G!==null)return;let i=performance.now(),b=6,M=L=>{let y=Math.min(.05,(L-i)/1e3);i=L,T>B?B=Math.min(T,B+y*b):B=Math.max(T,B-y*b),R(),Math.abs(B-T)<.001?(B=T,G=null):G=requestAnimationFrame(M)};G=requestAnimationFrame(M)},ae=new Set,_=ht(e,a),se=null,R=()=>{se===null&&(se=requestAnimationFrame(()=>{se=null,dt(_,c,r,l,s,h,d,u,!0,P,H,A,O,N?{anchor:N,reveal:B,band:ue,colorAnchor:S,angle:z}:null,n)}))},q=()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,b=Re(i),M=ke(i),L=n<1?gt(i,n):we(i),y={rgb:i,hsb:b,oklch:M,hex:L,alpha:n};ae.forEach(j=>j(y))},K=(t,i)=>{i!==0&&(t==="x"?(f=ne(f,xe(i)),p.x+=i):t==="y"?(f=ne(f,ye(i)),p.y+=i):(f=ne(f,Pe(i)),p.z+=i),C(),R())},_e=(t,i)=>{g=ne(ye(t*.01),g),g=ne(xe(-i*.01),g),C(),R()},me=t=>{g=ne(t,Ve(f)),C(),R()},Me=()=>{f=ge(x.x,x.y,x.z),g=de(),p={...x},c.zoom=1,C(),R()},fe=!1,he=!1,w=0,I=0,F=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),Z=()=>{let t=F();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},ie=t=>{let i=F(),b=Z(),M=Math.abs(t.x)-(i.x-b),L=Math.abs(t.y)-(i.y-b),y=Math.abs(t.z)-(i.z-b),j=Math.max(M,0),Q=Math.max(L,0),D=Math.max(y,0),J=Math.hypot(j,Q,D),ee=Math.min(Math.max(M,Math.max(L,y)),0);return J+ee-b},le=(t,i)=>{let b=_.canvasGL.getBoundingClientRect(),M=(t-b.left)*(_.width/b.width),L=(i-b.top)*(_.height/b.height),y=M-_.width*.5,j=_.height*.5-L,Q=_.width*.36*1.6*(c.zoom||1),D={x:y/Q,y:j/Q},J=Ae=>Fe(Ve(c.mat),Ae),ee=0,Je=null;for(let Ae=0;Ae<96;Ae++){let Ct={x:D.x,y:D.y,z:-5+ee},et=J(Ct),tt=ie(et);if(tt<.001){Je=et;break}if(ee+=tt,ee>10)break}return Je},Ye=(t,i)=>{let b=le(t,i);if(!b)return;let M=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),L=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));u={x:M,y:L,z:y},q(),R()},Ue=(t,i)=>{let b=_.canvasGL.getBoundingClientRect();return{x:(t-b.left)*(_.width/b.width),y:(i-b.top)*(_.height/b.height)}},He=()=>oe(u,_.width*.36,{x:_.width*.5,y:_.height*.5},c,r),xt=(t,i)=>{let b=Ue(t,i),M=He();return Math.hypot(b.x-M.x,b.y-M.y)<=14},yt=t=>{n=Math.max(0,Math.min(1,t)),q(),R()},Be=t=>{let i=t.x-N.x,b=t.y-N.y,M=Math.atan2(i,-b);return M<0?M+be:M},Dt=t=>Be(t)/be,pt=t=>{z=t;let i=te(S||u,l);u=ce(ze(i,t),l),q(),R()},We=(t,i)=>{if(!h.svTriangle)return null;let b=_.canvasGL.getBoundingClientRect(),M=(t-b.left)*(_.width/b.width),L=(i-b.top)*(_.height/b.height),y=pe(P||u,l,_.width*.36,{x:_.width*.5,y:_.height*.5},c,r),j=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(j)<1e-6)return null;let Q=((y.w.y-y.k.y)*(M-y.k.x)+(y.k.x-y.w.x)*(L-y.k.y))/j,D=((y.k.y-y.c.y)*(M-y.k.x)+(y.c.x-y.k.x)*(L-y.k.y))/j,J=1-Q-D;return Q<-.02||D<-.02||J<-.02?null:{a:Q,b:D,g:J}},$e=t=>{let b=pe(P||u,l,_.width*.36,{x:_.width*.5,y:_.height*.5},c,r),M=Math.max(0,Math.min(1,t.a*b.cRGB.x+t.b)),L=Math.max(0,Math.min(1,t.a*b.cRGB.y+t.b)),y=Math.max(0,Math.min(1,t.a*b.cRGB.z+t.b));u=ce({r:M*255,g:L*255,b:y*255},l),q(),R()},Ne=0,Ze=0,qe=(t,i)=>{Ne=t,Ze=i,_.canvasGL.style.cursor=le(t,i)?"default":"grab"};_.canvasGL.addEventListener("mousemove",t=>{qe(t.clientX,t.clientY)}),_.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)fe=!0,w=t.clientX,I=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=A?We(t.clientX,t.clientY):null;i?(U=!0,P={...u},H=i,$e(i)):!A&&xt(t.clientX,t.clientY)?($=!0,N=He(),ue=null,S={...u},z=0,P=null,H=null,t.preventDefault(),V(1)):le(t.clientX,t.clientY)?(he=!0,P=null,H=null,Ye(t.clientX,t.clientY)):(fe=!0,w=t.clientX,I=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),_.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if($&&N){let i=Ue(t.clientX,t.clientY),b=Math.hypot(i.x-N.x,i.y-N.y),M=Et(B),L=Ce*M,y=ve*M,j=b>=L+y-2&&b<=L+2*y+2,Q=b>=L-2&&b<=L+y+2,D;if(b<L-3?D=null:v?D=v:D=Q?"sat":j?"alpha":null,D!==ue&&(ue=D,D===null&&(v=null),re=D?Be(i):0,m=!1),D){let J=Be(i);if(!m){let ee=Math.abs(J-re);ee>Math.PI&&(ee=be-ee),ee>10*E&&(m=!0,v=D)}m?D==="alpha"?yt(J/be):pt(J):R()}else R()}else if(U){let i=We(t.clientX,t.clientY);i&&(H=i,$e(i))}else if(fe){let i=t.clientX-w,b=t.clientY-I;w=t.clientX,I=t.clientY,_e(i,b)}else he&&Ye(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{$&&($=!1,ue=null,re=0,m=!1,v=null,S=null,z=0,V(0)),U&&(U=!1),fe&&(fe=!1,document.body.style.cursor="default"),he&&(he=!1),qe(Ne,Ze)}),_.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),R()},{passive:!1}),_.canvasGL.addEventListener("dblclick",t=>{le(t.clientX,t.clientY)?(s=!s,q()):Me(),R()});let je=t=>{if(t.key==="Shift"){A||(A=!0,P=null,H=null,X(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":Me();break;case"f":case"F":me(de());break;case"b":case"B":me(ye(Math.PI));break;case"t":case"T":me(xe(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),K("y",-5*E);break;case"ArrowRight":t.preventDefault(),K("y",5*E);break;case"ArrowUp":t.preventDefault(),K("x",5*E);break;case"ArrowDown":t.preventDefault(),K("x",-5*E);break}};window.addEventListener("keydown",je);let Ke=t=>{t.key==="Shift"&&A&&(A=!1,X(0))};window.addEventListener("keyup",Ke);let Qe=()=>{A&&(A=!1,X(0))};return window.addEventListener("blur",Qe),R(),q(),{getColor:()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:Re(i),oklch:ke(i),hex:n<1?gt(i,n):we(i),alpha:n}},setColor:t=>{Y=t,u=ce(t,l),t.a!==void 0&&(n=Math.max(0,Math.min(1,t.a))),P=null,H=null,q(),R()},setMode:t=>{l=t,P=null,H=null,q(),R()},getMode:()=>l,setRotation:(t,i)=>{f=ge(i*E,0,t*E),g=de(),p.x=i*E,p.y=0,p.z=t*E,C(),R()},getAxisRotation:()=>({rotXDeg:Math.round(Oe(p.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Oe(p.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Oe(p.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,b)=>{K("x",Xe(t*E-p.x)),K("y",Xe(i*E-p.y)),K("z",Xe(b*E-p.z))},rotateLocal:(t,i)=>{K(t,i*E)},resetRotation:(t,i,b)=>{f=ge(t*E,i*E,b*E),g=de(),p.x=t*E,p.y=i*E,p.z=b*E,C(),R()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),R()},getZoom:()=>c.zoom||1,setDimensions:(t,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),R()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),R()},getRadius:()=>r.radius,setAlpha:t=>{n=Math.max(0,Math.min(1,t)),q(),R()},getAlpha:()=>n,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},R()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},R()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},R()},on:(t,i)=>{ae.add(i)},off:(t,i)=>{ae.delete(i)},destroy:()=>{se!==null&&cancelAnimationFrame(se),W!==null&&cancelAnimationFrame(W),G!==null&&cancelAnimationFrame(G),window.removeEventListener("keydown",je),window.removeEventListener("keyup",Ke),window.removeEventListener("blur",Qe),e.innerHTML=""}}}return kt(wt);})();
