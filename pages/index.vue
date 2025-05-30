<script setup lang="ts">
import { sub, format } from "date-fns";
import type { ProjectStatistics, Project, Platforms } from "~/types";
import CardStatistic from "~/components/charts/card-statistic.vue";

definePageMeta({
  middleware: "auth",
});

useHead({
  title: "Home - Track",
});

const toast = useToast();

const loadingProjects = ref(false);
const loadingPlatforms = ref(false);
const loadingStatistics = ref(false);

const projects = ref<Project[]>([]);
const platforms = ref<Platforms[]>([]);

const selectedProject = ref<number>();
const selectedPlatform = ref<number>();

const projectName = computed(() => {
  return (
    projects.value.find((p) => p.id_project === selectedProject.value)
      ?.name_project ?? ""
  );
});

const selectedDateRange = ref({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});

async function fetchProjects() {
  loadingProjects.value = true;

  if (!selectedPlatform.value) {
    projects.value = [];
    loadingProjects.value = false;
    return;
  }

  const response = await useProjects(selectedPlatform.value);
  loadingProjects.value = false;
  selectedProject.value = undefined;
  projects.value = [];

  if (response.success) {
    projects.value = response.success;
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Nenhum projeto encontrado.",
      timeout: 6000,
    });
  }
}

async function fetchPlatforms() {
  loadingPlatforms.value = true;

  const response = await usePlatforms();
  loadingPlatforms.value = false;

  if (response.success) {
    platforms.value = response.success;
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Nenhuma plataforma encontrado.",
      timeout: 6000,
    });
  }
}

const statistics = ref<ProjectStatistics | null>(null);
const isOpen = ref(false);

async function fetchStatistics() {
  loadingStatistics.value = true;

  const formattedStart = format(selectedDateRange.value.start, "yyyy-MM-dd");
  const formattedEnd = format(selectedDateRange.value.end, "yyyy-MM-dd");

  const response = await useProjectStatistics(
    selectedProject.value,
    formattedStart,
    formattedEnd,
  );
  loadingStatistics.value = false;

  if (response.success) {
    statistics.value = response.success;
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Erro ao buscar estatísticas.",
      timeout: 6000,
    });
  }
}

watch(
  [selectedProject, selectedDateRange],
  () => {
    statistics.value = null;
    if (selectedProject.value) {
      fetchStatistics();
    }
  },
  { deep: true },
);

watch(
  [selectedPlatform],
  () => {
    fetchProjects();
  },
  { deep: true },
);

onMounted(async () => {
  fetchPlatforms();
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Skeleton Filtros Desktop -->
    <div
      v-if="loadingProjects || loadingPlatforms"
      class="hidden lg:grid grid-cols-4 gap-4"
    >
      <div v-for="n in 4" :key="n" class="grid grid-col gap-2">
        <USkeleton class="h-4 w-36" />
        <USkeleton class="h-14 w-full" />
      </div>
    </div>

    <!-- Filtros Desktop-->
    <div v-else class="hidden lg:flex">
      <filters
        v-model:date-range="selectedDateRange"
        v-model:project="selectedProject"
        v-model:platform="selectedPlatform"
        :projects="projects"
        :platforms="platforms"
        :selected-project="!selectedProject"
      />
    </div>

    <!-- Skeleton Filtros Mobile -->
    <div v-if="loadingProjects || loadingPlatforms" class="lg:hidden">
      <USkeleton class="h-12 w-full" />
    </div>

    <!--Filtros Mobile -->
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
            v-model:platform="selectedPlatform"
            :projects="projects"
            :platforms="platforms"
            :selected-project="!selectedProject"
          />
        </div>
      </UModal>
    </div>

    <UDivider />

    <!-- Título do Projeto Selecionado -->
    <div v-if="selectedProject && statistics" class="flex flex-col md:gap-1">
      <UText
        tag="h2"
        size="title"
        color="primary"
        weight="semi-bold"
        class="mb-0 mt-0 line-clamp-1"
      >
        {{ projectName }}
      </UText>
      <UText size="small" weight="normal" class="mb-0 mt-0 line-clamp-4">
        {{ projectName }}
      </UText>
    </div>

    <!-- Gráficos -->
    <div v-if="!selectedProject && !statistics">
      <UText size="large" weight="normal" color="gray" align="center">
        Nenhum projeto selecionado
      </UText>
    </div>

    <!-- Skeleton Gráficos -->
    <div v-if="loadingStatistics" class="flex flex-col gap-4">
      <USkeleton class="h-16 w-1/2 md:w-96" />
      <div
        class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4"
      >
        <div class="col-span-3 lg:col-span-1 flex flex-col gap-4">
          <USkeleton class="h-96 w-full" />
        </div>
        <div class="col-span-3 lg:col-span-1 flex flex-col gap-4">
          <USkeleton class="h-96 w-full" />
        </div>
        <div class="col-span-3 lg:col-span-1 flex flex-col gap-4">
          <USkeleton class="h-96 w-full" />
        </div>
        <div class="col-span-3 lg:col-span-2 flex flex-col gap-4">
          <USkeleton class="h-96 w-full" />
        </div>
        <div class="col-span-3 lg:col-span-1 flex flex-col gap-4">
          <USkeleton class="h-96 w-full" />
        </div>
      </div>
    </div>

    <!-- Gráficos -->
    <div
      v-if="statistics"
      class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4"
    >
      <div class="col-span-3 lg:col-span-1 flex flex-col gap-4">
        <div class="flex flex-col 2xl:flex-row gap-4">
          <CardStatistic
            icon-name="heroicons:clipboard-document-check"
            icon-color="bg-zinc-500 dark:bg-zinc-400"
            icon-bg-color="bg-zinc-100 dark:bg-zinc-800"
            :value="
              statistics.started_cards?.reduce(
                (total, card) => total + card.qtd_cards_started,
                0,
              ) || 0
            "
            text="criados"
          />
          <CardStatistic
            icon-name="heroicons:check-circle"
            icon-color="bg-green-500 dark:bg-green-700"
            icon-bg-color="bg-green-200 dark:bg-green-950"
            :value="
              statistics.finished_cards?.reduce(
                (total, card) => total + card.qtd_cards_finished,
                0,
              ) || 0
            "
            text="finalizados"
          />
        </div>

        <BarChart
          title="Cards por tag"
          :labels="statistics.card_tag?.map((t) => t.tag_name) || []"
          :data="statistics.card_tag?.map((t) => t.qtd) || []"
          index-axis="x"
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
        <BarChart
          title="Cards por usuário"
          :labels="statistics.card_user?.map((u) => u.name_user) || []"
          :data="statistics.card_user?.map((u) => u.qtd) || []"
          index-axis="y"
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
