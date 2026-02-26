import apiClient from "../client";
import { ApiResponse, User, UsersQueryParams } from "./types";

type UserResponseType = ApiResponse<User[]>;

export const getUsers = async (params?: UsersQueryParams) => {
  const response = await apiClient.get<UserResponseType>("/users", {
    params,
  });
  return response.data.data;
};

export const getUserById = async (id: number) => {
  const response = await apiClient.get<UserResponseType>(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (userData: Omit<User, "id" | "createdAt">) => {
  const response = await apiClient.post<UserResponseType>("/users", userData);
  return response.data.data;
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const response = await apiClient.put<UserResponseType>(
    `/users/${id}`,
    userData,
  );
  return response.data.data;
};

export const deleteUser = async (id: number) => {
  await apiClient.delete(`/users/${id}`);
};
