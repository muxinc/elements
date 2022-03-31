# Missing Signed Tokens

#### Why This Error Occurred

You don't have permission to access a media URL because one of the following
media types is missing a signed token:

- Playback source
- Thumbnail image (poster image)
- Storyboard VTT

#### Possible Ways to Fix It

If you are a viewer of this video there is not much you can do. The owner of the
video will have to fix this issue.

If you are the owner of this video and this video url is signed make sure the
correct tokens are added to the mux-player.

```html
<mux-player playback-id="" playback-token="" thumbnail-token="" storyboard-token=""></mux-player>
```

### Useful Links

- [Mux Player Attributes](https://github.com/muxinc/elements/tree/main/packages/mux-player#attributes)
- [Mux Player React Props](https://github.com/muxinc/elements/tree/main/packages/mux-player-react#props)
- [Play your videos](https://docs.mux.com/guides/video/play-your-videos)
