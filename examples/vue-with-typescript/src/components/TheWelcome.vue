<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import IconPlay from "./icons/IconPlay.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <IconPlay />
    </template>
    <template #heading>Check Out Open Elements!</template>
    Choose one of the Open Elements to Preview
  </WelcomeItem>
</template>
