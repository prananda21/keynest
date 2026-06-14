import { Elysia } from "elysia";

import { CONFIG } from "./config";
import { initializeDb } from "./db/service";
import { logger } from "./lib/log";

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .onStart(async ({ server }) => {
    await initializeDb();
    logger.info(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
  })
  .listen(CONFIG.PORT);
