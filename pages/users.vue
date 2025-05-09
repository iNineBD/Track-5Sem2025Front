<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
  name: "users",
  path: "/usuarios",
});

useHead({
  title: "Usuários - Track",
});
</script>

<template><UText>Users</UText></template>
