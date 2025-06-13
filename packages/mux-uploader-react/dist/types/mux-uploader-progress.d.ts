import React from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderProgressElement } from '@mux/mux-uploader';
export type MuxUploaderProgressRefAttributes = MuxUploaderProgressElement;
export type MuxUploaderProgressProps = {
    muxUploader?: string;
    type?: 'bar' | 'radial' | 'percentage';
    children?: React.ReactNode;
    style?: CSSProperties & {
        ['--progress-bar-height']?: CSSProperties['height'];
        ['--progress-bar-fill-color']?: CSSProperties['fill'];
        ['--progress-bar-background-color']?: CSSProperties['background'];
        ['--progress-bar-box-shadow']?: CSSProperties['boxShadow'];
        ['--progress-bar-border-radius']?: CSSProperties['borderRadius'];
        ['--progress-radial-fill-color']?: CSSProperties['stroke'];
        ['--progress-percentage-display']?: CSSProperties['display'];
    };
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;
declare const MuxUploaderProgress: React.ForwardRefExoticComponent<{
    muxUploader?: string;
    type?: "bar" | "radial" | "percentage";
    children?: React.ReactNode;
    style?: CSSProperties & {
        ["--progress-bar-height"]?: CSSProperties["height"];
        ["--progress-bar-fill-color"]?: CSSProperties["fill"];
        ["--progress-bar-background-color"]?: CSSProperties["background"];
        ["--progress-bar-box-shadow"]?: CSSProperties["boxShadow"];
        ["--progress-bar-border-radius"]?: CSSProperties["borderRadius"];
        ["--progress-radial-fill-color"]?: CSSProperties["stroke"];
        ["--progress-percentage-display"]?: CSSProperties["display"];
    };
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<MuxUploaderProgressElement>>;
export default MuxUploaderProgress;
