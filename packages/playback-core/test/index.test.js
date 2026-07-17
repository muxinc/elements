import { assert, fixture, aTimeout, oneEvent } from '@open-wc/testing';
import {
  toMuxVideoURL,
  initialize,
  teardown,
  setupHls,
  Hls,
  MediaError,
  getError,
  updateStreamInfoFromSrc,
  StreamTypes,
  getTargetLiveWindow,
  getLiveEdgeStart,
  getStreamType,
  muxMediaState,
  toPlaybackIdFromSrc,
  getCapLevelControllerConfig,
} from '../src/index.ts';
import { MuxErrorCode } from '../src/errors.ts';

describe('playback core', function () {
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

  it('initialize w/ default preferPlayback', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
      },
      video
    );
    assert.equal(typeof core, 'object');
    assert.equal(typeof core.engine, 'object');
  });

  it('teardown', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
      },
      video
    );
    teardown(video, core);

    assert(!video.hasAttribute('src'), 'src is removed on teardown');
  });

  it('handle error', async function () {
    initialize(
      {
        src: 'https://mux.com/', // not working src url
        preferPlayback: 'native',
      },
      video
    );

    await oneEvent(video, 'error');
    // error event must be attached after initialize(), otherwise the
    // native error will not be stopped propagating in playback core.
    assert.equal(video.error.code, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    assert(video.error.message != undefined, 'has some message');

    assert.equal(getError(video).code, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    const expectedMessage = !!video.error.message
      ? video.error.message
      : MediaError.defaultMessages[MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED];
    assert.equal(getError(video).message, expectedMessage);
  });

  it('recovers from a network interruption and surfaces a reconnecting state', async function () {
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

    // Simulate hls.js giving up on a fatal connectivity error (connection dropped, buffer
    // drained). No `response` => a connectivity failure rather than an HTTP error.
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      error: new Error('offline'),
    });

    assert.equal(muxMediaState.get(video).networkError, true, 'network interruption is tracked');
    assert.equal(
      getError(video)?.muxCode,
      MuxErrorCode.NETWORK_RECONNECTING,
      'a non-fatal reconnecting state is surfaced'
    );
    assert.equal(getError(video)?.fatal, false, 'the reconnecting state is not a fatal error');

    // Connectivity returns: the player should retry immediately rather than staying stuck.
    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.equal(startLoadCount, 1, 'startLoad is called on reconnect to resume playback');
    assert.equal(muxMediaState.get(video).networkError, true, 'still recovering until a fragment loads');

    // Playback resumes => recovery is complete and the reconnecting state clears.
    video.dispatchEvent(new Event('playing'));
    assert.equal(muxMediaState.get(video).networkError, false, 'interruption flag is cleared after recovery');
    assert.equal(getError(video), null, 'reconnecting state is cleared after recovery');

    // A subsequent, unrelated `online` event should not restart loading.
    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.equal(startLoadCount, 0, 'startLoad is not called again when there is no interruption');
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

    // A fatal HTTP 404 is not a connectivity blip; retrying won't help, so we should surface
    // the terminal error rather than entering the reconnecting/retry loop.
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      response: { code: 404, text: 'Not Found' },
      error: new Error('not found'),
    });

    startLoadCount = 0;
    globalThis.dispatchEvent(new Event('online'));
    assert.notEqual(getError(video)?.muxCode, MuxErrorCode.NETWORK_RECONNECTING, 'does not enter reconnecting state');
    assert.equal(startLoadCount, 0, 'does not retry on reconnect for a non-recoverable error');
  });

  it('recovers from connectivity errors reported with HTTP status 0', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
      },
      video
    );
    const hls = core.engine;

    // A request that fails before receiving a real HTTP status often surfaces as a loader
    // response with code 0. That's a connectivity failure, so it should enter recovery rather
    // than falling back to the terminal error.
    hls.trigger(Hls.Events.ERROR, {
      type: Hls.ErrorTypes.NETWORK_ERROR,
      details: Hls.ErrorDetails.FRAG_LOAD_ERROR,
      fatal: true,
      response: { code: 0, text: '' },
      error: new Error('offline'),
    });

    assert.equal(
      getError(video)?.muxCode,
      MuxErrorCode.NETWORK_RECONNECTING,
      'enters the reconnecting state for a status-0 response'
    );
    assert.equal(muxMediaState.get(video).networkError, true, 'arms recovery for a status-0 response');
  });

  it('setAutoplay("any")', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        autoplay: false,
      },
      video
    );

    core.setAutoplay('any');

    await new Promise((resolve) => video.addEventListener('playing', resolve));
    assert(!video.paused, 'is playing after core.setAutoplay("any")');
  });

  // not sure what is happening here but the playing promise is not resolved in CI.
  // I tested it in the browser and it works like intended.
  it.skip('setAutoplay("muted")', async function () {
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        autoplay: false,
      },
      video
    );

    core.setAutoplay('muted');
    assert(video.muted, 'video is muted for autoplaying');

    await new Promise((resolve) => video.addEventListener('playing', resolve));
    assert(!video.paused, 'is playing after core.setAutoplay("muted")');
  });

  it('preload="none" will not start loading data', async function () {
    const loadStarted = new Promise((resolve) => video.addEventListener('loadstart', resolve));

    initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        preload: 'none',
      },
      video
    );

    assert.equal(video.preload, 'none', 'preload is none');
    await loadStarted;
    await aTimeout(1000);
    assert.equal(video.readyState, HTMLMediaElement.HAVE_NOTHING, 'no data is loaded');
  });

  it('from preload="none" will play', async function () {
    video.muted = true;

    initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        preload: 'none',
      },
      video
    );

    try {
      await video.play();
    } catch (error) {
      console.warn(error);
    }
    assert(!video.paused, 'is playing after play()');
  });

  it('preload="auto" will start loading data', async function () {
    const loadeddataPromise = new Promise((resolve) => video.addEventListener('loadeddata', resolve));
    initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        preload: 'auto',
      },
      video
    );

    assert.equal(video.preload, 'auto', 'preload is auto');
    await loadeddataPromise;
    await aTimeout(100);
    assert.equal(video.buffered.length, 1, 'some buffer loaded');

    video.muted = true;
    try {
      await video.play();
    } catch (error) {
      console.warn(error);
    }

    assert(!video.paused, 'is playing after play()');
  });

  it('preload="none" to preload="metadata"', async function () {
    const loadeddataPromise = new Promise((resolve) => video.addEventListener('loadeddata', resolve));
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        preload: 'none',
      },
      video
    );

    assert.equal(video.preload, 'none', 'preload is none');

    core.setPreload('metadata');
    assert.equal(video.preload, 'metadata', 'preload is metadata');
    await loadeddataPromise;
    await aTimeout(100);
    assert.equal(video.buffered.length, 1, 'some buffer loaded');

    video.muted = true;
    try {
      await video.play();
    } catch (error) {
      console.warn(error);
    }

    assert(!video.paused, 'is playing after play()');
  });

  it('toMuxVideoURL should format the correct m3u8 URL', function () {
    assert.equal(toMuxVideoURL({ playbackId: '123' }), `https://stream.mux.com/123.m3u8`);
    assert.equal(
      toMuxVideoURL({ playbackId: '123', customDomain: 'media.example.com' }),
      `https://stream.media.example.com/123.m3u8`
    );
    assert.equal(
      toMuxVideoURL({ playbackId: '123', maxResolution: '720p' }),
      `https://stream.mux.com/123.m3u8?max_resolution=720p`
    );
    assert.equal(
      toMuxVideoURL({ playbackId: '123?redundant_streams=true', maxResolution: '720p' }),
      `https://stream.mux.com/123.m3u8?redundant_streams=true&max_resolution=720p`
    );
    assert.equal(toMuxVideoURL({ customDomain: 'media.example.com', maxResultion: '720p' }), undefined);
    assert.equal(
      toMuxVideoURL({
        playbackId: '123?redundant_streams=true',
        renditionOrder: 'desc',
        tokens: { playback: 'PLAYBACK-TOKEN' },
      }),
      `https://stream.mux.com/123.m3u8?token=PLAYBACK-TOKEN`
    );
    assert.equal(
      toMuxVideoURL({
        playbackId: '123?redundant_streams=true',
        minResolution: '720p',
        extraSourceParams: {
          extra_extra: 'readallaboutit',
        },
      }),
      `https://stream.mux.com/123.m3u8?redundant_streams=true&min_resolution=720p&extra_extra=readallaboutit`
    );
  });

  describe('toPlaybackIdFromSrc', () => {
    it('should extract the playback ID from a valid src', () => {
      const src = 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8';
      const playbackId = toPlaybackIdFromSrc(src);
      assert.equal(playbackId, '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I');
    });

    it('should extract the playback ID from a valid src with parameters', () => {
      const src = 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8?token=PLAYBACK-TOKEN';
      const playbackId = toPlaybackIdFromSrc(src);
      assert.equal(playbackId, '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I');
    });

    it('should extract the playback ID from a valid src with parameters and a custom domain', () => {
      const src =
        'https://stream.media.example.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8?token=PLAYBACK-TOKEN';
      const playbackId = toPlaybackIdFromSrc(src);
      assert.equal(playbackId, '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I');
    });

    it('should extract the playback ID from a valid mp4 src', () => {
      const src = 'https://stream.media.example.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I/low.mp4';
      const playbackId = toPlaybackIdFromSrc(src);
      assert.equal(playbackId, '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I');
    });

    it('should return undefined for an invalid src', () => {
      const src = 'https://notvalid.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8';
      const playbackId = toPlaybackIdFromSrc(src);
      assert.isUndefined(playbackId);
    });
  });

  describe('updateStreamInfoFromSrc()', () => {
    let mediaEl;

    beforeEach(async () => {
      mediaEl = await fixture(`<video
        preload="auto"
        crossorigin
      ></video>`);
      muxMediaState.set(mediaEl, {});
    });

    afterEach(() => {
      muxMediaState.delete(mediaEl);
      mediaEl.remove();
      mediaEl = undefined;
    });

    it('should work for on-demand multivariant m3u8s', async () => {
      try {
        await updateStreamInfoFromSrc(
          'https://stream.mux.com/a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M.m3u8',
          mediaEl
        );
      } catch (err) {
        assert.fail(`error thrown: ${err.message}`);
      }
      assert.equal(getStreamType(mediaEl), StreamTypes.ON_DEMAND, 'should have a stream type of on-demand');
      assert(Number.isNaN(getTargetLiveWindow(mediaEl)), 'should have a targetLiveWindow of NaN (because on-demand)');
      assert(Number.isNaN(getLiveEdgeStart(mediaEl)), 'should have a liveEdgeStart of NaN (because on-demand)');
    });

    it('should work for low latency live multivariant m3u8s', async () => {
      try {
        await updateStreamInfoFromSrc(
          'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
          mediaEl
        );
      } catch (err) {
        assert.fail(`error thrown: ${err.message}`);
      }
      assert.equal(getStreamType(mediaEl), StreamTypes.LIVE, 'should have a stream type of live (even for ll-live)');
      assert.equal(getTargetLiveWindow(mediaEl), 0, 'should have a targetLiveWindow === 0 (because non-DVR live)');
      assert(typeof getLiveEdgeStart(mediaEl) === 'number', 'should have a numeric liveEdgeStart (because live)');
    });

    it('should work for mp4s', async () => {
      try {
        await updateStreamInfoFromSrc(
          'https://stream.mux.com/a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M/low.mp4',
          mediaEl
        );
      } catch (err) {
        assert.fail(`error thrown: ${err.message}`);
      }
      assert.equal(getStreamType(mediaEl), StreamTypes.ON_DEMAND, 'mp4s should have a stream type of on-demand');
      assert(
        Number.isNaN(getTargetLiveWindow(mediaEl)),
        'mp4s should have a targetLiveWindow of NaN (because on-demand)'
      );
      assert(Number.isNaN(getLiveEdgeStart(mediaEl)), 'mp4s should have a liveEdgeStart of NaN (because on-demand)');
    });

    it('should work for empty src', async () => {
      try {
        await updateStreamInfoFromSrc('', mediaEl);
      } catch (err) {
        assert.fail(`error thrown: ${err.message}`);
      }
      assert.equal(getStreamType(mediaEl), StreamTypes.UNKNOWN, 'should have a default stream type of unknown');
      assert(Number.isNaN(getTargetLiveWindow(mediaEl)), 'should have a default targetLiveWindow of NaN');
      assert(Number.isNaN(getLiveEdgeStart(mediaEl)), 'should have a default liveEdgeStart of NaN');
    });
  });

  describe('getCapLevelControllerConfig()', () => {
    it('should use MinCapLevelController when capRenditionToPlayerSize is undefined', () => {
      const config = getCapLevelControllerConfig({ capRenditionToPlayerSize: undefined }, {});

      // MinCapLevelController has a static minMaxResolution property, standard CapLevelController does not
      assert.isDefined(
        config.capLevelController.minMaxResolution,
        'should use MinCapLevelController (has minMaxResolution property)'
      );
      assert.equal(config.capLevelToPlayerSize, true, 'should default hls.js capLevelToPlayerSize to true');
    });

    it('should use MinCapLevelController when capRenditionToPlayerSize is null', () => {
      const config = getCapLevelControllerConfig({ capRenditionToPlayerSize: null }, {});

      // MinCapLevelController has a static minMaxResolution property, standard CapLevelController does not
      assert.isDefined(
        config.capLevelController.minMaxResolution,
        'should use MinCapLevelController (has minMaxResolution property)'
      );
      assert.equal(config.capLevelToPlayerSize, true, 'should default hls.js capLevelToPlayerSize to true');
    });

    it('should use CapLevelController when capRenditionToPlayerSize is true', () => {
      const config = getCapLevelControllerConfig({ capRenditionToPlayerSize: true }, {});

      // MinCapLevelController has a static minMaxResolution property, standard CapLevelController does not
      assert.isUndefined(
        config.capLevelController.minMaxResolution,
        'should use standard CapLevelController (no minMaxResolution property)'
      );
      assert.equal(config.capLevelToPlayerSize, true, 'should keep hls.js capLevelToPlayerSize as true');
    });

    it('should use CapLevelController when capRenditionToPlayerSize is false', () => {
      const config = getCapLevelControllerConfig({ capRenditionToPlayerSize: false }, {});

      // MinCapLevelController has a static minMaxResolution property, standard CapLevelController does not
      assert.isUndefined(
        config.capLevelController.minMaxResolution,
        'should use standard CapLevelController (no minMaxResolution property)'
      );
      assert.equal(config.capLevelToPlayerSize, false, 'should keep hls.js capLevelToPlayerSize as false');
    });
  });

  describe('initial-bandwidth-estimate-kbps attribute', () => {
    let hlsInstance;

    afterEach(() => {
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = undefined;
      }
    });

    it('should set abrEwmaDefaultEstimate from initialBandwidthEstimateKbps (converted to bps)', () => {
      hlsInstance = setupHls(
        { src: 'https://stream.mux.com/test123.m3u8', initialBandwidthEstimateKbps: 100_000 },
        video
      );

      assert.equal(
        hlsInstance.config.abrEwmaDefaultEstimate,
        100_000_000,
        'abrEwmaDefaultEstimate should be initialBandwidthEstimateKbps * 1000'
      );
    });

    it('should use HLS.js default when initialBandwidthEstimateKbps is not set', () => {
      hlsInstance = setupHls({ src: 'https://stream.mux.com/test123.m3u8' }, video);

      assert.equal(
        hlsInstance.config.abrEwmaDefaultEstimate,
        500_000,
        'abrEwmaDefaultEstimate should remain at HLS.js default (500kbps) when attribute is not set'
      );
    });

    it('should allow _hlsConfig to override initialBandwidthEstimateKbps', () => {
      hlsInstance = setupHls(
        {
          src: 'https://stream.mux.com/test123.m3u8',
          initialBandwidthEstimateKbps: 100_000,
          _hlsConfig: { abrEwmaDefaultEstimate: 1_000_000 },
        },
        video
      );

      assert.equal(
        hlsInstance.config.abrEwmaDefaultEstimate,
        1_000_000,
        '_hlsConfig.abrEwmaDefaultEstimate should take precedence over attribute'
      );
    });
  });

  describe('initial-estimate-segments attribute', () => {
    // Minimal frag stub that satisfies internal HLS.js handlers:
    // - AbrController checks stats.aborted (aborted=true → bail early)
    // - AudioStreamController accesses elementaryStreams.video
    // - FragmentTracker checks this.timeRanges (null in test → bail early)
    const mainFrag = { type: 'main', stats: { aborted: true }, elementaryStreams: {} };
    const audioFrag = { type: 'audio', stats: { aborted: true }, elementaryStreams: {} };

    it('should reset estimator after each of the first N-1 segments when initialEstimateSegments=N', () => {
      const initialKbps = 10_000;
      const core = initialize(
        {
          src: 'https://stream.mux.com/test123.m3u8',
          initialBandwidthEstimateKbps: initialKbps,
          initialEstimateSegments: 3,
        },
        video
      );

      const hls = core.engine;
      const expectedEstimate = initialKbps * 1000;

      // Spy on resetEstimator
      const resetCalls = [];
      const origReset = hls.abrController.resetEstimator.bind(hls.abrController);
      hls.abrController.resetEstimator = (estimate) => {
        resetCalls.push(estimate);
        origReset(estimate);
      };

      // Simulate 4 main FRAG_BUFFERED events
      for (let i = 0; i < 4; i++) {
        hls.trigger(Hls.Events.FRAG_BUFFERED, { frag: mainFrag });
      }

      // With initialEstimateSegments=3, first 3 segments use initial estimate.
      // That means resets after segments 1 and 2 (N-1 = 2 resets).
      assert.equal(resetCalls.length, 2, 'should reset estimator N-1 times (2 resets for 3 segments)');
      assert.equal(resetCalls[0], expectedEstimate, 'first reset should use initial estimate in bps');
      assert.equal(resetCalls[1], expectedEstimate, 'second reset should use initial estimate in bps');

      teardown(video, core);
    });

    it('should not reset estimator when initialEstimateSegments is not set', () => {
      const core = initialize({ src: 'https://stream.mux.com/test123.m3u8' }, video);

      const hls = core.engine;
      const resetCalls = [];
      const origReset = hls.abrController.resetEstimator.bind(hls.abrController);
      hls.abrController.resetEstimator = (estimate) => {
        resetCalls.push(estimate);
        origReset(estimate);
      };

      // Simulate FRAG_BUFFERED events — no resets should happen
      for (let i = 0; i < 3; i++) {
        hls.trigger(Hls.Events.FRAG_BUFFERED, { frag: mainFrag });
      }

      assert.equal(resetCalls.length, 0, 'should not reset estimator when attribute is not set');

      teardown(video, core);
    });

    it('should ignore non-main fragment types', () => {
      const initialKbps = 10_000;
      const core = initialize(
        {
          src: 'https://stream.mux.com/test123.m3u8',
          initialBandwidthEstimateKbps: initialKbps,
          initialEstimateSegments: 3,
        },
        video
      );

      const hls = core.engine;
      const resetCalls = [];
      const origReset = hls.abrController.resetEstimator.bind(hls.abrController);
      hls.abrController.resetEstimator = (estimate) => {
        resetCalls.push(estimate);
        origReset(estimate);
      };

      // Fire audio fragments — should not count toward segment total
      hls.trigger(Hls.Events.FRAG_BUFFERED, { frag: audioFrag });
      hls.trigger(Hls.Events.FRAG_BUFFERED, { frag: audioFrag });

      assert.equal(resetCalls.length, 0, 'audio fragments should not trigger resets');

      // Now fire main fragments
      hls.trigger(Hls.Events.FRAG_BUFFERED, { frag: mainFrag });
      assert.equal(resetCalls.length, 1, 'first main fragment should trigger reset');

      teardown(video, core);
    });
  });
});
