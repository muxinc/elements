#!/usr/bin/env bash
set -euo pipefail

# Setup local development linking via yalc
# Links castable-video, custom-media-element, media-tracks (from media-elements)
# and media-chrome (from media-chrome) to the elements monorepo.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ELEMENTS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
MEDIA_ELEMENTS_ROOT="$(cd "$ELEMENTS_ROOT/../media-elements" 2>/dev/null && pwd)" || true
MEDIA_CHROME_ROOT="$(cd "$ELEMENTS_ROOT/../media-chrome" 2>/dev/null && pwd)" || true

# --- Validation ---

if ! command -v yalc &>/dev/null; then
  echo "Error: yalc is not installed. Run: npm i -g yalc"
  exit 1
fi

if [ -z "$MEDIA_ELEMENTS_ROOT" ] || [ ! -d "$MEDIA_ELEMENTS_ROOT/packages/castable-video" ]; then
  echo "Error: media-elements repo not found at $ELEMENTS_ROOT/../media-elements"
  echo "Clone it: git clone https://github.com/muxinc/media-elements.git"
  exit 1
fi

if [ -z "$MEDIA_CHROME_ROOT" ] || [ ! -f "$MEDIA_CHROME_ROOT/package.json" ]; then
  echo "Error: media-chrome repo not found at $ELEMENTS_ROOT/../media-chrome"
  echo "Clone it: git clone https://github.com/muxinc/media-chrome.git"
  exit 1
fi

# --- Build sibling repos ---

echo "==> Building media-elements..."
(cd "$MEDIA_ELEMENTS_ROOT" && npm run build)

echo "==> Building media-chrome..."
(cd "$MEDIA_CHROME_ROOT" && npm run build)

# --- Yalc publish ---

echo "==> Publishing packages to yalc..."

(cd "$MEDIA_ELEMENTS_ROOT/packages/castable-video" && yalc publish)
(cd "$MEDIA_ELEMENTS_ROOT/packages/custom-media-element" && yalc publish)
(cd "$MEDIA_ELEMENTS_ROOT/packages/media-tracks" && yalc publish)
(cd "$MEDIA_CHROME_ROOT" && yalc publish)

# --- Yalc add in elements root ---

echo "==> Adding yalc packages to elements..."
cd "$ELEMENTS_ROOT"
yalc add castable-video
yalc add custom-media-element
yalc add media-tracks
yalc add media-chrome

# --- npm install ---
# yalc add modifies package.json with new versions, so we need npm install
# (not npm ci) to update the lockfile accordingly.

echo "==> Running npm install..."
npm install

# --- Replace nested copies with symlinks to yalc ---
# npm may install nested copies of yalc'd packages inside workspace packages
# (e.g. packages/mux-player/node_modules/media-chrome). These take priority
# over the root node_modules and won't have our local changes. Replace them
# with symlinks to the root yalc copy.

YALC_PKGS="castable-video custom-media-element media-tracks media-chrome"
echo "==> Replacing nested copies with symlinks to yalc..."
for pkg in $YALC_PKGS; do
  find "$ELEMENTS_ROOT/packages" -path "*/node_modules/$pkg" -type d ! -path "$ELEMENTS_ROOT/node_modules/*" | while read nested; do
    echo "   Replacing $nested -> $ELEMENTS_ROOT/node_modules/$pkg"
    rm -rf "$nested"
    ln -s "$ELEMENTS_ROOT/node_modules/$pkg" "$nested"
  done
done

echo ""
echo "Done! Local packages linked via yalc."
echo ""
echo "Next steps:"
echo "  1. Build elements packages (pick one):"
echo ""
echo "     # Option A: Build all at once"
echo "     ./examples/memory-leak-test/build-elements.sh"
echo ""
echo "     # Option B: Build individually"
echo "     npx turbo run build --filter=@mux/playback-core --filter=@mux/mux-video --force"
echo "     cd packages/mux-player && npm run build"
echo "     cd packages/mux-player-react && npm run build"
echo ""
echo "  2. Run the test server:"
echo "     cd examples/memory-leak-test && npm run dev"
echo ""
echo "  3. Open http://localhost:8005"
