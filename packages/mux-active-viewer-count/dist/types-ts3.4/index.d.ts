import { globalThis } from './polyfills';
export declare const subscribeViewerCount: (token: string, pollInterval: number, callback: (views: number) => void, errorCb: (errorMsg: string) => void) => () => void;
declare class MuxActiveViewerCountElement extends globalThis.HTMLElement {
    private "MuxActiveViewerCountElement.#private";
    static readonly observedAttributes: readonly string[];
    readonly views: number;
    constructor();
    token: string;
    pollInterval: number;
    enable(): void;
    disable(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
}
export default MuxActiveViewerCountElement;
