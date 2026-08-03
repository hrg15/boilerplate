"use client"

import { useState } from "react"
import { ChevronRight, Folder, FolderOpen, FileText, FileCode, FileJson, FileType } from "lucide-react"
import { Collapsible } from "radix-ui"
import { cn } from "@/shared/lib/utils"

type FileNode = {
  name: string
  type: "file"
  description?: string
}

type FolderNode = {
  name: string
  type: "folder"
  description?: string
  defaultOpen?: boolean
  children: TreeNode[]
}

type TreeNode = FileNode | FolderNode

function getFileIcon(name: string) {
  if (name.endsWith(".tsx") || name.endsWith(".jsx"))
    return <FileCode className="size-4 shrink-0 text-blue-500" />
  if (name.endsWith(".ts") || name.endsWith(".js"))
    return <FileCode className="size-4 shrink-0 text-yellow-500" />
  if (name.endsWith(".json"))
    return <FileJson className="size-4 shrink-0 text-orange-500" />
  if (name.endsWith(".css"))
    return <FileType className="size-4 shrink-0 text-pink-500" />
  return <FileText className="size-4 shrink-0 text-slate-400" />
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(
    node.type === "folder" ? (node.defaultOpen ?? false) : false
  )

  const indent = depth * 16

  if (node.type === "file") {
    return (
      <div
        className="group flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        style={{ paddingLeft: indent + 8 }}
      >
        {getFileIcon(node.name)}
        <span>{node.name}</span>
        {node.description && (
          <span className="ml-auto hidden text-xs text-slate-400 group-hover:block">
            {node.description}
          </span>
        )}
      </div>
    )
  }

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        style={{ paddingLeft: indent + 8 }}
      >
        <ChevronRight
          className={cn(
            "size-3.5 shrink-0 text-slate-400 transition-transform duration-150",
            open && "rotate-90"
          )}
        />
        {open ? (
          <FolderOpen className="size-4 shrink-0 text-amber-400" />
        ) : (
          <Folder className="size-4 shrink-0 text-amber-400" />
        )}
        <span>{node.name}</span>
        {node.description && (
          <span className="ml-auto hidden text-xs font-normal text-slate-400 group-hover:block">
            {node.description}
          </span>
        )}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

const TREE: TreeNode[] = [
  {
    name: "src/",
    type: "folder",
    defaultOpen: true,
    children: [
      {
        name: "app/",
        type: "folder",
        description: "Next.js App Router",
        defaultOpen: true,
        children: [
          { name: "layout.tsx", type: "file", description: "Root layout" },
          { name: "page.tsx", type: "file", description: "Home page" },
          { name: "loading.tsx", type: "file", description: "Loading UI" },
          { name: "manifest.ts", type: "file", description: "Web app manifest" },
          { name: "robots.ts", type: "file", description: "robots.txt" },
          { name: "sitemap.ts", type: "file", description: "Sitemap" },
        ],
      },
      {
        name: "modules/",
        type: "folder",
        description: "Feature modules",
        defaultOpen: true,
        children: [
          {
            name: "home/",
            type: "folder",
            children: [
              {
                name: "components/",
                type: "folder",
                children: [{ name: "folder-tree.tsx", type: "file", description: "This component" }],
              },
              { name: "types.ts", type: "file" },
              { name: "utils.ts", type: "file" },
            ],
          },
        ],
      },
      {
        name: "shared/",
        type: "folder",
        description: "Shared utilities & UI",
        defaultOpen: true,
        children: [
          {
            name: "api/",
            type: "folder",
            description: "API layer",
            children: [
              { name: "api-error.ts", type: "file", description: "Error classes" },
              { name: "build-url.ts", type: "file", description: "URL builder" },
              { name: "client.ts", type: "file", description: "Axios client" },
              { name: "query-client.ts", type: "file", description: "React Query setup" },
              { name: "server.ts", type: "file", description: "Server fetch" },
              { name: "types.ts", type: "file" },
              { name: "urls.ts", type: "file", description: "API endpoints" },
              {
                name: "http/",
                type: "folder",
                children: [
                  { name: "server.ts", type: "file", description: "Next.js server fetch" },
                ],
              },
              {
                name: "properties/",
                type: "folder",
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
              { name: "provider.tsx", type: "file", description: "App providers" },
              {
                name: "ui/",
                type: "folder",
                description: "shadcn/ui components",
                children: [
                  { name: "accordion.tsx", type: "file" },
                  { name: "button.tsx", type: "file" },
                  { name: "checkbox.tsx", type: "file" },
                  { name: "combobox.tsx", type: "file" },
                  { name: "dialog.tsx", type: "file" },
                  { name: "drawer.tsx", type: "file" },
                  { name: "dropdown-menu.tsx", type: "file" },
                  { name: "input.tsx", type: "file" },
                  { name: "select.tsx", type: "file" },
                  { name: "spinner.tsx", type: "file" },
                ],
              },
            ],
          },
          {
            name: "constants/",
            type: "folder",
            children: [{ name: "routes.ts", type: "file" }],
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
            children: [{ name: "utils.ts", type: "file", description: "cn() helper" }],
          },
          {
            name: "store/",
            type: "folder",
            children: [{ name: "auth-store.ts", type: "file", description: "Zustand auth" }],
          },
          {
            name: "styles/",
            type: "folder",
            children: [{ name: "globals.css", type: "file" }],
          },
        ],
      },
    ],
  },
  { name: "config.ts", type: "file", description: "Site config" },
  { name: "next.config.ts", type: "file" },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
]

export function FolderTree() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-yellow-400" />
          <span className="size-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-500">project structure</span>
      </div>
      <div className="space-y-0.5">
        {TREE.map((node, i) => (
          <TreeItem key={i} node={node} />
        ))}
      </div>
    </div>
  )
}
