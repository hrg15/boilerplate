import apiClient from "../client";
import { ApiResponse, User, UsersQueryParams } from "./types";

export const getUsers = async (params?: UsersQueryParams): Promise<User[]> => {
  const response = await apiClient.get<ApiResponse<User[]>>("/users", {
    params,
  });
  return response.data.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (
  userData: Omit<User, "id" | "createdAt">
): Promise<User> => {
  const response = await apiClient.post<ApiResponse<User>>("/users", userData);
  return response.data.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>(
    `/users/${id}`,
    userData
  );
  return response.data.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
