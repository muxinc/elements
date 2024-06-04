import { fixture, assert, nextFrame } from '@open-wc/testing';
import '../src/index.ts';

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

describe('Feature: currentPdt and getStartDate', async () => {
  it('currentPdt and getStartDate work as expected', async function () {
    this.timeout(5000);

    const player = await fixture(`<mux-player
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      stream-type="on-demand"
      prefer-playback="mse"
      muted
      title="A title"
      preload="auto"
    ></mux-player>`);

    player.addEventListener('loadstart', async function () {
      player.currentTime = 60;

      await nextFrame();

      const currentPdt = player.currentPdt;
      const startDate = player.getStartDate();

      assert.equal(
        startDate.getTime(),
        currentPdt.getTime() - player.currentTime * 1000,
        'currentPdt should be 60 seconds greater than getStartDate'
      );
    });

    await nextFrame();

    player.playbackId = 'UgKrPYAnjMjP6oMF4Kcs1gWVhtgYDR02EHQGnj022X1Xo';
  });
});
