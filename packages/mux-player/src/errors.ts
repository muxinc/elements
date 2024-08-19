// import lang from '../lang/en.json';
import type { DialogOptions, DevlogOptions } from './types';
import { i18n, MediaError, MuxErrorCode } from '@mux/playback-core';

// const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
// NOTE: Since playback-core and mux-video have no devlog or dialog, these translations should still live in Mux Player (at least for now).

const muxMediaErrorToDialogTitle = (mediaError: MediaError, translate = false) => {
  if (mediaError.muxCode) {
    /** @TODO parameterize titles based on "category" (e.g. video vs. drm) (CJP) */
    // const category = mediaError.errorCategory;
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_EXPIRED) {
      return i18n(`Video URL has expired`, translate);
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
      return i18n(`Video URL is formatted incorrectly`, translate);
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_MISSING) {
      return i18n(`Invalid playback URL`, translate);
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_FOUND) {
      return i18n(`Video does not exist`, translate);
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_READY) {
      return i18n(`Video is not currently available`, translate);
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
    /** @TODO parameterize titles based on "category" (e.g. video vs. drm) (CJP) */
    // const category = mediaError.errorCategory;
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_EXPIRED) {
      return i18n(`The video’s secured playback-token has expired.`, translate);
    }
    if (
      [
        MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH,
        MuxErrorCode.NETWORK_TOKEN_MALFORMED,
        // @ts-ignore
      ].includes(mediaError.muxCode)
    ) {
      return i18n(`Video URL is formatted incorrectly`, translate);
      //
    }
    if (
      [
        MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,
        MuxErrorCode.NETWORK_TOKEN_AUD_MISSING,
        // @ts-ignore
      ].includes(mediaError.muxCode)
    ) {
      return mediaError.message;
      //
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_TOKEN_MISSING) {
      return mediaError.message;
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_FOUND) {
      return '';
    }
    if (mediaError.muxCode === MuxErrorCode.NETWORK_NOT_READY) {
      return i18n(`The live stream or video file are not yet ready.`, translate);
    }
  }

  if (mediaError.code) {
    if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return mediaError.message;
    if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return mediaError.message;
    if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) return mediaError.message;
  }

  return mediaError.message;
};

const muxMediaErrorToDialog = (mediaError: MediaError, translate = false): DialogOptions => {
  const title = muxMediaErrorToDialogTitle(mediaError, translate);
  const message = muxMediaErrorToDialogMessage(mediaError, translate);
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

const muxMediaErrorToDevLog = (mediaError: MediaError, _translate?: boolean | undefined): DevlogOptions => {
  const file = muxMediaErrorToDevlogFile(mediaError);
  return {
    message: mediaError.message,
    context: mediaError.context,
    file,
  };
};

export function getErrorLogs(
  error: MediaError,
  offline?: boolean,
  playbackId?: string,
  playbackToken?: string,
  translate?: boolean
): { dialog: DialogOptions; devlog: DevlogOptions } {
  const dialog: DialogOptions = muxMediaErrorToDialog(error, translate);
  const devlog: DevlogOptions = muxMediaErrorToDevLog(error, translate);

  /** @TODO Move offline to playback-core (probably request-errors) (CJP) */
  if (offline) {
    dialog.title = i18n(`Your device appears to be offline`, translate);
    dialog.message = i18n(`Check your internet connection and try reloading this video.`, translate);
  }

  /** @TODO account for this in playback-core (likely starting with handleNativeError) (CJP) */
  // switch (error.code) {
  //   case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: {
  //     // If native HLS is used on Safari, M3U8 response errors cause media src not supported errors.
  //     // If the response returns an error code, fix the MediaError.code and get detailed error logs.
  //     const status = error.data?.response?.code;
  //     if (status >= 400 && status < 500) {
  //       error.code = MediaError.MEDIA_ERR_NETWORK;
  //       error.data = { response: { code: status } };
  //       ({ dialog, devlog } = getErrorLogs(error, offline, playbackId, playbackToken));
  //       break;
  //     }
  //     break;
  //   }
  // }

  return { dialog, devlog };
}
