var ColorIsBoxRounded=(()=>{var Pe=Object.defineProperty;var zt=Object.getOwnPropertyDescriptor;var Lt=Object.getOwnPropertyNames;var Bt=Object.prototype.hasOwnProperty;var Gt=(e,o)=>{for(var a in o)Pe(e,a,{get:o[a],enumerable:!0})},wt=(e,o,a,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of Lt(o))!Bt.call(e,s)&&s!==a&&Pe(e,s,{get:()=>o[s],enumerable:!(l=zt(o,s))||l.enumerable});return e};var Tt=e=>wt(Pe({},"__esModule",{value:!0}),e);var Ot={};Gt(Ot,{createRoundedBoxPicker:()=>Ft});var it={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},lt={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0,svTriangle:!0};function Le(e){let o=e.r/255,a=e.g/255,l=e.b/255,s=Math.max(o,a,l),c=Math.min(o,a,l),r=s-c,h=0;r!==0&&(s===o?h=((a-l)/r+6)%6:s===a?h=(l-o)/r+2:h=(o-a)/r+4,h*=60);let d=s===0?0:r/s*100,g=s*100;return{h,s:d,b:g}}function Et(e){let o=e.h,a=e.s/100,l=e.b/100,s=l*a,c=s*(1-Math.abs(o/60%2-1)),r=l-s,h,d,g;return o<60?(h=s,d=c,g=0):o<120?(h=c,d=s,g=0):o<180?(h=0,d=s,g=c):o<240?(h=0,d=c,g=s):o<300?(h=c,d=0,g=s):(h=s,d=0,g=c),{r:Math.round((h+r)*255),g:Math.round((d+r)*255),b:Math.round((g+r)*255)}}function De(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Ve(e){return e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055}function St(e){let o=De(e.r/255),a=De(e.g/255),l=De(e.b/255),s=.4122214708*o+.5363325363*a+.0514459929*l,c=.2119034982*o+.6806995451*a+.1073969566*l,r=.0883024619*o+.2817188376*a+.6299787005*l,h=Math.cbrt(s),d=Math.cbrt(c),g=Math.cbrt(r);return{L:.2104542553*h+.793617785*d-.0040720468*g,a:1.9779984951*h-2.428592205*d+.4505937099*g,b:.0259040371*h+.7827717662*d-.808675766*g}}function Pt(e,o,a){let l=e+.3963377774*o+.2158037573*a,s=e-.1055613458*o-.0638541728*a,c=e-.0894841775*o-1.291485548*a,r=l*l*l,h=s*s*s,d=c*c*c,g=4.0767416621*r-3.3077115913*h+.2309699292*d,x=-1.2684380046*r+2.6097574011*h-.3413193965*d,m=-.0041960863*r-.7034186147*h+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,Ve(g)))*255),g:Math.round(Math.max(0,Math.min(1,Ve(x)))*255),b:Math.round(Math.max(0,Math.min(1,Ve(m)))*255)}}function Be(e){let o=St(e),a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.atan2(o.b,o.a)*(180/Math.PI);return l<0&&(l+=360),{l:o.L,c:a,h:a<1e-4?0:l}}function Ie(e){let o=e.h*(Math.PI/180),a=e.c*Math.cos(o),l=e.c*Math.sin(o);return Pt(e.l,a,l)}function Dt(e,o,a){let l=Ie({l:e,c:o,h:a});if(st(l))return{l:e,c:o,h:a};let s=0,c=o;for(let r=0;r<20;r++){let h=(s+c)/2;l=Ie({l:e,c:h,h:a}),st(l)?s=h:c=h}return{l:e,c:s,h:a}}function st(e){return e.r>=0&&e.r<=255&&e.g>=0&&e.g<=255&&e.b>=0&&e.b<=255}function Fe(e){let o=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${o(e.r)}${o(e.g)}${o(e.b)}`}var ct=.4;function te(e,o){if(o==="rgb")return{r:Math.round(e.x*255),g:Math.round(e.y*255),b:Math.round(e.z*255)};if(o==="hsb")return Et({h:e.x*359,s:e.y*100,b:e.z*100});{let a=e.x,l=e.y*ct,s=e.z*359,c=Dt(a,l,s);return Ie(c)}}function ce(e,o){if(o==="rgb")return{x:e.r/255,y:e.g/255,z:e.b/255};if(o==="hsb"){let a=Le(e);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=Be(e);return{x:a.l,y:Math.min(a.c/ct,1),z:a.h/359}}}function Ge(e,o){let a=o*180/Math.PI%360;a<0&&(a+=360);let l=e.r/255,s=e.g/255,c=e.b/255,r=(m,y,C)=>m+(y-m)*C,h,d,g;if(a<=90){let m=a/90;h=1-m,d=1-m,g=1-m}else if(a<=180){let m=(a-90)/90;h=l*m,d=s*m,g=c*m}else{let m=(a-180)/180;h=r(l,1,m),d=r(s,1,m),g=r(c,1,m)}let x=m=>Math.round(Math.max(0,Math.min(1,m))*255);return{r:x(h),g:x(d),b:x(g)}}var Oe=Math.PI/180;function Ce(){return[1,0,0,0,1,0,0,0,1]}function ve(e){let o=Math.cos(e),a=Math.sin(e);return[1,0,0,0,o,-a,0,a,o]}function Ae(e){let o=Math.cos(e),a=Math.sin(e);return[o,0,a,0,1,0,-a,0,o]}function Xe(e){let o=Math.cos(e),a=Math.sin(e);return[o,a,0,-a,o,0,0,0,1]}function ne(e,o){let a=new Array(9);for(let l=0;l<3;l++)for(let s=0;s<3;s++)a[l*3+s]=e[l*3]*o[s]+e[l*3+1]*o[3+s]+e[l*3+2]*o[6+s];return a}function Ye(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Ue(e,o){return{x:e[0]*o.x+e[1]*o.y+e[2]*o.z,y:e[3]*o.x+e[4]*o.y+e[5]*o.z,z:e[6]*o.x+e[7]*o.y+e[8]*o.z}}function _e(e,o,a){return ne(Ae(o),ne(Xe(a),ve(e)))}var ut={mat:_e(8*Oe,-20*Oe,-55*Oe),zoom:1},mt={sizeX:1,sizeY:1,sizeZ:1,radius:0};function we(e,o,a){let l=(e.x-.5)*a.sizeX,s=(e.y-.5)*a.sizeY,c=(e.z-.5)*a.sizeZ;return Ue(o.mat,{x:l,y:s,z:c})}function oe(e,o,a,l,s){let c=we(e,l,s);return{x:a.x+c.x*o*1.6*l.zoom,y:a.y-c.y*o*1.6*l.zoom}}function Re(e,o,a,l,s,c){let r=te(e,o),h={x:r.r/255,y:r.g/255,z:r.b/255},d=ce({r:255,g:255,b:255},o),g=ce({r:0,g:0,b:0},o);return{c:oe(e,a,l,s,c),w:oe(d,a,l,s,c),k:oe(g,a,l,s,c),cRGB:h}}var He=["#ef4444","#22c55e","#3b82f6"];function bt(e,o,a,l,s,c){let r=m=>oe(m,o,a,l,s);e.save();let h=r({x:.5,y:.5,z:.5}),d=.35,g=[{from:{x:-d,y:.5,z:.5},to:{x:1+d,y:.5,z:.5},color:He[0],name:"Cx",visible:c.centerX},{from:{x:.5,y:-d,z:.5},to:{x:.5,y:1+d,z:.5},color:He[1],name:"Cy",visible:c.centerY},{from:{x:.5,y:.5,z:-d},to:{x:.5,y:.5,z:1+d},color:He[2],name:"Cz",visible:c.centerZ}],x=!1;for(let m=0;m<g.length;m++){if(!g[m].visible)continue;x=!0;let y=r(g[m].from),C=r(g[m].to);e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(C.x,C.y),e.strokeStyle=g[m].color,e.lineWidth=2,e.setLineDash([]),e.stroke(),e.beginPath(),e.arc(y.x,y.y,3,0,Math.PI*2),e.arc(C.x,C.y,3,0,Math.PI*2),e.fillStyle=g[m].color,e.fill()}x&&(e.beginPath(),e.arc(h.x,h.y,3.5,0,Math.PI*2),e.fillStyle="#111827",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke()),e.restore()}var ft=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ht=`
attribute vec2 a_pos;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,dt=`
precision mediump float;
varying vec3 v_color;
uniform float u_alpha;
void main() {
  gl_FragColor = vec4(v_color, u_alpha);
}
`,gt=`
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
`;var he=20,ke=4,We=8,fe=16;function yt(e,o){let a=window.devicePixelRatio||1,l=document.createElement("div");l.style.position="relative",l.style.width=`${o}px`,l.style.height=`${o}px`,l.style.userSelect="none";let s=document.createElement("canvas");s.width=o*a,s.height=o*a,s.style.width=`${o}px`,s.style.height=`${o}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let c=document.createElement("canvas");c.width=o*a,c.height=o*a,c.style.width=`${o}px`,c.style.height=`${o}px`,c.style.position="absolute",c.style.left="0",c.style.top="0",c.style.pointerEvents="none",l.appendChild(s),l.appendChild(c),e.appendChild(l);let r=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),h=c.getContext("2d");h.scale(a,a);let d=(z,U)=>{let F=r.createShader(z);return r.shaderSource(F,U),r.compileShader(F),r.getShaderParameter(F,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(F)),F},g=d(r.VERTEX_SHADER,ft),x=d(r.FRAGMENT_SHADER,gt),m=r.createProgram();r.attachShader(m,g),r.attachShader(m,x),r.linkProgram(m);let y=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let C=r.getAttribLocation(m,"position");r.enableVertexAttribArray(C),r.vertexAttribPointer(C,2,r.FLOAT,!1,0,0);let K=d(r.VERTEX_SHADER,ht),u=d(r.FRAGMENT_SHADER,dt),n=r.createProgram();r.attachShader(n,K),r.attachShader(n,u),r.linkProgram(n);let X=r.getAttribLocation(n,"a_pos"),S=r.getAttribLocation(n,"a_color"),Y=r.getUniformLocation(n,"u_alpha"),k=r.createBuffer(),V={u_resolution:r.getUniformLocation(m,"u_resolution"),u_box_size:r.getUniformLocation(m,"u_box_size"),u_radius:r.getUniformLocation(m,"u_radius"),u_mat:r.getUniformLocation(m,"u_mat"),u_mat_inv:r.getUniformLocation(m,"u_mat_inv"),u_zoom:r.getUniformLocation(m,"u_zoom"),u_mode:r.getUniformLocation(m,"u_mode"),u_invert:r.getUniformLocation(m,"u_invert"),u_show_front:r.getUniformLocation(m,"u_show_front"),u_show_back:r.getUniformLocation(m,"u_show_back"),u_front_width:r.getUniformLocation(m,"u_front_width"),u_back_width:r.getUniformLocation(m,"u_back_width"),u_front_dashed:r.getUniformLocation(m,"u_front_dashed"),u_back_dashed:r.getUniformLocation(m,"u_back_dashed"),u_front_color:r.getUniformLocation(m,"u_front_color"),u_back_color:r.getUniformLocation(m,"u_back_color")};return{gl:r,overlayCtx:h,canvasGL:s,canvasOverlay:c,width:o,height:o,program:m,uniforms:V,posBuffer:y,posAttr:C,triProgram:n,triPosAttr:X,triColorAttr:S,triAlphaLoc:Y,triBuffer:k}}var xt=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Vt(e,o,a,l,s,c){if(!c.showFront&&!c.showBack)return;let r=x=>oe(x,o,a,l,s),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(r),g=x=>{let m=we({x:.5,y:.5,z:.5},l,s);return we({x:.5+x.x*.1,y:.5+x.y*.1,z:.5+x.z*.1},l,s).z-m.z>0};if(e.save(),c.showBack){e.lineWidth=c.backWidth,c.backDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.backColor,e.globalAlpha=c.backOpacity;for(let x of xt)if(!(g(x.normalA)||g(x.normalB))){let[y,C]=x.edge;e.beginPath(),e.moveTo(d[y].x,d[y].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}if(c.showFront){e.lineWidth=c.frontWidth,c.frontDashed?e.setLineDash([4,3]):e.setLineDash([]),e.strokeStyle=c.frontColor,e.globalAlpha=c.frontOpacity;for(let x of xt)if(g(x.normalA)||g(x.normalB)){let[y,C]=x.edge;e.beginPath(),e.moveTo(d[y].x,d[y].y),e.lineTo(d[C].x,d[C].y),e.stroke()}}e.restore()}function pt(e,o,a,l,s,c,r,h,d,g,x,m,y,C,K){let{gl:u,overlayCtx:n,width:X,height:S,program:Y,uniforms:k}=e,V=window.devicePixelRatio||1;u.viewport(0,0,X*V,S*V),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(Y),u.uniform2f(k.u_resolution,X*V,S*V),u.uniform3f(k.u_box_size,a.sizeX,a.sizeY,a.sizeZ),u.uniform1f(k.u_radius,a.radius!==void 0?a.radius:.001);let z=o.mat;u.uniformMatrix3fv(k.u_mat,!1,new Float32Array([z[0],z[3],z[6],z[1],z[4],z[7],z[2],z[5],z[8]])),u.uniformMatrix3fv(k.u_mat_inv,!1,new Float32Array([z[0],z[1],z[2],z[3],z[4],z[5],z[6],z[7],z[8]])),u.uniform1f(k.u_zoom,o.zoom||1),u.uniform1i(k.u_mode,l==="rgb"?0:l==="hsb"?1:2),u.uniform1i(k.u_invert,s?1:0),u.uniform1i(k.u_show_front,r.showFront?1:0),u.uniform1i(k.u_show_back,r.showBack?1:0),u.uniform1f(k.u_front_width,r.frontWidth||1.5),u.uniform1f(k.u_back_width,r.backWidth||1),u.uniform1i(k.u_front_dashed,r.frontDashed?1:0),u.uniform1i(k.u_back_dashed,r.backDashed?1:0),u.uniform4f(k.u_front_color,1,1,1,r.frontOpacity||.65),u.uniform4f(k.u_back_color,1,1,1,r.backOpacity||.25),u.drawArrays(u.TRIANGLES,0,6);let U=X*.36,F={x:X*.5,y:S*.5},re=null,Me=null,ue=m||y>.001;if(c.svTriangle&&ue){let b=Re(g||h,l,U,F,o,a);Math.abs((b.w.x-b.c.x)*(b.k.y-b.c.y)-(b.w.y-b.c.y)*(b.k.x-b.c.x))>4?re=b:Me=b}let $=y<.5?2*y*y:1-Math.pow(-2*y+2,2)/2;if(re&&$<.01&&(re=null),re){let b=P=>[P.x/X*2-1,1-P.y/S*2],_=re,A=P=>({x:_.c.x+(P.x-_.c.x)*$,y:_.c.y+(P.y-_.c.y)*$}),T=b(_.c),D=b(A(_.w)),I=b(A(_.k));u.useProgram(e.triProgram),u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.bindBuffer(u.ARRAY_BUFFER,e.triBuffer),u.bufferData(u.ARRAY_BUFFER,new Float32Array([T[0],T[1],_.cRGB.x,_.cRGB.y,_.cRGB.z,D[0],D[1],1,1,1,I[0],I[1],0,0,0]),u.STATIC_DRAW),u.enableVertexAttribArray(e.triPosAttr),u.vertexAttribPointer(e.triPosAttr,2,u.FLOAT,!1,20,0),u.enableVertexAttribArray(e.triColorAttr),u.vertexAttribPointer(e.triColorAttr,3,u.FLOAT,!1,20,8),u.uniform1f(e.triAlphaLoc,1),u.drawArrays(u.TRIANGLES,0,3),u.disable(u.BLEND),u.useProgram(Y),u.enableVertexAttribArray(e.posAttr),u.bindBuffer(u.ARRAY_BUFFER,e.posBuffer),u.vertexAttribPointer(e.posAttr,2,u.FLOAT,!1,0,0)}if(n.save(),n.clearRect(0,0,X,S),Vt(n,U,F,o,a,r),bt(n,U,F,o,a,c),Me){let b=Me;n.save(),n.globalAlpha=y,n.beginPath(),n.moveTo(b.k.x,b.k.y),n.lineTo(b.w.x,b.w.y),n.strokeStyle="rgba(107, 114, 128, 0.7)",n.lineWidth=1.2,n.setLineDash([5,4]),n.stroke(),n.setLineDash([]),n.restore()}if(re){let b=re,_=L=>({x:b.c.x+(L.x-b.c.x)*$,y:b.c.y+(L.y-b.c.y)*$}),A=_(b.w),T=_(b.k),D=Math.round(b.cRGB.x*255),I=Math.round(b.cRGB.y*255),P=Math.round(b.cRGB.z*255);if(n.save(),n.globalAlpha=y,n.beginPath(),n.moveTo(b.c.x,b.c.y),n.lineTo(A.x,A.y),n.lineTo(T.x,T.y),n.closePath(),n.strokeStyle=`rgba(${D}, ${I}, ${P}, 0.7)`,n.lineWidth=1.2,n.setLineDash([]),n.stroke(),n.beginPath(),n.arc(A.x,A.y,3.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.6)",n.lineWidth=1.2,n.stroke(),n.beginPath(),n.arc(T.x,T.y,3.5,0,Math.PI*2),n.fillStyle="#111827",n.fill(),n.strokeStyle="rgba(255, 255, 255, 0.7)",n.lineWidth=1.2,n.stroke(),x){let L=x.a*b.c.x+x.b*A.x+x.g*T.x,W=x.a*b.c.y+x.b*A.y+x.g*T.y;n.beginPath(),n.arc(L,W,4,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(17, 24, 39, 0.75)",n.lineWidth=1.4,n.stroke()}n.restore()}let H=(b,_,A)=>.299*b+.587*_+.114*A>140?"rgba(17, 24, 39, 0.85)":"rgba(255, 255, 255, 0.95)";if(d&&!x&&!C){let b=oe(h,U,F,o,a),_=te(h,l),A=s?{r:255-_.r,g:255-_.g,b:255-_.b}:_;n.beginPath(),n.arc(b.x,b.y,8,0,Math.PI*2),n.fillStyle=K<1?`rgba(${A.r}, ${A.g}, ${A.b}, ${K})`:`rgb(${A.r}, ${A.g}, ${A.b})`,n.fill(),n.strokeStyle=H(A.r,A.g,A.b),n.lineWidth=2.5,n.stroke()}if(C&&C.reveal>.01){let b=C.anchor,_=C.reveal<.5?2*C.reveal*C.reveal:1-Math.pow(-2*C.reveal+2,2)/2,A=he*_,T=(he+ke+fe/2)*_,D=(he+ke+fe+We+fe/2)*_,I=fe*_,P=te(h,l),L=s?{r:255-P.r,g:255-P.g,b:255-P.b}:P,W=-Math.PI/2;n.save(),n.globalAlpha=_;let ie=(E,w)=>{n.save(),n.beginPath(),n.arc(b.x,b.y,E+w/2,0,Math.PI*2),n.arc(b.x,b.y,Math.max(.5,E-w/2),0,Math.PI*2,!0),n.closePath(),n.clip();let O=7,Z=E+w/2;n.fillStyle="rgba(148, 163, 184, 0.8)";for(let le=-Z;le<Z;le+=O)for(let ye=-Z;ye<Z;ye+=O)n.beginPath(),n.arc(b.x+ye,b.y+le,1.8,0,Math.PI*2),n.fill();n.restore()},ge=(E,w,O)=>{n.lineWidth=O?1.8:1,n.strokeStyle=O?"rgba(255, 255, 255, 0.9)":"rgba(15, 23, 42, 0.4)";for(let Z of[E-w/2,E+w/2])Z<=0||(n.beginPath(),n.arc(b.x,b.y,Z,0,Math.PI*2),n.stroke())},xe=(E,w)=>{n.beginPath(),n.arc(E,w,8.5,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.lineWidth=2,n.strokeStyle="#ffffff",n.stroke(),n.lineWidth=1,n.strokeStyle="rgba(15, 23, 42, 0.55)",n.stroke(),n.beginPath(),n.arc(E,w,3,0,Math.PI*2),n.fillStyle="#ffffff",n.fill(),n.strokeStyle="rgba(15, 23, 42, 0.45)",n.lineWidth=.8,n.stroke()},v=C.colorAnchor||h,me=te(v,l),R=72,N=Math.PI*2/R;for(let E=0;E<R;E++){let w=W+E*N,O=Ge(me,E*N);n.beginPath(),n.arc(b.x,b.y,T,w,w+N+.012),n.lineWidth=I,n.lineCap="butt",n.strokeStyle=`rgb(${O.r}, ${O.g}, ${O.b})`,n.stroke()}let J=b.x+T*Math.sin(C.angle),Te=b.y-T*Math.cos(C.angle);xe(J,Te),ge(T,I,C.band==="sat"),ie(D,I);let be=W+K*Math.PI*2;if(K>.001){n.beginPath(),n.arc(b.x,b.y,D,W,be),n.lineWidth=I,n.strokeStyle=`rgb(${L.r}, ${L.g}, ${L.b})`,n.stroke();let E=b.x+D*Math.cos(be),w=b.y+D*Math.sin(be);xe(E,w)}ge(D,I,C.band==="alpha"),n.beginPath(),n.arc(b.x,b.y,A,0,Math.PI*2),n.fillStyle=K<1?`rgba(${L.r}, ${L.g}, ${L.b}, ${K})`:`rgb(${L.r}, ${L.g}, ${L.b})`,n.fill(),n.strokeStyle=H(L.r,L.g,L.b),n.lineWidth=2,n.stroke(),n.restore()}n.restore()}var B=Math.PI/180,de=2*Math.PI,Ne=e=>{let o=e%360;return o>180?o-=360:o<-180&&(o+=360),o},$e=e=>{let o=e%de;return o>Math.PI?o-=de:o<-Math.PI&&(o+=de),o},It=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,Ct=(e,o)=>{let a=l=>Math.max(0,Math.min(255,Math.round(l))).toString(16).padStart(2,"0");return`#${a(e.r)}${a(e.g)}${a(e.b)}${a(o*255)}`};function Ft(e,o={}){let a=o.size||460,l=o.mode||"rgb",s=!1,c={...ut},r={...mt,radius:.08},h={...lt},d={...it},g={x:8*B,y:-20*B,z:-55*B},x=_e(g.x,g.y,g.z),m=Ce(),y={...g},C=()=>{c.mat=ne(m,x)},K=o.initialColor||{r:255,g:255,b:255},u=ce(K,l),n=1,X=!1,S=null,Y=null,k=!1,V=0,z=0,U=null,F=t=>{if(z=t,U!==null)return;let i=performance.now(),f=6,M=G=>{let p=Math.min(.05,(G-i)/1e3);i=G,z>V?V=Math.min(z,V+p*f):V=Math.max(z,V-p*f),R(),Math.abs(V-z)<.001?(V=z,U=null):U=requestAnimationFrame(M)};U=requestAnimationFrame(M)},re=250,Me=10,ue=!1,$=!1,H=null,b=null,_=null,A=null,T=0,D=!1,I=null,P=Math.PI,L=0,W=0,ie=null,ge=t=>{if(W=t,ie!==null)return;let i=performance.now(),f=6,M=G=>{let p=Math.min(.05,(G-i)/1e3);i=G,W>L?L=Math.min(W,L+p*f):L=Math.max(W,L-p*f),R(),Math.abs(L-W)<.001?(L=W,ie=null,W===0&&(_=null)):ie=requestAnimationFrame(M)};ie=requestAnimationFrame(M)},xe=new Set,v=yt(e,a),me=null,R=()=>{me===null&&(me=requestAnimationFrame(()=>{me=null,pt(v,c,r,l,s,h,d,u,!0,S,Y,k,V,_?{anchor:_,reveal:L,band:A,colorAnchor:I,angle:P}:null,n)}))},N=()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t,f=Le(i),M=Be(i),G=n<1?Ct(i,n):Fe(i),p={rgb:i,hsb:f,oklch:M,hex:G,alpha:n};xe.forEach(q=>q(p))},J=(t,i)=>{i!==0&&(t==="x"?(x=ne(x,ve(i)),y.x+=i):t==="y"?(x=ne(x,Ae(i)),y.y+=i):(x=ne(x,Xe(i)),y.z+=i),C(),R())},Te=(t,i)=>{m=ne(Ae(t*.01),m),m=ne(ve(-i*.01),m),C(),R()},be=t=>{m=ne(t,Ye(x)),C(),R()},E=()=>{x=_e(g.x,g.y,g.z),m=Ce(),y={...g},c.zoom=1,C(),R()},w=!1,O=!1,Z=0,le=0,ye=()=>({x:r.sizeX*.5,y:r.sizeY*.5,z:r.sizeZ*.5}),_t=()=>{let t=ye();return Math.min(r.radius||.001,Math.min(t.x,t.y,t.z)*.49)},Mt=t=>{let i=ye(),f=_t(),M=Math.abs(t.x)-(i.x-f),G=Math.abs(t.y)-(i.y-f),p=Math.abs(t.z)-(i.z-f),q=Math.max(M,0),ee=Math.max(G,0),j=Math.max(p,0),se=Math.hypot(q,ee,j),Q=Math.min(Math.max(M,Math.max(G,p)),0);return se+Q-f},ze=(t,i)=>{let f=v.canvasGL.getBoundingClientRect(),M=(t-f.left)*(v.width/f.width),G=(i-f.top)*(v.height/f.height),p=M-v.width*.5,q=v.height*.5-G,ee=v.width*.36*1.6*(c.zoom||1),j={x:p/ee,y:q/ee},se=ae=>Ue(Ye(c.mat),ae),Q=0,pe=null;for(let ae=0;ae<96;ae++){let kt={x:j.x,y:j.y,z:-5+Q},rt=se(kt),at=Mt(rt);if(at<.001){pe=rt;break}if(Q+=at,Q>10)break}return pe},Ze=(t,i)=>{let f=ze(t,i);if(!f)return;let M=Math.max(0,Math.min(1,f.x/r.sizeX+.5)),G=Math.max(0,Math.min(1,f.y/r.sizeY+.5)),p=Math.max(0,Math.min(1,f.z/r.sizeZ+.5));u={x:M,y:G,z:p},N(),R()},Ee=(t,i)=>{let f=v.canvasGL.getBoundingClientRect();return{x:(t-f.left)*(v.width/f.width),y:(i-f.top)*(v.height/f.height)}},qe=()=>oe(u,v.width*.36,{x:v.width*.5,y:v.height*.5},c,r),vt=(t,i)=>{let f=Ee(t,i),M=qe();return Math.hypot(f.x-M.x,f.y-M.y)<=17},At=t=>{n=Math.max(0,Math.min(1,t)),N(),R()},Se=t=>{let i=t.x-_.x,f=t.y-_.y,M=Math.atan2(i,-f);return M<0?M+de:M},Xt=t=>Se(t)/de,Rt=t=>{P=t;let i=te(I||u,l);u=ce(Ge(i,t),l),N(),R()},Ke=(t,i)=>{if(!h.svTriangle)return null;let f=v.canvasGL.getBoundingClientRect(),M=(t-f.left)*(v.width/f.width),G=(i-f.top)*(v.height/f.height),p=Re(S||u,l,v.width*.36,{x:v.width*.5,y:v.height*.5},c,r),q=(p.w.y-p.k.y)*(p.c.x-p.k.x)+(p.k.x-p.w.x)*(p.c.y-p.k.y);if(Math.abs(q)<1e-6)return null;let ee=((p.w.y-p.k.y)*(M-p.k.x)+(p.k.x-p.w.x)*(G-p.k.y))/q,j=((p.k.y-p.c.y)*(M-p.k.x)+(p.c.x-p.k.x)*(G-p.k.y))/q,se=1-ee-j;return ee<-.02||j<-.02||se<-.02?null:{a:ee,b:j,g:se}},je=t=>{let f=Re(S||u,l,v.width*.36,{x:v.width*.5,y:v.height*.5},c,r),M=Math.max(0,Math.min(1,t.a*f.cRGB.x+t.b)),G=Math.max(0,Math.min(1,t.a*f.cRGB.y+t.b)),p=Math.max(0,Math.min(1,t.a*f.cRGB.z+t.b));u=ce({r:M*255,g:G*255,b:p*255},l),N(),R()},Qe=0,Je=0,et=(t,i)=>{Qe=t,Je=i,v.canvasGL.style.cursor=ze(t,i)?"default":"grab"};v.canvasGL.addEventListener("mousemove",t=>{et(t.clientX,t.clientY)}),v.canvasGL.addEventListener("mousedown",t=>{if(t.button===1||t.button===0&&t.altKey)w=!0,Z=t.clientX,le=t.clientY,document.body.style.cursor="grabbing",t.preventDefault();else if(t.button===0){let i=k?Ke(t.clientX,t.clientY):null;i?(X=!0,S={...u},Y=i,je(i)):!k&&vt(t.clientX,t.clientY)?(ue=!0,$=!1,b=Ee(t.clientX,t.clientY),_=qe(),A=null,I={...u},P=Math.PI,S=null,Y=null,t.preventDefault(),H=window.setTimeout(()=>{H=null,ue&&!$&&($=!0,ge(1))},re)):ze(t.clientX,t.clientY)?(O=!0,S=null,Y=null,Ze(t.clientX,t.clientY)):(w=!0,Z=t.clientX,le=t.clientY,document.body.style.cursor="grabbing",t.preventDefault())}}),v.canvasGL.addEventListener("auxclick",t=>{t.button===1&&t.preventDefault()}),window.addEventListener("mousemove",t=>{if(ue&&_){let i=Ee(t.clientX,t.clientY);if(!$){b&&Math.hypot(i.x-b.x,i.y-b.y)>Me&&(H!==null&&(window.clearTimeout(H),H=null),$=!0,ge(1));return}let f=Math.hypot(i.x-_.x,i.y-_.y),M=It(L),G=he*M,p=fe*M,q=(he+ke)*M,ee=q+p,j=(he+ke+fe+We)*M,se=j+p,Q=f<G-3?null:f>=q-2&&f<=ee+2?"sat":f>=j-2&&f<=se+2?"alpha":null;if(Q!==A&&(A=Q,T=Q?Se(i):0,D=!1),Q){let pe=Se(i);if(!D){let ae=Math.abs(pe-T);ae>Math.PI&&(ae=de-ae),ae>10*B&&(D=!0)}D?Q==="alpha"?At(pe/de):Rt(pe):R()}else R()}else if(X){let i=Ke(t.clientX,t.clientY);i&&(Y=i,je(i))}else if(w){let i=t.clientX-Z,f=t.clientY-le;Z=t.clientX,le=t.clientY,Te(i,f)}else O&&Ze(t.clientX,t.clientY)}),window.addEventListener("mouseup",()=>{ue&&(H!==null&&(window.clearTimeout(H),H=null),ue=!1,$=!1,b=null,A=null,T=0,D=!1,I=null,P=0,ge(0)),X&&(X=!1),w&&(w=!1,document.body.style.cursor="default"),O&&(O=!1),et(Qe,Je)}),v.canvasGL.addEventListener("wheel",t=>{t.preventDefault();let i=t.deltaY<0?.08:-.08;c.zoom=Math.max(.2,Math.min(2.5,(c.zoom||1)+i)),R()},{passive:!1}),v.canvasGL.addEventListener("dblclick",t=>{ze(t.clientX,t.clientY)?(s=!s,N()):E(),R()});let tt=t=>{if(t.key==="Shift"){k||(k=!0,S=null,Y=null,F(1));return}let i=t.target?.tagName;if(!(i==="INPUT"||i==="TEXTAREA"))switch(t.key){case"r":case"R":E();break;case"f":case"F":be(Ce());break;case"b":case"B":be(Ae(Math.PI));break;case"t":case"T":be(ve(Math.PI/2));break;case"ArrowLeft":t.preventDefault(),J("y",-5*B);break;case"ArrowRight":t.preventDefault(),J("y",5*B);break;case"ArrowUp":t.preventDefault(),J("x",5*B);break;case"ArrowDown":t.preventDefault(),J("x",-5*B);break}};window.addEventListener("keydown",tt);let ot=t=>{t.key==="Shift"&&k&&(k=!1,F(0))};window.addEventListener("keyup",ot);let nt=()=>{k&&(k=!1,F(0))};return window.addEventListener("blur",nt),R(),N(),{getColor:()=>{let t=te(u,l),i=s?{r:255-t.r,g:255-t.g,b:255-t.b}:t;return{rgb:i,hsb:Le(i),oklch:Be(i),hex:n<1?Ct(i,n):Fe(i),alpha:n}},setColor:t=>{K=t,u=ce(t,l),t.a!==void 0&&(n=Math.max(0,Math.min(1,t.a))),S=null,Y=null,N(),R()},setMode:t=>{l=t,S=null,Y=null,N(),R()},getMode:()=>l,setRotation:(t,i)=>{x=_e(i*B,0,t*B),m=Ce(),y.x=i*B,y.y=0,y.z=t*B,C(),R()},getAxisRotation:()=>({rotXDeg:Math.round(Ne(y.x*180/Math.PI)*10)/10,rotYDeg:Math.round(Ne(y.y*180/Math.PI)*10)/10,rotZDeg:Math.round(Ne(y.z*180/Math.PI)*10)/10}),setAxisRotation:(t,i,f)=>{J("x",$e(t*B-y.x)),J("y",$e(i*B-y.y)),J("z",$e(f*B-y.z))},rotateLocal:(t,i)=>{J(t,i*B)},resetRotation:(t,i,f)=>{x=_e(t*B,i*B,f*B),m=Ce(),y.x=t*B,y.y=i*B,y.z=f*B,C(),R()},setZoom:t=>{c.zoom=Math.max(.1,Math.min(3,t)),R()},getZoom:()=>c.zoom||1,setDimensions:(t,i,f)=>{r.sizeX=Math.max(.2,Math.min(2.5,t)),r.sizeY=Math.max(.2,Math.min(2.5,i)),r.sizeZ=Math.max(.2,Math.min(2.5,f)),R()},getDimensions:()=>({sizeX:r.sizeX,sizeY:r.sizeY,sizeZ:r.sizeZ}),setRadius:t=>{r.radius=Math.max(0,Math.min(.5,t)),R()},getRadius:()=>r.radius,setAlpha:t=>{n=Math.max(0,Math.min(1,t)),N(),R()},getAlpha:()=>n,getEdgeStyle:()=>({...d}),setEdgeStyle:t=>{d={...d,...t},R()},getGuides:()=>({...h}),setGuides:t=>{h={...h,...t},R()},toggleAllGuides:t=>{let i=t!==void 0?t:!h.vertexX;h={vertexX:i,vertexY:i,vertexZ:i,centerX:i,centerY:i,centerZ:i,angleGuides:i,svTriangle:h.svTriangle},R()},on:(t,i)=>{xe.add(i)},off:(t,i)=>{xe.delete(i)},destroy:()=>{me!==null&&cancelAnimationFrame(me),U!==null&&cancelAnimationFrame(U),ie!==null&&cancelAnimationFrame(ie),H!==null&&window.clearTimeout(H),window.removeEventListener("keydown",tt),window.removeEventListener("keyup",ot),window.removeEventListener("blur",nt),e.innerHTML=""}}}return Tt(Ot);})();
