<script setup lang="ts">
import "@mux/mux-audio";
</script>

<style>
mux-audio {
  width: 100%;
  margin: 1rem 0 2rem;
}
</style>

<template>
  <mux-audio
    playback-id="vDpm5ygrRJgfIEPNIc02IJR4Trf3z00AiP"
    metadata-video-id="episode-id-12345"
    metadata-video-title="Podcast: Episode 3"
    metadata-viewer-user-id="user-id-6789"
    muted
    controls
  ></mux-audio>

  <RouterLink to="/">Browse Elements</RouterLink>
</template>
