import React, { useEffect } from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import MuxUploaderDrop from './mux-uploader-drop';
import type { IMuxUploaderElement } from '@mux/mux-uploader';
import type MuxUploaderElement from '@mux/mux-uploader';
import type { MuxUploaderElementEventMap } from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';
import useObjectPropEffect from './useObjectPropEffect';

export type MuxUploaderRefAttributes = MuxUploaderElement;

interface GenericEventListener<T extends Event = CustomEvent> {
  (evt: T): void;
}

export type MuxUploaderProps = {
  id?: string;
  endpoint?: MuxUploaderElement['endpoint'];
  type?: string;
  style?: CSSProperties & {
    ['--uploader-font-family']?: CSSProperties['fontFamily'];
    ['--uploader-font-size']?: CSSProperties['fontSize'];
    ['--uploader-background-color']?: CSSProperties['backgroundColor'];
    ['--button-background-color']?: CSSProperties['backgroundColor'];
    ['--button-border-radius']?: CSSProperties['borderRadius'];
    ['--button-border']?: CSSProperties['border'];
    ['--button-padding']?: CSSProperties['padding'];
    ['--button-hover-text']?: CSSProperties['color'];
    ['--button-hover-background']?: CSSProperties['background'];
    ['--button-active-text']?: CSSProperties['color'];
    ['--button-active-background']?: CSSProperties['background'];
    ['--progress-bar-fill-color']?: CSSProperties['background'];
    ['--progress-radial-fill-color']?: CSSProperties['stroke'];
  };
  children?: React.ReactNode;
  dynamicChunkSize?: boolean;
  onUploadStart?: GenericEventListener<MuxUploaderElementEventMap['uploadstart']>;
  onChunkAttempt?: GenericEventListener<MuxUploaderElementEventMap['chunkattempt']>;
  onChunkSuccess?: GenericEventListener<MuxUploaderElementEventMap['chunksuccess']>;
  onUploadError?: GenericEventListener<MuxUploaderElementEventMap['uploaderror']>;
  onProgress?: GenericEventListener<MuxUploaderElementEventMap['progress']>;
  onSuccess?: GenericEventListener<MuxUploaderElementEventMap['success']>;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;

const MuxUploaderInternal = React.forwardRef<MuxUploaderRefAttributes, MuxUploaderProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('mux-uploader', toNativeProps({ ...props, ref }), children);
  }
);

const useEventCallbackEffect = <K extends keyof MuxUploaderElementEventMap>(
  type: K,
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<IMuxUploaderElement | null> | null | undefined,
  callback: GenericEventListener<MuxUploaderElementEventMap[K]> | undefined
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
  const {
    onUploadStart,
    onChunkAttempt,
    onChunkSuccess,
    onUploadError,
    onProgress,
    onSuccess,
    endpoint,
    ...remainingProps
  } = props;
  useObjectPropEffect('endpoint', endpoint, ref);
  useEventCallbackEffect('uploadstart', ref, onUploadStart);
  useEventCallbackEffect('chunkattempt', ref, onChunkAttempt);
  useEventCallbackEffect('chunksuccess', ref, onChunkSuccess);
  useEventCallbackEffect('uploaderror', ref, onUploadError);
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
