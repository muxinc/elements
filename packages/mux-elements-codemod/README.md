<p align="center">
  <h1 align="center">mux-elements-codemod</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-elements-codemod?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-player.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-elements-codemod"><img src="https://img.shields.io/npm/v/@mux/mux-player.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-elements-codemod"><img src="https://img.shields.io/npm/l/@mux/mux-player.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

mux-elements-codemod is a CLI app to help run various migrations or codemods on users who use any of the mux elements.

# Usage

Easiest way to use it is via `npx` which ships with `npm`:

```sh
npx @mux/mux-elements-codemod
```

Alternatively, install it globally with `npm` or `yarn`

```sh
npm install --global @mux/mux-elements-codemod
mux-elements-codemod
```

By default, it will run in dry-run mode, so, you don't have to worry about it changing your files. Pass in `--force` for it to change any file.

## command usage

```sh
$ mux-elements-codemod --help

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
```

# Available codemods

## Imports

Currently, the only available codemod is a scope migration script for imports.

It allows you to bulk change multiple imports that use the old scope (`@mux-elements`) to the new scope (`@mux`).

```sh
$ mux-elements-codemod --imports ./src
Running in dry run mode. The following files will be modified:
src/player.tsx
Before:
	2:import MuxPlayer from "@mux-elements/mux-player-react";
After:
	2:import MuxPlayer from "@mux/mux-player-react";
```

And then, you can run it with `--force` to make the replacements inline.

```sh
$ mux-elements-codemod --imports ./src --force
Modifying the following files to replace `@mux-elements/` scope with `@mux/`:
src/player.tsx
```

## Package update

This command will allow you to more easily remove the old scoped packages (`@mux-elements/`) and re-add them via the new scope (`@mux`).

If the current working directory has a `package.json`, it will assume it's a module and will update the dependencies.
It will assume that `yarn` is being used when if a `yarn.lock` is present, otherwise, can be told to use a specific client via `--npm client yarn`.

```sh
$ mux-elements-codemod --package
The following dependencies will be removed and re-added with the updated @mux/ scope:
	 @mux-elements/mux-audio
	 @mux-elements/mux-audio-react
	 @mux-elements/mux-player
	 @mux-elements/mux-player-react
	 @mux-elements/mux-video
	 @mux-elements/mux-video-react
```

And then you can run it with `--force` to apply the changes

```sh
mux-elements-codemod -p --force
Running yarn remove on @mux-elements/mux-audio @mux-elements/mux-audio-react @mux-elements/mux-player @mux-elements/mux-player-react @mux-elements/mux-video @mux-elements/mux-video-react
yarn remove v1.22.17
[1/7] Removing module @mux-elements/mux-audio...
[2/7] Removing module @mux-elements/mux-audio-react...
[3/7] Removing module @mux-elements/mux-player...
[4/7] Removing module @mux-elements/mux-player-react...
[5/7] Removing module @mux-elements/mux-video...
[6/7] Removing module @mux-elements/mux-video-react...
[7/7] Regenerating lockfile and installing missing dependencies...
success Uninstalled packages.
Done in 0.39s.
Running yarn add on @mux-elements/mux-audio @mux-elements/mux-audio-react @mux-elements/mux-player @mux-elements/mux-player-react @mux-elements/mux-video @mux-elements/mux-video-react
yarn add v1.22.17
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 11 new dependencies.
info Direct dependencies
├─ @mux/mux-audio-react@0.4.0
├─ @mux/mux-audio@0.6.0
├─ @mux/mux-player-react@0.1.0-beta.22
├─ @mux/mux-player@0.1.0-beta.22
├─ @mux/mux-video-react@0.5.0
└─ @mux/mux-video@0.8.1
info All dependencies
├─ @github/template-parts@0.5.3
├─ @mux/mux-audio-react@0.4.0
├─ @mux/mux-audio@0.6.0
├─ @mux/mux-player-react@0.1.0-beta.22
├─ @mux/mux-player@0.1.0-beta.22
├─ @mux/mux-video-react@0.5.0
├─ @mux/mux-video@0.8.1
├─ hls.js@1.1.5
├─ media-chrome@0.6.9
├─ mux-embed@4.9.4
└─ react-is@16.13.1
Done in 7.31s.

Replacing @mux-elements scope to @mux in package succeeded successfully! 🎉
```
