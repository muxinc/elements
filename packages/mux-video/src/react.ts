'use client';

import MuxVideoElement from '@mux/mux-video';
import React from 'react';
// keep as last import, ce-la-react is bundled.
import { createComponent } from 'ce-la-react';

const MuxVideo = createComponent({
  react: React,
  tagName: 'mux-video',
  displayName: 'MuxVideo',
  elementClass: MuxVideoElement,
  toAttributeName,
});

type MuxVideoProps = React.ComponentProps<typeof MuxVideo>;

/**
 * `disable-cookies` is an observed attribute, so ce-la-react renders it as an attribute — and React
 * never reconciles attributes during hydration, it only warns that the mismatch "won't be patched
 * up". A server-rendered page can't read consent, so it has to emit the cookie-less state, and the
 * player would stay stuck in it. Re-apply the value as a property after mount to get out of it.
 */
const MuxVideoWithConsent = React.forwardRef<MuxVideoElement, MuxVideoProps>((props, ref) => {
  const innerRef = React.useRef<MuxVideoElement | null>(null);
  const composedRef = React.useCallback(
    (element: MuxVideoElement | null) => {
      innerRef.current = element;
      if (typeof ref === 'function') ref(element);
      else if (ref) ref.current = element;
    },
    [ref]
  );

  React.useEffect(() => {
    if (innerRef.current) innerRef.current.disableCookies = !!props.disableCookies;
  }, [props.disableCookies]);

  return React.createElement(MuxVideo, { ...props, ref: composedRef });
});

MuxVideoWithConsent.displayName = 'MuxVideo';

export default MuxVideoWithConsent;

const ReactPropToAttrNameMap: Record<string, string> = {
  autoPlay: 'autoplay',
  controlsList: 'controlslist',
  crossOrigin: 'crossorigin',
  playsInline: 'playsinline',
  disablePictureInPicture: 'disablepictureinpicture',
  disableRemotePlayback: 'disableremoteplayback',
};

function toAttributeName(propName: string) {
  if (ReactPropToAttrNameMap[propName]) {
    return ReactPropToAttrNameMap[propName];
  }
  return propName.replace(/([A-Z])/g, '-$1').toLowerCase();
}
