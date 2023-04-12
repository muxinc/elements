# Deprecated Stream Type

#### Why This Error Occurred

The provided `stream-type` is deprecated.

#### Possible Ways to Fix It

If you are a viewer of this video there is not much you can do. The owner of the
video will have to fix this issue.

If you are the owner of this video, `stream-type` can now be inferred based on the `playback-id` and is
no longer required. However, if you would still like to explicitly declare the `stream-type` (e.g. to
avoid an initial render of the wrong UI), here are the recommended refactors:

- `stream-type="ll-live"` - Replace with `stream-type="live"` (we will infer that the `playback-id` is low latency HLS)
- `stream-type="live:dvr"` or `stream-type="ll-live:dvr"` - Refactor as `stream-type="live"` & `target-live-window="Infinity"`

### Useful Links

- [Mux Player Attributes](https://github.com/muxinc/elements/tree/main/packages/mux-player#attributes)
- [Mux Player React Props](https://github.com/muxinc/elements/tree/main/packages/mux-player-react#props)
- [Play your videos](https://docs.mux.com/guides/video/play-your-videos)
