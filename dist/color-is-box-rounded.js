var lo={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},mo={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var uo={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},fo={sizeX:1,sizeY:1,sizeZ:1,radius:0};function F(o,n,i){let s=(o.x-.5)*i.sizeX,l=(o.y-.5)*i.sizeY,t=(o.z-.5)*i.sizeZ,e=Math.cos(n.rotXRad),m=Math.sin(n.rotXRad),u=s,a=l*e-t*m,d=l*m+t*e,y=Math.cos(n.rotYRad),g=Math.sin(n.rotYRad),M=u*y+d*g,r=a,h=-u*g+d*y,p=Math.cos(n.rotZRad),f=Math.sin(n.rotZRad),x=M*p-r*f,z=M*f+r*p;return{x,y:z,z:h}}function S(o,n,i,s,l){let t=F(o,s,l);return{x:i.x+t.x*n*1.6*s.zoom,y:i.y-t.y*n*1.6*s.zoom}}function V(o){let n=o.r/255,i=o.g/255,s=o.b/255,l=Math.max(n,i,s),t=Math.min(n,i,s),e=l-t,m=0;e!==0&&(l===n?m=((i-s)/e+6)%6:l===i?m=(s-n)/e+2:m=(n-i)/e+4,m*=60);let u=l===0?0:e/l*100,a=l*100;return{h:m,s:u,b:a}}function Ro(o){let n=o.h,i=o.s/100,s=o.b/100,l=s*i,t=l*(1-Math.abs(n/60%2-1)),e=s-l,m,u,a;return n<60?(m=l,u=t,a=0):n<120?(m=t,u=l,a=0):n<180?(m=0,u=l,a=t):n<240?(m=0,u=t,a=l):n<300?(m=t,u=0,a=l):(m=l,u=0,a=t),{r:Math.round((m+e)*255),g:Math.round((u+e)*255),b:Math.round((a+e)*255)}}function q(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function K(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function Bo(o){let n=q(o.r/255),i=q(o.g/255),s=q(o.b/255),l=.4122214708*n+.5363325363*i+.0514459929*s,t=.2119034982*n+.6806995451*i+.1073969566*s,e=.0883024619*n+.2817188376*i+.6299787005*s,m=Math.cbrt(l),u=Math.cbrt(t),a=Math.cbrt(e);return{L:.2104542553*m+.793617785*u-.0040720468*a,a:1.9779984951*m-2.428592205*u+.4505937099*a,b:.0259040371*m+.7827717662*u-.808675766*a}}function Ao(o,n,i){let s=o+.3963377774*n+.2158037573*i,l=o-.1055613458*n-.0638541728*i,t=o-.0894841775*n-1.291485548*i,e=s*s*s,m=l*l*l,u=t*t*t,a=4.0767416621*e-3.3077115913*m+.2309699292*u,d=-1.2684380046*e+2.6097574011*m-.3413193965*u,y=-.0041960863*e-.7034186147*m+1.707614701*u;return{r:Math.round(Math.max(0,Math.min(1,K(a)))*255),g:Math.round(Math.max(0,Math.min(1,K(d)))*255),b:Math.round(Math.max(0,Math.min(1,K(y)))*255)}}function Y(o){let n=Bo(o),i=Math.sqrt(n.a*n.a+n.b*n.b),s=Math.atan2(n.b,n.a)*(180/Math.PI);return s<0&&(s+=360),{l:n.L,c:i,h:i<1e-4?0:s}}function j(o){let n=o.h*(Math.PI/180),i=o.c*Math.cos(n),s=o.c*Math.sin(n);return Ao(o.l,i,s)}function ko(o,n,i){let s=j({l:o,c:n,h:i});if(yo(s))return{l:o,c:n,h:i};let l=0,t=n;for(let e=0;e<20;e++){let m=(l+t)/2;s=j({l:o,c:m,h:i}),yo(s)?l=m:t=m}return{l:o,c:l,h:i}}function yo(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function Q(o){let n=i=>Math.max(0,Math.min(255,Math.round(i))).toString(16).padStart(2,"0");return`#${n(o.r)}${n(o.g)}${n(o.b)}`}var ho=.4;function E(o,n){if(n==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(n==="hsb")return Ro({h:o.x*359,s:o.y*100,b:o.z*100});{let i=o.x,s=o.y*ho,l=o.z*359,t=ko(i,s,l);return j(t)}}function J(o,n){if(n==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(n==="hsb"){let i=V(o);return{x:i.h/359,y:i.s/100,z:i.b/100}}else{let i=Y(o);return{x:i.l,y:Math.min(i.c/ho,1),z:i.h/359}}}var G=["#ef4444","#22c55e","#3b82f6"];function xo(o,n,i,s,l,t){let e=f=>S(f,n,i,s,l),m=e({x:0,y:0,z:0});o.save();let u=1.28,a=[{p:{x:u,y:0,z:0},name:"X",color:G[0],visible:t.vertexX},{p:{x:0,y:u,z:0},name:"Y",color:G[1],visible:t.vertexY},{p:{x:0,y:0,z:u},name:"Z",color:G[2],visible:t.vertexZ}];for(let f=0;f<a.length;f++){if(!a[f].visible)continue;let x=e(a[f].p),z=a[f].color;o.beginPath(),o.moveTo(m.x,m.y),o.lineTo(x.x,x.y),o.strokeStyle=z,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(x.x,x.y,3.5,0,Math.PI*2),o.fillStyle=z,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let C=x.x-m.x,B=x.y-m.y,v=Math.hypot(C,B)||1,c=12,b=x.x+C/v*c,_=x.y+B/v*c;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=z,o.fillText(a[f].name,b,_)}(t.vertexX||t.vertexY||t.vertexZ)&&(o.beginPath(),o.arc(m.x,m.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let d=e({x:.5,y:.5,z:.5}),y=.35,g=[{from:{x:-y,y:.5,z:.5},to:{x:1+y,y:.5,z:.5},color:G[0],name:"Cx",visible:t.centerX},{from:{x:.5,y:-y,z:.5},to:{x:.5,y:1+y,z:.5},color:G[1],name:"Cy",visible:t.centerY},{from:{x:.5,y:.5,z:-y},to:{x:.5,y:.5,z:1+y},color:G[2],name:"Cz",visible:t.centerZ}],M=!1;for(let f=0;f<g.length;f++){if(!g[f].visible)continue;M=!0;let x=e(g[f].from),z=e(g[f].to);o.beginPath(),o.moveTo(x.x,x.y),o.lineTo(z.x,z.y),o.strokeStyle=g[f].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(x.x,x.y,3,0,Math.PI*2),o.arc(z.x,z.y,3,0,Math.PI*2),o.fillStyle=g[f].color,o.fill()}M&&(o.beginPath(),o.arc(d.x,d.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let r=t.angleGuides!==void 0?t.angleGuides:t.yawArc||t.pitchArc||!1,h=Math.round(s.rotZRad*180/Math.PI*10)/10,p=Math.round(s.rotXRad*180/Math.PI*10)/10;if(r){o.beginPath();let f=36;for(let z=0;z<=f;z++){let C=z/f*Math.PI*2,B={x:.5+Math.cos(C)*.75,y:.5+Math.sin(C)*.75,z:0},v=e(B);z===0?o.moveTo(v.x,v.y):o.lineTo(v.x,v.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let x=20;for(let z=0;z<=x;z++){let C=-Math.PI/2+z/x*Math.PI,B={x:.5+Math.cos(C)*.75,y:.5,z:.5+Math.sin(C)*.75},v=e(B);z===0?o.moveTo(v.x,v.y):o.lineTo(v.x,v.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${h.toFixed(1)}\xB0`,12,i.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${p.toFixed(1)}\xB0`,12,i.y*2-10)}o.restore()}var bo=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,go=`
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
`;function zo(o,n){let i=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.userSelect="none";let l=document.createElement("canvas");l.width=n*i,l.height=n*i,l.style.width=`${n}px`,l.style.height=`${n}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let t=document.createElement("canvas");t.width=n*i,t.height=n*i,t.style.width=`${n}px`,t.style.height=`${n}px`,t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",s.appendChild(l),s.appendChild(t),o.appendChild(s);let e=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=t.getContext("2d");m.scale(i,i);let u=(h,p)=>{let f=e.createShader(h);return e.shaderSource(f,p),e.compileShader(f),e.getShaderParameter(f,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(f)),f},a=u(e.VERTEX_SHADER,bo),d=u(e.FRAGMENT_SHADER,go),y=e.createProgram();e.attachShader(y,a),e.attachShader(y,d),e.linkProgram(y);let g=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,g),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let M=e.getAttribLocation(y,"position");e.enableVertexAttribArray(M),e.vertexAttribPointer(M,2,e.FLOAT,!1,0,0);let r={u_resolution:e.getUniformLocation(y,"u_resolution"),u_box_size:e.getUniformLocation(y,"u_box_size"),u_radius:e.getUniformLocation(y,"u_radius"),u_rot:e.getUniformLocation(y,"u_rot"),u_zoom:e.getUniformLocation(y,"u_zoom"),u_mode:e.getUniformLocation(y,"u_mode"),u_invert:e.getUniformLocation(y,"u_invert"),u_show_front:e.getUniformLocation(y,"u_show_front"),u_show_back:e.getUniformLocation(y,"u_show_back"),u_front_width:e.getUniformLocation(y,"u_front_width"),u_back_width:e.getUniformLocation(y,"u_back_width"),u_front_dashed:e.getUniformLocation(y,"u_front_dashed"),u_back_dashed:e.getUniformLocation(y,"u_back_dashed"),u_front_color:e.getUniformLocation(y,"u_front_color"),u_back_color:e.getUniformLocation(y,"u_back_color")};return{gl:e,overlayCtx:m,canvasGL:l,canvasOverlay:t,width:n,height:n,program:y,uniforms:r}}function Lo(o,n,i,s,l,t){if(!t.showFront&&!t.showBack)return;let e=r=>S(r,n,i,s,l),m=Math.min(l.radius||0,.49),u=m,a=m,d=m,y=[{from:{x:u,y:0,z:0},to:{x:1-u,y:0,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:a,z:0},to:{x:1,y:1-a,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{from:{x:1-u,y:1,z:0},to:{x:u,y:1,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-a,z:0},to:{x:0,y:a,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{from:{x:u,y:0,z:1},to:{x:1-u,y:0,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:a,z:1},to:{x:1,y:1-a,z:1},normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{from:{x:1-u,y:1,z:1},to:{x:u,y:1,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-a,z:1},to:{x:0,y:a,z:1},normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{from:{x:0,y:0,z:d},to:{x:0,y:0,z:1-d},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:0,z:d},to:{x:1,y:0,z:1-d},normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:1,z:d},to:{x:1,y:1,z:1-d},normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1,z:d},to:{x:0,y:1,z:1-d},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}],g=[];if(m>.005){let r=[{c:{x:u,y:a,z:d},sign:{x:-1,y:-1,z:-1}},{c:{x:1-u,y:a,z:d},sign:{x:1,y:-1,z:-1}},{c:{x:u,y:1-a,z:d},sign:{x:-1,y:1,z:-1}},{c:{x:1-u,y:1-a,z:d},sign:{x:1,y:1,z:-1}},{c:{x:u,y:a,z:1-d},sign:{x:-1,y:-1,z:1}},{c:{x:1-u,y:a,z:1-d},sign:{x:1,y:-1,z:1}},{c:{x:u,y:1-a,z:1-d},sign:{x:-1,y:1,z:1}},{c:{x:1-u,y:1-a,z:1-d},sign:{x:1,y:1,z:1}}];for(let h of r)g.push({center:h.c,axisA:{x:h.sign.x*u,y:0,z:0},axisB:{x:0,y:h.sign.y*a,z:0},normalA:{x:h.sign.x,y:0,z:0},normalB:{x:0,y:h.sign.y,z:0}}),g.push({center:h.c,axisA:{x:h.sign.x*u,y:0,z:0},axisB:{x:0,y:0,z:h.sign.z*d},normalA:{x:h.sign.x,y:0,z:0},normalB:{x:0,y:0,z:h.sign.z}}),g.push({center:h.c,axisA:{x:0,y:h.sign.y*a,z:0},axisB:{x:0,y:0,z:h.sign.z*d},normalA:{x:0,y:h.sign.y,z:0},normalB:{x:0,y:0,z:h.sign.z}})}let M=r=>{let h=F({x:.5,y:.5,z:.5},s,l);return F({x:.5+r.x*.1,y:.5+r.y*.1,z:.5+r.z*.1},s,l).z-h.z>0};if(o.save(),t.showBack){o.lineWidth=t.backWidth,t.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=t.backColor,o.globalAlpha=t.backOpacity;for(let r of y)if(!(M(r.normalA)||M(r.normalB))){let p=e(r.from),f=e(r.to);o.beginPath(),o.moveTo(p.x,p.y),o.lineTo(f.x,f.y),o.stroke()}for(let r of g)if(!(M(r.normalA)||M(r.normalB))){o.beginPath();let p=8;for(let f=0;f<=p;f++){let x=f/p*(Math.PI*.5),z={x:r.center.x+r.axisA.x*Math.cos(x)+r.axisB.x*Math.sin(x),y:r.center.y+r.axisA.y*Math.cos(x)+r.axisB.y*Math.sin(x),z:r.center.z+r.axisA.z*Math.cos(x)+r.axisB.z*Math.sin(x)},C=e(z);f===0?o.moveTo(C.x,C.y):o.lineTo(C.x,C.y)}o.stroke()}}if(t.showFront){o.lineWidth=t.frontWidth,t.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=t.frontColor,o.globalAlpha=t.frontOpacity;for(let r of y)if(M(r.normalA)||M(r.normalB)){let p=e(r.from),f=e(r.to);o.beginPath(),o.moveTo(p.x,p.y),o.lineTo(f.x,f.y),o.stroke()}for(let r of g)if(M(r.normalA)||M(r.normalB)){o.beginPath();let p=8;for(let f=0;f<=p;f++){let x=f/p*(Math.PI*.5),z={x:r.center.x+r.axisA.x*Math.cos(x)+r.axisB.x*Math.sin(x),y:r.center.y+r.axisA.y*Math.cos(x)+r.axisB.y*Math.sin(x),z:r.center.z+r.axisA.z*Math.cos(x)+r.axisB.z*Math.sin(x)},C=e(z);f===0?o.moveTo(C.x,C.y):o.lineTo(C.x,C.y)}o.stroke()}}o.restore()}function po(o,n,i,s,l,t,e,m,u){let{gl:a,overlayCtx:d,width:y,height:g,program:M,uniforms:r}=o,h=window.devicePixelRatio||1;a.viewport(0,0,y*h,g*h),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(M),a.uniform2f(r.u_resolution,y*h,g*h),a.uniform3f(r.u_box_size,i.sizeX,i.sizeY,i.sizeZ),a.uniform1f(r.u_radius,i.radius!==void 0?i.radius:.001),a.uniform3f(r.u_rot,n.rotXRad,n.rotYRad,n.rotZRad),a.uniform1f(r.u_zoom,n.zoom||1),a.uniform1i(r.u_mode,s==="rgb"?0:s==="hsb"?1:2),a.uniform1i(r.u_invert,l?1:0),a.uniform1i(r.u_show_front,e.showFront?1:0),a.uniform1i(r.u_show_back,e.showBack?1:0),a.uniform1f(r.u_front_width,e.frontWidth||1.5),a.uniform1f(r.u_back_width,e.backWidth||1),a.uniform1i(r.u_front_dashed,e.frontDashed?1:0),a.uniform1i(r.u_back_dashed,e.backDashed?1:0),a.uniform4f(r.u_front_color,1,1,1,e.frontOpacity||.65),a.uniform4f(r.u_back_color,1,1,1,e.backOpacity||.25),a.drawArrays(a.TRIANGLES,0,6),d.save(),d.clearRect(0,0,y,g);let p=y*.26,f={x:y*.5,y:g*.5};if(Lo(d,p,f,n,i,e),xo(d,p,f,n,i,t),u){let x=S(m,p,f,n,i),z=E(m,s),C=l?{r:255-z.r,g:255-z.g,b:255-z.b}:z;d.beginPath(),d.arc(x.x,x.y,6,0,Math.PI*2),d.fillStyle=`rgb(${C.r}, ${C.g}, ${C.b})`,d.fill(),d.strokeStyle="#ffffff",d.lineWidth=2,d.stroke()}d.restore()}function re(o,n={}){let i=n.size||460,s=n.mode||"rgb",l=!1,t={...uo},e={...fo,radius:.08},m={...mo},u={...lo},a=n.initialColor||{r:255,g:255,b:255},d=J(a,s),y=new Set,g=zo(o,i),M=null,r=()=>{M===null&&(M=requestAnimationFrame(()=>{M=null,po(g,t,e,s,l,m,u,d,!0)}))},h=()=>{let c=E(d,s),b=l?{r:255-c.r,g:255-c.g,b:255-c.b}:c,_=V(b),I=Y(b),O=Q(b),Z={rgb:b,hsb:_,oklch:I,hex:O,alpha:1};y.forEach(U=>U(Z))},p=!1,f=!1,x=0,z=0,C=t.rotZRad,B=t.rotXRad,v=(c,b)=>{let _=g.canvasGL.getBoundingClientRect(),I=(c-_.left)*(g.width/_.width),O=(b-_.top)*(g.height/_.height),Z=I-g.width*.5,U=g.height*.5-O,oo=g.width*.26*1.6*(t.zoom||1),eo={x:Z/oo,y:U/oo},D={x:e.sizeX*.5,y:e.sizeY*.5,z:e.sizeZ*.5},Co=Math.min(Math.min(D.x,D.y),D.z),T=Math.min(e.radius||.001,Co*.49),to=Math.cos(t.rotXRad),no=Math.sin(t.rotXRad),ro=Math.cos(t.rotYRad),ao=Math.sin(t.rotYRad),io=Math.cos(t.rotZRad),so=Math.sin(t.rotZRad),Mo=R=>{let A=R.x*io+R.y*so,k=-R.x*so+R.y*io,L=R.z,W=A*ro-L*ao,X=k,w=A*ao+L*ro,N=W,$=X*to+w*no,_o=-X*no+w*to;return{x:N,y:$,z:_o}},vo=R=>{let A=Math.abs(R.x)-(D.x-T),k=Math.abs(R.y)-(D.y-T),L=Math.abs(R.z)-(D.z-T),W=Math.max(A,0),X=Math.max(k,0),w=Math.max(L,0),N=Math.hypot(W,X,w),$=Math.min(Math.max(A,Math.max(k,L)),0);return N+$-T},H=0,co=!1,P={x:0,y:0,z:0};for(let R=0;R<96;R++){let A={x:eo.x,y:eo.y,z:-5+H},k=Mo(A),L=vo(k);if(L<.001){co=!0,P=k;break}if(H+=L,H>10)break}if(co){let R=Math.max(0,Math.min(1,P.x/e.sizeX+.5)),A=Math.max(0,Math.min(1,P.y/e.sizeY+.5)),k=Math.max(0,Math.min(1,P.z/e.sizeZ+.5));d={x:R,y:A,z:k},h(),r()}};return g.canvasGL.addEventListener("mousedown",c=>{c.button===1||c.button===0&&c.altKey?(p=!0,x=c.clientX,z=c.clientY,C=t.rotZRad,B=t.rotXRad,document.body.style.cursor="grabbing",c.preventDefault()):c.button===0&&(f=!0,v(c.clientX,c.clientY))}),g.canvasGL.addEventListener("auxclick",c=>{c.button===1&&c.preventDefault()}),window.addEventListener("mousemove",c=>{if(p){let b=c.clientX-x,_=c.clientY-z;t.rotZRad=C+b*.01,t.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,B-_*.01)),r()}else f&&v(c.clientX,c.clientY)}),window.addEventListener("mouseup",c=>{p&&(p=!1,document.body.style.cursor="default"),f&&(f=!1)}),g.canvasGL.addEventListener("wheel",c=>{c.preventDefault();let b=c.deltaY<0?.08:-.08;t.zoom=Math.max(.2,Math.min(2.5,(t.zoom||1)+b)),r()},{passive:!1}),g.canvasGL.addEventListener("dblclick",()=>{l=!l,h(),r()}),r(),h(),{getColor:()=>{let c=E(d,s),b=l?{r:255-c.r,g:255-c.g,b:255-c.b}:c;return{rgb:b,hsb:V(b),oklch:Y(b),hex:Q(b),alpha:1}},setColor:c=>{a=c,d=J(c,s),h(),r()},setMode:c=>{s=c,h(),r()},getMode:()=>s,setRotation:(c,b)=>{t.rotZRad=c*Math.PI/180,t.rotXRad=b*Math.PI/180,r()},getAxisRotation:()=>({rotXDeg:Math.round(t.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(t.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(t.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(c,b,_)=>{t.rotXRad=c*Math.PI/180,t.rotYRad=b*Math.PI/180,t.rotZRad=_*Math.PI/180,r()},setZoom:c=>{t.zoom=Math.max(.1,Math.min(3,c)),r()},getZoom:()=>t.zoom||1,setDimensions:(c,b,_)=>{e.sizeX=Math.max(.2,Math.min(2.5,c)),e.sizeY=Math.max(.2,Math.min(2.5,b)),e.sizeZ=Math.max(.2,Math.min(2.5,_)),r()},getDimensions:()=>({sizeX:e.sizeX,sizeY:e.sizeY,sizeZ:e.sizeZ}),setRadius:c=>{e.radius=Math.max(0,Math.min(.5,c)),r()},getRadius:()=>e.radius,getEdgeStyle:()=>({...u}),setEdgeStyle:c=>{u={...u,...c},r()},getGuides:()=>({...m}),setGuides:c=>{m={...m,...c},r()},toggleAllGuides:c=>{let b=c!==void 0?c:!m.vertexX;m={vertexX:b,vertexY:b,vertexZ:b,centerX:b,centerY:b,centerZ:b,angleGuides:b},r()},on:(c,b)=>{y.add(b)},off:(c,b)=>{y.delete(b)},destroy:()=>{M!==null&&cancelAnimationFrame(M),o.innerHTML=""}}}export{re as createRoundedBoxPicker};
