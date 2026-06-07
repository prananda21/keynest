# Keynest Agent Instructions

## Scope And Precedence

This file defines repository-wide rules. Read the nearest `AGENTS.md` before
editing files inside an app; app-level instructions add to these rules and take
precedence when they are more specific.

## Workspace Map

Keynest is a Bun workspace:

- `apps/api`: Elysia API using Drizzle ORM and PostgreSQL.
- `apps/web`: Next.js App Router frontend.
- `apps/docs`: reserved for a future Fumadocs application. Do not create or
  initialize it unless the task explicitly requests the documentation app.
- `packages/*`: shared code that is intentionally consumed by multiple apps.

Keep changes within the owning app whenever possible. A change may cross app
boundaries only when a shared contract requires coordinated updates. Do not
move code into `packages/*` until at least two apps need the same stable
abstraction.

## Package Management

- Use Bun and preserve the root `bun.lock`.
- Run workspace scripts from the repository root:

```bash
bun run dev:api
bun run dev:web
```

- Run app scripts with `bun --cwd <app> <script>`.
- Do not introduce npm, pnpm, or Yarn lockfiles.
- Install dependencies in the narrowest owning workspace. Add a root
  dependency only when the root tooling actually uses it.

## Working Rules

- Inspect the affected app and its local instructions before editing.
- Follow existing module boundaries and naming conventions.
- Keep generated files, migrations, and lockfile changes intentional.
- Preserve unrelated user changes in a dirty worktree.
- Avoid speculative abstractions and unrelated refactors.
- Never commit secrets, local credentials, `.env` files, or production data.
- Update documentation when commands, architecture, configuration, or public
  contracts change.

## Validation

Run the narrowest checks that cover the change, then broaden validation when a
change affects shared behavior or multiple apps.

- API: `bun --cwd apps/api lint`, `bun --cwd apps/api typecheck`, and
  `bun --cwd apps/api format:check`.
- Web: `bun --cwd apps/web lint` and `bun --cwd apps/web build`.
- Shared or workspace changes: run the relevant checks for every consumer.

Do not claim a check passed unless it was run successfully. If a command is
missing, a test is a placeholder, or validation is blocked by the environment,
state that explicitly.

## Future Documentation App

The future Fumadocs project must be initialized at exactly `apps/docs`. Until
that work is explicitly requested:

- Do not create `apps/docs`.
- Do not add Fumadocs dependencies or configuration.
- Do not route documentation pages through `apps/web` as a substitute.

When `apps/docs` is created, add its own `AGENTS.md` with Fumadocs-specific
commands and conventions.

## Commit Message Rules

All commits must use strict Conventional Commits:

```text
<type>(<scope>): <description>
```

Allowed types:

- `feat`: new user-facing behavior
- `fix`: bug fix
- `docs`: documentation-only changes
- `refactor`: internal change without a behavior change
- `test`: test additions or corrections
- `build`: build system or dependency changes
- `ci`: continuous integration changes
- `chore`: maintenance not covered by another type
- `perf`: performance improvement
- `revert`: revert of an earlier commit

The scope is required. Use `api`, `web`, `docs`, `workspace`, `deps`, `agent`,
or the affected package name. Use `workspace` for repository-wide tooling and
`agent` for agent instruction changes.

Descriptions must:

- Use imperative, lowercase wording.
- Be concise and specific.
- Omit a trailing period.
- Describe one coherent change.

Examples:

```text
feat(api): add service token validation
fix(web): prevent duplicate form submission
docs(agent): document workspace boundaries
build(deps): update drizzle dependencies
```

Do not use vague messages such as `update files`, `fix stuff`, or `changes`.
For breaking changes, add `!` before the colon and include a
`BREAKING CHANGE:` footer:

```text
feat(api)!: replace secret response format
```
