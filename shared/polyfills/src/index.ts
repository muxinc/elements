class EventTarget {
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent(_event: Event) {
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
  get(_name: string) {
    return undefined;
  },
  define(_name: string, _constructor: HTMLElement, _options: any) {},
  upgrade(_root: Node) {},
  whenDefined(_name: string) {
    return Promise.resolve(HTMLElement);
  },
};

class CustomEvent {
  #detail;
  get detail() {
    return this.#detail;
  }
  constructor(typeArg: string, eventInitDict: any = {}) {
    // super(typeArg, eventInitDict);
    this.#detail = eventInitDict?.detail;
  }
  initCustomEvent() {}
}

function createElement(_tagName: string, _options: any) {
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
const GlobalThis = (isServer ? globalThisShim : globalThis) as typeof globalThis;
const Document = (isServer ? globalThisShim.document : globalThis.document) as Document;

export { GlobalThis as globalThis, Document as document };
