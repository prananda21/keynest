import {
  index,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { timestamps, uuidPrimaryKey } from "../utils";
import { users } from "./user.schema";

export const organizations = pgTable(
  "organizations",
  {
    ...uuidPrimaryKey,
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("organizations_slug_unique").on(t.slug),
    index("organizations_created_by_id_idx").on(t.createdById),
  ],
);
