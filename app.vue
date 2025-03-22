<script setup lang="ts">
</script>

<template
  dir="routing/pages"
  :nav="routes"
  current-route
>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
