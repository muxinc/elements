import { globalThis, document } from '../polyfills';

/* Inspired by HTMLDialogElement &
   https://github.com/GoogleChrome/dialog-polyfill/blob/master/index.js */

const styles = `
  :host {
    z-index: 100;
    display: var(--media-dialog-display, flex);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    color: #fff;
    line-height: 18px;
    font-family: Arial, sans-serif;
    padding: var(--media-dialog-backdrop-padding, 0);
    background: var(--media-dialog-backdrop-background,
      linear-gradient(to bottom, rgba(20, 20, 30, 0.7) 50%, rgba(20, 20, 30, 0.9))
    );
    /* Needs to use !important to prevent overwrite of media-chrome */
    transition: var(--media-dialog-transition-open, visibility .2s, opacity .2s) !important;
    transform: var(--media-dialog-transform-open, none) !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  :host(:not([open])) {
    /* Needs to use !important to prevent overwrite of media-chrome */
    transition: var(--media-dialog-transition-close, visibility .1s, opacity .1s) !important;
    transform: var(--media-dialog-transform-close, none) !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  :focus-visible {
    box-shadow: 0 0 0 2px rgba(27, 127, 204, 0.9);
  }

  .dialog {
    position: relative;
    box-sizing: border-box;
    background: var(--media-dialog-background, none);
    padding: var(--media-dialog-padding, 10px);
    width: min(320px, 100%);
    word-wrap: break-word;
    max-height: 100%;
    overflow: auto;
    text-align: center;
    line-height: 1.4;
  }
`;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    ${styles}
  </style>

  <div class="dialog">
    <slot></slot>
  </div>
`;

class MediaDialog extends globalThis.HTMLElement {
  static styles: string = styles;
  static template: HTMLTemplateElement = template;
  static observedAttributes = ['open'];

  _previouslyFocusedElement?: Element | null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild((this.constructor as any).template.content.cloneNode(true));
  }

  show() {
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('open', { composed: true, bubbles: true }));
    focus(this);
  }

  close() {
    // If already closed, don't re-emit value (circular due to attributeChangedCallback()) (CJP)
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('close', { composed: true, bubbles: true }));
    restoreFocus(this);
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string) {
    if (attrName === 'open' && oldValue !== newValue) {
      newValue != null ? this.show() : this.close();
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }

    if (this.hasAttribute('open')) {
      focus(this);
    }
  }
}

function focus(el: MediaDialog) {
  const initFocus = new CustomEvent('initfocus', { composed: true, bubbles: true, cancelable: true });
  el.dispatchEvent(initFocus);

  // If `event.preventDefault()` was called in a listener prevent focusing.
  if (initFocus.defaultPrevented) return;

  // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
  let target: Element | null | undefined = el.querySelector('[autofocus]:not([disabled])');
  if (!target && el.tabIndex >= 0) {
    target = el;
  }
  if (!target) {
    target = findFocusableElementWithin(el.shadowRoot);
  }

  el._previouslyFocusedElement = document.activeElement;
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  el.addEventListener(
    'transitionend',
    () => {
      if (target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
      }
    },
    { once: true }
  );
}

function findFocusableElementWithin(hostElement: Element | ShadowRoot | null | undefined): Element | null | undefined {
  // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
  // alternative involves stepping through and trying to focus everything.
  const opts = ['button', 'input', 'keygen', 'select', 'textarea'];
  const query = opts.map(function (el) {
    return el + ':not([disabled])';
  });
  // TODO(samthor): tabindex values that are not numeric are not focusable.
  query.push('[tabindex]:not([disabled]):not([tabindex=""])'); // tabindex != "", not disabled
  let target = hostElement?.querySelector(query.join(', '));

  if (!target && 'attachShadow' in Element.prototype) {
    // If we haven't found a focusable target, see if the host element contains an element
    // which has a shadowRoot.
    // Recursively search for the first focusable item in shadow roots.
    const elems = hostElement?.querySelectorAll('*') || [];
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].tagName && elems[i].shadowRoot) {
        target = findFocusableElementWithin(elems[i].shadowRoot);
        if (target) {
          break;
        }
      }
    }
  }

  return target;
}

function restoreFocus(el: MediaDialog) {
  if (el._previouslyFocusedElement instanceof HTMLElement) {
    el._previouslyFocusedElement.focus();
  }
}

if (!globalThis.customElements.get('media-dialog')) {
  globalThis.customElements.define('media-dialog', MediaDialog);
  (globalThis as any).MediaDialog = MediaDialog;
}

export default MediaDialog;
