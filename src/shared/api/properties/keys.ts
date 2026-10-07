import type { PropertySearchParams } from "./types";

export const propertyKeys = {
  all: ["properties"] as const,
  lists: () => [...propertyKeys.all, "list"] as const,
  list: (params?: PropertySearchParams) =>
    [...propertyKeys.lists(), params ?? {}] as const,
  map: (params?: PropertySearchParams) =>
    [...propertyKeys.all, "map", params ?? {}] as const,
  detail: (id: string) => [...propertyKeys.all, "detail", id] as const,
};
