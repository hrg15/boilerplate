import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BASE_API_URL } from "../../../config";
import useAuthStore from "../store/auth-store";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      useAuthStore.getState().setToken("");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
