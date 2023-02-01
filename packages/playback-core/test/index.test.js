import { assert, aTimeout } from '@open-wc/testing';
import { initialize, teardown, MediaError, getError } from '../src/index.ts';

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
    assert.equal(video.error.message, '');

    assert.equal(getError(video).code, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    assert.equal(
      getError(video).message,
      'An unsupported error occurred. The server or network failed, or your browser does not support this format.'
    );
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
});
