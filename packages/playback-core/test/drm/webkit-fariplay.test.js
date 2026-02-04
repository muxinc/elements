import { assert, fixture } from '@open-wc/testing';
import { MediaError, MuxErrorCategory, MuxErrorCode } from '../../src/errors.ts';
import { setupWebkitNativeFairplayDRM } from '../../src/webkit-fairplay.ts';
import { mockEventListeners } from '../helpers/event-listener-mock.js';

/**
 * Check if the browser is Safari (where WebKit FairPlay is supported)
 */
const isSafari = () => {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

// Only run these tests in Safari
const describeIfSafari = isSafari() ? describe : describe.skip;

describeIfSafari('WebKit FairPlay DRM', () => {
  let mediaEl;
  let errorCalls;
  let drmTypeCallCount;
  let eventListenerMock;

  const mockCertificate = new Uint8Array([0, 2, 0, 1]).buffer;
  const mockLicenseKey = new Uint8Array([0, 2, 0, 1]).buffer;

  const getAppCertificate = () => Promise.resolve(mockCertificate);
  const getLicenseKey = (_spc) => Promise.resolve(mockLicenseKey);
  const saveAndDispatchError = (_mediaEl, err) => {
    errorCalls.push(err);
  };
  const drmTypeCb = () => {
    drmTypeCallCount++;
  };

  beforeEach(async () => {
    errorCalls = [];
    drmTypeCallCount = 0;

    mediaEl = await fixture(`<video
      src="https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/low.mp4"
      preload="auto"
      crossorigin
      muted
    ></video>`);

    // Mock addEventListener and removeEventListener to track listeners
    eventListenerMock = mockEventListeners(mediaEl);

    // Mock WebKit FairPlay APIs if they don't exist
    if (!window.WebKitMediaKeys) {
      console.warn('Running tests in environment with no Webkit Media Keys');
      window.WebKitMediaKeys = class {
        constructor(keySystem) {
          this.keySystem = keySystem;
        }
        createSession(mimeType, initData) {
          return new MockWebKitMediaKeySession();
        }
      };
    }

    if (!('onwebkitneedkey' in mediaEl)) {
      mediaEl.onwebkitneedkey = null;
    }
  });

  afterEach(() => {
    // Restore original addEventListener and removeEventListener
    if (eventListenerMock) {
      eventListenerMock.restore();
      eventListenerMock = null;
    }

    // Clean up event listeners
    if (mediaEl) {
      mediaEl.onwebkitneedkey = null;
    }
  });

  describe('Setup and Teardown', () => {
    it('should add webkitneedkey event listener on setup', async function () {
      const teardown = await setupWebkitNativeFairplayDRM({
        mediaEl,
        getAppCertificate,
        getLicenseKey,
        saveAndDispatchError,
        drmTypeCb,
      });

      assert.isTrue(mediaEl.hasEventListener('webkitneedkey'));
      teardown();
      assert.isFalse(mediaEl.hasEventListener('webkitneedkey'));
    });

    it('should call drmTypeCb when setting up MediaKeys', async function () {
      assert.equal(drmTypeCallCount, 0);

      const teardown = await setupWebkitNativeFairplayDRM({
        mediaEl,
        getAppCertificate,
        getLicenseKey,
        saveAndDispatchError,
        drmTypeCb,
      });

      assert.equal(drmTypeCallCount, 1);
      teardown();
      assert.equal(drmTypeCallCount, 1);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing WebKitMediaKeys gracefully', async function () {
      const originalWebKitMediaKeys = window.WebKitMediaKeys;
      delete window.WebKitMediaKeys;
      delete mediaEl.onwebkitneedkey;

      try {
        await setupWebkitNativeFairplayDRM({
          mediaEl,
          getAppCertificate,
          getLicenseKey,
          saveAndDispatchError,
          drmTypeCb,
        });

        assert.isTrue(errorCalls.length > 0, 'Should dispatch error');
        const error = errorCalls[0];
        assert.equal(error.errorCategory, MuxErrorCategory.DRM);
        assert.equal(error.muxCode, MuxErrorCode.ENCRYPTED_CDM_ERROR);
      } finally {
        window.WebKitMediaKeys = originalWebKitMediaKeys;
      }
    });

    it('should dispatch error if certificate fetch fails', async function () {
      const failingGetAppCertificate = () =>
        Promise.reject(new MediaError('Certificate failed', MediaError.MEDIA_ERR_ENCRYPTED));

      const teardown = await setupWebkitNativeFairplayDRM({
        mediaEl,
        getAppCertificate: failingGetAppCertificate,
        getLicenseKey,
        saveAndDispatchError,
        drmTypeCb,
      });

      // Simulate webkitneedkey event
      const event = new CustomEvent('webkitneedkey', {
        detail: {
          initData: new Uint8Array([1, 2, 3, 4]).buffer,
        },
      });
      mediaEl.dispatchEvent(event);

      // Give async operations time to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      teardown();
    });
  });

  describe('Event Handling', () => {
    it('should handle webkitneedkey events', async function () {
      const teardown = await setupWebkitNativeFairplayDRM({
        mediaEl,
        getAppCertificate,
        getLicenseKey,
        saveAndDispatchError,
        drmTypeCb,
      });

      // Create and dispatch a mock webkitneedkey event
      const initData = new Uint8Array([
        0,
        0,
        0,
        4, // length
        115,
        107,
        100,
        58, // 'skd:' in ascii
      ]).buffer;

      const event = new CustomEvent('webkitneedkey', {
        detail: { initData },
      });

      mediaEl.dispatchEvent(event);

      // Allow mono thread to setup
      await new Promise((resolve) => setTimeout(resolve, 0));

      assert.isTrue(mediaEl.hasEventListener('webkitcurrentplaybacktargetiswirelesschanged'), 'Session has been setup');

      // Give async operations time to complete
      await new Promise((resolve) => setTimeout(resolve, 50));

      teardown();

      assert.isFalse(
        mediaEl.hasEventListener('webkitcurrentplaybacktargetiswirelesschanged'),
        'Session has been torn down'
      );
    });
  });
});

/**
 * Mock WebKitMediaKeySession for testing
 */
class MockWebKitMediaKeySession {
  constructor() {
    this.onwebkitkeymessage = null;
    this.onwebkitkeyerror = null;
    console.log('Created mock session');
  }

  update(ckc) {
    // Mock implementation
  }

  close() {
    // Mock implementation
  }

  simulateKeyMessage(message) {
    if (this.onwebkitkeymessage) {
      this.onwebkitkeymessage({
        message,
        target: this,
      });
    }
  }

  simulateKeyError(systemCode = 0, code = 0) {
    if (this.onwebkitkeyerror) {
      this.onwebkitkeyerror({
        target: {
          error: { systemCode, code },
        },
      });
    }
  }
}
