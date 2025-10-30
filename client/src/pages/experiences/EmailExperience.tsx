import { Mail, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

export default function EmailExperience() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Email Experience</h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover how dialect-specific translation enhances email communication with customers
          </p>
        </div>

        {/* Demo Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email Interface */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Customer Email
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">From: customer@example.com</p>
                <p className="text-sm font-semibold text-gray-700 mb-3">Subject: Service Request</p>
                <p className="text-gray-700">
                  "I need help with my account. Can you explain the billing process in a way that makes sense?"
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <p className="text-sm font-semibold text-blue-700 mb-2">Dialect-Specific Response:</p>
                <p className="text-gray-700">
                  Our system detects the customer's dialect and cultural context, crafting a response that resonates with their communication style and regional preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Authentic Communication</h3>
                  <p className="text-sm text-gray-600">
                    Responses feel natural and culturally appropriate, not machine-translated
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Faster Resolution</h3>
                  <p className="text-sm text-gray-600">
                    Clear communication reduces back-and-forth, resolving issues faster
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Higher Satisfaction</h3>
                  <p className="text-sm text-gray-600">
                    Customers feel understood and valued, improving loyalty and retention
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Email Journey
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Customer Sends Email", desc: "Customer reaches out with a question or issue" },
              { step: 2, title: "Dialect Detection", desc: "System identifies customer's dialect and cultural context" },
              { step: 3, title: "Intelligent Response", desc: "AI generates culturally appropriate response" },
              { step: 4, title: "Delivery", desc: "Customer receives authentic, relevant response" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  {item.step < 4 && <div className="w-1 h-12 bg-blue-200 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

