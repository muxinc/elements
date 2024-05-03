import React from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderFileSelectElement } from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderFileSelectRefAttributes = MuxUploaderFileSelectElement;

export type MuxUploaderFileSelectProps = {
  muxUploader?: string;
  children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;

const MuxUploaderFileSelectInternal = React.forwardRef<MuxUploaderFileSelectRefAttributes, MuxUploaderFileSelectProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-file-select', toNativeProps({ ...props, ref }), children);
  }
);

const MuxUploaderFileSelect = React.forwardRef<MuxUploaderFileSelectRefAttributes, MuxUploaderFileSelectProps>(
  (props, ref) => {
    const innerUploaderFileSelectRef = useRef<MuxUploaderFileSelectElement>(null);
    const uploaderFileSelectRef = useCombinedRefs(innerUploaderFileSelectRef, ref);

    return (
      <MuxUploaderFileSelectInternal ref={uploaderFileSelectRef as typeof innerUploaderFileSelectRef} {...props} />
    );
  }
);

export default MuxUploaderFileSelect;
