"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import { propertyKeys } from "../keys";
import type { PropertyResponse } from "../types";

const getPropertyById = async (id: string, signal?: AbortSignal) => {
  const { data } = await apiClient.get<PropertyResponse>(
    URLs.properties.detail(id),
    { signal },
  );
  return data.data;
};

export const useProperty = (id: string, isEnabled = true) =>
  useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: ({ signal }) => getPropertyById(id, signal),
    enabled: Boolean(id) && isEnabled,
  });
