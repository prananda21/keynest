<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Web Agent Instructions

These rules apply to `apps/web` and extend the repository-wide `AGENTS.md`.

## Stack And Framework Guidance

- Framework: Next.js 16 using the App Router.
- UI runtime: React 19.
- Styling: Tailwind CSS 4 and `app/globals.css`.
- Package manager: Bun.

Do not rely on remembered Next.js behavior. Before changing framework APIs,
routing, caching, metadata, middleware, configuration, or file conventions,
read the relevant bundled guide under `node_modules/next/dist/docs/`.

## App Router Ownership

- Keep routes, layouts, loading states, error boundaries, and route-specific
  metadata under `app/`.
- Treat `app/layout.tsx` as the owner of root document structure, global
  metadata, fonts, and global styles.
- Keep route-specific behavior near the route that owns it.
- Put static files that must be served directly under `public/`.
- Keep global CSS in `app/globals.css`; keep component-specific styling close
  to the component when new component modules are introduced.

## Server And Client Components

- Use Server Components by default.
- Add `"use client"` only when a component needs browser APIs, event handlers,
  client state, effects, or a client-only library.
- Keep client boundaries small. Do not turn layouts or whole pages into Client
  Components solely to support one interactive child.
- Fetch server-owned data in Server Components or server-side modules.
- Do not expose secrets or server-only environment variables to client code.
- Keep props crossing the server/client boundary serializable.

## Components And Accessibility

- Prefer semantic HTML and native controls before custom interaction patterns.
- Preserve keyboard navigation, visible focus, labels, and meaningful alt text.
- Reuse an existing component before adding a near-duplicate.
- Keep page modules focused on composition; extract a component when it has a
  distinct responsibility or meaningful reuse.
- Avoid adding dependencies for behavior that React, Next.js, or the existing
  CSS setup already supports clearly.

## Commands And Validation

Run from the repository root:

```bash
bun --cwd apps/web dev
bun --cwd apps/web lint
bun --cwd apps/web build
bun --cwd apps/web start
```

Run lint for all web changes. Run a production build for routing, rendering,
configuration, dependency, metadata, or deployment-sensitive changes. After
significant UI changes, inspect the affected page in a browser in addition to
running static checks.
