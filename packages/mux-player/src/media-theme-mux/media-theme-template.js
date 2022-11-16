import { globalThis } from 'shared-polyfills';
import { MediaTheme } from 'media-chrome';
import { InnerTemplatePart, TemplateInstance, AttrPart } from '../template-parts.js';

class MediaThemeTemplate extends MediaTheme {
  constructor() {
    super();
  }

  connectedCallback() {
    this.template = this.getRootNode().querySelector(`#${this.getAttribute('template')}`);

    if (this.template) {
      this.templateInstance = new TemplateInstance(this.template, this.props, mediaThemeProcessor);
      this.shadowRoot.append(this.templateInstance);
    }

    const observer = new MutationObserver(() => this.render());
    observer.observe(this, { attributes: true });
  }

  get props() {
    const props = {};
    for (let attr of this.attributes) {
      if (attr.value != null) {
        props[camelCase(attr.name)] = attr.value === '' ? true : attr.value;
      } else {
        props[camelCase(attr.name)] = false;
      }
    }
    return props;
  }

  render() {
    this.templateInstance?.update(this.props);
  }
}

const camelCase = (name) => {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
};

const operators = {
  // Filters concept like Nunjucks or Liquid.
  '|': {
    string: (value) => String(value),
  },
  // Same as nullish coalesce operator in JS.
  '??': (value, defaults) => value ?? defaults,
};

class PartialDirective {
  constructor(template) {
    this.template = template;
  }
}

const getValue = (raw, state) => {
  const firstChar = raw[0];
  const lastChar = raw.slice(-1);
  if (firstChar === lastChar && [`'`, `"`].includes(firstChar)) {
    // string
    return raw.slice(1, -1);
  }
  if (isNumeric(raw)) return raw; // number value
  else return state[raw]; // variable name
};

function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const mediaThemeProcessor = {
  processCallback(instance, parts, state) {
    if (!state) return;
    for (const [expression, part] of parts) {
      if (part instanceof InnerTemplatePart) {
        switch (part.directive) {
          case 'partial': {
            state[expression] = new PartialDirective(part.template);
            break;
          }
          case 'layout': {
            if (state.layout === part.expression) {
              part.replace(new TemplateInstance(part.template, state, mediaThemeProcessor));
            } else {
              part.replace('');
            }
            break;
          }
          case 'if':
            if (state[part.expression]) {
              part.replace(new TemplateInstance(part.template, state, mediaThemeProcessor));
            } else {
              part.replace('');
            }
            break;
        }
        continue;
      }

      const [, name, rest] = expression.match(/(\w+)\s*(.*)/) ?? [];
      let value = state[name];

      // Adds support for:
      //   - filters (pipe char followed by function) e.g. {{ myVar | string }}
      //   - nullish coalesce operator e.g. {{ nilVar ?? 'fallback' }}
      const [, operator, modifier] = rest.match(/^(\?\?|\|)?\s*(['"\w]*)/) ?? [];
      const op = operators[operator];
      if (typeof op === 'function') {
        value = op(value, getValue(modifier, state));
      } else if (op && value != null) {
        const modify = op[modifier];
        if (modify) value = modify(value);
      }

      if (name in state) {
        if (value instanceof PartialDirective) {
          const localState = { ...state };
          // Adds support for params e.g. {{PlayButton section="center"}}
          const matches = expression.matchAll(/(\w+)\s*=\s*(['"\w]*)/g);
          for (let [, paramName, paramValue] of matches) {
            localState[paramName] = getValue(paramValue, state);
          }
          value = new TemplateInstance(value.template, localState, mediaThemeProcessor);
        }

        // boolean attr
        if (
          typeof value === 'boolean' &&
          part instanceof AttrPart
          // typeof part.element[part.attributeName] === 'boolean'
        ) {
          part.booleanValue = value;
        } else if (typeof value === 'function' && part instanceof AttrPart) {
          part.element[part.attributeName] = value;
        } else {
          part.value = value;
        }
      } else {
        if (
          part instanceof AttrPart
          // typeof part.element[part.attributeName] === 'boolean'
          // media-play-button doesn't have `disabled` props so can't test
        ) {
          // console.warn(expression, name, value);
          if (value) {
            if (
              typeof value === 'boolean' &&
              part instanceof AttrPart
              // typeof part.element[part.attributeName] === 'boolean'
            ) {
              part.booleanValue = value;
            } else if (typeof value === 'function' && part instanceof AttrPart) {
              part.element[part.attributeName] = value;
            } else {
              part.value = value;
            }
          } else {
            part.booleanValue = false;
          }
        }
      }
    }
  },
};

export default MediaThemeTemplate;

if (!globalThis.customElements.get('media-theme-template')) {
  globalThis.customElements.define('media-theme-template', MediaThemeTemplate);
}
