import { assert, aTimeout } from '@open-wc/testing';
import { initialize, teardown, MediaError } from '../src/index.ts';

describe('playback core', () => {
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
    const core = initialize(
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

    assert.equal(core.getError().code, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    assert.equal(
      core.getError().message,
      'An unsupported error occurred. The server or network failed, or your browser does not support this format.'
    );
  });

  it('setAutoplay("any")', async function () {
    this.timeout(10000);

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
    this.timeout(10000);

    const video = document.createElement('video');
    const core = initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        autoplay: false,
      },
      video
    );

    core.setAutoplay('muted');
    await new Promise((resolve) => video.addEventListener('playing', resolve));

    assert(!video.paused, 'is playing after core.setAutoplay("muted")');
    assert(video.muted, 'video is muted for autoplaying');
  });

  it('preload="none"', async function () {
    this.timeout(10000);

    const video = document.createElement('video');
    initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        preload: 'none',
      },
      video
    );

    assert.equal(video.preload, 'none', 'preload is none');
    await aTimeout(3000);
    assert.equal(video.buffered.length, 0, 'no buffer loaded');

    video.muted = true;
    try {
      await video.play();
    } catch (error) {
      console.warn(error);
    }

    assert(!video.paused, 'is playing after play()');
  });

  it('preload="auto"', async function () {
    this.timeout(10000);

    const video = document.createElement('video');
    initialize(
      {
        src: 'https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8',
        preload: 'auto',
      },
      video
    );

    assert.equal(video.preload, 'auto', 'preload is auto');
    await new Promise((resolve) => video.addEventListener('progress', resolve));
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
    this.timeout(10000);

    const video = document.createElement('video');
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
    await new Promise((resolve) => video.addEventListener('progress', resolve));
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
