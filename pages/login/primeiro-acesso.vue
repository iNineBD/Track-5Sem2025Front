<script setup lang="ts">
definePageMeta({
  layout: "login",
});

const credentials = reactive({
  email: "",
});

const toast = useToast();

const loading = ref(false);

const errors = reactive({
  email: false,
  password: false,
});

async function handleFirstAccess() {
  loading.value = true;
  const { email } = credentials;

  errors.email = !email;

  if (errors.email) {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: "Preencha o email.",
      timeout: 6000,
    });
    loading.value = false;
    return;
  }

  const response = await useFirstAccess(email);
  loading.value = false;

  if (response.success) {
    await navigateTo(`/login/definir-senha`);
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "green",
      title: "Success",
      description: "Email enviado com sucesso. Verifique sua caixa de entrada.",
      timeout: 6000,
    });
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Error",
      description:
        response.message ||
        "Erro ao enviar o email. Tente novamente mais tarde.",
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
      @submit.prevent="handleFirstAccess"
    >
      <div class="flex flex-col">
        <UText
          size="title"
          weight="bold"
          class="mt-0 mb-0"
          align="center"
          color="primary"
          >Login</UText
        >
        <UText size="large" class="mt-0 mb-0" align="center">
          Primeiro Acesso
        </UText>
      </div>
      <UInput
        v-model="credentials.email"
        type="email"
        placeholder="Email"
        :color="errors.email ? 'red' : undefined"
        @input="errors.email = false"
      />
      <UButton type="submit" :loading="loading" block>Enviar</UButton>
      <div class="flex flex-col sm:flex-row sm:gap-2">
        <UText size="medium" class="mt-0 mb-0">Já tem acesso?</UText>
        <ULink
          to="/login"
          class="text-primary hover:text-black dark:hover:text-white"
        >
          Clique aqui
        </ULink>
      </div>
    </UForm>
  </UCard>
</template>
