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
    this.timeout(10000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      startTime="0"
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
});
