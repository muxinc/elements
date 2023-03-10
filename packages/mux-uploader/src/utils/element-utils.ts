import type MuxUploaderElement from '../mux-uploader';

export const closestComposedNode = (childNode: Element, selector: string): HTMLElement | null => {
  if (!childNode) return null;
  const closest = childNode.closest<HTMLElement>(selector);
  if (closest) return closest;
  return closestComposedNode((childNode.getRootNode() as ShadowRoot).host, selector);
};

export const getMuxUploaderEl = (controlEl: Element): MuxUploaderElement | null => {
  const muxUploaderId = controlEl.getAttribute('mux-uploader');
  if (muxUploaderId) {
    return document.getElementById(muxUploaderId) as MuxUploaderElement;
  }
  return closestComposedNode(controlEl, 'mux-uploader') as MuxUploaderElement;
};
