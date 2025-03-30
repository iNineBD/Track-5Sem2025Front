<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useAppConfig, useColorMode } from "#imports";
import type { CardStatus, CardTag } from "~/types";

// Definição de props
const props = defineProps<{
  cardTag?: CardTag[];
  cardStatus?: CardStatus[];
}>();

// Carregar componentes ECharts
use([
  PieChart,
  LegendComponent,
  TooltipComponent,
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
  }
  return [];
});

// Título do gráfico
const chartTitle = computed(() => {
  if (props.cardTag && props.cardTag.length > 0) return "Cards por Tag";
  if (props.cardStatus && props.cardStatus.length > 0)
    return "Cards por Status";
  return "Distribuição de Dados";
});

// Opções do gráfico
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
  color: getThemeColors.value.chartColors,
  tooltip: {
    trigger: "item",
    backgroundColor: colorMode.value === "dark" ? "#222" : "#fff",
    textStyle: {
      color: colorMode.value === "dark" ? "#fff" : "#333",
    },
    borderWidth: 1,
    borderColor: colorMode.value === "dark" ? "#555" : "#ddd",
    position: function (
      point: any,
      params: any,
      dom: any,
      rect: any,
      size: any
    ) {
      const [x, y] = point;
      const tooltipWidth = dom.offsetWidth;
      const tooltipHeight = dom.offsetHeight;
      const offsetX = window.innerWidth - tooltipWidth - 10;
      const offsetY = window.innerHeight - tooltipHeight - 10;

      return [Math.min(x + 10, offsetX), Math.min(y + 10, offsetY)];
    },
  },
  legend: {
    top: "10%",
    left: "center",
    textStyle: {
      color: colorMode.value === "dark" ? "#ddd" : "#333",
    },
  },
  series: [
    {
      name: chartTitle.value,
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
      data: formattedData.value,
    },
  ],
});

defineExpose({ option });

watch(
  formattedData,
  (newData) => {
    option.value.series[0].data = newData;
  },
  { immediate: true }
);

// Atualizar o título do gráfico
watch(chartTitle, (newTitle) => {
  option.value.title.text = newTitle;
  option.value.series[0].name = newTitle;
});

// Atualizar cores de tema
watch(getThemeColors, (newTheme) => {
  option.value.color = newTheme.chartColors;
  option.value.tooltip.backgroundColor =
    colorMode.value === "dark" ? "#222" : "#fff";
  option.value.tooltip.textStyle.color =
    colorMode.value === "dark" ? "#fff" : "#333";
  option.value.legend.textStyle.color =
    colorMode.value === "dark" ? "#ddd" : "#333";
  option.value.title.textStyle.color =
    colorMode.value === "dark" ? "#ddd" : "#333";
  option.value.series[0].emphasis.label.color =
    colorMode.value === "dark" ? "#fff" : "#333";
});
</script>

<template>
  <VChart :option="option" class="w-full h-96" />
</template>
