import type { OrganizationRole, ProjectRole } from "@/types";

export type TokenPayload = {
  id: string;
  name: string;
  role: {
    organization: OrganizationRole;
    project: ProjectRole;
  };
};
