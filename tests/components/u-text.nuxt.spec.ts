import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import UText from "~/components/u-text.vue";

describe("UText", () => {
  it("renders with default props", () => {
    const wrapper = mount(UText);
    expect(wrapper.element.tagName.toLowerCase()).toBe("p");
    expect(wrapper.classes()).toContain("text-left");
    expect(wrapper.classes()).toContain("md:text-base");
    expect(wrapper.classes()).toContain("font-normal");
    expect(wrapper.classes()).toContain("text-stone");
  });

  it("renders with custom props", () => {
    const wrapper = mount(UText, {
      props: {
        tag: "h1",
        align: "center",
        size: "large",
        weight: "bold",
        color: "inherit",
      },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("h1");
    expect(wrapper.classes()).toContain("text-center");
    expect(wrapper.classes()).toContain("md:text-lg");
    expect(wrapper.classes()).toContain("font-bold");
    expect(wrapper.classes()).toContain("dark:text-white");
  });

  it("applies additional classes from attrs", () => {
    const wrapper = mount(UText, {
      attrs: {
        class: "custom-class",
      },
    });
    expect(wrapper.classes()).toContain("custom-class");
  });
});
