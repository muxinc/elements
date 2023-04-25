#!/usr/bin/env bash

# npm publish with goodies
# inspired by https://gist.github.com/stevemao/280ef22ee861323993a0
#
# release with optional argument `patch`/`minor`/`major`/`canary`/`<version>`
# defaults to conventional-recommended-bump

dry_run=false
canary_run=false
release_type=
PKG_NAME=$(cat package.json | jq -r '.name')

function main {
  processCommandLineArgs "$@"
  if "$dry_run"; then
    echo
    echo "Running publish on $PKG_NAME in dry-run move. This will run things locally but never push to the remote"
    echo
  fi
  if "$canary_run"; then
    canary "$0"
  else
    release "$@"
  fi
}

function processCommandLineArgs {
  for arg in "$@"
  do
    case $arg in
      canary)
        canary_run=true
        ;;
      --help|help)
        echo "Commands:"
        echo "  $0            Publish a release from conventional commits."
        echo "  $0 canary     Publish a canary."
        echo "  $0 patch      Publish a patch release."
        echo "  $0 minor      Publish a minor release."
        echo "  $0 major      Publish a major release."
        echo "  $0 <version>  Publish a release with a specific version."
        echo
        echo "  $0 --dry-run  Run the release as a dry-run."
        exit 0
        ;;
      --dry-run|n)
        dry_run=true
        ;;
      patch|minor|major)
        release_type=$arg
        ;;
      *)
        ;;
    esac
  done
}

function release {
  BUMP=$(npx -p conventional-changelog-angular -p conventional-recommended-bump -c 'conventional-recommended-bump -p angular')
  # jq to get version from yarn https://jqplay.org/s/LqIS_qy2MBx
  VERSION=$(yarn version --no-git-tag-version --new-version ${release_type:-$BUMP} --json | jq -r 'select(.data | startswith("New version")).data | split(": ")[1]')

  npx conventional-changelog-cli -p angular -i CHANGELOG.md -s

  if "$dry_run"; then
    echo
    echo "In non-dry-run, will run the following commands"
    echo "  git add CHANGELOG.md"
    echo "  git commit -m \"docs(CHANGELOG): $VERSION\""
    echo
  else
    git add CHANGELOG.md
    git commit -m "docs(CHANGELOG): $VERSION"
  fi

  if "$dry_run"; then
    echo "Running the following command" "yarn version --force --allow-same-version --new-version $VERSION --message \"chore(release): %s\""
    echo "Running the same command with --no-git-tag-version"
    echo
    yarn version --force --allow-same-version --new-version $VERSION --message "chore(release): %s" --no-git-tag-version
  else
    yarn version --force --allow-same-version --new-version $VERSION --message "chore(release): %s"
  fi

  if "$dry_run"; then
    echo
    echo "In non-dry-run, will run the following commands"
    echo "    git push --follow-tags"
    echo "    npx conventional-github-releaser -p angular"
    echo
  else
    git push --follow-tags
    npx conventional-github-releaser -p angular
  fi

  echo "Beginning release $PKG_NAME@$VERSION"
  if "$dry_run"; then
    echo
    echo "In non-dry-run, will run the following commands"
    echo "    yarn publish --access public --non-interactive"
    echo
  else
    yarn publish --access public --non-interactive
  fi

  # update all workspaces from the workspace root (../..) with the new version
  # make sure publish.sh is called in topological order, `lerna ls --toposort` does this
  DEPENDANT_PKGS=$(npx lerna ls --graph --toposort --scope @mux/* |
    jq -r "to_entries[] | select(.value[] | contains(\"$PKG_NAME\")) | .key")
  scope=""
  for name in ${DEPENDANT_PKGS}; do
    scope+="--scope $name "
  done

  if "$dry_run"; then
    echo "Running the following command" npx lerna exec $scope -- npm pkg set dependencies.$PKG_NAME=$VERSION > /dev/null
  fi
  npx lerna exec $scope -- npm pkg set dependencies.$PKG_NAME=$VERSION > /dev/null

  echo "Ending release $PKG_NAME@$VERSION"
};

function canary {
  PKG_VERSION=$(cat package.json | jq -r '.version')

  # get last published version from NPM without alpha / beta, remove -SHA hash

  # debug jq command at https://jqplay.org/s/Vnz8ioZ2vtm
  #
  #   1. remove alpha or beta versions
  #   2 & 3. convert to { version: 'x.x.x', dist: 'canary', build: x }
  #   4. sort first by `version` then by `build` number
  #   5. put back together to a string `x.x.x-canary.x`
  #   6. pick the last item in the array

  LAST_VERSION=$(npm view $PKG_NAME versions --json |
    jq -r '. - map(select(contains("alpha") or contains("beta")))
      | map(capture("(?<version>(?<major>\\d+)\\.(?<minor>\\d+)\\.(?<patch>\\d+))(-(?<dist>[a-z]+))?(\\.(?<build>\\d+))?"))
      | map(.build? |= (. // 0 | tonumber))
      | map(.patch? |= (. // 0 | tonumber))
      | map(.minor? |= (. // 0 | tonumber))
      | map(.major? |= (. // 0 | tonumber))
      | sort_by(.major, .minor, .patch, .build)
      | map(.version + "-" + (.dist // "latest") + "." + (.build|tostring))
      | last')

  # if json is empty GH actions made this a `null` string, replace it with a null value
  LAST_VERSION=$(echo $LAST_VERSION | sed "s/null//g")

  # default to local package version if no last version was found on NPM
  PRE_VERSION=$(npx semver ${LAST_VERSION:-$PKG_VERSION} -i prerelease --preid canary)
  VERSION=$PRE_VERSION-$(git rev-parse --short HEAD)

  echo "Beginning release $PKG_NAME@$VERSION"
  yarn version --no-git-tag-version --new-version $VERSION
  if "$dry_run"; then
    echo
    echo "In non-dry-run, will run the following commands"
    echo "    yarn publish --tag canary --access public --non-interactive"
    echo
  else
    yarn publish --tag canary --access public --non-interactive
  fi

  # update all workspaces from the workspace root (../..) with the new version
  # make sure publish.sh is called in topological order, `lerna ls --toposort` does this
  DEPENDANT_PKGS=$(npx lerna ls --graph --toposort --scope @mux/* |
    jq -r "to_entries[] | select(.value[] | contains(\"$PKG_NAME\")) | .key")
  scope=""
  for name in ${DEPENDANT_PKGS}; do
    scope+="--scope $name "
  done

  if [ -n "$scope" ]; then
    if "$dry_run"; then
      echo "Running the following command" npx lerna exec $scope -- npm pkg set dependencies.$PKG_NAME=$VERSION > /dev/null
    fi
    npx lerna exec $scope -- npm pkg set dependencies.$PKG_NAME=$VERSION > /dev/null
  fi

  echo "Ending release $PKG_NAME@$VERSION"
}

main "$@"
