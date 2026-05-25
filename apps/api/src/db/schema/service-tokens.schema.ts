import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const serviceTokens = pgTable("service_tokens", {
  ...uuidPrimaryKey,
  ...timestamps,
});
