export const URLs = {
  properties: {
    list: "/properties",
    map: "/properties/map",
    detail: (id: string) => `/properties/${encodeURIComponent(id)}`,
  },
} as const;
