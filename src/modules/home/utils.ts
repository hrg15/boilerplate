import type { FileKind } from "./types";

export const getFileKind = (name: string): FileKind => {
  if (name.endsWith(".tsx") || name.endsWith(".jsx")) return "component";
  if (name.endsWith(".ts") || name.endsWith(".js")) return "script";
  if (name.endsWith(".json")) return "data";
  if (name.endsWith(".css")) return "style";
  return "text";
};
