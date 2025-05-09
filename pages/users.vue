<script setup lang="ts">
import type { Users } from "~/types";

definePageMeta({
  middleware: ["auth", "admin"],
  name: "users",
  path: "/usuarios",
});

useHead({
  title: "Usuários - Track",
});

const toast = useToast();

const loadingUsers = ref(false);

const users = ref<Users[]>([]);

async function fetchUsers() {
  loadingUsers.value = true;

  const response = await useUsers();
  loadingUsers.value = false;

  if (response.success) {
    console.log("Users", response.success);
    users.value = response.success;
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Erro ao carregar usuários.",
      timeout: 6000,
    });
  }
}

onMounted(async () => {
  fetchUsers();
});

const columns = [
  {
    key: "id_user",
    label: "ID",
  },
  {
    key: "name_user",
    label: "Nome",
  },
  {
    key: "name_role",
    label: "Role",
  },
  {
    key: "actions",
  },
];

const page = ref(1);
const pageCount = 10;

const rows = computed(() => {
  return users.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount,
  );
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-2">
      <UText
        tag="h2"
        size="title"
        weight="semi-bold"
        class="mb-0 mt-0 line-clamp-1"
      >
        Usuários
      </UText>
      <UPopover
        mode="hover"
        :popper="{ placement: 'bottom-start' }"
        class="flex items-center"
      >
        <UIcon name="heroicons:information-circle-16-solid" class="w-6 h-6" />
        <template #panel>
          <div class="p-4 max:w-72">
            <UText tag="p" size="small" class="mb-0 mt-0">
              São considerados operadores as funções diferentes de Admin ou
              gestor
            </UText>
          </div>
        </template>
      </UPopover>
    </div>
    <div class="border border-gray-200 dark:border-gray-800 rounded-lg">
      <UTable :rows="rows" :columns="columns">
        <template #actions-data="{ row }">
          <UButton
            color="gray"
            variant="ghost"
            icon="heroicons:pencil-square"
          />
        </template>
      </UTable>

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="users.length"
        />
      </div>
    </div>
  </div>
</template>
