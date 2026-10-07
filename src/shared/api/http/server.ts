import { ApiHttpError } from "../api-error";
import { buildUrl } from "../build-url";
import type { QueryParams } from "../types";

export type ServerFetchOptions = Omit<RequestInit, "body" | "cache"> & {
  params?: QueryParams;
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
  const hasBody = body !== undefined;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, params), {
      ...rest,
      headers: {
        Accept: "application/json",
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      ...(hasBody ? { body: JSON.stringify(body) } : {}),
      ...(cache ? { cache } : {}),
      ...(revalidate !== undefined || tags
        ? { next: { revalidate, tags } }
        : {}),
    });
  } catch (error) {
    throw ApiHttpError.fromNetwork(error, path);
  }

  if (!response.ok) {
    throw await ApiHttpError.fromResponse(response, path);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
};
