import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js Boilerplate",
    short_name: "Boilerplate",
    description:
      "An opinionated Next.js starter with the App Router, TypeScript, Tailwind CSS, React Query, Zustand, and a typed API layer.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "1089x1067",
        type: "image/png",
      },
    ],
  };
}
