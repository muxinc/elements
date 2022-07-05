#!/usr/bin/env node

// @ts-ignore
// importing it as `process` doesn't preserve the argv properly
import { argv } from 'node:process';
import path from 'path';
import sh, { type ShellString } from 'shelljs';
import minimist from 'minimist';
import chalk from 'chalk';

const args = minimist(argv.slice(2), {
  string: ['extensions'],
  boolean: ['imports'],
  default: {
    extensions: 'js ts jsx tsx json html mjs cjs',
    imports: false,
    force: false,
  },
  alias: {
    e: 'extensions',
    i: 'imports',
    f: 'force',
  },
});

const paths = args._;
const ignoresArray = args.ignore ? [].concat(args.ignore) : [];
const exts = (args.extensions.split(' ') as string[]).map((ext) => (ext.startsWith('.') ? ext : '.' + ext)) as string[];
const force = args.force;

if (paths.length === 0) {
  paths.push('./');
}
const printHelp = () => {
  sh.echo(
    `
$ mux-elements-codemod [OPTIONS] [paths ...]
$ mux-elements-codemod [--help|-h]

paths can be regular globbed items or a list of folders
The default path is ./

Examples:
$ mux-elements-codemod -i ./packages ./examples
$ mux-elements-codemod --imports ./packages
$ mux-elements-codemod --imports ./examples/**/*.tsx
$ mux-elements-codemod --extensions="tsx jsx" --imports ./examples/
$ mux-elements-codemod -e="tsx jsx" --imports ./examples/ --ignore .next --ignore dist

Options:
  -i --imports      update imports/requires scope from @mux-elements to @mux
     --ignore       Add a name to ignore in the files, multiples can be provided
  -e --extensions   specifiy the specific file extensions to use as a space separated string
                    default is "js ts jsx tsx json html mjs cjs"
  -f --force        by default, this does a dry run, run with --force to replace the text inline
  -h --help         show this help
`
  );
};

const getFiles = (
  folders: string[],
  ignores: string[],
  extensions: string[],
  predicate?: (file: string | ShellString) => boolean
) => {
  return sh.find(folders).filter((file) => {
    // if we aren't in a node_modules
    // the file matches our given extension
    // return true unless a predicate is provided, in which case,
    // return the value from the predicate
    if (
      !file.includes('node_modules') &&
      !ignores.some((ignore) => file.includes(ignore)) &&
      extensions.includes(path.extname(file))
    ) {
      if (predicate) {
        return predicate(file);
      } else {
        return true;
      }
    }

    return false;
  }) as ShellString[];
};

const imports = () => {
  const files = getFiles(paths, ignoresArray, exts, (file: string | ShellString) =>
    sh.cat(file).includes('@mux-elements')
  );

  if (force) {
    sh.echo('Modifying the following files to replace `@mux-elements/` scope with `@mux`:');
  } else {
    sh.echo('Running in dry run mode. The following files will be modified:');
  }

  files.forEach((file) => {
    const sedOptions: [string, string, string] | [string, string, string, string] = ['@mux-elements/', '@mux/', file];
    if (force) {
      sedOptions.unshift('-i');
    }
    const sedFile = sh.sed(...sedOptions);

    sh.echo(`${chalk.green(file)}`);
    if (!force) {
      const lineNumbers: number[] = [];
      const lines = sedFile.split('\n').filter((line, i) => {
        const included = line.includes('@mux');
        if (included) {
          lineNumbers.push(i);
        }
        return included;
      });

      sh.echo('Before:');
      lines.forEach((line, i) => {
        sh.echo(`\t${chalk.yellow(lineNumbers[i])}:${line.replace('@mux/', '@mux-elements/')}`);
      });
      sh.echo('After:');
      lines.forEach((line, i) => {
        sh.echo(`\t${chalk.yellow(lineNumbers[i])}:${line}`);
      });
    }
  });
};

if (args.help) {
  printHelp();
} else if (args.imports) {
  imports();
} else {
  printHelp();
}
