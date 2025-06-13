import React from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderRetryElement } from '@mux/mux-uploader';
export type MuxUploaderRetryRefAttributes = MuxUploaderRetryElement;
export type MuxUploaderRetryProps = {
    muxUploader?: string;
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;
declare const MuxUploaderRetry: React.ForwardRefExoticComponent<{
    muxUploader?: string;
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<MuxUploaderRetryElement>>;
export default MuxUploaderRetry;
