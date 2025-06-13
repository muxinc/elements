import { PlaybackEngine } from './types';
export declare const setupPreload: ({ preload, src }: Partial<HTMLMediaElement>, mediaEl: HTMLMediaElement, hls?: PlaybackEngine) => (val?: HTMLMediaElement["preload"]) => void;
