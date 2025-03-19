<script setup lang="ts">
useHead({
  title: 'Home - Track'
});
</script>

<template>
  <div>
    <UText tag="h1" size="extra-large" weight="bold">
      Meus Projetos
    </UText>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard v-for="(n, index) in 15" :key="index" class="w-full">
        <template #header>
          <UText tag="h1" size="large" color="primary" weight="bold">
            large
          </UText>
        </template>

        <UText tag="h1" size="medium" weight="normal">
          medium
        </UText>

        <template #footer>
          <UText tag="h1" size="small" weight="normal">
            small
          </UText>
        </template>
      </UCard>
    </div>
  </div>
</template>