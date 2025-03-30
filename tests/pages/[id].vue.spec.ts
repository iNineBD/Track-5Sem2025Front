import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectPage from "~/pages/project/[id].vue";

vi.mock("~/components/charts/pie-chart.vue", () => ({
  default: {},
}));

vi.mock("~/components/charts/bar-chart.vue", () => ({
  default: {},
}));

describe("Project Page", () => {
  it("renders the project statistics page", async () => {
    const wrapper = await mountSuspended(ProjectPage, {
      props: {},
      mocks: {
        useRoute: () => ({ params: { id: "1" } }),
      },
    });

    expect(wrapper.text()).toContain("Estatísticas do Projeto");
  });
});
