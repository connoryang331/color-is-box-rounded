var ColorIsBoxRounded=(()=>{var E=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var J=Object.prototype.hasOwnProperty;var oo=(o,t)=>{for(var a in t)E(o,a,{get:t[a],enumerable:!0})},eo=(o,t,a,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Q(t))!J.call(o,l)&&l!==a&&E(o,l,{get:()=>t[l],enumerable:!(s=K(t,l))||s.enumerable});return o};var to=o=>eo(E({},"__esModule",{value:!0}),o);var co={};oo(co,{createRoundedBoxPicker:()=>lo});var X={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},I={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var V={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},Y={sizeX:1,sizeY:1,sizeZ:1,radius:0};function A(o,t,a){let s=(o.x-.5)*a.sizeX,l=(o.y-.5)*a.sizeY,r=(o.z-.5)*a.sizeZ,e=Math.cos(t.rotZRad),c=Math.sin(t.rotZRad),m=s*e-l*c,i=s*c+l*e,u=r,y=Math.cos(t.rotYRad),C=Math.sin(t.rotYRad),_=m*y+u*C,n=i,x=-m*C+u*y,z=Math.cos(t.rotXRad),f=Math.sin(t.rotXRad),b=_,g=x*z-n*f,p=x*f+n*z;return{x:b,y:g,z:p}}function R(o,t,a,s,l){let r=A(o,s,l);return{x:a.x+r.x*t*1.6*s.zoom,y:a.y-r.y*t*1.6*s.zoom}}function D(o){let t=o.r/255,a=o.g/255,s=o.b/255,l=Math.max(t,a,s),r=Math.min(t,a,s),e=l-r,c=0;e!==0&&(l===t?c=((a-s)/e+6)%6:l===a?c=(s-t)/e+2:c=(t-a)/e+4,c*=60);let m=l===0?0:e/l*100,i=l*100;return{h:c,s:m,b:i}}function ro(o){let t=o.h,a=o.s/100,s=o.b/100,l=s*a,r=l*(1-Math.abs(t/60%2-1)),e=s-l,c,m,i;return t<60?(c=l,m=r,i=0):t<120?(c=r,m=l,i=0):t<180?(c=0,m=l,i=r):t<240?(c=0,m=r,i=l):t<300?(c=r,m=0,i=l):(c=l,m=0,i=r),{r:Math.round((c+e)*255),g:Math.round((m+e)*255),b:Math.round((i+e)*255)}}function G(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function T(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function no(o){let t=G(o.r/255),a=G(o.g/255),s=G(o.b/255),l=.4122214708*t+.5363325363*a+.0514459929*s,r=.2119034982*t+.6806995451*a+.1073969566*s,e=.0883024619*t+.2817188376*a+.6299787005*s,c=Math.cbrt(l),m=Math.cbrt(r),i=Math.cbrt(e);return{L:.2104542553*c+.793617785*m-.0040720468*i,a:1.9779984951*c-2.428592205*m+.4505937099*i,b:.0259040371*c+.7827717662*m-.808675766*i}}function ao(o,t,a){let s=o+.3963377774*t+.2158037573*a,l=o-.1055613458*t-.0638541728*a,r=o-.0894841775*t-1.291485548*a,e=s*s*s,c=l*l*l,m=r*r*r,i=4.0767416621*e-3.3077115913*c+.2309699292*m,u=-1.2684380046*e+2.6097574011*c-.3413193965*m,y=-.0041960863*e-.7034186147*c+1.707614701*m;return{r:Math.round(Math.max(0,Math.min(1,T(i)))*255),g:Math.round(Math.max(0,Math.min(1,T(u)))*255),b:Math.round(Math.max(0,Math.min(1,T(y)))*255)}}function k(o){let t=no(o),a=Math.sqrt(t.a*t.a+t.b*t.b),s=Math.atan2(t.b,t.a)*(180/Math.PI);return s<0&&(s+=360),{l:t.L,c:a,h:a<1e-4?0:s}}function P(o){let t=o.h*(Math.PI/180),a=o.c*Math.cos(t),s=o.c*Math.sin(t);return ao(o.l,a,s)}function io(o,t,a){let s=P({l:o,c:t,h:a});if(O(s))return{l:o,c:t,h:a};let l=0,r=t;for(let e=0;e<20;e++){let c=(l+r)/2;s=P({l:o,c,h:a}),O(s)?l=c:r=c}return{l:o,c:l,h:a}}function O(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function w(o){let t=a=>Math.max(0,Math.min(255,Math.round(a))).toString(16).padStart(2,"0");return`#${t(o.r)}${t(o.g)}${t(o.b)}`}var Z=.4;function B(o,t){if(t==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(t==="hsb")return ro({h:o.x*359,s:o.y*100,b:o.z*100});{let a=o.x,s=o.y*Z,l=o.z*359,r=io(a,s,l);return P(r)}}function F(o,t){if(t==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(t==="hsb"){let a=D(o);return{x:a.h/359,y:a.s/100,z:a.b/100}}else{let a=k(o);return{x:a.l,y:Math.min(a.c/Z,1),z:a.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function U(o,t,a,s,l,r){let e=f=>R(f,t,a,s,l),c=e({x:0,y:0,z:0});o.save();let m=1.28,i=[{p:{x:m,y:0,z:0},name:"X",color:M[0],visible:r.vertexX},{p:{x:0,y:m,z:0},name:"Y",color:M[1],visible:r.vertexY},{p:{x:0,y:0,z:m},name:"Z",color:M[2],visible:r.vertexZ}];for(let f=0;f<i.length;f++){if(!i[f].visible)continue;let b=e(i[f].p),g=i[f].color;o.beginPath(),o.moveTo(c.x,c.y),o.lineTo(b.x,b.y),o.strokeStyle=g,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(b.x,b.y,3.5,0,Math.PI*2),o.fillStyle=g,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let p=b.x-c.x,d=b.y-c.y,h=Math.hypot(p,d)||1,v=12,L=b.x+p/h*v,S=b.y+d/h*v;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=g,o.fillText(i[f].name,L,S)}(r.vertexX||r.vertexY||r.vertexZ)&&(o.beginPath(),o.arc(c.x,c.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let u=e({x:.5,y:.5,z:.5}),y=.35,C=[{from:{x:-y,y:.5,z:.5},to:{x:1+y,y:.5,z:.5},color:M[0],name:"Cx",visible:r.centerX},{from:{x:.5,y:-y,z:.5},to:{x:.5,y:1+y,z:.5},color:M[1],name:"Cy",visible:r.centerY},{from:{x:.5,y:.5,z:-y},to:{x:.5,y:.5,z:1+y},color:M[2],name:"Cz",visible:r.centerZ}],_=!1;for(let f=0;f<C.length;f++){if(!C[f].visible)continue;_=!0;let b=e(C[f].from),g=e(C[f].to);o.beginPath(),o.moveTo(b.x,b.y),o.lineTo(g.x,g.y),o.strokeStyle=C[f].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(b.x,b.y,3,0,Math.PI*2),o.arc(g.x,g.y,3,0,Math.PI*2),o.fillStyle=C[f].color,o.fill()}_&&(o.beginPath(),o.arc(u.x,u.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let n=r.angleGuides!==void 0?r.angleGuides:r.yawArc||r.pitchArc||!1,x=Math.round(s.rotZRad*180/Math.PI*10)/10,z=Math.round(s.rotXRad*180/Math.PI*10)/10;if(n){o.beginPath();let f=36;for(let g=0;g<=f;g++){let p=g/f*Math.PI*2,d={x:.5+Math.cos(p)*.75,y:.5+Math.sin(p)*.75,z:0},h=e(d);g===0?o.moveTo(h.x,h.y):o.lineTo(h.x,h.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let b=20;for(let g=0;g<=b;g++){let p=-Math.PI/2+g/b*Math.PI,d={x:.5+Math.cos(p)*.75,y:.5,z:.5+Math.sin(p)*.75},h=e(d);g===0?o.moveTo(h.x,h.y):o.lineTo(h.x,h.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${x.toFixed(1)}\xB0`,12,a.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${z.toFixed(1)}\xB0`,12,a.y*2-10)}o.restore()}var H=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,W=`
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
// 1. Z-axis (Yaw) -> 2. Y-axis (Roll) -> 3. X-axis (Pitch)
vec3 rotateToCam(vec3 p, vec3 r) {
  // 1. Z-axis (Yaw)
  float cz = cos(r.z), sz = sin(r.z);
  float x1 = p.x * cz - p.y * sz;
  float y1 = p.x * sz + p.y * cz;
  float z1 = p.z;

  // 2. Y-axis (Roll)
  float cy = cos(r.y), sy = sin(r.y);
  float x2 = x1 * cy + z1 * sy;
  float y2 = y1;
  float z2 = -x1 * sy + z1 * cy;

  // 3. X-axis (Pitch)
  float cx = cos(r.x), sx = sin(r.x);
  float camX = x2;
  float camY = z2 * cx - y2 * sx;
  float camZ = z2 * sx + y2 * cx;

  return vec3(camX, camY, camZ);
}

// Inverse rotation from Cam space back to Local box space
// Mathematically exact inverse of transform3D:
// p_cam = Rx * [ Ry * (Rz * p_local) ]
// 1. Inv X-axis:
//   camY = z2 * cx - y2 * sx
//   camZ = z2 * sx + y2 * cx
//   => y2 = -camY * sx + camZ * cx
//   => z2 =  camY * cx + camZ * sx
//   x2 = camX
// 2. Inv Y-axis:
//   x2 = x1 * cy + z1 * sy
//   z2 = -x1 * sy + z1 * cy
//   => x1 = x2 * cy - z2 * sy
//   => z1 = x2 * sy + z2 * cy
//   y1 = y2
// 3. Inv Z-axis:
//   x1 = x * cz - y * sz
//   y1 = x * sz + y * cz
//   => x = x1 * cz + y1 * sz
//   => y = -x1 * sz + y1 * cz
//   z = z1
vec3 rotateToLocal(vec3 p, vec3 r) {
  float cx = cos(r.x), sx = sin(r.x);
  float x2 = p.x;
  float y2 = -p.y * sx + p.z * cx;
  float z2 =  p.y * cx + p.z * sx;

  float cy = cos(r.y), sy = sin(r.y);
  float x1 = x2 * cy - z2 * sy;
  float y1 = y2;
  float z1 = x2 * sy + z2 * cy;

  float cz = cos(r.z), sz = sin(r.z);
  float x =  x1 * cz + y1 * sz;
  float y = -x1 * sz + y1 * cz;
  float z = z1;

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

    // Exact 3D Rounded Box Edge Detection
    // For a rounded box, the flat faces end at abs(pLocal) = halfSize - rad.
    // The fillet transitions happen when coordinates enter the rounded region [halfSize - rad, halfSize].
    vec3 q = abs(pLocal) - (halfSize - rad);
    
    // Count how many axes have reached the outer boundary
    float countAxes = (q.x > 0.0 ? 1.0 : 0.0) + (q.y > 0.0 ? 1.0 : 0.0) + (q.z > 0.0 ? 1.0 : 0.0);
    
    // Compute distance to the 12 outer edge crests in 3D
    vec3 dEdge = abs(abs(pLocal) - halfSize);
    
    // Is edge crest in front facing or back facing?
    bool isFront = nCam.z > 0.0;

    if (u_show_front && isFront) {
      // 12 \u68F1\u8FB9\u4E3B\u810A\u7EBF\u4E0E\u5706\u5F27\u8FC7\u6E21\u8FB9 (Edge crests)
      float edgeThreshold = (u_front_width * 0.003) / u_zoom;
      
      // An edge crest in rounded box is where at least two coordinates approach the boundary
      float eDistXY = max(dEdge.x, dEdge.y);
      float eDistXZ = max(dEdge.x, dEdge.z);
      float eDistYZ = max(dEdge.y, dEdge.z);
      float minEdgeDist = min(min(eDistXY, eDistXZ), eDistYZ);

      // Fillet boundary seam lines (\u5E73\u6ED1\u5706\u5F27\u4E0E\u5E73\u9762\u7684\u76F8\u5207\u5206\u6BB5\u7EBF / Segments seam lines)
      vec3 dSeam = abs(q);
      float seamDist = min(min(dSeam.x, dSeam.y), dSeam.z);

      if (rad > 0.01 && seamDist < edgeThreshold && countAxes >= 1.0) {
        // \u5012\u89D2\u4E0E\u5E73\u9762\u7684\u5207\u7EBF\u5206\u6BB5\u7EBF (Fillet seam segments)
        finalCol = mix(finalCol, u_front_color.rgb, u_front_color.a * 0.45);
      }
      
      if (minEdgeDist < edgeThreshold && countAxes >= 1.5) {
        // 12 \u6761\u68F1\u8FB9\u4E3B\u8F6E\u5ED3\u7EBF (Main outer edge crests)
        finalCol = mix(finalCol, u_front_color.rgb, u_front_color.a);
      }
    }

    gl_FragColor = vec4(clamp(finalCol, 0.0, 1.0), 1.0);
  } else {
    discard; // Transparent background
  }
}
`;function N(o,t){let a=window.devicePixelRatio||1,s=document.createElement("div");s.style.position="relative",s.style.width=`${t}px`,s.style.height=`${t}px`,s.style.userSelect="none";let l=document.createElement("canvas");l.width=t*a,l.height=t*a,l.style.width=`${t}px`,l.style.height=`${t}px`,l.style.position="absolute",l.style.left="0",l.style.top="0";let r=document.createElement("canvas");r.width=t*a,r.height=t*a,r.style.width=`${t}px`,r.style.height=`${t}px`,r.style.position="absolute",r.style.left="0",r.style.top="0",r.style.pointerEvents="none",s.appendChild(l),s.appendChild(r),o.appendChild(s);let e=l.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),c=r.getContext("2d");c.scale(a,a);let m=(x,z)=>{let f=e.createShader(x);return e.shaderSource(f,z),e.compileShader(f),e.getShaderParameter(f,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(f)),f},i=m(e.VERTEX_SHADER,H),u=m(e.FRAGMENT_SHADER,W),y=e.createProgram();e.attachShader(y,i),e.attachShader(y,u),e.linkProgram(y);let C=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,C),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let _=e.getAttribLocation(y,"position");e.enableVertexAttribArray(_),e.vertexAttribPointer(_,2,e.FLOAT,!1,0,0);let n={u_resolution:e.getUniformLocation(y,"u_resolution"),u_box_size:e.getUniformLocation(y,"u_box_size"),u_radius:e.getUniformLocation(y,"u_radius"),u_rot:e.getUniformLocation(y,"u_rot"),u_zoom:e.getUniformLocation(y,"u_zoom"),u_mode:e.getUniformLocation(y,"u_mode"),u_invert:e.getUniformLocation(y,"u_invert"),u_show_front:e.getUniformLocation(y,"u_show_front"),u_show_back:e.getUniformLocation(y,"u_show_back"),u_front_width:e.getUniformLocation(y,"u_front_width"),u_back_width:e.getUniformLocation(y,"u_back_width"),u_front_dashed:e.getUniformLocation(y,"u_front_dashed"),u_back_dashed:e.getUniformLocation(y,"u_back_dashed"),u_front_color:e.getUniformLocation(y,"u_front_color"),u_back_color:e.getUniformLocation(y,"u_back_color")};return{gl:e,overlayCtx:c,canvasGL:l,canvasOverlay:r,width:t,height:t,program:y,uniforms:n}}function so(o,t,a,s,l,r){if(!r.showFront&&!r.showBack)return;let e=n=>R(n,t,a,s,l),c=Math.min(l.radius||0,.49),m=c,i=c,u=c,y=[{from:{x:m,y:0,z:0},to:{x:1-m,y:0,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:i,z:0},to:{x:1,y:1-i,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:1,y:0,z:0}},{from:{x:1-m,y:1,z:0},to:{x:m,y:1,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-i,z:0},to:{x:0,y:i,z:0},normalA:{x:0,y:0,z:-1},normalB:{x:-1,y:0,z:0}},{from:{x:m,y:0,z:1},to:{x:1-m,y:0,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:i,z:1},to:{x:1,y:1-i,z:1},normalA:{x:0,y:0,z:1},normalB:{x:1,y:0,z:0}},{from:{x:1-m,y:1,z:1},to:{x:m,y:1,z:1},normalA:{x:0,y:0,z:1},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1-i,z:1},to:{x:0,y:i,z:1},normalA:{x:0,y:0,z:1},normalB:{x:-1,y:0,z:0}},{from:{x:0,y:0,z:u},to:{x:0,y:0,z:1-u},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:0,z:u},to:{x:1,y:0,z:1-u},normalA:{x:1,y:0,z:0},normalB:{x:0,y:-1,z:0}},{from:{x:1,y:1,z:u},to:{x:1,y:1,z:1-u},normalA:{x:1,y:0,z:0},normalB:{x:0,y:1,z:0}},{from:{x:0,y:1,z:u},to:{x:0,y:1,z:1-u},normalA:{x:-1,y:0,z:0},normalB:{x:0,y:1,z:0}}],C=[];if(c>.005){let n=[{c:{x:m,y:i,z:u},sign:{x:-1,y:-1,z:-1}},{c:{x:1-m,y:i,z:u},sign:{x:1,y:-1,z:-1}},{c:{x:m,y:1-i,z:u},sign:{x:-1,y:1,z:-1}},{c:{x:1-m,y:1-i,z:u},sign:{x:1,y:1,z:-1}},{c:{x:m,y:i,z:1-u},sign:{x:-1,y:-1,z:1}},{c:{x:1-m,y:i,z:1-u},sign:{x:1,y:-1,z:1}},{c:{x:m,y:1-i,z:1-u},sign:{x:-1,y:1,z:1}},{c:{x:1-m,y:1-i,z:1-u},sign:{x:1,y:1,z:1}}];for(let x of n)C.push({center:x.c,axisA:{x:x.sign.x*m,y:0,z:0},axisB:{x:0,y:x.sign.y*i,z:0},normalA:{x:x.sign.x,y:0,z:0},normalB:{x:0,y:x.sign.y,z:0}}),C.push({center:x.c,axisA:{x:x.sign.x*m,y:0,z:0},axisB:{x:0,y:0,z:x.sign.z*u},normalA:{x:x.sign.x,y:0,z:0},normalB:{x:0,y:0,z:x.sign.z}}),C.push({center:x.c,axisA:{x:0,y:x.sign.y*i,z:0},axisB:{x:0,y:0,z:x.sign.z*u},normalA:{x:0,y:x.sign.y,z:0},normalB:{x:0,y:0,z:x.sign.z}})}let _=n=>{let x=A({x:.5,y:.5,z:.5},s,l);return A({x:.5+n.x*.1,y:.5+n.y*.1,z:.5+n.z*.1},s,l).z-x.z>0};if(o.save(),r.showBack){o.lineWidth=r.backWidth,r.backDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=r.backColor,o.globalAlpha=r.backOpacity;for(let n of y)if(!(_(n.normalA)||_(n.normalB))){let z=e(n.from),f=e(n.to);o.beginPath(),o.moveTo(z.x,z.y),o.lineTo(f.x,f.y),o.stroke()}for(let n of C)if(!(_(n.normalA)||_(n.normalB))){o.beginPath();let z=8;for(let f=0;f<=z;f++){let b=f/z*(Math.PI*.5),g={x:n.center.x+n.axisA.x*Math.cos(b)+n.axisB.x*Math.sin(b),y:n.center.y+n.axisA.y*Math.cos(b)+n.axisB.y*Math.sin(b),z:n.center.z+n.axisA.z*Math.cos(b)+n.axisB.z*Math.sin(b)},p=e(g);f===0?o.moveTo(p.x,p.y):o.lineTo(p.x,p.y)}o.stroke()}}if(r.showFront){o.lineWidth=r.frontWidth,r.frontDashed?o.setLineDash([4,3]):o.setLineDash([]),o.strokeStyle=r.frontColor,o.globalAlpha=r.frontOpacity;for(let n of y)if(_(n.normalA)||_(n.normalB)){let z=e(n.from),f=e(n.to);o.beginPath(),o.moveTo(z.x,z.y),o.lineTo(f.x,f.y),o.stroke()}for(let n of C)if(_(n.normalA)||_(n.normalB)){o.beginPath();let z=8;for(let f=0;f<=z;f++){let b=f/z*(Math.PI*.5),g={x:n.center.x+n.axisA.x*Math.cos(b)+n.axisB.x*Math.sin(b),y:n.center.y+n.axisA.y*Math.cos(b)+n.axisB.y*Math.sin(b),z:n.center.z+n.axisA.z*Math.cos(b)+n.axisB.z*Math.sin(b)},p=e(g);f===0?o.moveTo(p.x,p.y):o.lineTo(p.x,p.y)}o.stroke()}}o.restore()}function $(o,t,a,s,l,r,e,c,m){let{gl:i,overlayCtx:u,width:y,height:C,program:_,uniforms:n}=o,x=window.devicePixelRatio||1;i.viewport(0,0,y*x,C*x),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.useProgram(_),i.uniform2f(n.u_resolution,y*x,C*x),i.uniform3f(n.u_box_size,a.sizeX,a.sizeY,a.sizeZ),i.uniform1f(n.u_radius,a.radius!==void 0?a.radius:.001),i.uniform3f(n.u_rot,t.rotXRad,t.rotYRad,t.rotZRad),i.uniform1f(n.u_zoom,t.zoom||1),i.uniform1i(n.u_mode,s==="rgb"?0:s==="hsb"?1:2),i.uniform1i(n.u_invert,l?1:0),i.uniform1i(n.u_show_front,e.showFront?1:0),i.uniform1i(n.u_show_back,e.showBack?1:0),i.uniform1f(n.u_front_width,e.frontWidth||1.5),i.uniform1f(n.u_back_width,e.backWidth||1),i.uniform1i(n.u_front_dashed,e.frontDashed?1:0),i.uniform1i(n.u_back_dashed,e.backDashed?1:0),i.uniform4f(n.u_front_color,1,1,1,e.frontOpacity||.65),i.uniform4f(n.u_back_color,1,1,1,e.backOpacity||.25),i.drawArrays(i.TRIANGLES,0,6),u.save(),u.clearRect(0,0,y,C);let z=y*.26,f={x:y*.5,y:C*.5};if(so(u,z,f,t,a,e),U(u,z,f,t,a,r),m){let b=R(c,z,f,t,a),g=B(c,s),p=l?{r:255-g.r,g:255-g.g,b:255-g.b}:g;u.beginPath(),u.arc(b.x,b.y,6,0,Math.PI*2),u.fillStyle=`rgb(${p.r}, ${p.g}, ${p.b})`,u.fill(),u.strokeStyle="#ffffff",u.lineWidth=2,u.stroke()}u.restore()}function lo(o,t={}){let a=t.size||460,s=t.mode||"rgb",l=!1,r={...V},e={...Y,radius:.08},c={...I},m={...X},i=t.initialColor||{r:255,g:255,b:255},u=F(i,s),y=new Set,C=N(o,a),_=null,n=()=>{_===null&&(_=requestAnimationFrame(()=>{_=null,$(C,r,e,s,l,c,m,u,!0)}))},x=()=>{let d=B(u,s),h=l?{r:255-d.r,g:255-d.g,b:255-d.b}:d,v=D(h),L=k(h),S=w(h),q={rgb:h,hsb:v,oklch:L,hex:S,alpha:1};y.forEach(j=>j(q))},z=!1,f=0,b=0,g=r.rotZRad,p=r.rotXRad;return C.canvasGL.addEventListener("mousedown",d=>{z=!0,f=d.clientX,b=d.clientY,g=r.rotZRad,p=r.rotXRad}),window.addEventListener("mousemove",d=>{if(!z)return;let h=d.clientX-f,v=d.clientY-b;r.rotZRad=g+h*.01,r.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,p-v*.01)),n()}),window.addEventListener("mouseup",()=>{z=!1}),C.canvasGL.addEventListener("dblclick",()=>{l=!l,x(),n()}),n(),x(),{getColor:()=>{let d=B(u,s),h=l?{r:255-d.r,g:255-d.g,b:255-d.b}:d;return{rgb:h,hsb:D(h),oklch:k(h),hex:w(h),alpha:1}},setColor:d=>{i=d,u=F(d,s),x(),n()},setMode:d=>{s=d,x(),n()},getMode:()=>s,setRotation:(d,h)=>{r.rotZRad=d*Math.PI/180,r.rotXRad=h*Math.PI/180,n()},getAxisRotation:()=>({rotXDeg:Math.round(r.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(r.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(r.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(d,h,v)=>{r.rotXRad=d*Math.PI/180,r.rotYRad=h*Math.PI/180,r.rotZRad=v*Math.PI/180,n()},setZoom:d=>{r.zoom=Math.max(.1,Math.min(3,d)),n()},getZoom:()=>r.zoom||1,setDimensions:(d,h,v)=>{e.sizeX=Math.max(.2,Math.min(2.5,d)),e.sizeY=Math.max(.2,Math.min(2.5,h)),e.sizeZ=Math.max(.2,Math.min(2.5,v)),n()},getDimensions:()=>({sizeX:e.sizeX,sizeY:e.sizeY,sizeZ:e.sizeZ}),setRadius:d=>{e.radius=Math.max(0,Math.min(.5,d)),n()},getRadius:()=>e.radius,getEdgeStyle:()=>({...m}),setEdgeStyle:d=>{m={...m,...d},n()},getGuides:()=>({...c}),setGuides:d=>{c={...c,...d},n()},toggleAllGuides:d=>{let h=d!==void 0?d:!c.vertexX;c={vertexX:h,vertexY:h,vertexZ:h,centerX:h,centerY:h,centerZ:h,angleGuides:h},n()},on:(d,h)=>{y.add(h)},off:(d,h)=>{y.delete(h)},destroy:()=>{_!==null&&cancelAnimationFrame(_),o.innerHTML=""}}}return to(co);})();
