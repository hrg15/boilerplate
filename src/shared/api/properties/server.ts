import { serverFetch, type ServerFetchOptions } from "../http/server";
import { URLs } from "../urls";
import type {
  PropertyListResponse,
  PropertyMapResponse,
  PropertyResponse,
  PropertySearchParams,
} from "./types";

type CacheOptions = Pick<ServerFetchOptions, "revalidate" | "tags" | "cache">;

const LIST_REVALIDATE_SECONDS = 3600;
const MAP_REVALIDATE_SECONDS = 300;
const DETAIL_REVALIDATE_SECONDS = 3600;

const resolveCacheOptions = (
  options: CacheOptions,
  defaults: Required<Pick<CacheOptions, "revalidate" | "tags">>,
): CacheOptions => ({
  cache: options.cache,
  tags: options.tags ?? defaults.tags,
  revalidate: options.cache
    ? options.revalidate
    : (options.revalidate ?? defaults.revalidate),
});

export const getProperties = async (
  params?: PropertySearchParams,
  options: CacheOptions = {},
) => {
  const response = await serverFetch<PropertyListResponse>(
    URLs.properties.list,
    {
      params,
      ...resolveCacheOptions(options, {
        revalidate: LIST_REVALIDATE_SECONDS,
        tags: ["properties", "properties-list"],
      }),
    },
  );
  return response.data;
};

export const getPropertiesForMap = async (
  params?: PropertySearchParams,
  options: CacheOptions = {},
) => {
  const response = await serverFetch<PropertyMapResponse>(URLs.properties.map, {
    params,
    ...resolveCacheOptions(options, {
      revalidate: MAP_REVALIDATE_SECONDS,
      tags: ["properties", "properties-map"],
    }),
  });
  return response.data;
};

export const getPropertyById = async (
  id: string,
  options: CacheOptions = {},
) => {
  const response = await serverFetch<PropertyResponse>(
    URLs.properties.detail(id),
    resolveCacheOptions(options, {
      revalidate: DETAIL_REVALIDATE_SECONDS,
      tags: ["properties", `property-${id}`],
    }),
  );
  return response.data;
};
