import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    workspace: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        },
      },
    },
    coverage: {
      provider: "v8", // Use o provider v8 para cobertura de código
      reporter: ["text", "lcov", "json"], // Escolha os formatos de saída desejados
      include: ["src/**/*.{js,ts,vue}"], // Defina quais arquivos devem ser analisados para cobertura
      reportsDirectory: "./coverage",
    },
  },
});

// environmentOptions: {},
