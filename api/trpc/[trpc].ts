import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { appRouter } from '../../server/routers.js';
import { createContext } from '../../server/_core/context.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request to Fetch API Request
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  
  const fetchRequest = new Request(url.toString(), {
    method: req.method,
    headers: new Headers(req.headers as Record<string, string>),
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  const fetchResponse = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: fetchRequest,
    router: appRouter,
    createContext: () => createContext({ req, res }),
  });

  // Convert Fetch API Response back to Vercel response
  res.status(fetchResponse.status);
  
  fetchResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = await fetchResponse.text();
  res.send(body);
}
