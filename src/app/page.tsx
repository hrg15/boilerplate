import { FeatureList } from "@/modules/home/components/feature-list";
import { FolderTree } from "@/modules/home/components/folder-tree";
import { Hero } from "@/modules/home/components/hero";
import { StackList } from "@/modules/home/components/stack-list";
import { DEMO_URL, REPO_URL } from "@/modules/home/constants";

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-16 sm:py-24">
      <Hero />

      <FeatureList />

      <section className="flex flex-col gap-5">
        <h2 className="text-lg">Built with</h2>
        <StackList />
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg">Project structure</h2>
          <p className="text-sm text-muted-foreground">
            A page-per-module layout: each module owns its components, types,
            and API calls, while{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              shared
            </code>{" "}
            holds what more than one module needs.
          </p>
        </div>
        <FolderTree />
      </section>

      <footer className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
        <span>Built with Next.js.</span>
        <a
          className="underline-offset-4 hover:text-foreground hover:underline"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
        <a
          className="underline-offset-4 hover:text-foreground hover:underline"
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live demo
        </a>
      </footer>
    </main>
  );
}
