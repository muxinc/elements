declare module 'shared-polyfills' {
  const internalGlobalThis: Window & typeof globalThis;
  export { internalGlobalThis as globalThis };
  export const document: Document;
}
