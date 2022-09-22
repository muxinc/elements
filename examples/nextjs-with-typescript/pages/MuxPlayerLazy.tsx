import { useRef } from 'react';

import MuxPlayer from '@mux/mux-player-react/lazy';

function MuxPlayerSuspensePage() {
  const mediaElRef = useRef(null)
  return <MuxPlayer
    ref={mediaElRef}
    playbackId="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
    streamType="on-demand"
    placeholder="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQC/8QAHRAAAgIDAAMAAAAAAAAAAAAAAAECAwQSIREiMf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGREAAwEBAQAAAAAAAAAAAAAAAAEDMRFR/9oADAMBAAIRAxEAPwBS4pEa7Geq2cn7GuLXgvT8ImuaUWYqkui/JpVT4M7bWlwWZNjm+g1wafTbEtiACoBnM/gvyQAOuCz0/9k="
  />;
}

export default MuxPlayerSuspensePage;
