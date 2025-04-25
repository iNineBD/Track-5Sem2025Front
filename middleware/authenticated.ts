export default defineNuxtRouteMiddleware(() => {
  const token = useState<string | null>("authToken").value;

  if (!token) {
    return navigateTo("/login");
  }

  const isTokenExpired = (token: string) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const exp = decoded.exp * 1000;
      return exp < Date.now();
    } catch {
      return true;
    }
  };

  if (isTokenExpired(token)) {
    if (import.meta.client) {
      localStorage.removeItem("authToken");
    }
    return navigateTo("/login");
  }
});
