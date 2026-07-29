"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import type { PropertyMapResponse, PropertySearchParams } from "../types";

const getPropertiesForMap = async (params?: PropertySearchParams) => {
  const { data } = await apiClient.get<PropertyMapResponse>(
    URLs.properties.map,
    { params },
  );
  return data.data;
};

export const usePropertiesMap = (params?: PropertySearchParams) =>
  useQuery({
    queryKey: ["properties", "map", params],
    queryFn: () => getPropertiesForMap(params),
  });
