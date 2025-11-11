import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getIkoneWorldVideoAccess, getVideoMetadata } from "./ikoneworld";
import { sql } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { verifyPassword, generateToken } from "./auth";
import { getAppUserByEmail } from "./db";

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
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const { email, password } = input;
          console.log('[LOGIN] Received login request for email:', email);
          
          // Hardcoded admin user for testing
          const ADMIN_EMAIL = 'kevin.shelton@invictusbpo.com';
          const ADMIN_PASSWORD_HASH = '$2a$10$D4tqaWfHCYDr7OmoDPre3eT1rLQADOpeljb3bzJDRq9ljtw23GqAu';
          
          let user = null;
          
          // Try database first
          try {
            user = await getAppUserByEmail(email);
          } catch (dbError) {
            console.warn('Database unavailable, checking hardcoded admin user:', dbError);
          }
          
          // If database failed or user not found, check hardcoded admin
          if (!user && email === ADMIN_EMAIL) {
            user = {
              id: '47040dcc-c7cf-44b7-ab89-d7d1da641ec2',
              email: ADMIN_EMAIL,
              password_hash: ADMIN_PASSWORD_HASH,
              name: 'Kevin Shelton',
              role: 'admin',
            };
          }
          
          if (!user) {
            throw new Error('Invalid credentials');
          }
          
          const passwordValid = await verifyPassword(password, user.password_hash);
          if (!passwordValid) {
            throw new Error('Invalid credentials');
          }
          
          const token = generateToken(user.id, user.email, user.name, user.role);
          console.log('[LOGIN] Authentication successful for:', email);
          const response = {
            success: true,
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
          };
          console.log('[LOGIN] Returning response:', JSON.stringify(response).substring(0, 100));
          return response;
        } catch (error) {
          console.error('Login error:', error);
          throw new Error(error instanceof Error ? error.message : 'Authentication failed');
        }
      }),
    generateAuthToken: publicProcedure
      .input(z.void().optional())
      .output(z.object({
        token: z.string(),
        expiresAt: z.string(),
      }))
      .mutation(({ ctx }) => {
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

