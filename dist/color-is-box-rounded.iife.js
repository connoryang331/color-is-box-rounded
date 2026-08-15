var ColorIsBoxRounded=(()=>{var S=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var J=Object.prototype.hasOwnProperty;var oo=(o,e)=>{for(var r in e)S(o,r,{get:e[r],enumerable:!0})},eo=(o,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Q(e))!J.call(o,i)&&i!==r&&S(o,i,{get:()=>e[i],enumerable:!(a=K(e,i))||a.enumerable});return o};var to=o=>eo(S({},"__esModule",{value:!0}),o);var lo={};oo(lo,{createRoundedBoxPicker:()=>so});var F={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},X={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var I={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},V={sizeX:1,sizeY:1,sizeZ:1,radius:0};function Y(o,e,r){let a=(o.x-.5)*r.sizeX,i=(o.y-.5)*r.sizeY,n=(o.z-.5)*r.sizeZ,t=Math.cos(e.rotZRad),l=Math.sin(e.rotZRad),d=a*t-i*l,s=a*l+i*t,x=n,m=Math.cos(e.rotYRad),g=Math.sin(e.rotYRad),C=d*m+x*g,u=s,p=-d*g+x*m,_=Math.cos(e.rotXRad),y=Math.sin(e.rotXRad),b=C,h=p*_-u*y,z=p*y+u*_;return{x:b,y:h,z}}function B(o,e,r,a,i){let n=Y(o,a,i);return{x:r.x+n.x*e*1.6*a.zoom,y:r.y-n.y*e*1.6*a.zoom}}function A(o){let e=o.r/255,r=o.g/255,a=o.b/255,i=Math.max(e,r,a),n=Math.min(e,r,a),t=i-n,l=0;t!==0&&(i===e?l=((r-a)/t+6)%6:i===r?l=(a-e)/t+2:l=(e-r)/t+4,l*=60);let d=i===0?0:t/i*100,s=i*100;return{h:l,s:d,b:s}}function ro(o){let e=o.h,r=o.s/100,a=o.b/100,i=a*r,n=i*(1-Math.abs(e/60%2-1)),t=a-i,l,d,s;return e<60?(l=i,d=n,s=0):e<120?(l=n,d=i,s=0):e<180?(l=0,d=i,s=n):e<240?(l=0,d=n,s=i):e<300?(l=n,d=0,s=i):(l=i,d=0,s=n),{r:Math.round((l+t)*255),g:Math.round((d+t)*255),b:Math.round((s+t)*255)}}function E(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function G(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function no(o){let e=E(o.r/255),r=E(o.g/255),a=E(o.b/255),i=.4122214708*e+.5363325363*r+.0514459929*a,n=.2119034982*e+.6806995451*r+.1073969566*a,t=.0883024619*e+.2817188376*r+.6299787005*a,l=Math.cbrt(i),d=Math.cbrt(n),s=Math.cbrt(t);return{L:.2104542553*l+.793617785*d-.0040720468*s,a:1.9779984951*l-2.428592205*d+.4505937099*s,b:.0259040371*l+.7827717662*d-.808675766*s}}function ao(o,e,r){let a=o+.3963377774*e+.2158037573*r,i=o-.1055613458*e-.0638541728*r,n=o-.0894841775*e-1.291485548*r,t=a*a*a,l=i*i*i,d=n*n*n,s=4.0767416621*t-3.3077115913*l+.2309699292*d,x=-1.2684380046*t+2.6097574011*l-.3413193965*d,m=-.0041960863*t-.7034186147*l+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,G(s)))*255),g:Math.round(Math.max(0,Math.min(1,G(x)))*255),b:Math.round(Math.max(0,Math.min(1,G(m)))*255)}}function D(o){let e=no(o),r=Math.sqrt(e.a*e.a+e.b*e.b),a=Math.atan2(e.b,e.a)*(180/Math.PI);return a<0&&(a+=360),{l:e.L,c:r,h:r<1e-4?0:a}}function T(o){let e=o.h*(Math.PI/180),r=o.c*Math.cos(e),a=o.c*Math.sin(e);return ao(o.l,r,a)}function io(o,e,r){let a=T({l:o,c:e,h:r});if(O(a))return{l:o,c:e,h:r};let i=0,n=e;for(let t=0;t<20;t++){let l=(i+n)/2;a=T({l:o,c:l,h:r}),O(a)?i=l:n=l}return{l:o,c:i,h:r}}function O(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function P(o){let e=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${e(o.r)}${e(o.g)}${e(o.b)}`}var Z=.4;function R(o,e){if(e==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(e==="hsb")return ro({h:o.x*359,s:o.y*100,b:o.z*100});{let r=o.x,a=o.y*Z,i=o.z*359,n=io(r,a,i);return T(n)}}function w(o,e){if(e==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(e==="hsb"){let r=A(o);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=D(o);return{x:r.l,y:Math.min(r.c/Z,1),z:r.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function U(o,e,r,a,i,n){let t=y=>B(y,e,r,a,i),l=t({x:0,y:0,z:0});o.save();let d=1.28,s=[{p:{x:d,y:0,z:0},name:"X",color:M[0],visible:n.vertexX},{p:{x:0,y:d,z:0},name:"Y",color:M[1],visible:n.vertexY},{p:{x:0,y:0,z:d},name:"Z",color:M[2],visible:n.vertexZ}];for(let y=0;y<s.length;y++){if(!s[y].visible)continue;let b=t(s[y].p),h=s[y].color;o.beginPath(),o.moveTo(l.x,l.y),o.lineTo(b.x,b.y),o.strokeStyle=h,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(b.x,b.y,3.5,0,Math.PI*2),o.fillStyle=h,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let z=b.x-l.x,c=b.y-l.y,f=Math.hypot(z,c)||1,v=12,k=b.x+z/f*v,L=b.y+c/f*v;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=h,o.fillText(s[y].name,k,L)}(n.vertexX||n.vertexY||n.vertexZ)&&(o.beginPath(),o.arc(l.x,l.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let x=t({x:.5,y:.5,z:.5}),m=.35,g=[{from:{x:-m,y:.5,z:.5},to:{x:1+m,y:.5,z:.5},color:M[0],name:"Cx",visible:n.centerX},{from:{x:.5,y:-m,z:.5},to:{x:.5,y:1+m,z:.5},color:M[1],name:"Cy",visible:n.centerY},{from:{x:.5,y:.5,z:-m},to:{x:.5,y:.5,z:1+m},color:M[2],name:"Cz",visible:n.centerZ}],C=!1;for(let y=0;y<g.length;y++){if(!g[y].visible)continue;C=!0;let b=t(g[y].from),h=t(g[y].to);o.beginPath(),o.moveTo(b.x,b.y),o.lineTo(h.x,h.y),o.strokeStyle=g[y].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(b.x,b.y,3,0,Math.PI*2),o.arc(h.x,h.y,3,0,Math.PI*2),o.fillStyle=g[y].color,o.fill()}C&&(o.beginPath(),o.arc(x.x,x.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let u=n.angleGuides!==void 0?n.angleGuides:n.yawArc||n.pitchArc||!1,p=Math.round(a.rotZRad*180/Math.PI*10)/10,_=Math.round(a.rotXRad*180/Math.PI*10)/10;if(u){o.beginPath();let y=36;for(let h=0;h<=y;h++){let z=h/y*Math.PI*2,c={x:.5+Math.cos(z)*.75,y:.5+Math.sin(z)*.75,z:0},f=t(c);h===0?o.moveTo(f.x,f.y):o.lineTo(f.x,f.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let b=20;for(let h=0;h<=b;h++){let z=-Math.PI/2+h/b*Math.PI,c={x:.5+Math.cos(z)*.75,y:.5,z:.5+Math.sin(z)*.75},f=t(c);h===0?o.moveTo(f.x,f.y):o.lineTo(f.x,f.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${p.toFixed(1)}\xB0`,12,r.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${_.toFixed(1)}\xB0`,12,r.y*2-10)}o.restore()}var H=`
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
`;function N(o,e){let r=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${e}px`,a.style.height=`${e}px`,a.style.userSelect="none";let i=document.createElement("canvas");i.width=e*r,i.height=e*r,i.style.width=`${e}px`,i.style.height=`${e}px`,i.style.position="absolute",i.style.left="0",i.style.top="0";let n=document.createElement("canvas");n.width=e*r,n.height=e*r,n.style.width=`${e}px`,n.style.height=`${e}px`,n.style.position="absolute",n.style.left="0",n.style.top="0",n.style.pointerEvents="none",a.appendChild(i),a.appendChild(n),o.appendChild(a);let t=i.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),l=n.getContext("2d");l.scale(r,r);let d=(p,_)=>{let y=t.createShader(p);return t.shaderSource(y,_),t.compileShader(y),t.getShaderParameter(y,t.COMPILE_STATUS)||console.error(t.getShaderInfoLog(y)),y},s=d(t.VERTEX_SHADER,H),x=d(t.FRAGMENT_SHADER,W),m=t.createProgram();t.attachShader(m,s),t.attachShader(m,x),t.linkProgram(m);let g=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,g),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);let C=t.getAttribLocation(m,"position");t.enableVertexAttribArray(C),t.vertexAttribPointer(C,2,t.FLOAT,!1,0,0);let u={u_resolution:t.getUniformLocation(m,"u_resolution"),u_box_size:t.getUniformLocation(m,"u_box_size"),u_radius:t.getUniformLocation(m,"u_radius"),u_rot:t.getUniformLocation(m,"u_rot"),u_zoom:t.getUniformLocation(m,"u_zoom"),u_mode:t.getUniformLocation(m,"u_mode"),u_invert:t.getUniformLocation(m,"u_invert"),u_show_front:t.getUniformLocation(m,"u_show_front"),u_show_back:t.getUniformLocation(m,"u_show_back"),u_front_width:t.getUniformLocation(m,"u_front_width"),u_back_width:t.getUniformLocation(m,"u_back_width"),u_front_dashed:t.getUniformLocation(m,"u_front_dashed"),u_back_dashed:t.getUniformLocation(m,"u_back_dashed"),u_front_color:t.getUniformLocation(m,"u_front_color"),u_back_color:t.getUniformLocation(m,"u_back_color")};return{gl:t,overlayCtx:l,canvasGL:i,canvasOverlay:n,width:e,height:e,program:m,uniforms:u}}function $(o,e,r,a,i,n,t,l,d){let{gl:s,overlayCtx:x,width:m,height:g,program:C,uniforms:u}=o,p=window.devicePixelRatio||1;s.viewport(0,0,m*p,g*p),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.useProgram(C),s.uniform2f(u.u_resolution,m*p,g*p),s.uniform3f(u.u_box_size,r.sizeX,r.sizeY,r.sizeZ),s.uniform1f(u.u_radius,r.radius!==void 0?r.radius:.001),s.uniform3f(u.u_rot,e.rotXRad,e.rotYRad,e.rotZRad),s.uniform1f(u.u_zoom,e.zoom||1),s.uniform1i(u.u_mode,a==="rgb"?0:a==="hsb"?1:2),s.uniform1i(u.u_invert,i?1:0),s.uniform1i(u.u_show_front,t.showFront?1:0),s.uniform1i(u.u_show_back,t.showBack?1:0),s.uniform1f(u.u_front_width,t.frontWidth||1.5),s.uniform1f(u.u_back_width,t.backWidth||1),s.uniform1i(u.u_front_dashed,t.frontDashed?1:0),s.uniform1i(u.u_back_dashed,t.backDashed?1:0),s.uniform4f(u.u_front_color,1,1,1,t.frontOpacity||.65),s.uniform4f(u.u_back_color,1,1,1,t.backOpacity||.25),s.drawArrays(s.TRIANGLES,0,6),x.save(),x.clearRect(0,0,m,g);let _=m*.26,y={x:m*.5,y:g*.5};if(U(x,_,y,e,r,n),d){let b=B(l,_,y,e,r),h=R(l,a),z=i?{r:255-h.r,g:255-h.g,b:255-h.b}:h;x.beginPath(),x.arc(b.x,b.y,6,0,Math.PI*2),x.fillStyle=`rgb(${z.r}, ${z.g}, ${z.b})`,x.fill(),x.strokeStyle="#ffffff",x.lineWidth=2,x.stroke()}x.restore()}function so(o,e={}){let r=e.size||460,a=e.mode||"rgb",i=!1,n={...I},t={...V,radius:.08},l={...X},d={...F},s=e.initialColor||{r:255,g:255,b:255},x=w(s,a),m=new Set,g=N(o,r),C=null,u=()=>{C===null&&(C=requestAnimationFrame(()=>{C=null,$(g,n,t,a,i,l,d,x,!0)}))},p=()=>{let c=R(x,a),f=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c,v=A(f),k=D(f),L=P(f),q={rgb:f,hsb:v,oklch:k,hex:L,alpha:1};m.forEach(j=>j(q))},_=!1,y=0,b=0,h=n.rotZRad,z=n.rotXRad;return g.canvasGL.addEventListener("mousedown",c=>{_=!0,y=c.clientX,b=c.clientY,h=n.rotZRad,z=n.rotXRad}),window.addEventListener("mousemove",c=>{if(!_)return;let f=c.clientX-y,v=c.clientY-b;n.rotZRad=h+f*.01,n.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,z-v*.01)),u()}),window.addEventListener("mouseup",()=>{_=!1}),g.canvasGL.addEventListener("dblclick",()=>{i=!i,p(),u()}),u(),p(),{getColor:()=>{let c=R(x,a),f=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c;return{rgb:f,hsb:A(f),oklch:D(f),hex:P(f),alpha:1}},setColor:c=>{s=c,x=w(c,a),p(),u()},setMode:c=>{a=c,p(),u()},getMode:()=>a,setRotation:(c,f)=>{n.rotZRad=c*Math.PI/180,n.rotXRad=f*Math.PI/180,u()},getAxisRotation:()=>({rotXDeg:Math.round(n.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(n.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(n.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(c,f,v)=>{n.rotXRad=c*Math.PI/180,n.rotYRad=f*Math.PI/180,n.rotZRad=v*Math.PI/180,u()},setZoom:c=>{n.zoom=Math.max(.1,Math.min(3,c)),u()},getZoom:()=>n.zoom||1,setDimensions:(c,f,v)=>{t.sizeX=Math.max(.2,Math.min(2.5,c)),t.sizeY=Math.max(.2,Math.min(2.5,f)),t.sizeZ=Math.max(.2,Math.min(2.5,v)),u()},getDimensions:()=>({sizeX:t.sizeX,sizeY:t.sizeY,sizeZ:t.sizeZ}),setRadius:c=>{t.radius=Math.max(0,Math.min(.5,c)),u()},getRadius:()=>t.radius,getEdgeStyle:()=>({...d}),setEdgeStyle:c=>{d={...d,...c},u()},getGuides:()=>({...l}),setGuides:c=>{l={...l,...c},u()},toggleAllGuides:c=>{let f=c!==void 0?c:!l.vertexX;l={vertexX:f,vertexY:f,vertexZ:f,centerX:f,centerY:f,centerZ:f,angleGuides:f},u()},on:(c,f)=>{m.add(f)},off:(c,f)=>{m.delete(f)},destroy:()=>{C!==null&&cancelAnimationFrame(C),o.innerHTML=""}}}return to(lo);})();
