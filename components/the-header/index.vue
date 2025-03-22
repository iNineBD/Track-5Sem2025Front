<script setup lang="ts">
import { ref } from "vue";
import routes from "../../utils/routes";
import users from "../../assets/data/users.json";

const isOpen = ref(false);
</script>

<template>
  <header
    class="flex justify-between items-center p-5 border-b border-neutral-300 dark:border-neutral-700 transition-colors"
  >
    <div class="flex items-center gap-6">
      <NuxtLink to="/">
        <NuxtImg
          src="/logo-black.svg"
          alt="Logo"
          class="h-6 block dark:hidden"
        />
        <NuxtImg
          src="/logo-white.svg"
          alt="Logo"
          class="h-6 hidden dark:block"
        />
      </NuxtLink>

      <nav class="hidden md:block">
        <ul class="flex space-x-4">
          <li v-for="item in routes" :key="item.to">
            <UButton
              :to="item.to"
              :color="$route.path === item.to ? 'primary' : 'gray'"
              variant="ghost"
              size="lg"
              class="font-bold"
            >
              {{ item.label }}
            </UButton>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex items-center gap-2">
      <avatarDropdown :avatar-alt="users.full_name" />

      <UButton
        v-if="routes.length"
        icon="heroicons:bars-3-16-solid"
        size="sm"
        color="gray"
        square
        variant="ghost"
        class="md:hidden"
        @click="isOpen = true"
      />
    </div>

    <USlideover v-model="isOpen" class="max-w-36 ml-auto">
      <div class="p-4 flex flex-col h-full">
        <UButton
          icon="i-heroicons-x-mark-20-solid"
          color="gray"
          variant="ghost"
          size="sm"
          class="absolute top-5 end-5"
          square
          @click="isOpen = false"
        />
        <nav class="mt-10">
          <ul class="flex flex-col space-y-4">
            <li v-for="item in routes" :key="item.to">
              <UButton
                :to="item.to"
                :color="$route.path === item.to ? 'primary' : 'gray'"
                variant="ghost"
                class="w-full font-bold"
                size="lg"
                @click="isOpen = false"
              >
                {{ item.label }}
              </UButton>
            </li>
          </ul>
        </nav>
      </div>
    </USlideover>
  </header>
</template>
