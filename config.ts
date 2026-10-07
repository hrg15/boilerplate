const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

const vercelProductionHost =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const BASE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_BASE_URL ??
    (vercelProductionHost
      ? `https://${vercelProductionHost}`
      : "https://localhost:3000"),
);

export const BASE_API_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_BASE_API_URL ?? `${BASE_URL}/api`,
);
