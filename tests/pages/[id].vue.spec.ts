import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectPage from "~/pages/project/[id].vue";

// Mock the useProjectStatistics composable
vi.mock("~/composables/useProjectStatistics", () => ({
  useProjectStatistics: () => ({
    data: {
      value: {
        card_tag: [
          { tag_name: "Tag 1", qtd: 10 },
          { tag_name: "Tag 2", qtd: 5 },
        ],
        card_status: [
          { status: "To Do", qtd: 8 },
          { status: "Done", qtd: 7 },
        ],
        card_user: [
          { name_user: "User 1", qtd: 6 },
          { name_user: "User 2", qtd: 9 },
        ],
      },
    },
    pending: false,
    error: null,
  }),
}));

describe("Project Page", () => {
  it("renders the project page with charts", async () => {
    const wrapper = await mountSuspended(ProjectPage);

    // Check if the page contains the expected chart titles
    expect(wrapper.html()).toContain("Cards por tags");
    expect(wrapper.html()).toContain("Cards por status");
    expect(wrapper.html()).toContain("Cards por usuários");
  });
});
