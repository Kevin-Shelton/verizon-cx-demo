import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

/**
 * PostgreSQL schema for Supabase
 */

// User role enum
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

// Feedback type enum
export const feedbackTypeEnum = pgEnum("feedback_type", ["question", "issue", "improvement", "observation"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("login_method", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  lastSignedIn: timestamp("last_signed_in").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Feedback submissions table
export const feedback = pgTable("feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow(),
  userName: text("user_name"),
  userEmail: varchar("user_email", { length: 320 }),
  type: feedbackTypeEnum("type").notNull(),
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
export const transcripts = pgTable("transcripts", {
  id: uuid("id").primaryKey().defaultRandom(),
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


// Application users table for username/password authentication
export const appUsers = pgTable("app_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type AppUser = typeof appUsers.$inferSelect;
export type InsertAppUser = typeof appUsers.$inferInsert;

