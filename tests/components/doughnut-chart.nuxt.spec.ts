import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import DoughnutChart from "~/components/charts/doughnut-chart.vue";

describe("DoughnutChart", () => {
  it("renders chart title and total cards", () => {
    const props = {
      labels: ["Tag A", "Tag B", "Tag C"],
      data: [15, 25, 35],
      total: 75,
      title: "Cards por tags",
    };

    const wrapper = mount(DoughnutChart, {
      props,
    });

    expect(wrapper.text()).toContain("Cards por tags");
    expect(wrapper.text()).toContain("Total: 75 cards");
  });

  it("displays 'No data' when noData prop is true", () => {
    const props = {
      labels: [],
      data: [],
      noData: true,
      total: 0,
      title: "Cards por tags",
    };

    const wrapper = mount(DoughnutChart, {
      props,
    });

    expect(wrapper.text()).toContain("No data");
    expect(wrapper.text()).not.toContain("Total: 0 cards");
  });
});
