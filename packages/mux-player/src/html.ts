import { TemplateInstance, NodeTemplatePart, createProcessor, AttributeTemplatePart } from '@github/template-parts';
import type { TemplatePart, TemplateTypeInit } from '@github/template-parts';

// NOTE: These are either direct ports or significantly based off of github's jtml template part processing logic. For more, see: https://github.com/github/jtml

const eventListeners = new WeakMap<Element, Map<string, EventHandler>>();
class EventHandler {
  handleEvent!: EventListener;
  constructor(private element: Element, private type: string) {
    this.element.addEventListener(this.type, this);
    const elementMap = eventListeners.get(this.element);
    if (elementMap) {
      elementMap.set(this.type, this);
    }
  }
  set(listener: EventListener) {
    if (typeof listener == 'function') {
      this.handleEvent = listener.bind(this.element);
    } else if (typeof listener === 'object' && typeof (listener as EventHandler).handleEvent === 'function') {
      this.handleEvent = (listener as EventHandler).handleEvent.bind(listener);
    } else {
      this.element.removeEventListener(this.type, this);
      const elementMap = eventListeners.get(this.element);
      if (elementMap) {
        elementMap.delete(this.type);
      }
    }
  }
  static for(part: AttributeTemplatePart): EventHandler {
    if (!eventListeners.has(part.element)) eventListeners.set(part.element, new Map());
    const type = part.attributeName.slice(2);
    const elementListeners = eventListeners.get(part.element);
    if (elementListeners && elementListeners.has(type)) return elementListeners.get(type) as EventHandler;
    return new EventHandler(part.element, type);
  }
}

export function processEvent(part: TemplatePart, value: unknown): boolean {
  if (part instanceof AttributeTemplatePart && part.attributeName.startsWith('on')) {
    EventHandler.for(part).set(value as unknown as EventListener);
    part.element.removeAttributeNS(part.attributeNamespace, part.attributeName);
    return true;
  }
  return false;
}

function processSubTemplate(part: TemplatePart, value: unknown): boolean {
  if (value instanceof TemplateResult && part instanceof NodeTemplatePart) {
    value.renderInto(part);
    return true;
  }
  return false;
}

function processDocumentFragment(part: TemplatePart, value: unknown): boolean {
  if (value instanceof DocumentFragment && part instanceof NodeTemplatePart) {
    if (value.childNodes.length) part.replace(...value.childNodes);
    return true;
  }
  return false;
}

export function processPropertyIdentity(part: TemplatePart, value: unknown): boolean {
  if (part instanceof AttributeTemplatePart) {
    const ns = part.attributeNamespace;
    const oldValue = part.element.getAttributeNS(ns, part.attributeName);
    if (String(value) !== oldValue) {
      part.value = String(value);
    }
    return true;
  }
  part.value = String(value);
  return true;
}

export function processBooleanAttribute(part: TemplatePart, value: unknown): boolean {
  if (
    typeof value === 'boolean' &&
    part instanceof AttributeTemplatePart
    // can't use this because on custom elements the props are always undefined
    // typeof part.element[part.attributeName as keyof Element] === 'boolean'
  ) {
    const ns = part.attributeNamespace;
    const oldValue = part.element.hasAttributeNS(ns, part.attributeName);
    if (value !== oldValue) {
      part.booleanValue = value;
    }
    return true;
  }
  return false;
}

export function processBooleanNode(part: TemplatePart, value: unknown): boolean {
  if (value === false && part instanceof NodeTemplatePart) {
    part.replace('');
    return true;
  }
  return false;
}

export function processPart(part: TemplatePart, value: unknown): void {
  processBooleanAttribute(part, value) ||
    processEvent(part, value) ||
    processBooleanNode(part, value) ||
    processSubTemplate(part, value) ||
    processDocumentFragment(part, value) ||
    processPropertyIdentity(part, value);
}

const templates = new WeakMap<TemplateStringsArray, HTMLTemplateElement>();
const renderedTemplates = new WeakMap<Node | NodeTemplatePart, HTMLTemplateElement>();
const renderedTemplateInstances = new WeakMap<Node | NodeTemplatePart, TemplateInstance>();
export class TemplateResult {
  constructor(
    public readonly strings: TemplateStringsArray,
    public readonly values: unknown[],
    public readonly processor: TemplateTypeInit
  ) {}

  get template(): HTMLTemplateElement {
    if (templates.has(this.strings)) {
      return templates.get(this.strings) as HTMLTemplateElement;
    } else {
      const template = document.createElement('template');
      const end = this.strings.length - 1;
      template.innerHTML = this.strings.reduce((str, cur, i) => str + cur + (i < end ? `{{ ${i} }}` : ''), '');
      templates.set(this.strings, template);
      return template;
    }
  }

  renderInto(element: Node | NodeTemplatePart): void {
    const template = this.template;
    if (renderedTemplates.get(element) !== template) {
      renderedTemplates.set(element, template);
      const instance = new TemplateInstance(template, this.values, this.processor);
      renderedTemplateInstances.set(element, instance);
      if (element instanceof NodeTemplatePart) {
        element.replace(...instance.children);
      } else {
        element.appendChild(instance);
      }
      return;
    }
    const templateInstance = renderedTemplateInstances.get(element);
    if (templateInstance) {
      templateInstance.update(this.values as unknown as Record<string, unknown>);
    }
  }
}

const stringsCache = new Map();
const defaultProcessor = createProcessor(processPart);
export function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
  const staticStrings: any = [''];
  const dynamicValues: any[] = [];
  let staticValues;
  let hasStatics = false;

  // Here the unsafe static values are moved from the string expressions
  // to the static strings so they can be used in the cache key and later
  // be used to generate the HTML via the <template> element.
  const join = (strs: TemplateStringsArray, vals: any[] = []) => {
    staticStrings[staticStrings.length - 1] = staticStrings[staticStrings.length - 1] + strs[0];

    vals.forEach((dynamicValue, i) => {
      if ((staticValues = dynamicValue?.$static$) !== undefined) {
        staticValues.forEach((staticValue: TemplateResult) => {
          join(staticValue.strings, staticValue.values);
        });

        staticStrings[staticStrings.length - 1] = staticStrings[staticStrings.length - 1] + strs[i + 1];
        hasStatics = true;
      } else {
        dynamicValues.push(dynamicValue);
        staticStrings.push(strs[i + 1]);
      }
    });
  };

  join(strings, values);

  if (hasStatics) {
    // Tagged template literals with the same static strings return the same
    // TemplateStringsArray, aka they are cached. emulate this behavior w/ a Map.
    const key = staticStrings.join('$$html$$');
    strings = stringsCache.get(key);
    if (strings === undefined) {
      (staticStrings as any).raw = staticStrings;
      stringsCache.set(key, (strings = staticStrings));
    }
    values = dynamicValues;
  }

  return new TemplateResult(strings, values, defaultProcessor);
}

export function render(result: TemplateResult, element: Node | NodeTemplatePart): void {
  result.renderInto(element);
}

export function createTemplateInstance(content: string, props?: any) {
  const template = document.createElement('template');
  template.innerHTML = content;
  return new TemplateInstance(template, props);
}

export const unsafeStatic = (...values: any[]) => ({
  ['$static$']: values.map((value) => {
    if (value instanceof TemplateResult) return value;
    // Only allow word characters and dashes for security.
    if (!/\w-/.test(value)) return { strings: [] };
    return { strings: [value] };
  }),
});
