<script setup lang="ts">
import { ref } from "vue";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useAppConfig, useColorMode } from "#imports";

use([PieChart, LegendComponent, TooltipComponent, CanvasRenderer]);

// Pegando as configurações de tema do Nuxt
const appConfig = useAppConfig();
const colorMode = useColorMode();

const getThemeColors = computed(() => {
  return appConfig.themes[colorMode.value as "light" | "dark"];
});

const option = ref({
  color: getThemeColors.value.chartColors,
  tooltip: {
    trigger: "item",
    backgroundColor: colorMode.value === "dark" ? "#222" : "#fff",
    textStyle: {
      color: colorMode.value === "dark" ? "#fff" : "#333",
    },
    borderWidth: 1,
    borderColor: colorMode.value === "dark" ? "#555" : "#ddd",
  },
  legend: {
    top: "5%",
    left: "center",
    textStyle: {
      color: colorMode.value === "dark" ? "#ddd" : "#333",
    },
  },
  series: [
    {
      name: "Origem de Acesso",
      type: "pie",
      radius: ["35%", "65%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.2)",
      },
      label: {
        show: false,
        position: "center",
        formatter: "{d}%",
        fontSize: 14,
        color: colorMode.value === "dark" ? "#ddd" : "#333",
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 10,
        lineStyle: {
          color: colorMode.value === "dark" ? "#ddd" : "#333",
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
          color: colorMode.value === "dark" ? "#ddd" : "#333",
        },
      },
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: 300,
      data: [
        { value: 1048, name: "Motor de Busca" },
        { value: 735, name: "Direto" },
        { value: 580, name: "Email" },
        { value: 484, name: "Anúncios de União" },
        { value: 300, name: "Anúncios em Vídeo" },
      ],
    },
  ],
});

// Atualizando as cores ao mudar tema
watch(getThemeColors, (newTheme) => {
  option.value.color = newTheme.chartColors;
  option.value.tooltip.backgroundColor =
    colorMode.value === "dark" ? "#222" : "#fff";
  option.value.tooltip.textStyle.color =
    colorMode.value === "dark" ? "#fff" : "#333";
  option.value.legend.textStyle.color =
    colorMode.value === "dark" ? "#ddd" : "#333";
  option.value.series[0].emphasis.label.color =
    colorMode.value === "dark" ? "#fff" : "#333";
});

// Função que chama os dados da API
// const fetchData = async () => {
//   try {
//     // const response = await fetch('https://track/dados-metricas');
//     // const data = await response.json();
</script>

<template>
  <VChart :option="option" style="width: 100%; height: 400px" />
</template>
