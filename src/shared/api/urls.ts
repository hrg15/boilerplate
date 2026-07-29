export const URLs = {
  users: {
    users: "/users",
  },
  properties: {
    list: "/properties",
    map: "/properties/map",
    detail: (id: string) => `/properties/${id}`,
  },
} as const;
