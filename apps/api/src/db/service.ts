import { sql } from "drizzle-orm";
import { logger } from "@/lib/log";
import { db } from "./registry";
import { ServiceUnavailableException } from "@/utils/errors/custom";

export type DbConnectionHealth = {
  ok: boolean;
  latencyMs: number;
  error?: string;
};

const connectionProbe = sql`select 1`;

export const checkDbConnection = async (): Promise<DbConnectionHealth> => {
  const startedAt = performance.now();

  try {
    await db.execute(connectionProbe);

    return {
      ok: true,
      latencyMs: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    return {
      ok: false,
      latencyMs: Math.round(performance.now() - startedAt),
      error: message,
    };
  }
};

export const initializeDb = async () => {
  const health = await checkDbConnection();

  if (!health.ok) {
    logger.error({ error: health.error }, "Database connection failed");
    throw new ServiceUnavailableException(
      `Database connection failed: ${health.error}`,
    );
  }

  logger.info(
    { latencyMs: health.latencyMs },
    "Database connection initialized",
  );
};

export const connectionHealth = checkDbConnection;
