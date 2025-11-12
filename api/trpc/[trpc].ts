import { createNextApiHandler } from '@trpc/server/adapters/next';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { appRouter } from '../../server/routers.js';
import { createContext } from '../../server/_core/context.js';

// Export the handler using the Next.js adapter (compatible with Vercel)
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
