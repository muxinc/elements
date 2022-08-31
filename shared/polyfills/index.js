class EventTarget {
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent(_event) {
    return true;
  }
}

// @github/template-parts requires DocumentFragment to be available on globalThis for SSR
if (typeof DocumentFragment === 'undefined') {
  class DocumentFragment extends EventTarget {}
  // @ts-ignore
  globalThis.DocumentFragment = DocumentFragment;
}

class HTMLElement extends EventTarget {}
class HTMLVideoElement extends EventTarget {}

const customElements = {
  get(_name) {
    return undefined;
  },
  define(_name, _constructor, _options) {},
  upgrade(_root) {},
  whenDefined(_name) {
    return Promise.resolve(HTMLElement);
  },
};

class CustomEvent {
  #detail;
  get detail() {
    return this.#detail;
  }
  constructor(typeArg, eventInitDict = {}) {
    // super(typeArg, eventInitDict);
    this.#detail = eventInitDict?.detail;
  }
  initCustomEvent() {}
}

function createElement(_tagName, _options) {
  return new HTMLElement();
}

const globalThisShim = {
  document: {
    createElement,
  },
  DocumentFragment,
  customElements,
  CustomEvent,
  EventTarget,
  HTMLElement,
  HTMLVideoElement,
};

const isServer = typeof window === 'undefined' || typeof globalThis.customElements === 'undefined';
const GlobalThis = isServer ? globalThisShim : globalThis;
const Document = isServer ? globalThisShim.document : globalThis.document;

export { GlobalThis as globalThis, Document as document };
