# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.9.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.8.0...@mux/playback-core@0.9.0) (2022-07-21)

### Features

- **playback-core, mux-player:** Add support to removeTextTrack. Remove all identified tracks on hls destroy. Add methods to mux-player. ([d090b06](https://github.com/muxinc/elements/commit/d090b060a8b8b3772e74762176af9881299bf894))
- **playback-core:** prefer remove() and append() for elements. ([90bbbcb](https://github.com/muxinc/elements/commit/90bbbcbccf74bc30be56ad8c84b3db1d00ab6665))

# 0.8.0 (2022-07-05)

### Bug Fixes

- live autoplay with preload=metadata should wait for new data ([c290067](https://github.com/muxinc/elements/commit/c290067f6b90bbc256af96974f5475a858bc1638))
- make mux-video errors more uniform, fix async ([#183](https://github.com/muxinc/elements/issues/183)) ([0ea4dc3](https://github.com/muxinc/elements/commit/0ea4dc3beafc7d8a6c5078087d14f3f4bac5dda7))
- make preload attribute work with hls.js ([dfb519c](https://github.com/muxinc/elements/commit/dfb519c0aa8b281c03e3a0232589cc4b99c3ca34))
- make sure we only seek with a finite number ([b8369ee](https://github.com/muxinc/elements/commit/b8369eec75672aeba75edc7b2c8cc5b49df5616e))
- only seek to live on first play for non-native hls ([c842f02](https://github.com/muxinc/elements/commit/c842f02427fad8da849f74d43964f48bc8197264))
- playback core require and default file extension is .cjs.js ([3552e39](https://github.com/muxinc/elements/commit/3552e3927c3e8767292d5cabdab16dd98f6de451))
- **playback-core:** add function to playback-core to generate init time from mux.utils.now(). ([bc26a23](https://github.com/muxinc/elements/commit/bc26a23c40b447818ecb2f0a779edffe003dcf33))
- **playback-core:** implement track/cue management in playback-core ([#201](https://github.com/muxinc/elements/issues/201)) ([35f2f91](https://github.com/muxinc/elements/commit/35f2f919e52e833c999451d1d06ff3a47bdcdc65))
- **playback-core:** Use window polyfill in playback-core for things like CustomEvent. ([980c4b6](https://github.com/muxinc/elements/commit/980c4b63f9199b7be1aee75a42565fff65767ea8))
- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))
- preload=metadata now triggers loadedmetadata ([73c49a6](https://github.com/muxinc/elements/commit/73c49a6b3b11512b3e206c27d65cdef8472e461d))
- preload=metadata with autoplay ([620e994](https://github.com/muxinc/elements/commit/620e99469a2d23fb6e96485c115312edea1adb54))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- stop tracking non-fatal errors in Mux data ([e00316b](https://github.com/muxinc/elements/commit/e00316b2452312fdcbf955c2d7bad5c7058dde28))
- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- add errorTranslator prop & muxVideo.error property ([#195](https://github.com/muxinc/elements/issues/195)) ([3afc2f0](https://github.com/muxinc/elements/commit/3afc2f0af75a5ad8ef00257a4ebc34882ff8c9ab))
- **dvr:** Initial effort for DVR support. ([d58d78f](https://github.com/muxinc/elements/commit/d58d78fe6716d21ff03e5edb7d47c73e85ef4c85))
- Extended autoplay options ([#116](https://github.com/muxinc/elements/issues/116)) ([475e838](https://github.com/muxinc/elements/commit/475e83884f641c578fa601c9501147d485fc1831))
- Handle inferred mux data env key for custom domain cases. ([eedc19e](https://github.com/muxinc/elements/commit/eedc19e2025844f99909cf3d0751811b55239329))
- **mux-video:** Add basic support for custom video domains. ([82cfb15](https://github.com/muxinc/elements/commit/82cfb15ecb9729329018c1fe999a1585bcae55c7))
- only autoplay with the autoplay attribute ([#99](https://github.com/muxinc/elements/issues/99)) ([c6204fb](https://github.com/muxinc/elements/commit/c6204fb03bc78e3b55d09f9e2aa547cd62825633))
- **playback-core:** Update config values for hls to be more consistent with native playback and to reasonable trim the backbuffer during playback. ([f01fd21](https://github.com/muxinc/elements/commit/f01fd21b16228458f1b4e25eebe86871956ae051))

# [0.7.0](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.6.0...@mux-elements/playback-core@0.7.0) (2022-06-23)

### Bug Fixes

- preload=metadata now triggers loadedmetadata ([73c49a6](https://github.com/muxinc/elements/commit/73c49a6b3b11512b3e206c27d65cdef8472e461d))

### Features

- Handle inferred mux data env key for custom domain cases. ([eedc19e](https://github.com/muxinc/elements/commit/eedc19e2025844f99909cf3d0751811b55239329))
- **mux-video:** Add basic support for custom video domains. ([82cfb15](https://github.com/muxinc/elements/commit/82cfb15ecb9729329018c1fe999a1585bcae55c7))

# [0.6.0](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.5.2...@mux-elements/playback-core@0.6.0) (2022-06-06)

### Features

- **dvr:** Initial effort for DVR support. ([d58d78f](https://github.com/muxinc/elements/commit/d58d78fe6716d21ff03e5edb7d47c73e85ef4c85))

## [0.5.2](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.5.1...@mux-elements/playback-core@0.5.2) (2022-05-26)

### Bug Fixes

- stop tracking non-fatal errors in Mux data ([e00316b](https://github.com/muxinc/elements/commit/e00316b2452312fdcbf955c2d7bad5c7058dde28))

## [0.5.1](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.5.0...@mux-elements/playback-core@0.5.1) (2022-05-23)

### Bug Fixes

- playback core require and default file extension is .cjs.js ([3552e39](https://github.com/muxinc/elements/commit/3552e3927c3e8767292d5cabdab16dd98f6de451))

# [0.5.0](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.4.1...@mux-elements/playback-core@0.5.0) (2022-05-20)

### Bug Fixes

- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

### Features

- **playback-core:** Update config values for hls to be more consistent with native playback and to reasonable trim the backbuffer during playback. ([f01fd21](https://github.com/muxinc/elements/commit/f01fd21b16228458f1b4e25eebe86871956ae051))

## [0.4.1](https://github.com/muxinc/elements/compare/@mux-elements/playback-core@0.4.0...@mux-elements/playback-core@0.4.1) (2022-05-10)

### Bug Fixes

- make sure we only seek with a finite number ([b8369ee](https://github.com/muxinc/elements/commit/b8369eec75672aeba75edc7b2c8cc5b49df5616e))
- only seek to live on first play for non-native hls ([c842f02](https://github.com/muxinc/elements/commit/c842f02427fad8da849f74d43964f48bc8197264))

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
