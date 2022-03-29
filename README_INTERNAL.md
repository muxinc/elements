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

# Releasing

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
and Github Actions for continuously publishing Mux elements.

1. From the workspace root directory, run `yarn version:update`.
   This will bump the version of the packages changed since the last release and push those changes to Github.
   You might have to manually correct the version if the suggestion of Conventional Commits is not right.
1. Go to the [Github Actions tab for elements](https://github.com/muxinc/elements/actions), select "Deployment" action in the left sidebar
1. Click the "Run workflow" dropdown and "Run workflow" on the `main` branch
1. Starting this workflow will require an approval. After approving this will kick off the deploy action which will publish all the updated packages to NPM
