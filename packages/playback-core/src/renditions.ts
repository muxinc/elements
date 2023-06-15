import Hls from './hls';
import type { HlsInterface } from './hls';
import type { MediaTracks } from './types';
import type { TrackEvent } from 'media-tracks';

export function setupRenditions(customMediaEl: MediaTracks, hls: HlsInterface) {
  if (!('videoTracks' in customMediaEl)) return;

  // Create a map to save the unique id's we create for each level and rendition.
  // hls.js uses the levels array index primarily but we'll use the id to have a
  // 1 to 1 relation from rendition to level.
  const levelIdMap = new WeakMap();

  hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
    removeAllVideoTracks();

    const videoTrack = customMediaEl.addVideoTrack('main');
    videoTrack.selected = true;

    for (const [id, level] of data.levels.entries()) {
      const videoRendition = videoTrack.addRendition(
        level.url[0],
        level.width,
        level.height,
        level.videoCodec,
        level.bitrate
      );

      // The returned levels all have an id of `0`, save the id in a WeakMap.
      levelIdMap.set(level, `${id}`);

      videoRendition.id = `${id}`;
      videoRendition.enabled = hls.autoLevelEnabled;

      if (id == data.firstLevel) {
        videoRendition.enabled = true;
        videoRendition.active = true;
      }
    }
  });

  // Fired when a level is removed after calling `removeLevel()`
  hls.on(Hls.Events.LEVELS_UPDATED, function (event, data) {
    const videoTrack = customMediaEl.videoTracks[0];
    if (!videoTrack) return;

    const levelIds: string[] = data.levels.map((l) => levelIdMap.get(l));

    for (const rendition of videoTrack.renditions) {
      if (rendition.id && !levelIds.includes(rendition.id)) {
        videoTrack.renditions.remove(rendition);
      }
    }
  });

  hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
    const videoTrack = customMediaEl.videoTracks[0];
    if (!videoTrack) return;

    // data.level returns an index of the level, not an id.
    const levelId = levelIdMap.get(hls.levels[data.level]);
    const rendition = videoTrack?.renditions.getRenditionById(levelId);
    if (rendition) {
      rendition.active = true;
    }
  });

  const onVideoTrackAdd = (event: Event) => {
    const { track } = event as TrackEvent;

    // hls.js doesn't support enabling multiple renditions.
    //
    // 1. if all renditions are enabled it's auto selection.
    // 2. if 1 of the renditions is disabled we assume a selection was made
    //    and lock it to the first rendition that is enabled.
    track.renditions.addEventListener('change', () => {
      let level;
      if ([...track.renditions].some((rendition) => !rendition.enabled)) {
        level = [...track.renditions].find((r) => r.enabled) ?? -1;
      } else {
        level = -1;
      }

      if (level != hls.nextLevel) {
        hls.nextLevel = Number(level);
      }
    });
  };

  customMediaEl.videoTracks.addEventListener('addtrack', onVideoTrackAdd);

  const removeAllVideoTracks = () => {
    for (const videoTrack of customMediaEl.videoTracks) {
      customMediaEl.videoTracks.remove(videoTrack);
    }
  };

  // NOTE: Since this is only relevant for hls, using destroying event (CJP).
  hls.once(Hls.Events.DESTROYING, () => {
    customMediaEl.videoTracks.removeEventListener('addtrack', onVideoTrackAdd);
    removeAllVideoTracks();
  });
}
