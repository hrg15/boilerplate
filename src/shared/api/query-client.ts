import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { isClientError } from "./api-error";

const MAX_RETRIES = 3;

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: (failureCount, error) =>
          !isClientError(error) && failureCount < MAX_RETRIES,
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
