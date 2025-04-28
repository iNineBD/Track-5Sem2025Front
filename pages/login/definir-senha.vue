<script setup lang="ts">
definePageMeta({
  layout: "login",
});

const credentials = reactive({
  email: "",
  token: "",
  newPassword: "",
  confirmPassword: "",
});

const toast = useToast();

const loading = ref(false);

const errors = reactive({
  email: false,
  token: false,
  newPassword: false,
  confirmPassword: false,
});

async function handleSetPassword() {
  loading.value = true;
  const { email, token, newPassword, confirmPassword } = credentials;

  errors.email = !email;
  errors.token = !token;
  errors.newPassword = !newPassword;
  errors.confirmPassword = !confirmPassword;

  if (
    errors.email ||
    errors.token ||
    errors.newPassword ||
    errors.confirmPassword
  ) {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: "Todos os campos são obrigatórios.",
      timeout: 6000,
    });
    loading.value = false;
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: "As senhas não coincidem.",
      timeout: 6000,
    });
    loading.value = false;
    return;
  }

  const response = await useSetPassword({ email, token, newPassword });
  loading.value = false;

  if (response.success) {
    toast.add({
      icon: "i-heroicons-check-circle",
      color: "green",
      title: "Sucesso",
      description: "Senha definida com sucesso!",
      timeout: 6000,
    });
    await navigateTo("/login");
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description:
        response.message || "Erro ao definir senha. Tente novamente.",
      timeout: 6000,
    });
  }
}
</script>

<template>
  <UCard class="w-3/4 md:w-2/4 lg:w-1/4">
    <UForm
      :state="credentials"
      class="flex flex-col gap-4 w-full"
      @submit.prevent="handleSetPassword"
    >
      <div class="flex flex-col">
        <UText
          size="title"
          weight="bold"
          class="mt-0 mb-0"
          align="center"
          color="primary"
        >
          Login
        </UText>
        <UText size="large" class="mt-0 mb-0" align="center">
          Defina sua senha
        </UText>
      </div>

      <div class="flex flex-col">
        <UText weight="semi-bold">Email</UText>
        <UInput
          v-model="credentials.email"
          type="email"
          placeholder="Email"
          :color="errors.email ? 'red' : undefined"
          @input="errors.email = false"
        />
      </div>

      <div class="flex flex-col">
        <UText weight="semi-bold">Token</UText>
        <UInput
          v-model="credentials.token"
          placeholder="Token recebido"
          :color="errors.token ? 'red' : undefined"
          @input="errors.token = false"
        />
      </div>

      <div class="flex flex-col">
        <UText weight="semi-bold">Senha</UText>
        <UInput
          v-model="credentials.newPassword"
          type="password"
          placeholder="Senha"
          :color="errors.newPassword ? 'red' : undefined"
          @input="errors.newPassword = false"
        />
      </div>

      <div class="flex flex-col">
        <UText weight="semi-bold">Confirmar Senha</UText>
        <UInput
          v-model="credentials.confirmPassword"
          type="password"
          placeholder="Confirmar Senha"
          :color="errors.confirmPassword ? 'red' : undefined"
          @input="errors.confirmPassword = false"
        />
      </div>

      <UButton type="submit" :loading="loading" block>Salvar</UButton>

      <div class="flex flex-col sm:flex-row sm:gap-2">
        <UText size="medium" class="mt-0 mb-0">Já tem acesso?</UText>
        <ULink
          to="/login"
          class="text-primary hover:text-black dark:hover:text-white"
        >
          Clique aqui
        </ULink>
      </div>
      <div class="mt-6 flex justify-center">
        <NuxtImg
          src="/logo-black.svg"
          alt="Logo"
          class="h-6 block dark:hidden"
        />
        <NuxtImg
          src="/logo-white.svg"
          alt="Logo"
          class="h-6 hidden dark:block"
        />
      </div>
    </UForm>
  </UCard>
</template>
