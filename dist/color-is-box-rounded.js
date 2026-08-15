var w={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},F={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var X={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},I={sizeX:1,sizeY:1,sizeZ:1,radius:0};function V(o,t,n){let a=(o.x-.5)*n.sizeX,i=(o.y-.5)*n.sizeY,r=(o.z-.5)*n.sizeZ,e=Math.cos(t.rotZRad),l=Math.sin(t.rotZRad),d=a*e-i*l,s=a*l+i*e,x=r,m=Math.cos(t.rotYRad),g=Math.sin(t.rotYRad),C=d*m+x*g,u=s,p=-d*g+x*m,_=Math.cos(t.rotXRad),y=Math.sin(t.rotXRad),b=C,h=p*_-u*y,z=p*y+u*_;return{x:b,y:h,z}}function B(o,t,n,a,i){let r=V(o,a,i);return{x:n.x+r.x*t*1.6*a.zoom,y:n.y-r.y*t*1.6*a.zoom}}function A(o){let t=o.r/255,n=o.g/255,a=o.b/255,i=Math.max(t,n,a),r=Math.min(t,n,a),e=i-r,l=0;e!==0&&(i===t?l=((n-a)/e+6)%6:i===n?l=(a-t)/e+2:l=(t-n)/e+4,l*=60);let d=i===0?0:e/i*100,s=i*100;return{h:l,s:d,b:s}}function j(o){let t=o.h,n=o.s/100,a=o.b/100,i=a*n,r=i*(1-Math.abs(t/60%2-1)),e=a-i,l,d,s;return t<60?(l=i,d=r,s=0):t<120?(l=r,d=i,s=0):t<180?(l=0,d=i,s=r):t<240?(l=0,d=r,s=i):t<300?(l=r,d=0,s=i):(l=i,d=0,s=r),{r:Math.round((l+e)*255),g:Math.round((d+e)*255),b:Math.round((s+e)*255)}}function S(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function E(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function K(o){let t=S(o.r/255),n=S(o.g/255),a=S(o.b/255),i=.4122214708*t+.5363325363*n+.0514459929*a,r=.2119034982*t+.6806995451*n+.1073969566*a,e=.0883024619*t+.2817188376*n+.6299787005*a,l=Math.cbrt(i),d=Math.cbrt(r),s=Math.cbrt(e);return{L:.2104542553*l+.793617785*d-.0040720468*s,a:1.9779984951*l-2.428592205*d+.4505937099*s,b:.0259040371*l+.7827717662*d-.808675766*s}}function Q(o,t,n){let a=o+.3963377774*t+.2158037573*n,i=o-.1055613458*t-.0638541728*n,r=o-.0894841775*t-1.291485548*n,e=a*a*a,l=i*i*i,d=r*r*r,s=4.0767416621*e-3.3077115913*l+.2309699292*d,x=-1.2684380046*e+2.6097574011*l-.3413193965*d,m=-.0041960863*e-.7034186147*l+1.707614701*d;return{r:Math.round(Math.max(0,Math.min(1,E(s)))*255),g:Math.round(Math.max(0,Math.min(1,E(x)))*255),b:Math.round(Math.max(0,Math.min(1,E(m)))*255)}}function D(o){let t=K(o),n=Math.sqrt(t.a*t.a+t.b*t.b),a=Math.atan2(t.b,t.a)*(180/Math.PI);return a<0&&(a+=360),{l:t.L,c:n,h:n<1e-4?0:a}}function G(o){let t=o.h*(Math.PI/180),n=o.c*Math.cos(t),a=o.c*Math.sin(t);return Q(o.l,n,a)}function J(o,t,n){let a=G({l:o,c:t,h:n});if(Y(a))return{l:o,c:t,h:n};let i=0,r=t;for(let e=0;e<20;e++){let l=(i+r)/2;a=G({l:o,c:l,h:n}),Y(a)?i=l:r=l}return{l:o,c:i,h:n}}function Y(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function T(o){let t=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${t(o.r)}${t(o.g)}${t(o.b)}`}var O=.4;function R(o,t){if(t==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(t==="hsb")return j({h:o.x*359,s:o.y*100,b:o.z*100});{let n=o.x,a=o.y*O,i=o.z*359,r=J(n,a,i);return G(r)}}function P(o,t){if(t==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(t==="hsb"){let n=A(o);return{x:n.h/359,y:n.s/100,z:n.b/100}}else{let n=D(o);return{x:n.l,y:Math.min(n.c/O,1),z:n.h/359}}}var M=["#ef4444","#22c55e","#3b82f6"];function Z(o,t,n,a,i,r){let e=y=>B(y,t,n,a,i),l=e({x:0,y:0,z:0});o.save();let d=1.28,s=[{p:{x:d,y:0,z:0},name:"X",color:M[0],visible:r.vertexX},{p:{x:0,y:d,z:0},name:"Y",color:M[1],visible:r.vertexY},{p:{x:0,y:0,z:d},name:"Z",color:M[2],visible:r.vertexZ}];for(let y=0;y<s.length;y++){if(!s[y].visible)continue;let b=e(s[y].p),h=s[y].color;o.beginPath(),o.moveTo(l.x,l.y),o.lineTo(b.x,b.y),o.strokeStyle=h,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(b.x,b.y,3.5,0,Math.PI*2),o.fillStyle=h,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let z=b.x-l.x,c=b.y-l.y,f=Math.hypot(z,c)||1,v=12,k=b.x+z/f*v,L=b.y+c/f*v;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=h,o.fillText(s[y].name,k,L)}(r.vertexX||r.vertexY||r.vertexZ)&&(o.beginPath(),o.arc(l.x,l.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let x=e({x:.5,y:.5,z:.5}),m=.35,g=[{from:{x:-m,y:.5,z:.5},to:{x:1+m,y:.5,z:.5},color:M[0],name:"Cx",visible:r.centerX},{from:{x:.5,y:-m,z:.5},to:{x:.5,y:1+m,z:.5},color:M[1],name:"Cy",visible:r.centerY},{from:{x:.5,y:.5,z:-m},to:{x:.5,y:.5,z:1+m},color:M[2],name:"Cz",visible:r.centerZ}],C=!1;for(let y=0;y<g.length;y++){if(!g[y].visible)continue;C=!0;let b=e(g[y].from),h=e(g[y].to);o.beginPath(),o.moveTo(b.x,b.y),o.lineTo(h.x,h.y),o.strokeStyle=g[y].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(b.x,b.y,3,0,Math.PI*2),o.arc(h.x,h.y,3,0,Math.PI*2),o.fillStyle=g[y].color,o.fill()}C&&(o.beginPath(),o.arc(x.x,x.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let u=r.angleGuides!==void 0?r.angleGuides:r.yawArc||r.pitchArc||!1,p=Math.round(a.rotZRad*180/Math.PI*10)/10,_=Math.round(a.rotXRad*180/Math.PI*10)/10;if(u){o.beginPath();let y=36;for(let h=0;h<=y;h++){let z=h/y*Math.PI*2,c={x:.5+Math.cos(z)*.75,y:.5+Math.sin(z)*.75,z:0},f=e(c);h===0?o.moveTo(f.x,f.y):o.lineTo(f.x,f.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let b=20;for(let h=0;h<=b;h++){let z=-Math.PI/2+h/b*Math.PI,c={x:.5+Math.cos(z)*.75,y:.5,z:.5+Math.sin(z)*.75},f=e(c);h===0?o.moveTo(f.x,f.y):o.lineTo(f.x,f.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${p.toFixed(1)}\xB0`,12,n.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${_.toFixed(1)}\xB0`,12,n.y*2-10)}o.restore()}var U=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,H=`
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
`;function W(o,t){let n=window.devicePixelRatio||1,a=document.createElement("div");a.style.position="relative",a.style.width=`${t}px`,a.style.height=`${t}px`,a.style.userSelect="none";let i=document.createElement("canvas");i.width=t*n,i.height=t*n,i.style.width=`${t}px`,i.style.height=`${t}px`,i.style.position="absolute",i.style.left="0",i.style.top="0";let r=document.createElement("canvas");r.width=t*n,r.height=t*n,r.style.width=`${t}px`,r.style.height=`${t}px`,r.style.position="absolute",r.style.left="0",r.style.top="0",r.style.pointerEvents="none",a.appendChild(i),a.appendChild(r),o.appendChild(a);let e=i.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),l=r.getContext("2d");l.scale(n,n);let d=(p,_)=>{let y=e.createShader(p);return e.shaderSource(y,_),e.compileShader(y),e.getShaderParameter(y,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(y)),y},s=d(e.VERTEX_SHADER,U),x=d(e.FRAGMENT_SHADER,H),m=e.createProgram();e.attachShader(m,s),e.attachShader(m,x),e.linkProgram(m);let g=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,g),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let C=e.getAttribLocation(m,"position");e.enableVertexAttribArray(C),e.vertexAttribPointer(C,2,e.FLOAT,!1,0,0);let u={u_resolution:e.getUniformLocation(m,"u_resolution"),u_box_size:e.getUniformLocation(m,"u_box_size"),u_radius:e.getUniformLocation(m,"u_radius"),u_rot:e.getUniformLocation(m,"u_rot"),u_zoom:e.getUniformLocation(m,"u_zoom"),u_mode:e.getUniformLocation(m,"u_mode"),u_invert:e.getUniformLocation(m,"u_invert"),u_show_front:e.getUniformLocation(m,"u_show_front"),u_show_back:e.getUniformLocation(m,"u_show_back"),u_front_width:e.getUniformLocation(m,"u_front_width"),u_back_width:e.getUniformLocation(m,"u_back_width"),u_front_dashed:e.getUniformLocation(m,"u_front_dashed"),u_back_dashed:e.getUniformLocation(m,"u_back_dashed"),u_front_color:e.getUniformLocation(m,"u_front_color"),u_back_color:e.getUniformLocation(m,"u_back_color")};return{gl:e,overlayCtx:l,canvasGL:i,canvasOverlay:r,width:t,height:t,program:m,uniforms:u}}function N(o,t,n,a,i,r,e,l,d){let{gl:s,overlayCtx:x,width:m,height:g,program:C,uniforms:u}=o,p=window.devicePixelRatio||1;s.viewport(0,0,m*p,g*p),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.useProgram(C),s.uniform2f(u.u_resolution,m*p,g*p),s.uniform3f(u.u_box_size,n.sizeX,n.sizeY,n.sizeZ),s.uniform1f(u.u_radius,n.radius!==void 0?n.radius:.001),s.uniform3f(u.u_rot,t.rotXRad,t.rotYRad,t.rotZRad),s.uniform1f(u.u_zoom,t.zoom||1),s.uniform1i(u.u_mode,a==="rgb"?0:a==="hsb"?1:2),s.uniform1i(u.u_invert,i?1:0),s.uniform1i(u.u_show_front,e.showFront?1:0),s.uniform1i(u.u_show_back,e.showBack?1:0),s.uniform1f(u.u_front_width,e.frontWidth||1.5),s.uniform1f(u.u_back_width,e.backWidth||1),s.uniform1i(u.u_front_dashed,e.frontDashed?1:0),s.uniform1i(u.u_back_dashed,e.backDashed?1:0),s.uniform4f(u.u_front_color,1,1,1,e.frontOpacity||.65),s.uniform4f(u.u_back_color,1,1,1,e.backOpacity||.25),s.drawArrays(s.TRIANGLES,0,6),x.save(),x.clearRect(0,0,m,g);let _=m*.26,y={x:m*.5,y:g*.5};if(Z(x,_,y,t,n,r),d){let b=B(l,_,y,t,n),h=R(l,a),z=i?{r:255-h.r,g:255-h.g,b:255-h.b}:h;x.beginPath(),x.arc(b.x,b.y,6,0,Math.PI*2),x.fillStyle=`rgb(${z.r}, ${z.g}, ${z.b})`,x.fill(),x.strokeStyle="#ffffff",x.lineWidth=2,x.stroke()}x.restore()}function ko(o,t={}){let n=t.size||460,a=t.mode||"rgb",i=!1,r={...X},e={...I,radius:.08},l={...F},d={...w},s=t.initialColor||{r:255,g:255,b:255},x=P(s,a),m=new Set,g=W(o,n),C=null,u=()=>{C===null&&(C=requestAnimationFrame(()=>{C=null,N(g,r,e,a,i,l,d,x,!0)}))},p=()=>{let c=R(x,a),f=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c,v=A(f),k=D(f),L=T(f),$={rgb:f,hsb:v,oklch:k,hex:L,alpha:1};m.forEach(q=>q($))},_=!1,y=0,b=0,h=r.rotZRad,z=r.rotXRad;return g.canvasGL.addEventListener("mousedown",c=>{_=!0,y=c.clientX,b=c.clientY,h=r.rotZRad,z=r.rotXRad}),window.addEventListener("mousemove",c=>{if(!_)return;let f=c.clientX-y,v=c.clientY-b;r.rotZRad=h+f*.01,r.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,z-v*.01)),u()}),window.addEventListener("mouseup",()=>{_=!1}),g.canvasGL.addEventListener("dblclick",()=>{i=!i,p(),u()}),u(),p(),{getColor:()=>{let c=R(x,a),f=i?{r:255-c.r,g:255-c.g,b:255-c.b}:c;return{rgb:f,hsb:A(f),oklch:D(f),hex:T(f),alpha:1}},setColor:c=>{s=c,x=P(c,a),p(),u()},setMode:c=>{a=c,p(),u()},getMode:()=>a,setRotation:(c,f)=>{r.rotZRad=c*Math.PI/180,r.rotXRad=f*Math.PI/180,u()},getAxisRotation:()=>({rotXDeg:Math.round(r.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(r.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(r.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(c,f,v)=>{r.rotXRad=c*Math.PI/180,r.rotYRad=f*Math.PI/180,r.rotZRad=v*Math.PI/180,u()},setZoom:c=>{r.zoom=Math.max(.1,Math.min(3,c)),u()},getZoom:()=>r.zoom||1,setDimensions:(c,f,v)=>{e.sizeX=Math.max(.2,Math.min(2.5,c)),e.sizeY=Math.max(.2,Math.min(2.5,f)),e.sizeZ=Math.max(.2,Math.min(2.5,v)),u()},getDimensions:()=>({sizeX:e.sizeX,sizeY:e.sizeY,sizeZ:e.sizeZ}),setRadius:c=>{e.radius=Math.max(0,Math.min(.5,c)),u()},getRadius:()=>e.radius,getEdgeStyle:()=>({...d}),setEdgeStyle:c=>{d={...d,...c},u()},getGuides:()=>({...l}),setGuides:c=>{l={...l,...c},u()},toggleAllGuides:c=>{let f=c!==void 0?c:!l.vertexX;l={vertexX:f,vertexY:f,vertexZ:f,centerX:f,centerY:f,centerZ:f,angleGuides:f},u()},on:(c,f)=>{m.add(f)},off:(c,f)=>{m.delete(f)},destroy:()=>{C!==null&&cancelAnimationFrame(C),o.innerHTML=""}}}export{ko as createRoundedBoxPicker};
