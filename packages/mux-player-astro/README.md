<p align="center">
  <h1 align="center">&lt;MuxPlayer/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-player-astro?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-player-astro.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player-astro"><img src="https://img.shields.io/npm/v/@mux/mux-player-astro.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-player-astro"><img src="https://img.shields.io/npm/l/@mux/mux-player-astro.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<MuxPlayer />` is a Mux-flavored Astro video player component, built on top of our [mux-player web component](../mux-player) and [Media Chrome](https://media-chrome.org).

# Installation

```shell
npm install @mux/mux-player-astro
```

or

```shell
yarn add @mux/mux-player-astro
```

# Usage

## Basic Usage

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---

<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata={{
    video_title: 'Big Buck Bunny',
    viewer_user_id: 'user-id-1234',
  }}
/>
```

## With Styling

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---

<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  style={{
    display: 'block',
    aspectRatio: '16/9',
    backgroundColor: '#000',
  }}
  autoplay
  muted
  streamType="on-demand"
  proudlyDisplayMuxBadge
/>
```

## With Themes

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
import classic from '@mux/mux-player-astro/themes/classic';
---

<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  theme={classic}
  style={{
    display: 'block',
    aspectRatio: '16/9',
  }}
/>
```

Available themes:
- `classic` - Classic player theme
- `minimal` - Minimal player theme  
- `microvideo` - Microvideo theme for short-form content
- `gerwig` - P, pretty, I, intelligent, N, never sad, K, cool
- `news` - News theme

Alternatively you can use a [Media Chrome theme](https://www.mux.com/docs/guides/player-themes#media-chrome-themes) by passing the theme name as a string:

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---
<template id="tiny-theme">
  <media-controller>
    <slot name="media" slot="media"></slot>
    <media-control-bar>
      <media-play-button></media-play-button>
    </media-control-bar>
  </media-controller>
</template>
<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  mediaChromeTheme="tiny-theme"
/>
```

## With Event Handling

To add event listeners to the component you can use [a client-side script](https://docs.astro.build/en/guides/client-side-scripts/). You can get the correct types for the player element by importing `MuxPlayerElement` from `@mux/mux-player-astro` and casting the element to that type.

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---

<MuxPlayer
  id="my-player"
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
/>

<script>
  import type { MuxPlayerElement } from '@mux/mux-player-astro';
  
  const player = document.getElementById('my-player') as MuxPlayerElement;
  
  player.addEventListener('play', (event) => {
    console.log('Player started playing!');
  });
  
  player.addEventListener('pause', (event) => {
    console.log('Player paused!');
  });
  
  player.addEventListener('timeupdate', (event) => {
    console.log('Current time: ', player.currentTime);
  });
  
  player.addEventListener('ended', (event) => {
    console.log('Video ended!');
  });
</script>
```

## Audio Content

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---

<MuxPlayer
  playbackId="your-audio-playback-id"
  audio
  metadata={{
    video_title: 'My Podcast Episode',
  }}
/>
```

## Live Streams

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---

<MuxPlayer
  playbackId="your-live-playback-id"
  streamType="live"
  targetLiveWindow={Infinity}
  title="Live Stream"
/>
```

## Custom Colors

```astro
---
import { MuxPlayer } from '@mux/mux-player-astro';
---

<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  primaryColor="#ff6b35"
  secondaryColor="#ffffff"
  accentColor="#0066cc"
/>
```

# Props

All props from the underlying `mux-player` web component are supported, including:

## Core Props
- `playbackId` - Mux playback ID for the video
- `src` - Direct video URL (alternative to playbackId)
- `poster` - Poster image URL
- `audio` - Enable audio-only mode

## Playback Props
- `autoplay` - Auto-start playback
- `muted` - Start muted
- `loop` - Loop the video
- `playsInline` - Play inline on mobile
- `currentTime` - Set initial playback position
- `playbackRate` - Playback speed (1.0 = normal)

## Stream Props
- `streamType` - Type of stream ('on-demand', 'live', 'll-live')
- `targetLiveWindow` - Live stream window duration

## Metadata Props
- `metadata` - Object with video_id, video_title, viewer_user_id
- `envKey` - Environment key for Mux Data
- `customDomain` - Custom domain for video delivery

## UI Props
- `theme` - Player theme component
- `primaryColor` - Primary UI color
- `secondaryColor` - Secondary UI color
- `accentColor` - Accent UI color
- `proudlyDisplayMuxBadge` - Show Mux badge

## Advanced Props
- `tokens` - Signed tokens for private videos
- `storyboardSrc` - Custom storyboard/thumbnail track
- `chapters` - Chapter markers
- `renditionOrder` - Quality selection ordering
- `maxResolution` - Maximum playback resolution
- `minResolution` - Minimum playback resolution

# Docs

Docs and guides live on [docs.mux.com](https://docs.mux.com/guides/video/mux-player?utm_source=github-mux-player).

API reference lives [on Github](../mux-player/REFERENCE.md).