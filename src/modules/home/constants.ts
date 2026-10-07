import {
  ExternalLink,
  Github,
  Layers,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type {
  Feature,
  FooterLink,
  HomeLink,
  StackItem,
  TreeNode,
} from "./types";

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
  {
    label: "Live demo",
    href: DEMO_URL,
    icon: ExternalLink,
    variant: "default",
  },
  { label: "View on GitHub", href: REPO_URL, icon: Github, variant: "outline" },
  { label: "Deploy now", href: DEPLOY_URL, icon: Rocket, variant: "outline" },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Source code", href: REPO_URL },
  { label: "Live demo", href: DEMO_URL },
];

const file = (name: string, description?: string): TreeNode => ({
  name,
  type: "file",
  description,
});

const UI_PRIMITIVES = [
  "accordion",
  "button",
  "checkbox",
  "combobox",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "input",
  "input-group",
  "popover",
  "progress",
  "resizable",
  "select",
  "slider",
  "spinner",
  "textarea",
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
          file("layout.tsx", "Root layout + metadata"),
          file("page.tsx", "Home page"),
          file("loading.tsx", "Loading UI"),
          file("error.tsx", "Error boundary"),
          file("global-error.tsx", "Root error boundary"),
          file("not-found.tsx", "404 page"),
          file("manifest.ts", "Web manifest"),
          file("robots.ts", "robots.txt"),
          file("sitemap.ts", "Sitemap"),
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
                  file("hero.tsx"),
                  file("feature-list.tsx"),
                  file("stack-list.tsx"),
                  file("project-structure.tsx"),
                  file("folder-tree.tsx", "This component"),
                  file("home-section.tsx"),
                  file("home-footer.tsx"),
                ],
              },
              file("constants.ts", "Page data"),
              file("types.ts"),
              file("utils.ts"),
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
              file("api-error.ts", "Error class + guards"),
              file("build-url.ts", "URL builder"),
              file("client.ts", "Axios client"),
              file("query-client.ts", "React Query setup"),
              file("types.ts"),
              file("urls.ts", "Endpoint paths"),
              {
                name: "http/",
                type: "folder",
                children: [file("server.ts", "serverFetch")],
              },
              {
                name: "properties/",
                type: "folder",
                description: "Reference resource",
                children: [
                  file("types.ts"),
                  file("keys.ts", "Query keys"),
                  file("server.ts"),
                  {
                    name: "hooks/",
                    type: "folder",
                    children: [
                      file("use-properties.ts"),
                      file("use-properties-map.ts"),
                      file("use-property.ts"),
                      file("use-property-mutations.ts"),
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
              file("provider.tsx", "App providers"),
              {
                name: "ui/",
                type: "folder",
                description: "shadcn/ui primitives",
                children: UI_PRIMITIVES.map((name) => file(`${name}.tsx`)),
              },
            ],
          },
          {
            name: "constants/",
            type: "folder",
            children: [file("routes.ts", "ROUTES map")],
          },
          {
            name: "hooks/",
            type: "folder",
            children: [file("use-copy.ts")],
          },
          {
            name: "icons/",
            type: "folder",
            children: [file("three-dots-loading.tsx")],
          },
          {
            name: "lib/",
            type: "folder",
            children: [file("utils.ts", "cn() helper")],
          },
          {
            name: "store/",
            type: "folder",
            children: [file("auth-store.ts", "Zustand auth")],
          },
          {
            name: "styles/",
            type: "folder",
            children: [file("globals.css", "Design tokens")],
          },
        ],
      },
      file("proxy.ts", "Request proxy"),
    ],
  },
  file("config.ts", "Base URLs"),
  file("components.json", "shadcn config"),
  file("next.config.ts", "Security headers"),
  file("package.json"),
  file("tsconfig.json"),
];
