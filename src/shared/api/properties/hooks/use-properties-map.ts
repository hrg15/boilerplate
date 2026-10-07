"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import { propertyKeys } from "../keys";
import type { PropertyMapResponse, PropertySearchParams } from "../types";

const getPropertiesForMap = async (
  params?: PropertySearchParams,
  signal?: AbortSignal,
) => {
  const { data } = await apiClient.get<PropertyMapResponse>(
    URLs.properties.map,
    { params, signal },
  );
  return data.data;
};

export const usePropertiesMap = (params?: PropertySearchParams) =>
  useQuery({
    queryKey: propertyKeys.map(params),
    queryFn: ({ signal }) => getPropertiesForMap(params, signal),
  });
