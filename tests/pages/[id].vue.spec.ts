import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectPage from "~/pages/project/[id].vue";

describe("Index Page", () => {
  it("renders the index page", async () => {
    const wrapper = await mountSuspended(ProjectPage);
  });
});
