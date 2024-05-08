import React from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderProgressElement } from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderProgressRefAttributes = MuxUploaderProgressElement;

export type MuxUploaderProgressProps = {
  muxUploader?: string;
  type?: 'bar' | 'radial' | 'percentage';
  children?: React.ReactNode;
  style?: CSSProperties & {
    ['--progress-bar-height']?: CSSProperties['height'];
    ['--progress-bar-fill-color']?: CSSProperties['fill'];
    ['--progress-percentage-display']?: CSSProperties['display'];
  };
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;

const MuxUploaderProgressInternal = React.forwardRef<MuxUploaderProgressRefAttributes, MuxUploaderProgressProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-progress', toNativeProps({ ...props, ref }), children);
  }
);

const MuxUploaderProgress = React.forwardRef<MuxUploaderProgressRefAttributes, MuxUploaderProgressProps>(
  (props, ref) => {
    const innerUploaderProgressRef = useRef<MuxUploaderProgressElement>(null);
    const uploaderProgressRef = useCombinedRefs(innerUploaderProgressRef, ref);

    return <MuxUploaderProgressInternal ref={uploaderProgressRef as typeof innerUploaderProgressRef} {...props} />;
  }
);

export default MuxUploaderProgress;
