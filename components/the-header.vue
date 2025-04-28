<script setup lang="ts">
import useRoutes from "../utils/routes";

const routes = useRoutes();
const routesKey = computed(() => JSON.stringify(routes.value));

const isOpen = ref(false);
</script>

<template class="relative">
  <header
    class="fixed top-0 left-0 w-full z-50 p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
  >
    <nav class="flex flex-row justify-between items-center gap-4">
      <NuxtLink to="/">
        <NuxtImg
          src="/logo-black.svg"
          alt="Logo"
          class="h-5 block dark:hidden"
        />
        <NuxtImg
          src="/logo-white.svg"
          alt="Logo"
          class="h-5 hidden dark:block"
        />
      </NuxtLink>
      <UHorizontalNavigation
        :key="routesKey"
        class="hidden md:flex"
        :links="routes"
      />
      <UButton
        icon="heroicons:bars-3-16-solid"
        size="sm"
        color="gray"
        square
        variant="ghost"
        class="md:hidden"
        @click="isOpen = true"
      />
    </nav>
  </header>

  <USlideover v-model="isOpen" class="max-w-36 ml-auto">
    <div class="p-4 flex flex-col h-full">
      <UVerticalNavigation :links="[routes[0]]" />
      <div class="mt-auto">
        <UVerticalNavigation :links="[routes[1]]" />
      </div>
    </div>
  </USlideover>
</template>
