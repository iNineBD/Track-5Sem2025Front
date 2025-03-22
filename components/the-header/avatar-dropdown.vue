<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'

const props = defineProps<{
  avatarAlt: string
  avatarScr?: string
}>()

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const items = computed(() => [
  [{
    label: props.avatarAlt,
    avatar: {
      alt: props.avatarAlt,
      src: props.avatarScr,
    },
    disabled: true,
    click: () => {
      console.log('Meu perfil')
    },
  }],
  [{
    label: 'Theme',
    icon: isDark.value ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid',
    click: () => {
      colorMode.preference = isDark.value ? 'light' : 'dark'
    },
  }],
  [{
    label: 'Sair',
    icon: 'heroicons:arrow-right-start-on-rectangle-20-solid',
    click: () => {
      navigateTo('/login')
    },
  }],
])
</script>

<template>
  <UDropdown
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar
      :alt="props.avatarAlt"
      :src="props.avatarScr"
      size="sm"
    />
  </UDropdown>
</template>
