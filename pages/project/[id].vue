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
      <PieChart :card-tag="CardTag" />
      <PieChart :card-status="CardStatus" />
      <BarChart :card-user="CardUser" />
    </template>
  </div>
</template>
