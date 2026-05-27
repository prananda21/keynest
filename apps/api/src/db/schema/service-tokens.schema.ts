import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";
import { projects } from "./project.schema";
import { users } from "./user.schema";

export const serviceTokens = pgTable(
  "service_tokens",
  {
    ...uuidPrimaryKey,
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    tokenPrefix: varchar("token_prefix", { length: 24 }).notNull(),
    tokenHash: text("token_hash").notNull(),
    permissions: jsonb("permissions").$type<string[]>().notNull().default([]),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("service_tokens_project_id_idx").on(t.projectId),
    index("service_tokens_token_prefix_idx").on(t.tokenPrefix),
    index("service_tokens_created_by_id_idx").on(t.createdById),
    uniqueIndex("service_tokens_token_hash_unique").on(t.tokenHash),
  ],
);
