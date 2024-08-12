// Identifies what kind of request was made that resulted in an error
export const MuxErrorCategory = {
  VIDEO: 'video',
  THUMBNAIL: 'thumbnail',
  STORYBOARD: 'storyboard',
  DRM: 'drm',
} as const;

export type MuxErrorCategory = typeof MuxErrorCategory;

export type MuxErrorCategoryValue = MuxErrorCategory[keyof MuxErrorCategory];

export class MediaError extends Error {
  static MEDIA_ERR_ABORTED = 1;
  static MEDIA_ERR_NETWORK = 2;
  static MEDIA_ERR_DECODE = 3;
  static MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
  static MEDIA_ERR_ENCRYPTED = 5;
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
  public muxCode?: number;
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
