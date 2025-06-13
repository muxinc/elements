import { StreamTypes } from '@mux/playback-core';
import { ValueOf } from '@mux/playback-core';
export declare const getPlayerVersion: () => any;
type MuxURLCustomProps = Partial<{
    customDomain: string;
    token: string;
}>;
type MuxPosterURLCustomProps = MuxURLCustomProps & Partial<{
    thumbnailTime: number;
    programTime: number;
}>;
type MuxStoryboardURLCustomProps = MuxURLCustomProps & Partial<{
    programStartTime: number;
    programEndTime: number;
}>;
export declare const getPosterURLFromPlaybackId: (playbackId?: string, { token, customDomain: domain, thumbnailTime, programTime: program_time, }?: MuxPosterURLCustomProps) => string | undefined;
export declare const getStoryboardURLFromPlaybackId: (playbackId?: string, { token, customDomain: domain, programStartTime: program_start_time, programEndTime: program_end_time, }?: MuxStoryboardURLCustomProps) => string | undefined;
export declare const getStreamTypeFromAttr: (streamTypeAttr: string | null | undefined) => ValueOf<StreamTypes> | undefined;
export declare function castThemeName(themeName?: string): string | undefined;
export declare function toPropName(attrName: string): string;
export declare class AttributeTokenList implements Iterable<string> {
    private "AttributeTokenList.#private";
    constructor(el?: HTMLElement, attr?: string);
    [Symbol.iterator](): ArrayIterator<string>;
    readonly length: number;
    value: string | undefined;
    toString(): string | undefined;
    item(index: number): string;
    values(): ArrayIterator<string>;
    keys(): ArrayIterator<number>;
    forEach(callback: (value: string, index: number, list: string[]) => void): void;
    add(...tokens: string[]): void;
    remove(...tokens: string[]): void;
    contains(token: string): boolean;
    toggle(token: string, force: boolean): boolean;
    replace(oldToken: string, newToken: string): void;
}
export {};
