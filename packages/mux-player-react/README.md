<p align="center">
  <h1 align="center">&lt;MuxPlayer/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-player-react?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-player-react.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player-react"><img src="https://img.shields.io/npm/v/@mux/mux-player-react.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player-react"><img src="https://img.shields.io/npm/l/@mux/mux-player-react.svg?sanitize=true" alt="License"></a>
</p>

# New release: 3.0

Mux Player recently released 3.0. The most visible change in this is new tooltips that are enabled by default, as well as [other fixes and changes](https://docs.mux.com/guides/player-releases-web#300).

## Previous version: 2.0

For changes relating to the previous major release, 2.0, see the [V1 to V2 upgrade guide](https://github.com/muxinc/elements/blob/main/packages/mux-player/UPGRADING_V1_to_V2.md) and the [blog post announcement](https://www.mux.com/blog/mux-player-2-0-for-web-and-coming-soon-for-ios-and-android).

# Introduction

`<MuxPlayer />` is a Mux-flavored React video player component, built on top of our [mux-player web component](../mux-player) and [Media Chrome](https://media-chrome.org).

# Installation

```shell
npm install @mux/mux-player-react
```

or

```shell
yarn add @mux/mux-player-react
```

# Usage

```jsx
import MuxPlayer from '@mux/mux-player-react';

<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata={{
    video_id: 'video-id-123456',
    video_title: 'Bick Buck Bunny',
    viewer_user_id: 'user-id-bc-789',
  }}
/>;
```

### Lazy-loading

Defer loading of Mux Player by importing from `@mux/mux-player-react/lazy`.

```jsx
import MuxPlayer from '@mux/mux-player-react/lazy';

<MuxPlayer
  loading="viewport"
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata={{
    video_id: 'video-id-123456',
    video_title: 'Bick Buck Bunny',
    viewer_user_id: 'user-id-bc-789',
  }}
/>;
```

If you are generating your pages with a Node.js server (for example, [Next.js](https://nextjs.org/docs/basic-features/data-fetching/)), consider using `@mux/mux-player-react/lazy` with [`@mux/blurhash`](https://github.com/muxinc/blurhash) to generate a placeholder to display during loading.

# Docs

Docs and guides live on [docs.mux.com](https://docs.mux.com/guides/video/mux-player?utm_source=github-mux-player).

API reference lives [on Github](./REFERENCE.md).
