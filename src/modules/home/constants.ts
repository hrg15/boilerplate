import { ExternalLink, Github, Layers, Rocket, ShieldCheck } from "lucide-react";
import type { Feature, HomeLink, StackItem, TreeNode } from "./types";

export const DEMO_URL = "https://boilerplate-hrg.vercel.app/";
export const REPO_URL = "https://github.com/hrg15/boilerplate";
const DEPLOY_URL = `https://vercel.com/new/clone?repository-url=${REPO_URL}`;

export const FEATURES: Feature[] = [
  {
    title: "Type-safe by default",
    description:
      "Strict TypeScript, path aliases, and a typed API layer with shared error handling.",
    icon: ShieldCheck,
  },
  {
    title: "Modular architecture",
    description:
      "Every page is a module that owns its components, types, and API calls.",
    icon: Layers,
  },
  {
    title: "Ready to ship",
    description:
      "Metadata, sitemap, robots, and manifest are wired up for SSG and ISR.",
    icon: Rocket,
  },
];

export const STACK: StackItem[] = [
  { name: "Next.js 16", role: "App Router" },
  { name: "React 19", role: "UI library" },
  { name: "TypeScript 5", role: "Type safety" },
  { name: "Tailwind CSS 4", role: "Styling" },
  { name: "React Query 5", role: "Server state" },
  { name: "Zustand 5", role: "Client state" },
  { name: "Axios", role: "HTTP client" },
  { name: "shadcn/ui", role: "Components" },
];

export const HOME_LINKS: HomeLink[] = [
  { label: "Live demo", href: DEMO_URL, icon: ExternalLink, variant: "default" },
  { label: "View on GitHub", href: REPO_URL, icon: Github, variant: "outline" },
  { label: "Deploy now", href: DEPLOY_URL, icon: Rocket, variant: "outline" },
];

export const PROJECT_TREE: TreeNode[] = [
  {
    name: "src/",
    type: "folder",
    defaultOpen: true,
    children: [
      {
        name: "app/",
        type: "folder",
        description: "App Router",
        defaultOpen: true,
        children: [
          { name: "layout.tsx", type: "file", description: "Root layout" },
          { name: "page.tsx", type: "file", description: "Home page" },
          { name: "loading.tsx", type: "file", description: "Loading UI" },
          { name: "manifest.ts", type: "file", description: "Web manifest" },
          { name: "robots.ts", type: "file", description: "robots.txt" },
          { name: "sitemap.ts", type: "file", description: "Sitemap" },
        ],
      },
      {
        name: "modules/",
        type: "folder",
        description: "One folder per page",
        defaultOpen: true,
        children: [
          {
            name: "home/",
            type: "folder",
            children: [
              {
                name: "components/",
                type: "folder",
                children: [
                  {
                    name: "folder-tree.tsx",
                    type: "file",
                    description: "This component",
                  },
                ],
              },
              { name: "constants.ts", type: "file", description: "Page data" },
              { name: "types.ts", type: "file" },
              { name: "utils.ts", type: "file" },
            ],
          },
        ],
      },
      {
        name: "shared/",
        type: "folder",
        description: "Reused across modules",
        defaultOpen: true,
        children: [
          {
            name: "api/",
            type: "folder",
            description: "API layer",
            children: [
              {
                name: "api-error.ts",
                type: "file",
                description: "Error class + guards",
              },
              { name: "build-url.ts", type: "file", description: "URL builder" },
              { name: "client.ts", type: "file", description: "Axios client" },
              {
                name: "query-client.ts",
                type: "file",
                description: "React Query setup",
              },
              { name: "types.ts", type: "file" },
              { name: "urls.ts", type: "file", description: "Endpoint paths" },
              {
                name: "http/",
                type: "folder",
                children: [
                  {
                    name: "server.ts",
                    type: "file",
                    description: "serverFetch",
                  },
                ],
              },
              {
                name: "properties/",
                type: "folder",
                description: "Example resource",
                children: [
                  { name: "types.ts", type: "file" },
                  { name: "server.ts", type: "file" },
                  {
                    name: "hooks/",
                    type: "folder",
                    children: [
                      { name: "use-properties.ts", type: "file" },
                      { name: "use-properties-map.ts", type: "file" },
                      { name: "use-property.ts", type: "file" },
                      { name: "use-property-mutations.ts", type: "file" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "components/",
            type: "folder",
            children: [
              {
                name: "provider.tsx",
                type: "file",
                description: "App providers",
              },
              {
                name: "ui/",
                type: "folder",
                description: "shadcn/ui primitives",
                children: [
                  { name: "accordion.tsx", type: "file" },
                  { name: "button.tsx", type: "file" },
                  { name: "checkbox.tsx", type: "file" },
                  { name: "combobox.tsx", type: "file" },
                  { name: "dialog.tsx", type: "file" },
                  { name: "drawer.tsx", type: "file" },
                  { name: "dropdown-menu.tsx", type: "file" },
                  { name: "empty.tsx", type: "file" },
                  { name: "input.tsx", type: "file" },
                  { name: "input-group.tsx", type: "file" },
                  { name: "popover.tsx", type: "file" },
                  { name: "progress.tsx", type: "file" },
                  { name: "resizable.tsx", type: "file" },
                  { name: "select.tsx", type: "file" },
                  { name: "slider.tsx", type: "file" },
                  { name: "spinner.tsx", type: "file" },
                  { name: "textarea.tsx", type: "file" },
                ],
              },
            ],
          },
          {
            name: "constants/",
            type: "folder",
            children: [
              { name: "routes.ts", type: "file", description: "ROUTES map" },
            ],
          },
          {
            name: "hooks/",
            type: "folder",
            children: [{ name: "use-copy.ts", type: "file" }],
          },
          {
            name: "icons/",
            type: "folder",
            children: [{ name: "three-dots-loading.tsx", type: "file" }],
          },
          {
            name: "lib/",
            type: "folder",
            children: [
              { name: "utils.ts", type: "file", description: "cn() helper" },
            ],
          },
          {
            name: "store/",
            type: "folder",
            children: [
              {
                name: "auth-store.ts",
                type: "file",
                description: "Zustand auth",
              },
            ],
          },
          {
            name: "styles/",
            type: "folder",
            children: [
              {
                name: "globals.css",
                type: "file",
                description: "Design tokens",
              },
            ],
          },
        ],
      },
    ],
  },
  { name: "config.ts", type: "file", description: "Base URLs" },
  { name: "components.json", type: "file", description: "shadcn config" },
  { name: "next.config.ts", type: "file" },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
];
