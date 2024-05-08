<p align="center">
  <h1 align="center">&lt;mux-uploader/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-uploader?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-uploader.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader"><img src="https://img.shields.io/npm/v/@mux/mux-uploader.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader"><img src="https://img.shields.io/npm/l/@mux/mux-uploader.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<mux-uploader>` is a drop-in web component that makes it easy to upload video files to Mux.

This component allows you to build a fully-functional video upload UI in your application using a single line of code.

# Quick start
```
// First, install it
npm i @mux/mux-uploader

// Then, import it
import '@mux/mux-uploader';

// Finally, add the html tag
<div>
  <mux-uploader></mux-uploader>
</div>
```

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux/mux-uploader
```

or

```
npm i @mux/mux-uploader
```

Then, import the library into your application with either `import` or `require`:

```js
import '@mux/mux-uploader';
```

or

```js
require('@mux/mux-uploader');
```

## CDN option

Alternatively, use the CDN hosted version of this package:

```html
<script src="https://cdn.jsdelivr.net/npm/@mux/mux-uploader@1.0.0-beta.6"></script>
```

If you are using ECMAScript modules, you can also load the `mux-uploader.mjs` file with `type=module`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@mux/mux-uploader@1.0.0-beta.6/dist/mux-uploader.mjs"></script>
```

# How to upload videos with `mux-uploader`

`mux-uploader` takes care of rendering a file selector, uploading your video file, displaying progress updates to the user, handling retries, and more.

There's only one required attribute that you must set to upload your file – the `endpoint` attribute. It looks like this:

```html
<mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params"></mux-uploader>
```

The `endpoint` attribute provides `mux-uploader` with a direct upload URL that will receive the video file you're uploading.

You can generate a signed direct upload URL by making a server-side API call to Mux's [Create Direct Upload](https://docs.mux.com/api-reference/video#operation/create-direct-upload) endpoint.

In a successful API response, you will receive a unique signed upload URL that can then be passed along to your client application and set as the `endpoint` property on a `mux-uploader` element. The URL for a Direct Upload looks like `"https://storage.googleapis.com/video..."`.

> In the following examples, you will replace the value of the `endpoint` property with your unique direct upload URL.

![mux uploader with defaults](./screenshots/default-everything.gif)

## Fetching the upload URL async

At the time you render the `<mux-uploader>`, you may not have the direct upload URL yet. Instead, you might want to retrieve it async from your server after a user selects a file. You can do that by setting the `endpoint` property value to a custom function instead of a URL.

```html
<mux-uploader></mux-uploader>

<script>
  const muxUploader = document.querySelector('mux-uploader');
  /*
    Endpoint should be a function that returns a promise and resolves
    with a string for the upload URL.
  */
  muxUploader.endpoint = function () {
    /*
      In this example, your server endpoint would return the upload URL
      in the response body "https://storage.googleapis.com/video..."
    */
    return fetch('/your-server/api/create-upload').then(res => res.text());
  };
</script>
```

## Customizing

We've built `<mux-uploader>` with sensible styling defaults that might Just Work™ for your application.

Of course, there are times when you'll want to change the default appearance or behavior to something a little more custom.

### Basic customization with slots

`<mux-uploader>` uses HTML slots, allowing you to replace default UI elements with your own HTML elements.

> View the slots reference to learn about all of the available slots in `<mux-uploader>`.

**Example: using your own file selector**

You can use your own button with the `slot="file-select"` attribute.

This is really handy if, for example, you already have a `.btn` class that styles buttons in your application.

```html
<style>
  .btn {
    /* your styles for .btn */
    padding: 6px 8px;
    border: 1px solid #0d9488;
    border-radius: 5px;
    font-size: 24px;
    color: #134e4a;
    background: #99f6e4;
    cursor: pointer;
  }
</style>

<!-- slot="file-select" tells mux-uploader to replace the default file selector with a button.btn element -->
<mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params">
  <button class="btn" type="button" slot="file-select">Pick a file</button>
</mux-uploader>
```

![mux uploader with custom button](./screenshots/custom-button.gif)

### Basic customization with CSS variables

`<mux-uploader>` exposes CSS variables that allow you to change the default styling of the uploader UI.

> View the [CSS variables reference](#styling) to learn about all of the available CSS variables in `<mux-uploader>`.

**Example: Customizing the progress bar**

By default, the progress bar color is black with a gray background. Here's how you can change the progress bar color to purple:

```html
<style>
  mux-uploader {
    --progress-bar-fill-color: #7e22ce;
  }
</style>

<mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params">
  <button class="btn" type="button" slot="file-select">Pick a file</button>
</mux-uploader>
```

![mux uploader with custom progress bar](./screenshots/custom-progress-bar.gif)

### Advanced customization

If you're looking to build a custom UI for uploading videos in your application, advanced customization is for you.

You can use the individual web components that come packaged with `<mux-uploader>` to build out a custom upload UI that meets your needs.

To use this approach, add an `id` attribute to your `<mux-uploader>` element with a unique value.

You can then associate the `<mux-uploader>` element with any of the packaged components by adding a `mux-uploader=""` attribute to each component.

Example:

```html
<!-- add a mux-uploader tag with an id attribute and hide it with CSS -->
<mux-uploader id="my-uploader" style="display: none;"></mux-uploader>

<!-- ...then, somewhere else in your app, add a reference back to it -->
<mux-uploader-file-select mux-uploader="my-uploader">
  <button slot="file-select">Pick a video</button>
</mux-uploader-file-select>
```

Here are all of the available components you can use with `<mux-uploader>`:

| Component name               | Description                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `<mux-uploader>`             | Manages the uploading state. **Required**                                     |
| `<mux-uploader-status>`      | Displays the upload status                                                    |
| `<mux-uploader-file-select>` | Displays the system file-select dialog when clicked                           |
| `<mux-uploader-drop>`        | Enables drag-and-drop functionality for handling file input                   |
| `<mux-uploader-retry>`       | Renders a "retry" button if the upload fails                                  |
| `<mux-uploader-progress>`    | Displays a progress indicator showing how much of your file has been uploaded |
| `<mux-uploader-pause>`       | Displays a pause/resume button (with a disabled 'Pausing...' while a requested pause is pending completion of the current chunk upload) |

Check out the [mux-uploader-modal.html](../../examples/vanilla-ts-esm/public/mux-uploader-modal.html) example application to see a real-world example of how these components can be used.

## Drag and Drop

`<mux-uploader-drop>` is available for drag and drop functionality. It works like a `<div>` or other "container" element in the sense that you can style it and populate it with whatever children you see fit (including but not necessarily a `<mux-uploader>`).

Similar to `<input>` and `<label>` relationships, you associate a `<mux-uploader-drop>` with its corresponding `<mux-uploader>` via `id` using the `mux-uploader` attribute.

The `<mux-uploader-drop>` component will get the `active` attribute when the drag is active, this allows you to write some CSS to style it for your application.

Here's a full example of a custom button, customized progress text and drag and drop functionality that changes the background when the drag is active

```html
<style>
  /* This .btn class styles buttons in my application */
  .btn {
    padding: 6px 8px;
    border: 1px solid #0d9488;
    border-radius: 5px;
    font-size: 24px;
    color: #134e4a;
    background: #99f6e4;
    cursor: pointer;
  }
  /* Customize progress bar color */
  mux-uploader {
    --progress-bar-fill-color: #7e22ce;
  }
  /* Customize drop area background color & active background color */
  mux-uploader-drop {
    display: block;
    padding: 40px;
    background: #fef9c3;
  }
  mux-uploader-drop[active] {
    background: #ffe4e6;
  }
</style>

<mux-uploader-drop mux-uploader="my-uploader">
  <mux-uploader id="my-uploader" endpoint="https://my-authenticated-url/storage?your-url-params">
    <button class="btn" type="button" slot="file-select">Pick a file</button>
  </mux-uploader>
</mux-uploader-drop>
```

![mux uploader with custom drop area](./screenshots/custom-drop-bg.gif)

**Technical details about drop areas:**

When a file is dropped, `<mux-uploader>` will dispatch a custom `file-ready` event with the relevant file.

You can implement your own drag and drop completely separate from `<mux-uploader>` and as long as you dispatch a custom `file-ready` with the file in the `detail` property then `<mux-uploader>` will handle the upload upon receiving the event.

```html
<script>
  const muxUploader = document.querySelector('mux-uploader');

  // Dispatch custom event to trigger upload
  muxUploader.dispatchEvent(
    new CustomEvent('file-ready', {
      composed: true,
      bubbles: true,
      detail: file,
    })
  );
</script>
```

## Listening for events

`<mux-uploader>` uses custom events to share details about how the upload is progressing.

You can listen for the `progress` event to receive details on how far along your file upload is.

```html
  const muxUploader = document.querySelector('mux-uploader');

  muxUploader.addEventListener('progress', function (e) {
    console.log(`My upload is ${e.detail}% complete!`)
  });
```

When the upload is complete, you'll see 100% on the progress bar and the `success` event will fire.

If an error occurs during the upload, an `uploaderror` event will fire.

```html
<mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params"></mux-uploader>

<script>
  const muxUploader = document.querySelector('mux-uploader');
  muxUploader.addEventListener('success', function () {
    /* Handle upload success */
  });

    muxUploader.addEventListener('uploaderror', function () {
    /* Handle upload error */
  });
<script>
```

### Attributes

#### `<mux-uploader>`

| Attribute            | Type                | Description                                                                                                                                                                                                                                                                           | Default     |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `endpoint`           | `string \| Promise` | Either a) the authenticated URL that your file will be uploaded to or b) an async function that yields a promise that resolves to that url. Check out the [direct uploads docs](https://docs.mux.com/guides/video/upload-files-directly#1-create-an-authenticated-mux-url). Required. | `undefined` |
| `id`                 | `string`            | An ID that allows `mux-uploader-drop` to locate `mux-uploader`. Required if you use advanced customization.                                                                                                                                                                           | N/A         |
| `upload-in-progress` | `boolean`           | (Read-only) Toggles visual status of progress bar while upload is in progress. Can be targeted with CSS if you want to control styles while in progress i.e. mux-uploader[upload-in-progress].                                                                                        | false       |
| `upload-error`       | `boolean`           | (Read-only) Toggles visual status of progress bar when upload encounters an error. Can be targeted with CSS if you want to control styles when an error occurs i.e. mux-uploader[upload-error].                                                                                       | false       |
| `dynamic-chunk-size` | `boolean`           | Toggles uploading with dynamic chunk sizes. Chunk sizes will change with upload speed to attempt to optimize upload.                                                                                                                                                                  | false       |

---

#### `<mux-uploader-drop>`

| Attribute      | Type      | Description                                                | Default |
| -------------- | --------- | ---------------------------------------------------------- | ------- |
| `overlay`      | `boolean` | Toggles showing an overlay on dragover.                    | `false` |
| `overlay-text` | `string`  | Optional text to display on dragover when `overlay` is on. | `''`    |
| `mux-uploader` | `string ` | Must match the `id` on `MuxUploader`. Required.            | N/A     |


### Events

#### `<mux-uploader>`

`<mux-uploader>` fires several events throughout the uploading lifecycle to monitor uploading state. These events match the events fired by [Upchunk](https://github.com/muxinc/upchunk/blob/master/README.md) under the hood.

| Event          | Description                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `file-ready`   | Fired when a file has been selected to be uploaded                                                                                                                 |
| `uploadstart`  | Fired when the upload begins.                                                                                                                                      |
| `chunkattempt` | Fired immediately before a chunk upload is attempted.                                                                                                              |
| `chunksuccess` | Fired when an indvidual chunk is successfully uploaded. Sample response: `{ detail: { chunk: Integer, attempts: Integer, response: XhrResponse } }`                |
| `uploaderror`  | Fired when an error occurs in the chunked upload process.                                                                                                          |
| `progress`     | Fired continuously with incremental upload progress. This returns the current percentage of the file that's been uploaded. Sample response: `{ detail: [0..100] }` |
| `success`      | Fired when the entire file has successfully completed uploading.                                                                                                   |

### Styling

`<mux-uploader>` and its packaged components can be styled with standard CSS, but also includes the following CSS variables for "under the hood" styling.

#### `<mux-uploader>`

| Name                            | CSS Property | Default Value | Description                           | Notes |
| ------------------------------- | ------------ | ------------- | ------------------------------------- | ----- |
| `--progress-bar-fill-color`     | `background` | `#000000`     | background color for progress bar div |       |
| `--progress-bar-height`         | `height`     | `4px`         | height for the progress bar           |       |
| `--progress-radial-fill-color`  | `stroke`     | `black`       | stroke color for circle SVG (wip)     |       |
| `--progress-percentage-display` | `display`    | `block`       | display value for percentage progress |       |

#### `<mux-uploader-drop/>`

| Name                         | CSS Property       | Default Value               | Description                         | Notes                                                  |
| ---------------------------- | ------------------ | --------------------------- | ----------------------------------- | ------------------------------------------------------ |
| `--overlay-background-color` | `background-color` | `rgba(226, 253, 255, 0.95)` | background color of the overlay div | |
