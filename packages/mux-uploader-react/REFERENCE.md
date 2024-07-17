# Components

Below is a list of all available components in the `@mux/mux-uploader-react` package. For many cases, you can simply use `<MuxUploader>` for both
upload state management and UI. For more advanced use cases, you may use the subcomponents directly, using `<MuxUploader>` for upload state management or partial UI. See each component section below for details.

| Component name | Description |
| -------------- | ----------- |
| `<MuxUploader>` | A fully-featured UI component. Also manages the uploading state.  **Required** |
| `<MuxUploaderDrop>` | Enables drag-and-drop functionality for handling file input. |
| `<MuxUploaderFileSelect>` | Displays the system file-select dialog when clicked. |
| `<MuxUploaderPause>` | Displays a pause/resume button (with a disabled 'Pausing...' while a requested pause is pending completion of the current chunk upload) |
| `<MuxUploaderProgress>` | Displays a progress indicator showing how much of your file has been uploaded. |
| `<MuxUploaderRetry>` | Renders a "retry" button if the upload fails. |
| `<MuxUploaderStatus>` | Displays the upload status (e.g. completed or error statuses). |

Check out the [MuxUploaderSeparateComponents.tsx page](../../examples/nextjs-with-typescript/pages/MuxUploaderSeparateComponents.tsx) example Next.JS app page to see a real-world example of how these components can be used individually.

# `<MuxUploader>`

The main, "batteries included" component. Can be used as a full-featured UI or simply for chunked upload state and functional management.
To use for uploading state management only, you can style `<MuxUploader>` with a `display: none;`.

## Props

In addition to the props listed below, `<MuxUploader>` supports standard props such as `id`, `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `endpoint` | `string \| () => Promise` | Either a) the authenticated URL that your file will be uploaded to or b) an async function that yields a promise that resolves to that url. Check out the [direct uploads docs](https://docs.mux.com/guides/video/upload-files-directly#1-create-an-authenticated-mux-url). Required. | `undefined` |
| `noDrop`| `boolean` | Hide/remove the drag & drop UI | `false` |
| `noProgress`| `boolean` | Hide/remove the upload progress UI (percentage and bar) | `false` |
| `noStatus`| `boolean` | Hide/remove the upload status UI (errors, completion, offline) | `false` |
| `noRetry`| `boolean` | Hide/remove the retry UI button (shown if an upload fails before completion) | `false` |
| `pausable`| `boolean` | Show the optional pause upload UI button (allows users to pause and resume uploads) | `false` |
| `type`| `"percentage" \| "bar" \| "radial"` (_Experimental_) | Show a different upload progress UI instead of a progress bar | `undefined` |
| `chunkSize` | `number` (kB, integer) | Specifies the size of each upload chunk, with the exception of the final chunk which may be smaller. This parameter must be in multiples of 256. | `undefined` |
| `dynamicChunkSize` | `boolean` | Automatically adapt upload chunk size larger or smaller based on estimated available throughput. | `false` |
| `maxFileSize` | `number` (kB, integer) | Set a maximum file size allowed for upload. | `undefined` |
| `paused` | `boolean` | Set to pause an in-progress upload. Get to check the `paused state` (see `pausable`, above). Cannot use before upload has begun. Note that pausing will wait until the currently uploading chunk finishes. | `false` |
| `useLargeFileWorkaround` | `boolean` | Enables a less memory-efficient way of loading and chunking files for environments that don't reliably handle [`ReadableStream` for large files](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams). This can occur on e.g. Safari browsers with files >= 4GB. | `false` |

# Callbacks

`<MuxUploader/>` has a number of callbacks for monitoring upload state. For example, a callback for `'uploaderstart'` event is `onUploadStart`. See [mux-uploader's reference](../mux-uploader/REFERENCE.md#events) for a list of events.

# Slots

See [mux-uploader's reference](../mux-uploader/REFERENCE.md#slots) for a list of all available slots.

# CSS Variables

See [mux-uploader's reference](../mux-uploader/REFERENCE.md#css-variables) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader's reference](../mux-uploader/REFERENCE.md#css-parts) for a list of all available CSS parts.

# `<MuxUploaderDrop>`

A "container" element that lets you drag & drop files for uploading via `<MuxUploader>`. Is the root component of `<MuxUploader>` by
default.

## Props

In addition to the props listed below, `<MuxUploaderDrop>`  supports standard props such as `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `overlay` | `boolean` | Toggles showing an overlay on dragover. | `false` |
| `overlayText` | `string`  | Optional text to display on dragover when `overlay` is on. | `''`    |
| `muxUploader` | `string` (id) | Associates the component with the `<MuxUploader>` instance via its `id`. Required. | `undefined` |

## Callbacks

See [mux-uploader-drop's reference](../mux-uploader/REFERENCE.md#events-1) for a list of all available events.

# Slots

See [mux-uploader-drop's reference](../mux-uploader/REFERENCE.md#slots-1) for a list of all available slots.

# CSS Variables

See [mux-uploader-drop's reference](../mux-uploader/REFERENCE.md#css-variables-1) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader-drop's reference](../mux-uploader/REFERENCE.md#css-parts-1) for a list of all available CSS parts.

# `<MuxUploaderFileSelect>`

A component element that owns the UI to request browsing for a media file for uploading via `<MuxUploader>`. Displayed before file selection in
`<MuxUploader>` by default.

## Props

In addition to the props listed below, `<MuxUploaderFileSelect>`  supports standard props such as `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `muxUploader` | `string` (id) | Associates the component with the `<MuxUploader>` instance via its `id`. Required. | `undefined` |

## Callbacks

See [mux-uploader-file-select's reference](../mux-uploader/REFERENCE.md#events-2) for a list of all available events.

# Slots

See [mux-uploader-file-select's reference](../mux-uploader/REFERENCE.md#slots-2) for a list of all available slots.

# CSS Variables

See [mux-uploader-file-select's reference](../mux-uploader/REFERENCE.md#css-variables-2) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader-file-select's reference](../mux-uploader/REFERENCE.md#css-parts-2) for a list of all available CSS parts.

# `<MuxUploaderPause>`

An element that owns the UI to request pausing and resuming uploading via `<MuxUploader>`. Optionally displayed during uploading on
`<MuxUploader>` by default (See its `pausable` prop, above).

## Props

In addition to the props listed below, `<MuxUploaderPause>`  supports standard props such as `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `muxUploader` | `string` (id) | Associates the component with the `<MuxUploader>` instance via its `id`. Required. | `undefined` |

## Callbacks

See [mux-uploader-pause's reference](../mux-uploader/REFERENCE.md#events-3) for a list of all available events.

# Slots

See [mux-uploader-pause's reference](../mux-uploader/REFERENCE.md#slots-3) for a list of all available slots.

# CSS Variables

See [mux-uploader-pause's reference](../mux-uploader/REFERENCE.md#css-variables-3) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader-pause's reference](../mux-uploader/REFERENCE.md#css-parts-3) for a list of all available CSS parts.

# `<MuxUploaderProgress>`

A component element for rendering the current upload progress. Displayed in two permutations during file upload
`<MuxUploader>` by default, both as a `type="percentage"` and `type="bar"` (see Attributes, below).

## Props

In addition to the props listed below, `<MuxUploaderProgress>`  supports standard props such as `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `muxUploader` | `string` (id) | Associates the component with the `<MuxUploader>` instance via its `id`. Required. | `undefined` |
| `type`| `"percentage" \| "bar" \| "radial"` | Render progress as either a numeric percentage, a progress bar, or a radial/circular progress (_Experimental_) | `undefined` |

## Callbacks

See [mux-uploader-progress's reference](../mux-uploader/REFERENCE.md#events-4) for a list of all available events.

# Slots

See [mux-uploader-progress's reference](../mux-uploader/REFERENCE.md#slots-4) for a list of all available slots.

# CSS Variables

See [mux-uploader-progress's reference](../mux-uploader/REFERENCE.md#css-variables-4) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader-progress's reference](../mux-uploader/REFERENCE.md#css-parts-4) for a list of all available CSS parts.

# `<MuxUploaderRetry>`

An element that owns the UI to request retrying a failed upload via `<MuxUploader>`. Displayed when an error occurred during upload on
`<MuxUploader>` by default.

## Props

In addition to the props listed below, `<MuxUploaderRetry>`  supports standard props such as `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `muxUploader` | `string` (id) | Associates the component with the `<MuxUploader>` instance via its `id`. Required. | `undefined` |

## Callbacks

See [mux-uploader-retry's reference](../mux-uploader/REFERENCE.md#events-5) for a list of all available events.

# Slots

See [mux-uploader-retry's reference](../mux-uploader/REFERENCE.md#slots-5) for a list of all available slots.

# CSS Variables

See [mux-uploader-retry's reference](../mux-uploader/REFERENCE.md#css-variables-5) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader-retry's reference](../mux-uploader/REFERENCE.md#css-parts-5) for a list of all available CSS parts.

# `<MuxUploaderStatus>`

An element that renders the uploader status (completed, error, or offline) as human-readable text.

## Props

In addition to the props listed below, `<MuxUploaderStatus>`  supports standard props such as `style` and `className`.

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `muxUploader` | `string` (id) | Associates the component with the `<MuxUploader>` instance via its `id`. Required. | `undefined` |

## Callbacks

See [mux-uploader-status's reference](../mux-uploader/REFERENCE.md#events-6) for a list of all available events.

# Slots

See [mux-uploader-status's reference](../mux-uploader/REFERENCE.md#slots-6) for a list of all available slots.

# CSS Variables

See [mux-uploader-status's reference](../mux-uploader/REFERENCE.md#css-variables-6) for a list of all available CSS variables.

# CSS Parts

See [mux-uploader-status's reference](../mux-uploader/REFERENCE.md#css-parts-6) for a list of all available CSS parts.
