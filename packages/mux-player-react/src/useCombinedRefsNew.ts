/**
 * A combined ref implementation using the callback ref cleanups feature.
 * This will work in React 19.
 */

import { Ref, useCallback, MutableRefObject } from 'react';

type OptionalRef<T> = Ref<T> | undefined;

type Cleanup = (() => void) | undefined | void;

function setRef<T>(ref: OptionalRef<T>, value: T): Cleanup {
  if (typeof ref === 'function') {
    const cleanup = ref(value);

    if (typeof cleanup === 'function') {
      return cleanup;
    }
    return () => ref(null);
  } else if (ref) {
    (ref as MutableRefObject<T>).current = value;
    return () => ((ref as MutableRefObject<T>).current = null as any);
  }
}

export function useCombinedRefs<T>(...refs: OptionalRef<T>[]) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: The hook already lists all dependencies
  return useCallback((value: T | null) => {
    const cleanups: Cleanup[] = [];

    for (const ref of refs) {
      const cleanup = setRef(ref, value);
      cleanups.push(cleanup);
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup?.();
      }
    };
  }, refs);
}
