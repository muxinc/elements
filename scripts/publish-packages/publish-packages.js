#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { argv } from 'node:process';
import { realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const nodePath = await realpath(argv[1]);
const modulePath = await realpath(fileURLToPath(import.meta.url));
const isCLI = nodePath === modulePath;

if (isCLI) cliPublish();

export async function cliPublish() {
  const { values } = parseArgs({
    options: {},
    strict: false,
    allowPositionals: true,
  });

  await publish(values);
}

export async function publish() {
  let remoteVersionsResult;
  try {
    remoteVersionsResult = await execAsync(`npm view . version -w . -w packages --json`);
  } catch (error) {
    // If the package is not published yet, npm view will fail with something like below on error.stdout:
    // {
    //   'player.style': '0.0.3',
    //   '@player.style/microvideo': '0.0.4',
    //   '@player.style/minimal': '0.0.4',
    //   error: {
    //     '@player.style/ytttt': {
    //       code: 'E404',
    //       summary: 'Not Found - GET https://registry.npmjs.org/@player.style%2fytttt - Not found',
    //       detail: "'@player.style/ytttt@*' is not in this registry.\n" +
    //         '\n' +
    //         'Note that you can also install from a\n' +
    //         'tarball, folder, http url, or git url.'
    //     }
    //   }
    // }
    remoteVersionsResult = error;
  }

  let newVersionsResult;
  try {
    newVersionsResult = await execAsync(`npm pkg get version -w . -w packages --json`);
  } catch (error) {
    newVersionsResult = error;
  }

  const remoteVersions = JSON.parse(remoteVersionsResult.stdout);
  const newVersions = JSON.parse(newVersionsResult.stdout);

  for (const [pkg, version] of Object.entries(newVersions)) {
    if (remoteVersions[pkg] === version) {
      console.log(`Skipping ${pkg}@${version} because it's already published`);
      continue;
    }

    console.log(`Publishing ${pkg}@${version}`);
    await execAsync(`npm publish -w ${pkg} --access public --provenance`);
  }
}
