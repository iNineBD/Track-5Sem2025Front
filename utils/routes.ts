import { ref, computed, onMounted } from "vue";
import { useColorMode } from "#imports";
import { useUserStore } from "~/stores/userStore";

export default function useRoutes() {
  const colorMode = useColorMode();
  const userStore = useUserStore();
  const isDark = ref(false);

  onMounted(() => {
    isDark.value = colorMode.value === "dark";
  });

  const toggleTheme = () => {
    const newTheme = isDark.value ? "light" : "dark";
    colorMode.preference = newTheme;
    isDark.value = !isDark.value;
  };

  const logout = () => {
    useCookie("token").value = null;
    navigateTo("/login");
  };

  const routes = computed(() => [
    [
      {
        label: "Home",
        icon: "i-heroicons-home",
        to: "/",
      },
      {
        label: userStore.nameRole === "ADMIN" ? "Usuários" : "",
        icon: userStore.nameRole === "ADMIN" ? "i-heroicons-users" : "",
        to: "/usuarios",
      },
    ],
    [
      {
        label: "Theme",
        icon: isDark.value
          ? "i-heroicons-moon-20-solid"
          : "i-heroicons-sun-20-solid",
        click: toggleTheme,
      },
      {
        label: capitalizeName(userStore.name),
        avatar: {
          alt: userStore.name,
        },
        to: "#",
      },
      {
        label: "Logout",
        icon: "heroicons:arrow-right-start-on-rectangle-20-solid",
        click: logout,
      },
    ],
  ]);

  return routes;
}
