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
import { organizations } from "./organization.schema";
import { users } from "./user.schema";

export const projects = pgTable(
  "projects",
  {
    ...uuidPrimaryKey,
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    isArchived: boolean("is_archived").notNull().default(false),
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("projects_organization_id_idx").on(t.organizationId),
    index("projects_created_by_id_idx").on(t.createdById),
    uniqueIndex("projects_organization_slug_unique").on(
      t.organizationId,
      t.slug,
    ),
  ],
);
