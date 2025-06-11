export class AdEvent extends Event {}

export const Events = {
  // https://www.mux.com/docs/guides/mux-data-playback-events#ad-events
  AD_REQUEST: 'adrequest',
  AD_RESPONSE: 'adresponse',
  AD_BREAK_START: 'adbreakstart',
  AD_FIRST_QUARTILE: 'adfirstquartile',
  AD_MIDPOINT: 'admidpoint',
  AD_THIRD_QUARTILE: 'adthirdquartile',
  AD_ENDED: 'adended',
  AD_BREAK_END: 'adbreakend',
  AD_ERROR: 'aderror',
  AD_PLAY: 'adplay',
  AD_PLAYING: 'adplaying',
  AD_PAUSE: 'adpause',

  // Useful ad specific events that are not part of the Mux Data spec
  AD_IMPRESSION: 'adimpression',
  AD_CLICK: 'adclick',
  AD_SKIP: 'adskip',
  AD_CLOSE: 'adclose',

  // Use standard events if possible to be consistent with HTMLVideoElement
  // https://www.w3.org/TR/html52/semantics-embedded-content.html#mediaevents
  PLAY: 'play',
  PLAYING: 'playing',
  PAUSE: 'pause',
  VOLUME_CHANGE: 'volumechange',
  TIME_UPDATE: 'timeupdate',
  DURATION_CHANGE: 'durationchange',
  WAITING: 'waiting',
} as const;
