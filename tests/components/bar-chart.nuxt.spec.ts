import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BarChart from "~/components/charts/BarChart.vue";

describe("BarChart", () => {
  it("renders chart title and total cards", () => {
    const props = {
      labels: ["User A", "User B", "User C"],
      data: [10, 20, 30],
      total: 60,
      title: "Cards por usuários",
    };

    const wrapper = mount(BarChart, {
      props,
    });

    expect(wrapper.text()).toContain("Cards por usuários");
    expect(wrapper.text()).toContain("Total: 60 cards");
  });

  it("displays 'No data' when noData prop is true", () => {
    const props = {
      labels: [],
      data: [],
      noData: true,
      total: 0,
      title: "Cards por usuários",
    };

    const wrapper = mount(BarChart, {
      props,
    });

    expect(wrapper.text()).toContain("No data");
    expect(wrapper.text()).not.toContain("Total: 0 cards");
  });
});
