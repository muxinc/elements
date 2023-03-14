# Polyfills

This module is a helper module to bring some polyfills so that SSR builds of elements don't fail.

It polyfills the following in the export `globalThis`:

```js
globalThis.DocumentFragment;
globalThis.customElements;
globalThis.CustomEvent;
globalThis.EventTarget;
globalThis.HTMLElement;
globalThis.document;
globalThis.document.createElement;
```

## Usage

You should copy the `index.ts` file into a local `src/polyfiils` on a pre-build step. Then reference it like so

```
import { globalThis, document } from './polyfills';
```

Due to how this file is setup and our usage of types, we don't want it to be a separate package.
