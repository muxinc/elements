#!/usr/bin/env bash

# npm publish with goodies
# inspired by https://gist.github.com/stevemao/280ef22ee861323993a0
#
# release with optional argument `patch`/`minor`/`major`/`canary`/`<version>`
# defaults to conventional-recommended-bump

function main {
  processCommandLineArgs "$@"
  release "$@"
}

function processCommandLineArgs {
  for arg in "$@"
  do
    case $arg in
      canary)
        canary
        exit 0
        ;;
      --help|help)
        echo "Commands:"
        echo "  $0            Publish a release from conventional commits."
        echo "  $0 canary     Publish a canary."
        echo "  $0 patch      Publish a patch release."
        echo "  $0 minor      Publish a minor release."
        echo "  $0 major      Publish a major release."
        echo "  $0 <version>  Publish a release with a specific version."
        exit 0
        ;;
      *)
        ;;
    esac
  done
}

function release {
  BUMP=$(npx -p conventional-changelog-angular -p conventional-recommended-bump -c 'conventional-recommended-bump -p angular')
  VERSION=$(npm --no-git-tag-version version ${1:-$BUMP})
  npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
  git add CHANGELOG.md
  git commit -m "docs(CHANGELOG): $VERSION"
  npm --force --allow-same-version version $VERSION -m "chore(release): %s"
  git push --follow-tags
  npx conventional-github-releaser -p angular
  npm publish --access public
  # `npm view name@x.x.x version` will return an empty string if not available
  until [ "$(npm view $PKG_NAME@$VERSION version)" != "" ];
  do
    echo "Waiting for publish to complete"
    sleep 3
  done
  # update all workspaces from the workspace root (../..) with the new version
  # make sure publish.sh is called in topological order, `lerna run` does this
  npx lerna-update-wizard --non-interactive --lazy --dependency $PKG_NAME@$VERSION ../..
};

function canary {
  PKG_NAME=$(cat package.json | jq -r '.name')
  PKG_VERSION=$(cat package.json | jq -r '.version')
  # get last published version from NPM without alpha / beta, remove -SHA hash
  LAST_VERSION=$(npm view $PKG_NAME versions --json |
    jq -r '. - map(select(contains("alpha") or contains("beta"))) | last' |
    sed -r 's/-[a-z0-9]{7}$//g')
  # GH actions made this a `null` string, replace it with a null value
  LAST_VERSION=$(echo $LAST_VERSION | sed "s/null//g")
  # default to local package version if no last version was found on NPM
  PRE_VERSION=$(npx semver ${LAST_VERSION:-$PKG_VERSION} -i prerelease --preid canary)
  VERSION=$PRE_VERSION-$(git rev-parse --short HEAD)
  echo "Beginning canary release for $PKG_NAME@$VERSION"
  npm --no-git-tag-version version $VERSION
  npm publish --tag canary --access public
  echo "canary release dist used for $PKG_NAME@$VERSION"
  ls dist
  # `npm view name@x.x.x version` will return an empty string if not available
  until [ "$(npm view $PKG_NAME@$VERSION version)" != "" ];
  do
    echo "Waiting for publish to complete"
    sleep 3
  done
  # update all workspaces from the workspace root (../..) with the new version
  # make sure publish.sh is called in topological order, `lerna run` does this
  npx lerna-update-wizard --non-interactive --lazy --dependency $PKG_NAME@$VERSION ../..
  echo "Ending canary release and lerna-update-wizard completed for $PKG_NAME@$VERSION"
}

main "$@"
