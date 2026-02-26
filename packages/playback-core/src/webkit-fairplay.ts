/// <reference types="./webkit-fairplay.d.ts" />

import { NativeFairplayConfig } from './eme-fairplay';
import { MediaError, MuxErrorCategory, MuxErrorCode } from './errors';
import { i18n } from './util';

const LEGACY_KEY_SYSTEM = 'com.apple.fps.1_0';
const MIME_TYPE = 'application/vnd.apple.mpegurl';

/**
 * Legacy implementation of FairPlay setup.
 * The purpose of this flow is to address an OS specific issue when playing DRM
 * protected content over AirPlay on newer OS versions. Tries to replicate the setup
 * we do for EME DRM but using legacy WebKit functions.
 *
 * This flow can be removed once that issue is no longer present.
 */
export const setupWebkitNativeFairplayDRM = ({
  mediaEl,
  getAppCertificate,
  getLicenseKey,
  saveAndDispatchError,
  drmTypeCb,
}: NativeFairplayConfig) => {
  // Support for this may be dropped in future WebKit versions so we add this guard.
  if (!window.WebKitMediaKeys || !('onwebkitneedkey' in mediaEl)) {
    console.error('No WebKitMediaKeys. FairPlay may not be supported');

    const message = i18n(
      'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.'
    );
    const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
    mediaError.errorCategory = MuxErrorCategory.DRM;
    mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

    saveAndDispatchError(mediaEl, mediaError);
    // empty teardown
    return () => {};
  }

  const wkMediaEl = mediaEl as unknown as WebkitHTMLMediaElement;

  // Don't await as to not block setup to fetch certificate
  const certificatePromise = getAppCertificate();
  // Hold a reference to teardown session on this function's teardown
  let teardownSession: (() => void) | null = null;

  /**
   * Listener for "webkitneedkey" event.
   * Will be called when we receive EXT-X-KEY tags and will setup media keys and session.
   */
  const onWebkitNeedKey = (ev: WebkitNeedKeyEvent) => {
    // note: Promises only resolve once, so we wrap it in an anonymous funciton to use as an event listener
    const handle = async () => {
      try {
        // Setup 1 - set up the keys based on the data type (currently only "skd" for Native Safari FPS DRM)
        if (!wkMediaEl.webkitKeys) {
          setupWebkitKey();
        }

        const certificate = await certificatePromise;
        // Early bail if the init data is missing (corresponds to EXT-X-KEY values for Native Safari FPS DRM)
        // NOTE: This could happen before Step 1, but also shouldn't happen.
        if (ev.initData === null || certificate == null) return;

        const initData = getInitData(ev.initData, certificate);
        // Setup 2 - set up the key session based on the data type and the data (corresponds to EXT-X-KEY values for Native Safari FPS DRM)
        setupWebkitKeySession(initData);
      } catch (e) {
        console.error('Could not start encrypted playback due to exception', e);
        saveAndDispatchError(wkMediaEl, e as MediaError);
      }
    };

    handle();
  };

  /** Setup 1
   *
   * If successful will:
   *  - create a Webkit Media Keys object,
   *  - signal what DRM type was selected.
   *  - set the Webkit Media Keys to mediaEl.
   *
   * If it fails will throw an error in order to abort setup.
   */
  const setupWebkitKey = () => {
    try {
      // (Step 1.b in EME)
      const mediaKeys = new WebKitMediaKeys(LEGACY_KEY_SYSTEM);
      // (Step 1.d in EME)
      wkMediaEl.webkitSetMediaKeys(mediaKeys);
      // This is just a simple callback to signal what DRM type was selected
      drmTypeCb();
    } catch {
      const message =
        'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.';
      const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;

      throw mediaError;
    }
  };

  /** Setup 2
   * If successful will:
   *  - Create a new media key session with it's respective 'webkitkeyerror' and 'webkitkeymessage' events.
   *  - Generate an SPC request
   *  - Use that SPC to fetch a CKC
   *  - Update the session with the obtained CKC.
   *  - Add a teardown listener to cleanup the session.
   *
   * If it fails:
   *  - Will dispatch an error and session should be torn down
   */
  const setupWebkitKeySession = (initData: BufferSource) => {
    // Step 2.a - Create the session now that we have ready media keys on the Media Element.
    const session = wkMediaEl.webkitKeys.createSession(MIME_TYPE, initData);

    /** Step 2.b
     * At some point a WebKit Key Message event is fired with a SPC.
     * We use that SPC to fetch the FPS license key from the server.
     *
     * On EME this would be Step 2.c, but session.generateRequest is not done in WebKit
     */
    const onWebkitKeyMessage = async (event: WebkiKeyMessageEvent) => {
      try {
        const spc = event.message;
        const ckc = await getLicenseKey(spc);
        session.update(ckc);
      } catch (errOrResp) {
        console.error('Error on FairPlay session message', errOrResp);
        saveAndDispatchError(mediaEl, errOrResp as MediaError);
      }
    };

    const onWebkitKeyError = (event: WebkitKeyErrorEvent) => {
      const error = event.target.error;
      if (!error) return;
      console.error(`Internal Webkit Key Session Error - sysCode: ${error.systemCode} code: ${error.code}`);

      const message = i18n(
        'The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.'
      );
      const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;

      saveAndDispatchError(mediaEl, mediaError);
    };

    // TODO: Improvement: It's possible that many JS Session objects are created
    // for the same internal session resource (this is not documented, but could happen if
    // many webkitneedkey events are fired).
    // This may lead to unnecessary event listeners being created.
    // If this becomes an issue, we should implement better cleanup.
    // For example separating event cleanup from session.close
    const newTeardown = () => {
      // Remove all event listeners first to prevent events firing during cleanup
      // @ts-ignore
      session.removeEventListener('webkitkeymessage', onWebkitKeyMessage);
      // @ts-ignore
      session.removeEventListener('webkitkeyerror', onWebkitKeyError);
      mediaEl.removeEventListener('teardown', newTeardown);
      if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
        mediaEl.removeEventListener('webkitcurrentplaybacktargetiswirelesschanged', newTeardown);
      }

      teardownSession = null;

      try {
        session.close();
      } catch {}
    };

    if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
      mediaEl.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', newTeardown, { once: true });
    }

    // @ts-ignore
    session.addEventListener('webkitkeymessage', onWebkitKeyMessage);
    // @ts-ignore
    session.addEventListener('webkitkeyerror', onWebkitKeyError);
    mediaEl.addEventListener('teardown', newTeardown);

    teardownSession = newTeardown;
  };

  const teardownWebkit = () => {
    // Remove event listeners first to prevent new key requests during cleanup
    // @ts-ignore
    mediaEl.removeEventListener('webkitneedkey', onWebkitNeedKey);
    mediaEl.removeEventListener('teardown', teardownWebkit);

    teardownSession?.();

    try {
      wkMediaEl.webkitSetMediaKeys(null);
    } catch {}
  };

  // @ts-ignore
  mediaEl.addEventListener('webkitneedkey', onWebkitNeedKey);
  mediaEl.addEventListener('teardown', teardownWebkit, { once: true });

  return teardownWebkit;
};

/// Utility functions

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
