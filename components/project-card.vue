<script setup lang="ts">
import type { Project } from '~/types';
import { formatDate, differenceBetweenDays, daysAgo } from '~/utils';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <UCard
    class="w-full hover:scale-[1.02] hover:border border-gray-200 dark:border-gray-700 duration-300 ease-in cursor-pointer"
  >
    <template #header>
      <div class="flex flex-row items-center space-x-4 overflow-hidden break-all">
        <UAvatar 
          :alt="project.name"
          size="3xl"
        />
        <div>
          <UText
            tag="h2"
            size="extra-large"
            color="primary"
            weight="semi-bold"
            class="mb-0 line-clamp-1"
          >
          {{ project.name }}
          </UText>
          <UText
            size="small"
            weight="normal"
            class="line-clamp-3"
          >
            {{ project.description }}
          </UText>
        </div>
      </div>
    </template>
    <div class="flex flex-col space-y-4 items-start">
      <UBadge :color="project.finish_date ? 'green' : 'yellow'" :label="project.finish_date ? 'Finalizado' : 'Em andamento'" />
      <UText 
        size="medium"
        weight="normal"
        class="mt-2"
      >
        Duração: {{ differenceBetweenDays(props.project.created_date, props.project.finish_date) }} dias
      </UText>
      <UText 
        size="medium"
        weight="normal"
        class="mt-2"
      >
        Última atualização há {{ daysAgo(props.project.modified_date) }} dias
      </UText>
    </div>
    <template #footer>
      <UText 
        size="small"
        weight="normal"
      >
        {{ formatDate(project.created_date) }}
      </UText>
    </template>
  </UCard>
</template>
