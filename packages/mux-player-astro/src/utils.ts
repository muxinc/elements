const toKebabCase = (string: string) =>
  string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).replaceAll('_', '-');

const FLATTEN_PROPS = new Set(['metadata', 'tokens', 'castCustomData']);

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

    if (FLATTEN_PROPS.has(propName)) {
      if (typeof propValue === 'object' && !Array.isArray(propValue)) {
        Object.entries(propValue).forEach(([key, value]) => {
          const kebabKey = toKebabCase(`${attrName}-${key}`);
          if (typeof propValue !== 'undefined' && propValue !== null && !props.hasOwnProperty(kebabKey)) {
            transformedProps[kebabKey] = stringifyValue(value);
          }
        });
      }
    } else {
      const attrValue = stringifyValue(propValue);
      transformedProps[attrName] = attrValue;
    }

    return transformedProps;
  }, {});
};
