import type { Static } from "elysia";

import { Value } from "@sinclair/typebox/value";
import { t } from "elysia";

import { logger } from "./lib/log";

type DbUrlEnv = Partial<
  Record<
    | "DB_URL"
    | "POSTGRES_DB"
    | "POSTGRES_HOST"
    | "POSTGRES_PASSWORD"
    | "POSTGRES_PORT"
    | "POSTGRES_USER",
    string | undefined
  >
> &
  Record<string, string | undefined>;

const trimOptionalQuotes = (value: string): string => {
  return value.trim().replace(/^['"]|['"]$/g, "");
};

/**
 * Builds the PostgreSQL connection URL used by the API.
 *
 * `DB_URL` remains the highest-priority override. When it is not provided, the
 * URL is constructed from `POSTGRES_*` variables and defaults that match the
 * local Docker Compose service.
 */
export const constructDbUrl = (env: DbUrlEnv): string => {
  const explicitDbUrl = env.DB_URL;
  if (explicitDbUrl) {
    return trimOptionalQuotes(explicitDbUrl);
  }

  const database = trimOptionalQuotes(env.POSTGRES_DB ?? "keynest");
  const host = trimOptionalQuotes(env.POSTGRES_HOST ?? "localhost");
  const password = trimOptionalQuotes(env.POSTGRES_PASSWORD ?? "keynest");
  const port = trimOptionalQuotes(env.POSTGRES_PORT ?? "5432");
  const user = trimOptionalQuotes(env.POSTGRES_USER ?? "keynest");

  const url = new URL("postgres://localhost");
  url.hostname = host;
  url.password = password;
  url.pathname = database;
  url.port = port;
  url.username = user;

  return url.toString();
};

const configSchema = t.Object({
  // Server
  NODE_ENV: t.Union([
    t.Literal("development"),
    t.Literal("production"),
    t.Literal("local"),
  ]),
  PORT: t.Numeric({
    minimum: 1000,
    maximum: 9999,
    error: "PORT should be defined with number value",
  }),

  // Auth
  JWT_SECRET: t.String({
    description:
      "JWT signing secret generated from at least 32 random bytes and encoded as hex.",
    minLength: 64,
    pattern: "^(?:[a-fA-F0-9]{2}){32,}$",
  }),

  // Database
  DB_URL: t.String({
    description:
      "PostgreSQL connection URL. Built from DB_URL or POSTGRES_* environment variables.",
  }),
});

type Config = Static<typeof configSchema>;

const loadConfig = (): Config => {
  const raw = typeof Bun !== "undefined" ? Bun.env : process.env;
  const normalizedRaw = {
    ...raw,
    DB_URL: constructDbUrl(raw),
  };

  const isValid = Value.Check(configSchema, normalizedRaw);
  if (!isValid) {
    const errors = [...Value.Errors(configSchema, normalizedRaw)];
    logger.error("⚠️ Invalid or missing environment variables:");
    for (const error of errors) {
      logger.error(`  - ${error.path}: ${error.message}`);
    }
    logger.error(
      "\n💡 Please check your .env file and ensure all required variables are set correctly.",
    );
    process.exit(1);
  }

  // Decode and transform values (applies Transform functions)
  return Value.Decode(configSchema, normalizedRaw);
};

export const CONFIG: Config = loadConfig();
