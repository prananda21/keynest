import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const environments = pgTable("environments", {
  ...uuidPrimaryKey,
  ...timestamps,
});
