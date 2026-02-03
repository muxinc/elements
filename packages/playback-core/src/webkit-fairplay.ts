/// <reference types="./webkit-fairplay.d.ts" />

import { MediaError, MuxErrorCategory, MuxErrorCode } from './errors';
import { i18n } from './util';

interface WebkitNativeFairplayConfig {
  mediaEl: HTMLMediaElement;
  getAppCertificate: () => Promise<ArrayBuffer>;
  getLicenseKey: (spc: ArrayBuffer) => Promise<BufferSource>;
  saveAndDispatchError: (mediaEl: HTMLMediaElement, error: MediaError) => void;
  drmTypeCb: () => void;
}

const LEGACY_KEY_SYSTEM = 'com.apple.fps.1_0';

export const setupWebkitNativeFairplayDRM = async ({
  mediaEl,
  getAppCertificate,
  getLicenseKey,
  saveAndDispatchError,
  drmTypeCb,
}: WebkitNativeFairplayConfig) => {
  if (!window.WebKitMediaKeys || !('onwebkitneedkey' in mediaEl)) {
    console.error('No WebKitMediaKeys. FairPlay may not be supported');

    const message = i18n(
      'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.'
    );
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

    return saveAndDispatchError(mediaEl, mediaError);
  }

  const wkMediaEl: WebkitHTMLMediaElement = mediaEl as unknown as WebkitHTMLMediaElement;

  if (!wkMediaEl.webkitKeys) {
    setupWebkitKey(wkMediaEl);
    drmTypeCb();
  }
  // @ts-ignore
  const context = new WebkitFairPlayContext(mediaEl, getAppCertificate, getLicenseKey, saveAndDispatchError, drmTypeCb);

  const webkitneedkeyHandler = async (ev: WebkitNeedKeyEvent) => {
    const wkMediaEl: WebkitHTMLMediaElement = ev.target;
    try {
      await context.setup();
      const certificate = context.certificate;

      if (ev.initData === null || certificate == null) return;
      const initData = getInitData(ev.initData, certificate);

      context.createSession(wkMediaEl, initData);
    } catch (e) {
      console.error('Could not start encrypted playback due to exception', e);
      saveAndDispatchError(wkMediaEl, e as MediaError);
    }
  };
  // @ts-ignore
  mediaEl.addEventListener('webkitneedkey', webkitneedkeyHandler);

  // Teardown function
  return () => {
    context.teardown();
    // @ts-ignore
    mediaEl.removeEventListener('webkitneedkey', webkitneedkeyHandler);
  };
};

/**
 * Adds a webkit Media key using {@link LEGACY_KEY_SYSTEM}.
 * Throws a MediaError if the operation is not supported.
 */
const setupWebkitKey = (mediaEl: WebkitHTMLMediaElement) => {
  try {
    const mediaKeys = new WebKitMediaKeys(LEGACY_KEY_SYSTEM);
    mediaEl.webkitSetMediaKeys(mediaKeys);
  } catch {
    const message =
      'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.';
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;

    throw mediaError;
  }
};

/**
 * Expects initData buffer to come in the following format:
 * [4 bytes length][init data words] where the words consist of 16 bit LE words, and length is number of bytes (i.e. 2 * number of words)
 *
 * @param initDataBuffer as obtained from the native event.
 * @param getAppCertificate a function that returns the needed certificate in .dar format as an ArrayBuffer of bytes.
 * @returns Uint8Array of initData in the format:
 * [4 bytes init data length][init data bytes]
 * [4 bytes content Id length][content id bytes]
 * [4 bytes certificate length][certificate bytes]
 */
const getInitData = (initDataBuffer: ArrayBuffer, certificateBuffer: ArrayBuffer) => {
  const contentIdBuffer = stringToUtf16LE(getContentId(initDataBuffer));

  const initData: Uint8Array = new Uint8Array(initDataBuffer);
  const contentId: Uint8Array = new Uint8Array(contentIdBuffer);
  const certificate: Uint8Array = new Uint8Array(certificateBuffer);

  const newLength = initData.byteLength + 4 + certificate.byteLength + 4 + contentId.byteLength;
  const rebuiltInitData = new Uint8Array(newLength);
  let offset = 0;
  const append = (array: Uint8Array) => {
    rebuiltInitData.set(array, offset);
    offset += array.byteLength;
  };
  const appendWithLength = (array: Uint8Array) => {
    const view = new DataView(rebuiltInitData.buffer);
    const value = array.byteLength;
    view.setUint32(offset, value, /* littleEndian= */ true);
    offset += 4;
    append(array);
  };

  append(initData);
  appendWithLength(contentId);
  appendWithLength(certificate);

  return rebuiltInitData;
};

const getContentId = (initData: ArrayBuffer) => {
  const sdkUrl = new TextDecoder('utf-16le').decode(initData);
  return sdkUrl.replace('skd://', '').slice(1); // First char is length
};

function stringToUtf16LE(str: string) {
  const buffer = new ArrayBuffer(str.length * 2);
  const view = new DataView(buffer);

  for (let i = 0; i < str.length; i++) {
    view.setUint16(i * 2, str.charCodeAt(i), true); // little-endian
  }

  return buffer;
}

class WebkitFairPlayContext {
  mediaEl: WebkitHTMLMediaElement;
  getAppCertificate: WebkitNativeFairplayConfig['getAppCertificate'];
  getLicenseKey: WebkitNativeFairplayConfig['getLicenseKey'];
  saveAndDispatchError: WebkitNativeFairplayConfig['saveAndDispatchError'];
  drmTypeCb: WebkitNativeFairplayConfig['drmTypeCb'];

  session: WebKitMediaKeySession | null = null;
  certificate: ArrayBuffer | null = null;
  teardownSession: (() => void) | null = null;

  constructor(
    mediaEl: WebkitHTMLMediaElement,
    getAppCertificate: WebkitNativeFairplayConfig['getAppCertificate'],
    getLicenseKey: WebkitNativeFairplayConfig['getLicenseKey'],
    saveAndDispatchError: WebkitNativeFairplayConfig['saveAndDispatchError'],
    drmTypeCb: WebkitNativeFairplayConfig['drmTypeCb']
  ) {
    this.mediaEl = mediaEl;
    this.getAppCertificate = getAppCertificate;
    this.getLicenseKey = getLicenseKey;
    this.saveAndDispatchError = saveAndDispatchError;
    this.drmTypeCb = drmTypeCb;
  }

  async setup() {
    if (this.certificate === null) {
      this.certificate = await this.getAppCertificate();
    }
  }

  teardown() {
    if (this.teardownSession !== null) {
      this.teardownSession();
    }
    if (this.mediaEl.webkitKeys) {
      try {
        this.mediaEl.webkitSetMediaKeys(null);
      } catch (e) {
        console.warn('There was an error tearing down WebkitKeys', e);
      }
    }
    this.teardownSession = null;
    this.certificate = null;
    this.session = null;
  }

  // We keep a reference to the session so we don't create many to different events
  setSession = (newValue: WebKitMediaKeySession, newTeardown: () => void) => {
    if (this.session && this.session !== newValue) {
      this.teardownSession?.();
    }
    this.session = newValue;
    this.teardownSession = newTeardown;
  };

  createSession(mediaEl: WebkitHTMLMediaElement, initData: BufferSource) {
    if (!this.mediaEl.webkitKeys) {
      // Should never happen
      throw new Error('Unexpected error creating session. No Media Keys');
    }
    const newSession = mediaEl.webkitKeys.createSession('application/vnd.apple.mpegurl', initData);
    const teardownSession = this.setupWebkitKeySession(mediaEl, newSession);
    this.setSession(newSession, teardownSession);
  }

  /**
   * Adds necessary event handlers to a new session and returns the function to tear them down
   */
  setupWebkitKeySession = (mediaEl: WebkitHTMLMediaElement, session: WebKitMediaKeySession) => {
    const onwebkitkeymessageHandler = async (event: WebkiKeyMessageEvent) => {
      try {
        const spc = event.message;
        const ckc = await this.getLicenseKey(spc);
        event.target.update(ckc);
      } catch (errOrResp) {
        console.error('Error on FairPlay session message', errOrResp);
        this.saveAndDispatchError(this.mediaEl, errOrResp as MediaError);
      }
    };

    const onwebkitkeyerrorHandler = (event: WebkitKeyErrorEvent) => {
      const error = event.target.error;
      if (!error) return;
      console.error(`Internal Webkit Key Session Error - sysCode: ${error.systemCode} code: ${error.code}`);

      const message = i18n(
        'The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.'
      );
      const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

      this.saveAndDispatchError(mediaEl, mediaError);
    };

    const teardownSession = () => {
      if (!session) return;
      if ('onwebkitkeymessage' in session) {
        session.onwebkitkeymessage = null;
      }
      if ('onwebkitkeyerror' in session) {
        session.onwebkitkeyerror = null;
      }
      try {
        session.close();
      } catch {}
      if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
        mediaEl.removeEventListener('webkitcurrentplaybacktargetiswirelesschanged', teardownSession);
      }

      this.teardownSession = null;
      this.session = null;
    };

    if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
      mediaEl.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', teardownSession, { once: true });
    }
    if ('onwebkitkeymessage' in session) {
      session.onwebkitkeymessage = onwebkitkeymessageHandler;
    }
    if ('onwebkitkeyerror' in session) {
      session.onwebkitkeyerror = onwebkitkeyerrorHandler;
    }
    return teardownSession;
  };
}
