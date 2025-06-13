import Hls from './hls';
import { CuePoint, Chapter } from './types';
type Config = {
    label: string;
};
export declare function setupTextTracks(mediaEl: HTMLMediaElement, hls: Pick<Hls, 'on' | 'once' | 'subtitleTracks' | 'subtitleTrack'>): void;
export declare function addTextTrack(mediaEl: HTMLMediaElement, kind: TextTrackKind, label: string, lang?: string, id?: string, defaultTrack?: boolean): TextTrack;
export declare function removeTextTrack(mediaEl: HTMLMediaElement, track: TextTrack): void;
export declare function getTextTrack(mediaEl: HTMLMediaElement, label: string, kind: TextTrackKind): TextTrack | undefined;
export declare function addCuesToTextTrack<T = any>(mediaEl: HTMLMediaElement, cues: CuePoint<T>[] | Chapter[], label: string, kind: TextTrackKind): Promise<TextTrack>;
export declare const DefaultCuePointsConfig: Config;
export declare function addCuePoints<T>(mediaEl: HTMLMediaElement, cuePoints: CuePoint<T>[], cuePointsConfig?: Config): Promise<TextTrack>;
export declare function getCuePoints(mediaEl: HTMLMediaElement, cuePointsConfig?: Config): {
    time: number;
    value: any;
}[];
export declare function getActiveCuePoint(mediaEl: HTMLMediaElement, cuePointsConfig?: Config): {
    time: number;
    value: any;
} | undefined;
export declare function setupCuePoints(mediaEl: HTMLMediaElement, cuePointsConfig?: Config): Promise<unknown>;
export declare const DefaultChaptersConfig: Config;
export declare function addChapters(mediaEl: HTMLMediaElement, chapters: Chapter[], chaptersConfig?: Config): Promise<TextTrack>;
export declare function getChapters(mediaEl: HTMLMediaElement, chaptersConfig?: Config): {
    startTime: number;
    endTime: number;
    value: string;
}[];
export declare function getActiveChapter(mediaEl: HTMLMediaElement, chaptersConfig?: Config): {
    startTime: number;
    endTime: number;
    value: string;
} | undefined;
export declare function setupChapters(mediaEl: HTMLMediaElement, chaptersConfig?: Config): Promise<unknown>;
export {};
