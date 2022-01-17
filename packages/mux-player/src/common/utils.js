export function camelCase(name) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}

export function kebabCase(name) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const ReactPropToAttrNameMap = {
  className: "class",
  classname: "class",
  htmlFor: "for",
  crossOrigin: "crossorigin",
};

export const toNativeAttrName = (propName, propValue) => {
  if (ReactPropToAttrNameMap[propName]) return ReactPropToAttrNameMap[propName];
  if (typeof propValue == undefined) return undefined;
  if (typeof propValue === "boolean" && !propValue) return undefined;
  return kebabCase(propName);
};

export const toStyleCssString = (styleObj) => {
  return Object.entries(styleObj)
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${v}`
    )
    .join(";");
};

export const isMaybeBrowser = () => typeof window != undefined;
export const isMaybeServer = () => typeof global != undefined;

export const toNativeAttrValue = (propValue, propName) => {
  if (typeof propValue === "boolean") return "";
  if (
    isMaybeBrowser() &&
    !isMaybeServer() &&
    propName === "style" &&
    typeof propValue === "object"
  )
    return toStyleCssString(propValue);
  return propValue;
};

export const toNativeProps = (props = {}) => {
  return Object.entries(props).reduce(
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
