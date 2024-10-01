<p align="center">
  <h1 align="center">&lt;mux-player&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-player?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-player.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player"><img src="https://img.shields.io/npm/v/@mux/mux-player.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player"><img src="https://img.shields.io/npm/l/@mux/mux-player.svg?sanitize=true" alt="License"></a>
</p>

# New release: 3.0

Mux Player recently released 3.0. The most visible change in this is new tooltips that are enabled by default, as well as [other fixes and changes](https://docs.mux.com/guides/player-releases-web#300).

## Previous version: 2.0

For changes relating to the previous major release, 2.0, see the [V1 to V2 upgrade guide](https://github.com/muxinc/elements/blob/main/packages/mux-player/UPGRADING_V1_to_V2.md) and the [blog post announcement](https://www.mux.com/blog/mux-player-2-0-for-web-and-coming-soon-for-ios-and-android).

# Introduction

`<mux-player>` is the official Mux-flavored video player web component.

The player UI is built on [Media Chrome](https://media-chrome.org) and [`<mux-video>`](../mux-video) drives the core video logic used to play Mux Video content.

# Installation

```shell
npm install @mux/mux-player
```

or

```shell
yarn add @mux/mux-player
```

# Usage

```html
<mux-player
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
></mux-player>
```

# Docs

Docs and guides live on [docs.mux.com](https://docs.mux.com/guides/video/mux-player?utm_source=github-mux-player).

API reference lives [on Github](./REFERENCE.md).
