declare module 'shared-polyfills';

declare const GlobalThis: Window & typeof globalThis;
declare const Document: Document;
export { GlobalThis as globalThis, Document as document };
