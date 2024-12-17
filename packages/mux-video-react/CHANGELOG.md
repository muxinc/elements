# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.12.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.11.4...@mux/mux-video-react@0.12.0) (2024-10-24)


### Bug Fixes

* add updated peer deps to other React pkgs ([#1006](https://github.com/muxinc/elements/issues/1006)) ([e51a7ce](https://github.com/muxinc/elements/commit/e51a7ce412ce7f56610035f412e2f263325ed6ad))


### Features

* **playback-core, mux-video, mux-audio, mux-video-react, mux-audio-react, mux-player, mux-player-react:** Add asset start and end time props and attrs. ([#1002](https://github.com/muxinc/elements/issues/1002)) ([99a0726](https://github.com/muxinc/elements/commit/99a07268cfa78ee026a0ee7b7f9af90fcf3feb4c))
* **playback-core:** error handling rearchitecture (including more granular and DRM error cases)  ([4d0b670](https://github.com/muxinc/elements/commit/4d0b670eacb57f44891fab781941dab6e97e06fe))





## [0.13.1](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.13.0...@mux/mux-video-react@0.13.1) (2024-12-17)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/playback-core bumped from 0.28.0 to 0.28.1

## [0.13.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.12.0...@mux/mux-video-react@0.13.0) (2024-12-12)


### Features

* Set default player init time for all elements for greater accuracy. Expose attr+prop for externally defined player init time. ([#1034](https://github.com/muxinc/elements/issues/1034)) ([61f10d3](https://github.com/muxinc/elements/commit/61f10d3933e487e44795a8e42e36721ae00873d2))
* use MC media-error-dialog ([#1014](https://github.com/muxinc/elements/issues/1014)) ([2fbb2c1](https://github.com/muxinc/elements/commit/2fbb2c157aa694ed82fc2b81b989cca6c0f790af))


### Bug Fixes

* move package exports default condition to be last ([#1013](https://github.com/muxinc/elements/issues/1013)) ([192aa79](https://github.com/muxinc/elements/commit/192aa79903d3c01fc9ce9fda3d8a35be3c56fc83))
* **mux-video, mux-video-react, mux-audio, mux-audio-react, mux-player, mux-player-react:** Expose element name and version via exports and statics for web components. ([#1017](https://github.com/muxinc/elements/issues/1017)) ([27b6858](https://github.com/muxinc/elements/commit/27b6858de2190e2caf2b1315ebbc469c01bbd25f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @mux/playback-core bumped from 0.27.0 to 0.28.0

## [0.11.4](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.11.3...@mux/mux-video-react@0.11.4) (2024-09-20)

**Note:** Version bump only for package @mux/mux-video-react





## [0.11.3](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.11.2...@mux/mux-video-react@0.11.3) (2024-08-06)

**Note:** Version bump only for package @mux/mux-video-react





## [0.11.2](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.11.1...@mux/mux-video-react@0.11.2) (2024-08-02)


### Bug Fixes

* mark React 19 as peerdep ([#971](https://github.com/muxinc/elements/issues/971)) ([4f74ea0](https://github.com/muxinc/elements/commit/4f74ea0215407e5c9573d8dd4a91d2a855b864bb))





## [0.11.1](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.11.0...@mux/mux-video-react@0.11.1) (2024-07-10)

**Note:** Version bump only for package @mux/mux-video-react





# [0.11.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.10.0...@mux/mux-video-react@0.11.0) (2024-05-28)


### Features

* **mux-player, mux-player-react, mux-video, mux-video-react, mux-audio, mux-audio-react, playback-core:** pdt clipping ([#923](https://github.com/muxinc/elements/issues/923)) ([22e9b06](https://github.com/muxinc/elements/commit/22e9b06e2e0913a6c34ebea53f4bbeded969b5a4))





# [0.10.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.9.0...@mux/mux-video-react@0.10.0) (2024-05-03)


### Bug Fixes

* passthrough props to native media els ([#912](https://github.com/muxinc/elements/issues/912)) ([88a63db](https://github.com/muxinc/elements/commit/88a63db7dadc9aa3e09402f7c1be79a278b97c06))


### Features

* **mux-player-react, mux-uploader-react, mux-audio-react, mux-video-react:** add client component directive ([#911](https://github.com/muxinc/elements/issues/911)) ([76aa003](https://github.com/muxinc/elements/commit/76aa003e9ad9488509650970b971edd3ed463592))





# [0.9.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.8.5...@mux/mux-video-react@0.9.0) (2024-04-18)


### Bug Fixes

* upgrade media-chrome, upchunk, React types ([#904](https://github.com/muxinc/elements/issues/904)) ([1090ad6](https://github.com/muxinc/elements/commit/1090ad690261acd7ac1ab68b45801c46be1c2d0c))
* upgrade mux-embed v5.2.0 & media-chrome v3.2.0 ([#897](https://github.com/muxinc/elements/issues/897)) ([fd91d94](https://github.com/muxinc/elements/commit/fd91d946ee2f8e58e05551fcb247422de6fbb761))


### Features

* add `disable-tracking` attribute and prop ([#900](https://github.com/muxinc/elements/issues/900)) ([0f5966e](https://github.com/muxinc/elements/commit/0f5966ec6cdf3cacde017a4ddd9c388bea3168d7))





## [0.8.5](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.8.4...@mux/mux-video-react@0.8.5) (2024-03-29)

**Note:** Version bump only for package @mux/mux-video-react





## [0.8.4](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.8.3...@mux/mux-video-react@0.8.4) (2024-03-20)

**Note:** Version bump only for package @mux/mux-video-react





## [0.8.3](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.8.2...@mux/mux-video-react@0.8.3) (2024-02-16)

**Note:** Version bump only for package @mux/mux-video-react





## [0.8.2](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.8.1...@mux/mux-video-react@0.8.2) (2024-01-02)

**Note:** Version bump only for package @mux/mux-video-react





## [0.8.1](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.8.0...@mux/mux-video-react@0.8.1) (2023-12-07)


### Bug Fixes

* Adding unofficial _hlsConfig to media elements and playback core. ([#833](https://github.com/muxinc/elements/issues/833)) ([b86f6e6](https://github.com/muxinc/elements/commit/b86f6e6eb2c116d1d676fbaecd46d77a0baa3416)), closes [#792](https://github.com/muxinc/elements/issues/792)
* **mux-video-react:** Don't spread disableCookies to video to avoid warnings ([#749](https://github.com/muxinc/elements/issues/749)) ([06169be](https://github.com/muxinc/elements/commit/06169bef2c158a02e683839f1bebb8cb1e619c0c)), closes [#602](https://github.com/muxinc/elements/issues/602)





# [0.8.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.21...@mux/mux-video-react@0.8.0) (2023-10-24)


### Features

* Manifest manipulation and other media stream query param props. ([954b2c8](https://github.com/muxinc/elements/commit/954b2c80d7df88bb4585c46a15dd1185d56dcf9a))





## [0.7.21](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.20...@mux/mux-video-react@0.7.21) (2023-10-03)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.20](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.19...@mux/mux-video-react@0.7.20) (2023-09-05)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.19](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.18...@mux/mux-video-react@0.7.19) (2023-08-30)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.18](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.17...@mux/mux-video-react@0.7.18) (2023-08-23)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.17](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.16...@mux/mux-video-react@0.7.17) (2023-08-15)


### Bug Fixes

* Reverting packages type (defaults to cjs) for accuracy per node … ([#745](https://github.com/muxinc/elements/issues/745)) ([9e7a171](https://github.com/muxinc/elements/commit/9e7a17113e14b711c8da9b1bdafe65ee86454b3b))





## [0.7.16](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.15...@mux/mux-video-react@0.7.16) (2023-08-14)


### Bug Fixes

* **mux-video-react:** Don't spread streamType to video to avoid React warnings ([#721](https://github.com/muxinc/elements/issues/721)) ([7395fca](https://github.com/muxinc/elements/commit/7395fca1b50dbad4fa04cb37b234523b953a2c78)), closes [#602](https://github.com/muxinc/elements/issues/602)





## [0.7.15](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.14...@mux/mux-video-react@0.7.15) (2023-07-07)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.14](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.13...@mux/mux-video-react@0.7.14) (2023-06-29)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.13](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.12...@mux/mux-video-react@0.7.13) (2023-06-12)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.12](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.11...@mux/mux-video-react@0.7.12) (2023-06-06)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.11](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.10...@mux/mux-video-react@0.7.11) (2023-05-08)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.10](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.9...@mux/mux-video-react@0.7.10) (2023-04-24)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.9](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.8...@mux/mux-video-react@0.7.9) (2023-04-14)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.8](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.7...@mux/mux-video-react@0.7.8) (2023-03-31)


### Bug Fixes

* update typedefs, disable skipLibChecks in tsconfig ([#601](https://github.com/muxinc/elements/issues/601)) ([1664aec](https://github.com/muxinc/elements/commit/1664aec20e4cf4a59779848b298d4504eef24080))





## [0.7.7](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.6...@mux/mux-video-react@0.7.7) (2023-02-15)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.6](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.5...@mux/mux-video-react@0.7.6) (2023-02-14)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.5](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.4...@mux/mux-video-react@0.7.5) (2023-02-02)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.4](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.3...@mux/mux-video-react@0.7.4) (2023-02-01)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.3](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.2...@mux/mux-video-react@0.7.3) (2023-01-20)


### Bug Fixes

* MuxVideoReact memory leak ([c057099](https://github.com/muxinc/elements/commit/c057099bb344212c0afd5f938a92c893245423b4))





## [0.7.2](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.1...@mux/mux-video-react@0.7.2) (2022-12-13)

**Note:** Version bump only for package @mux/mux-video-react





## [0.7.1](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.7.0...@mux/mux-video-react@0.7.1) (2022-11-21)


### Bug Fixes

* add async effect for loading media ([#492](https://github.com/muxinc/elements/issues/492)) ([d2b250a](https://github.com/muxinc/elements/commit/d2b250a2d86e4e6a4c17fc34196e6468c4fedf1f))





# [0.7.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.6.0...@mux/mux-video-react@0.7.0) (2022-10-25)


### Features

* **mux-video-react:** Add disable cookies prop. ([777db83](https://github.com/muxinc/elements/commit/777db8301e6bbb97ef542a05251b00e450a04b8d))





# [0.6.0](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.5.4...@mux/mux-video-react@0.6.0) (2022-10-05)

### Bug Fixes

- allow autoplay to change in mux-video-react, fixes [#396](https://github.com/muxinc/elements/issues/396) ([bf4ceb0](https://github.com/muxinc/elements/commit/bf4ceb051b7f656145826a460652820fce36c1d6))
- preload playback core change ([15313ea](https://github.com/muxinc/elements/commit/15313eaad81f748b5853a0fdaabfe141963f885e))

### Features

- add `prefer-playback` attribute ([#402](https://github.com/muxinc/elements/issues/402)) ([8da36d6](https://github.com/muxinc/elements/commit/8da36d6b597ddbc4ae006873fee13a971b7ec2f3))

## [0.5.4](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.5.3...@mux/mux-video-react@0.5.4) (2022-09-16)

**Note:** Version bump only for package @mux/mux-video-react

## [0.5.3](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.5.2...@mux/mux-video-react@0.5.3) (2022-09-01)

### Bug Fixes

- cjs main entrypoint for React pkgs ([#360](https://github.com/muxinc/elements/issues/360)) ([473875f](https://github.com/muxinc/elements/commit/473875f4869a6ab9b04b44a90cc52b620a15ac83))

## [0.5.2](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.5.1...@mux/mux-video-react@0.5.2) (2022-08-31)

**Note:** Version bump only for package @mux/mux-video-react

## [0.5.1](https://github.com/muxinc/elements/compare/@mux/mux-video-react@0.5.0...@mux/mux-video-react@0.5.1) (2022-07-21)

**Note:** Version bump only for package @mux/mux-video-react

# 0.5.0 (2022-07-05)

### Bug Fixes

- **mux-video-react:** use generateInitTime() instead of Date.now. ([0f159c2](https://github.com/muxinc/elements/commit/0f159c233244404faec13e61f1dbbd8b7c4adc81))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))
- update react peerDependencies to allow ^18 ([1cfb019](https://github.com/muxinc/elements/commit/1cfb019b71cf9aa280abccaf4a7818d585b56d86))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- Extended autoplay options ([#116](https://github.com/muxinc/elements/issues/116)) ([475e838](https://github.com/muxinc/elements/commit/475e83884f641c578fa601c9501147d485fc1831))

## [0.4.12](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.11...@mux-elements/mux-video-react@0.4.12) (2022-06-23)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.11](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.10...@mux-elements/mux-video-react@0.4.11) (2022-06-06)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.10](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.9...@mux-elements/mux-video-react@0.4.10) (2022-05-26)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.9](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.8...@mux-elements/mux-video-react@0.4.9) (2022-05-23)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.8](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.7...@mux-elements/mux-video-react@0.4.8) (2022-05-20)

### Bug Fixes

- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

## [0.4.7](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.6...@mux-elements/mux-video-react@0.4.7) (2022-05-10)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.6](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.5...@mux-elements/mux-video-react@0.4.6) (2022-05-03)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.5](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.4...@mux-elements/mux-video-react@0.4.5) (2022-04-22)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.3...@mux-elements/mux-video-react@0.4.4) (2022-04-18)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.2...@mux-elements/mux-video-react@0.4.3) (2022-04-12)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.1...@mux-elements/mux-video-react@0.4.2) (2022-04-01)

**Note:** Version bump only for package @mux-elements/mux-video-react

## [0.4.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.4.0...@mux-elements/mux-video-react@0.4.1) (2022-03-29)

**Note:** Version bump only for package @mux-elements/mux-video-react

# [0.4.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-video-react@0.3.0...@mux-elements/mux-video-react@0.4.0) (2022-03-28)

### Bug Fixes

- **mux-video-react:** use generateInitTime() instead of Date.now. ([0f159c2](https://github.com/muxinc/elements/commit/0f159c233244404faec13e61f1dbbd8b7c4adc81))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
