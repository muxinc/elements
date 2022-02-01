import type MuxVideoElement from "@mux-elements/mux-video";

export type MuxPlayerProps = Partial<MuxVideoElement> & {
  preferMse?: boolean;
};

export type MuxTemplateProps = Partial<MuxPlayerProps> & {
  playerSize?: string;
  showLoading?: boolean;
  hasCaptions?: boolean;
  supportsAirPlay?: boolean;
};
