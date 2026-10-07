import { FolderTree } from "./folder-tree";
import { HomeSection } from "./home-section";

export const ProjectStructure = () => (
  <HomeSection
    title="Project structure"
    description={
      <>
        A page-per-module layout: each module owns its components, types, and
        API calls, while{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          shared
        </code>{" "}
        holds what more than one module needs.
      </>
    }
  >
    <FolderTree />
  </HomeSection>
);
