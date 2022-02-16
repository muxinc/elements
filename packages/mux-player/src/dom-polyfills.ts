if (typeof DocumentFragment === "undefined") {
  class DocumentFragment {
    constructor() {}
  }
  // @ts-ignore
  globalThis.DocumentFragment = DocumentFragment;
}
