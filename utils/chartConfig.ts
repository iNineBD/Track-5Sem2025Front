import type { ChartConfiguration, ChartData } from "chart.js";
import { useColorMode } from "#imports";

export function useDoughnut(labels: string[], data: number[]): ChartConfiguration<"doughnut"> {
  const colorMode = useColorMode();
  const isDark = colorMode.value === "dark";

  return {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data,
          backgroundColor: isDark
            ? [
                "rgba(200, 99, 132, 0.7)", 
                "rgba(54, 162, 235, 0.7)", 
                "rgba(255, 206, 86, 0.7)", 
                "rgba(75, 192, 192, 0.7)", 
                "rgba(153, 102, 255, 0.7)", 
                "rgba(255, 159, 64, 0.7)"
              ]
            : [
                "rgba(255, 99, 132, 0.5)", 
                "rgba(54, 162, 235, 0.5)", 
                "rgba(255, 206, 86, 0.5)", 
                "rgba(75, 192, 192, 0.5)", 
                "rgba(153, 102, 255, 0.5)", 
                "rgba(255, 159, 64, 0.5)"
              ],
          borderColor: isDark
            ? [
                "rgba(200, 99, 132, 1)", 
                "rgba(54, 162, 235, 1)", 
                "rgba(255, 206, 86, 1)", 
                "rgba(75, 192, 192, 1)", 
                "rgba(153, 102, 255, 1)", 
                "rgba(255, 159, 64, 1)"
              ]
            : [
                "rgba(255, 99, 132, 1)", 
                "rgba(54, 162, 235, 1)", 
                "rgba(255, 206, 86, 1)", 
                "rgba(75, 192, 192, 1)", 
                "rgba(153, 102, 255, 1)", 
                "rgba(255, 159, 64, 1)"
              ],
          borderWidth: 1,
        },
      ],
    } as ChartData<"doughnut", number[], unknown>,
    options: {
      responsive: true,
    },
  };
}

export function useBar(labels: string[], data: number[]): ChartConfiguration<"bar"> {
  const colorMode = useColorMode();
  const isDark = colorMode.value === "dark";

  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data,
          backgroundColor: isDark ? "rgba(54, 162, 235, 0.7)" : "rgba(54, 162, 235, 0.5)",
          borderColor: isDark ? "rgba(54, 162, 235, 1)" : "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    } as ChartData<"bar", number[], unknown>,
    options: {
      responsive: true,
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true },
      },
    },
  };
}
