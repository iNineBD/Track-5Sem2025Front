<script setup lang="ts">
import { useRouter } from 'vue-router'
import routes from './utils/routes'
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
