import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boilerplate",
    short_name: "Boilerplate",
    description: "Boilerplate",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait-primary",
    prefer_related_applications: false,
    icons: [
      {
        src: "/logo/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // {
      //   src: "/logo/icon-192x192.png",
      //   sizes: "192x192",
      //   type: "image/png",
      // },
      // {
      //   src: "/logo/icon-512x512.png",
      //   sizes: "512x512",
      //   type: "image/png",
      // },
      // {
      //   src: "/logo/logo.svg",
      //   sizes: "any",
      //   type: "image/svg+xml",
      // },
    ],
    shortcuts: [
      {
        name: "Boilerplate",
        short_name: "Boilerplate",
        url: "/",
        icons: [
          // {
          //   src: "/logo/icon-512x512.png",
          //   sizes: "512x512",
          //   type: "image/png",
          // },
        ],
      },
    ],
  };
}
