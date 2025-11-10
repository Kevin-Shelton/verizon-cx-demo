import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-lg text-gray-600">
            Manage the Verizon CX Demo Portal
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="shadow-lg border-l-4 border-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-2xl">Admin Features</CardTitle>
            <CardDescription>
              Advanced administration tools
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Admin Panel Coming Soon</h3>
                  <p className="text-sm text-blue-800">
                    The admin panel is under development. Features for user management, analytics, and system configuration will be available soon.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-gray-900">Planned Features:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>User management and access control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>System analytics and monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Configuration settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Audit logs and activity tracking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Back to Portal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

