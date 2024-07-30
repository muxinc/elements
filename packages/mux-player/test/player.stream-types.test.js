import { fixture, assert } from '@open-wc/testing';
import '../src/index.ts';

// Media Chrome uses a ResizeObserver which ends up throwing in Firefox and Safari in some cases
// so we want to catch those. It is supposedly not a blocker if this error is thrown.
// Safari also has some weird script error being thrown, so, we want to catch it to.
// This unblocks a bunch of tests from running properly.
const windowErrorHandler = (e) => {
  if (
    e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
    e.message === 'ResizeObserver loop limit exceeded' ||
    e.message === 'Script error.'
  ) {
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
  } else {
    console.log('error', e);
  }
};
window.addEventListener('error', windowErrorHandler);

// NOTE: When we fully deprecate "old" stream types ("ll-" prefix and "dvr"), we should update these tests accordingly.
describe('Feature: stream types & related (including non-media-ui-extension types', async () => {
  it('should set expected default values for stream type on-demand', async () => {
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
    ></mux-player>`);
    assert.equal(muxPlayerEl.streamType, 'on-demand');
    assert(Number.isNaN(muxPlayerEl.targetLiveWindow), 'targetLiveWindow should be NaN for on-demand');
    assert.equal(muxPlayerEl.media.streamType, 'on-demand');
  });

  it('should set expected default values for stream type live', async () => {
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="live"
    ></mux-player>`);
    assert.equal(muxPlayerEl.streamType, 'live');
    assert(!muxPlayerEl.targetLiveWindow, '!targetLiveWindow for live');
    assert.equal(muxPlayerEl.media.streamType, 'live');
  });

  it('should set expected default values for stream type ll-live', async () => {
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="ll-live"
    ></mux-player>`);
    assert.equal(muxPlayerEl.streamType, 'll-live');
    assert(!muxPlayerEl.targetLiveWindow, '!targetLiveWindow for ll-live');
    // Apply the "translated" stream type to underlying `<mux-video>` instance.
    assert.equal(muxPlayerEl.media.streamType, 'live');
  });

  it('should set expected default values for stream type live:dvr', async () => {
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="live:dvr"
    ></mux-player>`);
    assert.equal(muxPlayerEl.streamType, 'live:dvr');
    assert.equal(muxPlayerEl.targetLiveWindow, Number.POSITIVE_INFINITY);
    // Apply the "translated" stream type to underlying `<mux-video>` instance.
    assert.equal(muxPlayerEl.media.streamType, 'live');
  });

  it('should set expected default values for stream type ll-live:dvr', async () => {
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="ll-live:dvr"
    ></mux-player>`);
    assert.equal(muxPlayerEl.streamType, 'll-live:dvr');
    assert.equal(muxPlayerEl.targetLiveWindow, Number.POSITIVE_INFINITY);
    // Apply the "translated" stream type to underlying `<mux-video>` instance.
    assert.equal(muxPlayerEl.media.streamType, 'live');
  });

  it('should apply noautoseektolive to theme for DVR stream types', async () => {
    const muxPlayerEl = await fixture(`<mux-player
    ></mux-player>`);
    assert(!muxPlayerEl.mediaTheme.hasAttribute('noautoseektolive'));
    muxPlayerEl.streamType = 'live:dvr';
    assert(muxPlayerEl.mediaTheme.hasAttribute('noautoseektolive'));
    muxPlayerEl.streamType = undefined;
    assert(!muxPlayerEl.mediaTheme.hasAttribute('noautoseektolive'));
    muxPlayerEl.streamType = 'll-live:dvr';
    assert(muxPlayerEl.mediaTheme.hasAttribute('noautoseektolive'));
  });
});
