import type { ORGANIZATION_ROLES, PROJECT_ROLES } from "@/constants";

export type OrganizationRole =
  (typeof ORGANIZATION_ROLES)[keyof typeof ORGANIZATION_ROLES];
export type ProjectRole = (typeof PROJECT_ROLES)[keyof typeof PROJECT_ROLES];
