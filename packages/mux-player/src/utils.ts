export function stylePropsToString(props: any) {
  let style = "";
  Object.entries(props).forEach(([key, value]) => {
    style += `${kebabCase(key)}: ${value};`;
  });
  return style;
}

export function kebabCase(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

let idCounter = 0;
export function uniqueId(prefix: string) {
  var id = ++idCounter;
  return `${prefix}${id}`;
}

/**
 * A tagged template literal to easily create DOM from a template string.
 *
 * It adds the concept of a persistent fragment which is also returned
 * as the result. This makes it possible to use DOM nodes as an expression in
 * the template literal and be appended in the place of the expression.
 */
export function html(
  strings: TemplateStringsArray,
  ...args: Array<
    string | number | Node | Renderable | PersistentFragment | null | undefined
  >
) {
  const uid = uniqueId("");
  const fragments: any = [];
  // Add placeholder divs with unqiue id for the fragments.
  args = args.map((arg) => {
    if (arg && typeof arg === "object") {
      return `<div id="_${uid}${fragments.push(arg)}"></div>`;
    }
    return arg;
  });

  const templateString = String.raw(strings, ...args)
    .replace(/>\n+/g, ">")
    .replace(/\s+</g, "<")
    .replace(/>\s+/g, ">");
  const compiler = document.createElement("template");
  compiler.innerHTML = templateString;

  const childFragments = fragments.map((fragment: any, i: number) => {
    const { id, template, props } = fragment;
    if (fragment instanceof Renderable) {
      // If it's a renderable, render once and upgrade to a renderable fragment.
      const persistentFragment = template(props) || html``;
      fragment = new RenderableFragment(
        persistentFragment.childNodes,
        persistentFragment.childFragments,
        template
      );
    }
    fragment.id = id || i;
    return fragment;
  });

  // Replace the placeholders with the fragments.
  childFragments.forEach((fragment: any, i: number) => {
    const df = new DocumentFragment();
    if (fragment instanceof PersistentFragment) {
      df.append(...fragment.childNodes);
    } else {
      // Could be a Node or any other object.
      df.append(fragment);
    }
    const placeholder = compiler.content.querySelector(`#_${uid}${i + 1}`);
    placeholder?.parentNode?.replaceChild(df, placeholder);
  });

  return new PersistentFragment(compiler.content.childNodes, childFragments);
}

export class PersistentFragment {
  childFragments: PersistentFragment[];
  _cachedChildNodes: Node[];
  _mark: Text;
  id?: string;

  /**
   * Create a new PersistentFragment.
   * A normal DocumentFragment loses its children when appended to the document.
   * PersistentFragment keeps track of its children and makes them easy to replace.
   */
  constructor(childNodes: NodeList, childFragments: PersistentFragment[]) {
    this.childFragments = childFragments;
    this._cachedChildNodes = [...childNodes];
    this._mark = new Text();
    this.id = undefined;
  }

  /**
   * Return a map with child fragments.
   */
  get fragments(): Record<string, RenderableFragment> {
    let map: Record<string, RenderableFragment> = {};
    for (let frag of this.childFragments) {
      if (frag.id) map[frag.id] = frag as RenderableFragment;
    }
    return map;
  }

  get childNodes() {
    return [this._mark, ...this._cachedChildNodes];
  }

  replaceChildren(...nodesOrDOMStrings: Node[]) {
    const childNodes = this._cachedChildNodes;
    this._cachedChildNodes = [...nodesOrDOMStrings];

    childNodes.forEach((n) => n.parentNode?.removeChild(n));

    let next = this._mark.nextSibling;
    nodesOrDOMStrings.forEach((node) =>
      this._mark?.parentNode?.insertBefore(node, next)
    );
  }
}

export class RenderableFragment extends PersistentFragment {
  template: Function;

  /**
   * Create a new RenderableFragment.
   * The problem RenderableFragment solves is to be able to define inline
   * render functions in the template literal and then later re-render those
   * by just passing props.
   */
  constructor(
    childNodes: NodeList,
    childFragments: PersistentFragment[],
    template: Function
  ) {
    super(childNodes, childFragments);
    this.template = template;
  }

  render(props: any) {
    const newFragment = this.template(props) || html``;
    this.childFragments = newFragment.childFragments;
    this.replaceChildren(...newFragment.childNodes);
    return this;
  }
}

/**
 * Creates a fragment in the dom that can easily be replaced by running the
 * render method of the returned renderable fragment reference.
 */
export function renderable(id: string, template: Function, props: any) {
  return new Renderable(id, template, props);
}

class Renderable {
  id: string;
  template: Function;
  props: any;

  constructor(id: string, template: Function, props: any) {
    this.id = id;
    this.template = template;
    this.props = props;
  }
}
