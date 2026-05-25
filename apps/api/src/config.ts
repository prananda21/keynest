import { Static, t } from "elysia";
import { Value } from "@sinclair/typebox/value";
import { logger } from "./lib/log";

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
});

type Config = Static<typeof configSchema>;

const loadConfig = (): Config => {
  const raw = typeof Bun !== "undefined" ? Bun.env : process.env;

  const isValid = Value.Check(configSchema, raw);
  if (!isValid) {
    const errors = [...Value.Errors(configSchema, raw)];
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
  return Value.Decode(configSchema, raw);
};

export const CONFIG: Config = loadConfig();
