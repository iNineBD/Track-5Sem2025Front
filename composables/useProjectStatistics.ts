export async function useProjectStatistics(
  projectId: number | null,
  start: string,
  end: string,
) {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  if (!start || !end) {
    throw new Error("Os parâmetros 'data1' e 'data2' são obrigatórios.");
  }

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("data1", start);
    queryParams.append("data2", end);

    const response = await $api.get(
      `${config.public.apiServer}/statistics/data/${projectId}?${queryParams.toString()}`,
    );
    return { projectStatistics: response.data.success };
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return {
      projects: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
