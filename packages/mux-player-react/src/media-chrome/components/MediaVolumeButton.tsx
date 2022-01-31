import React from "react";
import { MediaMuteButton, MediaVolumeRange } from "..";
import { ChromeProps } from "../../types";

const MediaVolumeButton: React.FC<Pick<ChromeProps, "supportsVolume">> = ({
  supportsVolume,
}) => {
  return (
    <>
      <MediaMuteButton></MediaMuteButton>
      {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
    </>
  );
};

export default MediaVolumeButton;
