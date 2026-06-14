import { pgEnum } from "drizzle-orm/pg-core";

import { ORGANIZATION_ROLES, PROJECT_ROLES } from "@/constants";

export const projectRoleEnum = pgEnum("project_role_enum", PROJECT_ROLES);

export const organizationRoleEnum = pgEnum(
  "organization_role_enum",
  ORGANIZATION_ROLES,
);
