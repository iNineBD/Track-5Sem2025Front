<script setup lang="ts">
import type { User, Role } from "~/types";
import { useUpdateRole } from "~/composables/useUpdateRoles";

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
const users = ref<User[]>([]);
const roles = ref<Role[]>([]);

async function fetchUsers() {
  loadingUsers.value = true;

  const response = await useUsers();
  loadingUsers.value = false;

  if (response.success) {
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

async function fetchRoles() {
  const response = await useRoles();

  if (response.success) {
    roles.value = response.success;
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Erro ao carregar roles.",
      timeout: 6000,
    });
  }
}

async function updateUserRole(id_role: number, id_user: number) {
  const response = await useUpdateRole({ id_role, id_user });

  if (response.success) {
    toast.add({
      icon: "i-heroicons-check-circle",
      color: "green",
      title: "Sucesso",
      description: "Role do usuário atualizada com sucesso.",
      timeout: 4000,
    });
    fetchUsers();
  } else {
    toast.add({
      icon: "i-heroicons-x-circle",
      color: "red",
      title: "Erro",
      description: response.message || "Erro ao atualizar role do usuário.",
      timeout: 6000,
    });
  }
}

onMounted(async () => {
  fetchRoles();
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
    key: "actions",
    label: "Role",
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
              São considerados <span class="font-bold">OPERADORES</span> as
              funções diferentes de <span class="font-bold">ADMIN</span> ou
              <span class="font-bold">GESTOR</span>
            </UText>
          </div>
        </template>
      </UPopover>
    </div>
    <div class="border border-gray-200 dark:border-gray-800 rounded-lg">
      <UTable
        :loading="loadingUsers"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :rows="rows"
        :columns="columns"
      >
        <template #actions-data="{ row }">
          <USelect
            v-model="row.id_role"
            class="min-w-52"
            :options="
              roles.map((role) => ({
                label: role.name_role,
                value: role.id_role,
              }))
            "
            @update:model-value="
              (roleId) => updateUserRole(Number(roleId), row.id_user)
            "
          />
        </template>
      </UTable>

      <div
        :class="[
          'flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700',
          pageCount > 1 ? 'hidden' : 'block',
        ]"
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
