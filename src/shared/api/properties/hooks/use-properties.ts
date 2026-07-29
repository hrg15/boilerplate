"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import type { PropertyListResponse, PropertySearchParams } from "../types";

const getProperties = async (params?: PropertySearchParams) => {
  const { data } = await apiClient.get<PropertyListResponse>(
    URLs.properties.list,
    { params },
  );
  return data.data;
};

export const useProperties = (params?: PropertySearchParams) =>
  useQuery({
    queryKey: ["properties", params],
    queryFn: () => getProperties(params),
  });
