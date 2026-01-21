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
    console.error('No WebKitMediaKeys; FairPlay may not be supported');

    const message = `Cannot setup Webkit Native Fairplay DRM`; // TODO: i18n
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

    return saveAndDispatchError(mediaEl, mediaError);
  }

  const webkitneedkeyHandler: (ev: WebkitNeedKeyEvent) => void = (ev: WebkitNeedKeyEvent) =>
    onwebkitneedkey(ev, getAppCertificate, getLicenseKey, saveAndDispatchError);
  // @ts-ignore
  addEventListenerWithTeardown(mediaEl, 'webkitneedkey', webkitneedkeyHandler);
};

async function onwebkitneedkey(
  event: WebkitNeedKeyEvent,
  getAppCertificate: () => Promise<ArrayBuffer>,
  getLicenseKey: (spc: ArrayBuffer) => Promise<BufferSource>,
  saveAndDispatchError: WebkitNativeFairplayConfig['saveAndDispatchError']
) {
  const mediaEl: WebkitHTMLMediaElement = event.target;
  try {
    if (!mediaEl.webkitKeys) {
      setupWebkitKey(mediaEl);
    }

    if (event.initData === null) return;
    const initData = await getInitData(event.initData, getAppCertificate);
    setupWebkitKeySession(mediaEl, initData, getLicenseKey, saveAndDispatchError);
  } catch (e) {
    console.error('Could not start encrypted playback due to exception', e);
    saveAndDispatchError(mediaEl, e as MediaError);
  }
}

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

const setupWebkitKeySession = (
  mediaEl: WebkitHTMLMediaElement,
  initData: BufferSource,
  getLicenseKey: WebkitNativeFairplayConfig['getLicenseKey'],
  saveAndDispatchError: WebkitNativeFairplayConfig['saveAndDispatchError']
) => {
  try {
    const session = mediaEl.webkitKeys.createSession('application/vnd.apple.mpegurl', initData);

    const onwebkitkeymessageHandler = async (event: WebkiKeyMessageEvent) => {
      const ckc = await getLicenseKey(event.message);
      event.target.update(ckc);
    };

    const onwebkitkeyerrorHandler = (event: WebkitKeyErrorEvent) => {
      const message = `Internal Webkit Key Session Error ${event.target.error}`; // TODO: i18n
      const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_GENERATE_REQUEST_FAILED;

      saveAndDispatchError(mediaEl, mediaError);
    };

    const cleanup = () => {
      if ('onwebkitkeymessage' in session) {
        session.onwebkitkeymessage = null;
      }
      if ('onwebkitkeyerror' in session) {
        session.onwebkitkeyerror = null;
      }
      session.close();
    };
    mediaEl.addEventListener('teardown', cleanup, { once: true });

    if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
      // @ts-ignore
      addEventListenerWithTeardown(mediaEl, 'webkitcurrentplaybacktargetiswirelesschanged', cleanup, { once: true });
    }
    if ('onwebkitkeymessage' in session) {
      session.onwebkitkeymessage = onwebkitkeymessageHandler;
    }
    if ('onwebkitkeyerror' in session) {
      session.onwebkitkeyerror = onwebkitkeyerrorHandler;
    }
    return session;
  } catch (e) {
    const message = `Failed to set up WebKit key session ${e}`; // TODO: i18n
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

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
