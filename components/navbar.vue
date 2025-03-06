<script setup lang="ts">
import routes from '../utils/routes'
</script>

<template>
    <header class="flex items-center justify-between p-4">
      <img src="/track.svg" alt="Logo" class="h-8 mr-4" />
      <nav>
        <ul class="flex space-x-4">
          <li v-for="item in routes" :key="item.to">
            <NuxtLink :to="item.to" class="text-primary">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <buttonTheme />
    </header>
</template>