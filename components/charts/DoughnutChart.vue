<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { useDoughnut } from "~/utils/chartConfig";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  data: number[];
  noData?: boolean;
  total: number;
  title?: string;
}>();

const chartConfig = useDoughnut(props.labels, props.data);
</script>

<template>
  <UCard class="border-gray-200 dark:border-gray-700">
    <template #header>
      <UText tag="h1" size="large" weight="medium" class="mt-0 mb-0">{{
        title
      }}</UText>
    </template>
    <template #default>
      <div class="flex items-center justify-center h-64">
        <UText v-if="noData" tag="h1" size="large" weight="normal" color="gray"
          >No data</UText
        >
        <Doughnut
          v-else
          :data="chartConfig.data"
          :options="chartConfig.options"
          class="max-h-80"
        />
      </div>
    </template>
    <template #footer>
      <UText
        v-if="!noData"
        tag="h1"
        size="medium"
        weight="normal"
        class="mt-0 mb-0"
      >
        Total: {{ total }} cards
      </UText>
    </template>
  </UCard>
</template>
