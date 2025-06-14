# &lt;mux-video/&gt; with ads

## Installation

See [mux-video](../../README.md#installation) for installation instructions.

With the import path `@mux/mux-video/ads` you will get the ads version of the mux-video web component.

## Usage

See [mux-video](../../README.md#usage) for usage instructions.

### Attributes

See [mux-video](../../README.md#attributes) for the list of base attributes.

- `ad-tag-url`: This is the URL of the VAST ad tag to be used for ad playback.
- `allow-ad-blocker`: When present, allows the content to be played even if the ad is blocked by an ad blocker.

### Properties

- `adTagUrl`: This is the URL of the VAST ad tag to be used for ad playback.
- `allowAdBlocker`: When set to true, allows the content to be played even if the ad is blocked by an ad blocker.
- `ad`: This is the ad object that was last created.
- `adsLoader`: This is the ads loader object that is used to load and play ads.

### Events

See [mux-video](../../README.md#events) for the list of base events.

- `adrequest`: The adrequest event is fired when the ad request is made.
- `adresponse`: The adresponse event is fired when the ad response is received.
- `adimpression`: The adimpression event is fired when the ad impression is made.
- `adbreakstart`: The adbreakstart event is fired when the ad break starts.
- `adplay`: The adplay event is fired when a call is made to play an ad.
- `adplaying`: The adplaying event is fired when the ad starts playing.
- `adpause`: The adpause event is fired when the ad is paused.
- `adfirstquartile`: The adfirstquartile event is fired when the ad first quartile is reached.
- `admidpoint`: The admidpoint event is fired when the ad midpoint is reached.
- `adthirdquartile`: The adthirdquartile event is fired when the ad third quartile is reached.
- `adclick`: The adclick event is fired when the ad is clicked by the user.
- `adskip`: The adskip event is fired when the ad is skipped by the user.
- `adclose`: The adclose event is fired when the ad is closed by the user.
- `adended`: The adended event is fired when one ad ends.
- `adbreakend`: The adbreakend event is fired when the ad break ends.
- `aderror`: The aderror event is fired when an ad error occurs.
