import { BASE_API_URL } from "../../../config";
import type { QueryParams } from "./types";

export const buildUrl = (path: string, params?: QueryParams) => {
  const url = new URL(path.replace(/^\/+/, ""), `${BASE_API_URL}/`);

  if (!params) {
    return url.toString();
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value
        .filter((item) => item !== undefined && item !== null && item !== "")
        .forEach((item) => url.searchParams.append(key, String(item)));
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
};
