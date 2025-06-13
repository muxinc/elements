import { globalThis } from './polyfills';
declare class MuxUploaderSrTextElement extends globalThis.HTMLElement {
    private "MuxUploaderSrTextElement.#private";
    srOnlyText: HTMLElement | null | undefined;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updateText(): void;
}
export default MuxUploaderSrTextElement;
