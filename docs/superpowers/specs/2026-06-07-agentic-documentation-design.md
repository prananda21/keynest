# Agentic Documentation Design

## Goal

Create repository guidance that lets coding agents work safely and consistently
across the Keynest Bun workspace. The guidance must distinguish the API and web
applications, reserve a future documentation application, and enforce strict
commit-message rules.

## Repository Guidance

Add a root `AGENTS.md` as the authoritative repository-wide instruction file.
It will document:

- Bun as the package manager and workspace runtime.
- The current application boundaries:
  - `apps/api`: Elysia API, Drizzle ORM, PostgreSQL, authentication, and logging.
  - `apps/web`: Next.js App Router frontend.
  - `apps/docs`: reserved for a future Fumadocs application and not created now.
- `packages/*` as the location for code intentionally shared by multiple apps.
- A rule that changes stay within one app unless a cross-app contract requires
  coordinated work.
- Commands agents should run from the repository root or the affected app.
- A requirement to preserve unrelated user changes and avoid speculative shared
  abstractions.

Add a root `CLAUDE.md` that imports `AGENTS.md`, matching the compatibility
pattern already used by `apps/web/CLAUDE.md`.

## App-Specific Guidance

Add `apps/api/AGENTS.md` for API-only conventions. It will describe the current
module layout, require schema changes to remain coordinated with Drizzle
configuration and exports, keep authentication and logging concerns in their
existing modules, and list the API lint, formatting, and type-check commands.
The existing placeholder test command will not be represented as a valid
verification step.

Expand `apps/web/AGENTS.md` while preserving its existing Next.js warning. It
will describe App Router ownership, server/client component expectations,
public asset placement, styling conventions, and the web lint/build commands.
Because this repository uses Next.js 16, agents must inspect the bundled
documentation under `node_modules/next/dist/docs/` before relying on remembered
framework behavior.

No `apps/docs` directory or Fumadocs project will be generated. The root
instructions will state that future work must initialize it at exactly
`apps/docs` and add scoped instructions when that project exists.

## Commit Policy

The root instructions will enforce strict Conventional Commits:

```text
<type>(<scope>): <description>
```

Allowed types:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `build`
- `ci`
- `chore`
- `perf`
- `revert`

Preferred scopes are `api`, `web`, `docs`, `workspace`, `deps`, or the name of
an affected shared package. A scope is required for normal commits. Repository-
wide changes use `workspace`; documentation about agent behavior uses `agent`.
Descriptions use imperative lowercase wording, omit a trailing period, and
remain concise. Breaking changes use `!` before the colon and include a
`BREAKING CHANGE:` footer.

Agents must not create vague messages such as `update files`, `fix stuff`, or
`changes`. Each commit should contain one coherent change and must pass the
validation relevant to its scope.

## Validation

Documentation validation will consist of:

- Reading the instruction hierarchy from the root into each app to ensure rules
  are consistent and scoped correctly.
- Searching for accidental creation of `apps/docs`.
- Confirming every documented command exists in the relevant `package.json`.
- Reviewing the final diff for placeholders, contradictions, and duplicated
  rules.

No application runtime behavior changes, migrations, or dependency updates are
part of this work.
