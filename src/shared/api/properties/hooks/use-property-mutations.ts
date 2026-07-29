"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../client";
import { URLs } from "../../urls";
import type {
  CreatePropertyInput,
  PropertyResponse,
  UpdatePropertyInput,
} from "../types";

const createProperty = async (input: CreatePropertyInput) => {
  const { data } = await apiClient.post<PropertyResponse>(
    URLs.properties.list,
    input,
  );
  return data.data;
};

const updateProperty = async (id: string, input: UpdatePropertyInput) => {
  const { data } = await apiClient.patch<PropertyResponse>(
    URLs.properties.detail(id),
    input,
  );
  return data.data;
};

const deleteProperty = async (id: string) => {
  await apiClient.delete(URLs.properties.detail(id));
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useUpdateProperty = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdatePropertyInput) => updateProperty(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};
