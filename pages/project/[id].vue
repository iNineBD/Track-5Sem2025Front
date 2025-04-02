<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProjectStatistics } from "~/composables/useProjectStatistics";
import { computed } from "vue";
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

<template></template>
