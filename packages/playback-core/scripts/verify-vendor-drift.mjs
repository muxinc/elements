import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(__dirname, '..');
const vendoredFile = 'src/vendor/mux-embed.ts';

execSync('node ./scripts/vendor-mux-embed-types.mjs', { cwd: pkgDir, stdio: 'inherit' });

try {
  execSync(`git diff --exit-code -- ${vendoredFile}`, { cwd: pkgDir, stdio: 'pipe' });
} catch {
  console.error(
    `Vendoring drift: ${vendoredFile} is out of sync with installed mux-embed. Run \`npm run vendor:types\` in packages/playback-core and commit the result.`
  );
  process.exit(1);
}
