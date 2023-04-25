import React from 'react';
import '@mux/mux-uploader';
import type MuxUploaderRetryElement from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderRetryRefAttributes = MuxUploaderRetryElement;

export type MuxUploaderRetryProps = {
  muxUploader?: string;
  // Currently no slottable children so omitting (CJP)
  // children?: React.ReactNode;
};

const MuxUploaderRetryInternal = React.forwardRef<MuxUploaderRetryRefAttributes, MuxUploaderRetryProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-retry', toNativeProps({ ...props, ref }), children);
  }
);

const MuxUploaderRetry = React.forwardRef<MuxUploaderRetryRefAttributes, MuxUploaderRetryProps>((props, ref) => {
  const innerUploaderRetryRef = useRef<MuxUploaderRetryElement>(null);
  const uploaderRetryRef = useCombinedRefs(innerUploaderRetryRef, ref);

  return <MuxUploaderRetryInternal ref={uploaderRetryRef as typeof innerUploaderRetryRef} {...props} />;
});

export default MuxUploaderRetry;
