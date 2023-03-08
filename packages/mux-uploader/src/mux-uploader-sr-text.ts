/// <reference path="../dist/types/shared-polyfills.d.ts" />
import { globalThis, document } from 'shared-polyfills';
import { getMuxUploaderEl } from './utils/element-utils';

const template = document.createElement('template');

template.innerHTML = `
<style>

.sr-only {
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
}
</style>

<div class="sr-only" id="sr-only" aria-live="polite"></div>
`;

class MuxUploaderSrTextElement extends globalThis.HTMLElement {
  srOnlyText: HTMLElement | null | undefined;
  #uploaderEl: HTMLElement | null | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.srOnlyText = this.shadowRoot?.getElementById('sr-only');
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);

    if (this.#uploaderEl) {
      this.#uploaderEl.addEventListener('success', this.updateText.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.#uploaderEl) {
      this.#uploaderEl.removeEventListener('success', this.updateText.bind(this));
    }
  }

  updateText() {
    if (this.srOnlyText) {
      this.srOnlyText.textContent = 'Upload complete!';
    }
  }
}

if (!globalThis.customElements.get('mux-uploader-sr-text')) {
  globalThis.customElements.define('mux-uploader-sr-text', MuxUploaderSrTextElement);
}

export default MuxUploaderSrTextElement;
