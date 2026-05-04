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
while (pkgRoot !== '/' && !existsSync(join(pkgRoot, 'package.json'))) {
  pkgRoot = dirname(pkgRoot);
}

const SOURCE = join(pkgRoot, 'dist/types/mux-embed.d.ts');
const DEST = resolve(__dirname, '../src/vendor/mux-embed.ts');
const HEADER = `// AUTO-GENERATED — do not edit.\n// Source: mux-embed/dist/types/mux-embed.d.ts\n// Run \`npm run vendor:types\` to refresh.\n\n`;

const content = await readFile(SOURCE, 'utf8');
await mkdir(dirname(DEST), { recursive: true });
await writeFile(DEST, HEADER + content);
console.log(`Vendored mux-embed types -> ${DEST}`);
