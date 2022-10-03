import { assert } from '@open-wc/testing';
import { content } from '../src/template.ts';
import { render } from '../src/html.ts';

const minify = (html) => html.trim().replace(/>\s+</g, '><');

describe('<mux-player> template render', () => {
  const div = document.createElement('div');

  const exportParts = `top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, seek-live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display`;

  it('default template without props', function () {
    render(content({}), div);
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-mux class="size-" stream-type="" player-size="" default-hidden-captions="" forward-seek-offset="" has-open-dialog="" has-src="" placeholder="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><p></p></mxp-dialog></media-theme-mux>`
      )
    );
  });

  it('template live extra-small w/o src, not in live window', function () {
    render(
      content({
        inLiveWindow: false,
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
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-mux class="size-extra-small" stream-type="live" player-size="extra-small" default-hidden-captions="" forward-seek-offset="" has-open-dialog="" has-src="" placeholder="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="live" cast-stream-type="live" exportparts="video"></mux-video><button aria-disabled="true" disabled="" slot="seek-live" part="top seek-live button">\n            Live\n          </button><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme-mux>`
      )
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
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-mux class="size-large" stream-type="on-demand" player-size="large" default-hidden-captions="" forward-seek-offset="" has-open-dialog="" has-src="" placeholder="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><p></p></mxp-dialog></media-theme-mux>`
      )
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
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-mux class="size-large" stream-type="on-demand" player-size="large" default-hidden-captions="" forward-seek-offset="" has-open-dialog="" has-src="" placeholder="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme-mux>`
      )
    );
  });
});

function normalizeAttributes(htmlStr) {
  return htmlStr.replace(/<([a-z0-9-]+)((?:\s[a-z0-9:_.-]+=".*?")+)((?:\s*\/)?>)/gi, (s, pre, attrs, after) => {
    let list = attrs.match(/\s[a-z0-9:_.-]+=".*?"/gi).sort((a, b) => (a > b ? 1 : -1));
    if (~after.indexOf('/')) after = '></' + pre + '>';
    return '<' + pre + list.join('') + after;
  });
}
