import { globalThis } from './polyfills';
declare class MuxUploaderDropElement extends globalThis.HTMLElement {
    private "MuxUploaderDropElement.#private";
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attributeName: string, oldValue: string | null, newValue: string | null): void;
    static readonly observedAttributes: string[];
    protected _currentDragTarget?: Node;
    setupDragEvents(opts: AddEventListenerOptions): void;
}
export default MuxUploaderDropElement;
