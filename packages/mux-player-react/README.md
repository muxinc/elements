<p align="center">
  <h1 align="center">&lt;MuxPlayer/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-player-react?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-player-react.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player-react"><img src="https://img.shields.io/npm/v/@mux/mux-player-react.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player-react"><img src="https://img.shields.io/npm/l/@mux/mux-player-react.svg?sanitize=true" alt="License"></a>
</p>

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
  streamType="on-demand"
/>;
```

### Lazy-loading

Defer loading of Mux Player by importing from `@mux/mux-player-react/lazy`.

> Note: `@mux/mux-player-react/lazy` is currently in development and may not follow the semantic versioning of mux-player or mux-player-react. Changes in behavior will be documented in the release notes; please check them when upgrading.

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
  streamType="on-demand"
/>;
```

#### Styling `@mux/mux-player-react/lazy`

Because `@mux/mux-player-react/lazy` adds a wrapper around mux-player to achieve its effect, use `[data-mux-player-react-lazy]` instead of `mux-player` as its CSS selector. For example:

```css
/* This will not work */
mux-player {
  aspect-ratio: 1;
  max-width: 50%;
}

/* do this instead to target the mux-player-react/lazy wrapper */
[data-mux-player-react-lazy] {
  aspect-ratio: 1;
  max-width: 50%:
}
```

> If you are styling with `className` or `style`, everything will work as expected! Nothing to change here.

#### Customizing `@mux/mux-player-react/lazy`'s placeholder

`@mux/mux-player-react/lazy` will display the contents of mux-player's `placeholder=` attribute as a background image.

If you are generating your pages with a Node.js server (for example, [Next.js](https://nextjs.org/docs/basic-features/data-fetching/)), consider using `@mux/mux-player-react/lazy` with [`@mux/blurhash`](https://github.com/muxinc/blurhash) to generate a placeholder to display during loading.

If you want to apply CSS _just_ to the placeholder, use the css selector `[data-mux-player-react-lazy-placeholder]`. 

# Docs

Docs and guides live on [docs.mux.com](https://docs.mux.com/guides/video/mux-player?utm_source=github-mux-player).

API reference lives [on Github](./REFERENCE.md).
