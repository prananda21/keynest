# Keynest

Keynest is an API key and secrets management platform for organizing, securing, and auditing sensitive application configuration across organizations, projects, and environments.

The project is being built as a vault-like system for application secrets. It is intended to help teams manage API keys, service credentials, environment variables, service tokens, and audit trails from one controlled place instead of scattering them across local `.env` files, deployment dashboards, CI/CD settings, and chat messages.

## Project Status

Keynest is under active development.

The current development focus is the API layer. Until the end of July 2026, the main work is on authentication, authorization, database schema, secret-management contracts, and infrastructure. Starting in August 2026, the focus shifts toward the website interface that will consume those API contracts.

## Workspace

This repository is a Bun workspace.

```text
apps/
  api       Elysia API with Drizzle ORM and PostgreSQL
  landing   Waku and Fumapress landing/documentation site
  web       Next.js web application

packages/
  shared workspace packages, added only when multiple apps need them
```

## Core Capabilities

- Email and password authentication
- JWT access token creation and bearer-token verification
- Session handling for login, logout, and refresh flows
- Organization and project role modeling
- Secret, environment, service token, and audit log data modeling
- PostgreSQL persistence with Redis prepared for session/cache workloads
- Landing and documentation pages for project overview and development notes

## Tech Stack

- Runtime: Bun
- API: Elysia
- Database: PostgreSQL
- ORM: Drizzle ORM
- Auth tokens: JWT with `jose`
- Password hashing: Bun `Argon2id`
- Landing/docs: Waku, Fumapress, Fumadocs MDX
- Web: Next.js App Router
- Styling: Tailwind CSS

## Getting Started

Install dependencies from the repository root:

```bash
bun install
```

Run the API:

```bash
bun run dev:api
```

Run the web app:

```bash
bun run dev:web
```

Run the landing and documentation app:

```bash
bun --cwd apps/landing dev
```

The landing app serves the project landing page at `/` and the documentation at `/docs`.

## API Development

Useful API checks:

```bash
bun --cwd apps/api lint
bun --cwd apps/api typecheck
bun --cwd apps/api format:check
```

The API uses environment variables for runtime configuration. Keep local credentials in local environment files only and do not commit secrets.

## Landing Documentation

Useful landing checks:

```bash
bun --cwd apps/landing types:check
bun --cwd apps/landing build
```

Documentation content lives in:

```text
apps/landing/content/docs
```

The docs navigation order is controlled by:

```text
apps/landing/content/docs/meta.json
```

## Repository

GitHub repository:

```text
https://github.com/prananda21/keynest
```

## Development Principle

Keynest should be built from the backend contract outward. The API owns data modeling, validation, access control, and security-sensitive behavior. The website should provide a clear interface over those backend capabilities without duplicating sensitive business rules in the frontend.
