# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.15.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.14.0...@mux/playback-core@0.15.0) (2022-12-13)


### Features

* Remove experimentalCmcd and add none to preferCmcd. Update secret docs. ([2656631](https://github.com/muxinc/elements/commit/2656631968f2b7e97a07d435818ee43c16627002))





# [0.14.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.13.0...@mux/playback-core@0.14.0) (2022-11-21)


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))
* **playback-core:** Prefer deterministic value for cid/video_id (instead of UUID). ([7b4661f](https://github.com/muxinc/elements/commit/7b4661f838454aa7d19130272dff0fe6220f9afd))


### Features

* **mux-video:** Add prefer cmcd attr and prop. ([25f0fb7](https://github.com/muxinc/elements/commit/25f0fb7779a6fb30428a7df3a920030836b79dab))
* **playback-core:** Add preferCmcd support to allow for cmcd query params (default) vs. headers. ([9654ffd](https://github.com/muxinc/elements/commit/9654ffdbc0b86e797284a379524ccef5d268ebd0))





# [0.13.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.12.0...@mux/playback-core@0.13.0) (2022-10-25)


### Features

* add ability to unset poster ([#447](https://github.com/muxinc/elements/issues/447)) ([d61e295](https://github.com/muxinc/elements/commit/d61e295952d59ba42ad077c4a2b7fb3bb0d7079c))
* conditionally use title for title metadata ([#475](https://github.com/muxinc/elements/issues/475)) ([63166a4](https://github.com/muxinc/elements/commit/63166a4be93e3eceb211f2c1973f324416af3985))
* **playback-core:** Abstract video_id derivation and make more consistent use of playback-id. ([fdeb1a0](https://github.com/muxinc/elements/commit/fdeb1a065e0aa92998de48a6148590bc5df6a77f))
* **playback-core:** Add CMCD support (mutative). ([dbe27e0](https://github.com/muxinc/elements/commit/dbe27e086f59245d1782a9e972859d4051d42eac))
* **playback-core:** Add experimental flag for enabling cmcd (disabled by default). ([5fe2e55](https://github.com/muxinc/elements/commit/5fe2e5550db073c79f1e4712bb7a9c2b0450819f))
* **playback-core:** Support disableCookies for mux-embed. ([cbd6516](https://github.com/muxinc/elements/commit/cbd651668a51e37dd4fa9b86c212ff51620832a5))





# [0.12.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.11.0...@mux/playback-core@0.12.0) (2022-10-05)

### Bug Fixes

- fetch error bug / add error test ([9246a2a](https://github.com/muxinc/elements/commit/9246a2a0dae2b80863bb4c5c8595c120919e7bdb))
- move getStreamTypeConfig to index ([89f29ed](https://github.com/muxinc/elements/commit/89f29edd759cd7cafae8d6e1ae01fa9bbde6d53c))
- move not exported utils to util file ([81f2ab2](https://github.com/muxinc/elements/commit/81f2ab27941ed6a56a5d1b8f982c04932c194812))
- move types to separate file ([313cdee](https://github.com/muxinc/elements/commit/313cdeeec7b376de4fed12476d7170ed25f8245a))
- preload bugs, add more tests ([bcfc23d](https://github.com/muxinc/elements/commit/bcfc23d0415d6bc5ffd1f65a8704f1ae40d251b9))
- preload for mux-audio, add tests ([e795fe0](https://github.com/muxinc/elements/commit/e795fe047af1feac832786aa03d8f419e57881b5))
- preload playback core change ([15313ea](https://github.com/muxinc/elements/commit/15313eaad81f748b5853a0fdaabfe141963f885e))
- preload property in mux-player ([#435](https://github.com/muxinc/elements/issues/435)) ([1920ab8](https://github.com/muxinc/elements/commit/1920ab8bbdf878f31d409e9fad222f9d3ea91e11))
- subsequent preload changes ([bd49465](https://github.com/muxinc/elements/commit/bd494653192c205eed043292427946848e1824f5))
- tweak hls.js config for improved memory management and QoE ([#411](https://github.com/muxinc/elements/issues/411)) ([44454a7](https://github.com/muxinc/elements/commit/44454a74c80c9c9a1be0b33b21ae05adeaffa0ad))

- BREAKING CHANGE: fix setting preload after play ([5723cdd](https://github.com/muxinc/elements/commit/5723cdd851f4b0a5400b1bcb2a8885b6e277f4ac))

### Features

- add `prefer-playback` attribute ([#402](https://github.com/muxinc/elements/issues/402)) ([8da36d6](https://github.com/muxinc/elements/commit/8da36d6b597ddbc4ae006873fee13a971b7ec2f3))

### BREAKING CHANGES

- for the playback-core pkg because setupAutoplay is removed

# [0.11.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.10.0...@mux/playback-core@0.11.0) (2022-09-16)

### Bug Fixes

- **playback-core:** Make sure event handlers and other references are cleaned up to avoid memory leaks. ([def9853](https://github.com/muxinc/elements/commit/def9853483aa45fdc1f958dfb9ff9b690b30f8eb))
- **playback-core:** Set both player_software (old key) and player_software_name (new key) in mux data options to sidestep inconsistencies in Mux Data views. ([fbeb5a9](https://github.com/muxinc/elements/commit/fbeb5a9c817fba550ad0662b92a5578db7421fe6))
- **playback-core:** Use custom teardown event type instead of emptied due to pre-emptive emptied. ([ce8fba8](https://github.com/muxinc/elements/commit/ce8fba810210578fb74615502cf5205222586584))
- startTime on iOS when preload=auto ([#368](https://github.com/muxinc/elements/issues/368)) ([0f511d4](https://github.com/muxinc/elements/commit/0f511d43474454b683dd7e041bdc3a99937a936e))
- update to hls.js 1.2.3 ([#386](https://github.com/muxinc/elements/issues/386)) ([a0acfd5](https://github.com/muxinc/elements/commit/a0acfd5ed1fa04390f616ea194fb3972ffe81716))
- update to hls.js@1.2.1 ([08ed065](https://github.com/muxinc/elements/commit/08ed0652961d140d0db6907f1855847917ee1cd2))
- update to hls.js@1.2.2 ([b10ee22](https://github.com/muxinc/elements/commit/b10ee221bb9f00e53b6ab25c2e9b57de8e2ae791))

### Features

- always prefer MSE on android ([ad43416](https://github.com/muxinc/elements/commit/ad43416077c27b15a8ccda5279d08babdde6a90d)), closes [#325](https://github.com/muxinc/elements/issues/325)

# [0.10.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.9.0...@mux/playback-core@0.10.0) (2022-08-31)

### Bug Fixes

- polyfills mutating global ([#355](https://github.com/muxinc/elements/issues/355)) ([71d18a4](https://github.com/muxinc/elements/commit/71d18a427f0171bb214a0df7c1425d3d1bddc47a))

### Features

- **playback-core:** Always prefer mse on android. ([05855a4](https://github.com/muxinc/elements/commit/05855a43cb9f87602203fab896e6e6876d7a1b12))

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
