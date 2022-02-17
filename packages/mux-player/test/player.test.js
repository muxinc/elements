import { fixture, assert, aTimeout } from "@open-wc/testing";
import "../src/index.ts";

describe("<mux-player>", () => {
  it("forwards attrs to mux-video", async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
    ></mux-player>`);
    const muxVideo = player.shadowRoot.querySelector("mux-video");
    await assert.equal(
      muxVideo.getAttribute("playback-id"),
      "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
    );
  });

  it("has a Mux specific API", async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="vod"
      prefer-mse
      debug
      muted
    ></mux-player>`);

    assert.equal(
      player.playbackId,
      "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe",
      "playback-id is reflected"
    );
    assert.equal(
      player.envKey,
      "ilc02s65tkrc2mk69b7q2qdkf",
      "env-key is reflected"
    );
    assert.equal(player.startTime, 0, "startTime is set to 0");
    assert.equal(player.streamType, "vod", "stream-type is vod");
    assert.equal(player.preferMse, true, "prefer-mse is on");
    assert.equal(player.debug, true, "debug is on");
  });

  it("has a video like API", async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      muted
    ></mux-player>`);

    assert(player.paused, "is paused on initialization");
    assert(!player.ended, "is not ended");

    assert(!player.loop, "loop is false by default");
    player.loop = true;
    assert(player.loop, "loop is true");

    assert.equal(player.volume, 1, "is all turned up");
    player.volume = 0.5;
    assert.equal(player.volume, 0.5, "is half volume");

    player.muted = true;
    assert(player.muted, "is muted");

    try {
      await player.play();
    } catch (error) {
      console.warn(error);
    }

    assert(!player.paused, "is playing after player.play()");
    assert.equal(Math.round(player.duration), 134, `is 134s long`);

    await aTimeout(1000);

    assert.equal(String(Math.round(player.currentTime)), 1, "is about 1s in");

    player.playbackRate = 2;
    await aTimeout(1000);

    assert.equal(String(Math.round(player.currentTime)), 3, "is about 3s in");
  });

  it("video attributes are forwarded to media element", async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      muted
    ></mux-player>`);

    const muxVideo = player.video;

    // controls should not be forwarded! player handles show/hide media-chrome.
    player.setAttribute("controls", "");
    assert(!muxVideo.hasAttribute("controls"), `has no controls attr added`);

    const checkProps = {
      autoplay: true,
      muted: true,
      playsInline: true,
      loop: true,
      crossOrigin: "anonymous",
      preload: "metadata",
      poster:
        "https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0",
      src: "https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8",
    };

    for (let propName in checkProps) {
      const attrName = propName.toLowerCase();
      const value = checkProps[propName];

      player.setAttribute(attrName, value === true ? "" : value);
      assert(muxVideo.hasAttribute(attrName), `has ${attrName} attr added`);

      assert.equal(muxVideo[propName], value, `has ${propName} prop`);

      player.removeAttribute(attrName);
      assert(!muxVideo.hasAttribute(attrName), `has ${attrName} attr removed`);
    }
  });

  it("muted attribute behaves like expected", async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      muted
    ></mux-player>`);

    const muxVideo = player.video;
    const nativeVideo = muxVideo.shadowRoot.querySelector("video");

    assert(player.muted, "player.muted is true");
    assert(muxVideo.muted, "muxVideo.muted is true");
    assert(nativeVideo.muted, "nativeVideo.muted is true");

    player.removeAttribute("muted");

    assert(!player.muted, "player.muted is false");
    assert(!muxVideo.muted, "muxVideo.muted is false");
    assert(!nativeVideo.muted, "nativeVideo.muted is false");

    player.setAttribute("muted", "");

    assert(player.muted, "player.muted is true");
    assert(muxVideo.muted, "muxVideo.muted is true");
    assert(nativeVideo.muted, "nativeVideo.muted is true");
  });

  it("volume attribute behaves like expected", async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      volume="0.4"
    ></mux-player>`);

    assert.equal(player.getAttribute("volume"), "0.4");

    const muxVideo = player.video;
    const nativeVideo = muxVideo.shadowRoot.querySelector("video");

    assert.equal(player.volume, 0.4, "player.volume is 0.4");
    assert.equal(muxVideo.volume, 0.4, "muxVideo.volume is 0.4");
    assert.equal(nativeVideo.volume, 0.4, "nativeVideo.volume is 0.4");

    player.setAttribute("volume", "0.9");

    assert.equal(player.volume, 0.9, "player.volume is 0.9");
    assert.equal(muxVideo.volume, 0.9, "muxVideo.volume is 0.9");
    assert.equal(nativeVideo.volume, 0.9, "nativeVideo.volume is 0.9");
  });

  it("playbackrate attribute behaves like expected", async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      playbackrate="2"
    ></mux-player>`);

    assert.equal(player.getAttribute("playbackrate"), "2");

    const muxVideo = player.video;
    const nativeVideo = muxVideo.shadowRoot.querySelector("video");

    assert.equal(player.playbackRate, 2, "player.playbackRate is 2");
    assert.equal(muxVideo.playbackRate, 2, "muxVideo.playbackRate is 2");
    assert.equal(nativeVideo.playbackRate, 2, "nativeVideo.playbackRate is 2");

    player.setAttribute("playbackrate", "0.7");

    assert.equal(player.playbackRate, 0.7, "player.playbackRate is 0.7");
    assert.equal(muxVideo.playbackRate, 0.7, "muxVideo.playbackRate is 0.7");
    assert.equal(
      nativeVideo.playbackRate,
      0.7,
      "nativeVideo.playbackRate is 0.7"
    );
  });
});
