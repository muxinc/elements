import React from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import type MuxUploaderDropElement from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderDropRefAttributes = MuxUploaderDropElement;

export type MuxUploaderDropProps = {
  slot?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  text?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

const MuxUploaderDropInternal = React.forwardRef<MuxUploaderDropRefAttributes, MuxUploaderDropProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader-drop', toNativeProps({ ...props, ref }), children);
  }
);

const useUploaderDrop = (
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<MuxUploaderDropElement | null> | null | undefined,
  props: MuxUploaderDropProps
) => {
  const { fullscreen, overlay, text, ...remainingProps } = props;

  return [remainingProps];
};

const MuxUploaderDrop = React.forwardRef<MuxUploaderDropRefAttributes, MuxUploaderDropProps>((props, ref) => {
  const { fullscreen, overlay, text } = props;

  const innerUploaderDropRef = useRef<MuxUploaderDropElement>(null);
  const uploaderDropRef = useCombinedRefs(innerUploaderDropRef, ref);
  const [remainingProps] = useUploaderDrop(innerUploaderDropRef, props);

  return (
    <MuxUploaderDropInternal
      ref={uploaderDropRef as typeof innerUploaderDropRef}
      fullscreen={fullscreen}
      overlay={overlay}
      text={text}
      {...remainingProps}
    />
  );
});

export default MuxUploaderDrop;
