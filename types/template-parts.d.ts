export class TemplateInstance extends DocumentFragment {
  constructor(template: HTMLTemplateElement, params: unknown, processor?: TemplateTypeInit);
  update(params: unknown): void;
}

type Expression = string;

type TemplateProcessCallback = (
  instance: TemplateInstance,
  parts: Iterable<[Expression, Part]>,
  params: unknown
) => void;

export type TemplateTypeInit = {
  processCallback: TemplateProcessCallback;
  createCallback?: TemplateProcessCallback;
};

export interface Part {
  value: string | null;
}

export class AttrPart implements Part {
  constructor(element: Element, attributeName: string, namespaceURI?: string);
  get attributeName(): string;
  get attributeNamespace(): string | null;
  get value(): string | null;
  set value(value: string | null);
  get element(): Element;
  get booleanValue(): boolean;
  set booleanValue(value: boolean);
}

export class ChildNodePart implements Part {
  constructor(parentNode: Element, nodes: Node[]);
  get value(): string;
  set value(string: string);
  get previousSibling(): ChildNode | null;
  get nextSibling(): ChildNode | null;
  replace(...nodes: Array<string | ChildNode>): void;
}
