import { MediaError, MuxErrorCategory, MuxErrorCode } from './errors';
import { i18n } from './util';

export interface NativeFairplayConfig {
  mediaEl: HTMLMediaElement;
  getAppCertificate: () => Promise<ArrayBuffer>;
  getLicenseKey: (spc: ArrayBuffer) => Promise<BufferSource>;
  saveAndDispatchError: (mediaEl: HTMLMediaElement, error: MediaError) => void;
  drmTypeCb: () => void;
  fallbackToWebkitFairplay?: () => Promise<void>;
}

export const setupEmeNativeFairplayDRM = ({
  mediaEl,
  getAppCertificate,
  getLicenseKey,
  saveAndDispatchError,
  drmTypeCb,
  fallbackToWebkitFairplay,
}: NativeFairplayConfig) => {
  let teardownSession: null | (() => Promise<void>) = null;
  /**
   * Listener for "encrypted" event.
   * Will be called when we receive EXT-X-KEY tags and will setup media keys and session.
   */
  const onFpEncrypted = async (event: MediaEncryptedEvent) => {
    try {
      const initDataType = event.initDataType;
      // Early bail if data type is not supported (currently only "skd" for Native Safari DRM)
      if (initDataType !== 'skd') {
        console.error(`Received unexpected initialization data type "${initDataType}"`);
        return;
      }

      // Setup 1 - set up the keys based on the data type (currently only "skd" for Native Safari FPS DRM)
      if (!mediaEl.mediaKeys) {
        await setupMediaKeys(initDataType);
      }

      const initData = event.initData;
      // Early bail if the init data is missing (corresponds to EXT-X-KEY values for Native Safari FPS DRM)
      // NOTE: This could happen before Step 1, but also shouldn't happen.
      if (initData == null) {
        console.error(`Could not start encrypted playback due to missing initData in ${event.type} event`);
        return;
      }

      // Setup 2 - set up the key session based on the data type and the data (corresponds to EXT-X-KEY values for Native Safari FPS DRM)
      await setupMediaKeySession(initDataType, initData);
      // @ts-ignore
    } catch (error: Error | MediaError) {
      saveAndDispatchError(mediaEl, error);
      return;
    }
  };

  /** Setup 1
   *
   * If successful will:
   *  - request media key system access,
   *  - create a media keys object,
   *  - signal what DRM type was selected,
   *  - request a FPS certificate,
   *  - set the certificate to the media keys,
   *  - set the media keys to mediaEl.
   *
   * If any step fails will dispatch an error and mediaEl.mediaKeys will not be set.
   */
  const setupMediaKeys = async (initDataType: string) => {
    // Step 1.a - Get access to the Key System
    const access = await navigator
      .requestMediaKeySystemAccess('com.apple.fps', [
        {
          initDataTypes: [initDataType],
          videoCapabilities: [{ contentType: 'application/vnd.apple.mpegurl', robustness: '' }],
          distinctiveIdentifier: 'not-allowed',
          persistentState: 'not-allowed',
          sessionTypes: ['temporary'],
        },
      ])
      .then((value) => {
        // This is just a simple callback to signal what DRM type was selected
        drmTypeCb();
        return value;
      })
      .catch(() => {
        // This is just error management
        const message = i18n(
          'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.'
        );
        // Should we flag this as a business exception?
        const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
        mediaError.errorCategory = MuxErrorCategory.DRM;
        mediaError.muxCode = MuxErrorCode.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;
        saveAndDispatchError(mediaEl, mediaError);
      });

    if (!access) return;

    // Step 1.b - Create the keys now that access to the key system is available
    const keys = await access.createMediaKeys();

    try {
      // Step 1.c.i - Fetch the FPS App Certificate from the server to use with the keys
      // NOTE: We could pre-emptively do this as an optimization, but
      // this simplifies things and has been sufficient thus far (CJP).
      const fairPlayAppCert = await getAppCertificate();
      // Step 1.c.ii - Apply the fetched FPS App Certificate to the keys
      await keys.setServerCertificate(fairPlayAppCert).catch(() => {
        // This is just error management
        const message = i18n(
          'Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.'
        );
        const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
        mediaError.errorCategory = MuxErrorCategory.DRM;
        mediaError.muxCode = MuxErrorCode.ENCRYPTED_UPDATE_SERVER_CERT_FAILED;
        return Promise.reject(mediaError);
      });
      // @ts-ignore
    } catch (error: Error | MediaError) {
      // This is just catch all error management
      saveAndDispatchError(mediaEl, error);
      return;
    }

    // Step 1.d - Now that the keys are ready, set them on the Media Element
    // NOTE: After this, we will move on to Step 2 - set up the key session
    await mediaEl.setMediaKeys(keys);
  };

  /** Setup 2
   * If successful will:
   *  - Create a new media key session with it's respective 'keystatuseschange' and 'message' events.
   *  - Generate an SPC request
   *  - Use that SPC to fetch a CKC
   *  - Update the session with the obtained CKC.
   *  - Add a teardown listener to cleanup the session.
   *
   * If it fails:
   *  - Will dispatch an error and session should be torn down
   *  - If the session.generateRequest call fails, will fallback to WebKit FairPlay implementation
   */
  const setupMediaKeySession = async (initDataType: string, initData: ArrayBuffer) => {
    // Step 2.a - Create the session now that we have ready media keys on the Media Element.
    const session = (mediaEl.mediaKeys as MediaKeys).createSession();

    // Step 2.b - Call session.generateRequest (done below, after event listeners are set up)

    /** Step 2.c
     * When session.generateRequest succeeds, it returns a spc via this event's message.
     * We use that SPC to fetch the FPS license key from the server.
     */
    const onMessage = async (event: MediaKeyMessageEvent) => {
      const spc = event.message;
      // Step 2.c.i Now that we have an FPS SPC (license request payload) from 2.b, fetch the FPS license key from the server
      const ckc = await getLicenseKey(spc);

      try {
        // This is the same call whether we are local or AirPlay.
        // Safari will forward CKC to Apple TV automatically.
        // Step 2.c.ii - update the session with the license key
        await session.update(ckc);
      } catch {
        // This is just catch all error management
        const message = i18n(
          'Failed to update DRM license. This may be an issue with the player or your protected content.'
        );
        const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
        mediaError.errorCategory = MuxErrorCategory.DRM;
        mediaError.muxCode = MuxErrorCode.ENCRYPTED_UPDATE_LICENSE_FAILED;

        saveAndDispatchError(mediaEl, mediaError);
      }
    };

    /**
     * This is just to monitor for errors.
     */
    const onKeyStatusChange = () => {
      const recheckMediaKeyStatus = (mediaKeyStatus: MediaKeyStatus) => {
        // This is just error management
        let mediaError;
        if (mediaKeyStatus === 'internal-error') {
          const message = i18n(
            'The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.'
          );
          mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
          mediaError.errorCategory = MuxErrorCategory.DRM;
          mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;
        } else if (mediaKeyStatus === 'output-restricted' || mediaKeyStatus === 'output-downscaled') {
          const message = i18n(
            'DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.'
          );
          // NOTE: When encountered, this is a non-fatal error (though it's certainly interruptive of standard playback experience). (CJP)
          mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, false);
          mediaError.errorCategory = MuxErrorCategory.DRM;
          mediaError.muxCode = MuxErrorCode.ENCRYPTED_OUTPUT_RESTRICTED;
        }

        if (mediaError) {
          saveAndDispatchError(mediaEl, mediaError);
        }
      };
      // NOTE: As an improvement, we could also add checks for a status of 'expired' and
      // attempt to renew the license here (CJP)
      session.keyStatuses.forEach((keyStatus) => recheckMediaKeyStatus(keyStatus));
    };

    session.addEventListener('keystatuseschange', onKeyStatusChange);
    session.addEventListener('message', onMessage);

    const newTeardown = async () => {
      session.removeEventListener('keystatuseschange', onKeyStatusChange);
      session.removeEventListener('message', onMessage);
      if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
        // @ts-ignore
        mediaEl.removeEventListener('webkitcurrentplaybacktargetiswirelesschanged', newTeardown);
      }
      mediaEl.removeEventListener('teardown', newTeardown);

      await session.close().catch((e) => {
        /* Will throw an error if closed in an invalid state */
        console.warn('There was an error when closing EME session', e);
      });
      teardownSession = null;
    };

    // If we have a new device, we want a new session
    if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
      // @ts-ignore
      mediaEl.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', newTeardown, { once: true });
    }
    mediaEl.addEventListener('teardown', newTeardown, { once: true });
    teardownSession = newTeardown;

    // Step 2.b - We're finally ready to create a key request from the session. This will trigger a message event
    await session.generateRequest(initDataType, initData).catch(async (e) => {
      if (
        e.name === 'NotSupportedError' &&
        'webkitCurrentPlaybackTargetIsWireless' in mediaEl &&
        mediaEl.webkitCurrentPlaybackTargetIsWireless
      ) {
        console.warn('Failed to generate a DRM license request. Attempting to fallback to Webkit DRM');
        // This is used to address an OS bug when casting DRM protected content with AirPlay
        // TODO: Remove this once Apple fixes this bug.
        fallbackToWebkitFairplay?.();
      } else {
        const message = i18n(
          'Failed to generate a DRM license request. This may be an issue with the player or your protected content.'
        );
        const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
        mediaError.errorCategory = MuxErrorCategory.DRM;
        mediaError.muxCode = MuxErrorCode.ENCRYPTED_GENERATE_REQUEST_FAILED;

        console.error('Failed to generate license request', e);
        return Promise.reject(mediaError);
      }
    });
  };

  /* note: Manually adding/removing teardown function instead of
   * addEventListenerWithTeardown to add extra cleanup logic
   */
  const teardownEme = async () => {
    mediaEl.removeEventListener('encrypted', onFpEncrypted);
    mediaEl.removeEventListener('teardown', teardownEme);
    if (teardownSession) {
      await teardownSession();
    }
    await mediaEl.setMediaKeys(null).catch(() => {});
  };

  mediaEl.addEventListener('encrypted', onFpEncrypted);
  mediaEl.addEventListener('teardown', teardownEme, { once: true });

  return teardownEme;
};
