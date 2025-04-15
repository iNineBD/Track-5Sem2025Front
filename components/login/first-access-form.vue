<script setup lang="ts">
import { reactive } from "vue";
import type { FormError } from "#ui/types";

const state = reactive({
  email: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email obrigatório." });
  return errors;
};

const sendToken = async () => {
  console.log("Token enviado");
  // Your sendToken logic here
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
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" placeholder="Email" />
      </UFormGroup>
    </UForm>
  </div>
</template>
