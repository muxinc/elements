import { assert } from '@open-wc/testing';
import { content } from '../src/template.ts';
import { render } from '../src/html.ts';

const minify = (html) => html.trim().replace(/>\s+</g, '><');

describe('<mux-player> template render', () => {
  const div = document.createElement('div');

  it('default template without props', function () {
    render(content({}), div);
    assert.equal(
      minify(div.innerHTML),
      '<media-controller class="size-"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version=""></mux-video><media-loading-indicator slot="centered-chrome" no-auto-hide=""></media-loading-indicator><mxp-dialog slot="centered-chrome" no-auto-hide="" open=""><p></p></mxp-dialog></media-controller>'
    );
  });

  it('template extra-small', function () {
    render(
      content({
        playerSize: 'extra-small',
        streamType: 'on-demand',
        dialog: {
          title: 'Errr',
        },
      }),
      div
    );
    div.querySelectorAll('svg').forEach((svg) => svg.remove());
    assert.equal(
      minify(div.innerHTML),
      '<media-controller class="size-extra-small"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand"></mux-video><media-loading-indicator slot="centered-chrome" no-auto-hide=""></media-loading-indicator><media-control-bar slot="top-chrome"><div class="mxp-spacer"></div><media-pip-button></media-pip-button></media-control-bar><div slot="centered-chrome" class="mxp-center-controls"><media-play-button></media-play-button></div><media-control-bar><media-mute-button></media-mute-button><div class="mxp-spacer"></div><media-fullscreen-button></media-fullscreen-button></media-control-bar><mxp-dialog slot="centered-chrome" no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-controller>'
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
      '<media-controller class="size-large"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand"></mux-video><media-loading-indicator slot="centered-chrome" no-auto-hide=""></media-loading-indicator><div slot="centered-chrome" class="mxp-center-controls"><media-play-button></media-play-button></div><media-control-bar><media-play-button></media-play-button><media-seek-backward-button seek-offset=""></media-seek-backward-button><media-seek-forward-button seek-offset=""></media-seek-forward-button><media-time-range></media-time-range><mxp-time-display></mxp-time-display><media-mute-button></media-mute-button><media-playback-rate-button></media-playback-rate-button><media-captions-button default-showing=""></media-captions-button><media-pip-button></media-pip-button><media-fullscreen-button></media-fullscreen-button></media-control-bar><mxp-dialog slot="centered-chrome" no-auto-hide="" open=""><p></p></mxp-dialog></media-controller>'
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
      '<media-controller class="size-large"><mux-video slot="media" crossorigin="" playsinline="" player-software-name="" player-software-version="" stream-type="on-demand"></mux-video><media-loading-indicator slot="centered-chrome" no-auto-hide=""></media-loading-indicator><div slot="centered-chrome" class="mxp-center-controls"><media-play-button></media-play-button></div><media-control-bar><media-play-button></media-play-button><media-seek-backward-button seek-offset=""></media-seek-backward-button><media-seek-forward-button seek-offset=""></media-seek-forward-button><media-time-range></media-time-range><mxp-time-display></mxp-time-display><media-mute-button></media-mute-button><media-playback-rate-button></media-playback-rate-button><media-pip-button></media-pip-button><media-fullscreen-button></media-fullscreen-button></media-control-bar><mxp-dialog slot="centered-chrome" no-auto-hide="" open=""><h3>Errr</h3><p></p></mxp-dialog></media-controller>'
    );
  });
});
