import { index, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { ORGANIZATION_ROLES } from "@/constants";

import { timestamps, uuidPrimaryKey } from "../utils";
import { organizationRoleEnum } from "../utils/enum.schema";
import { organizations } from "./organization.schema";
import { users } from "./user.schema";

export const organizationMembers = pgTable(
  "organization_members",
  {
    ...uuidPrimaryKey,
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: organizationRoleEnum("role")
      .notNull()
      .default(ORGANIZATION_ROLES.MEMBER),
    invitedById: uuid("invited_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("organization_members_organization_id_idx").on(t.organizationId),
    index("organization_members_user_id_idx").on(t.userId),
    uniqueIndex("organization_members_organization_user_unique").on(
      t.organizationId,
      t.userId,
    ),
  ],
);
