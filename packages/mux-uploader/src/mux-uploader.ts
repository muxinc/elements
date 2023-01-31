import { globalThis, document } from 'shared-polyfills';
import * as UpChunk from '@mux/upchunk';

const styles = `
:host {
  font-family: var(--uploader-font-family, Arial);
  font-size: var(--uploader-font-size, 16px);
  background-color: var(--uploader-background-color, inherit);
}

input[type="file"] {
  display: none;
}

.retry-button {
  display: none;
}

::slotted(p) {
  display: none;
}

.retry-button {
  color: #e22c3e;
  text-decoration-line: underline;
  cursor: pointer;
  position: relative;
}

:host([upload-in-progress]) ::slotted(p) {
  display: block;
}

:host([upload-error]) .retry-button {
  display: inline-block;
}

:host([upload-error]) ::slotted(p) {
  display: none;
}
`;

const template = document.createElement('template');

template.innerHTML = `
<style>
  ${styles}
</style>

<input id="hidden-file-input" type="file" />
<mux-uploader-sr-text></mux-uploader-sr-text>

<mux-uploader-status></mux-uploader-status>
<span class="retry-button" id="retry-button" role="button" tabindex="0">Try again</span>

<mux-uploader-file-select>
  <slot name="file-select"></slot>
</mux-uploader-file-select>

<mux-uploader-progress type="percentage"></mux-uploader-progress>
<mux-uploader-progress></mux-uploader-progress>
`;

const ButtonPressedKeys = ['Enter', ' '];

type Endpoint = UpChunk.UpChunk['endpoint'] | undefined | null;
type DynamicChunkSize = UpChunk.UpChunk['dynamicChunkSize'] | undefined;

type ErrorDetail = {
  message: string;
  chunkNumber?: number;
  attempts?: number;
};

// NOTE: Progress event is already determined on HTMLElement but have inconsistent types. Should consider renaming events (CJP)
export interface MuxUploaderElementEventMap extends Omit<HTMLElementEventMap, 'progress'> {
  uploadstart: CustomEvent<{ file: File; chunkSize: number }>;
  chunkattempt: CustomEvent<{
    chunkNumber: number;
    chunkSize: number;
  }>;
  chunksuccess: CustomEvent<{
    chunk: number;
    chunkSize: number;
    attempts: number;
    timeInterval: number;
    // Note: This should be more explicitly typed in Upchunk. (TD).
    response: any;
  }>;
  uploaderror: CustomEvent<ErrorDetail>;
  progress: CustomEvent<number>;
  success: CustomEvent<undefined | null>;
}

export interface IMuxUploaderElement extends HTMLElement {
  addEventListener<K extends keyof MuxUploaderElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxUploaderElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MuxUploaderElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxUploaderElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

class MuxUploaderElement extends globalThis.HTMLElement implements IMuxUploaderElement {
  protected _endpoint: Endpoint;
  retryButton: HTMLElement | null | undefined;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const uploaderHtml = template.content.cloneNode(true);
    shadow.appendChild(uploaderHtml);

    this.retryButton = this.shadowRoot?.getElementById('retry-button');

    this.hiddenFileInput?.addEventListener('change', () => {
      const file = this.hiddenFileInput?.files?.[0];

      if (file) {
        this.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      }
    });
  }

  connectedCallback() {
    this.setupRetry();
    //@ts-ignore
    this.addEventListener('file-ready', this.handleUpload);
  }

  disconnectedCallback() {
    //@ts-ignore
    this.removeEventListener('file-ready', this.handleUpload, false);
  }

  protected get hiddenFileInput() {
    return this.shadowRoot?.querySelector('#hidden-file-input') as HTMLInputElement;
  }

  get endpoint(): Endpoint {
    return this.getAttribute('endpoint') ?? this._endpoint;
  }

  set endpoint(value: Endpoint) {
    if (value === this.endpoint) return;
    if (typeof value === 'string') {
      this.setAttribute('endpoint', value);
    } else if (value == undefined) {
      this.removeAttribute('endpoint');
    }
    this._endpoint = value;
  }

  get dynamicChunkSize(): DynamicChunkSize {
    return this.hasAttribute('dynamic-chunk-size');
  }

  set dynamicChunkSize(value: DynamicChunkSize) {
    if (value === this.hasAttribute('dynamic-chunk-size')) return;
    if (value) {
      this.setAttribute('dynamic-chunk-size', '');
    } else {
      this.removeAttribute('dynamic-chunk-size');
    }
  }

  setupRetry() {
    this.retryButton?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('reset'));
      this.resetState();
    });

    // NOTE: There are definitely some "false positive" cases with multi-key pressing,
    // but this should be good enough for most use cases.
    const keyUpHandler = (e: KeyboardEvent) => {
      const { key } = e;
      if (!ButtonPressedKeys.includes(key)) {
        this.removeEventListener('keyup', keyUpHandler);
        return;
      }

      this.dispatchEvent(new CustomEvent('reset'));
      this.resetState();
    };

    this.addEventListener('keydown', (e) => {
      const { metaKey, altKey, key } = e;
      if (metaKey || altKey || !ButtonPressedKeys.includes(key)) {
        this.removeEventListener('keyup', keyUpHandler);
        return;
      }
      this.addEventListener('keyup', keyUpHandler);
    });
  }

  resetState() {
    this.removeAttribute('upload-error');
    this.removeAttribute('upload-in-progress');
    // Reset file to ensure change/input events will fire, even if selecting the same file (CJP).
    this.hiddenFileInput.value = '';
  }

  handleUpload(evt: CustomEvent) {
    const endpoint = this.endpoint;
    const dynamicChunkSize = this.dynamicChunkSize;

    if (!endpoint) {
      const invalidUrlMessage = 'No url or endpoint specified -- cannot handleUpload';

      this.setAttribute('upload-error', '');
      console.error(invalidUrlMessage);
      this.dispatchEvent(new CustomEvent('uploaderror', { detail: { message: invalidUrlMessage } }));
      // Bail early if no endpoint.
      return;
    } else {
      this.removeAttribute('upload-error');
    }

    this.setAttribute('upload-in-progress', '');

    const upload = UpChunk.createUpload({
      endpoint,
      dynamicChunkSize,
      file: evt.detail,
    });

    this.dispatchEvent(new CustomEvent('uploadstart', { detail: { file: upload.file, chunkSize: upload.chunkSize } }));

    upload.on('attempt', (event) => {
      this.dispatchEvent(new CustomEvent('chunkattempt', event));
    });

    upload.on('chunkSuccess', (event) => {
      this.dispatchEvent(new CustomEvent('chunksuccess', event));
    });

    upload.on('error', (event) => {
      this.setAttribute('upload-error', '');
      console.error(event.detail.message);
      this.dispatchEvent(new CustomEvent('uploaderror', event));
    });

    upload.on('progress', (event) => {
      this.dispatchEvent(new CustomEvent('progress', event));
    });

    upload.on('success', (event) => {
      this.dispatchEvent(new CustomEvent('success', event));
    });
  }
}

type MuxUploaderElementType = typeof MuxUploaderElement;
declare global {
  // eslint-disable-next-line
  var MuxUploaderElement: MuxUploaderElementType;
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get('mux-uploader')) {
  globalThis.customElements.define('mux-uploader', MuxUploaderElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxUploaderElement = MuxUploaderElement;
}

export default MuxUploaderElement;
