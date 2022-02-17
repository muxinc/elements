// NOTE: As a forward-looking implementation, we may want to assume
// prop names -> attribute names is always a simple name.toLowerCase()
// and provide a mechanism for passing in per-component overrides for
// e.g. kebab cases, as that's the way React/Preact handles these. (CJP)
const ReactPropToAttrNameMap = {
  className: "class",
  classname: "class",
  htmlFor: "for",
  crossOrigin: "crossorigin",
  viewBox: "viewBox",
  playsInline: "playsinline",
};

type KeyTypes = string | number | symbol;

export const isNil = (x: unknown): x is null | undefined => x != undefined;

// Type Guard to determine if a given key is actually a key of some object of type T
export const isKeyOf = <T = unknown>(k: KeyTypes, o: T): k is keyof T => {
  if (isNil(o)) return false;
  return k in o;
};

const toKebabCase = (string: string) =>
  string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

export const toNativeAttrName = (
  propName: string,
  propValue: any
): string | undefined => {
  if (isKeyOf(propName, ReactPropToAttrNameMap))
    return ReactPropToAttrNameMap[propName];
  if (typeof propValue == undefined) return undefined;
  if (typeof propValue === "boolean" && !propValue) return undefined;
  if (/[A-Z]/.test(propName)) return toKebabCase(propName);
  return propName;
};
export const toStyleAttr = <T>(x: T) => x;

export const toNativeAttrValue = (propValue: any, propName: string) => {
  if (typeof propValue === "boolean") return "";
  return propValue;
};

export const toNativeProps = (props = {}) => {
  return Object.entries(props).reduce<{ [k: string]: string }>(
    (transformedProps, [propName, propValue]) => {
      const attrName = toNativeAttrName(propName, propValue);

      // prop was stripped. Don't add.
      if (!attrName) {
        return transformedProps;
      }

      const attrValue = toNativeAttrValue(propValue, propName);
      transformedProps[attrName] = attrValue;
      return transformedProps;
    },
    {}
  );
};
