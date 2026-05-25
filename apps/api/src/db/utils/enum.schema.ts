import { ORGANIZATION_ROLES, PROJECT_ROLES } from "@/constants";
import { pgEnum } from "drizzle-orm/pg-core";

export const projectRoleEnum = pgEnum("project_role_enum", PROJECT_ROLES);

export const organizationRoleEnum = pgEnum(
  "organization_role_enum",
  ORGANIZATION_ROLES,
);
