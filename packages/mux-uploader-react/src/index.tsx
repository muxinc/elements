import React, { useEffect } from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import MuxUploaderDrop from './mux-uploader-drop';
import type MuxUploaderElement from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';
import useObjectPropEffect from './useObjectPropEffect';

export type MuxUploaderRefAttributes = MuxUploaderElement;

export type MuxUploaderProps = {
  id?: string;
  endpoint?: string;
  type?: string;
  status?: boolean;
  style?: CSSProperties & {
    ['--uploader-font-family']?: CSSProperties['fontFamily'];
    ['--uploader-font-size']?: CSSProperties['fontSize'];
    ['--uploader-background-color']?: CSSProperties['backgroundColor'];
    ['--button-background-color']?: CSSProperties['backgroundColor'];
    ['--button-border-radius']?: CSSProperties['borderRadius'];
    ['--button-hover-text']?: CSSProperties['color'];
    ['--button-hover-background']?: CSSProperties['background'];
    ['--button-active-text']?: CSSProperties['color'];
    ['--button-active-background']?: CSSProperties['background'];
    ['--progress-bar-fill-color']?: CSSProperties['background'];
    ['--progress-radial-fill-color']?: CSSProperties['stroke'];
  };
  children?: React.ReactNode;
  formatProgress?: (percent: number) => string;
  onAttempt?: EventListener;
  onChunkSuccess?: EventListener;
  onError?: EventListener;
  onProgress?: EventListener;
  onSuccess?: EventListener;
};

const MuxUploaderInternal = React.forwardRef<MuxUploaderRefAttributes, MuxUploaderProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader', toNativeProps({ ...props, ref }), children);
  }
);

const useEventCallbackEffect = (
  type: string,
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<EventTarget | null> | null | undefined,
  callback: EventListener | undefined
) => {
  return useEffect(() => {
    const eventTarget = ref?.current;
    if (!eventTarget || !callback) return;
    eventTarget.addEventListener(type, callback);
    return () => {
      eventTarget.removeEventListener(type, callback);
    };
  }, [ref?.current, callback]);
};

const useUploader = (
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<MuxUploaderElement | null> | null | undefined,
  props: MuxUploaderProps
) => {
  const { onAttempt, onChunkSuccess, onError, onProgress, onSuccess, formatProgress, endpoint, ...remainingProps } =
    props;
  useObjectPropEffect('endpoint', endpoint, ref);
  useObjectPropEffect('formatProgress', formatProgress, ref);
  useEventCallbackEffect('attempt', ref, onAttempt);
  useEventCallbackEffect('chunkSuccess', ref, onChunkSuccess);
  useEventCallbackEffect('error', ref, onError);
  useEventCallbackEffect('progress', ref, onProgress);
  useEventCallbackEffect('success', ref, onSuccess);
  return [remainingProps];
};

const MuxUploader = React.forwardRef<MuxUploaderRefAttributes, MuxUploaderProps>((props, ref) => {
  const innerUploaderRef = useRef<MuxUploaderElement>(null);
  const uploaderRef = useCombinedRefs(innerUploaderRef, ref);
  const [remainingProps] = useUploader(innerUploaderRef, props);

  return <MuxUploaderInternal ref={uploaderRef as typeof innerUploaderRef} {...remainingProps} />;
});

export { MuxUploaderDrop };

export default MuxUploader;
