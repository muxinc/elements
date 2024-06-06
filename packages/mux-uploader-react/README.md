<p align="center">
  <h1 align="center">&lt;MuxUploader/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-uploader-react?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-uploader.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader-react"><img src="https://img.shields.io/npm/v/@mux/mux-uploader-react.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader-react"><img src="https://img.shields.io/npm/l/@mux/mux-uploader-react.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<MuxUploader>` is React component for uploading files to Mux.

`<MuxUploaderDrop>` is an optional supporting React component for drop-in drag and drop and overlay. You can always configure your own drag and drop with `<MuxUploader>`.

If you are looking for a direct upload interface and a progress bar, you're in the right place.

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux/mux-uploader-react
```

or

```
npm i @mux/mux-uploader-react
```

Then, import the library into your application with either `import` or `require`:

```js
import '@mux/mux-uploader-react';
```

or

```js
require('@mux/mux-uploader-react');
```

## Usage

```jsx
const MuxUploaderWithMuxUploaderDropExample = () => {
  return (
    <div>
      <h1>Simple MuxUploader and Mux Uploader Drop Examples</h1>
      {/* Rounded upload button by itself. Displays upload progress in text as percentage. */}
      <MuxUploader endpoint="authenticated-url" style={{ '--button-border-radius': '40px' }}></MuxUploader>

      {/* Upload button by itself. */}
      <MuxUploader endpoint="authenticated-url"></MuxUploader>

      {/* Upload button with access to optional supplentary drag and drop features. */}
      <MuxUploaderDrop mux-uploader="uploader">
        <MuxUploader endpoint="authenticated-url" id="uploader"></MuxUploader>
      </MuxUploaderDrop>
    </div>
  );
};
```

For a more complex implementation out in the wild, check out [stream.new](https://github.com/muxinc/stream.new/blob/main/pages/index.tsx#L152).

### Props

#### `<MuxUploader>`

| Property           | Type                | Description                                                                                                                                                                                                                                                                                                 | Default                                                          |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `endpoint`         | `string \| Promise` | Either a) the authenticated URL that your file will be uploaded to or b) an async function that yields a promise that resolves to that url. Check out the [direct uploads docs](https://docs.mux.com/guides/video/upload-files-directly#1-create-an-authenticated-mux-url) for how to create one. Required. | `undefined`                                                      |
| `id`               | `string`            | An ID that allows `<MuxUploaderDrop>` to locate `<MuxUploader>`. Required if you use `<MuxUploaderDrop>`.                                                                                                                                                                                                   | N/A                                                              |
| `dynamicChunkSize` | `boolean`           | Toggles uploading with dynamic chunk sizes. Chunk sizes will change with upload speed to attempt to optimize upload.                                                                                                                                                                                        | `false`                                                          |
| `useLargeFileWorkaround` | `boolean`           | Enables a less memory-efficient way of loading and chunking files for environments that don't reliably handle [`ReadableStream` for large files](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams). This can occur on e.g. Safari browsers with files >= 4GB.      | `false`       |

#### `<MuxUploaderDrop>`

| Property      | Type      | Description                                                | Default |
| ------------- | --------- | ---------------------------------------------------------- | ------- |
| `overlay`     | `boolean` | Toggles fullscreen overlay on dragover.                    | false   |
| `overlayText` | `string`  | Optional text to display on dragover when `overlay` is on. | `''`    |
| `muxUploader` | `string ` | Must match the `id` on `<MuxUploader>`. Required.          | N/A     |

### Callbacks

#### `<MuxUploader>`

`<MuxUploader>` has a handful of a number of callbacks associated with events to handle uploading state.

| Prop             | Description                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onUploadStart`  | Fired when the upload begins.                                                                                                                                        |
| `onChunkAttempt` | Invoked immediately before a chunk upload is attempted.                                                                                                              |
| `onChunkSuccess` | Invoked when an indvidual chunk is successfully uploaded. Sample response: `{ detail: { chunk: Integer, attempts: Integer, response: XhrResponse } }`                |
| `onUploadError`  | Invoked when an error occurs in the chunked upload process.                                                                                                          |
| `onProgress`     | Invoked continuously with incremental upload progress. This returns the current percentage of the file that's been uploaded. Sample response: `{ detail: [0..100] }` |
| `onSuccess`      | Invoked when the entire file has successfully completed uploading.                                                                                                   |

### Styling

`<MuxUploader>` and `<MuxUploaderDrop>` can be styled with standard CSS, but also includes these CSS variables for "under the hood" inline-styling.

#### `<MuxUploader>`

| Name                           | CSS Property       | Default Value       | Description                                             | Notes                                                                                             |
| ------------------------------ | ------------------ | ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--uploader-font-family`       | `font-family`      | `Arial`             | font family of the component                            | Applies to other elements as well: upload status and error status                                 |
| `--uploader-font-size`         | `font-size`        | `16px`              | font size for text within the component                 | Also applies to `<MuxUploaderDrop>` i.e. overlay text c                                           |
| `--uploader-background-color`  | `background-color` | `inherit`           | background color of area surrounding the upload         |                                                                                                   |
| `--button-background-color`    | `background`       | `#fff`              | background color of upload button                       |                                                                                                   |
| `--button-border-radius`       | `border-radius`    | `4px`               | border radius of the upload button                      |                                                                                                   |
| `--button-border`              | `border`           | `1px solid #000000` | border of the upload button                             |                                                                                                   |
| `--button-padding`             | `padding`          | `16px 24px`         | padding of the upload button                            |                                                                                                   |
| `--button-hover-text`          | `color`            | `#fff`              | text color of upload button on button hover             |                                                                                                   |
| `--button-hover-background`    | `background`       | `#404040`           | background color of upload button on button hover       |                                                                                                   |
| `--button-active-text`         | `color`            | `#fff`              | color of upload button text when button is active       |                                                                                                   |
| `--button-active-background`   | `background`       | `#000000`           | background color of upload button when button is active | Applied via `:active` [pseudo selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:active) |
| `--progress-bar-fill-color`    | `background`       | `#000000`           | background color for progress bar div                   |                                                                                                   |
| `--progress-radial-fill-color` | `stroke`           | `black`             | stroke color for circle SVG (wip)                       |                                                                                                   |

#### `<MuxUploader/>`

| Name                         | CSS Property       | Default Value               | Description                         |
| ---------------------------- | ------------------ | --------------------------- | ----------------------------------- |
| `--overlay-background-color` | `background-color` | `rgba(226, 253, 255, 0.95)` | background color of the overlay div |
