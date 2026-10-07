import type { Metadata } from "next";
import { FeatureList } from "@/modules/home/components/feature-list";
import { Hero } from "@/modules/home/components/hero";
import { HomeFooter } from "@/modules/home/components/home-footer";
import { ProjectStructure } from "@/modules/home/components/project-structure";
import { StackList } from "@/modules/home/components/stack-list";
import { ROUTES } from "@/shared/constants/routes";

export const metadata: Metadata = {
  alternates: {
    canonical: ROUTES.home,
  },
};

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-16 sm:py-24">
      <Hero />
      <FeatureList />
      <StackList />
      <ProjectStructure />
      <HomeFooter />
    </main>
  );
}
