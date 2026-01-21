declare global {
  interface Window {
    WebKitMediaKeys?: {
      new (keySystem: string): WebKitMediaKeys;
      isTypeSupported(keySystem: string, mimeType?: string): boolean;
    };
  }

  class WebKitMediaKeys {
    constructor(keySystem: string);

    createSession(mimeType: string, initData: BufferSource): WebKitMediaKeySession;
    setServerCertificate(cert: ArrayBuffer): boolean;
  }

  interface WebKitMediaKeySession extends EventTarget {
    error: Error | null;
    update(response: BufferSource): Promise<void>;
    close(): Promise<void>;
  }

  interface WebkitHTMLMediaElement extends HTMLMediaElement {
    webkitKeys: WebKitMediaKeys;
    webkitSetMediaKeys(webkitKeys: WebKitMediaKeys): void;
  }

  interface WebkitNeedKeyEvent extends MediaEncryptedEvent {
    target: WebkitHTMLMediaElement;
  }

  interface WebkiKeyMessageEvent extends MediaKeyMessageEvent {
    target: WebKitMediaKeySession;
  }

  interface WebkitKeyErrorEvent extends MediaKeySessionEventMap {
    target: WebKitMediaKeySession;
  }
}

// Needs this to be a module
export {};
