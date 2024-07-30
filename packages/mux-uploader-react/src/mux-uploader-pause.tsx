import React from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderPauseElement } from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderPauseRefAttributes = MuxUploaderPauseElement;

export type MuxUploaderPauseProps = {
  muxUploader?: string;
  children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;

const MuxUploaderRetryInternal = React.forwardRef<MuxUploaderPauseRefAttributes, MuxUploaderPauseProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-retry', toNativeProps({ ...props, ref }), children);
  }
);

const MuxUploaderPause = React.forwardRef<MuxUploaderPauseRefAttributes, MuxUploaderPauseProps>((props, ref) => {
  const innerUploaderPauseRef = useRef<MuxUploaderPauseElement>(null);
  const uploaderPauseRef = useCombinedRefs(innerUploaderPauseRef, ref);

  return <MuxUploaderRetryInternal ref={uploaderPauseRef as typeof innerUploaderPauseRef} {...props} />;
});

export default MuxUploaderPause;
