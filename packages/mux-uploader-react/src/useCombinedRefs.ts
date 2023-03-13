import React from 'react';
import type { MutableRefObject, ForwardedRef } from 'react';

type Maybe<T> = T | null | undefined;
type RefCb<T> = (instance: Maybe<T>) => void;
type RefObj<T> = MutableRefObject<Maybe<T>>;
type RefTypes<T> = RefObj<T> | RefCb<T> | ForwardedRef<T>;
interface useCombinedRefs {
  <T>(...refs: Maybe<RefTypes<T>>[]): RefObj<T>;
}

export const useCombinedRefs: useCombinedRefs = (...refs) => {
  const targetRef = React.useRef(null);

  React.useEffect(() => {
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

export default useCombinedRefs;
