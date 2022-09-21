<script setup lang="ts">
import "@mux/mux-video";
</script>

<style>
mux-video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1rem 0 2rem;
}
</style>

<template>
  <mux-video
    playback-id="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
    preload="auto"
    start-time="4.6"
    metadata-video-id="video-id-12345"
    metadata-video-title="Star Wars: Episode 3"
    metadata-viewer-user-id="user-id-6789"
    stream-type="on-demand"
    controls
    muted
  ></mux-video>

  <RouterLink to="/">Browse Elements</RouterLink>
</template>
