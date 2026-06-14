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
COPY --from=builder /app/apps/landing/dist ./dist
EXPOSE 8080
CMD ["waku", "start"]
