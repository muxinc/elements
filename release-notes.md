:robot: I have created a release *beep* *boop*
---


<details><summary>@mux/playback-core: 0.31.0</summary>

## [0.31.0](https://github.com/muxinc/elements/compare/@mux/playback-core@0.30.0...@mux/playback-core@0.31.0) (2025-06-24)


###   BREAKING CHANGES

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))

### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* add attribute max-resolution on mux-player and mux-video ([#581](https://github.com/muxinc/elements/issues/581)) ([1936c8e](https://github.com/muxinc/elements/commit/1936c8ecb47805ee75fd04ffee514b846043efc1))
* add audio track select menu ([#750](https://github.com/muxinc/elements/issues/750)) ([04123a8](https://github.com/muxinc/elements/commit/04123a8fbbbfba9059f3a504ad808f858dc07c50))
* add audio tracks API ([#742](https://github.com/muxinc/elements/issues/742)) ([13bfbdb](https://github.com/muxinc/elements/commit/13bfbdbf474352f998417053285d82cbd3c730be))
* add currentPdt getter and getStartDate() method ([#661](https://github.com/muxinc/elements/issues/661)) ([530170b](https://github.com/muxinc/elements/commit/530170b789d7734d2b70fde7d59abb1ebf8a582c))
* add free plan logo ([#1140](https://github.com/muxinc/elements/issues/1140)) ([a6b369e](https://github.com/muxinc/elements/commit/a6b369e6fb97427374be5aa960cf709a3851b7e9))
* add video-title attr & prop ([#1108](https://github.com/muxinc/elements/issues/1108)) ([7763a49](https://github.com/muxinc/elements/commit/7763a49d885e56342fffe874ba838059e15c906c)), closes [#639](https://github.com/muxinc/elements/issues/639)
* basic drm support ([#905](https://github.com/muxinc/elements/issues/905)) ([79acc9d](https://github.com/muxinc/elements/commit/79acc9d8cb520da469f1c72196befc384ee5b4f9))
* Google IMA support for mux-player and mux-video variants ([#1128](https://github.com/muxinc/elements/issues/1128)) ([ec31d4d](https://github.com/muxinc/elements/commit/ec31d4d55e856e20cc67170f25d996afc549403b))
* implement renditions API ([#708](https://github.com/muxinc/elements/issues/708)) ([f3e8db2](https://github.com/muxinc/elements/commit/f3e8db21fd03c5d5570a628853f49c51d428d26e))
* inferred stream type ([#592](https://github.com/muxinc/elements/issues/592)) ([db4cc9f](https://github.com/muxinc/elements/commit/db4cc9f60660f2b860ecce0a5a5ef2a3a09cc40b))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **mux-player, mux-player-react, mux-video:** cast custom data ([2722b6e](https://github.com/muxinc/elements/commit/2722b6ea6c5497c0bd0a28fd1732bd0b9c2474b6))
* **mux-player, mux-player-react:** Add extra-source-params/extraSourceParams attr/prop for advanced usage. ([a5ad6ed](https://github.com/muxinc/elements/commit/a5ad6ed3da0aafb52f983c91881126d74c884157))
* **mux-player, mux-video, playback-core:** Add API for CuePoints metadata. ([1f0b40a](https://github.com/muxinc/elements/commit/1f0b40a6d7f09c0e08a42353e241a26857edaad6))
* **mux-video:** Add prefer cmcd attr and prop. ([25f0fb7](https://github.com/muxinc/elements/commit/25f0fb7779a6fb30428a7df3a920030836b79dab))
* **playback-core, mux-video, mux-audio, mux-player:** Upg hls.js ([#902](https://github.com/muxinc/elements/issues/902)) ([a6a76b6](https://github.com/muxinc/elements/commit/a6a76b69e03867cc11c348d2b48e0160ea295309))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core, mux-video, mux-player:** addChapters interface ([#909](https://github.com/muxinc/elements/issues/909)) ([84392f1](https://github.com/muxinc/elements/commit/84392f14ee429b63ce26326e84e80e93bbdc70db))
* **playback-core:** Add experimental flag for enabling cmcd (disabled by default). ([5fe2e55](https://github.com/muxinc/elements/commit/5fe2e5550db073c79f1e4712bb7a9c2b0450819f))
* **playback-core:** Add preferCmcd support to allow for cmcd query params (default) vs. headers. ([9654ffd](https://github.com/muxinc/elements/commit/9654ffdbc0b86e797284a379524ccef5d268ebd0))
* **playback-core:** custom cap level controller ([#1010](https://github.com/muxinc/elements/issues/1010)) ([e49e231](https://github.com/muxinc/elements/commit/e49e2318fba432da4832c10328e1f2034fba6949))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))
* **playback-core:** For widevine, prioritize L1 but fall back to L3. ([#939](https://github.com/muxinc/elements/issues/939)) ([f30dc74](https://github.com/muxinc/elements/commit/f30dc7455474fdca822971f527f953b70d94cd88))
* **playback-core:** Support disableCookies for mux-embed. ([cbd6516](https://github.com/muxinc/elements/commit/cbd651668a51e37dd4fa9b86c212ff51620832a5))
* Remove experimentalCmcd and add none to preferCmcd. Update secret docs. ([2656631](https://github.com/muxinc/elements/commit/2656631968f2b7e97a07d435818ee43c16627002))
* retry logic for 412 not playable errors ([#1106](https://github.com/muxinc/elements/issues/1106)) ([677c90a](https://github.com/muxinc/elements/commit/677c90ac3be18290f458be422a2bcc41cd4b7a6d))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))
* add mux-embed types reference ([#899](https://github.com/muxinc/elements/issues/899)) ([2162973](https://github.com/muxinc/elements/commit/2162973f4fa54af882c1fc7be4bab88de6b18ccc))
* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* allow extension less Mux m3u8 url as src ([#1096](https://github.com/muxinc/elements/issues/1096)) ([5e85462](https://github.com/muxinc/elements/commit/5e85462cb003afbef45373318b324feb876e2ae4))
* audio track API for 1 track ([#776](https://github.com/muxinc/elements/issues/776)) ([4222fd1](https://github.com/muxinc/elements/commit/4222fd1994a4d0957cff5e9f9ede2a2b28575fed))
* Cannot assume activeCues removed precisely in Chromium browsers & ([#616](https://github.com/muxinc/elements/issues/616)) ([c53710c](https://github.com/muxinc/elements/commit/c53710cd2cfd436110232e21cad2d6aa2276cd91))
* cap level controller import in cjs build ([#1045](https://github.com/muxinc/elements/issues/1045)) ([23045a3](https://github.com/muxinc/elements/commit/23045a3c28cf158bf3018312240b0e1925a1459b))
* capLevel to player size & on fps drop ([#628](https://github.com/muxinc/elements/issues/628)) ([8c0e776](https://github.com/muxinc/elements/commit/8c0e77655a2c13ae263dabfa81849ebf58aa620b))
* chapters disappearing after preload none ([#998](https://github.com/muxinc/elements/issues/998)) ([0f9d0fb](https://github.com/muxinc/elements/commit/0f9d0fb732a592115bfb162e56b27246000252b5))
* Improve behavior for cuepoints with Safari usage. ([be2e353](https://github.com/muxinc/elements/commit/be2e353f8e904fb7b701e32247436578ae416ecc))
* media-tracks types not polluting global HTMLMediaElement ([#855](https://github.com/muxinc/elements/issues/855)) ([ce7235b](https://github.com/muxinc/elements/commit/ce7235bfab8b3e54d4731aaf944a121163286e6a))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* passthrough props to native media els ([#912](https://github.com/muxinc/elements/issues/912)) ([88a63db](https://github.com/muxinc/elements/commit/88a63db7dadc9aa3e09402f7c1be79a278b97c06))
* **playback-core, mux-player:** hls.js & media-chrome version bumps (fixes resize observer RTE and hls.js edge case bugs) ([b3a3657](https://github.com/muxinc/elements/commit/b3a36578320b58941509d0feccfaa1272a3dc033))
* **playback-core, mux-player:** rte and hlsjs version bump ([#632](https://github.com/muxinc/elements/issues/632)) ([ebaa2b6](https://github.com/muxinc/elements/commit/ebaa2b6bdf7c264bf64320cb529954c7143cfca8))
* **playback-core, mux-video:** Handle native playback edge cases wher& ([#705](https://github.com/muxinc/elements/issues/705)) ([16f8941](https://github.com/muxinc/elements/commit/16f8941799a5186f28205a70105b26764f39b295))
* **playback-core:** Apply pseudo-ended logic on seeked, even if paused. ([#707](https://github.com/muxinc/elements/issues/707)) ([924e81c](https://github.com/muxinc/elements/commit/924e81cddb9943d6e3bf9bf107fe7ed72d071b64))
* **playback-core:** bump media-chrome & hls.js version to latest. ([#706](https://github.com/muxinc/elements/issues/706)) ([1683663](https://github.com/muxinc/elements/commit/1683663f05b2e3c64012056391f0df457e627371))
* **playback-core:** Change default of preferCmcd to 'none' for improved cacheability. Update reference docs to document preferCmcd (et al.). ([#1136](https://github.com/muxinc/elements/issues/1136)) ([4409304](https://github.com/muxinc/elements/commit/44093049b6629044dbb7fed10839f83667fdb37c))
* **playback-core:** Explicitly moving minimum version of mux-embed to 5.3.1 due to build issues in more complex build setups. ([#996](https://github.com/muxinc/elements/issues/996)) ([2577b78](https://github.com/muxinc/elements/commit/2577b78bd05bac544b62f07dae2e6d980ef24c23)), closes [#908](https://github.com/muxinc/elements/issues/908)
* **playback-core:** Explicitly remove textTracks we've added, even for native (non-hls.js) playback. ([#583](https://github.com/muxinc/elements/issues/583)) ([040ea61](https://github.com/muxinc/elements/commit/040ea61c8dddb5e856c37d9d8ba9fa8074bae6ad))
* **playback-core:** fix metadata type error ([#1151](https://github.com/muxinc/elements/issues/1151)) ([de6d029](https://github.com/muxinc/elements/commit/de6d02928f78c49cbf7e19dafa53ac8263bf9b63))
* **playback-core:** Handle cases where subs or cc media playlist is default (based on hls.js assumptions). ([#997](https://github.com/muxinc/elements/issues/997)) ([1088443](https://github.com/muxinc/elements/commit/10884436604bfe323552d85319c848d037859178))
* **playback-core:** live seek and media chrome upgrade ([#883](https://github.com/muxinc/elements/issues/883)) ([94d11d9](https://github.com/muxinc/elements/commit/94d11d9656cf8560853daf6690d7705510fa9ce5))
* **playback-core:** Make sure seekable TimeRanges is populated when updating state. ([#1004](https://github.com/muxinc/elements/issues/1004)) ([b53b1ba](https://github.com/muxinc/elements/commit/b53b1ba19112817b295abc8f90918345bc2da0b2))
* **playback-core:** Make sure we do not apply holdback to seekable when live streams have ended. ([#891](https://github.com/muxinc/elements/issues/891)) ([138e83f](https://github.com/muxinc/elements/commit/138e83f5a6ac3040a8fc4c60253302344a2b9b79))
* **playback-core:** narrow cmcd for cache ([#825](https://github.com/muxinc/elements/issues/825)) ([61a4cfe](https://github.com/muxinc/elements/commit/61a4cfe5d50431e9b38a8b43f8ea1d71c0d1521e))
* **playback-core:** Only initialize with setupCuePoints when using hls.js for playback ([a9076fb](https://github.com/muxinc/elements/commit/a9076fbec6135ec789c49838ba7efff6b7962f2c))
* **playback-core:** Prefer deterministic value for cid/video_id (instead of UUID). ([7b4661f](https://github.com/muxinc/elements/commit/7b4661f838454aa7d19130272dff0fe6220f9afd))
* **playback-core:** prefer uri value for chapters session metadata when available. ([#1145](https://github.com/muxinc/elements/issues/1145)) ([4dd2a50](https://github.com/muxinc/elements/commit/4dd2a50a66dcac8b47d6af561ea4c0469e6f35a8))
* **playback-core:** preload=none not respected for playlist stream info fetching with native safari playback. ([#916](https://github.com/muxinc/elements/issues/916)) ([33b2c11](https://github.com/muxinc/elements/commit/33b2c117aa230f602383771d08698c682173f144)), closes [#875](https://github.com/muxinc/elements/issues/875)
* **playback-core:** pseudo ended stalled last frag ([#867](https://github.com/muxinc/elements/issues/867)) ([8990208](https://github.com/muxinc/elements/commit/8990208faddd356f540d05f9bc5fd6d3a39dd57a))
* **playback-core:** pseudo-ended eval case where media is not attached. ([#932](https://github.com/muxinc/elements/issues/932)) ([7c57cdd](https://github.com/muxinc/elements/commit/7c57cdd5278079ed5672525c48f649e857c3fc84))
* **playback-core:** Remove package.json type (defaults to CJS) for co& ([#755](https://github.com/muxinc/elements/issues/755)) ([06a7991](https://github.com/muxinc/elements/commit/06a7991c5ce7b4347356b23e60933428d84dd5e0)), closes [#752](https://github.com/muxinc/elements/issues/752)
* **playback-core:** Remove redundant FPS DRM generateRequest() for native playback. ([#1088](https://github.com/muxinc/elements/issues/1088)) ([c20063b](https://github.com/muxinc/elements/commit/c20063b8725d968aec0b751875850932639fb6e0))
* **playback-core:** Switch back to using the unminified hls.js module& ([#718](https://github.com/muxinc/elements/issues/718)) ([c45d462](https://github.com/muxinc/elements/commit/c45d462c6fd18f118d49feea897d8a01eb78ba11))
* **playback-core:** Tweak hls config for ll-hls to increase likelihood of higher quality playback. Use hls@1.4.0-beta.1 ([#629](https://github.com/muxinc/elements/issues/629)) ([dfc8e9b](https://github.com/muxinc/elements/commit/dfc8e9be1b4f23bb2282d3180af060a90923531f))
* **playback-core:** Typescript + min acrobatics to make svelte and others happy ([fdf34bb](https://github.com/muxinc/elements/commit/fdf34bb8fd409f0c2b5945802251ed2e6ffafd7e))
* **playback-core:** Update hls.js version to fix multi-DRM playready bug. ([#1060](https://github.com/muxinc/elements/issues/1060)) ([380ded2](https://github.com/muxinc/elements/commit/380ded2ce544b9c9ae6a1d108b9d48cd4feb58fd))
* **playback-core:** upgrade mux-embed ([#989](https://github.com/muxinc/elements/issues/989)) ([5190c23](https://github.com/muxinc/elements/commit/5190c235e1e39cfd6a555855b2f57abd76631146))
* **playback-core:** Use optional chaining and nullish defaulting for edge case RTE ([06294a0](https://github.com/muxinc/elements/commit/06294a00239a4444c98f2e10d801bc80bc4f832d))
* **playback-core:** Use userAgentData API to improve android-like platform detection for preferPlayback MSE cases. ([#979](https://github.com/muxinc/elements/issues/979)) ([f6f99b3](https://github.com/muxinc/elements/commit/f6f99b3536ca266ea83f944498366a13059afa7b))
* quality switch on alt audio ([#754](https://github.com/muxinc/elements/issues/754)) ([ca05490](https://github.com/muxinc/elements/commit/ca05490001e91ab0281cfca5090e46668fd23138))
* respect hls.js fatal error flag if available ([#1099](https://github.com/muxinc/elements/issues/1099)) ([6350a9b](https://github.com/muxinc/elements/commit/6350a9bf143a4cc0edcde5acabd3ae88f14609e7))
* Sentry seekable index error ([#972](https://github.com/muxinc/elements/issues/972)) ([05ed19b](https://github.com/muxinc/elements/commit/05ed19b134bd0d5905105f54c539ea7e946c2b45)), closes [#967](https://github.com/muxinc/elements/issues/967)
* support URI and VALUE for session data ([#1146](https://github.com/muxinc/elements/issues/1146)) ([930ad72](https://github.com/muxinc/elements/commit/930ad72a942cd636ffab83b5d81324ef80d8cc12))
* target-live-window unneeded sprout ([#852](https://github.com/muxinc/elements/issues/852)) ([5d45a8f](https://github.com/muxinc/elements/commit/5d45a8f1fde45387e58e8ae985514dd303208107))
* ts error due to duplicate same dependency ([#837](https://github.com/muxinc/elements/issues/837)) ([411f382](https://github.com/muxinc/elements/commit/411f382ca9d701fae30bdf12d65b7c314f3e9618)), closes [#836](https://github.com/muxinc/elements/issues/836)
* update to hls.js 1.4.3 ([#689](https://github.com/muxinc/elements/issues/689)) ([1379c13](https://github.com/muxinc/elements/commit/1379c138a75f9942234771f34dc376867eca113c))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade external deps, allow patches uniform ([#850](https://github.com/muxinc/elements/issues/850)) ([f72acf4](https://github.com/muxinc/elements/commit/f72acf49199497cb45c186bd4b2bc2a67e5431c0))
* upgrade hls.js to 1.4.0 rc 1 ([#652](https://github.com/muxinc/elements/issues/652)) ([2e84eb5](https://github.com/muxinc/elements/commit/2e84eb539558d6962305c4e03fe938107c810ba8))
* upgrade hls.js, custom-media-element, etc. ([#931](https://github.com/muxinc/elements/issues/931)) ([efb5c51](https://github.com/muxinc/elements/commit/efb5c514f65f017fdeea50682e1cdb15229cfd92)), closes [#927](https://github.com/muxinc/elements/issues/927)
* upgrade MC, fix theme flicker ([#1067](https://github.com/muxinc/elements/issues/1067)) ([b2fad06](https://github.com/muxinc/elements/commit/b2fad068300420d12ad25f26f24f8189f7ba6907))
* upgrade media-chrome + turbo ([#838](https://github.com/muxinc/elements/issues/838)) ([a7c4948](https://github.com/muxinc/elements/commit/a7c49488ccbc3c1a9d087775d8ee83298acd1e91))
* upgrade media-tracks ([#744](https://github.com/muxinc/elements/issues/744)) ([af957c2](https://github.com/muxinc/elements/commit/af957c2421715d62e6cef658d0e608a6a3f20968))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))
* upgrade to hls.js 1.4.0 ([#656](https://github.com/muxinc/elements/issues/656)) ([6a88840](https://github.com/muxinc/elements/commit/6a888404aa7ba4aa890f09f5dd43d13731c2881e))
* upgrade to hls.js 1.4.1 ([#685](https://github.com/muxinc/elements/issues/685)) ([15ca4ac](https://github.com/muxinc/elements/commit/15ca4acc3b5093a409baa938429d9afaa30c80bd))
* use Mux Data player_error_context to get better error grouping in the Mux Data dashboard ([599c052](https://github.com/muxinc/elements/commit/599c052f984cd0d76f061c019872851339775b6a))


### Miscellaneous Chores

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))
</details>

<details><summary>@mux/mux-player: 4.0.0</summary>

## [4.0.0](https://github.com/muxinc/elements/compare/@mux/mux-player@3.5.0...@mux/mux-player@4.0.0) (2025-06-24)


###   BREAKING CHANGES

* **mux-player, mux-player-react:** Retrospective breaking change for tooltips pr
* **mux-player,mux-player-react:** major version update ([#992](https://github.com/muxinc/elements/issues/992))
* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))
* **mux-player:** Mux Player defaults to new theme
* **mux-player:** switch to new default theme ([#784](https://github.com/muxinc/elements/issues/784))

### Features

* 2023 Theme rendition selector ([#751](https://github.com/muxinc/elements/issues/751)) ([9584c3d](https://github.com/muxinc/elements/commit/9584c3d102d1916952c9f4fc6720a486c42a0b3e))
* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* add a no-volume-pref attribute to turn of storing volume in localStorage ([#686](https://github.com/muxinc/elements/issues/686)) ([e9c2150](https://github.com/muxinc/elements/commit/e9c2150ba36615107f05d99baaa8a4432d71138d))
* add a poster slot for progressive enhancement ([#738](https://github.com/muxinc/elements/issues/738)) ([dd7751d](https://github.com/muxinc/elements/commit/dd7751dafa4c1afceca4686c0214630f09285d02))
* add attribute max-resolution on mux-player and mux-video ([#581](https://github.com/muxinc/elements/issues/581)) ([1936c8e](https://github.com/muxinc/elements/commit/1936c8ecb47805ee75fd04ffee514b846043efc1))
* add audio track select menu ([#750](https://github.com/muxinc/elements/issues/750)) ([04123a8](https://github.com/muxinc/elements/commit/04123a8fbbbfba9059f3a504ad808f858dc07c50))
* add currentPdt getter and getStartDate() method ([#661](https://github.com/muxinc/elements/issues/661)) ([530170b](https://github.com/muxinc/elements/commit/530170b789d7734d2b70fde7d59abb1ebf8a582c))
* add fullscreen API on player element ([#1107](https://github.com/muxinc/elements/issues/1107)) ([205f3c8](https://github.com/muxinc/elements/commit/205f3c86a334c8f3d641e0e9d00cf9b9b8305cf5))
* add poster slot for progressive enhancement ([#747](https://github.com/muxinc/elements/issues/747)) ([e90e096](https://github.com/muxinc/elements/commit/e90e096bc45776776e6fc4a8846aede2ad8ecb7c)), closes [#590](https://github.com/muxinc/elements/issues/590)
* add quality selector ([#734](https://github.com/muxinc/elements/issues/734)) ([5d1da39](https://github.com/muxinc/elements/commit/5d1da396a05a08d5c5322e364bc98a693605a497)), closes [#572](https://github.com/muxinc/elements/issues/572)
* add video-title attr & prop ([#1108](https://github.com/muxinc/elements/issues/1108)) ([7763a49](https://github.com/muxinc/elements/commit/7763a49d885e56342fffe874ba838059e15c906c)), closes [#639](https://github.com/muxinc/elements/issues/639)
* Add volume slider to live controls ([#800](https://github.com/muxinc/elements/issues/800)) ([5e0c337](https://github.com/muxinc/elements/commit/5e0c33715af190d2c39f8ffc9b2d7ff3d413f602))
* add way to set and render MC themes ([#561](https://github.com/muxinc/elements/issues/561)) ([0ac98e9](https://github.com/muxinc/elements/commit/0ac98e9a6fd60c5ea990be3c7d5d8ae7941e447c))
* allow video, audio and player elements to get any metadata-* attrs set ([#501](https://github.com/muxinc/elements/issues/501)) ([8ee139d](https://github.com/muxinc/elements/commit/8ee139d2bbd08e1e3c08d047f870c1dcf01dac7e))
* basic drm support ([#905](https://github.com/muxinc/elements/issues/905)) ([79acc9d](https://github.com/muxinc/elements/commit/79acc9d8cb520da469f1c72196befc384ee5b4f9))
* dup track append, add source tag support ([#962](https://github.com/muxinc/elements/issues/962)) ([735cb9b](https://github.com/muxinc/elements/commit/735cb9be8336ab37f3f349b6bcdac413eb8f3fd9))
* export control bars part for styling ([#773](https://github.com/muxinc/elements/issues/773)) ([f444c58](https://github.com/muxinc/elements/commit/f444c58542af8ea0a39fb9d2e1e190c5a45bc7c4)), closes [#767](https://github.com/muxinc/elements/issues/767)
* first iteration on player design update ([#486](https://github.com/muxinc/elements/issues/486)) ([a2befb5](https://github.com/muxinc/elements/commit/a2befb53200df08c40a79d7ed84e267cd1279648))
* Google IMA support for mux-player and mux-video variants ([#1128](https://github.com/muxinc/elements/issues/1128)) ([ec31d4d](https://github.com/muxinc/elements/commit/ec31d4d55e856e20cc67170f25d996afc549403b))
* implement Media Chrome HTML based theme  ([#498](https://github.com/muxinc/elements/issues/498)) ([d83501a](https://github.com/muxinc/elements/commit/d83501ac3ddb4661f34f5e7526e93af525035190))
* implement Mux badge ([#988](https://github.com/muxinc/elements/issues/988)) ([2343df8](https://github.com/muxinc/elements/commit/2343df80fddcbf05485ed9d4ab27f1bb0fac04d0))
* implement renditions API ([#708](https://github.com/muxinc/elements/issues/708)) ([f3e8db2](https://github.com/muxinc/elements/commit/f3e8db21fd03c5d5570a628853f49c51d428d26e))
* inferred stream type ([#592](https://github.com/muxinc/elements/issues/592)) ([db4cc9f](https://github.com/muxinc/elements/commit/db4cc9f60660f2b860ecce0a5a5ef2a3a09cc40b))
* introduce a captions menu button ([#549](https://github.com/muxinc/elements/issues/549)) ([9cb8454](https://github.com/muxinc/elements/commit/9cb845411230ea669c74c5ffe19f9fca4c60dce3))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player-react:** mux player react cuepoint handlers ([#605](https://github.com/muxinc/elements/issues/605)) ([df4e6e0](https://github.com/muxinc/elements/commit/df4e6e036f7cd9b5d9dfa52e1adc56bb0a850373))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **mux-player, mux-player-react, mux-video:** cast custom data ([2722b6e](https://github.com/muxinc/elements/commit/2722b6ea6c5497c0bd0a28fd1732bd0b9c2474b6))
* **mux-player, mux-player-react:** Add extra-source-params/extraSourceParams attr/prop for advanced usage. ([a5ad6ed](https://github.com/muxinc/elements/commit/a5ad6ed3da0aafb52f983c91881126d74c884157))
* **mux-player, mux-player-react:** default duration ([#844](https://github.com/muxinc/elements/issues/844)) ([8d52572](https://github.com/muxinc/elements/commit/8d52572330089076a6d05ff33fa0f596e18799ff))
* **mux-player, mux-video, playback-core:** Add API for CuePoints metadata. ([1f0b40a](https://github.com/muxinc/elements/commit/1f0b40a6d7f09c0e08a42353e241a26857edaad6))
* **mux-player:** 2023 theme style updates and fixes ([#753](https://github.com/muxinc/elements/issues/753)) ([c3dc2ef](https://github.com/muxinc/elements/commit/c3dc2ef01ba4eb0d1506d175ca2188b1d749ac7f))
* **mux-player:** Add disable cookies attr and prop. ([d8cbe69](https://github.com/muxinc/elements/commit/d8cbe69645f9215d63a54b6cfbc4abb8bf6c45f0))
* **mux-player:** Add prefer cmcd attr and prop. ([308e9a7](https://github.com/muxinc/elements/commit/308e9a7c879594edbe2d4f4ffe462c7efb53299f))
* **mux-player:** add storyboard-src attribute and corresponding prop ([#522](https://github.com/muxinc/elements/issues/522)) ([e9c3f0a](https://github.com/muxinc/elements/commit/e9c3f0afd3eb2521248996c37de1716b4ce724c4))
* **mux-player:** allow forcibly showing buttons that we usually hide at small sizes ([#827](https://github.com/muxinc/elements/issues/827)) ([f7200e7](https://github.com/muxinc/elements/commit/f7200e71ab691363abc4729691e3c40fee2d7a61))
* **mux-player:** Clean up TS (but also force minor version bump). ([#917](https://github.com/muxinc/elements/issues/917)) ([f418d8c](https://github.com/muxinc/elements/commit/f418d8c86c5822040e121d50ecbbfca5e59b8211))
* **mux-player:** Expose and propagate experimental cmcd prop and attr. ([dbcf85a](https://github.com/muxinc/elements/commit/dbcf85a5e687ad36c410c36042a224361942ed9b))
* **mux-player:** Extra template parts in 2023 theme ([#768](https://github.com/muxinc/elements/issues/768)) ([bc2cd48](https://github.com/muxinc/elements/commit/bc2cd48337861ba487c8bdcc01ff1dd3c401519f))
* **mux-player:** Keyboard seek offsets now update with component offset props. ([#888](https://github.com/muxinc/elements/issues/888)) ([b419de9](https://github.com/muxinc/elements/commit/b419de9a3e316a712c36dfdcae1849b55e22eb23))
* **mux-player:** major version bump ([#788](https://github.com/muxinc/elements/issues/788)) ([78de381](https://github.com/muxinc/elements/commit/78de3813b2a912ad3243fa7e6ff47e79847d0242))
* **mux-player:** switch to new default theme ([#784](https://github.com/muxinc/elements/issues/784)) ([79a174c](https://github.com/muxinc/elements/commit/79a174cb4ca40539a4d4f82a466f77350989b1e7))
* **mux-player:** Theme 2023 icons ([#766](https://github.com/muxinc/elements/issues/766)) ([64259ca](https://github.com/muxinc/elements/commit/64259ca2f48327ddf6bdbff94ec65ce0cc629711))
* **mux-player:** use playback rate selectmenu for new player theme. ([#802](https://github.com/muxinc/elements/issues/802)) ([662cd52](https://github.com/muxinc/elements/commit/662cd523295551855372bfdc4000d24a92713e2f))
* **mux-player:** version bump to Media Chrome v3.1.0. ([#886](https://github.com/muxinc/elements/issues/886)) ([1f9a6ec](https://github.com/muxinc/elements/commit/1f9a6ece2ba07f3042330336f9a0719eab274642))
* New default theme ([#709](https://github.com/muxinc/elements/issues/709)) ([d69d84e](https://github.com/muxinc/elements/commit/d69d84ea6708c8548d6e5780dfa0a5ad8ed314f8))
* **playback-core, mux-video, mux-audio, mux-player:** Upg hls.js ([#902](https://github.com/muxinc/elements/issues/902)) ([a6a76b6](https://github.com/muxinc/elements/commit/a6a76b69e03867cc11c348d2b48e0160ea295309))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core, mux-video, mux-player:** addChapters interface ([#909](https://github.com/muxinc/elements/issues/909)) ([84392f1](https://github.com/muxinc/elements/commit/84392f14ee429b63ce26326e84e80e93bbdc70db))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))
* Remove experimentalCmcd and add none to preferCmcd. Update secret docs. ([2656631](https://github.com/muxinc/elements/commit/2656631968f2b7e97a07d435818ee43c16627002))
* Rename new default theme ([#771](https://github.com/muxinc/elements/issues/771)) ([b91c509](https://github.com/muxinc/elements/commit/b91c5092e005805a801982e15719984965f745e1))
* retry logic for 412 not playable errors ([#1106](https://github.com/muxinc/elements/issues/1106)) ([677c90a](https://github.com/muxinc/elements/commit/677c90ac3be18290f458be422a2bcc41cd4b7a6d))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* Upgrade guide for new theme ([#775](https://github.com/muxinc/elements/issues/775)) ([4f1b684](https://github.com/muxinc/elements/commit/4f1b684ec9d571ed46c66694f29d2ecdea4ef6ee))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* add micro theme export and switcher example ([#594](https://github.com/muxinc/elements/issues/594)) ([0399c5c](https://github.com/muxinc/elements/commit/0399c5ce579ddcc32b62980da14abcaf06fc4166))
* add missing menu part ([#1066](https://github.com/muxinc/elements/issues/1066)) ([f5c6d90](https://github.com/muxinc/elements/commit/f5c6d90999222a8eac7c62db60b097361a7effd0)), closes [#1065](https://github.com/muxinc/elements/issues/1065)
* add themes folder to NPM ([#634](https://github.com/muxinc/elements/issues/634)) ([8f6bd4d](https://github.com/muxinc/elements/commit/8f6bd4d0f9933001d229003e178821bfd41595d0))
* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* allow setting theme template via property ([607dba1](https://github.com/muxinc/elements/commit/607dba1303c3004d75f9942e3fb721c3140fea09))
* allow setting theme template via property ([6ec0bb0](https://github.com/muxinc/elements/commit/6ec0bb0b4f6964490dc8d339e174462e98f80116))
* attach events on null media property ([#966](https://github.com/muxinc/elements/issues/966)) ([02ac022](https://github.com/muxinc/elements/commit/02ac022f0cb6dea2b8442f615f03cf791d6a8d4f))
* audio controls CSS ([#843](https://github.com/muxinc/elements/issues/843)) ([427adbd](https://github.com/muxinc/elements/commit/427adbde79ce2230050fa6b57a0669d5fd06b585))
* bring back cast button for drm protected videos ([#1137](https://github.com/muxinc/elements/issues/1137)) ([aa3a1ca](https://github.com/muxinc/elements/commit/aa3a1cae56813d1b5bd651392a14ef4325468a31))
* bring back play button to the control bar for small player size ([#556](https://github.com/muxinc/elements/issues/556)) ([38ef225](https://github.com/muxinc/elements/commit/38ef225543400a146159a24ccf13a4a22ac03bae)), closes [#554](https://github.com/muxinc/elements/issues/554)
* bump media-chrome from 4.7.1 to 4.8.0 in /packages/mux-player in the prod-dependencies group across 1 directory ([#1084](https://github.com/muxinc/elements/issues/1084)) ([d2eccb5](https://github.com/muxinc/elements/commit/d2eccb5e3437da360873c84258f2e9624f1d2993))
* bump player.style from 0.1.6 to 0.1.7 in the prod-dependencies group across 1 directory ([#1095](https://github.com/muxinc/elements/issues/1095)) ([b9da4be](https://github.com/muxinc/elements/commit/b9da4bea21b0292de92ab504b2a903ee61dc5bea))
* bump player.style from 0.1.7 to 0.1.8 in the prod-dependencies group across 1 directory ([#1110](https://github.com/muxinc/elements/issues/1110)) ([34dcba4](https://github.com/muxinc/elements/commit/34dcba46b4955263da8dc05c128e0c6e98ccfbcb))
* bump the prod-dependencies group across 1 directory with 2 updates ([#1109](https://github.com/muxinc/elements/issues/1109)) ([7969b53](https://github.com/muxinc/elements/commit/7969b53261ef055a76cf26ced26ab978338f2db9))
* bump the prod-dependencies group across 2 directories with 1 update ([#1121](https://github.com/muxinc/elements/issues/1121)) ([85a2276](https://github.com/muxinc/elements/commit/85a2276805ae48fe99147fff121141ba6131bd27))
* bump the prod-dependencies group across 2 directories with 4 updates ([#1138](https://github.com/muxinc/elements/issues/1138)) ([0ac6871](https://github.com/muxinc/elements/commit/0ac68711fbf083964c442b8cea04dd76f1cfd288))
* capLevel to player size & on fps drop ([#628](https://github.com/muxinc/elements/issues/628)) ([8c0e776](https://github.com/muxinc/elements/commit/8c0e77655a2c13ae263dabfa81849ebf58aa620b))
* chapters and cuepoints interface doesnt reflect internal types ([#977](https://github.com/muxinc/elements/issues/977)) ([e3eadec](https://github.com/muxinc/elements/commit/e3eadec050160ed44f01b91b4a49e84cce9188fc)), closes [#947](https://github.com/muxinc/elements/issues/947)
* css animation forwards causing UI lag ([#973](https://github.com/muxinc/elements/issues/973)) ([ec59cb3](https://github.com/muxinc/elements/commit/ec59cb3a3b9db65d6f761a9c983be85b7c755101))
* delegate events, lazy controller for cue pos ([#633](https://github.com/muxinc/elements/issues/633)) ([4e45cc0](https://github.com/muxinc/elements/commit/4e45cc07b03d29ed03fe09b94e28591f8ff9b886))
* **deps:** bump media-chrome from 4.5.0 to 4.7.1 ([#1079](https://github.com/muxinc/elements/issues/1079)) ([9609d01](https://github.com/muxinc/elements/commit/9609d0184becf9c067ccd5a77c61919e61decf04))
* Don't allow clicks on bg gradients ([#797](https://github.com/muxinc/elements/issues/797)) ([3135e44](https://github.com/muxinc/elements/commit/3135e441bb88a166b48070c4f41c33a3878870d1))
* don't register prop --controls-backdrop-color ([#480](https://github.com/muxinc/elements/issues/480)) ([b820a14](https://github.com/muxinc/elements/commit/b820a14656444b49ed6c0a59fede7327da76936c))
* duplicate render by using value cache key ([2b8c485](https://github.com/muxinc/elements/commit/2b8c4859d1e5a255dda210eba8d52afec509b074))
* duplicate render by using value cache key ([031a89a](https://github.com/muxinc/elements/commit/031a89a0d8a46d715b9ad778a732b720c7694ab5))
* Extra spacing underneath player ([#779](https://github.com/muxinc/elements/issues/779)) ([06f6480](https://github.com/muxinc/elements/commit/06f64802ef714e451dc8d3b8ac0781cce8e9f1fe))
* force theme to be ltr direction ([#670](https://github.com/muxinc/elements/issues/670)) ([924fb1f](https://github.com/muxinc/elements/commit/924fb1f76f3563600e121a00ff83bb8deb766d34))
* improve 2023 icons ([#774](https://github.com/muxinc/elements/issues/774)) ([bfbe4f0](https://github.com/muxinc/elements/commit/bfbe4f006888281e7506dfaf1f828ec02c34ed94))
* increase poster test timeout ([#786](https://github.com/muxinc/elements/issues/786)) ([08e3e3d](https://github.com/muxinc/elements/commit/08e3e3d159246f16c5e54e86eb06fc5dd2d05dc2))
* increase some test timeouts ([#785](https://github.com/muxinc/elements/issues/785)) ([13ef21f](https://github.com/muxinc/elements/commit/13ef21f5875ff9ae1b93a6adeb4d18c4704f05c9))
* live view due targetLiveWindow change ([#627](https://github.com/muxinc/elements/issues/627)) ([06812d9](https://github.com/muxinc/elements/commit/06812d94b096e54fa8444aed337839e8e9a70ebe))
* media-tracks types not polluting global HTMLMediaElement ([#855](https://github.com/muxinc/elements/issues/855)) ([ce7235b](https://github.com/muxinc/elements/commit/ce7235bfab8b3e54d4731aaf944a121163286e6a))
* menu CSS vars to hide menu button ([#999](https://github.com/muxinc/elements/issues/999)) ([4375d6f](https://github.com/muxinc/elements/commit/4375d6f0cb3c56eaee291521ad14c8eb5feb5d59))
* merge conflict fallout ([4e4932c](https://github.com/muxinc/elements/commit/4e4932c8d18708d53dedc1907d7fe32255d4a556))
* move captions listbox to the front ([#635](https://github.com/muxinc/elements/issues/635)) ([2375361](https://github.com/muxinc/elements/commit/23753613d0396fe7c3f39bb4cabec72746fbb159))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* Mux-player childList observer behavior ([#1041](https://github.com/muxinc/elements/issues/1041)) ([d34903f](https://github.com/muxinc/elements/commit/d34903f97b35545093484ffc2cc4713825658337))
* Mux-player imports ([#1056](https://github.com/muxinc/elements/issues/1056)) ([9b7ec1b](https://github.com/muxinc/elements/commit/9b7ec1b8b92a49f74ba361db90ddfa0a526c44d0))
* **mux-player, mux-player-react:** add accent color prop attr ([#790](https://github.com/muxinc/elements/issues/790)) ([f147e5f](https://github.com/muxinc/elements/commit/f147e5f95887f0b08a46a2e76a0aacadb6f00455))
* **mux-player, mux-player-react:** Remove seek buttons from mobile pre-playback UI ([#982](https://github.com/muxinc/elements/issues/982)) ([840a0be](https://github.com/muxinc/elements/commit/840a0be0b8b9feccee3cd0cb69c7156f81b1b8cc))
* **mux-player:** Add additional parts for export. Use constants. Upda& ([#813](https://github.com/muxinc/elements/issues/813)) ([4ad76a3](https://github.com/muxinc/elements/commit/4ad76a35d32abf02b83cc8feed52db4117c77791))
* **mux-player:** add buttons to mobile live audio view ([#985](https://github.com/muxinc/elements/issues/985)) ([3437ced](https://github.com/muxinc/elements/commit/3437ced3fd01c7078cd32ee585fd69378aec0620))
* **mux-player:** add controller CSS part  ([#828](https://github.com/muxinc/elements/issues/828)) ([116d6f0](https://github.com/muxinc/elements/commit/116d6f0361c64f0efddae8b35a0af7176ce26e9a))
* **mux-player:** Adding controller exported part. Marking as fix bc n& ([#732](https://github.com/muxinc/elements/issues/732)) ([0599c71](https://github.com/muxinc/elements/commit/0599c717b56ca3b4cc20e4d977e96a55f76575d3))
* **mux-player:** attr mismatch to make sure controls and loading indi& ([#815](https://github.com/muxinc/elements/issues/815)) ([d2b1466](https://github.com/muxinc/elements/commit/d2b14664989d3b8265d52be158b567864e2cd753))
* **mux-player:** exporting underlying poster img part for advanced styling ([#733](https://github.com/muxinc/elements/issues/733)) ([317ecac](https://github.com/muxinc/elements/commit/317ecac4759903ff2f6c642f98a29e268180aab5)), closes [#717](https://github.com/muxinc/elements/issues/717)
* **mux-player:** Hide cast button by default when using DRM. ([#930](https://github.com/muxinc/elements/issues/930)) ([367275a](https://github.com/muxinc/elements/commit/367275ad28dc689510e89000f27ccddb9092315e))
* **mux-player:** Make sure to use the title as the default value for & ([#758](https://github.com/muxinc/elements/issues/758)) ([57c2fdc](https://github.com/muxinc/elements/commit/57c2fdc77624a7e2c1fd0ce17e069173b909fc74))
* **mux-player:** media chrome attr name mismatches ([#816](https://github.com/muxinc/elements/issues/816)) ([c771934](https://github.com/muxinc/elements/commit/c771934e9e22011f8999aa5c848b1f399fd1dc65))
* **mux-player:** media-chrome version bump (occasional ResizeObserver& ([#711](https://github.com/muxinc/elements/issues/711)) ([b33408a](https://github.com/muxinc/elements/commit/b33408ac51c112e215f34aa10f7dd72ba8c2e6b6))
* **mux-player:** Migrate to use new Media Chrome media-live-button. ([5613ba4](https://github.com/muxinc/elements/commit/5613ba48fbd9a497f127764404caf801bf7f7d74))
* **mux-player:** More cleanup for DVR in media chrome ([#887](https://github.com/muxinc/elements/issues/887)) ([e54dcdb](https://github.com/muxinc/elements/commit/e54dcdbcec8c7f32f57568021353a398126629f6))
* **mux-player:** Only match theme by id if element is a template. ([#731](https://github.com/muxinc/elements/issues/731)) ([bb4886c](https://github.com/muxinc/elements/commit/bb4886cca7476800c959922f9c0703f72f189d87))
* **mux-player:** placeholder not applying properly to media-poster-im& ([#769](https://github.com/muxinc/elements/issues/769)) ([2aed830](https://github.com/muxinc/elements/commit/2aed830d34dca5e0a774c2dd0f6e81688c73f1f0))
* **mux-player:** upgrade media chrome to fix subtitles selection edge cases ([#862](https://github.com/muxinc/elements/issues/862)) ([c6e8758](https://github.com/muxinc/elements/commit/c6e8758bbe7431fc55d334ccf96b07f62f7443d6))
* **mux-player:** upgrade media chrome to get fix for android tap issue& ([#824](https://github.com/muxinc/elements/issues/824)) ([e46fed4](https://github.com/muxinc/elements/commit/e46fed4feb011303b7111ccc9737a2e769efc485))
* **mux-player:** use CSS to disable subtitle shifting for iOS in fullscreen. ([#958](https://github.com/muxinc/elements/issues/958)) ([f14249b](https://github.com/muxinc/elements/commit/f14249bc76052c65c2d606cd90edcefe947a7353))
* **mux-player:** Use solid accent color in rate menu ([#804](https://github.com/muxinc/elements/issues/804)) ([7323155](https://github.com/muxinc/elements/commit/7323155837cb611db375d6a907ad05b721f52b91))
* **mux-player:** version bump for media-chrome (fixes first frame ren& ([#740](https://github.com/muxinc/elements/issues/740)) ([8a9e9ab](https://github.com/muxinc/elements/commit/8a9e9ab94d4515a22a7d294895da7b6f54d53e39))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* **playback-core, mux-player:** hls.js & media-chrome version bumps (fixes resize observer RTE and hls.js edge case bugs) ([b3a3657](https://github.com/muxinc/elements/commit/b3a36578320b58941509d0feccfaa1272a3dc033))
* **playback-core, mux-player:** rte and hlsjs version bump ([#632](https://github.com/muxinc/elements/issues/632)) ([ebaa2b6](https://github.com/muxinc/elements/commit/ebaa2b6bdf7c264bf64320cb529954c7143cfca8))
* **playback-core:** bump media-chrome & hls.js version to latest. ([#706](https://github.com/muxinc/elements/issues/706)) ([1683663](https://github.com/muxinc/elements/commit/1683663f05b2e3c64012056391f0df457e627371))
* **playback-core:** Change default of preferCmcd to 'none' for improved cacheability. Update reference docs to document preferCmcd (et al.). ([#1136](https://github.com/muxinc/elements/issues/1136)) ([4409304](https://github.com/muxinc/elements/commit/44093049b6629044dbb7fed10839f83667fdb37c))
* **playback-core:** Typescript + min acrobatics to make svelte and others happy ([fdf34bb](https://github.com/muxinc/elements/commit/fdf34bb8fd409f0c2b5945802251ed2e6ffafd7e))
* **playback-core:** Update hls.js version to fix multi-DRM playready bug. ([#1060](https://github.com/muxinc/elements/issues/1060)) ([380ded2](https://github.com/muxinc/elements/commit/380ded2ce544b9c9ae6a1d108b9d48cd4feb58fd))
* polish new time preview w/ shifting arrow ([#884](https://github.com/muxinc/elements/issues/884)) ([a3662c7](https://github.com/muxinc/elements/commit/a3662c7a2076246ed8dbca8c99aaaecce4b2423c))
* polish, use easing gradients ([9c4cb2a](https://github.com/muxinc/elements/commit/9c4cb2a17777eb2fd29cba0e19c53e812366d71f))
* polish, use easing gradients ([#885](https://github.com/muxinc/elements/issues/885)) ([ff68f13](https://github.com/muxinc/elements/commit/ff68f13384badbda9ca8ac3618a8f36b769fa403))
* remove unneeded captions movement code  ([#842](https://github.com/muxinc/elements/issues/842)) ([fb163f6](https://github.com/muxinc/elements/commit/fb163f6be1c8a0113542f317c14da1112be0fb69)), closes [#830](https://github.com/muxinc/elements/issues/830)
* rename Micro to Microvideo ([#617](https://github.com/muxinc/elements/issues/617)) ([5317e84](https://github.com/muxinc/elements/commit/5317e8401d8cecb30dfbf697b97dd7c35bd9313c))
* rendition-menu visual improvements ([#1131](https://github.com/muxinc/elements/issues/1131)) ([59a2aaa](https://github.com/muxinc/elements/commit/59a2aaaae6140b5e2a7e74faa39b68d0990b593e)), closes [#1122](https://github.com/muxinc/elements/issues/1122)
* Reverting packages type (defaults to cjs) for accuracy per node & ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))
* setting custom playbackrates ([#819](https://github.com/muxinc/elements/issues/819)) ([799d7a5](https://github.com/muxinc/elements/commit/799d7a5d780e004e9868f437a720e69ec9344883)), closes [#812](https://github.com/muxinc/elements/issues/812)
* switch to media-captions-selectmenu ([#595](https://github.com/muxinc/elements/issues/595)) ([40c8e3e](https://github.com/muxinc/elements/commit/40c8e3edd82c28ca8975e5d245099702fed32bbc))
* target-live-window unneeded sprout ([#852](https://github.com/muxinc/elements/issues/852)) ([5d45a8f](https://github.com/muxinc/elements/commit/5d45a8f1fde45387e58e8ae985514dd303208107))
* tests, improve attribute empty behavior ([5f53a5e](https://github.com/muxinc/elements/commit/5f53a5e12c2accc0e8216c1404889b11818c869e))
* unavailable state for audio track button ([#756](https://github.com/muxinc/elements/issues/756)) ([13f4ef7](https://github.com/muxinc/elements/commit/13f4ef7c77a6d18b330759e06acd975d77431f1b))
* update to media-chrome 0.15.0 ([#483](https://github.com/muxinc/elements/issues/483)) ([71f51ab](https://github.com/muxinc/elements/commit/71f51ab501085a65e5a01eb1edca2f8bdbddaf6a))
* update to media-chrome 0.15.1 ([#484](https://github.com/muxinc/elements/issues/484)) ([fdc5c7a](https://github.com/muxinc/elements/commit/fdc5c7ada514fd5c417b1adbb6b4d538aa2bc580))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade external deps, allow patches uniform ([#850](https://github.com/muxinc/elements/issues/850)) ([f72acf4](https://github.com/muxinc/elements/commit/f72acf49199497cb45c186bd4b2bc2a67e5431c0))
* upgrade hls.js, custom-media-element, etc. ([#931](https://github.com/muxinc/elements/issues/931)) ([efb5c51](https://github.com/muxinc/elements/commit/efb5c514f65f017fdeea50682e1cdb15229cfd92)), closes [#927](https://github.com/muxinc/elements/issues/927)
* upgrade MC & integrate media-time-display ([#631](https://github.com/muxinc/elements/issues/631)) ([78dc0b8](https://github.com/muxinc/elements/commit/78dc0b897b1c0b892e614493c9c084ebe145fe49))
* upgrade MC + style tweaks ([#805](https://github.com/muxinc/elements/issues/805)) ([7a1cf78](https://github.com/muxinc/elements/commit/7a1cf783fd1325b782440db05a6bb67e2d89a58f))
* upgrade MC v0.16.1 ([#513](https://github.com/muxinc/elements/issues/513)) ([72da7a1](https://github.com/muxinc/elements/commit/72da7a1e77b6c8ed095785013c644888dcb2a8f8))
* upgrade MC, fix theme flicker ([#1067](https://github.com/muxinc/elements/issues/1067)) ([b2fad06](https://github.com/muxinc/elements/commit/b2fad068300420d12ad25f26f24f8189f7ba6907))
* upgrade Media Chrome v0.16.2 ([59f36c6](https://github.com/muxinc/elements/commit/59f36c623a4c564676d632b7c0bcf1785264b49e))
* upgrade Media Chrome v0.16.2 ([5db98fb](https://github.com/muxinc/elements/commit/5db98fbc4d0e390858934c7f7cdf7da4442e2d02))
* upgrade Media Chrome v0.18.1 ([fa7353b](https://github.com/muxinc/elements/commit/fa7353b761884ebb1a7cbe74dcd85165d939c119))
* upgrade Media Chrome v4.2.1 ([#1001](https://github.com/muxinc/elements/issues/1001)) ([46e38b5](https://github.com/muxinc/elements/commit/46e38b5504ce2738c9b896e7424e3cb506e62fdf))
* upgrade media-chrome ([#1094](https://github.com/muxinc/elements/issues/1094)) ([56d8395](https://github.com/muxinc/elements/commit/56d83953a58c236dd851b231f5c4487891eaa2aa)), closes [#1062](https://github.com/muxinc/elements/issues/1062)
* upgrade media-chrome ([#990](https://github.com/muxinc/elements/issues/990)) ([e6e5598](https://github.com/muxinc/elements/commit/e6e559870e44ada3953dc7c5caef06d1986655ca))
* upgrade media-chrome + turbo ([#838](https://github.com/muxinc/elements/issues/838)) ([a7c4948](https://github.com/muxinc/elements/commit/a7c49488ccbc3c1a9d087775d8ee83298acd1e91))
* upgrade media-chrome 1.4.5 + rate row style ([#803](https://github.com/muxinc/elements/issues/803)) ([0b90bd0](https://github.com/muxinc/elements/commit/0b90bd0764b7b7728d8d754be12aed0c76662b97))
* upgrade media-chrome v2 & castable-video v1 ([#840](https://github.com/muxinc/elements/issues/840)) ([7752977](https://github.com/muxinc/elements/commit/775297721575680994ca1b96576080ac1f14c47d))
* upgrade media-chrome, upchunk, React types ([#904](https://github.com/muxinc/elements/issues/904)) ([1090ad6](https://github.com/muxinc/elements/commit/1090ad690261acd7ac1ab68b45801c46be1c2d0c))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))
* upgrade player.style 0.1.0 ([#1032](https://github.com/muxinc/elements/issues/1032)) ([ef71319](https://github.com/muxinc/elements/commit/ef713192980e5ce687f0028a63cc081b5a777632))
* use Media Chrome display CSS vars ([#613](https://github.com/muxinc/elements/issues/613)) ([4947565](https://github.com/muxinc/elements/commit/494756598cdc6f6517ce2f3a832557bdc2686059))
* use Mux Data player_error_context to get better error grouping in the Mux Data dashboard ([599c052](https://github.com/muxinc/elements/commit/599c052f984cd0d76f061c019872851339775b6a))
* use new MC template syntax ([32c3db0](https://github.com/muxinc/elements/commit/32c3db02783bf5693874e02d49b38bbb02576ebd))
* use new MC template syntax ([b656ccd](https://github.com/muxinc/elements/commit/b656ccd09d05fcee169f9956fd2571a56def47b5))
* use webkit pseudo element for captions movement, where available ([#674](https://github.com/muxinc/elements/issues/674)) ([1f236d4](https://github.com/muxinc/elements/commit/1f236d4b42f83fe40884732305259ff5a1fda679))
* use webp format instead of jpg, less bandwidth ([#525](https://github.com/muxinc/elements/issues/525)) ([9441de4](https://github.com/muxinc/elements/commit/9441de415b165a8f68c0db88eb25e2de827380f4))


### Miscellaneous Chores

* **mux-player, mux-player-react:** breaking change take 2 ([#994](https://github.com/muxinc/elements/issues/994)) ([668403a](https://github.com/muxinc/elements/commit/668403adf97aae14e3acba667e42965f03d9ec97))
* **mux-player,mux-player-react:** major version update ([#992](https://github.com/muxinc/elements/issues/992)) ([370c5dc](https://github.com/muxinc/elements/commit/370c5dc51a937b5746941ef0cd57c59dbd0b15f8))
* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.26.0 to 0.27.0
    * @mux/playback-core bumped from 0.30.0 to 0.31.0
</details>

<details><summary>@mux/mux-player-react: 4.0.0</summary>

## [4.0.0](https://github.com/muxinc/elements/compare/@mux/mux-player-react@3.5.0...@mux/mux-player-react@4.0.0) (2025-06-24)


###   BREAKING CHANGES

* **mux-player, mux-player-react:** Retrospective breaking change for tooltips pr
* **mux-player,mux-player-react:** major version update ([#992](https://github.com/muxinc/elements/issues/992))
* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))
* **mux-player-react:** Updates mux-player-react to match mux-player with new theme upgrade

### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* add a no-volume-pref attribute to turn of storing volume in localStorage ([#686](https://github.com/muxinc/elements/issues/686)) ([e9c2150](https://github.com/muxinc/elements/commit/e9c2150ba36615107f05d99baaa8a4432d71138d))
* add attribute max-resolution on mux-player and mux-video ([#581](https://github.com/muxinc/elements/issues/581)) ([1936c8e](https://github.com/muxinc/elements/commit/1936c8ecb47805ee75fd04ffee514b846043efc1))
* add poster slot for progressive enhancement ([#747](https://github.com/muxinc/elements/issues/747)) ([e90e096](https://github.com/muxinc/elements/commit/e90e096bc45776776e6fc4a8846aede2ad8ecb7c)), closes [#590](https://github.com/muxinc/elements/issues/590)
* add video-title attr & prop ([#1108](https://github.com/muxinc/elements/issues/1108)) ([7763a49](https://github.com/muxinc/elements/commit/7763a49d885e56342fffe874ba838059e15c906c)), closes [#639](https://github.com/muxinc/elements/issues/639)
* add way to set and render MC themes ([#561](https://github.com/muxinc/elements/issues/561)) ([0ac98e9](https://github.com/muxinc/elements/commit/0ac98e9a6fd60c5ea990be3c7d5d8ae7941e447c))
* basic drm support ([#905](https://github.com/muxinc/elements/issues/905)) ([79acc9d](https://github.com/muxinc/elements/commit/79acc9d8cb520da469f1c72196befc384ee5b4f9))
* Google IMA support for mux-player and mux-video variants ([#1128](https://github.com/muxinc/elements/issues/1128)) ([ec31d4d](https://github.com/muxinc/elements/commit/ec31d4d55e856e20cc67170f25d996afc549403b))
* implement Mux badge ([#988](https://github.com/muxinc/elements/issues/988)) ([2343df8](https://github.com/muxinc/elements/commit/2343df80fddcbf05485ed9d4ab27f1bb0fac04d0))
* inferred stream type ([#592](https://github.com/muxinc/elements/issues/592)) ([db4cc9f](https://github.com/muxinc/elements/commit/db4cc9f60660f2b860ecce0a5a5ef2a3a09cc40b))
* Lerna bump mux-player-react so versions sync ([56df987](https://github.com/muxinc/elements/commit/56df987c413792aa8e5f762f931587f1c193b2bc))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-player-react, mux-uploader-react, mux-audio-react, mux-video-react:** add client component directive ([#911](https://github.com/muxinc/elements/issues/911)) ([76aa003](https://github.com/muxinc/elements/commit/76aa003e9ad9488509650970b971edd3ed463592))
* **mux-player-react:** Add disable cookies prop. ([ba9d46a](https://github.com/muxinc/elements/commit/ba9d46a2da652555565d5f82b6fc6550899ef4fb))
* **mux-player-react:** Add experimentalCmcd prop. ([40b44ff](https://github.com/muxinc/elements/commit/40b44ff042f57d2b265398c024117ccce9af3982))
* **mux-player-react:** Add prefer cmcd prop. ([4733618](https://github.com/muxinc/elements/commit/473361832e9209314106980ce3e1ff1009a40d12))
* **mux-player-react:** bring breaking change in line with mux-player package ([#789](https://github.com/muxinc/elements/issues/789)) ([3d5112e](https://github.com/muxinc/elements/commit/3d5112ea3f90d8329d6d7e8553cbce3f62f334e1))
* **mux-player-react:** Force bump ([#806](https://github.com/muxinc/elements/issues/806)) ([101d04a](https://github.com/muxinc/elements/commit/101d04a00fb85d79fa036a40103bb054f26e0b78))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player-react:** Force version bump to 1.7.0 for parity with mux-player (minor code refactor for lerna). ([aba4ec0](https://github.com/muxinc/elements/commit/aba4ec0f6724928bd25f8def3685bfbccf68ec4c))
* **mux-player-react:** Force version bump to 1.7.0 for parity with mux-player. ([e7d6b3f](https://github.com/muxinc/elements/commit/e7d6b3f3eb36166c32d643de58baee9decf31fac))
* **mux-player-react:** meaningless commit, forced minor version bump ([2e52540](https://github.com/muxinc/elements/commit/2e52540a757b2384c4eb7aaf7ddad2d0a0398391))
* **mux-player-react:** mux player react cuepoint handlers ([#605](https://github.com/muxinc/elements/issues/605)) ([df4e6e0](https://github.com/muxinc/elements/commit/df4e6e036f7cd9b5d9dfa52e1adc56bb0a850373))
* **mux-player-react:** re-export themes from player package ([#737](https://github.com/muxinc/elements/issues/737)) ([682fe1a](https://github.com/muxinc/elements/commit/682fe1ab7b772d189224178b5fcac8bc0f607fa6))
* **mux-player-react:** Remove commented out code (feat to force mino& ([#890](https://github.com/muxinc/elements/issues/890)) ([9d48804](https://github.com/muxinc/elements/commit/9d48804bcc0d7df497caea40505599652596c195))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **mux-player, mux-player-react, mux-video:** cast custom data ([2722b6e](https://github.com/muxinc/elements/commit/2722b6ea6c5497c0bd0a28fd1732bd0b9c2474b6))
* **mux-player, mux-player-react:** Add extra-source-params/extraSourceParams attr/prop for advanced usage. ([a5ad6ed](https://github.com/muxinc/elements/commit/a5ad6ed3da0aafb52f983c91881126d74c884157))
* **mux-player, mux-player-react:** default duration ([#844](https://github.com/muxinc/elements/issues/844)) ([8d52572](https://github.com/muxinc/elements/commit/8d52572330089076a6d05ff33fa0f596e18799ff))
* **mux-player:** add storyboard-src attribute and corresponding prop ([#522](https://github.com/muxinc/elements/issues/522)) ([e9c3f0a](https://github.com/muxinc/elements/commit/e9c3f0afd3eb2521248996c37de1716b4ce724c4))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core, mux-video, mux-player:** addChapters interface ([#909](https://github.com/muxinc/elements/issues/909)) ([84392f1](https://github.com/muxinc/elements/commit/84392f14ee429b63ce26326e84e80e93bbdc70db))
* Remove experimentalCmcd and add none to preferCmcd. Update secret docs. ([2656631](https://github.com/muxinc/elements/commit/2656631968f2b7e97a07d435818ee43c16627002))
* Rename new default theme ([#771](https://github.com/muxinc/elements/issues/771)) ([b91c509](https://github.com/muxinc/elements/commit/b91c5092e005805a801982e15719984965f745e1))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* default-hidden-captions order bug for React ([#1105](https://github.com/muxinc/elements/issues/1105)) ([7b706ba](https://github.com/muxinc/elements/commit/7b706baf43cf6959415db4cd6a8d8381aa7b3adc))
* Ensure ref callback cleanup executes on MuxPlayer unmount ([#1132](https://github.com/muxinc/elements/issues/1132)) ([1c850b6](https://github.com/muxinc/elements/commit/1c850b60b7a678d572a46f96d95ecfb6630798ec))
* mark React 19 as peerdep ([#971](https://github.com/muxinc/elements/issues/971)) ([4f74ea0](https://github.com/muxinc/elements/commit/4f74ea0215407e5c9573d8dd4a91d2a855b864bb))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* **mux-player-react news:** on demand ad tag url ([#1144](https://github.com/muxinc/elements/issues/1144)) ([fbf1bb0](https://github.com/muxinc/elements/commit/fbf1bb070f0cde2928bcb9a77ae8f3696a96994e))
* **mux-player-react/lazy:** display placeholder before JS load ([#895](https://github.com/muxinc/elements/issues/895)) ([3abdbb8](https://github.com/muxinc/elements/commit/3abdbb8653ca9003736a147236723d7d90f3dc9f))
* **mux-player-react:** add disablePictureInPicture to TS def ([9fd9978](https://github.com/muxinc/elements/commit/9fd99780047d24e3efdb61ddc31ba7e8346415f3))
* **mux-player-react:** Don't "reset" currentTime to 0 unintentionally. ([#663](https://github.com/muxinc/elements/issues/663)) ([6ea8aed](https://github.com/muxinc/elements/commit/6ea8aedbe8e62a33bd8de630eddaadf823a738a6))
* **mux-player-react:** Don't declare lazy exports that don't exist. ([#746](https://github.com/muxinc/elements/issues/746)) ([c0c471a](https://github.com/muxinc/elements/commit/c0c471acbad94e06628c8c2061d09d893b410a51))
* **mux-player, mux-player-react:** add accent color prop attr ([#790](https://github.com/muxinc/elements/issues/790)) ([f147e5f](https://github.com/muxinc/elements/commit/f147e5f95887f0b08a46a2e76a0aacadb6f00455))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* **playback-core:** Change default of preferCmcd to 'none' for improved cacheability. Update reference docs to document preferCmcd (et al.). ([#1136](https://github.com/muxinc/elements/issues/1136)) ([4409304](https://github.com/muxinc/elements/commit/44093049b6629044dbb7fed10839f83667fdb37c))
* React 19 bool prop to attr value bug ([#1026](https://github.com/muxinc/elements/issues/1026)) ([52bca58](https://github.com/muxinc/elements/commit/52bca588a223600f450ed1f26be45a0da34fd4b2))
* Reverting packages type (defaults to cjs) for accuracy per node & ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))
* suppress Mux Player React hydration warning ([#1116](https://github.com/muxinc/elements/issues/1116)) ([0235d89](https://github.com/muxinc/elements/commit/0235d893a877b7aac96cece58e6ed3ee0571a6d9))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade media-chrome, upchunk, React types ([#904](https://github.com/muxinc/elements/issues/904)) ([1090ad6](https://github.com/muxinc/elements/commit/1090ad690261acd7ac1ab68b45801c46be1c2d0c))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))


### Miscellaneous Chores

* **mux-player, mux-player-react:** breaking change take 2 ([#994](https://github.com/muxinc/elements/issues/994)) ([668403a](https://github.com/muxinc/elements/commit/668403adf97aae14e3acba667e42965f03d9ec97))
* **mux-player,mux-player-react:** major version update ([#992](https://github.com/muxinc/elements/issues/992)) ([370c5dc](https://github.com/muxinc/elements/commit/370c5dc51a937b5746941ef0cd57c59dbd0b15f8))
* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-player bumped from 3.5.0 to 4.0.0
    * @mux/playback-core bumped from 0.30.0 to 0.31.0
</details>

<details><summary>@mux/mux-audio: 0.16.0</summary>

## [0.16.0](https://github.com/muxinc/elements/compare/@mux/mux-audio@0.15.10...@mux/mux-audio@0.16.0) (2025-06-24)


###   BREAKING CHANGES

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))

### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* add currentPdt getter and getStartDate() method ([#661](https://github.com/muxinc/elements/issues/661)) ([530170b](https://github.com/muxinc/elements/commit/530170b789d7734d2b70fde7d59abb1ebf8a582c))
* allow video, audio and player elements to get any metadata-* attrs set ([#501](https://github.com/muxinc/elements/issues/501)) ([8ee139d](https://github.com/muxinc/elements/commit/8ee139d2bbd08e1e3c08d047f870c1dcf01dac7e))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-audio:** Add disable cookies attr and prop. ([ef453ed](https://github.com/muxinc/elements/commit/ef453edf9cb9696150ae89f995a6af8472161153))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **playback-core, mux-video, mux-audio, mux-player:** Upg hls.js ([#902](https://github.com/muxinc/elements/issues/902)) ([a6a76b6](https://github.com/muxinc/elements/commit/a6a76b69e03867cc11c348d2b48e0160ea295309))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))
* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* bump the prod-dependencies group across 1 directory with 2 updates ([#1129](https://github.com/muxinc/elements/issues/1129)) ([e2ae00b](https://github.com/muxinc/elements/commit/e2ae00b3307161971326099a1a7af7c8f45163f4))
* bump the prod-dependencies group across 2 directories with 4 updates ([#1138](https://github.com/muxinc/elements/issues/1138)) ([0ac6871](https://github.com/muxinc/elements/commit/0ac68711fbf083964c442b8cea04dd76f1cfd288))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* **mux-video,mux-audio:** reload core on DOM connect ([#765](https://github.com/muxinc/elements/issues/765)) ([3b61394](https://github.com/muxinc/elements/commit/3b61394e4a60ded6c2a7f30b85c281f5ef5cea03))
* **playback-core, mux-video:** Handle native playback edge cases wher& ([#705](https://github.com/muxinc/elements/issues/705)) ([16f8941](https://github.com/muxinc/elements/commit/16f8941799a5186f28205a70105b26764f39b295))
* **playback-core:** Typescript + min acrobatics to make svelte and others happy ([fdf34bb](https://github.com/muxinc/elements/commit/fdf34bb8fd409f0c2b5945802251ed2e6ffafd7e))
* **playback-core:** Update hls.js version to fix multi-DRM playready bug. ([#1060](https://github.com/muxinc/elements/issues/1060)) ([380ded2](https://github.com/muxinc/elements/commit/380ded2ce544b9c9ae6a1d108b9d48cd4feb58fd))
* Reverting packages type (defaults to cjs) for accuracy per node & ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))
* tracks updating after load new playback id ([#1021](https://github.com/muxinc/elements/issues/1021)) ([b762184](https://github.com/muxinc/elements/commit/b762184001dfb373e1715bb3283e593aa2bf08eb))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade custom-media-element ([#858](https://github.com/muxinc/elements/issues/858)) ([eb39e54](https://github.com/muxinc/elements/commit/eb39e546073c9c78b385809b27d095f36350737f))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade external deps, allow patches uniform ([#850](https://github.com/muxinc/elements/issues/850)) ([f72acf4](https://github.com/muxinc/elements/commit/f72acf49199497cb45c186bd4b2bc2a67e5431c0))
* upgrade hls.js, custom-media-element, etc. ([#931](https://github.com/muxinc/elements/issues/931)) ([efb5c51](https://github.com/muxinc/elements/commit/efb5c514f65f017fdeea50682e1cdb15229cfd92)), closes [#927](https://github.com/muxinc/elements/issues/927)
* upgrade MC, fix theme flicker ([#1067](https://github.com/muxinc/elements/issues/1067)) ([b2fad06](https://github.com/muxinc/elements/commit/b2fad068300420d12ad25f26f24f8189f7ba6907))
* upgrade media-chrome + turbo ([#838](https://github.com/muxinc/elements/issues/838)) ([a7c4948](https://github.com/muxinc/elements/commit/a7c49488ccbc3c1a9d087775d8ee83298acd1e91))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))
* upgrade to hls.js 1.4.1 ([#685](https://github.com/muxinc/elements/issues/685)) ([15ca4ac](https://github.com/muxinc/elements/commit/15ca4acc3b5093a409baa938429d9afaa30c80bd))
* use custom-media-element pkg ([#697](https://github.com/muxinc/elements/issues/697)) ([71c3341](https://github.com/muxinc/elements/commit/71c334157cbb16f88d57b020425534e9dde2b4ca))


### Miscellaneous Chores

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/playback-core bumped from 0.30.0 to 0.31.0
</details>

<details><summary>@mux/mux-audio-react: 0.16.0</summary>

## [0.16.0](https://github.com/muxinc/elements/compare/@mux/mux-audio-react@0.15.10...@mux/mux-audio-react@0.16.0) (2025-06-24)


###   BREAKING CHANGES

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))

### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-audio-react:** Add disable cookies prop. ([a025fe7](https://github.com/muxinc/elements/commit/a025fe7b93ddb83cd378ebe444ffc94ce5d76758))
* **mux-player-react, mux-uploader-react, mux-audio-react, mux-video-react:** add client component directive ([#911](https://github.com/muxinc/elements/issues/911)) ([76aa003](https://github.com/muxinc/elements/commit/76aa003e9ad9488509650970b971edd3ed463592))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))
* add updated peer deps to other React pkgs ([#1006](https://github.com/muxinc/elements/issues/1006)) ([e51a7ce](https://github.com/muxinc/elements/commit/e51a7ce412ce7f56610035f412e2f263325ed6ad))
* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* mark React 19 as peerdep ([#971](https://github.com/muxinc/elements/issues/971)) ([4f74ea0](https://github.com/muxinc/elements/commit/4f74ea0215407e5c9573d8dd4a91d2a855b864bb))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* MuxAudio and MuxVideo mem issues ([c997a61](https://github.com/muxinc/elements/commit/c997a61a93d44c038fd33fe0cdc65f27fc76408f))
* MuxAudioReact mem leak ([e707c8c](https://github.com/muxinc/elements/commit/e707c8ce4589e15b51343f24d700b952ffc38988))
* passthrough props to native media els ([#912](https://github.com/muxinc/elements/issues/912)) ([88a63db](https://github.com/muxinc/elements/commit/88a63db7dadc9aa3e09402f7c1be79a278b97c06))
* Reverting packages type (defaults to cjs) for accuracy per node & ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade media-chrome, upchunk, React types ([#904](https://github.com/muxinc/elements/issues/904)) ([1090ad6](https://github.com/muxinc/elements/commit/1090ad690261acd7ac1ab68b45801c46be1c2d0c))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))


### Miscellaneous Chores

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/playback-core bumped from 0.30.0 to 0.31.0
</details>

<details><summary>@mux/mux-video: 0.27.0</summary>

## [0.27.0](https://github.com/muxinc/elements/compare/@mux/mux-video@0.26.0...@mux/mux-video@0.27.0) (2025-06-24)


###   BREAKING CHANGES

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))

### Features

* add `@mux/mux-video/react` import ([#1047](https://github.com/muxinc/elements/issues/1047)) ([8470223](https://github.com/muxinc/elements/commit/8470223e27a870b81d7bf4a3afbdfc8c23c29ec5))
* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* add attribute max-resolution on mux-player and mux-video ([#581](https://github.com/muxinc/elements/issues/581)) ([1936c8e](https://github.com/muxinc/elements/commit/1936c8ecb47805ee75fd04ffee514b846043efc1))
* add currentPdt getter and getStartDate() method ([#661](https://github.com/muxinc/elements/issues/661)) ([530170b](https://github.com/muxinc/elements/commit/530170b789d7734d2b70fde7d59abb1ebf8a582c))
* add free plan logo ([#1140](https://github.com/muxinc/elements/issues/1140)) ([a6b369e](https://github.com/muxinc/elements/commit/a6b369e6fb97427374be5aa960cf709a3851b7e9))
* add optional mux logo to mux video ([#1090](https://github.com/muxinc/elements/issues/1090)) ([e61c2fa](https://github.com/muxinc/elements/commit/e61c2fa0e775ef4c577551afe5adabc64044b9a7))
* allow video, audio and player elements to get any metadata-* attrs set ([#501](https://github.com/muxinc/elements/issues/501)) ([8ee139d](https://github.com/muxinc/elements/commit/8ee139d2bbd08e1e3c08d047f870c1dcf01dac7e))
* basic drm support ([#905](https://github.com/muxinc/elements/issues/905)) ([79acc9d](https://github.com/muxinc/elements/commit/79acc9d8cb520da469f1c72196befc384ee5b4f9))
* Google IMA support for mux-player and mux-video variants ([#1128](https://github.com/muxinc/elements/issues/1128)) ([ec31d4d](https://github.com/muxinc/elements/commit/ec31d4d55e856e20cc67170f25d996afc549403b))
* implement renditions API ([#708](https://github.com/muxinc/elements/issues/708)) ([f3e8db2](https://github.com/muxinc/elements/commit/f3e8db21fd03c5d5570a628853f49c51d428d26e))
* inferred stream type ([#592](https://github.com/muxinc/elements/issues/592)) ([db4cc9f](https://github.com/muxinc/elements/commit/db4cc9f60660f2b860ecce0a5a5ef2a3a09cc40b))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **mux-player, mux-player-react, mux-video:** cast custom data ([2722b6e](https://github.com/muxinc/elements/commit/2722b6ea6c5497c0bd0a28fd1732bd0b9c2474b6))
* **mux-player, mux-video, playback-core:** Add API for CuePoints metadata. ([1f0b40a](https://github.com/muxinc/elements/commit/1f0b40a6d7f09c0e08a42353e241a26857edaad6))
* **mux-video:** Add disable cookies attr and prop. ([d3bf5a2](https://github.com/muxinc/elements/commit/d3bf5a2d1af898569add4151a06c5bc4c7e469d9))
* **mux-video:** Add prefer cmcd attr and prop. ([25f0fb7](https://github.com/muxinc/elements/commit/25f0fb7779a6fb30428a7df3a920030836b79dab))
* **mux-video:** Expose experimental cmcd prop and attr. ([969251d](https://github.com/muxinc/elements/commit/969251dd1ec6f3a2cfe924935077d50915288e30))
* **playback-core, mux-video, mux-audio, mux-player:** Upg hls.js ([#902](https://github.com/muxinc/elements/issues/902)) ([a6a76b6](https://github.com/muxinc/elements/commit/a6a76b69e03867cc11c348d2b48e0160ea295309))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core, mux-video, mux-player:** addChapters interface ([#909](https://github.com/muxinc/elements/issues/909)) ([84392f1](https://github.com/muxinc/elements/commit/84392f14ee429b63ce26326e84e80e93bbdc70db))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))
* Remove experimentalCmcd and add none to preferCmcd. Update secret docs. ([2656631](https://github.com/muxinc/elements/commit/2656631968f2b7e97a07d435818ee43c16627002))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))
* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* bump castable-video from 1.1.5 to 1.1.6 in the prod-dependencies group across 1 directory ([#1103](https://github.com/muxinc/elements/issues/1103)) ([9f27791](https://github.com/muxinc/elements/commit/9f277919fa249f028ad57da174470b2d845e2b9b))
* bump the prod-dependencies group across 1 directory with 2 updates ([#1109](https://github.com/muxinc/elements/issues/1109)) ([7969b53](https://github.com/muxinc/elements/commit/7969b53261ef055a76cf26ced26ab978338f2db9))
* bump the prod-dependencies group across 1 directory with 2 updates ([#1129](https://github.com/muxinc/elements/issues/1129)) ([e2ae00b](https://github.com/muxinc/elements/commit/e2ae00b3307161971326099a1a7af7c8f45163f4))
* bump the prod-dependencies group across 2 directories with 4 updates ([#1138](https://github.com/muxinc/elements/issues/1138)) ([0ac6871](https://github.com/muxinc/elements/commit/0ac68711fbf083964c442b8cea04dd76f1cfd288))
* chapters and cuepoints interface doesnt reflect internal types ([#977](https://github.com/muxinc/elements/issues/977)) ([e3eadec](https://github.com/muxinc/elements/commit/e3eadec050160ed44f01b91b4a49e84cce9188fc)), closes [#947](https://github.com/muxinc/elements/issues/947)
* **custom-media-element:** fix chapters & metadata tracks ([#871](https://github.com/muxinc/elements/issues/871)) ([4518456](https://github.com/muxinc/elements/commit/4518456b33ed4bb76253477c887939223ec692f0))
* media-tracks types not polluting global HTMLMediaElement ([#855](https://github.com/muxinc/elements/issues/855)) ([ce7235b](https://github.com/muxinc/elements/commit/ce7235bfab8b3e54d4731aaf944a121163286e6a))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* **mux-video,mux-audio:** reload core on DOM connect ([#765](https://github.com/muxinc/elements/issues/765)) ([3b61394](https://github.com/muxinc/elements/commit/3b61394e4a60ded6c2a7f30b85c281f5ef5cea03))
* mux-video/react import issue ([#1049](https://github.com/muxinc/elements/issues/1049)) ([f390932](https://github.com/muxinc/elements/commit/f3909329932f1f65bd29f7c5eb830ff6b73c1996))
* **mux-video:** Clean up some type defs. ([6daddd2](https://github.com/muxinc/elements/commit/6daddd2cb72dc496bb138b06c2673026db299dc0))
* **playback-core, mux-video:** Handle native playback edge cases wher& ([#705](https://github.com/muxinc/elements/issues/705)) ([16f8941](https://github.com/muxinc/elements/commit/16f8941799a5186f28205a70105b26764f39b295))
* **playback-core:** fix metadata type error ([#1151](https://github.com/muxinc/elements/issues/1151)) ([de6d029](https://github.com/muxinc/elements/commit/de6d02928f78c49cbf7e19dafa53ac8263bf9b63))
* **playback-core:** Typescript + min acrobatics to make svelte and others happy ([fdf34bb](https://github.com/muxinc/elements/commit/fdf34bb8fd409f0c2b5945802251ed2e6ffafd7e))
* **playback-core:** Update hls.js version to fix multi-DRM playready bug. ([#1060](https://github.com/muxinc/elements/issues/1060)) ([380ded2](https://github.com/muxinc/elements/commit/380ded2ce544b9c9ae6a1d108b9d48cd4feb58fd))
* remove old cast events from mux-video ([73a85cd](https://github.com/muxinc/elements/commit/73a85cd37a4771bf54fdb09ab6d441cf849cc87b))
* Reverting packages type (defaults to cjs) for accuracy per node & ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))
* tracks updating after load new playback id ([#1021](https://github.com/muxinc/elements/issues/1021)) ([b762184](https://github.com/muxinc/elements/commit/b762184001dfb373e1715bb3283e593aa2bf08eb))
* ts error due to duplicate same dependency ([#837](https://github.com/muxinc/elements/issues/837)) ([411f382](https://github.com/muxinc/elements/commit/411f382ca9d701fae30bdf12d65b7c314f3e9618)), closes [#836](https://github.com/muxinc/elements/issues/836)
* typeerror getLogoHTML of undefined ([35478ce](https://github.com/muxinc/elements/commit/35478ce0db11f7ef6304fba61d0e8d8574b88fcb))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade custom-media-element ([#858](https://github.com/muxinc/elements/issues/858)) ([eb39e54](https://github.com/muxinc/elements/commit/eb39e546073c9c78b385809b27d095f36350737f))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade external deps, allow patches uniform ([#850](https://github.com/muxinc/elements/issues/850)) ([f72acf4](https://github.com/muxinc/elements/commit/f72acf49199497cb45c186bd4b2bc2a67e5431c0))
* upgrade hls.js, custom-media-element, etc. ([#931](https://github.com/muxinc/elements/issues/931)) ([efb5c51](https://github.com/muxinc/elements/commit/efb5c514f65f017fdeea50682e1cdb15229cfd92)), closes [#927](https://github.com/muxinc/elements/issues/927)
* upgrade MC, fix theme flicker ([#1067](https://github.com/muxinc/elements/issues/1067)) ([b2fad06](https://github.com/muxinc/elements/commit/b2fad068300420d12ad25f26f24f8189f7ba6907))
* upgrade media-chrome + turbo ([#838](https://github.com/muxinc/elements/issues/838)) ([a7c4948](https://github.com/muxinc/elements/commit/a7c49488ccbc3c1a9d087775d8ee83298acd1e91))
* upgrade media-chrome v2 & castable-video v1 ([#840](https://github.com/muxinc/elements/issues/840)) ([7752977](https://github.com/muxinc/elements/commit/775297721575680994ca1b96576080ac1f14c47d))
* upgrade media-tracks ([#744](https://github.com/muxinc/elements/issues/744)) ([af957c2](https://github.com/muxinc/elements/commit/af957c2421715d62e6cef658d0e608a6a3f20968))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))
* use custom-media-element pkg ([#697](https://github.com/muxinc/elements/issues/697)) ([71c3341](https://github.com/muxinc/elements/commit/71c334157cbb16f88d57b020425534e9dde2b4ca))
* use webkit pseudo element for captions movement, where available ([#674](https://github.com/muxinc/elements/issues/674)) ([1f236d4](https://github.com/muxinc/elements/commit/1f236d4b42f83fe40884732305259ff5a1fda679))


### Miscellaneous Chores

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/playback-core bumped from 0.30.0 to 0.31.0
</details>

<details><summary>@mux/mux-video-react: 0.27.0</summary>

## [0.27.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.26.0...@mux/mux-video-react@0.27.0) (2025-06-24)


###   BREAKING CHANGES

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978))

### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))
* **mux-player-react, mux-uploader-react, mux-audio-react, mux-video-react:** add client component directive ([#911](https://github.com/muxinc/elements/issues/911)) ([76aa003](https://github.com/muxinc/elements/commit/76aa003e9ad9488509650970b971edd3ed463592))
* **mux-player-react:** Force minor version bump via conventional commits. ([201bfcd](https://github.com/muxinc/elements/commit/201bfcd2a4137b2c409d1ce5fb3b32576a99ba31))
* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **mux-video-react:** Add disable cookies prop. ([777db83](https://github.com/muxinc/elements/commit/777db8301e6bbb97ef542a05251b00e450a04b8d))
* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))
* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))
* add updated peer deps to other React pkgs ([#1006](https://github.com/muxinc/elements/issues/1006)) ([e51a7ce](https://github.com/muxinc/elements/commit/e51a7ce412ce7f56610035f412e2f263325ed6ad))
* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* mark React 19 as peerdep ([#971](https://github.com/muxinc/elements/issues/971)) ([4f74ea0](https://github.com/muxinc/elements/commit/4f74ea0215407e5c9573d8dd4a91d2a855b864bb))
* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* **mux-video-react:** Don't spread disableCookies to video to avoid warnings ([#749](https://github.com/muxinc/elements/issues/749)) ([06169be](https://github.com/muxinc/elements/commit/06169bef2c158a02e683839f1bebb8cb1e619c0c))
* **mux-video-react:** Don't spread streamType to video to avoid React warnings ([#721](https://github.com/muxinc/elements/issues/721)) ([7395fca](https://github.com/muxinc/elements/commit/7395fca1b50dbad4fa04cb37b234523b953a2c78)), closes [#602](https://github.com/muxinc/elements/issues/602)
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* MuxAudio and MuxVideo mem issues ([c997a61](https://github.com/muxinc/elements/commit/c997a61a93d44c038fd33fe0cdc65f27fc76408f))
* MuxVideoReact memory leak ([c057099](https://github.com/muxinc/elements/commit/c057099bb344212c0afd5f938a92c893245423b4))
* passthrough props to native media els ([#912](https://github.com/muxinc/elements/issues/912)) ([88a63db](https://github.com/muxinc/elements/commit/88a63db7dadc9aa3e09402f7c1be79a278b97c06))
* Reverting packages type (defaults to cjs) for accuracy per node & ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))
* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))
* upgrade media-chrome, upchunk, React types ([#904](https://github.com/muxinc/elements/issues/904)) ([1090ad6](https://github.com/muxinc/elements/commit/1090ad690261acd7ac1ab68b45801c46be1c2d0c))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))


### Miscellaneous Chores

* Upgrade media chrome to 4.1.0 ([#978](https://github.com/muxinc/elements/issues/978)) ([ff78173](https://github.com/muxinc/elements/commit/ff781732c86719de2ea7e54987c75178ac42bbd6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/playback-core bumped from 0.30.0 to 0.31.0
</details>

---
This PR was generated with [Release Please](https://github.com/googleapis/release-please). See [documentation](https://github.com/googleapis/release-please#release-please).