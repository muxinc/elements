import { useEffect, useRef } from 'react';
import type { MutableRefObject, ForwardedRef } from 'react';

type Maybe<T> = T | null | undefined;
type RefCb<T> = (instance: Maybe<T>) => void;
type RefObj<T> = MutableRefObject<Maybe<T>>;
type RefTypes<T> = RefObj<T> | RefCb<T> | ForwardedRef<T>;
interface useCombinedRefs {
  <T>(...refs: Maybe<RefTypes<T>>[]): RefObj<T>;
}

export const useCombinedRefs: useCombinedRefs = (...refs) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        const result = ref(targetRef.current);
        if (typeof result === 'function') {
          cleanupFunctions.push(result);
        }
      } else {
        ref.current = targetRef.current;
      }
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [refs]);

  return targetRef;
};

// TS assumed default export was interface def instead of function value (CJP)
const defaultUseCombinedRefs = useCombinedRefs;
export default defaultUseCombinedRefs;
