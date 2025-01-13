// @ts-ignore
import theme from './gerwig.html';
import { document, globalThis } from '../../polyfills';
import { MediaThemeElement } from 'media-chrome/dist/media-theme-element.js';
import 'media-chrome/dist/menu';

const template = document.createElement('template');
if ('innerHTML' in template) template.innerHTML = theme;

class MediaThemeGerwig extends MediaThemeElement {
  static template = template.content?.children?.[0] as HTMLTemplateElement;
}

if (!globalThis.customElements.get('media-theme-gerwig')) {
  globalThis.customElements.define('media-theme-gerwig', MediaThemeGerwig);
}

export default MediaThemeGerwig;
