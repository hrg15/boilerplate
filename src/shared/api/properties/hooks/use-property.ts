"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import type { PropertyResponse } from "../types";

const getPropertyById = async (id: string) => {
  const { data } = await apiClient.get<PropertyResponse>(
    URLs.properties.detail(id),
  );
  return data.data;
};

export const useProperty = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["properties", id],
    queryFn: () => getPropertyById(id),
    enabled: Boolean(id) && enabled,
  });
