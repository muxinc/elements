import { globalThis } from './polyfills';
declare class MuxUploaderPauseElement extends globalThis.HTMLElement {
    private "MuxUploaderPauseElement.#private";
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    readonly pauseButton: HTMLButtonElement;
    triggerPause: () => void;
}
export default MuxUploaderPauseElement;
