import Hls from 'hls.js';

// BEGIN UI Setup for page
// @ts-ignore
import mediaAssetsJSON from "@mux/assets/media-assets.json";

type MediaAsset = { description: string; error?: boolean; 'playback-id': string; }

const mediaEl = document.querySelector('test-component') as TestComponent;
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

// BEGIN Simple component

const template = document.createElement('template');

template.innerHTML = `
  <style>
  video {
    height: 100%;
  }
  </style>
  <video id="media" controls></video>
`;

class TestComponent extends HTMLElement {
  static get observedAttributes() {
    return ['playback-id'];
  }

  #hls: Hls | undefined = undefined;

  get hls() {
    return this.#hls;
  }

  get mediaEl() {
    return this.shadowRoot?.querySelector('video') as HTMLVideoElement;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null) {
    if (attrName === 'playback-id') {
      if (this.#hls) {
        this.#hls.detachMedia();
        this.#hls.destroy();
        this.#hls = undefined;
      }
      if (newValue) {
        const defaultConfig = {
          liveDurationInfinity: true,
          enableWorker: false,
        };
        const hls = new Hls({ ...defaultConfig });
        hls.attachMedia(this.mediaEl);
        hls.once(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(`https://stream.mux.com/${newValue}.m3u8`);
        });
        this.#hls = hls;
      }
    }
  }
}

if (!window.customElements.get('test-component')) {
  window.customElements.define('test-component', TestComponent);
}

export default TestComponent;
// END Simple component
