import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const secretVersions = pgTable("secret_versions", {
  ...uuidPrimaryKey,
  ...timestamps,
});
