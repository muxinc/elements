# Local Development

To run this repo locally, run `yarn` to install and link dependencies.

For dev testing, run `yarn dev`. By default, this only runs the packages.
To run examples, you'll want to run run a `yarn dev` in the example folder of your choice or modify the `dev` script in the [top level package.json](./package.json).
Examples:

- To run all examples
  - include `--filter 'demo-*'` in the dev script
  - Run `npx turbo run dev --filter 'demo-*'` locally after running `yarn dev`
- To only run `vanilla-ts-esm` demo
  - include `--filter '*-esm'` in the dev script
  - Run `npx turbo run dev --filter '*-esm'` locally after running `yarn dev`
  - Alternatively, run `yarn dev` and then, from another terminal, `cd ./examples/vanilla-ts-esm` and `yarn dev`

## Testing your changes

To run tests for the entire monorepo, run `yarn test` from the monorepo root. In addition, you can:

- Run tests across multiple browsers via `yarn test -- -- --all`
- Run tests for a particular package by navigating to that package and running its `yarn test` (with or without the `--all` flag)
  - Example: for `playback-core`, `cd ./packages/playback-core` and `yarn test`
- Run tests on Sauce Labs from your local machine (where available) by going to the relevant package and running `yarn test:saucelabs`
  - **NOTE**: This is only available for core contributors and requires `SAUCE_USERNAME` + `SAUCE_ACCESS_KEY` env variables setup. Reach out to relevant team members for assistance.
  - **NOTE**: Currently only implemented for the `mux-player` package.

# Media Chrome Canaries

It's helpful to point at Media Chrome canaries for developing PRs and having all the live examples work; however, we should not merge any PRs that point at a Media Chrome Canary release.

## Releasing new versions

### Short version (I've done this before!)

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
and [Release Please](https://github.com/googleapis/release-please) for continuously publishing Mux elements.

1. Merge your PR's with conventional commits to `main`
1. Wait for Release Please to create a release PR with the new version(s)
1. Review the release PR and merge it to kick of the release process
1. Confirm successful releases at [GitHub](https://github.com/muxinc/elements/releases) and [NPM](https://www.npmjs.com/package/@mux/mux-player)
1. Update impacted project dependencies (ie. stream.new, docs.mux.com, mux.com)
1. Update any related documentation and changelog notes
1. Post in #player channel

---

### Long version (I need more context!)

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
and [Release Please](https://github.com/googleapis/release-please) for continuously publishing Mux elements.

> If you're unfamiliar with conventional commits, it's a good idea to review the link above before continuing.

Here's a quick summary of how we use conventional commits in this repository:

- Commit messages prefixed with `fix:` will notify CD that the release is minimally a `patch` release.
- Commit messages prefixed with `feat:` will notify CD that the release is minimally a `minor` release.
- Commit messages containing `BREAKING CHANGE` in the footer will notify CD that the release is minimally a `major` release.
- All other conventional commits have no impact on the versioning.

### Merge and confirm the version numbers

Automated tooling will decide what the new version numbers should be based on the conventional commits used since last release. Don't worry; the new version numbers will be listed and you can confirm that they look correct before publishing.

1. Merge your PRs with conventional commits to the `main` branch.
1. Wait for the Release Please PR to be created.

Review the version changes to ensure they meet your expectations.

> Note: We want the mux-player and mux-player-react versions to always be in sync. If they don't match, you should make a small file change in the README.md of the package that is behind for example and create a conventional commit to bump the version of that package.

### Last, perform the release

1. Merge the Release Please PR to `main`.

This will kick off the release action, which will publish all of the updated packages to NPM and create release notes in GitHub.

1. Confirm the releases were successfully published by visiting the [GitHub Releases tab](https://github.com/muxinc/elements/releases)
1. Confirm the package(s) were successfully published to npm by checking the latest version and publish time on npmjs, e.g.: https://www.npmjs.com/package/@mux/mux-player

## After releasing Mux Player

Update the dependencies that we use across our projects and any references made in public documentation.

### stream.new
- Upgrade versions of mux-player and (maybe?) mux-uploader on stream.new
### docs.mux.com
- Update the `mux-player` version in the docs.mux.com `package.json`
- Update the Mux Player guide in the docs (document any new functionality, add release notes at the bottom)
### mux.com
- Update the `mux-player` version in the mux.com `package.json`
## Tell the world!
- Post in #player to let product team know you've released a new version. Consider using an Alphorn. [RIIIIIiiiiicoooollaaaaaa](https://en.wikipedia.org/wiki/Alphorn)
