<script setup lang="ts">
import { sub, isSameDay, type Duration } from "date-fns";

const props = defineProps<{
  isDisabled: boolean;
}>();

const modelValue = defineModel<{ start: Date; end: Date }>();

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];

const selected = computed({
  get: () => modelValue.value,
  set: (val) => {
    modelValue.value = val;
  },
});

function isRangeSelected(duration: Duration) {
  return (
    selected.value &&
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() };
}

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton
      icon="i-heroicons-calendar-days-20-solid"
      size="xl"
      variant="solid"
      color="white"
      block
      :disabled="props.isDisabled"
    >
      {{ formatDate(selected?.start ?? new Date()) }} -
      {{ formatDate(selected?.end ?? new Date()) }}
    </UButton>

    <template #panel="{ close }">
      <div
        class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
      >
        <div class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            :class="[
              isRangeSelected(range.duration)
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            ]"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <DatePicker v-model="selected" @close="close" />
      </div>
    </template>
  </UPopover>
</template>
