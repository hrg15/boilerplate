import axios, { AxiosError, type AxiosInstance } from "axios";
import { BASE_API_URL } from "../../../config";
import useAuthStore from "../store/auth-store";
import { ApiHttpError } from "./api-error";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const toApiHttpError = (error: AxiosError): ApiHttpError => {
  const path = error.config?.url ?? "";

  if (error.response) {
    return new ApiHttpError({
      status: error.response.status,
      statusText: error.response.statusText,
      path,
      body: error.response.data,
    });
  }

  const isTimeout =
    error.code === AxiosError.ECONNABORTED ||
    error.code === AxiosError.ETIMEDOUT;

  return ApiHttpError.fromNetwork(error, path, isTimeout);
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isCancel(error) || !axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && typeof window !== "undefined") {
      useAuthStore.getState().clearTokens();
    }

    return Promise.reject(toApiHttpError(error));
  },
);

export default apiClient;
