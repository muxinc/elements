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
  outfile: args.outfile,
  outdir: args.outfile ? undefined : args.outdir ?? 'dist',
  bundle: true,
  target: 'es2019',
  minify: args.minify,
  format: args.format,
  watch: !!args.watch && {
    onRebuild(error, result) {
      if (error) console.error('[watch] build failed:', error);
      else console.log('[watch] build finished');
    },
  },
  outExtension: args.outExtension,
  metafile: true,
  plugins: [i18nPlugin],
  loader: {
    '.html': 'text',
    '.css': 'text',
    '.svg': 'text',
  },
  define: {
    PLAYER_VERSION: `"${process.env.npm_package_version}"`,
  },
};

if (options.format === 'esm' || options.format === 'cjs') {
  options.external = ['@mux/*'];
}

if (options.format === 'esm') {
  options.external.push('media-chrome');
}

if (esmScriptModule) {
  delete options.external;
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

    if (!!args.watch) console.log('[watch] build finished, watching for changes...');
  },
  () => process.exit(1)
);
