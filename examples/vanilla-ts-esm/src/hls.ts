export * as MuxVideo from "@mux/mux-video";
// @ts-ignore
import mediaAssetsJSON from "@mux/assets/media-assets.json";
import Hls from "hls.js";
export { mediaAssetsJSON };

type MediaAsset = { description: string; error?: boolean; 'playback-id': string; }

if (Hls.isSupported()) {
  const mediaEl = document.getElementById('video') as HTMLMediaElement;
  let hls: Hls | undefined;
  const mediaAssets = mediaAssetsJSON as MediaAsset[];
  const assetsSelectEl = document.querySelector('#assets-select') as HTMLSelectElement;
  const assetOptionEls = mediaAssets.map((mediaAsset, i) => {
    const { description, error } = mediaAsset;
    const label = `${error ? "👎 " : ""}${description}`;
    const assetOptionEl = document.createElement('option');
    assetOptionEl.value = `${i}`;
    assetOptionEl.innerText = label;
    return assetOptionEl;
  });
  assetsSelectEl.append(...assetOptionEls);

  assetsSelectEl.addEventListener('change', () => {
    const selectedAsset = mediaAssets[+assetsSelectEl.value];
    if (hls) {
      hls.detachMedia();
      hls.destroy();
      hls = undefined;
    }
    if (selectedAsset['playback-id']) {
      const defaultConfig = {
        backBufferLength: 30,
        renderTextTracksNatively: false,
        liveDurationInfinity: true,
        enableWorker: false,
      };
      const nextHls = new Hls({ ...defaultConfig });
      nextHls.attachMedia(mediaEl);
      nextHls.once(Hls.Events.MEDIA_ATTACHED, function () {
        nextHls.loadSource(`https://stream.mux.com/${selectedAsset['playback-id']}.m3u8`);
      });
      hls = nextHls;
    }
  });
  
}