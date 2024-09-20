import { document } from './polyfills';
import { TemplateInstance, ChildNodePart, AttrPart, Part } from 'media-chrome/dist/media-theme-element.js';

// NOTE: These are either direct ports or significantly based off of github's jtml template part processing logic. For more, see: https://github.com/github/jtml

const eventListeners = new WeakMap<Element, Map<string, EventHandler>>();
class EventHandler {
  handleEvent!: EventListener;
  constructor(
    private element: Element,
    private type: string
  ) {
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
  static for(part: AttrPart): EventHandler {
    if (!eventListeners.has(part.element)) eventListeners.set(part.element, new Map());
    const type = part.attributeName.slice(2);
    const elementListeners = eventListeners.get(part.element);
    if (elementListeners && elementListeners.has(type)) return elementListeners.get(type) as EventHandler;
    return new EventHandler(part.element, type);
  }
}

export function processEvent(part: Part, value: unknown): boolean {
  if (part instanceof AttrPart && part.attributeName.startsWith('on')) {
    EventHandler.for(part).set(value as unknown as EventListener);
    part.element.removeAttributeNS(part.attributeNamespace, part.attributeName);
    return true;
  }
  return false;
}

function processSubTemplate(part: Part, value: unknown): boolean {
  if (value instanceof TemplateResult && part instanceof ChildNodePart) {
    value.renderInto(part);
    return true;
  }
  return false;
}

function processDocumentFragment(part: Part, value: unknown): boolean {
  if (value instanceof DocumentFragment && part instanceof ChildNodePart) {
    if (value.childNodes.length) part.replace(...value.childNodes);
    return true;
  }
  return false;
}

export function processPropertyIdentity(part: Part, value: unknown): boolean {
  if (part instanceof AttrPart) {
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

export function processElementAttribute(part: Part, value: unknown): boolean {
  // This allows us to set the media-theme template property directly.
  if (part instanceof AttrPart && value instanceof Element) {
    const element = part.element as any;
    if (element[part.attributeName] !== value) {
      part.element.removeAttributeNS(part.attributeNamespace, part.attributeName);
      element[part.attributeName] = value;
    }
    return true;
  }
  return false;
}

export function processBooleanAttribute(part: Part, value: unknown): boolean {
  if (
    typeof value === 'boolean' &&
    part instanceof AttrPart
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

export function processBooleanNode(part: Part, value: unknown): boolean {
  if (value === false && part instanceof ChildNodePart) {
    part.replace('');
    return true;
  }
  return false;
}

export function processPart(part: Part, value: unknown): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  processElementAttribute(part, value) ||
    processBooleanAttribute(part, value) ||
    processEvent(part, value) ||
    processBooleanNode(part, value) ||
    processSubTemplate(part, value) ||
    processDocumentFragment(part, value) ||
    processPropertyIdentity(part, value);
}

// The Map's data will not be garbage collected however the number of created
// templates will not exceed the html`` defined templates. This is fine.
const templates = new Map<string, HTMLTemplateElement>();
const renderedTemplates = new WeakMap<Node | ChildNodePart, HTMLTemplateElement>();
const renderedTemplateInstances = new WeakMap<Node | ChildNodePart, TemplateInstance>();
export class TemplateResult {
  public readonly stringsKey: string;

  constructor(
    public readonly strings: TemplateStringsArray,
    public readonly values: unknown[],
    public readonly processor: any
  ) {
    // Use a control character to join the expression boundaries. It should be
    // a character that is not used in the static strings so the key is unique
    // if the expressions are in a different place even tough the static strings
    // are identical.
    this.stringsKey = this.strings.join('\x01');
  }

  get template(): HTMLTemplateElement {
    if (templates.has(this.stringsKey)) {
      return templates.get(this.stringsKey) as HTMLTemplateElement;
    } else {
      const template = document.createElement('template');
      const end = this.strings.length - 1;
      template.innerHTML = this.strings.reduce((str, cur, i) => str + cur + (i < end ? `{{ ${i} }}` : ''), '');
      templates.set(this.stringsKey, template);
      return template;
    }
  }

  renderInto(element: Node | ChildNodePart): void {
    const template = this.template;
    if (renderedTemplates.get(element) !== template) {
      renderedTemplates.set(element, template);
      const instance = new TemplateInstance(template, this.values, this.processor);
      renderedTemplateInstances.set(element, instance);
      if (element instanceof ChildNodePart) {
        element.replace(...instance.children);
      } else {
        element.appendChild(instance);
      }
      return;
    }
    const templateInstance = renderedTemplateInstances.get(element);
    templateInstance?.update?.(this.values as unknown as Record<string, unknown>);
  }
}

const defaultProcessor = {
  processCallback(instance: any, parts: any, state: any) {
    if (!state) return;
    for (const [expression, part] of parts) {
      if (expression in state) {
        const value = state[expression] ?? '';
        processPart(part, value);
      }
    }
  },
};

export function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
  return new TemplateResult(strings, values, defaultProcessor);
}

export function render(result: TemplateResult, element: Node | ChildNodePart): void {
  result.renderInto(element);
}
