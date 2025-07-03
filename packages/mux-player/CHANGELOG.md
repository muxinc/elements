# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0](https://github.com/muxinc/elements/compare/@mux/mux-player@3.0.0...@mux/mux-player@3.1.0) (2024-10-24)


### Bug Fixes

* menu CSS vars to hide menu button ([#999](https://github.com/muxinc/elements/issues/999)) ([4375d6f](https://github.com/muxinc/elements/commit/4375d6f0cb3c56eaee291521ad14c8eb5feb5d59))
* upgrade Media Chrome v4.2.1 ([#1001](https://github.com/muxinc/elements/issues/1001)) ([46e38b5](https://github.com/muxinc/elements/commit/46e38b5504ce2738c9b896e7424e3cb506e62fdf))


### Features

* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))





# [3.0.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.9.1...@mux/mux-player@3.0.0) (2024-09-20)


### Bug Fixes

* chapters and cuepoints interface doesnt reflect internal types ([#977](https://github.com/muxinc/elements/issues/977)) ([e3eadec](https://github.com/muxinc/elements/commit/e3eadec050160ed44f01b91b4a49e84cce9188fc)), closes [#947](https://github.com/muxinc/elements/issues/947)
* **mux-player, mux-player-react:** Remove seek buttons from mobile pre-playback UI ([#982](https://github.com/muxinc/elements/issues/982)) ([840a0be](https://github.com/muxinc/elements/commit/840a0be0b8b9feccee3cd0cb69c7156f81b1b8cc))
* **mux-player:** add buttons to mobile live audio view ([#985](https://github.com/muxinc/elements/issues/985)) ([3437ced](https://github.com/muxinc/elements/commit/3437ced3fd01c7078cd32ee585fd69378aec0620))
* upgrade media-chrome ([#990](https://github.com/muxinc/elements/issues/990)) ([e6e5598](https://github.com/muxinc/elements/commit/e6e559870e44ada3953dc7c5caef06d1986655ca))


* chore(mux-player, mux-player-react)!: breaking change take 2 (#994) ([668403a](https://github.com/muxinc/elements/commit/668403adf97aae14e3acba667e42965f03d9ec97)), closes [#994](https://github.com/muxinc/elements/issues/994)


### Features

* **mux-player, mux-player-react, mux-video:** cast custom data ([2722b6e](https://github.com/muxinc/elements/commit/2722b6ea6c5497c0bd0a28fd1732bd0b9c2474b6))


### BREAKING CHANGES

* Retrospective breaking change for tooltips pr





## [3.5.1](https://github.com/muxinc/elements/compare/@mux/mux-player@3.5.0...@mux/mux-player@3.5.1) (2025-07-03)


### Bug Fixes

* upgrade hls.js to 1.6.6, rm workaround MTA (multi-track audio) ([#1162](https://github.com/muxinc/elements/issues/1162)) ([ceb2d15](https://github.com/muxinc/elements/commit/ceb2d156af9f245577d2ca06f8863bec3acaeb80))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.26.0 to 0.26.1
    * @mux/playback-core bumped from 0.30.0 to 0.30.1

## [3.5.0](https://github.com/muxinc/elements/compare/@mux/mux-player@3.4.1...@mux/mux-player@3.5.0) (2025-06-23)


### Features

* Google IMA support for mux-player and mux-video variants ([#1128](https://github.com/muxinc/elements/issues/1128)) ([ec31d4d](https://github.com/muxinc/elements/commit/ec31d4d55e856e20cc67170f25d996afc549403b))
* retry logic for 412 not playable errors ([#1106](https://github.com/muxinc/elements/issues/1106)) ([677c90a](https://github.com/muxinc/elements/commit/677c90ac3be18290f458be422a2bcc41cd4b7a6d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.25.3 to 0.26.0
    * @mux/playback-core bumped from 0.29.1 to 0.30.0

## [3.4.1](https://github.com/muxinc/elements/compare/@mux/mux-player@3.4.0...@mux/mux-player@3.4.1) (2025-06-12)


### Bug Fixes

* bring back cast button for drm protected videos ([#1137](https://github.com/muxinc/elements/issues/1137)) ([aa3a1ca](https://github.com/muxinc/elements/commit/aa3a1cae56813d1b5bd651392a14ef4325468a31))
* bump the prod-dependencies group across 2 directories with 1 update ([#1121](https://github.com/muxinc/elements/issues/1121)) ([85a2276](https://github.com/muxinc/elements/commit/85a2276805ae48fe99147fff121141ba6131bd27))
* bump the prod-dependencies group across 2 directories with 4 updates ([#1138](https://github.com/muxinc/elements/issues/1138)) ([0ac6871](https://github.com/muxinc/elements/commit/0ac68711fbf083964c442b8cea04dd76f1cfd288))
* **playback-core:** Change default of preferCmcd to 'none' for improved cacheability. Update reference docs to document preferCmcd (et al.). ([#1136](https://github.com/muxinc/elements/issues/1136)) ([4409304](https://github.com/muxinc/elements/commit/44093049b6629044dbb7fed10839f83667fdb37c))
* rendition-menu visual improvements ([#1131](https://github.com/muxinc/elements/issues/1131)) ([59a2aaa](https://github.com/muxinc/elements/commit/59a2aaaae6140b5e2a7e74faa39b68d0990b593e)), closes [#1122](https://github.com/muxinc/elements/issues/1122)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.25.2 to 0.25.3
    * @mux/playback-core bumped from 0.29.0 to 0.29.1

## [3.4.0](https://github.com/muxinc/elements/compare/@mux/mux-player@3.3.4...@mux/mux-player@3.4.0) (2025-05-01)


### Features

* add fullscreen API on player element ([#1107](https://github.com/muxinc/elements/issues/1107)) ([205f3c8](https://github.com/muxinc/elements/commit/205f3c86a334c8f3d641e0e9d00cf9b9b8305cf5))
* add video-title attr & prop ([#1108](https://github.com/muxinc/elements/issues/1108)) ([7763a49](https://github.com/muxinc/elements/commit/7763a49d885e56342fffe874ba838059e15c906c)), closes [#639](https://github.com/muxinc/elements/issues/639)


### Bug Fixes

* bump player.style from 0.1.7 to 0.1.8 in the prod-dependencies group across 1 directory ([#1110](https://github.com/muxinc/elements/issues/1110)) ([34dcba4](https://github.com/muxinc/elements/commit/34dcba46b4955263da8dc05c128e0c6e98ccfbcb))
* bump the prod-dependencies group across 1 directory with 2 updates ([#1109](https://github.com/muxinc/elements/issues/1109)) ([7969b53](https://github.com/muxinc/elements/commit/7969b53261ef055a76cf26ced26ab978338f2db9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.25.1 to 0.25.2
    * @mux/playback-core bumped from 0.28.7 to 0.29.0

## [3.3.4](https://github.com/muxinc/elements/compare/@mux/mux-player@3.3.3...@mux/mux-player@3.3.4) (2025-04-10)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.25.0 to 0.25.1
    * @mux/playback-core bumped from 0.28.6 to 0.28.7

## [3.3.3](https://github.com/muxinc/elements/compare/@mux/mux-player@3.3.2...@mux/mux-player@3.3.3) (2025-04-03)


### Bug Fixes

* bump player.style from 0.1.6 to 0.1.7 in the prod-dependencies group across 1 directory ([#1095](https://github.com/muxinc/elements/issues/1095)) ([b9da4be](https://github.com/muxinc/elements/commit/b9da4bea21b0292de92ab504b2a903ee61dc5bea))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.24.5 to 0.25.0
    * @mux/playback-core bumped from 0.28.5 to 0.28.6

## [3.3.2](https://github.com/muxinc/elements/compare/@mux/mux-player@3.3.1...@mux/mux-player@3.3.2) (2025-03-31)


### Bug Fixes

* upgrade media-chrome ([#1094](https://github.com/muxinc/elements/issues/1094)) ([56d8395](https://github.com/muxinc/elements/commit/56d83953a58c236dd851b231f5c4487891eaa2aa)), closes [#1062](https://github.com/muxinc/elements/issues/1062)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.24.4 to 0.24.5
    * @mux/playback-core bumped from 0.28.4 to 0.28.5

## [3.3.1](https://github.com/muxinc/elements/compare/@mux/mux-player@3.3.0...@mux/mux-player@3.3.1) (2025-03-21)


### Bug Fixes

* bump media-chrome from 4.7.1 to 4.8.0 in /packages/mux-player in the prod-dependencies group across 1 directory ([#1084](https://github.com/muxinc/elements/issues/1084)) ([d2eccb5](https://github.com/muxinc/elements/commit/d2eccb5e3437da360873c84258f2e9624f1d2993))
* **deps:** bump media-chrome from 4.5.0 to 4.7.1 ([#1079](https://github.com/muxinc/elements/issues/1079)) ([9609d01](https://github.com/muxinc/elements/commit/9609d0184becf9c067ccd5a77c61919e61decf04))
* upgrade dependencies (castable-video, ...) ([#1087](https://github.com/muxinc/elements/issues/1087)) ([dc84f07](https://github.com/muxinc/elements/commit/dc84f07109565dc7ee29d691a0fc941c6854f762))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.24.3 to 0.24.4
    * @mux/playback-core bumped from 0.28.3 to 0.28.4

## [3.3.0](https://github.com/muxinc/elements/compare/@mux/mux-player@3.2.4...@mux/mux-player@3.3.0) (2025-02-13)


### Features

* implement Mux badge ([#988](https://github.com/muxinc/elements/issues/988)) ([2343df8](https://github.com/muxinc/elements/commit/2343df80fddcbf05485ed9d4ab27f1bb0fac04d0))


### Bug Fixes

* add missing menu part ([#1066](https://github.com/muxinc/elements/issues/1066)) ([f5c6d90](https://github.com/muxinc/elements/commit/f5c6d90999222a8eac7c62db60b097361a7effd0)), closes [#1065](https://github.com/muxinc/elements/issues/1065)
* Mux-player imports ([#1056](https://github.com/muxinc/elements/issues/1056)) ([9b7ec1b](https://github.com/muxinc/elements/commit/9b7ec1b8b92a49f74ba361db90ddfa0a526c44d0))
* **playback-core:** Update hls.js version to fix multi-DRM playready bug. ([#1060](https://github.com/muxinc/elements/issues/1060)) ([380ded2](https://github.com/muxinc/elements/commit/380ded2ce544b9c9ae6a1d108b9d48cd4feb58fd))
* upgrade MC, fix theme flicker ([#1067](https://github.com/muxinc/elements/issues/1067)) ([b2fad06](https://github.com/muxinc/elements/commit/b2fad068300420d12ad25f26f24f8189f7ba6907))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.24.2 to 0.24.3
    * @mux/playback-core bumped from 0.28.2 to 0.28.3

## [3.2.4](https://github.com/muxinc/elements/compare/@mux/mux-player@3.2.3...@mux/mux-player@3.2.4) (2024-12-20)


### Bug Fixes

* upgrade deps custom-media-element, hls.js, mux-embed, ... ([#1052](https://github.com/muxinc/elements/issues/1052)) ([dd4264d](https://github.com/muxinc/elements/commit/dd4264d51671989a29c037e912a128056acea5f8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.24.1 to 0.24.2
    * @mux/playback-core bumped from 0.28.1 to 0.28.2

## [3.2.3](https://github.com/muxinc/elements/compare/@mux/mux-player@3.2.2...@mux/mux-player@3.2.3) (2024-12-19)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.24.0 to 0.24.1

## [3.2.2](https://github.com/muxinc/elements/compare/@mux/mux-player@3.2.1...@mux/mux-player@3.2.2) (2024-12-19)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.23.1 to 0.24.0

## [3.2.1](https://github.com/muxinc/elements/compare/@mux/mux-player@3.2.0...@mux/mux-player@3.2.1) (2024-12-17)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.23.0 to 0.23.1
    * @mux/playback-core bumped from 0.28.0 to 0.28.1

## [3.2.0](https://github.com/muxinc/elements/compare/@mux/mux-player@3.1.0...@mux/mux-player@3.2.0) (2024-12-12)


### Features

* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* Mux-player childList observer behavior ([#1041](https://github.com/muxinc/elements/issues/1041)) ([d34903f](https://github.com/muxinc/elements/commit/d34903f97b35545093484ffc2cc4713825658337))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))
* upgrade player.style 0.1.0 ([#1032](https://github.com/muxinc/elements/issues/1032)) ([ef71319](https://github.com/muxinc/elements/commit/ef713192980e5ce687f0028a63cc081b5a777632))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/mux-video bumped from 0.22.0 to 0.23.0
    * @mux/playback-core bumped from 0.27.0 to 0.28.0

## [2.9.1](https://github.com/muxinc/elements/compare/@mux/mux-player@2.9.0...@mux/mux-player@2.9.1) (2024-08-06)


### Bug Fixes

* css animation forwards causing UI lag ([#973](https://github.com/muxinc/elements/issues/973)) ([ec59cb3](https://github.com/muxinc/elements/commit/ec59cb3a3b9db65d6f761a9c983be85b7c755101)), closes [/stackoverflow.com/questions/12991164/maintaining-the-final-state-at-end-of-a-css-animation#comment118487774_12991203](https://github.com//stackoverflow.com/questions/12991164/maintaining-the-final-state-at-end-of-a-css-animation/issues/comment118487774_12991203)





# [2.9.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.8.1...@mux/mux-player@2.9.0) (2024-08-02)


### Bug Fixes

* attach events on null media property ([#966](https://github.com/muxinc/elements/issues/966)) ([02ac022](https://github.com/muxinc/elements/commit/02ac022f0cb6dea2b8442f615f03cf791d6a8d4f))


### Features

* dup track append, add source tag support ([#962](https://github.com/muxinc/elements/issues/962)) ([735cb9b](https://github.com/muxinc/elements/commit/735cb9be8336ab37f3f349b6bcdac413eb8f3fd9)), closes [#944](https://github.com/muxinc/elements/issues/944) [#948](https://github.com/muxinc/elements/issues/948)





## [2.8.1](https://github.com/muxinc/elements/compare/@mux/mux-player@2.8.0...@mux/mux-player@2.8.1) (2024-07-26)


### Bug Fixes

* **mux-player:** use CSS to disable subtitle shifting for iOS in fullscreen. ([#958](https://github.com/muxinc/elements/issues/958)) ([f14249b](https://github.com/muxinc/elements/commit/f14249bc76052c65c2d606cd90edcefe947a7353))





# [2.8.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.7.0...@mux/mux-player@2.8.0) (2024-07-10)


### Bug Fixes

* **mux-player:** Hide cast button by default when using DRM. ([#930](https://github.com/muxinc/elements/issues/930)) ([367275a](https://github.com/muxinc/elements/commit/367275ad28dc689510e89000f27ccddb9092315e))
* upgrade hls.js, custom-media-element, etc. ([#931](https://github.com/muxinc/elements/issues/931)) ([efb5c51](https://github.com/muxinc/elements/commit/efb5c514f65f017fdeea50682e1cdb15229cfd92)), closes [#927](https://github.com/muxinc/elements/issues/927)


### Features

* basic drm support ([#905](https://github.com/muxinc/elements/issues/905)) ([79acc9d](https://github.com/muxinc/elements/commit/79acc9d8cb520da469f1c72196befc384ee5b4f9))





# [2.7.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.6.0...@mux/mux-player@2.7.0) (2024-05-28)


### Features

* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))
* **playback-core, mux-video, mux-player:** addChapters interface ([#909](https://github.com/muxinc/elements/issues/909)) ([84392f1](https://github.com/muxinc/elements/commit/84392f14ee429b63ce26326e84e80e93bbdc70db))





# [2.6.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.5.0...@mux/mux-player@2.6.0) (2024-05-03)


### Features

* **mux-player:** Clean up TS (but also force minor version bump). ([#917](https://github.com/muxinc/elements/issues/917)) ([f418d8c](https://github.com/muxinc/elements/commit/f418d8c86c5822040e121d50ecbbfca5e59b8211))





# [2.5.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.4.1...@mux/mux-player@2.5.0) (2024-04-18)


### Bug Fixes

* upgrade media-chrome, upchunk, React types ([#904](https://github.com/muxinc/elements/issues/904)) ([1090ad6](https://github.com/muxinc/elements/commit/1090ad690261acd7ac1ab68b45801c46be1c2d0c))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))


### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))
* **playback-core, mux-video, mux-audio, mux-player:** Upg hls.js ([#902](https://github.com/muxinc/elements/issues/902)) ([a6a76b6](https://github.com/muxinc/elements/commit/a6a76b69e03867cc11c348d2b48e0160ea295309))





## [2.4.1](https://github.com/muxinc/elements/compare/@mux/mux-player@2.4.0...@mux/mux-player@2.4.1) (2024-03-29)

**Note:** Version bump only for package @mux/mux-player





# [2.4.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.3.3...@mux/mux-player@2.4.0) (2024-03-20)


### Bug Fixes

* **mux-player:** More cleanup for DVR in media chrome ([#887](https://github.com/muxinc/elements/issues/887)) ([e54dcdb](https://github.com/muxinc/elements/commit/e54dcdbcec8c7f32f57568021353a398126629f6))
* polish new time preview w/ shifting arrow ([#884](https://github.com/muxinc/elements/issues/884)) ([a3662c7](https://github.com/muxinc/elements/commit/a3662c7a2076246ed8dbca8c99aaaecce4b2423c))
* polish, use easing gradients ([#885](https://github.com/muxinc/elements/issues/885)) ([ff68f13](https://github.com/muxinc/elements/commit/ff68f13384badbda9ca8ac3618a8f36b769fa403))


### Features

* **mux-player:** Keyboard seek offsets now update with component offset props. ([#888](https://github.com/muxinc/elements/issues/888)) ([b419de9](https://github.com/muxinc/elements/commit/b419de9a3e316a712c36dfdcae1849b55e22eb23))
* **mux-player:** version bump to Media Chrome v3.1.0. ([#886](https://github.com/muxinc/elements/issues/886)) ([1f9a6ec](https://github.com/muxinc/elements/commit/1f9a6ece2ba07f3042330336f9a0719eab274642))





## [2.3.3](https://github.com/muxinc/elements/compare/@mux/mux-player@2.3.2...@mux/mux-player@2.3.3) (2024-02-16)

**Note:** Version bump only for package @mux/mux-player





## [2.3.2](https://github.com/muxinc/elements/compare/@mux/mux-player@2.3.1...@mux/mux-player@2.3.2) (2024-01-19)


### Bug Fixes

* **mux-player:** upgrade media chrome to fix subtitles selection edge cases ([#862](https://github.com/muxinc/elements/issues/862)) ([c6e8758](https://github.com/muxinc/elements/commit/c6e8758bbe7431fc55d334ccf96b07f62f7443d6))





## [2.3.1](https://github.com/muxinc/elements/compare/@mux/mux-player@2.3.0...@mux/mux-player@2.3.1) (2024-01-02)


### Bug Fixes

* media-tracks types not polluting global HTMLMediaElement ([#855](https://github.com/muxinc/elements/issues/855)) ([ce7235b](https://github.com/muxinc/elements/commit/ce7235bfab8b3e54d4731aaf944a121163286e6a))
* target-live-window unneeded sprout ([#852](https://github.com/muxinc/elements/issues/852)) ([5d45a8f](https://github.com/muxinc/elements/commit/5d45a8f1fde45387e58e8ae985514dd303208107)), closes [#748](https://github.com/muxinc/elements/issues/748)
* upgrade external deps, allow patches uniform ([#850](https://github.com/muxinc/elements/issues/850)) ([f72acf4](https://github.com/muxinc/elements/commit/f72acf49199497cb45c186bd4b2bc2a67e5431c0))





# [2.3.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.2.0...@mux/mux-player@2.3.0) (2023-12-07)


### Bug Fixes

* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* audio controls CSS ([#843](https://github.com/muxinc/elements/issues/843)) ([427adbd](https://github.com/muxinc/elements/commit/427adbde79ce2230050fa6b57a0669d5fd06b585))
* **mux-player:** Add additional parts for export. Use constants. Upda… ([#813](https://github.com/muxinc/elements/issues/813)) ([4ad76a3](https://github.com/muxinc/elements/commit/4ad76a35d32abf02b83cc8feed52db4117c77791))
* **mux-player:** add controller CSS part  ([#828](https://github.com/muxinc/elements/issues/828)) ([116d6f0](https://github.com/muxinc/elements/commit/116d6f0361c64f0efddae8b35a0af7176ce26e9a)), closes [#728](https://github.com/muxinc/elements/issues/728)
* **mux-player:** attr mismatch to make sure controls and loading indi… ([#815](https://github.com/muxinc/elements/issues/815)) ([d2b1466](https://github.com/muxinc/elements/commit/d2b14664989d3b8265d52be158b567864e2cd753))
* **mux-player:** media chrome attr name mismatches ([#816](https://github.com/muxinc/elements/issues/816)) ([c771934](https://github.com/muxinc/elements/commit/c771934e9e22011f8999aa5c848b1f399fd1dc65))
* **mux-player:** upgrade media chrome to get fix for android tap issue… ([#824](https://github.com/muxinc/elements/issues/824)) ([e46fed4](https://github.com/muxinc/elements/commit/e46fed4feb011303b7111ccc9737a2e769efc485))
* remove unneeded captions movement code  ([#842](https://github.com/muxinc/elements/issues/842)) ([fb163f6](https://github.com/muxinc/elements/commit/fb163f6be1c8a0113542f317c14da1112be0fb69)), closes [#830](https://github.com/muxinc/elements/issues/830)
* setting custom playbackrates ([#819](https://github.com/muxinc/elements/issues/819)) ([799d7a5](https://github.com/muxinc/elements/commit/799d7a5d780e004e9868f437a720e69ec9344883)), closes [#812](https://github.com/muxinc/elements/issues/812)
* upgrade media-chrome + turbo ([#838](https://github.com/muxinc/elements/issues/838)) ([a7c4948](https://github.com/muxinc/elements/commit/a7c49488ccbc3c1a9d087775d8ee83298acd1e91))
* upgrade media-chrome v2 & castable-video v1 ([#840](https://github.com/muxinc/elements/issues/840)) ([7752977](https://github.com/muxinc/elements/commit/775297721575680994ca1b96576080ac1f14c47d))


### Features

* **mux-player, mux-player-react:** Add extra-source-params/extraSourceParams attr/prop for advanced usage. ([a5ad6ed](https://github.com/muxinc/elements/commit/a5ad6ed3da0aafb52f983c91881126d74c884157))
* **mux-player, mux-player-react:** default duration ([#844](https://github.com/muxinc/elements/issues/844)) ([8d52572](https://github.com/muxinc/elements/commit/8d52572330089076a6d05ff33fa0f596e18799ff))
* **mux-player:** allow forcibly showing buttons that we usually hide at small sizes ([#827](https://github.com/muxinc/elements/issues/827)) ([f7200e7](https://github.com/muxinc/elements/commit/f7200e71ab691363abc4729691e3c40fee2d7a61))





# [2.2.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.1.0...@mux/mux-player@2.2.0) (2023-10-31)


### Bug Fixes

* **mux-player:** Use solid accent color in rate menu ([#804](https://github.com/muxinc/elements/issues/804)) ([7323155](https://github.com/muxinc/elements/commit/7323155837cb611db375d6a907ad05b721f52b91))
* upgrade MC + style tweaks ([#805](https://github.com/muxinc/elements/issues/805)) ([7a1cf78](https://github.com/muxinc/elements/commit/7a1cf783fd1325b782440db05a6bb67e2d89a58f))
* upgrade media-chrome 1.4.5 + rate row style ([#803](https://github.com/muxinc/elements/issues/803)) ([0b90bd0](https://github.com/muxinc/elements/commit/0b90bd0764b7b7728d8d754be12aed0c76662b97))


### Features

* **mux-player:** use playback rate selectmenu for new player theme. ([#802](https://github.com/muxinc/elements/issues/802)) ([662cd52](https://github.com/muxinc/elements/commit/662cd523295551855372bfdc4000d24a92713e2f))





# [2.1.0](https://github.com/muxinc/elements/compare/@mux/mux-player@2.0.1...@mux/mux-player@2.1.0) (2023-10-24)


### Bug Fixes

* Don't allow clicks on bg gradients ([#797](https://github.com/muxinc/elements/issues/797)) ([3135e44](https://github.com/muxinc/elements/commit/3135e441bb88a166b48070c4f41c33a3878870d1))


### Features

* Add volume slider to live controls ([#800](https://github.com/muxinc/elements/issues/800)) ([5e0c337](https://github.com/muxinc/elements/commit/5e0c33715af190d2c39f8ffc9b2d7ff3d413f602))
* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))





## [2.0.1](https://github.com/muxinc/elements/compare/@mux/mux-player@2.0.0...@mux/mux-player@2.0.1) (2023-10-03)

**Note:** Version bump only for package @mux/mux-player





# [2.0.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.15.0...@mux/mux-player@2.0.0) (2023-10-03)


### Bug Fixes

* increase poster test timeout ([#786](https://github.com/muxinc/elements/issues/786)) ([08e3e3d](https://github.com/muxinc/elements/commit/08e3e3d159246f16c5e54e86eb06fc5dd2d05dc2))
* increase some test timeouts ([#785](https://github.com/muxinc/elements/issues/785)) ([13ef21f](https://github.com/muxinc/elements/commit/13ef21f5875ff9ae1b93a6adeb4d18c4704f05c9))


* feat(mux-player)!: major version bump (#788) ([78de381](https://github.com/muxinc/elements/commit/78de3813b2a912ad3243fa7e6ff47e79847d0242)), closes [#788](https://github.com/muxinc/elements/issues/788)


### BREAKING CHANGES

* Mux Player defaults to new theme





# [1.15.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.14.2...@mux/mux-player@1.15.0) (2023-10-03)


### Bug Fixes

* Extra spacing underneath player ([#779](https://github.com/muxinc/elements/issues/779)) ([06f6480](https://github.com/muxinc/elements/commit/06f64802ef714e451dc8d3b8ac0781cce8e9f1fe))
* improve 2023 icons ([#774](https://github.com/muxinc/elements/issues/774)) ([bfbe4f0](https://github.com/muxinc/elements/commit/bfbe4f006888281e7506dfaf1f828ec02c34ed94))
* **mux-player:** placeholder not applying properly to media-poster-im… ([#769](https://github.com/muxinc/elements/issues/769)) ([2aed830](https://github.com/muxinc/elements/commit/2aed830d34dca5e0a774c2dd0f6e81688c73f1f0))


### Features

* export control bars part for styling ([#773](https://github.com/muxinc/elements/issues/773)) ([f444c58](https://github.com/muxinc/elements/commit/f444c58542af8ea0a39fb9d2e1e190c5a45bc7c4)), closes [#767](https://github.com/muxinc/elements/issues/767)
* **mux-player:** Extra template parts in 2023 theme ([#768](https://github.com/muxinc/elements/issues/768)) ([bc2cd48](https://github.com/muxinc/elements/commit/bc2cd48337861ba487c8bdcc01ff1dd3c401519f))
* **mux-player:** Theme 2023 icons ([#766](https://github.com/muxinc/elements/issues/766)) ([64259ca](https://github.com/muxinc/elements/commit/64259ca2f48327ddf6bdbff94ec65ce0cc629711))
* Rename new default theme ([#771](https://github.com/muxinc/elements/issues/771)) ([b91c509](https://github.com/muxinc/elements/commit/b91c5092e005805a801982e15719984965f745e1))
* Upgrade guide for new theme ([#775](https://github.com/muxinc/elements/issues/775)) ([4f1b684](https://github.com/muxinc/elements/commit/4f1b684ec9d571ed46c66694f29d2ecdea4ef6ee))





## [1.14.2](https://github.com/muxinc/elements/compare/@mux/mux-player@1.14.1...@mux/mux-player@1.14.2) (2023-09-05)

**Note:** Version bump only for package @mux/mux-player





## [1.14.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.14.0...@mux/mux-player@1.14.1) (2023-08-30)


### Bug Fixes

* **mux-player:** Make sure to use the title as the default value for … ([#758](https://github.com/muxinc/elements/issues/758)) ([57c2fdc](https://github.com/muxinc/elements/commit/57c2fdc77624a7e2c1fd0ce17e069173b909fc74))





# [1.14.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.13.0...@mux/mux-player@1.14.0) (2023-08-23)


### Features

* **mux-player:** 2023 theme style updates and fixes ([#753](https://github.com/muxinc/elements/issues/753)) ([c3dc2ef](https://github.com/muxinc/elements/commit/c3dc2ef01ba4eb0d1506d175ca2188b1d749ac7f))





# [1.13.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.12.1...@mux/mux-player@1.13.0) (2023-08-23)


### Bug Fixes

* unavailable state for audio track button ([#756](https://github.com/muxinc/elements/issues/756)) ([13f4ef7](https://github.com/muxinc/elements/commit/13f4ef7c77a6d18b330759e06acd975d77431f1b))


### Features

* 2023 Theme rendition selector ([#751](https://github.com/muxinc/elements/issues/751)) ([9584c3d](https://github.com/muxinc/elements/commit/9584c3d102d1916952c9f4fc6720a486c42a0b3e))
* add audio track select menu ([#750](https://github.com/muxinc/elements/issues/750)) ([04123a8](https://github.com/muxinc/elements/commit/04123a8fbbbfba9059f3a504ad808f858dc07c50))
* add poster slot for progressive enhancement ([#747](https://github.com/muxinc/elements/issues/747)) ([e90e096](https://github.com/muxinc/elements/commit/e90e096bc45776776e6fc4a8846aede2ad8ecb7c)), closes [#590](https://github.com/muxinc/elements/issues/590)





## [1.12.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.12.0...@mux/mux-player@1.12.1) (2023-08-15)


### Bug Fixes

* **mux-player:** version bump for media-chrome (fixes first frame ren… ([#740](https://github.com/muxinc/elements/issues/740)) ([8a9e9ab](https://github.com/muxinc/elements/commit/8a9e9ab94d4515a22a7d294895da7b6f54d53e39))
* Reverting packages type (defaults to cjs) for accuracy per node … ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))





# [1.12.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.11.4...@mux/mux-player@1.12.0) (2023-08-14)


### Bug Fixes

* **mux-player:** Adding controller exported part. Marking as fix bc n… ([#732](https://github.com/muxinc/elements/issues/732)) ([0599c71](https://github.com/muxinc/elements/commit/0599c717b56ca3b4cc20e4d977e96a55f76575d3)), closes [#728](https://github.com/muxinc/elements/issues/728) [#727](https://github.com/muxinc/elements/issues/727)
* **mux-player:** exporting underlying poster img part for advanced styling ([#733](https://github.com/muxinc/elements/issues/733)) ([317ecac](https://github.com/muxinc/elements/commit/317ecac4759903ff2f6c642f98a29e268180aab5)), closes [#717](https://github.com/muxinc/elements/issues/717)
* **mux-player:** Only match theme by id if element is a template. ([#731](https://github.com/muxinc/elements/issues/731)) ([bb4886c](https://github.com/muxinc/elements/commit/bb4886cca7476800c959922f9c0703f72f189d87))


### Features

* add quality selector ([#734](https://github.com/muxinc/elements/issues/734)) ([5d1da39](https://github.com/muxinc/elements/commit/5d1da396a05a08d5c5322e364bc98a693605a497)), closes [#572](https://github.com/muxinc/elements/issues/572)
* implement renditions API ([#708](https://github.com/muxinc/elements/issues/708)) ([f3e8db2](https://github.com/muxinc/elements/commit/f3e8db21fd03c5d5570a628853f49c51d428d26e))
* New default theme ([#709](https://github.com/muxinc/elements/issues/709)) ([d69d84e](https://github.com/muxinc/elements/commit/d69d84ea6708c8548d6e5780dfa0a5ad8ed314f8))





## [1.11.4](https://github.com/muxinc/elements/compare/@mux/mux-player@1.11.3...@mux/mux-player@1.11.4) (2023-07-07)


### Bug Fixes

* **playback-core, mux-player:** hls.js & media-chrome version bumps (fixes resize observer RTE and hls.js edge case bugs) ([b3a3657](https://github.com/muxinc/elements/commit/b3a36578320b58941509d0feccfaa1272a3dc033))





## [1.11.3](https://github.com/muxinc/elements/compare/@mux/mux-player@1.11.2...@mux/mux-player@1.11.3) (2023-06-29)


### Bug Fixes

* **mux-player:** media-chrome version bump (occasional ResizeObserver… ([#711](https://github.com/muxinc/elements/issues/711)) ([b33408a](https://github.com/muxinc/elements/commit/b33408ac51c112e215f34aa10f7dd72ba8c2e6b6))





## [1.11.2](https://github.com/muxinc/elements/compare/@mux/mux-player@1.11.1...@mux/mux-player@1.11.2) (2023-06-12)


### Bug Fixes

* **playback-core:** bump media-chrome & hls.js version to latest. ([#706](https://github.com/muxinc/elements/issues/706)) ([1683663](https://github.com/muxinc/elements/commit/1683663f05b2e3c64012056391f0df457e627371))





## [1.11.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.11.0...@mux/mux-player@1.11.1) (2023-06-06)

**Note:** Version bump only for package @mux/mux-player





# [1.11.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.10.1...@mux/mux-player@1.11.0) (2023-05-08)


### Features

* add a no-volume-pref attribute to turn of storing volume in localStorage ([#686](https://github.com/muxinc/elements/issues/686)) ([e9c2150](https://github.com/muxinc/elements/commit/e9c2150ba36615107f05d99baaa8a4432d71138d))





## [1.10.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.10.0...@mux/mux-player@1.10.1) (2023-04-24)


### Bug Fixes

* force theme to be ltr direction ([#670](https://github.com/muxinc/elements/issues/670)) ([924fb1f](https://github.com/muxinc/elements/commit/924fb1f76f3563600e121a00ff83bb8deb766d34))
* use webkit pseudo element for captions movement, where available ([#674](https://github.com/muxinc/elements/issues/674)) ([1f236d4](https://github.com/muxinc/elements/commit/1f236d4b42f83fe40884732305259ff5a1fda679)), closes [#660](https://github.com/muxinc/elements/issues/660)





# [1.10.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.9.0...@mux/mux-player@1.10.0) (2023-04-14)


### Bug Fixes

* delegate events, lazy controller for cue pos ([#633](https://github.com/muxinc/elements/issues/633)) ([4e45cc0](https://github.com/muxinc/elements/commit/4e45cc07b03d29ed03fe09b94e28591f8ff9b886))


### Features

* add currentPdt getter and getStartDate() method ([#661](https://github.com/muxinc/elements/issues/661)) ([530170b](https://github.com/muxinc/elements/commit/530170b789d7734d2b70fde7d59abb1ebf8a582c))
* inferred stream type ([#592](https://github.com/muxinc/elements/issues/592)) ([db4cc9f](https://github.com/muxinc/elements/commit/db4cc9f60660f2b860ecce0a5a5ef2a3a09cc40b))





# [1.9.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.8.0...@mux/mux-player@1.9.0) (2023-03-31)


### Bug Fixes

* add micro theme export and switcher example ([#594](https://github.com/muxinc/elements/issues/594)) ([0399c5c](https://github.com/muxinc/elements/commit/0399c5ce579ddcc32b62980da14abcaf06fc4166))
* add themes folder to NPM ([#634](https://github.com/muxinc/elements/issues/634)) ([8f6bd4d](https://github.com/muxinc/elements/commit/8f6bd4d0f9933001d229003e178821bfd41595d0))
* capLevel to player size & on fps drop ([#628](https://github.com/muxinc/elements/issues/628)) ([8c0e776](https://github.com/muxinc/elements/commit/8c0e77655a2c13ae263dabfa81849ebf58aa620b))
* live view due targetLiveWindow change ([#627](https://github.com/muxinc/elements/issues/627)) ([06812d9](https://github.com/muxinc/elements/commit/06812d94b096e54fa8444aed337839e8e9a70ebe))
* move captions listbox to the front ([#635](https://github.com/muxinc/elements/issues/635)) ([2375361](https://github.com/muxinc/elements/commit/23753613d0396fe7c3f39bb4cabec72746fbb159))
* **playback-core, mux-player:** rte and hlsjs version bump ([#632](https://github.com/muxinc/elements/issues/632)) ([ebaa2b6](https://github.com/muxinc/elements/commit/ebaa2b6bdf7c264bf64320cb529954c7143cfca8))
* rename Micro to Microvideo ([#617](https://github.com/muxinc/elements/issues/617)) ([5317e84](https://github.com/muxinc/elements/commit/5317e8401d8cecb30dfbf697b97dd7c35bd9313c))
* switch to media-captions-selectmenu ([#595](https://github.com/muxinc/elements/issues/595)) ([40c8e3e](https://github.com/muxinc/elements/commit/40c8e3edd82c28ca8975e5d245099702fed32bbc))
* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))
* upgrade MC & integrate media-time-display ([#631](https://github.com/muxinc/elements/issues/631)) ([78dc0b8](https://github.com/muxinc/elements/commit/78dc0b897b1c0b892e614493c9c084ebe145fe49))
* use Media Chrome display CSS vars ([#613](https://github.com/muxinc/elements/issues/613)) ([4947565](https://github.com/muxinc/elements/commit/494756598cdc6f6517ce2f3a832557bdc2686059))
* use Mux Data player_error_context to get better error grouping in the Mux Data dashboard ([599c052](https://github.com/muxinc/elements/commit/599c052f984cd0d76f061c019872851339775b6a))


### Features

* add way to set and render MC themes ([#561](https://github.com/muxinc/elements/issues/561)) ([0ac98e9](https://github.com/muxinc/elements/commit/0ac98e9a6fd60c5ea990be3c7d5d8ae7941e447c))
* **mux-player-react:** mux player react cuepoint handlers ([#605](https://github.com/muxinc/elements/issues/605)) ([df4e6e0](https://github.com/muxinc/elements/commit/df4e6e036f7cd9b5d9dfa52e1adc56bb0a850373))





# [1.8.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.7.2...@mux/mux-player@1.8.0) (2023-02-15)


### Features

* add attribute max-resolution on mux-player and mux-video ([#581](https://github.com/muxinc/elements/issues/581)) ([1936c8e](https://github.com/muxinc/elements/commit/1936c8ecb47805ee75fd04ffee514b846043efc1))





## [1.7.2](https://github.com/muxinc/elements/compare/@mux/mux-player@1.7.1...@mux/mux-player@1.7.2) (2023-02-14)


### Bug Fixes

* **playback-core:** Typescript + min acrobatics to make svelte and others happy ([fdf34bb](https://github.com/muxinc/elements/commit/fdf34bb8fd409f0c2b5945802251ed2e6ffafd7e))





## [1.7.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.7.0...@mux/mux-player@1.7.1) (2023-02-02)

**Note:** Version bump only for package @mux/mux-player





# [1.7.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.6.0...@mux/mux-player@1.7.0) (2023-02-01)


### Bug Fixes

* bring back play button to the control bar for small player size ([#556](https://github.com/muxinc/elements/issues/556)) ([38ef225](https://github.com/muxinc/elements/commit/38ef225543400a146159a24ccf13a4a22ac03bae)), closes [#554](https://github.com/muxinc/elements/issues/554)
* merge conflict fallout ([4e4932c](https://github.com/muxinc/elements/commit/4e4932c8d18708d53dedc1907d7fe32255d4a556))
* **mux-player:** Migrate to use new Media Chrome media-live-button. ([5613ba4](https://github.com/muxinc/elements/commit/5613ba48fbd9a497f127764404caf801bf7f7d74)), closes [#2](https://github.com/muxinc/elements/issues/2)
* tests, improve attribute empty behavior ([5f53a5e](https://github.com/muxinc/elements/commit/5f53a5e12c2accc0e8216c1404889b11818c869e))
* upgrade Media Chrome v0.18.1 ([fa7353b](https://github.com/muxinc/elements/commit/fa7353b761884ebb1a7cbe74dcd85165d939c119))
* use new MC template syntax ([b656ccd](https://github.com/muxinc/elements/commit/b656ccd09d05fcee169f9956fd2571a56def47b5))


### Features

* introduce a captions menu button ([#549](https://github.com/muxinc/elements/issues/549)) ([9cb8454](https://github.com/muxinc/elements/commit/9cb845411230ea669c74c5ffe19f9fca4c60dce3))
* **mux-player, mux-video, playback-core:** Add API for CuePoints metadata. ([1f0b40a](https://github.com/muxinc/elements/commit/1f0b40a6d7f09c0e08a42353e241a26857edaad6))





# [1.6.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.5.1...@mux/mux-player@1.6.0) (2023-01-20)


### Bug Fixes

* use webp format instead of jpg, less bandwidth ([#525](https://github.com/muxinc/elements/issues/525)) ([9441de4](https://github.com/muxinc/elements/commit/9441de415b165a8f68c0db88eb25e2de827380f4))


### Features

* **mux-player:** add storyboard-src attribute and corresponding prop ([#522](https://github.com/muxinc/elements/issues/522)) ([e9c3f0a](https://github.com/muxinc/elements/commit/e9c3f0afd3eb2521248996c37de1716b4ce724c4))





## [1.5.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.5.0...@mux/mux-player@1.5.1) (2022-12-15)


### Bug Fixes

* allow setting theme template via property ([6ec0bb0](https://github.com/muxinc/elements/commit/6ec0bb0b4f6964490dc8d339e174462e98f80116))





# [1.5.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.4.0...@mux/mux-player@1.5.0) (2022-12-13)


### Bug Fixes

* duplicate render by using value cache key ([031a89a](https://github.com/muxinc/elements/commit/031a89a0d8a46d715b9ad778a732b720c7694ab5)), closes [#517](https://github.com/muxinc/elements/issues/517)
* upgrade MC v0.16.1 ([#513](https://github.com/muxinc/elements/issues/513)) ([72da7a1](https://github.com/muxinc/elements/commit/72da7a1e77b6c8ed095785013c644888dcb2a8f8))
* upgrade Media Chrome v0.16.2 ([5db98fb](https://github.com/muxinc/elements/commit/5db98fbc4d0e390858934c7f7cdf7da4442e2d02))


### Features

* allow video, audio and player elements to get any metadata-* attrs set ([#501](https://github.com/muxinc/elements/issues/501)) ([8ee139d](https://github.com/muxinc/elements/commit/8ee139d2bbd08e1e3c08d047f870c1dcf01dac7e))
* implement Media Chrome HTML based theme  ([#498](https://github.com/muxinc/elements/issues/498)) ([d83501a](https://github.com/muxinc/elements/commit/d83501ac3ddb4661f34f5e7526e93af525035190))
* Remove experimentalCmcd and add none to preferCmcd. Update secret docs. ([2656631](https://github.com/muxinc/elements/commit/2656631968f2b7e97a07d435818ee43c16627002))





# [1.4.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.3.0...@mux/mux-player@1.4.0) (2022-11-21)


### Features

* first iteration on player design update ([#486](https://github.com/muxinc/elements/issues/486)) ([a2befb5](https://github.com/muxinc/elements/commit/a2befb53200df08c40a79d7ed84e267cd1279648))
* **mux-player:** Add prefer cmcd attr and prop. ([308e9a7](https://github.com/muxinc/elements/commit/308e9a7c879594edbe2d4f4ffe462c7efb53299f))





# [1.3.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.2.0...@mux/mux-player@1.3.0) (2022-10-25)


### Bug Fixes

* check JWT before setting poster and storyboard urls ([3c3d5c5](https://github.com/muxinc/elements/commit/3c3d5c5c2d16a75b3ab7ce82447d6973578ed3e9))
* don't register prop --controls-backdrop-color ([#480](https://github.com/muxinc/elements/issues/480)) ([b820a14](https://github.com/muxinc/elements/commit/b820a14656444b49ed6c0a59fede7327da76936c))
* update to media-chrome 0.15.0 ([#483](https://github.com/muxinc/elements/issues/483)) ([71f51ab](https://github.com/muxinc/elements/commit/71f51ab501085a65e5a01eb1edca2f8bdbddaf6a))
* update to media-chrome 0.15.1 ([#484](https://github.com/muxinc/elements/issues/484)) ([fdc5c7a](https://github.com/muxinc/elements/commit/fdc5c7ada514fd5c417b1adbb6b4d538aa2bc580))


### Features

* add storyboard getter on player ([26c3a7c](https://github.com/muxinc/elements/commit/26c3a7c3fd85c43537e7a2b6578c51a631c15b13))
* conditionally use title for title metadata ([#475](https://github.com/muxinc/elements/issues/475)) ([63166a4](https://github.com/muxinc/elements/commit/63166a4be93e3eceb211f2c1973f324416af3985))
* **mux-player:** Add disable cookies attr and prop. ([d8cbe69](https://github.com/muxinc/elements/commit/d8cbe69645f9215d63a54b6cfbc4abb8bf6c45f0))
* **mux-player:** Expose and propagate experimental cmcd prop and attr. ([dbcf85a](https://github.com/muxinc/elements/commit/dbcf85a5e687ad36c410c36042a224361942ed9b))





# [1.2.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.1.3...@mux/mux-player@1.2.0) (2022-10-19)


### Bug Fixes

* playbackRate not working on mux-player-react ([#470](https://github.com/muxinc/elements/issues/470)) ([e2c64b6](https://github.com/muxinc/elements/commit/e2c64b60bb53a66101004ed198f9bb1a08630eb2))
* should have focus outline on dialog's close button ([#472](https://github.com/muxinc/elements/issues/472)) ([da33141](https://github.com/muxinc/elements/commit/da33141ba4a518a1843fc75c8e69ed24de5d00f1))


### Features

* **mux-player:** Add type-compliant seekable prop to video-api. ([587266a](https://github.com/muxinc/elements/commit/587266a2a517875a509fa8540f606ee81c2d6c0a))





## [1.1.3](https://github.com/muxinc/elements/compare/@mux/mux-player@1.1.2...@mux/mux-player@1.1.3) (2022-10-12)

**Note:** Version bump only for package @mux/mux-player

## [1.1.2](https://github.com/muxinc/elements/compare/@mux/mux-player@1.1.1...@mux/mux-player@1.1.2) (2022-10-10)

### Bug Fixes

- update to media-chrome 0.14.0 ([#457](https://github.com/muxinc/elements/issues/457)) ([0fd7078](https://github.com/muxinc/elements/commit/0fd70788aed4ddabfb821abc3bd0e101bd27a1b9))

## [1.1.1](https://github.com/muxinc/elements/compare/@mux/mux-player@1.1.0...@mux/mux-player@1.1.1) (2022-10-07)

**Note:** Version bump only for package @mux/mux-player

# [1.1.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.0.0...@mux/mux-player@1.1.0) (2022-10-07)

### Bug Fixes

- turn off backdrop color when controls are disabled ([#451](https://github.com/muxinc/elements/issues/451)) ([f0d97b3](https://github.com/muxinc/elements/commit/f0d97b3db1e6ec2a4e90311d9416b27d87d60769))

### Features

- add ability to unset poster ([#447](https://github.com/muxinc/elements/issues/447)) ([d61e295](https://github.com/muxinc/elements/commit/d61e295952d59ba42ad077c4a2b7fb3bb0d7079c))

# [1.0.0](https://github.com/muxinc/elements/compare/@mux/mux-player@1.0.0-beta.0...@mux/mux-player@1.0.0) (2022-10-05)

### Bug Fixes

- chrome caption positioning workaround with a timer ([#438](https://github.com/muxinc/elements/issues/438)) ([5f3d921](https://github.com/muxinc/elements/commit/5f3d9210df3d109da752664878e7be0c15e50cfc))
- disable all controls when the dialog is open ([09579cb](https://github.com/muxinc/elements/commit/09579cb32becab5b225cdb4e7e4ab29da460d277))
- hide fullscreen button when fullscreen is unavailable ([#410](https://github.com/muxinc/elements/issues/410)) ([e1446a7](https://github.com/muxinc/elements/commit/e1446a77594a0872c776359d730da0103d21a209))
- ignore Safari for captions movement. ([#404](https://github.com/muxinc/elements/issues/404)) ([bbf1e00](https://github.com/muxinc/elements/commit/bbf1e0073773113742f9853be803834c590d78c3))
- mux-player audio height bugs ([75139a1](https://github.com/muxinc/elements/commit/75139a145ffe70547c7a664ad4191ce43cd41bbe))
- **mux-player:** Add missing setter for defaultHiddenCaptions prop. ([4d047cd](https://github.com/muxinc/elements/commit/4d047cd822137d76725803913ccd1e77aa19f89a))
- **mux-player:** Clean up crossOrigin and playsInline usage while respecting defaults/availability. ([457672f](https://github.com/muxinc/elements/commit/457672f3fd317043093b7bb6a13da2568013e597))
- **mux-player:** Start making VideoApiElement conform to HTMLVideoElement interface. ([bbcf8e3](https://github.com/muxinc/elements/commit/bbcf8e3db083873c1d677e02bf7efe6ec8c14353))
- playback-id or src nil value ([#430](https://github.com/muxinc/elements/issues/430)) ([8133d8a](https://github.com/muxinc/elements/commit/8133d8ad26fd769c6882260b62828743794e4a60))
- preload property in mux-player ([#435](https://github.com/muxinc/elements/issues/435)) ([1920ab8](https://github.com/muxinc/elements/commit/1920ab8bbdf878f31d409e9fad222f9d3ea91e11))
- src unloading ([#400](https://github.com/muxinc/elements/issues/400)) ([ef4d97e](https://github.com/muxinc/elements/commit/ef4d97e2ee0273e85af7c2c2911f685deaf62d9e))
- swap title property setting ([1cd50e9](https://github.com/muxinc/elements/commit/1cd50e9061b304456d8b878d28e901293df4f351))
- update to media-chrome 0.11.0 ([#415](https://github.com/muxinc/elements/issues/415)) ([54d3dbc](https://github.com/muxinc/elements/commit/54d3dbcb7e90c1b60621186251df3d6da594bc25))
- update to media-chrome 0.11.1 ([#417](https://github.com/muxinc/elements/issues/417)) ([1271fb4](https://github.com/muxinc/elements/commit/1271fb4149a4749adab261dc84533a05d12a7348))
- use CSS.registerProperty on vars to declare them as colors ([#441](https://github.com/muxinc/elements/issues/441)) ([1d0da91](https://github.com/muxinc/elements/commit/1d0da916d0906a296118b1b8fdc9c0dc0e0081e8))

### Features

- add `prefer-playback` attribute ([#402](https://github.com/muxinc/elements/issues/402)) ([8da36d6](https://github.com/muxinc/elements/commit/8da36d6b597ddbc4ae006873fee13a971b7ec2f3))
- default width: 100% in shadowDOM lets see if this has any bad side-effects ([#413](https://github.com/muxinc/elements/issues/413)) ([2062709](https://github.com/muxinc/elements/commit/2062709684459f34e6159fb0ac23b7fd7b513c53))
- disable some controls when there isn't a playback-id ([#416](https://github.com/muxinc/elements/issues/416)) ([630df7c](https://github.com/muxinc/elements/commit/630df7c104c6e0a994b3f1e93e3c150063589c74))
- remove deprecated .hls and .video props ([#408](https://github.com/muxinc/elements/issues/408)) ([2bd4861](https://github.com/muxinc/elements/commit/2bd48618d1b59d054e470ce9011c5c2f4904f8b6))

### BREAKING CHANGES

- remove deprecated .hls and .video props.

# [1.0.0-beta.0](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.27...@mux/mux-player@1.0.0-beta.0) (2022-09-16)

### Bug Fixes

- Add exportparts to mux-player so we can style nested video ([#392](https://github.com/muxinc/elements/issues/392)) ([db107c1](https://github.com/muxinc/elements/commit/db107c136b926af871dfb21d009f426fdd6c0736))
- audio and nohotkeys props not being removed when set to false ([#383](https://github.com/muxinc/elements/issues/383)) ([671b9a9](https://github.com/muxinc/elements/commit/671b9a9b80b6876c7d1c9c8589a62eea033755a5))
- don't throw an error when removing tokens or playback id ([71db6b8](https://github.com/muxinc/elements/commit/71db6b8816036eba8f0601e7a76c282e1bba019b))
- template parts issue ([#371](https://github.com/muxinc/elements/issues/371)) ([6c5a124](https://github.com/muxinc/elements/commit/6c5a1243bce50fc8ee9ab841cae3fa35243ee686))
- types for testing ([8fe0851](https://github.com/muxinc/elements/commit/8fe0851c13261f558c5c551bd542ccfdcdd81fac))
- update PlaybackEngine types ([1873781](https://github.com/muxinc/elements/commit/187378165a83e70d62bd5ba954b4986d0ae50738))
- update to media-chrome 0.10.2 ([#377](https://github.com/muxinc/elements/issues/377)) ([15d148e](https://github.com/muxinc/elements/commit/15d148e82431352415a4ae701d30ce271c3521d7))
- update to media-chrome 0.10.4 ([#391](https://github.com/muxinc/elements/issues/391)) ([885b1d4](https://github.com/muxinc/elements/commit/885b1d431b46ca05f8e9430cbf546d0e531afeed))
- vertical alignment of UI controls ([#394](https://github.com/muxinc/elements/issues/394)) ([add2d56](https://github.com/muxinc/elements/commit/add2d569f93bcddf48b44d6460c1cfcad58a717f))

### Features

- add --controls-backdrop-color CSS var to allow changing the backdrop color ([#353](https://github.com/muxinc/elements/issues/353)) ([1ba84a2](https://github.com/muxinc/elements/commit/1ba84a2b7d209c1a3b45bd934a8d67044712a1a9))
- export gesture-layer as a part ([89e90ee](https://github.com/muxinc/elements/commit/89e90ee3268da23c8071fc9cd2f21efc534f1849)), closes [#379](https://github.com/muxinc/elements/issues/379)

# [0.1.0-beta.27](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.26...@mux/mux-player@0.1.0-beta.27) (2022-08-31)

### Bug Fixes

- add rest of block controlslist attr values ([e19a88f](https://github.com/muxinc/elements/commit/e19a88f877d3344e60b0f1e4a3bf225d5f767ac5))
- add top and bottom parts to elements ([66072f6](https://github.com/muxinc/elements/commit/66072f6c4695af03f24e21b4eaa982bdd8907855))
- AttributeTokenList attribute bug on removal ([48bc25e](https://github.com/muxinc/elements/commit/48bc25ec237ed9f11cf39f51643cb502431cab21))
- **mux-player:** Add font sizes to title for different permutations. ([33374fa](https://github.com/muxinc/elements/commit/33374fa15213656df28116ca9768f2ab4501cb7c))
- **mux-player:** Extra type safety, because tests are confused. ([391c61e](https://github.com/muxinc/elements/commit/391c61e08fe102d136bf7a23c1068edc3bc4f1e8))
- **mux-player:** Re-add poster to theme template (lost in rebase merge). ([2b7d84c](https://github.com/muxinc/elements/commit/2b7d84c630b5835415dcdd5abe0dd1d3414a9e24))
- **mux-player:** Update live indicator position per new designs. ([3e7faa6](https://github.com/muxinc/elements/commit/3e7faa604d4d4a902ffb4242f0618c261ebb0ee5))
- **mux-player:** Use css vars in theme to hide unavailable controls. ([43b2e82](https://github.com/muxinc/elements/commit/43b2e820cca464086abc9fdfa1f70b2e555c1cbc))
- **mux-player:** Use css vars in theme to hide unavailable controls. ([4be4c1f](https://github.com/muxinc/elements/commit/4be4c1fb29730892e00fecebce7cce30b0ff3895))
- polyfills mutating global ([#355](https://github.com/muxinc/elements/issues/355)) ([71d18a4](https://github.com/muxinc/elements/commit/71d18a427f0171bb214a0df7c1425d3d1bddc47a))

### Features

- add foundation of controlsList logic ([c8e39b3](https://github.com/muxinc/elements/commit/c8e39b3d81e54445c3b9b25bb30ec99ab8b35c18))
- Add hotkeys blocklist and turn off hotkey seeking when any live ([#341](https://github.com/muxinc/elements/issues/341)) ([ce76b1b](https://github.com/muxinc/elements/commit/ce76b1b5955179c929c91de97c06a2839990c509)), closes [#336](https://github.com/muxinc/elements/issues/336)
- **mux-player, mux-player-react:** make hide-duration a controlsList value. ([cb3b2f2](https://github.com/muxinc/elements/commit/cb3b2f27b804878e5a223893cc6fc75dac0a4572))
- **mux-player:** Add delimiter for live + title case. ([8881274](https://github.com/muxinc/elements/commit/8881274dfe4d29fc7304ceacf7de3fb855802956))
- **mux-player:** Add Media Chrome poster to player theme. ([29ed915](https://github.com/muxinc/elements/commit/29ed915a5afcbaf55e05763d1fc422694d27fb22))
- **mux-player:** Add support for configurable playbackrates. Update types to use a generic component type. ([6b7b608](https://github.com/muxinc/elements/commit/6b7b6085ce9132e01b4b86cd92435adbb43efa84))
- **mux-player:** Add support for hiding the duration display. ([bba5063](https://github.com/muxinc/elements/commit/bba506347a9e50d2fd47b38b2e46e1e6684cce51))
- **mux-player:** Add support for showing remaining time by default. ([7e24c97](https://github.com/muxinc/elements/commit/7e24c97e4b1174fcee9ff425e1b601dd7821fb02))
- **mux-player:** Add title UI to Mux Player. ([2fb5ff2](https://github.com/muxinc/elements/commit/2fb5ff2f261037815c1aa874f3848ee9107a6e2b))
- use CSS vars to toggle off elements ([#349](https://github.com/muxinc/elements/issues/349)) ([69128d6](https://github.com/muxinc/elements/commit/69128d62ee1a9e5139d8fab3b5faf56e494dfa8b))

# [0.1.0-beta.26](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.25...@mux/mux-player@0.1.0-beta.26) (2022-08-03)

### Bug Fixes

- update stream-type values in warning log ([d995694](https://github.com/muxinc/elements/commit/d995694966d877097c63e23c7425097f5c50e259))

# [0.1.0-beta.25](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.24...@mux/mux-player@0.1.0-beta.25) (2022-08-02)

### Bug Fixes

- move nohotkeys type to more appropriate place ([49f9c4e](https://github.com/muxinc/elements/commit/49f9c4e4d43f463aa4960a40c94e715d86c4304b))
- **mux-player:** Account for attr vs. 'prop' naming overlap in state propogation. ([5c05af8](https://github.com/muxinc/elements/commit/5c05af8c257806662bc6402baba03b7090cbe699))

### Features

- add CSS parts for controls ([#310](https://github.com/muxinc/elements/issues/310)) ([e28c71e](https://github.com/muxinc/elements/commit/e28c71eed11423951dbac9faf2518ca7cbb2f9e2))
- nohotkeys prop, only use the template ([4cde791](https://github.com/muxinc/elements/commit/4cde791a4664b11501ad48125bd5ed80e3970ff0))
- support media-chrome keyboard shortcuts, use nohotkeys to turn off ([b8ed7f5](https://github.com/muxinc/elements/commit/b8ed7f5180aab60bb896842fb7037bce0069ad2c))
- upgrade to media-chrome 0.9.0 ([f257e0d](https://github.com/muxinc/elements/commit/f257e0d6583de19d0f29859b512e12654f235f3a))

# [0.1.0-beta.24](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.23...@mux/mux-player@0.1.0-beta.24) (2022-07-21)

### Bug Fixes

- add Mux flavor cast icon & fix xs size bug ([#299](https://github.com/muxinc/elements/issues/299)) ([8374ff1](https://github.com/muxinc/elements/commit/8374ff17e294cbe3ad899749ab0361b78ffe0274))
- **mux-player:** Clean up how metadata is set from mux-player to underlying mux-video element. Force upgrades and init when setting metadata. ([d3b2347](https://github.com/muxinc/elements/commit/d3b2347b1d4d7ebbbd882879f69e9d082f12dd80))
- upgrade MC to v0.8.0 and adjust time range styles ([#294](https://github.com/muxinc/elements/issues/294)) ([030fdc6](https://github.com/muxinc/elements/commit/030fdc649517a538fc89c5b3d9edca42e58634ef))
- upgrade MC v0.8.1 ([#298](https://github.com/muxinc/elements/issues/298)) ([fc4a74c](https://github.com/muxinc/elements/commit/fc4a74cfaadf90ee8d4ed89751755d56e77df79e))

### Features

- add ability to choose a Media Theme via attribute ([#269](https://github.com/muxinc/elements/issues/269)) ([77d0386](https://github.com/muxinc/elements/commit/77d0386606d5ecccb7c322ce487c9287d16374fd))
- add defaultMuted, defaultPlaybackRate props ([#252](https://github.com/muxinc/elements/issues/252)) ([1a72165](https://github.com/muxinc/elements/commit/1a7216545cba27b34bc743cf5dd6225d4dcae738))
- **mux-player:** Add textTracks prop alongside add/remove tracks methods. ([c041a72](https://github.com/muxinc/elements/commit/c041a72ce414fc52fcd90e22cc7730ef2e349c31))
- **playback-core, mux-player:** Add support to removeTextTrack. Remove all identified tracks on hls destroy. Add methods to mux-player. ([d090b06](https://github.com/muxinc/elements/commit/d090b060a8b8b3772e74762176af9881299bf894))

# [0.1.0-beta.23](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.22...@mux/mux-player@0.1.0-beta.23) (2022-07-11)

**Note:** Version bump only for package @mux/mux-player

# [0.1.0-beta.22](https://github.com/muxinc/elements/compare/@mux/mux-player@0.1.0-beta.21...@mux/mux-player@0.1.0-beta.22) (2022-07-05)

**Note:** Version bump only for package @mux/mux-player

# 0.1.0-beta.21 (2022-07-05)

### Bug Fixes

- add an error if a token is provided via the playback ID ([d09446d](https://github.com/muxinc/elements/commit/d09446d6da3dc3b332db031336c97ee9349ac9f1))
- add patched template-parts fork ([b200e9f](https://github.com/muxinc/elements/commit/b200e9fcdff9cf5757ec646c8833e742e329afa0))
- attrs not available in constructor ([#240](https://github.com/muxinc/elements/issues/240)) ([add468a](https://github.com/muxinc/elements/commit/add468a0fc93ddfb745dfbc60a08e8a9120621be))
- bump LIVE_SEGMENT_SECS to 5 ([3fdf72d](https://github.com/muxinc/elements/commit/3fdf72d0e1322571aa18e8de74649f0dce5ae7b9))
- bump media-chrome dep for fullscreen bugfix ([7ba458c](https://github.com/muxinc/elements/commit/7ba458ca38d29d2a0c9d4dd8a950bb3cd394c543))
- child custom element mux-video upgraded after mux-player ([#171](https://github.com/muxinc/elements/issues/171)) ([9db8037](https://github.com/muxinc/elements/commit/9db8037f379132307727941f82a736d55e76b4e5))
- clear some state on playbackId change ([#174](https://github.com/muxinc/elements/issues/174)) ([af0738e](https://github.com/muxinc/elements/commit/af0738ea5ae5a75861f75fc2ae3809ada735f3e2))
- clear state on other src related attrs ([17e75e7](https://github.com/muxinc/elements/commit/17e75e78d9b14c913138c2d181d279a58ef98832))
- custom video events handling ([#203](https://github.com/muxinc/elements/issues/203)) ([a909f89](https://github.com/muxinc/elements/commit/a909f89a69ee0d4b67e9d9371ac0f80984016181))
- devLog links to GH base URL ([022f69f](https://github.com/muxinc/elements/commit/022f69fca5624399e67ea9bb5ce1b2b2929979d6))
- don't shift captions on iphones ([a4ae5f1](https://github.com/muxinc/elements/commit/a4ae5f1df0ce030f1ffedd74972873ff0f600483))
- don't shift captions on live, unless secondary color is set ([b474980](https://github.com/muxinc/elements/commit/b4749806ba1ec082fb21642edae9e963e9287643))
- enable cast docs + cast fix ([#253](https://github.com/muxinc/elements/issues/253)) ([421d515](https://github.com/muxinc/elements/commit/421d515cc4700cf9d7ca4f0d09aa600ec4adac7b))
- fullscreen controls layout ([#208](https://github.com/muxinc/elements/issues/208)) ([7bda89d](https://github.com/muxinc/elements/commit/7bda89de57e540e31f92a6b51f7379c94aad983d))
- get polyfill from playback core in mux-player ([ec053f9](https://github.com/muxinc/elements/commit/ec053f90f6b7e3ccf0dd6bdd9034cbe8ead0d593))
- importing castable-video ([44cbb2f](https://github.com/muxinc/elements/commit/44cbb2f26290952ac8d3fe51a1d933352b0b9134))
- keep .hls but have it log a warning saying to use .\_hls ([11e6c10](https://github.com/muxinc/elements/commit/11e6c102a7e238bc8104c52ae9b94e7e3c2c7e19))
- keep mux-player#video for backward compatibility ([ddf3c6e](https://github.com/muxinc/elements/commit/ddf3c6eccb0011a42774133ec0a646d84d463f53))
- lower captions offset for safari ([2f97a45](https://github.com/muxinc/elements/commit/2f97a452397ee276235a55d1deb29c8f0f4d2975))
- make height larger for touch temporarily ([86aaa84](https://github.com/muxinc/elements/commit/86aaa849340ff3a5acdc758f2a3a8fc6065e314e))
- make mux-player size based on video element ([#185](https://github.com/muxinc/elements/issues/185)) ([e4af9a8](https://github.com/muxinc/elements/commit/e4af9a885720f172837eb20ea49dc96bf66a77be))
- make mux-video errors more uniform, fix async ([#183](https://github.com/muxinc/elements/issues/183)) ([0ea4dc3](https://github.com/muxinc/elements/commit/0ea4dc3beafc7d8a6c5078087d14f3f4bac5dda7))
- move hasPlayed into mux-player ([62bcd07](https://github.com/muxinc/elements/commit/62bcd076612a02f4d449ebe1ad0d34c8d8106942))
- **mux-player:** Add cc btn to Vod XS chrome. ([#249](https://github.com/muxinc/elements/issues/249)) ([cf4ebe0](https://github.com/muxinc/elements/commit/cf4ebe0051c22223bcb50b0f8e2fc9a71b015ff0))
- **mux-player:** Add support for event handlers to template parts processing. ([704d2e3](https://github.com/muxinc/elements/commit/704d2e34dacdb68316ead85a2dd494475de72732))
- **mux-player:** adding test for metadata attrs. ([a460566](https://github.com/muxinc/elements/commit/a4605661fabb33a178bb3244b1411c63bf1e1148))
- **mux-player:** don't fire the closed event twice per close on the dialog WC. ([0231b1a](https://github.com/muxinc/elements/commit/0231b1a950fe6eb476ce8bcd3ce4d49cee97e0c9))
- **mux-player:** Ensure that the externally set poster attr is used iff it's set. ([e761073](https://github.com/muxinc/elements/commit/e76107359375de8e7db41cf3762734fa98c9d543))
- **mux-player:** Make sure internal state monitoring setup happens after relevant elements exist. ([43e9566](https://github.com/muxinc/elements/commit/43e956678b7e1b8da3e95144b7d9f6f3d2cb99d5))
- **mux-player:** metadata fields should be set based on 'external'/attr values in mux-player. ([bd474b6](https://github.com/muxinc/elements/commit/bd474b658931afb0ea9f3f1585ba3142d22bd503))
- **mux-player:** temp fix conditional render bug ([73534dc](https://github.com/muxinc/elements/commit/73534dc476d901e916734044834c71130a6de73e))
- **mux-player:** Update theme css to better account for audio vs. non-audio styling. ([81aa045](https://github.com/muxinc/elements/commit/81aa045be8a80e38b9da39800d1ae03cd806412e))
- **mux-player:** upgrade Media Chrome to 0.6.5 ([45415e6](https://github.com/muxinc/elements/commit/45415e63bbf8b6f7b115231022f06d3805da051e))
- **mux-player:** Use onclose event handler in template. Clear errors onclose. ([1eca0ef](https://github.com/muxinc/elements/commit/1eca0efb32b74f82c67be4f9ac0f3bc5dfbf7839))
- playback core should handle seek to live on first play ([805070a](https://github.com/muxinc/elements/commit/805070a7a4cb7158180710ecf85bf54bdb1f9280))
- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- prevent dialog from focus if outside player ([#196](https://github.com/muxinc/elements/issues/196)) ([6c73219](https://github.com/muxinc/elements/commit/6c732198b08f11162f7ee8c4345344b4c050a60f))
- prevent non-fatal error events propagating ([#179](https://github.com/muxinc/elements/issues/179)) ([2103800](https://github.com/muxinc/elements/commit/2103800b1026653703a67432a9bf80cb2ce5c7ac))
- primary color should be also used for the text color on controls ([d44da1b](https://github.com/muxinc/elements/commit/d44da1b7e4a11ddf8274a09acf306747a5af42ce))
- put progress bar above controls ([3f454e0](https://github.com/muxinc/elements/commit/3f454e01f464a74be6bc3c7a14a5920d2ae48623))
- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))
- update media-chrome to 0.5.4 ([21e7884](https://github.com/muxinc/elements/commit/21e78840768bad8eeb24d39fa97fcd8cf6ab266a))
- upgrade Media Chrome v0.6.9 ([#267](https://github.com/muxinc/elements/issues/267)) ([0ec48f7](https://github.com/muxinc/elements/commit/0ec48f79b2cafe2066425a75d95c06fbeb6a236f))

### Features

- add background color to have sufficient contrast on controls ([#78](https://github.com/muxinc/elements/issues/78)) ([4b47ef0](https://github.com/muxinc/elements/commit/4b47ef0dad9f0f14a6c551547c282c3b3de074bd))
- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- add casting logic without cast-button ([#237](https://github.com/muxinc/elements/issues/237)) ([f7f1fe9](https://github.com/muxinc/elements/commit/f7f1fe9713f8c2dcedb2840f463b5478d6fffca0))
- add errorTranslator prop & muxVideo.error property ([#195](https://github.com/muxinc/elements/issues/195)) ([3afc2f0](https://github.com/muxinc/elements/commit/3afc2f0af75a5ad8ef00257a4ebc34882ff8c9ab))
- add media-theme-mux as a replaceable element ([#175](https://github.com/muxinc/elements/issues/175)) ([ee3c186](https://github.com/muxinc/elements/commit/ee3c186433c198a27304577e012b899c1aee44d4))
- default-hidden-captions to turn off showing captions by default ([#98](https://github.com/muxinc/elements/issues/98)) ([9edc3cd](https://github.com/muxinc/elements/commit/9edc3cd008e47234472b14784ea89493736599cb))
- **dvr:** Initial effort for DVR support. ([d58d78f](https://github.com/muxinc/elements/commit/d58d78fe6716d21ff03e5edb7d47c73e85ef4c85))
- Extended autoplay options ([#116](https://github.com/muxinc/elements/issues/116)) ([475e838](https://github.com/muxinc/elements/commit/475e83884f641c578fa601c9501147d485fc1831))
- Handle inferred mux data env key for custom domain cases. ([eedc19e](https://github.com/muxinc/elements/commit/eedc19e2025844f99909cf3d0751811b55239329))
- Improve error handling / messaging ([#132](https://github.com/muxinc/elements/issues/132)) ([b1f2dd0](https://github.com/muxinc/elements/commit/b1f2dd0f44ceb75a93f8cf758d6e4258e1366ed5))
- **mux-player:** Add audio-only support. Update vanilla example for audio use case. ([28c3db1](https://github.com/muxinc/elements/commit/28c3db19afb7b885316c034f1e02499dec472f7d))
- **mux-player:** Add basic chromes for audio only live & dvr. ([bc7dfdf](https://github.com/muxinc/elements/commit/bc7dfdf78aee96ab12980354384ea36a8e30ff05))
- **mux-player:** Add basic support for custom video domains. ([d355705](https://github.com/muxinc/elements/commit/d355705511df296c693fbb9f9168a15c34ae0993))
- **mux-player:** Add chromecast button for audio only chromes. ([3f2462b](https://github.com/muxinc/elements/commit/3f2462b51621a3e077d6e0471963d10cc606dbe8))
- **mux-player:** Add more seek to live behavior tests. Add event for inLiveWindow change. ([f334328](https://github.com/muxinc/elements/commit/f3343289a29b0c19856addf41fd0c5c1b2081c6a))
- **mux-player:** Add thumbnail-time support to mux-player. Document attr&prop. Warn when used with thumbnail-token. ([ee235e0](https://github.com/muxinc/elements/commit/ee235e014bd76daee470e21eff2944b9a85c9ac9))
- **mux-player:** Don't use disabled to toggle seek to live btn functionality. ([14f1f1c](https://github.com/muxinc/elements/commit/14f1f1c7ecd43416363eb43583622ea5732c9072))
- **mux-player:** minor cleanup for audio only UI. ([909a5ea](https://github.com/muxinc/elements/commit/909a5eaee520c2be982f4d3a139dc6836265d514))
- **mux-player:** move captions up when controls are showing ([e8d9842](https://github.com/muxinc/elements/commit/e8d9842f5b343fd11965c4fbda96323a6e173e63))
- **mux-player:** new iteration on error handling ([a89af8a](https://github.com/muxinc/elements/commit/a89af8a0b9400f2e0836e67b813d996636f044c1))
- **mux-player:** Seek to live button impl with live edge window detection and play on seek/seek on play behavior. ([77c8c5f](https://github.com/muxinc/elements/commit/77c8c5f05c2b22553efc6e627b0b148dded19a42))
- **mux-player:** use aria-disabled instead of non-standard attr. Add consts/code comments. fix css var. ([8c73f60](https://github.com/muxinc/elements/commit/8c73f602c6745a731f7fafdfdd8567b90db2ccad))
- only autoplay with the autoplay attribute ([#99](https://github.com/muxinc/elements/issues/99)) ([c6204fb](https://github.com/muxinc/elements/commit/c6204fb03bc78e3b55d09f9e2aa547cd62825633))
- **player:** Add inLiveWindow getter to player. Start tests for seek to live button behaviors. ([8217a4e](https://github.com/muxinc/elements/commit/8217a4ee4c9e61b570fa506f2b476a570dd78f61))
- rename .video to .media for consistency with media-chrome ([52c3a1d](https://github.com/muxinc/elements/commit/52c3a1ddef275256d2adc4cc200cb47b1c3023c3))
- rename hls to \_hls ([2d53bc2](https://github.com/muxinc/elements/commit/2d53bc2517840d65a8fd5e2bb2d979ce8b491116))
- subtitles for M3U8 playlists, resume session, add cast-button ([#239](https://github.com/muxinc/elements/issues/239)) ([89793d0](https://github.com/muxinc/elements/commit/89793d0f98776252b1a585f605a0af39bd5c22d2))
- vertical align progress bar and improve second color background ([#235](https://github.com/muxinc/elements/issues/235)) ([37e9eb7](https://github.com/muxinc/elements/commit/37e9eb74339f0f544f5e96e717396a6899446be0))

### Reverts

- Revert "Publish" ([42fc528](https://github.com/muxinc/elements/commit/42fc528216346ff52d967cec5392a1191f74a1c0))
- Revert "Add extra small player view w/ only play button" ([db4c1d9](https://github.com/muxinc/elements/commit/db4c1d9a5ebdbcdad3346e77f803749de4f8f913))

# [0.1.0-beta.20](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.19...@mux-elements/mux-player@0.1.0-beta.20) (2022-06-23)

### Bug Fixes

- enable cast docs + cast fix ([#253](https://github.com/muxinc/elements/issues/253)) ([421d515](https://github.com/muxinc/elements/commit/421d515cc4700cf9d7ca4f0d09aa600ec4adac7b))
- **mux-player:** Add cc btn to Vod XS chrome. ([#249](https://github.com/muxinc/elements/issues/249)) ([cf4ebe0](https://github.com/muxinc/elements/commit/cf4ebe0051c22223bcb50b0f8e2fc9a71b015ff0))
- **mux-player:** Update theme css to better account for audio vs. non-audio styling. ([81aa045](https://github.com/muxinc/elements/commit/81aa045be8a80e38b9da39800d1ae03cd806412e))
- upgrade Media Chrome v0.6.9 ([#267](https://github.com/muxinc/elements/issues/267)) ([0ec48f7](https://github.com/muxinc/elements/commit/0ec48f79b2cafe2066425a75d95c06fbeb6a236f))

### Features

- Handle inferred mux data env key for custom domain cases. ([eedc19e](https://github.com/muxinc/elements/commit/eedc19e2025844f99909cf3d0751811b55239329))
- **mux-player:** Add basic chromes for audio only live & dvr. ([bc7dfdf](https://github.com/muxinc/elements/commit/bc7dfdf78aee96ab12980354384ea36a8e30ff05))
- **mux-player:** Add basic support for custom video domains. ([d355705](https://github.com/muxinc/elements/commit/d355705511df296c693fbb9f9168a15c34ae0993))
- **mux-player:** Add chromecast button for audio only chromes. ([3f2462b](https://github.com/muxinc/elements/commit/3f2462b51621a3e077d6e0471963d10cc606dbe8))

# [0.1.0-beta.19](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.18...@mux-elements/mux-player@0.1.0-beta.19) (2022-06-07)

### Bug Fixes

- importing castable-video ([44cbb2f](https://github.com/muxinc/elements/commit/44cbb2f26290952ac8d3fe51a1d933352b0b9134))

# [0.1.0-beta.18](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.17...@mux-elements/mux-player@0.1.0-beta.18) (2022-06-06)

### Bug Fixes

- attrs not available in constructor ([#240](https://github.com/muxinc/elements/issues/240)) ([add468a](https://github.com/muxinc/elements/commit/add468a0fc93ddfb745dfbc60a08e8a9120621be))
- don't shift captions on iphones ([a4ae5f1](https://github.com/muxinc/elements/commit/a4ae5f1df0ce030f1ffedd74972873ff0f600483))
- don't shift captions on live, unless secondary color is set ([b474980](https://github.com/muxinc/elements/commit/b4749806ba1ec082fb21642edae9e963e9287643))
- lower captions offset for safari ([2f97a45](https://github.com/muxinc/elements/commit/2f97a452397ee276235a55d1deb29c8f0f4d2975))

### Features

- add casting logic without cast-button ([#237](https://github.com/muxinc/elements/issues/237)) ([f7f1fe9](https://github.com/muxinc/elements/commit/f7f1fe9713f8c2dcedb2840f463b5478d6fffca0))
- **dvr:** Initial effort for DVR support. ([d58d78f](https://github.com/muxinc/elements/commit/d58d78fe6716d21ff03e5edb7d47c73e85ef4c85))
- **mux-player:** Add audio-only support. Update vanilla example for audio use case. ([28c3db1](https://github.com/muxinc/elements/commit/28c3db19afb7b885316c034f1e02499dec472f7d))
- **mux-player:** minor cleanup for audio only UI. ([909a5ea](https://github.com/muxinc/elements/commit/909a5eaee520c2be982f4d3a139dc6836265d514))
- subtitles for M3U8 playlists, resume session, add cast-button ([#239](https://github.com/muxinc/elements/issues/239)) ([89793d0](https://github.com/muxinc/elements/commit/89793d0f98776252b1a585f605a0af39bd5c22d2))
- vertical align progress bar and improve second color background ([#235](https://github.com/muxinc/elements/issues/235)) ([37e9eb7](https://github.com/muxinc/elements/commit/37e9eb74339f0f544f5e96e717396a6899446be0))

# [0.1.0-beta.17](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.16...@mux-elements/mux-player@0.1.0-beta.17) (2022-05-26)

### Bug Fixes

- add an error if a token is provided via the playback ID ([d09446d](https://github.com/muxinc/elements/commit/d09446d6da3dc3b332db031336c97ee9349ac9f1))

# [0.1.0-beta.16](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.15...@mux-elements/mux-player@0.1.0-beta.16) (2022-05-23)

**Note:** Version bump only for package @mux-elements/mux-player

# [0.1.0-beta.15](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.14...@mux-elements/mux-player@0.1.0-beta.15) (2022-05-23)

### Bug Fixes

- **mux-player:** upgrade Media Chrome to 0.6.5 ([45415e6](https://github.com/muxinc/elements/commit/45415e63bbf8b6f7b115231022f06d3805da051e))

# [0.1.0-beta.14](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.13...@mux-elements/mux-player@0.1.0-beta.14) (2022-05-20)

### Bug Fixes

- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

# [0.1.0-beta.13](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.12...@mux-elements/mux-player@0.1.0-beta.13) (2022-05-19)

### Bug Fixes

- bump LIVE_SEGMENT_SECS to 5 ([3fdf72d](https://github.com/muxinc/elements/commit/3fdf72d0e1322571aa18e8de74649f0dce5ae7b9))

# [0.1.0-beta.12](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.11...@mux-elements/mux-player@0.1.0-beta.12) (2022-05-12)

### Bug Fixes

- bump media-chrome dep for fullscreen bugfix ([7ba458c](https://github.com/muxinc/elements/commit/7ba458ca38d29d2a0c9d4dd8a950bb3cd394c543))

# [0.1.0-beta.11](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.10...@mux-elements/mux-player@0.1.0-beta.11) (2022-05-11)

### Bug Fixes

- **mux-player:** Ensure that the externally set poster attr is used iff it's set. ([e761073](https://github.com/muxinc/elements/commit/e76107359375de8e7db41cf3762734fa98c9d543))

### Features

- **mux-player:** Add thumbnail-time support to mux-player. Document attr&prop. Warn when used with thumbnail-token. ([ee235e0](https://github.com/muxinc/elements/commit/ee235e014bd76daee470e21eff2944b9a85c9ac9))

# [0.1.0-beta.10](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.9...@mux-elements/mux-player@0.1.0-beta.10) (2022-05-10)

### Bug Fixes

- clear state on other src related attrs ([17e75e7](https://github.com/muxinc/elements/commit/17e75e78d9b14c913138c2d181d279a58ef98832))
- fullscreen controls layout ([#208](https://github.com/muxinc/elements/issues/208)) ([7bda89d](https://github.com/muxinc/elements/commit/7bda89de57e540e31f92a6b51f7379c94aad983d))
- make height larger for touch temporarily ([86aaa84](https://github.com/muxinc/elements/commit/86aaa849340ff3a5acdc758f2a3a8fc6065e314e))
- move hasPlayed into mux-player ([62bcd07](https://github.com/muxinc/elements/commit/62bcd076612a02f4d449ebe1ad0d34c8d8106942))
- put progress bar above controls ([3f454e0](https://github.com/muxinc/elements/commit/3f454e01f464a74be6bc3c7a14a5920d2ae48623))

# [0.1.0-beta.9](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.8...@mux-elements/mux-player@0.1.0-beta.9) (2022-05-03)

### Bug Fixes

- custom video events handling ([#203](https://github.com/muxinc/elements/issues/203)) ([a909f89](https://github.com/muxinc/elements/commit/a909f89a69ee0d4b67e9d9371ac0f80984016181))
- keep .hls but have it log a warning saying to use .\_hls ([11e6c10](https://github.com/muxinc/elements/commit/11e6c102a7e238bc8104c52ae9b94e7e3c2c7e19))
- keep mux-player#video for backward compatibility ([ddf3c6e](https://github.com/muxinc/elements/commit/ddf3c6eccb0011a42774133ec0a646d84d463f53))
- playback core should handle seek to live on first play ([805070a](https://github.com/muxinc/elements/commit/805070a7a4cb7158180710ecf85bf54bdb1f9280))
- prevent dialog from focus if outside player ([#196](https://github.com/muxinc/elements/issues/196)) ([6c73219](https://github.com/muxinc/elements/commit/6c732198b08f11162f7ee8c4345344b4c050a60f))

### Features

- add errorTranslator prop & muxVideo.error property ([#195](https://github.com/muxinc/elements/issues/195)) ([3afc2f0](https://github.com/muxinc/elements/commit/3afc2f0af75a5ad8ef00257a4ebc34882ff8c9ab))
- add media-theme-mux as a replaceable element ([#175](https://github.com/muxinc/elements/issues/175)) ([ee3c186](https://github.com/muxinc/elements/commit/ee3c186433c198a27304577e012b899c1aee44d4))
- rename .video to .media for consistency with media-chrome ([52c3a1d](https://github.com/muxinc/elements/commit/52c3a1ddef275256d2adc4cc200cb47b1c3023c3))
- rename hls to \_hls ([2d53bc2](https://github.com/muxinc/elements/commit/2d53bc2517840d65a8fd5e2bb2d979ce8b491116))

# [0.1.0-beta.8](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.7...@mux-elements/mux-player@0.1.0-beta.8) (2022-04-22)

### Bug Fixes

- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))

# [0.1.0-beta.7](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.6...@mux-elements/mux-player@0.1.0-beta.7) (2022-04-18)

### Bug Fixes

- make mux-player size based on video element ([#185](https://github.com/muxinc/elements/issues/185)) ([e4af9a8](https://github.com/muxinc/elements/commit/e4af9a885720f172837eb20ea49dc96bf66a77be))
- make mux-video errors more uniform, fix async ([#183](https://github.com/muxinc/elements/issues/183)) ([0ea4dc3](https://github.com/muxinc/elements/commit/0ea4dc3beafc7d8a6c5078087d14f3f4bac5dda7))

# [0.1.0-beta.6](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.5...@mux-elements/mux-player@0.1.0-beta.6) (2022-04-13)

### Bug Fixes

- get polyfill from playback core in mux-player ([ec053f9](https://github.com/muxinc/elements/commit/ec053f90f6b7e3ccf0dd6bdd9034cbe8ead0d593))

# [0.1.0-beta.5](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.4...@mux-elements/mux-player@0.1.0-beta.5) (2022-04-12)

### Bug Fixes

- clear some state on playbackId change ([#174](https://github.com/muxinc/elements/issues/174)) ([af0738e](https://github.com/muxinc/elements/commit/af0738ea5ae5a75861f75fc2ae3809ada735f3e2))
- **mux-player:** adding test for metadata attrs. ([a460566](https://github.com/muxinc/elements/commit/a4605661fabb33a178bb3244b1411c63bf1e1148))
- **mux-player:** metadata fields should be set based on 'external'/attr values in mux-player. ([bd474b6](https://github.com/muxinc/elements/commit/bd474b658931afb0ea9f3f1585ba3142d22bd503))
- prevent non-fatal error events propagating ([#179](https://github.com/muxinc/elements/issues/179)) ([2103800](https://github.com/muxinc/elements/commit/2103800b1026653703a67432a9bf80cb2ce5c7ac))

# [0.1.0-beta.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.3...@mux-elements/mux-player@0.1.0-beta.4) (2022-04-08)

### Bug Fixes

- child custom element mux-video upgraded after mux-player ([#171](https://github.com/muxinc/elements/issues/171)) ([9db8037](https://github.com/muxinc/elements/commit/9db8037f379132307727941f82a736d55e76b4e5))
- primary color should be also used for the text color on controls ([d44da1b](https://github.com/muxinc/elements/commit/d44da1b7e4a11ddf8274a09acf306747a5af42ce))

### Features

- **mux-player:** Add more seek to live behavior tests. Add event for inLiveWindow change. ([f334328](https://github.com/muxinc/elements/commit/f3343289a29b0c19856addf41fd0c5c1b2081c6a))
- **mux-player:** Don't use disabled to toggle seek to live btn functionality. ([14f1f1c](https://github.com/muxinc/elements/commit/14f1f1c7ecd43416363eb43583622ea5732c9072))
- **mux-player:** Seek to live button impl with live edge window detection and play on seek/seek on play behavior. ([77c8c5f](https://github.com/muxinc/elements/commit/77c8c5f05c2b22553efc6e627b0b148dded19a42))
- **mux-player:** use aria-disabled instead of non-standard attr. Add consts/code comments. fix css var. ([8c73f60](https://github.com/muxinc/elements/commit/8c73f602c6745a731f7fafdfdd8567b90db2ccad))
- **player:** Add inLiveWindow getter to player. Start tests for seek to live button behaviors. ([8217a4e](https://github.com/muxinc/elements/commit/8217a4ee4c9e61b570fa506f2b476a570dd78f61))

# [0.1.0-beta.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.2...@mux-elements/mux-player@0.1.0-beta.3) (2022-04-01)

### Bug Fixes

- devLog links to GH base URL ([022f69f](https://github.com/muxinc/elements/commit/022f69fca5624399e67ea9bb5ce1b2b2929979d6))
- **mux-player:** Make sure internal state monitoring setup happens after relevant elements exist. ([43e9566](https://github.com/muxinc/elements/commit/43e956678b7e1b8da3e95144b7d9f6f3d2cb99d5))

# [0.1.0-beta.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.1...@mux-elements/mux-player@0.1.0-beta.2) (2022-04-01)

### Bug Fixes

- **mux-player:** temp fix conditional render bug ([73534dc](https://github.com/muxinc/elements/commit/73534dc476d901e916734044834c71130a6de73e))

### Features

- **mux-player:** new iteration on error handling ([a89af8a](https://github.com/muxinc/elements/commit/a89af8a0b9400f2e0836e67b813d996636f044c1))

### Reverts

- Revert "Publish" ([42fc528](https://github.com/muxinc/elements/commit/42fc528216346ff52d967cec5392a1191f74a1c0))

# [0.1.0-beta.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-player@0.1.0-beta.0...@mux-elements/mux-player@0.1.0-beta.1) (2022-03-28)

### Bug Fixes

- add patched template-parts fork ([b200e9f](https://github.com/muxinc/elements/commit/b200e9fcdff9cf5757ec646c8833e742e329afa0))
- **mux-player:** Add support for event handlers to template parts processing. ([704d2e3](https://github.com/muxinc/elements/commit/704d2e34dacdb68316ead85a2dd494475de72732))
- **mux-player:** don't fire the closed event twice per close on the dialog WC. ([0231b1a](https://github.com/muxinc/elements/commit/0231b1a950fe6eb476ce8bcd3ce4d49cee97e0c9))
- **mux-player:** Use onclose event handler in template. Clear errors onclose. ([1eca0ef](https://github.com/muxinc/elements/commit/1eca0efb32b74f82c67be4f9ac0f3bc5dfbf7839))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- update media-chrome to 0.5.4 ([21e7884](https://github.com/muxinc/elements/commit/21e78840768bad8eeb24d39fa97fcd8cf6ab266a))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- Improve error handling / messaging ([#132](https://github.com/muxinc/elements/issues/132)) ([b1f2dd0](https://github.com/muxinc/elements/commit/b1f2dd0f44ceb75a93f8cf758d6e4258e1366ed5))
- **mux-player:** move captions up when controls are showing ([e8d9842](https://github.com/muxinc/elements/commit/e8d9842f5b343fd11965c4fbda96323a6e173e63))
