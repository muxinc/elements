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
  VERSION=$(yarn version --no-git-tag-version --new-version ${1:-$BUMP})

  npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
  git add CHANGELOG.md
  git commit -m "docs(CHANGELOG): $VERSION"
  yarn version --force --allow-same-version --new-version $VERSION --message "chore(release): %s"
  git push --follow-tags
  npx conventional-github-releaser -p angular

  echo "Beginning release $PKG_NAME@$VERSION"
  yarn publish --access public --non-interactive

  echo "Release dist for $PKG_NAME@$VERSION"
  ls dist

  # update all workspaces from the workspace root (../..) with the new version
  # make sure publish.sh is called in topological order, `lerna ls --toposort` does this
  DEPENDANT_PKGS=$(npx lerna ls --graph --toposort --scope @mux/* |
    jq -r "to_entries[] | select(.value[] | contains(\"$PKG_NAME\")) | .key")
  scope=""
  for name in ${DEPENDANT_PKGS}; do
    scope+="--scope $name "
  done
  npx lerna exec $scope -- npm pkg set dependencies.$PKG_NAME=$VERSION

  echo "Ending release $PKG_NAME@$VERSION"
};

function canary {
  PKG_NAME=$(cat package.json | jq -r '.name')
  PKG_VERSION=$(cat package.json | jq -r '.version')

  # get last published version from NPM without alpha / beta, remove -SHA hash

  # debug jq command at https://jqplay.org/s/Wwjv5hVUCL0
  #
  #   1. remove alpha or beta versions
  #   2 & 3. convert to { version: 'x.x.x', dist: 'canary', build: x }
  #   4. sort first by `version` then by `build` number
  #   5. put back together to a string `x.x.x-canary.x`
  #   6. pick the last item in the array

  LAST_VERSION=$(npm view $PKG_NAME versions --json |
    jq -r '. - map(select(contains("alpha") or contains("beta")))
      | map(capture("(?<version>\\d+\\.\\d+\\.\\d+)(-(?<dist>[a-z]+))?(\\.(?<build>\\d+))?"))
      | map(.build? |= (. // 0 | tonumber))
      | sort_by(.version, .build)
      | map(.version + "-" + (.dist // "latest") + "." + (.build|tostring))
      | last')

  # if json is empty GH actions made this a `null` string, replace it with a null value
  LAST_VERSION=$(echo $LAST_VERSION | sed "s/null//g")

  # default to local package version if no last version was found on NPM
  PRE_VERSION=$(npx semver ${LAST_VERSION:-$PKG_VERSION} -i prerelease --preid canary)
  VERSION=$PRE_VERSION-$(git rev-parse --short HEAD)

  echo "Beginning release $PKG_NAME@$VERSION"
  yarn version --no-git-tag-version --new-version $VERSION
  yarn publish --tag canary --access public --non-interactive

  echo "Release dist for $PKG_NAME@$VERSION"
  ls dist

  # update all workspaces from the workspace root (../..) with the new version
  # make sure publish.sh is called in topological order, `lerna ls --toposort` does this
  DEPENDANT_PKGS=$(npx lerna ls --graph --toposort --scope @mux/* |
    jq -r "to_entries[] | select(.value[] | contains(\"$PKG_NAME\")) | .key")
  scope=""
  for name in ${DEPENDANT_PKGS}; do
    scope+="--scope $name "
  done
  npx lerna exec $scope -- npm pkg set dependencies.$PKG_NAME=$VERSION

  echo "Ending release $PKG_NAME@$VERSION"
}

main "$@"
