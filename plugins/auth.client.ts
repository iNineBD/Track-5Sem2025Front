export default defineNuxtPlugin((nuxtApp) => {
  const authToken = localStorage.getItem("authToken");
  const authState = useState("authToken", () => authToken);
});
