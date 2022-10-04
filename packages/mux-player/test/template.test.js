import { assert } from '@open-wc/testing';
import { content } from '../src/template.ts';
import { render } from '../src/html.ts';

const minify = (html) => html.trim().replace(/>\s+</g, '><');

describe('<mux-player> template render', () => {
  const exportParts = `top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, poster, seek-live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display`;

  it('default template without props', function () {
    const div = document.createElement('div');
    render(content({}), div);
    render(content({}), div);
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-mux class="size-" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" exportparts="video"></mux-video><mxp-dialog no-auto-hide=""><p></p></mxp-dialog></media-theme-mux>`
      )
    );
  });

  it('render clears all children of render target', function () {
    const div = document.createElement('div');
    // `theme` is a property that has an effect on the static strings of
    // a template and is part of the templates cache key. if clearing the
    // children would not work it would render 2 themes in the div.
    render(
      content({
        theme: '',
      }),
      div
    );
    render(
      content({
        theme: 'media-theme-apple',
      }),
      div
    );
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-apple class="size-" stream-type="" player-size="" default-hidden-captions="" forward-seek-offset="" has-open-dialog="" has-src="" placeholder="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><p></p></mxp-dialog></media-theme-apple>`
      )
    );
  });

  it('apple template without props', function () {
    const div = document.createElement('div');
    render(
      content({
        theme: 'media-theme-apple',
      }),
      div
    );
    render(
      content({
        theme: 'media-theme-apple',
      }),
      div
    );
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme-apple class="size-" stream-type="" player-size="" default-hidden-captions="" forward-seek-offset="" has-open-dialog="" has-src="" placeholder="" backward-seek-offset="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><p></p></mxp-dialog></media-theme-apple>`
      )
    );
  });

  it('template live extra-small w/o src, not in live window', function () {
    const div = document.createElement('div');
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
        `<media-theme-mux class="size-extra-small" stream-type="live" player-size="extra-small" has-open-dialog="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" stream-type="live" cast-stream-type="live" exportparts="video"></mux-video><button aria-disabled="true" disabled="" slot="seek-live" part="top seek-live button">\n            Live\n          </button><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme-mux>`
      )
    );
  });

  it('template VodChromeLarge with captions', function () {
    const div = document.createElement('div');
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
        `<media-theme-mux class="size-large" stream-type="on-demand" player-size="large" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" stream-type="on-demand" exportparts="video"></mux-video><mxp-dialog no-auto-hide=""><p></p></mxp-dialog></media-theme-mux>`
      )
    );
  });

  it('template VodChromeLarge without captions', function () {
    const div = document.createElement('div');
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
        `<media-theme-mux class="size-large" stream-type="on-demand" player-size="large" has-open-dialog="" exportparts="${exportParts}"><mux-video slot="media" crossorigin="" playsinline="" stream-type="on-demand" exportparts="video"></mux-video><mxp-dialog no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-theme-mux>`
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
