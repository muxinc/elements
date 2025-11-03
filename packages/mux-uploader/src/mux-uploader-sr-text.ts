import { globalThis, document } from './polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import type MuxUploaderElement from './mux-uploader';
import { t } from './utils/i18n.js';

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
      const locale = (this.#uploaderEl as MuxUploaderElement)?.locale || 'en';
      this.srOnlyText.textContent = t('Upload complete!', locale);
    }
  }
}

if (!globalThis.customElements.get('mux-uploader-sr-text')) {
  globalThis.customElements.define('mux-uploader-sr-text', MuxUploaderSrTextElement);
}

export default MuxUploaderSrTextElement;
