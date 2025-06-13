import { globalThis } from './polyfills';
declare class MuxUploaderRetryElement extends globalThis.HTMLElement {
    #private;
    retryButton: HTMLElement | null | undefined;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleKeyup: (e: KeyboardEvent) => void;
    triggerReset: () => void;
}
export default MuxUploaderRetryElement;
