import { assert, aTimeout } from '@open-wc/testing';
import {
  toMuxVideoURL,
  initialize,
  teardown,
  MediaError,
  getError,
  updateStreamInfoFromSrc,
  StreamTypes,
  getTargetLiveWindow,
  getLiveEdgeStart,
  getStreamType,
  muxMediaState,
} from '../src/index.ts';

describe('playback core', function () {
  this.timeout(10000);

  it('initialize w/ default preferPlayback', async function () {
    const video = document.createElement('video');
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
    const video = document.createElement('video');
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
    const video = document.createElement('video');
    initialize(
      {
        src: 'https://mux.com/', // not working src url
      },
      video
    );
    // error event must be attached after initialize(), otherwise the
    // native error will not be stopped propagating in playback core.
    await new Promise((resolve) => video.addEventListener('error', resolve));

    assert.equal(video.error.code, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    assert(video.error.message != undefined, 'has some message');

    assert.equal(getError(video).code, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    const expectedMessage = !!video.error.message
      ? video.error.message
      : MediaError.defaultMessages[MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED];
    assert.equal(getError(video).message, expectedMessage);
  });

  it('setAutoplay("any")', async function () {
    const video = document.createElement('video');
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

  it('setAutoplay("muted")', async function () {
    const video = document.createElement('video');
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
    const video = document.createElement('video');
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
    const video = document.createElement('video');
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
    const video = document.createElement('video');
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
    const video = document.createElement('video');
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

  describe('updateStreamInfoFromSrc()', () => {
    let mediaEl;

    beforeEach(() => {
      mediaEl = document.createElement('video');
      muxMediaState.set(mediaEl, {});
    });

    afterEach(() => {
      muxMediaState.delete(mediaEl);
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
});
