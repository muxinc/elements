import React from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderStatusElement } from '@mux/mux-uploader';
export type MuxUploaderStatusRefAttributes = MuxUploaderStatusElement;
export type MuxUploaderStatusProps = {
    muxUploader?: string;
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;
declare const MuxUploaderStatus: React.ForwardRefExoticComponent<{
    muxUploader?: string;
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<MuxUploaderStatusElement>>;
export default MuxUploaderStatus;
