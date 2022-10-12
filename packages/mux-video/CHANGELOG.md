# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.9.2](https://github.com/muxinc/elements/compare/@mux/mux-video@0.9.1...@mux/mux-video@0.9.2) (2022-10-12)

### Bug Fixes

- add default value to object-fit and object-position ([#460](https://github.com/muxinc/elements/issues/460)) ([56b4068](https://github.com/muxinc/elements/commit/56b4068ef170e03fca104561d402337c9172d03b))

## [0.9.1](https://github.com/muxinc/elements/compare/@mux/mux-video@0.9.0...@mux/mux-video@0.9.1) (2022-10-07)

### Bug Fixes

- also add media-object-fit/position to video ([#455](https://github.com/muxinc/elements/issues/455)) ([2ffa983](https://github.com/muxinc/elements/commit/2ffa9832153e26a2fc5f52c60317dffc7f174152))

# [0.9.0](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.6...@mux/mux-video@0.9.0) (2022-10-05)

### Bug Fixes

- preload bugs, add more tests ([bcfc23d](https://github.com/muxinc/elements/commit/bcfc23d0415d6bc5ffd1f65a8704f1ae40d251b9))
- preload for mux-audio, add tests ([e795fe0](https://github.com/muxinc/elements/commit/e795fe047af1feac832786aa03d8f419e57881b5))
- preload playback core change ([15313ea](https://github.com/muxinc/elements/commit/15313eaad81f748b5853a0fdaabfe141963f885e))
- subsequent preload changes ([bd49465](https://github.com/muxinc/elements/commit/bd494653192c205eed043292427946848e1824f5))

### Features

- add `prefer-playback` attribute ([#402](https://github.com/muxinc/elements/issues/402)) ([8da36d6](https://github.com/muxinc/elements/commit/8da36d6b597ddbc4ae006873fee13a971b7ec2f3))
- remove deprecated .hls and .video props ([#408](https://github.com/muxinc/elements/issues/408)) ([2bd4861](https://github.com/muxinc/elements/commit/2bd48618d1b59d054e470ce9011c5c2f4904f8b6))

### BREAKING CHANGES

- remove deprecated .hls and .video props.

## [0.8.6](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.5...@mux/mux-video@0.8.6) (2022-09-16)

### Bug Fixes

- mux-video & mux-audio memory leak ([#387](https://github.com/muxinc/elements/issues/387)) ([4a0d921](https://github.com/muxinc/elements/commit/4a0d921c49a3bf730ad86a77e46a085c44ef91ea))
- update PlaybackEngine types ([1873781](https://github.com/muxinc/elements/commit/187378165a83e70d62bd5ba954b4986d0ae50738))

## [0.8.5](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.4...@mux/mux-video@0.8.5) (2022-08-31)

### Bug Fixes

- polyfills mutating global ([#355](https://github.com/muxinc/elements/issues/355)) ([71d18a4](https://github.com/muxinc/elements/commit/71d18a427f0171bb214a0df7c1425d3d1bddc47a))

## [0.8.4](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.3...@mux/mux-video@0.8.4) (2022-08-03)

**Note:** Version bump only for package @mux/mux-video

## [0.8.3](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.2...@mux/mux-video@0.8.3) (2022-08-02)

### Bug Fixes

- CustomVideo.nativeEl being null in some cases ([#316](https://github.com/muxinc/elements/issues/316)) ([0563c30](https://github.com/muxinc/elements/commit/0563c3041cccd9b985a9093a8c7c7cc80433147c)), closes [#314](https://github.com/muxinc/elements/issues/314)

## [0.8.2](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.1...@mux/mux-video@0.8.2) (2022-07-21)

**Note:** Version bump only for package @mux/mux-video

## [0.8.1](https://github.com/muxinc/elements/compare/@mux/mux-video@0.8.0...@mux/mux-video@0.8.1) (2022-07-05)

**Note:** Version bump only for package @mux/mux-video

# 0.8.0 (2022-07-05)

### Bug Fixes

- Add catches with error logging if mux-video or mux-audio fails to load or parse metadata from metadata-url. ([c53a9be](https://github.com/muxinc/elements/commit/c53a9be15b7a8ec8e7191ce1136152bf3d046a63))
- clear some state on playbackId change ([#174](https://github.com/muxinc/elements/issues/174)) ([af0738e](https://github.com/muxinc/elements/commit/af0738ea5ae5a75861f75fc2ae3809ada735f3e2))
- custom video events handling ([#203](https://github.com/muxinc/elements/issues/203)) ([a909f89](https://github.com/muxinc/elements/commit/a909f89a69ee0d4b67e9d9371ac0f80984016181))
- error message was not passed back to player ([ade8143](https://github.com/muxinc/elements/commit/ade81438834610a7bddfa158ff20ec671ccd508f))
- fix 3x init of playback-core if `src` used ([#213](https://github.com/muxinc/elements/issues/213)) ([1d3e465](https://github.com/muxinc/elements/commit/1d3e465f8cc40544f0fb2c17ff4fb435c9e9a807))
- importing castable-video ([44cbb2f](https://github.com/muxinc/elements/commit/44cbb2f26290952ac8d3fe51a1d933352b0b9134))
- keep .hls but have it log a warning saying to use .\_hls ([11e6c10](https://github.com/muxinc/elements/commit/11e6c102a7e238bc8104c52ae9b94e7e3c2c7e19))
- make mux-player size based on video element ([#185](https://github.com/muxinc/elements/issues/185)) ([e4af9a8](https://github.com/muxinc/elements/commit/e4af9a885720f172837eb20ea49dc96bf66a77be))
- **mux-video:** initial muted autoplay attribute should autoplay muted ([#148](https://github.com/muxinc/elements/issues/148)) ([0757127](https://github.com/muxinc/elements/commit/0757127bc3095b43d3b265e46b5eb8123a7e1bb5))
- **mux-video:** prevent forward custom attrs ([#172](https://github.com/muxinc/elements/issues/172)) ([91a7812](https://github.com/muxinc/elements/commit/91a7812dff7163396440d8d1af26f94d04d3fea3))
- **mux-video:** use generateInitTime() instead of Date.now. ([3ac1722](https://github.com/muxinc/elements/commit/3ac1722dc2140b1970323d96fa908e384682f93e))
- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))
- update condition for when we should use hls vs native playback. ([b5ada22](https://github.com/muxinc/elements/commit/b5ada22c35be0757442706f9b19b7f53333e8359))

### Features

- (interim solution) use local version of CustomVideoElement with updated styles so mux-video will better correspond to video size/position/layout behavior. Add example html for smoke testing. ([5705ebf](https://github.com/muxinc/elements/commit/5705ebf18d9faf9684d2950a2fd3e3476d641c8c))
- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- Add built-in player_version support (fixes [#8](https://github.com/muxinc/elements/issues/8)) ([f623a88](https://github.com/muxinc/elements/commit/f623a882df7cc2464a3243b44e7b666c387425e7))
- add casting logic without cast-button ([#237](https://github.com/muxinc/elements/issues/237)) ([f7f1fe9](https://github.com/muxinc/elements/commit/f7f1fe9713f8c2dcedb2840f463b5478d6fffca0))
- add errorTranslator prop & muxVideo.error property ([#195](https://github.com/muxinc/elements/issues/195)) ([3afc2f0](https://github.com/muxinc/elements/commit/3afc2f0af75a5ad8ef00257a4ebc34882ff8c9ab))
- Add high priority metadata attribute support. Add playback id as video id defaulting. (fixes [#6](https://github.com/muxinc/elements/issues/6)) ([8dbbcbb](https://github.com/muxinc/elements/commit/8dbbcbbc4740bbefb1c733b857f9a2b2992fd1b7))
- add part=video/audio for mux-video/audio ([49e5b6f](https://github.com/muxinc/elements/commit/49e5b6f14fde14d429afae5c5a46d7595c4e027e)), closes [#125](https://github.com/muxinc/elements/issues/125)
- Add prefer-native support to use native video playback of hls if available. (fixes [#5](https://github.com/muxinc/elements/issues/5)). ([3578195](https://github.com/muxinc/elements/commit/3578195857e314d6691aebd19cf9d54063e03019))
- add support for mux-data beaconDomain. Add support for stream-type and stream-type-specific hls config. ([d99c069](https://github.com/muxinc/elements/commit/d99c06968c25a65bf406fda138e89925a30f229d))
- Add support for playback_id with query params (fixes [#7](https://github.com/muxinc/elements/issues/7)). ([6b44897](https://github.com/muxinc/elements/commit/6b44897f743551c0760d1c80d52b756b507dc00e))
- Extended autoplay options ([#116](https://github.com/muxinc/elements/issues/116)) ([475e838](https://github.com/muxinc/elements/commit/475e83884f641c578fa601c9501147d485fc1831))
- handle 'big boy' cases as well. ([7e2d671](https://github.com/muxinc/elements/commit/7e2d67182ce669ada008222a4016f11e771293a2))
- make sure mux data is monitoring as early as possible. ([d821ec5](https://github.com/muxinc/elements/commit/d821ec5e49130cf87811b3d6f56d05730330bd4f))
- **mux-video-init:** 'bake in' hls error recovery. Only auto-load if we have a src. ([a16cd11](https://github.com/muxinc/elements/commit/a16cd112b8a7dafeaf317bff47cf2ef0db1ff067))
- **mux-video-init:** (temporarily) adding polyfill to mux-video to allow server side smoke testing. ([36eefc8](https://github.com/muxinc/elements/commit/36eefc8962f8e0317fe11deb79aad017de0640a3))
- **mux-video-init:** Add basic snowpack build (currenty based on media-chrome but will change) plus example. ([467a604](https://github.com/muxinc/elements/commit/467a6042ce4eee327628301235f15c1f6dd41829))
- **mux-video-init:** add controls to simplify using example ([923a561](https://github.com/muxinc/elements/commit/923a561ee9f52f9a1c53313ecee70044315717f6))
- **mux-video-init:** Add support initial support for debug, mux data metadata. Update typedefs. Update example. ([7845462](https://github.com/muxinc/elements/commit/7845462eeb1a2553a9bd3ffc728305d45e747201))
- **mux-video-init:** Adding basic integration of mux-embed (untested). ([2d86620](https://github.com/muxinc/elements/commit/2d86620344c234be7f518e3f0f33ce7f19bfef14))
- **mux-video-init:** Adding Hls as export of mux-video root module. Adding stub for env-key to use mux data/mux-embed. ([fecde00](https://github.com/muxinc/elements/commit/fecde0055da0d177e3927f12d4d487ca0884c7e5))
- **mux-video-init:** Adding support for playback id. Clean up example. ([a48f4c6](https://github.com/muxinc/elements/commit/a48f4c64bc8984c8a9b007663c859ca968bdd09b))
- **mux-video-init:** Beef up typings for mux-embed. ([3b86e54](https://github.com/muxinc/elements/commit/3b86e5433b6f06c5d9d95623d4e9623bdf95835c))
- **mux-video-init:** example of loading metadata from a URL ([7c47434](https://github.com/muxinc/elements/commit/7c47434c42a31365a9b219a2c00d9203a85c1258))
- **mux-video-init:** handle various src attr changes. Add unload. ([bdf0559](https://github.com/muxinc/elements/commit/bdf05592488600c3a8b65354a11be4436d2cf045))
- **mux-video-init:** Initial implementation of mux-video. Start scaffolding out components, types, and build infrastructure. ([b6d7f35](https://github.com/muxinc/elements/commit/b6d7f35fad1b926f644212df6d01522b0ba4a814))
- **mux-video:** Add basic support for custom video domains. ([82cfb15](https://github.com/muxinc/elements/commit/82cfb15ecb9729329018c1fe999a1585bcae55c7))
- rename hls to \_hls ([2d53bc2](https://github.com/muxinc/elements/commit/2d53bc2517840d65a8fd5e2bb2d979ce8b491116))
- **support-media-types:** Add support for non hls media. Add (optional) type attribute. (refs [#23](https://github.com/muxinc/elements/issues/23)) ([fe4cdd5](https://github.com/muxinc/elements/commit/fe4cdd59f63188033d737c9166ef0522b6ef74d6))
- **support-media-types:** ignore case for shorthand types. (fixes [#23](https://github.com/muxinc/elements/issues/23)) ([64eb088](https://github.com/muxinc/elements/commit/64eb0888d3d41880ff26b471db0cb964b61350ad))
- Updates to make mux-audio and mux-video builds easy to use in next.js (fixes [#15](https://github.com/muxinc/elements/issues/15)) ([99b8ea7](https://github.com/muxinc/elements/commit/99b8ea74785903c5b300007cf8c3bc8a7601ae2d))

# [0.7.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.6.1...@mux-elements/mux-video@0.7.0) (2022-06-23)

### Features

- **mux-video:** Add basic support for custom video domains. ([82cfb15](https://github.com/muxinc/elements/commit/82cfb15ecb9729329018c1fe999a1585bcae55c7))

## [0.6.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.6.0...@mux-elements/mux-video@0.6.1) (2022-06-07)

### Bug Fixes

- importing castable-video ([44cbb2f](https://github.com/muxinc/elements/commit/44cbb2f26290952ac8d3fe51a1d933352b0b9134))

# [0.6.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.5.4...@mux-elements/mux-video@0.6.0) (2022-06-06)

### Features

- add casting logic without cast-button ([#237](https://github.com/muxinc/elements/issues/237)) ([f7f1fe9](https://github.com/muxinc/elements/commit/f7f1fe9713f8c2dcedb2840f463b5478d6fffca0))

## [0.5.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.5.3...@mux-elements/mux-video@0.5.4) (2022-05-26)

**Note:** Version bump only for package @mux-elements/mux-video

## [0.5.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.5.2...@mux-elements/mux-video@0.5.3) (2022-05-23)

**Note:** Version bump only for package @mux-elements/mux-video

## [0.5.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.5.1...@mux-elements/mux-video@0.5.2) (2022-05-20)

### Bug Fixes

- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

## [0.5.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.5.0...@mux-elements/mux-video@0.5.1) (2022-05-10)

### Bug Fixes

- error message was not passed back to player ([ade8143](https://github.com/muxinc/elements/commit/ade81438834610a7bddfa158ff20ec671ccd508f))
- fix 3x init of playback-core if `src` used ([#213](https://github.com/muxinc/elements/issues/213)) ([1d3e465](https://github.com/muxinc/elements/commit/1d3e465f8cc40544f0fb2c17ff4fb435c9e9a807))

# [0.5.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.4.5...@mux-elements/mux-video@0.5.0) (2022-05-03)

### Bug Fixes

- custom video events handling ([#203](https://github.com/muxinc/elements/issues/203)) ([a909f89](https://github.com/muxinc/elements/commit/a909f89a69ee0d4b67e9d9371ac0f80984016181))
- keep .hls but have it log a warning saying to use .\_hls ([11e6c10](https://github.com/muxinc/elements/commit/11e6c102a7e238bc8104c52ae9b94e7e3c2c7e19))

### Features

- add errorTranslator prop & muxVideo.error property ([#195](https://github.com/muxinc/elements/issues/195)) ([3afc2f0](https://github.com/muxinc/elements/commit/3afc2f0af75a5ad8ef00257a4ebc34882ff8c9ab))
- add part=video/audio for mux-video/audio ([49e5b6f](https://github.com/muxinc/elements/commit/49e5b6f14fde14d429afae5c5a46d7595c4e027e)), closes [#125](https://github.com/muxinc/elements/issues/125)
- rename hls to \_hls ([2d53bc2](https://github.com/muxinc/elements/commit/2d53bc2517840d65a8fd5e2bb2d979ce8b491116))

## [0.4.5](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.4.4...@mux-elements/mux-video@0.4.5) (2022-04-22)

### Bug Fixes

- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))

## [0.4.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.4.3...@mux-elements/mux-video@0.4.4) (2022-04-18)

### Bug Fixes

- make mux-player size based on video element ([#185](https://github.com/muxinc/elements/issues/185)) ([e4af9a8](https://github.com/muxinc/elements/commit/e4af9a885720f172837eb20ea49dc96bf66a77be))

## [0.4.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.4.2...@mux-elements/mux-video@0.4.3) (2022-04-12)

### Bug Fixes

- clear some state on playbackId change ([#174](https://github.com/muxinc/elements/issues/174)) ([af0738e](https://github.com/muxinc/elements/commit/af0738ea5ae5a75861f75fc2ae3809ada735f3e2))

## [0.4.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.4.1...@mux-elements/mux-video@0.4.2) (2022-04-08)

### Bug Fixes

- **mux-video:** prevent forward custom attrs ([#172](https://github.com/muxinc/elements/issues/172)) ([91a7812](https://github.com/muxinc/elements/commit/91a7812dff7163396440d8d1af26f94d04d3fea3))

## [0.4.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.4.0...@mux-elements/mux-video@0.4.1) (2022-04-01)

**Note:** Version bump only for package @mux-elements/mux-video

# [0.4.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-video@0.3.0...@mux-elements/mux-video@0.4.0) (2022-03-28)

### Bug Fixes

- **mux-video:** initial muted autoplay attribute should autoplay muted ([#148](https://github.com/muxinc/elements/issues/148)) ([0757127](https://github.com/muxinc/elements/commit/0757127bc3095b43d3b265e46b5eb8123a7e1bb5))
- **mux-video:** use generateInitTime() instead of Date.now. ([3ac1722](https://github.com/muxinc/elements/commit/3ac1722dc2140b1970323d96fa908e384682f93e))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
