import { PlaybackEngine } from './types';
type MediaWithPDT = HTMLMediaElement & {
    getStartDate?: () => Date;
};
export declare function getStartDate(mediaEl: MediaWithPDT, hls: PlaybackEngine | undefined): Date;
export declare function getCurrentPdt(mediaEl: MediaWithPDT, hls: PlaybackEngine | undefined): Date;
export {};
