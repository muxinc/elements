export class MediaError extends Error {
  static MEDIA_ERR_CUSTOM: number = 0;
  static MEDIA_ERR_ABORTED: number = 1;
  static MEDIA_ERR_NETWORK: number = 2;
  static MEDIA_ERR_DECODE: number = 3;
  static MEDIA_ERR_SRC_NOT_SUPPORTED: number = 4;
  static MEDIA_ERR_ENCRYPTED: number = 5;

  static defaultMessages: Record<number, string> = {
    1: 'You aborted the media playback',
    2: 'A network error caused the media download to fail.',
    3: 'A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.',
    4: 'An unsupported error occurred. The server or network failed, or your browser does not support this format.',
    5: 'The media is encrypted and there are no keys to decrypt it.',
  };

  name: string;
  code: number;
  fatal: boolean;
  data?: any;

  constructor(message?: string, code: number = 0, fatal?: boolean) {
    super(message);
    this.name = 'MediaError';
    this.code = code;
    this.fatal = fatal ?? code >= MediaError.MEDIA_ERR_NETWORK;

    if (!this.message) {
      this.message = MediaError.defaultMessages[this.code] ?? '';
    }
  }
}
