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
