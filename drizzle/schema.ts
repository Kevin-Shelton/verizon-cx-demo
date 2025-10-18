import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Feedback submissions table
export const feedback = mysqlTable("feedback", {
  id: varchar("id", { length: 64 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt").defaultNow(),
  userName: text("userName"),
  userEmail: varchar("userEmail", { length: 320 }),
  type: mysqlEnum("type", ["question", "issue", "improvement", "observation"]).notNull(),
  title: text("title"),
  description: text("description"),
  route: text("route"),
  personaId: varchar("personaId", { length: 64 }),
  dialect: varchar("dialect", { length: 32 }),
  activityId: varchar("activityId", { length: 128 }),
  attachments: text("attachments"), // JSON array stored as text
  metadata: text("metadata"), // JSON object stored as text
});

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;

// Chat transcripts table
export const transcripts = mysqlTable("transcripts", {
  id: varchar("id", { length: 64 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt").defaultNow(),
  personaId: varchar("personaId", { length: 64 }),
  dialect: varchar("dialect", { length: 32 }),
  original: text("original"), // JSON array stored as text
  translated: text("translated"), // JSON array stored as text
  sentiment: varchar("sentiment", { length: 32 }),
  source: varchar("source", { length: 64 }),
  hash: varchar("hash", { length: 128 }),
});

export type Transcript = typeof transcripts.$inferSelect;
export type InsertTranscript = typeof transcripts.$inferInsert;
