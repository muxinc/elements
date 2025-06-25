# Integrating Video Ads with MuxNewsPlayer Component

> **Important Note**: This feature is only available in the custom build referenced in this documentation. It is not available in the standard Mux packages from npm.

This documentation covers how to integrate the `MuxNewsPlayer` component provided by the `mux-player-react` package. This integration allows you to display ads within a playlist of Mux videos.

## Table of Contents

1. [Installation](#installation)
2. [Setting Up Dependencies](#setting-up-dependencies)
3. [Implementing the MuxNewsPlayer with Ads](#implementing-the-playlist-with-ads)
4. [Configuration Options](#configuration-options)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

## Installation

**Note:** The video ads integration with the MuxNewsPlayer component is only available in the custom build referenced below. Standard npm package do not include this functionality.

You must use the specific custom build through gitpkg as shown in the example below:

You can execute

```bash
  npm install @mux/mux-player-react
```

or manually add it as a dependency in your package.json

```json
"dependencies": {
  "@mux/mux-player-react": "^3.5.0",
}
```

## Setting Up Dependencies

### 1. Import the Required Package

In your React component:

```jsx
import MuxNewsPlayer from "@mux/mux-player-react/news";
```

### 2. Load the Google IMA SDK

The Google Interactive Media Ads (IMA) SDK is required for ad integration. It should be loaded before rendering the MuxNewsPlayer component:

```jsx
import { useEffect, useState } from "react";

export default function YourComponent() {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the IMA SDK
    const loadImaSdk = () => {
      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
        console.log("Google IMA SDK loaded");
      };
      script.onerror = () => {
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

  // Rest of your component...
}
```

## Implementing the MuxNewsPlayer with Ads

### 1. Define Your Video List

Create an array of video objects that includes both video information and ad tag URLs:

```jsx
const videoList = [
  {
    imageUrl: "https://image.mux.com/[PLAYBACK_ID]/thumbnail.jpg",
    title: "Video Title 1",
    playbackId: "[PLAYBACK_ID]",
    adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
    // Or, if you need to dynamically and asynchronously fetch the ad tag URL, something like:
    // adTagUrl: () => fetchAdTagUrlFor('[PLAYBACK_ID]'),
  },
  // Add more videos as needed
];
```

Each video object should contain:
- `imageUrl`: Thumbnail image URL for the video
- `title`: Title of the video
- `playbackId`: Mux playback ID for the video
- `adTagUrl`: A VAST or VMAP URL string for the ads to be displayed with this video, or a function that yields either the URL string or a Promise that (eventually) yields the string.

### 2. Render the MuxNewsPlayer Component

Only render the MuxNewsPlayer component once the IMA SDK is loaded:

```jsx
return (
  <>
    {sdkLoaded && <MuxNewsPlayer videoList={videoList} />}
  </>
);
```

### 3. Complete Implementation Example

```jsx
import Head from 'next/head';
import { useEffect, useState } from "react";
import MuxNewsPlayer from "@mux/mux-player-react/news";

export default function VideoMuxNewsPlayerPage() {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the IMA SDK
    const loadImaSdk = () => {
      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
        console.log("Google IMA SDK loaded");
      };
      script.onerror = () => {
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

  const videoList = [
    {
      imageUrl: "https://image.mux.com/DVBhwqkhxkOiLRjUAYJS6mCBJSuC00tB4iWjJmEofJoo/thumbnail.jpg",
      title: "Test video title 1",
      playbackId: "DVBhwqkhxkOiLRjUAYJS6mCBJSuC00tB4iWjJmEofJoo",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
    {
      imageUrl: "https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.jpg",
      title: "Test video title 2",
      playbackId: "VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
    {
      imageUrl: "https://image.mux.com/gZh02tKCI015W6k2XdYSh4srGnksYvsoT1uHsYOlv4Blo/thumbnail.jpg",
      title: "Test video title 3",
      playbackId: "gZh02tKCI015W6k2XdYSh4srGnksYvsoT1uHsYOlv4Blo",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
  ];

  return (
    <>
      <Head>
        <title>Video MuxNewsPlayer with Ads</title>
      </Head>

      {sdkLoaded && <MuxNewsPlayer videoList={videoList} />}
    </>
  );
}
```

## Configuration Options

### Video Object Properties

Each video in the `videoList` array can have the following properties:

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `playbackId` | `string` | Mux playback ID for the video | Yes |
| `adTagUrl` | `string \| () => string \| () => Promise<string>` | URL for the VAST or VMAP ad tag or function that yields the URL or function that yields a Promise that yields the URL | Yes for ads |
| `imageUrl` | `string` | URL for the video thumbnail | Yes |
| `title` | `string` | Title of the video | Yes |

### Ad-related events

For a list of all ad-related events, see the docs for [mux-video with ads](../../../mux-video/src/ads/README.md#events). Like other Mux Player React events,
callbacks are supported using the same naming conventions, so e.g. the `adskip` callback React prop will be `onAdSkip`.

## Troubleshooting

### Common Issues

1. **Ads not displaying**:
   - Ensure the IMA SDK is loaded correctly
   - Check that ad tag URLs are correctly formatted
   - Verify that ad blocking software is not active

2. **Console errors about IMA not defined**:
   - Make sure you're checking if the SDK is loaded before rendering the MuxNewsPlayer
   - Verify the script is loading successfully in the network tab
