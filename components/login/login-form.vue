<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormError } from "#ui/types";

const state = reactive({
  email: "",
  password: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email obrigatório." });
  if (!state.password)
    errors.push({ path: "password", message: "Senha obrigatória." });
  return errors;
};

const login = async () => {
  console.log("Usuário logado");
  // Your login logic here
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
      <UFormGroup tag="h1" size="lg" label="Email" name="email">
        <UInput v-model="state.email" type="email" placeholder="Email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Senha" />
      </UFormGroup>

      <UButton type="submit">Login</UButton>
    </UForm>
  </div>
</template>
