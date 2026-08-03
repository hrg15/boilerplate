export type QueryParamValue = string | number | boolean | null | undefined;

export type QueryParams = Record<
  string,
  QueryParamValue | readonly QueryParamValue[]
>;

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
