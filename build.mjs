import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';

const shared = {
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['es2020'],
};

await esbuild.build({
  ...shared,
  entryPoints: ['src/index.ts'],
  format: 'esm',
  outfile: 'dist/color-is-box-rounded.js',
});

await esbuild.build({
  ...shared,
  entryPoints: ['src/index.ts'],
  format: 'iife',
  globalName: 'ColorIsBoxRounded',
  outfile: 'dist/color-is-box-rounded.iife.js',
});

console.log('BUILD COLOR-IS-BOX-ROUNDED OK');
