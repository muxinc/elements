import { assert } from '@open-wc/testing';
import { MediaError, MuxErrorCategory, MuxErrorCode } from '../src/errors.ts';
import { getErrorFromResponse } from '../src/request-errors.ts';
describe('errors', () => {
  /** @TODO Handle in playback-core (CJP) */
  it.skip('default message for MediaError.MEDIA_ERR_ABORTED', function () {
    // const error = new MediaError(undefined, MediaError.MEDIA_ERR_ABORTED);
    // const { dialog } = getErrorLogs(error);
    // assert.equal(dialog.message, 'You aborted the media playback');
  });

  it.skip('default message for MediaError.MEDIA_ERR_NETWORK', function () {
    // const error = new MediaError(undefined, MediaError.MEDIA_ERR_NETWORK);
    // const { dialog } = getErrorLogs(error);
    // assert.equal(dialog.title, 'Network Error');
    // assert.equal(dialog.message, 'A network error caused the media download to fail.');
  });

  it.skip('default message for MediaError.MEDIA_ERR_DECODE', function () {
    // const error = new MediaError(undefined, MediaError.MEDIA_ERR_DECODE);
    // const { dialog } = getErrorLogs(error);
    // assert.equal(dialog.title, 'Media Error');
    // assert.equal(
    //   dialog.message,
    //   'A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.'
    // );
  });

  it.skip('default title for MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED', function () {
    // const error = new MediaError(undefined, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED);
    // const { dialog } = getErrorLogs(error);
    // assert.equal(dialog.title, 'Source Not Supported');
  });

  it.skip('default title for any error', function () {
    // const error = new MediaError(undefined, 0);
    // const { dialog } = getErrorLogs(error);
    // assert.equal(dialog.title, 'Error');
  });

  describe('network errors', function () {
    it('offline error', function () {
      const mediaError = getErrorFromResponse(
        { status: 200, url: 'https://any.com' },
        MuxErrorCategory.VIDEO,
        {},
        false,
        true
      );

      assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
      assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_OFFLINE);
      assert.equal(mediaError.message, 'Your device appears to be offline');
    });

    it.only('generic network error', function () {
      const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
      const mediaError = getErrorFromResponse({ status: 418, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
        playbackId,
      });

      assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
      assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_UNKNOWN_ERROR);
      assert.equal(mediaError.message, 'A network error caused the media download to fail.');
    });

    describe('video', function () {
      it('412 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const mediaError = getErrorFromResponse({ status: 412, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_NOT_READY);
        assert.equal(mediaError.message, 'A network error caused the media download to fail');
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });

      it('404 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const mediaError = getErrorFromResponse({ status: 404, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_NOT_FOUND);
        assert.equal(
          mediaError.message,
          'This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.'
        );
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });

      it('403 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_MISSING);
        assert.equal(
          mediaError.message,
          'Authorization error trying to access this video URL. If this is a signed URL, you might need to provide a playback-token.'
        );
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });

      it('403 response code message w/ expired token for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const playbackToken =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDgwNzY0MDQsImF1ZCI6InYiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.kNn4tWOCffu01tIEw8AtWPtkuAGQrE3K33CyEhG54l4S8JaNRJvrxZNP_zbp42vHPtoa8GbsvQ3DogHUeoQYVOnFObpakhkoRmuA5sNXcDEtKWh_t20fJ84ZED_LOj2LBIrlXabeb3oZoprPWs3ovDVh8nJrm-GC90rfA4twMqDwKNSE0ZTt9O1mYjJ0ZyyFqqyMnY-gkOg8db7OJV-flKwEDSYK8VkwARz1kxIJKSslQt_9QT8is3CyL3m5Hp1NozgRdJ55-9KO-K6vmdla6GDFnAcChGT6AFI_MWKHsQWcJtaZQ3vZLKkZUR29ZYpmxkigxzuu2XK8OvY070NXJg';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
          playbackToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_EXPIRED);
        assert.equal(mediaError.message, 'The video’s secured playback-token has expired.');
        assert.include(mediaError.context, 'Expired at:');
      });

      it('403 response code message w/ playback id mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY_blabla';
        const playbackToken =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
          playbackToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH);
        assert.equal(
          mediaError.message,
          'The video’s playback ID does not match the one encoded in the playback-token.'
        );
        assert.include(mediaError.context, 'and the playback ID encoded in the playback-token');
      });

      it('403 response code message w/ token type mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY';
        const playbackToken =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
          playbackToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH);
        assert.equal(mediaError.message, 'The playback-token is formatted with incorrect information.');
        assert.include(mediaError.context, 'The playback-token has an incorrect aud value: ');
      });

      it('403 response code message w/ token type missing for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        const playbackToken =
          'eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJqTmhJdEVQWmtOVzN2M0RtcTJOcWM4N1hreEtmaUI2QWlCWjhuVDAwNTAwNmciLCJzdWIiOiJ1eWZiYjAyMUtVMDFvTWhxUXUwMFgxVnlSZlBoazAyVWhGeTQ2TGVHM3pJakpUYyIsImV4cCI6MTc1NTAxMjEyNX0.EOvASNFQ494a0ikhxORU9uJnWGy19jLLOGnDj3RCqo2h2WQvA0Qdi20FR_yfBkD4FxJ4Ph52_AAqOuHOBxPAU9I6U0Tv-LZbcC0UOOwqYSON5v6rxhUDiQYoXGKsRXb8HwSnUmsemENXXiJn2-L6aT-sLiZSiIWEGs8O191FttghylHRn3ouxSjbT-bDRLbG8C4dUaqNkixL4WR43Em29g9-FfVqL9D4VWREIZ7-jhczM7BpSxFONXmVGu5GYzRpX2_Fz5QGpu8eKYnBGAhcWFLJOvnMTH1i8PC4ogBXGJonKSsfWqU7l-zKGVWKvw756PUXWpWx4GzkHItp3L0emQ';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
          playbackToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_AUD_MISSING);
        assert.equal(mediaError.message, 'The playback-token is formatted with incorrect information.');
        assert.include(mediaError.context, 'The playback-token has no aud value. aud value should be');
      });

      it('403 response code message w/ invalid token for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY';
        const playbackToken = 'not.a.token';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
          playbackToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_MALFORMED);
        assert.equal(mediaError.message, 'The playback-token provided is invalid or malformed.');
        assert.equal(mediaError.context, `Compact JWT string: ${playbackToken}`);
      });

      it('500 response code message w/ unknown error for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        // NOTE: token must be a valid compact JWT (even if e.g. expired, wrong aud, etc.) (CJP)
        const playbackToken =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w';
        const mediaError = getErrorFromResponse({ status: 500, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
          playbackToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_UNKNOWN_ERROR);
        assert.equal(mediaError.message, 'A network error caused the media download to fail.');
      });

      it('400 response code message w/ invalid playback id for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'this-is-not-a-playback-id';
        // NOTE: token must be a valid compact JWT (even if e.g. expired, wrong aud, etc.) (CJP)
        const mediaError = getErrorFromResponse({ status: 400, url: 'https://any.com' }, MuxErrorCategory.VIDEO, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_INVALID_URL);
        assert.equal(
          mediaError.message,
          'The URL or playback-id was invalid. You may have used an invalid value as a playback-id.'
        );
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });
    });

    describe('drm', function () {
      it('412 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const mediaError = getErrorFromResponse({ status: 412, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_NOT_READY);
        assert.equal(mediaError.message, 'A network error caused the media download to fail');
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });

      it('404 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const mediaError = getErrorFromResponse({ status: 404, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_NOT_FOUND);
        assert.equal(
          mediaError.message,
          'This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.'
        );
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });

      it('403 response code message for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_MISSING);
        assert.equal(
          mediaError.message,
          'Authorization error trying to access this drm URL. If this is a signed URL, you might need to provide a drm-token.'
        );
        assert.equal(mediaError.context, `Specified playback ID: ${playbackId}`);
      });

      it('403 response code message w/ expired token for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        const drmToken =
          'eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJqTmhJdEVQWmtOVzN2M0RtcTJOcWM4N1hreEtmaUI2QWlCWjhuVDAwNTAwNmciLCJhdWQiOiJkIiwic3ViIjoidXlmYmIwMjFLVTAxb01ocVF1MDBYMVZ5UmZQaGswMlVoRnk0NkxlRzN6SWpKVGMiLCJleHAiOjE3MjM0NzYwNzJ9.p-PvohtWZCDFik4d6QSxnI3tHUdfnxi8AwxmHKxe_6534Op-QVr4p9xU_Na8JgMoYiMv9O1Ad0zC8wI4ks_jMNK6VEo1ZCPmxfmgV9uB4k5-CGPDYAhdIMaeFxNKNyI8hRRviYg_45z0h9RwYcDlBws52gvoSBnEQOgpuiOqnswUHXLPcNm92n5FQ00ySArANmo71nQPAV4_yfZBDC7P7B27_cH57HaVkAzwGZZ5l03jV9oafvQJWNBxZSb0rrIns0e8AyJ1JcK7wT1TJmRATrVzkx8RkpEnxwcw-hij4ARCghFADWsMb2ogKOq20V4miKzMybJdvtj3_totFwyyow';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
          drmToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_EXPIRED);
        assert.equal(mediaError.message, 'The video’s secured drm-token has expired.');
        assert.include(mediaError.context, 'Expired at:');
      });

      it('403 response code message w/ playback id mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        const drmToken =
          'eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJqTmhJdEVQWmtOVzN2M0RtcTJOcWM4N1hreEtmaUI2QWlCWjhuVDAwNTAwNmciLCJhdWQiOiJkIiwic3ViIjoiYTRuT2dteEdXZzZnVUxmY0JiQWEwMGdYeWZjd1BuQUZsZEY4UmRzTnlrOE0iLCJleHAiOjE3NTUwMjQ0ODN9.gIseYjn37iSWYnGky9jnSRA0TkktNYDCNXzrwU64Yq31Pa-OYTzOxce4uHRDIO4c6gxNIU_FlJKp9oPjYxePgwT5t-EKyN9F-FtwkXUeyGcRv0VCda9oiDNjdjmcYCYOhel0F5zTTNBXLcQkrks6QEMVrwGte-ozHQXEqiiHW6bCSQBOhya1ER5A9ueoceqgqDOS-JoGbtVrkJdZZLN94ix7r6UMpBuiCva7D7FA5S0TWf0O7PDgFdiVarwunH8UNPvT8gHbanGhOwQ74kF8UfASBaIUHS9VjOwo2OYCTo36sx92vmGSK_nchVUE3QDSLjtQjqZ9p896AUx2nx1rRA';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
          drmToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH);
        assert.equal(mediaError.message, 'The video’s playback ID does not match the one encoded in the drm-token.');
        assert.include(mediaError.context, 'and the playback ID encoded in the drm-token');
      });

      it('403 response code message w/ token type mismatch for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        const drmToken =
          'eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJqTmhJdEVQWmtOVzN2M0RtcTJOcWM4N1hreEtmaUI2QWlCWjhuVDAwNTAwNmciLCJhdWQiOiJ2Iiwic3ViIjoidXlmYmIwMjFLVTAxb01ocVF1MDBYMVZ5UmZQaGswMlVoRnk0NkxlRzN6SWpKVGMiLCJleHAiOjE3NTQ1MDQwMzJ9.ng0pjnnxRX74_v2Vpjl0YZi3eSku0oqVhMdavPptTSAP-4c8NWBpGfbIAZbJtW5-uDOkmgsJjeAgY9ZFQBHk87Nw2y-AFiwMfjZr84fIDnFKWeXRdqe-RJ1Ub2tRLO-srl_ICScXok9VzwMdFAYSwtFHCbDzb-rNfhEibI_7dleLnIa9IWnT5dE6Fk5Xe43j6kgUA8EYHx9bvPbdiq00tvfijAbOS-F3AhEPmpmT6GM35eCnp08T91vWs7R2qlkjpHASwKjEr6wQTVxbBz207MX3CzcLy-fvhq4DErI-lDeJlCfAOzOwLreGfZFIrZWqa8AN4Yb8r3MtAQ_OWVfUow';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
          drmToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH);
        assert.equal(mediaError.message, 'The drm-token is formatted with incorrect information.');
        assert.include(mediaError.context, 'The drm-token has an incorrect aud value: ');
      });

      it('403 response code message w/ token type missing for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        const drmToken =
          'eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJqTmhJdEVQWmtOVzN2M0RtcTJOcWM4N1hreEtmaUI2QWlCWjhuVDAwNTAwNmciLCJzdWIiOiJ1eWZiYjAyMUtVMDFvTWhxUXUwMFgxVnlSZlBoazAyVWhGeTQ2TGVHM3pJakpUYyIsImV4cCI6MTc1NTAxMjEyNX0.EOvASNFQ494a0ikhxORU9uJnWGy19jLLOGnDj3RCqo2h2WQvA0Qdi20FR_yfBkD4FxJ4Ph52_AAqOuHOBxPAU9I6U0Tv-LZbcC0UOOwqYSON5v6rxhUDiQYoXGKsRXb8HwSnUmsemENXXiJn2-L6aT-sLiZSiIWEGs8O191FttghylHRn3ouxSjbT-bDRLbG8C4dUaqNkixL4WR43Em29g9-FfVqL9D4VWREIZ7-jhczM7BpSxFONXmVGu5GYzRpX2_Fz5QGpu8eKYnBGAhcWFLJOvnMTH1i8PC4ogBXGJonKSsfWqU7l-zKGVWKvw756PUXWpWx4GzkHItp3L0emQ';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
          drmToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_AUD_MISSING);
        assert.equal(mediaError.message, 'The drm-token is formatted with incorrect information.');
        assert.include(mediaError.context, 'The drm-token has no aud value. aud value should be');
      });

      it('403 response code message w/ invalid token for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        const drmToken = 'not.a.token';
        const mediaError = getErrorFromResponse({ status: 403, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
          drmToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_TOKEN_MALFORMED);
        assert.equal(mediaError.message, 'The drm-token provided is invalid or malformed.');
        assert.equal(mediaError.context, `Compact JWT string: ${drmToken}`);
      });

      it('500 response code message w/ unknown error for MediaError.MEDIA_ERR_NETWORK', function () {
        const playbackId = 'uyfbb021KU01oMhqQu00X1VyRfPhk02UhFy46LeG3zIjJTc';
        // NOTE: token must be a valid compact JWT (even if e.g. expired, wrong aud, etc.) (CJP)
        const drmToken =
          'eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJqTmhJdEVQWmtOVzN2M0RtcTJOcWM4N1hreEtmaUI2QWlCWjhuVDAwNTAwNmciLCJhdWQiOiJ2Iiwic3ViIjoidXlmYmIwMjFLVTAxb01ocVF1MDBYMVZ5UmZQaGswMlVoRnk0NkxlRzN6SWpKVGMiLCJleHAiOjE3NTQ1MDQwMzJ9.ng0pjnnxRX74_v2Vpjl0YZi3eSku0oqVhMdavPptTSAP-4c8NWBpGfbIAZbJtW5-uDOkmgsJjeAgY9ZFQBHk87Nw2y-AFiwMfjZr84fIDnFKWeXRdqe-RJ1Ub2tRLO-srl_ICScXok9VzwMdFAYSwtFHCbDzb-rNfhEibI_7dleLnIa9IWnT5dE6Fk5Xe43j6kgUA8EYHx9bvPbdiq00tvfijAbOS-F3AhEPmpmT6GM35eCnp08T91vWs7R2qlkjpHASwKjEr6wQTVxbBz207MX3CzcLy-fvhq4DErI-lDeJlCfAOzOwLreGfZFIrZWqa8AN4Yb8r3MtAQ_OWVfUow';
        const mediaError = getErrorFromResponse({ status: 500, url: 'https://any.com' }, MuxErrorCategory.DRM, {
          playbackId,
          drmToken,
        });

        assert.equal(mediaError.code, MediaError.MEDIA_ERR_NETWORK);
        assert.equal(mediaError.muxCode, MuxErrorCode.NETWORK_UNKNOWN_ERROR);
        assert.equal(mediaError.message, 'A network error caused the media download to fail.');
      });
    });
  });
});
