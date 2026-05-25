import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const organizations = pgTable("organizations", {
  ...uuidPrimaryKey,
  ...timestamps,
});
