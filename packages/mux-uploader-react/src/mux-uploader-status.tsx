import React from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderStatusElement } from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderStatusRefAttributes = MuxUploaderStatusElement;

export type MuxUploaderStatusProps = {
  muxUploader?: string;
  children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;

const MuxUploaderStatusInternal = React.forwardRef<MuxUploaderStatusRefAttributes, MuxUploaderStatusProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-status', toNativeProps({ ...props, ref }), children);
  }
);

const MuxUploaderStatus = React.forwardRef<MuxUploaderStatusRefAttributes, MuxUploaderStatusProps>((props, ref) => {
  const innerUploaderStatusRef = useRef<MuxUploaderStatusElement>(null);
  const uploaderStatusRef = useCombinedRefs(innerUploaderStatusRef, ref);

  return <MuxUploaderStatusInternal ref={uploaderStatusRef as typeof innerUploaderStatusRef} {...props} />;
});

export default MuxUploaderStatus;
