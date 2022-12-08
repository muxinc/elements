<script>
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
    playback-id="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
    metadata-video-id="video-id-12345"
    metadata-video-title="Star Wars: Episode 3"
    metadata-viewer-user-id="user-id-6789"
    stream-type="on-demand"
    controls
    muted
  ></mux-video>

  <NuxtLink to="/">Browse Elements</NuxtLink>
</template>
