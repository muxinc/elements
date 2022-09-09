export * as MuxVideo from "@mux/mux-video";
// @ts-ignore
import mediaAssetsJSON from "@mux/assets/media-assets.json";
import type Hls from "hls.js";
import { initialize } from "playback-core/src";
export { mediaAssetsJSON };

type MediaAsset = { description: string; error?: boolean; 'playback-id': string; }

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

const type = 'hls';
const startTime = 2;
assetsSelectEl.addEventListener('change', () => {
  const selectedAsset = mediaAssets[+assetsSelectEl.value];
  const src = `https://stream.mux.com/${selectedAsset['playback-id']}.m3u8`;
  hls = initialize({ src, type, startTime }, mediaEl, hls);
});
  