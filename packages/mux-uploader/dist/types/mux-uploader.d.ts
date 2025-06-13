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
export interface MuxUploaderElementEventMap extends Omit<HTMLElementEventMap, 'progress'> {
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
    static get observedAttributes(): string[];
    protected _endpoint: Endpoint;
    protected _upload?: UpChunk;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;
    protected get hiddenFileInput(): HTMLInputElement;
    get endpoint(): Endpoint;
    set endpoint(value: Endpoint);
    get type(): ProgressTypes[keyof ProgressTypes] | undefined;
    set type(val: ProgressTypes[keyof ProgressTypes] | undefined);
    get noDrop(): boolean;
    set noDrop(value: boolean);
    get noProgress(): boolean;
    set noProgress(value: boolean);
    get noStatus(): boolean;
    set noStatus(value: boolean);
    get noRetry(): boolean;
    set noRetry(value: boolean);
    get pausable(): boolean;
    set pausable(value: boolean);
    get dynamicChunkSize(): DynamicChunkSize;
    set dynamicChunkSize(value: DynamicChunkSize);
    get useLargeFileWorkaround(): boolean | undefined;
    set useLargeFileWorkaround(value: boolean | undefined);
    get maxFileSize(): number | undefined;
    set maxFileSize(value: number | undefined);
    get chunkSize(): number | undefined;
    set chunkSize(value: number | undefined);
    get upload(): UpChunk | undefined;
    get paused(): boolean;
    set paused(value: boolean);
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
