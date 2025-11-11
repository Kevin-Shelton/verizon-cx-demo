import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for login attempts
 * Limits to 5 attempts per 15 minutes per IP
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

/**
 * Rate limiter for token generation
 * Limits to 20 requests per 5 minutes per IP
 */
export const tokenLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // 20 requests
  message: 'Too many token requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for user creation
 * Limits to 10 requests per hour per IP
 */
export const createUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests
  message: 'Too many user creation attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * General API rate limiter
 * Limits to 100 requests per minute per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
