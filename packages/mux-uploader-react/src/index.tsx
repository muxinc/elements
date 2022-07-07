import React from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import MuxUploaderDrop from './mux-uploader-drop';
import type MuxUploaderElement from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderRefAttributes = MuxUploaderElement;

export type MuxUploaderProps = {
  url: string;
  id?: string;
  type?: string;
  status?: boolean;
  disableDrop?: boolean;
  style?: CSSProperties;
  children?: React.ReactNode;
};

const MuxUploaderInternal = React.forwardRef<MuxUploaderRefAttributes, MuxUploaderProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader', toNativeProps({ ...props, ref }), children);
  }
);

const useUploader = (
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<MuxUploaderElement | null> | null | undefined,
  props: MuxUploaderProps
) => {
  const { url, id, type, status, disableDrop, ...remainingProps } = props;

  return [remainingProps];
};

const MuxUploader = React.forwardRef<MuxUploaderRefAttributes, MuxUploaderProps>((props, ref) => {
  const { url, id, type, status, disableDrop } = props;

  const innerUploaderRef = useRef<MuxUploaderElement>(null);
  const uploaderRef = useCombinedRefs(innerUploaderRef, ref);
  const [remainingProps] = useUploader(innerUploaderRef, props);

  return (
    <MuxUploaderInternal
      ref={uploaderRef as typeof innerUploaderRef}
      url={url}
      id={id}
      type={type}
      status={status}
      disableDrop={disableDrop}
      {...remainingProps}
    />
  );
});

export { MuxUploaderDrop };

export default MuxUploader;
