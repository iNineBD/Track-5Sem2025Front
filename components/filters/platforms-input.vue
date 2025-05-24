<script setup lang="ts">
import type { Platforms } from "~/types";

const props = defineProps<{
  platforms: Platforms[];
}>();

const model = defineModel<number>();
</script>

<template>
  <div class="flex flex-col">
    <UText tag="p" size="large" weight="semi-bold" class="mt-0">
      Selecione a plataforma
    </UText>
    <USelect
      v-model="model"
      placeholder="plataforma..."
      class="min-w-52"
      size="xl"
      :options="
        props.platforms.map((platform) => ({
          label: platform.nome_platform,
          value: platform.id_platform,
        }))
      "
    />
  </div>
</template>
