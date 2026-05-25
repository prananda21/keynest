import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

/**
 * Shared PostgreSQL connection pool for the API process.
 *
 * The connection string is read from `DB_URL`, so the API should be started
 * with that environment variable configured.
 */
const pool = new Pool({
  connectionString: process.env.DB_URL!,
});

/**
 * Typed Drizzle database client.
 *
 * Import this client from application services and route handlers instead of
 * creating additional database connections.
 */
export const db = drizzle({ client: pool, schema });
