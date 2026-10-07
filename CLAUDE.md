# CLAUDE.md

Guidance for Claude Code when working in this repository. It mirrors the rules in
`.cursor/rules/`, so keep both in sync when a convention changes.

## Project Context

Next.js 16 App Router project (React 19, Turbopack, Node >= 20.9) using TypeScript,
Tailwind CSS v4, shadcn-style primitives built on Radix UI and Base UI, TanStack React
Query, Zustand (with immer), Axios, CVA, and `cn()` from `src/shared/lib/utils.ts`.

Cache Components (`cacheComponents`) is **not** enabled. Do not add `"use cache"`,
`cacheLife`, `cacheTag`, or the `instant` segment export — they fail the build. Control
freshness with `fetch` options (`cache`, `revalidate`, `tags`) through `serverFetch`, and
with `revalidateTag` / `revalidatePath`. Ask before enabling Cache Components.

### Commands

- `npm run dev` — dev server (Turbopack, experimental HTTPS via `certificates/`)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run type-check` — `tsc`
- `npm run format` / `npm run format:check` — Prettier with Tailwind class sorting
  (`src/shared/components/ui` is excluded on purpose)

Run `npm run lint` and `npm run type-check` for any non-trivial change, and
`npm run build` when touching routes, `next.config.ts`, metadata, or segment config —
some Next.js errors only appear at build time. No test runner is installed; ask before
adding one. If a command cannot be run, say so and explain the remaining risk.

### Non-Negotiables

- Keep the existing architecture: `src/app` for routes/pages/layouts, `src/modules` for
  feature/page-specific code (each page is a module and owns its own API calls), and
  `src/shared` for genuinely reusable components, API resources, hooks, constants, icons,
  stores, styles, and utilities.
- Keep server-side data fetching unauthenticated and cookie-free so pages stay
  SSG/ISR-capable. Auth is client-side via the token in the auth store.
- Reuse project primitives before creating new ones (see UI Design System below).
- Reference main app pages via `ROUTES` in `src/shared/constants/routes.ts` and API
  endpoints via `URLs` in `src/shared/api/urls.ts` instead of hardcoding paths.
- Read `BASE_URL` / `BASE_API_URL` from the root `config.ts` instead of reading
  `process.env` directly in feature code.
- Use lowercase kebab-case for folders and files unless the framework requires otherwise.
- Ask before installing packages, adding Framer Motion, changing API strategy, enabling
  Cache Components, or introducing a new global state/store pattern.
- Do not add comments or documentation unless requested or the code would otherwise be
  hard to understand.

## Workflow

- Read the relevant existing files first and follow the local pattern.
- If requirements are unclear, ask a focused question before writing code.
- If there may not be one correct answer, say so and explain the tradeoff.
- Check the installed Next.js docs in `node_modules/next/dist/docs` (or the Next.js
  DevTools MCP in `.mcp.json`) before using a framework API you are unsure about; APIs
  change between minor versions (e.g. `error.tsx` receives `retry`, not `reset`, in 16.4).
- Prefer simple, readable code over clever abstractions.
- Use early returns and guard clauses for invalid states.
- Avoid large files and deeply nested logic. Extract reusable UI, hooks, helpers,
  constants, or types when a component becomes hard to scan.
- For repetitive UI/data, define an array or constant and map over it instead of
  duplicating markup.
- Prefer typed `const` arrow functions for components, local callbacks, and helpers. Use
  function declarations for route files and where they fit the existing file style.
- Treat `src/shared/components/ui` as vendored shadcn code (function declarations, no
  semicolons). Do not restyle or reformat it; change it only for a real behavior or
  token fix.
- Cover loading, empty, and error states for user-facing flows.
- Keep security, validation, and accessibility in the implementation, not as afterthoughts.

## Feature Structure

- Treat each page as a module. A module owns everything only it uses — components, types,
  hooks, and its API calls — and lives in `src/modules/<feature>`.
- Cross-feature code goes in `src/shared`. Promote an API resource to
  `src/shared/api/<resource>` only once a second module needs it (e.g. a search endpoint
  used by home, listing, and details). Do not import from one module into another — move
  shared code to `src/shared` first.
- Module shape: `components/`, `api/`, `types.ts`, `utils.ts`, `constants.ts`, `hooks/`,
  and `store/` only when state must be shared across multiple components.
- Group components by the route they belong to inside `components/`. With nested routes
  (e.g. `/properties` and `/properties/[slug]`), give each route its own subfolder
  (`components/properties/`, `components/property-details/`) and put cross-route
  components in `components/shared/`.
- Keep components focused on one responsibility. Extract large sections, repeated cards,
  filters, sidebars, and dialogs into named components. Page-level composition should
  read as: data in, sections out (see `src/app/page.tsx`).

### Naming

- Files and folders: lowercase kebab-case (`question-card.tsx`, `components/auth-wizard`).
- Components: PascalCase, and a single-component file's name matches its component
  (`question-card.tsx` exports `QuestionCard`).
- Hooks start with `use`, in kebab-case `use-`-prefixed files (`use-questions.ts` →
  `useQuestions`).
- Event handlers use the `handle` prefix (`handleClick`); props that pass them through use
  the `on` prefix (`onClick`).
- Types and interfaces: PascalCase, explicit (`QuestionCardProps`, not `Props` or
  `IState`).
- Exported constant maps are UPPER_SNAKE or descriptive PascalCase (`ROUTES`, `URLs`);
  local constants stay camelCase.
- Booleans read as predicates (`isLoading`, `hasError`, `canSubmit`, `isEnabled`).

## Next.js App Router

- Keep route files thin. `page.tsx` and `layout.tsx` compose sections from `src/modules`
  or `src/shared`; they do not hold large UI or business logic.
- Name route components `Page`, `Layout`, `Loading`, `Error`, `GlobalError`, or
  `NotFound`.
- Server Components by default. Add `"use client"` only for state, effects, event
  handlers, browser APIs, or client-only hooks.
- `error.tsx` and `global-error.tsx` receive `{ error, retry }` and reuse `ErrorFallback`
  from `src/shared/components/error-fallback.tsx`. `global-error.tsx` renders its own
  `<html>`/`<body>` and imports `globals.css` itself. `not-found.tsx` is
  `robots: { index: false }`.
- `src/proxy.ts` (formerly middleware) runs only on paths in its `matcher`. Keep static
  assets, `_next`, and metadata files excluded, and keep it free of auth cookie reads.
- Fetch server-side data through the owning resource's `server.ts` (in
  `src/modules/<feature>/api/`, or `src/shared/api/<resource>/` when shared), not with raw
  `fetch` in route files.
- Keep route-level fetching unauthenticated and cookie-free so pages stay SSG/ISR-capable.
  Authenticated data belongs in client components via React Query.
- Avoid client fetching in route components unless the UX needs client state or live
  interactions. When a client component needs server-warmed data, prefetch with
  `getQueryClient()` and hydrate with `HydrationBoundary`.
- For dynamic segments, use `generateStaticParams` + `revalidate` (ISR) for public pages
  and call `notFound()` when `isNotFoundError(error)`.
- Use `next/link` for internal navigation and `ROUTES` for paths; add an entry when a new
  top-level route appears, using a function for dynamic routes.

## API, State, And Data

### Strategy

- A module's API calls live with the module in `src/modules/<feature>/api/`. Only
  genuinely shared resources move to `src/shared/api/<resource>/`.
- `src/shared/api/properties` is a **reference example** of the resource shape. It lives
  in `shared` only so the template ships one; delete or replace it in real projects and do
  not treat its location as the default for new resources.
- Resource layout is the same in both places: `types.ts`, `keys.ts` (query key factory),
  `server.ts`, and `hooks/use-*.ts` (request function + hook in the same file).
- The transport layer always stays shared and modules never create their own client:
  `serverFetch` (`src/shared/api/http/server.ts`), the Axios instance
  (`src/shared/api/client.ts`), `getQueryClient()` (`src/shared/api/query-client.ts`),
  `ApiHttpError`, `buildUrl`, and `URLs`.
- Use `URLs` from `src/shared/api/urls.ts` for every endpoint path, including
  module-owned resources. Encode dynamic segments with `encodeURIComponent`.
- Do not use Server Actions or Route Handlers to proxy the backend. The backend is a
  separate service: the server reads public data with `serverFetch`, the client calls it
  with Axios.

### Server Fetching And Caching

- Call `serverFetch` from the resource's `server.ts`. Pass `cache`, `revalidate`, or
  `tags` explicitly when freshness matters, and never both `cache: "no-store"` and
  `revalidate`.
- Tag cacheable requests (e.g. ``["properties", `property-${id}`]``) so they can be
  invalidated with `revalidateTag`.
- Do not pass an `AbortSignal` to `serverFetch` unless needed: a `signal` opts the request
  out of Next.js request memoization.

### Client Fetching

- Use the Axios instance inside React Query hooks in `"use client"` files.
- Build query keys with the resource's key factory (`propertyKeys.list(params)`); every key
  starts with the resource name so `invalidateQueries({ queryKey: propertyKeys.all })`
  hits all of them.
- Forward React Query's `signal` to Axios so cancelled queries abort.
- Default retry skips 4xx responses (except 408/429) and retries network/5xx errors up to
  3 times. Override per query only with a reason.

### Errors

- Both clients throw `ApiHttpError` (`status`, `statusText`, `path`, `body`, `message`).
  Status `0` means a network failure, `408` a timeout. Axios cancellations are re-thrown
  unchanged.
- Use the guards from `src/shared/api/api-error.ts` (`isNotFoundError`,
  `isUnauthorizedError`, `isForbiddenError`, `isClientError`) near pages, e.g. to call
  `notFound()`.
- Handle expected errors near the user flow; let shared clients own cross-cutting concerns
  such as auth headers and 401 behavior. Never swallow errors silently.

### Choosing Where State Lives

- Server data: React Query. Do not copy query results into Zustand or `useState`.
- Shareable UI state (filters, pagination, tabs that survive reload): URL search params.
- Local UI state: `useState` / `useReducer`.
- Zustand: only cross-cutting client state used by distant components (auth today).
  Feature stores go in `src/modules/<feature>/store/`. Ask before adding a global store.
- Persisted Zustand stores read `localStorage` after hydration. Do not render
  store-dependent markup during SSR without guarding against hydration mismatches.

### Types And Validation

- Create explicit request, response, and query param types in the resource's `types.ts`.
- Do not use `any` for API payloads unless there is no practical alternative and the
  reason is documented in code.
- No schema validation library is installed. Validate untrusted input with typed narrowing
  helpers, and ask before adding Zod or similar.

### UI States

- Every user-facing request needs loading, error, empty, and success handling as
  appropriate.
- Mutations must prevent duplicate submissions (disable while `isPending`) and show clear
  feedback.
- Use project components for feedback: `Spinner`, `Progress`, `Empty`, `Dialog`, or a
  toast via `sonner`.
- No form library is installed. Build forms with project inputs and a React Query
  mutation; ask before adding react-hook-form or similar.

## UI Design System

### Components

- Use existing primitives from `src/shared/components/ui` before creating new styled
  elements. Available: `accordion`, `button`, `checkbox`, `combobox`, `dialog`, `drawer`,
  `dropdown-menu`, `empty`, `input`, `input-group`, `popover`, `progress`, `resizable`,
  `select`, `slider`, `spinner`, `textarea`.
- If a primitive is missing (Card, Table, Badge, Tabs, Tooltip, Pagination, etc.), add it
  with `npx shadcn@latest add <name>` (project style `new-york`) rather than
  hand-rolling a one-off component.
- Use variants (`variant`, `size`) before adding one-off Tailwind overrides.
- If a reusable UI pattern appears more than once, move it to `src/shared/components` or
  the owning module's `components` folder.

### Styling

- Use semantic tokens from `src/shared/styles/globals.css`: `bg-background`,
  `text-foreground`, `text-title`, `text-muted-foreground`, `bg-muted`, `bg-primary` /
  `text-primary-foreground`, `bg-primary-deep`, `bg-secondary` /
  `text-secondary-foreground` (neutral surface), `bg-accent`, `text-destructive` /
  `bg-destructive`, `bg-success`, `bg-success-muted` / `text-success-muted-foreground`,
  `border-border`, `border-input`, `ring-ring`.
- Palette scales `stone-*`, `neutral-*`, `green-*`, `red-*` (50–950) are project-defined;
  `gray-*` aliases `neutral-*`. Prefer tokens; use palette steps only when no token fits.
- Text tokens meet WCAG AA contrast. Do not put body text in lighter colors than
  `text-muted-foreground`, and check contrast when adding or changing tokens.
- Dark mode is the `.dark` class (`dark:` variant). No theme switcher is installed; ask
  before adding one.
- Animations use `tw-animate-css` (`animate-in`, `fade-in-0`, ...).
- Prefer built-in utilities over arbitrary values (`container` over `max-w-[1280px]`,
  `inset-0` over `top-[0px] left-[0px]`, `mt-4` over `mt-[16px]`). Reach for `w-[]` /
  `max-w-[]` only when no default utility or token fits.
- Use `cn()` for conditional or combined classes instead of ternaries or template strings
  inside `className`.
- Prefer `gap-*` over `space-x-*` / `space-y-*`, and `size-*` when width equals height.
- Avoid long one-off `className` strings; extract repeated combinations into a shared
  class, variant, or component. For lists, prefer one parent class with child selectors
  (`[&>svg]:size-4`) over repeating classes on every child.
- Avoid inline styles and raw color utilities unless no token or variant fits.

### RTL Readiness

- Use logical utilities so layouts flip for `dir="rtl"`: `ms-*`/`me-*`, `ps-*`/`pe-*`,
  `start-*`/`end-*`, `text-start`/`text-end`, `border-s`/`border-e`. Avoid `ml-*`,
  `pr-*`, `left-*`, `text-left` for directional spacing.
- Mirror directional icons with `rtl:rotate-180` where needed.

### Accessibility

- Semantic HTML first: one `h1` per page, no skipped heading levels, landmarks.
- Interactive non-button elements need keyboard support, focus styles, and ARIA labels
  when the visible label is not enough.
- Dialog, Drawer, and Popover-like components need accessible titles/labels.
- Loading indicators need `role="status"` and an accessible label; decorative icons are
  `aria-hidden`.
- Loading buttons should be disabled or otherwise prevent duplicate submissions.

## Security And Auth

- Auth is client-side. `useAuthStore` (`src/shared/store/auth-store.ts`) holds `token` and
  `refreshToken`; the Axios client attaches the token as a `Bearer` header and calls
  `clearTokens()` on 401.
- Keep token and auth state behavior in those two files. Do not duplicate auth header
  logic in feature code, hooks, or module API files.
- Tokens are persisted in `localStorage`, readable by any script on the page. This is a
  deliberate tradeoff for static rendering; keep XSS surface small (no
  `dangerouslySetInnerHTML` with untrusted data, no untrusted third-party scripts).
- There is no token refresh flow. Ask before adding one or changing auth architecture,
  persistence strategy, cookie names, or storage.
- The server side is the backend's responsibility. The backend may set and validate its
  own httpOnly cookie; the frontend does not read, write, or forward it.
- Do not call `cookies()` or send credentials from `server.ts` request functions. Server
  fetching stays unauthenticated so routes remain SSG/ISR-capable.
- Render authenticated UI on the client. If server-rendered per-user data is unavoidable,
  flag the loss of static rendering and confirm before implementing.
- Keep 401/403 handling (`isUnauthorizedError`, `isForbiddenError`) and its user-facing
  redirects or messages consistent.
- `NEXT_PUBLIC_*` variables are inlined into the client bundle. Never put secrets in them;
  document new variables in `.env.example`.
- Never hardcode secrets, tokens, private keys, or production credentials, and never log
  sensitive values.
- Security headers live in `next.config.ts`. Keep them, and ask before adding a
  Content-Security-Policy (it needs nonces or hashes for Next.js scripts).
- Validate user-controlled input at every boundary (forms, route params, search params,
  API responses). Never trust client-only validation for security decisions.

## Performance And SEO

- Prefer Server Components and server data fetching when interactivity is not needed.
- Use dynamic imports only for heavy or rarely used client components, not by default.
- Avoid unnecessary client boundaries, effects, and global state.
- Keep repeated expensive computations in helpers, constants, memoized values, or server
  code depending on where they run. Extract stable item components for expensive lists.
- Use `next/image` with explicit dimensions (or `fill` + `sizes`); `priority` only for the
  LCP image. Use `next/font`, and do not list weights for variable fonts.
- Choose SSG, SSR, ISR, or client rendering intentionally, defaulting to static or ISR for
  public pages, and check the `npm run build` route table after changes.
- Avoid `cookies()`, `headers()`, and other dynamic APIs in pages that should stay static.
  Move per-user data into client components instead of making a whole route dynamic.
- Do not fetch the same data in multiple layers of the same route unless required.
- Use the Metadata API for indexable pages. `metadataBase` comes from `BASE_URL`, so use
  relative URLs. Set `alternates.canonical` per page, never in a layout (it would be
  inherited by every child page).
- Keep titles, descriptions, headings, and Open Graph fields aligned with actual page
  content. Mark non-indexable pages with `robots: { index: false }`.
- Register new indexable routes in `src/app/sitemap.ts` (via `ROUTES`), never list routes
  that do not exist, and keep `src/app/robots.ts` and `src/app/manifest.ts` in sync when
  route structure or branding changes.
