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
