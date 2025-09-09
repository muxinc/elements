# Props

| Prop                       | Type                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                      | Default                                                           |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `endpoint`                 | `string` (URL)                                                      | The upload URL                                                                                                                                                                                                                                                                                                                                                                                   | `undefined`                                                       |
| `pausable`                 | `boolean`                                                           | Allow pausing/resuming uploads                                                                                                                                                                                                                                                                                                                                                                   | `false`                                                           |
| `noDrop`                   | `boolean`                                                           | Disable drag and drop                                                                                                                                                                                                                                                                                                                                                                            | `false`                                                           |
| `noProgress`               | `boolean`                                                           | Hide progress indicator                                                                                                                                                                                                                                                                                                                                                                          | `false`                                                           |
| `noStatus`                 | `boolean`                                                           | Hide status messages                                                                                                                                                                                                                                                                                                                                                                             | `false`                                                           |
| `noRetry`                  | `boolean`                                                           | Hide retry button                                                                                                                                                                                                                                                                                                                                                                                | `false`                                                           |
| `maxFileSize`              | `number`                                                            | Maximum file size in bytes                                                                                                                                                                                                                                                                                                                                                                       | `undefined`                                                       |
| `chunkSize`                | `number`                                                            | Upload chunk size in bytes                                                                                                                                                                                                                                                                                                                                                                       | `undefined`                                                       |
| `dynamicChunkSize`         | `boolean`                                                           | Enable dynamic chunk sizing                                                                                                                                                                                                                                                                                                                                                                      | `false`                                                           |
| `useLargeFileWorkaround`   | `boolean`                                                           | Enable workaround for large files                                                                                                                                                                                                                                                                                                                                                               | `false`                                                           |
| `paused`                   | `boolean`                                                           | Control upload pause state                                                                                                                                                                                                                                                                                                                                                                       | `false`                                                           |

# Usage Examples

## Basic Usage

```astro
---
import { MuxUploader } from '@mux/mux-uploader-astro';
---

<MuxUploader
  endpoint="https://my-authenticated-url/storage?your-url-params"
/>
```

## Advanced Usage

```astro
---
import { MuxUploader } from '@mux/mux-uploader-astro';
---

<MuxUploader
  endpoint="https://my-authenticated-url/storage?your-url-params"
  pausable
  maxFileSize={1000000000}
  chunkSize={8192}
  style={{
    '--progress-bar-fill-color': '#7e22ce',
    '--button-background-color': '#f0f0f0',
  }}
/>
```


## Dynamic Endpoint

You can also set the endpoint dynamically:

```astro
---
import { MuxUploader } from '@mux/mux-uploader-astro';
---

<input type="text" id="endpoint-input" placeholder="Enter GCS URL..." />
<MuxUploader id="uploader" pausable />

<script>
  import type { MuxUploaderElement } from '@mux/mux-uploader-astro';

  const input = document.getElementById('endpoint-input') as HTMLInputElement;
  const uploader = document.getElementById('uploader') as MuxUploaderElement;

  input.addEventListener('change', () => {
    uploader.endpoint = input.value;
  });
</script>
```

# Events

`<MuxUploader>` has a number of events for media uploading state, progress, and user interactions. All events related to chunk uploading match the events dispatched by [Upchunk](https://github.com/muxinc/upchunk/blob/master/README.md) under the hood. Since Astro components are server-side rendered, you'll need to use [client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/) to add event listeners. You can get the correct types by importing `MuxUploaderElement` from `@mux/mux-uploader-astro`.

```astro
---
import { MuxUploader } from '@mux/mux-uploader-astro';
---

<MuxUploader
  id="my-uploader"
  endpoint="https://my-authenticated-url/storage?your-url-params"
  pausable
/>

<script>
  import type { MuxUploaderElement } from '@mux/mux-uploader-astro';

  const uploader = document.getElementById('my-uploader') as MuxUploaderElement;

  uploader.addEventListener('uploadstart', (event) => {
    console.log('Upload started!', event.detail);
  });

  uploader.addEventListener('success', (event) => {
    console.log('Upload successful!', event.detail);
  });

  uploader.addEventListener('uploaderror', (event) => {
    console.error('Upload error!', event.detail);
  });

  uploader.addEventListener('progress', (event) => {
    console.log('Upload progress: ', event.detail);
  });
</script>
```

## Available Events

| Event | Detail | Description |
| ----- | ------ | ----------- |
| `file-ready` | The media [File](https://developer.mozilla.org/en-US/docs/Web/API/File) | Dispatched when the media file to upload has been retrieved from the file system, either from drag & drop or file selection, which will cause uploading to begin. As such, manually dispatching this event on `<mux-uploader>` will also initiate uploading with whatever file you provide in the event. |
| `chunkattempt` | `{ chunkNumber: number; chunkSize: number; }` | Dispatched before a chunk upload is attempted. Provides the chunk number and size of the about-to-be-attempted chunk. |
| `chunksuccess` | `{ chunk: number; attempts: number; response: XhrResponse }` | Dispatched when a chunk upload finishes successfully. Provides the chunk (number), number of attempts made to upload the chunk, and the response from the server. |
| `offline` | N/A | Dispatched when internet connection is lost. |
| `online` | `detail type` | Dispatched when internet connection is regained. |
| `pausedchange` | `boolean` `paused` state | Dispatched when the `paused` upload state changes. Note that pausing will wait until the currently uploading chunk finishes. |
| `progress` | The `number` percent | Dispatched whenever the chunked upload progress changes, including mid-chunk. Provides the percent of the file uploaded thus far. |
| `reset` | N/A | Dispatched to notify that the uploader's UI and state should be reset, e.g. when a user clicks "retry". As such, manually dispatching this event on `<mux-uploader>` will also prompt a reset (though you should only do this if an upload has failed). |
| `success` | `null` | Dispatched when all chunks have been successfully uploaded. |
| `uploadstart` | `{ file: File; chunkSize: number; }` | Dispatched when uploading the file begins. |
| `uploaderror` | `{ message: string; chunkNumber: number; attempts: number; }` | Dispatched when an error occurs while attempting to upload. Provides the number of (failed) attempts to upload a chunk, the chunk number, and the corresponding error message as a `detail`. |

# CSS Variables

See [mux-uploader's reference](../mux-uploader/REFERENCE.md#css-variables) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader's reference](../mux-uploader/REFERENCE.md#css-parts) for a list of all available CSS parts.

# Slots

See [mux-uploader's reference](../mux-uploader/REFERENCE.md#slots) for a list of all available slots.
