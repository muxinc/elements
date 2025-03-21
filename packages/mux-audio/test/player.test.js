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

    player.playbackId = 'vDpm5ygrRJgfIEPNIc02IJR4Trf3z00AiP';
    await aTimeout(100);

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
      loadstart: true,
      volumechange: true,
    });
  });

  it('preload is forwarded to the native el', async function () {
    const player = await fixture(`<mux-audio
      src="https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8"
    ></mux-audio>`);

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

  it('can use preload="none"', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-audio
      src="https://stream.mux.com/23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I.m3u8"
      preload="none"
      muted
    ></mux-audio>`);

    assert.equal(player.preload, 'none', 'preload is none');
    await aTimeout(3000);
    assert.equal(player.buffered.length, 0, 'no buffer loaded');
  });

  it('maps arbitrary metadata-* attrs to the metadata prop and populates video_id if not provided', async function () {
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const player = await fixture(`<mux-audio
      src="https://stream.mux.com/${playbackId}.m3u8"
      metadata-sub-property-id="sub-id-12"
    ></mux-video>`);

    assert.equal(player.metadata.sub_property_id, 'sub-id-12');
    assert.equal(player.metadata.video_id, playbackId);
  });

  // Test is failing for audio...
  it.skip('currentPdt and getStartDate work as expected', async function () {
    this.timeout(5000);

    const player = await fixture(`<mux-audio
      src="https://stream.mux.com/UgKrPYAnjMjP6oMF4Kcs1gWVhtgYDR02EHQGnj022X1Xo.m3u8"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      prefer-playback="mse"
      muted
      preload="auto"
    ></mux-audio>`);

    await aTimeout(1000);

    player.currentTime = 60;

    await aTimeout(1000);

    const currentPdt = player.currentPdt;
    const startDate = player.getStartDate();

    assert.equal(
      startDate.getTime(),
      currentPdt.getTime() - player.currentTime * 1000,
      'currentPdt should be ~60 seconds greater than getStartDate'
    );
  });
});
