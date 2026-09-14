import { fixture, assert, aTimeout, waitUntil } from '@open-wc/testing';
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

  describe('src derivation', () => {
    it('re-derives src from attributes when it owns the playback id', async function () {
      const player = await fixture(
        `<mux-audio playback-id="UgKrPYAnjMjP6oMF4Kcs1gWVhtgYDR02EHQGnj022X1Xo" muted></mux-audio>`
      );

      player.setAttribute('custom-domain', 'example.com');
      assert.equal(new URL(player.src).hostname, 'stream.example.com', 'src follows custom-domain');
    });

    it('leaves an externally set src alone', async function () {
      // Same guard as mux-video, but it bites harder here: mux-audio's `playbackId` getter does
      // not fall back to `toPlaybackIdFromSrc()`, so an externally supplied src yielded no URL at
      // all and the recompute removed the src outright rather than merely dropping its params.
      const src = 'https://stream.mux.com/UgKrPYAnjMjP6oMF4Kcs1gWVhtgYDR02EHQGnj022X1Xo.m3u8?redundant_streams=true';
      const player = await fixture(`<mux-audio custom-domain="mux.com" src="${src}" muted></mux-audio>`);

      assert.equal(player.src, src, 'src survives initial upgrade');

      player.setAttribute('custom-domain', 'example.com');
      assert.equal(player.src, src, 'src survives a custom-domain change');
    });

    it('leaves a non-Mux src alone', async function () {
      const src = 'https://my-cdn.example.com/some/playlist.m3u8?sig=abc123';
      const player = await fixture(`<mux-audio src="${src}" muted></mux-audio>`);

      player.setAttribute('custom-domain', 'example.com');
      assert.equal(player.src, src, 'src survives a custom-domain change');
    });
  });
});

describe('<mux-audio> disable-cookies', function () {
  // These load real media, and every wait below is on a condition rather than a delay, so give the
  // slowest CI browser room instead of racing mocha's 2s default.
  this.timeout(15000);

  const PLAYBACK_ID = 'vDpm5ygrRJgfIEPNIc02IJR4Trf3z00AiP';
  const VIEWER_ID = 'test-viewer-id';

  const readMuxDataCookie = () => document.cookie.split('; ').find((c) => c.startsWith('muxData')) ?? null;

  const plantMuxDataCookie = () => {
    document.cookie = `muxData==undefined&mux_viewer_id=${VIEWER_ID}&msn=0.5&sid=s&sst=1&sex=9999999999999;path=/;max-age=3600`;
  };

  const forgetMuxDataCookie = () => {
    document.cookie = `muxData=;expires=${new Date(0).toUTCString()};path=/`;
  };

  /**
   * Stand-in for mux-embed that records the options each monitor was created with, so a re-attached
   * monitor can be told from a re-used one without sending beacons.
   */
  const createMuxDataSDKSpy = () => {
    const monitors = [];
    return {
      monitors,
      monitor(mediaEl, options) {
        const record = { options, destroyed: false };
        monitors.push(record);
        mediaEl.mux = {
          deleted: false,
          emit() {},
          addHLSJS() {},
          removeHLSJS() {},
          destroy() {
            record.destroyed = true;
            this.deleted = true;
          },
        };
      },
    };
  };

  // waitUntil() defaults to a 1s timeout, which a loaded CI browser can blow through.
  const WAIT = { timeout: 5000 };

  const waitForMonitors = (muxDataSDK, count, message) =>
    waitUntil(() => muxDataSDK.monitors.length >= count, message, WAIT);

  const waitForNoMuxDataCookie = (message) => waitUntil(() => readMuxDataCookie() === null, message, WAIT);

  /** Gives whatever a change kicked off time to surface, before asserting that nothing else did. */
  const settle = () => aTimeout(50);

  /** Loads a player with the Mux Data SDK spied on from the very first monitor. */
  const fixtureWithSpy = async (attrs = '') => {
    const player = await fixture(`<mux-audio muted ${attrs}></mux-audio>`);
    const muxDataSDK = createMuxDataSDKSpy();
    player.muxDataSDK = muxDataSDK;

    // The first load fires its own emptied/loadstart, and on a slow browser those can land well
    // after the monitor does, so wait for them rather than for a fixed delay: a test watching for a
    // reload would otherwise pick up the initial load.
    let loadStarted = false;
    player.addEventListener('loadstart', () => (loadStarted = true), { once: true });

    // Setting the playback id is what triggers the first load, and with it the first monitor.
    player.playbackId = PLAYBACK_ID;

    await waitForMonitors(muxDataSDK, 1, 'Mux Data should monitor the first load');
    await waitUntil(() => loadStarted, 'the first load should have started', WAIT);
    return { player, muxDataSDK };
  };

  afterEach(() => {
    forgetMuxDataCookie();
  });

  it('re-attaches Mux Data when disable-cookies is turned on', async () => {
    const { player, muxDataSDK } = await fixtureWithSpy();
    assert.equal(muxDataSDK.monitors.length, 1, 'monitored once on load');
    assert.notOk(muxDataSDK.monitors[0].options.disableCookies, 'cookies enabled to begin with');

    player.disableCookies = true;
    await waitForMonitors(muxDataSDK, 2, 'monitor should be re-created');

    assert.isTrue(muxDataSDK.monitors[0].destroyed, 'the previous monitor was destroyed');
    assert.isTrue(muxDataSDK.monitors[1].options.disableCookies, 'the new monitor has cookies disabled');
  });

  it('re-attaches Mux Data when disable-cookies is turned off', async () => {
    const { player, muxDataSDK } = await fixtureWithSpy('disable-cookies');
    assert.isTrue(muxDataSDK.monitors[0].options.disableCookies, 'cookies disabled to begin with');

    player.disableCookies = false;
    await waitForMonitors(muxDataSDK, 2, 'monitor should be re-created');

    assert.notOk(muxDataSDK.monitors[1].options.disableCookies, 'the new monitor has cookies enabled');
  });

  it('does not re-attach Mux Data when the same value is re-applied', async () => {
    const { player, muxDataSDK } = await fixtureWithSpy();

    player.setAttribute('disable-cookies', '');
    await waitForMonitors(muxDataSDK, 2, 'the change should be applied');

    // attributeChangedCallback fires even when the value is identical.
    player.setAttribute('disable-cookies', '');
    await settle();
    assert.equal(muxDataSDK.monitors.length, 2, 'no monitor for a redundant re-apply');
  });

  it('does not reload the media when disable-cookies changes', async () => {
    const { player, muxDataSDK } = await fixtureWithSpy();

    const mediaEvents = [];
    ['emptied', 'loadstart', 'abort'].forEach((type) => {
      player.addEventListener(type, () => mediaEvents.push(type));
    });

    player.disableCookies = true;
    // Anchored on the re-attach, so this can't pass just because the change hasn't landed yet.
    await waitForMonitors(muxDataSDK, 2, 'Mux Data should be re-attached');
    await settle();

    assert.deepEqual(mediaEvents, [], 'the media element was left alone');
  });

  it('clears the muxData cookie when cookies are disabled at runtime', async () => {
    const { player } = await fixtureWithSpy();
    plantMuxDataCookie();

    player.disableCookies = true;

    await waitForNoMuxDataCookie('the cookie should be cleared');
  });

  it('keeps an existing muxData cookie when it initializes with disable-cookies', async () => {
    // A server-rendered page can't read consent, so it always emits the cookie-less state. Clearing
    // there would drop a returning viewer's mux_viewer_id before consent can be granted.
    plantMuxDataCookie();

    const { muxDataSDK } = await fixtureWithSpy('disable-cookies');
    await settle();

    assert.include(readMuxDataCookie(), VIEWER_ID, 'the cookie was left alone');
    assert.equal(muxDataSDK.monitors.length, 1, 'no re-attach was needed');
    assert.isTrue(muxDataSDK.monitors[0].options.disableCookies, 'and cookies are disabled');
  });
});
