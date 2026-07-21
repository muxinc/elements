import Hls from './hls';
import type { ErrorData } from 'hls.js';
import { MediaError, MuxErrorCategory, MuxErrorCode } from './errors';
import { addEventListenerWithTeardown, i18n } from './util';
import type { MuxMediaState } from './types';

export interface NetworkRecoveryConfig {
  hls: Pick<Hls, 'on' | 'loadSource' | 'startLoad'>;
  mediaEl: HTMLMediaElement;
  /** The current source, used to re-request the manifest if it never loaded. */
  src: string | undefined;
  muxMediaState: MuxMediaState;
  saveAndDispatchError: (mediaEl: HTMLMediaElement, error: MediaError) => void;
  /** Max reconnect attempts per stall episode before surfacing a terminal error and stopping. */
  maxRetries: number;
}

export interface NetworkRecovery {
  /**
   * Call from the hls ERROR handler. Returns true when recovery has taken over the error (the
   * caller should stop processing it, i.e. not dispatch it as a fatal error).
   */
  handleHlsError: (data: ErrorData, error: MediaError) => boolean;
  /**
   * Call from the hls MANIFEST_LOADED handler. Records that the manifest has loaded and stops any
   * pending retry, but does NOT end recovery as fragments could still fail.
   * Defers loading to engine.
   */
  onManifestLoaded: () => void;
}

/**
 * --- Network interruption recovery ---
 * hls.js retries non-fatal network errors itself; once it gives up (fatal) it stops loading and
 * won't resume - including on flaky networks where the browser never fires `offline`/`online`
 * (navigator.onLine only reflects a network link, not whether requests succeed).
 *
 * When playback stalls during an outage we let hls.js run (and give up on) its own internal
 * retries, and *after* it reports a fatal error we wait a backoff delay and call startLoad() to make
 * it try again.
 * Each fatal drives the next attempt, up to maxRetries, then we surface a terminal error and stop
 * (bounded - no infinite polling).
 *
 * Backoff before each attempt, e.g. maxRetries=6 -> ~1s + 2s + 4s + 8s + 16s + 30s (plus however
 * long hls.js's own internal retries take in between).
 *
 * The retry loop and its "Reconnecting..." UI are tied to the stall (same condition as the loading
 * spinner): while there's still playable buffer, hls.js's own retry handles refilling and we stay
 * silent.
 *
 * `online` is a fast path that retries immediately with a fresh budget.
 */
export const setupNetworkRecovery = ({
  hls,
  mediaEl,
  src,
  muxMediaState,
  saveAndDispatchError,
  maxRetries,
}: NetworkRecoveryConfig): NetworkRecovery => {
  const BASE_RETRY_DELAY_MS = 1000;
  const MAX_RETRY_DELAY_MS = 30000;

  let retryTimer: ReturnType<typeof setTimeout> | undefined;
  let retryCount = 0;
  let isRetrying = false;

  /** retries exhausted: terminal error shown, polling stopped */
  let isFatalError = false;
  /** Whether the manifest has loaded at least once. Used to distinguish whether to startLoad or loadSource */
  let hasManifestLoaded = false;

  const clearRetryTimer = () => {
    if (retryTimer != null) {
      clearTimeout(retryTimer);
      retryTimer = undefined;
    }
  };

  const isReconnectingError = (err?: MediaError | null) => err?.muxCode === MuxErrorCode.NETWORK_RECONNECTING;

  // The playhead has no buffered media to continue with and we're trying to play - i.e. the
  // same condition under which the rebuffering spinner shows. Only then do we retry + surface
  // the "Reconnecting..." state; if there's still playable buffer, hls.js handles refilling.
  const isRebuffering = () => !mediaEl.paused && mediaEl.readyState < HTMLMediaElement.HAVE_FUTURE_DATA;

  // Surface a non-fatal "Reconnecting..." state so the UI reflects recovery rather than
  // silently spinning. Non-fatal so it isn't tracked as a Mux Data failure.
  const dispatchReconnectingError = () => {
    const state = muxMediaState.get(mediaEl);
    if (isReconnectingError(state?.error as MediaError)) return; // already reconnecting

    const reconnectingError = new MediaError(i18n('Attempting to reconnect...'), MediaError.MEDIA_ERR_NETWORK, false);
    reconnectingError.errorCategory = MuxErrorCategory.VIDEO;
    reconnectingError.muxCode = MuxErrorCode.NETWORK_RECONNECTING;
    if (state) state.error = reconnectingError as unknown as HTMLMediaElement['error'];
    mediaEl.dispatchEvent(new CustomEvent('error', { detail: reconnectingError }));
  };

  const retryNetworkLoad = () => {
    // Before the manifest has loaded, startLoad() won't re-request it; re-load the source.
    if (!hasManifestLoaded && src) {
      hls.loadSource(src);
      return;
    }
    // Resume loading from the current playhead. Passing the position (instead of startLoad()'s
    // default "resume from last") keeps recovery aligned with a seek that happened during the
    // outage: if the user seeked to an unbuffered spot the seek stays pending (seeking never
    // resolves without data), so we must load *that* position for it to complete once the
    // origin returns - not fetch a stale one or stall waiting for the seek to settle.
    hls.startLoad(mediaEl.currentTime);
  };

  const giveUp = () => {
    isRetrying = false;
    isFatalError = true;
    clearRetryTimer();
    // Keep `networkError` set so a later `online` event can still recover the player.
    const reloadError = new MediaError(i18n('Network error, try reloading.'), MediaError.MEDIA_ERR_NETWORK, true);
    reloadError.errorCategory = MuxErrorCategory.VIDEO;
    reloadError.reload = true;
    saveAndDispatchError(mediaEl, reloadError);
  };

  // Schedule a SINGLE delayed retry (bounded by maxRetries).
  // note: deliberately doesn't reschedule itself: the next attempt is driven by hls.js giving up again
  // or by the buffer draining (`waiting`).
  const scheduleRetry = () => {
    if (retryTimer != null || isRetrying) return; // an attempt is already pending or in-flight
    if (retryCount >= maxRetries) {
      giveUp();
      return;
    }
    isRetrying = true;
    const delay = Math.min(BASE_RETRY_DELAY_MS * 2 ** retryCount, MAX_RETRY_DELAY_MS);
    retryTimer = setTimeout(() => {
      retryTimer = undefined;
      retryCount += 1;
      retryNetworkLoad();
    }, delay);
  };

  // Begin/continue recovery + the reconnecting UI, but only once we're actually stalled with no
  // playable buffer (same condition as the loading spinner); while there's still buffer, hls.js
  // refills it on its own. Note: retryCount is NOT reset here - it persists across an episode's
  // fatal errors so the budget is honored, and is reset only on real recovery / online / stall end.
  const startRecoveryIfStalled = () => {
    const state = muxMediaState.get(mediaEl);
    if (!state?.networkError || isFatalError) return;
    if (!isRebuffering()) return;
    dispatchReconnectingError();
    scheduleRetry();
  };

  // Called on each fatal connectivity error (hls.js has exhausted its own internal retries). It's
  // no longer mid-retry, so clear the in-flight flag and schedule the next attempt (if stalled).
  const enterRecovery = () => {
    const state = muxMediaState.get(mediaEl);
    if (state) state.networkError = true;
    isRetrying = false;
    startRecoveryIfStalled();
  };

  // Fast path: the browser reports it's back online, so retry immediately with a fresh budget.
  const resumeAfterReconnect = () => {
    const state = muxMediaState.get(mediaEl);
    if (!state?.networkError) return;
    retryCount = 0;
    isFatalError = false;
    clearRetryTimer();
    isRetrying = true; // the immediate retry is now in-flight; a later fatal drives the next one
    retryNetworkLoad();
  };
  globalThis.addEventListener?.('online', resumeAfterReconnect);

  // A fragment loaded successfully -> the network is actually back, so the interruption is
  // over. Clear the recovery state and any "Reconnecting..."/terminal error. FRAG_BUFFERED is
  // the only reliable "recovered" signal: `playing` can fire from already-buffered media (e.g.
  // seeking into the buffer) while the origin is still down, so it must NOT end recovery.
  const onRecovered = () => {
    const state = muxMediaState.get(mediaEl);
    if (!state) return;
    if (!state.networkError && !isReconnectingError(state.error as MediaError)) return;
    state.networkError = false;
    isRetrying = false;
    retryCount = 0;
    isFatalError = false;
    clearRetryTimer();
    if (state.error) {
      state.error = null;
      mediaEl.dispatchEvent(new Event('emptied'));
    }
  };
  hls.on(Hls.Events.FRAG_BUFFERED, onRecovered);

  // Playback resumed (often from buffered media during an ongoing outage). This ends the
  // *stall* - so stop the retry loop and drop the reconnecting/terminal UI - but NOT the
  // recovery: the network may still be down. A later stall starts a fresh bounded retry loop.
  // (media-chrome also hides the dialog on `playing`; clearing state.error keeps getError()
  // consistent and lets a re-stall re-show it.)
  const onStallResolved = () => {
    const state = muxMediaState.get(mediaEl);
    if (!state?.networkError) return;
    isRetrying = false;
    retryCount = 0;
    isFatalError = false;
    clearRetryTimer();
    if (state.error) state.error = null;
  };
  addEventListenerWithTeardown(mediaEl, 'playing', onStallResolved);

  // When the buffer drains mid-interruption, start recovery (same trigger as the spinner)
  // rather than only when hls.js next reports a fatal error.
  addEventListenerWithTeardown(mediaEl, 'waiting', startRecoveryIfStalled);

  mediaEl.addEventListener(
    'teardown',
    () => {
      globalThis.removeEventListener?.('online', resumeAfterReconnect);
      clearRetryTimer();
    },
    { once: true }
  );

  const handleHlsError = (data: ErrorData, error: MediaError): boolean => {
    if (data.type !== Hls.ErrorTypes.NETWORK_ERROR) return false;

    // Distinguish connectivity loss (recoverable by retrying) from HTTP errors like 4xx
    // (auth, not-found) that won't recover on retry. A missing response or code 0 means
    // the request failed before getting a real HTTP status (a connectivity failure); 5xx
    // are transient server errors.
    const httpStatus = data.response?.code ?? 0;
    const isConnectivityError = error.muxCode === MuxErrorCode.NETWORK_OFFLINE || httpStatus === 0 || httpStatus >= 500;

    // hls.js retries non-fatal errors internally, so only take over once it has given up
    // (fatal). Arm recovery (incl. the `online` fast path via `networkError`) only then,
    // so a reconnect can't call startLoad() while hls.js is still handling its own retries.
    if (isConnectivityError && data.fatal) {
      enterRecovery();
      return true;
    }
    return false;
  };

  const onManifestLoaded = () => {
    // The manifest (re)loaded, so hls.js will resume loading the level + fragments on its own; stop
    // our pending backoff retry so it doesn't fire a redundant startLoad against that fresh load,
    // and pause the loop so a re-stall (or the next fatal) can re-arm it.
    //
    // A manifest load is NOT proof media is flowing again - fragments can still fail (partial
    // origin/CDN recovery, or the origin-down-at-load path where loadSource succeeds but segments
    // don't) - so we deliberately keep `networkError` armed here.
    hasManifestLoaded = true;
    isRetrying = false;
    clearRetryTimer();
  };

  return { handleHlsError, onManifestLoaded };
};
