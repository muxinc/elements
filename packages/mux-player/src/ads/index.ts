import { globalThis } from '../polyfills';
// Register <mux-video> (ads) web component.
import '@mux/mux-video/ads';
import MuxPlayerBaseElement from '@mux/mux-player/base';
import { AdsPlayerMixin } from '@mux/mux-player/ads/mixin';
import type { EventMap as MuxVideoAdsEventMap } from '@mux/mux-video/ads';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type EventMap = Expand<MuxVideoAdsEventMap>;

class MuxPlayerElement extends AdsPlayerMixin(MuxPlayerBaseElement) {}

if (!globalThis.customElements.get('mux-player')) {
  globalThis.customElements.define('mux-player', MuxPlayerElement);
  (globalThis as any).MuxPlayerElement = MuxPlayerElement;
}

export * from '@mux/mux-player/base';
export default MuxPlayerElement;
