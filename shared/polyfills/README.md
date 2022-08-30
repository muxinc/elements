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

```
import { globalThis, document } from '@mux/polyfills';
```
