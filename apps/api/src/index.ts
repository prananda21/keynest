import { Elysia } from "elysia";
import { logger } from "./lib/log";
import { CONFIG } from "./config";

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .onStart(async ({ server }) => {
    logger.info(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
  })
  .listen(CONFIG.PORT);
