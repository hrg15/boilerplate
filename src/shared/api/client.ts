import axios, { AxiosError, AxiosInstance } from "axios";
import useAuthStore from "../store/auth-store";
import { BASE_API_URL } from "../../../config";
import { ApiError, readErrorMessage } from "./api-error";

const API_CONFIG = {
  baseURL: BASE_API_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
};

const apiClient: AxiosInstance = axios.create(API_CONFIG);

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;

    if (status === 401 && typeof window !== "undefined") {
      useAuthStore.getState().setToken("");
    }

    return Promise.reject(
      new ApiError(
        readErrorMessage(error.response?.data, error.message),
        status,
        error.response?.data,
      ),
    );
  },
);

export default apiClient;
