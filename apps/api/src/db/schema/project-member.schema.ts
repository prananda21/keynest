import { index, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { PROJECT_ROLES } from "@/constants";

import { timestamps, uuidPrimaryKey } from "../utils";
import { projectRoleEnum } from "../utils/enum.schema";
import { projects } from "./project.schema";
import { users } from "./user.schema";

export const projectMembers = pgTable(
  "project_members",
  {
    ...uuidPrimaryKey,
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: projectRoleEnum("role").notNull().default(PROJECT_ROLES.NO_ACCESS),
    grantedById: uuid("granted_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("project_members_project_id_idx").on(t.projectId),
    index("project_members_user_id_idx").on(t.userId),
    index("project_members_granted_by_id_idx").on(t.grantedById),
    uniqueIndex("project_members_project_user_unique").on(
      t.projectId,
      t.userId,
    ),
  ],
);
