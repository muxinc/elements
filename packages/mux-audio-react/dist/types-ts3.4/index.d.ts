import React from 'react';
import { MuxMediaProps, generatePlayerInitTime } from '@mux/playback-core';
export type Props = Pick<React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>, Exclude<keyof React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>, 'autoPlay'>> & MuxMediaProps;
export declare const playerSoftwareVersion: string;
export declare const playerSoftwareName = "mux-audio-react";
export { generatePlayerInitTime };
declare const MuxAudio: React.ForwardRefExoticComponent<Pick<Partial<Props>, Exclude<keyof Partial<Props>, "ref">> & React.RefAttributes<HTMLAudioElement | undefined>>;
export default MuxAudio;
