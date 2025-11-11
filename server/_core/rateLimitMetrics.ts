/**
 * Rate Limiting Metrics Tracker
 * Tracks failed login attempts, blocked IPs, and security events
 */

interface RateLimitEvent {
  timestamp: Date;
  ip: string;
  endpoint: string;
  action: 'attempt' | 'block';
  details?: string;
}

interface IPMetrics {
  totalAttempts: number;
  failedAttempts: number;
  blockedCount: number;
  lastAttempt: Date;
}

class RateLimitMetrics {
  private events: RateLimitEvent[] = [];
  private ipMetrics: Map<string, IPMetrics> = new Map();
  private maxEvents = 1000;

  recordAttempt(ip: string, endpoint: string, success: boolean) {
    this.events.push({
      timestamp: new Date(),
      ip,
      endpoint,
      action: success ? 'attempt' : 'block',
      details: success ? 'Successful' : 'Failed attempt',
    });

    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    const metrics = this.ipMetrics.get(ip) || {
      totalAttempts: 0,
      failedAttempts: 0,
      blockedCount: 0,
      lastAttempt: new Date(),
    };

    metrics.totalAttempts++;
    if (!success) {
      metrics.failedAttempts++;
    }
    metrics.lastAttempt = new Date();

    this.ipMetrics.set(ip, metrics);
  }

  recordBlock(ip: string, endpoint: string, reason: string) {
    this.events.push({
      timestamp: new Date(),
      ip,
      endpoint,
      action: 'block',
      details: reason,
    });

    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    const metrics = this.ipMetrics.get(ip) || {
      totalAttempts: 0,
      failedAttempts: 0,
      blockedCount: 0,
      lastAttempt: new Date(),
    };

    metrics.blockedCount++;
    this.ipMetrics.set(ip, metrics);
  }

  getMetrics() {
    const totalAttempts = Array.from(this.ipMetrics.values()).reduce(
      (sum, m) => sum + m.totalAttempts,
      0
    );
    const totalBlocks = Array.from(this.ipMetrics.values()).reduce(
      (sum, m) => sum + m.blockedCount,
      0
    );
    const blockRate =
      totalAttempts > 0 ? ((totalBlocks / totalAttempts) * 100).toFixed(2) : '0.00';

    const topBlockedIPs = Array.from(this.ipMetrics.entries())
      .sort((a, b) => b[1].blockedCount - a[1].blockedCount)
      .slice(0, 10)
      .map(([ip, metrics]) => ({
        ip,
        blockedCount: metrics.blockedCount,
      }));

    return {
      totalAttempts,
      totalBlocks,
      blockRate: `${blockRate}%`,
      topBlockedIPs,
      recentEvents: this.events.slice(-50),
    };
  }

  getIPMetrics(ip: string) {
    return this.ipMetrics.get(ip);
  }
}

export const rateLimitMetrics = new RateLimitMetrics();
