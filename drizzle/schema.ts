import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * MySQL schema for TiDB
 */

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("login_method", { length: 64 }),
  role: varchar("role", { length: 64 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  lastSignedIn: timestamp("last_signed_in").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Feedback submissions table
export const feedback = mysqlTable("feedback", {
  id: varchar("id", { length: 64 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  userName: text("user_name"),
  userEmail: varchar("user_email", { length: 320 }),
  type: varchar("type", { length: 64 }).notNull(),
  title: text("title"),
  description: text("description"),
  route: text("route"),
  personaId: varchar("persona_id", { length: 64 }),
  dialect: varchar("dialect", { length: 32 }),
  activityId: varchar("activity_id", { length: 128 }),
  attachments: text("attachments"), // JSON array stored as text
  metadata: text("metadata"), // JSON object stored as text
});

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;

// Chat transcripts table
export const transcripts = mysqlTable("transcripts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  personaId: varchar("persona_id", { length: 64 }),
  dialect: varchar("dialect", { length: 32 }),
  original: text("original"), // JSON array stored as text
  translated: text("translated"), // JSON array stored as text
  sentiment: varchar("sentiment", { length: 32 }),
  source: varchar("source", { length: 64 }),
  hash: varchar("hash", { length: 128 }),
});

export type Transcript = typeof transcripts.$inferSelect;
export type InsertTranscript = typeof transcripts.$inferInsert;


// Application users table for email-based authentication with bcrypt
export const appUsers = mysqlTable("app_users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  name: text("name"),
  role: varchar("role", { length: 64 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type AppUser = typeof appUsers.$inferSelect;
export type InsertAppUser = typeof appUsers.$inferInsert;

