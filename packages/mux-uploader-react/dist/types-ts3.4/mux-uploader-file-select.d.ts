import React from 'react';
import '@mux/mux-uploader';
import { MuxUploaderFileSelectElement } from '@mux/mux-uploader';
export type MuxUploaderFileSelectRefAttributes = MuxUploaderFileSelectElement;
export type MuxUploaderFileSelectProps = {
    muxUploader?: string;
    children?: React.ReactNode;
} & Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, Exclude<keyof React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>>;
declare const MuxUploaderFileSelect: React.ForwardRefExoticComponent<{
    muxUploader?: string;
    children?: React.ReactNode;
} & Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, Exclude<keyof React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref">> & React.RefAttributes<MuxUploaderFileSelectElement>>;
export default MuxUploaderFileSelect;
