import {
  boolean,
  index,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { timestamps, uuidPrimaryKey } from "../utils";
import { projects } from "./project.schema";
import { users } from "./user.schema";

export const secrets = pgTable(
  "secrets",
  {
    ...uuidPrimaryKey,
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    key: varchar("key", { length: 160 }).notNull(),
    description: text("description"),
    isArchived: boolean("is_archived").notNull().default(false),
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("secrets_project_id_idx").on(t.projectId),
    index("secrets_created_by_id_idx").on(t.createdById),
    uniqueIndex("secrets_project_key_unique").on(t.projectId, t.key),
  ],
);
