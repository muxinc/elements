#!/usr/bin/env node
import * as process from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import esbuild from 'esbuild';

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

const onBuildEnd = {
  name: 'on-build-end',
  setup(build) {
    build.onEnd((result) => {
      const name = esmScriptModule ? 'module' : options.format;
      // write-out the metafile
      fs.writeFileSync(`./dist/${name}.json`, JSON.stringify(result.metafile));
    });
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
  outExtension: args.outExtension,
  metafile: true,
  logLevel: 'info',
  plugins: [i18nPlugin, onBuildEnd],
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

await esbuild.build(options);

if (args.watch) {
  const context = await esbuild.context(options);
  await context.watch();
}
