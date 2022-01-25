import type * as CSS from "csstype";
declare global {
  interface Window {
    WebKitPlaybackTargetAvailabilityEvent?: Event;
  }

  interface HTMLVideoElement {
    webkitShowPlaybackTargetPicker?: Function;
  }
}

declare module "csstype" {
  interface Properties {
    "--media-background-color"?: CSS.Properties["backgroundColor"];
    "--media-control-background"?: CSS.Properties["backgroundColor"];
    "--media-control-hover-background"?: CSS.Properties["backgroundColor"];
    "--media-button-icon-width"?: CSS.Properties["width"];
    "-webkit-transform"?: CSS.Properties["transform"];
    "-ms-transform"?: CSS.Properties["transform"];
    // ...or allow any other property
    // [index: string]: any;
  }
}

type ReactInstanceBasic = React.ReactElement | null;
export type MuxPlayerProps = Partial<MuxVideoProps> & {
  onPlayerReady?: () => void; // params?
  onError?: (e: ErrorEvent) => void;
  defaultShowCaptions?: boolean;
  ChromeRenderer?: (props: ChromeProps) => ReactInstanceBasic;
  primaryColor?: React.CSSProperties["color"];
  secondaryColor?: React.CSSProperties["color"];
  tertiaryColor?: React.CSSProperties["color"];
};

export type ChromeProps = {
  onAirPlaySelected?: React.MouseEventHandler;
  supportsAirPlay?: boolean;
  supportsVolume?: boolean;
  loading?: boolean;
  paused?: boolean;
  captionsAvailable?: boolean;
  streamType?: MuxVideoProps["streamType"];
  playerSize?: string;
};
