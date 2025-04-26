interface AuthenticateResponse {
  id: number;
  email: string;
  role: number;
  token: string;
}

export const useAuthenticate = async (email: string, password: string) => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<AuthenticateResponse>(
      `${config.public.apiServer}/authenticate`,
      {
        method: "POST",
        body: { email, password },
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
    const message =
      error?.data?.error || "Erro ao fazer login. Verifique suas credenciais.";
    return {
      success: false,
      message,
    };
  }
};

export const useLoginInit = async (email: string) => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(`${config.public.apiServer}/login`, {
      method: "POST",
      body: { email },
    });

    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      message: error?.data?.error || "Erro ao iniciar login.",
    };
  }
};

export const useSetPassword = async (
  email: string,
  token: string,
  newPassword: string
) => {
  const config = useRuntimeConfig();

  try {
    await $fetch(`${config.public.apiServer}/set-password`, {
      method: "POST",
      body: { email, token, newPassword },
    });

    return { success: true, message: "Senha definida com sucesso." };
  } catch (error: any) {
    return {
      success: false,
      message: error?.data?.error || "Erro ao definir a senha.",
    };
  }
};

export const useValidateToken = async (email: string, token: string) => {
  const config = useRuntimeConfig();

  try {
    await $fetch(`${config.public.apiServer}/validate-token`, {
      method: "POST",
      body: { email, token },
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error?.data?.error || "Token inválido ou expirado.",
    };
  }
};
