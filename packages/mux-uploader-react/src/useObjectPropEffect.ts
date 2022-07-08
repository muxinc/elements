import { useEffect } from 'react';

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Slightly modified version of React's shallowEqual, with optimizations for Arrays
 * so we may treat them specifically as unequal if they are not a) both arrays
 * or b) don't contain the same (shallowly compared) elements.
 */
const shallowEqual = (objA: any, objB: any): boolean => {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  if (Array.isArray(objA)) {
    // Early "cheap" array compares
    if (!Array.isArray(objB) || objA.length !== objB.length) return false;
    // Shallow compare for arrays
    return objA.some((vVal, i) => objB[i] === vVal);
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
};

export const defaultHasChanged = (obj: any, v: any, k: string) => {
  return !shallowEqual(v, obj[k]);
};

const defaultUpdateValue = (obj: any, v: any, k: string) => {
  obj[k] = v;
};

export const useObjectPropEffect = <T extends { [k: string]: any }, V>(
  propName: string,
  propValue: V | null | undefined,
  ref: React.MutableRefObject<T | null> | null | undefined,
  updateValue = defaultUpdateValue,
  hasChanged = defaultHasChanged
) => {
  return useEffect(() => {
    const obj = ref?.current;
    if (!obj) return;
    if (!hasChanged(obj, propValue, propName)) return;
    updateValue(obj, propValue, propName);
  }, [ref?.current, propValue]);
};

export default useObjectPropEffect;
