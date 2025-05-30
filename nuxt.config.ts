// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-27",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiServer: process.env.API_SERVER,
    },
  },
  colorMode: {
    preference: "light",
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
