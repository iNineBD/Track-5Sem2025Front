import { AxiosError } from "axios";

export async function usePlatforms() {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    const response = await $api.get(
      `${config.public.apiServer}/api/platforms/data`,
    );

    return response.data;
  } catch (error) {
    let errorMessage;

    if (error instanceof AxiosError && error.response) {
      if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Erro ao buscar plataformas:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
}
