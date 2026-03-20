# Memory Leak Test

Mount/unmount test pages for detecting memory leaks in mux-video, mux-player, and mux-player-react.

## Prerequisites

1. Clone sibling repos next to this one:
   ```
   ~/Code/Mux/elements/        # this repo
   ~/Code/Mux/media-elements/  # https://github.com/muxinc/media-elements
   ~/Code/Mux/media-chrome/    # https://github.com/muxinc/media-chrome
   ```

2. Install [yalc](https://github.com/wclr/yalc) globally:
   ```
   npm i -g yalc
   ```

## Quick Start

### 1. Link local packages

From anywhere in this repo:

```bash
./examples/memory-leak-test/setup-local.sh
```

This builds media-elements and media-chrome, publishes them to yalc, and links them into the elements monorepo.

### 2. Build elements packages

Build all at once with the script:

```bash
./examples/memory-leak-test/build-elements.sh
```

Or build individually:

```bash
# For mux-video:
npx turbo run build --filter=@mux/playback-core --filter=@mux/mux-video --force

# For mux-player:
cd packages/mux-player && npm run build

# For mux-player-react:
cd packages/mux-player-react && npm run build
```

### 3. Run the dev server

```bash
cd examples/memory-leak-test
npm run dev
```

Opens on http://localhost:8005. Test pages:
- `/mux-video-leak-test.html` — mux-video with media-controller and cast button
- `/mux-player-leak-test.html` — mux-player
- `/mux-player-react-leak-test.html` — mux-player-react

## Rebuilding After Changes

When you make changes to media-elements or media-chrome:

```bash
# 1. Build the changed package
cd ../media-elements && npm run build
# or
cd ../media-chrome && npm run build

# 2. Push updates via yalc (from the changed package dir)
cd ../media-elements/packages/castable-video && yalc push
# or whichever package you changed

# 3. Rebuild in elements
cd ../elements
npx turbo run build --filter=@mux/playback-core --filter=@mux/mux-video --force

# 4. Refresh the browser
```

When you make changes to elements packages (playback-core, mux-video, mux-player):

```bash
# Just rebuild the changed package
npx turbo run build --filter=@mux/mux-video --force

# Refresh the browser
```

## Removing Local Links

To go back to npm registry versions:

```bash
./examples/memory-leak-test/teardown-local.sh
```

## Taking Heap Snapshots

1. Launch Chrome with GC exposed:
   ```
   open -a "Google Chrome" --args --js-flags="--expose-gc"
   ```

2. Navigate to a test page (e.g. http://localhost:8005/mux-video-leak-test.html)

3. Open DevTools > Memory tab

4. **Baseline**: Take a heap snapshot (Snapshot 1)

5. Click **Mount** > wait for video to load > click **Unmount** > click **Force GC**

6. Take another heap snapshot (Snapshot 2)

7. Switch to **Comparison** view, compare Snapshot 2 against Snapshot 1

8. Filter by detached DOM nodes to find leaks

**For growth testing**: Use the **Loop** button (10 cycles, 2000ms delay), then **Force GC** and take Snapshot 3. Compare Snapshot 3 vs Snapshot 2 — the delta should be ~0.
