/* eslint-disable no-console */
import type { DRMSystemsConfiguration } from 'hls.js';
import HLS from 'hls.js';
import { useEffect, useRef } from 'react';

// import type { Props } from '../types';
type Props = { playbackId: string; playbackData: PlaybackData };

/**
 * Represents the data needed to play a video.
 *
 * For videos protected by DRM, both tokens are needed. The playback token
 * provides access and the DRM token allows for decryption.
 *
 * Playback policies control who can view content, while DRM provides additional
 * encryption to prevent unauthorized copying.
 *
 * @see https://www.mux.com/docs/guides/secure-video-playback
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm
 */
export interface PlaybackData {
  /**
   * Unique identifier for the video asset.
   */
  playbackId: string;
  /**
   * URL of the video including the playback token.
   */
  tokens: {
    /**
     * JSON Web Token (JWT) used to acquire the DRM license.
     */
    drm?: string;
    /**
     * JSON Web Token (JWT) used to authenticate the signed playback policy.
     */
    playback?: string;
  };
}

/**
 * The types of licenses that Mux supports.
 *
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm#generic-player-integration
 */
type LicenseType = 'widevine' | 'fairplay' | 'playready';

/**
 * Constructs the Mux-specific license URL for the given license type for the
 * given playback data.
 *
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm#generic-player-integration
 */
const licenseUrlFor = (type: LicenseType, { playbackId, tokens: { drm: drmToken } }: PlaybackData) => {
  return `https://license.mux.com/license/${type}/${playbackId}?token=${drmToken}`;
};

/**
 * Constructs the Mux-specific server certificate URL for the given license
 * type for the given playback data.
 *
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm#generic-player-integration
 */
const serverCertificateUrlFor = (type: LicenseType, { playbackId, tokens: { drm: drmToken } }: PlaybackData) => {
  return `https://license.mux.com/appcert/${type}/${playbackId}?token=${drmToken}`;
};

/**
 * Returns the HLS DRM systems configuration for the given playback data. The
 * fields we need to provide in this configuration are determined by what Mux
 * supports.
 *
 * @see https://github.com/video-dev/hls.js/blob/master/docs/API.md#drmsystems
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm#widevine
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm#fairplay
 * @see https://www.mux.com/docs/guides/protect-videos-with-drm#playready
 */
export const drmSystemsConfig = (playbackData: PlaybackData): DRMSystemsConfiguration => ({
  'com.widevine.alpha': {
    licenseUrl: licenseUrlFor('widevine', playbackData),
  },
  'com.apple.fps': {
    licenseUrl: licenseUrlFor('fairplay', playbackData),
    serverCertificateUrl: serverCertificateUrlFor('fairplay', playbackData),
  },
  'com.microsoft.playready': {
    licenseUrl: licenseUrlFor('playready', playbackData),
  },
});

export const SimpleVideoPlayer = (props: PlaybackData) => {
  const { playbackId, tokens: { playback: playbackToken, drm: drmToken } = {} } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = `https://stream.mux.com/${playbackId}.m3u8?token=${playbackToken}`;

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (!HLS.isSupported()) {
      videoRef.current.src = videoUrl;
      return;
    }

    const hls = new HLS({
      debug: true,

      /**
       * When there is playback data, we're using Mux's DRM system, so we
       * need to enable Encrypted Media Extensions (EME).
       *
       * @see https://en.wikipedia.org/wiki/Encrypted_Media_Extensions
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API
       * @see https://github.com/video-dev/hls.js/blob/master/docs/API.md#emeenabled
       */
      emeEnabled: !!drmToken,

      /**
       * Describes the DRM systems that are supported by our DRM provider (Mux).
       *
       * @see https://github.com/video-dev/hls.js/blob/master/docs/API.md#drmsystems
       */
      drmSystems: drmToken ? drmSystemsConfig(props) : {},
    });

    hls.loadSource(videoUrl);
    hls.attachMedia(videoRef.current);

    hls.on(HLS.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case HLS.ErrorTypes.NETWORK_ERROR:
            console.log('Network error occurred', event, data);
            break;
          case HLS.ErrorTypes.MEDIA_ERROR:
            console.log('Media error occurred', event, data);
            break;
          case HLS.ErrorTypes.OTHER_ERROR:
            console.log('An unknown error occurred', event, data);
            break;
        }
      }
    });
  }, [props, videoUrl]);

  return (
    <video ref={videoRef} controls>
      <track kind="captions" />
    </video>
  );
};
/* eslint-enable no-console */
