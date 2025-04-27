import { ref, computed, onMounted } from "vue";
import { useColorMode } from "#imports";

export default function useRoutes() {
  const colorMode = useColorMode();

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
        label: "Profile",
        avatar: {
          alt: "Lucas Henrique",
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
