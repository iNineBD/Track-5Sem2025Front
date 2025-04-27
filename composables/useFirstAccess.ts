import { AxiosError } from "axios";

export async function useFirstAccess(email: string) {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    const response = await $api.post(
      `${config.public.apiServer}/access/firstAccess`,
      { email },
    );
    return response.data;
  } catch (error) {
    let errorMessage = "Erro desconhecido";

    if (error instanceof AxiosError && error.response) {
      if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Erro no primeiro acesso:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
}
