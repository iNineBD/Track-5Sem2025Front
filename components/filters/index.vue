<script setup lang="ts">
import { CalendarPicker } from "#components";
import type { Project, Platforms } from "~/types";

const props = defineProps<{
  projects: Project[];
  platforms: Platforms[];
  selectedProject: boolean;
}>();

const modelDateRange = defineModel<{ start: Date; end: Date }>("dateRange");
const modelProject = defineModel<number>("project");
const modelPlatform = defineModel<number>("platform");

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
    <PlatformsInput v-model="modelPlatform" :platforms="props.platforms" />
    <ProjectInput v-model="modelProject" :projects="props.projects" />
    <div class="flex flex-col">
      <UText tag="p" size="large" weight="semi-bold" class="mt-0">
        Selecione o período
      </UText>
      <CalendarPicker v-model="dateRange" :is-disabled="selectedProject" />
    </div>
  </div>
</template>
