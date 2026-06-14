import { relations } from "drizzle-orm";

import { auditLogs } from "./audit-logs.schema";
import { environments } from "./environment.schema";
import { organizations } from "./organization.schema";
import { organizationMembers } from "./organization-member.schema";
import { projects } from "./project.schema";
import { projectMembers } from "./project-member.schema";
import { rootAdmins } from "./root-admin.schema";
import { secrets } from "./secret.schema";
import { secretVersions } from "./secret-version.schema";
import { serviceTokens } from "./service-tokens.schema";
import { users } from "./user.schema";

export const usersRelations = relations(users, ({ many, one }) => ({
  auditLogs: many(auditLogs, { relationName: "audit_logs_actor_user" }),
  createdOrganizations: many(organizations, {
    relationName: "organizations_created_by",
  }),
  createdProjects: many(projects, { relationName: "projects_created_by" }),
  createdSecretVersions: many(secretVersions, {
    relationName: "secret_versions_created_by",
  }),
  createdSecrets: many(secrets, { relationName: "secrets_created_by" }),
  createdServiceTokens: many(serviceTokens, {
    relationName: "service_tokens_created_by",
  }),
  grantedRootAdmins: many(rootAdmins, {
    relationName: "root_admins_granted_by",
  }),
  grantedProjectMembers: many(projectMembers, {
    relationName: "project_members_granted_by",
  }),
  invitedOrganizationMembers: many(organizationMembers, {
    relationName: "organization_members_invited_by",
  }),
  organizationMemberships: many(organizationMembers, {
    relationName: "organization_members_user",
  }),
  projectMemberships: many(projectMembers, {
    relationName: "project_members_user",
  }),
  revokedRootAdmins: many(rootAdmins, {
    relationName: "root_admins_revoked_by",
  }),
  rootAdmin: one(rootAdmins, {
    fields: [users.id],
    references: [rootAdmins.userId],
    relationName: "root_admins_user",
  }),
}));

export const rootAdminsRelations = relations(rootAdmins, ({ one }) => ({
  grantedBy: one(users, {
    fields: [rootAdmins.grantedById],
    references: [users.id],
    relationName: "root_admins_granted_by",
  }),
  revokedBy: one(users, {
    fields: [rootAdmins.revokedById],
    references: [users.id],
    relationName: "root_admins_revoked_by",
  }),
  user: one(users, {
    fields: [rootAdmins.userId],
    references: [users.id],
    relationName: "root_admins_user",
  }),
}));

export const organizationsRelations = relations(
  organizations,
  ({ many, one }) => ({
    auditLogs: many(auditLogs),
    createdBy: one(users, {
      fields: [organizations.createdById],
      references: [users.id],
      relationName: "organizations_created_by",
    }),
    members: many(organizationMembers),
    projects: many(projects),
  }),
);

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    invitedBy: one(users, {
      fields: [organizationMembers.invitedById],
      references: [users.id],
      relationName: "organization_members_invited_by",
    }),
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMembers.userId],
      references: [users.id],
      relationName: "organization_members_user",
    }),
  }),
);

export const projectsRelations = relations(projects, ({ many, one }) => ({
  auditLogs: many(auditLogs),
  createdBy: one(users, {
    fields: [projects.createdById],
    references: [users.id],
    relationName: "projects_created_by",
  }),
  environments: many(environments),
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  members: many(projectMembers),
  secrets: many(secrets),
  serviceTokens: many(serviceTokens),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  grantedBy: one(users, {
    fields: [projectMembers.grantedById],
    references: [users.id],
    relationName: "project_members_granted_by",
  }),
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
    relationName: "project_members_user",
  }),
}));

export const environmentsRelations = relations(
  environments,
  ({ many, one }) => ({
    auditLogs: many(auditLogs),
    project: one(projects, {
      fields: [environments.projectId],
      references: [projects.id],
    }),
    secretVersions: many(secretVersions),
  }),
);

export const secretsRelations = relations(secrets, ({ many, one }) => ({
  auditLogs: many(auditLogs),
  createdBy: one(users, {
    fields: [secrets.createdById],
    references: [users.id],
    relationName: "secrets_created_by",
  }),
  project: one(projects, {
    fields: [secrets.projectId],
    references: [projects.id],
  }),
  versions: many(secretVersions),
}));

export const secretVersionsRelations = relations(secretVersions, ({ one }) => ({
  createdBy: one(users, {
    fields: [secretVersions.createdById],
    references: [users.id],
    relationName: "secret_versions_created_by",
  }),
  environment: one(environments, {
    fields: [secretVersions.environmentId],
    references: [environments.id],
  }),
  secret: one(secrets, {
    fields: [secretVersions.secretId],
    references: [secrets.id],
  }),
}));

export const serviceTokensRelations = relations(
  serviceTokens,
  ({ many, one }) => ({
    auditLogs: many(auditLogs, {
      relationName: "audit_logs_actor_service_token",
    }),
    createdBy: one(users, {
      fields: [serviceTokens.createdById],
      references: [users.id],
      relationName: "service_tokens_created_by",
    }),
    project: one(projects, {
      fields: [serviceTokens.projectId],
      references: [projects.id],
    }),
  }),
);

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  actorServiceToken: one(serviceTokens, {
    fields: [auditLogs.actorServiceTokenId],
    references: [serviceTokens.id],
    relationName: "audit_logs_actor_service_token",
  }),
  actorUser: one(users, {
    fields: [auditLogs.actorUserId],
    references: [users.id],
    relationName: "audit_logs_actor_user",
  }),
  environment: one(environments, {
    fields: [auditLogs.environmentId],
    references: [environments.id],
  }),
  organization: one(organizations, {
    fields: [auditLogs.organizationId],
    references: [organizations.id],
  }),
  project: one(projects, {
    fields: [auditLogs.projectId],
    references: [projects.id],
  }),
  secret: one(secrets, {
    fields: [auditLogs.secretId],
    references: [secrets.id],
  }),
}));
