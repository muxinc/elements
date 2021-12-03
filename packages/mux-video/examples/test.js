import "../dist/index.js";
const muxVideo = document.getElementById("mux-video");
const errorTrigger = document.getElementById("error-trigger");

errorTrigger.addEventListener("click", () => {
  //force the player to emit an error
  //   if (!muxVideo.src) {
  muxVideo.setAttribute("src", "http://failed-source.com");
  //   } else {
  //       muxVideo.removeAttribute('src');
  //       muxVideo.unload();
  //       muxVideo.load();
  //   }
});

const EVENTS_TO_CHECK = [
  "ready",
  "timeupdate",
  "error",
  "canplay",
  "ended",
  "playing",
  "play",
  "pause",
];

// console.log(muxVideo.shadowRoot.querySelector('video').dispatchEvent(new Event('ended')))

console.log("mux-video", muxVideo);
// globalThis.customElements.whenDefined("mux-video").then(() => {
//   EVENTS_TO_CHECK.forEach((evt) => {
//     console.log("adding event listener", evt);
//     muxVideo.addEventListener(evt, () => {
//       console.log("evt", evt);
//       const li = document.getElementById(evt);
//       li.innerHTML = `${evt} ✅`;
//     });
//   });
// });
EVENTS_TO_CHECK.forEach((evt) => {
  console.log("adding event listener", evt);
  muxVideo.addEventListener(evt, () => {
    console.log("evt", evt);
    const li = document.getElementById(evt);
    li.innerHTML = `${evt} ✅`;
  });
});
