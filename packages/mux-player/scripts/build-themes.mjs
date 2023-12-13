#!/usr/bin/env node
import esbuild from 'esbuild';

const themes = ['classic', 'microvideo', 'minimal', 'gerwig'];
const devMode = process.argv.includes('--dev');

const shared = {
  bundle: true,
  target: 'es2019',
  logLevel: 'info',
  loader: {
    '.html': 'text',
    '.css': 'text',
    '.svg': 'text',
  },
};

// entryPoints doesn't support glob patterns so we iterate over known themes
for (const theme of themes) {
  //@ts-ignore
  const esm = {
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    outdir: `./dist/themes/${theme}`,
  };

  await esbuild.build(esm);

  if (devMode) {
    const context = await esbuild.context(esm);
    await context.watch();
  }

  //@ts-ignore
  const cjs = {
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'cjs',
    outExtension: { '.js': '.cjs.js' },
    outdir: `./dist/themes/${theme}`,
  };

  await esbuild.build(cjs);

  if (devMode) {
    const context = await esbuild.context(cjs);
    await context.watch();
  }

  //@ts-ignore
  const iife = {
    ...shared,
    entryPoints: [`./src/themes/${theme}/index.ts`],
    format: 'iife',
    globalName: `mediaTheme${theme[0].toUpperCase() + theme.slice(1)}`,
    outdir: `./dist/themes/${theme}`,
  };

  await esbuild.build(iife);

  if (devMode) {
    const context = await esbuild.context(iife);
    await context.watch();
  }
}
