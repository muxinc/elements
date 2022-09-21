import { fixture, assert, aTimeout } from '@open-wc/testing';
import MuxAudioElement, { AudioEvents } from '../src/index.ts';

describe('<mux-audio>', () => {
  it('has a Mux specific API', async function () {
    const player = await fixture(`<mux-audio
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="on-demand"
      prefer-playback="mse"
      muted
    ></mux-audio>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', 'playback-id is reflected');
    assert.equal(player.envKey, 'ilc02s65tkrc2mk69b7q2qdkf', 'env-key is reflected');
    assert.equal(player.startTime, 0, 'startTime is set to 0');
    assert.equal(player.streamType, 'on-demand', 'stream-type is vod');
    assert.equal(player.preferPlayback, 'mse', 'prefer-playback is mse');
    assert.equal(player.debug, false, 'debug is off');
  });

  it('dispatches events properly', async function () {
    const player = await fixture(`<mux-audio
      playback-id="vDpm5ygrRJgfIEPNIc02IJR4Trf3z00AiP"
      muted
    ></mux-audio>`);

    const eventMap = {};
    AudioEvents.forEach((type) => {
      eventMap[type] = false;
      player.addEventListener(type, (e) => {
        assert.equal(e.target, player);
        eventMap[e.type] = true;
      });
    });

    player.volume = 0.5;

    // Seems only <audio> is throwing in my tests:
    //
    //   NotAllowedError: play() failed because the user didn't interact
    //   with the document first. https://goo.gl/xX8pDD
    //
    // try {
    //   await player.play();
    // } catch (error) {
    //   console.warn(error);
    // }

    // needs one tick for the event to have been called
    await aTimeout(100);

    assert.deepInclude(eventMap, {
      emptied: true,
      loadstart: true,
      volumechange: true,
    });
  });
});
