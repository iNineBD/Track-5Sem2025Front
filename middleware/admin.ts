import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  const isAdmin = userStore.nameRole === "ADMIN";

  if (!isAdmin) {
    return navigateTo("/");
  }
});
