import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, feedback, InsertFeedback, transcripts, InsertTranscript } from "../drizzle/schema.js";
import { ENV } from './_core/env.js';
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
      target: users.id as any,
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

  const result = await db.select().from(users as any).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Feedback queries
export async function createFeedback(data: InsertFeedback) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(feedback as any).values(data);
  return data;
}

export async function getAllFeedback() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(feedback as any).orderBy(feedback.createdAt);
}

export async function getFeedbackById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(feedback as any).where(eq(feedback.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Transcript queries
export async function createTranscript(data: InsertTranscript) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(transcripts as any).values(data);
  return data;
}

export async function getAllTranscripts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transcripts as any).orderBy(transcripts.createdAt);
}

export async function getTranscriptById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(transcripts as any).where(eq(transcripts.id, id)).limit(1);
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
    
    // PostgreSQL execute returns results as an array
    // The first element might be the rows array, or it might be directly an array of rows
    let rows: any[] = [];
    
    if (Array.isArray(result)) {
      // If result is already an array, use it directly
      rows = result;
    } else if (result && typeof result === 'object' && 'rows' in result) {
      // If result has a 'rows' property, use that
      rows = (result as any).rows;
    } else if (result && typeof result === 'object' && Array.isArray((result as any)[0])) {
      // If result[0] is an array, it might be the rows
      rows = (result as any)[0];
    }
    
    const row = rows[0];
    
    if (!row) {
      console.log('[DB] No user found for email:', email);
      return undefined;
    }
    
    console.log('[DB] User found, row type:', typeof row, 'is array:', Array.isArray(row));
    
    // Handle both object and array formats
    let user;
    if (Array.isArray(row)) {
      // If row is an array, map it to object based on column order: id, email, password_hash, name, role
      user = {
        id: row[0],
        email: row[1],
        password_hash: row[2],
        name: row[3],
        role: row[4],
      };
    } else if (typeof row === 'object') {
      // If row is an object, extract fields directly
      user = {
        id: row.id,
        email: row.email,
        password_hash: row.password_hash,
        name: row.name,
        role: row.role,
      };
    }
    
    console.log('[DB] Returning user:', { id: user?.id, email: user?.email, has_password_hash: !!user?.password_hash });
    return user;
  } catch (error) {
    console.error("Error fetching app user:", error);
    return undefined;
  }
}

export async function getAllAppUsers() {
  const db = await getDb();
  if (!db) return [];
  try {
    const result = await db.execute(
      sql`SELECT id, email, name, role FROM app_users ORDER BY email`
    );
    
    let rows: any[] = [];
    if (Array.isArray(result)) {
      rows = result;
    } else if (result && typeof result === 'object' && 'rows' in result) {
      rows = (result as any).rows;
    } else if (result && typeof result === 'object' && Array.isArray((result as any)[0])) {
      rows = (result as any)[0];
    }
    
    return rows.map(row => {
      if (Array.isArray(row)) {
        return {
          id: row[0],
          email: row[1],
          name: row[2],
          role: row[3],
        };
      } else {
        return {
          id: row.id,
          email: row.email,
          name: row.name,
          role: row.role,
        };
      }
    });
  } catch (error) {
    console.error("Error fetching app users:", error);
    return [];
  }
}

export async function createAppUser(user: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  try {
    await db.execute(
      sql`INSERT INTO app_users (id, email, password_hash, name, role, created_at, updated_at) VALUES (${user.id}, ${user.email}, ${user.password_hash}, ${user.name}, ${user.role}, NOW(), NOW())`
    );
  } catch (error) {
    console.error("Error creating app user:", error);
    throw error;
  }
}

export async function deleteAppUser(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  try {
    await db.execute(
      sql`DELETE FROM app_users WHERE email = ${email}`
    );
  } catch (error) {
    console.error("Error deleting app user:", error);
    throw error;
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
