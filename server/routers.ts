import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getIkoneWorldVideoAccess, getVideoMetadata } from "./ikoneworld";
import { sql } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    generateAuthToken: publicProcedure.mutation(({ ctx }) => {
      try {
        // Get current user from session
        let user = ctx.user;

        // If no user, create a demo user for testing
        if (!user) {
          user = {
            id: "demo-user",
            email: "demo@verizon.com",
            name: "Demo User",
            role: "user" as const,
            createdAt: new Date(),
            lastSignedIn: new Date(),
            loginMethod: "demo",
          };
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            email: user.email || "demo@verizon.com",
            name: user.name || "Demo User",
            portalUserId: user.id,
          },
          process.env.AUTH_TOKEN_SECRET || "default-secret-key",
          { expiresIn: "5m" }
        );

        return {
          token,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        };
      } catch (error) {
        console.error("Error generating auth token:", error);
        throw new Error("Failed to generate auth token");
      }
    }),
  }),

  feedback: router({
    submit: publicProcedure
      .input((raw) => {
        const data = raw as any;
        return {
          userName: data.userName as string | undefined,
          userEmail: data.userEmail as string | undefined,
          type: data.type as "question" | "issue" | "improvement" | "observation",
          title: data.title as string,
          description: data.description as string,
          route: data.context?.route as string,
          personaId: data.context?.personaId as string | undefined,
          dialect: data.context?.dialect as string | undefined,
          activityId: data.context?.activityId as string | undefined,
          attachments: JSON.stringify(data.attachments || []),
          metadata: JSON.stringify(data.metadata || {}),
        };
      })
      .mutation(async ({ input }) => {
        const { createFeedback } = await import("./db");
        await createFeedback(input);
        return { success: true };
      }),
    list: publicProcedure.query(async () => {
      const { getAllFeedback } = await import("./db");
      return getAllFeedback();
    }),
  }),

  transcripts: router({
    submit: publicProcedure
      .input((raw) => {
        const data = raw as any;
        return {
          personaId: data.personaId as string,
          dialect: data.dialect as string,
          original: JSON.stringify(data.original || []),
          translated: JSON.stringify(data.translated || []),
          sentiment: data.sentiment as string,
          source: data.source as string,
          hash: data.hash as string | undefined,
        };
      })
      .mutation(async ({ input }) => {
        const { createTranscript } = await import("./db");
        await createTranscript(input);
        return { success: true };
      }),
    list: publicProcedure.query(async () => {
      const { getAllTranscripts } = await import("./db");
      return getAllTranscripts();
    }),
  }),

  video: router({
    getAccess: publicProcedure.query(async () => {
      return await getIkoneWorldVideoAccess();
    }),
    getMetadata: publicProcedure.query(async () => {
      return await getVideoMetadata();
    }),
  }),

  experiences: router({
    getPersonaExperiences: publicProcedure
      .input(z.string())
      .query(async ({ input: personaId }) => {
        try {
          const { getPersonaExperiences } = await import("./db");
          const experiences = await getPersonaExperiences(personaId);
          console.log(`Fetched ${experiences.length} experiences for persona: ${personaId}`);
          return experiences;
        } catch (error) {
          console.error("Error fetching persona experiences:", error);
          return [];
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

