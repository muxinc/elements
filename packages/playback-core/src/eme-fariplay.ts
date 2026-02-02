interface EMEFairplayConfiguration {
  mediaEl: HTMLMediaElement;
  getAppCertificate: () => Promise<BufferSource>;
  getLicenseKey: (spc: ArrayBuffer) => Promise<BufferSource>;
  fallback?: () => void;
}

export const setupEmeFairplayDRM = ({
  mediaEl,
  getAppCertificate,
  getLicenseKey,
  fallback,
}: EMEFairplayConfiguration): (() => void) => {
  let session: MediaKeySession | null = null;
  let teardownSession: (() => void) | null = null;
  // We keep a reference to the session so we don't create many to different events
  const setSession = (newValue: MediaKeySession | null, newTeardown: (() => void) | null) => {
    if (newValue) {
      session = newValue;
      teardownSession = newTeardown;
    } else {
      session = null;
      teardownSession = null;
    }
  };

  /* Adds event listeners to the given session, returning a teardown function for that specified session */
  const setupMediaKeySession = (session: MediaKeySession) => {
    const onMessageHandler = (ev: MediaKeyMessageEvent) => onMessage(ev, getLicenseKey);
    const onKeyStatusChangeHandler = (ev: MediaKeySessionEventMap['keystatuseschange']) => onKeyStatusChange(ev);

    const teardownSession = () => {
      if (session) {
        session.removeEventListener('keystatuseschange', onKeyStatusChangeHandler);
        session.removeEventListener('message', onMessageHandler);
        // This call may throw an invalid state error, but it's safe to ignore
        session.close().catch(() => {});
      }
      mediaEl.removeEventListener('webkitcurrentplaybacktargetiswirelesschanged', teardownSession);
      mediaEl.removeEventListener('teardown', teardownSession);
      setSession(null, null);
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

  /* Main handler  */
  const onEncrypted = async (
    event: MediaEncryptedEvent,
    getAppCertificate: () => Promise<BufferSource>
  ): Promise<void> => {
    console.log('Now:', performance.now(), 'Receieved encrypted event'); // TODO: Remove log
    try {
      // TODO: To support key rotation, we would need to refactor this to allow a different init data to create a new session
      if (session) {
        return;
      }

      const initDataType = event.initDataType;
      if (initDataType !== 'skd') {
        console.error(`Received unexpected initialization data type "${initDataType}"`);
        // TODO: Media Error
        return;
      }

      if (!mediaEl.mediaKeys) {
        const mediaKeys = await setupMediaKeys(initDataType, getAppCertificate);
        await mediaEl.setMediaKeys(mediaKeys);
      }

      const initData = event.initData;
      if (initData == null) {
        console.error(`Could not start encrypted playback due to missing initData in ${event.type} event`);
        // TODO: Media Error
        return;
      }

      if (mediaEl.mediaKeys) {
        const session = mediaEl.mediaKeys.createSession();
        teardownSession = setupMediaKeySession(session);
        setSession(session, teardownSession);

        await session.generateRequest(initDataType, initData).catch((e: Error) => {
          console.log('Now:', performance.now(), 'Error on generate Request, falling back', e); // TODO: Remove log
          // TODO: If NotSupportedError, fallback, else fail
          // TODO: Media Error

          teardownSession?.();
          fallback?.();
          /* const message =
                            'Failed to generate a DRM license request. This may be an issue with the player or your protected content.'
                        console.error(message, e);
                        
                        return Promise.reject(message); */
        });
      }
    } catch (error) {
      console.error(error);
      // TODO: Media Error
    }
  };

  const encryptedHandler = (ev: MediaEncryptedEvent): Promise<void> => onEncrypted(ev, getAppCertificate);
  mediaEl.addEventListener('encrypted', encryptedHandler);
  return () => {
    console.log('Now:', performance.now(), 'Tearing down native fairplay drm'); // TODO: Remove log
    mediaEl.removeEventListener('encrypted', encryptedHandler);
    if (mediaEl.mediaKeys) {
      mediaEl.setMediaKeys(null).catch(() => {});
    }
    if (teardownSession) {
      teardownSession();
    }
  };
};

const initMediaAccess = async (initDataType: string): Promise<MediaKeySystemAccess> => {
  const defaultKeySystemConfig = (initDataType: string): MediaKeySystemConfiguration => ({
    initDataTypes: [initDataType],
    videoCapabilities: [{ contentType: 'application/vnd.apple.mpegurl', robustness: '' }],
    distinctiveIdentifier: 'not-allowed',
    persistentState: 'not-allowed',
    sessionTypes: ['temporary'],
  });

  try {
    return await navigator.requestMediaKeySystemAccess('com.apple.fps', [defaultKeySystemConfig(initDataType)]);
  } catch {
    const message =
      'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.';
    console.error(message); // TODO: Media Error
    return Promise.reject(message);
  }
};

const setupMediaKeys = async (
  initDataType: string,
  getAppCertificate: () => Promise<BufferSource>
): Promise<MediaKeys> => {
  const access = await initMediaAccess(initDataType);
  const keys = await access.createMediaKeys();
  const certificate = await getAppCertificate().catch((errOrResp) => {
    return Promise.reject(errOrResp);
  });
  await keys.setServerCertificate(certificate).catch((): Promise<never> => {
    const message =
      'Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.';
    console.error(message); // TODO: Media Error
    return Promise.reject(message);
  });

  return keys;
};

const onKeyStatusChange = (event: MediaKeySessionEventMap['keystatuseschange']): void => {
  const updateMediaKeyStatus = (mediaKeyStatus: string): void => {
    console.log('key status changed', mediaKeyStatus); // TODO: Remove log
    let message;
    if (mediaKeyStatus === 'internal-error') {
      message =
        'The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.';
    } else if (mediaKeyStatus === 'output-restricted' || mediaKeyStatus === 'output-downscaled') {
      message =
        'DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.';
    }

    if (message) {
      console.error(message); // TODO: Media Error
    }
  };

  const session = event.target as MediaKeySession;
  if (session) {
    session.keyStatuses.forEach((keyStatus: string) => updateMediaKeyStatus(keyStatus));
  }
};

const onMessage = async (
  event: MediaKeyMessageEvent,
  getLicenseKey: EMEFairplayConfiguration['getLicenseKey']
): Promise<void> => {
  const session = event.target as MediaKeySession;
  try {
    const spc = event.message;
    const ckc = await getLicenseKey(spc);

    try {
      // This is the same call whether we are local or AirPlay.
      // Safari will forward CKC to Apple TV automatically.
      await session.update(ckc);
    } catch (updateError) {
      const message = 'Failed to update DRM license. This may be an issue with the player or your protected content.';

      console.error(message, updateError); // TODO: Media Error
    }
  } catch (errOrResp) {
    console.error('Error in license key request:', errOrResp); // TODO: Media Error
  }
};
