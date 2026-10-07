export type ApiHttpErrorInit = {
  status: number;
  statusText?: string;
  path: string;
  body?: unknown;
  message?: string;
};

export const NETWORK_ERROR_STATUS = 0;
export const TIMEOUT_ERROR_STATUS = 408;

export class ApiHttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly path: string;
  readonly body: unknown;

  constructor({
    status,
    statusText = "",
    path,
    body,
    message,
  }: ApiHttpErrorInit) {
    super(message ?? resolveErrorMessage(body) ?? `HTTP ${status}`);
    this.name = "ApiHttpError";
    this.status = status;
    this.statusText = statusText;
    this.path = path;
    this.body = body ?? null;
  }

  static async fromResponse(response: Response, path: string) {
    return new ApiHttpError({
      status: response.status,
      statusText: response.statusText,
      path,
      body: await readJsonBody(response),
    });
  }

  static fromNetwork(error: unknown, path: string, isTimeout = false) {
    const hasTimedOut =
      isTimeout || (error instanceof Error && error.name === "TimeoutError");

    return new ApiHttpError({
      status: hasTimedOut ? TIMEOUT_ERROR_STATUS : NETWORK_ERROR_STATUS,
      statusText: hasTimedOut ? "Request Timeout" : "Network Error",
      path,
      message: hasTimedOut ? "Request timed out" : "Network request failed",
    });
  }
}

export const isApiHttpError = (error: unknown): error is ApiHttpError =>
  error instanceof ApiHttpError;

export const isNotFoundError = (error: unknown): boolean =>
  isApiHttpError(error) && error.status === 404;

export const isUnauthorizedError = (error: unknown): boolean =>
  isApiHttpError(error) && error.status === 401;

export const isForbiddenError = (error: unknown): boolean =>
  isApiHttpError(error) && error.status === 403;

export const isClientError = (error: unknown): boolean =>
  isApiHttpError(error) &&
  error.status >= 400 &&
  error.status < 500 &&
  error.status !== TIMEOUT_ERROR_STATUS &&
  error.status !== 429;

export const readJsonBody = async (response: Response): Promise<unknown> => {
  try {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
};

const resolveErrorMessage = (body: unknown): string | undefined => {
  if (!body || typeof body !== "object") return undefined;

  if ("message" in body && typeof body.message === "string") {
    return body.message;
  }

  if ("error" in body && typeof body.error === "string") {
    return body.error;
  }

  return undefined;
};
