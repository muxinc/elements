import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve the mux-embed package root by walking up from its main entry
// (require.resolve respects exports, so we can't use a subpath directly)
const muxEmbedMain = require.resolve('mux-embed');
let pkgRoot = dirname(muxEmbedMain);
while (!existsSync(join(pkgRoot, 'package.json'))) {
  const parent = dirname(pkgRoot);
  if (parent === pkgRoot) {
    throw new Error(`Could not find mux-embed package.json starting from ${muxEmbedMain}`);
  }
  pkgRoot = parent;
}

const pkg = JSON.parse(await readFile(join(pkgRoot, 'package.json'), 'utf8'));
if (pkg.name !== 'mux-embed') {
  throw new Error(`Found package.json at ${pkgRoot}, but it is "${pkg.name}", not mux-embed`);
}

const SOURCE = join(pkgRoot, 'dist/types/mux-embed.d.ts');
const DEST = resolve(__dirname, '../src/vendor/mux-embed.ts');
const HEADER = `// AUTO-GENERATED — do not edit.
// Source: mux-embed@${pkg.version} / dist/types/mux-embed.d.ts
// Run \`npm run vendor:types\` to refresh.

`;

const content = await readFile(SOURCE, 'utf8');
await mkdir(dirname(DEST), { recursive: true });
await writeFile(DEST, HEADER + content);
console.log(`Vendored mux-embed@${pkg.version} types -> ${DEST}`);
