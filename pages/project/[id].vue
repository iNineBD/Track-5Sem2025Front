<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, watchEffect, ref, watch } from "vue";
import { useProjectStatistics } from "~/composables/useProjectStatistics";
import { useToast } from "#imports";
import type { CardTag, CardStatus, CardUser } from "~/types";

useHead({
  title: "Project - Track",
});

const route = useRoute();
const toast = useToast();
const projectId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const {
  data: metrics,
  pending: loadingMetrics,
  error,
} = useProjectStatistics(projectId);

const actions = ref([
  {
    label: "Recarregar",
    click: () => window.location.reload(),
  },
]);

watchEffect(() => {
  if (error && error.value) {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: "Falha ao carregar estatísticas. Tente novamente.",
      timeout: 0,
      actions: actions.value,
    });
  }
});

const processMetrics = <T extends { qtd: number }>(
  data: T[] | undefined,
  key: keyof T,
) => {
  return {
    labels: computed(() => (data ? data.map((item) => String(item[key])) : [])),
    values: computed(() => (data ? data.map((item) => item.qtd) : [])),
    total: computed(() =>
      data ? data.reduce((sum, item) => sum + item.qtd, 0) : 0,
    ),
  };
};

const tagLabels = ref<string[]>([]);
const tagData = ref<number[]>([]);
const totalTagCards = ref<number>(0);

const statusLabels = ref<string[]>([]);
const statusData = ref<number[]>([]);
const totalStatusCards = ref<number>(0);

const userLabels = ref<string[]>([]);
const userData = ref<number[]>([]);
const totalUserCards = ref<number>(0);

watch(
  () => metrics.value,
  (newMetrics) => {
    if (newMetrics) {
      const tagMetrics = processMetrics<CardTag>(
        newMetrics.card_tag,
        "tag_name",
      );
      tagLabels.value = tagMetrics.labels.value;
      tagData.value = tagMetrics.values.value;
      totalTagCards.value = tagMetrics.total.value;

      const statusMetrics = processMetrics<CardStatus>(
        newMetrics.card_status,
        "status",
      );
      statusLabels.value = statusMetrics.labels.value;
      statusData.value = statusMetrics.values.value;
      totalStatusCards.value = statusMetrics.total.value;

      const userMetrics = processMetrics<CardUser>(
        newMetrics.card_user,
        "name_user",
      );
      userLabels.value = userMetrics.labels.value;
      userData.value = userMetrics.values.value;
      totalUserCards.value = userMetrics.total.value;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div
    v-if="loadingMetrics || error"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <USkeleton
      v-for="n in 4"
      :key="n"
      class="w-full h-96"
      :ui="{ rounded: 'rounded-lg' }"
    />
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <DoughnutChart
      :labels="tagLabels"
      :data="tagData"
      :no-data="tagData.length === 0"
      :total="totalTagCards"
      title="Cards por tags"
    />
    <DoughnutChart
      :labels="statusLabels"
      :data="statusData"
      :no-data="statusData.length === 0"
      :total="totalStatusCards"
      title="Cards por status"
    />
    <BarChart
      :labels="userLabels"
      :data="userData"
      :no-data="userData.length === 0"
      :total="totalUserCards"
      title="Cards por usuários"
    />
  </div>
</template>
