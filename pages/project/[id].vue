<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProjectStatistics } from "~/composables/useProjectStatistics";
import { computed } from "vue";
import BarChart from "~/components/charts/bar-chart.vue";
import PieChart from "~/components/charts/pie-chart.vue";
import { useToast, calculateTotal } from "#imports";

const route = useRoute();
const toast = useToast();

const projectId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const {
  data: metrics,
  pending: loadingProjects,
  error,
} = useProjectStatistics(projectId);

if (error.value) {
  toast.add({
    icon: "i-heroicons-x-circle",
    color: "red",
    title: "Erro",
    description: "Falha ao carregar estatísticas. Tente novamente mais tarde.",
    timeout: 0,
  });
}

const CardTag = computed(() => metrics.value?.card_tag ?? []);
const CardStatus = computed(() => metrics.value?.card_status ?? []);
const CardUser = computed(() => metrics.value?.card_user ?? []);

const totalCards = computed(() => calculateTotal(CardTag.value));
</script>

<template>
  <div>
    <UText tag="h1" size="title" weight="bold"> Estatísticas do Projeto </UText>
    <UText tag="h2" size="large" weight="bold">
      Total de cards: {{ totalCards }}
    </UText>
  </div>

  <div class="grid grid-cols-3 gap-4">
    <template v-if="loadingProjects">
      <USkeleton class="w-full h-96 rounded-lg" />
      <USkeleton class="w-full h-96 rounded-lg" />
      <USkeleton class="w-full h-96 rounded-lg" />
    </template>

    <template v-else>
      <div class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 w-full hover:scale-[1.02] hover:border border-gray-200 dark:border-gray-700 duration-300 ease-in cursor-pointer">
        <PieChart :card-tag="CardTag" />
      </div>
      <div class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 w-full hover:scale-[1.02] hover:border border-gray-200 dark:border-gray-700 duration-300 ease-in cursor-pointer">
        <PieChart :card-status="CardStatus" />
      </div>
      <div class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 w-full hover:scale-[1.02] hover:border border-gray-200 dark:border-gray-700 duration-300 ease-in cursor-pointer">
        <BarChart :card-user="CardUser" />
      </div>
    </template>
  </div>
</template>
