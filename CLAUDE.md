# CLAUDE.md

Guidance for Claude Code when working in this repository. It mirrors the rules in
`.cursor/rules/`, so keep both in sync when a convention changes.

## Project Context

Next.js 16 App Router project (React 19, Turbopack) using TypeScript, Tailwind CSS v4,
shadcn-style primitives built on Radix UI and Base UI, TanStack React Query, Zustand,
Axios, CVA, and `cn()` from `src/shared/lib/utils.ts`.

### Commands

- `npm run dev` — dev server (Turbopack, experimental HTTPS via `certificates/`)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run type-check` — `tsc`

Prefer `npm run lint` and `npm run type-check` when a change is broad or touches shared
behavior. If a command cannot be run, say so and explain the remaining risk.

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
- Ask before installing packages, adding Framer Motion, changing API strategy, or
  introducing a new global state/store pattern.
- Do not add comments or documentation unless requested or the code would otherwise be
  hard to understand.

## Workflow

- Read the relevant existing files first and follow the local pattern.
- If requirements are unclear, ask a focused question before writing code.
- If there may not be one correct answer, say so and explain the tradeoff.
- Prefer simple, readable code over clever abstractions.
- Use early returns and guard clauses for invalid states.
- Avoid large files and deeply nested logic. Extract reusable UI, hooks, helpers,
  constants, or types when a component becomes hard to scan.
- For repetitive UI/data, define an array or constant and map over it instead of
  duplicating markup.
- Prefer typed `const` arrow functions for local callbacks and helpers. Use function
  declarations only for pages and where they fit the existing file style.
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
  read as: data in, sections out.

### Naming

- Files and folders: lowercase kebab-case (`question-card.tsx`, `components/auth-wizard`).
- Components: PascalCase, and a single-component file's name matches its component
  (`question-card.tsx` exports `QuestionCard`).
- Hooks start with `use`, in `use-`-prefixed files (`use-questions.ts` → `useQuestions`).
- Event handlers use the `handle` prefix (`handleClick`); props that pass them through use
  the `on` prefix (`onClick`).
- Types and interfaces: PascalCase, explicit (`QuestionCardProps`, not `Props`).
- Exported constant maps are UPPER_SNAKE or descriptive PascalCase (`ROUTES`, `URLs`);
  local constants stay camelCase.
- Booleans read as predicates (`isLoading`, `hasError`, `canSubmit`).

## Next.js App Router

- Keep route files thin. `page.tsx` and `layout.tsx` compose sections from `src/modules`
  or `src/shared`; they do not hold large UI or business logic.
- Name route components `Page`, `Layout`, `Loading`, or `NotFound`.
- Server Components by default. Add `"use client"` only for state, effects, event
  handlers, browser APIs, or client-only hooks.
- Fetch server-side data through the owning resource's `server.ts` (in
  `src/modules/<feature>/api/`, or `src/shared/api/<resource>/` when shared), not with raw
  `fetch` in route files.
- Keep route-level fetching unauthenticated and cookie-free so pages stay SSG/ISR-capable.
  Authenticated data belongs in client components via React Query.
- Avoid client fetching in route components unless the UX needs client state or live
  interactions. When a client component needs server-warmed data, prefetch with
  `getQueryClient()` and hydrate.
- Use `ROUTES` for links to main app pages; add an entry when a new top-level route
  appears.
- The Next.js DevTools MCP is available for framework docs and runtime info.

## API, State, And Data

### Strategy

- A module's API calls live with the module in `src/modules/<feature>/api/`. Only
  genuinely shared resources move to `src/shared/api/<resource>/`.
- Resource layout is the same in both places: `types.ts`, `server.ts`, and
  `hooks/use-*.ts` (request function + hook in the same file). `src/shared/api/properties`
  is the reference shape.
- The transport layer always stays shared and modules never create their own client:
  `serverFetch` (`src/shared/api/http/server.ts`), the Axios instance
  (`src/shared/api/client.ts`), `getQueryClient()` (`src/shared/api/query-client.ts`),
  `ApiHttpError`, and `URLs`.
- Server / SEO / ISR: call `serverFetch` from the resource's `server.ts`. Pass `cache`,
  `revalidate`, or `tags` explicitly when freshness matters.
- Client: use the Axios instance inside React Query hooks marked `"use client"`.
- Use `URLs` from `src/shared/api/urls.ts` for every endpoint path, including
  module-owned resources, so paths stay in one place.
- Query keys are tuples starting with the resource name, e.g. `["properties", params]`.
- Handle `ApiHttpError` and the `isNotFoundError` / `isUnauthorizedError` guards from
  `src/shared/api/api-error.ts` near pages, e.g. to call `notFound()`.

### Auth And Cacheability

- Server requests must stay cookie-free by default. Do not call `cookies()` or forward
  credentials from `server.ts` functions — that opts the route out of SSG/ISR.
- Public and cacheable data (listings, details, search, marketing content) is fetched on
  the server without auth, so pages remain statically renderable.
- Authenticated data is a client-side concern: fetch it through the Axios client, which
  attaches the `Bearer` token from the auth store. The backend may also set its own
  httpOnly cookie and handle that session itself; the frontend does not read or manage it.
- If a route genuinely needs per-user data during server rendering, treat losing static
  rendering as a deliberate decision and confirm it before implementing.

### Types And Validation

- Create explicit request, response, and query param types in the resource's `types.ts`.
- Do not use `any` for API payloads unless there is no practical alternative and the
  reason is documented in code.
- No schema validation library is installed. Validate untrusted input with typed narrowing
  helpers, and ask before adding Zod or similar.

### UI States And Errors

- Every user-facing request needs loading, error, empty, and success handling as
  appropriate.
- Mutations must prevent duplicate submissions and show clear feedback.
- Use project components for feedback: `Spinner`, `Progress`, `Empty`, `Dialog`, or a
  toast via `sonner`.
- Handle expected errors near the user flow; let shared clients own cross-cutting concerns
  such as auth headers and 401 behavior. Never swallow errors silently.

## UI Design System

### Components

- Use existing primitives from `src/shared/components/ui` before creating new styled
  elements. Available: `accordion`, `button`, `checkbox`, `combobox`, `dialog`, `drawer`,
  `dropdown-menu`, `empty`, `input`, `input-group`, `popover`, `progress`, `resizable`,
  `select`, `slider`, `spinner`, `textarea`.
- If a primitive is missing (Card, Table, Badge, Tabs, Tooltip, Pagination, etc.), add it
  via the shadcn CLI/registry in the project's `new-york` style rather than hand-rolling a
  one-off component.
- Use variants (`variant`, `size`) before adding one-off Tailwind overrides.
- If a reusable UI pattern appears more than once, move it to `src/shared/components` or
  the owning module's `components` folder.

### Styling

- Use semantic tokens from `src/shared/styles/globals.css`: `bg-primary`,
  `bg-primary-deep`, `text-title`, `text-muted-foreground`, `bg-background`,
  `text-primary-foreground`, `text-secondary`, `border-border`, `bg-success`,
  `bg-success-muted`, `text-destructive`.
- Palette scales: `stone-*`, `neutral-*`, `green-*`, `red-*`, and `gray-*` (aliased to
  `neutral-*`).
- Prefer built-in utilities over arbitrary values (`container` over `max-w-[1280px]`,
  `inset-0` over `top-[0px] left-[0px]`, `mt-4` over `mt-[16px]`). Reach for `w-[]` /
  `max-w-[]` only when no default utility or token fits.
- Use `cn()` for conditional classes instead of ternaries or string concatenation inside
  `className`.
- Prefer `gap-*` over `space-x-*` / `space-y-*`, and `size-*` when width equals height.
- Avoid long one-off `className` strings; extract repeated combinations into a shared
  class, variant, or component. For lists, prefer one parent class with child selectors
  (`[&>*]:...`) over repeating classes on every child.
- Avoid inline styles and raw color utilities unless no token or variant fits.

### Accessibility

- Semantic HTML first.
- Interactive non-button elements need keyboard support, focus styles, and ARIA labels
  when the visible label is not enough.
- Dialog, Drawer, and Popover-like components need accessible titles/labels.
- Loading buttons should be disabled or otherwise prevent duplicate submissions.

## Security And Auth

- Auth is client-side. `useAuthStore` (`src/shared/store/auth-store.ts`) holds the token,
  and the Axios client attaches it as a `Bearer` header in a request interceptor and
  clears it on 401.
- Keep token and auth state behavior in those two files. Do not duplicate auth header
  logic in feature code, hooks, or module API files.
- The server side is the backend's responsibility. The backend may set and validate its
  own httpOnly cookie; the frontend does not read, write, or forward it.
- Do not call `cookies()` or send credentials from `server.ts` request functions. Server
  fetching stays unauthenticated so routes remain SSG/ISR-capable.
- Render authenticated UI on the client. If server-rendered per-user data is unavoidable,
  flag the loss of static rendering and confirm before implementing.
- Keep 401/403 handling and its user-facing redirects or messages consistent.
- Never hardcode secrets, tokens, private keys, or production credentials, and never log
  sensitive values.
- Prefer secure cookies and least-privilege data access.
- Ask before changing auth architecture, persistence strategy, cookie names, or token
  refresh behavior.

## Performance And SEO

- Prefer Server Components and server data fetching when interactivity is not needed.
- Use dynamic imports only for heavy or rarely used client components, not by default.
- Avoid unnecessary client boundaries, effects, and global state.
- Keep repeated expensive computations in helpers, constants, memoized values, or server
  code depending on where they run. Extract stable item components for expensive lists.
- Choose SSG, SSR, ISR, or client rendering intentionally, defaulting to static or ISR for
  public pages, and set `cache`, `next.revalidate`, or `dynamic` explicitly when data
  freshness matters.
- Avoid `cookies()`, `headers()`, and other dynamic APIs in pages that should stay static.
  Move per-user data into client components instead of making a whole route dynamic.
- Do not fetch the same data in multiple layers of the same route unless required.
- Use the Metadata API for indexable pages, and keep titles, descriptions, headings, and
  Open Graph fields aligned with actual page content.
- Register new indexable routes in `src/app/sitemap.ts`, and keep `src/app/robots.ts` and
  `src/app/manifest.ts` in sync when route structure or branding changes.
- Use semantic headings without skipping levels in public content pages.
