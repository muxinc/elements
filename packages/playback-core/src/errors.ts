// Identifies what kind of request was made that resulted in an error
export const MuxErrorCategory = {
  VIDEO: 'video',
  THUMBNAIL: 'thumbnail',
  STORYBOARD: 'storyboard',
  DRM: 'drm',
} as const;

export const MuxErrorCode = {
  NOT_AN_ERROR: 0,
  NETWORK_UNKNOWN_ERROR: 2000000,
  NETWORK_NO_STATUS: 2000001,
  NETWORK_INVALID_URL: 2400000,
  NETWORK_NOT_FOUND: 2404000,
  NETWORK_NOT_READY: 2412000,
  NETWORK_GENERIC_SERVER_FAIL: 2500000,
  NETWORK_TOKEN_MISSING: 2403201,
  NETWORK_TOKEN_MALFORMED: 2412202,
  NETWORK_TOKEN_EXPIRED: 2403210,
  NETWORK_TOKEN_AUD_MISSING: 2403221,
  NETWORK_TOKEN_AUD_MISMATCH: 2403222,
  NETWORK_TOKEN_SUB_MISMATCH: 2403232,
} as const;

export type MuxErrorCategory = typeof MuxErrorCategory;
export type MuxErrorCode = typeof MuxErrorCode;

export type MuxErrorCategoryValue = MuxErrorCategory[keyof MuxErrorCategory];
export type MuxErrorCodeValue = MuxErrorCode[keyof MuxErrorCode];

export const errorCategoryToTokenNameOrPrefix = (category: MuxErrorCategoryValue) => {
  if (category === MuxErrorCategory.VIDEO) return 'playback';
  return category;
};

export class MediaError extends Error {
  static MEDIA_ERR_ABORTED = 1 as const;
  static MEDIA_ERR_NETWORK = 2 as const;
  static MEDIA_ERR_DECODE = 3 as const;
  static MEDIA_ERR_SRC_NOT_SUPPORTED = 4 as const;
  static MEDIA_ERR_ENCRYPTED = 5 as const;
  // @see https://docs.mux.com/guides/data/monitor-html5-video-element#customize-error-tracking-behavior
  static MEDIA_ERR_CUSTOM = 100;

  static defaultMessages: Record<number, string> = {
    1: 'You aborted the media playback',
    2: 'A network error caused the media download to fail.',
    3: 'A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.',
    4: 'An unsupported error occurred. The server or network failed, or your browser does not support this format.',
    5: 'The media is encrypted and there are no keys to decrypt it.',
  };

  name: string;
  code: number;
  public muxCode?: MuxErrorCodeValue;
  public errorCategory?: MuxErrorCategoryValue;
  context?: string;
  fatal: boolean;
  data?: any;

  constructor(message?: string, code: number = MediaError.MEDIA_ERR_CUSTOM, fatal?: boolean, context?: string) {
    super(message);
    this.name = 'MediaError';
    this.code = code;
    this.context = context;
    this.fatal = fatal ?? (code >= MediaError.MEDIA_ERR_NETWORK && code <= MediaError.MEDIA_ERR_ENCRYPTED);

    if (!this.message) {
      this.message = MediaError.defaultMessages[this.code] ?? '';
    }
  }
}
