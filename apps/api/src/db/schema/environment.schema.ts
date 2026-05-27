import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";
import { projects } from "./project.schema";

export const environments = pgTable(
  "environments",
  {
    ...uuidPrimaryKey,
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),
    name: varchar("name", { length: 80 }).notNull(),
    slug: varchar("slug", { length: 80 }).notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    isDefault: boolean("is_default").notNull().default(false),
    ...timestamps,
  },
  (t) => [
    index("environments_project_id_idx").on(t.projectId),
    uniqueIndex("environments_project_slug_unique").on(t.projectId, t.slug),
  ],
);
