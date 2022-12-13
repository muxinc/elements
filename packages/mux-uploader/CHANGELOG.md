# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-beta.3](https://github.com/muxinc/elements/compare/@mux/mux-uploader@1.0.0-beta.2...@mux/mux-uploader@1.0.0-beta.3) (2022-12-13)


### Features

* **mux-uploader:** Upgrade upchunk to take advantage of readable streams. ([9a2c1b9](https://github.com/muxinc/elements/commit/9a2c1b973966a65702ba0259a5e59dfe8a378cd0))





# [1.0.0-beta.2](https://github.com/muxinc/elements/compare/@mux/mux-uploader@1.0.0-beta.1...@mux/mux-uploader@1.0.0-beta.2) (2022-10-25)

**Note:** Version bump only for package @mux/mux-uploader





# [1.0.0-beta.1](https://github.com/muxinc/elements/compare/@mux/mux-uploader@1.0.0-beta.0...@mux/mux-uploader@1.0.0-beta.1) (2022-10-05)

**Note:** Version bump only for package @mux/mux-uploader

# [1.0.0-beta.0](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.10...@mux/mux-uploader@1.0.0-beta.0) (2022-09-16)

**Note:** Version bump only for package @mux/mux-uploader

# [0.1.0-beta.10](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.8...@mux/mux-uploader@0.1.0-beta.10) (2022-09-16)

**Note:** Version bump only for package @mux/mux-uploader

# [0.1.0-beta.8](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.7...@mux/mux-uploader@0.1.0-beta.8) (2022-08-31)

### Bug Fixes

- **mux-uploader:** Rename error event. ([fff5f3e](https://github.com/muxinc/elements/commit/fff5f3e577749eebcc22c72b25cbe433e4f8ed2d))
- polyfills mutating global ([#355](https://github.com/muxinc/elements/issues/355)) ([71d18a4](https://github.com/muxinc/elements/commit/71d18a427f0171bb214a0df7c1425d3d1bddc47a))

# [0.1.0-beta.7](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.6...@mux/mux-uploader@0.1.0-beta.7) (2022-08-04)

### Bug Fixes

- **mux-uploader:** use narrower type def for uploadstart to avoid type mismatches in dist. ([a56cc06](https://github.com/muxinc/elements/commit/a56cc0609b1051513f5df3eb7e9cb21410fc7bb5))

# [0.1.0-beta.6](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.5...@mux/mux-uploader@0.1.0-beta.6) (2022-08-03)

### Features

- **mux-uploader:** Upchunk event type defs. ([248e0e1](https://github.com/muxinc/elements/commit/248e0e1a9edf648113fd6bc7bdf6505c7df8cc4b))

# [0.1.0-beta.5](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.4...@mux/mux-uploader@0.1.0-beta.5) (2022-08-02)

### Bug Fixes

- **mux-uploader:** Fix attempt and chunkSuccess event details not being passed. Also make the data passed consistent by using event for all params. ([09d4cf8](https://github.com/muxinc/elements/commit/09d4cf8e22d8de919e175d039c5f0eb9a42b2591))
- **mux-uploader:** Update event and event handler typedefs for greater accuracy of types. ([92f28a5](https://github.com/muxinc/elements/commit/92f28a5828ea3c046fa5a1aa711a038a7444f0dc))

### Features

- **mux-uploader:** Add CSS variables for button border and padding. ([359cd89](https://github.com/muxinc/elements/commit/359cd89472781fc41e33e95574c0d9c845b1d081))
- **mux-uploader:** Add custom event for when upload starts. ([9fd1efc](https://github.com/muxinc/elements/commit/9fd1efc943bcb60efdb51b455d5b9642af86b920))
- **mux-uploader:** Support Upchunk's attempt and chunkSuccess events. ([739a88e](https://github.com/muxinc/elements/commit/739a88e5eda697b8344ef14e3a20b1bef19e1a41))

# [0.1.0-beta.4](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.3...@mux/mux-uploader@0.1.0-beta.4) (2022-07-21)

### Bug Fixes

- **mux-uploader, mux-uploader-react:** Add support for endpoint to react version. Clean up type defs, including css vars (drop component only). Remove unnecessary capture for DandD events. ([c12ded5](https://github.com/muxinc/elements/commit/c12ded5188a3d97d48dc335a98d8537b6fa57443))

### Features

- add defaultMuted, defaultPlaybackRate props ([#252](https://github.com/muxinc/elements/issues/252)) ([1a72165](https://github.com/muxinc/elements/commit/1a7216545cba27b34bc743cf5dd6225d4dcae738))
- **mux-uploader, mux-uploader-react:** Reset state to allow users to re-select same file when retrying a failed upload. Add error messaging for when url is unset. ([94d000a](https://github.com/muxinc/elements/commit/94d000a396f9a10406bd6959e8aec3cb96c7e775))
- **mux-uploader:** Add endpoint support for promise callback. ([fc7b381](https://github.com/muxinc/elements/commit/fc7b38171337401f6c0ef8be2fa4e741a0e7a3fd))
- **mux-uploader:** Clean up mux-uploader-drop + overlay and active logic now that we support descendants. ([83777d2](https://github.com/muxinc/elements/commit/83777d24f1b024b7eba83c98c7a8eb20f9db59e6))
- **mux-uploader:** Support endoing. ([86ae488](https://github.com/muxinc/elements/commit/86ae488dd22dbd1b7c773d3e13ce9cb99605d0f5))

# [0.1.0-beta.3](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.2...@mux/mux-uploader@0.1.0-beta.3) (2022-07-11)

### Bug Fixes

- **mux-uploader:** Fix default format progress to include percent symbol. Move to module fn. ([6f519f7](https://github.com/muxinc/elements/commit/6f519f7335c62b031781d9d68de4aadab39b2089))
- **mux-uploader:** Fix syntax in README for components. ([affb4ca](https://github.com/muxinc/elements/commit/affb4ca365f7a9410d03b9d4bfe69eac3d40dca3))
- **mux-uploader:** handle slotted/changing buttons. rename slot per informal conventions on other projects ([1829fd9](https://github.com/muxinc/elements/commit/1829fd9817976750797cae4de0054d0e165bb269))
- **mux-uploader:** Polyfill for SSR. ([f559f68](https://github.com/muxinc/elements/commit/f559f68b3f3746d74155a3db919521aa864a7321))
- **mux-uploader:** re-add drop import to ensure custom element registration. Start work on overlay css. ([1ae4a2e](https://github.com/muxinc/elements/commit/1ae4a2e3e83467fa97fe86aadfe9fbeed09981c5))
- **mux-uploader:** Refactor overlay behavior for drop. Remove z-index assumptions from uploader. Rename overlay text attr to overlay-text for clarity. ([dcf2c80](https://github.com/muxinc/elements/commit/dcf2c8052581e8174bed59a01a1ca30a7780fa93))
- **mux-uploader:** Refactor so that drop can only be done with mux-uploader-drop. ([59ddb56](https://github.com/muxinc/elements/commit/59ddb56f22a59b8ba8d4f83cab5653097781bd16))
- **mux-uploader:** Simplify drop internal DOM structure to have more predictable layout & styling. ([ec108ba](https://github.com/muxinc/elements/commit/ec108bae3c047b35c7316b350ee69d8dc2beffd7))

### Features

- Add formatProgress method for customization. Bugfix for default uploader button. ([e7860e9](https://github.com/muxinc/elements/commit/e7860e910df648355f1a18c51d248e088f7d3221))
- **mux-uploader:** Add events that correspond to upchunk events. Early bail when no URL is provided. ([740aa96](https://github.com/muxinc/elements/commit/740aa96455c910f16c88b440dc78f8321a3c3d44))
- **mux-uploader:** move some dom elements around to make eventual overlay (re)styling a bit easier. ([919072a](https://github.com/muxinc/elements/commit/919072a8ba0788c4f154684415db21ec37d2e5df))
- **mux-uploader:** Simplify mux-uploader-drop styling. Update vanilla uploader example to demo usage with simplified styling. ([8029a1d](https://github.com/muxinc/elements/commit/8029a1d48cf9a1651b26d7a4740abb4d0ef182a4))

# 0.1.0-beta.2 (2022-07-05)

### Bug Fixes

- **mux-uploader:** Make progress, errors, completion accessible to VoiceOver. ([59e115c](https://github.com/muxinc/elements/commit/59e115c8bd5fd79d920343b238817bfbbdfd2c55))

### Features

- **mux-uploader:** Initial implementation of the mux-uploader element. ([b30717d](https://github.com/muxinc/elements/commit/b30717d41c0b2cc9c564bec681bd7ca109b1ce27))

# 0.1.0-beta.1 (2022-06-23)

### Features

- **mux-uploader:** Initial implementation of the mux-uploader element. ([b30717d](https://github.com/muxinc/elements/commit/b30717d41c0b2cc9c564bec681bd7ca109b1ce27))
