<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'

useHead({
  title: 'Home - Track',
})

const { data: projects, pending: loadingProjects, error } = useProjects()
const toast = useToast()

if (error.value) {
  toast.add({
    icon: 'i-heroicons-x-circle',
    color: 'red',
    title: 'Error',
    description: 'Falha ao carregar projetos. Tente novamente mais tarde.',
    timeout: 0,
  })
}
</script>

<template>
  <div>
    <UText
      tag="h1"
      size="title"
      weight="bold"
    >
      Meus Projetos
    </UText>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <USkeleton
          v-for="(_, index) in 4"
          v-if="loadingProjects || error"
          :key="index"
          class="w-full h-80"
          :ui="{ rounded: 'rounded-lg' }"
        />
        <ProjectCard
          v-for="project in projects"
          v-else
          :key="project.id"
          :project="project"
          @click="navigateTo('/projects/' + project.id)"
        />
      </div>
    </div>
  </div>
</template>
