import { globalThis, document } from './polyfills';

import * as UpChunk from '@mux/upchunk';

import blockLayout from './layouts/block';

const rootTemplate = document.createElement('template');

rootTemplate.innerHTML = /*html*/ `
<style>
  input[type="file"] {
    display: none;
  }
</style>

<input id="hidden-file-input" type="file" accept="video/*" />
<mux-uploader-sr-text></mux-uploader-sr-text>
`;

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
  'file-ready': CustomEvent<File>;
}

interface MuxUploaderElement extends HTMLElement {
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

class MuxUploaderElement extends globalThis.HTMLElement implements MuxUploaderElement {
  protected _endpoint: Endpoint;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // Always attach the root template
    shadow.appendChild(rootTemplate.content.cloneNode(true));

    // Attach a layout
    this.updateLayout();

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
    this.addEventListener('file-ready', this.handleUpload);
    this.addEventListener('reset', this.resetState);
  }

  disconnectedCallback() {
    this.removeEventListener('file-ready', this.handleUpload, false);
    this.removeEventListener('reset', this.resetState);
  }

  attributeChangedCallback() {
    this.updateLayout();
  }

  static get observedAttributes() {
    return ['no-drop', 'no-progress', 'no-status', 'no-retry', 'max-file-size'];
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

  get noDrop(): boolean {
    return this.hasAttribute('no-drop');
  }

  set noDrop(value: boolean) {
    this.toggleAttribute('no-drop', Boolean(value));
  }

  get noProgress(): boolean {
    return this.hasAttribute('no-progress');
  }

  set noProgress(value: boolean) {
    this.toggleAttribute('no-progress', Boolean(value));
  }

  get noStatus(): boolean {
    return this.hasAttribute('no-status');
  }

  set noStatus(value: boolean) {
    this.toggleAttribute('no-status', Boolean(value));
  }

  get noRetry(): boolean {
    return this.hasAttribute('no-retry');
  }

  set noRetry(value: boolean) {
    this.toggleAttribute('no-retry', Boolean(value));
  }

  updateLayout() {
    const oldLayout = this.shadowRoot!.querySelector('mux-uploader-drop, div');
    if (oldLayout) {
      oldLayout.remove();
    }
    const newLayout = blockLayout(this);
    this.shadowRoot!.appendChild(newLayout);
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

  get maxFileSize(): number | undefined {
    const maxFileSize = this.getAttribute('max-file-size');
    return maxFileSize !== null ? parseInt(maxFileSize) : undefined;
  }

  set maxFileSize(value: number | undefined) {
    if (value) {
      this.setAttribute('max-file-size', value.toString());
    } else {
      this.removeAttribute('max-file-size');
    }
  }

  setError(message: string) {
    this.setAttribute('upload-error', '');
    this.dispatchEvent(new CustomEvent('uploaderror', { detail: { message } }));
  }

  resetState() {
    this.removeAttribute('upload-error');
    this.removeAttribute('upload-in-progress');
    this.removeAttribute('upload-complete');
    // Reset file to ensure change/input events will fire, even if selecting the same file (CJP).
    this.hiddenFileInput.value = '';
  }

  handleUpload(evt: CustomEvent) {
    const endpoint = this.endpoint;
    const dynamicChunkSize = this.dynamicChunkSize;

    if (!endpoint) {
      this.setError(`No url or endpoint specified -- cannot handleUpload`);
      // Bail early if no endpoint.
      return;
    } else {
      this.removeAttribute('upload-error');
    }

    try {
      const upload = UpChunk.createUpload({
        endpoint,
        dynamicChunkSize,
        file: evt.detail,
        ...(this.maxFileSize !== undefined
          ? {
              maxFileSize: this.maxFileSize,
            }
          : {}),
      });

      this.setAttribute('upload-in-progress', '');

      this.dispatchEvent(
        new CustomEvent('uploadstart', { detail: { file: upload.file, chunkSize: upload.chunkSize } })
      );

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
        this.removeAttribute('upload-in-progress');
        this.setAttribute('upload-complete', '');

        this.dispatchEvent(new CustomEvent('success', event));
      });
    } catch (err) {
      if (err instanceof Error) {
        this.setError(err.message);
      }
    }
  }
}

type MuxUploaderElementType = typeof MuxUploaderElement;
declare global {
  // eslint-disable-next-line
  var MuxUploaderElement: MuxUploaderElementType;
}

if (!globalThis.customElements.get('mux-uploader')) {
  globalThis.customElements.define('mux-uploader', MuxUploaderElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxUploaderElement = MuxUploaderElement;
}

export default MuxUploaderElement;
