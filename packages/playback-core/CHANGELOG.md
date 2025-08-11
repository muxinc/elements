# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.27.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.26.0...@mux/playback-core@0.27.0) (2024-10-24)


### Bug Fixes

* chapters disappearing after preload none ([#998](https://github.com/muxinc/elements/issues/998)) ([0f9d0fb](https://github.com/muxinc/elements/commit/0f9d0fb732a592115bfb162e56b27246000252b5))
* **playback-core:** Explicitly moving minimum version of mux-embed to 5.3.1 due to build issues in more complex build setups. ([#996](https://github.com/muxinc/elements/issues/996)) ([2577b78](https://github.com/muxinc/elements/commit/2577b78bd05bac544b62f07dae2e6d980ef24c23)), closes [#908](https://github.com/muxinc/elements/issues/908)
* **playback-core:** Handle cases where subs or cc media playlist is default (based on hls.js assumptions). ([#997](https://github.com/muxinc/elements/issues/997)) ([1088443](https://github.com/muxinc/elements/commit/10884436604bfe323552d85319c848d037859178))
* **playback-core:** Make sure seekable TimeRanges is populated when updating state. ([#1004](https://github.com/muxinc/elements/issues/1004)) ([b53b1ba](https://github.com/muxinc/elements/commit/b53b1ba19112817b295abc8f90918345bc2da0b2))


### Features

* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))





# [0.26.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.25.2...@mux/playback-core@0.26.0) (2024-09-20)


### Bug Fixes

* **playback-core:** upgrade mux-embed ([#989](https://github.com/muxinc/elements/issues/989)) ([5190c23](https://github.com/muxinc/elements/commit/5190c235e1e39cfd6a555855b2f57abd76631146))
* **playback-core:** Use userAgentData API to improve android-like platform detection for preferPlayback MSE cases. ([#979](https://github.com/muxinc/elements/issues/979)) ([f6f99b3](https://github.com/muxinc/elements/commit/f6f99b3536ca266ea83f944498366a13059afa7b))


### Features

* **mux-player, mux-player-react, mux-video:** cast custom data ([2722b6e](https://github.com/muxinc/elements/commit/2722b6ea6c5497c0bd0a28fd1732bd0b9c2474b6))





## [0.30.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.30.0...@mux/playback-core@0.30.1) (2025-07-03)


### Bug Fixes

* type error in metadata response ([#1156](https://github.com/muxinc/elements/issues/1156)) ([d0ea117](https://github.com/muxinc/elements/commit/d0ea1173362070e1ea6cbe63bd37cd6e2680639f))
* upgrade hls.js to 1.6.6, rm workaround MTA (multi-track audio) ([#1162](https://github.com/muxinc/elements/issues/1162)) ([ceb2d15](https://github.com/muxinc/elements/commit/ceb2d156af9f245577d2ca06f8863bec3acaeb80))

## [0.30.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.29.1...@mux/playback-core@0.30.0) (2025-06-23)


### Features

* add free plan logo ([#1140](https://github.com/muxinc/elements/issues/1140)) ([a6b369e](https://github.com/muxinc/elements/commit/a6b369e6fb97427374be5aa960cf709a3851b7e9))
* Google IMA support for mux-player and mux-video variants ([#1128](https://github.com/muxinc/elements/issues/1128)) ([ec31d4d](https://github.com/muxinc/elements/commit/ec31d4d55e856e20cc67170f25d996afc549403b))
* retry logic for 412 not playable errors ([#1106](https://github.com/muxinc/elements/issues/1106)) ([677c90a](https://github.com/muxinc/elements/commit/677c90ac3be18290f458be422a2bcc41cd4b7a6d))


### Bug Fixes

* **playback-core:** prefer uri value for chapters session metadata when available. ([#1145](https://github.com/muxinc/elements/issues/1145)) ([4dd2a50](https://github.com/muxinc/elements/commit/4dd2a50a66dcac8b47d6af561ea4c0469e6f35a8))
* support URI and VALUE for session data ([#1146](https://github.com/muxinc/elements/issues/1146)) ([930ad72](https://github.com/muxinc/elements/commit/930ad72a942cd636ffab83b5d81324ef80d8cc12))

## [0.29.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.29.0...@mux/playback-core@0.29.1) (2025-06-12)


### Bug Fixes

* **playback-core:** Change default of preferCmcd to 'none' for improved cacheability. Update reference docs to document preferCmcd (et al.). ([#1136](https://github.com/muxinc/elements/issues/1136)) ([4409304](https://github.com/muxinc/elements/commit/44093049b6629044dbb7fed10839f83667fdb37c))

## [0.29.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.7...@mux/playback-core@0.29.0) (2025-05-01)


### Features

* add video-title attr & prop ([#1108](https://github.com/muxinc/elements/issues/1108)) ([7763a49](https://github.com/muxinc/elements/commit/7763a49d885e56342fffe874ba838059e15c906c)), closes [#639](https://github.com/muxinc/elements/issues/639)

## [0.28.7](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.6...@mux/playback-core@0.28.7) (2025-04-10)


### Bug Fixes

* respect hls.js fatal error flag if available ([#1099](https://github.com/muxinc/elements/issues/1099)) ([6350a9b](https://github.com/muxinc/elements/commit/6350a9bf143a4cc0edcde5acabd3ae88f14609e7))

## [0.28.6](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.5...@mux/playback-core@0.28.6) (2025-04-03)


### Bug Fixes

* allow extension less Mux m3u8 url as src ([#1096](https://github.com/muxinc/elements/issues/1096)) ([5e85462](https://github.com/muxinc/elements/commit/5e85462cb003afbef45373318b324feb876e2ae4))

## [0.28.5](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.4...@mux/playback-core@0.28.5) (2025-03-31)


### Bug Fixes

* **playback-core:** Remove redundant FPS DRM generateRequest() for native playback. ([#1088](https://github.com/muxinc/elements/issues/1088)) ([c20063b](https://github.com/muxinc/elements/commit/c20063b8725d968aec0b751875850932639fb6e0))

## [0.28.4](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.3...@mux/playback-core@0.28.4) (2025-03-21)


### Bug Fixes

* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))

## [0.28.3](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.2...@mux/playback-core@0.28.3) (2025-02-13)


### Bug Fixes

* **playback-core:** Update hls.js version to fix multi-DRM playready bug. ([#1060](https://github.com/muxinc/elements/issues/1060)) ([380ded2](https://github.com/muxinc/elements/commit/380ded2ce544b9c9ae6a1d108b9d48cd4feb58fd))
* upgrade MC, fix theme flicker ([#1067](https://github.com/muxinc/elements/issues/1067)) ([b2fad06](https://github.com/muxinc/elements/commit/b2fad068300420d12ad25f26f24f8189f7ba6907))

## [0.28.2](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.1...@mux/playback-core@0.28.2) (2024-12-20)


### Bug Fixes

* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))

## [0.28.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.28.0...@mux/playback-core@0.28.1) (2024-12-17)


### Bug Fixes

* cap level controller import in cjs build ([#1045](https://github.com/muxinc/elements/issues/1045)) ([23045a3](https://github.com/muxinc/elements/commit/23045a3c28cf158bf3018312240b0e1925a1459b))

## [0.28.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.27.0...@mux/playback-core@0.28.0) (2024-12-12)


### Features

* **playback-core:** custom cap level controller ([#1010](https://github.com/muxinc/elements/issues/1010)) ([e49e231](https://github.com/muxinc/elements/commit/e49e2318fba432da4832c10328e1f2034fba6949))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))

## [0.25.2](https://github.com/muxinc/elements/compare/@mux/playback-core@0.25.1...@mux/playback-core@0.25.2) (2024-08-06)


### Bug Fixes

* Sentry seekable index error ([#972](https://github.com/muxinc/elements/issues/972)) ([05ed19b](https://github.com/muxinc/elements/commit/05ed19b134bd0d5905105f54c539ea7e946c2b45)), closes [#967](https://github.com/muxinc/elements/issues/967)





## [0.25.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.25.0...@mux/playback-core@0.25.1) (2024-08-02)

**Note:** Version bump only for package @mux/playback-core





# [0.25.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.24.0...@mux/playback-core@0.25.0) (2024-07-10)


### Bug Fixes

* **playback-core:** pseudo-ended eval case where media is not attached. ([#932](https://github.com/muxinc/elements/issues/932)) ([7c57cdd](https://github.com/muxinc/elements/commit/7c57cdd5278079ed5672525c48f649e857c3fc84))
* upgrade hls.js, custom-media-element, etc. ([#931](https://github.com/muxinc/elements/issues/931)) ([efb5c51](https://github.com/muxinc/elements/commit/efb5c514f65f017fdeea50682e1cdb15229cfd92)), closes [#927](https://github.com/muxinc/elements/issues/927)


### Features

* basic drm support ([#905](https://github.com/muxinc/elements/issues/905)) ([79acc9d](https://github.com/muxinc/elements/commit/79acc9d8cb520da469f1c72196befc384ee5b4f9))
* **playback-core:** For widevine, prioritize L1 but fall back to L3. ([#939](https://github.com/muxinc/elements/issues/939)) ([f30dc74](https://github.com/muxinc/elements/commit/f30dc7455474fdca822971f527f953b70d94cd88))





# [0.24.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.23.1...@mux/playback-core@0.24.0) (2024-05-28)


### Features

* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **playback-core, mux-video, mux-player:** addChapters interface ([#909](https://github.com/muxinc/elements/issues/909)) ([84392f1](https://github.com/muxinc/elements/commit/84392f14ee429b63ce26326e84e80e93bbdc70db))





## [0.23.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.23.0...@mux/playback-core@0.23.1) (2024-05-03)


### Bug Fixes

* passthrough props to native media els ([#912](https://github.com/muxinc/elements/issues/912)) ([88a63db](https://github.com/muxinc/elements/commit/88a63db7dadc9aa3e09402f7c1be79a278b97c06))
* **playback-core:** preload=none not respected for playlist stream info fetching with native safari playback. ([#916](https://github.com/muxinc/elements/issues/916)) ([33b2c11](https://github.com/muxinc/elements/commit/33b2c117aa230f602383771d08698c682173f144)), closes [#875](https://github.com/muxinc/elements/issues/875)





# [0.23.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.22.4...@mux/playback-core@0.23.0) (2024-04-18)


### Bug Fixes

* add mux-embed types reference ([#899](https://github.com/muxinc/elements/issues/899)) ([2162973](https://github.com/muxinc/elements/commit/2162973f4fa54af882c1fc7be4bab88de6b18ccc))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))


### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* **playback-core, mux-video, mux-audio, mux-player:** Upg hls.js ([#902](https://github.com/muxinc/elements/issues/902)) ([a6a76b6](https://github.com/muxinc/elements/commit/a6a76b69e03867cc11c348d2b48e0160ea295309))





## [0.22.4](https://github.com/muxinc/elements/compare/@mux/playback-core@0.22.3...@mux/playback-core@0.22.4) (2024-03-29)


### Bug Fixes

* **playback-core:** Make sure we do not apply holdback to seekable when live streams have ended. ([#891](https://github.com/muxinc/elements/issues/891)) ([138e83f](https://github.com/muxinc/elements/commit/138e83f5a6ac3040a8fc4c60253302344a2b9b79))





## [0.22.3](https://github.com/muxinc/elements/compare/@mux/playback-core@0.22.2...@mux/playback-core@0.22.3) (2024-03-20)


### Bug Fixes

* **playback-core:** live seek and media chrome upgrade ([#883](https://github.com/muxinc/elements/issues/883)) ([94d11d9](https://github.com/muxinc/elements/commit/94d11d9656cf8560853daf6690d7705510fa9ce5))





## [0.22.2](https://github.com/muxinc/elements/compare/@mux/playback-core@0.22.1...@mux/playback-core@0.22.2) (2024-02-16)


### Bug Fixes

* **playback-core:** pseudo ended stalled last frag ([#867](https://github.com/muxinc/elements/issues/867)) ([8990208](https://github.com/muxinc/elements/commit/8990208faddd356f540d05f9bc5fd6d3a39dd57a))





## [0.22.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.22.0...@mux/playback-core@0.22.1) (2024-01-02)


### Bug Fixes

* media-tracks types not polluting global HTMLMediaElement ([#855](https://github.com/muxinc/elements/issues/855)) ([ce7235b](https://github.com/muxinc/elements/commit/ce7235bfab8b3e54d4731aaf944a121163286e6a))
* target-live-window unneeded sprout ([#852](https://github.com/muxinc/elements/issues/852)) ([5d45a8f](https://github.com/muxinc/elements/commit/5d45a8f1fde45387e58e8ae985514dd303208107)), closes [#748](https://github.com/muxinc/elements/issues/748)
* upgrade external deps, allow patches uniform ([#850](https://github.com/muxinc/elements/issues/850)) ([f72acf4](https://github.com/muxinc/elements/commit/f72acf49199497cb45c186bd4b2bc2a67e5431c0))





# [0.22.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.21.0...@mux/playback-core@0.22.0) (2023-12-07)


### Bug Fixes

* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* **playback-core:** narrow cmcd for cache ([#825](https://github.com/muxinc/elements/issues/825)) ([61a4cfe](https://github.com/muxinc/elements/commit/61a4cfe5d50431e9b38a8b43f8ea1d71c0d1521e))
* ts error due to duplicate same dependency ([#837](https://github.com/muxinc/elements/issues/837)) ([411f382](https://github.com/muxinc/elements/commit/411f382ca9d701fae30bdf12d65b7c314f3e9618)), closes [#836](https://github.com/muxinc/elements/issues/836)
* upgrade media-chrome + turbo ([#838](https://github.com/muxinc/elements/issues/838)) ([a7c4948](https://github.com/muxinc/elements/commit/a7c49488ccbc3c1a9d087775d8ee83298acd1e91))


### Features

* **mux-player, mux-player-react:** Add extra-source-params/extraSourceParams attr/prop for advanced usage. ([a5ad6ed](https://github.com/muxinc/elements/commit/a5ad6ed3da0aafb52f983c91881126d74c884157))





# [0.21.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.20.2...@mux/playback-core@0.21.0) (2023-10-24)


### Features

* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))





## [0.20.2](https://github.com/muxinc/elements/compare/@mux/playback-core@0.20.1...@mux/playback-core@0.20.2) (2023-10-03)


### Bug Fixes

* audio track API for 1 track ([#776](https://github.com/muxinc/elements/issues/776)) ([4222fd1](https://github.com/muxinc/elements/commit/4222fd1994a4d0957cff5e9f9ede2a2b28575fed))
* **playback-core:** Use optional chaining and nullish defaulting for edge case RTE ([06294a0](https://github.com/muxinc/elements/commit/06294a00239a4444c98f2e10d801bc80bc4f832d))





## [0.20.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.20.0...@mux/playback-core@0.20.1) (2023-08-30)

**Note:** Version bump only for package @mux/playback-core





# [0.20.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.19.1...@mux/playback-core@0.20.0) (2023-08-23)


### Bug Fixes

* **playback-core:** Remove package.json type (defaults to CJS) for co… ([#755](https://github.com/muxinc/elements/issues/755)) ([06a7991](https://github.com/muxinc/elements/commit/06a7991c5ce7b4347356b23e60933428d84dd5e0)), closes [#752](https://github.com/muxinc/elements/issues/752)
* quality switch on alt audio ([#754](https://github.com/muxinc/elements/issues/754)) ([ca05490](https://github.com/muxinc/elements/commit/ca05490001e91ab0281cfca5090e46668fd23138))


### Features

* add audio track select menu ([#750](https://github.com/muxinc/elements/issues/750)) ([04123a8](https://github.com/muxinc/elements/commit/04123a8fbbbfba9059f3a504ad808f858dc07c50))
* add audio tracks API ([#742](https://github.com/muxinc/elements/issues/742)) ([13bfbdb](https://github.com/muxinc/elements/commit/13bfbdbf474352f998417053285d82cbd3c730be))





## [0.19.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.19.0...@mux/playback-core@0.19.1) (2023-08-15)


### Bug Fixes

* upgrade media-tracks ([#744](https://github.com/muxinc/elements/issues/744)) ([af957c2](https://github.com/muxinc/elements/commit/af957c2421715d62e6cef658d0e608a6a3f20968))





# [0.19.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.18.5...@mux/playback-core@0.19.0) (2023-08-14)


### Features

* implement renditions API ([#708](https://github.com/muxinc/elements/issues/708)) ([f3e8db2](https://github.com/muxinc/elements/commit/f3e8db21fd03c5d5570a628853f49c51d428d26e))





## [0.18.5](https://github.com/muxinc/elements/compare/@mux/playback-core@0.18.4...@mux/playback-core@0.18.5) (2023-07-07)


### Bug Fixes

* **playback-core, mux-player:** hls.js & media-chrome version bumps (fixes resize observer RTE and hls.js edge case bugs) ([b3a3657](https://github.com/muxinc/elements/commit/b3a36578320b58941509d0feccfaa1272a3dc033))
* **playback-core:** Switch back to using the unminified hls.js module… ([#718](https://github.com/muxinc/elements/issues/718)) ([c45d462](https://github.com/muxinc/elements/commit/c45d462c6fd18f118d49feea897d8a01eb78ba11))





## [0.18.4](https://github.com/muxinc/elements/compare/@mux/playback-core@0.18.3...@mux/playback-core@0.18.4) (2023-06-29)


### Bug Fixes

* **playback-core:** Apply pseudo-ended logic on seeked, even if paused. ([#707](https://github.com/muxinc/elements/issues/707)) ([924e81c](https://github.com/muxinc/elements/commit/924e81cddb9943d6e3bf9bf107fe7ed72d071b64))





## [0.18.3](https://github.com/muxinc/elements/compare/@mux/playback-core@0.18.2...@mux/playback-core@0.18.3) (2023-06-12)


### Bug Fixes

* **playback-core, mux-video:** Handle native playback edge cases wher… ([#705](https://github.com/muxinc/elements/issues/705)) ([16f8941](https://github.com/muxinc/elements/commit/16f8941799a5186f28205a70105b26764f39b295))
* **playback-core:** bump media-chrome & hls.js version to latest. ([#706](https://github.com/muxinc/elements/issues/706)) ([1683663](https://github.com/muxinc/elements/commit/1683663f05b2e3c64012056391f0df457e627371))





## [0.18.2](https://github.com/muxinc/elements/compare/@mux/playback-core@0.18.1...@mux/playback-core@0.18.2) (2023-06-06)


### Bug Fixes

* update to hls.js 1.4.3 ([#689](https://github.com/muxinc/elements/issues/689)) ([1379c13](https://github.com/muxinc/elements/commit/1379c138a75f9942234771f34dc376867eca113c))





## [0.18.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.18.0...@mux/playback-core@0.18.1) (2023-05-08)


### Bug Fixes

* upgrade to hls.js 1.4.1 ([#685](https://github.com/muxinc/elements/issues/685)) ([15ca4ac](https://github.com/muxinc/elements/commit/15ca4acc3b5093a409baa938429d9afaa30c80bd))





# [0.18.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.17.1...@mux/playback-core@0.18.0) (2023-04-14)


### Bug Fixes

* upgrade hls.js to 1.4.0 rc 1 ([#652](https://github.com/muxinc/elements/issues/652)) ([2e84eb5](https://github.com/muxinc/elements/commit/2e84eb539558d6962305c4e03fe938107c810ba8))
* upgrade to hls.js 1.4.0 ([#656](https://github.com/muxinc/elements/issues/656)) ([6a88840](https://github.com/muxinc/elements/commit/6a888404aa7ba4aa890f09f5dd43d13731c2881e))


### Features

* add currentPdt getter and getStartDate() method ([#661](https://github.com/muxinc/elements/issues/661)) ([530170b](https://github.com/muxinc/elements/commit/530170b789d7734d2b70fde7d59abb1ebf8a582c))
* inferred stream type ([#592](https://github.com/muxinc/elements/issues/592)) ([db4cc9f](https://github.com/muxinc/elements/commit/db4cc9f60660f2b860ecce0a5a5ef2a3a09cc40b))





## [0.17.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.17.0...@mux/playback-core@0.17.1) (2023-03-31)


### Bug Fixes

* Cannot assume activeCues removed precisely in Chromium browsers … ([#616](https://github.com/muxinc/elements/issues/616)) ([c53710c](https://github.com/muxinc/elements/commit/c53710cd2cfd436110232e21cad2d6aa2276cd91))
* capLevel to player size & on fps drop ([#628](https://github.com/muxinc/elements/issues/628)) ([8c0e776](https://github.com/muxinc/elements/commit/8c0e77655a2c13ae263dabfa81849ebf58aa620b))
* **playback-core, mux-player:** rte and hlsjs version bump ([#632](https://github.com/muxinc/elements/issues/632)) ([ebaa2b6](https://github.com/muxinc/elements/commit/ebaa2b6bdf7c264bf64320cb529954c7143cfca8))
* **playback-core:** Tweak hls config for ll-hls to increase likelihood of higher quality playback. Use hls@1.4.0-beta.1 ([#629](https://github.com/muxinc/elements/issues/629)) ([dfc8e9b](https://github.com/muxinc/elements/commit/dfc8e9be1b4f23bb2282d3180af060a90923531f))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* use Mux Data player_error_context to get better error grouping in the Mux Data dashboard ([599c052](https://github.com/muxinc/elements/commit/599c052f984cd0d76f061c019872851339775b6a))





# [0.17.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.16.2...@mux/playback-core@0.17.0) (2023-02-15)


### Bug Fixes

* **playback-core:** Explicitly remove textTracks we've added, even for native (non-hls.js) playback. ([#583](https://github.com/muxinc/elements/issues/583)) ([040ea61](https://github.com/muxinc/elements/commit/040ea61c8dddb5e856c37d9d8ba9fa8074bae6ad))


### Features

* add attribute max-resolution on mux-player and mux-video ([#581](https://github.com/muxinc/elements/issues/581)) ([1936c8e](https://github.com/muxinc/elements/commit/1936c8ecb47805ee75fd04ffee514b846043efc1))





## [0.16.2](https://github.com/muxinc/elements/compare/@mux/playback-core@0.16.1...@mux/playback-core@0.16.2) (2023-02-14)


### Bug Fixes

* Improve behavior for cuepoints with Safari usage. ([be2e353](https://github.com/muxinc/elements/commit/be2e353f8e904fb7b701e32247436578ae416ecc))
* **playback-core:** Typescript + min acrobatics to make svelte and others happy ([fdf34bb](https://github.com/muxinc/elements/commit/fdf34bb8fd409f0c2b5945802251ed2e6ffafd7e))





## [0.16.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.16.0...@mux/playback-core@0.16.1) (2023-02-02)


### Bug Fixes

* **playback-core:** Only initialize with setupCuePoints when using hls.js for playback ([a9076fb](https://github.com/muxinc/elements/commit/a9076fbec6135ec789c49838ba7efff6b7962f2c))





# [0.16.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.15.1...@mux/playback-core@0.16.0) (2023-02-01)


### Features

* **mux-player, mux-video, playback-core:** Add API for CuePoints metadata. ([1f0b40a](https://github.com/muxinc/elements/commit/1f0b40a6d7f09c0e08a42353e241a26857edaad6))





## [0.15.1](https://github.com/muxinc/elements/compare/@mux/playback-core@0.15.0...@mux/playback-core@0.15.1) (2023-01-20)

**Note:** Version bump only for package @mux/playback-core





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
