import { globalThis } from './polyfills';
declare class MuxUploaderPauseElement extends globalThis.HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get pauseButton(): HTMLButtonElement;
    triggerPause: () => void;
}
export default MuxUploaderPauseElement;
