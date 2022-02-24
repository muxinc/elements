<script setup lang="ts">
import "@mux-elements/mux-video";
</script>

<template>
  <main>
    <!-- Test attributes
      style="aspect-ratio: 16 / 10"
      primary-color="#5c6ac4"
      secondary-color="#ecc94b"
      playback-id="xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE"
      poster="https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0"
      src="https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8"
      muted
      volume="0.4"
      playbackrate="2"
      forward-seek-offset="10"
      backward-seek-offset="10"
     -->

    <mux-video
      playback-id="g65IqSFtWdpGR100c2W8VUHrfIVWTNRen"
      env-key="5e67cqdt7hgc9vkla7p0qch7q"
      metadata-video-id="video-id-54321"
      metadata-video-title="Vue 3: Episode 2"
      metadata-viewer-user-id="user-id-vue3007"
      stream-type="on-demand"
      controls
    />
  </main>
</template>
