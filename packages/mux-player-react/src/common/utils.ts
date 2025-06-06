import React from 'react';

// React 19 supports custom elements and setting properties directly on them,
// older React versions converted all props to attributes on custom elments.
// Boolean `true` values should not be converted to empty strings in React 19+
// because that would result in a `false` value if it was set via a property.
// React 19+ handles primitive values correctly but we still need to convert
// the camelCase prop names to kebab-case attribute names for mux-player. (WL)

const IS_REACT_19_OR_NEWER = parseInt(React.version) >= 19;

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
export const isKeyOf = <T extends object = any>(k: KeyTypes, o: Maybe<T>): k is keyof T => {
  if (isNil(o)) return false;
  return k in o;
};

const toKebabCase = (string: string) => string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

export const toNativeAttrName = (propName: string, propValue: any): string | undefined => {
  if (!IS_REACT_19_OR_NEWER && typeof propValue === 'boolean' && !propValue) return undefined;
  if (isKeyOf(propName, ReactPropToAttrNameMap)) return ReactPropToAttrNameMap[propName];
  if (typeof propValue === 'undefined') return undefined;
  if (/[A-Z]/.test(propName)) return toKebabCase(propName);
  return propName;
};
export const toStyleAttr = <T>(x: T) => x;

export const toNativeAttrValue = (propValue: any, _propName: string) => {
  if (!IS_REACT_19_OR_NEWER && typeof propValue === 'boolean') return '';
  return propValue;
};

export const toNativeProps = (props: { ref?: any; [key: string]: any } = {}) => {
  const { ref, ...restProps } = props;
  return Object.entries(restProps).reduce<{ [k: string]: string }>((transformedProps, [propName, propValue]) => {
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
