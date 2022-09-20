import Hls from 'hls.js';

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
): TextTrack | undefined {
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
  trackEl.track.mode = 'disabled';
  // Add data attribute to identify tracks that should be removed when switching sources/destroying hls.js instance.
  trackEl.setAttribute('data-removeondestroy', '');
  mediaEl.append(trackEl);
  return trackEl.track;
}

export function removeTextTrack(mediaEl: HTMLMediaElement, track: TextTrack) {
  const trackElement: HTMLTrackElement | undefined = Array.prototype.find.call(
    mediaEl.querySelectorAll('track'),
    (trackEl: HTMLTrackElement) => trackEl.track === track
  );
  trackElement?.remove();
}
