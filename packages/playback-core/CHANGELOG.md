# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.3.3...@mux-elements/playback-core@0.4.0) (2022-05-03)

### Bug Fixes

- live autoplay with preload=metadata should wait for new data ([c290067](https://github.com/muxinc/elements/commit/c290067f6b90bbc256af96974f5475a858bc1638))
- make preload attribute work with hls.js ([dfb519c](https://github.com/muxinc/elements/commit/dfb519c0aa8b281c03e3a0232589cc4b99c3ca34))
- **playback-core:** implement track/cue management in playback-core ([#201](https://github.com/muxinc/elements/issues/201)) ([35f2f91](https://github.com/muxinc/elements/commit/35f2f919e52e833c999451d1d06ff3a47bdcdc65))
- preload=metadata with autoplay ([620e994](https://github.com/muxinc/elements/commit/620e99469a2d23fb6e96485c115312edea1adb54))

### Features

- add errorTranslator prop & muxVideo.error property ([#195](https://github.com/muxinc/elements/issues/195)) ([3afc2f0](https://github.com/muxinc/elements/commit/3afc2f0af75a5ad8ef00257a4ebc34882ff8c9ab))

## [0.3.3](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.3.2...@mux-elements/playback-core@0.3.3) (2022-04-22)

### Bug Fixes

- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))

## [0.3.2](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.3.1...@mux-elements/playback-core@0.3.2) (2022-04-18)

### Bug Fixes

- make mux-video errors more uniform, fix async ([#183](https://github.com/muxinc/elements/issues/183)) ([0ea4dc3](https://github.com/muxinc/elements/commit/0ea4dc3beafc7d8a6c5078087d14f3f4bac5dda7))

## [0.3.1](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.3.0...@mux-elements/playback-core@0.3.1) (2022-04-12)

**Note:** Version bump only for package @mux-elements/playback-core

# [0.3.0](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.2.0...@mux-elements/playback-core@0.3.0) (2022-03-28)

### Bug Fixes

- **playback-core:** add function to playback-core to generate init time from mux.utils.now(). ([bc26a23](https://github.com/muxinc/elements/commit/bc26a23c40b447818ecb2f0a779edffe003dcf33))
- **playback-core:** Use window polyfill in playback-core for things like CustomEvent. ([980c4b6](https://github.com/muxinc/elements/commit/980c4b63f9199b7be1aee75a42565fff65767ea8))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
