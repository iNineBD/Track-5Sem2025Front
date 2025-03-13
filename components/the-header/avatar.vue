<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const items = computed(() => [
  [{
    label: 'Meu Perfil',
    avatar: {
      alt: 'Meu Perfil',
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    disabled: true,
    click: () => {
      console.log('Edit')
    }
  }], 
  [{
    label: 'Theme',
    icon: isDark.value ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid',
    click: () => {
      colorMode.preference = isDark.value ? 'light' : 'dark'
    }
  }]
])
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UAvatar alt="Ali Mohamed" size="sm" />
  </UDropdown>
</template>
