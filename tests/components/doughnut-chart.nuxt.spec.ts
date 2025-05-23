import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import DoughnutChart from "~/components/charts/doughnut-chart.vue";

describe("DoughnutChart", () => {
  it("renders chart title and total cards", () => {
    const props = {
      labels: ["Tag A", "Tag B", "Tag C"],
      data: [15, 25, 35],
      title: "Cards por tags",
    };

    const wrapper = mount(DoughnutChart, {
      props,
    });

    expect(wrapper.text()).toContain("Cards por tags");
  });

  it("displays 'No data' when noData prop is true", () => {
    const props = {
      labels: [],
      data: [],
      title: "Cards por tags",
    };

    const wrapper = mount(DoughnutChart, {
      props,
    });

    expect(wrapper.text()).not.toContain("Total: 0 cards");
  });
});
