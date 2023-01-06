// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ], '@pinia-plugin-persistedstate/nuxt', ['nuxt-swiper', {
      modules: ['navigation', 'pagination']
    }]],
    css: ['@/assets/css/main.scss'],
    build: {
      transpile: ["@heroicons/vue", "@vueuse/components", "swiper"],
    },
    runtimeConfig: {
    apiKey: process.env.API_KEY || 'SWSCVJNJEGFUWEJPM3IYDNF6WQ',
      public: {
        apiBase: process.env.API_BASE || 'http://shopware.ngsi.de',
      }
    }
  })
  