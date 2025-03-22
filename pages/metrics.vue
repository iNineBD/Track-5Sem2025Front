<script setup lang="ts">
import PieChart from "~/components/charts/PieChart.vue";
useHead({
  title: "Metrics - Track",
});
</script>

<template>
  <div class="metrics-page">
    <h2>Página de Métricas</h2>
    <div class="metrics-content">
      <PieChart />
    </div>
  </div>
</template>

<style scoped>
.metrics-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.metrics-content {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
