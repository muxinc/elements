import { assert, fixture } from '@open-wc/testing';
import { initialize, Hls, MediaError, MuxErrorCode, muxMediaState } from '../src/index.ts';
import { setupNetworkRecovery } from '../src/network-recovery.ts';

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
        maxReconnectRetries: 6,
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

  it('does not end recovery when only the manifest reloads (segments still failing)', async function () {
    // manifest loads but fragment fails
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        maxReconnectRetries: 6,
      },
      video
    );
    const hls = core.engine;

    // Capture a real MANIFEST_LOADED payload so we can replay it later without tripping hls.js's
    // internal handlers (they expect real levels/tracks data).
    const manifestData = await new Promise((resolve) =>
      hls.once(Hls.Events.MANIFEST_LOADED, (_event, data) => resolve(data))
    );

    let startLoadCount = 0;
    const originalStartLoad = hls.startLoad.bind(hls);
    hls.startLoad = (...args) => {
      startLoadCount++;
      return originalStartLoad(...args);
    };

    // hls.js gives up on a fatal connectivity error -> recovery is armed.
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      error: new Error('offline'),
    });
    assert.equal(muxMediaState.get(video).networkError, true, 'recovery is armed after the fatal error');

    // The manifest (re)loads, but fragments are still failing, so media hasn't actually resumed.
    // A manifest load alone must NOT end recovery - only a buffered fragment (FRAG_BUFFERED) can.
    hls.trigger(Hls.Events.MANIFEST_LOADED, manifestData);
    assert.equal(
      muxMediaState.get(video).networkError,
      true,
      'a manifest reload alone does not end recovery while segments still fail'
    );

    // Because recovery is still armed, a later `online` event must still trigger a retry rather
    // than being skipped (which would leave hls.js idle after the stall).
    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.equal(startLoadCount, 1, 'online still retries after a mid-recovery manifest reload');
  });

  it('re-requests the source (loadSource) when the manifest never loaded', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        maxReconnectRetries: 6,
      },
      video
    );
    const hls = core.engine;

    // Deliberately do NOT await MANIFEST_LOADED, and keep the rest synchronous so it can't fire:
    // this is the "origin down at load" path where the manifest never loaded, so `startLoad()`
    // can't re-fetch it and recovery must `loadSource()` instead. (The `startLoad` path, after the
    // manifest has loaded, is covered by the "recovers ... in the background" test above.)
    let loadSourceCount = 0;
    let startLoadCount = 0;
    const originalLoadSource = hls.loadSource.bind(hls);
    hls.loadSource = (...args) => {
      loadSourceCount++;
      return originalLoadSource(...args);
    };
    const originalStartLoad = hls.startLoad.bind(hls);
    hls.startLoad = (...args) => {
      startLoadCount++;
      return originalStartLoad(...args);
    };

    // Fatal connectivity error arms recovery (the detail is irrelevant to arming).
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      error: new Error('offline'),
    });
    assert.equal(muxMediaState.get(video).networkError, true, 'recovery is armed');

    // Retry (via the online fast path) must re-request the source, not startLoad, because the
    // manifest has not loaded yet - this is exactly what `hasManifestLoaded` / onManifestLoaded gate.
    globalThis.dispatchEvent(new Event('online'));
    assert.equal(loadSourceCount, 1, 'uses loadSource while the manifest has not loaded');
    assert.equal(startLoadCount, 0, 'does not startLoad before the manifest has loaded');
  });

  it('does not retry non-recoverable network errors (e.g. 404)', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        maxReconnectRetries: 6,
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
        maxReconnectRetries: 6,
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

  it('does not arm recovery when disabled (opt-in default off)', async function () {
    // No `maxReconnectRetries` => the feature is off and behavior matches pre-recovery: the fatal
    // connectivity error is dispatched immediately and no recovery is armed.
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

    const errored = new Promise((resolve) => video.addEventListener('error', resolve, { once: true }));
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      error: new Error('offline'),
    });
    await errored;

    assert.notEqual(muxMediaState.get(video).networkError, true, 'recovery is not armed when disabled');

    // An `online` event must not trigger a retry when recovery is off.
    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.equal(startLoadCount, 0, 'no retry on reconnect when recovery is disabled');
  });
});

// Unit-level tests of the retry scheduler with a mock hls.js + stubbed timers, so the fatal-driven
// backoff loop can be driven deterministically (the real-engine tests above can't control time or
// force the "rebuffering" condition the loop is gated on).
describe('network recovery - retry scheduling', function () {
  const SRC = 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8';
  // No `response` => httpStatus 0 => classified as a connectivity error (recoverable).
  const FATAL_CONNECTIVITY = {
    type: Hls.ErrorTypes.NETWORK_ERROR,
    details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
    fatal: true,
  };
  const connectivityError = () => {
    const error = new MediaError('offline', MediaError.MEDIA_ERR_NETWORK, true);
    error.muxCode = MuxErrorCode.NETWORK_OFFLINE;
    return error;
  };

  let video;
  let hls;

  beforeEach(async () => {
    video = await fixture(`<video></video>`);
    // Force the "rebuffering" condition (paused=false, readyState<HAVE_FUTURE_DATA) so the retry
    // loop engages - a detached fixture video is otherwise paused.
    Object.defineProperty(video, 'paused', { configurable: true, get: () => false });
    Object.defineProperty(video, 'readyState', { configurable: true, get: () => 0 });
    muxMediaState.set(video, {});

    const handlers = {};
    hls = {
      startLoadCount: 0,
      loadSourceCount: 0,
      on: (event, handler) => {
        (handlers[event] = handlers[event] ?? []).push(handler);
      },
      startLoad: () => {
        hls.startLoadCount++;
      },
      loadSource: () => {
        hls.loadSourceCount++;
      },
      emit: (event, data) => (handlers[event] ?? []).forEach((handler) => handler(event, data)),
    };
  });

  afterEach(() => {
    // Removes the global `online` listener the recovery registered.
    video?.dispatchEvent(new Event('teardown'));
    muxMediaState.delete(video);
    video?.remove();
    video = undefined;
  });

  // Stub setTimeout/clearTimeout for the synchronous duration of `run` so the module's retry timers
  // can be captured and fired by hand. Kept inside the (synchronous) test body so the test runner's
  // own timers are never affected.
  function withStubbedTimers(run) {
    const scheduled = [];
    const realSetTimeout = globalThis.setTimeout;
    const realClearTimeout = globalThis.clearTimeout;
    globalThis.setTimeout = (fn, delay) => {
      scheduled.push({ fn, delay, cleared: false });
      return scheduled.length; // 1-based id
    };
    globalThis.clearTimeout = (id) => {
      const timer = scheduled[id - 1];
      if (timer) timer.cleared = true;
    };
    const pending = () => scheduled.filter((t) => !t.cleared);
    const fireLatest = () => {
      const timer = pending().at(-1);
      timer.cleared = true;
      timer.fn();
    };
    try {
      run({ scheduled, pending, fireLatest });
    } finally {
      globalThis.setTimeout = realSetTimeout;
      globalThis.clearTimeout = realClearTimeout;
    }
  }

  const setup = (maxRetries, saveAndDispatchError = () => {}) =>
    setupNetworkRecovery({ hls, mediaEl: video, src: SRC, muxMediaState, saveAndDispatchError, maxRetries });

  it('schedules one retry per hls.js give-up and never self-perpetuates', function () {
    withStubbedTimers(({ scheduled, pending, fireLatest }) => {
      const recovery = setup(6);
      recovery.onManifestLoaded(); // manifest has loaded -> retries resume via startLoad

      // First fatal: arms recovery and schedules exactly one retry - but does NOT startLoad yet.
      recovery.handleHlsError(FATAL_CONNECTIVITY, connectivityError());
      assert.equal(muxMediaState.get(video).networkError, true, 'recovery is armed');
      assert.equal(pending().length, 1, 'one retry scheduled after the first give-up');
      assert.equal(hls.startLoadCount, 0, 'no startLoad until the scheduled retry fires');

      // Firing the retry does exactly one startLoad and does NOT schedule the next attempt itself -
      // the key fix: we wait for hls.js to give up again before retrying, so we never interrupt its
      // own internal retries.
      fireLatest();
      assert.equal(hls.startLoadCount, 1, 'the retry fires exactly one startLoad');
      assert.equal(pending().length, 0, 'the retry does not self-schedule the next attempt');

      // Only the next give-up schedules the next attempt, with a longer backoff.
      recovery.handleHlsError(FATAL_CONNECTIVITY, connectivityError());
      assert.equal(pending().length, 1, 'the next give-up schedules the next retry');
      assert.isAbove(scheduled[1].delay, scheduled[0].delay, 'backoff grows between attempts');
    });
  });

  it('gives up after maxRetries give-ups and stops retrying', function () {
    withStubbedTimers(({ pending, fireLatest }) => {
      let terminalError;
      const recovery = setup(3, (_mediaEl, error) => {
        terminalError = error;
      });
      recovery.onManifestLoaded();

      // Each give-up schedules one retry; fire it, repeat up to the budget.
      for (let attempt = 1; attempt <= 3; attempt++) {
        recovery.handleHlsError(FATAL_CONNECTIVITY, connectivityError());
        assert.equal(pending().length, 1, `attempt ${attempt} is scheduled`);
        fireLatest();
      }
      assert.equal(hls.startLoadCount, 3, 'startLoad fired exactly maxRetries times');
      assert.isUndefined(terminalError, 'no terminal error before the budget is exhausted');

      // The next give-up exhausts the budget: a terminal reload error, and no further retries.
      recovery.handleHlsError(FATAL_CONNECTIVITY, connectivityError());
      assert.equal(pending().length, 0, 'no retry scheduled once the budget is exhausted');
      assert.ok(terminalError, 'a terminal error is dispatched');
      assert.equal(terminalError.reload, true, 'the terminal error offers a reload');
      assert.equal(hls.startLoadCount, 3, 'no additional startLoad after giving up');
    });
  });

  it('cancels the pending retry and clears recovery once a fragment buffers (FRAG_BUFFERED)', function () {
    withStubbedTimers(({ pending }) => {
      const recovery = setup(6);
      recovery.onManifestLoaded();

      recovery.handleHlsError(FATAL_CONNECTIVITY, connectivityError());
      assert.equal(muxMediaState.get(video).networkError, true, 'recovery is armed');
      assert.equal(pending().length, 1, 'a retry is pending');

      // hls.js buffers a fragment -> the network is really back. Recovery ends and the pending
      // retry is cancelled.
      hls.emit(Hls.Events.FRAG_BUFFERED, {});
      assert.notEqual(muxMediaState.get(video).networkError, true, 'recovery cleared on FRAG_BUFFERED');
      assert.equal(pending().length, 0, 'the pending retry is cancelled once recovery succeeds');
    });
  });
});
