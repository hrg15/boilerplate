import { FOOTER_LINKS } from "../constants";

export const HomeFooter = () => (
  <footer className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
    <span>Built with Next.js.</span>
    {FOOTER_LINKS.map(({ label, href }) => (
      <a
        key={label}
        className="underline-offset-4 hover:text-foreground hover:underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    ))}
  </footer>
);
