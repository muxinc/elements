<p align="center">
  <h1 align="center">&lt;MuxUploader/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-uploader-react?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-uploader.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader-react"><img src="https://img.shields.io/npm/v/@mux/mux-uploader-react.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader-react"><img src="https://img.shields.io/npm/l/@mux/mux-uploader-react.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<MuxUploader></MuxUploader>` is React component for uploading files to Mux.

`MuxUploaderDrop` is an optional supporting React component for drop-in drag and drop and overlay. You can always configure your own drag and drop with `MuxUploader`.

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
      {/* Upload button by itself. Displays upload progress in text as percentage. */}
      <MuxUploader url="authenticated-url" type="bar" status></MuxUploader>

      {/* Upload button by itself. Does not display text percentage. */}
      <MuxUploader url="authenticated-url" type="bar"></MuxUploader>

      {/* Upload button with access to optional supplentary drag and drop features. */}
      <MuxUploaderDrop mux-uploader="uploader">
        <MuxUploader url="authenticated-url" id="uploader"></MuxUploader>
      </MuxUploaderDrop>
    </div>
  );
};
```

### Attributes

#### `MuxUploader`

| Attribute          | Type      | Description                                                                                                                                                                                                               | Default     |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `url`              | `string`  | The authenticated URL that your file will be uploaded to. Check out the [direct uploads docs](https://docs.mux.com/guides/video/upload-files-directly#1-create-an-authenticated-mux-url) for how to create one. Required. | `undefined` |
| `id`               | `string`  | An ID that allows `MuxUploaderDrop` to locate `MuxUploader`. Required if you use `MuxUploaderDrop.                                                                                                                        | N/A         |
| `type`             | `"bar"`   | Specifies the visual type of progress bar. A radial type is in-progress.                                                                                                                                                  | "bar"       |
| `uploadInProgress` | `boolean` | Toggles visual status of progress bar while upload is in progress.                                                                                                                                                        | false       |
| `uploadError`      | `boolean` | Toggles visual status of progress bar when upload encounters an error.                                                                                                                                                    | false       |
| `status`           | `boolean` | Toggles text status visibility of progress bar. The text that is displayed is a percentage by default. If you prefer just the progress bar with no text upload status, don't include this attribute.                      | false       |

#### `MuxUploaderDrop`

| Attribute      | Type      | Description                                          | Default |
| -------------- | --------- | ---------------------------------------------------- | ------- |
| `fullscreen`   | `boolean` | Toggles fullscreen drag and drop (work-in-progress). | false   |
| `overlay`      | `boolean` | Toggles fullscreen overlay on dragover.              | false   |
| `mux-uploader` | `string ` | Must match the `id` on `MuxUploader`. Required.      | N/A     |

### Methods

| Method           | Description                 |
| ---------------- | --------------------------- |
| `handleUpload()` | Begins upload of the media. |
