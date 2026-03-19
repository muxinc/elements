#!/usr/bin/env bash
set -euo pipefail

# Remove yalc-linked local packages and restore npm versions.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ELEMENTS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$ELEMENTS_ROOT"

echo "==> Removing yalc state..."
yalc remove --all
rm -rf .yalc yalc.lock

echo "==> Restoring package.json and package-lock.json from git..."
git checkout package.json package-lock.json

echo "==> Running npm ci to restore npm versions..."
npm ci

echo ""
echo "Done! All packages restored to npm registry versions."
