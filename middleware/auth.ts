export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token");

  const isLoggedIn = !!token.value && !isTokenExpired(token.value);

  if (!isLoggedIn && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (isLoggedIn && to.path === "/login") {
    return navigateTo("/");
  }
});

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp * 1000;
  return Date.now() > exp;
}
