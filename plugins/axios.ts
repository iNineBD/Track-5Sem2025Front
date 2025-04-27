import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  const api = axios.create({
    baseURL: config.public.apiServer,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value ? `Bearer ${token.value}` : "",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        navigateTo("/login");
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      api,
    },
  };
});
