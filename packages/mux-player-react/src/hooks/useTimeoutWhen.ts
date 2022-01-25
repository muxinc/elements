// NOTE: This is pulled directly from rooks (https://github.com/imbhargav5/rooks/blob/main/src/hooks/useTimeoutWhen.ts)
// Should add as a dependency as long as we can narrowly include all/only the hooks we need (or sufficient tree shaking) (CJP)

import { useRef, useEffect } from "react";

/**
 * A setTimeout hook that calls a callback after a timeout duration
 * when a condition is true
 *
 * @param cb The callback to be invoked after timeout
 * @param timeoutDelayMs Amount of time in ms after which to invoke
 * @param when The condition which when true, sets the timeout
 */
function useTimeoutWhen(
  callback_: () => void,
  timeoutDelayMs: number = 0,
  when: boolean = true
): void {
  const savedRefCallback = useRef<() => any>();

  useEffect(() => {
    savedRefCallback.current = callback_;
  });

  function callback() {
    savedRefCallback.current && savedRefCallback.current();
  }

  useEffect(() => {
    if (when) {
      const timeout = window.setTimeout(callback, timeoutDelayMs);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [when]);
}

export { useTimeoutWhen };
