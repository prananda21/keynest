# API Agent Instructions

These rules apply to `apps/api` and extend the repository-wide `AGENTS.md`.

## Stack And Entry Points

- Runtime and package manager: Bun.
- HTTP framework: Elysia.
- Database: PostgreSQL through Drizzle ORM.
- Entry point: `src/index.ts`.
- Runtime configuration: `src/config.ts`.
- Drizzle tooling configuration: `drizzle.config.ts`.

Compose application behavior through focused modules rather than growing
`src/index.ts` into a catch-all. Keep side effects, such as starting the server
or opening connections, at explicit application boundaries.

## Module Ownership

- `src/db/`: database connection, schema registry, and database services.
- `src/db/schema/`: one schema module per domain table or closely related set.
- `src/db/utils/`: reusable Drizzle schema helpers.
- `src/lib/auth/`: authentication and token behavior.
- `src/lib/log/`: logging setup and shared logger behavior.
- `src/constants/`: stable shared constants such as roles and HTTP codes.
- `src/types/`: shared TypeScript types.
- `src/utils/errors/`: application error classes and error behavior.
- `scripts/`: operational scripts that are not part of the HTTP runtime.

Place new code in the narrowest existing owner. Create a new module only when
it has a distinct responsibility; do not add general-purpose dumping grounds.

## Database Changes

- Keep table definitions and relations in `src/db/schema/`.
- Export new schemas through the existing schema and database registries.
- Keep enum and common column helpers in `src/db/utils/`.
- Review indexes, uniqueness, nullability, defaults, and delete behavior for
  every schema change.
- Keep `drizzle.config.ts` aligned with schema paths and database configuration.
- Do not generate or apply migrations unless the task explicitly requests it.
- Never use production credentials or production data for local validation.

## Authentication, Logging, And Errors

- Keep JWT implementation details under `src/lib/auth/jwt/`.
- Do not log tokens, secrets, passwords, authorization headers, or raw
  credentials.
- Use the shared logger under `src/lib/log/`; avoid ad hoc `console` logging in
  application code.
- Use the existing custom error hierarchy and HTTP status constants instead of
  throwing unstructured response objects.
- Validate untrusted inputs at the HTTP or service boundary and keep internal
  types precise.

## Imports And Exports

- Follow the existing registry and `index.ts` export pattern.
- Avoid circular imports between registries and implementations.
- Prefer explicit domain types over broad casts or `any`.
- Keep configuration access centralized through `src/config.ts`.

## Commands And Validation

Run from the repository root:

```bash
bun --cwd apps/api dev
bun --cwd apps/api lint
bun --cwd apps/api typecheck
bun --cwd apps/api format
bun --cwd apps/api format:check
```

The current `test` script is a placeholder that exits with an error. Do not run
it as proof of correctness and do not report API tests as passing until a real
test suite is added. For API changes, run lint, type-checking, and the Prettier
check at minimum.
