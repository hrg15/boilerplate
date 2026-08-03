import { cookies } from "next/headers";
import { ApiHttpError } from "./api-error";
import { buildUrl } from "./build-url";
import { QueryParams } from "./types";

export const AUTH_COOKIE_NAME = "auth-token";

const DEFAULT_TIMEOUT = 10_000;

export type ServerRequestOptions = Omit<RequestInit, "body"> & {
  params?: QueryParams;
  body?: unknown;
  /** Skip reading the auth cookie so the request can stay statically cacheable. */
  skipAuth?: boolean;
  timeout?: number;
};

const buildHeaders = async (
  headers: HeadersInit | undefined,
  hasBody: boolean,
  skipAuth: boolean,
) => {
  const requestHeaders = new Headers(headers);

  if (hasBody && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (skipAuth || requestHeaders.has("Authorization")) {
    return requestHeaders;
  }

  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  return requestHeaders;
};

export const serverFetch = async <T>(
  path: string,
  options: ServerRequestOptions = {},
): Promise<T> => {
  const {
    params,
    body,
    skipAuth = false,
    timeout = DEFAULT_TIMEOUT,
    headers,
    signal,
    ...rest
  } = options;

  const hasBody = body !== undefined;
  const requestHeaders = await buildHeaders(headers, hasBody, skipAuth);

  let response: Response;

  try {
    response = await fetch(buildUrl(path, params), {
      ...rest,
      headers: requestHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal: signal ?? AbortSignal.timeout(timeout),
    });
  } catch (error) {
    throw ApiHttpError.fromNetwork(error, path);
  }

  if (!response.ok) {
    throw await ApiHttpError.fromResponse(response, path);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
