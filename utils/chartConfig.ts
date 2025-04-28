import type { ChartConfiguration, ChartData } from "chart.js";

export function useDoughnut(
  labels: string[],
  data: number[],
): ChartConfiguration<"doughnut"> {
  return {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data,
          backgroundColor: [
            "#B3A4E1",
            "#9985D7",
            "#7F66CD",
            "#6648C3",
            "#4E30B0",
            "#3D248F",
            "#2F1682",
            "#261263",
            "#1A0D46",
            "#140832",
            "#0E051F",
          ],
          borderWidth: 0,
        },
      ],
    } as ChartData<"doughnut", number[], unknown>,
    options: {
      responsive: true,
    },
  };
}

export function useHorizontalBar(
  labels: string[],
  data: number[],
): ChartConfiguration<"bar"> {
  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data,
          backgroundColor: [
            "#B3A4E1",
            "#9985D7",
            "#7F66CD",
            "#6648C3",
            "#4E30B0",
            "#3D248F",
            "#2F1682",
            "#261263",
            "#1A0D46",
            "#140832",
            "#0E051F",
          ],
          borderWidth: 0,
        },
      ],
    } as ChartData<"bar", number[], unknown>,
    options: {
      responsive: true,
      indexAxis: "y",
      scales: {
        y: { beginAtZero: true },
        x: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  };
}

export function useVerticalBar(
  labels: string[],
  data: number[],
): ChartConfiguration<"bar"> {
  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data,
          backgroundColor: [
            "#B3A4E1",
            "#9985D7",
            "#7F66CD",
            "#6648C3",
            "#4E30B0",
            "#3D248F",
            "#2F1682",
            "#261263",
            "#1A0D46",
            "#140832",
            "#0E051F",
          ],
          borderWidth: 0,
        },
      ],
    } as ChartData<"bar", number[], unknown>,
    options: {
      responsive: true,
      scales: {
        x: { beginAtZero: true },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  };
}
