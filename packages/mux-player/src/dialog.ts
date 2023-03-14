import { globalThis, document } from './polyfills';
import MediaDialog from './media-chrome/dialog';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    ${MediaDialog.styles}

    .close {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      width: 28px;
      height: 28px;
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  </style>

  <div class="dialog">
    <slot></slot>
  </div>

  <slot name="close">
    <button class="close" tabindex="0">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </slot>
`;

class MxpDialog extends MediaDialog {
  static template: HTMLTemplateElement = template;

  constructor() {
    super();

    this.shadowRoot?.querySelector('.close')?.addEventListener('click', () => {
      this.close();
    });
  }
}

if (!globalThis.customElements.get('mxp-dialog')) {
  globalThis.customElements.define('mxp-dialog', MxpDialog);
  (globalThis as any).MxpDialog = MxpDialog;
}

export default MxpDialog;
