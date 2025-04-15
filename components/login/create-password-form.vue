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
  // Your password creation logic here
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
      <UFormGroup label="Token" name="token">
        <UInput v-model="state.token" type="text" placeholder="Token" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Senha" />
      </UFormGroup>

      <UFormGroup label="Confirm Password" name="confirmPassword">
        <UInput
          v-model="state.confirmPassword"
          type="password"
          placeholder="Confirmar Senha"
        />
      </UFormGroup>

      <UButton type="submit">Criar Senha</UButton>
    </UForm>
  </div>
</template>
