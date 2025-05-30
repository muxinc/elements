/// <reference types="google_interactive_media_ads_types" preserve="true" />
import React from 'react';
import type { MuxPlayerProps } from '@mux/mux-player-react';
import '@mux/mux-video-ads';
export interface VideoItem {
    imageUrl: string;
    title: string;
    playbackId: string;
    adTagUrl: string;
}
export type PlaylistVideos = VideoItem[];
export interface PlaylistProps extends Omit<MuxPlayerProps, 'playbackId' | 'adTagUrl'> {
    videoList: PlaylistVideos;
    allowAdBlocker?: boolean;
}
export declare const MuxNewsPlayer: ({ videoList, allowAdBlocker: allowAdBlocker, ...muxPlayerProps }: PlaylistProps) => React.JSX.Element;
