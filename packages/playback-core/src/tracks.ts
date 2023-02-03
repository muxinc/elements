import Hls from 'hls.js';
import { CuePoint } from './types';
import { addEventListenerWithTeardown } from './util';

export function setupTracks(
  mediaEl: HTMLMediaElement,
  hls: Pick<Hls, 'on' | 'once' | 'subtitleTracks' | 'subtitleTrack'>
) {
  hls.on(Hls.Events.NON_NATIVE_TEXT_TRACKS_FOUND, (_type, { tracks }) => {
    tracks.forEach((trackObj) => {
      const baseTrackObj = trackObj.subtitleTrack ?? trackObj.closedCaptions;
      const idx = hls.subtitleTracks.findIndex(({ lang, name, type }) => {
        return lang == baseTrackObj?.lang && name === trackObj.label && type.toLowerCase() === trackObj.kind;
      });

      addTextTrack(
        mediaEl,
        trackObj.kind as TextTrackKind,
        trackObj.label,
        baseTrackObj?.lang,
        `${trackObj.kind}${idx}`
      );
    });
  });

  const changeHandler = () => {
    if (!hls.subtitleTracks.length) return;

    const showingTrack = Array.from(mediaEl.textTracks).find((textTrack) => {
      return textTrack.id && textTrack.mode === 'showing' && ['subtitles', 'captions'].includes(textTrack.kind);
    });

    // If hls.subtitleTrack is -1 or its id changed compared to the one that is showing load the new subtitle track.
    const hlsTrackId = `${hls.subtitleTracks[hls.subtitleTrack]?.type.toLowerCase()}${hls.subtitleTrack}`;
    if (showingTrack && (hls.subtitleTrack < 0 || showingTrack?.id !== hlsTrackId)) {
      const idx = hls.subtitleTracks.findIndex(({ lang, name, type }) => {
        return lang == showingTrack.language && name === showingTrack.label && type.toLowerCase() === showingTrack.kind;
      });
      // After the subtitleTrack is set here, hls.js will load the playlist and CUES_PARSED events will be fired below.
      hls.subtitleTrack = idx;
    }

    if (showingTrack && showingTrack?.id === hlsTrackId) {
      // Refresh the cues after a texttrack mode change to fix a Chrome bug causing the captions not to render.
      if (showingTrack.cues) {
        Array.from(showingTrack.cues).forEach((cue) => {
          showingTrack.addCue(cue);
        });
      }
    }
  };

  mediaEl.textTracks.addEventListener('change', changeHandler);

  hls.on(Hls.Events.CUES_PARSED, (_type, { track, cues }) => {
    const textTrack = mediaEl.textTracks.getTrackById(track);
    if (!textTrack) return;

    const disabled = textTrack.mode === 'disabled';
    if (disabled) {
      textTrack.mode = 'hidden';
    }

    cues.forEach((cue: VTTCue) => {
      if (textTrack.cues?.getCueById(cue.id)) return;
      textTrack.addCue(cue);
    });

    if (disabled) {
      textTrack.mode = 'disabled';
    }
  });

  // NOTE: Since this is only relevant for hls, using destroying event (CJP).
  hls.once(Hls.Events.DESTROYING, () => {
    mediaEl.textTracks.removeEventListener('change', changeHandler);
    // Use data attribute to identify tracks that should be removed when switching sources/destroying hls.js instance.
    const trackEls: NodeListOf<HTMLTrackElement> = mediaEl.querySelectorAll('track[data-removeondestroy]');
    trackEls.forEach((trackEl) => {
      trackEl.remove();
    });
  });

  const forceHiddenThumbnails = () => {
    // Keeping this a forEach in case we want to expand the scope of this.
    Array.from(mediaEl.textTracks).forEach((track) => {
      if (['subtitles', 'caption'].includes(track.kind)) return;
      if (track.label !== 'thumbnails') return;
      if (!track.cues?.length) {
        const trackEl = mediaEl.querySelector('track[label="thumbnails"]');
        // Force a reload of the cues if they've been removed
        const src = trackEl?.getAttribute('src') ?? '';
        trackEl?.removeAttribute('src');
        setTimeout(() => {
          trackEl?.setAttribute('src', src);
        }, 0);
      }
      // Force hidden mode if it's not hidden
      if (track.mode !== 'hidden') {
        track.mode = 'hidden';
      }
    });
  };

  // hls.js will forcibly clear all cues from tracks on manifest loads or media attaches.
  // This ensures that we re-load them after it's done that.
  hls.once(Hls.Events.MANIFEST_LOADED, forceHiddenThumbnails);
  hls.once(Hls.Events.MEDIA_ATTACHED, forceHiddenThumbnails);
}

export function addTextTrack(
  mediaEl: HTMLMediaElement,
  kind: TextTrackKind,
  label: string,
  lang?: string,
  id?: string
): TextTrack {
  const trackEl = document.createElement('track');
  trackEl.kind = kind;
  trackEl.label = label;
  if (lang) {
    // This attribute must be present if the element's kind attribute is in the subtitles state.
    trackEl.srclang = lang;
  }
  if (id) {
    trackEl.id = id;
  }
  trackEl.track.mode = ['subtitles', 'captions'].includes(kind) ? 'disabled' : 'hidden';
  // Add data attribute to identify tracks that should be removed when switching sources/destroying hls.js instance.
  trackEl.setAttribute('data-removeondestroy', '');
  mediaEl.append(trackEl);
  return trackEl.track as TextTrack;
}

export function removeTextTrack(mediaEl: HTMLMediaElement, track: TextTrack) {
  const trackElement: HTMLTrackElement | undefined = Array.prototype.find.call(
    mediaEl.querySelectorAll('track'),
    (trackEl: HTMLTrackElement) => trackEl.track === track
  );
  trackElement?.remove();
}

const DEFAULT_CUEPOINTS_TRACK_LABEL = 'cuepoints';
export type CuePointsConfig = { label: string };
export const DefaultCuePointsConfig: CuePointsConfig = Object.freeze({ label: DEFAULT_CUEPOINTS_TRACK_LABEL });

export const getCuePointsTrack = (
  mediaEl: HTMLMediaElement,
  { label = DEFAULT_CUEPOINTS_TRACK_LABEL }: CuePointsConfig = DefaultCuePointsConfig
) => {
  return Array.from(mediaEl.querySelectorAll('track')).find((trackEl) => {
    return trackEl.track.label === label && trackEl.track.kind === 'metadata';
  })?.track;
};

export async function addCuePoints<T>(
  mediaEl: HTMLMediaElement,
  cuePoints: CuePoint<T>[],
  cuePointsConfig: CuePointsConfig = DefaultCuePointsConfig
) {
  // If the track has already been created/added, use it.
  let track = getCuePointsTrack(mediaEl, cuePointsConfig);
  if (!track) {
    // Otherwise, create a new one
    const { label = DEFAULT_CUEPOINTS_TRACK_LABEL } = cuePointsConfig;
    track = addTextTrack(mediaEl, 'metadata', label);
    track.mode = 'hidden';
    // Wait a tick before providing a newly created track. Otherwise e.g. cues disappear when using track.addCue().
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 0));
  }

  if (track.mode !== 'hidden') {
    track.mode = 'hidden';
  }
  // Copy cuePoints to ensure sort is not mutative
  [...cuePoints]
    // Sort descending to ensure last cuepoints are added as cues first. This is done
    // so the track's cue's can be used for reference when determining an appropriate
    // endTime, allowing support of multiple invocations of addCuePoints
    .sort(({ time: timestampA }, { time: timestampB }) => timestampB - timestampA)
    .forEach(({ time: startTime, value }) => {
      // find the cue that starts immediately after the cuePoint's time
      const cueAfterIndex = Array.prototype.findIndex.call(track?.cues, (cue) => cue.startTime >= startTime);
      const cueAfter = track?.cues?.[cueAfterIndex];
      const endTime = cueAfter
        ? cueAfter.startTime
        : Number.isFinite(mediaEl.duration)
        ? mediaEl.duration
        : Number.MAX_SAFE_INTEGER;

      // Adjust the endTime of the already added previous cue, if present, so it does not overlap
      // with the newly added cue.
      const previousCue = track?.cues?.[cueAfterIndex - 1];
      if (previousCue) {
        previousCue.endTime = startTime;
      }
      const cue = new VTTCue(startTime, endTime, JSON.stringify(value ?? null));
      (track as TextTrack).addCue(cue);
    });

  return track;
}

const toCuePoint = (cue: VTTCue) => {
  return {
    time: cue.startTime,
    value: JSON.parse(cue.text),
  };
};

export function getCuePoints(
  mediaEl: HTMLMediaElement,
  cuePointsConfig: CuePointsConfig = { label: DEFAULT_CUEPOINTS_TRACK_LABEL }
) {
  const track = getCuePointsTrack(mediaEl, cuePointsConfig);
  if (!track?.cues) return [];
  return Array.from(track.cues, (cue) => toCuePoint(cue as VTTCue));
}

export function getActiveCuePoint(
  mediaEl: HTMLMediaElement,
  cuePointsConfig: CuePointsConfig = { label: DEFAULT_CUEPOINTS_TRACK_LABEL }
) {
  const track = getCuePointsTrack(mediaEl, cuePointsConfig);
  if (!track?.activeCues?.length) return undefined;
  return toCuePoint(track.activeCues[0] as VTTCue);
}

export async function setupCuePoints(
  mediaEl: HTMLMediaElement,
  cuePointsConfig: CuePointsConfig = DefaultCuePointsConfig
) {
  addEventListenerWithTeardown(mediaEl, 'loadstart', async () => {
    const track = await addCuePoints(mediaEl, [], cuePointsConfig);
    addEventListenerWithTeardown(
      mediaEl,
      'cuechange',
      () => {
        const activeCuePoint = getActiveCuePoint(mediaEl);
        if (activeCuePoint) {
          const evt = new CustomEvent('cuepointchange', {
            composed: true,
            bubbles: true,
            detail: activeCuePoint,
          });
          mediaEl.dispatchEvent(evt);
        }
      },
      {},
      track
    );
  });
}
