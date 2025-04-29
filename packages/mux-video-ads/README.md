<p align="center">
  <h1 align="center">&lt;mux-video-ads/&gt;</h1>
</p>

# Introduction

`<mux-video-ads></mux-video-ads>` is a Mux-flavored HTML5 video element with integrated Google IMA (Interactive Media Ads) support. It extends the functionality of `<mux-video>` to provide seamless ad integration for your video applications.

# Table of Contents

- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Integration with mux-player](#integration-with-mux-player)
- [React Integration](#react-integration)
- [Advanced Usage](#advanced-usage)
  - [Managing Ad Playback](#managing-ad-playback)
  - [Mux Data Integration](#mux-data-integration)
  - [Playlist Integration](#playlist-integration)
- [API Reference](#api-reference)
  - [Attributes](#attributes)
  - [Events](#events)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

# Key Features

- Seamless integration with Google Interactive Media Ads (IMA) SDK
- Ad break management and playback control
- Automatic responsive layouts for ad containers
- Prevention of seeking during ad playback
- Integration with Mux Data for comprehensive analytics on both content and ads
- Support for both standalone use and integration with mux-player

# Prerequisites

Before using `<mux-video-ads>`, ensure you have:

1. **Google IMA SDK**: You must include the Google IMA SDK in your HTML:
   ```html
   <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
   ```

2. **Valid VAST/VPAID ad tag URL** from your ad server

# Installation

## Package Manager

```bash
npm i @mux/mux-video-ads
```

Then, import the library into your application:

```js
import '@mux/mux-video-ads';
```

or

```js
require('@mux/mux-video-ads');
```

## CDN Option

Alternatively, use the CDN hosted version:

```html
<script src="https://cdn.jsdelivr.net/npm/@mux/mux-video-ads@0"></script>
```

For ECMAScript modules:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@mux/mux-video-ads@0/dist/mux-video-ads.mjs"></script>
```

# Basic Usage

After loading the library, you can use the custom web component in your HTML:

```html
<body>
  <mux-video-ads
    playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
    adtagurl="https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
    metadata-video-title="Big Buck Bunny"
    metadata-viewer-user-id="user-id-1234"
    controls
  ></mux-video-ads>
</body>
```

# Integration with mux-player

`mux-video-ads` can be easily integrated with `mux-player` to enhance your video player with advertising capabilities.

## Using the `mux-video-element` Property

Set the `mux-video-element` attribute to `"mux-video-ads"` to enable advertising functionality within mux-player:

```html
<mux-player
  stream-type="on-demand"
  playback-id="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2s"
  mux-video-element="mux-video-ads"
  adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
></mux-player>
```

When using this configuration:
- All standard `mux-player` attributes work as usual
- The player UI and controls automatically handle ad states
- Ad playback is fully integrated into the player experience

# React Integration

## Standard React Component

For React applications, use the provided React wrapper:

```jsx
import React, { useRef, useState } from 'react';
import MuxVideoAds from '@mux/mux-video-ads-react';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <MuxVideoAds
        ref={videoRef}
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
        metadata={{
          video_title: "Big Buck Bunny",
          viewer_user_id: "user-id-1234"
        }}
        controls
        muted
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div>
        <button onClick={() => isPlaying ? videoRef.current.pause() : videoRef.current.play()}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
```

Install the React wrapper:

```bash
npm install @mux/mux-video-ads-react
```

> **Note:** The React wrapper requires React 16.8.0 or higher for hooks support.

## Using with MuxPlayer in React

```jsx
'use client';
import { useRef, useState, useEffect } from "react";
import '@mux/mux-video-ads';
import MuxPlayer from "@mux/mux-player-react";
import "@mux/mux-player/themes/microvideo";

function MuxPlayerAdsPage() {
  const mediaElRef = useRef(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  
  useEffect(() => {
    // Dynamically load the IMA SDK
    const loadImaSdk = () => {
      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);  // Mark SDK as loaded
        console.log("Google IMA SDK loaded");
      };
      script.onerror = () => {
        console.warn("Google IMA SDK failed to load. Likely blocked by ad blocker.");
        setSdkLoaded(true);
      };
      document.head.appendChild(script);
    };

    if (!window.google || !window.google.ima) {
      loadImaSdk();
    } else {
      setSdkLoaded(true);
    }

    return () => {
      // Cleanup by removing the script
      const scriptElement = document.querySelector('script[src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return (
    <>
      {sdkLoaded && (
        <MuxPlayer
          ref={mediaElRef}
          playbackId="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2s"
          theme="microvideo"
          metadata={{
            video_id: "video-id-12345",
            video_title: "Elephants Dream",
            viewer_user_id: "user-id-6789",
          }}
          streamType="on-demand"
          autoPlay={false}
          muted={false}
          muxVideoElement='mux-video-ads'
          adTagUrl='https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='
          onPlay={() => console.log('Video playing')}
          onPause={() => console.log('Video paused')}
        />
      )}
    </>
  );
}

export default MuxPlayerAdsPage;
```

**Important React Notes:**

1. Import the component before using it with `MuxPlayer`:
   ```jsx
   import '@mux/mux-video-ads';
   import MuxPlayer from "@mux/mux-player-react";
   ```

2. Load the Google IMA SDK before ads can function:
   - Use `useEffect` to load the SDK on component mount
   - Track loading state to prevent rendering the player before the SDK is ready

3. Use `muxVideoElement` prop (camelCase) instead of `mux-video-element` attribute (kebab-case)

4. For custom themes, import them separately and apply via the `theme` prop

# Advanced Usage

## Managing Ad Playback

You can interact with the component programmatically:

```javascript
const muxVideoAds = document.querySelector('mux-video-ads');

// Start playback (will handle ads if adtagurl is set)
muxVideoAds.play();

// Pause both content and ads
muxVideoAds.pause();

// Check if currently in an ad break
console.log('In ad break:', muxVideoAds.adBreak);

// Listen for ad break changes
muxVideoAds.addEventListener('adbreakchange', (event) => {
  console.log('Ad break status changed:', event.detail.isAdBreak);
});

// Respond to ads completing
muxVideoAds.addEventListener('onAdsCompleted', () => {
  console.log('All ads have completed playback');
  // Perform any post-ad actions here
});
```

## Mux Data Integration

For analytics on both content and ad playback, provide an `env-key` attribute:

```html
<mux-video-ads
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  adtagurl="https://your-ad-tag-url"
  env-key="YOUR_ENV_KEY"
  controls
></mux-video-ads>
```

## Playlist Integration

Create a video playlist experience with ad support:

```jsx
import Playlist from '../components/playlist';

function VideoPage() {
  const videoList = [
    {
      imageUrl: "https://image.mux.com/DVBhwqkhxkOiLRjUAYJS6mCBJSuC00tB4iWjJmEofJoo/thumbnail.jpg",
      title: "Video title 1",
      playbackId: "DVBhwqkhxkOiLRjUAYJS6mCBJSuC00tB4iWjJmEofJoo",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
    {
      imageUrl: "https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.jpg",
      title: "Video title 2",
      playbackId: "VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
    // Additional videos...
  ];

  return <Playlist videoList={videoList} />;
}
```

Each video object in the playlist should include:
- `playbackId`: Mux playback ID for the video
- `adTagUrl`: VAST/VMAP ad tag URL specific to this video
- `imageUrl`: Thumbnail image URL (used in the end screen)
- `title`: Video title (displayed in the end screen)

The Playlist component provides:
1. Continuous playback with end screen countdown
2. Per-video ad configuration
3. Related videos UI for selection
4. Automatic playback with countdown timer
5. Customizable transition UI between videos

# API Reference

## Attributes

`<mux-video-ads>` includes all attributes from `<mux-video>` plus:

- `adtagurl`: The URL to the VAST/VPAID ad tag for ad requests
- `adbreak`: Toggled automatically when an ad is playing (can be used for CSS targeting)
- `mux-data-keep-session`: Set to true to maintain the same Mux Data session across content and ads

All standard `<mux-video>` attributes are available including:
- `playback-id`: Mux playback ID for the video
- `env-key`: Mux Data environment key
- `metadata-*`: Metadata fields
- Standard HTML5 video attributes (controls, autoplay, etc.)

## Events

In addition to standard `<video>` and `<mux-video>` events, `<mux-video-ads>` adds:

- `adbreakchange`: Fired when entering or exiting an ad break
- `onAdsCompleted`: Fired when all ads have completed playback

# Troubleshooting

## Ad Blocked Message

If the Google IMA SDK is unavailable or blocked by an ad blocker, the component will display a message indicating that the ad experience is unavailable.

## Issues with Ad Playback

If ads are not playing correctly, ensure:
1. The Google IMA SDK is properly loaded before the component initializes
2. The ad tag URL is correctly formatted and accessible
3. The ad container is not being hidden by CSS or other elements

# FAQ

## Do I need to be a Mux customer to use this component?

No, while `<mux-video-ads>` works great with Mux Video, you can use it with any video source by providing a `src` attribute instead of a `playback-id`.

## Can I customize the ad experience?

Currently, the ad playback experience is managed by the Google IMA SDK. You can control the styling of the container and respond to ad events, but detailed ad behavior is determined by the IMA SDK.

## Can I use this with other ad servers?

Yes, as long as your ad server provides VAST/VPAID tags compatible with Google IMA, you can use any ad server by providing the appropriate ad tag URL.

## Known Limitations

- Picture-in-Picture is not supported during ad playback
- Seeking is prevented during ad playback
- The Google IMA SDK must be included separately in your HTML