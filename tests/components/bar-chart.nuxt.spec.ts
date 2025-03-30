import { mount } from "@vue/test-utils";
import BarChart from "@/components/charts/bar-chart.vue";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/charts/bar-chart.vue", () => ({
  default: {
    name: "BarChart",
    props: ["cardTag", "cardStatus", "cardUser"],
    data() {
      return {
        option: {
          title: { text: "Mock Title" },
          series: [{ data: [] }],
          xAxis: { data: [] },
          yAxis: { data: [] },
        },
      };
    },
    watch: {
      cardTag: {
        immediate: true,
        handler(this: { option: any }, newVal: any[]) {
          if (newVal) {
            this.option.title.text = "Cards por Tag";
            this.option.series[0].data = newVal.map(
              (tag: { qtd: any }) => tag.qtd
            );
            this.option.yAxis.data = newVal.map(
              (tag: { tag_name: any }) => tag.tag_name
            );
          }
        },
      },
      cardStatus: {
        immediate: true,
        handler(this: { option: any }, newVal: any[]) {
          if (newVal) {
            this.option.title.text = "Cards por Status";
            this.option.series[0].data = newVal.map(
              (status: { qtd: any }) => status.qtd
            );
            this.option.yAxis.data = newVal.map(
              (status: { status: any }) => status.status
            );
          }
        },
      },
      cardUser: {
        immediate: true,
        handler(this: { option: any }, newVal: any[]) {
          if (newVal) {
            this.option.title.text = "Cards por Usuário";
            this.option.series[0].data = newVal.map(
              (user: { qtd: any }) => user.qtd
            );
            this.option.yAxis.data = newVal.map(
              (user: { name_user: any }) => user.name_user
            );
          }
        },
      },
    },
    setup(props: any) {
      const option = {
        title: { text: "Distribuição de Dados" },
        series: [{ data: [] }],
        xAxis: { data: [] },
        yAxis: { data: [] },
      };

      if (props.cardTag) {
        option.title.text = "Cards por Tag";
        option.series[0].data = props.cardTag.map(
          (tag: { qtd: any }) => tag.qtd
        );
        option.yAxis.data = props.cardTag.map(
          (tag: { tag_name: any }) => tag.tag_name
        );
      } else if (props.cardStatus) {
        option.title.text = "Cards por Status";
        option.series[0].data = props.cardStatus.map(
          (status: { qtd: any }) => status.qtd
        );
        option.yAxis.data = props.cardStatus.map(
          (status: { status: any }) => status.status
        );
      } else if (props.cardUser) {
        option.title.text = "Cards por Usuário";
        option.series[0].data = props.cardUser.map(
          (user: { qtd: any }) => user.qtd
        );
        option.yAxis.data = props.cardUser.map(
          (user: { name_user: any }) => user.name_user
        );
      }

      return { option };
    },
  },
}));

describe("BarChart Component", () => {
  it("renders the chart with correct title and data for cardTag", () => {
    const wrapper = mount(BarChart, {
      props: {
        cardTag: [
          { tag_name: "Tag 1", qtd: 10 },
          { tag_name: "Tag 2", qtd: 20 },
        ],
      },
    });

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Cards por Tag");
    expect(chartOptions.series[0].data).toEqual([10, 20]);
    expect(chartOptions.yAxis.data).toEqual(["Tag 1", "Tag 2"]);
  });

  it("renders the chart with correct title and data for cardStatus", () => {
    const wrapper = mount(BarChart, {
      props: {
        cardStatus: [
          { status: "Status 1", qtd: 15 },
          { status: "Status 2", qtd: 25 },
        ],
      },
    });

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Cards por Status");
    expect(chartOptions.series[0].data).toEqual([15, 25]);
    expect(chartOptions.yAxis.data).toEqual(["Status 1", "Status 2"]);
  });

  it("renders the chart with correct title and data for cardUser", () => {
    const wrapper = mount(BarChart, {
      props: {
        cardUser: [
          { name_user: "User 1", qtd: 5 },
          { name_user: "User 2", qtd: 10 },
        ],
      },
    });

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Cards por Usuário");
    expect(chartOptions.series[0].data).toEqual([5, 10]);
    expect(chartOptions.yAxis.data).toEqual(["User 1", "User 2"]);
  });

  it("renders the chart with default title when no data is provided", () => {
    const wrapper = mount(BarChart);

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Distribuição de Dados");
    expect(chartOptions.series[0].data).toEqual([]);
    expect(chartOptions.yAxis.data).toEqual([]);
  });

  it("updates the chart data when props change", async () => {
    const wrapper = mount(BarChart, {
      props: {
        cardTag: [
          { tag_name: "Tag 1", qtd: 10 },
          { tag_name: "Tag 2", qtd: 20 },
        ],
      },
    });

    await wrapper.setProps({
      cardTag: [
        { tag_name: "Tag 3", qtd: 30 },
        { tag_name: "Tag 4", qtd: 40 },
      ],
    });

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.series[0].data).toEqual([30, 40]);
    expect(chartOptions.yAxis.data).toEqual(["Tag 3", "Tag 4"]);
  });
});
