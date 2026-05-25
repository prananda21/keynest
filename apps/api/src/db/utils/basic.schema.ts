import { serial, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Standard UUID primary key column for tables that should use globally unique IDs.
 */
export const uuidPrimaryKey = {
  id: uuid("id").primaryKey().defaultRandom(),
};

/**
 * Standard auto-incrementing integer primary key column.
 */
export const serialPrimaryKey = {
  id: serial("id").primaryKey(),
};

/**
 * Standard audit timestamp columns.
 *
 * `createdAt` is set when the row is inserted.
 * `updatedAt` is set when the row is inserted and refreshed on each update.
 */
export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

/**
 * @deprecated Use {@link uuidPrimaryKey}.
 */
export const UUIDProps = uuidPrimaryKey;

/**
 * @deprecated Use {@link serialPrimaryKey}.
 */
export const serialProps = serialPrimaryKey;

/**
 * @deprecated Use {@link timestamps}.
 */
export const timestampProps = timestamps;
