import React from 'react';
import { VideoItem, PlaylistVideos } from './mux-news-player';
interface PlaylistEndScreenProps {
    video: VideoItem;
    relatedVideos: PlaylistVideos;
    isVisible: boolean;
    selectVideoCallback: (index: number) => void;
    timerCallback: () => void;
}
declare const PlaylistEndScreen: ({ video, relatedVideos, isVisible, selectVideoCallback, timerCallback, }: PlaylistEndScreenProps) => React.JSX.Element;
export default PlaylistEndScreen;
