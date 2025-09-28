import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const STORE_NAME = "AUTH";

interface IState {
  token: string;
  refreshToken: string;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}

const useAuthStore = create<IState>()(
  immer(
    devtools(
      persist(
        (set) => ({
          token: "",
          refreshToken: "",

          setToken: (token: string) => {
            set(
              (state) => {
                state.token = token;
              },
              false,
              "setToken",
            );
            document.cookie = `auth-token=${token}; path=/; secure; samesite=strict`;
          },
          setRefreshToken: (token: string) =>
            set(
              (state) => {
                state.refreshToken = token;
              },
              false,
              "setToken",
            ),
        }),
        { name: STORE_NAME },
      ),
      { name: STORE_NAME },
    ),
  ),
);

export default useAuthStore;
