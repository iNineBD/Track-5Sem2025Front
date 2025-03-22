// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    public: {
      apiServer: process.env.API_SERVER,
    },
  },
  compatibilityDate: "2024-11-01",
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
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
});
