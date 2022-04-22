#!/usr/bin/env node

// Adapted from https://github.com/nonara/extract-changelog-release - License MIT

import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';
import { Octokit } from 'octokit';

const execAsync = promisify(exec);
const headerMatchRegex = /^#+[^\S\r\n]+\[\d+\.\d+\.\d+\S*?]\(.+?\)$|^#+[^\S\r\n]+\d+\.\d+\.\d+\S*?[^\S\r\n]+\(.+?\)$/gm;

export async function extractLog(changeLogPath) {
  changeLogPath = !changeLogPath
    ? path.resolve(process.cwd(), 'CHANGELOG.md')
    : path.isAbsolute(changeLogPath)
    ? changeLogPath
    : path.resolve(process.cwd(), changeLogPath);

  if (!existsSync(changeLogPath)) throw new Error(`Cannot resolve file: ${changeLogPath}`);

  const fileData = await readFile(changeLogPath, 'utf-8');

  headerMatchRegex.lastIndex = void 0;

  const startMatch = headerMatchRegex.exec(fileData);
  if (!startMatch) throw new Error(`Could not find matching header in changelog!`);

  const endMatch = headerMatchRegex.exec(fileData) ?? { 0: '', index: fileData.length };

  return fileData
    .slice(startMatch.index, endMatch.index)
    .replace(/((?:\r?\n){2})(?:\r?\n)+/g, '$1')
    .trim();
}

async function getTagName() {
  const pkg = await readFile(path.resolve(process.cwd(), 'package.json'), 'utf-8');
  const { name } = JSON.parse(pkg);
  try {
    const { stdout } = await execAsync(`git describe --match "${name}@*" --abbrev=0 --tags HEAD`);
    return stdout.trim();
  } catch (err) {
    console.error(err);
  }
}

const changelog = await extractLog(process.argv[2]);
const tag = await getTagName();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

try {
  await octokit.request('POST /repos/{owner}/{repo}/releases', {
    owner: 'muxinc',
    repo: 'elements',
    tag_name: tag,
    name: tag,
    body: changelog,
    draft: false,
    prerelease: tag.includes('-alpha.') || tag.includes('-beta.'),
    generate_release_notes: false,
  });
} catch (err) {
  console.error(err);
}
