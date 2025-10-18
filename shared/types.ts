/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// Journey and Persona types
export type Coverage = "full" | "partial" | "none";

export type Pillar = "web" | "email" | "chat" | "ivr" | "documents" | "field";

export interface Activity {
  id: string;
  label: string;
  coverage: Coverage;
  pillars: Pillar[];
  rationale: string;
  demos: string[];
}

export interface Stage {
  id: string;
  name: string;
  activities: Activity[];
}

export interface JourneyData {
  stages: Stage[];
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  dialect: string;
  dialectLabel: string;
  description: string;
  avatar: string;
  needs: string[];
  journey: string[];
}

export interface PersonasData {
  personas: Persona[];
}

export interface FeedbackContext {
  route: string;
  personaId?: string;
  dialect?: string;
  activityId?: string;
}

export interface FeedbackSubmission {
  userName?: string;
  userEmail?: string;
  type: "question" | "issue" | "improvement" | "observation";
  title: string;
  description: string;
  context: FeedbackContext;
  attachments?: string[];
  metadata?: Record<string, unknown>;
}

export interface ChatMessage {
  from: "customer" | "agent";
  lang: string;
  text: string;
  timestamp?: string;
}

export interface TranscriptSubmission {
  personaId: string;
  dialect: string;
  original: ChatMessage[];
  translated: ChatMessage[];
  sentiment: "positive" | "neutral" | "negative";
  source: string;
  hash?: string;
}
