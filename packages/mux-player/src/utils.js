/**
 * A tagged template literal to easily create DOM from a template string.
 *
 * It adds the concept of a persistent fragment which is also returned
 * as the result. This makes it possible to use DOM nodes as an expression in
 * the template literal and be appended in the place of the expression.
 *
 * @param  {string[]} strings
 * @param  {...[*]} args
 * @return {PersistentFragment}
 */
export function html(strings, ...args) {
  const uid = uniqueId("");
  const fragments = [];
  // Add placeholder divs with unqiue id for the fragments.
  args = args.map((arg) => {
    if (typeof arg === "object") {
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

  const childFragments = fragments.map((fragment, i) => {
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
  childFragments.forEach((fragment, i) => {
    const df = new DocumentFragment();
    if (fragment instanceof PersistentFragment) {
      df.append(...fragment.childNodes);
    } else {
      // Could be a Node or any other object.
      df.append(fragment);
    }
    const placeholder = compiler.content.querySelector(`#_${uid}${i + 1}`);
    placeholder.parentNode.replaceChild(df, placeholder);
  });

  return new PersistentFragment(compiler.content.childNodes, childFragments);
}

class PersistentFragment {
  /**
   * Create a new PersistentFragment.
   * A normal DocumentFragment loses its children when appended to the document.
   * PersistentFragment keeps track of its children and makes them easy to replace.
   *
   * @param  {Node[]} childNodes
   * @param  {PersistentFragment[]} childFragments
   */
  constructor(childNodes, childFragments) {
    this.childFragments = childFragments;
    this._cachedChildNodes = [...childNodes];
    this._mark = new Text();
    this.id = undefined;
  }

  /**
   * Return a map with child fragments.
   * @return {Object.<string, PersistentFragment>}
   */
  get fragments() {
    let map = {};
    for (let frag of this.childFragments) map[frag.id] = frag;
    return map;
  }

  get childNodes() {
    return [this._mark, ...this._cachedChildNodes];
  }

  replaceChildren(...nodesOrDOMStrings) {
    const childNodes = this._cachedChildNodes;
    this._cachedChildNodes = [...nodesOrDOMStrings];

    childNodes.forEach((n) => n.remove());
    let next = this._mark.nextSibling;
    nodesOrDOMStrings.forEach((node) =>
      this._mark.parentNode.insertBefore(node, next)
    );
  }
}

class RenderableFragment extends PersistentFragment {
  /**
   * Create a new RenderableFragment.
   * The problem RenderableFragment solves is to be able to define inline
   * render functions in the template literal and then later re-render those
   * by just passing props.
   * @param  {Node[]} childNodes
   * @param  {PersistentFragment[]} childFragments
   * @param  {(props?: Object) => PersistentFragment} template
   */
  constructor(childNodes, childFragments, template) {
    super(childNodes, childFragments);
    this.template = template;
  }

  render(props) {
    const newFragment = this.template(props) || html``;
    this.childFragments = newFragment.childFragments;
    this.replaceChildren(...newFragment.childNodes);
    return this;
  }
}

/**
 * Creates a fragment in the dom that can easily be replaced by running the
 * render method of the returned renderable fragment reference.
 * @param  {string}   id
 * @param  {Function} template
 * @param  {Object}   props
 * @return {Renderable}
 */
export function renderable(id, template, props) {
  return new Renderable(id, template, props);
}

class Renderable {
  constructor(id, template, props) {
    this.id = id;
    this.template = template;
    this.props = props;
  }
}

export function stylePropsToString(props) {
  let style = "";
  Object.entries(props).forEach(([key, value]) => {
    style += `${kebabCase(key)}: ${value};`;
  });
  return style;
}

export function kebabCase(name) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

let idCounter = 0;
export function uniqueId(prefix) {
  var id = ++idCounter;
  return `${prefix}${id}`;
}
