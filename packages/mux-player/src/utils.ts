export function stylePropsToString(props: any) {
  let style = '';
  Object.entries(props).forEach(([key, value]) => {
    if (value == null) return;
    style += `${kebabCase(key)}: ${value}; `;
  });
  return style ? style.trim() : undefined;
}

export function kebabCase(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function camelCase(name: string) {
  return name.replace(/[-_]([a-z])/g, (_$0, $1) => $1.toUpperCase());
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

export const containsComposedNode = (rootNode: Node, childNode?: Node | Element | null): boolean => {
  if (!rootNode || !childNode) return false;
  if (rootNode.contains(childNode)) return true;
  return containsComposedNode(rootNode, (childNode.getRootNode() as ShadowRoot).host);
};

export const getActiveElement = (doc: Document | ShadowRoot = document): Element | null => {
  let activeElement: Element | null = doc.activeElement;
  while (activeElement && activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
};
