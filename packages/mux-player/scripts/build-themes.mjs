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
  // @ts-ignore
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    outdir: `./themes/${theme}`,
  });

  // @ts-ignore
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'cjs',
    outExtension: { '.js': '.cjs.js' },
    outdir: `./themes/${theme}`,
  });

  // @ts-ignore
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'iife',
    globalName: `mediaTheme${theme}`,
    outdir: `./themes/${theme}`,
  });
});
