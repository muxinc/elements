import { fixture, assert, waitUntil, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/index.ts';

const isFirefox = /Firefox/i.test(navigator.userAgent);

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

// skip these cue shifting tests except in Firefox
(isFirefox ? describe : describe.skip)('<mux-player> should move cues up', function () {
  this.timeout(20000);

  it('when user the user active', async function () {
    const player = await fixture(`<mux-player
      playback-id="qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM"
      stream-type="on-demand"
      muted
      autoplay
      preload="auto"
    ></mux-player>`);

    // Wait for us to have at least one showing subtitle/caption
    await waitUntil(
      () => Array.prototype.some.call(player.textTracks, (track) => track.mode === 'showing'),
      'did not have showing tracks in time',
      { timeout: 2000 }
    );
    // Make sure we're playing
    await waitUntil(() => !player.paused, 'did not unpause in time');
    // Find the currently showing track
    const track = Array.prototype.find.call(player.textTracks, (textTrack) => textTrack.mode === 'showing');
    // Wait for it to have cues added
    await waitUntil(() => track.cues.length, 'cues not added in time', { timeout: 2000 });
    const firstCue = track.cues[0];
    assert.equal(firstCue.line, 'auto', 'the first cue.line is set to auto');

    // Seek to the first Cue so it will be visible/active
    player.currentTime = firstCue.startTime + 0.1;
    await waitUntil(() => track.activeCues.length, 'cues not active in time', { timeout: 2000 });
    const activeCue = track.activeCues[0];

    // Confirm we're inactive initially, as this is a precondition for the test passing.
    assert(player.mediaController.hasAttribute('userinactive'), 'userinactive is a test precondition');
    assert.equal(activeCue?.line, 'auto', 'the active cue.line should still be set to auto');

    // Test going from userinactive to user active cue shift
    player.mediaController.toggleAttribute('userinactive', false);
    player.dispatchEvent(new Event('userinactivechange'));
    // Waiting for the condition and then asserting it due to async behavior
    await waitUntil(() => activeCue.line !== 'auto', 'cues not shifted in time', { timeout: 2000 });
    assert.equal(activeCue.line, -4, 'the line is shifted to -4 when user is active');

    // Test going from user active to userinactive active cue unshift
    player.mediaController.toggleAttribute('userinactive', true);
    player.dispatchEvent(new Event('userinactivechange'));
    // Waiting for the condition and then asserting it due to async behavior
    await waitUntil(() => activeCue.line !== -4, 'cues not shifted back in time', { timeout: 2000 });
    assert.equal(activeCue.line, 'auto', 'the line is reset to auto when userinactive');
  });

  it('when the player is paused even if user is inactive', async function () {
    let done;
    const promise = new Promise((resolve) => {
      done = resolve;
    });
    const player = await fixture(`<mux-player
      playback-id="qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    const mc = player.mediaController;
    const media = mc.media;

    media.textTracks.addEventListener('addtrack', (e) => {
      // wait till subtitles have loaded
      if (e.track.kind === 'subtitles') {
        // pool until cues have loaded
        const poolInterval = setInterval(() => {
          if (e.track.cues?.length) {
            clearInterval(poolInterval);
          } else {
            return;
          }

          const firstCue = e.track.cues[0];
          assert.equal(firstCue.line, 'auto', "the first cue's line is set to auto");

          assert.isTrue(player.paused, 'player is paused');

          e.track.addEventListener(
            'cuechange',
            () => {
              const activeCue = e.track.activeCues[0];
              assert.equal(activeCue.line, -4, "the active cue's line is set to -4");
              done();
            },
            { once: true }
          );

          media.currentTime = firstCue.startTime + 0.1;
        }, 10);
      }
    });

    return promise;
  });

  it('unless the cues should be ignored', async function () {
    let done;
    const promise = new Promise((resolve) => {
      done = resolve;
    });
    const player = await fixture(`<mux-player
      playback-id="qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    const mc = player.mediaController;
    const media = mc.media;

    media.textTracks.addEventListener('addtrack', (e) => {
      // wait till subtitles have loaded
      if (e.track.kind === 'subtitles') {
        // pool until cues have loaded
        const poolInterval = setInterval(() => {
          if (e.track.cues?.length) {
            clearInterval(poolInterval);
          } else {
            return;
          }

          const firstCue = e.track.cues[0];

          // position first cue at the top of the displayed area
          // this should currently be ignored
          firstCue.line = 0;

          assert.isTrue(player.paused, 'player is paused');

          e.track.addEventListener(
            'cuechange',
            () => {
              const activeCue = e.track.activeCues[0];
              assert.equal(activeCue.line, 0, "the active cue's line was not updated");
              done();
            },
            { once: true }
          );

          media.currentTime = firstCue.startTime + 0.1;
        }, 10);
      }
    });

    return promise;
  });
});

describe('Feature: cuePoints', async () => {
  it('adds cuepoints', async function () {
    this.timeout(5000);

    const cuePoints = [
      { time: 0, value: { label: 'CTA 1', showDuration: 10 } },
      { time: 15, value: { label: 'CTA 2', showDuration: 5 } },
      { time: 21, value: { label: 'CTA 3', showDuration: 2 } },
    ];
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
    ></mux-player>`);

    if (muxPlayerEl.readyState === 0) {
      await oneEvent(muxPlayerEl, 'loadedmetadata');
    }
    await muxPlayerEl.addCuePoints(cuePoints);

    // need a timeout for Safari/webkit
    await nextFrame();

    assert.deepEqual(muxPlayerEl.cuePoints, cuePoints);
  });

  it('dispatches a cuepointchange event when the active cuepoint changes', async function () {
    this.timeout(10000);

    const cuePoints = [
      { time: 0, value: { label: 'CTA 1', showDuration: 10 } },
      { time: 15, value: { label: 'CTA 2', showDuration: 5 } },
      { time: 21, value: { label: 'CTA 3', showDuration: 2 } },
    ];
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
    ></mux-player>`);

    if (muxPlayerEl.readyState === 0) {
      await oneEvent(muxPlayerEl, 'loadedmetadata');
    }
    await muxPlayerEl.addCuePoints(cuePoints);

    const expectedCuePoint = cuePoints[1];
    muxPlayerEl.currentTime = expectedCuePoint.time + 0.1;

    let event = await oneEvent(muxPlayerEl, 'cuepointchange');
    // NOTE: For Safari/WebKit, we may actually get an event for
    // the first cue before getting one for the second after the seek.
    // This is valid and should be accounted for (CJP).
    if (event.detail?.time === cuePoints[0].time) {
      event = await oneEvent(muxPlayerEl, 'cuepointchange');
    }
    assert.equal(event.target, muxPlayerEl, 'event target should be the MuxPlayerElement instance');
    assert.deepEqual(event.detail, expectedCuePoint);
    assert.deepEqual(muxPlayerEl.activeCuePoint, expectedCuePoint);
  });

  it('clears cuepoints when playback-id is updated', async function () {
    this.timeout(10000);

    const cuePoints = [
      { time: 0, value: { label: 'CTA 1', showDuration: 10 } },
      { time: 15, value: { label: 'CTA 2', showDuration: 5 } },
      { time: 21, value: { label: 'CTA 3', showDuration: 2 } },
    ];
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
    ></mux-player>`);

    if (muxPlayerEl.readyState === 0) {
      await oneEvent(muxPlayerEl, 'loadedmetadata');
    }
    await muxPlayerEl.addCuePoints(cuePoints);
    assert.deepEqual(muxPlayerEl.cuePoints, cuePoints, 'cue points were added as expected');

    muxPlayerEl.playbackId = 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe';

    await oneEvent(muxPlayerEl, 'emptied');
    // Safari needs an extra tick for the cues to clear
    await nextFrame();

    assert.equal(muxPlayerEl.cuePoints.length, 0, 'cuePoints should be empty');
  });
});

describe('Feature: chapters', async () => {
  it('adds chapters', async function () {
    this.timeout(5000);

    const chapters = [
      { startTime: 0, endTime: 5, value: 'Chapter 1' },
      { startTime: 5, endTime: 10, value: 'Chapter 2' },
      { startTime: 10, endTime: 15, value: 'Chapter 3' },
    ];
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
    ></mux-player>`);

    if (muxPlayerEl.readyState === 0) {
      await oneEvent(muxPlayerEl, 'loadedmetadata');
    }
    await muxPlayerEl.addChapters(chapters);

    // need a timeout for Safari/webkit
    await nextFrame();

    assert.deepEqual(muxPlayerEl.chapters, chapters);
  });

  it('dispatches a chapterchange event when the active chapter changes', async function () {
    this.timeout(10000);

    const chapters = [
      { startTime: 0, endTime: 5, value: 'Chapter 1' },
      { startTime: 5, endTime: 10, value: 'Chapter 2' },
      { startTime: 10, endTime: 15, value: 'Chapter 3' },
    ];
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
    ></mux-player>`);

    if (muxPlayerEl.readyState === 0) {
      await oneEvent(muxPlayerEl, 'loadedmetadata');
    }
    await muxPlayerEl.addChapters(chapters);

    const expectedChapter = chapters[1];
    muxPlayerEl.currentTime = expectedChapter.startTime + 0.1;

    let event = await oneEvent(muxPlayerEl, 'chapterchange');
    // NOTE: For Safari/WebKit, we may actually get an event for
    // the first cue before getting one for the second after the seek.
    // This is valid and should be accounted for (CJP).
    if (event.detail?.startTime === chapters[0].startTime) {
      event = await oneEvent(muxPlayerEl, 'chapterchange');
    }

    assert.equal(event.target, muxPlayerEl, 'event target should be the MuxPlayerElement instance');
    assert.deepEqual(event.detail, expectedChapter);
    assert.deepEqual(muxPlayerEl.activeChapter, expectedChapter);
  });

  it('clears chapters when playback-id is updated', async function () {
    this.timeout(5000);

    const chapters = [
      { startTime: 0, endTime: 5, value: 'Chapter 1' },
      { startTime: 5, endTime: 10, value: 'Chapter 2' },
      { startTime: 10, endTime: 15, value: 'Chapter 3' },
    ];
    const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
    const muxPlayerEl = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
    ></mux-player>`);

    if (muxPlayerEl.readyState === 0) {
      await oneEvent(muxPlayerEl, 'loadedmetadata');
    }
    await muxPlayerEl.addChapters(chapters);

    muxPlayerEl.currentTime = chapters[1].startTime + 0.1;

    await oneEvent(muxPlayerEl, 'chapterchange');
    assert.deepEqual(muxPlayerEl.chapters, chapters, 'chapters were added');

    muxPlayerEl.playbackId = 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe';

    await oneEvent(muxPlayerEl, 'emptied');
    await nextFrame();

    assert.equal(muxPlayerEl.chapters.length, 0, 'chapters are empty');
  });
});
