# Introduction

`<mux-audio></mux-audio>` is a Mux-flavored HTML5 audio element.

If you are familiar with using `<audio />` + [Hls.js](https://github.com/video-dev/hls.js) in your application, then you'll feel right at home with this web component.

# Installation

If you're using `npm` or `yarn`, install that way:

## Package manager

```
yarn add @mux-elements/mux-audio
```

or

```
npm i @mux-elements/mux-audio
```

Then, import the library into your application with either `import` or `require`:

```js
import "@mux-elements/mux-audio";
```

or

```js
require("@mux-elements/mux-audio");
```

## CDN option

Alternatively, use the CDN hosted version of this package:

```html
<script
  type="module"
  src="https://unpkg.com/@mux-elements/mux-audio@0.1"
></script>
```

## Usage

`<mux-audio>` has all the same features, benefits and options as `<mux-video>`. View the documentation for [`<mux-video>`](../mux-video) for details.

### Advanced: Use with React+TypeScript

Even though we don't (yet!) have our own `React` version of `<mux-audio>`, you can still use it in your `React` app. However, if you're also using TypeScript, make sure you add the following TypeScript definitions, since custom elements (like as `<mux-audio>`) will not be recognized as [Intrinsic Elements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements):

```typescript
interface MuxAudioHTMLAttributes<T> extends React.AudioHTMLAttributes<T> {
  debug?: boolean;
  autoplay?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "mux-audio": React.DetailedHTMLProps<
        MuxAudioHTMLAttributes<HTMLAudioElement>,
        HTMLAudioElement
      >;
    }
  }
}
```
