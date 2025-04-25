import { useRuntimeConfig } from "#app";

interface LoginResponse {
  id: number;
  email: string;
  role: number;
  token: string;
}

export const useLogin = async (email: string, password: string) => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<LoginResponse>(
      `${config.public.apiServer}/login`,
      {
        method: "POST",
        body: {
          email,
          password,
        },
      }
    );

    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.id,
          email: response.email,
          role: response.role,
        })
      );

      return { success: true, message: "Login bem-sucedido!" };
    } else {
      return {
        success: false,
        message: "Token JWT não encontrado na resposta do servidor.",
      };
    }
  } catch (error: any) {
    console.error("Erro ao fazer login:", error);
    const message =
      error?.data?.error || "Erro ao fazer login. Verifique suas credenciais.";
    return {
      success: false,
      message,
    };
  }
};
