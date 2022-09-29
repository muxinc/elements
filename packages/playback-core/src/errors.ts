import Hls from 'hls.js';
import { addEventListenerWithTeardown } from './util';
import { PlaybackEngine } from './types';

export const setupErrors = (mediaEl?: HTMLMediaElement | null, hls?: PlaybackEngine) => {
  let currentError: MediaError | null = null;
  if (!mediaEl) return getError;

  // handle native
  if (!hls) {
    addEventListenerWithTeardown(mediaEl, 'error', handleNativeError);
    addEventListenerWithTeardown(mediaEl, 'error', handleInternalError);
    return getError;
  }

  // handle hls.js (MSE)
  hls.on(Hls.Events.ERROR, (_event, data) => {
    // if (data.fatal) {
    //   switch (data.type) {
    //     case Hls.ErrorTypes.NETWORK_ERROR:
    //       // try to recover network error
    //       console.error("fatal network error encountered, try to recover");
    //       hls.startLoad();
    //       break;
    //     case Hls.ErrorTypes.MEDIA_ERROR:
    //       console.error("fatal media error encountered, try to recover");
    //       hls.recoverMediaError();
    //       break;
    //     default:
    //       // cannot recover
    //       console.error(
    //         "unrecoverable fatal error encountered, cannot recover (check logs for more info)"
    //       );
    //       hls.destroy();
    //       break;
    //   }
    // }

    const errorCodeMap: Record<string, number> = {
      [Hls.ErrorTypes.NETWORK_ERROR]: MediaError.MEDIA_ERR_NETWORK,
      [Hls.ErrorTypes.MEDIA_ERROR]: MediaError.MEDIA_ERR_DECODE,
    };
    const error = new MediaError('', errorCodeMap[data.type]);
    error.fatal = data.fatal;
    error.data = data;
    mediaEl.dispatchEvent(
      new CustomEvent('error', {
        detail: error,
      })
    );
  });
  addEventListenerWithTeardown(mediaEl, 'error', handleInternalError);

  async function handleNativeError(event: Event) {
    // Return if the event was created or modified by a script or dispatched
    // via EventTarget.dispatchEvent() preventing an infinite loop.
    if (!event.isTrusted) return;

    // Stop immediate propagation of the native error event, re-dispatch below!
    event.stopImmediatePropagation();

    // Safari sometimes throws an error event with a null error.
    if (!mediaEl?.error) return;

    const { message, code } = mediaEl.error;
    const error = new MediaError(message, code);

    if (mediaEl.src && (code !== MediaError.MEDIA_ERR_DECODE || code !== undefined)) {
      // Attempt to get the response code from the video src url.
      try {
        const { status } = await fetch(mediaEl.src as RequestInfo);
        // Use the same hls.js data structure.
        error.data = { response: { code: status } };
      } catch {}
    }

    mediaEl.dispatchEvent(
      new CustomEvent('error', {
        detail: error,
      })
    );
  }

  /**
   * Use a event listener instead of a function call when dispatching the Custom error
   * event so consumers are still able to disable or intercept this error event.
   * @param {Event} event
   */
  function handleInternalError(event: Event) {
    if (!(event instanceof CustomEvent) || !(event.detail instanceof MediaError)) return;

    const error = event.detail;
    // Prevent tracking non-fatal errors in Mux data.
    if (!error || !error.fatal) return;

    currentError = error;

    // Only pass valid mux-embed props: player_error_code, player_error_message
    mediaEl?.mux?.emit('error', {
      player_error_code: error.code,
      player_error_message: error.message,
    });
  }

  function getError() {
    return currentError;
  }

  return getError;
};

export class MediaError extends Error {
  static MEDIA_ERR_ABORTED = 1;
  static MEDIA_ERR_NETWORK = 2;
  static MEDIA_ERR_DECODE = 3;
  static MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
  static MEDIA_ERR_ENCRYPTED = 5;
  // @see https://docs.mux.com/guides/data/monitor-html5-video-element#customize-error-tracking-behavior
  static MEDIA_ERR_CUSTOM = 100;

  static defaultMessages: Record<number, string> = {
    1: 'You aborted the media playback',
    2: 'A network error caused the media download to fail.',
    3: 'A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.',
    4: 'An unsupported error occurred. The server or network failed, or your browser does not support this format.',
    5: 'The media is encrypted and there are no keys to decrypt it.',
  };

  name: string;
  code: number;
  fatal: boolean;
  data?: any;

  constructor(message?: string, code: number = MediaError.MEDIA_ERR_CUSTOM, fatal?: boolean) {
    super(message);
    this.name = 'MediaError';
    this.code = code;
    this.fatal = fatal ?? (code >= MediaError.MEDIA_ERR_NETWORK && code <= MediaError.MEDIA_ERR_ENCRYPTED);

    if (!this.message) {
      this.message = MediaError.defaultMessages[this.code] ?? '';
    }
  }
}
