import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../utils";
import { environments } from "./environment.schema";
import { secrets } from "./secret.schema";
import { users } from "./user.schema";

export const secretVersions = pgTable(
  "secret_versions",
  {
    ...uuidPrimaryKey,
    secretId: uuid("secret_id")
      .notNull()
      .references(() => secrets.id, { onDelete: "cascade" }),
    environmentId: uuid("environment_id")
      .notNull()
      .references(() => environments.id, { onDelete: "cascade" }),
    version: integer("version").notNull(),
    encryptedValue: text("encrypted_value").notNull(),
    encryptionAlgorithm: varchar("encryption_algorithm", { length: 80 })
      .notNull()
      .default("aes-256-gcm"),
    encryptionKeyId: varchar("encryption_key_id", { length: 160 }),
    nonce: varchar("nonce", { length: 160 }).notNull(),
    authTag: varchar("auth_tag", { length: 160 }).notNull(),
    valueDigest: varchar("value_digest", { length: 128 }),
    isCurrent: boolean("is_current").notNull().default(true),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("secret_versions_secret_id_idx").on(t.secretId),
    index("secret_versions_environment_id_idx").on(t.environmentId),
    index("secret_versions_created_by_id_idx").on(t.createdById),
    uniqueIndex("secret_versions_secret_environment_version_unique").on(
      t.secretId,
      t.environmentId,
      t.version,
    ),
  ],
);
