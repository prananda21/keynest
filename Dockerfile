# Shared base
FROM oven/bun:1 AS base
WORKDIR /app

# Install all workspace deps (lockfile covers the full workspace)
FROM base AS deps
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/landing/package.json ./apps/landing/
RUN bun install --frozen-lockfile

# ── landing ──────────────────────────────────────────────────────────────────

FROM deps AS build-landing
COPY apps/landing ./apps/landing
WORKDIR /app/apps/landing
RUN bun run build

FROM oven/bun:1-slim AS landing
WORKDIR /app
COPY --from=build-landing /app/apps/landing/dist ./dist
EXPOSE 8080
CMD ["waku", "start"]

# ── web ──────────────────────────────────────────────────────────────────────

FROM deps AS build-web
COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN bun run build

FROM oven/bun:1-slim AS web
WORKDIR /app
COPY --from=build-web /app/apps/web/.next/standalone ./
COPY --from=build-web /app/apps/web/.next/static ./.next/static
COPY --from=build-web /app/apps/web/public ./public
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["bun", "apps/web/server.js"]

# ── api ──────────────────────────────────────────────────────────────────────

FROM deps AS api
COPY apps/api ./apps/api
WORKDIR /app/apps/api
EXPOSE 3001
CMD ["bun", "run", "src/index.ts"]
