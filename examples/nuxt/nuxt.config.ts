// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['mux-player', 'mux-video', 'mux-audio'].includes(tag)
    }
  }
})
