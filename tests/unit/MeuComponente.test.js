import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Navbar from "../../components/the-header/the-header.vue";
import routes from "../../utils/routes";

describe("Navbar.vue", () => {
  it("renderiza corretamente os links do menu", () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
          buttonTheme: true, // Mock do botão
        },
      },
    });

    // Verifica se a navegação existe
    expect(wrapper.find("nav").exists()).toBe(true);

    // Verifica se todos os links estão presentes
    const links = wrapper.findAll("nav ul li");
    expect(links.length).toBe(routes.length);

    // Verifica se os textos dos links estão corretos
    routes.forEach((route, index) => {
      expect(links[index].text()).toBe(route.label);
    });
  });

  it("exibe a logo corretamente", () => {
    const wrapper = mount(Navbar);
    const logo = wrapper.find("img");
    expect(logo.exists()).toBe(true);
    expect(logo.attributes("src")).toBe("/track.svg");
  });
});
