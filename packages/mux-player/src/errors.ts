// import lang from '../lang/en.json';
import type { DialogOptions, DevlogOptions } from './types';
import { errorCategoryToTokenNameOrPrefix, i18n, MediaError, MuxErrorCategory, MuxErrorCode } from '@mux/playback-core';

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
// NOTE: Since playback-core and mux-video have no devlog or dialog, these translations should still live in Mux Player (at least for now).

const muxMediaErrorToDialogTitle = (mediaError: MediaError, translate = false) => {
  if (mediaError.muxCode) {
    const category = capitalizeFirstLetter(mediaError.errorCategory ?? 'video');
    const categoryName = errorCategoryToTokenNameOrPrefix(mediaError.errorCategory ?? MuxErrorCategory.VIDEO);
    if (mediaError.muxCode === MuxErrorCode.NETWORK_OFFLINE) {
      return i18n(`Your device appears to be offline`, translate);
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_EXPIRED) {
      return i18n(`{category} URL has expired`, translate).format({
        category,
      });
    }
    if (
      [
        MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH,
        MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,
        MuxErrorCode.NETWORK_TOKEN_AUD_MISSING,
        MuxErrorCode.NETWORK_TOKEN_MALFORMED,
        // @ts-ignore
      ].includes(mediaError.muxCode)
    ) {
      return i18n(`{category} URL is formatted incorrectly`, translate).format({ category });
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_MISSING) {
      return i18n(`Invalid {categoryName} URL`, translate).format({ categoryName });
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_FOUND) {
      return i18n(`{category} does not exist`, translate).format({ category });
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_READY) {
      const mediaType = mediaError.streamType === 'live' ? 'Live stream' : 'Video';
      return i18n(`{mediaType} is not currently available`, translate).format({ mediaType });
    }
  }

  if (mediaError.code) {
    if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return i18n(`Network Error`, translate);
    if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return i18n(`Media Error`, translate);
    if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) return i18n(`Source Not Supported`, translate);
  }

  return i18n(`Error`, translate);
};

const muxMediaErrorToDialogMessage = (mediaError: MediaError, translate = false) => {
  if (mediaError.muxCode) {
    const category = capitalizeFirstLetter(mediaError.errorCategory ?? 'video');
    const tokenNamePrefix = errorCategoryToTokenNameOrPrefix(mediaError.errorCategory ?? MuxErrorCategory.VIDEO);
    if (mediaError.muxCode === MuxErrorCode.NETWORK_OFFLINE) {
      return i18n(`Check your internet connection and try reloading this video.`, translate);
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_EXPIRED) {
      return i18n(`The video’s secured {tokenNamePrefix}-token has expired.`, translate).format({
        tokenNamePrefix,
      });
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH) {
      return i18n(
        `The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.`,
        translate
      ).format({
        tokenNamePrefix,
      });
    }

    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_MALFORMED) {
      return i18n(`{category} URL is formatted incorrectly`, translate).format({ category });
    }
    if (
      [
        MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,
        MuxErrorCode.NETWORK_TOKEN_AUD_MISSING,
        // @ts-ignore
      ].includes(mediaError.muxCode)
    ) {
      return i18n(`The {tokenNamePrefix}-token is formatted with incorrect information.`, translate).format({
        tokenNamePrefix,
      });
      //
    }
    if (
      [
        MuxErrorCode.NETWORK_TOKEN_MISSING,
        MuxErrorCode.NETWORK_INVALID_URL,
        // @ts-ignore
      ].includes(mediaError.muxCode)
    ) {
      return i18n(
        `The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.`,
        translate
      ).format({
        tokenNamePrefix,
      });
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_FOUND) {
      return '';
    }
    return mediaError.message;
  }

  if (mediaError.code) {
    if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return mediaError.message;
    if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return mediaError.message;
    if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) return mediaError.message;
  }

  return mediaError.message;
};

export const muxMediaErrorToDialog = (mediaError: MediaError, translate = false): DialogOptions => {
  const title = muxMediaErrorToDialogTitle(mediaError, translate).toString();
  const message = muxMediaErrorToDialogMessage(mediaError, translate).toString();
  return {
    title,
    message,
  };
};

const muxMediaErrorToDevlogFile = (mediaError: MediaError) => {
  if (mediaError.muxCode) {
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_EXPIRED) {
      return '403-expired-token.md';
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_MALFORMED) {
      return '403-malformatted-token.md';
    }
    if (
      [
        MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,
        MuxErrorCode.NETWORK_TOKEN_AUD_MISSING,
        // @ts-ignore
      ].includes(mediaError.muxCode)
    ) {
      return '403-incorrect-aud-value.md';
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH) {
      return '403-playback-id-mismatch.md';
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_MISSING) {
      return 'missing-signed-tokens.md';
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_FOUND) {
      return '404-not-found.md';
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_READY) {
      return '412-not-playable.md';
    }
  }

  if (mediaError.code) {
    if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return '';
    if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return 'media-decode-error.md';
    if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) return 'media-src-not-supported.md';
  }

  return '';
};

export const muxMediaErrorToDevlog = (mediaError: MediaError, _translate?: boolean | undefined): DevlogOptions => {
  const file = muxMediaErrorToDevlogFile(mediaError);
  return {
    message: mediaError.message,
    context: mediaError.context,
    file,
  };
};

export function getErrorLogs(error: MediaError, translate = false): { dialog: DialogOptions; devlog: DevlogOptions } {
  const dialog: DialogOptions = muxMediaErrorToDialog(error, translate);
  const devlog: DevlogOptions = muxMediaErrorToDevlog(error, translate);
  return { dialog, devlog };
}
