import { Elysia } from "elysia";
import { logger } from "./lib/log";
import { CONFIG } from "./config";
import { initializeDb } from "./db";

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .onStart(async ({ server }) => {
    await initializeDb();
    logger.info(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
  })
  .listen(CONFIG.PORT);
