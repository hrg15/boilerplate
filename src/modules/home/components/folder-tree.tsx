"use client";

import { useState } from "react";
import {
  ChevronRight,
  FileCode,
  FileJson,
  FileText,
  FileType,
  Folder,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";
import { Collapsible } from "radix-ui";
import { cn } from "@/shared/lib/utils";
import { PROJECT_TREE } from "../constants";
import type { FileKind, TreeNode } from "../types";
import { getFileKind } from "../utils";

const FILE_ICONS: Record<FileKind, LucideIcon> = {
  component: FileCode,
  script: FileCode,
  data: FileJson,
  style: FileType,
  text: FileText,
};

const INDENT_STEP = 14;

type TreeItemProps = {
  node: TreeNode;
  depth?: number;
};

const TreeItem = ({ node, depth = 0 }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(
    node.type === "folder" ? (node.defaultOpen ?? false) : false,
  );

  const rowClassName =
    "flex w-full items-center gap-2 rounded-md py-1 pr-2 text-left text-[13px] transition-colors hover:bg-muted";
  const indent = { paddingLeft: depth * INDENT_STEP + 8 };

  if (node.type === "file") {
    const Icon = FILE_ICONS[getFileKind(node.name)];

    return (
      <div className={cn(rowClassName, "text-foreground")} style={indent}>
        <Icon className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{node.name}</span>
        {node.description && (
          <span className="ml-auto hidden shrink-0 pl-3 text-xs text-muted-foreground sm:block">
            {node.description}
          </span>
        )}
      </div>
    );
  }

  const FolderIcon = isOpen ? FolderOpen : Folder;

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger
        className={cn(
          rowClassName,
          "cursor-pointer font-medium text-title focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        )}
        style={indent}
      >
        <ChevronRight
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform duration-150",
            isOpen && "rotate-90",
          )}
        />
        <FolderIcon className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{node.name}</span>
        {node.description && (
          <span className="ml-auto hidden shrink-0 pl-3 text-xs font-normal text-muted-foreground sm:block">
            {node.description}
          </span>
        )}
      </Collapsible.Trigger>
      <Collapsible.Content>
        {node.children.map((child) => (
          <TreeItem key={child.name} node={child} depth={depth + 1} />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export const FolderTree = () => (
  <div className="rounded-lg border border-border font-mono">
    <div className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
      project structure
    </div>
    <div className="p-2">
      {PROJECT_TREE.map((node) => (
        <TreeItem key={node.name} node={node} />
      ))}
    </div>
  </div>
);
