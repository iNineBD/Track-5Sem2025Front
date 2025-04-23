<script setup lang="ts">
import { useProjects } from "~/composables/useProjects";
import { useProjectStatistics } from "~/composables/useProjectStatistics";
import { sub, format } from "date-fns";
import type { ProjectOption, ProjectStatistics } from "~/types";
import CardStatistic from "~/components/charts/CardStatistic.vue";

useHead({
  title: "Home - Track",
});

const { data: projects, pending: loadingProjects, error } = useProjects();

const selectedProject = ref<ProjectOption>({
  id: null,
  label: "Selecione um Projeto",
  description: "",
});

const selectedDateRange = ref({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});

const statistics = ref<ProjectStatistics | null>(null);
const isOpen = ref(false);

const fetchStatistics = async () => {
  statistics.value = null;

  const formattedStart = format(selectedDateRange.value.start, "yyyy-MM-dd");
  const formattedEnd = format(selectedDateRange.value.end, "yyyy-MM-dd");

  try {
    const { projectStatistics } = await useProjectStatistics(
      selectedProject.value.id,
      formattedStart,
      formattedEnd,
    );

    if (projectStatistics) {
      statistics.value = projectStatistics;
    }
  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
  }
};

watch(
  [selectedProject, selectedDateRange],
  () => {
    statistics.value = null;
    fetchStatistics();
  },
  { deep: true },
);

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: `Falha ao carregar projetos: ${error.value}`,
  });
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Carregando projetos -->
    <div v-if="loadingProjects" class="hidden lg:grid grid-cols-4 gap-4">
      <div v-for="n in 4" :key="n" class="grid grid-col gap-2">
        <USkeleton class="h-4 w-36" />
        <USkeleton class="h-14 w-full" />
      </div>
    </div>

    <!-- Filtros -->
    <div v-else class="hidden lg:flex">
      <filters
        v-model:date-range="selectedDateRange"
        v-model:project="selectedProject"
        :projects="projects"
      />
    </div>

    <!-- Mobile -->
    <div v-if="loadingProjects" class="lg:hidden">
      <USkeleton class="h-12 w-full" />
    </div>
    <div v-else class="lg:hidden">
      <UButton
        size="lg"
        variant="solid"
        color="white"
        label="Pesquisar"
        icon="i-heroicons-magnifying-glass-20-solid"
        block
        truncate
        @click="isOpen = true"
      />
      <UModal v-model="isOpen">
        <div class="overflow-auto h-96 p-4">
          <filters
            v-model:date-range="selectedDateRange"
            v-model:project="selectedProject"
            :projects="projects"
          />
        </div>
      </UModal>
    </div>

    <UDivider />

    <!-- Título do Projeto Selecionado -->
    <div
      v-if="selectedProject?.id && statistics"
      class="flex flex-col md:flex-row md:gap-2 md:items-center"
    >
      <UText
        tag="h2"
        size="title"
        color="primary"
        weight="semi-bold"
        class="mb-0 mt-0 line-clamp-1"
      >
        {{ selectedProject?.label }}
      </UText>
      <UText size="large" weight="normal" class="mb-0 mt-0 hidden md:block">
        |
      </UText>
      <UText size="medium" weight="normal" class="mb-0 mt-0 line-clamp-1">
        {{ selectedProject?.description }}
      </UText>
    </div>

    <!-- Gráficos -->
    <UText
      v-if="!statistics"
      size="large"
      weight="normal"
      color="gray"
      align="center"
    >
      No data
    </UText>
    <div
      v-else
      class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4"
    >
      <div class="col-span-3 lg:col-span-1 flex flex-col gap-4">
        <div class="flex flex-col 2xl:flex-row gap-4">
          <CardStatistic
            icon-name="heroicons:clipboard-document-check"
            icon-color="bg-zinc-500 dark:bg-zinc-400"
            icon-bg-color="bg-zinc-100 dark:bg-zinc-950"
            :value="
              statistics.finished_cards?.reduce(
                (total, card) => total + card.qtd_cards_finished,
                0,
              ) || 0
            "
            text="criados"
          />
          <CardStatistic
            icon-name="heroicons:check-circle"
            icon-color="bg-green-600 dark:bg-green-700"
            icon-bg-color="bg-green-300 dark:bg-green-950"
            :value="
              statistics.finished_cards?.reduce(
                (total, card) => total + card.qtd_cards_finished,
                0,
              ) || 0
            "
            text="finalizados"
          />
        </div>

        <VerticalBarChart
          title="Cards por tag"
          :labels="statistics.card_tag?.map((t) => t.tag_name) || []"
          :data="statistics.card_tag?.map((t) => t.qtd) || []"
        />
      </div>

      <div class="col-span-3 lg:col-span-1">
        <UCard class="h-full w-full">
          <UText tag="h1" size="large" weight="medium" class="mt-0">
            Tempo médio de execução
          </UText>
          <UTable
            :empty-state="{
              icon: 'i-heroicons-circle-stack-20-solid',
              label: 'No items.',
            }"
            :columns="[
              { key: 'name_card', label: 'Card' },
              { key: 'time_execution', label: 'Tempo' },
            ]"
            :rows="statistics.execution_cards"
            class="h-full w-full max-h-96"
          />
        </UCard>
      </div>

      <div class="col-span-3 lg:col-span-2">
        <HorizontalBarChart
          title="Cards por usuário"
          :labels="statistics.card_user?.map((u) => u.name_user) || []"
          :data="statistics.card_user?.map((u) => u.qtd) || []"
        />
      </div>

      <div class="col-span-3 lg:col-span-1">
        <DoughnutChart
          title="Cards por status"
          :labels="statistics.card_status?.map((s) => s.status) || []"
          :data="statistics.card_status?.map((s) => s.qtd) || []"
        />
      </div>

      <div class="col-span-3 lg:col-span-1">
        <UCard class="h-full w-full">
          <UText tag="h1" size="large" weight="medium" class="mt-0">
            Retrabalhos
          </UText>
          <UTable
            :empty-state="{
              icon: 'i-heroicons-circle-stack-20-solid',
              label: 'No items.',
            }"
            :columns="[
              { key: 'card_name', label: 'Card' },
              { key: 'qtd_rework', label: 'Retrabalhos' },
            ]"
            :rows="statistics.reworks_cards"
            class="h-full w-full max-h-96"
          />
        </UCard>
      </div>
    </div>
  </div>
</template>
