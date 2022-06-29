# Local Development

To run this repo locally, run `yarn` to install and link dependencies.

For dev testing, run `yarn dev`. By default, this only runs the packages.
To run examples, you'll want to run run a `yarn dev` in the example folder of your choice or modify the `dev` script in the [top level package.json](./package.json).
Examples:

- To run all examples
  - include `--scope 'demo-*'` in the dev script
  - Run `npx lerna run dev --scope 'demo-*'` locally after running `yarn dev`
- To only run `vanilla-ts-esm` demo
  - include `--scope '*-esm'` in the dev script
  - Run `npx lerna run dev --scope '*-esm'` locally after running `yarn dev`

# Media Chrome Canaries
It's helpful to point at Media Chrome canaries for developing PRs and having all the live examples work; however, we should not merge any PRs that point at a Media Chrome Canary release.

# Releasing

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
and Github Actions for continuously publishing Mux elements.

1. `cd` into the `elements` directory where the origin is set to `muxinc/elements`. Don't use your forked repo; use a separate directory that is cloned from `https://github.com/muxinc/elements`.
1. From the workspace root directory, run `yarn install`.
1. From the workspace root directory, run `yarn version:update`.
   This will bump the version of the packages changed since the last release and push those changes to Github.
   You might have to manually correct the version if the suggestion of Conventional Commits is not right.
1. Go to the [Github Actions tab for elements](https://github.com/muxinc/elements/actions), select "Deployment" action in the left sidebar
1. Click the "Run workflow" dropdown and "Run workflow" on the `main` branch
1. Starting this workflow will require an approval from a core contributor. Click into the 'pending' workflow to get it approved.
1. After approving this will kick off the deploy action which will publish all the updated packages to NPM and create release notes in Github
1. Confirm the package(s) were successfully published to npm by checking the latest version and publish time on npmjs, e.g.: https://www.npmjs.com/package/@mux-elements/mux-player
1. Confirm in the [Releases tab](https://github.com/muxinc/elements/releases) that the releases have been created.

# After releasing Mux Player

- Update stream.new
- Update the player on docs.mux.com
- Update the player on mux.com
- Update the Mux Player guide in the docs (document any new functionality, add release notes at the bottom)
- Post in #player to let product team know
