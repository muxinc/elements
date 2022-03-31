# 403 Incorrect `aud` value

#### Why This Error Occurred

You don't have permission to access this video URL because the playback-token is
formatted with incorrect information.

#### Possible Ways to Fix It

If you are a viewer of this video there is not much you can do. The owner of the
video will have to fix this issue.

If you are the owner of this video and this video url is signed make sure the
correct tokens are added to the mux-player. An incorrect `aud` value means the
provided token is not for the correct media type.

```html
<mux-player playback-id="" playback-token="" thumbnail-token="" storyboard-token=""></mux-player>
```

### Useful Links

- [Mux Player Attributes](https://github.com/muxinc/elements/tree/main/packages/mux-player#attributes)
- [Mux Player React Props](https://github.com/muxinc/elements/tree/main/packages/mux-player-react#props)
- [Secure video playback](https://docs.mux.com/guides/video/secure-video-playback)
