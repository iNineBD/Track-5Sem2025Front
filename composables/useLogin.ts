import { AxiosError } from "axios";

export async function useLogin(email: string, password: string) {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    const response = await $api.post(
      `${config.public.apiServer}/access/login`,
      {
        email,
        password,
      },
    );

    const token = response.data?.success?.token;
    if (token) {
      const tokenCookie = useCookie("token", {
        // maxAge: 60 * 60,
        maxAge: 60 * 2,
        path: "/",
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
      });
      tokenCookie.value = token;
    }

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

    console.error("Erro no login:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
}
