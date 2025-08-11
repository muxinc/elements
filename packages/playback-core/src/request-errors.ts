import type { LoaderResponse } from 'hls.js';
import {
  i18n,
  isJWTAudMismatch,
  isJWTAudMissing,
  isJWTExpired,
  isJWTSubMismatch,
  parseJwt,
  toPlaybackIdParts,
} from './util';
import { isKeyOf, MuxMediaPropsInternal, StreamTypes } from './types';
import type { MuxErrorCategoryValue } from './errors';
import { errorCategoryToTokenNameOrPrefix, MediaError, MuxErrorCategory, MuxErrorCode } from './errors';

export const MuxJWTAud = {
  VIDEO: 'v',
  // NOTE: These are not "built in" for mux-video/mux-audio (only mux-player) (CJP)
  THUMBNAIL: 't',
  STORYBOARD: 's',
  // GIF: 'g', // currently unused
  DRM: 'd',
} as const;

export const categoryToAud = (category: MuxErrorCategoryValue) => {
  if (category === MuxErrorCategory.VIDEO) return MuxJWTAud.VIDEO;
  if (category === MuxErrorCategory.DRM) return MuxJWTAud.DRM;
};

export const categoryToToken = (
  category: MuxErrorCategoryValue,
  muxMediaEl: Partial<Pick<MuxMediaPropsInternal, 'drmToken' | 'playbackToken' | 'tokens'>>
) => {
  const nameOrPrefix = errorCategoryToTokenNameOrPrefix(category);
  const tokenName = `${nameOrPrefix}Token` as const;
  if (muxMediaEl.tokens?.[nameOrPrefix]) return muxMediaEl.tokens?.[nameOrPrefix];
  return isKeyOf(tokenName, muxMediaEl) ? muxMediaEl[tokenName] : undefined;
};

export const getErrorFromResponse = (
  resp: Pick<Response, 'status' | 'url'> | Pick<LoaderResponse, 'code' | 'url'>,
  category: MuxErrorCategoryValue,
  muxMediaEl: Partial<
    Pick<MuxMediaPropsInternal, 'playbackId' | 'drmToken' | 'playbackToken' | 'tokens' | 'streamType'>
  >,
  fatal?: boolean,
  translate = false,
  offline = !globalThis.navigator?.onLine // NOTE: Passing this in for testing purposes
) => {
  if (offline) {
    const message = i18n(`Your device appears to be offline`, translate);
    const context = undefined;
    const mediaErrorCode = MediaError.MEDIA_ERR_NETWORK;
    // Being offline is not immediately a fatal error for playback.
    const mediaError = new MediaError(message, mediaErrorCode, false, context);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NETWORK_OFFLINE;
    mediaError.data = resp;
    return mediaError;
  }
  const status = 'status' in resp ? resp.status : resp.code;
  const requestTime = Date.now();
  const mediaErrorCode = MediaError.MEDIA_ERR_NETWORK;
  // Not an error. WHAT ARE YOU EVEN DOING HERE?!?
  if (status === 200) return undefined;
  const tokenNamePrefix = errorCategoryToTokenNameOrPrefix(category);
  const token = categoryToToken(category, muxMediaEl);
  const expectedAud = categoryToAud(category);
  const [playbackId] = toPlaybackIdParts(muxMediaEl.playbackId ?? '');
  // NOTE: *should* have playback id when reaching here
  // if (!status) return MuxErrorCode.NETWORK_NO_STATUS;
  if (!status || !playbackId) return undefined;

  const jwtObj = parseJwt(token);
  // Make sure we didn't get here because of a malformed JWT and/or claim
  if (!!token && !jwtObj) {
    // 403 for DRM
    const message = i18n(`The {tokenNamePrefix}-token provided is invalid or malformed.`, translate).format({
      tokenNamePrefix,
    });
    const context = i18n(`Compact JWT string: {token}`, translate).format({
      token,
    });
    const mediaError = new MediaError(message, mediaErrorCode, true, context);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NETWORK_TOKEN_MALFORMED;
    mediaError.data = resp;
    return mediaError;
  }

  if (status >= 500) {
    /**
     * @TODO We plausibly should have some basic retry logic for all other 500 status
     * cases (CJP)
     **/
    const mediaError = new MediaError('', mediaErrorCode, fatal ?? true);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NETWORK_UNKNOWN_ERROR;
    /** @TODO Add error msg + context crud here (NOT YET DEFINED) (CJP) */
    return mediaError;
  }

  if (status === 403) {
    if (jwtObj) {
      if (isJWTExpired(jwtObj, requestTime)) {
        const dateOptions: any = {
          timeStyle: 'medium',
          dateStyle: 'medium',
        };
        // E.g. for DRM: "The video’s secured drm-token has expired."
        // E.g. for Video: "The video’s secured playback-token has expired."
        const message = i18n(`The video’s secured {tokenNamePrefix}-token has expired.`, translate).format({
          tokenNamePrefix,
        });
        const context = i18n(`Expired at: {expiredDate}. Current time: {currentDate}.`, translate).format({
          expiredDate: new Intl.DateTimeFormat('en', dateOptions).format(jwtObj.exp ?? 0 * 1000),
          currentDate: new Intl.DateTimeFormat('en', dateOptions).format(requestTime),
        });
        const mediaError = new MediaError(message, mediaErrorCode, true, context);
        mediaError.errorCategory = category;
        mediaError.muxCode = MuxErrorCode.NETWORK_TOKEN_EXPIRED;
        mediaError.data = resp;
        return mediaError;
      }
      if (isJWTSubMismatch(jwtObj, playbackId)) {
        const message = i18n(
          `The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.`,
          translate
        ).format({
          tokenNamePrefix,
        });
        const context = i18n(
          `Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}`,
          translate
        ).format({
          tokenNamePrefix,
          playbackId,
          tokenPlaybackId: jwtObj.sub,
        });
        const mediaError = new MediaError(message, mediaErrorCode, true, context);
        mediaError.errorCategory = category;
        mediaError.muxCode = MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH;
        mediaError.data = resp;
        return mediaError;
      }
      if (isJWTAudMissing(jwtObj, expectedAud)) {
        const message = i18n(`The {tokenNamePrefix}-token is formatted with incorrect information.`, translate).format({
          tokenNamePrefix,
        });
        const context = i18n(
          `The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.`,
          translate
        ).format({
          tokenNamePrefix,
          expectedAud,
        });
        const mediaError = new MediaError(message, mediaErrorCode, true, context);
        mediaError.errorCategory = category;
        mediaError.muxCode = MuxErrorCode.NETWORK_TOKEN_AUD_MISSING;
        mediaError.data = resp;
        return mediaError;
      }
      if (isJWTAudMismatch(jwtObj, expectedAud)) {
        const message = i18n(`The {tokenNamePrefix}-token is formatted with incorrect information.`, translate).format({
          tokenNamePrefix,
        });
        const context = i18n(
          `The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.`,
          translate
        ).format({
          tokenNamePrefix,
          expectedAud,
          aud: jwtObj.aud,
        });
        const mediaError = new MediaError(message, mediaErrorCode, true, context);
        mediaError.errorCategory = category;
        mediaError.muxCode = MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH;
        mediaError.data = resp;
        return mediaError;
      }

      // NOTE: This *should* not happen for DRM, since the drm token
      // is currently used to detect whether or not DRM should
      // be setup at all. Including for exhaustiveness. (CJP)
    } else {
      const message = i18n(
        `Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.`,
        translate
      ).format({
        tokenNamePrefix,
        category,
      });
      const context = i18n(`Specified playback ID: {playbackId}`, translate).format({ playbackId });
      const mediaError = new MediaError(message, mediaErrorCode, fatal ?? true, context);
      mediaError.errorCategory = category;
      mediaError.muxCode = MuxErrorCode.NETWORK_TOKEN_MISSING;
      mediaError.data = resp;
      return mediaError;
    }
  }

  if (status === 412) {
    const message = i18n(
      `This playback-id may belong to a live stream that is not currently active or an asset that is not ready.`,
      translate
    );
    const context = i18n(`Specified playback ID: {playbackId}`, translate).format({ playbackId });
    const mediaError = new MediaError(message, mediaErrorCode, fatal ?? true, context);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NETWORK_NOT_READY;
    mediaError.streamType =
      muxMediaEl.streamType === StreamTypes.LIVE
        ? 'live'
        : muxMediaEl.streamType === StreamTypes.ON_DEMAND
          ? 'on-demand'
          : 'unknown';
    mediaError.data = resp;
    return mediaError;
  }

  /**
   * NOTE: When using a "structurally valid but non-existent" playback id for a DRM (license or app certificate) request, this will result in a 403 status.
   * However, since we will only currently make a DRM request after successfully loading the media, this case should not need
   * to be accounted for. If we ever eagerly fetch FPS app certs prior to or in parallel to media requests, we would potentially
   * want to account for that case (either by normalizing statuses, in our messaging for generic 403 above, or through more complex
   * solutions like waiting for the media response). (CJP)
   */
  if (status === 404) {
    // NOTE: This *should* not happen for DRM (only playback/media requests), since the URL should never be invalid if code
    // is correct. Aka if we end up here it's almost definitely a bug.
    const message = i18n(
      `This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.`,
      translate
    );
    const context = i18n(`Specified playback ID: {playbackId}`, translate).format({ playbackId });
    const mediaError = new MediaError(message, mediaErrorCode, fatal ?? true, context);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NETWORK_NOT_FOUND;
    mediaError.data = resp;
    return mediaError;
  }

  /**
   * NOTE: Omitting a token for a DRM (license or app certificate) request results in a 400 status, unlike playback/media requests,
   * which are a 403 status (See above).
   * However, since we will only currently setup Mux Player for DRM if a drm token is provided, this case should not need
   * to be accounted for. If we ever change this, we would potentially
   * want to account for that case (either by normalizing statuses, in our messaging for generic 400 above, or through more complex
   * solutions like checking the category before deciding on error details here). (CJP)
   */
  if (status === 400) {
    const message = i18n(`The URL or playback-id was invalid. You may have used an invalid value as a playback-id.`);
    const context = i18n(`Specified playback ID: {playbackId}`, translate).format({ playbackId });
    const mediaError = new MediaError(message, mediaErrorCode, fatal ?? true, context);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NETWORK_INVALID_URL;
    mediaError.data = resp;
    return mediaError;
  }

  const mediaError = new MediaError('', mediaErrorCode, fatal ?? true);
  mediaError.errorCategory = category;
  mediaError.muxCode = MuxErrorCode.NETWORK_UNKNOWN_ERROR;
  mediaError.data = resp;
  return mediaError;
};
