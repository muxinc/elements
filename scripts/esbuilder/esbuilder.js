#!/usr/bin/env node
import * as process from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import esbuild from 'esbuild';

const camelCase = (name) => {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
};

const args = process.argv.slice(3).reduce((processArgs, val) => {
  let [key, value = true] = val.split('=');
  let [name, prop] = key.replace(/^--?/g, '').split(':');
  const processArgsKey = camelCase(name);
  const processArgsValue = prop ? { [prop]: value } : value;

  // Already has an entry, assume this is an array or complex object of K:V pairs
  if (processArgs[processArgsKey]) {
    // If it's already an array, assume all values are elements of the array
    if (Array.isArray(processArgs[processArgsKey])) {
      processArgs[processArgsKey].push(processArgsValue);
      // If it's an (non-array) object and the value is also an object,
      // assume it's a K:V object
    } else if (typeof processArgs[processArgsKey] === 'object' && typeof processArgsValue === 'object') {
      processArgs[processArgsKey] = {
        ...processArgs[processArgsKey],
        ...processArgsValue,
      };
      // Otherwise, assume it needs to be converted to an array of simple values
    } else {
      processArgs[processArgsKey] = [processArgs[processArgsKey], processArgsValue];
    }
  } else {
    processArgs[processArgsKey] = processArgsValue;
  }
  return processArgs;
}, {});

// e.g. npm run build:esm --lang=nl
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
  outdir: args.outfile ? undefined : (args.outdir ?? 'dist'),
  bundle: true,
  target: 'es2019',
  minify: args.minify,
  sourcemap: args.sourcemap ?? false,
  format: args.format,
  outExtension: args.outExtension,
  external: !args.external ? [] : typeof args.external !== 'object' ? [args.external] : Object.keys(args.external),
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
  options.external.push('@mux/*');
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
