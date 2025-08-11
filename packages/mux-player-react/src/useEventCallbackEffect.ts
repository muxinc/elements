import React, { useEffect } from 'react';
import type { GenericEventListener } from './index';

export const useEventCallbackEffect = <
  TElement extends EventTarget = EventTarget,
  TEventMap extends Record<string, Event> = Record<string, Event>,
  K extends keyof TEventMap = keyof TEventMap,
>(
  type: K,
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<TElement | null> | null | undefined,
  callback: GenericEventListener<TEventMap[K]> | undefined
) => {
  return useEffect(() => {
    const eventTarget = ref?.current;
    if (!eventTarget || !callback) return;

    // Type assertion needed because TypeScript can't infer the exact event type
    const eventName = type as string;
    const listener = callback as EventListener;

    eventTarget.addEventListener(eventName, listener);
    return () => {
      eventTarget.removeEventListener(eventName, listener);
    };
  }, [ref?.current, callback, type]);
};
