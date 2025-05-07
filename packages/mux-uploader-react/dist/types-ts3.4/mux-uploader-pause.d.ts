import React from 'react';
import '@mux/mux-uploader';
import { MuxUploaderPauseElement } from '@mux/mux-uploader';
export type MuxUploaderPauseRefAttributes = MuxUploaderPauseElement;
export type MuxUploaderPauseProps = {
    muxUploader?: string;
    children?: React.ReactNode;
} & Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, Exclude<keyof React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>>;
declare const MuxUploaderPause: React.ForwardRefExoticComponent<{
    muxUploader?: string;
    children?: React.ReactNode;
} & Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, Exclude<keyof React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref">> & React.RefAttributes<MuxUploaderPauseElement>>;
export default MuxUploaderPause;
