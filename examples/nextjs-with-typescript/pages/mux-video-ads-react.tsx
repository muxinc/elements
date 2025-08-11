import Head from 'next/head';
import Script from 'next/script';
import { useRef, useState, useEffect } from 'react';
import MuxVideoAds from '@mux/mux-video/ads/react';

function MuxVideoPage() {
  const mediaElRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [eventLogs, setEventLogs] = useState<string[]>([]);

  // Function to log events to the textarea
  const logEvent = (event: string) => {
    const timestamp = new Date().toISOString().substr(11, 12);
    setEventLogs(prev => [...prev, `${timestamp} - ${event}`]);
  };

  // Auto-scroll textarea to bottom when logs update if scrolled
  useEffect(() => {
    if (textareaRef.current) {
      const isScrolledToEnd = textareaRef.current.scrollTop >= textareaRef.current.scrollHeight - textareaRef.current.offsetHeight - 50;
      if (isScrolledToEnd) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    }
  }, [eventLogs]);

  // Set up event listeners when video element is available
  useEffect(() => {
    const videoElement = mediaElRef.current;
    if (!videoElement || !sdkReady) return;

    const { Events } = (videoElement.constructor as typeof MuxVideoElement);

    // Create event handler functions mapped by event name
    const eventHandlers = Events.reduce((handlers, eventName) => {
      handlers[eventName] = () => logEvent(eventName);
      return handlers;
    }, {} as Record<string, () => void>);

    // Add event listeners
    Events.forEach(eventName => {
      videoElement.addEventListener(eventName, eventHandlers[eventName]);
    });

    return () => {
      if (!videoElement) return;
      // Remove event listeners using the same handler references
      Events.forEach(eventName => {
        videoElement.removeEventListener(eventName, eventHandlers[eventName]);
      });
    };
  }, [sdkReady]);

  return (
    <>
      <Head>
        <title>&lt;MuxVideoAds/&gt; Demo</title>
      </Head>

      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        onReady={() => {
          setSdkReady(true);
          logEvent("Google IMA SDK loaded");
        }}
        onError={() => {
          setSdkReady(true);
          logEvent("Google IMA SDK failed to load");
        }}
        strategy="afterInteractive"
      />

      {/*
        single preroll skippable
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="

        single postroll
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpostonly&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="

        VMAP - Pre-roll Single Ad, Mid-roll Standard Pod with 3 ads, Post-roll Single Ad
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpostpod&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator="
      */}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {sdkReady && <MuxVideoAds
          ref={mediaElRef}
          playbackId="VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA"
          controls
          playsInline={true}
          preferPlayback="mse"
          allowAdBlocker={true}
          adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
        />}
        
        <div>
          <h3>Event Log</h3>
          <textarea
            ref={textareaRef}
            readOnly
            value={eventLogs.join('\n')}
            style={{
              width: '100%',
              height: '300px',
              fontFamily: 'monospace',
              fontSize: '14px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              overflowY: 'auto'
            }}
          />
        </div>
      </div>
    </>
  );
}

export default MuxVideoPage;
