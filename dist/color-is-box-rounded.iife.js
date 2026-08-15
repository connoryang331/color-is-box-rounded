var ColorIsBoxRounded=(()=>{var q=Object.defineProperty;var Bo=Object.getOwnPropertyDescriptor;var Ao=Object.getOwnPropertyNames;var ko=Object.prototype.hasOwnProperty;var Lo=(o,t)=>{for(var a in t)q(o,a,{get:t[a],enumerable:!0})},Do=(o,t,a,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ao(t))!ko.call(o,s)&&s!==a&&q(o,s,{get:()=>t[s],enumerable:!(c=Bo(t,s))||c.enumerable});return o};var Go=o=>Do(q({},"__esModule",{value:!0}),o);var Fo={};Lo(Fo,{createRoundedBoxPicker:()=>wo});var mo={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},uo={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var fo={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},yo={sizeX:1,sizeY:1,sizeZ:1,radius:0};function F(o,t,a){let c=(o.x-.5)*a.sizeX,s=(o.y-.5)*a.sizeY,n=(o.z-.5)*a.sizeZ,e=Math.cos(t.rotXRad),m=Math.sin(t.rotXRad),u=c,i=s*e-n*m,d=s*m+n*e,y=Math.cos(t.rotYRad),g=Math.sin(t.rotYRad),M=u*y+d*g,r=i,h=-u*g+d*y,p=Math.cos(t.rotZRad),f=Math.sin(t.rotZRad),x=M*p-r*f,z=M*f+r*p;return{x,y:z,z:h}}function S(o,t,a,c,s){let n=F(o,c,s);return{x:a.x+n.x*t*1.6*c.zoom,y:a.y-n.y*t*1.6*c.zoom}}function V(o){let t=o.r/255,a=o.g/255,c=o.b/255,s=Math.max(t,a,c),n=Math.min(t,a,c),e=s-n,m=0;e!==0&&(s===t?m=((a-c)/e+6)%6:s===a?m=(c-t)/e+2:m=(t-a)/e+4,m*=60);let u=s===0?0:e/s*100,i=s*100;return{h:m,s:u,b:i}}function So(o){let t=o.h,a=o.s/100,c=o.b/100,s=c*a,n=s*(1-Math.abs(t/60%2-1)),e=c-s,m,u,i;return t<60?(m=s,u=n,i=0):t<120?(m=n,u=s,i=0):t<180?(m=0,u=s,i=n):t<240?(m=0,u=n,i=s):t<300?(m=n,u=0,i=s):(m=s,u=0,i=n),{r:Math.round((m+e)*255),g:Math.round((u+e)*255),b:Math.round((i+e)*255)}}function K(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function j(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function Eo(o){let t=K(o.r/255),a=K(o.g/255),c=K(o.b/255),s=.4122214708*t+.5363325363*a+.0514459929*c,n=.2119034982*t+.6806995451*a+.1073969566*c,e=.0883024619*t+.2817188376*a+.6299787005*c,m=Math.cbrt(s),u=Math.cbrt(n),i=Math.cbrt(e);return{L:.2104542553*m+.793617785*u-.0040720468*i,a:1.9779984951*m-2.428592205*u+.4505937099*i,b:.0259040371*m+.7827717662*u-.808675766*i}}function To(o,t,a){let c=o+.3963377774*t+.2158037573*a,s=o-.1055613458*t-.0638541728*a,n=o-.0894841775*t-1.291485548*a,e=c*c*c,m=s*s*s,u=n*n*n,i=4.0767416621*e-3.3077115913*m+.2309699292*u,d=-1.2684380046*e+2.6097574011*m-.3413193965*u,y=-.0041960863*e-.7034186147*m+1.707614701*u;return{r:Math.round(Math.max(0,Math.min(1,j(i)))*255),g:Math.round(Math.max(0,Math.min(1,j(d)))*255),b:Math.round(Math.max(0,Math.min(1,j(y)))*255)}}function Y(o){let t=Eo(o),a=Math.sqrt(t.a*t.a+t.b*t.b),c=Math.atan2(t.b,t.a)*(180/Math.PI);return c<0&&(c+=360),{l:t.L,c:a,h:a<1e-4?0:c}}function Q(o){let t=o.h*(Math.PI/180),a=o.c*Math.cos(t),c=o.c*Math.sin(t);return To(o.l,a,c)}function Po(o,t,a){let c=Q({l:o,c:t,h:a});if(ho(c))return{l:o,c:t,h:a};let s=0,n=t;for(let e=0;e<20;e++){let m=(s+n)/2;c=Q({l:o,c:m,h:a}),ho(c)?s=m:n=m}return{l:o,c:s,h:a}}function ho(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function J(o){let t=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${t(o.r)}${t(o.g)}${t(o.b)}`}var xo=.4;function E(o,t){if(t==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(t==="hsb")return So({h:o.x*359,s:o.y*100,b:o.z*100});{let a=o.x,c=o.y*xo,s=o.z*359,n=Po(a,c,s);return Q(n)}}function oo(o,t){if(t==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(t==="hsb"){let a=V(o);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=Y(o);return{x:a.l,y:Math.min(a.c/xo,1),z:a.h/359}}}var G=["#ef4444","#22c55e","#3b82f6"];function bo(o,t,a,c,s,n){let e=f=>S(f,t,a,c,s),m=e({x:0,y:0,z:0});o.save();let u=1.28,i=[{p:{x:u,y:0,z:0},name:"X",color:G[0],visible:n.vertexX},{p:{x:0,y:u,z:0},name:"Y",color:G[1],visible:n.vertexY},{p:{x:0,y:0,z:u},name:"Z",color:G[2],visible:n.vertexZ}];for(let f=0;f<i.length;f++){if(!i[f].visible)continue;let x=e(i[f].p),z=i[f].color;o.beginPath(),o.moveTo(m.x,m.y),o.lineTo(x.x,x.y),o.strokeStyle=z,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(x.x,x.y,3.5,0,Math.PI*2),o.fillStyle=z,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let C=x.x-m.x,B=x.y-m.y,v=Math.hypot(C,B)||1,l=12,b=x.x+C/v*l,_=x.y+B/v*l;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=z,o.fillText(i[f].name,b,_)}(n.vertexX||n.vertexY||n.vertexZ)&&(o.beginPath(),o.arc(m.x,m.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let d=e({x:.5,y:.5,z:.5}),y=.35,g=[{from:{x:-y,y:.5,z:.5},to:{x:1+y,y:.5,z:.5},color:G[0],name:"Cx",visible:n.centerX},{from:{x:.5,y:-y,z:.5},to:{x:.5,y:1+y,z:.5},color:G[1],name:"Cy",visible:n.centerY},{from:{x:.5,y:.5,z:-y},to:{x:.5,y:.5,z:1+y},color:G[2],name:"Cz",visible:n.centerZ}],M=!1;for(let f=0;f<g.length;f++){if(!g[f].visible)continue;M=!0;let x=e(g[f].from),z=e(g[f].to);o.beginPath(),o.moveTo(x.x,x.y),o.lineTo(z.x,z.y),o.strokeStyle=g[f].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(x.x,x.y,3,0,Math.PI*2),o.arc(z.x,z.y,3,0,Math.PI*2),o.fillStyle=g[f].color,o.fill()}M&&(o.beginPath(),o.arc(d.x,d.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let r=n.angleGuides!==void 0?n.angleGuides:n.yawArc||n.pitchArc||!1,h=Math.round(c.rotZRad*180/Math.PI*10)/10,p=Math.round(c.rotXRad*180/Math.PI*10)/10;if(r){o.beginPath();let f=36;for(let z=0;z<=f;z++){let C=z/f*Math.PI*2,B={x:.5+Math.cos(C)*.75,y:.5+Math.sin(C)*.75,z:0},v=e(B);z===0?o.moveTo(v.x,v.y):o.lineTo(v.x,v.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let x=20;for(let z=0;z<=x;z++){let C=-Math.PI/2+z/x*Math.PI,B={x:.5+Math.cos(C)*.75,y:.5,z:.5+Math.sin(C)*.75},v=e(B);z===0?o.moveTo(v.x,v.y):o.lineTo(v.x,v.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${h.toFixed(1)}\xB0`,12,a.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${p.toFixed(1)}\xB0`,12,a.y*2-10)}o.restore()}var go=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,zo=`
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
`;function po(o,t){let a=window.devicePixelRatio||1,c=document.createElement("div");c.style.position="relative",c.style.width=`${t}px`,c.style.height=`${t}px`,c.style.userSelect="none";let s=document.createElement("canvas");s.width=t*a,s.height=t*a,s.style.width=`${t}px`,s.style.height=`${t}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let n=document.createElement("canvas");n.width=t*a,n.height=t*a,n.style.width=`${t}px`,n.style.height=`${t}px`,n.style.position="absolute",n.style.left="0",n.style.top="0",n.style.pointerEvents="none",c.appendChild(s),c.appendChild(n),o.appendChild(c);let e=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=n.getContext("2d");m.scale(a,a);let u=(h,p)=>{let f=e.createShader(h);return e.shaderSource(f,p),e.compileShader(f),e.getShaderParameter(f,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(f)),f},i=u(e.VERTEX_SHADER,go),d=u(e.FRAGMENT_SHADER,zo),y=e.createProgram();e.attachShader(y,i),e.attachShader(y,d),e.linkProgram(y);let g=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,g),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let M=e.getAttribLocation(y,"position");e.enableVertexAttribArray(M),e.vertexAttribPointer(M,2,e.FLOAT,!1,0,0);let r={u_resolution:e.getUniformLocation(y,"u_resolution"),u_box_size:e.getUniformLocation(y,"u_box_size"),u_radius:e.getUniformLocation(y,"u_radius"),u_rot:e.getUniformLocation(y,"u_rot"),u_zoom:e.getUniformLocation(y,"u_zoom"),u_mode:e.getUniformLocation(y,"u_mode"),u_invert:e.getUniformLocation(y,"u_invert"),u_show_front:e.getUniformLocation(y,"u_show_front"),u_show_back:e.getUniformLocation(y,"u_show_back"),u_front_width:e.getUniformLocation(y,"u_front_width"),u_back_width:e.getUniformLocation(y,"u_back_width"),u_front_dashed:e.getUniformLocation(y,"u_front_dashed"),u_back_dashed:e.getUniformLocation(y,"u_back_dashed"),u_front_color:e.getUniformLocation(y,"u_front_color"),u_back_color:e.getUniformLocation(y,"u_back_color")};return{gl:e,overlayCtx:m,canvasGL:s,canvasOverlay:n,width:t,height:t,program:y,uniforms:r}}function Xo(o,t,a,c,s,n){if(!n.showFront&&!n.showBack)return;let e=r=>S(r,t,a,c,s),m=Math.min(s.radius||0,.49),u=m,i=m,d=m,y=[{from:{x:u,y:0,z:0},to:{x:1-u,y:0,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:i,z:0},to:{x:1,y:1-i,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{from:{x:1-u,y:1,z:0},to:{x:u,y:1,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-i,z:0},to:{x:0,y:i,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{from:{x:u,y:0,z:1},to:{x:1-u,y:0,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:i,z:1},to:{x:1,y:1-i,z:1},normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{from:{x:1-u,y:1,z:1},to:{x:u,y:1,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-i,z:1},to:{x:0,y:i,z:1},normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{from:{x:0,y:0,z:d},to:{x:0,y:0,z:1-d},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:0,z:d},to:{x:1,y:0,z:1-d},normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:1,z:d},to:{x:1,y:1,z:1-d},normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1,z:d},to:{x:0,y:1,z:1-d},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}],g=[];if(m>.005){let r=[{c:{x:u,y:i,z:d},sign:{x:-1,y:-1,z:-1}},{c:{x:1-u,y:i,z:d},sign:{x:1,y:-1,z:-1}},{c:{x:u,y:1-i,z:d},sign:{x:-1,y:1,z:-1}},{c:{x:1-u,y:1-i,z:d},sign:{x:1,y:1,z:-1}},{c:{x:u,y:i,z:1-d},sign:{x:-1,y:-1,z:1}},{c:{x:1-u,y:i,z:1-d},sign:{x:1,y:-1,z:1}},{c:{x:u,y:1-i,z:1-d},sign:{x:-1,y:1,z:1}},{c:{x:1-u,y:1-i,z:1-d},sign:{x:1,y:1,z:1}}];for(let h of r)g.push({center:h.c,axisA:{x:h.sign.x*u,y:0,z:0},axisB:{x:0,y:h.sign.y*i,z:0},normalA:{x:h.sign.x,y:0,z:0},normalB:{x:0,y:h.sign.y,z:0}}),g.push({center:h.c,axisA:{x:h.sign.x*u,y:0,z:0},axisB:{x:0,y:0,z:h.sign.z*d},normalA:{x:h.sign.x,y:0,z:0},normalB:{x:0,y:0,z:h.sign.z}}),g.push({center:h.c,axisA:{x:0,y:h.sign.y*i,z:0},axisB:{x:0,y:0,z:h.sign.z*d},normalA:{x:0,y:h.sign.y,z:0},normalB:{x:0,y:0,z:h.sign.z}})}let M=r=>{let h=F({x:.5,y:.5,z:.5},c,s);return F({x:.5+r.x*.1,y:.5+r.y*.1,z:.5+r.z*.1},c,s).z-h.z>0};if(o.save(),n.showBack){o.lineWidth=n.backWidth,n.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=n.backColor,o.globalAlpha=n.backOpacity;for(let r of y)if(!(M(r.normalA)||M(r.normalB))){let p=e(r.from),f=e(r.to);o.beginPath(),o.moveTo(p.x,p.y),o.lineTo(f.x,f.y),o.stroke()}for(let r of g)if(!(M(r.normalA)||M(r.normalB))){o.beginPath();let p=8;for(let f=0;f<=p;f++){let x=f/p*(Math.PI*.5),z={x:r.center.x+r.axisA.x*Math.cos(x)+r.axisB.x*Math.sin(x),y:r.center.y+r.axisA.y*Math.cos(x)+r.axisB.y*Math.sin(x),z:r.center.z+r.axisA.z*Math.cos(x)+r.axisB.z*Math.sin(x)},C=e(z);f===0?o.moveTo(C.x,C.y):o.lineTo(C.x,C.y)}o.stroke()}}if(n.showFront){o.lineWidth=n.frontWidth,n.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=n.frontColor,o.globalAlpha=n.frontOpacity;for(let r of y)if(M(r.normalA)||M(r.normalB)){let p=e(r.from),f=e(r.to);o.beginPath(),o.moveTo(p.x,p.y),o.lineTo(f.x,f.y),o.stroke()}for(let r of g)if(M(r.normalA)||M(r.normalB)){o.beginPath();let p=8;for(let f=0;f<=p;f++){let x=f/p*(Math.PI*.5),z={x:r.center.x+r.axisA.x*Math.cos(x)+r.axisB.x*Math.sin(x),y:r.center.y+r.axisA.y*Math.cos(x)+r.axisB.y*Math.sin(x),z:r.center.z+r.axisA.z*Math.cos(x)+r.axisB.z*Math.sin(x)},C=e(z);f===0?o.moveTo(C.x,C.y):o.lineTo(C.x,C.y)}o.stroke()}}o.restore()}function Co(o,t,a,c,s,n,e,m,u){let{gl:i,overlayCtx:d,width:y,height:g,program:M,uniforms:r}=o,h=window.devicePixelRatio||1;i.viewport(0,0,y*h,g*h),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.useProgram(M),i.uniform2f(r.u_resolution,y*h,g*h),i.uniform3f(r.u_box_size,a.sizeX,a.sizeY,a.sizeZ),i.uniform1f(r.u_radius,a.radius!==void 0?a.radius:.001),i.uniform3f(r.u_rot,t.rotXRad,t.rotYRad,t.rotZRad),i.uniform1f(r.u_zoom,t.zoom||1),i.uniform1i(r.u_mode,c==="rgb"?0:c==="hsb"?1:2),i.uniform1i(r.u_invert,s?1:0),i.uniform1i(r.u_show_front,e.showFront?1:0),i.uniform1i(r.u_show_back,e.showBack?1:0),i.uniform1f(r.u_front_width,e.frontWidth||1.5),i.uniform1f(r.u_back_width,e.backWidth||1),i.uniform1i(r.u_front_dashed,e.frontDashed?1:0),i.uniform1i(r.u_back_dashed,e.backDashed?1:0),i.uniform4f(r.u_front_color,1,1,1,e.frontOpacity||.65),i.uniform4f(r.u_back_color,1,1,1,e.backOpacity||.25),i.drawArrays(i.TRIANGLES,0,6),d.save(),d.clearRect(0,0,y,g);let p=y*.26,f={x:y*.5,y:g*.5};if(Xo(d,p,f,t,a,e),bo(d,p,f,t,a,n),u){let x=S(m,p,f,t,a),z=E(m,c),C=s?{r:255-z.r,g:255-z.g,b:255-z.b}:z;d.beginPath(),d.arc(x.x,x.y,6,0,Math.PI*2),d.fillStyle=`rgb(${C.r}, ${C.g}, ${C.b})`,d.fill(),d.strokeStyle="#ffffff",d.lineWidth=2,d.stroke()}d.restore()}function wo(o,t={}){let a=t.size||460,c=t.mode||"rgb",s=!1,n={...fo},e={...yo,radius:.08},m={...uo},u={...mo},i=t.initialColor||{r:255,g:255,b:255},d=oo(i,c),y=new Set,g=po(o,a),M=null,r=()=>{M===null&&(M=requestAnimationFrame(()=>{M=null,Co(g,n,e,c,s,m,u,d,!0)}))},h=()=>{let l=E(d,c),b=s?{r:255-l.r,g:255-l.g,b:255-l.b}:l,_=V(b),I=Y(b),O=J(b),Z={rgb:b,hsb:_,oklch:I,hex:O,alpha:1};y.forEach(U=>U(Z))},p=!1,f=!1,x=0,z=0,C=n.rotZRad,B=n.rotXRad,v=(l,b)=>{let _=g.canvasGL.getBoundingClientRect(),I=(l-_.left)*(g.width/_.width),O=(b-_.top)*(g.height/_.height),Z=I-g.width*.5,U=g.height*.5-O,eo=g.width*.26*1.6*(n.zoom||1),to={x:Z/eo,y:U/eo},D={x:e.sizeX*.5,y:e.sizeY*.5,z:e.sizeZ*.5},Mo=Math.min(Math.min(D.x,D.y),D.z),T=Math.min(e.radius||.001,Mo*.49),no=Math.cos(n.rotXRad),ro=Math.sin(n.rotXRad),ao=Math.cos(n.rotYRad),io=Math.sin(n.rotYRad),so=Math.cos(n.rotZRad),co=Math.sin(n.rotZRad),vo=R=>{let A=R.x*so+R.y*co,k=-R.x*co+R.y*so,L=R.z,W=A*ao-L*io,X=k,w=A*io+L*ao,N=W,$=X*no+w*ro,Ro=-X*ro+w*no;return{x:N,y:$,z:Ro}},_o=R=>{let A=Math.abs(R.x)-(D.x-T),k=Math.abs(R.y)-(D.y-T),L=Math.abs(R.z)-(D.z-T),W=Math.max(A,0),X=Math.max(k,0),w=Math.max(L,0),N=Math.hypot(W,X,w),$=Math.min(Math.max(A,Math.max(k,L)),0);return N+$-T},H=0,lo=!1,P={x:0,y:0,z:0};for(let R=0;R<96;R++){let A={x:to.x,y:to.y,z:-5+H},k=vo(A),L=_o(k);if(L<.001){lo=!0,P=k;break}if(H+=L,H>10)break}if(lo){let R=Math.max(0,Math.min(1,P.x/e.sizeX+.5)),A=Math.max(0,Math.min(1,P.y/e.sizeY+.5)),k=Math.max(0,Math.min(1,P.z/e.sizeZ+.5));d={x:R,y:A,z:k},h(),r()}};return g.canvasGL.addEventListener("mousedown",l=>{l.button===1||l.button===0&&l.altKey?(p=!0,x=l.clientX,z=l.clientY,C=n.rotZRad,B=n.rotXRad,document.body.style.cursor="grabbing",l.preventDefault()):l.button===0&&(f=!0,v(l.clientX,l.clientY))}),g.canvasGL.addEventListener("auxclick",l=>{l.button===1&&l.preventDefault()}),window.addEventListener("mousemove",l=>{if(p){let b=l.clientX-x,_=l.clientY-z;n.rotZRad=C+b*.01,n.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,B-_*.01)),r()}else f&&v(l.clientX,l.clientY)}),window.addEventListener("mouseup",l=>{p&&(p=!1,document.body.style.cursor="default"),f&&(f=!1)}),g.canvasGL.addEventListener("wheel",l=>{l.preventDefault();let b=l.deltaY<0?.08:-.08;n.zoom=Math.max(.2,Math.min(2.5,(n.zoom||1)+b)),r()},{passive:!1}),g.canvasGL.addEventListener("dblclick",()=>{s=!s,h(),r()}),r(),h(),{getColor:()=>{let l=E(d,c),b=s?{r:255-l.r,g:255-l.g,b:255-l.b}:l;return{rgb:b,hsb:V(b),oklch:Y(b),hex:J(b),alpha:1}},setColor:l=>{i=l,d=oo(l,c),h(),r()},setMode:l=>{c=l,h(),r()},getMode:()=>c,setRotation:(l,b)=>{n.rotZRad=l*Math.PI/180,n.rotXRad=b*Math.PI/180,r()},getAxisRotation:()=>({rotXDeg:Math.round(n.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(n.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(n.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(l,b,_)=>{n.rotXRad=l*Math.PI/180,n.rotYRad=b*Math.PI/180,n.rotZRad=_*Math.PI/180,r()},setZoom:l=>{n.zoom=Math.max(.1,Math.min(3,l)),r()},getZoom:()=>n.zoom||1,setDimensions:(l,b,_)=>{e.sizeX=Math.max(.2,Math.min(2.5,l)),e.sizeY=Math.max(.2,Math.min(2.5,b)),e.sizeZ=Math.max(.2,Math.min(2.5,_)),r()},getDimensions:()=>({sizeX:e.sizeX,sizeY:e.sizeY,sizeZ:e.sizeZ}),setRadius:l=>{e.radius=Math.max(0,Math.min(.5,l)),r()},getRadius:()=>e.radius,getEdgeStyle:()=>({...u}),setEdgeStyle:l=>{u={...u,...l},r()},getGuides:()=>({...m}),setGuides:l=>{m={...m,...l},r()},toggleAllGuides:l=>{let b=l!==void 0?l:!m.vertexX;m={vertexX:b,vertexY:b,vertexZ:b,centerX:b,centerY:b,centerZ:b,angleGuides:b},r()},on:(l,b)=>{y.add(b)},off:(l,b)=>{y.delete(b)},destroy:()=>{M!==null&&cancelAnimationFrame(M),o.innerHTML=""}}}return Go(Fo);})();
