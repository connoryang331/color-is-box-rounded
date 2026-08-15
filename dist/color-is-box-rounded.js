var lo={showFront:!0,showBack:!0,frontWidth:1.5,backWidth:1,frontDashed:!1,backDashed:!0,frontColor:"#ffffff",backColor:"#ffffff",frontOpacity:.65,backOpacity:.25},co={vertexX:!0,vertexY:!0,vertexZ:!0,centerX:!0,centerY:!0,centerZ:!0,angleGuides:!0};var mo={rotXRad:20*(Math.PI/180),rotYRad:0,rotZRad:-30*(Math.PI/180),zoom:1},fo={sizeX:1,sizeY:1,sizeZ:1,radius:0};function uo(o,t,r){let i=(o.x-.5)*r.sizeX,s=(o.y-.5)*r.sizeY,n=(o.z-.5)*r.sizeZ,e=Math.cos(t.rotZRad),c=Math.sin(t.rotZRad),h=i*e-s*c,l=i*c+s*e,b=n,m=Math.cos(t.rotYRad),x=Math.sin(t.rotYRad),C=h*m+b*x,f=l,z=-h*x+b*m,v=Math.cos(t.rotXRad),u=Math.sin(t.rotXRad),g=C,y=z*v-f*u,p=z*u+f*v;return{x:g,y,z:p}}function X(o,t,r,i,s){let n=uo(o,i,s);return{x:r.x+n.x*t*1.6*i.zoom,y:r.y-n.y*t*1.6*i.zoom}}function F(o){let t=o.r/255,r=o.g/255,i=o.b/255,s=Math.max(t,r,i),n=Math.min(t,r,i),e=s-n,c=0;e!==0&&(s===t?c=((r-i)/e+6)%6:s===r?c=(i-t)/e+2:c=(t-r)/e+4,c*=60);let h=s===0?0:e/s*100,l=s*100;return{h:c,s:h,b:l}}function Mo(o){let t=o.h,r=o.s/100,i=o.b/100,s=i*r,n=s*(1-Math.abs(t/60%2-1)),e=i-s,c,h,l;return t<60?(c=s,h=n,l=0):t<120?(c=n,h=s,l=0):t<180?(c=0,h=s,l=n):t<240?(c=0,h=n,l=s):t<300?(c=n,h=0,l=s):(c=s,h=0,l=n),{r:Math.round((c+e)*255),g:Math.round((h+e)*255),b:Math.round((l+e)*255)}}function q(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function $(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}function Ro(o){let t=q(o.r/255),r=q(o.g/255),i=q(o.b/255),s=.4122214708*t+.5363325363*r+.0514459929*i,n=.2119034982*t+.6806995451*r+.1073969566*i,e=.0883024619*t+.2817188376*r+.6299787005*i,c=Math.cbrt(s),h=Math.cbrt(n),l=Math.cbrt(e);return{L:.2104542553*c+.793617785*h-.0040720468*l,a:1.9779984951*c-2.428592205*h+.4505937099*l,b:.0259040371*c+.7827717662*h-.808675766*l}}function Bo(o,t,r){let i=o+.3963377774*t+.2158037573*r,s=o-.1055613458*t-.0638541728*r,n=o-.0894841775*t-1.291485548*r,e=i*i*i,c=s*s*s,h=n*n*n,l=4.0767416621*e-3.3077115913*c+.2309699292*h,b=-1.2684380046*e+2.6097574011*c-.3413193965*h,m=-.0041960863*e-.7034186147*c+1.707614701*h;return{r:Math.round(Math.max(0,Math.min(1,$(l)))*255),g:Math.round(Math.max(0,Math.min(1,$(b)))*255),b:Math.round(Math.max(0,Math.min(1,$(m)))*255)}}function Y(o){let t=Ro(o),r=Math.sqrt(t.a*t.a+t.b*t.b),i=Math.atan2(t.b,t.a)*(180/Math.PI);return i<0&&(i+=360),{l:t.L,c:r,h:r<1e-4?0:i}}function K(o){let t=o.h*(Math.PI/180),r=o.c*Math.cos(t),i=o.c*Math.sin(t);return Bo(o.l,r,i)}function Ao(o,t,r){let i=K({l:o,c:t,h:r});if(ho(i))return{l:o,c:t,h:r};let s=0,n=t;for(let e=0;e<20;e++){let c=(s+n)/2;i=K({l:o,c,h:r}),ho(i)?s=c:n=c}return{l:o,c:s,h:r}}function ho(o){return o.r>=0&&o.r<=255&&o.g>=0&&o.g<=255&&o.b>=0&&o.b<=255}function j(o){let t=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${t(o.r)}${t(o.g)}${t(o.b)}`}var xo=.4;function E(o,t){if(t==="rgb")return{r:Math.round(o.x*255),g:Math.round(o.y*255),b:Math.round(o.z*255)};if(t==="hsb")return Mo({h:o.x*359,s:o.y*100,b:o.z*100});{let r=o.x,i=o.y*xo,s=o.z*359,n=Ao(r,i,s);return K(n)}}function Q(o,t){if(t==="rgb")return{x:o.r/255,y:o.g/255,z:o.b/255};if(t==="hsb"){let r=F(o);return{x:r.h/359,y:r.s/100,z:r.b/100}}else{let r=Y(o);return{x:r.l,y:Math.min(r.c/xo,1),z:r.h/359}}}var S=["#ef4444","#22c55e","#3b82f6"];function yo(o,t,r,i,s,n){let e=u=>X(u,t,r,i,s),c=e({x:0,y:0,z:0});o.save();let h=1.28,l=[{p:{x:h,y:0,z:0},name:"X",color:S[0],visible:n.vertexX},{p:{x:0,y:h,z:0},name:"Y",color:S[1],visible:n.vertexY},{p:{x:0,y:0,z:h},name:"Z",color:S[2],visible:n.vertexZ}];for(let u=0;u<l.length;u++){if(!l[u].visible)continue;let g=e(l[u].p),y=l[u].color;o.beginPath(),o.moveTo(c.x,c.y),o.lineTo(g.x,g.y),o.strokeStyle=y,o.lineWidth=2,o.setLineDash([4,2]),o.stroke(),o.setLineDash([]),o.beginPath(),o.arc(g.x,g.y,3.5,0,Math.PI*2),o.fillStyle=y,o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1,o.stroke();let p=g.x-c.x,B=g.y-c.y,_=Math.hypot(p,B)||1,a=12,d=g.x+p/_*a,M=g.y+B/_*a;o.font='bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle=y,o.fillText(l[u].name,d,M)}(n.vertexX||n.vertexY||n.vertexZ)&&(o.beginPath(),o.arc(c.x,c.y,4,0,Math.PI*2),o.fillStyle="#000000",o.fill(),o.strokeStyle="rgba(255,255,255,0.85)",o.lineWidth=1.2,o.stroke());let b=e({x:.5,y:.5,z:.5}),m=.35,x=[{from:{x:-m,y:.5,z:.5},to:{x:1+m,y:.5,z:.5},color:S[0],name:"Cx",visible:n.centerX},{from:{x:.5,y:-m,z:.5},to:{x:.5,y:1+m,z:.5},color:S[1],name:"Cy",visible:n.centerY},{from:{x:.5,y:.5,z:-m},to:{x:.5,y:.5,z:1+m},color:S[2],name:"Cz",visible:n.centerZ}],C=!1;for(let u=0;u<x.length;u++){if(!x[u].visible)continue;C=!0;let g=e(x[u].from),y=e(x[u].to);o.beginPath(),o.moveTo(g.x,g.y),o.lineTo(y.x,y.y),o.strokeStyle=x[u].color,o.lineWidth=2,o.setLineDash([]),o.stroke(),o.beginPath(),o.arc(g.x,g.y,3,0,Math.PI*2),o.arc(y.x,y.y,3,0,Math.PI*2),o.fillStyle=x[u].color,o.fill()}C&&(o.beginPath(),o.arc(b.x,b.y,3.5,0,Math.PI*2),o.fillStyle="#111827",o.fill(),o.strokeStyle="#ffffff",o.lineWidth=1.5,o.stroke());let f=n.angleGuides!==void 0?n.angleGuides:n.yawArc||n.pitchArc||!1,z=Math.round(i.rotZRad*180/Math.PI*10)/10,v=Math.round(i.rotXRad*180/Math.PI*10)/10;if(f){o.beginPath();let u=36;for(let y=0;y<=u;y++){let p=y/u*Math.PI*2,B={x:.5+Math.cos(p)*.75,y:.5+Math.sin(p)*.75,z:0},_=e(B);y===0?o.moveTo(_.x,_.y):o.lineTo(_.x,_.y)}o.strokeStyle="rgba(59, 130, 246, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.beginPath();let g=20;for(let y=0;y<=g;y++){let p=-Math.PI/2+y/g*Math.PI,B={x:.5+Math.cos(p)*.75,y:.5,z:.5+Math.sin(p)*.75},_=e(B);y===0?o.moveTo(_.x,_.y):o.lineTo(_.x,_.y)}o.strokeStyle="rgba(239, 68, 68, 0.35)",o.lineWidth=1.5,o.setLineDash([3,3]),o.stroke(),o.setLineDash([]),o.font='500 11px ui-monospace, "SF Mono", monospace',o.textAlign="left",o.textBaseline="bottom",o.fillStyle="rgba(59, 130, 246, 0.9)",o.fillText(`Yaw: ${z.toFixed(1)}\xB0`,12,r.y*2-24),o.fillStyle="rgba(239, 68, 68, 0.9)",o.fillText(`Pitch: ${v.toFixed(1)}\xB0`,12,r.y*2-10)}o.restore()}var bo=`
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
`;function zo(o,t){let r=window.devicePixelRatio||1,i=document.createElement("div");i.style.position="relative",i.style.width=`${t}px`,i.style.height=`${t}px`,i.style.userSelect="none";let s=document.createElement("canvas");s.width=t*r,s.height=t*r,s.style.width=`${t}px`,s.style.height=`${t}px`,s.style.position="absolute",s.style.left="0",s.style.top="0";let n=document.createElement("canvas");n.width=t*r,n.height=t*r,n.style.width=`${t}px`,n.style.height=`${t}px`,n.style.position="absolute",n.style.left="0",n.style.top="0",n.style.pointerEvents="none",i.appendChild(s),i.appendChild(n),o.appendChild(i);let e=s.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!1}),c=n.getContext("2d");c.scale(r,r);let h=(z,v)=>{let u=e.createShader(z);return e.shaderSource(u,v),e.compileShader(u),e.getShaderParameter(u,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(u)),u},l=h(e.VERTEX_SHADER,bo),b=h(e.FRAGMENT_SHADER,go),m=e.createProgram();e.attachShader(m,l),e.attachShader(m,b),e.linkProgram(m);let x=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,x),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let C=e.getAttribLocation(m,"position");e.enableVertexAttribArray(C),e.vertexAttribPointer(C,2,e.FLOAT,!1,0,0);let f={u_resolution:e.getUniformLocation(m,"u_resolution"),u_box_size:e.getUniformLocation(m,"u_box_size"),u_radius:e.getUniformLocation(m,"u_radius"),u_rot:e.getUniformLocation(m,"u_rot"),u_zoom:e.getUniformLocation(m,"u_zoom"),u_mode:e.getUniformLocation(m,"u_mode"),u_invert:e.getUniformLocation(m,"u_invert"),u_show_front:e.getUniformLocation(m,"u_show_front"),u_show_back:e.getUniformLocation(m,"u_show_back"),u_front_width:e.getUniformLocation(m,"u_front_width"),u_back_width:e.getUniformLocation(m,"u_back_width"),u_front_dashed:e.getUniformLocation(m,"u_front_dashed"),u_back_dashed:e.getUniformLocation(m,"u_back_dashed"),u_front_color:e.getUniformLocation(m,"u_front_color"),u_back_color:e.getUniformLocation(m,"u_back_color")};return{gl:e,overlayCtx:c,canvasGL:s,canvasOverlay:n,width:t,height:t,program:m,uniforms:f}}function po(o,t,r,i,s,n,e,c,h){let{gl:l,overlayCtx:b,width:m,height:x,program:C,uniforms:f}=o,z=window.devicePixelRatio||1;l.viewport(0,0,m*z,x*z),l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),l.useProgram(C),l.uniform2f(f.u_resolution,m*z,x*z),l.uniform3f(f.u_box_size,r.sizeX,r.sizeY,r.sizeZ),l.uniform1f(f.u_radius,r.radius!==void 0?r.radius:.001),l.uniform3f(f.u_rot,t.rotXRad,t.rotYRad,t.rotZRad),l.uniform1f(f.u_zoom,t.zoom||1),l.uniform1i(f.u_mode,i==="rgb"?0:i==="hsb"?1:2),l.uniform1i(f.u_invert,s?1:0),l.uniform1i(f.u_show_front,e.showFront?1:0),l.uniform1i(f.u_show_back,e.showBack?1:0),l.uniform1f(f.u_front_width,e.frontWidth||1.5),l.uniform1f(f.u_back_width,e.backWidth||1),l.uniform1i(f.u_front_dashed,e.frontDashed?1:0),l.uniform1i(f.u_back_dashed,e.backDashed?1:0),l.uniform4f(f.u_front_color,1,1,1,e.frontOpacity||.65),l.uniform4f(f.u_back_color,1,1,1,e.backOpacity||.25),l.drawArrays(l.TRIANGLES,0,6),b.save(),b.clearRect(0,0,m,x);let v=m*.26,u={x:m*.5,y:x*.5};if(yo(b,v,u,t,r,n),h){let g=X(c,v,u,t,r),y=E(c,i),p=s?{r:255-y.r,g:255-y.g,b:255-y.b}:y;b.beginPath(),b.arc(g.x,g.y,6,0,Math.PI*2),b.fillStyle=`rgb(${p.r}, ${p.g}, ${p.b})`,b.fill(),b.strokeStyle="#ffffff",b.lineWidth=2,b.stroke()}b.restore()}function ne(o,t={}){let r=t.size||460,i=t.mode||"rgb",s=!1,n={...mo},e={...fo,radius:.08},c={...co},h={...lo},l=t.initialColor||{r:255,g:255,b:255},b=Q(l,i),m=new Set,x=zo(o,r),C=null,f=()=>{C===null&&(C=requestAnimationFrame(()=>{C=null,po(x,n,e,i,s,c,h,b,!0)}))},z=()=>{let a=E(b,i),d=s?{r:255-a.r,g:255-a.g,b:255-a.b}:a,M=F(d),V=Y(d),I=j(d),Z={rgb:d,hsb:M,oklch:V,hex:I,alpha:1};m.forEach(O=>O(Z))},v=!1,u=!1,g=0,y=0,p=n.rotZRad,B=n.rotXRad,_=(a,d)=>{let M=x.canvasGL.getBoundingClientRect(),V=(a-M.left)*(x.width/M.width),I=(d-M.top)*(x.height/M.height),Z=V-x.width*.5,O=x.height*.5-I,J=x.width*.26*1.6*(n.zoom||1),oo={x:Z/J,y:O/J},D={x:e.sizeX*.5,y:e.sizeY*.5,z:e.sizeZ*.5},Co=Math.min(Math.min(D.x,D.y),D.z),G=Math.min(e.radius||.001,Co*.49),eo=Math.cos(n.rotXRad),to=Math.sin(n.rotXRad),no=Math.cos(n.rotYRad),ro=Math.sin(n.rotYRad),ao=Math.cos(n.rotZRad),io=Math.sin(n.rotZRad),_o=R=>{let A=R.x,L=-R.y*to+R.z*eo,k=R.y*eo+R.z*to,w=A*no-k*ro,P=L,H=A*ro+k*no,W=w*ao+P*io,N=-w*io+P*ao;return{x:W,y:N,z:H}},vo=R=>{let A=Math.abs(R.x)-(D.x-G),L=Math.abs(R.y)-(D.y-G),k=Math.abs(R.z)-(D.z-G),w=Math.max(A,0),P=Math.max(L,0),H=Math.max(k,0),W=Math.hypot(w,P,H),N=Math.min(Math.max(A,Math.max(L,k)),0);return W+N-G},U=0,so=!1,T={x:0,y:0,z:0};for(let R=0;R<96;R++){let A={x:oo.x,y:oo.y,z:-5+U},L=_o(A),k=vo(L);if(k<.001){so=!0,T=L;break}if(U+=k,U>10)break}if(so){let R=Math.max(0,Math.min(1,T.x/e.sizeX+.5)),A=Math.max(0,Math.min(1,T.y/e.sizeY+.5)),L=Math.max(0,Math.min(1,T.z/e.sizeZ+.5));b={x:R,y:A,z:L},z(),f()}};return x.canvasGL.addEventListener("mousedown",a=>{a.button===1||a.button===0&&a.altKey?(v=!0,g=a.clientX,y=a.clientY,p=n.rotZRad,B=n.rotXRad,document.body.style.cursor="grabbing",a.preventDefault()):a.button===0&&(u=!0,_(a.clientX,a.clientY))}),x.canvasGL.addEventListener("auxclick",a=>{a.button===1&&a.preventDefault()}),window.addEventListener("mousemove",a=>{if(v){let d=a.clientX-g,M=a.clientY-y;n.rotZRad=p+d*.01,n.rotXRad=Math.max(-Math.PI/2,Math.min(Math.PI/2,B-M*.01)),f()}else u&&_(a.clientX,a.clientY)}),window.addEventListener("mouseup",a=>{v&&(v=!1,document.body.style.cursor="default"),u&&(u=!1)}),x.canvasGL.addEventListener("wheel",a=>{a.preventDefault();let d=a.deltaY<0?.08:-.08;n.zoom=Math.max(.2,Math.min(2.5,(n.zoom||1)+d)),f()},{passive:!1}),x.canvasGL.addEventListener("dblclick",()=>{s=!s,z(),f()}),f(),z(),{getColor:()=>{let a=E(b,i),d=s?{r:255-a.r,g:255-a.g,b:255-a.b}:a;return{rgb:d,hsb:F(d),oklch:Y(d),hex:j(d),alpha:1}},setColor:a=>{l=a,b=Q(a,i),z(),f()},setMode:a=>{i=a,z(),f()},getMode:()=>i,setRotation:(a,d)=>{n.rotZRad=a*Math.PI/180,n.rotXRad=d*Math.PI/180,f()},getAxisRotation:()=>({rotXDeg:Math.round(n.rotXRad*180/Math.PI*10)/10,rotYDeg:Math.round(n.rotYRad*180/Math.PI*10)/10,rotZDeg:Math.round(n.rotZRad*180/Math.PI*10)/10}),setAxisRotation:(a,d,M)=>{n.rotXRad=a*Math.PI/180,n.rotYRad=d*Math.PI/180,n.rotZRad=M*Math.PI/180,f()},setZoom:a=>{n.zoom=Math.max(.1,Math.min(3,a)),f()},getZoom:()=>n.zoom||1,setDimensions:(a,d,M)=>{e.sizeX=Math.max(.2,Math.min(2.5,a)),e.sizeY=Math.max(.2,Math.min(2.5,d)),e.sizeZ=Math.max(.2,Math.min(2.5,M)),f()},getDimensions:()=>({sizeX:e.sizeX,sizeY:e.sizeY,sizeZ:e.sizeZ}),setRadius:a=>{e.radius=Math.max(0,Math.min(.5,a)),f()},getRadius:()=>e.radius,getEdgeStyle:()=>({...h}),setEdgeStyle:a=>{h={...h,...a},f()},getGuides:()=>({...c}),setGuides:a=>{c={...c,...a},f()},toggleAllGuides:a=>{let d=a!==void 0?a:!c.vertexX;c={vertexX:d,vertexY:d,vertexZ:d,centerX:d,centerY:d,centerZ:d,angleGuides:d},f()},on:(a,d)=>{m.add(d)},off:(a,d)=>{m.delete(d)},destroy:()=>{C!==null&&cancelAnimationFrame(C),o.innerHTML=""}}}export{ne as createRoundedBoxPicker};
