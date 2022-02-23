<p align="center">
  <h1 align="center">&lt;MuxPlayer/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux-elements/mux-player-react?interval=30"><img src="https://img.shields.io/npm/dm/@mux-elements/mux-player-react.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux-elements/mux-player-react"><img src="https://img.shields.io/npm/v/@mux-elements/mux-player-react.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux-elements/mux-player-react"><img src="https://img.shields.io/npm/l/@mux-elements/mux-player-react.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<MuxPlayer/>` is a Mux-flavored React video player component, built on top of our [mux-player web componnent](../mux-player/README.md) and used to play Mux Video content that Just Works.

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux-elements/mux-player-react
```

or

```
npm i @mux-elements/mux-player-react
```

Then, import the library into your application with either `import` or `require`:

```js
import MuxPlayer from "@mux-elements/mux-player-react";
```

or

```js
const MuxPlayer = require("@mux-elements/mux-player-react");
```

## Features and benefits

`<MuxPlayer/>` is a fully functional Video Player for the web with dirt simple integration to [Mux Video](https://docs.mux.com/guides/video) and [Mux Data](https://docs.mux.com/guides/data/monitor-hls-js).

`<MuxPlayer/>` provides a responsive UI based on player dimensions and stream type, automatic thumbnail previews and poster images, and built-in integration with Mux Data.

`<MuxPlayer/>` will use the optimial Hls.js settings for Mux Video so you don't have to worry about that. `<MuxPlayer/>` will also periodically test new versions of Hls.js and upgrade to known stable versions so you don't have to worry about upgrading to a new version of Hls.js yourself.

## Usage

Under the hood, loading this library in the browser will register a [custom web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for `<mux-player>`, but we present you with a "React-flavored" component to use it. Here's a simple example:

```jsx
const MuxPlayerExample = () => {
  return (
    <div>
      <h1>Simple MuxPlayer Example</h1>
      <MuxPlayer
        style={{ height: "100%", maxWidth: "100%" }}
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        metadata={{
          video_id: "video-id-123456",
          video_title: "Super Interesting Video",
          viewer_user_id: "user-id-bc-789",
        }}
        envKey="YOUR_MUX_DATA_ENV_KEY"
        streamType="on-demand"
        autoPlay
        muted
      />
    </div>
  );
};
```

### Props

| Prop                    | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                      | Default       |
| ----------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `playbackId`            | `string`                             | The playback ID for your Mux Asset or Mux Live Stream. This will also be used for automatically assigning a [poster image](https://docs.mux.com/guides/video/get-images-from-a-video) and (thumbnail previews)[https://docs.mux.com/guides/video/create-timeline-hover-previews]. For more, check out the [Mux Docs](https://docs.mux.com/guides/video/play-your-videos#1-get-your-playback-id). | N/A           |
| `envKey`                | `string`                             | Your Mux Data environment key. Note that this is different than your API Key. Get your env key from the "Mux Data" part of your [Mux Environments Dashboard](https://dashboard.mux.com/environments).                                                                                                                                                                                            | N/A           |
| `streamType`            | `"on-demand" \| "live" \| "ll-live"` | The type of stream associated with your Mux Asset. Used to determine what UI/controls to show and what optimizations to make for playback.                                                                                                                                                                                                                                                       | `"on-demand"` |
| `metadata`              | `object`\*                           | An object for configuring any metadata you'd like to send to Mux Data. For more, see the [Metadata section](#metadata), below.                                                                                                                                                                                                                                                                   | N/A           |
| `debug`                 | `boolean`                            | Enables debug mode for the underlying playback engine (currently hls.js) and mux-embed, providing additional information in the console.                                                                                                                                                                                                                                                         | `false`       |
| `startTime`             | `number` (seconds)                   | Specify where in the media's timeline you want playback to start.                                                                                                                                                                                                                                                                                                                                | `0`           |
| `preferMse`             | `boolean`                            | Use the underlying playback engine (currently hls.js), even if native playback is supported (e.g. in Safari). For more, see the section on [`preferMse`](#preferMse)                                                                                                                                                                                                                             | `false`       |
| `defaultHiddenCaptions` | `boolean`                            | Hide captions by default instead of showing them on initial load (when available)                                                                                                                                                                                                                                                                                                                | `false`       |
| `forwardSeekOffset`     | `number` (seconds)                   | Offset applied to the forward seek button                                                                                                                                                                                                                                                                                                                                                        | `10`          |
| `backwardSeekOffset`    | `number` (seconds)                   | Offset applied to the backward seek button                                                                                                                                                                                                                                                                                                                                                       | `10`          |
| `primaryColor`          | (Any valid CSS color style)          | The primary color used by the player                                                                                                                                                                                                                                                                                                                                                             | N/A           |
| `secondaryColor`        | (Any valid CSS color style)          | The secondary color used by the player                                                                                                                                                                                                                                                                                                                                                           | N/A           |
| `tertiaryColor`         | (Any valid CSS color style)          | The tertiary color used by the player                                                                                                                                                                                                                                                                                                                                                            | N/A           |
| `currentTime`           | `number` (seconds)                   | Sets the current time of the media                                                                                                                                                                                                                                                                                                                                                               | N/A           |
| `volume`                | `number` (0-1)                       | Sets the volume of the player from 0 to 1.                                                                                                                                                                                                                                                                                                                                                       | Varies        |
| `muted`                 | `boolean`                            | Toggles the muted state of the player.                                                                                                                                                                                                                                                                                                                                                           | Varies        |
| `paused`                | `boolean`                            | Toggles the paused state of the player                                                                                                                                                                                                                                                                                                                                                           | N/A           |
| `autoPlay`              | `boolean`                            | Toggles whether or not media should auto-play when initially loaded                                                                                                                                                                                                                                                                                                                              | N/A           |
| `playbackRate`          | `number`                             | Applies a multiplier to the media's playback rate, either speeding it up or slowing it down.                                                                                                                                                                                                                                                                                                     | `1`           |
| `loop`                  | `boolean`                            | Automatically loop playback of your media when it finishes.                                                                                                                                                                                                                                                                                                                                      | `false`       |
| `playsInline`           | `boolean`                            | Set to assert that media should be played inline. Useful for mobile playback cases.                                                                                                                                                                                                                                                                                                              | `false`       |
| `crossOrigin`           | `string`                             | Establishes various CORS policies. For more details, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-crossorigin)                                                                                                                                                                                                                                                 | N/A           |
| `poster`                | `string` (URL)                       | Assigns a poster image URL. Will use the automatically generated poster based on your playback-id by default.                                                                                                                                                                                                                                                                                    | Derived       |

### Callbacks

`<MuxPlayer/>` has a number of callbacks associated with events for media loading, playback, and the player itself.

| Prop               | Description                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `onLoadStart`      | Invoked when the media starts loading                                                                                                |
| `onLoadedMetadata` | Invoked when the media's metadata has loaded                                                                                         |
| `onProgress`       | Description                                                                                                                          |
| `onDurationChange` | Invoked when the media's duration changes, generally either because live media is coming to an end or a new playback-id has been set |
| `onVolumeChange`   | Invoked when the player's volume changes                                                                                             |
| `onRateChange`     | Invoked when the player's playbackRate changes                                                                                       |
| `onResize`         | Invoked when the player resizes                                                                                                      |
| `onWaiting`        | Invoked when playback is waiting to load more media to play (rebuffering).                                                           |
| `onPlay`           | Invoked when playback begins                                                                                                         |
| `onPlaying`        | Invoked when playback is ready after e.g. a pause or temporary rebuffering                                                           |
| `onPause`          | Invoked when playback is paused                                                                                                      |
| `onTimeUpdate`     | Invoked when the media's currentTime changes, either from playback or seeking                                                        |
| `onSeeking`        | Invoked when an attempt to seek forward or backward in the media begins                                                              |
| `onSeeked`         | Invoked when an attempt to seek forward or backward in the media finishes                                                            |
| `onEnded`          | Invoked when media playback reaches the end of the media                                                                             |
| `onError`          | Invoked when an error occurs in playback or in the player                                                                            |

### Metadata

Providing Mux Data Metadata allows you to take full advantage of analytics and make the data more actionable, even getting metrics on how many [unique viewers your content has](https://docs.mux.com/guides/data/see-how-many-people-are-watching)
For a detailed discussion of the available metadata fields and what they represent, check out the [Mux Data docs](https://docs.mux.com/guides/data/make-your-data-actionable-with-metadata). A few high priority keys that you'll likely want to set are:

- `video_id: string`: Your internal ID for the video.
- `video_title: string`: Title of the video player (e.g.: 'Awesome Show: Pilot')
- `viewer_user_id: string`: An ID representing the viewer who is watching the stream. Use this to look up video views for an individual viewer. If no value is specified, a unique ID will be generated by the SDK. Note: You should not use any value that is personally identifiable on its own (such as email address, username, etc). Instead, you should supply an anonymized viewer ID which you have stored within your own system.

Example:

```jsx
<MuxPlayer
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata={{
    video_id: "video-id-123456",
    video_title: "Super Interesting Video",
    viewer_user_id: "user-id-bc-789",
  }}
  envKey="YOUR_MUX_DATA_ENV_KEY"
/>
```

### preferMse

By default `<MuxPlayer/>` will try to use native playback via the underlying `<video/>` tag whenever possible. However, it can also instead use an in-code player as long as the browser supports [Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API). This includes MSE in Mac OS Safari.

If you prefer to use the in-code MSE-based engine (currently hls.js) whenever possible, then simply set the `preferMse` prop.

Example:

```jsx
<MuxPlayer
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata={{
    video_id: "video-id-123456",
    video_title: "Super Interesting Video",
    viewer_user_id: "user-id-bc-789",
  }}
  envKey="YOUR_MUX_DATA_ENV_KEY"
  preferMse
/>
```
