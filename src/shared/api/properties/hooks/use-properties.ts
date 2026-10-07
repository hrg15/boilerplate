"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import { propertyKeys } from "../keys";
import type { PropertyListResponse, PropertySearchParams } from "../types";

const getProperties = async (
  params?: PropertySearchParams,
  signal?: AbortSignal,
) => {
  const { data } = await apiClient.get<PropertyListResponse>(
    URLs.properties.list,
    { params, signal },
  );
  return data.data;
};

export const useProperties = (params?: PropertySearchParams) =>
  useQuery({
    queryKey: propertyKeys.list(params),
    queryFn: ({ signal }) => getProperties(params, signal),
  });
