/// <reference types="google_interactive_media_ads_types" preserve="true" />
import React from 'react';
import { MuxPlayerProps } from '@mux/mux-player-react';
import '@mux/mux-video-ads';
export interface VideoItem {
    imageUrl: string;
    title: string;
    playbackId: string;
    adTagUrl: string;
}
export type PlaylistVideos = VideoItem[];
export interface PlaylistProps extends Pick<MuxPlayerProps, Exclude<keyof MuxPlayerProps, 'playbackId' | 'adTagUrl'>> {
    videoList: PlaylistVideos;
    allowAdBlocker?: boolean;
}
export declare const MuxNewsPlayer: ({ videoList, allowAdBlocker: allowAdBlocker, ...muxPlayerProps }: PlaylistProps) => React.JSX.Element;
