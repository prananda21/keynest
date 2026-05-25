import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";

export const auditLogs = pgTable("audit_logs", {
  ...uuidPrimaryKey,
  ...timestamps,
});
