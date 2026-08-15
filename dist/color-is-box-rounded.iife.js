var ColorIsBoxRounded=(()=>{var no=Object.defineProperty;var Go=Object.getOwnPropertyDescriptor;var Ao=Object.getOwnPropertyNames;var wo=Object.prototype.hasOwnProperty;var So=(o,n)=>{for(var r in n)no(o,r,{get:n[r],enumerable:!0})},Eo=(o,n,r,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of Ao(n))!wo.call(o,s)&&s!==r&&no(o,s,{get:()=>n[s],enumerable:!(i=Go(n,s))||i.enumerable});return o};var Xo=o=>Eo(no({},"__esModule",{value:!0}),o);var Oo={};So(Oo,{createRoundedBoxPicker:()=>Vo});var bo={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},yo={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var go={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},xo={sizeX:1,sizeY:1,sizeZ:1,radius:0};function j(o,n,r){let i=(o.x-.5)*r.sizeX,s=(o.y-.5)*r.sizeY,e=(o.z-.5)*r.sizeZ,t=Math.cos(n.rotXRad),l=Math.sin(n.rotXRad),d=i,c=s*t-e*l,h=s*l+e*t,m=Math.cos(n.rotYRad),u=Math.sin(n.rotYRad),p=d*m-h*u,b=c,M=d*u+h*m,_=Math.cos(n.rotZRad),y=Math.sin(n.rotZRad),x=p*_-b*y,g=p*y+b*_;return{x,y:g,z:M}}function X(o,n,r,i,s){let e=j(o,i,s);return{x:r.x+e.x*n*1.6*i.zoom,y:r.y-e.y*n*1.6*i.zoom}}function K(o){let n=o.r/255,r=o.g/255,i=o.b/255,s=Math.max(n,r,i),e=Math.min(n,r,i),t=s-e,l=0;t!==0&&(s===n?l=((r-i)/t+6)%6:s===r?l=(i-n)/t+2:l=(n-r)/t+4,l*=60);let d=s===0?0:t/s*100,c=s*100;return{h:l,s:d,b:c}}function To(o){let n=o.h,r=o.s/100,i=o.b/100,s=i*r,e=s*(1-Math.abs(n/60%2-1)),t=i-s,l,d,c;return n<60?(l=s,d=e,c=0):n<120?(l=e,d=s,c=0):n<180?(l=0,d=s,c=e):n<240?(l=0,d=e,c=s):n<300?(l=e,d=0,c=s):(l=s,d=0,c=e),{r:Math.round((l+t)*255),g:Math.round((d+t)*255),b:Math.round((c+t)*255)}}function ro(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function ao(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function Po(o){let n=ro(o.r/255),r=ro(o.g/255),i=ro(o.b/255),s=.4122214708*n+.5363325363*r+.0514459929*i,e=.2119034982*n+.6806995451*r+.1073969566*i,t=.0883024619*n+.2817188376*r+.6299787005*i,l=Math.cbrt(s),d=Math.cbrt(e),c=Math.cbrt(t);return{L:.2104542553*l+.793617785*d-.0040720468*c,a:1.9779984951*l-2.428592205*d+.4505937099*c,b:.0259040371*l+.7827717662*d-.808675766*c}}function Yo(o,n,r){let i=o+.3963377774*n+.2158037573*r,s=o-.1055613458*n-.0638541728*r,e=o-.0894841775*n-1.291485548*r,t=i*i*i,l=s*s*s,d=e*e*e,c=4.0767416621*t-3.3077115913*l+.2309699292*d,h=-1.2684380046*t+2.6097574011*l-.3413193965*d,m=-.0041960863*t-.7034186147*l+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,ao(c)))*255),g:Math.round(Math.max(0,Math.min(1,ao(h)))*255),b:Math.round(Math.max(0,Math.min(1,ao(m)))*255)}}function Q(o){let n=Po(o),r=Math.sqrt(n.a*n.a+n.b*n.b),i=Math.atan2(n.b,n.a)*(180/Math.PI);return i<0&&(i+=360),{l:n.L,c:r,h:r<1e-4?0:i}}function io(o){let n=o.h*(Math.PI/180),r=o.c*Math.cos(n),i=o.c*Math.sin(n);return Yo(o.l,r,i)}function Io(o,n,r){let i=io({l:o,c:n,h:r});if(po(i))return{l:o,c:n,h:r};let s=0,e=n;for(let t=0;t<20;t++){let l=(s+e)/2;i=io({l:o,c:l,h:r}),po(i)?s=l:e=l}return{l:o,c:s,h:r}}function po(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function so(o){let n=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${n(o.r)}${n(o.g)}${n(o.b)}`}var zo=.4;function U(o,n){if(n==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(n==="hsb")return To({h:o.x*359,s:o.y*100,b:o.z*100});{let r=o.x,i=o.y*zo,s=o.z*359,e=Io(r,i,s);return io(e)}}function co(o,n){if(n==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(n==="hsb"){let r=K(o);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=Q(o);return{x:r.l,y:Math.min(r.c/zo,1),z:r.h/359}}}var I=["#ef4444","#22c55e","#3b82f6"];function Co(o,n,r,i,s,e){let t=y=>X(y,n,r,i,s),l=t({x:0,y:0,z:0});o.save();let d=1.28,c=[{p:{x:d,y:0,z:0},name:"X",color:I[0],visible:e.vertexX},{p:{x:0,y:d,z:0},name:"Y",color:I[1],visible:e.vertexY},{p:{x:0,y:0,z:d},name:"Z",color:I[2],visible:e.vertexZ}];for(let y=0;y<c.length;y++){if(!c[y].visible)continue;let x=t(c[y].p),g=c[y].color;o.beginPath(),o.moveTo(l.x,l.y),o.lineTo(x.x,x.y),o.strokeStyle=g,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(x.x,x.y,3.5,0,Math.PI*2),o.fillStyle=g,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let z=x.x-l.x,L=x.y-l.y,C=Math.hypot(z,L)||1,E=12,H=x.x+z/C*E,W=x.y+L/C*E;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=g,o.fillText(c[y].name,H,W)}(e.vertexX||e.vertexY||e.vertexZ)&&(o.beginPath(),o.arc(l.x,l.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let h=t({x:.5,y:.5,z:.5}),m=.35,u=[{from:{x:-m,y:.5,z:.5},to:{x:1+m,y:.5,z:.5},color:I[0],name:"Cx",visible:e.centerX},{from:{x:.5,y:-m,z:.5},to:{x:.5,y:1+m,z:.5},color:I[1],name:"Cy",visible:e.centerY},{from:{x:.5,y:.5,z:-m},to:{x:.5,y:.5,z:1+m},color:I[2],name:"Cz",visible:e.centerZ}],p=!1;for(let y=0;y<u.length;y++){if(!u[y].visible)continue;p=!0;let x=t(u[y].from),g=t(u[y].to);o.beginPath(),o.moveTo(x.x,x.y),o.lineTo(g.x,g.y),o.strokeStyle=u[y].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(x.x,x.y,3,0,Math.PI*2),o.arc(g.x,g.y,3,0,Math.PI*2),o.fillStyle=u[y].color,o.fill()}p&&(o.beginPath(),o.arc(h.x,h.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let b=e.angleGuides!==void 0?e.angleGuides:e.yawArc||e.pitchArc||!1,M=Math.round(i.rotZRad*180/Math.PI*10)/10,_=Math.round(i.rotXRad*180/Math.PI*10)/10;if(b){o.beginPath();let y=36;for(let g=0;g<=y;g++){let z=g/y*Math.PI*2,L={x:.5+Math.cos(z)*.75,y:.5+Math.sin(z)*.75,z:0},C=t(L);g===0?o.moveTo(C.x,C.y):o.lineTo(C.x,C.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let x=20;for(let g=0;g<=x;g++){let z=-Math.PI/2+g/x*Math.PI,L={x:.5+Math.cos(z)*.75,y:.5,z:.5+Math.sin(z)*.75},C=t(L);g===0?o.moveTo(C.x,C.y):o.lineTo(C.x,C.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${M.toFixed(1)}\xB0`,12,r.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${_.toFixed(1)}\xB0`,12,r.y*2-10)}o.restore()}var vo=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Mo=`
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

  // 2. Y-axis (Roll: Z -> X, standard right-handed)
  float cy = cos(r.y), sy = sin(r.y);
  float x2 = x1 * cy - z1 * sy;
  float y2 = y1;
  float z2 = x1 * sy + z1 * cy;

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
//   x2 = x1 * cy - z1 * sy
//   z2 = x1 * sy + z1 * cy
//   => x1 = x2 * cy + z2 * sy
//   => z1 = -x2 * sy + z2 * cy
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
  float x1 = x2 * cy + z2 * sy;
  float y1 = y2;
  float z1 = -x2 * sy + z2 * cy;

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
`;function Ro(o,n){let r=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${n}px`,i.style.height=`${n}px`,i.style.userSelect="none";let s=document.createElement("canvas");s.width=n*r,s.height=n*r,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let e=document.createElement("canvas");e.width=n*r,e.height=n*r,e.style.width=`${n}px`,e.style.height=`${n}px`,e.style.position="absolute",e.style.left="0",e.style.top="0",e.style.pointerEvents="none",i.appendChild(s),i.appendChild(e),o.appendChild(i);let t=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),l=e.getContext("2d");l.scale(r,r);let d=(M,_)=>{let y=t.createShader(M);return t.shaderSource(y,_),t.compileShader(y),t.getShaderParameter(y,t.COMPILE_STATUS)||console.error(t.getShaderInfoLog(y)),y},c=d(t.VERTEX_SHADER,vo),h=d(t.FRAGMENT_SHADER,Mo),m=t.createProgram();t.attachShader(m,c),t.attachShader(m,h),t.linkProgram(m);let u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);let p=t.getAttribLocation(m,"position");t.enableVertexAttribArray(p),t.vertexAttribPointer(p,2,t.FLOAT,!1,0,0);let b={u_resolution:t.getUniformLocation(m,"u_resolution"),u_box_size:t.getUniformLocation(m,"u_box_size"),u_radius:t.getUniformLocation(m,"u_radius"),u_rot:t.getUniformLocation(m,"u_rot"),u_zoom:t.getUniformLocation(m,"u_zoom"),u_mode:t.getUniformLocation(m,"u_mode"),u_invert:t.getUniformLocation(m,"u_invert"),u_show_front:t.getUniformLocation(m,"u_show_front"),u_show_back:t.getUniformLocation(m,"u_show_back"),u_front_width:t.getUniformLocation(m,"u_front_width"),u_back_width:t.getUniformLocation(m,"u_back_width"),u_front_dashed:t.getUniformLocation(m,"u_front_dashed"),u_back_dashed:t.getUniformLocation(m,"u_back_dashed"),u_front_color:t.getUniformLocation(m,"u_front_color"),u_back_color:t.getUniformLocation(m,"u_back_color")};return{gl:t,overlayCtx:l,canvasGL:s,canvasOverlay:e,width:n,height:n,program:m,uniforms:b}}var _o=[{edge:[0,1],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{edge:[1,4],normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{edge:[4,2],normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{edge:[2,0],normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{edge:[3,5],normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{edge:[5,7],normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{edge:[7,6],normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{edge:[6,3],normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{edge:[0,3],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[1,5],normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{edge:[4,7],normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{edge:[2,6],normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}];function Fo(o,n,r,i,s,e){if(!e.showFront&&!e.showBack)return;let t=h=>X(h,n,r,i,s),d=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:1,z:0},{x:1,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}].map(t),c=h=>{let m=j({x:.5,y:.5,z:.5},i,s);return j({x:.5+h.x*.1,y:.5+h.y*.1,z:.5+h.z*.1},i,s).z-m.z>0};if(o.save(),e.showBack){o.lineWidth=e.backWidth,e.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=e.backColor,o.globalAlpha=e.backOpacity;for(let h of _o)if(!(c(h.normalA)||c(h.normalB))){let[u,p]=h.edge;o.beginPath(),o.moveTo(d[u].x,d[u].y),o.lineTo(d[p].x,d[p].y),o.stroke()}}if(e.showFront){o.lineWidth=e.frontWidth,e.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=e.frontColor,o.globalAlpha=e.frontOpacity;for(let h of _o)if(c(h.normalA)||c(h.normalB)){let[u,p]=h.edge;o.beginPath(),o.moveTo(d[u].x,d[u].y),o.lineTo(d[p].x,d[p].y),o.stroke()}}o.restore()}function Lo(o,n,r,i,s,e,t,l,d){let{gl:c,overlayCtx:h,width:m,height:u,program:p,uniforms:b}=o,M=window.devicePixelRatio||1;c.viewport(0,0,m*M,u*M),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.useProgram(p),c.uniform2f(b.u_resolution,m*M,u*M),c.uniform3f(b.u_box_size,r.sizeX,r.sizeY,r.sizeZ),c.uniform1f(b.u_radius,r.radius!==void 0?r.radius:.001),c.uniform3f(b.u_rot,n.rotXRad,n.rotYRad,n.rotZRad),c.uniform1f(b.u_zoom,n.zoom||1),c.uniform1i(b.u_mode,i==="rgb"?0:i==="hsb"?1:2),c.uniform1i(b.u_invert,s?1:0),c.uniform1i(b.u_show_front,t.showFront?1:0),c.uniform1i(b.u_show_back,t.showBack?1:0),c.uniform1f(b.u_front_width,t.frontWidth||1.5),c.uniform1f(b.u_back_width,t.backWidth||1),c.uniform1i(b.u_front_dashed,t.frontDashed?1:0),c.uniform1i(b.u_back_dashed,t.backDashed?1:0),c.uniform4f(b.u_front_color,1,1,1,t.frontOpacity||.65),c.uniform4f(b.u_back_color,1,1,1,t.backOpacity||.25),c.drawArrays(c.TRIANGLES,0,6),h.save(),h.clearRect(0,0,m,u);let _=m*.26,y={x:m*.5,y:u*.5};if(Fo(h,_,y,n,r,t),Co(h,_,y,n,r,e),d){let x=X(l,_,y,n,r),g=U(l,i),z=s?{r:255-g.r,g:255-g.g,b:255-g.b}:g;h.beginPath(),h.arc(x.x,x.y,6,0,Math.PI*2),h.fillStyle=`rgb(${z.r}, ${z.g}, ${z.b})`,h.fill(),h.strokeStyle="#ffffff",h.lineWidth=2,h.stroke()}h.restore()}function Vo(o,n={}){let r=n.size||460,i=n.mode||"rgb",s=!1,e={...go},t={...xo,radius:.08},l={...yo},d={...bo},c=n.initialColor||{r:255,g:255,b:255},h=co(c,i),m=new Set,u=Ro(o,r),p=null,b=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,Lo(u,e,t,i,s,l,d,h,!0)}))},M=()=>{let a=U(h,i),f=s?{r:255-a.r,g:255-a.g,b:255-a.b}:a,v=K(f),T=Q(f),P=so(f),F={rgb:f,hsb:v,oklch:T,hex:P,alpha:1};m.forEach(V=>V(F))},_=!1,y=!1,x=!1,g=!1,z=0,L=0,C=e.rotZRad,E=e.rotXRad,H=(a,f)=>{if(!l.angleGuides&&!l.yawArc&&!l.pitchArc)return null;let v=u.canvasGL.getBoundingClientRect(),T=(a-v.left)*(u.width/v.width),P=(f-v.top)*(u.height/v.height),F=u.width*.26,V={x:u.width*.5,y:u.height*.5},O=k=>X(k,F,V,e,t),Z=36;for(let k=0;k<Z;k++){let B=k/Z*Math.PI*2,Y={x:.5+Math.cos(B)*.75,y:.5+Math.sin(B)*.75,z:0},w=O(Y);if(Math.hypot(T-w.x,P-w.y)<14)return"yaw"}let D=24;for(let k=0;k<=D;k++){let B=-Math.PI/2+k/D*Math.PI,Y={x:.5+Math.cos(B)*.75,y:.5,z:.5+Math.sin(B)*.75},w=O(Y);if(Math.hypot(T-w.x,P-w.y)<14)return"pitch"}return null},W=(a,f)=>{let v=u.canvasGL.getBoundingClientRect(),T=(a-v.left)*(u.width/v.width),P=(f-v.top)*(u.height/v.height),F=T-u.width*.5,V=u.height*.5-P,O=u.width*.26*1.6*(e.zoom||1),Z={x:F/O,y:V/O},D={x:t.sizeX*.5,y:t.sizeY*.5,z:t.sizeZ*.5},k=Math.min(Math.min(D.x,D.y),D.z),B=Math.min(t.radius||.001,k*.49),Y=Math.cos(e.rotXRad),w=Math.sin(e.rotXRad),lo=Math.cos(e.rotYRad),mo=Math.sin(e.rotYRad),uo=Math.cos(e.rotZRad),fo=Math.sin(e.rotZRad),ko=R=>{let G=R.x*uo+R.y*fo,A=-R.x*fo+R.y*uo,S=R.z,oo=G*lo+S*mo,$=A,q=-G*mo+S*lo,eo=oo,to=$*Y+q*w,Do=-$*w+q*Y;return{x:eo,y:to,z:Do}},Bo=R=>{let G=Math.abs(R.x)-(D.x-B),A=Math.abs(R.y)-(D.y-B),S=Math.abs(R.z)-(D.z-B),oo=Math.max(G,0),$=Math.max(A,0),q=Math.max(S,0),eo=Math.hypot(oo,$,q),to=Math.min(Math.max(G,Math.max(A,S)),0);return eo+to-B},J=0,ho=!1,N={x:0,y:0,z:0};for(let R=0;R<96;R++){let G={x:Z.x,y:Z.y,z:-5+J},A=ko(G),S=Bo(A);if(S<.001){ho=!0,N=A;break}if(J+=S,J>10)break}if(ho){let R=Math.max(0,Math.min(1,N.x/t.sizeX+.5)),G=Math.max(0,Math.min(1,N.y/t.sizeY+.5)),A=Math.max(0,Math.min(1,N.z/t.sizeZ+.5));h={x:R,y:G,z:A},M(),b()}};return u.canvasGL.addEventListener("mousedown",a=>{if(a.button===1||a.button===0&&a.altKey)_=!0,z=a.clientX,L=a.clientY,C=e.rotZRad,E=e.rotXRad,document.body.style.cursor="grabbing",a.preventDefault();else if(a.button===0){let f=H(a.clientX,a.clientY);f==="yaw"?(x=!0,z=a.clientX,C=e.rotZRad,document.body.style.cursor="ew-resize"):f==="pitch"?(g=!0,L=a.clientY,E=e.rotXRad,document.body.style.cursor="ns-resize"):(y=!0,W(a.clientX,a.clientY))}}),u.canvasGL.addEventListener("mousemove",a=>{if(!_&&!y&&!x&&!g){let f=H(a.clientX,a.clientY);f==="yaw"?u.canvasGL.style.cursor="ew-resize":f==="pitch"?u.canvasGL.style.cursor="ns-resize":u.canvasGL.style.cursor="default"}}),u.canvasGL.addEventListener("auxclick",a=>{a.button===1&&a.preventDefault()}),window.addEventListener("mousemove",a=>{if(_){let f=a.clientX-z,v=a.clientY-L;e.rotZRad=C+f*.01,e.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,E-v*.01)),b()}else if(x){let f=a.clientX-z;e.rotZRad=C+f*.015,b()}else if(g){let f=a.clientY-L;e.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,E-f*.015)),b()}else y&&W(a.clientX,a.clientY)}),window.addEventListener("mouseup",()=>{(_||x||g)&&(_=!1,x=!1,g=!1,document.body.style.cursor="default"),y&&(y=!1)}),u.canvasGL.addEventListener("wheel",a=>{a.preventDefault();let f=a.deltaY<0?.08:-.08;e.zoom=Math.max(.2,Math.min(2.5,(e.zoom||1)+f)),b()},{passive:!1}),u.canvasGL.addEventListener("dblclick",()=>{s=!s,M(),b()}),b(),M(),{getColor:()=>{let a=U(h,i),f=s?{r:255-a.r,g:255-a.g,b:255-a.b}:a;return{rgb:f,hsb:K(f),oklch:Q(f),hex:so(f),alpha:1}},setColor:a=>{c=a,h=co(a,i),M(),b()},setMode:a=>{i=a,M(),b()},getMode:()=>i,setRotation:(a,f)=>{e.rotZRad=a*Math.PI/180,e.rotXRad=f*Math.PI/180,b()},getAxisRotation:()=>({rotXDeg:Math.round(e.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(e.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(e.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(a,f,v)=>{e.rotXRad=a*Math.PI/180,e.rotYRad=f*Math.PI/180,e.rotZRad=v*Math.PI/180,b()},setZoom:a=>{e.zoom=Math.max(.1,Math.min(3,a)),b()},getZoom:()=>e.zoom||1,setDimensions:(a,f,v)=>{t.sizeX=Math.max(.2,Math.min(2.5,a)),t.sizeY=Math.max(.2,Math.min(2.5,f)),t.sizeZ=Math.max(.2,Math.min(2.5,v)),b()},getDimensions:()=>({sizeX:t.sizeX,sizeY:t.sizeY,sizeZ:t.sizeZ}),setRadius:a=>{t.radius=Math.max(0,Math.min(.5,a)),b()},getRadius:()=>t.radius,getEdgeStyle:()=>({...d}),setEdgeStyle:a=>{d={...d,...a},b()},getGuides:()=>({...l}),setGuides:a=>{l={...l,...a},b()},toggleAllGuides:a=>{let f=a!==void 0?a:!l.vertexX;l={vertexX:f,vertexY:f,vertexZ:f,centerX:f,centerY:f,centerZ:f,angleGuides:f},b()},on:(a,f)=>{m.add(f)},off:(a,f)=>{m.delete(f)},destroy:()=>{p!==null&&cancelAnimationFrame(p),o.innerHTML=""}}}return Xo(Oo);})();
