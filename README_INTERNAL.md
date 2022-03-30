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

> Make sure you have a `GH_TOKEN` environment variable set to [create the release notes](https://github.com/lerna/lerna/tree/main/commands/version#--create-release-type) in Github.  
> This token can be created in Github under [Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).

1. From the workspace root directory, run `yarn version:update`.
   This will bump the version of the packages changed since the last release and push those changes to Github.
   You might have to manually correct the version if the suggestion of Conventional Commits is not right.
2. The cd.yml Github action will publish the new versions to NPM.
