import { fixture, assert, aTimeout } from '@open-wc/testing';
import MuxVideoElement, { VideoEvents } from '../src/index.ts';

describe('<mux-video>', () => {
  it('has a Mux specific API', async function () {
    const player = await fixture(`<mux-video
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="on-demand"
      prefer-playback="mse"
      muted
    ></mux-video>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', 'playback-id is reflected');
    assert.equal(player.envKey, 'ilc02s65tkrc2mk69b7q2qdkf', 'env-key is reflected');
    assert.equal(player.startTime, 0, 'startTime is set to 0');
    assert.equal(player.streamType, 'on-demand', 'stream-type is vod');
    assert.equal(player.preferPlayback, 'mse', 'prefer mse is on');
    assert.equal(player.debug, false, 'debug is off');
  });

  it('dispatches events properly', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-video
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      muted
      preload="auto"
    ></mux-video>`);

    const eventMap = {};
    VideoEvents.forEach((type) => {
      eventMap[type] = false;
      player.addEventListener(type, (e) => {
        assert.equal(e.target, player);
        eventMap[e.type] = true;
      });
    });

    player.volume = 0.5;

    try {
      await player.play();
    } catch (error) {
      console.warn(error);
    }

    assert.deepInclude(eventMap, {
      canplay: true,
      durationchange: true,
      loadeddata: true,
      loadedmetadata: true,
      loadstart: true,
      play: true,
      playing: true,
      timeupdate: true,
      volumechange: true,
      resize: true,
    });
  });

  it('can use extended autoplay properties on initial load', async function () {
    const player = await fixture(`<mux-video
      autoplay="muted"
    ></mux-video>`);

    assert.equal(player.autoplay, 'muted', 'our autoplay setting is muted');
  });

  it('can use extended autoplay properties', async function () {
    const player = await fixture(`<mux-video
    ></mux-video>`);

    assert.equal(player.autoplay, false, 'initial autoplay is false');

    player.autoplay = 'muted';

    assert.equal(player.autoplay, 'muted', 'can set autoplay to "muted"');
    assert.equal(player.getAttribute('autoplay'), 'muted', 'the attribute is set to "muted"');

    player.autoplay = 'any';

    assert.equal(player.autoplay, 'any', 'can set autoplay to "any"');
    assert.equal(player.getAttribute('autoplay'), 'any', 'the attribute is set to "muted"');

    player.autoplay = false;

    assert.isFalse(player.autoplay, 'can turn off autoplay');
    assert.isFalse(player.hasAttribute('autoplay'), 'setting to false reomves the attribute');

    player.autoplay = true;
    assert.isTrue(player.autoplay, 'can turn off autoplay');
    assert.equal(player.getAttribute('autoplay'), '', 'when prop is set to true, attribute value is an empty string');
  });

  it('can use extended autoplay attributes', async function () {
    const player = await fixture(`<mux-video
    ></mux-video>`);

    assert.equal(player.autoplay, false, 'initial autoplay is false');

    player.setAttribute('autoplay', 'muted');

    assert.equal(player.autoplay, 'muted', 'can set autoplay to "muted"');
    assert.equal(player.getAttribute('autoplay'), 'muted', 'the attribute is set to "muted"');

    player.setAttribute('autoplay', 'any');

    assert.equal(player.autoplay, 'any', 'can set autoplay to "any"');
    assert.equal(player.getAttribute('autoplay'), 'any', 'the attribute is set to "muted"');

    player.removeAttribute('autoplay');
    player.autoplay = false;

    assert.isFalse(player.autoplay, 'can turn off autoplay');
    assert.isFalse(player.hasAttribute('autoplay'), 'setting to false reomves the attribute');

    player.setAttribute('autoplay', '');
    assert.isTrue(player.autoplay, 'can turn off autoplay');
    assert.equal(player.getAttribute('autoplay'), '', 'when prop is set to true, attribute value is an empty string');
  });

  it('preload is forwarded to the native el', async function () {
    const player = await fixture(`<mux-video
      src="https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8"
    ></mux-video>`);

    assert.equal(player.preload, 'metadata', 'browser default preload is metadata');

    player.setAttribute('preload', '');
    assert.equal(player.preload, 'auto', 'preload="" attribute maps to the auto state');
    assert.equal(player.nativeEl.preload, 'auto', 'native preload="" attribute maps to the auto state');

    player.preload = null;
    assert.equal(player.preload, 'metadata', 'browser default preload is metadata');
    assert.equal(player.nativeEl.preload, 'metadata', 'native browser default preload is metadata');

    player.preload = 'auto';
    assert.equal(player.getAttribute('preload'), 'auto', 'preload attr is auto');
    assert.equal(player.nativeEl.getAttribute('preload'), 'auto', 'native preload attr is auto');
  });

  it('can use preload="none" and play', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-video
      src="https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8"
      preload="none"
      muted
    ></mux-video>`);

    assert.equal(player.preload, 'none', 'preload is none');
    await aTimeout(3000);
    assert.equal(player.buffered.length, 0, 'no buffer loaded');

    try {
      await player.play();
    } catch (error) {
      console.warn(error);
    }

    assert(!player.paused, 'is playing after play()');
  });

  it('maps arbitrary metadata-* attrs to the metadata prop and populates video_id if not provided', async function () {
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const player = await fixture(`<mux-video
      src="https://stream.mux.com/${playbackId}.m3u8"
      metadata-video-title="Video Title"
      metadata-sub-property-id="sub-id-12"
    ></mux-video>`);

    assert.equal(player.metadata.video_title, 'Video Title');
    assert.equal(player.metadata.sub_property_id, 'sub-id-12');
    assert.equal(player.metadata.video_id, playbackId);
  });
});
