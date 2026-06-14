import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { CONFIG } from "@/config";

import * as schema from "./schema";

/**
 * Shared PostgreSQL connection pool for the API process.
 *
 * The connection string is normalized by `src/config.ts`.
 */
const pool = new Pool({
  connectionString: CONFIG.DB_URL,
});

/**
 * Typed Drizzle database client.
 *
 * Import this client from application services and route handlers instead of
 * creating additional database connections.
 */
export const db = drizzle({ client: pool, schema });
