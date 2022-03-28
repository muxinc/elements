if (typeof DocumentFragment === 'undefined') {
  class DocumentFragment {}
  // @ts-ignore
  globalThis.DocumentFragment = DocumentFragment;
}
