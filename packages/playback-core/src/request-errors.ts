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
import { isKeyOf, MuxMediaPropsInternal } from './types';
import { MediaError } from './errors';

export const MuxErrorCode = {
  NOT_AN_ERROR: 0,
  UNKNOWN_ERROR: 2000000,
  NOT_FOUND: 2404000,
  NO_STATUS: 2000001,
  GENERIC_SERVER_FAIL: 2500000,
  TOKEN_MISSING: 2403201,
  TOKEN_MALFORMED: 2412202,
  TOKEN_EXPIRED: 2403210,
  TOKEN_AUD_MISSING: 2403221,
  TOKEN_AUD_MISMATCH: 2403222,
  TOKEN_SUB_MISMATCH: 2403232,
} as const;

export const MuxJWTAud = {
  VIDEO: 'v',
  // NOTE: These are not "built in" for mux-video/mux-audio (only mux-player) (CJP)
  THUMBNAIL: 't',
  STORYBOARD: 's',
  // GIF: 'g', // currently unused
  DRM: 'd',
} as const;

// Identifies what kind of request was made that resulted in an error
export const MuxErrorCategory = {
  VIDEO: 'video',
  // NOTE: These are not "built in" for mux-video/mux-audio (only mux-player) (CJP)
  THUMBNAIL: 'thumbnail',
  STORYBOARD: 'storyboard',
  DRM: 'drm',
} as const;

export type MuxErrorCategory = typeof MuxErrorCategory;

export type MuxErrorCategoryValue = MuxErrorCategory[keyof MuxErrorCategory];

export const categoryToTokenNameOrPrefix = (category: MuxErrorCategoryValue) => {
  if (category === MuxErrorCategory.VIDEO) return 'playback';
  return category;
};

export const categoryToAud = (category: MuxErrorCategoryValue) => {
  if (category === MuxErrorCategory.VIDEO) return MuxJWTAud.VIDEO;
  if (category === MuxErrorCategory.DRM) return MuxJWTAud.DRM;
};

export const categoryToToken = (
  category: MuxErrorCategoryValue,
  muxMediaEl: Partial<Pick<MuxMediaPropsInternal, 'drmToken' | 'playbackToken' | 'tokens'>>
) => {
  const nameOrPrefix = categoryToTokenNameOrPrefix(category);
  const tokenName = `${nameOrPrefix}Token` as const;
  if (muxMediaEl.tokens?.[nameOrPrefix]) return muxMediaEl.tokens?.[nameOrPrefix];
  return isKeyOf(tokenName, muxMediaEl) ? muxMediaEl[tokenName] : undefined;
};

export const getErrorFromResponse = (
  resp: Pick<Response, 'status' | 'url'> | Pick<LoaderResponse, 'code' | 'url'>,
  category: MuxErrorCategoryValue,
  muxMediaEl: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'drmToken' | 'playbackToken' | 'tokens'>>,
  translate = false
) => {
  const status = 'status' in resp ? resp.status : resp.code;
  const requestTime = Date.now();
  const mediaErrorCode = MediaError.MEDIA_ERR_NETWORK;
  // Not an error. WHAT ARE YOU EVEN DOING HERE?!?
  if (status === 200) return undefined;
  const tokenNamePrefix = categoryToTokenNameOrPrefix(category);
  const token = categoryToToken(category, muxMediaEl);
  const expectedAud = categoryToAud(category);
  const [playbackId] = toPlaybackIdParts(muxMediaEl.playbackId ?? '');
  /** @TODO How to handle this case (CJP) */
  // NOTE: *should* have playback id when reaching here
  // if (!status) return MuxErrorCode.NO_STATUS;
  if (!status || !playbackId) return undefined;

  const jwtObj = parseJwt(token);
  // Make sure we didn't get here because of a malformed JWT and/or claim
  if (!!token && !jwtObj) {
    // 403 for DRM
    console.error('malformed compact JWT DRM token string!');
    /** @TODO Add error msg + context crud here (NOT YET DEFINED) (CJP) */
    const mediaError = new MediaError();
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.TOKEN_MALFORMED;
    return mediaError;
  }

  if (status >= 500) {
    /**
     * @TODO We plausibly should have some basic retry logic for all other 500 status
     * cases (CJP)
     **/
    console.error('generic server error!');
    const mediaError = new MediaError('', mediaErrorCode, true);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.TOKEN_MALFORMED;
    /** @TODO Add error msg + context crud here (NOT YET DEFINED) (CJP) */
    return mediaError;
  }

  if (status === 403 || status === 400) {
    if (jwtObj) {
      // 403 for DRM
      if (isJWTExpired(jwtObj, requestTime)) {
        const dateOptions: any = {
          timeStyle: 'medium',
          dateStyle: 'medium',
        };
        const message = i18n(`The video’s secured {tokenNamePrefix}-token has expired.`, translate).format({
          tokenNamePrefix,
        });
        const context = i18n(`Expired at: {expiredDate}. Current time: {currentDate}.`, translate).format({
          expiredDate: new Intl.DateTimeFormat('en', dateOptions).format(jwtObj.exp ?? 0 * 1000),
          currentDate: new Intl.DateTimeFormat('en', dateOptions).format(requestTime),
        });
        const mediaError = new MediaError(message, mediaErrorCode, true, context);
        mediaError.errorCategory = category;
        mediaError.muxCode = MuxErrorCode.TOKEN_MALFORMED;
        return mediaError;
      }
      // 403 for DRM
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
        mediaError.muxCode = MuxErrorCode.TOKEN_SUB_MISMATCH;
        return mediaError;
      }
      // 403 for DRM
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
        mediaError.muxCode = MuxErrorCode.TOKEN_AUD_MISSING;
        return mediaError;
      }
      // 403 for DRM
      if (isJWTAudMismatch(jwtObj, expectedAud)) {
        const message = i18n(`The {tokenNamePrefix}-token is formatted with incorrect information.`, translate).format({
          tokenNamePrefix,
        });
        const context = i18n(
          `The {tokenNamePrefix}-token has an incorrect aud value: {tokenType}. aud value should be {expectedAud}.`,
          translate
        ).format({
          tokenNamePrefix,
          expectedAud,
          tokenType: jwtObj.aud,
        });
        const mediaError = new MediaError(message, mediaErrorCode, true, context);
        mediaError.errorCategory = category;
        mediaError.muxCode = MuxErrorCode.TOKEN_AUD_MISMATCH;
        return mediaError;
      }

      /**
       * @TODO invalid playback URLs and playback IDs are 404 for video URL responses but 400 for DRM. Should change this for consistency (CJP)
       */

      /** @TODO omitted tokens are 403 for video URL responses but 400 for DRM. Should change this for consistency (CJP) */
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
      const mediaError = new MediaError(message, mediaErrorCode, true);
      mediaError.errorCategory = category;
      mediaError.muxCode = MuxErrorCode.TOKEN_MISSING;
      return mediaError;
    }
  }

  /**
   * @TODO invalid playback URLs and playback IDs are 404 for video URL responses but 400 for DRM. Should change this for consistency (CJP)
   */
  if (status === 404) {
    // NOTE: This *should* not happen, since the URL should never be invalid if code
    // is correct. Aka if we end up here it's almost definitely a bug.
    // Including for exhaustiveness. (CJP)
    const message = i18n(
      `This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.`,
      translate
    );
    const context = i18n(`Specified playback ID: {playbackId}`, translate).format({ playbackId });
    const mediaError = new MediaError(message, mediaErrorCode, true, context);
    mediaError.errorCategory = category;
    mediaError.muxCode = MuxErrorCode.NOT_FOUND;
    return mediaError;
  }
  return new MediaError('', mediaErrorCode, true); // MuxErrorCode.UNKNOWN_ERROR;
};
