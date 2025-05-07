'use client';

import MuxVideoAds from '@mux/mux-video-ads';
import React from 'react';
// keep as last import, ce-la-react is bundled.
import { createComponent } from 'ce-la-react';

export default createComponent({
  react: React,
  tagName: 'mux-video-ads',
  elementClass: MuxVideoAds,
  toAttributeName,
});

const ReactPropToAttrNameMap: Record<string, string> = {
  autoPlay: 'autoplay',
  controlsList: 'controlslist',
  crossOrigin: 'crossorigin',
  playsInline: 'playsinline',
  disablePictureInPicture: 'disablepictureinpicture',
  disableRemotePlayback: 'disableremoteplayback',
  adTagUrl: 'adtagurl',
};

function toAttributeName(propName: string) {
  if (ReactPropToAttrNameMap[propName]) {
    return ReactPropToAttrNameMap[propName];
  }
  return propName.replace(/([A-Z])/g, '-$1').toLowerCase();
}
