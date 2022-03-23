import { MediaError } from '@mux-elements/mux-video';
// @ts-ignore
import lang from '../lang/en.json';
import { i18n, parseJwt } from './utils';
import type { DialogOptions, DevlogOptions } from './types';

export function getErrorLogs(
  error: any,
  offline?: boolean,
  playbackId?: string,
  playbackToken?: string
): { dialog: DialogOptions; devlog: DevlogOptions } {
  let dialog: DialogOptions = {};
  const devlog: DevlogOptions = {};

  switch (error.code) {
    case MediaError.MEDIA_ERR_NETWORK: {
      dialog.title = i18n`Network Error`;
      dialog.message = error.message;

      // Only works when hls.js is used.
      const responseCode = error.data?.response.code;
      switch (responseCode) {
        case 412: {
          dialog.title = i18n`Video is not currently available`;
          dialog.message = i18n`The live stream or video file are not yet ready.`;
          devlog.message = i18n`This playback-id may belong to a live stream that is not currently active or an asset that is not ready.`;
          devlog.file = '412-live-stream-inactive.md';
          break;
        }
        case 404: {
          dialog.title = i18n`Video does not exist`;
          dialog.message = '';
          devlog.message = i18n`This playback-id does not exist. You may have used an Asset ID or an ID from a different resource.`;
          devlog.file = '404-not-found.md';
          break;
        }
        case 403: {
          dialog.title = i18n`Invalid playback URL`;
          dialog.message = i18n`The video URL or playback-token are formatted with incorrect or incomplete information.`;
          devlog.message = i18n`403 error trying to access this playback URL. If this is a signed URL, you might need to provide a playback-token.`;
          devlog.file = '403-forbidden.md';

          if (!playbackToken) break;

          const { exp: tokenExpiry, aud: tokenType, sub: tokenPlaybackId } = parseJwt(playbackToken);
          const tokenExpired = Date.now() > tokenExpiry * 1000;
          const playbackIdMismatch = tokenPlaybackId !== playbackId;
          const badTokenType = tokenType !== 'v';
          const dateOptions: any = {
            timeStyle: 'medium',
            dateStyle: 'medium',
          };

          if (tokenExpired) {
            dialog.title = i18n`Video URL has expired`;
            dialog.message = i18n`The video’s secured playback-token has expired.`;
            devlog.message =
              i18n`This playback is using signed URLs and the playback-token has expired. Expired at: {expiredDate}. Current time: {currentDate}.`.format(
                {
                  expiredDate: new Intl.DateTimeFormat(lang.code, dateOptions).format(tokenExpiry * 1000),
                  currentDate: new Intl.DateTimeFormat(lang.code, dateOptions).format(Date.now()),
                }
              );
            break;
          }

          if (playbackIdMismatch) {
            dialog.title = i18n`Video URL is formatted incorrectly`;
            dialog.message = i18n`The video’s playback ID does not match the one encoded in the playback-token.`;
            devlog.message =
              i18n`The specified playback ID {playbackId} and the playback ID encoded in the playback-token {tokenPlaybackId} do not match.`.format(
                {
                  playbackId,
                  tokenPlaybackId,
                }
              );
            break;
          }

          if (badTokenType) {
            dialog.title = i18n`Video URL is formatted incorrectly`;
            dialog.message = i18n`The playback-token is formatted with incorrect information.`;
            devlog.message =
              i18n`The playback-token has an incorrect aud value: {tokenType}. aud value should be v.`.format({
                tokenType,
              });
            break;
          }

          devlog.message = i18n`403 error trying to access this playback URL. If this is a signed playback ID, the token might not have been generated correctly.`;
          break;
        }
      }
      break;
    }
    case MediaError.MEDIA_ERR_DECODE: {
      const { message } = error;
      dialog = {
        title: i18n`Media Error`,
        message,
      };
      break;
    }
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: {
      dialog = {
        title: i18n`Source Not Supported`,
        message: error.message,
      };
      break;
    }
    default:
      dialog = {
        title: i18n`Error`,
        message: error.message,
      };
      break;
  }

  if (offline) {
    dialog = {
      title: i18n`Your device appears to be offline`,
      message: i18n`Check your internet connection and try reloading this video.`,
    };
  }

  return { dialog, devlog };
}
