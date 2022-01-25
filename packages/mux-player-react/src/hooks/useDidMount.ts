// NOTE: This is pulled directly from rooks (https://github.com/imbhargav5/rooks/blob/main/src/hooks/useDidMount.ts)
// Should add as a dependency as long as we can narrowly include all/only the hooks we need (or sufficient tree shaking) (CJP)

import { useEffect } from "react";

/**
 * useDidMount hook
 * Calls a function on mount
 *
 * @param {Function} callback Callback function to be called on mount
 */
function useDidMount(callback: () => any): void {
  useEffect(() => {
    if (typeof callback === "function") {
      callback();
    }
  }, []);
}

export { useDidMount };
