import { BASE_API_URL } from "../../../../config";
import { ApiHttpError } from "../api-error";

type ParamValue = string | number | boolean | null | undefined;

export type ServerFetchOptions = Omit<RequestInit, "body" | "cache"> & {
  params?: Record<string, ParamValue>;
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
};

export const serverFetch = async <T>(
  path: string,
  options: ServerFetchOptions = {},
): Promise<T> => {
  const { params, body, cache, revalidate, tags, headers, ...rest } = options;

  const url = new URL(path, BASE_API_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value != null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...(cache ? { cache } : {}),
    ...(revalidate !== undefined || tags
      ? { next: { revalidate, tags } }
      : {}),
  });

  if (!response.ok) {
    let errorBody: unknown = null;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = null;
    }

    throw new ApiHttpError({
      status: response.status,
      statusText: response.statusText,
      path,
      body: errorBody,
    });
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};
