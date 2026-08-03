export type ApiHttpErrorInit = {
  status: number;
  statusText?: string;
  path: string;
  body?: unknown;
  message?: string;
};

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
    super(message ?? resolveErrorMessage(status, body) ?? `HTTP ${status}`);
    this.name = "ApiHttpError";
    this.status = status;
    this.statusText = statusText;
    this.path = path;
    this.body = body ?? null;
  }

  static async fromResponse(response: Response, path: string) {
    let body: unknown = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }

    return new ApiHttpError({
      status: response.status,
      statusText: response.statusText,
      path,
      body,
    });
  }

  static fromNetwork(error: unknown, path: string) {
    const isTimeout = error instanceof Error && error.name === "TimeoutError";

    return new ApiHttpError({
      status: isTimeout ? 408 : 0,
      statusText: isTimeout ? "Request Timeout" : "Network Error",
      path,
      message:
        error instanceof Error
          ? error.message
          : isTimeout
            ? "Request timed out"
            : "Network request failed",
    });
  }
}

export const isApiHttpError = (error: unknown): error is ApiHttpError =>
  error instanceof ApiHttpError;

export const isNotFoundError = (error: unknown): boolean =>
  isApiHttpError(error) && error.status === 404;

export const isUnauthorizedError = (error: unknown): boolean =>
  isApiHttpError(error) && error.status === 401;

const resolveErrorMessage = (
  status: number,
  body: unknown,
): string | undefined => {
  if (!body || typeof body !== "object") return undefined;

  if ("message" in body && typeof body.message === "string") {
    return body.message;
  }

  if ("error" in body && typeof body.error === "string") {
    return body.error;
  }

  return `HTTP ${status}`;
};
