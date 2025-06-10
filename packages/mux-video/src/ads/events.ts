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

  // Use standard events if possible to be consistent with HTMLVideoElement
  // https://www.w3.org/TR/html52/semantics-embedded-content.html#mediaevents
  // AD_PLAY: 'adplay',
  // AD_PLAYING: 'adplaying',
  // AD_PAUSE: 'adpause',
  PLAY: 'play',
  PLAYING: 'playing',
  PAUSE: 'pause',
  VOLUME_CHANGE: 'volumechange',
  TIME_UPDATE: 'timeupdate',
  DURATION_CHANGE: 'durationchange',
} as const;
