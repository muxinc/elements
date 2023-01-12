import { globalThis, document } from 'shared-polyfills';
import { EventBus, Registry } from './utils/event-bus';

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

  private successHandler: Registry;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.srOnlyText = this.shadowRoot?.getElementById('sr-only');

    this.successHandler = EventBus.getInstance().register('success', this.updateText.bind(this));
  }

  disconnectedCallback() {
    this.successHandler.unregister();
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
