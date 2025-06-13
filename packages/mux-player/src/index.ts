import { globalThis } from './polyfills';
// Register <mux-video> web component.
import '@mux/mux-video';
import MuxPlayerElement from '@mux/mux-player/base';

if (!globalThis.customElements.get('mux-player')) {
  globalThis.customElements.define('mux-player', MuxPlayerElement);
  (globalThis as any).MuxPlayerElement = MuxPlayerElement;
}

export * from '@mux/mux-player/base';
export default MuxPlayerElement;
