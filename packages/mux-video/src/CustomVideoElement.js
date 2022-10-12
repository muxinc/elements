import { globalThis, document } from 'shared-polyfills';
import 'castable-video';

/**
 * Custom Video Element
 * The goal is to create an element that works just like the video element
 * but can be extended/sub-classed, because native elements cannot be
 * extended today across browsers.
 */

// The onevent like props are weirdly set on the HTMLElement prototype with other
// generic events making it impossible to pick these specific to HTMLMediaElement.
export const VideoEvents = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  'waitingforkey',
  'resize',
  'enterpictureinpicture',
  'leavepictureinpicture',
  'castchange',
  'entercast',
  'leavecast',
];

const template = document.createElement('template');
// Could you get styles to apply by passing a global button from global to shadow?

template.innerHTML = `
<style>
  :host {
    display: inline-block;
    line-height: 0;
    width: auto;
    height: auto;
  }

  video {
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;
    object-fit: var(--media-object-fit, contain);
    object-position: var(--media-object-position, 50% 50%);
  }
</style>
<video is="castable-video" part="video" crossorigin></video>
<slot></slot>
`;

class CustomVideoElement extends globalThis.HTMLElement {
  #isInit;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // If the custom element is defined before the <custom-video> HTML is parsed
    // no attributes will be available in the constructor (construction process).
    // Wait until initializing attributes in the attributeChangedCallback.
    // If this element is connected to the DOM, the attributes will be available.
    if (this.isConnected) {
      this.#init();
    }
  }

  #init() {
    if (this.#isInit) return;
    this.#isInit = true;

    this.shadowRoot.append(template.content.cloneNode(true));
    this.nativeEl = this.shadowRoot.querySelector('video');

    // The video events are dispatched on the CustomVideoElement instance.
    // This makes it possible to add event listeners before the element is upgraded.
    VideoEvents.forEach((type) => {
      this.nativeEl.addEventListener(type, (evt) => {
        this.dispatchEvent(new CustomEvent(evt.type, { detail: evt.detail }));
      });
    });

    // An unnamed <slot> will be filled with all of the custom element's
    // top-level child nodes that do not have the slot attribute.
    const slotEl = this.shadowRoot.querySelector('slot');
    slotEl.addEventListener('slotchange', () => {
      slotEl.assignedElements().forEach((el) => {
        if (!['track', 'source'].includes(el.localName)) return;
        this.nativeEl.append(el);
      });
    });

    // Initialize all the attribute properties
    // This is required before attributeChangedCallback is called after construction
    // so the initial state of all the attributes are forwarded to the native element.
    // Don't call attributeChangedCallback directly here because the extending class
    // could have overridden attributeChangedCallback leading to unexpected results.
    Array.prototype.forEach.call(this.attributes, (attrNode) => {
      this.#forwardAttribute(attrNode.name, null, attrNode.value);
    });

    // Neither Chrome or Firefox support setting the muted attribute
    // after using document.createElement.
    // One way to get around this would be to build the native tag as a string.
    // But just fixing it manually for now.
    // Apparently this may also be an issue with <input checked> for buttons
    if (this.nativeEl.defaultMuted) {
      this.nativeEl.muted = true;
    }
  }

  // observedAttributes is required to trigger attributeChangedCallback
  // for any attributes on the custom element.
  // Attributes need to be the lowercase word, e.g. crossorigin, not crossOrigin
  static get observedAttributes() {
    let attrs = [];

    const kebabCase = (name) => {
      return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };

    // Instead of manually creating a list of all observed attributes, observe
    // any getter/setter prop name (lowercase or kebab-case for custom builtins)
    Object.getOwnPropertyNames(this.prototype).forEach((propName) => {
      let isFunc = false;

      // Non-func properties throw errors because it's not an instance
      try {
        if (typeof this.prototype[propName] === 'function') {
          isFunc = true;
        }
      } catch (e) {}

      // Exclude functions and constants
      if (!isFunc && propName !== propName.toUpperCase()) {
        attrs.push(propName.toLowerCase(), kebabCase(propName));
      }
    });

    // Include any attributes from the super class (recursive)
    const supAttrs = Object.getPrototypeOf(this).observedAttributes;

    if (supAttrs) {
      attrs = attrs.concat(supAttrs);
    }

    return attrs;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // Initialize right after construction when the attributes become available.
    this.#init();

    this.#forwardAttribute(attrName, oldValue, newValue);
  }

  // We need to handle sub-class custom attributes differently from
  // attrs meant to be passed to the internal native el.
  #forwardAttribute(attrName, oldValue, newValue) {
    // Find the matching prop for custom attributes
    const ownProps = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const propName = arrayFindAnyCase(ownProps, attrName);

    // Check if this is the original custom native elemnt or a subclass
    const isBaseElement = Object.getPrototypeOf(this.constructor).toString().indexOf('function HTMLElement') === 0;

    // If this is a subclass custom attribute we want to set the
    // matching property on the subclass
    if (propName && !isBaseElement) {
      // Boolean props should never start as null
      if (typeof this[propName] == 'boolean') {
        // null is returned when attributes are removed i.e. boolean attrs
        if (newValue === null) {
          this[propName] = false;
        } else {
          // The new value might be an empty string, which is still true
          // for boolean attributes
          this[propName] = true;
        }
      } else {
        this[propName] = newValue;
      }
    } else {
      // When this is the original Custom Element, or the subclass doesn't
      // have a matching prop, pass it through.
      if (newValue === null) {
        this.nativeEl.removeAttribute(attrName);
      } else {
        // Ignore a few that don't need to be passed through just in case
        // it creates unexpected behavior.
        if (['id', 'class'].indexOf(attrName) === -1) {
          this.nativeEl.setAttribute(attrName, newValue);
        }
      }
    }
  }

  connectedCallback() {
    this.#init();
  }
}

// Map all native element properties to the custom element
// so that they're applied to the native element.
// Skipping HTMLElement because of things like "attachShadow"
// causing issues. Most of those props still need to apply to
// the custom element.
let nativeElProps = [];

// Can't check typeof directly on element prototypes without
// throwing Illegal Invocation errors, so creating an element
// to check on instead.
const nativeElTest = document.createElement('video', {
  is: 'castable-video',
});

// Deprecated props throw warnings if used, so exclude them
const deprecatedProps = ['webkitDisplayingFullscreen', 'webkitSupportsFullscreen'];

// Walk the prototype chain up to HTMLElement.
// This will grab all super class props in between.
// i.e. VideoElement and MediaElement
for (
  let proto = Object.getPrototypeOf(nativeElTest);
  proto && proto !== globalThis.HTMLElement.prototype;
  proto = Object.getPrototypeOf(proto)
) {
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (deprecatedProps.indexOf(key) === -1) {
      nativeElProps.push(key);
    }
  });
}

// Passthrough native el functions from the custom el to the native el
nativeElProps.forEach((prop) => {
  if (prop in CustomVideoElement.prototype) return;

  const type = typeof nativeElTest[prop];
  if (type == 'function') {
    // Function
    CustomVideoElement.prototype[prop] = function () {
      return this.nativeEl[prop].apply(this.nativeEl, arguments);
    };
  } else {
    // Getter
    let config = {
      get() {
        return this.nativeEl[prop];
      },
    };

    if (prop !== prop.toUpperCase()) {
      // Setter (not a CONSTANT)
      config.set = function (val) {
        this.nativeEl[prop] = val;
      };
    }

    Object.defineProperty(CustomVideoElement.prototype, prop, config);
  }
});

function arrayFindAnyCase(arr, word) {
  let found = null;

  arr.forEach((item) => {
    if (item.toLowerCase() == word.toLowerCase()) {
      found = item;
    }
  });

  return found;
}

if (!globalThis.customElements.get('custom-video')) {
  globalThis.customElements.define('custom-video', CustomVideoElement);
  globalThis.CustomVideoElement = CustomVideoElement;
}

export default CustomVideoElement;
