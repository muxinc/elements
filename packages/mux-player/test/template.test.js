import { assert } from '@open-wc/testing';
import { content, partsListStr } from '../src/template.ts';
import { render } from '../src/html.ts';

// Matches inline event-handler content attributes, e.g. `onclose="..."`, `onclick="..."`.
const INLINE_HANDLER_ATTR = /\son[a-z]+="/i;

const minify = (html) => html.trim().replace(/>\s+</g, '><');

describe('<mux-player> template render', () => {
  const div = document.createElement('div');

  it('default template without props', function () {
    render(content({}), div);
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme defaultsubtitles="" disabled="" exportparts="${partsListStr}" nohotkeys=""><mux-video crossorigin="" exportparts="video" playsinline="" slot="media"><slot></slot></mux-video><slot name="poster" slot="poster"><media-poster-image exportparts="poster, img" part="poster"></media-poster-image></slot></media-theme>`
      )
    );
  });

  it('template live extra-small w/o src, not in live window', function () {
    render(
      content({
        inLiveWindow: false,
        streamType: 'live',
        targetLiveWindow: 0,
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
        `<media-theme defaultsubtitles="" disabled="" exportparts="${partsListStr}" hotkeys=" noarrowleft noarrowright" nohotkeys=""><mux-video crossorigin="" exportparts="video" playsinline="" slot="media" stream-type="live" target-live-window="0"><slot></slot></mux-video><slot name="poster" slot="poster"><media-poster-image exportparts="poster, img" part="poster"></media-poster-image></slot></media-theme>`
      )
    );
  });

  it('template VodChromeLarge with captions', function () {
    render(
      content({
        streamType: 'on-demand',
        hasCaptions: true,
      }),
      div
    );
    div.querySelectorAll('svg').forEach((svg) => svg.remove());
    assert.equal(
      normalizeAttributes(minify(div.innerHTML)),
      normalizeAttributes(
        `<media-theme defaultsubtitles="" disabled="" exportparts="${partsListStr}" nohotkeys=""><mux-video crossorigin="" exportparts="video" playsinline="" slot="media" stream-type="on-demand"><slot></slot></mux-video><slot name="poster" slot="poster"><media-poster-image exportparts="poster, img" part="poster"></media-poster-image></slot></media-theme>`
      )
    );
  });

  it('template VodChromeLarge without captions', function () {
    render(
      content({
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
        `<media-theme defaultsubtitles="" disabled="" exportparts="${partsListStr}" nohotkeys=""><mux-video crossorigin="" exportparts="video" playsinline="" slot="media" stream-type="on-demand"><slot></slot></mux-video><slot name="poster" slot="poster"><media-poster-image exportparts="poster, img" part="poster"></media-poster-image></slot></media-theme>`
      )
    );
  });

  it('does not emit inline event-handler attributes (CSP script-src-attr)', function () {
    // Regression: the error-dialog lifecycle handlers must be bound via
    // addEventListener, never as inline on* attributes. Under a strict CSP
    // (script-src without 'unsafe-inline') the browser refuses inline handlers
    // and reports a script-src-attr / blocked-uri: inline violation.
    //
    // We assert on the *raw* template HTML (before part-processing), because
    // that is the string the browser parses/clones into the live DOM and what
    // CSP evaluates. The `html` processor strips on* attributes while binding
    // them, so the post-render innerHTML would hide a regression here.
    const rawHtml = content({ isDialogOpen: true, dialog: { title: 'Errr' } }).template.innerHTML;
    assert.notMatch(rawHtml, INLINE_HANDLER_ATTR, 'template must not contain inline on* event-handler attributes');
  });
});

function normalizeAttributes(htmlStr) {
  return htmlStr.replace(/<([a-z0-9-]+)((?:\s[a-z0-9:_.-]+=".*?")+)((?:\s*\/)?>)/gi, (s, pre, attrs, after) => {
    let list = attrs.match(/\s[a-z0-9:_.-]+=".*?"/gi).sort((a, b) => (a > b ? 1 : -1));
    if (~after.indexOf('/')) after = '></' + pre + '>';
    return '<' + pre + list.join('') + after;
  });
}
