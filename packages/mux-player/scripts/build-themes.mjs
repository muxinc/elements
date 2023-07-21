#!/usr/bin/env node
import { context } from 'esbuild';

const themes = ['classic', 'microvideo', 'minimal'];
const devMode = process.argv.includes('--dev');

const shared = {
  bundle: true,
  target: 'es2019',
  loader: {
    '.html': 'text',
    '.css': 'text',
    '.svg': 'text',
  },
};

// entryPoints doesn't support glob patterns so we iterate over known themes
themes.forEach(async (theme) => {
  //@ts-ignore
  const esm = await context({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    outdir: `./dist/themes/${theme}`,
  });
  await esm.rebuild();
  devMode ? esm.watch() : await esm.dispose();

  //@ts-ignore
  const cjs = await context({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'cjs',
    outExtension: { '.js': '.cjs.js' },
    outdir: `./dist/themes/${theme}`,
  });
  await cjs.rebuild();
  devMode ? cjs.watch() : await cjs.dispose();

  //@ts-ignore
  const iife = await context({
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'iife',
    globalName: `mediaTheme${theme}`,
    outdir: `./dist/themes/${theme}`,
  });
  await iife.rebuild();
  devMode ? iife.watch() : await iife.dispose();
});
