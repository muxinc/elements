import { globalThis } from './polyfills';
import { type MuxUploaderElementEventMap } from './mux-uploader';
declare class MuxUploaderStatusElement extends globalThis.HTMLElement {
    #private;
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
