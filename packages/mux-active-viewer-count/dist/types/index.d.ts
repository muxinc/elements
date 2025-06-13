import { globalThis } from './polyfills';
export declare const subscribeViewerCount: (token: string, pollInterval: number, callback: (views: number) => void, errorCb: (errorMsg: string) => void) => () => void;
declare class MuxActiveViewerCountElement extends globalThis.HTMLElement {
    #private;
    static get observedAttributes(): readonly string[];
    get views(): number;
    constructor();
    get token(): string;
    set token(value: string);
    get pollInterval(): number;
    set pollInterval(value: number);
    enable(): void;
    disable(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
}
export default MuxActiveViewerCountElement;
