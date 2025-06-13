import { globalThis } from './polyfills';
import { MuxUploaderElementEventMap } from './mux-uploader';
declare class MuxUploaderStatusElement extends globalThis.HTMLElement {
    private "MuxUploaderStatusElement.#private";
    statusMessage: HTMLElement | null | undefined;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    clearStatusMessage: () => void;
    onUploadError: (e: MuxUploaderElementEventMap["uploaderror"]) => void;
    onSuccess: () => void;
    onOffline: () => void;
}
export default MuxUploaderStatusElement;
