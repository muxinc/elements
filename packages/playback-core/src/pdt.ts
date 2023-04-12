import { PlaybackEngine } from './types';

type MediaWithPDT = HTMLMediaElement & { getStartDate?: () => Date };

export function getStartDate(mediaEl: MediaWithPDT, hls: PlaybackEngine | undefined) {
  if (hls) {
    const playingDate = hls.playingDate;

    if (playingDate != null) {
      // If the video is very long and the currentTime will transition day boundaries,
      // this may end up not being accurate
      return new Date(playingDate.getTime() - mediaEl.currentTime * 1000);
    }
  }

  if (typeof mediaEl.getStartDate === 'function') {
    return mediaEl.getStartDate();
  }

  return null;
}

export function getCurrentPdt(mediaEl: MediaWithPDT, hls: PlaybackEngine | undefined) {
  if (hls) {
    return hls.playingDate;
  }

  if (typeof mediaEl.getStartDate === 'function') {
    const startDate = mediaEl.getStartDate();

    // If the video is very long and the currentTime will transition day boundaries,
    // this may end up not being accurate
    return new Date(startDate.getTime() + mediaEl.currentTime * 1000);
  }

  return null;
}
