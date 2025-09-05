const toKebabCase = (string: string) =>
  string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).replaceAll('_', '-');

function stringifyValue(value: any): string {
  if (Array.isArray(value)) {
    return value.join(' ');
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  if (value === true) {
    return '';
  }
  return String(value);
}

export const toNativeAttributes = (props: { [key: string]: any } = {}): Record<string, string> => {
  return Object.entries(props).reduce<Record<string, string>>((transformedProps, [propName, propValue]) => {
    if (typeof propValue === 'undefined' || propValue === null || propValue === false) {
      return transformedProps;
    }
    if (propName === 'style') {
      transformedProps.style = propValue;
      return transformedProps;
    }

    const attrName = toKebabCase(propName);
    const attrValue = stringifyValue(propValue);
    transformedProps[attrName] = attrValue;

    return transformedProps;
  }, {});
};
