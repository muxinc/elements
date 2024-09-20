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

## Testing your changes to see what affect they have on version updates

You can do a dry-run locally of the `version:update` script by doing the following:

1. Create a new branch from `main`
2. Cherry pick commits from your working branch to it, including any needed footer e.g. "BREAKING CHANGE: ..."
3. Push new branch to remote
4. Run the script `yarn version:update` and select 'n' (no) for committing to the changes

# Media Chrome Canaries

It's helpful to point at Media Chrome canaries for developing PRs and having all the live examples work; however, we should not merge any PRs that point at a Media Chrome Canary release.

## Releasing new versions

### Short version (I've done this before!)
1. `cd ./my-clean-elements-repo && yarn install`
2. Run `yarn version:update` and review version change proposals for accuracy
3. Visit the [GitHub Actions tab for elements](https://github.com/muxinc/elements/actions)
4. In the left sidebar, select the **Deployment** action
5. Click the "Run workflow" dropdown and "Run workflow" on the `main` branch
6. Confirm successful releases at [GitHub](https://github.com/muxinc/elements/releases) and [NPM](https://www.npmjs.com/package/@mux/mux-player)
7. Update impacted project dependencies (ie. stream.new, docs.mux.com, mux.com)
8. Update any related documentation and changelog notes
9. Post in #player channel
---
### Long version (I need more context!)

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
and GitHub Actions for continuously publishing Mux elements.

> If you're unfamiliar with conventional commits, it's a good idea to review the link above before continuing.

Here's a quick summary of how we use conventional commits in this repository:

- Commit messages prefixed with `fix:` will notify CD that the release is minimally a `patch` release.
- Commit messages prefixed with `feat:` will notify CD that the release is minimally a `minor` release.
- Commit messages containing `BREAKING CHANGE` in the footer will notify CD that the release is minimally a `major` release.
- All other conventional commits have no impact on the versioning.

### First, prepare your local `elements` directory

It's critical to only release from a fresh copy of the `muxinc/elements` repo. There should be no divergence from what is published on the `main` branch on GitHub.

One way you might consider working is to have a local clone of `muxinc/elements` that you only use to release. That way, you'll never publish code that isn't intended to be released.

1. `cd` into the `elements` directory where the origin is set to `muxinc/elements`. Don't use your forked repo; use a separate directory that is cloned from `https://github.com/muxinc/elements`.
2. From the workspace root directory, run `yarn install`.

### Next, update and confirm the version numbers

Automated tooling will decide what the new version numbers should be based on the conventional commits used since last release. Don't worry; you'll be prompted with the version numbers and can confirm that they look correct before publishing.

1. From the workspace root directory, run `yarn version:update`.

Review the version changes to ensure they meet your expectations. You can abort this process with `n` or proceed with `y` and hit `Enter`.

> Note: We want the mux-player and mux-player-react versions to always be in sync. If they don't match, you should edit them manually so that they are the same version value.

   This will bump the version of the packages changed since the last release and push those changes to GitHub.
   <!-- discuss this next line in an OE eng sync mtg -->
   You might have to manually correct the version if the suggestion of Conventional Commits is not right.

### Last, perform the release

1. Visit the [GitHub Actions tab for elements](https://github.com/muxinc/elements/actions)
2. From the left sidebar, select the **Deployment** action
[ screenshot ]
2. Click the **Run workflow** dropdown and **Run workflow** on the `main` branch

This will kick off the deploy action, which will publish all of the updated packages to NPM and create release notes in GitHub.

3. Confirm the releases were successfully published by visiting the [GitHub Releases tab](https://github.com/muxinc/elements/releases)
4. Confirm the package(s) were successfully published to npm by checking the latest version and publish time on npmjs, e.g.: https://www.npmjs.com/package/@mux/mux-player

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
