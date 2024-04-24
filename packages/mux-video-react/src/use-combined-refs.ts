'use client';
import { useEffect, useRef, MutableRefObject } from 'react';

type Maybe<T> = T | null | undefined;
type RefCb<T> = (instance: Maybe<T>) => void;
type RefObj<T> = MutableRefObject<Maybe<T>>;
type RefTypes<T> = RefObj<T> | RefCb<T>;
interface useCombinedRefs {
  <T>(...refs: Maybe<RefTypes<T>>[]): RefObj<T>;
}

export const useCombinedRefs: useCombinedRefs = (...refs) => {
  const targetRef = useRef(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

// TS assumed default export was interface def instead of function value (CJP)
const defaultUseCombinedRefs = useCombinedRefs;
export default defaultUseCombinedRefs;
