import type MuxVideoElement from "@mux-elements/mux-video";

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
  dialog: {
    title: string;
    message: string;
    linkText?: string;
    linkUrl?: string;
  };
  onCloseErrorDialog: (evt: CustomEvent) => void;
  tokens: {
    playback?: string;
    thumbnail?: string;
    storyboard?: string;
  };
};
