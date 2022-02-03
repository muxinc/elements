import React from "react";
import { StreamTypes } from "@mux-elements/playback-core";
import LiveChromeLarge from "./LiveChromeLarge";
import LiveChromeSmall from "./LiveChromeSmall";
import VodChromeLarge from "./VodChromeLarge";
import VodChromeSmall from "./VodChromeSmall";
import { MediaChromeSizes } from "../shared/constants";
import type { ChromeProps } from "../types";

const DefaultChromeRenderer: React.FC<ChromeProps> = (props) => {
  const { streamType, playerSize } = props;
  if (playerSize === MediaChromeSizes.SM) {
    if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
      return <LiveChromeSmall {...props} />;
    }
    return <VodChromeSmall {...props} />;
  }
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
    return <LiveChromeLarge {...props} />;
  }
  return <VodChromeLarge {...props} />;
};

export default DefaultChromeRenderer;
