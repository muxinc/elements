type KeyTypes = string | number | symbol;
type Maybe<T> = T | null | undefined;
export declare const isNil: (x: unknown) => x is null | undefined;
export declare const isKeyOf: <T extends {} = any>(k: KeyTypes, o: Maybe<T>) => k is keyof T;
export declare const toNativeAttrName: (propName: string, propValue: any) => string | undefined;
export declare const toStyleAttr: <T>(x: T) => T;
export declare const toNativeAttrValue: (propValue: any, propName: string) => any;
export declare const toNativeProps: (props?: {}) => {
    [k: string]: string;
};
export {};
