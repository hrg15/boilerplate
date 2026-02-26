import axios, { AxiosInstance, AxiosResponse } from "axios";
import useAuthStore from "../store/auth-store";
import { BASE_URL } from "../../../config";

const setToken = useAuthStore.getState().setToken;
const API_CONFIG = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const apiClient: AxiosInstance = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        setToken("");
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
