import { AxiosError } from "axios";

export async function useUpdateRole({
  id_role,
  id_user,
}: {
  id_role: number;
  id_user: number;
}) {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    const response = await $api.put(
      `${config.public.apiServer}/api/usermanagement/update`,
      { id_role, id_user },
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

    console.error("Erro ao atualizar role:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
}
