import { globalThis, document } from './polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import { type MuxUploaderElementEventMap } from './mux-uploader';
import type MuxUploaderElement from './mux-uploader';

const template = document.createElement('template');

template.innerHTML = `
<style>

:host([upload-error]) {
  color: #e22c3e;
}
</style>

<span id="status-message" role="status" aria-live="polite"></span>
`;

class MuxUploaderStatusElement extends globalThis.HTMLElement {
  statusMessage: HTMLElement | null | undefined;
  #uploaderEl: MuxUploaderElement | null | undefined;
  #abortController: AbortController | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.statusMessage = this.shadowRoot?.getElementById('status-message');
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);
    this.#abortController = new AbortController();

    if (this.#uploaderEl) {
      const opts = { signal: this.#abortController.signal };
      this.#uploaderEl.addEventListener('reset', this.clearStatusMessage, opts);
      this.#uploaderEl.addEventListener('uploaderror', this.onUploadError, opts);
      this.#uploaderEl.addEventListener('success', this.onSuccess, opts);
      this.#uploaderEl.addEventListener('uploadstart', this.clearStatusMessage, opts);
      this.#uploaderEl.addEventListener('offline', this.onOffline, opts);
      this.#uploaderEl.addEventListener('online', this.clearStatusMessage, opts);

      this.toggleAttribute('upload-in-progress', this.#uploaderEl.hasAttribute('upload-in-progress'));
      this.toggleAttribute('upload-complete', this.#uploaderEl.hasAttribute('upload-complete'));
      this.toggleAttribute('upload-error', this.#uploaderEl.hasAttribute('upload-error'));
    }
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  clearStatusMessage = () => {
    this.toggleAttribute('upload-error', false);
    if (this.statusMessage) {
      this.statusMessage.innerHTML = '';
    }
  };

  onUploadError = (e: MuxUploaderElementEventMap['uploaderror']) => {
    this.toggleAttribute('upload-error', true);
    if (this.statusMessage) {
      this.statusMessage.innerHTML = e.detail.message;
    }
  };

  onSuccess = () => {
    this.toggleAttribute('upload-error', false);
    const successMessage = 'Upload complete!';

    if (this.statusMessage) {
      this.statusMessage.innerHTML = successMessage;
    }

    console.info(successMessage);
  };

  onOffline = () => {
    this.toggleAttribute('upload-error', false);
    const offlineMessage = 'Currently offline. Upload will resume automatically when online.';

    if (this.statusMessage) {
      this.statusMessage.innerHTML = offlineMessage;
    }
  };
}

if (!globalThis.customElements.get('mux-uploader-status')) {
  globalThis.customElements.define('mux-uploader-status', MuxUploaderStatusElement);
}

export default MuxUploaderStatusElement;
