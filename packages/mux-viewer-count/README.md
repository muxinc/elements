<p align="center">
  <h1 align="center">&lt;mux-viewer-count/&gt;</h1>
  <a href="https://npmcharts.com/compare/@mux/mux-viewer-count?interval=30"><img src="https://img.shields.io/npm/dm/@mux/mux-viewer-count.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-viewer-count"><img src="https://img.shields.io/npm/v/@mux/mux-viewer-count.svg?sanitize=true" alt="Version"></a>
    <a href="https://www.npmjs.com/package/@mux/mux-viewer-count"><img src="https://img.shields.io/npm/l/@mux/mux-viewer-count.svg?sanitize=true" alt="License"></a>
</p>

# Introduction

`<mux-viewer-count></mux-viewer-count>` is a Mux-flavored HTML5 viewer count element.

This element shows the current number of viewers for the specified video.

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux/mux-viewer-count
```

or

```
npm i @mux/mux-viewer-count
```

Then, import the library into your application with either `import` or `require`:

```js
import '@mux/mux-viewer-count';
```

or

```js
require('@mux/mux-viewer-count');
```

## CDN option

Alternatively, use the CDN hosted version of this package:

```html
<script src="https://cdn.jsdelivr.net/npm/@mux/mux-viewer-count@0"></script>
```

If you are using ecmascript modules, you can also load the `mux-viewer-count.mjs` file with `type=module`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@mux/mux-viewer-count@0/dist/mux-viewer-count.mjs"></script>
```

## Usage

`<mux-viewer-count>` has two attributes. The first is called `token`, and it should be a signed JavaScript Web Token (JWT)
for which you want the viewer count. (For more information on creating a JWT for a particular video, see 
https://docs.mux.com/guides/data/see-how-many-people-are-watching.

The second attribute is called `pollInterval`. It specifies the number of seconds that the component should wait between
requests to get the viewer count. It defaults to 20 seconds.
