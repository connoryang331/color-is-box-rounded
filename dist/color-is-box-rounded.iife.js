var ColorIsBoxRounded=(()=>{var q=Object.defineProperty;var ko=Object.getOwnPropertyDescriptor;var Bo=Object.getOwnPropertyNames;var Do=Object.prototype.hasOwnProperty;var Go=(o,t)=>{for(var r in t)q(o,r,{get:t[r],enumerable:!0})},Ao=(o,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Bo(t))!Do.call(o,i)&&i!==r&&q(o,i,{get:()=>t[i],enumerable:!(a=ko(t,i))||a.enumerable});return o};var So=o=>Ao(q({},"__esModule",{value:!0}),o);var Fo={};Go(Fo,{createRoundedBoxPicker:()=>Yo});var mo={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},uo={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var fo={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},ho={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Y(o,t,r){let a=(o.x-.5)*r.sizeX,i=(o.y-.5)*r.sizeY,n=(o.z-.5)*r.sizeZ,e=Math.cos(t.rotXRad),l=Math.sin(t.rotXRad),u=a,c=i*e-n*l,f=i*l+n*e,m=Math.cos(t.rotYRad),b=Math.sin(t.rotYRad),p=u*m+f*b,d=c,C=-u*b+f*m,v=Math.cos(t.rotZRad),h=Math.sin(t.rotZRad),g=p*v-d*h,x=p*h+d*v;return{x:g,y:x,z:C}}function S(o,t,r,a,i){let n=Y(o,a,i);return{x:r.x+n.x*t*1.6*a.zoom,y:r.y-n.y*t*1.6*a.zoom}}function F(o){let t=o.r/255,r=o.g/255,a=o.b/255,i=Math.max(t,r,a),n=Math.min(t,r,a),e=i-n,l=0;e!==0&&(i===t?l=((r-a)/e+6)%6:i===r?l=(a-t)/e+2:l=(t-r)/e+4,l*=60);let u=i===0?0:e/i*100,c=i*100;return{h:l,s:u,b:c}}function Eo(o){let t=o.h,r=o.s/100,a=o.b/100,i=a*r,n=i*(1-Math.abs(t/60%2-1)),e=a-i,l,u,c;return t<60?(l=i,u=n,c=0):t<120?(l=n,u=i,c=0):t<180?(l=0,u=i,c=n):t<240?(l=0,u=n,c=i):t<300?(l=n,u=0,c=i):(l=i,u=0,c=n),{r:Math.round((l+e)*255),g:Math.round((u+e)*255),b:Math.round((c+e)*255)}}function K(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function j(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function To(o){let t=K(o.r/255),r=K(o.g/255),a=K(o.b/255),i=.4122214708*t+.5363325363*r+.0514459929*a,n=.2119034982*t+.6806995451*r+.1073969566*a,e=.0883024619*t+.2817188376*r+.6299787005*a,l=Math.cbrt(i),u=Math.cbrt(n),c=Math.cbrt(e);return{L:.2104542553*l+.793617785*u-.0040720468*c,a:1.9779984951*l-2.428592205*u+.4505937099*c,b:.0259040371*l+.7827717662*u-.808675766*c}}function Xo(o,t,r){let a=o+.3963377774*t+.2158037573*r,i=o-.1055613458*t-.0638541728*r,n=o-.0894841775*t-1.291485548*r,e=a*a*a,l=i*i*i,u=n*n*n,c=4.0767416621*e-3.3077115913*l+.2309699292*u,f=-1.2684380046*e+2.6097574011*l-.3413193965*u,m=-.0041960863*e-.7034186147*l+1.707614701*u;return{r:Math.round(Math.max(0,Math.min(1,j(c)))*255),g:Math.round(Math.max(0,Math.min(1,j(f)))*255),b:Math.round(Math.max(0,Math.min(1,j(m)))*255)}}function I(o){let t=To(o),r=Math.sqrt(t.a*t.a+t.b*t.b),a=Math.atan2(t.b,t.a)*(180/Math.PI);return a<0&&(a+=360),{l:t.L,c:r,h:r<1e-4?0:a}}function Q(o){let t=o.h*(Math.PI/180),r=o.c*Math.cos(t),a=o.c*Math.sin(t);return Xo(o.l,r,a)}function wo(o,t,r){let a=Q({l:o,c:t,h:r});if(bo(a))return{l:o,c:t,h:r};let i=0,n=t;for(let e=0;e<20;e++){let l=(i+n)/2;a=Q({l:o,c:l,h:r}),bo(a)?i=l:n=l}return{l:o,c:i,h:r}}function bo(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function J(o){let t=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${t(o.r)}${t(o.g)}${t(o.b)}`}var yo=.4;function E(o,t){if(t==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(t==="hsb")return Eo({h:o.x*359,s:o.y*100,b:o.z*100});{let r=o.x,a=o.y*yo,i=o.z*359,n=wo(r,a,i);return Q(n)}}function oo(o,t){if(t==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(t==="hsb"){let r=F(o);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=I(o);return{x:r.l,y:Math.min(r.c/yo,1),z:r.h/359}}}var A=["#ef4444","#22c55e","#3b82f6"];function xo(o,t,r,a,i,n){let e=h=>S(h,t,r,a,i),l=e({x:0,y:0,z:0});o.save();let u=1.28,c=[{p:{x:u,y:0,z:0},name:"X",color:A[0],visible:n.vertexX},{p:{x:0,y:u,z:0},name:"Y",color:A[1],visible:n.vertexY},{p:{x:0,y:0,z:u},name:"Z",color:A[2],visible:n.vertexZ}];for(let h=0;h<c.length;h++){if(!c[h].visible)continue;let g=e(c[h].p),x=c[h].color;o.beginPath(),o.moveTo(l.x,l.y),o.lineTo(g.x,g.y),o.strokeStyle=x,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(g.x,g.y,3.5,0,Math.PI*2),o.fillStyle=x,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let z=g.x-l.x,L=g.y-l.y,_=Math.hypot(z,L)||1,s=12,y=g.x+z/_*s,M=g.y+L/_*s;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=x,o.fillText(c[h].name,y,M)}(n.vertexX||n.vertexY||n.vertexZ)&&(o.beginPath(),o.arc(l.x,l.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let f=e({x:.5,y:.5,z:.5}),m=.35,b=[{from:{x:-m,y:.5,z:.5},to:{x:1+m,y:.5,z:.5},color:A[0],name:"Cx",visible:n.centerX},{from:{x:.5,y:-m,z:.5},to:{x:.5,y:1+m,z:.5},color:A[1],name:"Cy",visible:n.centerY},{from:{x:.5,y:.5,z:-m},to:{x:.5,y:.5,z:1+m},color:A[2],name:"Cz",visible:n.centerZ}],p=!1;for(let h=0;h<b.length;h++){if(!b[h].visible)continue;p=!0;let g=e(b[h].from),x=e(b[h].to);o.beginPath(),o.moveTo(g.x,g.y),o.lineTo(x.x,x.y),o.strokeStyle=b[h].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(g.x,g.y,3,0,Math.PI*2),o.arc(x.x,x.y,3,0,Math.PI*2),o.fillStyle=b[h].color,o.fill()}p&&(o.beginPath(),o.arc(f.x,f.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let d=n.angleGuides!==void 0?n.angleGuides:n.yawArc||n.pitchArc||!1,C=Math.round(a.rotZRad*180/Math.PI*10)/10,v=Math.round(a.rotXRad*180/Math.PI*10)/10;if(d){o.beginPath();let h=36;for(let x=0;x<=h;x++){let z=x/h*Math.PI*2,L={x:.5+Math.cos(z)*.75,y:.5+Math.sin(z)*.75,z:0},_=e(L);x===0?o.moveTo(_.x,_.y):o.lineTo(_.x,_.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let g=20;for(let x=0;x<=g;x++){let z=-Math.PI/2+x/g*Math.PI,L={x:.5+Math.cos(z)*.75,y:.5,z:.5+Math.sin(z)*.75},_=e(L);x===0?o.moveTo(_.x,_.y):o.lineTo(_.x,_.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${C.toFixed(1)}\xB0`,12,r.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${v.toFixed(1)}\xB0`,12,r.y*2-10)}o.restore()}var go=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,po=`
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform vec3 u_box_size;    // sizeX, sizeY, sizeZ
uniform float u_radius;     // bevel radius (0.001 ~ 0.25)
uniform vec3 u_rot;         // rotX, rotY, rotZ in radians
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

// Matrix rotation matching camera-math.ts:
// 1. X-axis (Pitch) -> 2. Y-axis (Roll) -> 3. Z-axis (Yaw)
vec3 rotateToCam(vec3 p, vec3 r) {
  // 1. X-axis (Pitch)
  float cx = cos(r.x), sx = sin(r.x);
  float x1 = p.x;
  float y1 = p.y * cx - p.z * sx;
  float z1 = p.y * sx + p.z * cx;

  // 2. Y-axis (Roll)
  float cy = cos(r.y), sy = sin(r.y);
  float x2 = x1 * cy + z1 * sy;
  float y2 = y1;
  float z2 = -x1 * sy + z1 * cy;

  // 3. Z-axis (Yaw)
  float cz = cos(r.z), sz = sin(r.z);
  float camX = x2 * cz - y2 * sz;
  float camY = x2 * sz + y2 * cz;
  float camZ = z2;

  return vec3(camX, camY, camZ);
}

// Inverse rotation from Cam space back to Local box space
// Mathematically exact inverse of transform3D:
// p_cam = Rz * [ Ry * (Rx * p_local) ]
// 1. Inv Z-axis:
//   camX = x2 * cz - y2 * sz
//   camY = x2 * sz + y2 * cz
//   => x2 =  camX * cz + camY * sz
//   => y2 = -camX * sz + camY * cz
//   z2 = camZ
// 2. Inv Y-axis:
//   x2 = x1 * cy + z1 * sy
//   z2 = -x1 * sy + z1 * cy
//   => x1 = x2 * cy - z2 * sy
//   => z1 = x2 * sy + z2 * cy
//   y1 = y2
// 3. Inv X-axis:
//   x = x1
//   y1 = y * cx - z * sx
//   z1 = y * sx + z * cx
//   => y = y1 * cx + z1 * sx
//   => z = -y1 * sx + z1 * cx
vec3 rotateToLocal(vec3 p, vec3 r) {
  float cz = cos(r.z), sz = sin(r.z);
  float x2 =  p.x * cz + p.y * sz;
  float y2 = -p.x * sz + p.y * cz;
  float z2 =  p.z;

  float cy = cos(r.y), sy = sin(r.y);
  float x1 = x2 * cy - z2 * sy;
  float y1 = y2;
  float z1 = x2 * sy + z2 * cy;

  float cx = cos(r.x), sx = sin(r.x);
  float x = x1;
  float y =  y1 * cx + z1 * sx;
  float z = -y1 * sx + z1 * cx;

  return vec3(x, y, z);
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
  float scaleFactor = u_resolution.x * 0.26 * 1.6 * u_zoom;
  
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
    pLocal = rotateToLocal(pCam, u_rot);
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
    vec3 nCam = rotateToCam(nLocal, u_rot);
    float rim = pow(1.0 - max(dot(nCam, vec3(0.0, 0.0, -1.0)), 0.0), 3.0) * 0.08;
    vec3 finalCol = col + vec3(rim);

    gl_FragColor = vec4(clamp(finalCol, 0.0, 1.0), 1.0);
  } else {
    discard; // Transparent background
  }
}
`;function zo(o,t){let r=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${t}px`,a.style.height=`${t}px`,a.style.userSelect="none";let i=document.createElement("canvas");i.width=t*r,i.height=t*r,i.style.width=`${t}px`,i.style.height=`${t}px`,i.style.position="absolute",i.style.left="0",i.style.top="0";let n=document.createElement("canvas");n.width=t*r,n.height=t*r,n.style.width=`${t}px`,n.style.height=`${t}px`,n.style.position="absolute",n.style.left="0",n.style.top="0",n.style.pointerEvents="none",a.appendChild(i),a.appendChild(n),o.appendChild(a);let e=i.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),l=n.getContext("2d");l.scale(r,r);let u=(C,v)=>{let h=e.createShader(C);return e.shaderSource(h,v),e.compileShader(h),e.getShaderParameter(h,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(h)),h},c=u(e.VERTEX_SHADER,go),f=u(e.FRAGMENT_SHADER,po),m=e.createProgram();e.attachShader(m,c),e.attachShader(m,f),e.linkProgram(m);let b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let p=e.getAttribLocation(m,"position");e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,0,0);let d={u_resolution:e.getUniformLocation(m,"u_resolution"),u_box_size:e.getUniformLocation(m,"u_box_size"),u_radius:e.getUniformLocation(m,"u_radius"),u_rot:e.getUniformLocation(m,"u_rot"),u_zoom:e.getUniformLocation(m,"u_zoom"),u_mode:e.getUniformLocation(m,"u_mode"),u_invert:e.getUniformLocation(m,"u_invert"),u_show_front:e.getUniformLocation(m,"u_show_front"),u_show_back:e.getUniformLocation(m,"u_show_back"),u_front_width:e.getUniformLocation(m,"u_front_width"),u_back_width:e.getUniformLocation(m,"u_back_width"),u_front_dashed:e.getUniformLocation(m,"u_front_dashed"),u_back_dashed:e.getUniformLocation(m,"u_back_dashed"),u_front_color:e.getUniformLocation(m,"u_front_color"),u_back_color:e.getUniformLocation(m,"u_back_color")};return{gl:e,overlayCtx:l,canvasGL:i,canvasOverlay:n,width:t,height:t,program:m,uniforms:d}}var Co=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Po(o,t,r,a,i,n){if(!n.showFront&&!n.showBack)return;let e=f=>S(f,t,r,a,i),u=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(e),c=f=>{let m=Y({x:.5,y:.5,z:.5},a,i);return Y({x:.5+f.x*.1,y:.5+f.y*.1,z:.5+f.z*.1},a,i).z-m.z>0};if(o.save(),n.showBack){o.lineWidth=n.backWidth,n.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=n.backColor,o.globalAlpha=n.backOpacity;for(let f of Co)if(!(c(f.normalA)||c(f.normalB))){let[b,p]=f.edge;o.beginPath(),o.moveTo(u[b].x,u[b].y),o.lineTo(u[p].x,u[p].y),o.stroke()}}if(n.showFront){o.lineWidth=n.frontWidth,n.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=n.frontColor,o.globalAlpha=n.frontOpacity;for(let f of Co)if(c(f.normalA)||c(f.normalB)){let[b,p]=f.edge;o.beginPath(),o.moveTo(u[b].x,u[b].y),o.lineTo(u[p].x,u[p].y),o.stroke()}}o.restore()}function vo(o,t,r,a,i,n,e,l,u){let{gl:c,overlayCtx:f,width:m,height:b,program:p,uniforms:d}=o,C=window.devicePixelRatio||1;c.viewport(0,0,m*C,b*C),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.useProgram(p),c.uniform2f(d.u_resolution,m*C,b*C),c.uniform3f(d.u_box_size,r.sizeX,r.sizeY,r.sizeZ),c.uniform1f(d.u_radius,r.radius!==void 0?r.radius:.001),c.uniform3f(d.u_rot,t.rotXRad,t.rotYRad,t.rotZRad),c.uniform1f(d.u_zoom,t.zoom||1),c.uniform1i(d.u_mode,a==="rgb"?0:a==="hsb"?1:2),c.uniform1i(d.u_invert,i?1:0),c.uniform1i(d.u_show_front,e.showFront?1:0),c.uniform1i(d.u_show_back,e.showBack?1:0),c.uniform1f(d.u_front_width,e.frontWidth||1.5),c.uniform1f(d.u_back_width,e.backWidth||1),c.uniform1i(d.u_front_dashed,e.frontDashed?1:0),c.uniform1i(d.u_back_dashed,e.backDashed?1:0),c.uniform4f(d.u_front_color,1,1,1,e.frontOpacity||.65),c.uniform4f(d.u_back_color,1,1,1,e.backOpacity||.25),c.drawArrays(c.TRIANGLES,0,6),f.save(),f.clearRect(0,0,m,b);let v=m*.26,h={x:m*.5,y:b*.5};if(Po(f,v,h,t,r,e),xo(f,v,h,t,r,n),u){let g=S(l,v,h,t,r),x=E(l,a),z=i?{r:255-x.r,g:255-x.g,b:255-x.b}:x;f.beginPath(),f.arc(g.x,g.y,6,0,Math.PI*2),f.fillStyle=`rgb(${z.r}, ${z.g}, ${z.b})`,f.fill(),f.strokeStyle="#ffffff",f.lineWidth=2,f.stroke()}f.restore()}function Yo(o,t={}){let r=t.size||460,a=t.mode||"rgb",i=!1,n={...fo},e={...ho,radius:.08},l={...uo},u={...mo},c=t.initialColor||{r:255,g:255,b:255},f=oo(c,a),m=new Set,b=zo(o,r),p=null,d=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,vo(b,n,e,a,i,l,u,f,!0)}))},C=()=>{let s=E(f,a),y=i?{r:255-s.r,g:255-s.g,b:255-s.b}:s,M=F(y),O=I(y),V=J(y),Z={rgb:y,hsb:M,oklch:O,hex:V,alpha:1};m.forEach(U=>U(Z))},v=!1,h=!1,g=0,x=0,z=n.rotZRad,L=n.rotXRad,_=(s,y)=>{let M=b.canvasGL.getBoundingClientRect(),O=(s-M.left)*(b.width/M.width),V=(y-M.top)*(b.height/M.height),Z=O-b.width*.5,U=b.height*.5-V,eo=b.width*.26*1.6*(n.zoom||1),to={x:Z/eo,y:U/eo},G={x:e.sizeX*.5,y:e.sizeY*.5,z:e.sizeZ*.5},_o=Math.min(Math.min(G.x,G.y),G.z),T=Math.min(e.radius||.001,_o*.49),no=Math.cos(n.rotXRad),ro=Math.sin(n.rotXRad),ao=Math.cos(n.rotYRad),io=Math.sin(n.rotYRad),so=Math.cos(n.rotZRad),co=Math.sin(n.rotZRad),Mo=R=>{let k=R.x*so+R.y*co,B=-R.x*co+R.y*so,D=R.z,W=k*ao-D*io,w=B,P=k*io+D*ao,N=W,$=w*no+P*ro,Lo=-w*ro+P*no;return{x:N,y:$,z:Lo}},Ro=R=>{let k=Math.abs(R.x)-(G.x-T),B=Math.abs(R.y)-(G.y-T),D=Math.abs(R.z)-(G.z-T),W=Math.max(k,0),w=Math.max(B,0),P=Math.max(D,0),N=Math.hypot(W,w,P),$=Math.min(Math.max(k,Math.max(B,D)),0);return N+$-T},H=0,lo=!1,X={x:0,y:0,z:0};for(let R=0;R<96;R++){let k={x:to.x,y:to.y,z:-5+H},B=Mo(k),D=Ro(B);if(D<.001){lo=!0,X=B;break}if(H+=D,H>10)break}if(lo){let R=Math.max(0,Math.min(1,X.x/e.sizeX+.5)),k=Math.max(0,Math.min(1,X.y/e.sizeY+.5)),B=Math.max(0,Math.min(1,X.z/e.sizeZ+.5));f={x:R,y:k,z:B},C(),d()}};return b.canvasGL.addEventListener("mousedown",s=>{s.button===1||s.button===0&&s.altKey?(v=!0,g=s.clientX,x=s.clientY,z=n.rotZRad,L=n.rotXRad,document.body.style.cursor="grabbing",s.preventDefault()):s.button===0&&(h=!0,_(s.clientX,s.clientY))}),b.canvasGL.addEventListener("auxclick",s=>{s.button===1&&s.preventDefault()}),window.addEventListener("mousemove",s=>{if(v){let y=s.clientX-g,M=s.clientY-x;n.rotZRad=z+y*.01,n.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,L-M*.01)),d()}else h&&_(s.clientX,s.clientY)}),window.addEventListener("mouseup",s=>{v&&(v=!1,document.body.style.cursor="default"),h&&(h=!1)}),b.canvasGL.addEventListener("wheel",s=>{s.preventDefault();let y=s.deltaY<0?.08:-.08;n.zoom=Math.max(.2,Math.min(2.5,(n.zoom||1)+y)),d()},{passive:!1}),b.canvasGL.addEventListener("dblclick",()=>{i=!i,C(),d()}),d(),C(),{getColor:()=>{let s=E(f,a),y=i?{r:255-s.r,g:255-s.g,b:255-s.b}:s;return{rgb:y,hsb:F(y),oklch:I(y),hex:J(y),alpha:1}},setColor:s=>{c=s,f=oo(s,a),C(),d()},setMode:s=>{a=s,C(),d()},getMode:()=>a,setRotation:(s,y)=>{n.rotZRad=s*Math.PI/180,n.rotXRad=y*Math.PI/180,d()},getAxisRotation:()=>({rotXDeg:Math.round(n.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(n.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(n.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(s,y,M)=>{n.rotXRad=s*Math.PI/180,n.rotYRad=y*Math.PI/180,n.rotZRad=M*Math.PI/180,d()},setZoom:s=>{n.zoom=Math.max(.1,Math.min(3,s)),d()},getZoom:()=>n.zoom||1,setDimensions:(s,y,M)=>{e.sizeX=Math.max(.2,Math.min(2.5,s)),e.sizeY=Math.max(.2,Math.min(2.5,y)),e.sizeZ=Math.max(.2,Math.min(2.5,M)),d()},getDimensions:()=>({sizeX:e.sizeX,sizeY:e.sizeY,sizeZ:e.sizeZ}),setRadius:s=>{e.radius=Math.max(0,Math.min(.5,s)),d()},getRadius:()=>e.radius,getEdgeStyle:()=>({...u}),setEdgeStyle:s=>{u={...u,...s},d()},getGuides:()=>({...l}),setGuides:s=>{l={...l,...s},d()},toggleAllGuides:s=>{let y=s!==void 0?s:!l.vertexX;l={vertexX:y,vertexY:y,vertexZ:y,centerX:y,centerY:y,centerZ:y,angleGuides:y},d()},on:(s,y)=>{m.add(y)},off:(s,y)=>{m.delete(y)},destroy:()=>{p!==null&&cancelAnimationFrame(p),o.innerHTML=""}}}return So(Fo);})();
