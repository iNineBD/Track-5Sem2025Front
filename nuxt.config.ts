// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/test-utils/module', '@nuxt/eslint'],
  runtimeConfig: {
    public: {
      apiServer: process.env.API_SERVER
    }
  },
  colorMode: {
    preference: 'light'
  },
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    optimizeDeps: {
      include: ["some-package"],
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})