import { globalThis } from './polyfills';
export declare const fileSelectFragment = "\n  <style>\n  #file-select {\n    cursor: pointer;\n    line-height: 16px;\n    background: #fff;\n    border: 1px solid #000;\n    color: #000000;\n    padding: 16px 24px;\n    border-radius: 4px;\n    -webkit-transition: all 0.2s ease;\n    transition: all 0.2s ease;\n    font-family: inherit;\n    font-size: inherit;\n    position: relative;\n  }\n\n  #file-select:hover {\n    color: #fff;\n    background: #404040;\n  }\n\n  #file-select:active {\n    color: #fff;\n    background: #000;\n  }\n\n  </style>\n\n  <button id=\"file-select\" type=\"button\" part=\"file-select-button\">Upload a video</button>\n";
declare class MuxUploaderFileSelectElement extends globalThis.HTMLElement {
    private "MuxUploaderFileSelectElement.#private";
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected filePickerEl: HTMLElement | null | undefined;
    handleFilePickerElClick(): void;
}
export default MuxUploaderFileSelectElement;
