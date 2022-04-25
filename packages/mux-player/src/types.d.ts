import type MuxVideoElement from '@mux-elements/mux-video';

export type MuxPlayerProps = Partial<MuxVideoElement> & {
  preferMse?: boolean;
};

export type MuxTemplateProps = Partial<MuxPlayerProps> & {
  playerSize: string;
  showLoading: boolean;
  hasCaptions: boolean;
  supportsAirPlay: boolean;
  supportsVolume: boolean;
  primaryColor: string;
  secondaryColor: string;
  forwardSeekOffset: number;
  backwardSeekOffset: number;
  isDialogOpen: boolean;
  defaultHiddenCaptions: boolean;
  onCloseErrorDialog: (evt: CustomEvent) => void;
  onInitFocusDialog: (evt: CustomEvent) => void;
  dialog: DialogOptions;
  inLiveWindow: boolean;
  onSeekToLive: (_evt: Event) => void;
  tokens: {
    playback?: string;
    thumbnail?: string;
    storyboard?: string;
  };
  metadataVideoId: string;
  metadataVideoTitle: string;
  metadataViewerUserId: string;
};

export type DialogOptions = {
  title?: string;
  message?: string;
  linkText?: string;
  linkUrl?: string;
};

export type DevlogOptions = {
  message?: string;
  file?: string;
};
