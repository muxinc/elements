<p align="center">
  <h1 align="center">&lt;MuxUploader/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-uploader-astro?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-uploader-astro.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader-astro"><img src="https://img.shields.io/npm/v/@mux/mux-uploader-astro.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-uploader-astro"><img src="https://img.shields.io/npm/l/@mux/mux-uploader-astro.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<MuxUploader />` is a Mux-flavored Astro uploader component, built on top of our [mux-uploader web component](../mux-uploader).

# Installation

```shell
npm install @mux/mux-uploader-astro
```

or

```shell
yarn add @mux/mux-uploader-astro
```

# Usage

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

## With Event Handling

To add event listeners to the component you can use [a client-side script](https://docs.astro.build/en/guides/client-side-scripts/). You can get the correct types for the uploader element by importing `MuxUploaderElement` from `@mux/mux-uploader-astro` and casting the element to that type.

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

# Docs

Docs and guides live on [docs.mux.com](https://docs.mux.com/guides/video/mux-uploader?utm_source=github-mux-uploader).

API reference lives [on Github](../mux-uploader/REFERENCE.md).
