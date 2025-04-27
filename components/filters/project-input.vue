<script setup lang="ts">
import type { Project, ProjectOption } from "~/types";

const props = defineProps<{
  projects: Project[];
}>();

const model = defineModel<ProjectOption>();

const projectOptions = computed(() => [
  {
    id: null,
    label: "Selecione um Projeto",
    description: "Sem descrição",
  },
  ...props.projects.map((project: Project) => ({
    id: project.id_project,
    label: project.name_project,
    description: project.description,
  })),
]);

onMounted(() => {
  if (!model.value) {
    model.value = projectOptions.value[0];
  }
});
</script>

<template>
  <div class="flex flex-col">
    <UText tag="p" size="large" weight="semi-bold" class="mt-0">
      Selecione o projeto
    </UText>
    <UInputMenu v-model="model" size="xl" :options="projectOptions" />
  </div>
</template>
