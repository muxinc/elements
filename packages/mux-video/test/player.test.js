import { fixture, assert, aTimeout } from "@open-wc/testing";
import "../src/index.ts";

describe("<mux-video>", () => {
  it("has a Mux specific API", async function () {
    const player = await fixture(`<mux-video
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="vod"
      prefer-mse
      debug
      muted
    ></mux-video>`);

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
});
