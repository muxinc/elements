#!/usr/bin/env bash
set -euo pipefail

# Build elements packages needed for the memory leak tests.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ELEMENTS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$ELEMENTS_ROOT"

echo "==> Building playback-core and mux-video (turbo)..."
npx turbo run build --filter=@mux/playback-core --filter=@mux/mux-video --force

echo "==> Building mux-player..."
(cd packages/mux-player && npm run build)

echo "==> Building mux-player-react..."
(cd packages/mux-player-react && npm run build)

echo ""
echo "Done! All elements packages built."
echo ""
echo "Run the test server:"
echo "  cd examples/memory-leak-test && npm run dev"
