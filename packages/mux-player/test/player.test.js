import { fixture, assert, aTimeout, waitUntil, oneEvent } from '@open-wc/testing';
import '../src/index.ts';

const isSafari = /.*Version\/.*Safari\/.*/.test(navigator.userAgent);

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

describe('<mux-player>', () => {
  it('has a Mux specific API', async function () {
    this.timeout(5000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="on-demand"
      prefer-playback="mse"
      muted
      title="A title"
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', 'playback-id is reflected');
    assert.equal(player.envKey, 'ilc02s65tkrc2mk69b7q2qdkf', 'env-key is reflected');
    assert.equal(player.startTime, 0, 'startTime is set to 0');
    assert.equal(player.streamType, 'on-demand', 'stream-type is on-demand');
    assert.equal(player.preferPlayback, 'mse', 'prefer mse is on');
    assert.equal(player.debug, false, 'debug is off');
    assert.equal(player.title, 'A title', 'title is set');
  });

  (isSafari ? it.skip : it)('has a video like API', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    assert(player.paused, 'is paused on initialization');
    assert(!player.ended, 'is not ended');

    assert(!player.loop, 'loop is false by default');
    player.loop = true;
    assert(player.loop, 'loop is true');

    assert.equal(player.volume, 1, 'is all turned up');
    player.volume = 0.5;
    assert.equal(player.volume, 0.5, 'is half volume');

    player.muted = true;
    assert(player.muted, 'is muted');

    await aTimeout(1000);

    await player.play();

    assert(!player.paused, 'is playing after player.play()');
    assert.equal(Math.round(player.duration), 134, `is 134s long`);

    await aTimeout(1000);

    assert.isAtLeast(Math.round(player.currentTime), 1, 'is greater or equal to 1s');
  });

  it('playbackId is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    await aTimeout(100);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');
  });

  it('autoplay is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      autoplay
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.autoplay, true);
    assert.equal(muxVideo.autoplay, true);

    player.removeAttribute('autoplay');
    assert(!muxVideo.hasAttribute('autoplay'), `has autoplay attr removed`);

    player.setAttribute('autoplay', '');
    assert.equal(muxVideo.getAttribute('autoplay'), '', `has autoplay attr added`);
    assert.equal(muxVideo.autoplay, true, `has autoplay enabled`);
  });

  it('muted is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      muted
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.muted, true);
    assert.equal(muxVideo.muted, true);

    player.removeAttribute('muted');
    assert(!muxVideo.hasAttribute('muted'), `has muted attr removed`);

    player.setAttribute('muted', '');
    assert.equal(muxVideo.getAttribute('muted'), '', `has muted attr added`);
    assert.equal(muxVideo.muted, true, `has muted enabled`);
  });

  it('playsinline property always returns true', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      playsinline
    ></mux-player>`);
    assert(player.playsInline);
  });

  it('loop is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      loop
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.loop, true);
    assert.equal(muxVideo.loop, true);

    player.removeAttribute('loop');
    assert(!muxVideo.hasAttribute('loop'), `has loop attr removed`);

    player.setAttribute('loop', '');
    assert.equal(muxVideo.getAttribute('loop'), '', `has loop attr added`);
    assert.equal(muxVideo.loop, true, `has loop enabled`);
  });

  it('crossorigin is forwarded to the media element but enabled by default', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      crossorigin="anonymous"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.crossOrigin, 'anonymous');
    assert.equal(muxVideo.crossOrigin, 'anonymous');

    player.removeAttribute('crossorigin');
    assert(muxVideo.hasAttribute('crossorigin'), `still has crossorigin attr`);

    player.setAttribute('crossorigin', 'use-credentials');
    assert.equal(muxVideo.getAttribute('crossorigin'), 'use-credentials', `has crossorigin attr added`);
    assert.equal(muxVideo.crossOrigin, 'use-credentials', `has crossorigin enabled`);
  });

  it('preload is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      preload="metadata"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.preload, 'metadata');
    assert.equal(muxVideo.preload, 'metadata');

    player.removeAttribute('preload');
    assert(!muxVideo.hasAttribute('preload'), `has preload attr removed`);

    player.setAttribute('preload', 'auto');
    assert.equal(muxVideo.getAttribute('preload'), 'auto', `has preload attr added`);
    assert.equal(muxVideo.preload, 'auto', `has preload enabled`);
  });

  it('preload behaves like expected', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
    ></mux-player>`);
    const muxVideo = player.media;
    const defaultPreload = document.createElement('video').preload;

    // firefox returns '' by default, but we return auto in that case
    if (defaultPreload === '') {
      assert.equal(player.preload, 'auto', 'player default preload auto');
      assert.equal(muxVideo.preload, 'auto', 'player default preload auto');
    } else {
      assert.equal(player.preload, defaultPreload, `player default preload is ${defaultPreload}`);
      assert.equal(muxVideo.preload, defaultPreload, `muxVideo default preload is ${defaultPreload}`);
    }

    player.setAttribute('preload', '');
    assert.equal(player.preload, 'auto', 'player preload="" maps to auto');
    assert.equal(muxVideo.preload, 'auto', 'muxVideo preload="" maps to auto');

    player.preload = null;
    assert(!muxVideo.hasAttribute('preload'), `has preload attr removed`);
    assert.equal(player.preload, defaultPreload, `player default preload is ${defaultPreload}`);
    assert.equal(muxVideo.preload, defaultPreload, `muxVideo default preload is ${defaultPreload}`);
  });

  it('poster is forwarded to the media-poster-image element', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      poster="https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0"
    ></mux-player>`);
    const mediaPosterImage = player.mediaTheme.querySelector('media-poster-image');

    assert.equal(
      player.poster,
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0',
      'player.poster does not equal in-html defined poster attribute'
    );
    assert.equal(
      mediaPosterImage.getAttribute('src'),
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0',
      'mediaPosterImage src attribute does not equal in-html defined poster attribute'
    );

    player.removeAttribute('poster');
    await aTimeout(1); // add one tick here because media-theme renders from attributes are not sync
    assert(!mediaPosterImage.hasAttribute('src'), `has src attr removed`);

    player.setAttribute(
      'poster',
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1'
    );
    await aTimeout(1); // add one tick here because media-theme renders from attributes are not sync
    assert.equal(
      mediaPosterImage.getAttribute('src'),
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1',
      `has poster attr added`
    );
  });

  it('poster can be unset with an empty string', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-player
      stream-type="on-demand"
      poster="https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0"
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
    ></mux-player>`);
    const mediaPosterImage = player.mediaTheme.querySelector('media-poster-image');

    assert.equal(
      player.poster,
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0',
      'does not equal in-html defined poster attribute'
    );

    player.removeAttribute('poster');
    assert.equal(
      player.poster,
      'https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.webp',
      'uses the derived poster if no poster attribute is present'
    );

    player.poster = '';
    assert.equal(player.poster, '');
    await aTimeout(1); // add one tick here because media-theme renders from attributes are not sync
    assert(!mediaPosterImage.hasAttribute('src'), 'media-poster-image does have a poster attribute');

    player.setAttribute(
      'poster',
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1'
    );
    assert.equal(
      player.poster,
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1',
      'does not equal poster set with setAttribute()'
    );
    await aTimeout(1); // add one tick here because media-theme renders from attributes are not sync
    assert.equal(
      mediaPosterImage.getAttribute('src'),
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1',
      `has poster attr added`
    );
  });

  it('src is forwarded to the media element', async function () {
    this.timeout(5000);

    const player = await fixture(`<mux-player
      stream-type="on-demand"
      src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.src, 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8');
    assert.equal(muxVideo.src, 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8');

    player.removeAttribute('src');
    assert(!muxVideo.hasAttribute('src'), `has src attr removed`);

    player.setAttribute('src', 'https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8');
    assert.equal(
      muxVideo.getAttribute('src'),
      'https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8',
      `has src attr added`
    );
    assert.equal(
      muxVideo.src,
      'https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8',
      `has src enabled`
    );
  });

  it('should forward metadata attributes to the media element', async function () {
    this.timeout(5000);

    const video_id = 'test-video-id';
    const video_title = 'test-video-title';
    const viewer_user_id = 'test-viewer-user-id';
    const sub_property_id = 'test-sub-prop-id';
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      metadata-video-id="${video_id}"
      metadata-video-title="${video_title}"
      metadata-viewer-user-id="${viewer_user_id}"
      metadata-sub-property-id="${sub_property_id}"
    ></mux-player>`);

    const actual = player.media.metadata;
    const expected = { video_id, video_title, viewer_user_id, sub_property_id };
    assert.include(actual, expected, 'has expected metadata entries from attrs');
  });

  it('should forward theme attributes to the theme element', async () => {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      theme-control-bar-vertical
      theme-control-bar-place="self end"
    ></mux-player>`);

    assert.equal(player.mediaTheme.attributes['control-bar-vertical'].value, '');
    assert.equal(player.mediaTheme.attributes['control-bar-place'].value, 'self end');
  });

  it('should forward themeProps to the theme element', async () => {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      theme-control-bar-vertical
      theme-control-bar-place="self end"
    ></mux-player>`);

    assert.deepEqual(player.themeProps, {
      controlBarVertical: true,
      controlBarPlace: 'self end',
    });

    player.themeProps = {};

    assert.deepEqual(player.themeProps, {});

    player.themeProps = {
      controlBarPlace: 'self end',
    };

    assert.deepEqual(player.themeProps, {
      controlBarPlace: 'self end',
    });
  });

  it('muted attribute behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert(player.muted, 'player.muted is true');
    assert(muxVideo.muted, 'muxVideo.muted is true');
    assert(nativeVideo.muted, 'nativeVideo.muted is true');

    assert(player.defaultMuted, 'player.defaultMuted is true');
    assert(muxVideo.defaultMuted, 'muxVideo.defaultMuted is true');
    assert(nativeVideo.defaultMuted, 'nativeVideo.defaultMuted is true');

    player.removeAttribute('muted');

    assert(!player.muted, 'player.muted is false');
    assert(!muxVideo.muted, 'muxVideo.muted is false');
    assert(!nativeVideo.muted, 'nativeVideo.muted is false');

    assert(!player.defaultMuted, 'player.defaultMuted is false');
    assert(!muxVideo.defaultMuted, 'muxVideo.defaultMuted is false');
    assert(!nativeVideo.defaultMuted, 'nativeVideo.defaultMuted is false');

    player.setAttribute('muted', '');

    assert(player.muted, 'player.muted is true');
    assert(muxVideo.muted, 'muxVideo.muted is true');
    assert(nativeVideo.muted, 'nativeVideo.muted is true');

    assert(player.defaultMuted, 'player.defaultMuted is true');
    assert(muxVideo.defaultMuted, 'muxVideo.defaultMuted is true');
    assert(nativeVideo.defaultMuted, 'nativeVideo.defaultMuted is true');
  });

  it('volume attribute behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      volume="0.4"
    ></mux-player>`);

    assert.equal(player.getAttribute('volume'), '0.4');

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert.equal(player.volume.toFixed(1), '0.4', 'player.volume is 0.4');
    assert.equal(muxVideo.volume.toFixed(1), '0.4', 'muxVideo.volume is 0.4');
    assert.equal(nativeVideo.volume.toFixed(1), '0.4', 'nativeVideo.volume is 0.4');

    player.setAttribute('volume', '0.9');

    assert.equal(player.volume.toFixed(1), '0.9', 'player.volume is 0.9');
    assert.equal(muxVideo.volume.toFixed(1), '0.9', 'muxVideo.volume is 0.9');
    assert.equal(nativeVideo.volume.toFixed(1), '0.9', 'nativeVideo.volume is 0.9');
  });

  it('playbackrate attribute behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      playbackrate="2"
    ></mux-player>`);

    assert.equal(player.getAttribute('playbackrate'), '2');

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert.equal(player.playbackRate, 2, 'player.playbackRate is 2');
    assert.equal(muxVideo.playbackRate, 2, 'muxVideo.playbackRate is 2');
    assert.equal(nativeVideo.playbackRate, 2, 'nativeVideo.playbackRate is 2');

    player.setAttribute('playbackrate', '0.7');

    assert.equal(player.playbackRate, 0.7, 'player.playbackRate is 0.7');
    assert.equal(muxVideo.playbackRate, 0.7, 'muxVideo.playbackRate is 0.7');
    assert.equal(nativeVideo.playbackRate, 0.7, 'nativeVideo.playbackRate is 0.7');
  });

  it('defaultPlaybackRate property behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
    ></mux-player>`);

    assert.equal(player.defaultPlaybackRate, 1);

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert.equal(player.defaultPlaybackRate, 1, 'player.defaultPlaybackRate is 1');
    assert.equal(muxVideo.defaultPlaybackRate, 1, 'muxVideo.defaultPlaybackRate is 1');
    assert.equal(nativeVideo.defaultPlaybackRate, 1, 'nativeVideo.defaultPlaybackRate is 1');

    player.defaultPlaybackRate = 0.7;

    assert.equal(player.defaultPlaybackRate, 0.7, 'player.defaultPlaybackRate is 0.7');
    assert.equal(muxVideo.defaultPlaybackRate, 0.7, 'muxVideo.defaultPlaybackRate is 0.7');
    assert.equal(nativeVideo.defaultPlaybackRate, 0.7, 'nativeVideo.defaultPlaybackRate is 0.7');
  });

  it("signing tokens generate correct asset URL's", async function () {
    // tokens expire in 10 years
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY"
      playback-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA"
      thumbnail-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w"
      storyboard-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw"
    ></mux-player>`);

    const muxVideo = player.media;
    const mediaPosterImage = player.mediaTheme.querySelector('media-poster-image');
    const storyboardTrack = muxVideo.shadowRoot.querySelector("track[label='thumbnails']");

    assert.equal(
      muxVideo.getAttribute('src'),
      'https://stream.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY.m3u8?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA'
    );

    assert.equal(
      mediaPosterImage.getAttribute('src'),
      'https://image.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY/thumbnail.webp?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w'
    );

    assert.equal(
      storyboardTrack.getAttribute('src'),
      'https://image.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY/storyboard.vtt?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw&format=webp'
    );
  });

  it('max-resolution is set as a prop and forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      max-resolution="720p"
      stream-type="on-demand"
      playback-id="r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.maxResolution, '720p');
    const actualSrcUrl = new URL(muxVideo.src);
    const expectedSrcUrl = new URL(
      'https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8?redundant_streams=true&max_resolution=720p'
    );
    assert.equal(actualSrcUrl.searchParams.size, expectedSrcUrl.searchParams.size);
    expectedSrcUrl.searchParams.forEach((value, key) => {
      assert.equal(actualSrcUrl.searchParams.get(key), value);
    });

    player.removeAttribute('max-resolution');
    assert.equal(player.maxResolution, null);

    player.maxResolution = '720p';
    assert.equal(player.maxResolution, '720p');
  });

  it('should apply extra-playlist-params as arbitrary search params on src', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      extra-source-params="foo=str&bar=true&baz=1"
      playback-id="r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA"
    ></mux-player>`);
    const muxVideo = player.media;

    // NOTE: While you may use any value for the setter, the current impl will convert all values to string equivalents (CJP)
    const expectedExtraPlaylistParams = { foo: 'str', bar: 'true', baz: '1' };
    assert.deepEqual(
      player.extraSourceParams,
      expectedExtraPlaylistParams,
      'should reflect value when set via attribute'
    );
    const actualSrcUrl = new URL(muxVideo.src);
    const expectedSrcUrl = new URL(
      'https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8?foo=str&bar=true&baz=1'
    );
    assert.equal(actualSrcUrl.searchParams.size, expectedSrcUrl.searchParams.size);
    expectedSrcUrl.searchParams.forEach((value, key) => {
      assert.equal(actualSrcUrl.searchParams.get(key), value);
    });

    player.removeAttribute('extra-source-params');
    assert.deepEqual(
      player.extraSourceParams,
      { redundant_streams: true },
      'should reset to default params when attribute is removed'
    );

    player.extraSourceParams = {
      foo: 'str',
      bar: true,
      baz: 1,
    };
    assert.deepEqual(
      player.extraSourceParams,
      expectedExtraPlaylistParams,
      'should reflect value when set via property'
    );
  });

  describe('buffered behaviors', function () {
    it('should have an empty TimeRanges value by default', async function () {
      const playerEl = await fixture('<mux-player stream-type="on-demand"></mux-player>');
      assert(playerEl.buffered instanceof TimeRanges, 'should be an instanceof TimeRanges');
      assert.equal(playerEl.buffered.length, 0, 'should have a length of 0');
    });

    (isSafari ? it.skip : it)('should have something in the buffer if canplay', async function () {
      this.timeout(5000);
      const playerEl = await fixture(
        '<mux-player stream-type="on-demand" playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"></mux-player>'
      );
      if (playerEl.readyState < 3) {
        await oneEvent(playerEl, 'canplay');
      }
      assert(playerEl.buffered.length >= 1, 'should have a length of at least 1');
    });

    (isSafari ? it.skip : it)('should clear the buffer when the media is unset', async function () {
      this.timeout(5000);
      const playerEl = await fixture(
        '<mux-player stream-type="on-demand" playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"></mux-player>'
      );
      if (playerEl.readyState < 3) {
        await oneEvent(playerEl, 'canplay');
      }
      playerEl.playbackId = undefined;
      await oneEvent(playerEl, 'emptied');
      assert.equal(playerEl.buffered.length, 0, 'should have a length of 0');
    });
  });

  describe('seekable behaviors', function () {
    it('should have an empty TimeRanges value by default', async function () {
      const playerEl = await fixture('<mux-player stream-type="on-demand"></mux-player>');
      assert(playerEl.seekable instanceof TimeRanges, 'should be an instanceof TimeRanges');
      assert.equal(playerEl.seekable.length, 0, 'should have a length of 0');
    });

    (isSafari ? it.skip : it)('should have a length of exactly 1 if canplay', async function () {
      this.timeout(5000);
      const playerEl = await fixture(
        '<mux-player stream-type="on-demand" playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"></mux-player>'
      );
      if (playerEl.readyState < 3) {
        await oneEvent(playerEl, 'canplay');
      }
      assert.equal(playerEl.seekable.length, 1, 'should have a length of exactly 1');
    });

    (isSafari ? it.skip : it)('should clear the seekable range when the media is unset', async function () {
      this.timeout(5000);
      const playerEl = await fixture(
        '<mux-player stream-type="on-demand" playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"></mux-player>'
      );
      if (playerEl.readyState < 3) {
        await oneEvent(playerEl, 'canplay');
      }
      playerEl.playbackId = undefined;
      await oneEvent(playerEl, 'emptied');
      assert.equal(playerEl.seekable.length, 0, 'should have a length of 0');
    });
  });

  describe('storyboard', async function () {
    it('should return a url', async function () {
      const player = await fixture(`<mux-player
        playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        stream-type="on-demand"
        muted
      ></mux-player>`);

      await oneEvent(player, 'streamtypechange');
      assert.equal(
        player.storyboard,
        'https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/storyboard.vtt?format=webp',
        'should return the expected url with a stream type'
      );

      player.removeAttribute('stream-type');
      assert.equal(
        player.storyboard,
        'https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/storyboard.vtt?format=webp',
        'should return the expected url without a stream type'
      );
    });

    it('should not return a url with audio player', async function () {
      this.timeout(5000);

      const player = await fixture(`<mux-player
        playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        audio
        stream-type="on-demand"
        muted
      ></mux-player>`);

      assert.equal(player.storyboard, undefined, 'should not return a url');
    });

    it('should not return a url with live stream type', async function () {
      const player = await fixture(`<mux-player
        playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        stream-type="live"
        muted
      ></mux-player>`);

      assert.equal(player.storyboard, undefined, 'should not return a url');
    });

    it('should work with tokens', async function () {
      const player = await fixture(`<mux-player
        stream-type="on-demand"
        playback-id="bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY"
        playback-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA"
        thumbnail-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w"
        storyboard-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw"
      ></mux-player>`);

      assert.equal(
        player.storyboard,
        'https://image.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY/storyboard.vtt?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw&format=webp'
      );
    });
    it('should work with storyboard-src', async function () {
      const player = await fixture(`<mux-player
          playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          stream-type="on-demand"
          storyboard-src="https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/storyboard.vtt"
          muted
        ></mux-player>`);

      assert.equal(
        player.storyboard,
        'https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/storyboard.vtt'
      );
    });
    it('should update storyboard-src property', async function () {
      const player = await fixture(`<mux-player
          playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          stream-type="on-demand"
          muted
        ></mux-player>`);
      player.storyboardSrc = 'https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/storyboard.vtt';
      assert.equal(
        player.storyboard,
        'https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/storyboard.vtt'
      );
    });
    it('should default storyboard-src property to undefined', async function () {
      const player = await fixture(`<mux-player
          playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          stream-type="on-demand"
          muted
        ></mux-player>`);
      assert.equal(player.storyboardSrc, undefined);
    });
    it('should update storyboard-src property on change', async function () {
      const player = await fixture(`<mux-player
          storyboard-src="https://image.mux.com/fake/sotryboard/url/storyboard.vtt"
          playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          stream-type="on-demand"
          muted
        ></mux-player>`);
      const newStoryboardSrc = 'https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/storyboard.vtt';
      player.storyboardSrc = newStoryboardSrc;
      assert.equal(player.storyboardSrc, newStoryboardSrc);
      assert.equal(player.storyboard, newStoryboardSrc);
    });
    it('should default to token.storyboard even if storyboard-src is set', async function () {
      const player = await fixture(`<mux-player
        stream-type="on-demand"
        playback-id="bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY"
        playback-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA"
        thumbnail-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w"
        storyboard-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw"
        storyboard-src="https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/storyboard.vtt"
      ></mux-player>`);
      assert.equal(
        player.storyboard,
        'https://image.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY/storyboard.vtt?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw&format=webp'
      );
    });
  });
});

describe('<mux-player> playbackId transitions', () => {
  it('loads the new playbackId', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');

    player.playbackId = 'xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE';

    assert.equal(
      player.src,
      'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8?redundant_streams=true'
    );
  });

  it('unloads the current playbackId', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');

    player.removeAttribute('playback-id');
    assert.equal(player.src, null);
  });

  it('loads the new src', async function () {
    const player = await fixture(`<mux-player
      src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8?redundant_streams=true"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.src, 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8?redundant_streams=true');

    player.src = 'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8?redundant_streams=true';

    assert.equal(
      player.src,
      'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8?redundant_streams=true'
    );
  });

  it('unloads the current src', async function () {
    const player = await fixture(`<mux-player
      src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8?redundant_streams=true"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.src, 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8?redundant_streams=true');

    player.removeAttribute('src');
    assert.equal(player.src, null);
  });

  it('src can be reset with empty string property', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      src="https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8"
    ></mux-player>`);
    const muxVideo = player.media;

    player.src = '';
    assert.equal(player.src, null, `player has null src property`);
    assert(!player.hasAttribute('src'), `player has no src attribute`);
    assert.equal(muxVideo.src, null, `muxVideo has null src property`);
    assert(!muxVideo.hasAttribute('src'), `muxVideo has no src attribute`);
  });

  it('src can be reset with nil property', async function () {
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      src="https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8"
    ></mux-player>`);
    const muxVideo = player.media;

    player.src = null;
    assert.equal(player.src, null, `player has empty string src property`);
    assert(!player.hasAttribute('src'), `player has no src attribute`);
    assert.equal(muxVideo.src, null, `muxVideo has empty string src property`);
    assert(!muxVideo.hasAttribute('src'), `muxVideo has no src attribute`);
  });

  it('loads the new playbackId and clears dialog state', async function () {
    const oldLogError = console.error;
    const oldLogWarn = console.warn;

    // eslint-disable-next-line
    console.error = () => {};
    // eslint-disable-next-line
    console.warn = () => {};

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');

    player.dispatchEvent(
      new CustomEvent('error', {
        detail: { code: MediaError.MEDIA_ERR_NETWORK },
      })
    );

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3').textContent, 'Network Error');

    player.playbackId = 'xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE';

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3'), null);

    console.error = oldLogError;
    console.warn = oldLogWarn;
  });

  it('loads the new src and clears dialog state', async function () {
    const oldLogError = console.error;
    const oldLogWarn = console.warn;

    // eslint-disable-next-line
    console.error = () => {};
    // eslint-disable-next-line
    console.warn = () => {};

    const player = await fixture(`<mux-player
      src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.src, 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8');

    player.dispatchEvent(
      new CustomEvent('error', {
        detail: { code: MediaError.MEDIA_ERR_NETWORK },
      })
    );

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3').textContent, 'Network Error');

    player.src = 'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8';

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3'), null);

    console.error = oldLogError;
    console.warn = oldLogWarn;
  });
});

describe('<mux-player> seek to live behaviors', function () {
  this.timeout(12000);

  it('should not have a seek to live button if the stream-type is not live/ll-live', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      preload="auto"
    ></mux-player>`);

    const mediaControllerEl = playerEl.mediaController;
    const seekToLiveEl = playerEl.mediaTheme.shadowRoot.querySelector('media-live-button');
    assert.exists(mediaControllerEl);
    assert.notExists(seekToLiveEl);
  });

  it.skip('should have a seek to live button if the stream-type is live', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      stream-type="live"
      preload="auto"
    ></mux-player>`);

    const mediaControllerEl = playerEl.mediaController;
    const seekToLiveEl = playerEl.mediaTheme.shadowRoot.querySelector('media-live-button');
    assert.exists(mediaControllerEl);
    assert.exists(seekToLiveEl);
  });

  it.skip('should have a seek to live button if the stream-type is ll-live', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      stream-type="ll-live"
      preload="auto"
    ></mux-player>`);

    await oneEvent(playerEl, 'streamtypechange');

    const mediaControllerEl = playerEl.mediaController;
    const seekToLiveEl = playerEl.mediaTheme.shadowRoot.querySelector('media-live-button');
    assert.exists(mediaControllerEl);
    assert.exists(seekToLiveEl);
  });

  it.skip('should seek to live when seek to live button pressed', async function () {
    this.timeout(20000);

    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      muted
      preload="auto"
    ></mux-player>`);

    await playerEl.play();
    await waitUntil(() => !playerEl.paused, 'play() failed');
    await waitUntil(() => playerEl.inLiveWindow, 'playback did not start inLiveWindow', { timeout: 11000 });
    playerEl.pause();
    const playbackTime = playerEl.currentTime;
    const liveEdgeStart = playerEl.media.liveEdgeStart;
    const maxWaitTime = (playbackTime - liveEdgeStart + 1) * 1000;
    await waitUntil(() => !playerEl.inLiveWindow, 'still inLiveWindow after long pause', { timeout: maxWaitTime });
    const seekToLiveEl = playerEl.mediaTheme.shadowRoot.querySelector('media-live-button');
    seekToLiveEl.click();
    await waitUntil(() => playerEl.inLiveWindow, 'clicking seek to live did not seek to live window');
  });

  it.skip('should seek to live when play button is pressed', async function () {
    this.timeout(20000);
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      muted
      stream-type="ll-live"
      preload="auto"
    ></mux-player>`);

    await playerEl.play();
    await waitUntil(() => !playerEl.paused, 'play() failed');
    await waitUntil(() => playerEl.inLiveWindow, 'playback did not start inLiveWindow', { timeout: 11000 });
    playerEl.pause();
    const playbackTime = playerEl.currentTime;
    const liveEdgeStart = playerEl.media.liveEdgeStart;
    const maxWaitTime = (playbackTime - liveEdgeStart + 1) * 1000;
    await waitUntil(() => !playerEl.inLiveWindow, 'still inLiveWindow after long pause', { timeout: maxWaitTime });

    const mcPlayEl = playerEl.mediaTheme.shadowRoot.querySelector('media-play-button');
    mcPlayEl.click();
    await waitUntil(() => playerEl.inLiveWindow, 'clicking play did not seek to live window');
  });
});
