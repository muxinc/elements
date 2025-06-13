import React from 'react';
import { MuxMediaProps, generatePlayerInitTime } from '@mux/playback-core';
export type Props = Omit<React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>, 'autoPlay'> & MuxMediaProps;
export declare const playerSoftwareVersion: string;
export declare const playerSoftwareName = "mux-audio-react";
export { generatePlayerInitTime };
declare const MuxAudio: React.ForwardRefExoticComponent<Omit<Partial<Props>, "ref"> & React.RefAttributes<HTMLAudioElement | undefined>>;
export default MuxAudio;
