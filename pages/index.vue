<script setup lang="ts">
import projects from '~/assets/data/projects.json';

useHead({
  title: 'Home - Track'
});
</script>

<template>
  <div>
    <UText tag="h1" size="extra-large" weight="bold">
      Meus Projetos
    </UText>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ProjectCard
        v-for="project in projects.projects"
        :key="project.id_project"
        :title="project.name"
        :description="project.description"
        :created-at="project.created_date"
        :modified-at="project.modified_date" 
        :total-cards="project.total_cards"
        :picture="project.picture"
        :members="project.members"
        :product-manager="project.product_manager"
      />
    </div>
  </div>
</template>