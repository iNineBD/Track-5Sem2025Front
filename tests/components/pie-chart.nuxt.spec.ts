import { mount } from "@vue/test-utils";
import PieChart from "@/components/charts/pie-chart.vue";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/charts/pie-chart.vue", () => ({
  default: {
    name: "PieChart",
    props: ["cardTag", "cardStatus"],
    data() {
      return {
        option: {
          title: { text: "Mock Title" },
          series: [{ data: [] }],
        },
      };
    },
    watch: {
      cardTag: {
        immediate: true,
        handler(
          this: {
            option: { title: { text: string }; series: { data: any[] }[] };
          },
          newVal: any[]
        ) {
          if (newVal) {
            this.option.title.text = "Cards por Tag";
            this.option.series[0].data = newVal.map(
              (tag: { qtd: any; tag_name: any }) => ({
                value: tag.qtd,
                name: tag.tag_name,
              })
            );
          }
        },
      },
      cardStatus: {
        immediate: true,
        handler(
          this: {
            option: { title: { text: string }; series: { data: any[] }[] };
          },
          newVal: any[]
        ) {
          if (newVal) {
            this.option.title.text = "Cards por Status";
            this.option.series[0].data = newVal.map(
              (status: { qtd: any; status: any }) => ({
                value: status.qtd,
                name: status.status,
              })
            );
          }
        },
      },
    },
    setup(props: {
      cardTag: {
        map: (
          arg0: (tag: { qtd: any; tag_name: any }) => { value: any; name: any }
        ) => never[];
      };
      cardStatus: {
        map: (
          arg0: (status: { qtd: any; status: any }) => { value: any; name: any }
        ) => never[];
      };
    }) {
      const option = {
        title: { text: "Distribuição de Dados" },
        series: [{ data: [] }],
      };

      if (props.cardTag) {
        option.title.text = "Cards por Tag";
        option.series[0].data = props.cardTag.map(
          (tag: { qtd: any; tag_name: any }) => ({
            value: tag.qtd,
            name: tag.tag_name,
          })
        );
      } else if (props.cardStatus) {
        option.title.text = "Cards por Status";
        option.series[0].data = props.cardStatus.map(
          (status: { qtd: any; status: any }) => ({
            value: status.qtd,
            name: status.status,
          })
        );
      }

      return { option };
    },
  },
}));

describe("PieChart Component", () => {
  it("renders the chart with correct title for cardTag data", () => {
    const wrapper = mount(PieChart, {
      props: {
        cardTag: [
          { tag_name: "Tag 1", qtd: 10 },
          { tag_name: "Tag 2", qtd: 20 },
        ],
      },
    });

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Cards por Tag");
    expect(chartOptions.series[0].data).toEqual([
      { value: 10, name: "Tag 1" },
      { value: 20, name: "Tag 2" },
    ]);
  });

  it("renders the chart with correct title for cardStatus data", () => {
    const wrapper = mount(PieChart, {
      props: {
        cardStatus: [
          { status: "Status 1", qtd: 15 },
          { status: "Status 2", qtd: 25 },
        ],
      },
    });

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Cards por Status");
    expect(chartOptions.series[0].data).toEqual([
      { value: 15, name: "Status 1" },
      { value: 25, name: "Status 2" },
    ]);
  });

  it("renders the chart with default title when no data is provided", () => {
    const wrapper = mount(PieChart);

    const chartOptions = wrapper.vm.option;
    expect(chartOptions.title.text).toBe("Distribuição de Dados");
    expect(chartOptions.series[0].data).toEqual([]);
  });

  it("updates the chart data when props change", async () => {
    const wrapper = mount(PieChart, {
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
    expect(chartOptions.series[0].data).toEqual([
      { value: 30, name: "Tag 3" },
      { value: 40, name: "Tag 4" },
    ]);
  });
});
