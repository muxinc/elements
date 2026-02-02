/// <reference types="./webkit-fairplay.d.ts" />

import { MediaError, MuxErrorCategory, MuxErrorCode } from './errors';
import { addEventListenerWithTeardown } from './util';

interface WebkitNativeFairplayConfig {
  mediaEl: HTMLMediaElement;
  getAppCertificate: () => Promise<ArrayBuffer>;
  getLicenseKey: (spc: ArrayBuffer) => Promise<BufferSource>;
  saveAndDispatchError: (mediaEl: HTMLMediaElement, error: MediaError) => void;
}

const LEGACY_KEY_SYSTEM = 'com.apple.fps.1_0';

export const setupWebkitNativeFairplayDRM = ({
  mediaEl,
  getAppCertificate,
  getLicenseKey,
  saveAndDispatchError,
}: WebkitNativeFairplayConfig) => {
  if (!window.WebKitMediaKeys || !('onwebkitneedkey' in mediaEl)) {
    console.error('No WebKitMediaKeys, FairPlay may not be supported');

    const message = `Cannot setup Webkit Native Fairplay DRM`; // TODO: i18n
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

    return saveAndDispatchError(mediaEl, mediaError);
  }

  let session: WebKitMediaKeySession | null = null;
  let teardownSession: (() => void) | null = null;
  // We keep a reference to the session so we don't create many to different events
  const setSession = (newValue: WebKitMediaKeySession | null, newTeardown: (() => void) | null) => {
    if (newValue) {
      session = newValue;
      teardownSession = newTeardown;
    } else {
      session = null;
      teardownSession = null;
    }
  };

  const webkitneedkeyHandler = async (ev: WebkitNeedKeyEvent) => {
    if (session !== null) return;
    const mediaEl: WebkitHTMLMediaElement = ev.target;
    try {
      if (!mediaEl.webkitKeys) {
        setupWebkitKey(mediaEl);
      }

      if (ev.initData === null) return;
      const initData = await getInitData(ev.initData, getAppCertificate);

      // Session may be initialized concurrently while we await the last call. TODO: I want to avoid this.
      if (session) return;

      const newSession = mediaEl.webkitKeys.createSession('application/vnd.apple.mpegurl', initData);
      const teardownSession = setupWebkitKeySession(mediaEl, newSession, getLicenseKey, saveAndDispatchError);
      setSession(newSession, () => {
        teardownSession();
        setSession(null, null);
      });
    } catch (e) {
      console.error('Could not start encrypted playback due to exception', e);
      saveAndDispatchError(mediaEl, e as MediaError);
    }
  };
  // @ts-ignore
  mediaEl.addEventListener('webkitneedkey', webkitneedkeyHandler);

  // Teardown function
  return () => {
    if (teardownSession && typeof teardownSession === 'function') {
      teardownSession();
    }
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
  } catch (e) {
    const message = `Failed to set up WebKit key ${e}`; // TODO: i18n
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;

    throw mediaError;
  }
};

/**
 * Adds necessary event handlers to a new session and returns the function to tear them down
 */
const setupWebkitKeySession = (
  mediaEl: WebkitHTMLMediaElement,
  session: WebKitMediaKeySession,
  getLicenseKey: WebkitNativeFairplayConfig['getLicenseKey'],
  saveAndDispatchError: WebkitNativeFairplayConfig['saveAndDispatchError']
) => {
  const onwebkitkeymessageHandler = async (event: WebkiKeyMessageEvent) => {
    const ckc = await getLicenseKey(event.message);
    event.target.update(ckc);
  };

  const onwebkitkeyerrorHandler = (event: WebkitKeyErrorEvent) => {
    const error = event.target.error;
    if (!error) return;

    const message = `Internal Webkit Key Session Error - sysCode: ${error.systemCode} code: ${error.code}`; // TODO: i18n
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_GENERATE_REQUEST_FAILED;

    saveAndDispatchError(mediaEl, mediaError);
  };

  const teardownSession = () => {
    if (!session) return;
    if ('onwebkitkeymessage' in session) {
      session.onwebkitkeymessage = null;
    }
    if ('onwebkitkeyerror' in session) {
      session.onwebkitkeyerror = null;
    }
    session.close();
  };

  if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
    // @ts-ignore
    addEventListenerWithTeardown(mediaEl, 'webkitcurrentplaybacktargetiswirelesschanged', teardownSession, {
      once: true,
    });
  }
  if ('onwebkitkeymessage' in session) {
    session.onwebkitkeymessage = onwebkitkeymessageHandler;
  }
  if ('onwebkitkeyerror' in session) {
    session.onwebkitkeyerror = onwebkitkeyerrorHandler;
  }
  return teardownSession;
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
const getInitData = async (
  initDataBuffer: ArrayBuffer,
  getAppCertificate: WebkitNativeFairplayConfig['getAppCertificate']
) => {
  const contentIdBuffer = stringToUtf16LE(getContentId(initDataBuffer));
  const certificateBuffer = await getAppCertificate();

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
