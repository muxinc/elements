# test-esm-exports

This is a local module to build esm-exported versions of hls.js and mux-embed that only provide CJS or UMD modules on npm.

For our tests, we need ESM modules as native ESM is used via the web-test-runner. This works fine for modules like media-chrome and @github/template-parts but fails when hls.js or mux-embed are loaded.

## import-maps

In our tests configs, we configure `hls.js` and `mux-embed` `import` statements to point at the files that are built into `dist` of this local package.
So, `import Hls from 'hls.js'` would properly resolve `hls.js` and not fail trying to load an incorrect module type.

## How it's set up

Working with workspaces and web-test-runner, to be able to point at this local package's dist, we need to make the working directory of our test runner be the root of the repo, rather than package that is being tested directly.

In the `test` script, we need to add `--root-dir ../..` to `web-test-runner`, which points at the root of the repo.
For mux-player, the test command could look like this:

```sh
web-test-runner **/*test.js --port 8001 --coverage --config test/web-test-runner.config.mjs --root-dir ../..
```

Then, in `web-test-runner.config.mjs`, with the `@web/dev-server-import-maps` plugin, imports are configured so files from `test/` are grabbed from the expected working directory. For example, for mux-player, `'/test/': '/packages/mux-player/test/`. This is to basically undo the fact that we had set the root-dir up to the root of the repo rather than for the actual package.

Afterwards, we want to configure `hls.js` and `mux-embed` to point at a shared location. Currently, it's set up to point into the workspace's shared node_modules which yarn should set up: `'hls.js': '/node_modules/@mux/test-esm-exports/dist/hls.js'`.

So, the imports given to `@web/dev-server-import-maps` should look something like this:

```json
"imports": {
  "/test/": "/packages/mux-player/test/",
  "hls.js": "/node_modules/@mux/test-esm-exports/dist/hls.js",
  "mux-embed": "/node_modules/@mux/test-esm-exports/dist/mux-embed.js",
}
```
