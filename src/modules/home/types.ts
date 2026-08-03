import type { LucideIcon } from "lucide-react";

export type FileKind = "component" | "script" | "data" | "style" | "text";

export type FileNode = {
  name: string;
  type: "file";
  description?: string;
};

export type FolderNode = {
  name: string;
  type: "folder";
  description?: string;
  defaultOpen?: boolean;
  children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StackItem = {
  name: string;
  role: string;
};

export type HomeLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "outline";
};
