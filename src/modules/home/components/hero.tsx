import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { HOME_LINKS } from "../constants";

export const Hero = () => (
  <header className="flex flex-col items-start gap-6">
    <Image
      src="/logo.png"
      alt="Boilerplate logo"
      width={56}
      height={56}
      className="rounded-lg"
      priority
    />
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-semibold tracking-tight text-balance">
        Next.js Boilerplate
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        An opinionated starting point for frontend projects: App Router,
        TypeScript, Tailwind CSS, and a typed API layer, already wired together
        so you can start on the first feature instead of the setup.
      </p>
    </div>
    <div className="flex flex-wrap gap-3">
      {HOME_LINKS.map(({ label, href, icon: Icon, variant }) => (
        <Button key={label} variant={variant} size="lg" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Icon />
            {label}
          </a>
        </Button>
      ))}
    </div>
  </header>
);
