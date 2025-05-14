import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  const getAuthHeader = () => {
    return token.value ? `Bearer ${token.value}` : "";
  };

  const api = axios.create({
    baseURL: config.public.apiServer,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((request) => {
    request.headers.Authorization = getAuthHeader();
    return request;
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
