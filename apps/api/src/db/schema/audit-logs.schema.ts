import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { timestamps, uuidPrimaryKey } from "../utils";
import { environments } from "./environment.schema";
import { organizations } from "./organization.schema";
import { projects } from "./project.schema";
import { secrets } from "./secret.schema";
import { serviceTokens } from "./service-tokens.schema";
import { users } from "./user.schema";

export const auditLogs = pgTable(
  "audit_logs",
  {
    ...uuidPrimaryKey,
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    projectId: uuid("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    environmentId: uuid("environment_id").references(() => environments.id, {
      onDelete: "set null",
    }),
    secretId: uuid("secret_id").references(() => secrets.id, {
      onDelete: "set null",
    }),
    actorType: varchar("actor_type", { length: 40 }).notNull(),
    actorUserId: uuid("actor_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    actorServiceTokenId: uuid("actor_service_token_id").references(
      () => serviceTokens.id,
      { onDelete: "set null" },
    ),
    action: varchar("action", { length: 100 }).notNull(),
    resourceType: varchar("resource_type", { length: 80 }).notNull(),
    resourceId: uuid("resource_id"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    ...timestamps,
  },
  (t) => [
    index("audit_logs_organization_id_idx").on(t.organizationId),
    index("audit_logs_project_id_idx").on(t.projectId),
    index("audit_logs_environment_id_idx").on(t.environmentId),
    index("audit_logs_secret_id_idx").on(t.secretId),
    index("audit_logs_actor_user_id_idx").on(t.actorUserId),
    index("audit_logs_actor_service_token_id_idx").on(t.actorServiceTokenId),
    index("audit_logs_action_idx").on(t.action),
    index("audit_logs_occurred_at_idx").on(t.occurredAt),
  ],
);
