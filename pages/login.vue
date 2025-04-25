<script setup lang="ts">
import { ref } from "vue";
import FirstAccessForm from "~/components/login/first-access-form.vue";
import LoginForm from "~/components/login/login-form.vue";
import CreatePasswordForm from "~/components/login/create-password-form.vue";

definePageMeta({
  layout: "login",
});

const normalAccess = ref(true);
const firstAccess = ref(false);
const createPassword = ref(false);

const changeToCreatePassword = () => {
  firstAccess.value = false;
  normalAccess.value = false;
  createPassword.value = true;
};

const changeToFirstAccess = () => {
  normalAccess.value = false;
  createPassword.value = false;
  firstAccess.value = true;
};

const changeToLogin = () => {
  createPassword.value = false;
  firstAccess.value = false;
  normalAccess.value = true;
};
</script>

<template>
  <div>
    <!-- Formulário Login -->
    <div v-if="normalAccess">
      <LoginForm />
      <UText
        tag="h3"
        size="medium"
        weight="semi-bold"
        class="mb-0 line-clamp-1"
      >
        Seu primeiro acesso?
        <a href="#" @click.prevent="changeToFirstAccess">Clique aqui!</a>
      </UText>
    </div>

    <!-- Formulário Primeiro Acesso -->
    <div v-if="firstAccess">
      <FirstAccessForm @change-to-create-password="changeToCreatePassword" />
      <UText
        tag="h3"
        size="medium"
        weight="semi-bold"
        class="mb-0 line-clamp-1"
      >
        Já tem login?
        <a href="#" @click.prevent="changeToLogin">Clique aqui!</a>
      </UText>
    </div>

    <!-- Formulário Criar Senha -->
    <div v-if="createPassword">
      <CreatePasswordForm />
      <UText
        tag="h3"
        size="medium"
        weight="semi-bold"
        class="mb-0 line-clamp-1"
      >
        Já tem login?
        <a href="#" @click.prevent="changeToLogin">Clique aqui!</a>
      </UText>
    </div>
  </div>
</template>
