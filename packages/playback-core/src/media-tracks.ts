import Hls from './hls';
import type { VideoRenditionList } from 'media-tracks';

export function setupMediaTracks(
  customMediaEl: HTMLMediaElement,
  hls: Pick<Hls, 'audioTrack' | 'autoLevelEnabled' | 'nextLevel' | 'levels' | 'on' | 'once' | 'off' | 'trigger'>
) {
  if (!('videoTracks' in customMediaEl)) return;

  // Create a map to save the unique id's we create for each level and rendition.
  // hls.js uses the levels array index primarily but we'll use the id to have a
  // 1 to 1 relation from rendition to level.
  const levelIdMap = new WeakMap();

  hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
    removeAllMediaTracks();

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
    }
  });

  hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, function (event, data) {
    removeAudioTracks();

    // At least with ll-hls, there is a bug when enabling a single audio track (may be wider)
    // for now, we can early bail if the `audioTracks` length is <=1. (CJP)
    if (data.audioTracks.length <= 1) return;
    for (const a of data.audioTracks) {
      // hls.js doesn't return a `kind` property for audio tracks yet.
      const kind = a.default ? 'main' : 'alternative';
      const audioTrack = customMediaEl.addAudioTrack(kind, a.name, a.lang);
      audioTrack.id = `${a.id}`;

      if (a.default) {
        audioTrack.enabled = true;
      }
    }
  });

  customMediaEl.audioTracks.addEventListener('change', () => {
    hls.audioTrack = [...customMediaEl.audioTracks].find((t) => t.enabled).id;
  });

  // Fired when a level is removed after calling `removeLevel()`
  hls.on(Hls.Events.LEVELS_UPDATED, function (event, data) {
    const videoTrack = customMediaEl.videoTracks[customMediaEl.videoTracks.selectedIndex ?? 0];
    if (!videoTrack) return;

    const levelIds: string[] = data.levels.map((l) => levelIdMap.get(l));

    for (const rendition of customMediaEl.videoRenditions) {
      if (rendition.id && !levelIds.includes(rendition.id)) {
        videoTrack.removeRendition(rendition);
      }
    }
  });

  // hls.js doesn't support enabling multiple renditions.
  //
  // 1. if all renditions are enabled it's auto selection.
  // 2. if 1 of the renditions is disabled we assume a selection was made
  //    and lock it to the first rendition that is enabled.
  const switchRendition = (event: Event) => {
    const level = (event.target as VideoRenditionList).selectedIndex;
    if (level != hls.nextLevel) {
      smoothSwitch(level);
    }
  };

  // Workaround for issue changing renditions on an alternative audio track.
  // https://github.com/video-dev/hls.js/issues/5749#issuecomment-1684629437
  const smoothSwitch = (levelIndex: number) => {
    const currentTime = customMediaEl.currentTime;
    let flushedFwdBuffer = false;

    const callback = (event: string, data: { endOffset: number }) => {
      flushedFwdBuffer ||= !Number.isFinite(data.endOffset);
    };

    hls.on(Hls.Events.BUFFER_FLUSHING, callback);
    hls.nextLevel = levelIndex;
    hls.off(Hls.Events.BUFFER_FLUSHING, callback);

    if (!flushedFwdBuffer) {
      hls.trigger(Hls.Events.BUFFER_FLUSHING, {
        startOffset: currentTime + 10,
        endOffset: Infinity,
        type: 'video',
      });
    }
  };

  customMediaEl.videoRenditions?.addEventListener('change', switchRendition);

  const removeVideoTracks = () => {
    for (const videoTrack of customMediaEl.videoTracks) {
      customMediaEl.removeVideoTrack(videoTrack);
    }
  };

  const removeAudioTracks = () => {
    for (const audioTrack of customMediaEl.audioTracks) {
      customMediaEl.removeAudioTrack(audioTrack);
    }
  };

  const removeAllMediaTracks = () => {
    removeVideoTracks();
    removeAudioTracks();
  };

  // NOTE: Since this is only relevant for hls, using destroying event (CJP).
  hls.once(Hls.Events.DESTROYING, removeAllMediaTracks);
}
