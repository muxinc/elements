// @ts-nocheck
import "media-chrome";
import "media-chrome/dist/experimental/media-captions-menu-button";

export default function IndexPage() {
  return (
    <media-controller>
      <video
        slot="media"
        src="https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4"
        muted
        crossOrigin=""
        playsInline
      >
        <track
          label="thumbnails"
          default
          kind="metadata"
          src="https://image.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/storyboard.vtt"
        />
        <track
          label="English"
          kind="captions"
          srcLang="en"
          src="/vtt/en-cc.vtt"
        />
      </video>
      <media-poster-image
        slot="poster"
        src="https://image.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/thumbnail.jpg"
        placeholder-src="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUADADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECBAP/xAAdEAEBAAEEAwAAAAAAAAAAAAAAARECAxITFCFR/8QAGQEAAwADAAAAAAAAAAAAAAAAAAEDAgQF/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAETERL/2gAMAwEAAhEDEQA/ANeC4ldyI1b2EtIzzrrIqYZLvl5FGkGdbfQzGPvo76WsPxXLlfqbaA5va2iVJADgPELACsD/2Q=="
      ></media-poster-image>
      <media-loading-indicator
        media-loading
        slot="centered-chrome"
        no-auto-hide
      ></media-loading-indicator>
      <media-control-bar>
        <media-play-button></media-play-button>
        <media-seek-backward-button seek-offset="15"></media-seek-backward-button>
        <media-seek-forward-button seek-offset="15"></media-seek-forward-button>
        <media-mute-button></media-mute-button>
        <media-volume-range></media-volume-range>
        <media-time-range></media-time-range>
        <media-time-display show-duration remaining></media-time-display>
        <media-captions-menu-button
          default-showing
        ></media-captions-menu-button>
        <media-playback-rate-button></media-playback-rate-button>
        <media-pip-button></media-pip-button>
        <media-fullscreen-button></media-fullscreen-button>
        <media-airplay-button></media-airplay-button>
      </media-control-bar>
    </media-controller>
  );
}
