#!/usr/bin/env node
import { build } from 'esbuild';

const themes = ['classic', 'microvideo', 'minimal', 'gerwig'];
const devMode = process.argv.includes('--dev');

const shared = {
  bundle: true,
  target: 'es2019',
  loader: {
    '.html': 'text',
    '.css': 'text',
    '.svg': 'text',
  },
  watch: devMode,
};

// entryPoints doesn't support glob patterns so we iterate over known themes
themes.forEach((theme) => {
  //@ts-ignore
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    outdir: `./dist/themes/${theme}`,
  });

  //@ts-ignore
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'cjs',
    outExtension: { '.js': '.cjs.js' },
    outdir: `./dist/themes/${theme}`,
  });

  //@ts-ignore
  build({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'iife',
    globalName: `mediaTheme${theme[0].toUpperCase() + theme.slice(1)}`,
    outdir: `./dist/themes/${theme}`,
  });
});
