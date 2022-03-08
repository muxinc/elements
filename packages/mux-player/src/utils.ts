// @ts-ignore
import lang from "../lang/en.json";

// NL example
// lang = {
//   "Network Error": "Netwerk Fout",
// };
export function i18n(strings: TemplateStringsArray, ...exprs: any[]): string {
  const i18nLangKeyParts = [];
  for (let i in strings) {
    i18nLangKeyParts.push(strings[i], "${" + i + "}");
  }
  i18nLangKeyParts.pop();

  let i18nLangTemplate = i18nLangKeyParts.join("");
  i18nLangTemplate = lang?.[i18nLangTemplate] ?? i18nLangTemplate;

  return i18nLangTemplate.replace(/\$\{(\d)\}/g, (match, key) => {
    return exprs[key] ?? "";
  });
}

export function stylePropsToString(props: any) {
  let style = "";
  Object.entries(props).forEach(([key, value]) => {
    style += `${kebabCase(key)}: ${value}; `;
  });
  return style ? style.trim() : undefined;
}

export function kebabCase(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function camelCase(name: string) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}

let idCounter = 0;
export function uniqueId(prefix: string) {
  var id = ++idCounter;
  return `${prefix}${id}`;
}

export function toNumberOrUndefined(val: any) {
  if (val == null) return undefined;
  const num = +val;
  return !Number.isNaN(num) ? num : undefined;
}

export function toQuery(obj: Record<string, any>) {
  const params = toParams(obj).toString();
  return params ? "?" + params : "";
}

export function toParams(obj: Record<string, any>) {
  let params: Record<string, any> = {};
  for (let key in obj) {
    if (obj[key] != null) params[key] = obj[key];
  }
  return new URLSearchParams(params);
}
