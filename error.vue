<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div v-if="error" class="mb-0 text-primary text-8xl font-bold">
      {{ error.statusCode }}
    </div>
    <UText v-if="error" tag="h1" size="extra-large" weight="normal" class="mt-0 mb-5">
      {{ error.message }}
    </UText>
    <UButton
      to="/"
      color="primary"
      variant="solid"
      size="lg"
      class="font-bold"
    >
      Home
    </UButton>
  </div>
</template>