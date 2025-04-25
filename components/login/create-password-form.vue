<script setup lang="ts">
import { reactive } from "vue";
import type { FormError } from "#ui/types";

const state = reactive({
  token: "",
  password: "",
  confirmPassword: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.token)
    errors.push({ path: "token", message: "Token obrigatório." });
  if (!state.password)
    errors.push({ path: "password", message: "Senha obrigatória." });
  if (state.password.length < 6)
    errors.push({
      path: "password",
      message: "Senha deve ter no mínimo 6 caracteres.",
    });
  if (state.confirmPassword !== state.password)
    errors.push({ path: "confirmPassword", message: "Senhas não conferem." });
  return errors;
};

const createPassword = async () => {
  console.log("Password created");
};
</script>

<template>
  <div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="createPassword"
    >
      <UText tag="h2" size="title" weight="bold" class="mb-0 line-clamp-1">
        Login
      </UText>

      <UFormGroup tag="h1" size="lg" label="Token" name="token" class="w-full">
        <UInput v-model="state.token" type="text" placeholder="Token" />
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

      <UFormGroup
        tag="h1"
        size="lg"
        label="Confirmar Senha"
        name="confirmPassword"
        class="w-full"
      >
        <UInput
          v-model="state.confirmPassword"
          type="password"
          placeholder="Confirmar Senha"
        />
      </UFormGroup>

      <UButton type="submit" class="w-full justify-center">Criar Senha</UButton>
    </UForm>
  </div>
</template>
