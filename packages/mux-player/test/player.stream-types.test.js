import { fixture, assert, nextFrame, waitUntil } from '@open-wc/testing';
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

  for (const audio of [false, true]) {
    for (const streamType of ['live', 'live:dvr', 'll-live:dvr', 'on-demand']) {
      it(`should offer playback rates for ${audio ? 'audio' : 'video'} ${streamType} with DVR`, async () => {
        const player = await fixture(`<mux-player
          ${audio ? 'audio' : ''}
          stream-type="${streamType}"
          target-live-window="Infinity"
          playbackrates="1 1.5 2 3"
          style="width: 800px"
        ></mux-player>`);
        await nextFrame();

        const menu = player.mediaTheme.shadowRoot.querySelector('media-playback-rate-menu');
        assert.exists(menu);
        assert.equal(menu.getAttribute('rates'), '1 1.5 2 3');

        if (streamType === 'live') {
          player.targetLiveWindow = 0;
          await nextFrame();
          assert.notExists(player.mediaTheme.shadowRoot.querySelector('media-playback-rate-menu'));

          player.targetLiveWindow = Infinity;
          await nextFrame();
          assert.exists(player.mediaTheme.shadowRoot.querySelector('media-playback-rate-menu'));
        }
      });
    }
  }

  it('should select a configured speed from the live DVR menu', async () => {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      preload="none"
      disable-tracking
      stream-type="live"
      target-live-window="Infinity"
      playbackrates="1 1.5 2.5 3"
      style="width: 800px"
    ></mux-player>`);
    await nextFrame();

    const menu = player.mediaTheme.shadowRoot.querySelector('media-playback-rate-menu');
    const button = player.mediaTheme.shadowRoot.querySelector('media-playback-rate-menu-button');
    button.click();
    await waitUntil(() => !menu.hidden);
    menu.shadowRoot.querySelector('[value="2.5"]').click();

    await waitUntil(() => player.playbackRate === 2.5);
    assert.isTrue(menu.hidden, 'selecting a speed closes the menu');
    await waitUntil(() => button.getAttribute('mediaplaybackrate') === '2.5');
  });

  it('should return to normal speed when catching up to the live edge', async () => {
    const player = await fixture('<mux-player stream-type="live" target-live-window="Infinity"></mux-player>');
    Object.defineProperties(player.media, {
      currentTime: { configurable: true, value: 60, writable: true },
      liveEdgeStart: { configurable: true, value: 100, writable: true },
    });
    player.playbackRate = 2;
    player.media.dispatchEvent(new Event('timeupdate'));
    assert.equal(player.playbackRate, 2, 'preserves the selected speed while behind live');

    player.media.currentTime = 100;
    player.media.dispatchEvent(new Event('timeupdate'));
    assert.equal(player.playbackRate, 1, 'returns to 1x at the live edge');

    player.playbackRate = 3;
    player.media.dispatchEvent(new Event('ratechange'));
    assert.equal(player.playbackRate, 1, 'cannot accelerate past the live edge');

    const parent = player.parentNode;
    player.remove();
    parent.append(player);
    player.media.currentTime = 101;
    player.playbackRate = 2;
    player.media.dispatchEvent(new Event('timeupdate'));
    assert.equal(player.playbackRate, 1, 'restores live-edge handling after reconnecting');
  });

  it('should preserve playback rates when the live edge is unknown or the stream is on-demand', async () => {
    const player = await fixture('<mux-player stream-type="live" target-live-window="Infinity"></mux-player>');
    Object.defineProperties(player.media, {
      currentTime: { configurable: true, value: 100 },
      liveEdgeStart: { configurable: true, value: NaN, writable: true },
    });
    player.playbackRate = 2;
    player.media.dispatchEvent(new Event('timeupdate'));
    assert.equal(player.playbackRate, 2, 'an unknown live edge does not reset the selected speed');

    player.streamType = 'on-demand';
    player.media.liveEdgeStart = 90;
    player.media.dispatchEvent(new Event('timeupdate'));
    assert.equal(player.playbackRate, 2, 'on-demand playback is not limited to real time');

    player.streamType = 'live';
    player.playbackRate = 0.5;
    player.media.dispatchEvent(new Event('timeupdate'));
    assert.equal(player.playbackRate, 0.5, 'slower playback can move back from the live edge');
  });
});
