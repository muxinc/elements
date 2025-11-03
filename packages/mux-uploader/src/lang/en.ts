export const En = {
  'Drop a video file here to upload': 'Drop a video file here to upload',
  or: 'or',
  'Upload complete!': 'Upload complete!',
  Retry: 'Retry',
  'Pausing...': 'Pausing...',
  Resume: 'Resume',
  Pause: 'Pause',
  'Upload a video': 'Upload a video',
  'No url or endpoint specified - cannot handle upload': 'No url or endpoint specified - cannot handle upload',
} as const;

export type TranslateKeys = keyof typeof En;

export type TranslateDictionary = {
  [key in TranslateKeys]: string;
};
