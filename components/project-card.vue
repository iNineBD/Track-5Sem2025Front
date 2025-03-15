<script setup lang="ts">
import type { Member } from '~/general-types';

const props = defineProps<{
  title: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
  totalCards: number;
  picture: string;
  members: Member[];
  productManager: Member;
}>();
</script>

<template>
  <UCard
    class="w-full hover:scale-[1.02] hover:border border-gray-200 dark:border-gray-700 duration-300 ease-in cursor-pointer">
    <template #header>
      <div class="flex flex-row items-center space-x-4">
        <NuxtImg :src="props.picture" alt="Project Image" class="h-16 rounded-md" />
        <div>
          <UText tag="h2" size="large" color="primary" weight="semi-bold" class="mb-0 line-clamp-1 text-ellipsis">
            {{ props.title }}
          </UText>
          <UText size="small" weight="normal" class="mt-0 line-clamp-1 text-ellipsis">
            {{ props.description }}
          </UText>
        </div>
      </div>
    </template>
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <UText size="medium" weight="bold">
          Product Manager
        </UText>
        <UBadge icon="heroicons:rectangle-stack-20-solid" size="sm" color="white" variant="solid"
          :label="props.productManager.alt" :trailing="false">
          <template #leading>
            <UAvatar :src="props.productManager.src" size="2xs" />
          </template>
        </UBadge>
      </div>
      <div class="flex justify-between items-center">
        <UText size="medium" weight="bold">
          Membros
        </UText>
        <UAvatarGroup size="xs" :max="2">
          <UAvatar v-for="member in props.members" :key="member.id_member" :src="member.src" :alt="member.alt" />
        </UAvatarGroup>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <UText size="medium" weight="bold">
        Cards
      </UText>
      <UBadge icon="heroicons:rectangle-stack-20-solid" size="sm" color="white" variant="solid"
        :label="props.totalCards" :trailing="false" />
    </div>
    <template #footer>
      <UText size="small" weight="normal">
        {{ new Date(props.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) }}
      </UText>
    </template>
  </UCard>
</template>