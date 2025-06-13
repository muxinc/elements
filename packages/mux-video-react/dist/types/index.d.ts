import React from 'react';
import { MuxMediaProps, generatePlayerInitTime } from '@mux/playback-core';
export type Props = Omit<React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>, 'autoPlay'> & MuxMediaProps;
export declare const playerSoftwareVersion: string;
export declare const playerSoftwareName = "mux-video-react";
export { generatePlayerInitTime };
declare const MuxVideo: React.ForwardRefExoticComponent<Omit<Partial<Props>, "ref"> & React.RefAttributes<HTMLVideoElement | undefined>>;
export default MuxVideo;
