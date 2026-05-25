import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const secrets = pgTable("secrets", {
  ...uuidPrimaryKey,
  ...timestamps,
});
