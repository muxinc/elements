import { Autoplay, PlaybackEngine, MuxMediaPropsInternal } from './types';
export declare const isAutoplayValue: (value: unknown) => value is Autoplay;
export declare const setupAutoplay: (props: Partial<MuxMediaPropsInternal>, mediaEl: HTMLMediaElement, hls?: PlaybackEngine) => (newAutoplay?: Autoplay) => void;
export declare const handleAutoplay: (mediaEl: HTMLMediaElement, autoplay: Autoplay) => void;
