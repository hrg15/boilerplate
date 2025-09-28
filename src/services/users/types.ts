export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Query parameters interface
export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: "active" | "inactive";
}
