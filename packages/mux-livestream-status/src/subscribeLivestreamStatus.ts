import { MINIMUM_POLL_INTERVAL, Status, Unsubscribe } from './shared';

export type Subscribe = (
  playbackId: string,
  pollInterval: number, // in seconds
  callback: (status: Status) => void,
  errorCb: (errorMsg: unknown) => void
) => Unsubscribe;

export const subscribeLivestreamStatus: Subscribe = (playbackId, pollInterval, callback, errorCb) => {
  const url = `https://stream.mux.com/${playbackId}.m3u8`;
  const controller = new AbortController();
  let timeoutId = -1;

  const fetchStatus: () => Promise<void> = async () => {
    if (controller.signal.aborted) return;

    return (
      fetch(url, { signal: controller.signal })
        .then((response) => {
          switch (response.status) {
            case 200:
              callback('active');
              break;
            case 412:
              // "disabled" livestreams will also report 412 as idle
              callback('idle');
              break;
            default:
              errorCb(`${response.status}: Problem with Playback ID ${playbackId}`);
          }
        })
        .catch(errorCb)
        // start our polling again regardless of response / error
        .finally(poll)
    );
  };

  const poll = () => {
    if (controller.signal.aborted) return;
    // TS assumes we're calling the node version of setTimeout
    // TODO: how should we properly handle this?
    // @ts-ignore
    timeoutId = setTimeout(fetchStatus, Math.max(pollInterval * 1000, MINIMUM_POLL_INTERVAL * 1000));
  };

  fetchStatus();

  // returns an unsubscribe() function
  return () => {
    controller.abort();
    clearTimeout(timeoutId);
  };
};
