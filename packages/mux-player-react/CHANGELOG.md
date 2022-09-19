# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-beta.0](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.28...@mux/mux-player-react@1.0.0-beta.0) (2022-09-16)

### Bug Fixes

- **mux-player-react:** explicitly add className to typescript types for mux-player-react (different impl from MuxVideo and MuxAudio). ([84ca6cb](https://github.com/muxinc/elements/commit/84ca6cb69a2634dade58cece3b17ae72060c79b1))

### Features

- export gesture-layer as a part ([89e90ee](https://github.com/muxinc/elements/commit/89e90ee3268da23c8071fc9cd2f21efc534f1849)), closes [#379](https://github.com/muxinc/elements/issues/379)

# [0.1.0-beta.28](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.27...@mux/mux-player-react@0.1.0-beta.28) (2022-09-01)

### Bug Fixes

- cjs main entrypoint for React pkgs ([#360](https://github.com/muxinc/elements/issues/360)) ([473875f](https://github.com/muxinc/elements/commit/473875f4869a6ab9b04b44a90cc52b620a15ac83))

# [0.1.0-beta.27](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.26...@mux/mux-player-react@0.1.0-beta.27) (2022-08-31)

### Features

- Add hotkeys blocklist and turn off hotkey seeking when any live ([#341](https://github.com/muxinc/elements/issues/341)) ([ce76b1b](https://github.com/muxinc/elements/commit/ce76b1b5955179c929c91de97c06a2839990c509)), closes [#336](https://github.com/muxinc/elements/issues/336)
- **mux-player-react:** Add defaultShowRemainingTime to mux-player-react. ([7a58731](https://github.com/muxinc/elements/commit/7a58731ba6d6965942f0e3d487821dd464ce422c))
- **mux-player-react:** add missing event listeners ([03cac1a](https://github.com/muxinc/elements/commit/03cac1abeb4215ea89f03f899b9132ab18486699))
- **mux-player-react:** Add support for hideDuration and playbackRates. ([58ababc](https://github.com/muxinc/elements/commit/58ababc79c1391fda311b82c42180404d01850bb))
- **mux-player-react:** Add title type for MuxPlayer (react). ([22c80fe](https://github.com/muxinc/elements/commit/22c80fecd7c856b234a1fa2a65e7efd2b4e98f0b))
- **mux-player, mux-player-react:** make hide-duration a controlsList value. ([cb3b2f2](https://github.com/muxinc/elements/commit/cb3b2f27b804878e5a223893cc6fc75dac0a4572))
- use CSS vars to toggle off elements ([#349](https://github.com/muxinc/elements/issues/349)) ([69128d6](https://github.com/muxinc/elements/commit/69128d62ee1a9e5139d8fab3b5faf56e494dfa8b))

# [0.1.0-beta.26](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.25...@mux/mux-player-react@0.1.0-beta.26) (2022-08-03)

**Note:** Version bump only for package @mux/mux-player-react

# [0.1.0-beta.25](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.24...@mux/mux-player-react@0.1.0-beta.25) (2022-08-02)

### Features

- types and docs for nohotkeys in mux-player-react ([a9f78d4](https://github.com/muxinc/elements/commit/a9f78d422d64bf661de59cad834aa1c819e88ff8))

# [0.1.0-beta.24](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.23...@mux/mux-player-react@0.1.0-beta.24) (2022-07-21)

### Features

- add defaultMuted, defaultPlaybackRate props ([#252](https://github.com/muxinc/elements/issues/252)) ([1a72165](https://github.com/muxinc/elements/commit/1a7216545cba27b34bc743cf5dd6225d4dcae738))

# [0.1.0-beta.23](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.22...@mux/mux-player-react@0.1.0-beta.23) (2022-07-11)

**Note:** Version bump only for package @mux/mux-player-react

# [0.1.0-beta.22](https://github.com/muxinc/elements/compare/@mux/mux-player-react@0.1.0-beta.21...@mux/mux-player-react@0.1.0-beta.22) (2022-07-05)

**Note:** Version bump only for package @mux/mux-player-react

# 0.1.0-beta.21 (2022-07-05)

### Bug Fixes

- enable cast docs + cast fix ([#253](https://github.com/muxinc/elements/issues/253)) ([421d515](https://github.com/muxinc/elements/commit/421d515cc4700cf9d7ca4f0d09aa600ec4adac7b))
- **mux-player-react:** Missing preload prop type def. ([19b2e15](https://github.com/muxinc/elements/commit/19b2e15dc844e6fb0f90e9ad62a436587260094a))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))
- update react peerDependencies to allow ^18 ([1cfb019](https://github.com/muxinc/elements/commit/1cfb019b71cf9aa280abccaf4a7818d585b56d86))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- default-hidden-captions to turn off showing captions by default ([#98](https://github.com/muxinc/elements/issues/98)) ([9edc3cd](https://github.com/muxinc/elements/commit/9edc3cd008e47234472b14784ea89493736599cb))
- Extended autoplay options ([#116](https://github.com/muxinc/elements/issues/116)) ([475e838](https://github.com/muxinc/elements/commit/475e83884f641c578fa601c9501147d485fc1831))
- **mux-player-react:** Add audio only. Cleanup StreamTypes source of truth. ([4f37d7f](https://github.com/muxinc/elements/commit/4f37d7f10ef66eef48af0dd9cf1efc79322b660d))
- **mux-player-react:** Add basic support for custom video domains. ([ac61aff](https://github.com/muxinc/elements/commit/ac61affffdd38ef0df3151d2f75023f7d2772688))
- **mux-player-react:** Add thumbnail-time support to mux-player-react. Document prop. ([d1c1a4c](https://github.com/muxinc/elements/commit/d1c1a4c65b200c59bab7cc68453c0e307eb75ae4))

### Reverts

- Revert "Publish" ([42fc528](https://github.com/muxinc/elements/commit/42fc528216346ff52d967cec5392a1191f74a1c0))

# [0.1.0-beta.20](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.19...@mux-elements/mux-player-react@0.1.0-beta.20) (2022-06-23)

### Bug Fixes

- enable cast docs + cast fix ([#253](https://github.com/muxinc/elements/issues/253)) ([421d515](https://github.com/muxinc/elements/commit/421d515cc4700cf9d7ca4f0d09aa600ec4adac7b))

### Features

- **mux-player-react:** Add basic support for custom video domains. ([ac61aff](https://github.com/muxinc/elements/commit/ac61affffdd38ef0df3151d2f75023f7d2772688))

# [0.1.0-beta.19](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.18...@mux-elements/mux-player-react@0.1.0-beta.19) (2022-06-07)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.18](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.17...@mux-elements/mux-player-react@0.1.0-beta.18) (2022-06-06)

### Features

- **mux-player-react:** Add audio only. Cleanup StreamTypes source of truth. ([4f37d7f](https://github.com/muxinc/elements/commit/4f37d7f10ef66eef48af0dd9cf1efc79322b660d))

# [0.1.0-beta.17](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.16...@mux-elements/mux-player-react@0.1.0-beta.17) (2022-05-26)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.16](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.15...@mux-elements/mux-player-react@0.1.0-beta.16) (2022-05-23)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.15](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.14...@mux-elements/mux-player-react@0.1.0-beta.15) (2022-05-23)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.14](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.13...@mux-elements/mux-player-react@0.1.0-beta.14) (2022-05-20)

### Bug Fixes

- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

# [0.1.0-beta.13](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.12...@mux-elements/mux-player-react@0.1.0-beta.13) (2022-05-19)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.12](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.11...@mux-elements/mux-player-react@0.1.0-beta.12) (2022-05-12)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.11](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.10...@mux-elements/mux-player-react@0.1.0-beta.11) (2022-05-11)

### Bug Fixes

- **mux-player-react:** Missing preload prop type def. ([19b2e15](https://github.com/muxinc/elements/commit/19b2e15dc844e6fb0f90e9ad62a436587260094a))

### Features

- **mux-player-react:** Add thumbnail-time support to mux-player-react. Document prop. ([d1c1a4c](https://github.com/muxinc/elements/commit/d1c1a4c65b200c59bab7cc68453c0e307eb75ae4))

# [0.1.0-beta.10](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.9...@mux-elements/mux-player-react@0.1.0-beta.10) (2022-05-10)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.9](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.8...@mux-elements/mux-player-react@0.1.0-beta.9) (2022-05-03)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.8](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.7...@mux-elements/mux-player-react@0.1.0-beta.8) (2022-04-22)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.7](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.6...@mux-elements/mux-player-react@0.1.0-beta.7) (2022-04-18)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.6](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.5...@mux-elements/mux-player-react@0.1.0-beta.6) (2022-04-13)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.5](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.4...@mux-elements/mux-player-react@0.1.0-beta.5) (2022-04-12)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.3...@mux-elements/mux-player-react@0.1.0-beta.4) (2022-04-08)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.2...@mux-elements/mux-player-react@0.1.0-beta.3) (2022-04-01)

**Note:** Version bump only for package @mux-elements/mux-player-react

# [0.1.0-beta.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.1...@mux-elements/mux-player-react@0.1.0-beta.2) (2022-04-01)

### Reverts

- Revert "Publish" ([42fc528](https://github.com/muxinc/elements/commit/42fc528216346ff52d967cec5392a1191f74a1c0))

# [0.1.0-beta.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-player-react@0.1.0-beta.0...@mux-elements/mux-player-react@0.1.0-beta.1) (2022-03-28)

### Bug Fixes

- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
