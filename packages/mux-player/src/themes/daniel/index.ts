// @ts-ignore
import theme from './daniel.html';
import { document, globalThis } from '../../polyfills';
import { MediaThemeElement } from 'media-chrome/dist/media-theme-element.js';

const template = document.createElement('template');
if ('innerHTML' in template) template.innerHTML = theme;

class MediaThemeDaniel extends MediaThemeElement {
  static template = template.content?.children?.[0];
}

if (!globalThis.customElements.get('media-theme-daniel')) {
  globalThis.customElements.define('media-theme-daniel', MediaThemeDaniel);
}

export default MediaThemeDaniel;
