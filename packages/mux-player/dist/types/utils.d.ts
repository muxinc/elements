export declare function stylePropsToString(props: any): string | undefined;
export declare function kebabCase(name: string): string;
export declare function camelCase(name: string): string;
export declare function uniqueId(prefix: string): string;
export declare function toNumberOrUndefined(val: any): number | undefined;
export declare function toQuery(obj: Record<string, any>): string;
export declare function toParams(obj: Record<string, any>): URLSearchParams;
export declare const containsComposedNode: (rootNode: Node, childNode?: Node | Element | null) => boolean;
