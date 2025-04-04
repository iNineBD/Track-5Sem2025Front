<script setup lang="ts">
import { useProjects } from "~/composables/useProjects";

useHead({
  title: "Home - Track",
});

const { data: projects, pending: loadingProjects, error } = useProjects();
const toast = useToast();

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
      description: "Falha ao carregar projetos. Tente novamente.",
      timeout: 0,
      actions: actions.value,
    });
  }
});

const page = ref(1);
const itemsPerPage = 4;
const searchQuery = ref("");

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  return projects.value.filter((project: { name: string }) =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const sortedProjects = computed(() => {
  if (!filteredProjects.value) return [];
  return [...filteredProjects.value].sort((a, b) => {
    if (selected.value === "nome") {
      return a.name.localeCompare(b.name);
    } else if (selected.value === "criacao") {
      return (
        new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
      );
    } else if (selected.value === "atualizacao") {
      return (
        new Date(b.modified_date).getTime() -
        new Date(a.modified_date).getTime()
      );
    } else if (selected.value === "duracao") {
      const durationA = differenceBetweenDays(a.created_date, null);
      const durationB = differenceBetweenDays(b.created_date, null);
      return durationB - durationA;
    }
    return 0;
  });
});

const paginatedProjects = computed(() => {
  const sorted = sortedProjects.value;
  const start = (page.value - 1) * itemsPerPage;
  return sorted.slice(start, start + itemsPerPage);
});

const options = [
  {
    value: "nome",
    label: "Nome",
  },
  {
    value: "criacao",
    label: "Data de criação",
  },
  {
    value: "atualizacao",
    label: "Ultima atualização",
  },
  {
    value: "duracao",
    label: "Duração",
  },
];

const selected = ref("nome");
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
      <UText tag="h1" size="title" weight="bold"> Meus Projetos </UText>
      <div class="flex flex-row items-center gap-4">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="white"
          :trailing="false"
          placeholder="Search..."
        />
        <UPopover>
          <UButton
            icon="heroicons:bars-arrow-up"
            size="md"
            color="primary"
            variant="soft"
            label="Ordenar"
            :trailing="false"
          />
          <template #panel>
            <div class="p-4">
              <URadioGroup
                v-model="selected"
                legend="Ordenar os projetos"
                :options="options"
              />
            </div>
          </template>
        </UPopover>
      </div>
    </div>
    <div>
      <div
        v-if="!loadingProjects && filteredProjects.length === 0"
        class="flex flex-row items-center justify-center h-80"
      >
        <UText tag="h1" size="large" weight="normal" color="gray">
          Nenhum projeto encontrado
        </UText>
      </div>
      <div v-else>
        <div
          v-if="loadingProjects"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <USkeleton
            v-for="n in itemsPerPage"
            :key="n"
            class="w-full h-80"
            :ui="{ rounded: 'rounded-lg' }"
          />
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <ProjectCard
            v-for="project in paginatedProjects"
            :key="project.id"
            :project="project"
            @click="navigateTo('/project/' + project.id)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="projects?.length > itemsPerPage"
      class="flex justify-center mt-4"
    >
      <UDivider>
        <UPagination
          v-model="page"
          :page-count="itemsPerPage"
          :total="projects?.length || 0"
        />
      </UDivider>
    </div>
  </div>
</template>
