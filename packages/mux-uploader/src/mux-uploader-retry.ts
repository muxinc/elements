import { globalThis, document } from 'shared-polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import type MuxUploaderElement from './mux-uploader';

const template = document.createElement('template');

template.innerHTML = `
<style>
  #retry-button {
    color: #e22c3e;
    text-decoration-line: underline;
    cursor: pointer;
    position: relative;
    display: none;
  }

  :host([upload-error]) #retry-button {
    display: inline-block;
  }
</style>

<span id="retry-button" role="button" tabindex="0">Try again</span>
`;

class MuxUploaderRetryElement extends globalThis.HTMLElement {
  retryButton: HTMLElement | null | undefined;
  #uploaderEl: MuxUploaderElement | null | undefined;
  #controller: AbortController | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.retryButton = this.shadowRoot?.getElementById('retry-button');
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);
    this.#controller = new AbortController();

    if (this.#uploaderEl) {
      const opts = { signal: this.#controller.signal };

      this.retryButton?.addEventListener('click', this.triggerReset, opts);
      this.retryButton?.addEventListener('keyup', this.handleKeyup, opts);
    }
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  handleKeyup = (e: KeyboardEvent) => {
    const ButtonPressedKeys = ['Enter', ' '];
    const { key } = e;
    if (!ButtonPressedKeys.includes(key)) {
      return;
    }

    this.triggerReset();
  };

  triggerReset = () => {
    this.#uploaderEl?.dispatchEvent(new CustomEvent('reset'));
  };
}

if (!globalThis.customElements.get('mux-uploader-retry')) {
  globalThis.customElements.define('mux-uploader-retry', MuxUploaderRetryElement);
}

export default MuxUploaderRetryElement;
