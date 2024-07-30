<p align="center">
  <h1 align="center">&lt;mux-video/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-video?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-video.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-video"><img src="https://img.shields.io/npm/v/@mux/mux-video.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-video"><img src="https://img.shields.io/npm/l/@mux/mux-video.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<mux-video></mux-video>` is a Mux-flavored HTML5 video element.

If you are familiar with using `<video />` + [Hls.js](https://github.com/video-dev/hls.js) in your application, then you'll feel right at home with this web component.

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux/mux-video
```

or

```
npm i @mux/mux-video
```

Then, import the library into your application with either `import` or `require`:

```js
import '@mux/mux-video';
```

or

```js
require('@mux/mux-video');
```

## CDN option

Alternatively, use the CDN hosted version of this package:

```html
<script src="https://cdn.jsdelivr.net/npm/@mux/mux-video@0"></script>
```

If you are using ECMAScript modules, you can also load the `mux-video.mjs` file with `type=module`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@mux/mux-video@0/dist/mux-video.mjs"></script>
```

## Features and benefits

Without `<mux-video>` if you want to use the browser built-in HTML5 video element for playback you would have to wire up [Hls.js](https://github.com/video-dev/hls.js) and [Mux Data](https://docs.mux.com/guides/data/monitor-hls-js) yourself.

`<mux-video>` will automatically handle recoverable errors that happen during video playback. This is particularly handy for live streams that may experience disconnects.

`<mux-video>` will use the optimial Hls.js settings for Mux Video so you don't have to worry about that. `<mux-video>` will also periodically test new versions of Hls.js and upgrade to known stable versions so you don't have to worry about upgrading to a new version of Hls.js yourself.

## Usage

Loading this library in the browser will register a [custom web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for `<mux-video>`.

Now you are free to use this web component in your HTML, just as you would with the HTML5 `<video>` element.

```html
<body>
  <mux-video
    playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
    metadata-video-title="Big Buck Bunny"
    metadata-viewer-user-id="user-id-1234"
    controls
  ></mux-video>
</body>
```

Attributes:

- `playback-id`: This is the playback ID for your Mux Asset or Mux Live Stream. The playback-id is the variable you may have used before to construct a `.m3u8` hls url like this:`https://stream.mux.com/{PLAYBACK_ID}.m3u8`. [Mux Docs](https://docs.mux.com/guides/video/play-your-videos#1-get-your-playback-id)
- `env-key`: This is the environment key for Mux Data. Note that this is different than your API Key. Get your env key from the "Mux Data" part of the Mux Dashboard. If undefined and you are playing a Mux Video asset, the environment will be inferred.

<img src="../../images/env-key.png" alt="Mux Data dashboard env key"></img>

- `max-resolution`: This can be used to cap or expand the maximum resolution of the video delivered. When using signed URLs this attribute will not work and instead you will need to include the `max_resolution` parameter in your signed token.
- `min-resolution`: This can be used to to cap or expand the minimum resolution of the video delivered. When using signed URLs this attribute will not work and instead you will need to include the `min_resolution` parameter in your signed token.
- `rendition-order`: Set to `"desc"` to make the renditions of the video delivered be sorted in descending resolution order, which can impact the initial resolution loaded. When using signed URLs this attribute will not work and instead you will need to include the `rendition_order` parameter in your signed token.
- `program-start-time`: Apply PDT-based [instant clips](https://docs.mux.com/guides/create-instant-clips) to the beginning of the media stream.
- `program-end-time`: Apply PDT-based [instant clips](https://docs.mux.com/guides/create-instant-clips) to the end of the media stream.
- `metadata-video-title`: This is an arbitrary title for your video that will be passed in as metadata into Mux Data. Adding a title will give you useful context in your Mux Data dashboard. (optional, but encouraged)
- `metadata-viewer-user-id`: If you have a logged-in user this should be an anonymized ID value that maps back to the user in your database. Take care to not expose personal identifiable information like names, usernames or email addresses. (optional, but encouraged)
- `metadata-video-id`: This is an arbitrary ID that should map back to a record of this video in your database.
- `metadata-*`: This syntax can be used to pass any other Mux Data metadata fields, for example `metadata-sub-property-id="123"`
- `start-time: number (seconds)`: Set this to start playback of your media at some time other than 0 (or the "live edge" for live/"DVR" content).
- `disable-tracking`: Disables Mux Data tracking. For more, check out the [Mux Docs](https://docs.mux.com/guides/data/monitor-html5-video-element#features)
- `disable-cookies`: Disables cookies used by Mux Data. For more, check out the [Mux Docs](https://docs.mux.com/guides/data/monitor-html5-video-element#disable-cookies).

All the other attributes that you would use on a `<video>` element like `poster`, `controls`, `muted` and `autoplay` are available and will work the same as they do with the HTML5 video element. One sidenote about `autoplay` though -- [read this to understand why that might not always work as expected](https://docs.mux.com/guides/video/web-autoplay-your-videos).

### Advanced: more metadata

To go above and beyond `metadata-*` attributes

To set other available metadata fields use the `metadata` property on the `<mux-video>` element like so:

```html
<mux-video
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  controls
>
</mux-video>

<script>
  const muxVideo = document.querySelector('mux-video');
  muxVideo.metadata = {
    experiment_name: 'landing_page_v3',
    video_content_type: 'clip',
    video_series: 'season 1',
  };
</script>
```

Instead of using the `metadata` property, you also have the option to specify a remote URL for fetching metadata asynchronously. In the example below you would have an API server running at `https://api.myapp.com/` and the specified endpoint should respond with JSON in the form of something like this:

```json
{
  "experiment_name": "landing_page_v3",
  "video_content_type": "clip",
  "video_series": "season 1"
}
```

When `metadata-url` is specified then `<mux-video>` will asychronously fetch the extra metadata without blocking the initial startup time.

```html
<mux-video
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  metadata-url="https://api.myapp.com/v1/metadata-endpoint.json"
  controls
>
</mux-video>
```

Take a look at the [metadata guide](https://docs.mux.com/guides/data/make-your-data-actionable-with-metadata) to view an exhaustive list of available values.

### Advanced: prefer-playback

By default `<mux-video>` will try to use native playback via the underlying `<video>` tag whenever possible.
However, it can also instead use an in-code player when the browser browser supports [Media Source Extension](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API).
This includes MSE in Mac OS Safari.

If you prefer to use the in-code MSE-based engine (currently hls.js) whenever possible, then set the `prefer-playback` attribute to `mse`.

```html
<mux-video
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  prefer-playback="mse"
  controls
>
</mux-video>
```

### Advanced: type

By default `<mux-video>` will try to figure out the type of media you're trying to play (for example, an HLS/m3u8 media source, an mp4, etc.) based the extension of the file from the `src` attribute's url. This allows `<mux-video>` to determine whether it can/should use an in-code player or native playback. By way of example, the code below has an identifiable "mp4" extension, so `<mux-video>` will rely on native plyaback via the underlying `<video/>` tag.

```html
<mux-video
  src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  prefer-playback="mse"
  controls
>
</mux-video>
```

Sometimes, however, your `src` URL may not have an identifiable extension. In these cases, we recommend relying on the `type` attribute, similar to the `<source/>` tag's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-type). Below is an example of explicitly declaring the MIME type for an HLS/m3u8 media source:

```html
<mux-video
  src="https://stream.notmux.com/path/to/an/hls/source/playlist"
  type="application/vnd.apple.mpegurl"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  prefer-playback="mse"
  controls
>
</mux-video>
```

Or, for convenience, we also support the shorthand `type="hls`:

```html
<mux-video
  src="https://stream.notmux.com/path/to/an/hls/source/playlist"
  type="hls"
  metadata-video-title="Big Buck Bunny"
  metadata-viewer-user-id="user-id-1234"
  prefer-playback="mse"
  controls
>
</mux-video>
```

### Advanced: Signed URLs and other playback query params

Mux supports a number of query parameters on HLS playback URLs. Most commonly is the `token=` param [used for signed URLs](https://docs.mux.com/guides/video/secure-video-playback).

In order to use `token=` -- or any other query params, pass them through with the `playback-id` attribute:

```
playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe?token=jwt-signed-token"
```

### Advanced: CuePoints

`<mux-video>` has an extended API for working with CuePoints metadata. This includes the `addCuePoints()` method to add CuePoints, `cuePoints` and `activeCuePoint` properties to get all CuePoints or the current active CuePoint (based on the element's `currentTime`), and the `cuepointchange` event, which fires whenever the `activeCuePoint` changes. The "shape" of a CuePoint is `{ time: number; value: any; }`, where `time` is the playback time you want the `CuePoint` to begin, and `value` is whatever (JSON-serializable) value is appropriate for your CuePoint use case.

To add CuePoints via `addCuePoint()`, simply pass in an array of CuePoints (as described above). Note that CuePoints are tied to the loaded media source, so: (a) you'll need to wait until the media source (`src` or `playback-id`) has loaded before adding any CuePoints; and (b) the CuePoints will be removed if you `unload()` the current media source or change it by re-setting e.g. `playback-id`. Below is a simple example of using CuePoints:

```html
<mux-video
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  controls
>
</mux-video>
<script>
  const muxVideoEl = document.querySelector('mux-video');
  function addCuePointsToElement() {
    const cuePoints = [
      { time: 1, value: 'Simple Value' },
      { time: 3, value: { complex: 'Complex Object', duration: 2 } },
      { time: 10, value: true },
      { time: 15, value: { anything: 'That can be serialized to JSON and makes sense for your use case' } }
    ];

    muxVideoEl.addCuePoints(cuePoints);
  }

  function cuePointChangeListener() {
    // Do something with the activeCuePoint here.
    console.log('Active CuePoint!', muxVideoEl.activeCuePoint);
  }

  //
  muxVideoEl.addEventListener('cuepointchange', cuePointChangeListener);
  // Here, we're `duration` and `'durationchange'` to determine if the `<mux-video>` element has loaded src. This also gives
  // us the opportunity to compare our intended CuePoints against the duration of the media source.
  // Note that you could use other events, such as `'loadedmetadata'` if that makes more sense for your use case.
  if (playerEl.duration) {
    addCuePointsToElement();
  } else {
    muxVideoEl.addEventListener('durationchange', addCuePointsToElement, { once: true });
  }
</script>
```

One last thing to note about CuePoints: Although they only have a single `time` value, if a user seeks between the `time` of two CuePoints, the `cuepointchange` event will still fire and the  `activeCuePoint` will be the earlier CuePoint. Using the example above for reference, we have a CuePoint with a `time` of `3` and another with a `time` of `10`. If a user seeks to `8`, the `activeCuePoint` will be the CuePoint with the `time` of `3`. This is intentional to cover as many use cases as possible. If you only care about the `activeCuePoint` when the `currentTime` is roughly
the same as the `time`, you can add some simple logic to account for that, e.g.:

```js
function cuePointChangeListener() {
  // Only do something with the activeCuePoint if we're playing "near" its `time`.
  const MARGIN_OF_ERROR = 1;
  if (Math.abs(muxVideoEl.currentTime - muxVideoEl.activeCuePoint.time) <= MARGIN_OF_ERROR) {
    console.log('Active CuePoint playing near its time!', muxVideoEl.activeCuePoint);
  }
}
```

### Advanced: Use with React+TypeScript

Even though we don't (yet!) have our own `React` version of `<mux-video>`, you can still use it in your `React` app. However, if you're also using TypeScript, make sure you add the following TypeScript definitions, since custom elements (like as `<mux-video>`) will not be recognized as [Intrinsic Elements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements):

```typescript
interface MuxVideoHTMLAttributes<T> extends React.VideoHTMLAttributes<T> {
  debug?: boolean;
  autoplay?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-video': React.DetailedHTMLProps<MuxVideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
    }
  }
}
```

### Advanced: Overriding Stream Type

Stream Type is an [extended media ui API](https://github.com/video-dev/media-ui-extensions/blob/main/proposals/0010-stream-type.md) that can be used with UI libraries such as [Media Chrome](https://www.media-chrome.org/en/get-started). By default and in general, you can/should rely on the stream type inferred from the `src`/`playbackId`. However, for some advanced use cases, you may want to override this value or set it in advance of loading media to either `"live"` or `"on-demand"`.

# FAQ

### If I'm using Mux, do I have to use this library?

No, you do not. The way Mux delivers HLS video is compliant with the HLS spec. Any video player that supports HLS will work with Mux Video.

### If I'm not using Mux Video, can I still use this library?

You sure can! Instead of passing in `playback-id=""` attribute, pass in `src=""` with an HLS url. You can still use `env-key=""` to get all the features of Mux Data with your non-Mux video.
