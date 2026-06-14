# Agentic Documentation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add layered agent instructions for the Keynest workspace, including strict Conventional Commit rules and a reserved future `apps/docs` Fumadocs app.

**Architecture:** A root `AGENTS.md` owns workspace-wide policy while app-level `AGENTS.md` files add only framework and module-specific rules. Thin `CLAUDE.md` files import the applicable agent instructions without duplicating policy.

**Tech Stack:** Markdown, Bun workspaces, Elysia, Drizzle ORM, Next.js 16, Fumadocs (future only)

---

## Chunk 1: Repository And App Instructions

### Task 1: Add Root Workspace Governance

**Files:**

- Create: `AGENTS.md`
- Create: `CLAUDE.md`

- [x] **Step 1: Write root instructions**

Document the workspace map, ownership boundaries, Bun commands, validation
expectations, future `apps/docs` reservation, and strict Conventional Commit
format from the approved design.

- [x] **Step 2: Add Claude compatibility**

Create `CLAUDE.md` containing only:

```markdown
@AGENTS.md
```

- [x] **Step 3: Verify root guidance**

Run:

```bash
rg -n "apps/api|apps/web|apps/docs|Conventional Commits|<type>\\(<scope>\\)" AGENTS.md
test ! -d apps/docs
```

Expected: all required concepts are found and `apps/docs` remains absent.

### Task 2: Add API-Specific Guidance

**Files:**

- Create: `apps/api/AGENTS.md`
- Create: `apps/api/CLAUDE.md`

- [x] **Step 1: Write API instructions**

Document Elysia composition, configuration, database/schema ownership,
authentication, logging, error handling, module exports, and available
validation commands. Explicitly state that `bun test` is currently a
placeholder and must not be reported as passing.

- [x] **Step 2: Add Claude compatibility**

Create `apps/api/CLAUDE.md` containing only:

```markdown
@AGENTS.md
```

- [x] **Step 3: Verify documented commands**

Run:

```bash
bun --cwd apps/api lint
bun --cwd apps/api typecheck
bun --cwd apps/api format:check
```

Expected: each real API validation command executes; pre-existing failures, if
any, are reported accurately.

### Task 3: Expand Web-Specific Guidance

**Files:**

- Modify: `apps/web/AGENTS.md`

- [x] **Step 1: Preserve the Next.js warning**

Keep the generated `BEGIN:nextjs-agent-rules` block intact.

- [x] **Step 2: Add web instructions**

Document App Router ownership, Server Component defaults, client boundary
rules, metadata/layout responsibilities, public assets, global styling,
framework documentation lookup, and available validation commands.

- [x] **Step 3: Verify web guidance and app**

Run:

```bash
bun --cwd apps/web lint
bun --cwd apps/web build
```

Expected: lint and production build pass, or any pre-existing failure is
reported accurately.

### Task 4: Validate The Instruction Hierarchy

**Files:**

- Verify: `AGENTS.md`
- Verify: `CLAUDE.md`
- Verify: `apps/api/AGENTS.md`
- Verify: `apps/api/CLAUDE.md`
- Verify: `apps/web/AGENTS.md`
- Verify: `apps/web/CLAUDE.md`

- [x] **Step 1: Check compatibility imports**

Run:

```bash
rg -n "^@AGENTS\\.md$" CLAUDE.md apps/api/CLAUDE.md apps/web/CLAUDE.md
```

Expected: all three compatibility files import their local `AGENTS.md`.

- [x] **Step 2: Check reserved docs path**

Run:

```bash
test ! -d apps/docs
rg -n "apps/docs|Fumadocs" AGENTS.md
```

Expected: no directory exists and the reservation is documented.

- [x] **Step 3: Review the final diff**

Run:

```bash
git diff --check
git diff -- AGENTS.md CLAUDE.md apps/api/AGENTS.md apps/api/CLAUDE.md apps/web/AGENTS.md
```

Expected: no whitespace errors, placeholders, contradictions, or unrelated
changes.

- [x] **Step 4: Commit the implementation**

```bash
git add AGENTS.md CLAUDE.md apps/api/AGENTS.md apps/api/CLAUDE.md apps/web/AGENTS.md docs/superpowers/plans/2026-06-07-agentic-documentation.md
git commit -m "docs(agent): add workspace agent instructions"
```
