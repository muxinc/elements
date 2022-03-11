if (!globalThis.customElements) {
  globalThis.customElements = {
    get(_name) {
      return undefined;
    },
    define(_name, _constructor, _options) {},
    upgrade(_root) {},
    whenDefined(_name) {
      return Promise.resolve(globalThis.HTMLElement);
    },
  };
}

if (!globalThis.CustomEvent) {
  class CustomEvent {
    #detail;
    get detail() {
      this.#detail;
    }
    constructor(typeArg, eventInitDict = {}) {
      // super(typeArg, eventInitDict);
      this.#detail = eventInitDict?.detail;
    }
    initCustomEvent(_typeArg, _canBubbleArg, _cancelableArg, _detailArg) {}
  }
  globalThis.CustomEvent = CustomEvent;
}

if (!globalThis.EventTarget) {
  class EventTarget {
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent(_event) {
      return true;
    }
  }

  globalThis.EventTarget = EventTarget;
}

if (!globalThis.HTMLElement) {
  class HTMLElement extends EventTarget {}

  // NOTE: Adding ts-ignore since `HTMLElement` typedef is much larger than what we're stubbing. Consider more robust TypeScript solution (e.g. downstream usage)
  // @ts-ignore
  globalThis.HTMLElement = HTMLElement;
}

if (!globalThis.document?.createElement) {
  const document = globalThis.document ?? {};
  (document.createElement = function createElement(_tagName, _options) {
    return new HTMLElement();
  }),
    // NOTE: Adding ts-ignore since `document` typedef is much larger than what we're stubbing. Consider more robust TypeScript solution (e.g. downstream usage)
    // @ts-ignore
    (globalThis.document = document);
}
