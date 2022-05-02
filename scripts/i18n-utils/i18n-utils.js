#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const srcFile = process.argv[2];
const langFolder = process.argv[3];
const baseLangFile = `${langFolder}/en.json`;
const srcContents = fs.readFileSync(srcFile).toString();
const baseLangContents = {};

const strings = [];
// @see https://regexr.com/6jtib
const regex = /\b(?:i18n\(\s*['"`](.*?)['"`]\s*[,)])/g;
let result;

while ((result = regex.exec(srcContents)) !== null) {
  strings.push(result[1]);
}

for (let file of walkSync(langFolder)) {
  const oldDict = JSON.parse(fs.readFileSync(file).toString());
  let dict = {};
  if (file.endsWith('en.json')) {
    for (let str of strings) {
      dict[str] = str;
    }
  } else {
    for (let str of strings) {
      dict[str] = oldDict[str] ?? str;
    }
  }

  fs.writeFileSync(file, JSON.stringify(dict, null, '  '));
  console.log(`${strings.length} strings (${Object.keys(dict).length} unique) written to ${file}`);
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}
