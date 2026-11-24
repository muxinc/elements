import { assert } from '@open-wc/testing';
import { setupPreload } from '../src/preload';

const DEFAULT_LENGTH = 30;
const DEFAULT_SIZE = 60 * 1000 * 1000;

const createFakeHls = () => ({
  config: { maxBufferLength: DEFAULT_LENGTH, maxBufferSize: DEFAULT_SIZE },
  loadSourceCalls: 0,
  loadSource() {
    this.loadSourceCalls++;
  },
});

const src = 'https://stream.mux.com/abc.m3u8';

describe('Module: preload', () => {
  it('applies minimal buffer limits for preload="metadata"', () => {
    const hls = createFakeHls();
    setupPreload({ preload: 'metadata', src }, document.createElement('video'), hls);

    assert.equal(hls.config.maxBufferLength, 1);
    assert.equal(hls.config.maxBufferSize, 1);
    assert.equal(hls.loadSourceCalls, 1);
  });

  it('restores the original buffer limits on first play', () => {
    const hls = createFakeHls();
    const video = document.createElement('video');
    setupPreload({ preload: 'metadata', src }, video, hls);

    video.dispatchEvent(new Event('play'));

    assert.equal(hls.config.maxBufferLength, DEFAULT_LENGTH);
    assert.equal(hls.config.maxBufferSize, DEFAULT_SIZE);
  });

  it('keeps buffer limits changed via hls.config before first play', () => {
    const hls = createFakeHls();
    const video = document.createElement('video');
    setupPreload({ preload: 'metadata', src }, video, hls);

    hls.config.maxBufferLength = 10;
    hls.config.maxBufferSize = 0;
    video.dispatchEvent(new Event('play'));

    assert.equal(hls.config.maxBufferLength, 10);
    assert.equal(hls.config.maxBufferSize, 0);
  });

  it('only restores the buffer limits that were not changed', () => {
    const hls = createFakeHls();
    const video = document.createElement('video');
    setupPreload({ preload: 'metadata', src }, video, hls);

    hls.config.maxBufferLength = 10;
    video.dispatchEvent(new Event('play'));

    assert.equal(hls.config.maxBufferLength, 10);
    assert.equal(hls.config.maxBufferSize, DEFAULT_SIZE);
  });

  it('keeps buffer limits changed via hls.config when preload switches to auto', () => {
    const hls = createFakeHls();
    const video = document.createElement('video');
    const setPreload = setupPreload({ preload: 'metadata', src }, video, hls);

    hls.config.maxBufferLength = 10;
    hls.config.maxBufferSize = 0;
    setPreload('auto');

    assert.equal(hls.config.maxBufferLength, 10);
    assert.equal(hls.config.maxBufferSize, 0);
  });

  it('restores the original buffer limits when preload switches from metadata to auto', () => {
    const hls = createFakeHls();
    const video = document.createElement('video');
    const setPreload = setupPreload({ preload: 'metadata', src }, video, hls);

    setPreload('auto');

    assert.equal(hls.config.maxBufferLength, DEFAULT_LENGTH);
    assert.equal(hls.config.maxBufferSize, DEFAULT_SIZE);
  });

  it('does not touch buffer limits on play with preload="auto"', () => {
    const hls = createFakeHls();
    const video = document.createElement('video');
    setupPreload({ preload: 'auto', src }, video, hls);

    hls.config.maxBufferLength = 10;
    hls.config.maxBufferSize = 0;
    video.dispatchEvent(new Event('play'));

    assert.equal(hls.config.maxBufferLength, 10);
    assert.equal(hls.config.maxBufferSize, 0);
  });
});
