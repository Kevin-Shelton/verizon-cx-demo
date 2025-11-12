import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, router } from "./_core/trpc.js";
import { getIkoneWorldVideoAccess, getVideoMetadata } from "./ikoneworld.js";
import { sql } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { getAppUserByEmail } from "./db.js";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      (ctx.res as any).clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
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
            console.log('[LOGIN] Database query result for', email, ':', user ? { id: user.id, email: user.email, has_password_hash: !!user.password_hash } : 'null');
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
          
          console.log('[LOGIN] User found:', { id: user.id, email: user.email, password_hash_exists: !!user.password_hash, password_hash_length: user.password_hash ? user.password_hash.length : 0 });
          console.log('[LOGIN] Submitted password length:', password.length);
          
          const { verifyPassword, generateToken } = await import("./auth");
          const passwordValid = await verifyPassword(password, user.password_hash);
          console.log('[LOGIN] Password verification result:', passwordValid);
          
          if (!passwordValid) {
            console.log('[LOGIN] Password mismatch for:', email);
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
    
    listUsers: publicProcedure.query(async () => {
      try {
        const { getAllAppUsers } = await import("./db");
        return await getAllAppUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    }),

    addUser: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const { email, password } = input;
          const { createAppUser } = await import("./db");
          const { hashPassword } = await import("./auth");
          
          const passwordHash = await hashPassword(password);
          const userId = crypto.randomUUID();
          
          await createAppUser({
            id: userId,
            email,
            password_hash: passwordHash,
            name: email.split('@')[0],
            role: 'user',
          });
          
          console.log('[USER] User added successfully:', email);
          return { success: true };
        } catch (error) {
          console.error("Error adding user:", error);
          throw new Error(error instanceof Error ? error.message : "Failed to add user");
        }
      }),

    deleteUser: publicProcedure
      .input(z.object({
        email: z.string().email(),
      }))
      .mutation(async ({ input }) => {
        try {
          const { email } = input;
          
          // Prevent deleting the admin user
          if (email === 'kevin.shelton@invictusbpo.com') {
            throw new Error('Cannot delete admin user');
          }
          
          const { deleteAppUser } = await import("./db");
          await deleteAppUser(email);
          
          console.log('[USER] User deleted successfully:', email);
          return { success: true };
        } catch (error) {
          console.error("Error deleting user:", error);
          throw new Error(error instanceof Error ? error.message : "Failed to delete user");
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
            process.env.JWT_SECRET || process.env.AUTH_TOKEN_SECRET || "default-secret-key",
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
          id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
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
