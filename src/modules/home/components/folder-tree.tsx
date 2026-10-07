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
import type { FileKind, FolderNode, TreeNode } from "../types";
import { getFileKind } from "../utils";

const FILE_ICONS: Record<FileKind, LucideIcon> = {
  component: FileCode,
  script: FileCode,
  data: FileJson,
  style: FileType,
  text: FileText,
};

const rowClassName =
  "flex w-full items-center gap-2 rounded-md py-1 ps-2 pe-2 text-start text-sm transition-colors hover:bg-muted [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-muted-foreground";

type TreeRowContentProps = {
  name: string;
  description?: string;
};

const TreeRowContent = ({ name, description }: TreeRowContentProps) => (
  <>
    <span className="truncate">{name}</span>
    {description && (
      <span className="ms-auto hidden shrink-0 ps-3 text-xs font-normal text-muted-foreground sm:block">
        {description}
      </span>
    )}
  </>
);

type FolderItemProps = {
  node: FolderNode;
};

const FolderItem = ({ node }: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(node.defaultOpen ?? false);
  const FolderIcon = isOpen ? FolderOpen : Folder;

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger
        className={cn(
          rowClassName,
          "cursor-pointer font-medium text-title focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        )}
      >
        <ChevronRight
          className={cn(
            "transition-transform duration-150 rtl:rotate-180",
            isOpen && "rotate-90 rtl:rotate-90",
          )}
        />
        <FolderIcon />
        <TreeRowContent name={node.name} description={node.description} />
      </Collapsible.Trigger>
      <Collapsible.Content className="ps-3.5">
        <TreeList nodes={node.children} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

type TreeItemProps = {
  node: TreeNode;
};

const TreeItem = ({ node }: TreeItemProps) => {
  if (node.type === "folder") {
    return <FolderItem node={node} />;
  }

  const Icon = FILE_ICONS[getFileKind(node.name)];

  return (
    <div className={rowClassName}>
      <Icon />
      <TreeRowContent name={node.name} description={node.description} />
    </div>
  );
};

type TreeListProps = {
  nodes: TreeNode[];
};

const TreeList = ({ nodes }: TreeListProps) =>
  nodes.map((node) => <TreeItem key={node.name} node={node} />);

export const FolderTree = () => (
  <div className="rounded-lg border border-border font-mono">
    <div className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
      project structure
    </div>
    <div className="p-2">
      <TreeList nodes={PROJECT_TREE} />
    </div>
  </div>
);
