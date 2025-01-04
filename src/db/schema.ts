import { pgTable, varchar, pgEnum, uuid, date } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  role: rolesEnum().default("user"),
  refresh_token: varchar(),
  created_at: date().default("now()"),
  updated_at: date(),
});
