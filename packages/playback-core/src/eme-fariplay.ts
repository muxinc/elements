import { MediaError, MuxErrorCategory, MuxErrorCode } from './errors';
import { i18n } from './util';
interface EMEFairplayConfiguration {
  mediaEl: HTMLMediaElement;
  getAppCertificate: () => Promise<BufferSource>;
  getLicenseKey: (spc: ArrayBuffer) => Promise<BufferSource>;
  saveAndDispatchError: (mediaEl: HTMLMediaElement, error: MediaError) => void;
  fallback?: () => void;
  drmTypeCb: () => void;
}

export const setupEmeFairplayDRM = ({
  mediaEl,
  getAppCertificate,
  getLicenseKey,
  fallback,
  saveAndDispatchError,
  drmTypeCb,
}: EMEFairplayConfiguration): (() => Promise<void>) => {
  const context = new FairPlayContext(mediaEl, getAppCertificate, getLicenseKey, saveAndDispatchError, drmTypeCb);

  const encryptedHandler = async (event: MediaEncryptedEvent): Promise<void> => {
    try {
      const initDataType = event.initDataType;
      if (initDataType !== 'skd') {
        console.error(`Received unexpected initialization data type "${initDataType}"`);
        return;
      }

      const initData = event.initData;
      if (initData == null) {
        console.error(`Could not start encrypted playback due to missing initData in ${event.type} event`);
        return;
      }

      await context.setup(initDataType);
      const session = context.createSession();
      await session?.generateRequest(initDataType, initData).catch((e: Error) => {
        if (e.name === 'NotSupportedError') {
          console.warn('Failed to generate license request', e);
          context.teardown();
          fallback?.();
        } else {
          console.error('Failed to generate license request', e);
          const message = i18n(
            'Failed to generate a DRM license request. This may be an issue with the player or your protected content.'
          );
          const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
          mediaError.errorCategory = MuxErrorCategory.DRM;
          mediaError.muxCode = MuxErrorCode.ENCRYPTED_GENERATE_REQUEST_FAILED;
          return Promise.reject(mediaError);
        }
      });
    } catch (error) {
      saveAndDispatchError(mediaEl, error as MediaError);
    }
  };

  mediaEl.addEventListener('encrypted', encryptedHandler);
  return async () => {
    await context.teardown();
    mediaEl.removeEventListener('encrypted', encryptedHandler);
  };
};
class FairPlayContext {
  mediaEl: HTMLMediaElement;
  getAppCertificate: EMEFairplayConfiguration['getAppCertificate'];
  getLicenseKey: EMEFairplayConfiguration['getLicenseKey'];
  saveAndDispatchError: EMEFairplayConfiguration['saveAndDispatchError'];
  drmTypeCb: EMEFairplayConfiguration['drmTypeCb'];

  session: MediaKeySession | null = null;
  certificate: BufferSource | null = null;
  teardownSession: (() => void) | null = null;

  constructor(
    mediaEl: HTMLMediaElement,
    getAppCertificate: EMEFairplayConfiguration['getAppCertificate'],
    getLicenseKey: EMEFairplayConfiguration['getLicenseKey'],
    saveAndDispatchError: EMEFairplayConfiguration['saveAndDispatchError'],
    drmTypeCb: EMEFairplayConfiguration['drmTypeCb']
  ) {
    this.mediaEl = mediaEl;
    this.getAppCertificate = getAppCertificate;
    this.getLicenseKey = getLicenseKey;
    this.saveAndDispatchError = saveAndDispatchError;
    this.drmTypeCb = drmTypeCb;
  }

  async setup(initDataType: MediaEncryptedEvent['initDataType']) {
    if (this.certificate === null) {
      this.certificate = await this.getAppCertificate();
    }

    if (!this.mediaEl.mediaKeys) {
      const access = await this.initMediaAccess(initDataType);
      const mediaKeys = await access.createMediaKeys();
      try {
        await mediaKeys.setServerCertificate(this.certificate);
      } catch {
        const message = i18n(
          'Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.'
        );
        const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
        mediaError.errorCategory = MuxErrorCategory.DRM;
        mediaError.muxCode = MuxErrorCode.ENCRYPTED_UPDATE_SERVER_CERT_FAILED;
        throw mediaError;
      }

      await this.mediaEl.setMediaKeys(mediaKeys);
    }
  }

  async teardown() {
    if (this.mediaEl.mediaKeys) {
      await this.mediaEl.setMediaKeys(null).catch(() => {});
    }
    if (this.teardownSession !== null) {
      this.teardownSession();
    }
    this.teardownSession = null;
    this.certificate = null;
    this.session = null;
  }

  // We keep a reference to the session so we don't create many to different events
  setSession = (newValue: MediaKeySession, newTeardown: () => void) => {
    if (this.session && this.session !== newValue) {
      this.teardownSession?.();
    }
    this.session = newValue;
    this.teardownSession = newTeardown;
  };

  /** Creates a session and sets up it's teardown function */
  createSession() {
    if (!this.mediaEl.mediaKeys) {
      // Should never happen
      throw new Error('Unexpected error creating session. No Media Keys');
    }
    const newSession = this.mediaEl.mediaKeys.createSession();
    const teardownSession = this.setupMediaKeySession(this.mediaEl, newSession);
    this.setSession(newSession, teardownSession);
    return newSession;
  }

  initMediaAccess = async (initDataType: string): Promise<MediaKeySystemAccess> => {
    try {
      const access = await navigator.requestMediaKeySystemAccess('com.apple.fps', [
        {
          initDataTypes: [initDataType],
          videoCapabilities: [{ contentType: 'application/vnd.apple.mpegurl', robustness: '' }],
          distinctiveIdentifier: 'not-allowed',
          persistentState: 'not-allowed',
          sessionTypes: ['temporary'],
        },
      ]);
      this.drmTypeCb();
      return access;
    } catch {
      const message = i18n(
        'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.'
      );
      // Should we flag this as a business exception?
      const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;

      throw mediaError;
    }
  };

  /** Adds event listeners to the given session, returning a teardown function for that specified session */
  setupMediaKeySession = (mediaEl: HTMLMediaElement, session: MediaKeySession) => {
    const onMessageHandler = (ev: MediaKeyMessageEvent) => this.#onMessage(ev);
    const onKeyStatusChangeHandler = (ev: MediaKeySessionEventMap['keystatuseschange']) => this.#onKeyStatusChange(ev);

    const teardownSession = () => {
      if (session) {
        session.removeEventListener('keystatuseschange', onKeyStatusChangeHandler);
        session.removeEventListener('message', onMessageHandler);
        // This call may throw an invalid state error, but it's safe to ignore
        session.close().catch(() => {});
      }
      mediaEl.removeEventListener('webkitcurrentplaybacktargetiswirelesschanged', teardownSession);
      mediaEl.removeEventListener('teardown', teardownSession);

      this.session = null;
      this.teardownSession = null;
    };
    session.addEventListener('keystatuseschange', onKeyStatusChangeHandler);
    session.addEventListener('message', onMessageHandler);
    if ('webkitCurrentPlaybackTargetIsWireless' in mediaEl) {
      // @ts-ignore
      mediaEl.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', teardownSession, { once: true });
    }
    mediaEl.addEventListener('teardown', teardownSession, { once: true });
    return teardownSession;
  };

  #onKeyStatusChange = (event: MediaKeySessionEventMap['keystatuseschange']): void => {
    const updateMediaKeyStatus = (mediaKeyStatus: string): void => {
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
        this.saveAndDispatchError(this.mediaEl, mediaError);
      }
    };

    const session = event.target as MediaKeySession;
    if (session) {
      session.keyStatuses.forEach((keyStatus: string) => updateMediaKeyStatus(keyStatus));
    }
  };

  #onMessage = async (event: MediaKeyMessageEvent): Promise<void> => {
    const session = event.target as MediaKeySession;
    try {
      const spc = event.message;
      const ckc = await this.getLicenseKey(spc);

      try {
        // This is the same call whether we are local or AirPlay.
        // Safari will forward CKC to Apple TV automatically.
        await session.update(ckc);
      } catch {
        const message = i18n(
          'Failed to update DRM license. This may be an issue with the player or your protected content.'
        );
        const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
        mediaError.errorCategory = MuxErrorCategory.DRM;
        mediaError.muxCode = MuxErrorCode.ENCRYPTED_UPDATE_LICENSE_FAILED;

        throw mediaError;
      }
    } catch (errOrResp) {
      console.error('Error on FairPlay session message', errOrResp);
      this.saveAndDispatchError(this.mediaEl, errOrResp as MediaError);
    }
  };
}
