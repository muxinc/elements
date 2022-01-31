import React, { useCallback, useEffect, useRef, useState } from "react";
import { getPosterURLFromPlaybackId } from "../../utils";

const Poster: React.FC<{
  poster?: string;
  playbackId: string;
  onLoaded?: () => any;
}> = ({ poster, playbackId, onLoaded }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!onLoaded) return;
    if (!loaded) return;
    onLoaded();
  }, [loaded]);
  return (
    <img
      ref={(node: HTMLImageElement) => setLoaded(node?.complete ?? false)}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
      src={poster ?? getPosterURLFromPlaybackId(playbackId)}
      onLoad={({ currentTarget }) => setLoaded(currentTarget.complete)}
    />
  );
};

export default Poster;
