<script setup lang="ts">
import type { Project } from "~/types";

const props = defineProps<{
  projects: Project[];
}>();

const model = defineModel<number>();
</script>

<template>
  <div class="flex flex-col">
    <UText tag="p" size="large" weight="semi-bold" class="mt-0">
      Selecione o projeto
    </UText>
    <USelect
      v-model="model"
      :disabled="!props.projects.length"
      placeholder="projeto..."
      class="min-w-52"
      size="xl"
      :options="
        props.projects.map((project) => ({
          label: project.name_project,
          value: project.id_project,
        }))
      "
    />
  </div>
</template>
