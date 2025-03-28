import { useNuxtApp, useRuntimeConfig } from "#app";

export function useProjectStatistics(projectId: string | number) {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  const { data, pending, error } = useAsyncData(
    `fetchProjectStatistics-${projectId}`,
    async () => {
      try {
        const response = await $api.get(
          `${config.public.apiServer}/statistics/data/${projectId}`
        );
        return { projectStatistics: response.data.success };
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        return {
          projectStatistics: [],
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }
    }
  );

  return {
    data: computed(() => data.value?.projectStatistics || []),
    pending,
    error: computed(() => data.value?.error || null),
  };
}
