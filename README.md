# Next.js Boilerplate

An opinionated starting point for frontend projects: Next.js App Router, TypeScript,
Tailwind CSS, and a typed API layer already wired together.

Live demo: [boilerplate-hrg.vercel.app](https://boilerplate-hrg.vercel.app/)

## What's Inside

| Tool                       | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| Next.js 16 (App Router)    | Routing, rendering, metadata, Turbopack dev server |
| React 19 + TypeScript 5    | UI and strict type safety                          |
| Tailwind CSS 4             | Styling via CSS-first design tokens                |
| shadcn/ui + Radix + Base UI| Accessible component primitives                    |
| TanStack React Query 5     | Server state, caching, hydration                   |
| Zustand 5                  | Client state (persisted auth store)                |
| Axios                      | Client-side HTTP with auth interceptors            |
| CVA + `tailwind-merge`     | Component variants and the `cn()` helper           |
| ESLint + Prettier          | Linting and formatting (with Tailwind class sort)  |

Also preconfigured: `sitemap.ts`, `robots.ts`, `manifest.ts`, Open Graph and Twitter
metadata, and Inter via `next/font` (a Vazirmatn setup is included, commented out, for
Persian projects).

## Getting Started

```bash
npm install
npm run dev
```

Open [https://localhost:3000](https://localhost:3000).

The dev server runs over HTTPS (`next dev --experimental-https`) so browser APIs that
require a secure context work locally. Next.js generates a self-signed certificate into
`certificates/` on first run, which is gitignored — expect a one-time browser warning.

## Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Dev server (Turbopack, HTTPS)        |
| `npm run build`       | Production build                     |
| `npm run start`       | Serve the production build           |
| `npm run lint`        | ESLint                               |
| `npm run type-check`  | `tsc` with no emit                   |

## Environment Variables

Both are optional and read from the root `config.ts`. Import `BASE_URL` and
`BASE_API_URL` from there instead of touching `process.env` in feature code.

```bash
NEXT_PUBLIC_BASE_URL=https://localhost:3000   # site origin, used for metadata and canonicals
NEXT_PUBLIC_BASE_API_URL=https://api.example.com  # defaults to `${BASE_URL}/api`
```

## Project Structure

```
src/
├── app/                  # Routes, layouts, metadata, sitemap, robots, manifest
├── modules/              # One folder per page; owns its own components and API calls
│   └── home/
│       ├── components/
│       ├── constants.ts
│       ├── types.ts
│       └── utils.ts
└── shared/               # Everything used by more than one module
    ├── api/
    │   ├── api-error.ts      # ApiHttpError + isNotFoundError / isUnauthorizedError
    │   ├── client.ts         # Axios instance with auth + 401 interceptors
    │   ├── query-client.ts   # getQueryClient(): per-request on server, singleton in browser
    │   ├── urls.ts           # URLs map, the single source of endpoint paths
    │   ├── http/server.ts    # serverFetch with cache / revalidate / tags support
    │   └── properties/       # Example resource: types.ts, server.ts, hooks/
    ├── components/
    │   ├── provider.tsx      # React Query provider + sonner Toaster
    │   └── ui/               # shadcn/ui primitives
    ├── constants/routes.ts   # ROUTES map for internal links
    ├── hooks/
    ├── icons/
    ├── lib/utils.ts          # cn()
    ├── store/                # Zustand stores
    └── styles/globals.css    # Design tokens and Tailwind theme
config.ts                 # BASE_URL / BASE_API_URL
```

Import with the `@/` alias, e.g. `@/shared/components/ui/button`.

## Conventions

**A page is a module.** Anything only one page uses — components, types, helpers, and its
API calls — lives in `src/modules/<feature>/`. Code moves to `src/shared/` once a second
module needs it. For example, a search endpoint used by home, listing, and details belongs
in `src/shared/api/search/`.

**Two ways to fetch.** Server rendering uses `serverFetch` through a resource's
`server.ts`; client components use the Axios instance inside React Query hooks. A resource
folder looks the same in both places: `types.ts`, `server.ts`, and `hooks/use-*.ts` with
each request function next to its hook.

**Auth is client-side, so pages stay static.** The token lives in the Zustand auth store
and the Axios interceptor sends it as a `Bearer` header. Server-side fetching never reads
cookies, which keeps routes eligible for SSG and ISR; the backend owns its own session
cookie. Render per-user UI in client components.

**Styling uses tokens, not raw colors.** Reach for `bg-primary`, `text-muted-foreground`,
`border-border`, and friends from `globals.css` rather than `slate-700`, and prefer
component variants over one-off overrides.

Add UI primitives through the shadcn CLI rather than hand-rolling them:

```bash
npx shadcn@latest add card table badge
```

## AI Assistant Rules

The conventions above are encoded for coding agents in `.cursor/rules/` (scoped rules for
Cursor) and `CLAUDE.md` (a single always-loaded file for Claude Code). Keep both in sync
when a convention changes.

## Deploy

Deploy to Vercel with
[one click](https://vercel.com/new/clone?repository-url=https://github.com/hrg15/boilerplate),
or see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
Set `NEXT_PUBLIC_BASE_URL` to your production origin so metadata and canonical URLs are
correct.
