<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticate } from "~/composables/useAuth";
import type { FormError } from "#ui/types";

const router = useRouter();

const state = reactive({
  email: "",
  password: "",
});

const errorMessage = ref("Usuário não encontrado!");

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email obrigatório." });
  if (!state.password)
    errors.push({ path: "password", message: "Senha obrigatória." });
  return errors;
};

const login = async () => {
  errorMessage.value = "";
  const result = await useAuthenticate(state.email, state.password);

  if (result.success) {
    router.push("/"); // redireciona para a home após login
  } else {
    errorMessage.value = result.message;
  }
};
</script>

<template>
  <div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="login"
    >
      <UText tag="h2" size="title" weight="bold" class="mb-0 line-clamp-1">
        Login
      </UText>

      <UFormGroup tag="h1" size="lg" label="Email" name="email" class="w-full">
        <UInput v-model="state.email" type="email" placeholder="Email" />
      </UFormGroup>

      <UFormGroup
        tag="h1"
        size="lg"
        label="Senha"
        name="password"
        class="w-full"
      >
        <UInput v-model="state.password" type="password" placeholder="Senha" />
      </UFormGroup>

      <UButton type="submit" class="w-full justify-center">Login</UButton>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </div>
    </UForm>
  </div>
</template>
