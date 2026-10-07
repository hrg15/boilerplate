import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const STORE_NAME = "AUTH";

type AuthState = {
  token: string;
  refreshToken: string;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearTokens: () => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set) => ({
        token: "",
        refreshToken: "",

        setToken: (token) =>
          set(
            (state) => {
              state.token = token;
            },
            false,
            "setToken",
          ),
        setRefreshToken: (refreshToken) =>
          set(
            (state) => {
              state.refreshToken = refreshToken;
            },
            false,
            "setRefreshToken",
          ),
        clearTokens: () =>
          set(
            (state) => {
              state.token = "";
              state.refreshToken = "";
            },
            false,
            "clearTokens",
          ),
      })),
      {
        name: STORE_NAME,
        partialize: ({ token, refreshToken }) => ({ token, refreshToken }),
      },
    ),
    { name: STORE_NAME, enabled: process.env.NODE_ENV !== "production" },
  ),
);

export default useAuthStore;
