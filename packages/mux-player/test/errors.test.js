import { fixture, assert } from '@open-wc/testing';
import { MediaError } from '../src/index.ts';
import { getErrorLogs } from '../src/errors.ts';
import { MuxErrorCategory, MuxErrorCode } from '@mux/playback-core';

const UNEXPECTED_DIALOG_TITLE = 'unexpected dialog title string';
const UNEXPECTED_DIALOG_MESSAGE = 'unexpected dialog message string';

/** @TODO Add devlog file assertions where appropriate */
describe('errors', () => {
  /** @TODO Re-add when re-impl'ed (CJP) */
  it.skip("doesn't propagate non-fatal error events", async function () {
    this.timeout(5000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    let fired;
    player.addEventListener('error', () => {
      fired = true;
    });

    player.media.dispatchEvent(
      new CustomEvent('error', {
        detail: { code: 0, data: {} },
      })
    );

    assert(fired !== true, 'the error handler was not fired');
  });

  it.skip('does propagate fatal error events', async function () {
    const oldLogError = console.error;
    const oldLogWarn = console.warn;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.error = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.warn = () => {};

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    let fired;
    player.addEventListener('error', () => {
      fired = true;
    });

    player.media.dispatchEvent(
      new CustomEvent('error', {
        detail: { code: MediaError.MEDIA_ERR_DECODE, fatal: true },
      })
    );

    assert(fired === true, 'the error handler was fired');

    console.error = oldLogError;
    console.warn = oldLogWarn;
  });

  it('default message for MediaError.MEDIA_ERR_ABORTED', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_ABORTED);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.message, 'You aborted the media playback', UNEXPECTED_DIALOG_MESSAGE);
  });

  it('default message for MediaError.MEDIA_ERR_NETWORK', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Network Error', UNEXPECTED_DIALOG_TITLE);
    assert.equal(dialog.message, 'A network error caused the media download to fail.', UNEXPECTED_DIALOG_MESSAGE);
  });

  it('default message for MediaError.MEDIA_ERR_DECODE', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_DECODE);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Media Error', UNEXPECTED_DIALOG_TITLE);
    assert.equal(
      dialog.message,
      'A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.',
      UNEXPECTED_DIALOG_MESSAGE
    );
  });

  it('default title for MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Source Not Supported', UNEXPECTED_DIALOG_TITLE);
  });

  it('default title for any error', function () {
    const error = new MediaError(undefined, 0);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Error', UNEXPECTED_DIALOG_TITLE);
  });

  describe('network errors', function () {
    it('offline error logs', function () {
      const error = new MediaError(undefined, MediaError.MEDIA_ERR_DECODE);
      error.errorCategory = MuxErrorCategory.VIDEO;
      error.muxCode = MuxErrorCode.NETWORK_OFFLINE;
      const { dialog } = getErrorLogs(error);
      assert.equal(dialog.title, 'Your device appears to be offline', UNEXPECTED_DIALOG_TITLE);
      assert.equal(
        dialog.message,
        'Check your internet connection and try reloading this video.',
        UNEXPECTED_DIALOG_MESSAGE
      );
    });

    describe('video', function () {
      it('412 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.VIDEO;
        error.muxCode = MuxErrorCode.NETWORK_NOT_READY;

        const { dialog } = getErrorLogs(error);
        assert.equal(
          String(dialog.message),
          'A network error caused the media download to fail.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('404 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.VIDEO;
        error.muxCode = MuxErrorCode.NETWORK_NOT_FOUND;

        const { dialog } = getErrorLogs(error);
        assert.equal(String(dialog.message), '', UNEXPECTED_DIALOG_MESSAGE);
      });

      it('403 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.VIDEO;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_MISSING;

        const { dialog } = getErrorLogs(error);
        assert.equal(String(dialog.title), 'Invalid playback URL', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The video URL or playback-token are formatted with incorrect or incomplete information.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('403 response code message w/ expired token for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const playbackToken =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDgwNzY0MDQsImF1ZCI6InYiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.kNn4tWOCffu01tIEw8AtWPtkuAGQrE3K33CyEhG54l4S8JaNRJvrxZNP_zbp42vHPtoa8GbsvQ3DogHUeoQYVOnFObpakhkoRmuA5sNXcDEtKWh_t20fJ84ZED_LOj2LBIrlXabeb3oZoprPWs3ovDVh8nJrm-GC90rfA4twMqDwKNSE0ZTt9O1mYjJ0ZyyFqqyMnY-gkOg8db7OJV-flKwEDSYK8VkwARz1kxIJKSslQt_9QT8is3CyL3m5Hp1NozgRdJ55-9KO-K6vmdla6GDFnAcChGT6AFI_MWKHsQWcJtaZQ3vZLKkZUR29ZYpmxkigxzuu2XK8OvY070NXJg';
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.VIDEO;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_EXPIRED;

        const { dialog } = getErrorLogs(error, false, playbackId, playbackToken);
        assert.equal(String(dialog.title), 'Video URL has expired', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The video’s secured playback-token has expired.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('403 response code message w/ playback id mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.VIDEO;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH;

        const { dialog } = getErrorLogs(error, false);
        assert.equal(String(dialog.title), 'Video URL is formatted incorrectly', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The video’s playback ID does not match the one encoded in the playback-token.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('403 response code message w/ token type mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.VIDEO;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH;

        const { dialog } = getErrorLogs(error, false);
        assert.equal(String(dialog.title), 'Video URL is formatted incorrectly', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The playback-token is formatted with incorrect information.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });
    });

    describe('drm', function () {
      it('412 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.DRM;
        error.muxCode = MuxErrorCode.NETWORK_NOT_READY;

        const { dialog } = getErrorLogs(error);
        assert.equal(
          String(dialog.message),
          'A network error caused the media download to fail.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('404 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.DRM;
        error.muxCode = MuxErrorCode.NETWORK_NOT_FOUND;

        const { dialog } = getErrorLogs(error);
        assert.equal(String(dialog.message), '', UNEXPECTED_DIALOG_MESSAGE);
      });

      it('403 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.DRM;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_MISSING;

        const { dialog } = getErrorLogs(error);
        assert.equal(String(dialog.title), 'Invalid drm URL', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The video URL or drm-token are formatted with incorrect or incomplete information.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('403 response code message w/ expired token for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const playbackToken =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDgwNzY0MDQsImF1ZCI6InYiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.kNn4tWOCffu01tIEw8AtWPtkuAGQrE3K33CyEhG54l4S8JaNRJvrxZNP_zbp42vHPtoa8GbsvQ3DogHUeoQYVOnFObpakhkoRmuA5sNXcDEtKWh_t20fJ84ZED_LOj2LBIrlXabeb3oZoprPWs3ovDVh8nJrm-GC90rfA4twMqDwKNSE0ZTt9O1mYjJ0ZyyFqqyMnY-gkOg8db7OJV-flKwEDSYK8VkwARz1kxIJKSslQt_9QT8is3CyL3m5Hp1NozgRdJ55-9KO-K6vmdla6GDFnAcChGT6AFI_MWKHsQWcJtaZQ3vZLKkZUR29ZYpmxkigxzuu2XK8OvY070NXJg';
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.DRM;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_EXPIRED;

        const { dialog } = getErrorLogs(error, false, playbackId, playbackToken);
        assert.equal(String(dialog.title), 'Drm URL has expired', UNEXPECTED_DIALOG_TITLE);
        assert.equal(String(dialog.message), 'The video’s secured drm-token has expired.', UNEXPECTED_DIALOG_MESSAGE);
      });

      it('403 response code message w/ playback id mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.DRM;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH;

        const { dialog } = getErrorLogs(error, false);
        assert.equal(String(dialog.title), 'Drm URL is formatted incorrectly', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The video’s playback ID does not match the one encoded in the drm-token.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });

      it('403 response code message w/ token type mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
        error.errorCategory = MuxErrorCategory.DRM;
        error.muxCode = MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH;

        const { dialog } = getErrorLogs(error, false);
        assert.equal(String(dialog.title), 'Drm URL is formatted incorrectly', UNEXPECTED_DIALOG_TITLE);
        assert.equal(
          String(dialog.message),
          'The drm-token is formatted with incorrect information.',
          UNEXPECTED_DIALOG_MESSAGE
        );
      });
    });
  });
});
