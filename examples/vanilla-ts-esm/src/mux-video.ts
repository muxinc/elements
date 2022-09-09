import "@mux/mux-video";
// BEGIN UI Setup for page
// @ts-ignore
import mediaAssetsJSON from "@mux/assets/media-assets.json";

type MediaAsset = { description: string; error?: boolean; 'playback-id': string; }

const mediaEl = document.querySelector('mux-video') as HTMLMediaElement;
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
  mediaEl.setAttribute('playback-id', selectedAsset['playback-id']);
});

// END UI Setup for page