import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";
import { isApiError } from "./api-error";

const MAX_RETRIES = 3;
const DEFAULT_STALE_TIME = 60 * 1000;

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        retry: (failureCount, error) => {
          if (failureCount >= MAX_RETRIES) {
            return false;
          }

          return isApiError(error) ? error.isRetryable : false;
        },
      },
      mutations: {
        retry: false,
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
 * On the server a fresh client is returned per render so no cache is shared
 * between requests. In the browser the same client is reused across renders.
 */
export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();

  return browserQueryClient;
};
