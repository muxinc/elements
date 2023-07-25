import * as React from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import type MuxUploaderDropElement from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderDropRefAttributes = MuxUploaderDropElement;

export type MuxUploaderDropProps = {
  overlay?: boolean;
  overlayText?: string;
  muxUploader?: string;
  style?: CSSProperties & {
    ['--overlay-background-color']?: CSSProperties['backgroundColor'];
  };
  children?: React.ReactNode;
};

const MuxUploaderDropInternal = React.forwardRef<MuxUploaderDropRefAttributes, MuxUploaderDropProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-drop', toNativeProps({ ...props, ref }), children);
  }
);

const MuxUploaderDrop = React.forwardRef<MuxUploaderDropRefAttributes, MuxUploaderDropProps>((props, ref) => {
  const innerUploaderDropRef = React.useRef<MuxUploaderDropElement>(null);
  const uploaderDropRef = useCombinedRefs(innerUploaderDropRef, ref);

  return <MuxUploaderDropInternal ref={uploaderDropRef as typeof innerUploaderDropRef} {...props} />;
});

export default MuxUploaderDrop;
