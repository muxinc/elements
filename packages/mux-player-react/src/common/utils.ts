// NOTE: As a forward-looking implementation, we may want to assume
// prop names -> attribute names is always a simple name.toLowerCase()
// and provide a mechanism for passing in per-component overrides for
// e.g. kebab cases, as that's the way React/Preact handles these. (CJP)
const ReactPropToAttrNameMap = {
  className: 'class',
  classname: 'class',
  htmlFor: 'for',
  crossOrigin: 'crossorigin',
  viewBox: 'viewBox',
  playsInline: 'playsinline',
  autoPlay: 'autoplay',
  playbackRate: 'playbackrate',
};

type KeyTypes = string | number | symbol;
type Maybe<T> = T | null | undefined;

export const isNil = (x: unknown): x is null | undefined => x == undefined;

// Type Guard to determine if a given key is actually a key of some object of type T
export const isKeyOf = <T extends {} = any>(k: KeyTypes, o: Maybe<T>): k is keyof T => {
  if (isNil(o)) return false;
  return k in o;
};

const toKebabCase = (string: string) => string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

export const toNativeAttrName = (propName: string, propValue: any): string | undefined => {
  if (typeof propValue === 'boolean' && !propValue) return undefined;
  if (isKeyOf(propName, ReactPropToAttrNameMap)) return ReactPropToAttrNameMap[propName];
  if (typeof propValue == undefined) return undefined;
  if (/[A-Z]/.test(propName)) return toKebabCase(propName);
  return propName;
};
export const toStyleAttr = <T>(x: T) => x;

export const toNativeAttrValue = (propValue: any, propName: string) => {
  if (typeof propValue === 'boolean') return '';
  return propValue;
};

export const toNativeProps = (props = {}) => {
  return Object.entries(props).reduce<{ [k: string]: string }>((transformedProps, [propName, propValue]) => {
    const attrName = toNativeAttrName(propName, propValue);

    // prop was stripped. Don't add.
    if (!attrName) {
      return transformedProps;
    }

    const attrValue = toNativeAttrValue(propValue, propName);
    transformedProps[attrName] = attrValue;
    return transformedProps;
  }, {});
};
