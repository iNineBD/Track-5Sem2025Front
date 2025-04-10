// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "nuxt-echarts", '@nuxt/test-utils/module'],
  runtimeConfig: {
    public: {
      apiServer: process.env.API_SERVER
    }
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
    optimizeDeps: {
      include: ["some-package"],
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
