<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({}),
  },
});
const reloadPage = () => {
  window.location.reload();
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div v-if="props.error" class="mb-0 text-primary text-8xl font-bold">
      {{ props.error.statusCode }}
    </div>
    <UText
      v-if="props.error"
      tag="h1"
      size="extra-large"
      weight="normal"
      class="mt-0 mb-5"
    >
      {{ props.error.message }}
    </UText>
    <UButton color="primary" size="lg" class="font-bold" @click="reloadPage">
      Reload
    </UButton>
  </div>
</template>
