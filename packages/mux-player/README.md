<p align="center">
  <h1 align="center">&lt;mux-player&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux-elements/mux-player?interval=30"><img src="https://img.shields.io/npm/dm/@mux-elements/mux-player.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux-elements/mux-player"><img src="https://img.shields.io/npm/v/@mux-elements/mux-player.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux-elements/mux-player"><img src="https://img.shields.io/npm/l/@mux-elements/mux-player.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<mux-player>` is the official Mux-flavored video player web component.

The player UI is built on [`<media-chrome>`](https://github.com/muxinc/media-chrome/) and [`<mux-video>`](https://github.com/muxinc/elements/tree/main/packages/mux-video) drives the core video logic used to play Mux Video content that Just Works.

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux-elements/mux-player
```

or

```
npm i @mux-elements/mux-player
```

Then, import the library into your application with either `import` or `require`:

```js
import "@mux-elements/mux-player";
```

or

```js
require("@mux-elements/mux-player");
```

## CDN option

Alternatively, use the CDN hosted version of this package:

```html
<script src="https://unpkg.com/@mux-elements/mux-player@0.1"></script>
```

## Features and benefits

`<mux-player>` is a fully functional Video Player for the web with dirt simple integration to [Mux Video](https://docs.mux.com/guides/video) and [Mux Data](https://docs.mux.com/guides/data/monitor-hls-js).

`<mux-player>` provides a responsive UI based on player dimensions and stream type, automatic thumbnail previews and poster images, and built-in integration with Mux Data.

`<mux-player>` will use the optimal [Hls.js](https://github.com/video-dev/hls.js) settings for Mux Video so you don't have to worry about that. `<mux-player>` will also periodically test new versions of Hls.js and upgrade to known stable versions so you don't have to worry about upgrading to a new version of Hls.js yourself.

## Usage

Loading this library in the browser will register a [custom web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for `<mux-player>`.

Now you are free to use this web component in your HTML, just as you would with the HTML5 `<video>` element.

```html
<body>
  <p></p>

  <mux-player
    playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
    env-key="mux-data-env-key"
    metadata-video-title="Big Buck Bunny"
    metadata-viewer-user-id="user-id-1234"
    stream-type="on-demand"
    controls
  ></mux-player>
</body>
```

### Attributes

| Attribute                 | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                      | Default       |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `playback-id`             | `string`                             | The playback ID for your Mux Asset or Mux Live Stream. This will also be used for automatically assigning a [poster image](https://docs.mux.com/guides/video/get-images-from-a-video) and (thumbnail previews)[https://docs.mux.com/guides/video/create-timeline-hover-previews]. For more, check out the [Mux Docs](https://docs.mux.com/guides/video/play-your-videos#1-get-your-playback-id). | N/A           |
| `env-key`                 | `string`                             | Your Mux Data environment key. Note that this is different than your API Key. Get your env key from the "Mux Data" part of your [Mux Environments Dashboard](https://dashboard.mux.com/environments). If undefined, the environment will be inferred based on your Mux Video asset.                                                                                                              | `undefined`   |
| `playback-token`          | `string`                             | The playback token for signing the `src` URL.                                                                                                                                                                                                                                                                                                                                                    | N/A           |
| `thumbnail-token`         | `string`                             | The thumbnail token for signing the `poster` URL.                                                                                                                                                                                                                                                                                                                                                | N/A           |
| `storyboard-token`        | `string`                             | The storyboard token for signing the storyboard URL.                                                                                                                                                                                                                                                                                                                                             | N/A           |
| `stream-type`             | `"on-demand" \| "live" \| "ll-live"` | The type of stream associated with your Mux Asset. Used to determine what UI/controls to show and what optimizations to make for playback.                                                                                                                                                                                                                                                       | `"on-demand"` |
| `metadata-video-title`    | `string`                             | This is an arbitrary title for your video that will be passed in as metadata into Mux Data. Adding a title will give you useful context in your Mux Data dashboard. (optional, but encouraged)                                                                                                                                                                                                   | N/A           |
| `metadata-viewer-user-id` | `string`                             | If you have a logged-in user this should be an anonymized ID value that maps back to the user in your database. Take care to not expose personal identifiable information like names, usernames or email addresses. (optional, but encouraged)                                                                                                                                                   | N/A           |
| `metadata-video-id`       | `string`                             | This is an arbitrary ID that should map back to a record of this video in your database.                                                                                                                                                                                                                                                                                                         | N/A           |
| `debug`                   | `boolean`                            | Enables debug mode for the underlying playback engine (currently hls.js) and mux-embed, providing additional information in the console.                                                                                                                                                                                                                                                         | `false`       |
| `start-time`              | `number` (seconds)                   | Specify where in the media's timeline you want playback to start.                                                                                                                                                                                                                                                                                                                                | `0`           |
| `prefer-mse`              | `boolean`                            | Use the underlying playback engine (currently hls.js), even if native playback is supported (e.g. in Safari). For more, see the section on [`prefer-mse`](#prefer-mse)                                                                                                                                                                                                                           | `false`       |
| `default-hidden-captions` | `boolean`                            | Hide captions by default instead of showing them on initial load (when available)                                                                                                                                                                                                                                                                                                                | `false`       |
| `forward-seek-offset`     | `number` (seconds)                   | Offset applied to the forward seek button                                                                                                                                                                                                                                                                                                                                                        | `10`          |
| `backward-seek-offset`    | `number` (seconds)                   | Offset applied to the backward seek button                                                                                                                                                                                                                                                                                                                                                       | `10`          |
| `primary-color`           | (Any valid CSS color style)          | The primary color used by the player                                                                                                                                                                                                                                                                                                                                                             | N/A           |
| `secondary-color`         | (Any valid CSS color style)          | The secondary color used by the player                                                                                                                                                                                                                                                                                                                                                           | N/A           |
| `volume`                  | `number` (0-1)                       | Sets the volume of the player from 0 to 1.                                                                                                                                                                                                                                                                                                                                                       | Varies        |
| `muted`                   | `boolean`                            | Toggles the muted state of the player.                                                                                                                                                                                                                                                                                                                                                           | Varies        |
| `autoplay`                | `boolean`                            | Toggles whether or not media should auto-play when initially loaded                                                                                                                                                                                                                                                                                                                              | false         |
| `playback-rate`           | `number`                             | Applies a multiplier to the media's playback rate, either speeding it up or slowing it down.                                                                                                                                                                                                                                                                                                     | `1`           |
| `loop`                    | `boolean`                            | Automatically loop playback of your media when it finishes.                                                                                                                                                                                                                                                                                                                                      | `false`       |
| `poster`                  | `string` (URL)                       | Assigns a poster image URL. Will use the automatically generated poster based on your playback-id by default.                                                                                                                                                                                                                                                                                    | Derived       |

### Methods

| Method    | Description                   |
| --------- | ----------------------------- |
| `play()`  | Begins playback of the media. |
| `pause()` | Pauses the media playback.    |

### Properties

| Prop                                          | Description                                                                                                                                                                                                                                                                                                         | Default     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `autoplay`                                    | A `Boolean` that reflects the autoplay HTML attribute, indicating whether playback should automatically begin as soon as enough media is available to do so without interruption.                                                                                                                                   | `false`     |
| `buffered` <sub><sup>Read only</sup></sub>    | Returns a `TimeRanges` object that indicates the ranges of the media source that the browser has buffered (if any) at the moment the buffered property is accessed.                                                                                                                                                 | `undefined` |
| `controls`                                    | Is a Boolean that reflects the controls HTML attribute, indicating whether user interface items for controlling the resource should be displayed.                                                                                                                                                                   | `false`     |
| `crossOrigin`                                 | A DOMString indicating the CORS setting for this media element.                                                                                                                                                                                                                                                     | `null`      |
| `currentTime`                                 | A double-precision floating-point value indicating the current playback time in seconds; if the media has not started to play and has not been seeked, this value is the media's initial playback time. Setting this value seeks the media to the new time. The time is specified relative to the media's timeline. | `0`         |
| `duration` <sub><sup>Read only</sup></sub>    | A read-only double-precision floating-point value indicating the total duration of the media in seconds. If no media data is available, the returned value is `NaN`. If the media is of indefinite length (such as streamed live media, a WebRTC call's media, or similar), the value is `+Infinity`.               | `NaN`       |
| `ended` <sub><sup>Read only</sup></sub>       | Returns a `Boolean` that indicates whether the media element has finished playing.                                                                                                                                                                                                                                  | `false`     |
| `loop`                                        | A `Boolean` that reflects the loop HTML attribute, which indicates whether the media element should start over when it reaches the end.                                                                                                                                                                             | `false`     |
| `metadata`                                    | The metadata property can be used to set the Mux Data metadata properties in an easy way. Take a look at the [metadata guide](https://docs.mux.com/guides/data/make-your-data-actionable-with-metadata) to view an exhaustive list of available values.                                                             | `{}`        |
| `muted`                                       | Is a `Boolean` that determines whether audio is muted. `true` if the audio is muted and `false` otherwise.                                                                                                                                                                                                          | `false`     |
| `paused` <sub><sup>Read only</sup></sub>      | Returns a `Boolean` that indicates whether the media element is paused.                                                                                                                                                                                                                                             | `true`      |
| `playbackRate`                                | Is a double that indicates the rate at which the media is being played back.                                                                                                                                                                                                                                        | `1`         |
| `playsInline`                                 | A Boolean attribute indicating that the video is to be played "inline", that is within the element's playback area. Note that the absence of this attribute does not imply that the video will always be played in fullscreen.                                                                                      | `false`     |
| `preload`                                     | Is a `DOMString` that reflects the preload HTML attribute, indicating what data should be preloaded, if any. Possible values are: `none`, `metadata`, `auto`.                                                                                                                                                       | `undefined` |
| `src`                                         | Is a `String` that reflects the src HTML attribute, which contains the URL of a media resource to use.                                                                                                                                                                                                              | `undefined` |
| `tokens`                                      | The tokens property accepts an object with the following signature `{ playback: string, thumbnail: string, storyboard: string }`. Use it to set all the signing URL tokens in one go.                                                                                                                               | `{}`        |
| `videoHeight` <sub><sup>Read only</sup></sub> | Returns an unsigned integer value indicating the intrinsic height of the resource in CSS pixels, or 0 if no media is available yet.                                                                                                                                                                                 | `0`         |
| `videoWidth` <sub><sup>Read only</sup></sub>  | Returns an unsigned integer value indicating the intrinsic width of the resource in CSS pixels, or 0 if no media is available yet.                                                                                                                                                                                  | `0`         |
| `volume`                                      | Is a double indicating the audio volume, from 0.0 (silent) to 1.0 (loudest).                                                                                                                                                                                                                                        | `1`         |

### Events

`<mux-player>` has a number of events for media loading, playback, and the player itself. Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of `<mux-player>`.

| Event            | Description                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `abort`          | Fired when the resource was not fully loaded, but not as the result of an error.                                                                                                          |
| `canplay`        | Fired when the user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. |
| `canplaythrough` | Fired when the user agent can play the media, and estimates that enough data has been loaded to play the media up to its end without having to stop for further buffering of content.     |
| `durationchange` | Fired when the duration property has been updated.                                                                                                                                        |
| `emptied`        | Fired when the media has become empty; for example, when the media has already been loaded (or partially loaded), and the HTMLMediaElement.load() method is called to reload it.          |
| `ended`          | Fired when playback stops when end of the media (`<audio>` or `<video>`) is reached or because no further data is available.                                                              |
| `error`          | Fired when the resource could not be loaded due to an error.                                                                                                                              |
| `loadeddata`     | Fired when the first frame of the media has finished loading.                                                                                                                             |
| `loadedmetadata` | Fired when the metadata has been loaded.                                                                                                                                                  |
| `loadstart`      | Fired when the browser has started to load a resource.                                                                                                                                    |
| `pause`          | Fired when a request to pause play is handled and the activity has entered its paused state, most commonly occurring when the media's `HTMLMediaElement.pause()` method is called.        |
| `play`           | Fired when the paused property is changed from true to false, as a result of the `HTMLMediaElement.play()` method, or the `autoplay` attribute.                                           |
| `playing`        | Fired when playback is ready to start after having been paused or delayed due to lack of data.                                                                                            |
| `progress`       | Fired periodically as the browser loads a resource.                                                                                                                                       |
| `ratechange`     | Fired when the playback rate has changed.                                                                                                                                                 |
| `resize`         | Fired when one or both of the videoWidth and videoHeight properties have just been updated.                                                                                               |
| `seeked`         | Fired when a seek operation complete.                                                                                                                                                     |
| `seeking`        | Fired when a seek operation begin.                                                                                                                                                        |
| `stalled`        | Fired when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.                                                                                        |
| `suspend`        | Fired when the media data loading has been suspended.                                                                                                                                     |
| `timeupdate`     | Fired when the time indicated by the currentTime property has been updated.                                                                                                               |
| `volumechange`   | Fired when the volume has changed.                                                                                                                                                        |
| `waiting`        | Fired when playback has stopped because of a temporary lack of data.                                                                                                                      |

### Metadata

To go above and beyond `metadata-*` attributes

To set other available metadata fields use the `metadata` property on the `<mux-player>` element like so:

```html
<mux-player
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  env-key="mux-data-env-key"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  controls
>
</mux-player>

<script>
  const muxVideo = document.querySelector("mux-player");
  muxVideo.metadata = {
    experiment_name: "landing_page_v3",
    video_content_type: "clip",
    video_series: "season 1",
  };
</script>
```

Take a look at the [metadata guide](https://docs.mux.com/guides/data/make-your-data-actionable-with-metadata) to view an exhaustive list of available values.

### prefer-mse

By default `<mux-player>` will try to use native playback via the underlying `<video/>` tag whenever possible. However, it can also instead use an in-code player when the browser browser supports [Media Source Extension](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API). This includes MSE in Mac OS Safari.

If you prefer to use the in-code MSE-based engine (currently hls.js) whenever possible, then pass in the `prefer-mse` attribute.

```html
<mux-player
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  env-key="mux-data-env-key"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  prefer-mse
  controls
>
</mux-player>
```

### Signed URLs and other playback query params

Mux supports a number of query parameters on HLS playback URLs. Most commonly is the `token=` param [used for signed URLs](https://docs.mux.com/guides/video/secure-video-playback).

In order to use `token=` -- or any other query params, pass them through with the `playback-id` attribute:

```
playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe?token=jwt-signed-token"
```
