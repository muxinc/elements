import {
  TemplateInstance,
  NodeTemplatePart,
  createProcessor,
  AttributeTemplatePart,
} from "@github/template-parts";
import type { TemplatePart, TemplateTypeInit } from "@github/template-parts";

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

export function processPropertyIdentity(
  part: TemplatePart,
  value: unknown
): boolean {
  part.value = String(value);
  return true;
}

export function processBooleanAttribute(
  part: TemplatePart,
  value: unknown
): boolean {
  if (
    typeof value === "boolean" &&
    part instanceof AttributeTemplatePart
    // can't use this because on custom elements the props are always undefined
    // typeof part.element[part.attributeName as keyof Element] === 'boolean'
  ) {
    part.booleanValue = value;
    return true;
  }
  return false;
}

export function processPart(part: TemplatePart, value: unknown): void {
  processBooleanAttribute(part, value) ||
    processSubTemplate(part, value) ||
    processDocumentFragment(part, value) ||
    processPropertyIdentity(part, value);
}

const templates = new WeakMap<TemplateStringsArray, HTMLTemplateElement>();
const renderedTemplates = new WeakMap<
  Node | NodeTemplatePart,
  HTMLTemplateElement
>();
const renderedTemplateInstances = new WeakMap<
  Node | NodeTemplatePart,
  TemplateInstance
>();
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
      const template = document.createElement("template");
      const end = this.strings.length - 1;
      template.innerHTML = this.strings.reduce(
        (str, cur, i) => str + cur + (i < end ? `{{ ${i} }}` : ""),
        ""
      );
      templates.set(this.strings, template);
      return template;
    }
  }

  renderInto(element: Node | NodeTemplatePart): void {
    const template = this.template;
    if (renderedTemplates.get(element) !== template) {
      renderedTemplates.set(element, template);
      const instance = new TemplateInstance(
        template,
        this.values,
        this.processor
      );
      renderedTemplateInstances.set(element, instance);
      if (element instanceof NodeTemplatePart) {
        element.replace(...instance.children);
      } else {
        element.appendChild(instance);
      }
      return;
    }
    renderedTemplateInstances
      .get(element)!
      .update(this.values as unknown as Record<string, unknown>);
  }
}

const defaultProcessor = createProcessor(processPart);
export function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): TemplateResult {
  return new TemplateResult(strings, values, defaultProcessor);
}

export function render(
  result: TemplateResult,
  element: Node | NodeTemplatePart
): void {
  result.renderInto(element);
}
