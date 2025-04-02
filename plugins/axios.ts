import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie("auth_token");

  const api = axios.create({
    baseURL: config.public.apiServer,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value ? `Bearer ${token.value}` : "",
    },
  });

  return {
    provide: {
      api,
    },
  };
});
