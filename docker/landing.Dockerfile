FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/landing/package.json ./apps/landing/
RUN bun install

COPY apps/landing ./apps/landing
WORKDIR /app/apps/landing
RUN bun run build

FROM oven/bun:1-slim
WORKDIR /app
# Root node_modules contains the .bun content-addressed cache that landing's symlinks resolve into
COPY --from=builder /app/node_modules ./node_modules
# Landing app dir includes node_modules with symlinks pointing into /app/node_modules/.bun
COPY --from=builder /app/apps/landing ./apps/landing
EXPOSE 8080
WORKDIR /app/apps/landing
CMD ["bun", "run", "start"]
