import './dom-polyfills';
import { TemplateInstance, NodeTemplatePart, createProcessor, AttributeTemplatePart } from '@github/template-parts';
import type { TemplatePart, TemplateTypeInit } from '@github/template-parts';
// NOTE: These are either direct ports or significantly based off of github's jtml template part processing logic. For more, see: https://github.com/github/jtml

const eventListeners = new WeakMap<Element, Map<string, EventHandler>>();
class EventHandler {
  handleEvent!: EventListener;
  constructor(private element: Element, private type: string) {
    this.element.addEventListener(this.type, this);
    eventListeners.get(this.element)!.set(this.type, this);
  }
  set(listener: EventListener) {
    if (typeof listener == 'function') {
      this.handleEvent = listener.bind(this.element);
    } else if (typeof listener === 'object' && typeof (listener as EventHandler).handleEvent === 'function') {
      this.handleEvent = (listener as EventHandler).handleEvent.bind(listener);
    } else {
      this.element.removeEventListener(this.type, this);
      eventListeners.get(this.element)!.delete(this.type);
    }
  }
  static for(part: AttributeTemplatePart): EventHandler {
    if (!eventListeners.has(part.element)) eventListeners.set(part.element, new Map());
    const type = part.attributeName.slice(2);
    const elementListeners = eventListeners.get(part.element)!;
    if (elementListeners.has(type)) return elementListeners.get(type)!;
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
      return templates.get(this.strings)!;
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
    renderedTemplateInstances.get(element)!.update(this.values as unknown as Record<string, unknown>);
  }
}

const defaultProcessor = createProcessor(processPart);
export function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
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
