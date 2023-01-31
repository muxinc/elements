import { globalThis, document } from 'shared-polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import { MuxUploaderElementEventMap, IMuxUploaderElement } from './mux-uploader';

const template = document.createElement('template');

template.innerHTML = `
<style>

:host([upload-error]) .status-message {
  color: #e22c3e;
}
</style>

<span class="status-message" id="status-message" role="status" aria-live="polite"></span>
`;

class MuxUploaderStatusElement extends globalThis.HTMLElement {
  statusMessage: HTMLElement | null | undefined;
  #uploaderEl: IMuxUploaderElement | null | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.statusMessage = this.shadowRoot?.getElementById('status-message');
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);

    if (this.#uploaderEl) {
      this.#uploaderEl.addEventListener('reset', this.onReset.bind(this));
      this.#uploaderEl.addEventListener('uploaderror', this.onUploadError.bind(this));
      this.#uploaderEl.addEventListener('success', this.onSuccess.bind(this));
      this.#uploaderEl.addEventListener('uploadstart', this.onUploadStart.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.#uploaderEl) {
      this.#uploaderEl.removeEventListener('reset', this.onReset.bind(this));
      this.#uploaderEl.removeEventListener('uploaderror', this.onUploadError.bind(this));
      this.#uploaderEl.removeEventListener('success', this.onSuccess.bind(this));
      this.#uploaderEl.removeEventListener('uploadstart', this.onSuccess.bind(this));
    }
  }

  onReset() {
    if (this.statusMessage) this.statusMessage.innerHTML = '';
  }

  onUploadStart() {
    if (this.statusMessage) {
      this.statusMessage.innerHTML = '';
    }
  }

  onUploadError(e: MuxUploaderElementEventMap['uploaderror']) {
    if (this.statusMessage) {
      this.statusMessage.innerHTML = e.detail.message;
    }
  }

  onSuccess() {
    const successMessage = 'Upload complete!';

    if (this.statusMessage) {
      this.statusMessage.innerHTML = successMessage;
    }

    console.info(successMessage);
  }
}

if (!globalThis.customElements.get('mux-uploader-status')) {
  globalThis.customElements.define('mux-uploader-status', MuxUploaderStatusElement);
}

export default MuxUploaderStatusElement;
