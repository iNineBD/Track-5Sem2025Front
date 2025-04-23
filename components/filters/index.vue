<script setup lang="ts">
import { CalendarPicker } from "#components";
import type { Project, ProjectOption } from "~/types";

const props = defineProps<{
  projects: Project[];
}>();

const modelDateRange = defineModel<{ start: Date; end: Date }>("dateRange");
const modelProject = defineModel<ProjectOption>("project");

const dateRange = ref<{ start: Date; end: Date }>(
  modelDateRange.value &&
    typeof modelDateRange.value === "object" &&
    "start" in modelDateRange.value &&
    "end" in modelDateRange.value
    ? (modelDateRange.value as { start: Date; end: Date })
    : { start: new Date(), end: new Date() },
);

watch(dateRange, (val) => {
  modelDateRange.value = val;
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
    <ProjectInput v-model="modelProject" :projects="props.projects" />
    <div class="flex flex-col">
      <UText tag="p" size="large" weight="semi-bold" class="mt-0">
        Selecione o período
      </UText>
      <CalendarPicker v-model="dateRange" />
    </div>
  </div>
</template>
