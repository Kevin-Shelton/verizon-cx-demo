import { MapPin, Users, Smartphone, CheckCircle2, Clock } from "lucide-react";

export default function FieldServicesExperience() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Field Services Experience</h1>
          </div>
          <p className="text-lg text-gray-600">
            Real-time dialect-specific communication for field service teams and customers
          </p>
        </div>

        {/* Demo Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Field Service Scenario */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-600">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              On-Site Interaction
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Technician: Maria</p>
                <p className="text-sm font-semibold text-gray-700 mb-3">Customer: Regional dialect speaker</p>
                <p className="text-gray-700">
                  "I'm here to install your new service. Let me explain what I'll be doing..."
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-700 mb-2">Dialect-Aware Communication:</p>
                <p className="text-gray-700">
                  The system provides real-time translation and cultural context, ensuring the technician communicates in the customer's preferred dialect and style.
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
                  <h3 className="font-bold text-gray-900 mb-1">Clear Instructions</h3>
                  <p className="text-sm text-gray-600">
                    Customers understand technical explanations in their own dialect
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Reduced Errors</h3>
                  <p className="text-sm text-gray-600">
                    Fewer misunderstandings lead to fewer service callbacks
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Trust & Confidence</h3>
                  <p className="text-sm text-gray-600">
                    Customers feel more confident with technicians who speak their language
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Integration */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-emerald-600" />
            Mobile-First Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-Time Translation",
                desc: "Instant dialect-specific translations on technician's mobile device",
              },
              {
                title: "Voice Support",
                desc: "Audio guidance in customer's preferred dialect and accent",
              },
              {
                title: "Documentation",
                desc: "Service reports and follow-ups in customer's language",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-emerald-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Clock className="h-6 w-6 text-emerald-600" />
            Service Journey
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Appointment Scheduled", desc: "Customer books service in their preferred language" },
              { step: 2, title: "Pre-Visit Communication", desc: "Technician receives dialect context for customer" },
              { step: 3, title: "On-Site Service", desc: "Real-time translation supports service delivery" },
              { step: 4, title: "Follow-Up", desc: "Documentation and follow-up in customer's dialect" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  {item.step < 4 && <div className="w-1 h-12 bg-emerald-200 mt-2" />}
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

