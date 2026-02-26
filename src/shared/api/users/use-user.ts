import { useMutation, useQuery } from "@tanstack/react-query";
import { User, UsersQueryParams } from "./types";
import { createUser, getUsers } from "./users";

export const useUsers = (params?: UsersQueryParams) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    staleTime: 5 * 60 * 1000,
  });

export const useCreateUser = () =>
  useMutation({
    mutationFn: (userData: Omit<User, "id">) => createUser(userData),
  });
