import { globalThis, document } from 'shared-polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import { MuxUploaderElementEventMap, IMuxUploaderElement } from './mux-uploader';

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
  #uploaderEl: IMuxUploaderElement | null | undefined;
  #controller: AbortController | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.statusMessage = this.shadowRoot?.getElementById('status-message');
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);
    this.#controller = new AbortController();

    if (this.#uploaderEl) {
      const opts = { signal: this.#controller.signal };
      this.#uploaderEl.addEventListener('reset', this.clearStatusMessage, opts);
      this.#uploaderEl.addEventListener('uploaderror', this.onUploadError, opts);
      this.#uploaderEl.addEventListener('success', this.onSuccess, opts);
      this.#uploaderEl.addEventListener('uploadstart', this.clearStatusMessage, opts);
    }
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  clearStatusMessage = () => {
    if (this.statusMessage) {
      this.statusMessage.innerHTML = '';
    }
  };

  onUploadError = (e: MuxUploaderElementEventMap['uploaderror']) => {
    if (this.statusMessage) {
      this.statusMessage.innerHTML = e.detail.message;
    }
  };

  onSuccess = () => {
    const successMessage = 'Upload complete!';

    if (this.statusMessage) {
      this.statusMessage.innerHTML = successMessage;
    }

    console.info(successMessage);
  };
}

if (!globalThis.customElements.get('mux-uploader-status')) {
  globalThis.customElements.define('mux-uploader-status', MuxUploaderStatusElement);
}

export default MuxUploaderStatusElement;
