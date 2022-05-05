import { fixture, assert, aTimeout } from '@open-wc/testing';
import MuxVideoElement, { VideoEvents } from '../src/index.ts';

describe('<mux-video>', () => {
  it('has a Mux specific API', async function () {
    const player = await fixture(`<mux-video
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="vod"
      prefer-mse
      muted
    ></mux-video>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', 'playback-id is reflected');
    assert.equal(player.envKey, 'ilc02s65tkrc2mk69b7q2qdkf', 'env-key is reflected');
    assert.equal(player.startTime, 0, 'startTime is set to 0');
    assert.equal(player.streamType, 'vod', 'stream-type is vod');
    assert.equal(player.preferMse, true, 'prefer-mse is on');
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
      emptied: true,
      loadeddata: true,
      loadedmetadata: true,
      loadstart: true,
      play: true,
      playing: true,
      timeupdate: true,
      volumechange: true,
      waiting: true,
      resize: true,
    });
  });

  it('enqueues source changes', async function () {
    const player = await fixture(`<mux-video
      muted
      preload="auto"
    ></mux-video>`);

    let count = 0;
    player.addEventListener('loadstart', () => count++);

    player.playbackId = 'xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE';
    player.playbackId = 'r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA';

    // setting the source and loadstart are async, wait just a little bit.
    await aTimeout(100);

    assert.equal(count, 1, 'loadstart was called 1 time on 2 subsequent source changes');
    assert.equal(player.playbackId, 'r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA');
    assert.equal(player.preload, 'auto');
    assert(player.muted);
  });

  it('allows preload changes after setting source', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-video
      preload="auto"
    ></mux-video>`);

    let count = 0;
    player.addEventListener('loadedmetadata', () => count++);

    player.playbackId = 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe';
    player.preload = 'none';

    // setting the source and loadedmetadata are async, wait just a little bit.
    await aTimeout(2000);

    assert.equal(player.preload, 'none');
    assert.equal(count, 0, 'loadedmetadata was not called because preload is none');
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
});
