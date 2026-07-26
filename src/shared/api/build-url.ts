import { BASE_API_URL } from "../../../config";
import { QueryParams } from "./types";

export const buildUrl = (path: string, params?: QueryParams) => {
  const url = new URL(
    path.replace(/^\//, ""),
    `${BASE_API_URL.replace(/\/$/, "")}/`,
  );

  if (!params) {
    return url.toString();
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, String(item)));
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
};
