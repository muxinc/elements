import React from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderDropElement } from '@mux/mux-uploader';
export type MuxUploaderDropRefAttributes = MuxUploaderDropElement;
export type MuxUploaderDropProps = {
    overlay?: boolean;
    overlayText?: string;
    muxUploader?: string;
    style?: CSSProperties & {
        ['--overlay-background-color']?: CSSProperties['backgroundColor'];
    };
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;
declare const MuxUploaderDrop: React.ForwardRefExoticComponent<{
    overlay?: boolean;
    overlayText?: string;
    muxUploader?: string;
    style?: CSSProperties & {
        ["--overlay-background-color"]?: CSSProperties["backgroundColor"];
    };
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<MuxUploaderDropElement>>;
export default MuxUploaderDrop;
