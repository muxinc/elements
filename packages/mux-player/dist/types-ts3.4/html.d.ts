import { ChildNodePart, Part } from 'media-chrome/dist/media-theme-element.js';
export declare function processEvent(part: Part, value: unknown): boolean;
export declare function processPropertyIdentity(part: Part, value: unknown): boolean;
export declare function processElementAttribute(part: Part, value: unknown): boolean;
export declare function processBooleanAttribute(part: Part, value: unknown): boolean;
export declare function processBooleanNode(part: Part, value: unknown): boolean;
export declare function processPart(part: Part, value: unknown): void;
export declare class TemplateResult {
    readonly strings: TemplateStringsArray;
    readonly values: unknown[];
    readonly processor: any;
    readonly stringsKey: string;
    constructor(strings: TemplateStringsArray, values: unknown[], processor: any);
    readonly template: HTMLTemplateElement;
    renderInto(element: Node | ChildNodePart): void;
}
export declare function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult;
export declare function render(result: TemplateResult, element: Node | ChildNodePart): void;
