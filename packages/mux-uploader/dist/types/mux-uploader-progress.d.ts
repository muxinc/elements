import { globalThis } from './polyfills';
declare class MuxUploaderProgressElement extends globalThis.HTMLElement {
    #private;
    svgCircle: SVGCircleElement | null | undefined;
    progressBar: HTMLElement | null | undefined;
    uploadPercentage: HTMLElement | null | undefined;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    onUploadStart: () => void;
    onProgress: (e: Event) => void;
    onSuccess: () => void;
    onReset: () => void;
    getRadius(): number;
    getCircumference(): number;
    setDefaultType(): void;
}
export default MuxUploaderProgressElement;
