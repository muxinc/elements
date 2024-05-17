import Hls from './hls';
import { CuePoint, Chapter } from './types';
import { addEventListenerWithTeardown } from './util';

type Config = { label: string };

// Shared utils

// Extracts the start time from a cuepoint, considering legacy "time" prop
const cuePointStart = (cuePoint: CuePoint): number => {
  if ('time' in cuePoint) {
    return cuePoint.time;
  }
  return cuePoint.startTime;
};

export function setupTextTracks(
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

export function getTextTrack(mediaEl: HTMLMediaElement, label: string, kind: TextTrackKind) {
  return Array.from(mediaEl.querySelectorAll('track')).find((trackEl) => {
    return trackEl.track.label === label && trackEl.track.kind === kind;
  })?.track;
}

export async function addCuesToTextTrack<T = any>(
  mediaEl: HTMLMediaElement,
  cues: CuePoint<T>[] | Chapter[],
  label: string,
  kind: TextTrackKind
) {
  // If the track has already been created/added, use it.
  let track = getTextTrack(mediaEl, label, kind);
  if (!track) {
    // Otherwise, create a new one
    track = addTextTrack(mediaEl, kind, label);
    track.mode = 'hidden';
    // Wait a tick before providing a newly created track. Otherwise e.g. cues disappear when using track.addCue().
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 0));
  }

  if (track.mode !== 'hidden') {
    track.mode = 'hidden';
  }

  // Copy cuePoints to ensure sort is not mutative
  [...cues]
    // Sort descending to ensure last cuepoints are added as cues first. This is done
    // so the track's cue's can be used for reference when determining an appropriate
    // endTime, allowing support of multiple invocations of addCuePoints
    .sort((cuePointA, cuePointB) => cuePointStart(cuePointB) - cuePointStart(cuePointA))
    .forEach((cuePoint) => {
      const value = cuePoint.value;
      const startTime = cuePointStart(cuePoint);

      if ('endTime' in cuePoint && cuePoint.endTime != undefined) {
        track?.addCue(
          new VTTCue(
            startTime,
            cuePoint.endTime,
            kind === 'chapters' ? (value as string) : JSON.stringify(value ?? null)
          )
        );
      } else {
        // find the cue that starts immediately after the cuePoint's time
        const cueAfterIndex = Array.prototype.findIndex.call(track?.cues, (cue) => cue.startTime >= startTime);
        const cueAfter = track?.cues?.[cueAfterIndex];
        const endTime = cueAfter
          ? cueAfter.startTime
          : Number.isFinite(mediaEl.duration)
            ? mediaEl.duration
            : Number.MAX_SAFE_INTEGER;

        // Adjust the endTime of the already added previous cue,
        // if present, so it does not overlap with the newly added cue.
        const previousCue = track?.cues?.[cueAfterIndex - 1];
        if (previousCue) {
          previousCue.endTime = startTime;
        }
        track?.addCue(
          new VTTCue(startTime, endTime, kind === 'chapters' ? (value as string) : JSON.stringify(value ?? null))
        );
      }
    });

  // NOTE: this doesn't naturally fire when we update the list
  // of cue points (without changing the active cue). We manually
  // fire this to force the state manager to reflect the new change
  mediaEl.textTracks.dispatchEvent(
    new Event('change', {
      bubbles: true,
      composed: true,
    })
  );

  return track;
}

// Cuepoints

const DEFAULT_CUEPOINTS_TRACK_LABEL = 'cuepoints';
export const DefaultCuePointsConfig: Config = Object.freeze({ label: DEFAULT_CUEPOINTS_TRACK_LABEL });

export async function addCuePoints<T>(
  mediaEl: HTMLMediaElement,
  cuePoints: CuePoint<T>[],
  cuePointsConfig: Config = DefaultCuePointsConfig
) {
  return addCuesToTextTrack(mediaEl, cuePoints, cuePointsConfig.label, 'metadata');
}

const toCuePoint = (cue: VTTCue) => ({
  time: cue.startTime,
  value: JSON.parse(cue.text),
});

export function getCuePoints(
  mediaEl: HTMLMediaElement,
  cuePointsConfig: Config = { label: DEFAULT_CUEPOINTS_TRACK_LABEL }
) {
  const track = getTextTrack(mediaEl, cuePointsConfig.label, 'metadata');
  if (!track?.cues) return [];
  return Array.from(track.cues, (cue) => toCuePoint(cue as VTTCue));
}

export function getActiveCuePoint(
  mediaEl: HTMLMediaElement,
  cuePointsConfig: Config = { label: DEFAULT_CUEPOINTS_TRACK_LABEL }
) {
  const track = getTextTrack(mediaEl, cuePointsConfig.label, 'metadata');
  if (!track?.activeCues?.length) return undefined;
  if (track.activeCues.length === 1) return toCuePoint(track.activeCues[0] as VTTCue);
  // NOTE: There is a bug in Chromium where there may be "lingering activeCues" even
  // after the playhead is no longer within their [startTime, endTime) bounds. This
  // accounts for those cases (CJP)
  const { currentTime } = mediaEl;
  const actualActiveCue = Array.prototype.find.call(track.activeCues ?? [], ({ startTime, endTime }) => {
    return startTime <= currentTime && endTime > currentTime;
  }) as VTTCue | undefined;
  if (!actualActiveCue) {
    return toCuePoint(track.activeCues[0] as VTTCue);
  }
  return toCuePoint(actualActiveCue);
}

export async function setupCuePoints(mediaEl: HTMLMediaElement, cuePointsConfig: Config = DefaultCuePointsConfig) {
  return new Promise((resolve) => {
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
      resolve(track);
    });
  });
}

/**
 * Chapters
 */

const DEFAULT_CHAPTERS_TRACK_LABEL = 'chapters';
export const DefaultChaptersConfig: Config = Object.freeze({ label: DEFAULT_CHAPTERS_TRACK_LABEL });

const vttCueToChapter = (cue: VTTCue) => ({
  startTime: cue.startTime,
  endTime: cue.endTime,
  value: cue.text,
});

export async function addChapters(
  mediaEl: HTMLMediaElement,
  chapters: Chapter[],
  chaptersConfig: Config = DefaultChaptersConfig
) {
  return addCuesToTextTrack(mediaEl, chapters, chaptersConfig.label, 'chapters');
}

export function getChapters(
  mediaEl: HTMLMediaElement,
  chaptersConfig: Config = { label: DEFAULT_CHAPTERS_TRACK_LABEL }
) {
  const track = getTextTrack(mediaEl, chaptersConfig.label, 'chapters');
  if (!track?.cues?.length) return [];
  return Array.from(track.cues, (cue) => vttCueToChapter(cue as VTTCue));
}

export function getActiveChapter(
  mediaEl: HTMLMediaElement,
  chaptersConfig: Config = { label: DEFAULT_CHAPTERS_TRACK_LABEL }
) {
  const track = getTextTrack(mediaEl, chaptersConfig.label, 'chapters');
  if (!track?.activeCues?.length) return undefined;
  if (track.activeCues.length === 1) return vttCueToChapter(track.activeCues[0] as VTTCue);
  // NOTE: There is a bug in Chromium where there may be "lingering activeCues" even
  // after the playhead is no longer within their [startTime, endTime) bounds. This
  // accounts for those cases (CJP)
  const { currentTime } = mediaEl;
  const actualActiveCue = Array.prototype.find.call(track.activeCues ?? [], ({ startTime, endTime }) => {
    return startTime <= currentTime && endTime > currentTime;
  }) as VTTCue | undefined;
  if (!actualActiveCue) {
    return vttCueToChapter(track.activeCues[0] as VTTCue);
  }
  return vttCueToChapter(actualActiveCue);
}

export async function setupChapters(mediaEl: HTMLMediaElement, chaptersConfig: Config = DefaultChaptersConfig) {
  return new Promise((resolve) => {
    addEventListenerWithTeardown(mediaEl, 'loadstart', async () => {
      const track = await addChapters(mediaEl, [], chaptersConfig);

      addEventListenerWithTeardown(
        mediaEl,
        'cuechange',
        () => {
          const activeCuePoint = getActiveChapter(mediaEl);
          if (activeCuePoint) {
            const evt = new CustomEvent('chapterchange', {
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

      resolve(track);
    });
  });
}
