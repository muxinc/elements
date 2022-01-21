// NOTE: This is pulled directly from rooks (https://github.com/imbhargav5/rooks/blob/main/src/hooks/useBoundingclientrect.ts)
// Should add as a dependency as long as we can narrowly include all/only the hooks we need (or sufficient tree shaking) (CJP)

import type { MutableRefObject } from "react";
import { useState, useEffect, useCallback } from "react";
import { useDidMount } from "./useDidMount";
import { useMutationObserver } from "./useMutationObserver";

let cache: any = {};

/**
 * @param element HTML element whose boundingclientrect is needed
 * @returns ClientRect
 */
function getBoundingClientRect(
  element: HTMLElement
): ClientRect | DOMRect | null {
  const rect = element.getBoundingClientRect();
  return cache[JSON.stringify(rect)] || (cache[JSON.stringify(rect)] = rect);
}

/**
 * useBoundingclientRect hook
 *
 * @param ref The React ref whose ClientRect is needed
 * @returns ClientRect
 */
function useBoundingclientrect(
  ref: MutableRefObject<HTMLElement | null>
): ClientRect | DOMRect | null {
  const [value, setValue] = useState<ClientRect | DOMRect | null>(null);

  const update = useCallback(() => {
    setValue(ref.current ? getBoundingClientRect(ref.current) : null);
  }, []);

  useDidMount(() => {
    update();
  });

  useMutationObserver(ref, update);

  return value;
}

export { useBoundingclientrect };
