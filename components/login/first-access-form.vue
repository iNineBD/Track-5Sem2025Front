<script setup lang="ts">
import { defineEmits, reactive } from "vue";
import type { FormError } from "#ui/types";

const emit = defineEmits<{
  (e: "change-to-create-password"): void;
}>();

const state = reactive({
  email: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email obrigatório." });
  return errors;
};

const handleChangeToCreatePassword = () => {
  emit("change-to-create-password");
};

const sendToken = async () => {
  handleChangeToCreatePassword();
  console.log("Token enviado");
};
</script>

<template>
  <div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="sendToken"
    >
      <UText tag="h2" size="title" weight="bold" class="mb-0 line-clamp-1">
        Primeiro acesso
      </UText>

      <UFormGroup tag="h1" size="lg" label="Email" name="email" class="w-full">
        <UInput v-model="state.email" type="email" placeholder="Email" />
      </UFormGroup>

      <UButton type="submit" class="w-full justify-center">Enviar</UButton>
    </UForm>
  </div>
</template>
