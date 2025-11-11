import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Lock, Clock } from 'lucide-react';

interface SecurityMetrics {
  totalAttempts: number;
  totalBlocks: number;
  blockRate: string;
  topBlockedIPs: Array<{ ip: string; blockedCount: number }>;
  recentEvents: Array<{
    timestamp: string;
    ip: string;
    endpoint: string;
    action: string;
    details?: string;
  }>;
}

export default function Metrics() {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');
        if (!response.ok) throw new Error('Failed to fetch metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-600">Loading metrics...</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error || 'Failed to load metrics'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Security Metrics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalAttempts}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Total Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{metrics.totalBlocks}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Block Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">{metrics.blockRate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Blocked IPs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Blocked IP Addresses</CardTitle>
            <CardDescription>IPs with the most blocked attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.topBlockedIPs.length > 0 ? (
                metrics.topBlockedIPs.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm text-gray-700">{item.ip}</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.blockedCount} blocks
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No blocked IPs</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Last 50 authentication events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Timestamp</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">IP Address</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Endpoint</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Action</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.recentEvents.length > 0 ? (
                    metrics.recentEvents.map((event, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-600">
                          {new Date(event.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2 px-3 font-mono text-gray-600">{event.ip}</td>
                        <td className="py-2 px-3 text-gray-600">{event.endpoint}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              event.action === 'block'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {event.action}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-gray-600">{event.details}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 px-3 text-center text-gray-500">
                        No recent events
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
