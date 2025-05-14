<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

definePageMeta({
  layout: "login",
  middleware: "auth",
});

const credentials = reactive({
  email: "",
  password: "",
});

const toast = useToast();

const loading = ref(false);

const errors = reactive({
  email: false,
  password: false,
});

async function handleLogin() {
  loading.value = true;
  const { email, password } = credentials;

  errors.email = !email;
  errors.password = !password;

  if (errors.email || errors.password) {
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

  const response = await useLogin(email, password);
  loading.value = false;

  if (response.success) {
    const data = {
      name: response.success.name_user,
      email: response.success.email,
      token: response.success.token,
      nameRole: response.success.name_role,
      idUser: response.success.id_user,
    };

    userStore.login(data);

    await navigateTo("/");
    toast.add({
      icon: "i-heroicons-check-circle",
      color: "green",
      title: "Login realizado",
      description: "Você foi logado com sucesso!",
      timeout: 6000,
    });
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Erro ao fazer login. Tente novamente.",
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
      @submit.prevent="handleLogin"
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
          Entre para continuar
        </UText>
      </div>

      <div class="flex flex-col">
        <UText weight="semi-bold" class="mt-0"> Email </UText>
        <UInput
          v-model="credentials.email"
          type="email"
          placeholder="Email"
          :color="errors.email ? 'red' : undefined"
          @input="errors.email = false"
        />
      </div>

      <div class="flex flex-col">
        <UText weight="semi-bold" class="mt-0"> Senha </UText>
        <UInput
          v-model="credentials.password"
          type="password"
          placeholder="Senha"
          :color="errors.password ? 'red' : undefined"
          @input="errors.password = false"
        />
      </div>

      <UButton type="submit" :loading="loading" block>Entrar</UButton>

      <div class="flex flex-col sm:flex-row sm:gap-2">
        <UText size="medium" class="mt-0 mb-0">Primeiro acesso?</UText>
        <ULink
          to="/login/primeiro-acesso"
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
