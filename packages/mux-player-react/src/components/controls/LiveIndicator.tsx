import React from "react";
import { MediaTextDisplay } from "../../media-chrome";

const LiveIndicator = () => {
  return (
    <MediaTextDisplay>
      <span style={{ color: "#FB3C4D" }}>●</span> Live
    </MediaTextDisplay>
  );
};

export default LiveIndicator;
