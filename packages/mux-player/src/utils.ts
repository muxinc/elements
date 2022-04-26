// @ts-ignore
import lang from '../lang/en.json';

// NL example
// lang = {
//   "Network Error": "Netwerk Fout",
// };
export function i18n(strings: TemplateStringsArray): any {
  // i18n template literals should not include expressions, ok to pass strings[0].
  return new IntlMessageFormat(lang?.[strings[0]] ?? strings[0]);
}

/**
 * Poor man's IntlMessageFormat, enrich if need be.
 * @see https://formatjs.io/docs/intl-messageformat/
 */
class IntlMessageFormat {
  message: string;
  locale: string;

  constructor(message: string, locale = lang.code ?? 'en') {
    this.message = message;
    this.locale = locale;
  }

  format(values: Record<string, any>): string {
    return this.message.replace(/\{(\w+)\}/g, (match, key) => {
      return values[key] ?? '';
    });
  }

  toString() {
    return this.message;
  }
}

export function stylePropsToString(props: any) {
  let style = '';
  Object.entries(props).forEach(([key, value]) => {
    style += `${kebabCase(key)}: ${value}; `;
  });
  return style ? style.trim() : undefined;
}

export function kebabCase(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function camelCase(name: string) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}

let idCounter = 0;
export function uniqueId(prefix: string) {
  const id = ++idCounter;
  return `${prefix}${id}`;
}

export function toNumberOrUndefined(val: any) {
  if (val == null) return undefined;
  const num = +val;
  return !Number.isNaN(num) ? num : undefined;
}

export function toQuery(obj: Record<string, any>) {
  const params = toParams(obj).toString();
  return params ? '?' + params : '';
}

export function toParams(obj: Record<string, any>) {
  const params: Record<string, any> = {};
  for (const key in obj) {
    if (obj[key] != null) params[key] = obj[key];
  }
  return new URLSearchParams(params);
}

export function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const containsComposedNode = (rootNode: Node, childNode?: Node | Element | null): boolean => {
  if (!rootNode || !childNode) return false;
  if (rootNode.contains(childNode)) return true;
  return containsComposedNode(rootNode, (childNode.getRootNode() as ShadowRoot).host);
};
