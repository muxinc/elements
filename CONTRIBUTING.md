# Contributing to `<mux-elements/>`

- [Code of Conduct](#code-of-conduct)
- [Questions](#questions)
- [Bugs and Issues](#issues)
- [Documentation Updates](#documentation)
- [Feature Requests](#features)
- [Submitting a Pull Request](#pull-requests)

## <a name="code-of-conduct">Code of Conduct</a>

Before contributing, please read and make sure you follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## <a name="questions">Questions</a>

Have a question? Want to start a discussion? For now, you can simply [Open a New Issue](https://github.com/muxinc/elements/issues/new), prefix the `title` with "Question: [...]" or "Discussion: [...]", and add the `discussion` and/or `question` label to the issue.

## <a name="issues">Bugs and Issues</a>

If you think you've found a bug, make sure you review and fill out a [Bug Report](https://github.com/muxinc/elements/issues/new/choose) before starting any work. This will ensure for both yourself and the maintainers that the issue in question can be properly confirmed, reproduced, smoke tested, etc. Once done, go ahead and follow our [Submitting a Pull Request](#pull-requests) guide.

## <a name="documentation">Documentation Updates</a>

Our documentation update request requirements are similar to the requirements for [Bugs and Issues](#issues), except you'll want to review and fill out a [Docs Request](https://github.com/muxinc/elements/issues/new/choose) instead of a Bug Report.

## <a name="features">Feature Requests</a>

For feature requests, you can start by reviewing and filling out a [Feature Request](https://github.com/muxinc/elements/issues/new/choose). Unlike bug fixes, Feature Requests will likely require more discussion from the maintainers, including whether or not it is consistent with our overall architectural goals, our timeline and priorities, and the like. Once done, assuming you've gotten a 👍 to work on the feature, go ahead and follow our [Submitting a Pull Request](#pull-requests) guide.

## <a name="pull-requests">Submitting a Pull Request</a>

Before submitting a pull request, make sure you've reviewed and filled out an appropriate [Issue](https://github.com/muxinc/elements/issues/new/choose). We recommend doing this before starting any work, just in case an issue already exists, or it's unlikely the maintainers will be able to review the PR because it e.g. lacks sufficient reproduction steps. In addition, we recommend the following:

1. While we do not (_**yet!**_) use [semantic releases/commits](https://openbase.com/js/@semantic-release/commit-analyzer/documentation), please try to name your branch and prefix your commits according to the type of changes you're making, and try to be as descriptive as possible in your commit messages. For example:

- For Bug Fixes: `fix/my-fix-for-foo`
- For Features: `feat/mux-video-feat-bar`
- For Documentation Updates: `docs/mux-audio-example-for-baz`

2. Make sure you base your branch off of the latest in `main`, e.g.

   ```shell
   git checkout -b fix/my-fix-for-foo main
   ```

3. When issuing your Pull Request, be sure to [Link it to the corresponding issue(s)](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)

4. Add any additional comments to your PR's description that will help the reviewer(s), such as call outs, open questions, areas that merit extra attention, etc.

5. When addressing any feedback, you can simply add it as new commits.

6. We use a [rebase strategy](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-rebasing-for-pull-requests) when merging PR branches into `main`. If your branch has merge conflicts, if possible, please try to resolve them by doing a [`git rebase`](https://git-scm.com/docs/git-rebase) onto `main` and then doing a `git push --force-with-lease`. For example:

   ```shell
   git fetch upstream
   git rebase --onto main your-old-base fix/my-fix-for-foo
   ... resolve any conflicts
   git push --force-with-lease
   ```

   (See the [git docs](https://git-scm.com/docs/git-rebase) for more details on `git rebase --onto`)
