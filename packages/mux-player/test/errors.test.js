import { fixture, assert } from '@open-wc/testing';
import { MediaError } from '../src/index.ts';
import { getErrorLogs } from '../src/errors.ts';

describe('errors', () => {
  it("doesn't propagate non-fatal error events", async function () {
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

  it('does propagate fatal error events', async function () {
    const oldLogError = console.error;
    const oldLogWarn = console.warn;

    console.error = () => {};
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
    assert.equal(dialog.message, 'You aborted the media playback');
  });

  it('default message for MediaError.MEDIA_ERR_NETWORK', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Network Error');
    assert.equal(dialog.message, 'A network error caused the media download to fail.');
  });

  it('default message for MediaError.MEDIA_ERR_DECODE', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_DECODE);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Media Error');
    assert.equal(
      dialog.message,
      'A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.'
    );
  });

  it('default title for MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Source Not Supported');
  });

  it('default title for any error', function () {
    const error = new MediaError(undefined, 0);
    const { dialog } = getErrorLogs(error);
    assert.equal(dialog.title, 'Error');
  });

  it('offline error logs', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_DECODE);
    const offline = true;
    const { dialog } = getErrorLogs(error, offline);
    assert.equal(dialog.title, 'Your device appears to be offline');
    assert.equal(dialog.message, 'Check your internet connection and try reloading this video.');
  });

  it('412 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    error.data = { response: { code: 412 } };

    const { dialog } = getErrorLogs(error);
    assert.equal(String(dialog.message), 'The live stream or video file are not yet ready.');
  });

  it('404 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    error.data = { response: { code: 404 } };

    const { dialog } = getErrorLogs(error);
    assert.equal(String(dialog.message), '');
  });

  it('403 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    error.data = { response: { code: 403 } };

    const { dialog, devlog } = getErrorLogs(error);
    assert.equal(String(dialog.title), 'Invalid playback URL');
    assert.equal(
      String(dialog.message),
      'The video URL or playback-token are formatted with incorrect or incomplete information.'
    );
    assert.equal(
      String(devlog.message),
      '403 error trying to access this playback URL. If this is a signed URL, you might need to provide a playback-token.'
    );
  });

  it('403 response code message w/ expired token for MediaError.MEDIA_ERR_NETWORK', function () {
    const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
    const playbackToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDgwNzY0MDQsImF1ZCI6InYiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.kNn4tWOCffu01tIEw8AtWPtkuAGQrE3K33CyEhG54l4S8JaNRJvrxZNP_zbp42vHPtoa8GbsvQ3DogHUeoQYVOnFObpakhkoRmuA5sNXcDEtKWh_t20fJ84ZED_LOj2LBIrlXabeb3oZoprPWs3ovDVh8nJrm-GC90rfA4twMqDwKNSE0ZTt9O1mYjJ0ZyyFqqyMnY-gkOg8db7OJV-flKwEDSYK8VkwARz1kxIJKSslQt_9QT8is3CyL3m5Hp1NozgRdJ55-9KO-K6vmdla6GDFnAcChGT6AFI_MWKHsQWcJtaZQ3vZLKkZUR29ZYpmxkigxzuu2XK8OvY070NXJg';
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    error.data = { response: { code: 403 } };

    const { dialog, devlog } = getErrorLogs(error, false, playbackId, playbackToken);
    assert.equal(String(dialog.title), 'Video URL has expired');
    assert.equal(String(dialog.message), 'The video’s secured playback-token has expired.');
    assert.equal(String(devlog.message), 'The video’s secured playback-token has expired.');
    assert.include(String(devlog.context), 'Expired at:');
  });

  it('403 response code message w/ playback id mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
    const playbackId = 'bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY_blabla';
    const playbackToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA';
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    error.data = { response: { code: 403 } };

    const { dialog, devlog } = getErrorLogs(error, false, playbackId, playbackToken);
    assert.equal(String(dialog.title), 'Video URL is formatted incorrectly');
    assert.equal(
      String(dialog.message),
      'The video’s playback ID does not match the one encoded in the playback-token.'
    );
    assert.equal(
      String(devlog.message),
      'The video’s playback ID does not match the one encoded in the playback-token.'
    );
    assert.include(String(devlog.context), 'and the playback ID encoded in the playback-token');
  });

  it('403 response code message w/ token type mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
    const playbackId = 'bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY';
    const playbackToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w';
    const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    error.data = { response: { code: 403 } };

    const { dialog, devlog } = getErrorLogs(error, false, playbackId, playbackToken);
    assert.equal(String(dialog.title), 'Video URL is formatted incorrectly');
    assert.equal(String(dialog.message), 'The playback-token is formatted with incorrect information.');
    assert.equal(String(devlog.message), 'The playback-token is formatted with incorrect information.');
    assert.include(String(devlog.context), 'The playback-token has an incorrect aud value: ');
  });
});
