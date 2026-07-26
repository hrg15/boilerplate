export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number>;

export type QueryParams = Record<string, QueryParamValue>;
