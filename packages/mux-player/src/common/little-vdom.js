// Adapted and fixed bugs from little-vdom.js
// https://gist.github.com/developit/2038b141b31287faa663f410b6649a87
// https://gist.github.com/marvinhagemeister/8950b1032d67918d21950b3985259d78
// Added refs, style maps

const h = (type, props, ...children) => {
  return {
    _type: type,
    _props: props, // An object for components and DOM nodes, a string for text nodes.
    _children: children.filter((_) => _ !== false),
    key: props && props.key,
  };
};

const Fragment = (props) => {
  return props.children;
};

const render = (newVNode, dom, oldVNode = dom._vnode || (dom._vnode = {})) => {
  return diff(h(Fragment, {}, [newVNode]), dom, oldVNode);
};

const diff = (newVNode, dom, oldVNode, currentChildIndex) => {
  // Check if we are in fact dealing with an array of nodes. A more common
  // and faster version of this check is Array.isArray()
  if (newVNode.pop) {
    return diffChildren(dom, newVNode, oldVNode);
  }
  // Check if we have a component. Only functions have a .call() method.
  // Here components have a different signature compared to Preact or React:
  //
  // (props, state, updateFn) => VNode;
  //
  // The 3rd argument is basically similar concept-wise to setState
  else if (newVNode._type.call) {
    // Initialize state of component if necessary
    newVNode._state = oldVNode._state || {};
    // Add children to props
    const props = { children: newVNode._children, ...newVNode._props };
    const renderResult = newVNode._type(
      props,
      newVNode._state,
      // Updater function that is passed as 3rd argument to components
      (nextState) => {
        // Update state with new value
        Object.assign(newVNode._state, nextState);
        return diff(newVNode, dom, newVNode);
      }
    );

    newVNode._patched = diff(
      renderResult,
      dom,
      (oldVNode && oldVNode._patched) || {},
      currentChildIndex
    );

    return (dom._vnode = newVNode);
  }
  // Standard DOM elements
  else {
    // Create a DOM element and assign it to the vnode. If one already exists,
    // we will reuse the existing one and not create a new node.
    const newDom =
      oldVNode.dom ||
      (newVNode._type
        ? document.createElement(newVNode._type)
        : // If we have a text node, vnode.props will be a string
          new Text(newVNode._props));

    // diff props
    if (newVNode._props != oldVNode._props) {
      // If newVNode.type is truthy (=not an empty string) we have a DOM node
      if (newVNode._type) {
        const { key, ref, ...newProps } = newVNode._props;
        if (ref) ref.current = newDom;

        for (let name in newProps) {
          const value = newProps[name];

          // A string object has a trim method.
          if (name === "style" && !value.trim) {
            for (const n in value) {
              newDom.style[n] = value[n];
            }
          } else if (value != (oldVNode._props && oldVNode._props[name])) {
            if (name in newDom || (name = name.toLowerCase()) in newDom) {
              newDom[name] = value;
            } else if (value != null) {
              newDom.setAttribute(name, value);
            } else {
              newDom.removeAttribute(name);
            }
          }
        }
      }
      // Otherwise a text node
      else {
        // Update text node content
        newDom.data = newVNode._props;
      }
    }

    // diff children (typed/keyed)
    diffChildren(newDom, newVNode._children, oldVNode);

    // insert at position
    if (!oldVNode.dom || currentChildIndex != undefined) {
      dom.insertBefore(
        (newVNode.dom = newDom),
        dom.childNodes[currentChildIndex + 1] || null
      );
    }

    return (dom._vnode = Object.assign(oldVNode, newVNode));
  }
};

const diffChildren = (parentDom, newChildren, oldVNode) => {
  const oldChildren = oldVNode._normalizedChildren || [];
  oldVNode._normalizedChildren = newChildren.concat
    .apply([], newChildren)
    .map((child, index) => {
      // If the vnode has no children we assume that we have a string and
      // convert it into a text vnode.
      const nextNewChild = child._children ? child : h("", "" + child);

      // If we have previous children we search for one that matches our
      // current vnode.
      const nextOldChild =
        oldChildren.find((oldChild, childIndex) => {
          let result =
            oldChild &&
            oldChild._type == nextNewChild._type &&
            oldChild.key == nextNewChild.key &&
            (childIndex == index && (index = undefined),
            (oldChildren[childIndex] = 0),
            oldChild);
          // if (result) console.log('found vnode', result);
          return result;
        }) || {};

      // Continue diffing recursively against the next child.
      return diff(nextNewChild, parentDom, nextOldChild, index);
    });

  // remove old children if there are any
  oldChildren.map((oldChild) => {
    const node = (oldChild._patched && oldChild._patched.dom) || oldChild.dom;
    if (node) {
      node.remove();
    }
  });

  return oldVNode;
};

export { h, Fragment, render };
