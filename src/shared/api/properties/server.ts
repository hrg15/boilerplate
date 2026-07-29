import { serverFetch } from "../http/server";
import { URLs } from "../urls";
import type {
  Property,
  PropertyListResponse,
  PropertyMapPin,
  PropertyMapResponse,
  PropertyResponse,
  PropertySearchParams,
} from "./types";

type CacheOptions = {
  revalidate?: number | false;
  tags?: string[];
  cache?: RequestCache;
};

export const getProperties = async (
  params?: PropertySearchParams,
  options: CacheOptions = {},
) => {
  const response = await serverFetch<PropertyListResponse>(URLs.properties.list, {
    params,
    revalidate: options.revalidate ?? 3600,
    tags: options.tags ?? ["properties", "properties-list"],
    cache: options.cache,
  });
  return response.data;
};

export const getPropertiesForMap = async (
  params?: PropertySearchParams,
  options: CacheOptions = {},
) => {
  const response = await serverFetch<PropertyMapResponse>(URLs.properties.map, {
    params,
    revalidate: options.revalidate ?? 300,
    tags: options.tags ?? ["properties", "properties-map"],
    cache: options.cache,
  });
  return response.data;
};

export const getPropertyById = async (
  id: string,
  options: CacheOptions = {},
) => {
  const response = await serverFetch<PropertyResponse>(
    URLs.properties.detail(id),
    {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags ?? ["properties", `property-${id}`],
      cache: options.cache,
    },
  );
  return response.data;
};

export type { Property, PropertyMapPin, PropertySearchParams };
