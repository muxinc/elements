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
# Docs

Docs and guides live on [docs.mux.com](https://docs.mux.com/guides/video/mux-player?utm_source=github-mux-player).

API reference lives [on Github](../mux-player/REFERENCE.md).
