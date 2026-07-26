const NETWORK_ERROR_STATUS = 0;

export const readErrorMessage = (payload: unknown, fallback: string) => {
  if (typeof payload === "string" && payload.length > 0) {
    return payload;
  }

  if (payload && typeof payload === "object" && "message" in payload) {
    const { message } = payload as { message: unknown };
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }

  return fallback;
};

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }

  static async fromResponse(response: Response) {
    const payload = await response
      .clone()
      .json()
      .catch(() => undefined);

    return new ApiError(
      readErrorMessage(payload, response.statusText || "Request failed"),
      response.status,
      payload,
    );
  }

  static fromNetwork(error: unknown) {
    return new ApiError(
      error instanceof Error ? error.message : "Network request failed",
      NETWORK_ERROR_STATUS,
    );
  }

  get isNetworkError() {
    return this.status === NETWORK_ERROR_STATUS;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isServerError() {
    return this.status >= 500;
  }

  get isRetryable() {
    return this.isNetworkError || this.isServerError || this.status === 429;
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;
