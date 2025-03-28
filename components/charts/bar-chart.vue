<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useAppConfig, useColorMode } from "#imports";
import type { CardStatus, CardTag, CardUser } from "~/types";

// Definição de props
const props = defineProps<{
  cardTag?: CardTag[];
  cardStatus?: CardStatus[];
  cardUser?: CardUser[];
}>();

// Carregar componentes ECharts
use([
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

const appConfig = useAppConfig();
const colorMode = useColorMode();

// Cores do tema
const getThemeColors = computed(
  () => appConfig.themes[colorMode.value as "light" | "dark"]
);

// Preparação dos dados para o gráfico
const formattedData = computed(() => {
  if (props.cardTag && props.cardTag.length > 0) {
    return props.cardTag.map((tag) => ({
      value: tag.qtd,
      name: tag.tag_name,
    }));
  } else if (props.cardStatus && props.cardStatus.length > 0) {
    return props.cardStatus.map((status) => ({
      value: status.qtd,
      name: status.status,
    }));
  } else if (props.cardUser && props.cardUser.length > 0) {
    return props.cardUser.map((user) => ({
      value: user.qtd,
      name: user.name_user,
    }));
  }
  return [];
});

// Categorias e valores do gráfico
const categories = computed(() => formattedData.value.map((item) => item.name));
const values = computed(() => formattedData.value.map((item) => item.value));

// Título do gráfico
const chartTitle = computed(() => {
  if (props.cardTag && props.cardTag.length > 0) return "Cards por Tag";
  if (props.cardStatus && props.cardStatus.length > 0)
    return "Cards por Status";
  if (props.cardUser && props.cardUser.length > 0) return "Cards por Usuário";
  return "Distribuição de Dados";
});

// Opções do gráfico de barras
const option = ref({
  title: {
    text: chartTitle.value,
    left: "center",
    top: "2%",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colorMode.value === "dark" ? "#ddd" : "#333",
    },
  },
  grid: {
    left: "10%",
    right: "5%",
    top: "10%",
    bottom: "15%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "value",
    axisLabel: {
      color: colorMode.value === "dark" ? "#ddd" : "#333",
    },
  },
  yAxis: {
    type: "category",
    data: categories.value,
    axisLabel: {
      color: colorMode.value === "dark" ? "#ddd" : "#333",
      overflow: "truncate",
      interval: 0,
    },
  },
  series: [
    {
      name: chartTitle.value,
      type: "bar",
      data: values.value,
      itemStyle: {
        color: getThemeColors.value.chartColors[0],
      },
      barWidth: "50%",
    },
  ],
});

// Atualizar opções dinamicamente
watch(formattedData, (newData) => {
  option.value.yAxis.data = newData.map((item) => item.name);
  option.value.series[0].data = newData.map((item) => item.value);
});

watch(chartTitle, (newTitle) => {
  option.value.title.text = newTitle;
  option.value.series[0].name = newTitle;
});

watch(getThemeColors, (newTheme) => {
  option.value.series[0].itemStyle.color = newTheme.chartColors[0];
  option.value.title.textStyle.color =
    colorMode.value === "dark" ? "#ddd" : "#333";
  option.value.xAxis.axisLabel.color =
    colorMode.value === "dark" ? "#ddd" : "#333";
  option.value.yAxis.axisLabel.color =
    colorMode.value === "dark" ? "#ddd" : "#333";
});
</script>

<template>
  <VChart :option="option" class="w-full h-96" />
</template>
