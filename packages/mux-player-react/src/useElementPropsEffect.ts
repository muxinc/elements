import { useEffect } from "react";

const defaultHasChanged = (obj: any, v: any, k: string) => {
  const objVal = obj[k];
  const strictlyEqual = objVal === v;
  // Early "cheap" compares
  if (strictlyEqual || v == null || objVal == null || typeof v !== "object")
    return !strictlyEqual;
  if (Array.isArray(v)) {
    // Early "cheap" array compares
    if (!Array.isArray(objVal) || objVal.length !== v.length) return true;
    // Shallow compare for arrays
    return v.some((vVal, i) => objVal[i] === vVal);
  }

  // NOTE: If these "expensive" compares are not worth it, we just need to make sure
  // there are no downstream effects of setting object props if they haven't actually changed (CJP)
  if (typeof objVal !== "object") return true;
  const vKeys = Object.keys(v);
  const objValKeys = Object.keys(objVal);
  // NOTE: While very likely fine, it's worth noting that this assumes that all
  // relevant key/value pairs will be *own* & *enumerable* keys (CJP)
  if (vKeys.length !== objValKeys.length) return true;
  return vKeys.some(
    (vKey) => !objValKeys.includes(vKey) || v[vKey] !== objVal[vKey]
  );
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
