import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const organizationMembers = pgTable("organization_members", {
  ...uuidPrimaryKey,
  ...timestamps,
});
