# Components

Below is a list of all available components in the `@mux/mux-uploader` package. For many cases, you can simply use `<mux-uploader>` for both
upload state management and UI. For more advanced use cases, you may use the subcomponents directly, using `<mux-uploader>` for upload state management or partial UI. See each component section below for details.

| Component name | Description |
| -------------- | ----------- |
| `<mux-uploader>` | A fully-featured UI component. Also manages the uploading state.  **Required** |
| `<mux-uploader-drop>` | Enables drag-and-drop functionality for handling file input. |
| `<mux-uploader-file-select>` | Displays the system file-select dialog when clicked. |
| `<mux-uploader-pause>` | Displays a pause/resume button (with a disabled 'Pausing...' while a requested pause is pending completion of the current chunk upload) |
| `<mux-uploader-progress>` | Displays a progress indicator showing how much of your file has been uploaded. |
| `<mux-uploader-retry>` | Renders a "retry" button if the upload fails. |
| `<mux-uploader-status>` | Displays the upload status (e.g. completed or error statuses). |

Check out the [mux-uploader-modal.html](../../examples/vanilla-ts-esm/public/mux-uploader-modal.html) example application to see a real-world example of how these components can be used individually.

# `<mux-uploader>`

The main, "batteries included" component. Can be used as a full-featured UI or simply for chunked upload state and functional management.
To use for uploading state management only, you can style `<mux-uploader>` with a `display: none;`.

## Attributes

In addition to the attributes listed below, `<mux-uploader>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute | Type | Description | Default |
| --------- | ---- | ----------- | ------- |
| `endpoint`| `string` (URL) | The authenticated URL that your file will be uploaded to. Required. | `undefined` |
| `no-drop`| `boolean` | Hide/remove the drag & drop UI | `false` |
| `no-progress`| `boolean` | Hide/remove the upload progress UI (percentage and bar) | `false` |
| `no-status`| `boolean` | Hide/remove the upload status UI (errors, completion, offline) | `false` |
| `no-retry`| `boolean` | Hide/remove the retry UI button (shown if an upload fails before completion) | `false` |
| `pausable`| `boolean` | Show the optional pause upload UI button (allows users to pause and resume uploads) | `false` |
| `type`| `"percentage" \| "bar" \| "radial"` (_Experimental_) | Show a different upload progress UI instead of a progress bar | `undefined` |
| `chunk-size` | `number` (kB, integer) | Specifies the size of each upload chunk, with the exception of the final chunk which may be smaller. This parameter must be in multiples of 256. | `undefined` |
| `dynamic-chunk-size` | `boolean` | Automatically adapt upload chunk size larger or smaller based on estimated available throughput. | `false` |
| `max-file-size` | `number` (kB, integer) | Set a maximum file size allowed for upload. | `undefined` |
| `paused` | `boolean` | Set to pause an in-progress upload. Get to check the `paused state` (see `pausable`, above). Cannot use before upload has begun. | `false` |
| `use-large-file-workaround` | `boolean` | Enables a less memory efficient way of loading and chunking files for environments that don't reliably handle [`ReadableStream` for large files](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams). This can occur on e.g. Safari browsers with files >= 4GB. | `false` |
| `file-ready` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has been selected. See the `"file-ready"` event, below | `false` |
| `upload-complete` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that all chunks have been successfully uploaded. | `false` |
| `upload-error` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that an error occurred while attempting to upload. | `false` |
| `upload-in-progress` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has begun uploading. | `false` |

## Properties

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

## Events

`<mux-uploader>` has a number of events for media uploading state, progress, and user interactions. Listen to these events using `addEventListener()`. All events related to chunk uploading match the events dispatched by [Upchunk](https://github.com/muxinc/upchunk/blob/master/README.md) under the hood.

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
| `success` | `detail type` | Dispatched when all chunks have been successfully uploaded. |
| `uploadstart` | `{ file: File; chunkSize: number; }` | Dispatched when uploading the file begins. |
| `uploaderror` | `{ message: string; chunkNumber: number; attempts: number; }` | Dispatched when an error occurs while attempting to upload. Provides the number of (failed) attempts to upload a chunk, the chunk number, and the corresponding error message as a `detail`. |

# Slots

`<mux-uploader>` exposes the following [slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) for
customization:

| Name | Description |
| ---- | ----------- |
| `file-select` | Allows you to override the default `<button>` element displayed for file selection. For more, see the `<mux-uploader-file-select>` reference, below. |

## CSS Variables

`<mux-uploader>` exposes the following [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for
customization:

| Name | CSS Property | Default Value | Description |
| ---- | ------------ | ------------- | ----------- |
| `--progress-bar-fill-color` | `background` | `black` | Background "fill" color for progress bar, which visually indicates progress |
| `--progress-bar-height` | `height` | `4px` | Height for the progress bar. |
| `--progress-radial-fill-color` | `stroke` | `black` | Stroke color for `radial` progress `type` (_Experimental_) |
| `--progress-percentage-display` | `display` | `block` | Display value for percentage progress. Set to `none` to hide. |

## CSS Parts

`<mux-uploader>` exposes the follwing [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for customization:

| Name | Description |
| ---- | ----------- |
| `file-select` | Selector for the `<mux-uploader-file-select>` component. Note that this is the parent of the `file-select` slottable element discussed above. For more, see the `<mux-uploader-file-select>` reference, below. |
| `pause` | Selector for the optional `<mux-uploader-pause>` component. For more on using this component, see `pausable` attribute or property, above. |
| `progress` | Generic selector for all `<mux-uploader-progress>` components (e.g. percentage and bar). |
| `progress-percentage` | Selector for the `<mux-uploader-progress>` component of `type="percentage"`. |
| `progress-bar` | Selector for the `<mux-uploader-progress>` component of `type="bar"` (default). |
| `status` | Selector for the `<mux-uploader-status>` component. |
| `retry` | Selector for the `<mux-uploader-retry>` component. |

# `<mux-uploader-drop>`

A "container" element that lets you drag & drop files for uploading via `<mux-uploader>`. Is the root component of `<mux-uploader>` by
default.

## Attributes

In addition to the attributes listed below, `<mux-uploader-drop>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute | Type | Description | Default |
| --------- | ---- | ----------- | ------- |
| `overlay` | `boolean` | Toggles showing an overlay on dragover. | `false` |
| `overlay-text` | `string`  | Optional text to display on dragover when `overlay` is on. | `''`    |
| `mux-uploader` | `string` (id) | Associates the component with the `<mux-uploader>` instance via its `id`. Required. | `undefined` |
| `active` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that a file is currently dragged over the component. | `false` |
| `file-ready` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has been selected. See the `"file-ready"` event, below. | `false` |
| `upload-complete` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that all chunks have been successfully uploaded. | `false` |
| `upload-in-progress` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has begun uploading. | `false` |

## Properties

None.

## Events

None.

**NOTE:** Although `<mux-uploader-drop>` does not dispatch any custom events directly, it does rely on
[drag and drop API events](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#drag_events) to track
drag and drop behaviors and translate into Mux Uploader-specific notifications or state changes, such as toggling the
`active` attribute on `<mux-uploader-drop>` based on `dragenter`/`dragleave` (See attributes, above) or `<mux-uploader>`'s
`file-ready` event on `drop`.

# Slots

`<mux-uploader-drop>` exposes the following [slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) for
customization:

| Name | Description |
| ---- | ----------- |
| `heading` | Allows you to override the default element to display the container heading. |
| `separator` | Allows you to override the default element to display the container heading separator (which shows the text "or"). |

## CSS Variables

`<mux-uploader-drop>` exposes the following [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for
customization:

| Name | CSS Property | Default Value | Description |
| ---- | ------------ | ------------- | ----------- |
| `--overlay-background-color` | `background` | `rgba(226, 253, 255, 0.95)` | Background color for the optional drag overlay, if used. See attributes, above. |

## CSS Parts

`<mux-uploader-drop>` exposes the follwing [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for customization:

| Name | Description |
| ---- | ----------- |
| `heading` | Selector for root `<slot>` element used to render the heading. Useful for things like hiding (`display: none;`), font styling, and the like. |
| `separator` | Selector for root `<slot>` element used to render the separator. Useful for things like hiding (`display: none;`), font styling, and the like. |

# `<mux-uploader-file-select>`

A component element that owns the UI to request browsing for a media file for uploading via `<mux-uploader>`. Displayed before file selection in
`<mux-uploader>` by default.

## Attributes

In addition to the attributes listed below, `<mux-uploader-file-select>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute      | Type | Description | Default |
| -------------- | ---- | ----------- | ------- |
| `mux-uploader` | `string` (id) | Associates the component with the `<mux-uploader>` instance via its `id`. Required. | `undefined` |
| `file-ready` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has been selected. See the `"file-ready"` event, below. | `false` |
| `upload-complete` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that all chunks have been successfully uploaded. | `false` |
| `upload-in-progress` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has begun uploading. | `false` |

## Properties

None.

## Events

None.

**NOTE:** Although `<mux-uploader-file-select>` does not dispatch any custom events directly, it triggers file browsing on `<mux-uploader>` based
on a `click` event on the slotted (or default slotted) `file-select` element.

# Slots

`<mux-uploader-file-select>` exposes the following [slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) for customization:

| Name | Description |
| ---- | ----------- |
| (none) | Default slot for overriding the default button UI and text for file selection. |

## CSS Variables

None.

## CSS Parts

`<mux-uploader-file-select>` exposes the follwing [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for customization:

| Name | Description |
| ---- | ----------- |
| `file-select-button` | Selector for the default slotted file selection button element. NOTE: not available if you slot your own element (See slots, above) |

# `<mux-uploader-pause>`

An element that owns the UI to request pausing and resuming uploading via `<mux-uploader>`. Optionally displayed during uploading on
`<mux-uploader>` by default (See its `pausable` attribute, above).

## Attributes

In addition to the attributes listed below, `<mux-uploader-pause>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute      | Type | Description | Default |
| -------------- | ---- | ----------- | ------- |
| `mux-uploader` | `string` (id) | Associates the component with the `<mux-uploader>` instance via its `id`. Required. | `undefined` |
| `upload-complete` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that all chunks have been successfully uploaded. | `false` |
| `upload-error` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that an error occurred while attempting to upload. | `false` |
| `upload-in-progress` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has begun uploading. | `false` |

## Properties

None.

## Events

None.

# Slots

None.

## CSS Variables

None.

## CSS Parts

None.

# `<mux-uploader-progress>`

A component element for rendering the current upload progress. Displayed in two permutations during file upload
`<mux-uploader>` by default, both as a `type="percentage"` and `type="bar"` (see Attributes, below).

## Attributes

In addition to the attributes listed below, `<mux-uploader-progress>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute | Type | Description | Default |
| --------- | ---- | ----------- | ------- |
| `mux-uploader` | `string` (id) | Associates the component with the `<mux-uploader>` instance via its `id`. Required. | `undefined` |
| `type`| `"percentage" \| "bar" \| "radial"` | Render progress as either a numeric percentage, a progress bar, or a radial/circular progress (_Experimental_) | `undefined` |
| `upload-complete` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that all chunks have been successfully uploaded. | `false` |
| `upload-error` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that an error occurred while attempting to upload. | `false` |
| `upload-in-progress` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has begun uploading. | `false` |

## Properties

None.

## Events

None.

# Slots

None.

## CSS Variables

`<mux-uploader-progress>` exposes the following [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for
customization:

| Name | CSS Property | Default Value | Description |
| ---- | ------------ | ------------- | ----------- |
| `--progress-bar-fill-color` | `background` | `black` | Background "fill" color for progress bar, which visually indicates progress |
| `--progress-bar-height` | `height` | `4px` | Height for the progress bar. |
| `--progress-radial-fill-color` | `stroke` | `black` | Stroke color for `radial` progress `type` (_Experimental_) |
| `--progress-percentage-display` | `display` | `block` | Display value for percentage progress. Set to `none` to hide. |

## CSS Parts

None.

# `<mux-uploader-retry>`

An element that owns the UI to request retrying a failed upload via `<mux-uploader>`. Displayed when an error occurred during upload on
`<mux-uploader>` by default.

## Attributes

In addition to the attributes listed below, `<mux-uploader-retry>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute      | Type | Description | Default |
| -------------- | ---- | ----------- | ------- |
| `mux-uploader` | `string` (id) | Associates the component with the `<mux-uploader>` instance via its `id`. Required. | `undefined` |
| `upload-error` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that an error occurred while attempting to upload. | `false` |

## Properties

None.

## Events

None.

# Slots

None.

## CSS Variables

None.

## CSS Parts

None.

# `<mux-uploader-status>`

An element that renders the uploader status (completed, error, or offline) as human-readable text.

## Attributes

In addition to the attributes listed below, `<mux-uploader-status>` supports standard `HTMLElement` attributes such as `style` and `class`.

| Attribute      | Type | Description | Default |
| -------------- | ---- | ----------- | ------- |
| `mux-uploader` | `string` (id) | Associates the component with the `<mux-uploader>` instance via its `id`. Required. | `undefined` |
| `upload-complete` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that all chunks have been successfully uploaded. | `false` |
| `upload-error` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that an error occurred while attempting to upload. | `false` |
| `upload-in-progress` <sub><sup>Read only</sup></sub> | `boolean` | Indicates that the file has begun uploading. | `false` |

## Properties

None.

## Events

None.

# Slots

None.

## CSS Variables

None.

## CSS Parts

None.


