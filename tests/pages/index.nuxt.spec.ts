import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Index from "~/pages/index.vue";

describe("Index Page", () => {
  it("renders the index page", async () => {
    const wrapper = await mountSuspended(Index);
    expect(wrapper.text()).toContain("Meus Projetos");
  });
});
