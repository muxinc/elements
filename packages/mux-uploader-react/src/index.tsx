'use client';

import React, { useEffect } from 'react';
import type { CSSProperties } from 'react';
import '@mux/mux-uploader';
import type MuxUploaderElement from '@mux/mux-uploader';
import type { MuxUploaderElementEventMap } from '@mux/mux-uploader';
import { constants } from '@mux/mux-uploader';
import MuxUploaderDrop from './mux-uploader-drop';
import MuxUploaderFileSelect from './mux-uploader-file-select';
import MuxUploaderProgress from './mux-uploader-progress';
import MuxUploaderRetry from './mux-uploader-retry';
import MuxUploaderPause from './mux-uploader-pause';
import MuxUploaderStatus from './mux-uploader-status';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';
import useObjectPropEffect from './useObjectPropEffect';

export const ProgressTypes = constants.ProgressTypes;
export type ProgressTypes = typeof ProgressTypes;

export type MuxUploaderRefAttributes = MuxUploaderElement;

interface GenericEventListener<T extends Event = CustomEvent> {
  (evt: T): void;
}

export type MuxUploaderProps = {
  id?: string;
  endpoint?: MuxUploaderElement['endpoint'];
  type?: ProgressTypes[keyof ProgressTypes];
  noDrop?: boolean;
  noProgress?: boolean;
  noStatus?: boolean;
  noRetry?: boolean;
  pausable?: boolean;
  style?: CSSProperties & {
    ['--progress-bar-fill-color']?: CSSProperties['background'];
    ['--progress-radial-fill-color']?: CSSProperties['stroke'];
  };
  // className?: string | undefined;
  children?: React.ReactNode;
  dynamicChunkSize?: boolean;
  useLargeFileWorkaround?: boolean;
  maxFileSize?: number;
  chunkSize?: number;
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
  React.MutableRefObject<MuxUploaderElement | null> | null | undefined,
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

export {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderRetry,
  MuxUploaderPause,
  MuxUploaderStatus,
};

export default MuxUploader;
