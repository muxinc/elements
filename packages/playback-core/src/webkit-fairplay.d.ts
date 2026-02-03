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

  /**
   * From https://developer.apple.com/documentation/webkitjs/webkitmediakeyerror
   * - MEDIA_KEYERR_CLIENT
   * - MEDIA_KEYERR_DOMAIN
   * - MEDIA_KEYERR_HARDWARECHANGE
   * - MEDIA_KEYERR_OUTPUT
   * - MEDIA_KEYERR_SERVICE
   * - MEDIA_KEYERR_UNKNOWN
   */
  interface WebKitMediaKeysError {
    code: number;
    systemCode: number;
  }

  interface WebKitMediaKeySession extends EventTarget {
    error: WebKitMediaKeysError | null;
    update(response: BufferSource): Promise<void>;
    close(): Promise<void>;
  }

  interface WebkitHTMLMediaElement extends HTMLMediaElement {
    webkitKeys: WebKitMediaKeys;
    webkitSetMediaKeys(webkitKeys: WebKitMediaKeys | null): void;
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
