<script setup lang="ts">
import "@mux/mux-player";
</script>

<style>
mux-player {
  display: block;
  width: 100%;
  margin: 1rem 0 2rem;
  background-color: #000;
  line-height: 0;
}

mux-player:not([audio]) {
  aspect-ratio: 16 / 9;
}
</style>

<template>
  <mux-player
    stream-type="on-demand"
    playback-id="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
    start-time="4.6"
  ></mux-player>

  <RouterLink to="/">Browse Elements</RouterLink>
</template>
