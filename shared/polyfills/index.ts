/* eslint @typescript-eslint/no-empty-function: "off", @typescript-eslint/no-unused-vars: "off" */

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

const customElements: CustomElementRegistry = {
  get(_name: string) {
    return undefined;
  },
  define(_name, _constructor, _options) {},
  upgrade(_root) {},
  whenDefined(_name) {
    return Promise.resolve(HTMLElement as unknown as CustomElementConstructor);
  },
};

class CustomEvent {
  #detail;
  get detail() {
    return this.#detail;
  }
  constructor(typeArg: string, eventInitDict: CustomEventInit = {}) {
    // super(typeArg, eventInitDict);
    this.#detail = eventInitDict?.detail;
  }
  initCustomEvent() {}
}

function createElement(_tagName: string, _options?: ElementCreationOptions): HTMLElement {
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

// const isServer = typeof window === 'undefined' || typeof globalThis.customElements === 'undefined';
// const GlobalThis = isServer ? globalThisShim : globalThis;
// const Document = isServer ? globalThisShim.document : globalThis.document;
//
// export { GlobalThis as globalThis, Document as document };
const isServer = typeof window === 'undefined' || typeof globalThis.customElements === 'undefined';
type GlobalThis = typeof globalThis;
const internalGlobalThis: GlobalThis = (isServer ? globalThisShim : globalThis) as GlobalThis;
const internalDocument: Document = (isServer ? globalThisShim.document : globalThis.document) as Document;

export { internalGlobalThis as globalThis, internalDocument as document };
