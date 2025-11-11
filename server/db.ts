import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, feedback, InsertFeedback, transcripts, InsertTranscript } from "../drizzle/schema";
import { ENV } from './_core/env';
import { sql } from "drizzle-orm";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // PostgreSQL upsert
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.id,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Feedback queries
export async function createFeedback(data: InsertFeedback) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(feedback).values(data);
  return data;
}

export async function getAllFeedback() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(feedback).orderBy(feedback.createdAt);
}

export async function getFeedbackById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(feedback).where(eq(feedback.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Transcript queries
export async function createTranscript(data: InsertTranscript) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(transcripts).values(data);
  return data;
}

export async function getAllTranscripts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transcripts).orderBy(transcripts.createdAt);
}

export async function getTranscriptById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(transcripts).where(eq(transcripts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}



// App Users queries (for authentication)
export async function getAppUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const result = await db.execute(
      sql`SELECT id, email, password_hash, name, role FROM app_users WHERE email = ${email} LIMIT 1`
    );
    
    // PostgreSQL returns results as an array of rows
    // Each row is an object with the selected columns
    const row = (result as any[])?.[0];
    
    if (!row) {
      return undefined;
    }
    
    // Ensure we have all required fields properly extracted
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      name: row.name,
      role: row.role,
    };
  } catch (error) {
    console.error("Error fetching app user:", error);
    return undefined;
  }
}

// Persona Experiences queries
export async function getPersonaExperiences(personaId: string) {
  const db = await getDb();
  if (!db) return [];
  try {
    const result = await db.execute(
      sql`SELECT id, persona_id, step_order, step_type, url FROM persona_experiences WHERE persona_id = ${personaId} ORDER BY step_order ASC`
    );
    return result as any[] || [];
  } catch (error) {
    console.error("Error fetching persona experiences:", error);
    return [];
  }
}
