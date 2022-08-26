import { assert } from '@open-wc/testing';
import { content } from '../src/template.ts';
import { render } from '../src/html.ts';

const minify = (html) => html.trim().replace(/>\s+</g, '><');

describe('<mux-player> template render', () => {
  const div = document.createElement('div');

  const exportParts = `top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, seek-live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display`;

  it('default template without props', function () {
    render(content({}), div);
    assert.equal(
      minify(div.innerHTML),
      `<media-theme-mux class="size-" stream-type="" player-size="" default-hidden-captions="" forward-seek-offset="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version=""></mux-video><mxp-dialog no-auto-hide="" open=""><p></p></mxp-dialog></media-theme-mux>`
    );
  });

  it('template live extra-small', function () {
    render(
      content({
        playerSize: 'extra-small',
        streamType: 'live',
        dialog: {
          title: 'Errr',
        },
      }),
      div
    );
    div.querySelectorAll('svg').forEach((svg) => svg.remove());
    assert.equal(
      minify(div.innerHTML),
      `<media-theme-mux class="size-extra-small" stream-type="live" player-size="extra-small" default-hidden-captions="" forward-seek-offset="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="live" cast-stream-type="live"></mux-video><button slot="seek-live" part="top seek-live button" aria-disabled="">\n            Live\n          </button><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme-mux>`
    );
  });

  it('template VodChromeLarge with captions', function () {
    render(
      content({
        playerSize: 'large',
        streamType: 'on-demand',
        hasCaptions: true,
      }),
      div
    );
    div.querySelectorAll('svg').forEach((svg) => svg.remove());
    assert.equal(
      minify(div.innerHTML),
      `<media-theme-mux class="size-large" stream-type="on-demand" player-size="large" default-hidden-captions="" forward-seek-offset="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand"></mux-video><mxp-dialog no-auto-hide="" open=""><p></p></mxp-dialog></media-theme-mux>`
    );
  });

  it('template VodChromeLarge without captions', function () {
    render(
      content({
        playerSize: 'large',
        streamType: 'on-demand',
        hasCaptions: false,
        dialog: {
          title: 'Errr',
        },
      }),
      div
    );
    div.querySelectorAll('svg').forEach((svg) => svg.remove());
    assert.equal(
      minify(div.innerHTML),
      `<media-theme-mux class="size-large" stream-type="on-demand" player-size="large" default-hidden-captions="" forward-seek-offset="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand"></mux-video><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme-mux>`
    );
  });
});
