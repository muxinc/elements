/// <reference types="google_interactive_media_ads_types" preserve="true" />
import React from 'react';
import '@mux/mux-video-ads';
export interface VideoItem {
    imageUrl: string;
    title: string;
    playbackId: string;
    adTagUrl: string;
}
export type PlaylistVideos = VideoItem[];
export interface PlaylistProps {
    videoList: PlaylistVideos;
}
export declare const MuxNewsPlayer: ({ videoList }: PlaylistProps) => React.JSX.Element;
