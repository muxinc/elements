# Props

| Prop                       | Type                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                      | Default                                                           |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `currentTime`              | `number`                                                            | Set initial playback position                                                                                                                                                                                                                                                                                                                                                                     | `0`                                                               |
| `poster`                   | `string` (URL)                                                      | Poster image URL                                                                                                                                                                                                                                                                                                                                                                                  | `undefined`                                                       |
| `playbackRate`             | `number`                                                            | Playback speed (1.0 = normal)                                                                                                                                                                                                                                                                                                                                                                    | `1`                                                               |
| `autoplay`                 | `boolean`                                                           | Auto-start playback                                                                                                                                                                                                                                                                                                                                                                               | `false`                                                           |
| `loop`                     | `boolean`                                                           | Loop the video                                                                                                                                                                                                                                                                                                                                                                                    | `false`                                                           |
| `playsInline`              | `boolean`                                                           | Play inline on mobile                                                                                                                                                                                                                                                                                                                                                                             | `false`                                                           |
| `muted`                    | `boolean`                                                           | Start muted                                                                                                                                                                                                                                                                                                                                                                                       | `false`                                                           |
| `audio`                    | `boolean`                                                           | Enable audio-only mode                                                                                                                                                                                                                                                                                                                                                                            | `false`                                                           |
| `primaryColor`             | `string` (Any valid CSS color style)                                | Primary UI color                                                                                                                                                                                                                                                                                                                                                                                  | `undefined`                                                       |
| `secondaryColor`           | `string` (Any valid CSS color style)                                | Secondary UI color                                                                                                                                                                                                                                                                                                                                                                                | `undefined`                                                       |
| `accentColor`              | `string` (Any valid CSS color style)                                | Accent UI color                                                                                                                                                                                                                                                                                                                                                                                   | `undefined`                                                       |
| `playbackId`               | `string`                                                            | Mux playback ID for the video                                                                                                                                                                                                                                                                                                                                                                    | `undefined`                                                       |
| `src`                      | `string` (URL)                                                      | Direct video URL (alternative to playbackId)                                                                                                                                                                                                                                                                                                                                                     | `undefined`                                                       |
| `customDomain`             | `string` (domain name)                                              | Custom domain for video delivery                                                                                                                                                                                                                                                                                                                                                                  | `undefined`                                                       |
| `envKey`                   | `string`                                                            | Environment key for Mux Data                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                                                       |
| `storyboardSrc`            | `string` (URL)                                                      | Custom storyboard/thumbnail track                                                                                                                                                                                                                                                                                                                                                                 | `undefined`                                                       |
| `chapters`                 | `object`                                                            | Chapter markers                                                                                                                                                                                                                                                                                                                                                                                   | `undefined`                                                       |
| `streamType`               | `"on-demand" \| "live" \| "ll-live"`                                 | Type of stream ('on-demand', 'live', 'll-live')                                                                                                                                                                                                                                                                                                                                                  | `"on-demand"`                                                     |
| `targetLiveWindow`         | `number`                                                            | Live stream window duration                                                                                                                                                                                                                                                                                                                                                                       | `undefined`                                                       |
| `maxResolution`            | `string`                                                            | Maximum playback resolution                                                                                                                                                                                                                                                                                                                                                                       | `undefined`                                                       |
| `minResolution`            | `string`                                                            | Minimum playback resolution                                                                                                                                                                                                                                                                                                                                                                       | `undefined`                                                       |
| `renditionOrder`           | `string`                                                            | Quality selection ordering                                                                                                                                                                                                                                                                                                                                                                        | `undefined`                                                       |
| `metadata`                 | `object`                                                            | Object with video_id, video_title, viewer_user_id                                                                                                                                                                                                                                                                                                                                                | `undefined`                                                       |
| `tokens`                   | `object`                                                            | Signed tokens for private videos                                                                                                                                                                                                                                                                                                                                                                  | `undefined`                                                       |
| `proudlyDisplayMuxBadge`   | `boolean`                                                           | Show Mux badge                                                                                                                                                                                                                                                                                                                                                                                    | `false`                                                           |
| `theme`                    | `string`                                                            | Player theme component                                                                                                                                                                                                                                                                                                                                                                            | `undefined`                                                       |


Available themes:
- `classic` - Classic player theme
- `minimal` - Minimal player theme
- `microvideo` - Microvideo theme for short-form content
- `gerwig` - P, pretty, I, intelligent, N, never sad, K, cool
- `news` - News theme

Alternatively you can use a [Media Chrome theme](https://www.mux.com/docs/guides/player-themes#media-chrome-themes) by passing the theme name as a string and including the theme `<template>` element with that ID in your page:

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
  theme="tiny-theme"
/>
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

# Events

`<MuxPlayer/>` supports all standard media events. To add event listeners to the component you can use [a client-side script](https://docs.astro.build/en/guides/client-side-scripts/). You can get the correct types for the player element by importing `MuxPlayerElement` from `@mux/mux-player-astro` and casting the element to that type.

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

## Available Events

| Event            | Description                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `abort`          | Identical to the native [`abort` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event)                                                                    |
| `canplay`        | Identical to the native [`canplay` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event)                                                                |
| `canplaythrough` | Identical to the native [`canplaythrough` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event)                                                  |
| `durationchange` | Identical to the native [`durationchange` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event)                                                  |
| `emptied`        | Identical to the native [`emptied` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event)                                                                |
| `ended`          | Identical to the native [`ended` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event)                                                                    |
| `error`          | Identical to the native [`error` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event)                                                                    |
| `loadeddata`     | Identical to the native [`loadeddata` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event)                                                          |
| `loadedmetadata` | Identical to the native [`loadedmetadata` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event)                                                  |
| `loadstart`      | Identical to the native [`loadstart` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event)                                                            |
| `pause`          | Identical to the native [`pause` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event)                                                                    |
| `play`           | Identical to the native [`play` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event)                                                                      |
| `playing`        | Identical to the native [`playing` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event)                                                                |
| `progress`       | Identical to the native [`progress` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event)                                                              |
| `ratechange`     | Identical to the native [`ratechange` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event)                                                          |
| `resize`         | Identical to the native [`resize` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/resize_event)                                                                  |
| `seeked`         | Identical to the native [`seeked` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event)                                                                  |
| `seeking`        | Identical to the native [`seeking` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event)                                                                |
| `stalled`        | Identical to the native [`stalled` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event)                                                                |
| `suspend`        | Identical to the native [`suspend` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event)                                                                |
| `timeupdate`     | Identical to the native [`timeupdate` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event)                                                          |
| `volumechange`   | Identical to the native [`volumechange` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event)                                                      |
| `waiting`        | Identical to the native [`waiting` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event)                                                                |
| `cuepointchange` | Similar to the native `TextTrack` [`cuechange` event](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/cuechange_event), only the event's `detail` will be the `activeCuePoint` |
| `chapterchange`  | Similar to the native `TextTrack` [`cuechange` event](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/cuechange_event), only the event's `detail` will be the `activeChapter`  |

# CSS Variables

See [mux-player's reference](../mux-player/REFERENCE.md#css-variables) for a list of all available CSS variables.

# CSS Parts

See [mux-player's reference](../mux-player/REFERENCE.md#css-parts) for a list of all available CSS parts.

# Slots

See [mux-player's reference](../mux-player/REFERENCE.md#slots) for a list of all available slots.
