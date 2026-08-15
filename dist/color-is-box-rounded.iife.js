var ColorIsBoxRounded=(()=>{var Ge=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var zt=Object.prototype.hasOwnProperty;var Lt=(e,o)=>{for(var a in o)Ge(e,a,{get:o[a],enumerable:!0})},Bt=(e,o,a,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of kt(o))!zt.call(e,s)&&s!==a&&Ge(e,s,{get:()=>o[s],enumerable:!(l=Rt(o,s))||l.enumerable});return e};var Tt=e=>Bt(Ge({},"__esModule",{value:!0}),e);var Ft={};Lt(Ft,{createRoundedBoxPicker:()=>Vt});var rt={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},at={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function ke(e){let o=e.r/255,a=e.g/255,l=e.b/255,s=Math.max(o,a,l),c=Math.min(o,a,l),r=s-c,h=0;r!==0&&(s===o?h=((a-l)/r+6)%6:s===a?h=(l-o)/r+2:h=(o-a)/r+4,h*=60);let d=s===0?0:r/s*100,x=s*100;return{h,s:d,b:x}}function wt(e){let o=e.h,a=e.s/100,l=e.b/100,s=l*a,c=s*(1-Math.abs(o/60%2-1)),r=l-s,h,d,x;return o<60?(h=s,d=c,x=0):o<120?(h=c,d=s,x=0):o<180?(h=0,d=s,x=c):o<240?(h=0,d=c,x=s):o<300?(h=c,d=0,x=s):(h=s,d=0,x=c),{r:Math.round((h+r)*255),g:Math.round((d+r)*255),b:Math.round((x+r)*255)}}function Ee(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function De(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function St(e){let o=Ee(e.r/255),a=Ee(e.g/255),l=Ee(e.b/255),s=.4122214708*o+.5363325363*a+.0514459929*l,c=.2119034982*o+.6806995451*a+.1073969566*l,r=.0883024619*o+.2817188376*a+.6299787005*l,h=Math.cbrt(s),d=Math.cbrt(c),x=Math.cbrt(r);return{L:.2104542553*h+.793617785*d-.0040720468*x,a:1.9779984951*h-2.428592205*d+.4505937099*x,b:.0259040371*h+.7827717662*d-.808675766*x}}function Gt(e,o,a){let l=e+.3963377774*o+.2158037573*a,s=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=l*l*l,h=s*s*s,d=c*c*c,x=4.0767416621*r-3.3077115913*h+.2309699292*d,f=-1.2684380046*r+2.6097574011*h-.3413193965*d,g=-.0041960863*r-.7034186147*h+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,De(x)))*255),g:Math.round(Math.max(0,Math.min(1,De(f)))*255),b:Math.round(Math.max(0,Math.min(1,De(g)))*255)}}function ze(e){let o=St(e),a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.atan2(o.b,o.a)*(180/Math.PI);return l<0&&(l+=360),{l:o.L,c:a,h:a<1e-4?0:l}}function Pe(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),l=e.c*Math.sin(o);return Gt(e.l,a,l)}function Et(e,o,a){let l=Pe({l:e,c:o,h:a});if(it(l))return{l:e,c:o,h:a};let s=0,c=o;for(let r=0;r<20;r++){let h=(s+c)/2;l=Pe({l:e,c:h,h:a}),it(l)?s=h:c=h}return{l:e,c:s,h:a}}function it(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Ve(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var lt=.4;function ne(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return wt({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*lt,s=e.z*359,c=Et(a,l,s);return Pe(c)}}function se(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=ke(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=ze(e);return{x:a.l,y:Math.min(a.c/lt,1),z:a.h/359}}}function Le(e,o){let a=o*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,s=e.g/255,c=e.b/255,r,h,d;if(a<=90){let f=a/90;r=l*(1-f),h=s*(1-f),d=c*(1-f)}else if(a<=270){let f=(a-90)/180;r=f,h=f,d=f}else{let f=(a-270)/90;r=f*l+(1-f),h=f*s+(1-f),d=f*c+(1-f)}let x=f=>Math.round(Math.max(0,Math.min(1,f))*255);return{r:x(r),g:x(h),b:x(d)}}var Fe=Math.PI/180;function he(){return[1,0,0,0,1,0,0,0,1]}function pe(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function Ce(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function Ie(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function ae(e,o){let a=new Array(9);for(let l=0;l<3;l++)for(let s=0;s<3;s++)a[l*3+s]=e[l*3]*o[s]+e[l*3+1]*o[3+s]+e[l*3+2]*o[6+s];return a}function Oe(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Xe(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function de(e,o,a){return ae(Ce(o),ae(Ie(a),pe(e)))}var st={mat:de(8*Fe,-20*Fe,-55*Fe),zoom:1},ct={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Be(e,o,a){let l=(e.x-.5)*a.sizeX,s=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return Xe(o.mat,{x:l,y:s,z:c})}function re(e,o,a,l,s){let c=Be(e,l,s);return{x:a.x+c.x*o*1.6*l.zoom,y:a.y-c.y*o*1.6*l.zoom}}function _e(e,o,a,l,s,c){let r=ne(e,o),h={x:r.r/255,y:r.g/255,z:r.b/255},d=se({r:255,g:255,b:255},o),x=se({r:0,g:0,b:0},o);return{c:re(e,a,l,s,c),w:re(d,a,l,s,c),k:re(x,a,l,s,c),cRGB:h}}var Ye=["#ef4444","#22c55e","#3b82f6"];function ut(e,o,a,l,s,c){let r=g=>re(g,o,a,l,s);e.save();let h=r({x:.5,y:.5,z:.5}),d=.35,x=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:Ye[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:Ye[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:Ye[2],name:"Cz",visible:c.centerZ}],f=!1;for(let g=0;g<x.length;g++){if(!x[g].visible)continue;f=!0;let p=r(x[g].from),C=r(x[g].to);e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(C.x,C.y),e.strokeStyle=x[g].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(p.x,p.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=x[g].color,e.fill()}f&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var mt=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ft=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,bt=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,ht=`
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
`;var Me=20,ve=18;function gt(e,o){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.userSelect="none";let s=document.createElement("canvas");s.width=o*a,s.height=o*a,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",l.appendChild(s),l.appendChild(c),e.appendChild(l);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=c.getContext("2d");h.scale(a,a);let d=(z,$)=>{let X=r.createShader(z);return r.shaderSource(X,$),r.compileShader(X),r.getShaderParameter(X,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(X)),X},x=d(r.VERTEX_SHADER,mt),f=d(r.FRAGMENT_SHADER,ht),g=r.createProgram();r.attachShader(g,x),r.attachShader(g,f),r.linkProgram(g);let p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(g,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let U=d(r.VERTEX_SHADER,ft),u=d(r.FRAGMENT_SHADER,bt),n=r.createProgram();r.attachShader(n,U),r.attachShader(n,u),r.linkProgram(n);let H=r.getAttribLocation(n,"a_pos"),D=r.getAttribLocation(n,"a_color"),W=r.getUniformLocation(n,"u_alpha"),k=r.createBuffer(),I={u_resolution:r.getUniformLocation(g,"u_resolution"),u_box_size:r.getUniformLocation(g,"u_box_size"),u_radius:r.getUniformLocation(g,"u_radius"),u_mat:r.getUniformLocation(g,"u_mat"),u_mat_inv:r.getUniformLocation(g,"u_mat_inv"),u_zoom:r.getUniformLocation(g,"u_zoom"),u_mode:r.getUniformLocation(g,"u_mode"),u_invert:r.getUniformLocation(g,"u_invert"),u_show_front:r.getUniformLocation(g,"u_show_front"),u_show_back:r.getUniformLocation(g,"u_show_back"),u_front_width:r.getUniformLocation(g,"u_front_width"),u_back_width:r.getUniformLocation(g,"u_back_width"),u_front_dashed:r.getUniformLocation(g,"u_front_dashed"),u_back_dashed:r.getUniformLocation(g,"u_back_dashed"),u_front_color:r.getUniformLocation(g,"u_front_color"),u_back_color:r.getUniformLocation(g,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:s,canvasOverlay:c,width:o,height:o,program:g,uniforms:I,posBuffer:p,posAttr:C,triProgram:n,triPosAttr:H,triColorAttr:D,triAlphaLoc:W,triBuffer:k}}var dt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Dt(e,o,a,l,s,c){if(!c.showFront&&!c.showBack)return;let r=f=>re(f,o,a,l,s),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),x=f=>{let g=Be({x:.5,y:.5,z:.5},l,s);return Be({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},l,s).z-g.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let f of dt)if(!(x(f.normalA)||x(f.normalB))){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let f of dt)if(x(f.normalA)||x(f.normalB)){let[p,C]=f.edge;e.beginPath(),e.moveTo(d[p].x,d[p].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}e.restore()}function xt(e,o,a,l,s,c,r,h,d,x,f,g,p,C,U){let{gl:u,overlayCtx:n,width:H,height:D,program:W,uniforms:k}=e,I=window.devicePixelRatio||1;u.viewport(0,0,H*I,D*I),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(W),u.uniform2f(k.u_resolution,H*I,D*I),u.uniform3f(k.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(k.u_radius,a.radius!==void 0?a.radius:.001);let z=o.mat;u.uniformMatrix3fv(k.u_mat,!1,new Float32Array([z[0],z[3],z[6],z[1],z[4],z[7],z[2],z[5],z[8]])),u.uniformMatrix3fv(k.u_mat_inv,!1,new Float32Array([z[0],z[1],z[2],z[3],z[4],z[5],z[6],z[7],z[8]])),u.uniform1f(k.u_zoom,o.zoom||1),u.uniform1i(k.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(k.u_invert,s?1:0),u.uniform1i(k.u_show_front,r.showFront?1:0),u.uniform1i(k.u_show_back,r.showBack?1:0),u.uniform1f(k.u_front_width,r.frontWidth||1.5),u.uniform1f(k.u_back_width,r.backWidth||1),u.uniform1i(k.u_front_dashed,r.frontDashed?1:0),u.uniform1i(k.u_back_dashed,r.backDashed?1:0),u.uniform4f(k.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(k.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let $=H*.36,X={x:H*.5,y:D*.5},ie=null,ge=null,ce=g||p>.001;if(c.svTriangle&&ce){let m=_e(x||h,l,$,X,o,a);Math.abs((m.w.x-m.c.x)*(m.k.y-m.c.y)-(m.w.y-m.c.y)*(m.k.x-m.c.x))>4?ie=m:ge=m}let q=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if(ie&&q<.01&&(ie=null),ie){let m=P=>[P.x/H*2-1,1-P.y/D*2],_=ie,v=P=>({x:_.c.x+(P.x-_.c.x)*q,y:_.c.y+(P.y-_.c.y)*q}),B=m(_.c),G=m(v(_.w)),S=m(v(_.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([B[0],B[1],_.cRGB.x,_.cRGB.y,_.cRGB.z,G[0],G[1],1,1,1,S[0],S[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(W),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,H,D),Dt(n,$,X,o,a,r),ut(n,$,X,o,a,c),ge){let m=ge;n.save(),n.globalAlpha=p,n.beginPath(),n.moveTo(m.k.x,m.k.y),n.lineTo(m.w.x,m.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if(ie){let m=ie,_=L=>({x:m.c.x+(L.x-m.c.x)*q,y:m.c.y+(L.y-m.c.y)*q}),v=_(m.w),B=_(m.k),G=Math.round(m.cRGB.x*255),S=Math.round(m.cRGB.y*255),P=Math.round(m.cRGB.z*255);if(n.save(),n.globalAlpha=p,n.beginPath(),n.moveTo(m.c.x,m.c.y),n.lineTo(v.x,v.y),n.lineTo(B.x,B.y),n.closePath(),n.strokeStyle=`rgba(${G}, ${S}, ${P}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(v.x,v.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(B.x,B.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),f){let L=f.a*m.c.x+f.b*v.x+f.g*B.x,j=f.a*m.c.y+f.b*v.y+f.g*B.y;n.beginPath(),n.arc(L,j,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}let N=(m,_,v)=>.299*m+.587*_+.114*v>140?"rgba(17, 24, 39, 0.85)":"rgba(255, 255, 255, 0.95)";if(d&&!f&&!C){let m=re(h,$,X,o,a),_=ne(h,l),v=s?{r:255-_.r,g:255-_.g,b:255-_.b}:_;if(U<1){n.save(),n.beginPath(),n.arc(m.x,m.y,6,0,Math.PI*2),n.clip();let B=4;for(let G=-8;G<8;G+=B)for(let S=-8;S<8;S+=B)n.fillStyle=(S+G)/B%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(m.x+S,m.y+G,B,B);n.restore()}n.beginPath(),n.arc(m.x,m.y,6,0,Math.PI*2),n.fillStyle=U<1?`rgba(${v.r}, ${v.g}, ${v.b}, ${U})`:`rgb(${v.r}, ${v.g}, ${v.b})`,n.fill(),n.strokeStyle=N(v.r,v.g,v.b),n.lineWidth=2,n.stroke()}if(C&&C.reveal>.01){let m=C.anchor,_=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,v=Me*_,B=(Me+ve/2)*_,G=(Me+ve*1.5)*_,S=ve*_,P=ne(h,l),L=s?{r:255-P.r,g:255-P.g,b:255-P.b}:P,j=-Math.PI/2;n.save(),n.globalAlpha=Math.min(1,_+.15);let le=(V,F)=>{n.save(),n.beginPath(),n.arc(m.x,m.y,V+F/2,0,Math.PI*2),n.arc(m.x,m.y,Math.max(.5,V-F/2),0,Math.PI*2,!0),n.closePath(),n.clip();let E=6,O=V+F/2;for(let K=-O;K<O;K+=E)for(let me=-O;me<O;me+=E)n.fillStyle=(me+K)/E%2===0?"#cbd5e1":"#f1f5f9",n.fillRect(m.x+me,m.y+K,E,E);n.restore()},be=(V,F,E)=>{n.lineWidth=E?1.8:1,n.strokeStyle=E?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let O of[V-F/2,V+F/2])O<=0||(n.beginPath(),n.arc(m.x,m.y,O,0,Math.PI*2),n.stroke())},xe=(V,F,E)=>{let O=m.x,K=m.y-(F+S/2)-2;n.font="700 12px ui-monospace, SF Mono, monospace",n.textAlign="center",n.textBaseline="alphabetic",n.lineWidth=3,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.strokeText(V,O,K),n.fillStyle=E?"#ffffff":"rgba(248, 250, 252, 0.95)",n.fillText(V,O,K)},M=C.colorAnchor||h,ue=ne(M,l),A=72,Z=Math.PI*2/A;for(let V=0;V<A;V++){let F=j+V*Z,E=Le(ue,V*Z);n.beginPath(),n.arc(m.x,m.y,B,F,F+Z+.012),n.lineWidth=S,n.lineCap="butt",n.strokeStyle=`rgb(${E.r}, ${E.g}, ${E.b})`,n.stroke()}let J=m.x+B*Math.sin(C.angle),Te=m.y-B*Math.cos(C.angle);n.beginPath(),n.arc(J,Te,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(15, 23, 42, 0.75)",n.lineWidth=1.4,n.stroke(),be(B,S,C.band==="sat"),le(G,S);let ye=j+U*Math.PI*2;U>.001&&(n.beginPath(),n.arc(m.x,m.y,G,j,ye),n.lineWidth=S,n.strokeStyle=`rgba(${L.r}, ${L.g}, ${L.b}, ${U})`,n.stroke()),be(G,S,C.band==="alpha"),xe("SAT",G,C.band==="sat"),n.beginPath(),n.arc(m.x,m.y,v,0,Math.PI*2),n.fillStyle=U<1?`rgba(${L.r}, ${L.g}, ${L.b}, ${U})`:`rgb(${L.r}, ${L.g}, ${L.b})`,n.fill(),n.strokeStyle=N(L.r,L.g,L.b),n.lineWidth=2,n.stroke(),n.restore()}n.restore()}var w=Math.PI/180,fe=2*Math.PI,Ue=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},He=e=>{let o=e%fe;return o>Math.PI?o-=fe:o<-Math.PI&&(o+=fe),o},Pt=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,yt=(e,o)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function Vt(e,o={}){let a=o.size||460,l=o.mode||"rgb",s=!1,c={...st},r={...ct,radius:.08},h={...at},d={...rt},x={x:8*w,y:-20*w,z:-55*w},f=de(x.x,x.y,x.z),g=he(),p={...x},C=()=>{c.mat=ae(g,f)},U=o.initialColor||{r:255,g:255,b:255},u=se(U,l),n=1,H=!1,D=null,W=null,k=!1,I=0,z=0,$=null,X=t=>{if(z=t,$!==null)return;let i=performance.now(),b=6,R=T=>{let y=Math.min(.05,(T-i)/1e3);i=T,z>I?I=Math.min(z,I+y*b):I=Math.max(z,I-y*b),A(),Math.abs(I-z)<.001?(I=z,$=null):$=requestAnimationFrame(R)};$=requestAnimationFrame(R)},ie=250,ge=10,ce=!1,q=!1,N=null,m=null,_=null,v=null,B=0,G=!1,S=null,P=0,L=0,j=0,le=null,be=t=>{if(j=t,le!==null)return;let i=performance.now(),b=6,R=T=>{let y=Math.min(.05,(T-i)/1e3);i=T,j>L?L=Math.min(j,L+y*b):L=Math.max(j,L-y*b),A(),Math.abs(L-j)<.001?(L=j,le=null):le=requestAnimationFrame(R)};le=requestAnimationFrame(R)},xe=new Set,M=gt(e,a),ue=null,A=()=>{ue===null&&(ue=requestAnimationFrame(()=>{ue=null,xt(M,c,r,l,s,h,d,u,!0,D,W,k,I,_?{anchor:_,reveal:L,band:v,colorAnchor:S,angle:P}:null,n)}))},Z=()=>{let t=ne(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,b=ke(i),R=ze(i),T=n<1?yt(i,n):Ve(i),y={rgb:i,hsb:b,oklch:R,hex:T,alpha:n};xe.forEach(Q=>Q(y))},J=(t,i)=>{i!==0&&(t==="x"?(f=ae(f,pe(i)),p.x+=i):t==="y"?(f=ae(f,Ce(i)),p.y+=i):(f=ae(f,Ie(i)),p.z+=i),C(),A())},Te=(t,i)=>{g=ae(Ce(t*.01),g),g=ae(pe(-i*.01),g),C(),A()},ye=t=>{g=ae(t,Oe(f)),C(),A()},V=()=>{f=de(x.x,x.y,x.z),g=he(),p={...x},c.zoom=1,C(),A()},F=!1,E=!1,O=0,K=0,me=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),pt=()=>{let t=me();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Ct=t=>{let i=me(),b=pt(),R=Math.abs(t.x)-(i.x-b),T=Math.abs(t.y)-(i.y-b),y=Math.abs(t.z)-(i.z-b),Q=Math.max(R,0),ee=Math.max(T,0),Y=Math.max(y,0),te=Math.hypot(Q,ee,Y),oe=Math.min(Math.max(R,Math.max(T,y)),0);return te+oe-b},Ae=(t,i)=>{let b=M.canvasGL.getBoundingClientRect(),R=(t-b.left)*(M.width/b.width),T=(i-b.top)*(M.height/b.height),y=R-M.width*.5,Q=M.height*.5-T,ee=M.width*.36*1.6*(c.zoom||1),Y={x:y/ee,y:Q/ee},te=Re=>Xe(Oe(c.mat),Re),oe=0,tt=null;for(let Re=0;Re<96;Re++){let At={x:Y.x,y:Y.y,z:-5+oe},ot=te(At),nt=Ct(ot);if(nt<.001){tt=ot;break}if(oe+=nt,oe>10)break}return tt},We=(t,i)=>{let b=Ae(t,i);if(!b)return;let R=Math.max(0,Math.min(1,b.x/r.sizeX+.5)),T=Math.max(0,Math.min(1,b.y/r.sizeY+.5)),y=Math.max(0,Math.min(1,b.z/r.sizeZ+.5));u={x:R,y:T,z:y},Z(),A()},we=(t,i)=>{let b=M.canvasGL.getBoundingClientRect();return{x:(t-b.left)*(M.width/b.width),y:(i-b.top)*(M.height/b.height)}},$e=()=>re(u,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),_t=(t,i)=>{let b=we(t,i),R=$e();return Math.hypot(b.x-R.x,b.y-R.y)<=14},Mt=t=>{n=Math.max(0,Math.min(1,t)),Z(),A()},Se=t=>{let i=t.x-_.x,b=t.y-_.y,R=Math.atan2(i,-b);return R<0?R+fe:R},It=t=>Se(t)/fe,vt=t=>{P=t;let i=ne(S||u,l);u=se(Le(i,t),l),Z(),A()},Ne=(t,i)=>{if(!h.svTriangle)return null;let b=M.canvasGL.getBoundingClientRect(),R=(t-b.left)*(M.width/b.width),T=(i-b.top)*(M.height/b.height),y=_e(D||u,l,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),Q=(y.w.y-y.k.y)*(y.c.x-y.k.x)+(y.k.x-y.w.x)*(y.c.y-y.k.y);if(Math.abs(Q)<1e-6)return null;let ee=((y.w.y-y.k.y)*(R-y.k.x)+(y.k.x-y.w.x)*(T-y.k.y))/Q,Y=((y.k.y-y.c.y)*(R-y.k.x)+(y.c.x-y.k.x)*(T-y.k.y))/Q,te=1-ee-Y;return ee<-.02||Y<-.02||te<-.02?null:{a:ee,b:Y,g:te}},Ze=t=>{let b=_e(D||u,l,M.width*.36,{x:M.width*.5,y:M.height*.5},c,r),R=Math.max(0,Math.min(1,t.a*b.cRGB.x+t.b)),T=Math.max(0,Math.min(1,t.a*b.cRGB.y+t.b)),y=Math.max(0,Math.min(1,t.a*b.cRGB.z+t.b));u=se({r:R*255,g:T*255,b:y*255},l),Z(),A()},qe=0,je=0,Ke=(t,i)=>{qe=t,je=i,M.canvasGL.style.cursor=Ae(t,i)?"default":"grab"};M.canvasGL.addEventListener("mousemove",t=>{Ke(t.clientX,t.clientY)}),M.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)F=!0,O=t.clientX,K=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=k?Ne(t.clientX,t.clientY):null;i?(H=!0,D={...u},W=i,Ze(i)):!k&&_t(t.clientX,t.clientY)?(ce=!0,q=!1,m=we(t.clientX,t.clientY),_=$e(),v=null,S={...u},P=0,D=null,W=null,t.preventDefault(),N=window.setTimeout(()=>{N=null,ce&&!q&&(q=!0,be(1))},ie)):Ae(t.clientX,t.clientY)?(E=!0,D=null,W=null,We(t.clientX,t.clientY)):(F=!0,O=t.clientX,K=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),M.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(ce&&_){let i=we(t.clientX,t.clientY);if(!q){m&&Math.hypot(i.x-m.x,i.y-m.y)>ge&&(N!==null&&(window.clearTimeout(N),N=null),q=!0,be(1));return}let b=Math.hypot(i.x-_.x,i.y-_.y),R=Pt(L),T=Me*R,y=ve*R,Q=b>=T+y-2&&b<=T+2*y+2,ee=b>=T-2&&b<=T+y+2,Y=b<T-3?null:ee?"sat":Q?"alpha":null;if(Y!==v&&(v=Y,B=Y?Se(i):0,G=!1),Y){let te=Se(i);if(!G){let oe=Math.abs(te-B);oe>Math.PI&&(oe=fe-oe),oe>10*w&&(G=!0)}G?Y==="alpha"?Mt(te/fe):vt(te):A()}else A()}else if(H){let i=Ne(t.clientX,t.clientY);i&&(W=i,Ze(i))}else if(F){let i=t.clientX-O,b=t.clientY-K;O=t.clientX,K=t.clientY,Te(i,b)}else E&&We(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{ce&&(N!==null&&(window.clearTimeout(N),N=null),ce=!1,q=!1,m=null,v=null,B=0,G=!1,S=null,P=0,be(0)),H&&(H=!1),F&&(F=!1,document.body.style.cursor="default"),E&&(E=!1),Ke(qe,je)}),M.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),A()},{passive:!1}),M.canvasGL.addEventListener("dblclick",t=>{Ae(t.clientX,t.clientY)?(s=!s,Z()):V(),A()});let Qe=t=>{if(t.key==="Shift"){k||(k=!0,D=null,W=null,X(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":V();break;case"f":case"F":ye(he());break;case"b":case"B":ye(Ce(Math.PI));break;case"t":case"T":ye(pe(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),J("y",-5*w);break;case"ArrowRight":t.preventDefault(),J("y",5*w);break;case"ArrowUp":t.preventDefault(),J("x",5*w);break;case"ArrowDown":t.preventDefault(),J("x",-5*w);break}};window.addEventListener("keydown",Qe);let Je=t=>{t.key==="Shift"&&k&&(k=!1,X(0))};window.addEventListener("keyup",Je);let et=()=>{k&&(k=!1,X(0))};return window.addEventListener("blur",et),A(),Z(),{getColor:()=>{let t=ne(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:ke(i),oklch:ze(i),hex:n<1?yt(i,n):Ve(i),alpha:n}},setColor:t=>{U=t,u=se(t,l),t.a!==void 0&&(n=Math.max(0,Math.min(1,t.a))),D=null,W=null,Z(),A()},setMode:t=>{l=t,D=null,W=null,Z(),A()},getMode:()=>l,setRotation:(t,i)=>{f=de(i*w,0,t*w),g=he(),p.x=i*w,p.y=0,p.z=t*w,C(),A()},getAxisRotation:()=>({rotXDeg:Math.round(Ue(p.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ue(p.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ue(p.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,b)=>{J("x",He(t*w-p.x)),J("y",He(i*w-p.y)),J("z",He(b*w-p.z))},rotateLocal:(t,i)=>{J(t,i*w)},resetRotation:(t,i,b)=>{f=de(t*w,i*w,b*w),g=he(),p.x=t*w,p.y=i*w,p.z=b*w,C(),A()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),A()},getZoom:()=>c.zoom||1,setDimensions:(t,i,b)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,b)),A()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),A()},getRadius:()=>r.radius,setAlpha:t=>{n=Math.max(0,Math.min(1,t)),Z(),A()},getAlpha:()=>n,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},A()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},A()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},A()},on:(t,i)=>{xe.add(i)},off:(t,i)=>{xe.delete(i)},destroy:()=>{ue!==null&&cancelAnimationFrame(ue),$!==null&&cancelAnimationFrame($),le!==null&&cancelAnimationFrame(le),N!==null&&window.clearTimeout(N),window.removeEventListener("keydown",Qe),window.removeEventListener("keyup",Je),window.removeEventListener("blur",et),e.innerHTML=""}}}return Tt(Ft);})();
