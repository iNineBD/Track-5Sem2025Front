<script setup lang="ts">
import { ref } from "vue";
import FirstAccessForm from "./FirstAccessForm.vue";

const normalAccess = ref(true);
const firstAccess = ref(false);
const createPassword = ref(false);

// Change to the Create Password form
const changeToCreatePassword = () => {
  firstAccess.value = false;
  createPassword.value = true;
};

const changeToLogin = () => {
  createPassword.value = false;
  firstAccess.value = false;
  normalAccess.value = true;
};
</script>

<template>
  <div>
    <!-- Login Form -->
    <div v-if="normalAccess">
      <LoginForm />
      <h2>
        Seu primeiro acesso?
        <a href="#" @click.prevent="changeToFirstAccess">Clique aqui!</a>
      </h2>
    </div>

    <!-- First Access Form -->
    <div v-if="firstAccess">
      <FirstAccessForm @change-to-create-password="changeToCreatePassword" />
      <h2>
        Já tem login?
        <a href="#" @click.prevent="changeToLogin">Clique aqui!</a>
      </h2>
    </div>

    <!-- Create Password Form -->
    <div v-if="createPassword">
      <CreatePasswordForm />
      <h2>
        Já tem login?
        <a href="#" @click.prevent="changeToLogin">Clique aqui!</a>
      </h2>
    </div>
  </div>
</template>
