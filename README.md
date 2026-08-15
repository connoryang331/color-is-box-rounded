# color-is-box-rounded

Zero-dependency **RGB / HSV / OKLCH color picker** rendered as a real 3D **rounded bevel box** with
GPU **raymarching** (SDF), Blender-style viewport controls, and axis-fixed local rotation.
Tiny, framework-agnostic, works everywhere.

## Features

- 🧊 **True 3D rounded bevel box** — rendered on the GPU via SDF raymarching (WebGL 1, no libraries)
- 🎨 **RGB / HSB / OKLCH modes** — the three color channels map to the box's X / Y / Z axes
- 🔄 **Local-axis rotation** — ROT X / Y / Z each rotate the box around its *own* axis, so the
  matching guide line (red / green / blue) stays perfectly still while the box spins around it
- 🎥 **Blender-style viewport** — middle-drag (or drag on empty space) orbits a separate *camera*;
  object rotation values never change while orbiting
- 🖱 **Pixel-exact picking** — CPU raycast mirrors the GPU shader exactly (same SDF, same matrix inverse)
- 🔺 **Saturation triangle** — hold **Ctrl / ⌘** to reveal a current-color / white / black triangle
  overlaid on the cube; dragging inside it adjusts saturation & brightness while preserving hue
  (barycentric mix, exact GPU gradient). A marker dot shows your current position; release Ctrl to
  hide it again. Left-click always picks from the cube — no modifier, no accidental tuning.
  Degenerate colors (gray / white / black) still show the W–K gray axis. (Toggle with SV Triangle guide)
- ⌨️ **Keyboard** — `R` reset, `F` / `B` / `T` front / back / top views, arrow keys nudge rotation
- 🎚 **Blender-style numeric sliders** in the demo — drag to scrub, click to type a value, `Shift` drag for fine control
- 📐 **Center axis guides** (`Cx` / `Cy` / `Cz`) + toggleable front / back edge wireframe
- 🔵 **Rounded corners** — bevel radius from sharp cube (0%) to pill / sphere (100%)
- 🗜 **Small & fast** — minified ESM + IIFE bundles via esbuild
- 🗂 **Typed** — strict TypeScript, types included
- 💨 **Zero dependencies** — no build needed for the demo (IIFE)

## Supported color models

| Mode | Channel order | Example |
| --- | --- | --- |
| `rgb` | R → X, G → Y, B → Z | `255, 255, 255` |
| `hsb` | H → X, S → Y, B → Z | `0, 0, 100` |
| `oklch` | L → X, C → Y, H → Z | `100, 0, 0` |

## Usage — JS API

```html
<script src="../dist/color-is-box-rounded.iife.js"></script>
<div id="holder"></div>
<script>
  const picker = ColorIsBoxRounded.createRoundedBoxPicker(document.getElementById('holder'), {
    initialColor: { r: 255, g: 255, b: 255 },
    size: 520,
    mode: 'rgb',
  });

  picker.on('change', (c) => console.log(c.hex, c.rgb, c.hsb, c.oklch));
  picker.setColor({ r: 0, g: 128, b: 255 });
  picker.rotateLocal('y', 45);          // spin 45° around the local Y axis (green line stays put)
  picker.resetRotation(8, -20, -55);    // reset to the default view
</script>
```

ESM:

```js
import { createRoundedBoxPicker } from 'color-is-box-rounded';
const picker = createRoundedBoxPicker(holderEl, { size: 460 });
```

### Options

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `initialColor` | `RGBColor` | `{ r: 255, g: 255, b: 255 }` | starting color |
| `size` | number | `460` | picker width / height in px |
| `mode` | `'rgb'` / `'hsb'` / `'oklch'` | `'rgb'` | color space |

### Methods

| Method | Description |
| --- | --- |
| `getColor()` | current `ColorOutput` `{ rgb, hsb, oklch, hex, alpha }` |
| `setColor(rgb)` / `setMode(mode)` / `getMode()` | color & mode |
| `rotateLocal(axis, deltaDeg)` | incremental rotation around the box's current local axis (`'x'` / `'y'` / `'z'`) — the axis guide stays fixed |
| `setAxisRotation(xDeg, yDeg, zDeg)` | set each axis' accumulated angle (Blender sidebar semantics); deltas take the shortest path across ±180° |
| `getAxisRotation()` | accumulated angles per axis, wrapped to `[-180, 180)` |
| `resetRotation(xDeg, yDeg, zDeg)` | absolute reset of object orientation + viewport (used by presets) |
| `setRotation(yawDeg, pitchDeg)` | legacy alias that resets object + viewport |
| `setZoom(z)` / `getZoom()` | zoom (0.1 – 3.0) |
| `setDimensions(x, y, z)` / `getDimensions()` | box size per axis (0.2 – 2.5) |
| `setRadius(r)` / `getRadius()` | bevel radius (0.0 – 0.5) |
| `setEdgeStyle(partial)` / `getEdgeStyle()` | front/back edge style (see below) |
| `setGuides(partial)` / `getGuides()` / `toggleAllGuides(visible?)` | guide visibility |
| `on('change', cb)` / `off('change', cb)` | subscribe / unsubscribe |
| `destroy()` | clean up & remove DOM |

`ColorOutput` shape:

```ts
{
  rgb: { r, g, b },
  hsb: { h, s, b },
  oklch: { l, c, h },
  hex: '#rrggbb',
  alpha: 1,
}
```

`EdgeStyleConfig` fields: `showFront`, `showBack`, `frontWidth`, `backWidth`, `frontDashed`,
`backDashed`, `frontColor`, `backColor`, `frontOpacity`, `backOpacity`.

## Interaction

| Gesture | Action |
| --- | --- |
| Left click / drag on box | pick color & move the picker dot |
| Left drag on **empty area** | orbit the viewport (grab cursor) |
| Middle drag / Alt + Left drag | free 360° viewport orbit (Blender style) |
| Mouse wheel | smooth zoom (0.2× – 2.5×) |
| Double click on box | invert color (white ↔ black) |
| Double click on empty | reset view (orientation + zoom) |
| `R` | reset view |
| `F` / `B` / `T` | front / back / top view (camera only — object values unchanged) |
| `←` `→` / `↑` `↓` | nudge ROT Y / ROT X by 5° |

Rotation model: all rotations pivot around the box's own local axes. `objMat` holds the object
orientation (driven by sliders / presets) and `viewMat` holds the camera orientation (driven by
orbit gestures); rendering, picking, and guides all use the combined matrix `viewMat · objMat`.

## Demo

Open `demo/index.html` directly in a browser (IIFE build, no server needed), or run a local server:

```bash
npm run dev    # http://localhost:3001/demo/index.html
```

The demo includes Blender-style numeric sliders (drag to scrub, click to type, `Shift` for fine
adjustment), Cube / Cuboid presets, guide & edge toggles, dark/light theme, and a pure zen mode.

## Files

- `src/` — TypeScript source (`index.ts` API + interaction, `camera-math.ts` matrix math,
  `shaders.ts` raymarching GLSL, `rounded-renderer.ts` WebGL + 2D overlay, `guide-renderer.ts`,
  `color-math.ts`, `types.ts`)
- `dist/color-is-box-rounded.js` — ESM bundle
- `dist/color-is-box-rounded.iife.js` — IIFE bundle (global `ColorIsBoxRounded`)
- `demo/index.html` — interactive demo
- `build.mjs` — esbuild build script

## Build

```bash
npm run build   # esbuild → ESM + IIFE bundles into dist/
```
