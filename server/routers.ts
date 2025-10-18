import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

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
});

export type AppRouter = typeof appRouter;
