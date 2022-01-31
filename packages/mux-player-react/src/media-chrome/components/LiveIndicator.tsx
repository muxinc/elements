import React from "react";
import { MediaTextDisplay } from "..";

const LiveIndicator = () => {
  return (
    <MediaTextDisplay style={{ color: "inherit" }}>
      <span style={{ color: "red" }}>●</span> Live
    </MediaTextDisplay>
  );
};

export default LiveIndicator;
