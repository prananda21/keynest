import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const projects = pgTable("projects", {
  ...uuidPrimaryKey,
  ...timestamps,
});
