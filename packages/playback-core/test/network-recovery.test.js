import { assert, fixture } from '@open-wc/testing';
import { initialize, Hls, muxMediaState } from '../src/index.ts';

describe('network recovery', function () {
  let video;

  beforeEach(async () => {
    video = await fixture(`<video
      preload="auto"
      crossorigin
    ></video>`);
  });

  afterEach(() => {
    video.remove();
    video = undefined;
  });

  it('recovers from a network interruption in the background', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
      },
      video
    );
    const hls = core.engine;

    // Wait until the manifest has loaded so we're in the "during playback" path (recovery
    // via startLoad rather than re-loading the source).
    await new Promise((resolve) => hls.once(Hls.Events.MANIFEST_LOADED, resolve));

    let startLoadCount = 0;
    const originalStartLoad = hls.startLoad.bind(hls);
    hls.startLoad = (...args) => {
      startLoadCount++;
      return originalStartLoad(...args);
    };

    // Simulate hls.js giving up on a fatal connectivity error. No `response` => a connectivity
    // failure rather than an HTTP error. (The "Reconnecting..." UI is gated on actually
    // rebuffering, which isn't reproducible here, so we assert the recovery mechanics.)
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      error: new Error('offline'),
    });

    assert.equal(muxMediaState.get(video).networkError, true, 'network interruption is tracked');

    // Connectivity returns: the player should retry immediately rather than staying stuck.
    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.equal(startLoadCount, 1, 'startLoad is called on reconnect to resume playback');
    assert.equal(muxMediaState.get(video).networkError, true, 'still recovering until a fragment loads');

    // Resuming from already-buffered media (e.g. seeking into the buffer) fires `playing`, but
    // that must NOT end recovery: the network hasn't actually recovered until a fragment loads.
    video.dispatchEvent(new Event('playing'));
    assert.equal(muxMediaState.get(video).networkError, true, 'playing from buffered media does not abort recovery');
  });

  it('does not retry non-recoverable network errors (e.g. 404)', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
      },
      video
    );
    const hls = core.engine;

    let startLoadCount = 0;
    const originalStartLoad = hls.startLoad.bind(hls);
    hls.startLoad = (...args) => {
      startLoadCount++;
      return originalStartLoad(...args);
    };

    // A fatal HTTP 404 is not a connectivity blip; retrying won't help, so recovery must not arm.
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      response: { code: 404, text: 'Not Found' },
      error: new Error('not found'),
    });

    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.notEqual(muxMediaState.get(video).networkError, true, 'does not arm recovery for a non-recoverable error');
    assert.equal(startLoadCount, 0, 'does not retry on reconnect for a non-recoverable error');
  });

  it('arms recovery for connectivity errors reported with HTTP status 0', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
      },
      video
    );
    const hls = core.engine;

    // A request that fails before receiving a real HTTP status often surfaces as a loader
    // response with code 0. That's a connectivity failure, so it should arm recovery rather
    // than falling back to the terminal error.
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      response: { code: 0, text: '' },
      error: new Error('offline'),
    });

    assert.equal(muxMediaState.get(video).networkError, true, 'arms recovery for a status-0 response');
  });
});
