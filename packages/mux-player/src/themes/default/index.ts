// @ts-ignore
import theme from './default.html';
import { document, globalThis } from '../../polyfills';
import { MediaThemeElement } from 'media-chrome/dist/media-theme-element.js';

const template = document.createElement('template');
if ('innerHTML' in template) template.innerHTML = theme;

class MediaThemeDefault extends MediaThemeElement {
  static template = template.content.children[0];
}

if (!globalThis.customElements.get('media-theme-default')) {
  globalThis.customElements.define('media-theme-default', MediaThemeDefault);
}

export default MediaThemeDefault;
