export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");

  if (!token.value || isTokenExpired(token.value)) {
    return navigateTo("/login");
  }
});

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp * 1000;
  return Date.now() > exp;
}
