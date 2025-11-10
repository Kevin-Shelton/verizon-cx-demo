/**
 * Google reCAPTCHA v3 verification
 * Verifies reCAPTCHA tokens submitted by the client
 */

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const SCORE_THRESHOLD = 0.5; // Minimum score to pass (0-1, higher = more likely human)

export interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
}

/**
 * Verify a reCAPTCHA v3 token
 * @param token - reCAPTCHA token from client
 * @returns Verification result with score
 */
export async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured');
    return { success: false, error_codes: ['RECAPTCHA_SECRET_KEY_NOT_SET'] };
  }

  if (!token) {
    return { success: false, error_codes: ['MISSING_TOKEN'] };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data = (await response.json()) as RecaptchaResponse;

    // Check if verification was successful and score is above threshold
    if (data.success && data.score !== undefined && data.score >= SCORE_THRESHOLD) {
      return {
        success: true,
        score: data.score,
        action: data.action,
        challenge_ts: data.challenge_ts,
        hostname: data.hostname,
      };
    }

    return {
      success: false,
      score: data.score,
      error_codes: data.error_codes || ['LOW_SCORE'],
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error_codes: ['VERIFICATION_ERROR'],
    };
  }
}

/**
 * Check if reCAPTCHA is required based on failed attempt count
 * @param failedAttempts - Number of failed login attempts
 * @returns True if reCAPTCHA should be required
 */
export function isRecaptchaRequired(failedAttempts: number): boolean {
  return failedAttempts >= 3;
}
