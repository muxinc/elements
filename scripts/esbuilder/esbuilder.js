#!/usr/bin/env node
import path from 'path';
import { build } from 'esbuild';
import fs from 'fs';

const camelCase = (name) => {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
};

const args = process.argv.slice(3).reduce((processArgs, val) => {
  let [key, value] = val.split('=');
  let [name, prop] = key.replace(/^--?/g, '').split(':');
  processArgs[camelCase(name)] = prop ? { [prop]: value } : value ?? true;
  return processArgs;
}, {});

// e.g. yarn build:esm --lang=nl
const i18nPlugin = {
  name: 'example',
  setup(builder) {
    const { lang } = args;
    if (lang) {
      builder.onResolve({ filter: /en.json$/ }, (params) => {
        // Redirect all paths ending with "en.json" to "LANG.json"
        return { path: path.join(params.resolveDir, `../lang/${lang}.json`) };
      });
    }

    if (!lang) {
      builder.onLoad({ filter: /en.json$/ }, () => {
        // No need to import English, it's defined in the tagged template.
        return { contents: "const code = 'en'; export default { code }" };
      });
    }
  },
};

const esmScriptModule = args.format === 'esm-module';

const options = {
  entryPoints: [process.argv[2]],
  outdir: args.outdir ?? 'dist',
  bundle: true,
  target: 'es2019',
  minify: args.minify,
  format: args.format,
  watch: args.watch,
  outExtension: args.outExtension,
  metafile: true,
  plugins: [i18nPlugin],
  loader: {
    '.css': 'text',
    '.svg': 'text',
  },
  define: {
    PLAYER_VERSION: `"${process.env.npm_package_version}"`,
  },
};

if (options.format === 'esm' || options.format === 'cjs') {
  options.external = ['@mux-elements/*'];
}

if (options.format === 'esm') {
  options.external.push('@github/template-parts', 'media-chrome');
}

if (options.format === 'iife') {
  delete options.outdir;
  options.outfile = 'dist/mux-player.js';
}

if (esmScriptModule) {
  delete options.external;
  delete options.outdir;

  options.outfile = 'dist/mux-player.mjs';
  options.format = 'esm';
}

build(options).then(
  (result) => {
    let name = options.format;

    if (esmScriptModule) {
      name = 'module';
    }

    // write-out the metafile
    fs.writeFileSync(`./dist/${name}.json`, JSON.stringify(result.metafile));
  },
  () => process.exit(1)
);
