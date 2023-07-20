#!/usr/bin/env node
import { build } from 'esbuild';

const themes = ['classic', 'microvideo', 'minimal'];

const shared = {
  bundle: true,
  target: 'es2019',
  loader: {
    '.html': 'text',
    '.css': 'text',
    '.svg': 'text',
  },
};

themes.forEach((theme) => {
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    outdir: `./dist/themes/${theme}`,
  });

  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'cjs',
    outExtension: { '.js': '.cjs.js' },
    outdir: `./dist/themes/${theme}`,
  });

  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'iife',
    globalName: `mediaTheme${theme}`,
    outdir: `./dist/themes/${theme}`,
  });
});
