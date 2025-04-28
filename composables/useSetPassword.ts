import { AxiosError } from "axios";

interface DefinirSenhaPayload {
  email: string;
  token: string;
  newPassword: string;
}

export async function useSetPassword({
  email,
  token,
  newPassword,
}: DefinirSenhaPayload) {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    const response = await $api.post(
      `${config.public.apiServer}/access/setPassword`,
      {
        email,
        token,
        newPassword,
      },
      {
        params: {
          Authorization: token,
        },
      },
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

    console.error("Erro ao definir senha:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
}
