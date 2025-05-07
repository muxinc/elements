import { globalThis } from './polyfills';
import { UpChunk } from '@mux/upchunk';
import { ProgressTypes } from './constants';
type Endpoint = UpChunk['endpoint'] | undefined | null;
type DynamicChunkSize = UpChunk['dynamicChunkSize'] | undefined;
type ErrorDetail = {
    message: string;
    chunkNumber?: number;
    attempts?: number;
};
export interface MuxUploaderElementEventMap extends Pick<HTMLElementEventMap, Exclude<keyof HTMLElementEventMap, 'progress'>> {
    uploadstart: CustomEvent<{
        file: File;
        chunkSize: number;
    }>;
    chunkattempt: CustomEvent<{
        chunkNumber: number;
        chunkSize: number;
    }>;
    chunksuccess: CustomEvent<{
        chunk: number;
        chunkSize: number;
        attempts: number;
        timeInterval: number;
        response: any;
    }>;
    uploaderror: CustomEvent<ErrorDetail>;
    progress: CustomEvent<number>;
    success: CustomEvent<undefined | null>;
    'file-ready': CustomEvent<File>;
}
interface MuxUploaderElement extends HTMLElement {
    addEventListener<K extends keyof MuxUploaderElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: MuxUploaderElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MuxUploaderElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: MuxUploaderElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare class MuxUploaderElement extends globalThis.HTMLElement implements MuxUploaderElement {
    static readonly observedAttributes: string[];
    protected _endpoint: Endpoint;
    protected _upload?: UpChunk;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;
    protected readonly hiddenFileInput: HTMLInputElement;
    endpoint: Endpoint;
    type: ProgressTypes[keyof ProgressTypes] | undefined;
    noDrop: boolean;
    noProgress: boolean;
    noStatus: boolean;
    noRetry: boolean;
    pausable: boolean;
    dynamicChunkSize: DynamicChunkSize;
    useLargeFileWorkaround: boolean | undefined;
    maxFileSize: number | undefined;
    chunkSize: number | undefined;
    readonly upload: UpChunk | undefined;
    paused: boolean;
    updateLayout(): void;
    setError(message: string): void;
    resetState(): void;
    handleUpload(evt: CustomEvent): void;
}
type MuxUploaderElementType = typeof MuxUploaderElement;
declare global {
    var MuxUploaderElement: MuxUploaderElementType;
}
export default MuxUploaderElement;
