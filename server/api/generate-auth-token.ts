import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';

const router = Router();

// Generate auth token for SSO
router.post('/generate-auth-token', (req: Request, res: Response) => {
  try {
    // Get current user from session
    let user = (req as any).user;

    // If no user, create a demo user for testing
    if (!user) {
      user = {
        id: 'demo-user',
        email: 'demo@verizon.com',
        name: 'Demo User',
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email || 'demo@verizon.com',
        name: user.name || 'Demo User',
        portalUserId: user.id,
      },
      process.env.AUTH_TOKEN_SECRET || 'default-secret-key',
      { expiresIn: '5m' }
    );

    return res.json({
      token,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Error generating auth token:', error);
    return res.status(500).json({ error: 'Failed to generate auth token' });
  }
});

export default router;

