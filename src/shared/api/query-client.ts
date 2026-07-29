import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isApiHttpError } from "./api-error";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          if (isApiHttpError(error)) {
            if (error.status === 401 || error.status >= 500) return false;
          }

          if (error instanceof AxiosError) {
            const status = error.response?.status;
            if (status === 401 || (status !== undefined && status >= 500)) {
              return false;
            }
          }

          return failureCount < 3;
        },
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

let browserQueryClient: QueryClient | undefined;

/**
 * Fresh QueryClient per server request (avoids cross-user cache leaks).
 * Singleton only in the browser.
 */
export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
