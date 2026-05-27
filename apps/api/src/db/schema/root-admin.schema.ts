import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";
import { users } from "./user.schema";

export const rootAdmins = pgTable(
  "root_admins",
  {
    ...uuidPrimaryKey,
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    grantedById: uuid("granted_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    reason: text("reason"),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    revokedById: uuid("revoked_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    revokeReason: text("revoke_reason"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("root_admins_user_id_unique").on(t.userId),
    index("root_admins_granted_by_id_idx").on(t.grantedById),
    index("root_admins_revoked_by_id_idx").on(t.revokedById),
  ],
);
