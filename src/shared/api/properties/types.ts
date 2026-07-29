import type { ApiResponse } from "../types";

export type PropertyStatus = "available" | "sold" | "reserved";

export type Property = {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  status: PropertyStatus;
  city: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
};

export type PropertyMapPin = Pick<
  Property,
  "id" | "price" | "status" | "latitude" | "longitude"
>;

export type PropertySearchParams = {
  q?: string;
  city?: string;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bounds?: string;
  page?: number;
  limit?: number;
};

export type CreatePropertyInput = Omit<Property, "id" | "updatedAt">;
export type UpdatePropertyInput = Partial<CreatePropertyInput>;

export type PropertyListResponse = ApiResponse<Property[]>;
export type PropertyResponse = ApiResponse<Property>;
export type PropertyMapResponse = ApiResponse<PropertyMapPin[]>;
