/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import MuxPlayer from "@mux-elements/mux-player-react";
import { useRef, useState } from "react";

const INITIAL_DEBUG = false;
const INITIAL_MUTED = true;
const INITIAL_PLAYBACK_ID = "g65IqSFtWdpGR100c2W8VUHrfIVWTNRen";
// const INITIAL_PLAYBACK_ID = "bzeU5fRA47S01KDzrObYiiZvzj00j5E00dCVbt3oRzmfF00";
const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";
const INITIAL_METADATA = {
  "video-id": "video-id-bc789",
  "video-title": "Great Stuff",
  "user-id": "user-id-6af7",
};
const INITIAL_TOKENS = {};
// const INITIAL_TOKENS = {
//   "playback": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDY0Mzg5NjEsImF1ZCI6InYiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.hWrdcJDa8FJCfVFP19oJ-9FSEVk9eB6DTOCRrucnzsrtUoZbb1OFe7swpQ38Fp3hZNNIt7-LWjdOl90TF4ucu7mhu42qyk3_i054RtmEZyQaj5Qjm3_H4sa2jLO-0QNSnOfp1A9x-fI8M_giGLg-byJPuu_eUqu1MW9bILLly_9gq8m0cNKghUa9xTMJgFmaya4XYudy5Mt2Fu72MiS3csUP3xhKlONVnGHlMRqB-dBVOgAJrayeUquAhaNY346oFBUWVM-EcAZ9G2ARtPakfy4Wpv5BsRKEGtR81P-k7EW8g27U0FKLlrvLkUz3Z-JYu53CRcJUvjkC9sDMrZLcTA",
//   "thumbnail": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDY0OTMzMTksImF1ZCI6InQiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.hNBRo1-XDTT1CJMOxf90-8JPJzAygwm-3pVNBj31I7DEukSVRKVgUuhquEJbYXx1xg27xRMu8OVQxVob6jWHdjSwTyygAY040bqdyDxLsRtkDcVxwZ78iiZwtA1eTkxxY-410Ma3HbhNsG0Qjo5AWX46IhD9ARKHL-MPGaKda7FSx8J8jxa3hQ8_M1AKMsx7PrgJYOtW6n0mvkupEAFYRJlqIbkERSBeWChdrjCLYAcXRar5nfdNWlWST2pfllqz8pfJSTWjQRumTonC5BGB89jZUimHnuzkRXm_LeGyXbfZmBKb4d0j9YyGVnTPePqyVPsAQ-bzcfFDU0L67GDgyw",
//   "storyboard": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE2NDY0OTM0OTgsImF1ZCI6InMiLCJzdWIiOiJiemVVNWZSQTQ3UzAxS0R6ck9iWWlpWnZ6ajAwajVFMDBkQ1ZidDNvUnptZkYwMCJ9.PKEybohVK0JyJGX_3iubRnHZx1ve5OmPmyfZdaKb17N2wVMQCYNltTc-gCUTU7EIKGeTtVOIITCSsIeTgXcI667B2GWJ5juDIErz1h-NQsPIfB-FsUeuWx2rYOap4G3FdwEIjaGc29HPncw-mG0JLcqkMB7jtDxjBY_-YlpjFYJF_z7r-1yIJM7mF3rl8YqeWstojC8oh2Iv2VRkuTyPE31QVI6fQcet5PIRWHudUIGWcNiWM56vwZskJ6qod8UvYpha7K5rhshh0Xdhnvq3Y9b6PXl3fy6VKCZIyszlPVje0IR2bR9iHDXnGbawivUsI65IDm-ZEoJrOzmZctMWAQ",
// };

const onLoadStart = console.log.bind(null, "loadstart");
const onLoadedMetadata = console.log.bind(null, "loadedmetadata");
const onProgress = console.log.bind(null, "progress");
const onDurationChange = console.log.bind(null, "durationchange");
const onVolumeChange = console.log.bind(null, "volumechange");
const onRateChange = console.log.bind(null, "ratechange");
const onResize = console.log.bind(null, "resize");
const onWaiting = console.log.bind(null, "waiting");
const onPlay = console.log.bind(null, "play");
const onPlaying = console.log.bind(null, "playing");
const onTimeUpdate = console.log.bind(null, "timeupdate");
const onPause = console.log.bind(null, "pause");
const onSeeking = console.log.bind(null, "seeking");
const onSeeked = console.log.bind(null, "seeked");
const onEnded = console.log.bind(null, "ended");
const onError = console.log.bind(null, "error");
const onPlayerReady = console.log.bind(null, "playerready");

function MuxPlayerPage() {
  const mediaElRef = useRef(null);
  const [playbackId, setPlaybackId] = useState(INITIAL_PLAYBACK_ID);
  const [envKey, setEnvKey] = useState(INITIAL_ENV_KEY);
  const [metadata, _setMetadata] = useState(INITIAL_METADATA);
  const [tokens, _setTokens] = useState(INITIAL_TOKENS);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>MuxPlayer Demo</h1>
      <div>
        <MuxPlayer
          ref={mediaElRef}
          // style={{ aspectRatio: "16 / 9" }}
          envKey={envKey}
          metadata={metadata}
          playbackId={playbackId}
          tokens={tokens}
          forwardSeekOffset={10}
          backwardSeekOffset={10}
          // onPlayerReady={() => console.log("ready!")}
          debug={debug}
          muted={muted}
          paused={paused}
          // autoPlay
          // streamType={"live"}
          primaryColor="#ec407a"
          secondaryColor="#64b5f6"
          tertiaryColor="#b4004e"
          onPlay={(evt: Event) => {
            onPlay(evt);
            setPaused(false);
          }}
          onPause={(evt: Event) => {
            onPause(evt);
            setPaused(true);
          }}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          // startTime={12}
        />
      </div>
      <div>
        <div>
          <label htmlFor="paused-control">Paused</label>
          <input
            id="paused-control"
            type="checkbox"
            onChange={() => setPaused(!paused)}
            checked={paused}
          />
        </div>
        <div>
          <label htmlFor="muted-control">Muted</label>
          <input
            id="muted-control"
            type="checkbox"
            onChange={() => setMuted(!muted)}
            checked={muted}
          />
        </div>
        <div>
          <label htmlFor="debug-control">Debug</label>
          <input
            id="debug-control"
            type="checkbox"
            onChange={() => setDebug(!debug)}
            checked={debug}
          />
        </div>
        <div>
          <label htmlFor="playback-id-control">Playback Id</label>
          <input
            id="playback-id-control"
            onBlur={({ currentTarget }) => setPlaybackId(currentTarget.value)}
            defaultValue={playbackId}
          />
        </div>
        <div>
          <label htmlFor="env-key-control">Env Key (Mux Data)</label>
          <input
            id="env-key-control"
            onBlur={({ currentTarget }) => setEnvKey(currentTarget.value)}
            defaultValue={envKey}
          />
        </div>
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default MuxPlayerPage;
