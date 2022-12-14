import { assert } from '@open-wc/testing';
import { content } from '../src/template.ts';
import { render } from '../src/html.ts';

const minify = (html) => html.trim().replace(/>\s+</g, '><');

describe('<mux-player> template render', () => {
  const div = document.createElement('div');

  const exportParts = `top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, poster, seek-live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display`;

  it('default template without props', function () {
    render(content({}), div);
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme class="size-" default-showing-captions="" disabled="" nohotkeys="" layout="on-demand" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" exportparts="video"></mux-video><mxp-dialog no-auto-hide=""><p></p></mxp-dialog></media-theme>`
      )
    );
  });

  it('template live extra-small w/o src, not in live window', function () {
    render(
      content({
        inLiveWindow: false,
        playerSize: 'extra-small',
        streamType: 'live',
        isDialogOpen: true,
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
        `<media-theme hotkeys=" noarrowleft noarrowright" class="size-extra-small" layout="live extra-small" player-size="extra-small" default-showing-captions="" disabled="" nohotkeys="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" stream-type="live" cast-stream-type="live" exportparts="video"></mux-video><button aria-disabled="true" disabled="" slot="seek-live" part="top seek-live button">\n          \n          Live\n        </button><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme>`
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
        `<media-theme class="size-large" default-showing-captions="" disabled="" nohotkeys="" layout="on-demand large" player-size="large" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" stream-type="on-demand" exportparts="video"></mux-video><mxp-dialog no-auto-hide=""><p></p></mxp-dialog></media-theme>`
      )
    );
  });

  it('template VodChromeLarge without captions', function () {
    render(
      content({
        playerSize: 'large',
        streamType: 'on-demand',
        hasCaptions: false,
        isDialogOpen: true,
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
        `<media-theme class="size-large" layout="on-demand large" player-size="large" default-showing-captions="" disabled="" nohotkeys="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" stream-type="on-demand" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme>`
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
